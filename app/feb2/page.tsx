"use client";

import { motion } from "framer-motion";
import { Home, Lock, RefreshCw, Users, ChevronUp, ArrowLeft, MapPin, DollarSign, Building2, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const MOTION_EASE = [0.25, 0.46, 0.45, 0.94];

// Property data from the HTML
const propertyData = {
  address: {
    street: "624 WESTMINSTER HILL RD",
    city: "FITCHBURG",
    state: "MA",
    zip: "01420-2831",
    county: "WORCESTER",
    apn: "FITC M:0173 B:0079 L:0",
    owners: "SCARELA LUIS M / LOPEZ MARIANELA",
    ownershipRights: "HUSBAND AND WIFE",
  },
  investment: {
    appreciation: "+84.2%",
    equity: "$37,818",
    pricePerSqFt: "$218",
    ownership: "0 yrs",
  },
  valuation: {
    purchasePrice: "$171,000",
    avmValue: "$315,000",
    avmLow: "$297,000",
    avmHigh: "$333,000",
    estimatedEquity: "$121,319",
    cltv: "61%",
  },
  building: {
    yearBuilt: "1910",
    effectiveYear: "1975",
    livingArea: "1,448 sq ft",
    bedrooms: "2",
    bathrooms: "1 (1F)",
    totalRooms: "8",
    stories: "2",
    construction: "FRAME",
    exterior: "ALUMINUM/VINYL",
    lotSize: "0.196 acres",
    lotSqFt: "8,529 sq ft",
    heating: "FORCED AIR",
    propertyType: "SFR",
    floodZone: "X",
    zoning: "RB",
  },
  lastSale: {
    price: "$171,000",
    recorded: "Sep 4, 2018",
    seller: "KNOWLTON JENIFER",
    buyer: "SCARELA LUIS M / LOPEZ MARIANELA",
    docId: "2018.15337",
  },
  liens: [
    {
      position: 1,
      type: "STAND ALONE FINANCE",
      lender: "QUICKEN LOANS INC",
      amount: "$165,410",
      term: "20 YEARS",
      rate: "2.9%",
      borrower: "SCARELA LUIS M / LOPEZ MARIANELA",
      docId: "2020.17280",
      date: "Oct 1, 2020",
    },
    {
      position: 2,
      type: "STAND ALONE FINANCE",
      lender: "ROCKET MORTGAGE LLC",
      amount: "$63,000",
      term: "30 YEARS",
      rate: "—",
      borrower: "SCARELA LUIS M / LOPEZ MARIANELA",
      docId: "2025.13884",
      date: "Oct 14, 2025",
    },
  ],
  transfers: [
    {
      type: "Deed Transfer",
      saleType: "SALE",
      price: "$171,000",
      date: "Sep 4, 2018",
      armsLength: true,
      docId: "2018.15337",
    },
  ],
  ownershipHistory: [
    {
      name: "Scarela Luis M / Lopez Marianela",
      current: true,
      purchasedFrom: "Knowlton Jenifer",
      price: "$171,000",
      date: "Sep 4, 2018",
      docType: "Deed Transfer",
    },
    {
      name: "Richard Jenifer L / Richard Jenifer",
      current: false,
      purchasedFrom: "Hoover Alfred",
      price: "$85,000",
      date: "Feb 12, 2010",
      docType: "Deed Transfer",
    },
  ],
};

function DataRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-white/5">
      <span className="text-white/50 text-sm">{label}</span>
      <span className={`text-sm font-medium ${highlight ? "text-emerald-400" : "text-white"}`}>{value || "—"}</span>
    </div>
  );
}

function SectionCard({ 
  icon: Icon, 
  iconColor, 
  title, 
  subtitle, 
  badge,
  children,
  delay = 0 
}: { 
  icon: React.ElementType; 
  iconColor: string; 
  title: string; 
  subtitle?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: MOTION_EASE }}
      className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Icon className={`w-6 h-6 ${iconColor}`} />
          <div>
            <h3 className="text-white font-semibold">{title}</h3>
            {subtitle && <p className="text-white/50 text-sm">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {badge}
          <ChevronUp className="w-5 h-5 text-white/30" />
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        {children}
      </div>
    </motion.div>
  );
}

