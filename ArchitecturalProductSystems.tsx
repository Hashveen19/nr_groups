import { RenderTarget } from "framer"
import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"

// ─── ARCHITECTURAL PRODUCT SYSTEMS ──────────────────────────────────────────

// ─── THEME ───────────────────────────────────────────────────────────────────
const BG = "#0a0e16"
const PANEL = "#10151f"
const PANEL2 = "#0d121c"
const LINE = "rgba(255,255,255,0.08)"
const LINE2 = "rgba(255,255,255,0.05)"
const WHITE = "#eef1f6"
const GREY = "#8b93a6"
const DIM = "#566077"
const BLUE = "#3b9cff"
const BLUE_TXT = "#4ea3f2"
const GREEN = "#3ec97e"
const RED = "#e25555"
const ORANGE = "#e0913c"
const TEAL = "#3ab7b0"
const MONO = "'JetBrains Mono','Courier New',monospace"
const COND = "'Oswald','Arial Narrow',sans-serif"

// ─── FINISHES ────────────────────────────────────────────────────────────────
const FINISHES = [
    { name: "Mill Finish", face: "#d4d9df", light: "#f1f3f5", dark: "#99a1ac", sw: "linear-gradient(135deg,#e9edf1,#a9b2bd)" },
    { name: "Anodised (Class 1 / Class 2)", face: "#9aa1a9", light: "#c7ccd2", dark: "#6c727b", sw: "linear-gradient(135deg,#b9bec5,#7d838c)" },
    { name: "Powder Coat — White", face: "#f3f4f6", light: "#ffffff", dark: "#c5c9d0", sw: "#f4f5f7" },
    { name: "Powder Coat — Bronze", face: "#7a6140", light: "#9c7f55", dark: "#4e3d26", sw: "linear-gradient(135deg,#9b7e54,#5c4830)" },
    { name: "Powder Coat — Black", face: "#272b33", light: "#3f444d", dark: "#13161c", sw: "#23262e" },
]
const GLASS = "linear-gradient(135deg,#8fa6d2 0%,#5d74a8 45%,#3f5286 100%)"
const GLASS_DK = "linear-gradient(135deg,#7b90bd 0%,#4a5e92 45%,#324373 100%)"

// ─── PRODUCT DATA ────────────────────────────────────────────────────────────
const DEF = {
    glazing: '9/16" laminated to 1-3/4" insulated laminated',
    config: "Conventional, 2/4-Sided SG, Unitized",
    install: "Single & multi-span",
    features: [
        "Thermally improved for energy efficiency",
        "Thermal simulations available upon request",
        "2-Sided and 4-Sided structurally glazed",
        "Unitized for fast, panelised installation",
        "Two-tone interior / exterior colour options",
    ],
}
const PRODUCTS = [
    {
        id: "1100", series: "1100 SERIES", chip: "WINDOW", sys: "WINDOW WALL",
        name: "WINDOW WALL SYSTEM", sub: '11" Nominal Unitized — FBC Approved',
        dp: "+143 PSF", water: "15 PSF", span: "43.5 in", impact: "LMI/SMI", unitW: "147.25 in",
        tags: ["WINDOW WALL", "FBC IMPACT", "COMMERCIAL"], model: "window", thermal: true,
        fbc: { code: "FBC 1100 (Single span)", unit: '43-1/2" × 147-1/4"', design: "+92 / −143 PSF", rating: "Small & Large Missile", lmi: "FL#20149.2", smi: "FL#20149.3" },
        ...DEF,
    },
    {
        id: "8000", series: "8000 SERIES", chip: "CURTAIN", sys: "CURTAIN WALL",
        name: "CURTAIN WALL SYSTEM", sub: '8" Nominal Unitized — LMI FL#20149.2',
        dp: "+148 PSF", water: "15 PSF", span: "43.5 in", impact: "LMI/SMI", unitW: "60 in",
        tags: ["CURTAIN WALL", "FBC IMPACT", "COMMERCIAL"], model: "curtain", thermal: false,
        fbc: { code: "FBC 8000 (Unitized)", unit: '60" × 162"', design: "+100 / −148 PSF", rating: "Small & Large Missile", lmi: "FL#20149.2", smi: "FL#20149.3" },
        ...DEF,
    },
    {
        id: "4000", series: "4000 SERIES", chip: "WINDOW", sys: "WINDOW WALL",
        name: "WINDOW WALL SYSTEM", sub: '8" Frame — FBC Large & Small Missile',
        dp: "+120 PSF", water: "18 PSF", span: "61 in", impact: "LMI/SMI", unitW: "61 in",
        tags: ["WINDOW WALL", "FBC IMPACT", "RESIDENTIAL"], model: "window2", thermal: false,
        fbc: { code: "FBC 4000 (Single span)", unit: '61" × 120"', design: "+120 / −130 PSF", rating: "Small & Large Missile", lmi: "FL#20148.2", smi: "FL#20148.3" },
        ...DEF,
    },
    {
        id: "5000", series: "5000 SERIES", chip: "CURTAIN", sys: "CURTAIN WALL",
        name: "STICK-BUILT CURTAIN WALL", sub: '5" Stick System — Thermally Broken',
        dp: "+90 PSF", water: "12 PSF", span: "54 in", impact: "SMI", unitW: "54 in",
        tags: ["CURTAIN WALL", "THERMAL BREAK", "COMMERCIAL"], model: "curtain", thermal: true,
        fbc: { code: "FBC 5000 (Stick)", unit: '54" × 144"', design: "+80 / −90 PSF", rating: "Small Missile", lmi: "—", smi: "FL#11234.1" },
        ...DEF,
    },
    {
        id: "3500", series: "3500 SERIES", chip: "WINDOW", sys: "WINDOW WALL",
        name: "SINGLE HUNG WINDOW", sub: '3-1/2" Frame — Thermally Improved',
        dp: "+80 PSF", water: "12 PSF", span: "37 in", impact: "LMI/SMI", unitW: "53 in",
        tags: ["WINDOW WALL", "FBC IMPACT", "RESIDENTIAL"], model: "singlehung", thermal: true,
        fbc: { code: "FBC 3500 (Single hung)", unit: '53" × 87"', design: "+80 / −80 PSF", rating: "Small & Large Missile", lmi: "FL#14521.1", smi: "FL#14521.2" },
        ...DEF, glazing: '7/16" laminated to 1" insulated laminated',
        config: "Single hung, fixed-over-vent", install: "Punched openings & ribbon",
    },
    {
        id: "6001", series: "6001 SERIES", chip: "DOOR", sys: "DOORS",
        name: "SLIDING GLASS DOOR", sub: '8" Frame Sliding — FBC Impact',
        dp: "+100 PSF", water: "12 PSF", span: "96 in", impact: "LMI/SMI", unitW: "192 in",
        tags: ["DOORS", "FBC IMPACT", "RESIDENTIAL"], model: "door2", thermal: false,
        fbc: { code: "FBC 6001 (Sliding)", unit: '192" × 120"', design: "+90 / −100 PSF", rating: "Small & Large Missile", lmi: "FL#13890.1", smi: "FL#13890.2" },
        ...DEF, glazing: '9/16" laminated, insulated laminated optional',
        config: "OX, XO, OXO, OXXO panel layouts", install: "Pocket & standard jamb",
    },
    {
        id: "6500", series: "6500 SERIES", chip: "DOOR", sys: "DOORS",
        name: "MULTI-TRACK SLIDING DOOR", sub: "Thermally Broken — 2 & 3 Track",
        dp: "+90 PSF", water: "12 PSF", span: "120 in", impact: "LMI", unitW: "288 in",
        tags: ["DOORS", "THERMAL BREAK", "HOSPITALITY"], model: "door3", thermal: true,
        fbc: { code: "FBC 6500 (Multi-track)", unit: '288" × 120"', design: "+80 / −90 PSF", rating: "Large Missile", lmi: "FL#13892.1", smi: "—" },
        ...DEF, glazing: '9/16" laminated to 1-5/16" insulated laminated',
        config: "2-track & 3-track, up to 6 panels", install: "Flush sill & ADA threshold",
    },
    {
        id: "7000", series: "7000 & 10000 SERIES", chip: "DOOR", sys: "DOORS",
        name: "LIFT & SLIDE GLASS DOOR", sub: "European Lift & Slide — 7' & 10' Track",
        dp: "+70 PSF", water: "10 PSF", span: "144 in", impact: "LMI", unitW: "240 in",
        tags: ["DOORS", "FBC IMPACT", "RESIDENTIAL"], model: "lift", thermal: true,
        fbc: { code: "FBC 7000 / 10000", unit: '240" × 144"', design: "+60 / −70 PSF", rating: "Large Missile", lmi: "FL#13895.1", smi: "—" },
        ...DEF, glazing: '1-3/4" insulated laminated, triple optional',
        config: "Lift & slide, panels to 144\" tall", install: "Recessed track, zero threshold",
    },
    {
        id: "PSG", series: "PSG SERIES", chip: "CURTAIN", sys: "CURTAIN WALL",
        name: "STOREFRONT & ENTRANCE SYSTEM", sub: '4-1/2" Storefront — Monolithic & Insulated',
        dp: "+65 PSF", water: "10 PSF", span: "108 in", impact: "SMI", unitW: "48 in",
        tags: ["CURTAIN WALL", "FBC IMPACT", "COMMERCIAL"], model: "storefront", thermal: false,
        fbc: { code: "FBC PSG (Storefront)", unit: '48" × 108"', design: "+65 / −70 PSF", rating: "Small Missile", lmi: "—", smi: "FL#10987.1" },
        ...DEF, glazing: '9/16" laminated, 1" insulated',
        config: "Centre-set storefront, pair doors", install: "Slab-to-slab & punched",
    },
]

