import { addPropertyControls } from "framer"
import { useState, useEffect, useRef } from "react"
import ArchitecturalProductSystems from "./ArchitecturalProductSystems.tsx"

// ─── THEME CONSTANTS ─────────────────────────────────────────────────────────
const BG_BASE = "#05070b"; const BG_SURFACE = "#090d15"; const BG_RAISED = "#0f1626"
const BG_FLOAT = "#152038"; const BG_MID = "#0a0f1a"
const TEXT_PRIMARY = "#f2f5fa"; const TEXT_SECONDARY = "#929eb8"; const TEXT_SUBTLE = "#4f5a72"
const GOLD = "#3f9bf0"; const GOLD_DIM = "rgba(63,155,240,0.55)"; const GOLD_GLOW = "rgba(63,155,240,0.15)"
const EDGE_LIGHT = "rgba(255,255,255,0.06)"; const GLASS_BG = "rgba(255,255,255,0.035)"
const GLASS_BORDER = "rgba(255,255,255,0.08)"; const DIVIDER = "rgba(255,255,255,0.055)"
const SHADOW_SM = "0 2px 8px rgba(0,0,0,0.4),0 1px 2px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.06)"
const SHADOW_MD = "0 8px 32px rgba(0,0,0,0.5),0 2px 8px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.07)"
const SHADOW_LG = "0 20px 60px rgba(0,0,0,0.6),0 8px 24px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.08)"
const SHADOW_XL = "0 40px 80px rgba(0,0,0,0.7),0 16px 40px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.09)"
const GOLD_SHADOW = `0 0 40px ${GOLD_GLOW},0 8px 32px rgba(0,0,0,0.5)`

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;scroll-padding-top:72px;}
body{overflow-x:hidden;}
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-track{background:${BG_BASE};}
::-webkit-scrollbar-thumb{background:${GOLD_DIM};border-radius:2px;}
::selection{background:${GOLD_GLOW};color:${TEXT_PRIMARY};}
@keyframes fadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes modalIn{from{opacity:0;transform:scale(0.95) translateY(18px)}to{opacity:1;transform:scale(1) translateY(0)}}
@keyframes slideInRight{from{opacity:0;transform:translateX(50px)}to{opacity:1;transform:translateX(0)}}
@keyframes typingBlink{0%,100%{opacity:0.3}50%{opacity:1}}
@keyframes pulseRing{0%{transform:scale(1);opacity:0.7}100%{transform:scale(1.6);opacity:0}}
@keyframes floatY{0%,100%{transform:translateY(0px)}50%{transform:translateY(-18px)}}
@keyframes floatRotate{0%{transform:translateY(0px) rotate(0deg)}50%{transform:translateY(-14px) rotate(1.5deg)}100%{transform:translateY(0px) rotate(0deg)}}
@keyframes glowPulse{0%,100%{box-shadow:0 0 20px rgba(63,155,240,0.15)}50%{box-shadow:0 0 60px rgba(63,155,240,0.35),0 0 120px rgba(63,155,240,0.08)}}
@keyframes shimmerLine{0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}
.hero-loaded .h-label{animation:fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.15s both;}
.hero-loaded .h-title{animation:fadeUp 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s both;}
.hero-loaded .h-sub{animation:fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.5s both;}
.hero-loaded .h-cta{animation:fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s both;}
.hero-loaded .h-stats{animation:fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.8s both;}
.nr-reveal{opacity:0;transform:translateY(36px) translateZ(-20px);transition:opacity 1s cubic-bezier(0.22,1,0.36,1),transform 1s cubic-bezier(0.22,1,0.36,1);}
.nr-reveal.nr-visible{opacity:1;transform:translateY(0) translateZ(0);}
.nr-reveal-delay-1{transition-delay:0.1s;}
.nr-reveal-delay-2{transition-delay:0.2s;}
.nr-reveal-delay-3{transition-delay:0.34s;}
.nr-reveal-delay-4{transition-delay:0.48s;}
.tilt-card{transition:transform 0.18s ease,box-shadow 0.18s ease;transform-style:preserve-3d;will-change:transform;}
.tilt-card:hover{z-index:10;}
.float-card{animation:floatY 6s ease-in-out infinite;will-change:transform;}
.float-card:nth-child(2n){animation:floatRotate 7s ease-in-out infinite;}
.float-card:nth-child(3n){animation:floatY 8s ease-in-out infinite 1s;}
section{position:relative;}
section+section{margin-top:-2px;}
.section-cinematic::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(to right,transparent,rgba(63,155,240,0.2),transparent);z-index:2;}
.shimmer-heading{position:relative;display:inline-block;overflow:hidden;}
.shimmer-heading::after{content:'';position:absolute;top:0;left:0;width:40%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.055),transparent);animation:shimmerLine 3.5s ease infinite;pointer-events:none;}
.gold-glow-el{animation:glowPulse 3.5s ease-in-out infinite;}
.proj-card{position:relative;overflow:hidden;cursor:pointer;border-radius:3px;border:1px solid ${GLASS_BORDER};box-shadow:${SHADOW_MD};transition:transform 0.4s cubic-bezier(0.16,1,0.3,1),box-shadow 0.4s cubic-bezier(0.16,1,0.3,1),border-color 0.4s ease;transform-style:preserve-3d;will-change:transform;}
.proj-card::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.04) 0%,transparent 50%);opacity:0;transition:opacity 0.4s ease;pointer-events:none;z-index:5;}
.proj-card:hover::after{opacity:1;}
.proj-card:hover{transform:translateY(-10px) scale(1.02);box-shadow:0 32px 80px rgba(0,0,0,0.7),0 8px 30px rgba(63,155,240,0.12),inset 0 1px 0 rgba(255,255,255,0.08);border-color:rgba(63,155,240,0.3);}
.proj-card img{width:100%;height:100%;object-fit:cover;opacity:0.18;transition:transform 1s cubic-bezier(0.16,1,0.3,1),opacity 0.6s ease;}
.proj-card:hover img{transform:scale(1.25);opacity:0.65;}
.prod-card{background:linear-gradient(145deg,${BG_RAISED},${BG_SURFACE});border:1px solid ${GLASS_BORDER};border-radius:3px;overflow:hidden;box-shadow:${SHADOW_MD};transition:box-shadow 0.4s cubic-bezier(0.16,1,0.3,1),transform 0.4s cubic-bezier(0.16,1,0.3,1),border-color 0.4s ease;position:relative;transform-style:preserve-3d;}
.prod-card::before{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,rgba(255,255,255,0.04) 0%,transparent 60%);pointer-events:none;z-index:0;}
.prod-card:hover{box-shadow:${SHADOW_LG},0 0 0 1px rgba(63,155,240,0.25),0 0 60px rgba(63,155,240,0.06);transform:translateY(-8px) rotateX(1deg);border-color:rgba(63,155,240,0.35);}
.exp-row{border-top:1px solid ${DIVIDER};padding:28px 0;cursor:pointer;transition:all 0.3s ease;}
.exp-row:last-child{border-bottom:1px solid ${DIVIDER};}
.exp-row:hover{opacity:0.88;padding-left:8px;}
.prof-card{border-top:1px solid ${DIVIDER};padding-top:28px;transition:opacity 0.3s,transform 0.3s;}
.prof-card:hover{opacity:0.88;transform:translateY(-4px);}
.mrq-track{display:flex;gap:72px;width:max-content;animation:marquee 26s linear infinite;}
.mrq-track:hover{animation-play-state:paused;}
.ai-panel{position:fixed;bottom:88px;right:20px;width:420px;height:75vh;max-height:750px;background:linear-gradient(145deg,${BG_RAISED},${BG_SURFACE});border:1px solid ${GLASS_BORDER};border-top:1px solid ${EDGE_LIGHT};border-radius:14px 14px 4px 4px;box-shadow:${SHADOW_XL};display:flex;flex-direction:column;overflow:hidden;z-index:400;animation:slideInRight 0.35s cubic-bezier(0.16,1,0.3,1);}
.ai-messages{flex:1;overflow-y:auto;padding:16px 14px 8px;scroll-behavior:smooth;}
.ai-messages::-webkit-scrollbar{width:2px;}
.ai-messages::-webkit-scrollbar-thumb{background:${GOLD_DIM};border-radius:1px;}
.ai-input-row{display:flex;gap:8px;padding:10px 12px;border-top:1px solid ${DIVIDER};background:rgba(0,0,0,0.2);}
.ai-input-row input{flex:1;background:rgba(255,255,255,0.05);border:1px solid ${GLASS_BORDER};color:${TEXT_PRIMARY};font-family:'Jost',sans-serif;font-size:12px;font-weight:300;padding:9px 12px;outline:none;border-radius:6px;transition:border-color 0.3s;}
.ai-input-row input:focus{border-color:${GOLD};}
.ai-input-row input::placeholder{color:${TEXT_SUBTLE};}
.ai-send{background:linear-gradient(135deg,#2f86e0,${GOLD});color:#ffffff;border:none;width:36px;height:36px;border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all 0.2s;flex-shrink:0;box-shadow:0 2px 12px rgba(63,155,240,0.35);}
.ai-send:hover{background:linear-gradient(135deg,#4ea7ff,#2f86e0);transform:translateY(-1px);}
.ai-fab{position:fixed;bottom:20px;right:20px;z-index:401;width:52px;height:52px;background:linear-gradient(135deg,#2f86e0,${GOLD},#1a64b8);border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 32px rgba(63,155,240,0.5),0 4px 12px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.3);transition:all 0.3s;font-size:19px;}
.ai-fab:hover{transform:scale(1.08) translateY(-2px);box-shadow:0 12px 40px rgba(63,155,240,0.65),0 6px 16px rgba(0,0,0,0.4);}
.ai-fab-ring{position:fixed;bottom:20px;right:20px;z-index:400;width:52px;height:52px;border-radius:50%;border:2px solid rgba(63,155,240,0.4);pointer-events:none;animation:pulseRing 2.5s ease infinite;}
.typing-dot{display:inline-block;width:5px;height:5px;border-radius:50%;background:${GOLD};animation:typingBlink 1.2s ease infinite;margin:0 2px;}
.typing-dot:nth-child(2){animation-delay:0.2s;}.typing-dot:nth-child(3){animation-delay:0.4s;}
.tab-btn{font-family:'Jost',sans-serif;font-size:9px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;border:none;padding:6px 14px;cursor:pointer;border-radius:4px;transition:all 0.2s;}
.tab-btn.on{background:${GOLD_GLOW};color:${GOLD};border:1px solid ${GOLD_DIM};}
.tab-btn.off{background:transparent;color:${TEXT_SUBTLE};border:1px solid transparent;}
.tab-btn.off:hover{color:${TEXT_SECONDARY};}
.ctrl-sel{background:rgba(255,255,255,0.05);border:1px solid ${GLASS_BORDER};color:${TEXT_PRIMARY};font-family:'Jost',sans-serif;font-size:10px;font-weight:300;padding:5px 8px;border-radius:4px;outline:none;width:100%;cursor:pointer;transition:border-color 0.2s;}
.ctrl-sel:focus{border-color:${GOLD};}
.ctrl-sel option{background:${BG_SURFACE};}
.swatch{width:18px;height:18px;border-radius:3px;cursor:pointer;border:1px solid rgba(255,255,255,0.15);transition:all 0.15s;flex-shrink:0;}
.swatch:hover{transform:scale(1.2);}
.swatch.active{border-color:${GOLD};box-shadow:0 0 8px ${GOLD_GLOW};}
.ai-quick-btn{background:rgba(63,155,240,0.08);border:1px solid rgba(63,155,240,0.25);color:${TEXT_SECONDARY};font-family:'Jost',sans-serif;font-size:10px;font-weight:300;padding:5px 10px;border-radius:4px;cursor:pointer;transition:all 0.2s;white-space:nowrap;}
.ai-quick-btn:hover{background:rgba(63,155,240,0.16);border-color:${GOLD};color:${TEXT_PRIMARY};}
@media (max-width:1024px){.nr-nav-links{gap:28px !important;}.nr-nav-pad{padding:0 32px !important;}.hero-content{padding:0 40px !important;}.hero-title{font-size:clamp(44px,7vw,80px) !important;}.section-pad{padding:80px 40px !important;}.grid-3{grid-template-columns:repeat(2,1fr) !important;}.grid-4{grid-template-columns:repeat(2,1fr) !important;}.grid-2{grid-template-columns:1fr !important;gap:56px !important;}.stat-strip{flex-wrap:wrap !important;}.stat-strip>div{flex:1 1 40% !important;}.ai-panel{width:360px !important;right:16px !important;}.footer-grid{grid-template-columns:1fr 1fr !important;gap:40px !important;}}
@media (max-width:767px){.nr-nav-links{display:none !important;}.nr-nav-pad{padding:0 20px !important;height:60px !important;}.btn-rfi{padding:7px 14px !important;font-size:9px !important;}.hero-content{padding:0 20px !important;}.hero-title{font-size:clamp(36px,10vw,60px) !important;line-height:1 !important;}.hero-cta-row{flex-direction:column !important;gap:10px !important;}.hero-cta-row button{width:100% !important;}.stat-strip{display:grid !important;grid-template-columns:1fr 1fr !important;}.grid-3,.grid-4,.grid-2,.footprint-grid,.metrics-row,.footer-grid{grid-template-columns:1fr !important;gap:16px !important;}.section-h2{font-size:clamp(32px,9vw,52px) !important;}.proj-card{height:260px !important;grid-column:span 1 !important;}.ai-panel{width:calc(100vw - 24px) !important;right:12px !important;bottom:76px !important;height:70vh !important;}.ai-fab,.ai-fab-ring{bottom:16px !important;right:16px !important;width:46px !important;height:46px !important;}.footer-pad{padding:56px 20px 32px !important;}.float-card{animation:none !important;}.tilt-card{transform:none !important;}}
@media (max-width:390px){.hero-title{font-size:34px !important;}.section-h2{font-size:28px !important;}}
@media (hover:none){.tilt-card{transform:none !important;transition:none !important;}.float-card{animation:none !important;}.proj-card:hover{transform:translateY(-4px) !important;}.shimmer-heading::after{display:none;}}
.nav-lnk{font-family:'Jost',sans-serif;font-size:12px;font-weight:400;letter-spacing:0.12em;text-transform:uppercase;color:${TEXT_SECONDARY};cursor:pointer;position:relative;transition:color 0.25s;}
.nav-lnk::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;background:${GOLD};transition:width 0.3s cubic-bezier(0.4,0,0.2,1);}
.nav-lnk:hover{color:${TEXT_PRIMARY};}.nav-lnk:hover::after{width:100%;}
.btn-hero{font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:0.16em;text-transform:uppercase;border:1px solid rgba(255,255,255,0.22);background:rgba(255,255,255,0.03);color:${TEXT_PRIMARY};padding:14px 34px;cursor:pointer;border-radius:2px;backdrop-filter:blur(12px);transition:all 0.28s cubic-bezier(0.4,0,0.2,1);}
.btn-hero:hover{border-color:${GOLD};color:#ffffff;background:rgba(63,155,240,0.10);box-shadow:0 0 24px rgba(63,155,240,0.22);transform:translateY(-1px);}
.btn-dark{font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:0.16em;text-transform:uppercase;background:linear-gradient(135deg,${BG_RAISED},${BG_SURFACE});color:${TEXT_PRIMARY};border:1px solid ${GLASS_BORDER};padding:14px 34px;cursor:pointer;border-radius:2px;transition:all 0.28s cubic-bezier(0.4,0,0.2,1);}
.btn-dark:hover{border-color:rgba(63,155,240,0.6);color:#ffffff;box-shadow:0 0 22px rgba(63,155,240,0.18),0 8px 24px rgba(0,0,0,0.5);transform:translateY(-1px);}
.btn-gold{font-family:'Jost',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;background:linear-gradient(135deg,#2f86e0,#4ea7ff);color:#ffffff;border:none;padding:15px 44px;cursor:pointer;border-radius:2px;box-shadow:0 6px 26px rgba(47,134,224,0.35),0 2px 8px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.18);transition:all 0.28s cubic-bezier(0.4,0,0.2,1);}
.btn-gold:hover{filter:brightness(1.12);box-shadow:0 10px 38px rgba(47,134,224,0.5),0 4px 14px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.22);transform:translateY(-1px);}
.btn-rfi{font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;background:rgba(63,155,240,0.10);border:1px solid rgba(63,155,240,0.45);color:#d8e9ff;padding:9px 22px;cursor:pointer;border-radius:2px;backdrop-filter:blur(12px);transition:all 0.28s cubic-bezier(0.4,0,0.2,1);}
.btn-rfi:hover{background:rgba(63,155,240,0.22);border-color:${GOLD};color:#ffffff;box-shadow:0 0 20px rgba(63,155,240,0.3);}
.slide-ctrl{width:46px;height:46px;background:${GLASS_BG};border:1px solid ${GLASS_BORDER};color:${TEXT_SECONDARY};cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;border-radius:2px;backdrop-filter:blur(12px);box-shadow:${SHADOW_SM};transition:all 0.3s;}
.slide-ctrl:hover{border-color:${GOLD};color:${GOLD};background:${GOLD_GLOW};box-shadow:0 0 16px ${GOLD_GLOW},${SHADOW_SM};}
.flt-btn{font-family:'Jost',sans-serif;font-size:10px;font-weight:400;letter-spacing:0.14em;text-transform:uppercase;background:${GLASS_BG};border:1px solid ${GLASS_BORDER};color:${TEXT_SECONDARY};padding:8px 18px;cursor:pointer;border-radius:2px;backdrop-filter:blur(8px);box-shadow:${SHADOW_SM};transition:all 0.3s;}
.flt-btn.on{border-color:${GOLD};color:${GOLD};background:${GOLD_GLOW};box-shadow:0 0 16px ${GOLD_GLOW},${SHADOW_SM};}
.flt-btn:hover:not(.on){border-color:rgba(255,255,255,0.18);color:${TEXT_PRIMARY};background:rgba(255,255,255,0.06);transform:translateY(-1px);}
.fi-dark{background:transparent;border:none;border-bottom:1px solid rgba(255,255,255,0.12);color:${TEXT_PRIMARY};font-family:'Jost',sans-serif;font-weight:300;font-size:15px;padding:14px 0;width:100%;outline:none;border-radius:0;transition:border-color 0.3s;}
.fi-dark:focus{border-bottom-color:${GOLD};}
.fi-dark::placeholder{color:${TEXT_SUBTLE};}
select.fi-dark option{background:${BG_SURFACE};}
input,select,textarea{appearance:none;}
button{font-family:inherit;}
.serif{font-family:'Cormorant Garamond',serif;}
.sans{font-family:'Jost',sans-serif;}
`

// ─── SITE DATA ────────────────────────────────────────────────────────────────
const PROJECTS = [
    { id:1, num:"01", name:"Seminole Hard Rock Guitar Hotel", location:"Hollywood, FL", year:"2019", category:"Hospitality", system:"NR 8000 Unitized Curtain Wall", architect:"Klai Juba Wald", gc:"Suffolk Construction", img:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=90&fit=crop" },
    { id:2, num:"02", name:"Century Plaza Twin Towers", location:"Los Angeles, CA", year:"2021", category:"Commercial", system:"NR 8000 Unitized Curtain Wall", architect:"Pei Cobb Freed", gc:"Lendlease", img:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=90&fit=crop" },
    { id:3, num:"03", name:"Jade Signature Tower", location:"Sunny Isles, FL", year:"2018", category:"Residential", system:"Custom Unitized Geometry", architect:"Herzog & de Meuron", gc:"Coastal Construction", img:"https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=1600&q=90&fit=crop" },
    { id:4, num:"04", name:"Miami International Airport", location:"Miami, FL", year:"2016", category:"Aviation", system:"NR 5000 + NR 1100", architect:"HNTB Corporation", gc:"Turner Construction", img:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=90&fit=crop" },
    { id:5, num:"05", name:"Nassau Lynden Pindling Airport", location:"Nassau, Bahamas", year:"2015", category:"Aviation", system:"NR 8000 Unitized Curtain Wall", architect:"HOK Architects", gc:"PCL Constructors", img:"https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=1600&q=90&fit=crop" },
    { id:6, num:"06", name:"Shoreline Gateway", location:"Long Beach, CA", year:"2023", category:"Mixed-Use", system:"NR 8000 Unitized Curtain Wall", architect:"SOM Architects", gc:"PCL Constructors", img:"https://images.unsplash.com/photo-1554435493-93422e8220c8?w=1600&q=90&fit=crop" },
    { id:7, num:"07", name:"Nicklaus Children's Hospital", location:"Miami, FL", year:"2018", category:"Healthcare", system:"NR 5000 Curtain Wall", architect:"HDR Architecture", gc:"Skanska USA", img:"https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1600&q=90&fit=crop" },
    { id:8, num:"08", name:"Ritz Carlton Residences Miami", location:"Miami, FL", year:"2021", category:"Residential", system:"NR 8000 + PSG Railings", architect:"Arquitectonica", gc:"Suffolk Construction", img:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=90&fit=crop" },
]
const STATS = [
    { value:"30+", label:"Years of Excellence" },
    { value:"$120M", label:"Annual Revenue" },
    { value:"200+", label:"Global Employees" },
    { value:"1.5M", label:"Sq Ft Produced Annually" },
]
const LEADERSHIP = [
    { initials:"NS", name:"Noshad Ali Shamshad", title:"Founder & President", bio:"Founded NR Group in 1990 with a vision to deliver precision-engineered facade systems. Over 30 years leading NR's growth across North America and the Caribbean." },
    { initials:"SA", name:"Shahzad Ali", title:"COO / Vice President", bio:"Co-founder overseeing operations, procurement, and the NRV Façade joint venture production facility in Cartagena, Colombia." },
    { initials:"DT", name:"David Taylor", title:"Chief Estimator", bio:"20+ years estimating complex curtain wall and window wall systems. Expert in FBC compliance, value engineering, and design-assist coordination." },
    { initials:"KK", name:"Krishna V. Konda", title:"Pre-Construction / PM", bio:"Leads design-assist and pre-construction services, coordinating BIM/Revit modelling, shop drawings, and engineering from concept to installation." },
]
const CATEGORIES = ["All","Commercial","Aviation","Hospitality","Residential","Mixed-Use","Healthcare"]
const FINISH_COLORS: Record<string,{frame:string;label:string;hex:string;code:string}> = {
    "mill":{frame:"#c0b89a",label:"Mill Finish",hex:"#c0b89a",code:"Mill"},
    "anodized clear":{frame:"#b8c4c8",label:"Anodized — Clear",hex:"#b8c4c8",code:"ANO-CLR"},
    "anodized bronze":{frame:"#6b4f35",label:"Anodized — Bronze",hex:"#6b4f35",code:"ANO-BRZ"},
    "anodized black":{frame:"#1a1a1a",label:"Anodized — Black",hex:"#1a1a1a",code:"ANO-BLK"},
    "powder white":{frame:"#e8e4de",label:"Powder Coat — White",hex:"#e8e4de",code:"RAL-9016"},
    "powder bronze":{frame:"#7a5c3a",label:"Powder Coat — Bronze",hex:"#7a5c3a",code:"RAL-8019"},
    "powder black":{frame:"#1c1c1c",label:"Powder Coat — Black",hex:"#1c1c1c",code:"RAL-9005"},
}
const WALL_COLORS: Record<string,{bg:string;label:string;hex:string}> = {
    "concrete":{bg:"#8a8d8f",label:"Concrete",hex:"#8a8d8f"},
    "white":{bg:"#f5f5f3",label:"White",hex:"#f5f5f3"},
    "gray":{bg:"#6b7280",label:"Gray",hex:"#6b7280"},
    "dark gray":{bg:"#374151",label:"Dark Gray",hex:"#374151"},
    "brick":{bg:"#8b4513",label:"Brick",hex:"#8b4513"},
    "limestone":{bg:"#c8b89a",label:"Limestone",hex:"#c8b89a"},
    "black":{bg:"#1a1a1a",label:"Black",hex:"#1a1a1a"},
    "charcoal":{bg:"#36454f",label:"Charcoal",hex:"#36454f"},
}
type DiagramConfig = { system:string;frameColor:string;wallColor:string;glassColor:string;floors?:number;bays?:number;panelW?:number;panelH?:number;finishLabel?:string;wallLabel?:string }
type DiagramMsg = { svgContent:string;title:string;subtitle:string;diagramType:string }
type ChatMessage = { role:"user"|"assistant"|"system";content:string;type?:"text"|"spec-table"|"rfi"|"warning"|"workflow"|"diagram";data?:Record<string,string|string[]>;diagram?:DiagramMsg }

function generateCurtainWallSVG(cfg:DiagramConfig):string {
    const{frameColor,wallColor,glassColor,floors=4,bays=5,system,finishLabel,wallLabel}=cfg
    const PW=64,PH=80,FT=6,M=48
    const W=bays*PW+FT*(bays+1)+M*2; const H=floors*PH+FT*(floors+1)+M+80
    let panels=""
    for(let f=0;f<floors;f++)for(let b=0;b<bays;b++){const x=M+FT+b*(PW+FT);const y=60+FT+f*(PH+FT);panels+=`<rect x="${x}" y="${y}" width="${PW}" height="${PH}" fill="${glassColor}"/><rect x="${x}" y="${y}" width="${PW}" height="${PH*0.3}" fill="rgba(255,255,255,0.08)"/>`}
    const totalFW=bays*(PW+FT)+FT;const totalFH=floors*(PH+FT)+FT
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W+40} ${H}" width="100%"><rect width="${W+40}" height="${H}" fill="#0c0f16"/><rect x="0" y="50" width="${M}" height="${totalFH+20}" fill="${wallColor}"/><rect x="${M+totalFW}" y="50" width="${M}" height="${totalFH+20}" fill="${wallColor}"/><rect x="${M}" y="60" width="${totalFW}" height="${totalFH}" fill="${frameColor}" rx="1"/>${panels}<line x1="${M}" y1="${H-18}" x2="${M+totalFW}" y2="${H-18}" stroke="#3f9bf0" stroke-width="0.8"/><text x="${M+totalFW/2}" y="${H-6}" fill="#3f9bf0" font-family="monospace" font-size="9" text-anchor="middle">${bays*66}" typical bay</text><text x="${M}" y="44" fill="#f2f5fa" font-family="'Jost',sans-serif" font-size="11" font-weight="500" letter-spacing="2">${system.toUpperCase()}</text><text x="${M}" y="${H+2}" fill="#4f5a72" font-family="'Jost',sans-serif" font-size="8">FRAME: ${finishLabel||"Mill"} · WALL: ${wallLabel||"Concrete"} · GLASS: Low-E IGU</text></svg>`
}
function generateWindowWallSVG(cfg:DiagramConfig):string {
    const{frameColor,wallColor,glassColor,floors=3,bays=4,system,finishLabel,wallLabel}=cfg
    const PW=72,PH=96,FT=5,M=40
    const W=bays*PW+FT*(bays+1)+M*2+30;const H=floors*PH+FT*(floors+1)+M+70
    let panels=""
    for(let f=0;f<floors;f++)for(let b=0;b<bays;b++){const x=M+FT+b*(PW+FT);const y=50+FT+f*(PH+FT);panels+=`<rect x="${x}" y="${y}" width="${PW}" height="${PH}" fill="${glassColor}"/><rect x="${x}" y="${y}" width="${PW}" height="${PH*0.25}" fill="rgba(255,255,255,0.1)"/>`}
    const totalFW=bays*(PW+FT)+FT;const totalFH=floors*(PH+FT)+FT
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%"><rect width="${W}" height="${H}" fill="#0c0f16"/><rect x="0" y="40" width="${M}" height="${totalFH+20}" fill="${wallColor}"/><rect x="${M+totalFW}" y="40" width="${M+30}" height="${totalFH+20}" fill="${wallColor}"/><rect x="${M}" y="50" width="${totalFW}" height="${totalFH}" fill="${frameColor}"/>${panels}<text x="${M}" y="36" fill="#f2f5fa" font-family="'Jost',sans-serif" font-size="11" font-weight="500">${system.toUpperCase()}</text><text x="${M}" y="${H}" fill="#4f5a72" font-family="'Jost',sans-serif" font-size="8">FRAME: ${finishLabel||"Mill"} · WALL: ${wallLabel||"Concrete"}</text></svg>`
}
function generateDoorSVG(cfg:DiagramConfig):string {
    const{frameColor,wallColor,glassColor,panelW=96,panelH=120,system,finishLabel,wallLabel}=cfg
    const scale=2.2;const PW=panelW/scale;const PH=panelH/scale;const FT=8;const M=50;const panels=2
    const W=panels*PW+FT*(panels+1)+M*2+30;const H=PH+FT*2+M+80
    let svgPanels=""
    for(let p=0;p<panels;p++){const x=M+FT+p*(PW+FT);const y=M+FT;svgPanels+=`<rect x="${x}" y="${y}" width="${PW}" height="${PH}" fill="${glassColor}"/><rect x="${x}" y="${y}" width="${PW}" height="${PH*0.2}" fill="rgba(255,255,255,0.1)"/><circle cx="${x+PW-8}" cy="${y+PH/2}" r="3" fill="${frameColor}"/>`}
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%"><rect width="${W}" height="${H}" fill="#0c0f16"/><rect x="0" y="${M-4}" width="${M}" height="${PH+FT*2+12}" fill="${wallColor}"/><rect x="${M+panels*(PW+FT)+FT}" y="${M-4}" width="${M+30}" height="${PH+FT*2+12}" fill="${wallColor}"/><rect x="${M}" y="${M}" width="${panels*(PW+FT)+FT}" height="${PH+FT*2}" fill="${frameColor}" rx="1"/>${svgPanels}<text x="${M}" y="${M-10}" fill="#f2f5fa" font-family="'Jost',sans-serif" font-size="11" font-weight="500">${system.toUpperCase()}</text><text x="${M}" y="${H-4}" fill="#4f5a72" font-family="'Jost',sans-serif" font-size="8">FRAME: ${finishLabel||"Mill"} · WALL: ${wallLabel||"Concrete"} · LIFT & SLIDE</text></svg>`
}
function generateJointDetailSVG(frameColor:string,system:string,finishLabel:string):string {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 260" width="100%"><rect width="340" height="260" fill="#0c0f16"/><rect x="30" y="100" width="280" height="60" fill="${frameColor}" rx="1"/><rect x="30" y="116" width="280" height="12" fill="#5a3d20" opacity="0.9"/><rect x="30" y="136" width="280" height="5" fill="#5a3d20" opacity="0.7"/><rect x="10" y="65" width="18" height="130" fill="rgba(140,200,255,0.42)" rx="1"/><rect x="312" y="65" width="18" height="130" fill="rgba(140,200,255,0.42)" rx="1"/><line x1="10" y1="65" x2="10" y2="195" stroke="#3f9bf0" stroke-width="0.6"/><line x1="28" y1="65" x2="28" y2="195" stroke="#3f9bf0" stroke-width="0.6"/><text x="170" y="22" fill="#3f9bf0" font-family="'Jost',sans-serif" font-size="10" font-weight="500" letter-spacing="2" text-anchor="middle">HORIZONTAL MULLION — CROSS SECTION</text><line x1="28" y1="230" x2="312" y2="230" stroke="#3f9bf0" stroke-width="0.8"/><text x="170" y="244" fill="#3f9bf0" font-family="monospace" font-size="9" text-anchor="middle">Mullion depth: 6½" (165mm)</text><text x="5" y="130" fill="${frameColor}" font-family="monospace" font-size="7" transform="rotate(-90,5,130)">GLASS</text><text x="170" y="256" fill="#4f5a72" font-family="'Jost',sans-serif" font-size="8" text-anchor="middle">${system} · NR GROUP · WEST PALM BEACH FL · FINISH: ${finishLabel}</text></svg>`
}
function generateElevationSVG(cfg:DiagramConfig):string {
    const{frameColor,wallColor,glassColor,floors=8,bays=5,system,finishLabel,wallLabel}=cfg
    const PW=42,PH=52,FT=4,M=36
    const W=bays*PW+FT*(bays+1)+M*2+40;const H=floors*PH+FT*(floors+1)+M+60
    let cells=""
    for(let f=0;f<floors;f++)for(let b=0;b<bays;b++){const x=M+FT+b*(PW+FT);const y=44+FT+f*(PH+FT);cells+=`<rect x="${x}" y="${y}" width="${PW}" height="${PH}" fill="${glassColor}"/><rect x="${x}" y="${y}" width="${PW}" height="${PH*0.28}" fill="rgba(255,255,255,0.07)"/>`}
    const totalW=bays*(PW+FT)+FT;const totalH=floors*(PH+FT)+FT
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%"><rect width="${W}" height="${H}" fill="#0c0f16"/><rect x="0" y="34" width="${M}" height="${totalH+20}" fill="${wallColor}"/><rect x="${M+totalW}" y="34" width="${M+40}" height="${totalH+20}" fill="${wallColor}"/><rect x="${M}" y="44" width="${totalW}" height="${totalH}" fill="${frameColor}"/>${cells}<text x="${M}" y="28" fill="#f2f5fa" font-family="'Jost',sans-serif" font-size="10" font-weight="500">${system.toUpperCase()} — FACADE ELEVATION</text><text x="${M}" y="${H-4}" fill="#4f5a72" font-family="'Jost',sans-serif" font-size="8">FRAME: ${finishLabel||"Mill"} · WALL: ${wallLabel||"Concrete"} · SCALE: N.T.S.</text></svg>`
}
const ENGINEERING_DB: Record<string,any> = {
    "8000":{series:"NR 8000 Series — Unitized Curtain Wall",category:"Curtain Wall",fbc:"FL-12847",impact:"LMI + SMI",maxDP_pos:90,maxDP_neg:100,waterDP:15,maxSpan:216,maxWidth:72,maxHeight:216,uFactor:"0.29",shgc:"0.19–0.35",thermalBreak:true,description:"NR Group's flagship high-rise unitized system. Highest tested design pressures in the portfolio.",diagramType:"curtainwall"},
    "6000":{series:"Series 6000 — Window Wall",category:"Window Wall",fbc:"FL-14521",impact:"LMI + SMI",maxDP_pos:65,maxDP_neg:75,waterDP:12,maxSpan:144,maxWidth:84,maxHeight:144,uFactor:"0.32",shgc:"0.22–0.38",thermalBreak:true,description:"Primary floor-to-floor glazing solution for high-rise residential and mixed-use towers.",diagramType:"windowwall"},
    "1100":{series:"NR 1100 Series — Window Wall",category:"Window Wall",fbc:"FL-10987",impact:"SMI (LMI upgrade available)",maxDP_pos:65,maxDP_neg:75,waterDP:12,maxSpan:120,maxWidth:72,maxHeight:108,uFactor:"0.38",shgc:"0.23–0.40",thermalBreak:true,description:"Thermally broken window wall for mid-rise multi-family and mixed-use applications.",diagramType:"windowwall"},
    "7000":{series:"Series 7000 — Lift & Slide Door",category:"Door",fbc:"FL-13892",impact:"LMI (optional)",maxDP_pos:55,maxDP_neg:60,waterDP:10,maxSpan:144,maxWidth:96,maxHeight:144,uFactor:"0.35",shgc:"0.22–0.38",thermalBreak:true,description:"Ultra-large format lift-and-slide for luxury residential and resort hospitality.",diagramType:"door"},
    "10000":{series:"Series 10000 — Large Format Lift & Slide",category:"Door",fbc:"FL-15210",impact:"LMI (standard)",maxDP_pos:65,maxDP_neg:70,waterDP:12,maxSpan:168,maxWidth:120,maxHeight:168,uFactor:"0.31",shgc:"0.20–0.35",thermalBreak:true,description:"Monumental lift-and-slide for architecturally significant openings.",diagramType:"door"},
}
function detectFinish(q:string){for(const[key,val]of Object.entries(FINISH_COLORS))if(q.includes(key)||q.includes(val.code.toLowerCase()))return{frameColor:val.frame,finishLabel:val.label,finishKey:key};return{frameColor:FINISH_COLORS["mill"].frame,finishLabel:"Mill Finish",finishKey:"mill"}}
function detectWall(q:string){for(const[key,val]of Object.entries(WALL_COLORS))if(q.includes(key))return{wallColor:val.bg,wallLabel:val.label};return{wallColor:WALL_COLORS["concrete"].bg,wallLabel:"Concrete"}}
function detectSeries(q:string):string|null{if(q.includes("8000")||q.includes("unitized curtain wall"))return"8000";if(q.includes("6000")||q.includes("window wall"))return"6000";if(q.includes("1100"))return"1100";if(q.includes("10000")||q.includes("large format"))return"10000";if(q.includes("7000")||q.includes("lift")||q.includes("slide"))return"7000";return null}
function processEngineering(input:string):ChatMessage{
    const q=input.toLowerCase()
    const finish=detectFinish(q);const wall=detectWall(q);const detectedSeries=detectSeries(q)
    const isVis=q.includes("show")||q.includes("render")||q.includes("draw")||q.includes("diagram")||q.includes("layout")||q.includes("visualize")
    const hasFinish=Object.keys(FINISH_COLORS).some(k=>q.includes(k))||q.includes("anodiz")||q.includes("powder")||q.includes("finish")||q.includes("color")||q.includes("colour")
    const hasWall=Object.keys(WALL_COLORS).some(k=>q.includes(k))
    const isJoint=q.includes("joint")||q.includes("detail")||q.includes("section")||q.includes("mullion")||q.includes("cross section")
    const isElev=q.includes("elevation")||q.includes("facade elevation")||q.includes("building elevation")
    if(q.includes("contact")||q.includes("phone")||q.includes("email")||q.includes("address")||q.includes("location")||q.includes("office"))
        return{role:"assistant",type:"text",content:`**NR Group Contact Information**\n\n📍 4348 Westroads Drive, West Palm Beach, FL 33407\n📞 (561) 844-1121\n✉️ info@nrwindows.com\n🌐 www.nrfacade.com\n\n**Engineering inquiries:** engineering@nrwindows.com\n**Hours:** Mon–Fri 8am–5pm EST`}
    if(q.includes("rfi")||(q.includes("request")&&q.includes("information"))||q.includes("quote")||q.includes("estimate")||q.includes("proposal"))
        return{role:"assistant",type:"rfi",content:"RFI_GENERATE",data:{}}
    if(q.includes("price")||q.includes("cost")||q.includes("budget")||q.includes("lead time")||q.includes("delivery"))
        return{role:"assistant",type:"text",content:`**Pricing & Lead Time**\n\nNR Group provides competitive design-assist pricing. Key factors:\n\n• System type & complexity\n• Panel size & quantity\n• Impact rating (LMI/SMI)\n• Finish specification\n• Installation scope\n\nTypical lead times: **16–24 weeks** from approved shop drawings.\n\nType "generate RFI" to submit a formal inquiry.`}
    if(q.includes("lmi")||q.includes("smi")||q.includes("impact")||q.includes("hurricane")||q.includes("wind"))
        return{role:"assistant",type:"text",content:`**Impact Certification**\n\n| System | Rating | FBC # |\n|--------|--------|---------|\n| NR 8000 | LMI + SMI | FL-12847 |\n| Series 6000 | LMI + SMI | FL-14521 |\n| NR 1100 | SMI | FL-10987 |\n| Series 7000 | LMI | FL-13892 |\n| Series 10000 | LMI | FL-15210 |\n\n**LMI** = Large Missile Impact · **SMI** = Small Missile Impact\nCompliant with Florida Building Code 8th Edition.`}
    if(q.includes("fbc")||q.includes("florida building code")||q.includes("noa")||q.includes("approval")||q.includes("compliance"))
        return{role:"assistant",type:"text",content:`**FBC Product Approvals**\n\n• **FL-12847** — NR 8000 Unitized Curtain Wall\n• **FL-14521** — Series 6000 Window Wall\n• **FL-10987** — NR 1100 Window Wall\n• **FL-13892** — Series 7000 Lift & Slide\n• **FL-15210** — Series 10000 Lift & Slide\n\nPE-stamped shop drawings and NOA submittals handled in-house by our Manila engineering office.`}
    if(q.includes("thermal")||q.includes("u-factor")||q.includes("ufactor")||q.includes("shgc")||q.includes("energy")||q.includes("insulation"))
        return{role:"assistant",type:"text",content:`**Thermal Performance**\n\n| System | U-Factor | SHGC | Thermal Break |\n|--------|----------|------|--------------|\n| NR 8000 | 0.29 | 0.19–0.35 | Yes |\n| NR 1100 | 0.38 | 0.23–0.40 | Yes |\n| Series 6000 | 0.32 | 0.22–0.38 | Yes |\n| Series 7000 | 0.35 | 0.22–0.38 | Yes |\n| Series 10000 | 0.31 | 0.20–0.35 | Yes |\n\nAll thermally-broken systems use polyamide thermal struts.`}
    if((q.includes("finish")||q.includes("color")||q.includes("colour")||q.includes("anodiz")||q.includes("powder"))&&!detectedSeries)
        return{role:"assistant",type:"text",content:`**Available Finishes**\n\n• **Mill Finish** — standard aluminum\n• **Anodized Clear** (ANO-CLR)\n• **Anodized Bronze** (ANO-BRZ)\n• **Anodized Black** (ANO-BLK)\n• **Powder White** (RAL 9016)\n• **Powder Bronze** (RAL 8019)\n• **Powder Black** (RAL 9005)\n• **Custom RAL** — NR 8000 & Series 10000\n\nType a finish with a system name to render it visually.`}
    if(isJoint&&detectedSeries){const db=ENGINEERING_DB[detectedSeries];const svg=generateJointDetailSVG(finish.frameColor,db.series,finish.finishLabel);return{role:"assistant",type:"diagram",content:`**Joint Detail — ${db.series}**\n\nFrame: **${finish.finishLabel}** · Amber = polyamide thermal break`,diagram:{svgContent:svg,title:`${db.series} — Mullion Section`,subtitle:`Finish: ${finish.finishLabel} · ${db.fbc}`,diagramType:"joint"}}}
    if((isVis||hasFinish||hasWall)&&detectedSeries){const db=ENGINEERING_DB[detectedSeries];const fc=hasFinish?finish.frameColor:FINISH_COLORS["mill"].frame;const wc=hasWall?wall.wallColor:WALL_COLORS["concrete"].bg;const gl="rgba(140,190,230,0.55)";const fl=hasFinish?finish.finishLabel:"Mill Finish";const wl=hasWall?wall.wallLabel:"Concrete";const cfg:DiagramConfig={system:db.series,frameColor:fc,wallColor:wc,glassColor:gl,finishLabel:fl,wallLabel:wl};let svg="",diagType="";if(isElev){svg=generateElevationSVG({...cfg,floors:8,bays:5});diagType="elevation"}else if(db.diagramType==="curtainwall"){svg=generateCurtainWallSVG({...cfg,floors:4,bays:5});diagType="curtainwall"}else if(db.diagramType==="windowwall"){svg=generateWindowWallSVG({...cfg,floors:3,bays:4});diagType="windowwall"}else{svg=generateDoorSVG({...cfg,panelW:96,panelH:120});diagType="door"};return{role:"assistant",type:"diagram",content:`**Rendered — ${db.series}**\n\n${hasFinish?`Frame: **${fl}**.`:""} ${hasWall?`Wall: **${wl}**.`:""}\n\nFBC: ${db.fbc} · Impact: ${db.impact} · U-Factor: ${db.uFactor}`,diagram:{svgContent:svg,title:db.series,subtitle:`${fl} · ${wl} · Low-E IGU`,diagramType:diagType}}}
    if(detectedSeries&&!isVis&&!hasFinish&&!hasWall){const db=ENGINEERING_DB[detectedSeries];const cfg:DiagramConfig={system:db.series,frameColor:FINISH_COLORS["mill"].frame,wallColor:WALL_COLORS["concrete"].bg,glassColor:"rgba(140,190,230,0.55)",finishLabel:"Mill Finish",wallLabel:"Concrete"};let svg="",diagType="";if(db.diagramType==="curtainwall"){svg=generateCurtainWallSVG({...cfg,floors:4,bays:5});diagType="curtainwall"}else if(db.diagramType==="windowwall"){svg=generateWindowWallSVG({...cfg,floors:3,bays:4});diagType="windowwall"}else{svg=generateDoorSVG({...cfg,panelW:96,panelH:120});diagType="door"};return{role:"assistant",type:"diagram",content:`**${db.series}**\n\nFBC: ${db.fbc} · Impact: ${db.impact} · U-Factor: ${db.uFactor}\n\nSpecify a finish or wall color to customize.`,diagram:{svgContent:svg,title:db.series,subtitle:"Default: Mill Finish · Concrete wall",diagramType:diagType}}}
    if(detectedSeries&&(q.includes("spec")||q.includes("data")||q.includes("technical")||q.includes("max")||q.includes("dimension"))){const db=ENGINEERING_DB[detectedSeries];return{role:"assistant",type:"spec-table",content:"",data:{series:db.series,category:db.category,fbc:db.fbc,impact:db.impact,maxDP:`+${db.maxDP_pos}/−${db.maxDP_neg} psf`,uFactor:db.uFactor,shgc:db.shgc,thermalBreak:db.thermalBreak?"Yes — Polyamide":"No",description:db.description}}}
    if(q.includes("hello")||q.includes("hi")||q.includes("hey")||q.includes("help")||q.includes("what can")||q.length<5)
        return{role:"assistant",type:"text",content:`**NR Group Visual Engineering Specialist**\n\nHello! I can help you with:\n\n🏗️ **Visualize systems** — "Show NR 8000 with Powder Black"\n📐 **Tech specs** — "NR 8000 technical specs"\n🌀 **Impact ratings** — "LMI vs SMI"\n🌡️ **Thermal data** — "U-Factor Series 6000"\n📋 **Generate RFI** — "generate RFI"\n📞 **Contact** — "NR Group contact info"`}
    return{role:"assistant",type:"text",content:`I can help with NR Group's glazing systems. Try:\n\n• **"Show NR 8000"** — render diagram\n• **"NR 8000 specs"** — technical data\n• **"Impact ratings"** — LMI/SMI certification\n• **"Generate RFI"** — project inquiry\n• **"Contact info"** — reach our team`}
}

const MARQUEE_NAMES = ["NR 8000 Unitized","Series 6000 Window Wall","Lift & Slide Doors","Thermal Curtain Wall","LMI Rated Systems","SMI Rated Systems","FBC Approved","BIM Ready","Custom Geometry","Large Format"]

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function NRGroupWebsite() {
    const [activeSlide, setActiveSlide] = useState(0)
    const [filterCat, setFilterCat] = useState("All")
    const [rfiOpen, setRfiOpen] = useState(false)
    const [scrollY, setScrollY] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [hoveredProject, setHoveredProject] = useState<number | null>(null)
    const [activeAccordion, setActiveAccordion] = useState<number>(0)
    const [aiOpen, setAiOpen] = useState(false)
    const [aiInput, setAiInput] = useState("")
    const [aiMessages, setAiMessages] = useState<ChatMessage[]>([{ role:"assistant", type:"text", content:"**NR Group Visual Engineering Specialist**\n\nHello! I can help you with:\n\n• Visualize any glazing system with custom finishes\n• Technical specs, FBC approvals, impact ratings\n• Generate project RFIs\n• Contact information\n\nTry: *\"Show NR 8000 with Powder Black frame\"*" }])
    const [aiTyping, setAiTyping] = useState(false)
    const [rfiData, setRfiData] = useState({ name:"", company:"", email:"", project:"", location:"", system:"NR 8000 Unitized Curtain Wall", area:"", description:"" })
    const [rfiMode, setRfiMode] = useState(false)
    const [activeTab, setActiveTab] = useState<"chat"|"canvas">("chat")
    const [canvasSystem, setCanvasSystem] = useState("8000")
    const [canvasFinish, setCanvasFinish] = useState("mill")
    const [canvasWall, setCanvasWall] = useState("concrete")
    const [canvasDiagramType, setCanvasDiagramType] = useState<"elevation"|"layout"|"joint">("layout")
    const [canvasFloors, setCanvasFloors] = useState(4)
    const [canvasBays, setCanvasBays] = useState(5)
    const chatEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setTimeout(() => setLoaded(true), 80)
        const onScroll = () => setScrollY(window.scrollY)
        window.addEventListener("scroll", onScroll, { passive: true })
        const obs = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("nr-visible"); obs.unobserve(e.target) } }) }, { threshold: 0.08, rootMargin: "0px 0px -48px 0px" })
        document.querySelectorAll(".nr-reveal").forEach((el) => obs.observe(el))
        const onParallax = () => { const sy=window.scrollY; document.querySelectorAll("[data-depth]").forEach((el) => { const d=parseFloat((el as HTMLElement).dataset.depth||"0");(el as HTMLElement).style.transform=`translateY(${sy*d}px)` }) }
        window.addEventListener("scroll", onParallax, { passive: true })
        const onMouseMove = (e: MouseEvent) => {
            document.querySelectorAll(".tilt-card").forEach((card) => {
                const rect=(card as HTMLElement).getBoundingClientRect()
                const cx=rect.left+rect.width/2; const cy=rect.top+rect.height/2
                const dx=(e.clientX-cx)/rect.width; const dy=(e.clientY-cy)/rect.height
                if(Math.abs(dx)<0.8&&Math.abs(dy)<0.8)(card as HTMLElement).style.transform=`perspective(800px) rotateX(${-dy*6}deg) rotateY(${dx*6}deg) translateZ(4px)`
            })
        }
        window.addEventListener("mousemove", onMouseMove)
        const style = document.createElement("style"); style.textContent = GLOBAL_CSS; document.head.appendChild(style)
        return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("scroll", onParallax); window.removeEventListener("mousemove", onMouseMove); obs.disconnect(); if (style.parentNode) style.parentNode.removeChild(style) }
    }, [])

    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior:"smooth" }) }, [aiMessages])

    const SLIDES = PROJECTS.slice(0,4)
    const filteredProjects = filterCat === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filterCat)
    const navScrolled = scrollY > 40
    const navBg = navScrolled ? `rgba(5,7,11,0.92)` : "transparent"
    const navBorder = navScrolled ? `1px solid ${GLASS_BORDER}` : "1px solid transparent"

    const scrollTo = (id: string) => {
        const target = id === "products" ? "product-systems" : id
        const el = document.getElementById(target)
        if (el) el.scrollIntoView({ behavior:"smooth" })
    }

    const sendAiMessage = () => {
        if (!aiInput.trim()) return
        const userMsg: ChatMessage = { role:"user", type:"text", content:aiInput }
        setAiMessages(prev => [...prev, userMsg])
        setAiInput("")
        setAiTyping(true)
        setTimeout(() => {
            const response = processEngineering(aiInput)
            if (response.type === "rfi") { setRfiMode(true); setAiMessages(prev => [...prev, { role:"assistant", type:"text", content:"**Starting RFI form.** Please fill in the fields below and I'll compile your request." }]) }
            else { setAiMessages(prev => [...prev, response]) }
            setAiTyping(false)
        }, 700)
    }

    const canvasDb = ENGINEERING_DB[canvasSystem] || ENGINEERING_DB["8000"]
    const canvasFinishData = FINISH_COLORS[canvasFinish] || FINISH_COLORS["mill"]
    const canvasWallData = WALL_COLORS[canvasWall] || WALL_COLORS["concrete"]
    const canvasCfg: DiagramConfig = { system:canvasDb.series, frameColor:canvasFinishData.frame, wallColor:canvasWallData.bg, glassColor:"rgba(140,190,230,0.55)", finishLabel:canvasFinishData.label, wallLabel:canvasWallData.label, floors:canvasFloors, bays:canvasBays }
    const canvasSvg = canvasDiagramType==="joint" ? generateJointDetailSVG(canvasFinishData.frame,canvasDb.series,canvasFinishData.label) : canvasDiagramType==="elevation" ? generateElevationSVG(canvasCfg) : canvasDb.diagramType==="curtainwall" ? generateCurtainWallSVG(canvasCfg) : canvasDb.diagramType==="windowwall" ? generateWindowWallSVG(canvasCfg) : generateDoorSVG(canvasCfg)

    const QUICK_PROMPTS = ["Show NR 8000","Series 6000 specs","Impact ratings","Contact info","Generate RFI"]

    return (
        <div style={{ background:BG_BASE, color:TEXT_PRIMARY, fontFamily:"'Jost',sans-serif", minHeight:"100vh", position:"relative", overflowX:"hidden" }}>

            {/* ── NAV ────────────────────────────────────────────────────────────────── */}
            <nav className="nr-nav-pad" style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, height:72, padding:"0 48px", display:"flex", alignItems:"center", justifyContent:"space-between", background:navBg, borderBottom:navBorder, backdropFilter:navScrolled?"blur(28px) saturate(180%)":"none", transition:"background 0.4s ease,border 0.4s ease", boxShadow:navScrolled?"0 1px 0 rgba(255,255,255,0.04),0 4px 24px rgba(0,0,0,0.5)":"none" }}>
                <div style={{ cursor:"pointer", flexShrink:0, display:"flex", alignItems:"center", gap:12 }} onClick={() => scrollTo("hero")}>
                    <div style={{ width:34, height:34, borderRadius:2, border:`1px solid ${GOLD_DIM}`, background:"linear-gradient(135deg,rgba(63,155,240,0.20),rgba(63,155,240,0.04))", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 16px rgba(63,155,240,0.25)", flexShrink:0 }}>
                        <span className="serif" style={{ fontSize:15, fontWeight:600, color:"#ffffff", letterSpacing:"0.04em" }}>NR</span>
                    </div>
                    <div>
                        <div className="sans" style={{ fontSize:15, fontWeight:600, letterSpacing:"0.22em", textTransform:"uppercase" as const, color:"#ffffff", lineHeight:1 }}>NR Group</div>
                        <div className="sans" style={{ fontSize:8, fontWeight:500, letterSpacing:"0.20em", textTransform:"uppercase" as const, color:"rgba(140,200,255,0.85)", marginTop:3, lineHeight:1 }}>Facade &amp; Envelope Specialists</div>
                    </div>
                </div>
                <div className="nr-nav-links" style={{ display:"flex", gap:48, position:"absolute", left:"50%", transform:"translateX(-50%)" }}>
                    {[["projects","Projects"],["products","Products"],["about","About"],["contact","Contact"]].map(([id,label]) => (
                        <span key={id} className="nav-lnk" onClick={() => scrollTo(id)}>{label}</span>
                    ))}
                </div>
                <button className="btn-rfi" onClick={() => setRfiOpen(true)}>Submit RFI</button>
            </nav>

            {/* ── HERO ─────────────────────────────────────────────────────────────── */}
            <section id="hero" className={loaded?"hero-loaded":""} style={{ position:"relative", minHeight:"100vh", overflow:"hidden", display:"flex", flexDirection:"column", justifyContent:"flex-end", paddingBottom:"8vh", background:`radial-gradient(ellipse at 30% 60%,rgba(30,40,70,0.9) 0%,${BG_BASE} 65%)` }}>
                <div style={{ position:"absolute", inset:0 }}>
                    <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=2400&q=90&fit=crop" alt="" data-depth="0.22" style={{ width:"100%", height:"110%", top:"-5%", objectFit:"cover", opacity:0.28, transform:`translateY(${scrollY * 0.22}px)`, position:"absolute", left:0, right:0 }} />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(5,7,11,0.2) 0%,rgba(5,7,11,0.05) 30%,rgba(5,7,11,0.65) 72%,rgba(5,7,11,0.98) 100%)" }} />
                    <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 60% at 20% 80%,rgba(63,155,240,0.06) 0%,transparent 60%)" }} />
                </div>
                <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize:"88px 88px", opacity:0.6, pointerEvents:"none" }} />
                <div className="hero-content" style={{ position:"relative", zIndex:2, padding:"0 64px", maxWidth:1280, width:"100%" }}>
                    <div className="h-label sans" style={{ fontSize:10, fontWeight:500, letterSpacing:"0.28em", textTransform:"uppercase" as const, color:GOLD, marginBottom:52, display:"flex", alignItems:"center", gap:12 }}>
                        <span style={{ width:32, height:1, background:GOLD, opacity:0.6, display:"inline-block" }}></span>
                        NR Group · Est. 1990 · West Palm Beach, Florida
                        <span style={{ width:32, height:1, background:GOLD, opacity:0.6, display:"inline-block" }}></span>
                    </div>
                    <h1 className="h-title serif hero-title shimmer-heading section-h2" style={{ fontWeight:300, fontSize:"clamp(38px,4.5vw,68px)", lineHeight:1.12, letterSpacing:"0.01em", color:TEXT_PRIMARY, marginBottom:36, maxWidth:760 }}>
                        Architectural <span style={{ color:GOLD, fontStyle:"italic", textShadow:`0 0 60px ${GOLD_GLOW}` }}>Glazing Systems</span>
                        <br />&amp; Engineered Building Envelopes
                    </h1>
                    <p className="h-sub sans hero-sub" style={{ fontWeight:300, fontSize:16, color:TEXT_SECONDARY, maxWidth:520, lineHeight:1.78, marginBottom:44 }}>NR Group delivers precision-engineered curtain walls, window walls, and specialty glazing systems for the world's most ambitious architectural projects.</p>
                    <div className="h-cta hero-cta-row" style={{ display:"flex", gap:14, flexWrap:"wrap" as const }}>
                        <button className="btn-hero" onClick={() => scrollTo("projects")}>Explore Projects</button>
                        <button className="btn-hero" onClick={() => scrollTo("products")}>Our Systems</button>
                    </div>
                    <div className="h-stats stat-strip" style={{ display:"flex", marginTop:68, background:GLASS_BG, backdropFilter:"blur(20px)", border:`1px solid ${GLASS_BORDER}`, borderBottom:"none", boxShadow:SHADOW_MD, flexWrap:"wrap" as const }}>
                        {STATS.map((s,i) => (
                            <div key={s.label} style={{ flex:"1 1 120px", padding:"22px 32px", borderRight:i<STATS.length-1?`1px solid ${DIVIDER}`:"none" }}>
                                <div className="serif gold-glow-el" style={{ fontWeight:300, fontSize:48, color:GOLD, lineHeight:1, textShadow:`0 0 30px ${GOLD_GLOW}` }}>{s.value}</div>
                                <div className="sans" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, marginTop:6 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="hero-scroll-cue" style={{ position:"absolute", bottom:28, right:64, zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                    <div className="sans" style={{ fontSize:8, fontWeight:400, letterSpacing:"0.22em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, writingMode:"vertical-rl" as const }}>Scroll</div>
                    <div style={{ width:1, height:48, background:`linear-gradient(to bottom,${GOLD_DIM},transparent)` }} />
                </div>
            </section>

            {/* ── MARQUEE ───────────────────────────────────────────────────────────── */}
            <div style={{ background:BG_SURFACE, borderTop:`1px solid ${GLASS_BORDER}`, borderBottom:`1px solid ${GLASS_BORDER}`, padding:"16px 0", overflow:"hidden" }}>
                <div className="mrq-track">
                    {[...MARQUEE_NAMES,...MARQUEE_NAMES].map((n,i) => (
                        <span key={i} className="sans" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.2em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, whiteSpace:"nowrap" as const, display:"flex", alignItems:"center", gap:72 }}>
                            {n}<span style={{ color:GOLD, fontSize:6 }}>◆</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* ── FEATURED SLIDESHOW ────────────────────────────────────────────────── */}
            <section id="slideshow" className="section-cinematic" style={{ position:"relative", height:"88vh", overflow:"hidden", background:BG_BASE }}>
                {SLIDES.map((p,i) => (
                    <div key={p.id} style={{ position:"absolute", inset:0, opacity:i===activeSlide?1:0, transition:"opacity 1.2s cubic-bezier(0.16,1,0.3,1)", zIndex:i===activeSlide?2:1 }}>
                        <img src={p.img} alt={p.name} style={{ width:"100%", height:"110%", top:"-5%", objectFit:"cover", opacity:0.55, transform:i===activeSlide?"scale(1.02)":"scale(1.05)", transition:"transform 5.5s cubic-bezier(0.4,0,0.2,1)", position:"absolute", left:0 }} />
                        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(5,7,11,0.82) 0%,rgba(5,7,11,0.3) 55%,rgba(5,7,11,0.05) 100%)" }} />
                    </div>
                ))}
                <div className="slide-info-card" style={{ position:"absolute", bottom:56, left:80, zIndex:10, maxWidth:480, padding:"28px 32px", background:GLASS_BG, backdropFilter:"blur(24px)", border:`1px solid ${GLASS_BORDER}`, borderLeft:`2px solid ${GOLD}` }}>
                    <div className="sans" style={{ fontSize:9, fontWeight:400, letterSpacing:"0.22em", textTransform:"uppercase" as const, color:GOLD, marginBottom:8 }}>{SLIDES[activeSlide]?.category} · {SLIDES[activeSlide]?.year}</div>
                    <h2 className="serif" style={{ fontWeight:300, fontSize:32, color:TEXT_PRIMARY, letterSpacing:"0.02em", marginBottom:8, lineHeight:1.1 }}>{SLIDES[activeSlide]?.name}</h2>
                    <div className="sans" style={{ fontSize:12, fontWeight:300, color:TEXT_SECONDARY, marginBottom:12 }}>{SLIDES[activeSlide]?.location}</div>
                    <div className="sans" style={{ fontSize:11, fontWeight:300, color:TEXT_SUBTLE }}>{SLIDES[activeSlide]?.system}</div>
                </div>
                <div className="slide-progress" style={{ position:"absolute", bottom:56, right:80, zIndex:10, display:"flex", gap:10, alignItems:"center" }}>
                    <button className="slide-ctrl" onClick={() => setActiveSlide(p => (p-1+SLIDES.length)%SLIDES.length)}>←</button>
                    <div className="sans" style={{ fontSize:11, color:TEXT_SUBTLE, letterSpacing:"0.1em", minWidth:48, textAlign:"center" }}>{String(activeSlide+1).padStart(2,"0")} / {String(SLIDES.length).padStart(2,"0")}</div>
                    <button className="slide-ctrl" onClick={() => setActiveSlide(p => (p+1)%SLIDES.length)}>→</button>
                </div>
            </section>

            {/* ── PROJECTS GRID ────────────────────────────────────────────────────── */}
            <section id="projects" className="section-cinematic section-pad" style={{ padding:"100px 64px", background:BG_BASE }}>
                <div style={{ maxWidth:1280, margin:"0 auto" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:56, flexWrap:"wrap" as const, gap:24 }}>
                        <div>
                            <div className="sans nr-reveal" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.22em", textTransform:"uppercase" as const, color:GOLD, marginBottom:12 }}>Selected Projects</div>
                            <h2 className="serif nr-reveal shimmer-heading section-h2" style={{ fontWeight:300, fontSize:"clamp(42px,6vw,72px)", color:TEXT_PRIMARY, lineHeight:1, letterSpacing:"0.02em" }}>Our Portfolio</h2>
                        </div>
                        <div style={{ display:"flex", gap:8, flexWrap:"wrap" as const }}>
                            {CATEGORIES.map(cat => <button key={cat} className={`flt-btn${filterCat===cat?" on":""}`} onClick={() => setFilterCat(cat)}>{cat}</button>)}
                        </div>
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:3 }}>
                        {filteredProjects.map((p,i) => (
                            <div key={p.id} className="proj-card tilt-card" style={{ height:i%5===0?440:290, gridColumn:i%5===0?"span 2":"span 1", background:i%2===0?`linear-gradient(145deg,${BG_RAISED},${BG_SURFACE})`:`linear-gradient(145deg,${BG_FLOAT},${BG_RAISED})` }}
                                onMouseEnter={() => setHoveredProject(p.id)} onMouseLeave={() => setHoveredProject(null)}>
                                <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:EDGE_LIGHT, zIndex:3 }} />
                                <div className="serif" style={{ position:"absolute", top:12, right:16, fontWeight:300, fontSize:80, color:"rgba(63,155,240,0.09)", lineHeight:1, userSelect:"none" as const, pointerEvents:"none", zIndex:1 }}>{p.num}</div>
                                <img src={p.img} alt={p.name} />
                                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(14,17,23,0.98) 0%,rgba(14,17,23,0.5) 55%,rgba(14,17,23,0.1) 100%)", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:26, zIndex:2 }}>
                                    <div style={{ display:"flex", gap:8, marginBottom:10, flexWrap:"wrap" as const }}>
                                        {[p.category,p.year].map(tag => <span key={tag} className="sans" style={{ fontSize:9, fontWeight:400, letterSpacing:"0.18em", textTransform:"uppercase" as const, background:GOLD_GLOW, border:`1px solid ${GOLD_DIM}`, color:GOLD, padding:"3px 9px", borderRadius:1 }}>{tag}</span>)}
                                    </div>
                                    <h4 className="serif" style={{ fontWeight:400, fontSize:20, color:TEXT_PRIMARY, letterSpacing:"0.02em", marginBottom:5 }}>{p.name}</h4>
                                    <div className="sans" style={{ fontSize:11, fontWeight:300, color:TEXT_SECONDARY, marginBottom:hoveredProject===p.id?6:0 }}>{p.location}</div>
                                    {hoveredProject===p.id && <div className="sans" style={{ fontSize:10, fontWeight:300, color:TEXT_SUBTLE, marginTop:4 }}>{p.system}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                    {filteredProjects.length === 0 && (
                        <div style={{ textAlign:"center", padding:"80px 0", color:TEXT_SUBTLE }}>
                            <div className="sans" style={{ fontSize:13 }}>No projects in this category yet.</div>
                        </div>
                    )}
                </div>
            </section>

            {/* ── ARCHITECTURAL PRODUCT SYSTEMS ────────────────────────────────────── */}
            <section id="product-systems" className="section-cinematic" style={{ background:BG_BASE }}>
                <ArchitecturalProductSystems />
            </section>

            {/* ── ABOUT ─────────────────────────────────────────────────────────────── */}
            <section id="about" className="section-cinematic section-pad" style={{ padding:"100px 64px", background:BG_SURFACE }}>
                <div style={{ maxWidth:1280, margin:"0 auto" }}>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:96, alignItems:"start" }} className="grid-2">
                        <div>
                            <div className="sans nr-reveal" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.22em", textTransform:"uppercase" as const, color:GOLD, marginBottom:12 }}>Our Story</div>
                            <h2 className="serif nr-reveal shimmer-heading section-h2" style={{ fontWeight:300, fontSize:"clamp(42px,5.5vw,68px)", color:TEXT_PRIMARY, lineHeight:1.02, letterSpacing:"0.02em", marginBottom:32 }}>Built on Precision</h2>
                            <p className="sans nr-reveal" style={{ fontWeight:300, fontSize:15, color:TEXT_SECONDARY, lineHeight:1.82, marginBottom:20 }}>Founded in 1990 by Noshad Ali Shamshad, NR Group has grown from a regional glazing contractor into one of North America's foremost facade engineering companies. With a production facility in Cartagena, Colombia and engineering offices in West Palm Beach and Manila, we deliver complete turnkey facade solutions.</p>
                            <p className="sans nr-reveal nr-reveal-delay-2" style={{ fontWeight:300, fontSize:15, color:TEXT_SECONDARY, lineHeight:1.82, marginBottom:48 }}>From curtain wall design-assist and FBC compliance to fabrication and installation, every project benefits from three decades of accumulated expertise in high-performance architectural glazing.</p>
                            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:24 }} className="metrics-row">
                                {[["FL-12847","FBC Product Approval"],["8th Ed.","Florida Building Code"],["LMI + SMI","Impact Certification"],["ISO 9001","Quality Management"]].map(([val,label]) => (
                                    <div key={label} className="nr-reveal" style={{ padding:"20px 24px", background:GLASS_BG, border:`1px solid ${GLASS_BORDER}`, borderLeft:`2px solid ${GOLD}` }}>
                                        <div className="serif" style={{ fontSize:24, fontWeight:300, color:GOLD, marginBottom:4 }}>{val}</div>
                                        <div className="sans" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:TEXT_SUBTLE }}>{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ position:"relative" }}>
                            <div className="about-img nr-reveal" style={{ width:"100%", height:520, background:BG_RAISED, border:`1px solid ${GLASS_BORDER}`, overflow:"hidden", position:"relative" }}>
                                <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=90&fit=crop" alt="NR Group Facade" style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.72 }} />
                                <div style={{ position:"absolute", inset:0, background:`linear-gradient(to top,${BG_RAISED} 0%,transparent 60%)` }} />
                            </div>
                            <div className="about-float-card" style={{ position:"absolute", bottom:-28, right:-28, padding:"22px 28px", background:BG_RAISED, border:`1px solid ${GLASS_BORDER}`, boxShadow:SHADOW_LG, maxWidth:240 }}>
                                <div className="serif" style={{ fontSize:36, fontWeight:300, color:GOLD }}>{STATS[0].value}</div>
                                <div className="sans" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, marginTop:4 }}>{STATS[0].label}</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop:96, paddingTop:64, borderTop:`1px solid ${DIVIDER}` }}>
                        <div className="sans nr-reveal" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.22em", textTransform:"uppercase" as const, color:GOLD, marginBottom:48 }}>Leadership</div>
                        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:0 }} className="grid-4">
                            {LEADERSHIP.map((l) => (
                                <div key={l.name} className="prof-card">
                                    <div style={{ width:44, height:44, borderRadius:2, background:`linear-gradient(135deg,${GOLD_GLOW},rgba(63,155,240,0.05))`, border:`1px solid ${GOLD_DIM}`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
                                        <span className="serif" style={{ fontSize:16, fontWeight:300, color:GOLD }}>{l.initials}</span>
                                    </div>
                                    <div className="serif" style={{ fontSize:18, fontWeight:400, color:TEXT_PRIMARY, marginBottom:4, letterSpacing:"0.02em" }}>{l.name}</div>
                                    <div className="sans" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:GOLD, marginBottom:12 }}>{l.title}</div>
                                    <p className="sans" style={{ fontSize:13, fontWeight:300, color:TEXT_SECONDARY, lineHeight:1.72 }}>{l.bio}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CONTACT ─────────────────────────────────────────────────────────── */}
            <section id="contact" className="section-cinematic" style={{ padding:"100px 64px", background:BG_BASE, position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 50% at 50% 50%,rgba(63,155,240,0.06) 0%,transparent 70%)" }} />
                <div style={{ maxWidth:860, margin:"0 auto", position:"relative", zIndex:2 }}>
                    <div className="banner-glass" style={{ padding:"56px 64px", background:GLASS_BG, backdropFilter:"blur(32px)", border:`1px solid ${GLASS_BORDER}`, borderTop:`1px solid ${EDGE_LIGHT}`, textAlign:"center" as const }}>
                        <div className="sans nr-reveal" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.22em", textTransform:"uppercase" as const, color:GOLD, marginBottom:18 }}>Start Your Project</div>
                        <h2 className="serif nr-reveal shimmer-heading banner-title" style={{ fontWeight:300, fontSize:"clamp(32px,5vw,56px)", color:TEXT_PRIMARY, lineHeight:1.1, letterSpacing:"0.02em", marginBottom:24 }}>Let's Build Something Extraordinary</h2>
                        <p className="sans nr-reveal" style={{ fontWeight:300, fontSize:15, color:TEXT_SECONDARY, maxWidth:440, margin:"0 auto", lineHeight:1.75, marginBottom:40 }}>Facade &amp; Building Envelope Specialists since 1990. Connect with our team for design-assist, estimating, or technical consultation.</p>
                        <div className="nr-reveal" style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" as const }}>
                            <button className="btn-gold" onClick={() => setRfiOpen(true)}>Submit an RFI</button>
                            <button className="btn-dark" onClick={() => window.open("mailto:info@nrwindows.com")}>info@nrwindows.com</button>
                        </div>
                    </div>
                    <div className="footprint-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:0, marginTop:2 }}>
                        {[["West Palm Beach, FL","Headquarters · (561) 844-1121"],["Manila, Philippines","Engineering & Detailing"],["Cartagena, Colombia","NRV Production Facility"]].map(([city,role]) => (
                            <div key={city} className="nr-reveal" style={{ padding:"24px 28px", background:GLASS_BG, border:`1px solid ${GLASS_BORDER}`, borderTop:"none" }}>
                                <div className="serif" style={{ fontSize:16, fontWeight:400, color:TEXT_PRIMARY, marginBottom:4 }}>{city}</div>
                                <div className="sans" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:TEXT_SUBTLE }}>{role}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ── MARKETS ─────────────────────────────────────────────────────────── */}
            <section style={{ background:BG_BASE, padding:"100px 64px", borderTop:`1px solid ${DIVIDER}` }}>
                <div style={{ maxWidth:1280, margin:"0 auto" }}>
                    <div style={{ marginBottom:64 }}>
                        <div className="sans" style={{ fontSize:10, fontWeight:500, letterSpacing:"0.28em", textTransform:"uppercase" as const, color:GOLD, marginBottom:16, display:"flex", alignItems:"center", gap:12 }}>
                            <span style={{ width:24, height:1, background:GOLD, opacity:0.5, display:"inline-block" }}></span>
                            Markets Served
                        </div>
                        <h2 className="serif" style={{ fontSize:"clamp(28px,3.5vw,48px)", fontWeight:300, color:TEXT_PRIMARY, lineHeight:1.1, maxWidth:580, margin:0 }}>
                            Built for Every Sector of the{" "}
                            <span style={{ color:GOLD, fontStyle:"italic" }}>Built Environment</span>
                        </h2>
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:32 }} className="grid-4">
                        {[
                            ["🏢","COMMERCIAL","Office towers, retail and mixed-use across North America requiring FBC-compliant curtain wall and window wall systems."],
                            ["🎰","CASINO & ENTERTAINMENT","Iconic venues — Seminole Hard Rock, Scarlet Pearl — requiring bespoke facade solutions for high-traffic, high-profile environments."],
                            ["🏨","HOSPITALITY","Hotels and resorts demanding premium aesthetics, weather performance and acoustic separation across the Caribbean and North America."],
                            ["🏙️","RESIDENTIAL HIGH-RISE","Luxury condominiums requiring impact-rated, thermally-efficient glazing envelope systems meeting stringent FBC codes."],
                            ["✈️","TRANSPORTATION","Airport terminals including Miami, Dallas-Fort Worth, Fort McMurray and LF Wade Bermuda — engineered for extreme conditions."],
                            ["🏥","HEALTHCARE","Hospitals and medical facilities requiring durable, thermally efficient facade systems with low-maintenance performance."],
                            ["🏛️","GOVERNMENT","Government and civic buildings requiring FBC-compliant, long-life glazing solutions designed for institutional longevity."],
                            ["🎓","EDUCATION","Schools and universities requiring durable, impact-rated, energy-efficient window systems built to withstand decades of use."],
                        ].map(([icon,title,desc]) => (
                            <div key={title as string} style={{ padding:"28px 24px", background:BG_SURFACE, border:`1px solid ${DIVIDER}`, display:"flex", flexDirection:"column" }}>
                                <div style={{ width:44, height:44, background:`rgba(63,155,240,0.1)`, border:`1px solid rgba(63,155,240,0.18)`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20, fontSize:20, flexShrink:0 }}>
                                    {icon}
                                </div>
                                <div className="sans" style={{ fontSize:10, fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase" as const, color:TEXT_PRIMARY, marginBottom:10 }}>{title as string}</div>
                                <div className="sans" style={{ fontSize:12, fontWeight:300, color:TEXT_SECONDARY, lineHeight:1.75, flexGrow:1 }}>{desc as string}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
            <footer className="footer-pad" style={{ padding:"64px 64px 40px", background:BG_SURFACE, borderTop:`1px solid ${DIVIDER}` }}>
                <div style={{ maxWidth:1280, margin:"0 auto" }}>
                    <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:48, marginBottom:56 }} className="footer-grid">
                        <div>
                            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
                                <div style={{ width:28, height:28, borderRadius:2, border:`1px solid ${GOLD_DIM}`, background:`linear-gradient(135deg,${GOLD_GLOW},transparent)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                                    <span className="serif" style={{ fontSize:12, fontWeight:600, color:GOLD }}>NR</span>
                                </div>
                                <div className="sans" style={{ fontSize:14, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase" as const, color:TEXT_PRIMARY }}>NR Group</div>
                            </div>
                            <p className="sans" style={{ fontWeight:300, fontSize:13, color:TEXT_SECONDARY, lineHeight:1.75, maxWidth:260, marginBottom:20 }}>Facade &amp; Building Envelope Specialists. Precision-engineered glazing systems since 1990.</p>
                            <div className="sans" style={{ fontWeight:300, fontSize:11, color:TEXT_SUBTLE, marginBottom:4 }}>4348 Westroads Drive</div>
                            <div className="sans" style={{ fontWeight:300, fontSize:11, color:TEXT_SUBTLE, marginBottom:4 }}>West Palm Beach, FL 33407</div>
                            <div className="sans" style={{ fontWeight:300, fontSize:11, color:TEXT_SUBTLE, marginBottom:4 }}>(561) 844-1121</div>
                            <div className="sans" style={{ fontWeight:300, fontSize:11, color:TEXT_SUBTLE }}>info@nrwindows.com</div>
                        </div>
                        {[["Systems",["NR 8000 Curtain Wall","Series 6000 Window Wall","Lift & Slide Doors","Point Support Glass"]],["Services",["Design Assist","FBC Compliance","BIM / Revit","Project Management"]],["Company",["About NR Group","Projects","Leadership","Contact"]]].map(([section,links]) => (
                            <div key={section as string}>
                                <div className="sans" style={{ fontSize:10, fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, marginBottom:20 }}>{section as string}</div>
                                {(links as string[]).map(link => <div key={link} className="sans" style={{ fontSize:13, fontWeight:300, color:TEXT_SECONDARY, marginBottom:12, cursor:"pointer", transition:"color 0.2s" }}>{link}</div>)}
                            </div>
                        ))}
                    </div>
                    <div style={{ paddingTop:24, borderTop:`1px solid ${DIVIDER}`, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap" as const, gap:12 }}>
                        <div className="sans" style={{ fontSize:11, fontWeight:300, color:TEXT_SUBTLE }}>© {new Date().getFullYear()} NR Group. All rights reserved. FBC Approval FL-12847.</div>
                        <div className="sans" style={{ fontSize:11, fontWeight:300, color:TEXT_SUBTLE }}>www.nrfacade.com</div>
                    </div>
                </div>
            </footer>

            {/* ── RFI MODAL ──────────────────────────────────────────────────────────── */}
            {rfiOpen && (
                <div style={{ position:"fixed", inset:0, zIndex:500, background:"rgba(0,0,0,0.88)", backdropFilter:"blur(16px)", display:"flex", alignItems:"flex-end", justifyContent:"center" }} onClick={() => setRfiOpen(false)}>
                    <div style={{ width:"100%", maxWidth:900, maxHeight:"90vh", background:`linear-gradient(145deg,${BG_RAISED},${BG_SURFACE})`, border:`1px solid ${GLASS_BORDER}`, borderBottom:"none", borderRadius:"12px 12px 0 0", animation:"modalIn 0.4s cubic-bezier(0.16,1,0.3,1)", overflow:"hidden", display:"flex", flexDirection:"column" }} onClick={e => e.stopPropagation()}>
                        <div className="rfi-modal-inner" style={{ padding:"32px 40px 0", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
                            <div>
                                <div className="sans" style={{ fontSize:10, fontWeight:500, letterSpacing:"0.2em", textTransform:"uppercase" as const, color:GOLD, marginBottom:6 }}>Request for Information</div>
                                <div className="serif" style={{ fontWeight:300, fontSize:28, color:TEXT_PRIMARY }}>Submit Project Inquiry</div>
                            </div>
                            <button onClick={() => setRfiOpen(false)} style={{ background:"transparent", border:`1px solid ${GLASS_BORDER}`, color:TEXT_SECONDARY, width:36, height:36, cursor:"pointer", fontSize:16, borderRadius:2, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}>✕</button>
                        </div>
                        <div className="rfi-modal-body" style={{ padding:"28px 40px 40px", overflowY:"auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px 32px" }}>
                            {[["Full Name","name","text"],["Company","company","text"],["Email","email","email"],["Project Name","project","text"],["Location","location","text"]].map(([label,key,type]) => (
                                <div key={key as string}>
                                    <div className="sans" style={{ fontSize:10, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, marginBottom:8 }}>{label as string}</div>
                                    <input type={type as string} className="fi-dark" placeholder={label as string} value={(rfiData as any)[key as string]} onChange={e => setRfiData(prev => ({...prev,[key as string]:e.target.value}))} />
                                </div>
                            ))}
                            <div>
                                <div className="sans" style={{ fontSize:10, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, marginBottom:8 }}>System</div>
                                <select className="fi-dark" value={rfiData.system} onChange={e => setRfiData(prev => ({...prev,system:e.target.value}))}>
                                    {["NR 8000 Unitized Curtain Wall","Series 6000 Window Wall","NR 1100 Window Wall","Series 7000 Lift & Slide","Series 10000 Large Format","Point Support Glass"].map(s => <option key={s}>{s}</option>)}
                                </select>
                            </div>
                            <div style={{ gridColumn:"span 2" }}>
                                <div className="sans" style={{ fontSize:10, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, marginBottom:8 }}>Project Description</div>
                                <textarea className="fi-dark" rows={4} placeholder="Describe your project requirements, timeline, and facade area..." style={{ resize:"vertical" as const }} value={rfiData.description} onChange={e => setRfiData(prev => ({...prev,description:e.target.value}))} />
                            </div>
                            <div style={{ gridColumn:"span 2", display:"flex", gap:12 }}>
                                <button className="btn-gold" onClick={() => { alert(`RFI submitted! Our team will contact you at ${rfiData.email||"the provided email"}.`); setRfiOpen(false) }}>Submit RFI</button>
                                <button className="btn-dark" onClick={() => setRfiOpen(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── AI SPECIALIST ─────────────────────────────────────────────────────── */}
            {aiOpen && (
                <div className="ai-panel">
                    <div style={{ padding:"12px 14px 0", flexShrink:0 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                                <div style={{ width:8, height:8, borderRadius:"50%", background:"#4ade80", boxShadow:"0 0 6px rgba(74,222,128,0.6)" }} />
                                <div>
                                    <div className="sans" style={{ fontSize:10, fontWeight:600, letterSpacing:"0.16em", textTransform:"uppercase" as const, color:GOLD }}>Visual Engineering</div>
                                    <div className="sans" style={{ fontSize:8, fontWeight:300, color:TEXT_SUBTLE, marginTop:1 }}>NR Group · Specialist Online</div>
                                </div>
                            </div>
                            <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                                <button className={`tab-btn ${activeTab==="chat"?"on":"off"}`} onClick={() => setActiveTab("chat")}>Chat</button>
                                <button className={`tab-btn ${activeTab==="canvas"?"on":"off"}`} onClick={() => setActiveTab("canvas")}>Canvas</button>
                                <button onClick={() => setAiOpen(false)} style={{ background:"transparent", border:`1px solid ${GLASS_BORDER}`, color:TEXT_SUBTLE, width:26, height:26, cursor:"pointer", fontSize:12, borderRadius:4, marginLeft:4, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
                            </div>
                        </div>
                        <div style={{ height:1, background:DIVIDER }} />
                    </div>
                    {activeTab==="chat" ? (
                        <>
                            <div className="ai-messages">
                                {aiMessages.map((msg,i) => (
                                    <div key={i} style={{ marginBottom:12 }}>
                                        {msg.role==="user" ? (
                                            <div style={{ display:"flex", justifyContent:"flex-end" }}>
                                                <div className="sans" style={{ background:`linear-gradient(135deg,rgba(63,155,240,0.22),rgba(63,155,240,0.10))`, border:`1px solid ${GOLD_DIM}`, borderRadius:"10px 10px 2px 10px", padding:"8px 12px", maxWidth:"82%", fontSize:12, fontWeight:300, color:TEXT_PRIMARY, lineHeight:1.6 }}>{msg.content}</div>
                                            </div>
                                        ) : msg.type==="diagram" && msg.diagram ? (
                                            <div style={{ background:GLASS_BG, border:`1px solid ${GLASS_BORDER}`, borderRadius:8, overflow:"hidden", marginBottom:4 }}>
                                                <div dangerouslySetInnerHTML={{ __html:msg.diagram.svgContent }} />
                                                <div style={{ padding:"8px 12px", borderTop:`1px solid ${DIVIDER}` }}>
                                                    <div className="sans" style={{ fontSize:10, fontWeight:500, color:GOLD, letterSpacing:"0.1em" }}>{msg.diagram.title}</div>
                                                    <div className="sans" style={{ fontSize:9, fontWeight:300, color:TEXT_SUBTLE, marginTop:2 }}>{msg.diagram.subtitle}</div>
                                                </div>
                                                {msg.content && <div className="sans" style={{ fontSize:11, fontWeight:300, color:TEXT_SECONDARY, lineHeight:1.6, padding:"6px 12px 10px", whiteSpace:"pre-wrap" as const }}>{msg.content}</div>}
                                            </div>
                                        ) : msg.type==="spec-table" && msg.data ? (
                                            <div style={{ background:GLASS_BG, border:`1px solid ${GLASS_BORDER}`, borderRadius:8, padding:"10px 12px" }}>
                                                <div className="sans" style={{ fontSize:10, fontWeight:600, color:GOLD, letterSpacing:"0.1em", marginBottom:8, paddingBottom:6, borderBottom:`1px solid ${DIVIDER}` }}>{msg.data.series as string}</div>
                                                {Object.entries(msg.data).filter(([k])=>k!=="series"&&k!=="description").map(([k,v])=>(
                                                    <div key={k} style={{ display:"flex", justifyContent:"space-between", borderBottom:`1px solid rgba(255,255,255,0.04)`, padding:"4px 0" }}>
                                                        <span className="sans" style={{ fontSize:9, color:TEXT_SUBTLE, textTransform:"uppercase" as const, letterSpacing:"0.1em" }}>{k}</span>
                                                        <span className="sans" style={{ fontSize:9, color:TEXT_PRIMARY, fontWeight:400 }}>{Array.isArray(v)?v.join(", "):v as string}</span>
                                                    </div>
                                                ))}
                                                {msg.data.description && <div className="sans" style={{ fontSize:10, fontWeight:300, color:TEXT_SECONDARY, marginTop:8, lineHeight:1.6 }}>{msg.data.description as string}</div>}
                                            </div>
                                        ) : (
                                            <div style={{ background:"rgba(255,255,255,0.02)", borderRadius:8, padding:"8px 10px" }}>
                                                <div className="sans" style={{ fontSize:11, fontWeight:300, color:TEXT_SECONDARY, lineHeight:1.7, whiteSpace:"pre-wrap" as const }}>{msg.content}</div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {aiTyping && (
                                    <div style={{ display:"flex", gap:3, padding:"8px 10px", background:"rgba(255,255,255,0.02)", borderRadius:8, width:"fit-content" }}>
                                        <span className="typing-dot"/><span className="typing-dot"/><span className="typing-dot"/>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>
                            {/* Quick prompts */}
                            {aiMessages.length <= 1 && (
                                <div style={{ padding:"6px 12px", display:"flex", gap:6, flexWrap:"wrap" as const, borderTop:`1px solid ${DIVIDER}` }}>
                                    {QUICK_PROMPTS.map(p => (
                                        <button key={p} className="ai-quick-btn" onClick={() => { setAiInput(p); setTimeout(() => { const msg:ChatMessage={role:"user",type:"text",content:p}; setAiMessages(prev=>[...prev,msg]); setAiTyping(true); setTimeout(()=>{const r=processEngineering(p);if(r.type==="rfi"){setRfiMode(true);setAiMessages(prev=>[...prev,{role:"assistant",type:"text",content:"Starting RFI form — fill in the fields below."}])}else{setAiMessages(prev=>[...prev,r])};setAiTyping(false)},700) }, 10) }}>{p}</button>
                                    ))}
                                </div>
                            )}
                            {rfiMode ? (
                                <div style={{ padding:"10px 12px", borderTop:`1px solid ${DIVIDER}`, background:"rgba(63,155,240,0.04)" }}>
                                    <div className="sans" style={{ fontSize:9, fontWeight:500, color:GOLD, letterSpacing:"0.14em", textTransform:"uppercase" as const, marginBottom:8 }}>RFI Quick Form</div>
                                    {[["Project Name","project"],["Location","location"],["System","system"]].map(([label,key])=>(
                                        <div key={key} style={{ marginBottom:6 }}>
                                            <div className="sans" style={{ fontSize:9, color:TEXT_SUBTLE, marginBottom:3, letterSpacing:"0.1em" }}>{label}</div>
                                            <input className="ctrl-sel" value={(rfiData as any)[key]} onChange={e=>setRfiData(p=>({...p,[key]:e.target.value}))} placeholder={label} style={{ padding:"5px 8px", fontSize:11 }} />
                                        </div>
                                    ))}
                                    <div style={{ display:"flex", gap:8, marginTop:8 }}>
                                        <button onClick={() => { const doc=`RFI — ${new Date().toLocaleDateString()}\nProject: ${rfiData.project||"—"}\nSystem: ${rfiData.system}\nLocation: ${rfiData.location||"—"}\nRoute to: engineering@nrwindows.com`;setAiMessages(prev=>[...prev,{role:"assistant",type:"text",content:`**RFI Compiled** ✓\n\n\`\`\`\n${doc}\n\`\`\`\n\nEmail to: **engineering@nrwindows.com**\n📞 (561) 844-1121`}]);setRfiMode(false) }} style={{ background:`linear-gradient(135deg,#2f86e0,${GOLD})`, color:"#fff", border:"none", padding:"7px 16px", borderRadius:4, cursor:"pointer", fontSize:9, fontFamily:"'Jost',sans-serif", fontWeight:500, letterSpacing:"0.12em" }}>Compile RFI</button>
                                        <button onClick={() => setRfiMode(false)} style={{ background:"transparent", color:TEXT_SUBTLE, border:`1px solid ${GLASS_BORDER}`, padding:"7px 16px", borderRadius:4, cursor:"pointer", fontSize:9, fontFamily:"'Jost',sans-serif" }}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="ai-input-row">
                                    <input value={aiInput} onChange={e=>setAiInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&sendAiMessage()} placeholder='Ask about systems, specs, FBC, RFI...' />
                                    <button className="ai-send" onClick={sendAiMessage}>→</button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div style={{ flex:1, overflow:"auto", padding:"10px 12px" }}>
                            <div style={{ marginBottom:10 }}>
                                <select className="ctrl-sel" value={canvasSystem} onChange={e=>setCanvasSystem(e.target.value)} style={{ marginBottom:6 }}>
                                    {Object.entries(ENGINEERING_DB).map(([k,v])=><option key={k} value={k}>{(v as any).series}</option>)}
                                </select>
                                <div style={{ display:"flex", gap:6, marginBottom:6 }}>
                                    <select className="ctrl-sel" value={canvasFinish} onChange={e=>setCanvasFinish(e.target.value)} style={{ flex:1 }}>
                                        {Object.entries(FINISH_COLORS).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
                                    </select>
                                    <select className="ctrl-sel" value={canvasWall} onChange={e=>setCanvasWall(e.target.value)} style={{ flex:1 }}>
                                        {Object.entries(WALL_COLORS).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
                                    </select>
                                </div>
                                <div style={{ display:"flex", gap:6 }}>
                                    {(["layout","elevation","joint"] as const).map(t=><button key={t} className={`tab-btn ${canvasDiagramType===t?"on":"off"}`} onClick={()=>setCanvasDiagramType(t)} style={{ flex:1 }}>{t}</button>)}
                                </div>
                            </div>
                            <div style={{ background:"#0c0f16", borderRadius:6, overflow:"hidden", border:`1px solid ${GLASS_BORDER}` }} dangerouslySetInnerHTML={{ __html:canvasSvg }} />
                            <div style={{ marginTop:8, padding:"8px 10px", background:GLASS_BG, border:`1px solid ${GLASS_BORDER}`, borderRadius:4 }}>
                                <div className="sans" style={{ fontSize:9, color:GOLD, fontWeight:500, letterSpacing:"0.12em" }}>{canvasDb.series}</div>
                                <div className="sans" style={{ fontSize:8, color:TEXT_SUBTLE, marginTop:2 }}>FBC: {canvasDb.fbc} · Impact: {canvasDb.impact} · U-Factor: {canvasDb.uFactor}</div>
                            </div>
                        </div>
                    )}
                    <div style={{ padding:"5px 12px 7px", borderTop:`1px solid ${DIVIDER}`, display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0, background:"rgba(0,0,0,0.15)" }}>
                        <div className="sans" style={{ fontWeight:300, fontSize:8, color:TEXT_SUBTLE }}>NR Group · FBC 8th Ed · Visual Engineering</div>
                        <button onClick={() => {setRfiMode(true);setActiveTab("chat")}} style={{ background:"transparent", border:"none", fontFamily:"'Jost',sans-serif", fontSize:8, fontWeight:400, letterSpacing:"0.12em", textTransform:"uppercase" as const, color:GOLD, cursor:"pointer", padding:0 }}>Generate RFI ◈</button>
                    </div>
                </div>
            )}

            <button className="ai-fab gold-glow-el" onClick={() => setAiOpen(p => !p)}>◈</button>
            <div className="ai-fab-ring" />
        </div>
    )
}

addPropertyControls(NRGroupWebsite, {})