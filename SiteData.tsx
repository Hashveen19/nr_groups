// ─── SITE DATA — projects, expertise, stats, SVG generators, engineering ────
import { TEXT_PRIMARY, TEXT_SUBTLE, GOLD, GOLD_GLOW } from "./SiteTheme.tsx"


export const PROJECTS = [
    {
        id: 1, num: "01", name: "Seminole Hard Rock Guitar Hotel",
        location: "Hollywood, FL", year: "2019", category: "Hospitality",
        system: "NR 8000 Unitized Curtain Wall", architect: "Klai Juba Wald", gc: "Suffolk Construction",
        img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=90&fit=crop",
    },
    {
        id: 2, num: "02", name: "Century Plaza Twin Towers",
        location: "Los Angeles, CA", year: "2021", category: "Commercial",
        system: "NR 8000 Unitized Curtain Wall", architect: "Pei Cobb Freed", gc: "Lendlease",
        img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=90&fit=crop",
    },
    {
        id: 3, num: "03", name: "Jade Signature Tower",
        location: "Sunny Isles, FL", year: "2018", category: "Residential",
        system: "Custom Unitized Geometry", architect: "Herzog & de Meuron", gc: "Coastal Construction",
        img: "https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=1600&q=90&fit=crop",
    },
    {
        id: 4, num: "04", name: "Miami International Airport",
        location: "Miami, FL", year: "2016", category: "Aviation",
        system: "NR 5000 + NR 1100", architect: "HNTB Corporation", gc: "Turner Construction",
        img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=90&fit=crop",
    },
    {
        id: 5, num: "05", name: "Nassau Lynden Pindling Airport",
        location: "Nassau, Bahamas", year: "2015", category: "Aviation",
        system: "NR 8000 Unitized Curtain Wall", architect: "HOK Architects", gc: "PCL Constructors",
        img: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=1600&q=90&fit=crop",
    },
    {
        id: 6, num: "06", name: "Shoreline Gateway",
        location: "Long Beach, CA", year: "2023", category: "Mixed-Use",
        system: "NR 8000 Unitized Curtain Wall", architect: "SOM Architects", gc: "PCL Constructors",
        img: "https://images.unsplash.com/photo-1554435493-93422e8220c8?w=1600&q=90&fit=crop",
    },
    {
        id: 7, num: "07", name: "Nicklaus Children's Hospital",
        location: "Miami, FL", year: "2018", category: "Healthcare",
        system: "NR 5000 Curtain Wall", architect: "HDR Architecture", gc: "Skanska USA",
        img: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1600&q=90&fit=crop",
    },
    {
        id: 8, num: "08", name: "Ritz Carlton Residences Miami",
        location: "Miami, FL", year: "2021", category: "Residential",
        system: "NR 8000 + PSG Railings", architect: "Arquitectonica", gc: "Suffolk Construction",
        img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=90&fit=crop",
    },
]
export const EXPERTISE = [
    { num: "01", title: "Curtain Wall Systems", desc: "Unitized and stick-built curtain wall systems engineered for high-rise towers with LMI/SMI impact ratings. FBC-approved from FL-12847.", detail: "NR 8000 · NR 5000 · NR 1100" },
    { num: "02", title: "Window Wall Systems", desc: "Floor-to-floor window wall solutions designed for multi-family and mixed-use residential towers with full impact certification.", detail: "Series 6000 · Series 6000-i" },
    { num: "03", title: "Lift & Slide Doors", desc: "Ultra-large format lift-and-slide doors for seamless indoor/outdoor living in luxury residential and resort environments.", detail: "Series 7000 · Series 10000" },
    { num: "04", title: "Point Support Glass", desc: "Spider-fitting point-support glass systems for dramatic all-glass facades, canopies, and overhead skylight installations.", detail: "PSG Systems · PSG Overhead" },
]
export const STATS = [
    { value: "30+", label: "Years of Excellence" },
    { value: "$120M", label: "Annual Revenue" },
    { value: "200+", label: "Global Employees" },
    { value: "1.5M", label: "Sq Ft Produced Annually" },
]
export const LEADERSHIP = [
    { initials: "NS", name: "Noshad Ali Shamshad", title: "Founder & President", bio: "Founded NR Group in 1990 with a vision to deliver precision-engineered facade systems. Over 30 years leading NR's growth across North America and the Caribbean." },
    { initials: "SA", name: "Shahzad Ali", title: "COO / Vice President", bio: "Co-founder overseeing operations, procurement, and the NRV Façade joint venture production facility in Cartagena, Colombia." },
    { initials: "DT", name: "David Taylor", title: "Chief Estimator", bio: "20+ years estimating complex curtain wall and window wall systems. Expert in FBC compliance, value engineering, and design-assist coordination." },
    { initials: "KK", name: "Krishna V. Konda", title: "Pre-Construction / PM", bio: "Leads design-assist and pre-construction services, coordinating BIM/Revit modelling, shop drawings, and engineering from concept to installation." },

]
export const CATEGORIES = ["All", "Commercial", "Aviation", "Hospitality", "Residential", "Mixed-Use", "Healthcare"]