const MARKETS = [
    { t: "COMMERCIAL OFFICE", c: GREEN, d: "High-rise commercial towers requiring unitized installation speed and thermally efficient performance." },
    { t: "MIXED-USE TOWERS", c: BLUE, d: "Combined residential/commercial towers maximising daylight with unitized window wall." },
    { t: "HOSPITALITY", c: GREEN, d: "Hotel facades requiring premium aesthetics, weather performance and acoustic separation." },
    { t: "RESIDENTIAL HIGH-RISE", c: BLUE, d: "Luxury residential requiring impact compliance, energy efficiency and custom colour options." },
]

const SUPPLY: Array<[string, string]> = [
    ["DESIGN ASSIST", "Available — coordinate with NR engineers"],
    ["ENGINEERING", "Full PE-stamped engineered drawings"],
    ["SHOP DRAWINGS", "Included with order"],
    ["THERMAL SIMULATIONS", "Available upon request"],
    ["FABRICATION", "NRV Façade S.A.S — 250,000 sq ft facility"],
    ["INSTALLATION", "Turnkey installation crews available"],
    ["QA/QC", "Pre- and post-production inspection"],
    ["CONTACT", "4348 Westroads Dr, West Palm Beach FL 33407"],
    ["TEL", "1 561 844 1121"],
    ["WEB", "www.nrfacade.com"],
]

// ─── 3D PRIMITIVES ────────────────────────────────────────────────────────────
type Fin = (typeof FINISHES)[0]

function Box({ w, h, d, x = 0, y = 0, z = 0, front, side, top, opacity = 1 }: {
    w: number; h: number; d: number; x?: number; y?: number; z?: number
    front: string; side: string; top: string; opacity?: number
}) {
    const F = (fw: number, fh: number, t: string, bg: string) => (
        <div style={{ position: "absolute", width: fw, height: fh, left: -fw / 2, top: -fh / 2, transform: t, background: bg, backfaceVisibility: "hidden", opacity }} />
    )
    return (
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 0, height: 0, transformStyle: "preserve-3d", transform: `translate3d(${x}px,${y}px,${z}px)` }}>
            {F(w, h, `translateZ(${d / 2}px)`, front)}
            {F(w, h, `rotateY(180deg) translateZ(${d / 2}px)`, front)}
            {F(d, h, `rotateY(90deg) translateZ(${w / 2}px)`, side)}
            {F(d, h, `rotateY(-90deg) translateZ(${w / 2}px)`, side)}
            {F(w, d, `rotateX(90deg) translateZ(${h / 2}px)`, top)}
            {F(w, d, `rotateX(-90deg) translateZ(${h / 2}px)`, side)}
        </div>
    )
}

