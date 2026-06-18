# V3.0 Videos

Upload demo videos here. The Smart Credit feature card renders a clearly labeled placeholder until the video file is present.

## Files

| File name | What to record | Used in code |
|-----------|---------------|--------------|
| `smart-credit-demo.mp4` | Primary Smart Credit demo (2–4 min recommended) | `feature.videoSrc` in `app/v3-0/page.tsx` |
| `smart-credit-walkthrough.mp4` | Optional longer walkthrough / training video | add as second `VideoPlayer` if needed |

## Video Guidelines

- **Format:** MP4, H.264 codec
- **Max size:** ~50 MB for fast load (compress if needed)
- **Aspect ratio:** 16:9
- **Hide any real borrower PII** — use test loan data

## Prefer a YouTube or Vimeo Link?

If you'd rather host the video externally (YouTube/Vimeo), open `app/v3-0/page.tsx` and set `videoEmbedUrl` on the `smart-credit` feature instead of `videoSrc`:

```typescript
// YouTube embed URL format:
videoEmbedUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",

// Vimeo embed URL format:
videoEmbedUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID",
```

The `VideoPlayer` component will automatically switch to an `<iframe>` embed.