// ─── FINISH / WALL COLOUR MAPS ────────────────────────────────────────────────
export const FINISH_COLORS: Record<string, { frame: string; label: string; hex: string; code: string }> = {
    "mill":            { frame: "#c0b89a", label: "Mill Finish",          hex: "#c0b89a", code: "Mill" },
    "anodized clear":  { frame: "#b8c4c8", label: "Anodized — Clear",     hex: "#b8c4c8", code: "ANO-CLR" },
    "anodized bronze": { frame: "#6b4f35", label: "Anodized — Bronze",    hex: "#6b4f35", code: "ANO-BRZ" },
    "anodized black":  { frame: "#1a1a1a", label: "Anodized — Black",     hex: "#1a1a1a", code: "ANO-BLK" },
    "powder white":    { frame: "#e8e4de", label: "Powder Coat — White",  hex: "#e8e4de", code: "RAL-9016" },
    "powder bronze":   { frame: "#7a5c3a", label: "Powder Coat — Bronze", hex: "#7a5c3a", code: "RAL-8019" },
    "powder black":    { frame: "#1c1c1c", label: "Powder Coat — Black",  hex: "#1c1c1c", code: "RAL-9005" },
}
export const WALL_COLORS: Record<string, { bg: string; label: string; hex: string }> = {
    "concrete":  { bg: "#8a8d8f", label: "Concrete",   hex: "#8a8d8f" },
    "white":     { bg: "#f5f5f3", label: "White",      hex: "#f5f5f3" },
    "gray":      { bg: "#6b7280", label: "Gray",       hex: "#6b7280" },
    "dark gray": { bg: "#374151", label: "Dark Gray",  hex: "#374151" },
    "brick":     { bg: "#8b4513", label: "Brick",      hex: "#8b4513" },
    "limestone": { bg: "#c8b89a", label: "Limestone",  hex: "#c8b89a" },
    "black":     { bg: "#1a1a1a", label: "Black",      hex: "#1a1a1a" },
    "charcoal":  { bg: "#36454f", label: "Charcoal",   hex: "#36454f" },
}

// ─── SVG GENERATORS ───────────────────────────────────────────────────────────
export type DiagramConfig = {
    system: string; frameColor: string; wallColor: string; glassColor: string
    floors?: number; bays?: number; panelW?: number; panelH?: number
    finishLabel?: string; wallLabel?: string
}