function Frame({ c, w, h, t, d, x = 0, y = 0, z = 0, corners = false }: {
    c: Fin; w: number; h: number; t: number; d: number; x?: number; y?: number; z?: number; corners?: boolean
}) {
    const fr = `linear-gradient(160deg,${c.light} 0%,${c.face} 45%,${c.dark} 100%)`
    const props = { front: fr, side: c.dark, top: c.light }
    return (
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 0, height: 0, transformStyle: "preserve-3d", transform: `translate3d(${x}px,${y}px,${z}px)` }}>
            <Box w={w} h={t} d={d} y={-(h - t) / 2} {...props} />
            <Box w={w} h={t} d={d} y={(h - t) / 2} {...props} />
            <Box w={t} h={h - 2 * t} d={d} x={-(w - t) / 2} {...props} />
            <Box w={t} h={h - 2 * t} d={d} x={(w - t) / 2} {...props} />
            {corners && [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy], i) => (
                <Box key={i} w={t * 1.5} h={t * 1.5} d={d + 8} x={(sx * (w - t * 1.4)) / 2} y={(sy * (h - t * 1.4)) / 2} {...props} />
            ))}
        </div>
    )
}

function Glass({ w, h, x = 0, y = 0, z = 0, dark = false }: { w: number; h: number; x?: number; y?: number; z?: number; dark?: boolean }) {
    return <Box w={w} h={h} d={3} x={x} y={y} z={z} front={dark ? GLASS_DK : GLASS} side="#3a4c7e" top="#a8bbe0" opacity={0.97} />
}

function Model({ kind, c }: { kind: string; c: Fin }) {
    const fr = `linear-gradient(160deg,${c.light} 0%,${c.face} 45%,${c.dark} 100%)`
    const bar = { front: fr, side: c.dark, top: c.light }
    const gold = { front: "linear-gradient(160deg,#dcc08a,#b3925c)", side: "#8a6f42", top: "#e8d3a6" }
    if (kind === "window" || kind === "window2")
        return (
            <>
                <Frame c={c} w={180} h={146} t={20} d={22} corners />
                <Glass w={146} h={112} dark={kind === "window2"} />
            </>
        )
    if (kind === "curtain")
        return (
            <>
                <Frame c={c} w={180} h={160} t={14} d={20} />
                <Box w={9} h={136} d={14} {...gold} />
                <Box w={156} h={9} d={14} {...gold} />
                <Glass w={68} h={58} x={-39} y={-34} />
                <Glass w={68} h={58} x={39} y={-34} dark />
                <Glass w={68} h={58} x={-39} y={34} dark />
                <Glass w={68} h={58} x={39} y={34} />
            </>
        )
    if (kind === "singlehung")
        return (
            <>
                <Frame c={c} w={140} h={170} t={16} d={20} />
                <Box w={112} h={10} d={16} y={6} {...bar} />
                <Glass w={110} h={62} y={-32} />
                <Frame c={c} w={124} h={70} t={10} d={14} y={44} z={8} />
                <Glass w={102} h={48} y={44} z={8} dark />
            </>
        )
    if (kind === "door2")
        return (
            <>
                {[-1, 1].map((s, i) => (
                    <div key={i} style={{ position: "absolute", left: "50%", top: "50%", transformStyle: "preserve-3d", transform: `translate3d(${s * 48}px,0px,${s * -9}px)` }}>
                        <Frame c={c} w={96} h={150} t={11} d={12} />
                        <Glass w={76} h={130} dark={i === 1} />
                    </div>
                ))}
                <Box w={210} h={10} d={34} y={80} {...bar} />
            </>
        )
    if (kind === "door3" || kind === "lift")
        return (
            <>
                {[-1, 0, 1].map((s, i) => (
                    <div key={i} style={{ position: "absolute", left: "50%", top: "50%", transformStyle: "preserve-3d", transform: `translate3d(${s * 62}px,0px,${s * (kind === "lift" ? -6 : -12)}px)` }}>
                        <Frame c={c} w={66} h={148} t={8} d={10} />
                        <Glass w={52} h={134} dark={i !== 1} />
                    </div>
                ))}
                <Box w={216} h={10} d={kind === "lift" ? 26 : 44} y={79} {...bar} />
            </>
        )
    if (kind === "storefront")
        return (
            <>
                <Frame c={c} w={190} h={160} t={12} d={16} />
                <Box w={9} h={136} d={12} x={-31} {...bar} />
                <Box w={9} h={136} d={12} x={31} {...bar} />
                <Glass w={48} h={132} x={-62} />
                <Glass w={48} h={132} x={62} />
                <Glass w={50} h={132} dark />
                <Box w={4} h={56} d={8} x={-18} z={14} {...bar} />
            </>
        )
    return null
}

// ─── 3D VIEWER ───────────────────────────────────────────────────────────────
function Viewer3D({ kind, c, h, scale = 1, hint = true }: { kind: string; c: Fin; h: number; scale?: number; hint?: boolean }) {
    const [rot, setRot] = useState({ x: -16, y: 28 })
    const [drag, setDrag] = useState(false)
    const last = useRef({ x: 0, y: 0 })
    return (
        <div
            style={{
                position: "relative", height: h, overflow: "hidden", borderRadius: 2,
                background: "linear-gradient(180deg,#e3e7ed 0%,#c5ccd6 38%,#7c8595 72%,#454c5c 100%)",
                cursor: drag ? "grabbing" : "grab", touchAction: "none", userSelect: "none",
            }}
            onPointerDown={(e) => { setDrag(true); last.current = { x: e.clientX, y: e.clientY }; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId) }}
            onPointerMove={(e) => {
                if (!drag) return
                const dx = e.clientX - last.current.x, dy = e.clientY - last.current.y
                last.current = { x: e.clientX, y: e.clientY }
                setRot((r) => ({ x: r.x - dy * 0.5, y: r.y + dx * 0.5 }))
            }}
            onPointerUp={() => setDrag(false)}
            onPointerCancel={() => setDrag(false)}
        >
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 45% at 50% 8%,rgba(255,255,255,0.55) 0%,transparent 60%)" }} />
            <div style={{ position: "absolute", left: "50%", bottom: h * 0.13, width: 190 * scale, height: 26 * scale, transform: "translateX(-50%)", background: "radial-gradient(ellipse at center,rgba(10,14,24,0.45) 0%,transparent 70%)" }} />
            <div style={{ position: "absolute", inset: 0, perspective: 900 }}>
                <div style={{ position: "absolute", left: "50%", top: "50%", width: 0, height: 0, transformStyle: "preserve-3d", transform: `scale(${scale}) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`, transition: drag ? "none" : "transform 0.25s ease-out" }}>
                    <Model kind={kind} c={c} />
                </div>
            </div>
            {hint && (
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 8, textAlign: "center", fontFamily: MONO, fontSize: 9, letterSpacing: "0.3em", color: "rgba(20,26,40,0.65)", pointerEvents: "none" }}>
                    ⟲&nbsp;&nbsp;DRAG TO ROTATE
                </div>
            )}
        </div>
    )
}