export default function Feb2ReleasePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/20 via-black to-blue-950/20" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: MOTION_EASE }}
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Main</span>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: MOTION_EASE }}
        >
          {/* Logo */}
          <motion.div
            className="flex flex-col items-center mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: MOTION_EASE }}
          >
            <Image
              src="https://cdn.bfldr.com/Q445447Z/at/n85kkcjq5q8r3n6nf4z5jsw/LinkAI_BG_FullGradonBlk.svg?auto=webp&format=svg"
              alt="LinkAI"
              width={200}
              height={60}
              className="h-16 w-auto mb-4"
              unoptimized
            />
            
            {/* Version Badge with Glow */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5, ease: MOTION_EASE }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 -inset-x-4 rounded-full blur-xl"
                style={{ background: "linear-gradient(90deg, rgba(249,115,22,0.4), rgba(59,130,246,0.4))" }}
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative text-3xl font-light tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-blue-400">
                v1.5
              </span>
            </motion.div>
          </motion.div>

          {/* Release Notes Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: MOTION_EASE }}
          >
            <p className="text-white/40 text-sm font-medium uppercase tracking-widest mb-3">
              Release Notes
            </p>
            <p className="text-white/60 text-lg">
              Feb 2
            </p>
          </motion.div>
        </motion.div>

        {/* Feature Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: MOTION_EASE }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400 text-sm font-medium uppercase tracking-wider">New Feature</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight">
            Property Intelligence
          </h2>
          <p className="text-white/60 text-lg max-w-3xl leading-relaxed">
            Instant access to comprehensive property data directly within the loan officer workflow. 
            View expanded details for last market sale, open liens, transfers, and ownership history.
          </p>
        </motion.div>

        {/* Property Investment Analysis Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5, ease: MOTION_EASE }}
          className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-white/10 rounded-xl p-6 mb-6"
        >
          <h3 className="text-lg font-semibold mb-4">Property Investment Analysis</h3>
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-400">{propertyData.investment.appreciation}</p>
              <p className="text-white/50 text-sm">Appreciation</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">{propertyData.investment.equity}</p>
              <p className="text-white/50 text-sm">Current Equity</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-cyan-400">{propertyData.investment.pricePerSqFt}</p>
              <p className="text-white/50 text-sm">Price per Sq Ft</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">{propertyData.investment.ownership}</p>
              <p className="text-white/50 text-sm">Ownership</p>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Address & Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5, ease: MOTION_EASE }}
            className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-orange-400" />
              <h3 className="text-white font-semibold">Address & Location</h3>
            </div>
            <div className="space-y-0">
              <DataRow label="Street Address" value={propertyData.address.street} />
              <DataRow label="City" value={propertyData.address.city} />
              <DataRow label="State" value={propertyData.address.state} />
              <DataRow label="ZIP Code" value={propertyData.address.zip} />
              <DataRow label="County" value={propertyData.address.county} />
              <DataRow label="APN" value={propertyData.address.apn} />
              <DataRow label="Owners" value={propertyData.address.owners} />
              <DataRow label="Ownership Rights" value={propertyData.address.ownershipRights} />
            </div>
          </motion.div>

          {/* Valuation & Financial Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5, ease: MOTION_EASE }}
            className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <h3 className="text-white font-semibold">Valuation & Financial Data</h3>
            </div>
            <div className="space-y-0">
              <DataRow label="Purchase Price" value={propertyData.valuation.purchasePrice} />
              <DataRow label="AVM Value" value={propertyData.valuation.avmValue} highlight />
              <DataRow label="AVM Low" value={propertyData.valuation.avmLow} />
              <DataRow label="AVM High" value={propertyData.valuation.avmHigh} />
              <DataRow label="Estimated Equity" value={propertyData.valuation.estimatedEquity} />
              <DataRow label="CLTV" value={propertyData.valuation.cltv} />
            </div>
          </motion.div>
        </div>

        {/* Building & Lot Details - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5, ease: MOTION_EASE }}
          className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-5 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-blue-400" />
            <h3 className="text-white font-semibold">Building & Lot Details</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8">
            <div className="space-y-0">
              <DataRow label="Year Built" value={propertyData.building.yearBuilt} />
              <DataRow label="Effective Year" value={propertyData.building.effectiveYear} />
              <DataRow label="Living Area" value={propertyData.building.livingArea} />
              <DataRow label="Bedrooms" value={propertyData.building.bedrooms} />
            </div>
            <div className="space-y-0">
              <DataRow label="Bathrooms" value={propertyData.building.bathrooms} />
              <DataRow label="Total Rooms" value={propertyData.building.totalRooms} />
              <DataRow label="Stories" value={propertyData.building.stories} />
              <DataRow label="Construction" value={propertyData.building.construction} />
            </div>
            <div className="space-y-0">
              <DataRow label="Exterior" value={propertyData.building.exterior} />
              <DataRow label="Lot Size" value={propertyData.building.lotSize} />
              <DataRow label="Lot Sq Ft" value={propertyData.building.lotSqFt} />
              <DataRow label="Heating" value={propertyData.building.heating} />
            </div>
            <div className="space-y-0">
              <DataRow label="Property Type" value={propertyData.building.propertyType} />
              <DataRow label="Flood Zone" value={propertyData.building.floodZone} />
              <DataRow label="Zoning" value={propertyData.building.zoning} />
            </div>
          </div>
        </motion.div>

        {/* Expandable Sections */}
        <div className="space-y-4">
          {/* Last Market Sale */}
          <SectionCard
            icon={Home}
            iconColor="text-emerald-500"
            title="Last Market Sale"
            subtitle={propertyData.lastSale.price}
            delay={0.95}
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <p className="text-white/40 text-xs mb-1">Sale Price</p>
                <p className="text-white font-semibold">{propertyData.lastSale.price}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Recorded</p>
                <p className="text-white font-semibold">{propertyData.lastSale.recorded}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Seller</p>
                <p className="text-white font-semibold">{propertyData.lastSale.seller}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Buyer</p>
                <p className="text-white font-semibold text-sm">{propertyData.lastSale.buyer}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Doc ID</p>
                <p className="text-white font-semibold">{propertyData.lastSale.docId}</p>
              </div>
            </div>
          </SectionCard>

          {/* Open Liens */}
          <SectionCard
            icon={Lock}
            iconColor="text-amber-500"
            title="Open Liens (2)"
            subtitle="$228,410 • 61% LTV"
            badge={
              <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-medium rounded-full">
                Multiple Liens
              </span>
            }
            delay={1}
          >
            <div className="space-y-4">
              {propertyData.liens.map((lien, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-4">
                        <span className="text-white text-xs font-bold">{lien.position}</span>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs mb-1">Position</p>
                        <p className="text-white font-semibold text-sm">{lien.type}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs mb-1">Lender</p>
                      <p className="text-white font-semibold text-sm">{lien.lender}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs mb-1">Loan Amount</p>
                      <p className="text-white font-semibold">{lien.amount}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs mb-1">Type / Term</p>
                      <p className="text-white font-semibold text-sm">{lien.type}</p>
                      <p className="text-white/50 text-xs">{lien.term}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs mb-1">Rate</p>
                      <p className="text-white font-semibold">{lien.rate}</p>
                      {lien.rate !== "—" && <p className="text-white/50 text-xs">EST</p>}
                    </div>
                  </div>
                  <div className="border-t border-white/5 pt-3 flex flex-wrap justify-between items-center gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-white/40">Borrower:</span>
                      <span className="text-white/70">{lien.borrower}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-white/40">Doc ID:</span>
                        <span className="text-white/70">{lien.docId}</span>
                      </div>
                      <span className="text-white/20">|</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white/40">Date:</span>
                        <span className="text-white/70">{lien.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Transfers & Conveyances */}
          <SectionCard
            icon={RefreshCw}
            iconColor="text-blue-500"
            title="Transfers & Conveyances"
            subtitle="Current Owner Transaction History"
            delay={1.05}
          >
            {propertyData.transfers.map((transfer, idx) => (
              <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-white/40 text-xs mb-1">Transaction</p>
                    <p className="text-white font-semibold">{transfer.type}</p>
                    <p className="text-white/50 text-xs">{transfer.saleType}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs mb-1">Sale Price</p>
                    <p className="text-white font-semibold">{transfer.price}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs mb-1">Date</p>
                    <p className="text-white font-semibold">{transfer.date}</p>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-3 flex items-center gap-2 text-sm">
                  {transfer.armsLength && (
                    <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Arms Length
                    </span>
                  )}
                  <span className="text-white/20">|</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white/40">Doc ID:</span>
                    <span className="text-white/70">{transfer.docId}</span>
                  </div>
                </div>
              </div>
            ))}
          </SectionCard>

          {/* Ownership History */}
          <SectionCard
            icon={Users}
            iconColor="text-purple-500"
            title="Ownership History (2)"
            subtitle="Complete ownership chain for this property"
            delay={1.1}
          >
            <div className="space-y-4">
              {propertyData.ownershipHistory.map((owner, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-white font-semibold">{owner.name}</p>
                        {owner.current && (
                          <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-medium rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-white/50 text-sm">Purchased from: {owner.purchasedFrom}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{owner.price}</p>
                      <p className="text-white/50 text-sm">{owner.date}</p>
                    </div>
                  </div>
                  <div className="border-t border-white/5 pt-3 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/40 text-xs mb-1">Document Type</p>
                      <p className="text-white font-semibold">{owner.docType}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs mb-1">Title Company</p>
                      <p className="text-white font-semibold">—</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <p className="text-white/30 text-sm">
            LinkAI v1.5 • Feb 2 Release
          </p>
        </motion.div>
      </div>
    </main>
  );
}
