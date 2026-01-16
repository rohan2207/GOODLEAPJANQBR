'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Chapter, Facet, CHAPTERS } from './state'

interface LivingBlobProps {
  activeChapter: Chapter
  activeFacet: Facet
  onFacetChange: (facet: Facet) => void
  pointerPos: { x: number; y: number }
  isDragging: boolean
}

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;
  
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uChapter;
  uniform float uSplit;
  uniform vec2 uLobe1;
  uniform vec2 uLobe2;
  uniform float uLobe1Active;
  uniform float uLobe2Active;
  uniform float uFreeze;
  
  varying vec2 vUv;
  
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  float metaball(vec2 p, vec2 center, float radius, float active) {
    float d = length(p - center);
    float r = radius * (1.0 + active * 0.3);
    return (r * r) / (d * d + 0.001);
  }
  
  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * 2.0;
    
    float t = uTime * 0.02 * (1.0 - uFreeze);
    
    // Base center
    vec2 center = vec2(0.0) + (uPointer - 0.5) * 0.15;
    
    // Create metaballs - splits based on chapter
    float field = 0.0;
    
    // Main center blob
    float mainSize = 0.35 * (1.0 - uSplit * 0.3);
    vec2 mainPos = center + vec2(snoise(vec2(t, 0.0)) * 0.05, snoise(vec2(0.0, t)) * 0.05);
    field += metaball(p, mainPos, mainSize, 0.0);
    
    // Lobe 1
    if (uSplit > 0.0) {
      vec2 lobe1Pos = uLobe1 * uSplit * 0.5 + mainPos;
      field += metaball(p, lobe1Pos, 0.2 * uSplit, uLobe1Active);
    }
    
    // Lobe 2
    if (uSplit > 0.0) {
      vec2 lobe2Pos = uLobe2 * uSplit * 0.5 + mainPos;
      field += metaball(p, lobe2Pos, 0.18 * uSplit, uLobe2Active);
    }
    
    float blob = smoothstep(0.4, 1.2, field);
    
    // Colors
    vec3 warmOrange = vec3(0.95, 0.55, 0.3);
    vec3 softPeach = vec3(0.97, 0.8, 0.65);
    vec3 coolBlue = vec3(0.5, 0.65, 0.8);
    vec3 cream = vec3(0.98, 0.95, 0.9);
    
    float n1 = snoise(p * 1.5 + t) * 0.5 + 0.5;
    float radial = length(p - center);
    
    vec3 color = mix(cream, softPeach, radial * 1.5);
    color = mix(color, warmOrange, n1 * 0.5);
    color = mix(color, coolBlue, smoothstep(0.3, 0.6, radial) * 0.25);
    
    // Active lobe highlight
    float highlight = uLobe1Active * 0.2 + uLobe2Active * 0.2;
    color += vec3(0.1, 0.05, 0.0) * highlight;
    
    float alpha = blob * 0.9;
    float glow = smoothstep(0.2, 0.5, field) * 0.15;
    alpha = max(alpha, glow);
    
    gl_FragColor = vec4(color, alpha);
  }
`

export default function LivingBlob({ activeChapter, activeFacet, onFacetChange, pointerPos, isDragging }: LivingBlobProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport, size } = useThree()
  const [freeze, setFreeze] = useState(false)
  
  const chapter = CHAPTERS.find(c => c.id === activeChapter)
  const lobes = chapter?.lobePositions || []
  
  // Check reduced motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setFreeze(mq.matches)
    const handler = (e: MediaQueryListEvent) => setFreeze(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    uChapter: { value: 1 },
    uSplit: { value: 0 },
    uLobe1: { value: new THREE.Vector2(-0.6, 0) },
    uLobe2: { value: new THREE.Vector2(0.6, 0.4) },
    uLobe1Active: { value: 0 },
    uLobe2Active: { value: 0 },
    uFreeze: { value: 0 },
  }), [])

  // Detect which lobe is selected based on pointer
  useEffect(() => {
    if (!isDragging || lobes.length === 0) {
      if (activeFacet !== 'none' && activeChapter !== 4) {
        // Keep current facet
      }
      return
    }

    // Normalize pointer to -1 to 1 range
    const px = (pointerPos.x - 0.5) * 2
    const py = (pointerPos.y - 0.5) * 2

    // Find closest lobe
    let closest: Facet = 'none'
    let minDist = 0.8 // Threshold

    lobes.forEach(lobe => {
      const dist = Math.sqrt((px - lobe.x) ** 2 + (py - lobe.y) ** 2)
      if (dist < minDist) {
        minDist = dist
        closest = lobe.facet
      }
    })

    if (closest !== activeFacet) {
      onFacetChange(closest)
    }
  }, [pointerPos, isDragging, lobes, activeFacet, onFacetChange, activeChapter])

  // Chapter 4 auto-sets mortgage
  useEffect(() => {
    if (activeChapter === 4 && activeFacet !== 'mortgage') {
      onFacetChange('mortgage')
    }
  }, [activeChapter, activeFacet, onFacetChange])

  useFrame((state) => {
    if (!meshRef.current) return
    const mat = meshRef.current.material as THREE.ShaderMaterial
    
    mat.uniforms.uTime.value = state.clock.elapsedTime
    mat.uniforms.uFreeze.value = freeze ? 1 : 0
    mat.uniforms.uChapter.value = activeChapter
    
    // Smooth pointer
    const currentPointer = mat.uniforms.uPointer.value
    currentPointer.x += (pointerPos.x - currentPointer.x) * 0.05
    currentPointer.y += (pointerPos.y - currentPointer.y) * 0.05
    
    // Split amount based on chapter and drag
    const targetSplit = (activeChapter === 2 || activeChapter === 3) && isDragging ? 1 : 
                        (activeChapter === 2 || activeChapter === 3) ? 0.6 : 0
    mat.uniforms.uSplit.value += (targetSplit - mat.uniforms.uSplit.value) * 0.05
    
    // Update lobe positions
    if (lobes.length >= 1) {
      mat.uniforms.uLobe1.value.set(lobes[0].x, lobes[0].y)
      mat.uniforms.uLobe1Active.value += ((activeFacet === lobes[0].facet ? 1 : 0) - mat.uniforms.uLobe1Active.value) * 0.1
    }
    if (lobes.length >= 2) {
      mat.uniforms.uLobe2.value.set(lobes[1].x, lobes[1].y)
      mat.uniforms.uLobe2Active.value += ((activeFacet === lobes[1].facet ? 1 : 0) - mat.uniforms.uLobe2Active.value) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} scale={[viewport.width * 0.8, viewport.height * 0.8, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