// ─── SMALL UI HELPERS ────────────────────────────────────────────────────────
function MonoLabel({ children, color = DIM, size = 9 }: any) {
    return <div style={{ fontFamily: MONO, fontSize: size, letterSpacing: "0.22em", color, textTransform: "uppercase" }}>{children}</div>
}
function Tag({ t }: { t: string }) {
    const c = t === "FBC IMPACT" ? RED : t === "COMMERCIAL" ? ORANGE : t === "THERMAL BREAK" ? BLUE_TXT : t === "DOORS" ? ORANGE : TEAL
    return <span style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.14em", color: c, border: `1px solid ${c}55`, padding: "3px 7px", whiteSpace: "nowrap" }}>{t}</span>
}
function CertChip({ t }: { t: string }) {
    return <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.1em", color: GREEN, border: `1px solid ${GREEN}66`, background: `${GREEN}0d`, padding: "4px 9px", whiteSpace: "nowrap" }}>{t}</span>
}
function SpecRow({ k, v, blue = false }: { k: string; v: string; blue?: boolean }) {
    return (
        <div style={{ display: "flex", gap: 18, padding: "11px 0", borderBottom: `1px solid ${LINE2}` }}>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.2em", color: DIM, width: 170, flexShrink: 0, paddingTop: 2, textTransform: "uppercase" }}>{k}</div>
            <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, color: blue ? BLUE_TXT : WHITE, fontWeight: 400 }}>{v}</div>
        </div>
    )
}
function GroupHead({ children }: any) {
    return <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.26em", color: BLUE_TXT, margin: "28px 0 4px", textTransform: "uppercase" }}>{children}</div>
}
function BlueBtn({ children, onClick, full = false }: any) {
    return (
        <button onClick={onClick} style={{ flex: full ? "none" : 1, transform: "skewX(-14deg)", background: `linear-gradient(90deg,#1f7ae0,${BLUE})`, border: "none", padding: "12px 26px", cursor: "pointer", boxShadow: "0 4px 18px rgba(59,156,255,0.35)" }}>
            <span style={{ display: "inline-block", transform: "skewX(14deg)", fontFamily: MONO, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.2em", color: "#fff" }}>{children}</span>
        </button>
    )
}
function DarkBtn({ children, onClick }: any) {
    return (
        <button onClick={onClick} style={{ transform: "skewX(-14deg)", background: "#141a26", border: `1px solid ${LINE}`, padding: "12px 18px", cursor: "pointer" }}>
            <span style={{ display: "inline-block", transform: "skewX(14deg)", fontFamily: MONO, fontSize: 10, letterSpacing: "0.18em", color: GREY }}>{children}</span>
        </button>
    )
}

// ─── PERFORMANCE TABS ────────────────────────────────────────────────────────
function PerfTabs({ p }: { p: (typeof PRODUCTS)[0] }) {
    const [tab, setTab] = useState(0)
    const tabs = ["WIND LOAD", "DEFLECTION", "THERMAL", "IMPACT ZONE"]
    const stats: Array<[string, string]> = [
        ["DESIGN PRESSURE", p.dp], ["WATER DP", p.water], ["MAX SPAN", p.span], ["UNIT WIDTH", p.unitW],
    ]
    const diagram = (title: string, grad: string, caption: string, hotCorners: boolean) => (
        <div style={{ padding: 18, background: PANEL2, border: `1px solid ${LINE2}` }}>
            <MonoLabel color={GREY} size={9}>{title}</MonoLabel>
            <div style={{ position: "relative", height: 190, margin: "14px 0 10px", border: `1px dashed ${BLUE}66`, background: grad, overflow: "hidden" }}>
                {[1, 2, 3].map((i) => <div key={"h" + i} style={{ position: "absolute", left: 0, right: 0, top: `${i * 25}%`, height: 1, background: "rgba(255,255,255,0.07)" }} />)}
                {[1, 2, 3, 4, 5].map((i) => <div key={"v" + i} style={{ position: "absolute", top: 0, bottom: 0, left: `${i * 16.6}%`, width: 1, background: "rgba(255,255,255,0.07)" }} />)}
                {[0, 1, 2].map((i) => (
                    <div key={"a" + i} style={{ position: "absolute", left: 8, top: `${22 + i * 26}%`, fontFamily: MONO, fontSize: 11, color: "#7fb4e8" }}>⟶</div>
                ))}
                {hotCorners && [["0%", "0%"], ["100%", "0%"], ["0%", "100%"], ["100%", "100%"]].map(([l, t], i) => (
                    <div key={"c" + i} style={{ position: "absolute", left: l, top: t, width: 46, height: 46, transform: "translate(-50%,-50%)", background: "radial-gradient(circle,rgba(226,70,70,0.85) 0%,transparent 70%)" }} />
                ))}
            </div>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.16em", color: DIM }}>{caption}</div>
            <div style={{ display: "flex", gap: 18, marginTop: 12, flexWrap: "wrap" }}>
                {[["Low", GREEN], ["Moderate", "#b7c94a"], ["High", ORANGE], ["Critical", RED]].map(([l, c]) => (
                    <span key={l as string} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: MONO, fontSize: 9, color: GREY }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: c as string }} />{l}
                    </span>
                ))}
            </div>
        </div>
    )
    return (
        <div>
            <div style={{ display: "flex", gap: 2, marginBottom: 14, flexWrap: "wrap" }}>
                {tabs.map((t, i) => (
                    <button key={t} onClick={() => setTab(i)} style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.18em", padding: "9px 16px", cursor: "pointer", background: tab === i ? "#16202e" : "transparent", color: tab === i ? WHITE : DIM, border: `1px solid ${tab === i ? BLUE + "66" : LINE2}` }}>{t}</button>
                ))}
            </div>
            {tab === 0 && diagram("WIND LOAD DISTRIBUTION", "linear-gradient(100deg,rgba(62,201,126,0.25) 0%,rgba(183,201,74,0.25) 40%,rgba(224,145,60,0.3) 70%,rgba(226,85,85,0.4) 100%)", `DESIGN PRESSURE: ${p.dp}  /  WATER DP: ${p.water}`, true)}
            {tab === 1 && diagram("DEFLECTION ENVELOPE — L/175 LIMIT", "radial-gradient(ellipse 90% 130% at 50% -30%,rgba(78,163,242,0.35) 0%,rgba(62,201,126,0.18) 60%,transparent 100%)", `ALLOWABLE DEFLECTION: SPAN/175  /  MAX SPAN: ${p.span}`, false)}
            {tab === 2 && diagram("THERMAL GRADIENT — INT/EXT", "linear-gradient(90deg,rgba(226,85,85,0.35) 0%,rgba(224,145,60,0.25) 35%,rgba(78,163,242,0.3) 100%)", p.thermal ? "THERMALLY BROKEN PROFILE — SIMULATIONS UPON REQUEST" : "THERMALLY IMPROVED — SIMULATIONS UPON REQUEST", false)}
            {tab === 3 && diagram("MISSILE IMPACT ZONES", "radial-gradient(circle at 30% 40%,rgba(226,85,85,0.4) 0%,transparent 25%),radial-gradient(circle at 68% 62%,rgba(226,85,85,0.35) 0%,transparent 22%),linear-gradient(180deg,rgba(78,163,242,0.12),rgba(78,163,242,0.05))", `IMPACT RATING: ${p.fbc.rating.toUpperCase()}`, false)}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 8, marginTop: 14 }}>
                {stats.map(([k, v]) => (
                    <div key={k} style={{ background: PANEL2, border: `1px solid ${LINE2}`, padding: "12px 14px" }}>
                        <MonoLabel size={8}>{k}</MonoLabel>
                        <div style={{ fontFamily: MONO, fontSize: 15, color: BLUE_TXT, marginTop: 6 }}>{v}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ─── RFI FORM ────────────────────────────────────────────────────────────────
function RFIForm({ p }: { p: (typeof PRODUCTS)[0] }) {
    const [f, setF] = useState<Record<string, string>>({})
    const set = (k: string) => (e: any) => setF((s) => ({ ...s, [k]: e.target.value }))
    const inputStyle = { width: "100%", background: "#0c111a", border: `1px solid ${LINE}`, color: WHITE, fontFamily: "'Jost',sans-serif", fontSize: 13, padding: "11px 12px", outline: "none", boxSizing: "border-box" as const }
    const field = (k: string, label: string, ph = "", opts?: { full?: boolean; area?: boolean; options?: string[] }) => (
        <div key={k} style={{ gridColumn: opts?.full ? "1 / -1" : "auto" }}>
            <div style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.22em", color: DIM, marginBottom: 7, textTransform: "uppercase" }}>{label}</div>
            {opts?.area ? (
                <textarea rows={4} placeholder={ph} value={f[k] || ""} onChange={set(k)} style={{ ...inputStyle, resize: "vertical" }} />
            ) : opts?.options ? (
                <select value={f[k] || opts.options[0]} onChange={set(k)} style={inputStyle}>
                    {opts.options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
            ) : (
                <input placeholder={ph} value={f[k] || ""} onChange={set(k)} style={inputStyle} />
            )}
        </div>
    )
    const submit = () => {
        const body = [
            `REQUEST FOR INFORMATION — ${p.series} ${p.name}`,
            `Name: ${f.name || ""}`, `Company: ${f.company || ""}`, `Email: ${f.email || ""}`, `Phone: ${f.phone || ""}`,
            `Project: ${f.project || ""} — ${f.location || ""}`, `Facade area: ${f.area || ""}`,
            `Finish: ${f.finish || "Mill Finish"}`, `Request type: ${f.type || "Request for Information (RFI)"}`,
            `Timeline: ${f.timeline || "Immediate — under review"}`, ``, `${f.desc || ""}`,
        ].join("\n")
        window.location.href = `mailto:info@nrfacade.com?subject=${encodeURIComponent(`RFI — ${p.series} ${p.name}`)}&body=${encodeURIComponent(body)}`
    }
    return (
        <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 18px" }}>
                {field("name", "FULL NAME", "John Smith")}
                {field("company", "COMPANY / PRACTICE", "Smith Architects LLC")}
                {field("email", "EMAIL", "j.smith@company.com")}
                {field("phone", "PHONE", "+1 000 000 0000")}
                {field("project", "PROJECT NAME", "The Grand Tower")}
                {field("location", "PROJECT LOCATION", "Miami, FL")}
                {field("area", "APPROX. FACADE AREA", "e.g. 50,000 sq ft")}
                {field("finish", "REQUIRED FINISH", "", { options: FINISHES.map((x) => x.name) })}
                {field("type", "REQUEST TYPE", "", { options: ["Request for Information (RFI)", "Budget Pricing", "Design Assist", "Full Specification Package"] })}
                {field("timeline", "TIMELINE", "", { options: ["Immediate — under review", "3–6 months", "6–12 months", "12+ months"] })}
                {field("desc", "PROJECT DESCRIPTION & REQUIREMENTS", "Describe the project, building type, floor count, wind zone, glazing requirements, special features, code requirements, phasing…", { full: true, area: true })}
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start", margin: "18px 0", padding: "14px 16px", background: "rgba(224,145,60,0.06)", borderLeft: `2px solid ${ORANGE}` }}>
                <span style={{ color: ORANGE, fontSize: 13, lineHeight: 1 }}>⚡</span>
                <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 11.5, color: GREY, lineHeight: 1.6 }}>
                    NR Group provides full Design Assist — from concept through fabrication. Thermal simulations, PE-stamped drawings, FBC approvals and full NOA documentation included with confirmed projects. Contact: 4348 Westroads Dr, West Palm Beach, FL 33407 · 561 844 1121 · info@nrfacade.com
                </div>
            </div>
            <BlueBtn onClick={submit} full>SUBMIT RFI&nbsp;&nbsp;→</BlueBtn>
        </div>
    )
}

// ─── DETAIL VIEW — TABBED SPECIFICATION MODAL ────────────────────────────────
function DetailView({ p, onClose }: { p: (typeof PRODUCTS)[0]; onClose: () => void }) {
    const [fin, setFin] = useState(0)
    const [tab, setTab] = useState(0)
    const c = FINISHES[fin]
    const certs = ["FBC Impact", p.fbc.lmi !== "—" ? p.fbc.lmi : null, p.fbc.smi !== "—" ? p.fbc.smi : null, "Miami-Dade NOA", "AAMA 501"].filter(Boolean) as string[]
    const TABS = ["SPECIFICATIONS", "PERFORMANCE", "APPLICATIONS", "SIMULATION", "RFI / ORDER"]
    const depth = p.sub.match(/^[\d\-\/]+"/) ? p.sub.split('"')[0] + '"' : "—"

    return (
        <div style={{ border: `1px solid ${LINE}`, background: PANEL }}>
            {/* ── Header bar ── */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 28px", borderBottom: `1px solid ${LINE2}` }}>
                <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.2em", color: BLUE_TXT }}>← ALL SYSTEMS</button>
                <MonoLabel color={BLUE_TXT} size={10}>{p.series}</MonoLabel>
                <div style={{ width: 100 }} />
            </div>

            {/* ── Tab bar ── */}
            <div style={{ display: "flex", alignItems: "center", borderBottom: `1px solid ${LINE2}`, padding: "0 28px", overflowX: "auto" }}>
                {TABS.map((t, i) => (
                    <button
                        key={t}
                        onClick={() => setTab(i)}
                        style={{
                            fontFamily: MONO, fontSize: 10, letterSpacing: "0.18em",
                            padding: "15px 22px", cursor: "pointer",
                            background: "transparent", border: "none",
                            borderBottom: tab === i ? `2px solid ${BLUE}` : "2px solid transparent",
                            color: tab === i ? WHITE : DIM,
                            marginBottom: -1, whiteSpace: "nowrap", flexShrink: 0,
                        }}
                    >{t}</button>
                ))}
                <button
                    onClick={onClose}
                    style={{
                        marginLeft: "auto", background: "none", border: `1px solid ${LINE}`,
                        cursor: "pointer", fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em",
                        color: GREY, padding: "8px 16px", flexShrink: 0,
                    }}
                >✕</button>
            </div>

            {/* ── Two-column layout ── */}
            <div className="aps-detail-grid" style={{ display: "grid", gridTemplateColumns: "360px 1fr" }}>

                {/* LEFT — sticky 3D viewer */}
                <div style={{ padding: "24px 24px 32px", borderRight: `1px solid ${LINE2}`, position: "sticky", top: 0, alignSelf: "start", maxHeight: "calc(100vh - 160px)", overflowY: "auto" }}>
                    <h3 style={{ fontFamily: COND, fontWeight: 700, fontSize: 26, letterSpacing: "0.02em", color: WHITE, margin: "0 0 4px", textTransform: "uppercase" }}>{p.name}</h3>
                    <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, color: GREY, marginBottom: 18 }}>{p.sub}</div>
                    <Viewer3D kind={p.model} c={c} h={300} scale={1.1} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "14px 0 6px" }}>
                        <MonoLabel>FINISH</MonoLabel>
                        <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, color: GREY }}>{c.name.split("(")[0].trim()}</div>
                    </div>
                    <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                        {FINISHES.map((x, i) => (
                            <button key={i} onClick={() => setFin(i)} title={x.name} style={{ width: 38, height: 28, cursor: "pointer", background: x.sw, border: i === fin ? `2px solid ${BLUE}` : `1px solid ${LINE}`, boxShadow: i === fin ? `0 0 12px ${BLUE}55` : "none" }} />
                        ))}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 20 }}>
                        {certs.map((t) => <CertChip key={t} t={t} />)}
                    </div>
                </div>

                {/* RIGHT — tab content */}
                <div style={{ padding: "24px 28px 40px", overflowY: "auto" }}>

                    {/* SPECIFICATIONS */}
                    {tab === 0 && (
                        <div>
                            <GroupHead>SYSTEM SPECIFICATIONS</GroupHead>
                            <SpecRow k="SYSTEM" v={`${p.sub.split("—")[0].trim()} ${p.sys}`} />
                            <SpecRow k="FRAME DEPTH" v={depth} />
                            <SpecRow k="CORNER WELDS" v="45 degree" />
                            <SpecRow k="COLOR OPTIONS" v="Two tone (int/ext)" />
                            <SpecRow k="JOINTS" v="Male/Female" />
                            <SpecRow k="FASTENERS" v="18-8 stainless steel" />
                            <SpecRow k="SEALANT" v="Dow Corning Silicone" />
                            <SpecRow k="GLAZING OPTIONS" v={p.glazing} />
                            <SpecRow k="CONFIGURATIONS" v={p.config} />
                            <SpecRow k="INSTALLATION" v={p.install} />
                            <GroupHead>AVAILABLE FINISHES</GroupHead>
                            {FINISHES.map((x) => <SpecRow key={x.name} k="FINISH" v={x.name} />)}
                            <GroupHead>FBC / CODE DATA</GroupHead>
                            <SpecRow k="FBC CODE" v={p.fbc.code} blue />
                            <SpecRow k="UNIT SIZE" v={p.fbc.unit} blue />
                            <SpecRow k="DESIGN PRESSURE" v={p.fbc.design} blue />
                            <SpecRow k="WATER DP" v={p.water} blue />
                            <SpecRow k="IMPACT RATING" v={p.fbc.rating} blue />
                            <SpecRow k="LMI FBC NO." v={p.fbc.lmi} blue />
                            <SpecRow k="SMI FBC NO." v={p.fbc.smi} blue />
                            <GroupHead>SUPPLY & SERVICE</GroupHead>
                            {SUPPLY.map(([k, v]) => <SpecRow key={k} k={k} v={v} />)}
                        </div>
                    )}

                    {/* PERFORMANCE */}
                    {tab === 1 && (
                        <div>
                            <GroupHead>PERFORMANCE DATA</GroupHead>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 8, margin: "12px 0 24px" }}>
                                {[["DESIGN PRESSURE", p.dp], ["WATER DP", p.water], ["MAX SPAN", p.span], ["UNIT WIDTH", p.unitW], ["IMPACT", p.impact]].map(([k, v]) => (
                                    <div key={k} style={{ background: PANEL2, border: `1px solid ${LINE2}`, padding: "12px 14px" }}>
                                        <MonoLabel size={8}>{k}</MonoLabel>
                                        <div style={{ fontFamily: MONO, fontSize: 14, color: BLUE_TXT, marginTop: 6 }}>{v}</div>
                                    </div>
                                ))}
                            </div>
                            <PerfTabs p={p} />
                            <GroupHead>FEATURES & BENEFITS</GroupHead>
                            {p.features.map((ft: string) => <SpecRow key={ft} k="—" v={ft} />)}
                        </div>
                    )}

                    {/* APPLICATIONS */}
                    {tab === 2 && (
                        <div>
                            <GroupHead>MARKET APPLICATIONS</GroupHead>
                            <div className="aps-markets" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
                                {MARKETS.map((m) => (
                                    <div key={m.t} style={{ background: PANEL2, border: `1px solid ${LINE2}`, borderLeft: `2px solid ${m.c}`, padding: "14px 16px" }}>
                                        <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", color: WHITE, marginBottom: 7 }}>{m.t}</div>
                                        <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 11.5, color: GREY, lineHeight: 1.6 }}>{m.d}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: 16, padding: "16px 18px", background: PANEL2, border: `1px solid ${LINE2}` }}>
                                <MonoLabel color={BLUE_TXT}>TYPICAL SECTORS</MonoLabel>
                                <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, color: GREY, lineHeight: 1.7, marginTop: 8 }}>
                                    Commercial · Hospitality · Residential High-Rise — NR Group has delivered this system across North America and the Caribbean for major hotel brands, casino operators, airport authorities, residential developers and government bodies.
                                </div>
                            </div>
                            <div style={{ marginTop: 10, padding: "16px 18px", background: PANEL2, border: `1px solid ${LINE2}` }}>
                                <MonoLabel color={BLUE_TXT}>DESIGN ASSIST AVAILABLE</MonoLabel>
                                <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, color: GREY, lineHeight: 1.7, marginTop: 8 }}>
                                    NR provides full Design Assist from concept through fabrication. No challenge is too complex — NR has engineered solutions for curved geometry (Seminole Hard Rock), ultra-high wind loads (LF Wade Airport Bermuda) and bespoke facade configurations (Jade Signature by Herzog &amp; de Meuron).
                                </div>
                            </div>
                            <div style={{ marginTop: 10, padding: "16px 18px", background: PANEL2, border: `1px solid ${LINE2}` }}>
                                <MonoLabel color={BLUE_TXT}>TAGS</MonoLabel>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                                    {p.tags.map((t) => <Tag key={t} t={t} />)}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SIMULATION */}
                    {tab === 3 && (
                        <div>
                            <GroupHead>THERMAL SIMULATION</GroupHead>
                            <div style={{ marginBottom: 20, padding: "14px 16px", background: PANEL2, border: `1px solid ${LINE2}`, borderLeft: `2px solid ${BLUE}` }}>
                                <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, color: GREY, lineHeight: 1.7 }}>
                                    {p.thermal
                                        ? "This system features a thermally broken profile. Full thermal simulations are available upon request — including U-Value, condensation resistance factor (CRF), and compliance with ASHRAE 90.1 and Florida Energy Code."
                                        : "This system is thermally improved. Thermal simulations are available upon request for project-specific energy compliance documentation."}
                                </div>
                            </div>
                            <PerfTabs p={p} />
                            <GroupHead>STRUCTURAL SIMULATION</GroupHead>
                            <div style={{ padding: "14px 16px", background: PANEL2, border: `1px solid ${LINE2}`, borderLeft: `2px solid ${GREEN}`, marginTop: 12 }}>
                                <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, color: GREY, lineHeight: 1.7 }}>
                                    PE-stamped engineering drawings included with all confirmed orders. Structural calculations cover wind load, deflection, anchor design and mullion sizing to project-specific criteria. Impact test reports per FBC and Miami-Dade NOA available upon request.
                                </div>
                            </div>
                        </div>
                    )}

                    {/* RFI / ORDER */}
                    {tab === 4 && (
                        <div>
                            <GroupHead>SUBMIT RFI — {p.series}</GroupHead>
                            <div style={{ marginTop: 14 }}><RFIForm p={p} /></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// ─── PRODUCT CARD ────────────────────────────────────────────────────────────
function Card({ p, onOpen }: { p: (typeof PRODUCTS)[0]; onOpen: () => void }) {
    return (
        <div style={{ background: PANEL, border: `1px solid ${LINE}`, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: `1px solid ${LINE2}` }}>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.24em", color: BLUE_TXT }}>{p.series}</div>
                <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: "0.18em", color: DIM, border: `1px solid ${LINE}`, padding: "3px 8px" }}>{p.chip}</div>
            </div>
            <Viewer3D kind={p.model} c={FINISHES[0]} h={225} scale={0.82} />
            <div style={{ padding: "16px 16px 18px", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{ fontFamily: COND, fontWeight: 700, fontSize: 21, letterSpacing: "0.02em", color: WHITE, margin: 0, textTransform: "uppercase" }}>{p.name}</h3>
                <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, color: GREY, margin: "5px 0 14px" }}>{p.sub}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", border: `1px solid ${LINE2}`, marginBottom: 13 }}>
                    {[["MAX DP", p.dp], ["WATER DP", p.water], ["UNIT W", p.span], ["IMPACT", p.impact]].map(([k, v], i) => (
                        <div key={k} style={{ padding: "8px 9px", borderLeft: i ? `1px solid ${LINE2}` : "none" }}>
                            <div style={{ fontFamily: MONO, fontSize: 7.5, letterSpacing: "0.14em", color: DIM }}>{k}</div>
                            <div style={{ fontFamily: MONO, fontSize: 11, color: WHITE, marginTop: 3, whiteSpace: "nowrap" }}>{v}</div>
                        </div>
                    ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                    {p.tags.map((t) => <Tag key={t} t={t} />)}
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: "auto" }}>
                    <BlueBtn onClick={onOpen}>FULL SPECIFICATION</BlueBtn>
                    <DarkBtn onClick={onOpen}>SUBMIT RFI</DarkBtn>
                </div>
            </div>
        </div>
    )
}