export function generateCurtainWallSVG(cfg: DiagramConfig): string {
    const { frameColor, wallColor, glassColor, floors = 4, bays = 5, system, finishLabel, wallLabel } = cfg
    const PW = 64, PH = 80, FT = 6, M = 48
    const W = bays * PW + FT * (bays + 1) + M * 2
    const H = floors * PH + FT * (floors + 1) + M + 80
    let panels = ""
    for (let f = 0; f < floors; f++) {
        for (let b = 0; b < bays; b++) {
            const x = M + FT + b * (PW + FT); const y = 60 + FT + f * (PH + FT)
            panels += `<rect x="${x}" y="${y}" width="${PW}" height="${PH}" fill="${glassColor}"/>`
            panels += `<rect x="${x}" y="${y}" width="${PW}" height="${PH/3}" fill="rgba(255,255,255,0.12)"/>`
        }
    }
    const totalFW = bays * (PW + FT) + FT; const totalFH = floors * (PH + FT) + FT
    const grid = `<rect x="${M}" y="60" width="${totalFW}" height="${totalFH}" fill="${frameColor}" rx="1"/>`
    const walls = `<rect x="0" y="50" width="${M}" height="${totalFH+20}" fill="${wallColor}"/><rect x="${M+totalFW}" y="50" width="${M}" height="${totalFH+20}" fill="${wallColor}"/>`
    const dimX = `<line x1="${M}" y1="${H-22}" x2="${M+totalFW}" y2="${H-22}" stroke="${GOLD}" stroke-width="1"/><text x="${M+totalFW/2}" y="${H-10}" fill="${GOLD}" font-family="monospace" font-size="9" text-anchor="middle">${bays*66}"</text>`
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W+40} ${H}" width="100%">
    <rect width="${W+40}" height="${H}" fill="#0e1117"/>${walls}${grid}${panels}${dimX}
    <text x="${M}" y="48" fill="${TEXT_PRIMARY}" font-family="'Jost',sans-serif" font-size="11" font-weight="500" letter-spacing="2">${system.toUpperCase()}</text>
    <text x="${M}" y="${H-2}" fill="${TEXT_SUBTLE}" font-family="'Jost',sans-serif" font-size="9">FRAME: ${finishLabel||"Mill"}  |  WALL: ${wallLabel||"Concrete"}  |  GLASS: Low-E IGU</text>
  </svg>`
}

export function generateWindowWallSVG(cfg: DiagramConfig): string {
    const { frameColor, wallColor, glassColor, floors = 3, bays = 4, system, finishLabel, wallLabel } = cfg
    const PW = 72, PH = 96, FT = 5, M = 40
    const W = bays * PW + FT * (bays + 1) + M * 2 + 30; const H = floors * PH + FT * (floors + 1) + M + 70
    let panels = ""
    for (let f = 0; f < floors; f++) {
        for (let b = 0; b < bays; b++) {
            const x = M + FT + b * (PW + FT); const y = 50 + FT + f * (PH + FT)
            panels += `<rect x="${x}" y="${y}" width="${PW}" height="${PH}" fill="${glassColor}"/>`
            panels += `<rect x="${x}" y="${y}" width="${PW}" height="${PH*0.25}" fill="rgba(255,255,255,0.1)"/>`
        }
    }
    const totalFW = bays*(PW+FT)+FT; const totalFH = floors*(PH+FT)+FT
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%">
    <rect width="${W}" height="${H}" fill="#0e1117"/>
    <rect x="0" y="40" width="${M}" height="${totalFH+20}" fill="${wallColor}"/>
    <rect x="${M+totalFW}" y="40" width="${M+30}" height="${totalFH+20}" fill="${wallColor}"/>
    <rect x="${M}" y="50" width="${totalFW}" height="${totalFH}" fill="${frameColor}"/>
    ${panels}
    <text x="${M}" y="40" fill="${TEXT_PRIMARY}" font-family="'Jost',sans-serif" font-size="11" font-weight="500">${system.toUpperCase()}</text>
    <text x="${M}" y="${H}" fill="${TEXT_SUBTLE}" font-family="'Jost',sans-serif" font-size="9">FRAME: ${finishLabel||"Mill"}  |  WALL: ${wallLabel||"Concrete"}</text>
  </svg>`
}

export function generateDoorSVG(cfg: DiagramConfig): string {
    const { frameColor, wallColor, glassColor, system, panelW = 96, panelH = 120, finishLabel, wallLabel } = cfg
    const scale = 2.2; const PW = panelW/scale; const PH = panelH/scale
    const FT = 8; const M = 50; const panels = 2
    const W = panels*PW + FT*(panels+1) + M*2 + 30; const H = PH + FT*2 + M + 80
    let svgPanels = ""
    for (let p = 0; p < panels; p++) {
        const x = M+FT+p*(PW+FT); const y = M+FT
        svgPanels += `<rect x="${x}" y="${y}" width="${PW}" height="${PH}" fill="${glassColor}"/>`
        svgPanels += `<rect x="${x}" y="${y}" width="${PW}" height="${PH*0.2}" fill="rgba(255,255,255,0.1)"/>`
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%">
    <rect width="${W}" height="${H}" fill="#0e1117"/>
    <rect x="0" y="${M-4}" width="${M}" height="${PH+FT*2+12}" fill="${wallColor}"/>
    <rect x="${M+panels*(PW+FT)+FT}" y="${M-4}" width="${M+30}" height="${PH+FT*2+12}" fill="${wallColor}"/>
    <rect x="${M}" y="${M}" width="${panels*(PW+FT)+FT}" height="${PH+FT*2}" fill="${frameColor}" rx="1"/>
    ${svgPanels}
    <text x="${M}" y="${M-10}" fill="${TEXT_PRIMARY}" font-family="'Jost',sans-serif" font-size="11" font-weight="500">${system.toUpperCase()}</text>
    <text x="${M}" y="${H-4}" fill="${TEXT_SUBTLE}" font-family="'Jost',sans-serif" font-size="9">FRAME: ${finishLabel||"Mill"}  |  WALL: ${wallLabel||"Concrete"}  |  LIFT & SLIDE</text>
  </svg>`
}

export function generateJointDetailSVG(frameColor: string, system: string, finishLabel: string): string {
    const W = 340, H = 240
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%">
    <rect width="${W}" height="${H}" fill="#0e1117"/>
    <rect x="30" y="90" width="280" height="60" fill="${frameColor}" rx="1"/>
    <rect x="30" y="106" width="280" height="10" fill="#4a3520"/>
    <rect x="30" y="124" width="280" height="4" fill="#4a3520"/>
    <rect x="12" y="60" width="16" height="120" fill="rgba(140,200,255,0.4)" rx="1"/>
    <rect x="312" y="60" width="16" height="120" fill="rgba(140,200,255,0.4)" rx="1"/>
    <text x="${W/2}" y="20" fill="${GOLD}" font-family="'Jost',sans-serif" font-size="10" font-weight="500" letter-spacing="2" text-anchor="middle">HORIZONTAL MULLION — CROSS SECTION</text>
    <line x1="28" y1="200" x2="${W-28}" y2="200" stroke="${GOLD}" stroke-width="1"/>
    <text x="${W/2}" y="215" fill="${GOLD}" font-family="monospace" font-size="9" text-anchor="middle">Mullion depth: 6½" (165mm)</text>
    <text x="${W/2}" y="${H-6}" fill="${TEXT_SUBTLE}" font-family="'Jost',sans-serif" font-size="9" text-anchor="middle">${system.toUpperCase()} · NR GROUP · WEST PALM BEACH FL</text>
  </svg>`
}

export function generateElevationSVG(cfg: DiagramConfig): string {
    const { frameColor, wallColor, glassColor, floors = 8, bays = 5, system, finishLabel, wallLabel } = cfg
    const PW = 42, PH = 52, FT = 4, M = 36
    const W = bays*PW + FT*(bays+1) + M*2 + 40; const H = floors*PH + FT*(floors+1) + M + 60
    let cells = ""
    for (let f = 0; f < floors; f++) {
        for (let b = 0; b < bays; b++) {
            const x = M+FT+b*(PW+FT); const y = 44+FT+f*(PH+FT)
            cells += `<rect x="${x}" y="${y}" width="${PW}" height="${PH}" fill="${glassColor}"/>`
            cells += `<rect x="${x}" y="${y}" width="${PW}" height="${PH*0.3}" fill="rgba(255,255,255,0.08)"/>`
        }
    }
    const totalW = bays*(PW+FT)+FT; const totalH = floors*(PH+FT)+FT
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%">
    <rect width="${W}" height="${H}" fill="#0e1117"/>
    <rect x="0" y="34" width="${M}" height="${totalH+20}" fill="${wallColor}"/>
    <rect x="${M+totalW}" y="34" width="${M+40}" height="${totalH+20}" fill="${wallColor}"/>
    <rect x="${M}" y="44" width="${totalW}" height="${totalH}" fill="${frameColor}"/>
    ${cells}
    <text x="${M}" y="36" fill="${TEXT_PRIMARY}" font-family="'Jost',sans-serif" font-size="10" font-weight="500">${system.toUpperCase()} — FACADE ELEVATION</text>
    <text x="${M}" y="${H-6}" fill="${TEXT_SUBTLE}" font-family="'Jost',sans-serif" font-size="8">FRAME: ${finishLabel||"Mill"}  WALL: ${wallLabel||"Concrete"}  SCALE: N.T.S.</text>
  </svg>`
}

// ─── ENGINEERING DB ───────────────────────────────────────────────────────────
export const ENGINEERING_DB: Record<string, {
    series: string; category: string; fbc: string; impact: string
    maxDP_pos: number; maxDP_neg: number; waterDP: number
    maxSpan: number; maxWidth: number; maxHeight: number
    uFactor: string; shgc: string; thermalBreak: boolean
    finishes: string[]; workflow: string[]; description: string
    warnings: { condition: string; message: string }[]
    diagramType: "curtainwall" | "windowwall" | "door" | "specialty"
}> = {
    "1100": { series: "NR 1100 Series — Window Wall", category: "Window Wall", fbc: "FL-10987", impact: "SMI (LMI upgrade available)", maxDP_pos: 65, maxDP_neg: 75, waterDP: 12, maxSpan: 120, maxWidth: 72, maxHeight: 108, uFactor: "0.38", shgc: "0.23–0.40", thermalBreak: true, finishes: ["Mill Finish","Anodized Clear","Anodized Bronze","Anodized Black","Powder White","Powder Bronze","Powder Black"], workflow: ["Design Assist & PE stamping","Thermal simulation & SHGC modeling","Shop drawings — Manila Engineering Office","Extrusion & fabrication — NRV Cartagena","Glazing assembly & QA","Site installation & commissioning"], description: "The NR 1100 Series is a thermally broken window wall engineered for mid-rise multi-family and mixed-use applications.", warnings: [{ condition: "span > 108", message: "⚠️ STRUCTURAL WARNING: Panel height exceeding 108\" surpasses NR 1100 tested limits." },{ condition: "dp_pos > 65", message: "⚠️ LOAD WARNING: +65 psf exceeded. Upgrade to NR 8000 recommended." }], diagramType: "windowwall" },
    "6000": { series: "Series 6000 — Window Wall", category: "Window Wall", fbc: "FL-14521", impact: "LMI + SMI", maxDP_pos: 65, maxDP_neg: 75, waterDP: 12, maxSpan: 144, maxWidth: 84, maxHeight: 144, uFactor: "0.32", shgc: "0.22–0.38", thermalBreak: true, finishes: ["Mill Finish","Anodized Clear","Anodized Bronze","Anodized Black","Powder White","Powder Bronze","Powder Black"], workflow: ["Design Assist & architectural coordination","FBC product approval documentation","BIM/Revit modelling — Manila Engineering","Fabrication & powder coat — Cartagena","Factory glazing & unit packaging","Crane lift installation"], description: "The Series 6000 Window Wall is NR Group's primary floor-to-floor glazing solution for high-rise residential and mixed-use towers.", warnings: [{ condition: "span > 144", message: "⚠️ STRUCTURAL WARNING: Exceeds Series 6000 tested limits." },{ condition: "dp_pos > 65", message: "⚠️ LOAD WARNING: Upgrade to NR 8000 for higher wind-zone compliance." }], diagramType: "windowwall" },
    "8000": { series: "NR 8000 Series — Unitized Curtain Wall", category: "Curtain Wall", fbc: "FL-12847", impact: "LMI + SMI", maxDP_pos: 90, maxDP_neg: 100, waterDP: 15, maxSpan: 216, maxWidth: 72, maxHeight: 216, uFactor: "0.29", shgc: "0.19–0.35", thermalBreak: true, finishes: ["Mill Finish","Anodized Clear","Anodized Bronze","Anodized Black","Powder White","Powder Bronze","Powder Black","Custom RAL"], workflow: ["Design Assist — geometry & system selection","FBC/NOA submittal & PE engineering","BIM coordination & clash detection","Full-scale mock-up testing","Unitized panel fabrication — Cartagena","Sequential crane installation by floor"], description: "NR Group's flagship high-rise system delivering the highest tested design pressures in the NR portfolio.", warnings: [{ condition: "span > 216", message: "⚠️ CRITICAL: Outside standard NR 8000 parameters. Third-party review required." },{ condition: "dp_pos > 90", message: "⚠️ CRITICAL: Bespoke structural package required." }], diagramType: "curtainwall" },
    "6001": { series: "Series 6001/6500 — Sliding Door", category: "Door", fbc: "FL-12100", impact: "SMI", maxDP_pos: 45, maxDP_neg: 50, waterDP: 9, maxSpan: 120, maxWidth: 84, maxHeight: 120, uFactor: "0.40", shgc: "0.25–0.42", thermalBreak: false, finishes: ["Mill Finish","Anodized Clear","Anodized Bronze","Anodized Black","Powder White","Powder Bronze","Powder Black"], workflow: ["Design Assist","FBC documentation","Hardware specification","Fabrication & glazing","Site installation"], description: "Standard horizontal sliding door for residential and light commercial applications.", warnings: [{ condition: "dp_pos > 45", message: "⚠️ Upgrade to Series 7000 for higher wind-zone." }], diagramType: "door" },
    "7000": { series: "Series 7000 — Lift & Slide Door", category: "Door", fbc: "FL-13892", impact: "LMI (optional)", maxDP_pos: 55, maxDP_neg: 60, waterDP: 10, maxSpan: 144, maxWidth: 96, maxHeight: 144, uFactor: "0.35", shgc: "0.22–0.38", thermalBreak: true, finishes: ["Mill Finish","Anodized Clear","Anodized Bronze","Anodized Black","Powder White","Powder Bronze","Powder Black"], workflow: ["Design Assist","FBC compliance documentation","Hardware engineering","Fabrication — Cartagena","Site installation & track levelling"], description: "Ultra-large format lift-and-slide for luxury residential and resort hospitality.", warnings: [{ condition: "dp_pos > 55", message: "⚠️ Upgrade to Series 10000." },{ condition: "width > 96", message: "⚠️ Outside Series 7000 tested parameters." }], diagramType: "door" },
    "10000": { series: "Series 10000 — Large Format Lift & Slide", category: "Door", fbc: "FL-15210", impact: "LMI (standard)", maxDP_pos: 65, maxDP_neg: 70, waterDP: 12, maxSpan: 168, maxWidth: 120, maxHeight: 168, uFactor: "0.31", shgc: "0.20–0.35", thermalBreak: true, finishes: ["Mill Finish","Anodized Clear","Anodized Bronze","Anodized Black","Powder White","Powder Bronze","Powder Black","Custom RAL"], workflow: ["Design Assist — structural sill engineering","FBC submittal","Custom hardware specification","Premium fabrication","Specialist installation"], description: "Monumental lift-and-slide for architecturally significant openings.", warnings: [{ condition: "dp_pos > 65", message: "⚠️ Custom engineering required beyond this threshold." }], diagramType: "door" },
    "3500": { series: "Series 3500 — Single Hung & Fixed", category: "Specialty Window", fbc: "FL-11456", impact: "LMI + SMI", maxDP_pos: 65, maxDP_neg: 75, waterDP: 12, maxSpan: 84, maxWidth: 60, maxHeight: 84, uFactor: "0.36", shgc: "0.25–0.40", thermalBreak: false, finishes: ["Mill Finish","Anodized Clear","Anodized Bronze","Anodized Black","Powder White","Powder Bronze","Powder Black"], workflow: ["Design Assist","FBC approval","Fabrication","Site installation"], description: "FBC LMI + SMI compliant single hung and fixed window system.", warnings: [{ condition: "height > 84", message: "⚠️ Outside Series 3500 tested limits." }], diagramType: "specialty" },
    "3250": { series: "Series 3250/2500 — Casement", category: "Specialty Window", fbc: "FL-9876", impact: "LMI + SMI", maxDP_pos: 60, maxDP_neg: 70, waterDP: 12, maxSpan: 72, maxWidth: 48, maxHeight: 72, uFactor: "0.34", shgc: "0.23–0.38", thermalBreak: true, finishes: ["Mill Finish","Anodized Clear","Anodized Bronze","Anodized Black","Powder White","Powder Bronze"], workflow: ["Design Assist","FBC approval","Hardware specification","Fabrication","Installation"], description: "Project-out casement and tilt-turn with full LMI + SMI certification.", warnings: [{ condition: "width > 48", message: "⚠️ Outside Series 3250/2500 tested limits." }], diagramType: "specialty" },
}

export type DiagramMsg = { svgContent: string; title: string; subtitle: string; diagramType: string }
export type ChatMessage = {
    role: "user" | "assistant" | "system"; content: string
    type?: "text" | "spec-table" | "rfi" | "warning" | "workflow" | "diagram"
    data?: Record<string, string | string[]>; diagram?: DiagramMsg
}

export function detectFinish(q: string) {
    for (const [key, val] of Object.entries(FINISH_COLORS))
        if (q.includes(key) || q.includes(val.code.toLowerCase()))
            return { frameColor: val.frame, finishLabel: val.label, finishKey: key }
    return { frameColor: FINISH_COLORS["mill"].frame, finishLabel: "Mill Finish", finishKey: "mill" }
}
export function detectWall(q: string) {
    for (const [key, val] of Object.entries(WALL_COLORS))
        if (q.includes(key)) return { wallColor: val.bg, wallLabel: val.label }
    return { wallColor: WALL_COLORS["concrete"].bg, wallLabel: "Concrete" }
}
export function detectSeries(q: string): string | null {
    if (q.includes("8000") || q.includes("unitized curtain wall")) return "8000"
    if (q.includes("6000-i") || q.includes("insulated window wall")) return "6000"
    if (q.includes("6000") || q.includes("window wall")) return "6000"
    if (q.includes("1100") || q.includes("thermally broken")) return "1100"
    if (q.includes("10000") || q.includes("large format")) return "10000"
    if (q.includes("7000") || q.includes("lift") || q.includes("slide")) return "7000"
    if (q.includes("6001") || q.includes("6500") || q.includes("sliding door")) return "6001"
    if (q.includes("3500") || q.includes("single hung") || q.includes("fixed window")) return "3500"
    if (q.includes("3250") || q.includes("2500") || q.includes("casement")) return "3250"
    return null
}

export function processEngineering(input: string): ChatMessage {
    const q = input.toLowerCase()
    const finish = detectFinish(q); const wall = detectWall(q); const detectedSeries = detectSeries(q)
    if (q.includes("rfi") && (q.includes("compile")||q.includes("generate")||q.includes("draft")))
        return { role: "assistant", type: "rfi", content: "RFI_GENERATE", data: {} }
    const isVis = q.includes("show")||q.includes("render")||q.includes("draw")||q.includes("diagram")||q.includes("layout")
    const hasFinish = Object.keys(FINISH_COLORS).some(k=>q.includes(k))||q.includes("anodiz")||q.includes("powder")
    const hasWall = Object.keys(WALL_COLORS).some(k=>q.includes(k))
    const isJoint = q.includes("joint")||q.includes("detail")||q.includes("section")||q.includes("mullion")
    const isElev = q.includes("elevation")||q.includes("facade")||q.includes("building")
    if (isJoint && detectedSeries) {
        const db = ENGINEERING_DB[detectedSeries]
        const svg = generateJointDetailSVG(finish.frameColor, db.series, finish.finishLabel)
        return { role:"assistant", type:"diagram", content:`**Joint Detail — ${db.series}**\n\nFrame: **${finish.finishLabel}**. Polyamide thermal break shown in amber.`, diagram:{ svgContent:svg, title:`${db.series} — Mullion Cross Section`, subtitle:`Finish: ${finish.finishLabel} · ${db.fbc}`, diagramType:"joint" } }
    }
    if ((isVis||hasFinish||hasWall) && detectedSeries) {
        const db = ENGINEERING_DB[detectedSeries]
        const fc = hasFinish ? finish.frameColor : FINISH_COLORS["mill"].frame
        const wc = hasWall ? wall.wallColor : WALL_COLORS["concrete"].bg
        const gl = "rgba(140,190,230,0.55)"; const fl = hasFinish ? finish.finishLabel : "Mill Finish"; const wl = hasWall ? wall.wallLabel : "Concrete"
        const cfg: DiagramConfig = { system: db.series, frameColor: fc, wallColor: wc, glassColor: gl, finishLabel: fl, wallLabel: wl }
        let svg = "", diagType = ""
        if (isElev) { svg = generateElevationSVG({...cfg,floors:8,bays:5}); diagType="elevation" }
        else if (db.diagramType==="curtainwall") { svg = generateCurtainWallSVG({...cfg,floors:4,bays:5}); diagType="curtainwall" }
        else if (db.diagramType==="windowwall") { svg = generateWindowWallSVG({...cfg,floors:3,bays:4}); diagType="windowwall" }
        else { svg = generateDoorSVG({...cfg,panelW:96,panelH:120}); diagType="door" }
        return { role:"assistant", type:"diagram", content:`**Rendered — ${db.series}**\n\n${hasFinish?`Frame: **${fl}**.`:""} ${hasWall?`Wall: **${wl}**.`:""}\n\nFBC: ${db.fbc} · Impact: ${db.impact} · Max DP: +${db.maxDP_pos}/−${db.maxDP_neg} psf`, diagram:{ svgContent:svg, title:db.series, subtitle:`${fl} frame · ${wl} wall · Low-E IGU`, diagramType:diagType } }
    }
    if ((hasFinish||hasWall) && !detectedSeries) {
        const svg = generateCurtainWallSVG({ system:"NR 8000 — Preview", frameColor:finish.frameColor, wallColor:wall.wallColor, glassColor:"rgba(140,190,230,0.55)", finishLabel:finish.finishLabel, wallLabel:wall.wallLabel, floors:3, bays:4 })
        return { role:"assistant", type:"diagram", content:`**Finish Preview — ${finish.finishLabel}**\n\nSpecify a system for full specs.`, diagram:{ svgContent:svg, title:`Preview — ${finish.finishLabel}`, subtitle:`Indicative only`, diagramType:"preview" } }
    }
    const dpMatch = q.match(/(\+?\-?\d+)\s*psf/); const spanMatch = q.match(/(\d+)\s*(?:"|inch|height|span)/)
    if (detectedSeries && (dpMatch||spanMatch)) {
        const db = ENGINEERING_DB[detectedSeries]; const warnings: string[] = []
        if (spanMatch) { const sp=parseInt(spanMatch[1]); db.warnings.forEach(w=>{ if(w.condition.includes("span")&&sp>db.maxSpan) warnings.push(w.message) }) }
        if (dpMatch) { const dp=Math.abs(parseInt(dpMatch[1])); db.warnings.forEach(w=>{ if(w.condition.includes("dp_pos")&&dp>db.maxDP_pos) warnings.push(w.message) }) }
        if (warnings.length>0) return { role:"assistant", type:"warning", content:warnings.join("\n\n") }
    }
    if (detectedSeries && (q.includes("spec")||q.includes("data")||q.includes("u-factor")||q.includes("shgc"))) {
        const db = ENGINEERING_DB[detectedSeries]
        return { role:"assistant", type:"spec-table", content:"", data:{ series:db.series, category:db.category, fbc:db.fbc, impact:db.impact, maxDP:`+${db.maxDP_pos}/−${db.maxDP_neg} psf`, waterDP:`${db.waterDP} psf`, maxWidth:`${db.maxWidth}"`, maxHeight:`${db.maxHeight}"`, uFactor:db.uFactor, shgc:db.shgc, thermalBreak:db.thermalBreak?"Yes — Polyamide":"No", finishes:db.finishes.join(", "), description:db.description } }
    }
    if (detectedSeries && (q.includes("workflow")||q.includes("process")||q.includes("turnkey"))) {
        const db = ENGINEERING_DB[detectedSeries]
        return { role:"assistant", type:"workflow", content:db.description, data:{ series:db.series, steps:db.workflow.join("||") } }
    }
    if (q.includes("finish")||q.includes("anodiz")||q.includes("powder")||q.includes("color"))
        return { role:"assistant", type:"text", content:`**Available Finishes**\n\n${Object.entries(FINISH_COLORS).map(([,v])=>`• **${v.label}** — ${v.code}`).join("\n")}` }
    if (q.includes("fbc")||q.includes("compliance")||q.includes("lmi")||q.includes("smi"))
        return { role:"assistant", type:"text", content:`**FBC Compliance Matrix**\n\n| Series | FBC | Impact |\n|--------|-----|--------|\n| NR 8000 | FL-12847 | LMI + SMI |\n| NR 1100 | FL-10987 | SMI |\n| Series 6000 | FL-14521 | LMI + SMI |\n| Series 7000 | FL-13892 | LMI |\n| Series 10000 | FL-15210 | LMI |\n| Series 3500 | FL-11456 | LMI + SMI |` }
    if (q.includes("thermal")||q.includes("u-factor")||q.includes("shgc")||q.includes("energy"))
        return { role:"assistant", type:"text", content:`**Thermal Performance**\n\n| System | U-Factor | SHGC | Thermal Break |\n|--------|----------|------|-|\n| NR 8000 | 0.29 | 0.19–0.35 | Yes |\n| NR 1100 | 0.38 | 0.23–0.40 | Yes |\n| Series 6000 | 0.32 | 0.22–0.38 | Yes |\n| Series 7000 | 0.35 | 0.22–0.38 | Yes |\n| Series 10000 | 0.31 | 0.20–0.35 | Yes |` }
    if (q.includes("hello")||q.includes("help")||q.includes("what can"))
        return { role:"assistant", type:"text", content:`**NR Group Visual Engineering Specialist**\n\nI render live diagrams and provide technical data for all NR systems.\n\n• "Show NR 8000 with Powder Black frame"\n• "Series 6000 joint detail"\n• "FBC compliance"\n• "Thermal data"\n• "Generate RFI"` }
    return { role:"assistant", type:"text", content:`Specify a system (NR 8000, Series 6000, Series 7000, etc.) or ask about FBC compliance, thermal data, finishes, or generate a diagram.` }
}