// ─── SECTION ─────────────────────────────────────────────────────────────────
function Section() {
    const [sys, setSys] = useState("ALL")
    const [fbcOnly, setFbcOnly] = useState(false)
    const [thermalOnly, setThermalOnly] = useState(false)
    const [q, setQ] = useState("")
    const [open, setOpen] = useState<string | null>(null)
    const filtered = PRODUCTS.filter((p) => {
        if (sys !== "ALL" && p.sys !== sys) return false
        if (fbcOnly && !p.tags.includes("FBC IMPACT")) return false
        if (thermalOnly && !p.thermal) return false
        if (q) {
            const hay = `${p.series} ${p.name} ${p.sub} ${p.tags.join(" ")}`.toLowerCase()
            if (!hay.includes(q.toLowerCase())) return false
        }
        return true
    })
    const sel = PRODUCTS.find((p) => p.id === open)
    const fBtn = (label: string, active: boolean, onClick: () => void, blue = false) => (
        <button key={label} onClick={onClick} style={{
            fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.18em", padding: "9px 16px", cursor: "pointer",
            background: active && blue ? BLUE : "transparent",
            color: active ? (blue ? "#fff" : WHITE) : DIM,
            border: `1px solid ${active ? (blue ? BLUE : "rgba(255,255,255,0.5)") : LINE}`,
            whiteSpace: "nowrap",
        }}>{label}</button>
    )
    return (
        <section id="product-systems" style={{ background: BG, padding: "110px 48px", width: "100%", boxSizing: "border-box" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
                #product-systems *{box-sizing:border-box;}
                #product-systems ::placeholder{color:#566077;opacity:1;}
                #product-systems select option{background:#0c111a;color:#eef1f6;}
                @media(max-width:1100px){#product-systems .aps-detail-grid{grid-template-columns:1fr !important;}}
                @media(max-width:900px){#product-systems .aps-grid{grid-template-columns:1fr !important;}#product-systems .aps-markets{grid-template-columns:1fr !important;}#product-systems{padding:80px 20px !important;}}
            `}</style>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 36 }}>
                    <span style={{ display: "inline-block", fontFamily: MONO, fontSize: 11, letterSpacing: "0.34em", color: GREY, border: `1px solid ${LINE}`, padding: "10px 22px" }}>
                        <span style={{ color: BLUE_TXT }}>//</span>&nbsp;&nbsp;ARCHITECTURAL PRODUCT SYSTEMS
                    </span>
                </div>
                {/* FILTER BAR */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                    <MonoLabel size={9}>SYSTEM&nbsp;//</MonoLabel>
                    {fBtn("ALL", sys === "ALL", () => setSys("ALL"), true)}
                    {fBtn("CURTAIN WALL", sys === "CURTAIN WALL", () => setSys("CURTAIN WALL"))}
                    {fBtn("WINDOW WALL", sys === "WINDOW WALL", () => setSys("WINDOW WALL"))}
                    {fBtn("DOORS", sys === "DOORS", () => setSys("DOORS"))}
                    <span style={{ width: 8 }} />
                    <MonoLabel size={9}>TYPE&nbsp;//</MonoLabel>
                    {fBtn("FBC IMPACT", fbcOnly, () => setFbcOnly(!fbcOnly))}
                    {fBtn("THERMAL BREAK", thermalOnly, () => setThermalOnly(!thermalOnly))}
                    <div style={{ marginLeft: "auto", position: "relative" }}>
                        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search series, system, feature…" style={{ background: "#0c111a", border: `1px solid ${LINE}`, color: WHITE, fontFamily: "'Jost',sans-serif", fontSize: 12, padding: "10px 14px 10px 32px", width: 230, outline: "none" }} />
                        <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: DIM, fontSize: 12 }}>⌕</span>
                    </div>
                </div>
                <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.2em", color: DIM, marginBottom: 22 }}>
                    Showing {filtered.length} of {PRODUCTS.length} product systems
                </div>
                {/* GRID or DETAIL */}
                {sel ? (
                    <DetailView p={sel} onClose={() => setOpen(null)} />
                ) : (
                    <div className="aps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(330px,1fr))", gap: 18 }}>
                        {filtered.map((p) => <Card key={p.id} p={p} onOpen={() => setOpen(p.id)} />)}
                    </div>
                )}
            </div>
        </section>
    )
}

// ─── PORTAL WRAPPER ──────────────────────────────────────────────────────────
export default function ArchitecturalProductSystems() {
    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const [host, setHost] = useState<HTMLElement | null>(null)
    const selfRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (isCanvas) return
        let div: HTMLDivElement | null = null
        let tries = 0
        const timer = setInterval(() => {
            tries++
            const about = document.getElementById("about")
            if (about && about.parentElement) {
                clearInterval(timer)
                let anchor: Element = about
                const prev = about.previousElementSibling
                if (prev && prev.tagName === "SECTION" && !(prev as HTMLElement).id) anchor = prev
                div = document.createElement("div")
                div.style.width = "100%"
                about.parentElement.insertBefore(div, anchor)
                let el: HTMLElement | null = div.parentElement
                while (el && el !== document.body) {
                    const ih = el.style.height || getComputedStyle(el).height
                    if (ih && ih.endsWith("px")) { el.style.height = "auto"; el.style.minHeight = "0" }
                    el = el.parentElement
                }
                const wrap = selfRef.current?.parentElement
                if (wrap) { wrap.style.height = "0px"; wrap.style.minHeight = "0"; wrap.style.overflow = "hidden" }
                setHost(div)
            } else if (tries > 80) clearInterval(timer)
        }, 100)
        return () => { clearInterval(timer); if (div) div.remove() }
    }, [])
    if (isCanvas)
        return (
            <div style={{ width: "100%", height: "100%", minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center", background: BG, border: `1px dashed ${BLUE}66`, gap: 14 }}>
                <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.3em", color: BLUE_TXT }}>// ARCHITECTURAL PRODUCT SYSTEMS</span>
                <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, color: GREY }}>renders after the Projects grid — open Preview ▶ or publish to interact</span>
            </div>
        )
    return (
        <div ref={selfRef} style={{ width: "100%", height: 0, overflow: "hidden" }}>
            {host ? createPortal(<Section />, host) : null}
        </div>
    )
}
