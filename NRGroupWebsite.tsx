import { addPropertyControls } from "framer"
import { useState, useEffect, useRef } from "react"
import ArchitecturalProductSystems from "./ArchitecturalProductSystems.tsx"

// ─── THEME CONSTANTS ─────────────────────────────────────────────────────────

const BG_BASE = "#05070b"; export const BG_SURFACE = "#090d15"; export const BG_RAISED = "#0f1626"
const BG_FLOAT = "#152038"; export const BG_MID = "#0a0f1a"
const TEXT_PRIMARY = "#f2f5fa"; export const TEXT_SECONDARY = "#929eb8"; export const TEXT_SUBTLE = "#4f5a72"
const GOLD = "#3f9bf0"; export const GOLD_DIM = "rgba(63,155,240,0.55)"; export const GOLD_GLOW = "rgba(63,155,240,0.15)"
const EDGE_LIGHT = "rgba(255,255,255,0.06)"; export const GLASS_BG = "rgba(255,255,255,0.035)"
const GLASS_BORDER = "rgba(255,255,255,0.08)"; export const DIVIDER = "rgba(255,255,255,0.055)"
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

        /* ── KEYFRAMES ── */
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

        /* ── HERO ENTRANCE ── */
        .hero-loaded .h-label{animation:fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.15s both;}
        .hero-loaded .h-title{animation:fadeUp 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s both;}
        .hero-loaded .h-sub{animation:fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.5s both;}
        .hero-loaded .h-cta{animation:fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s both;}
        .hero-loaded .h-stats{animation:fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.8s both;}

        /* ── SCROLL REVEALS — 3D choreography ── */
        .nr-reveal{
          opacity:0;
          transform:translateY(36px) translateZ(-20px);
          transition:opacity 1s cubic-bezier(0.22,1,0.36,1),transform 1s cubic-bezier(0.22,1,0.36,1);
        }
        .nr-reveal.nr-visible{opacity:1;transform:translateY(0) translateZ(0);}
        .nr-reveal-delay-1{transition-delay:0.1s;}
        .nr-reveal-delay-2{transition-delay:0.2s;}
        .nr-reveal-delay-3{transition-delay:0.34s;}
        .nr-reveal-delay-4{transition-delay:0.48s;}

        /* ── 3D TILT CARDS ── */
        .tilt-card{
          transition:transform 0.18s ease,box-shadow 0.18s ease;
          transform-style:preserve-3d;will-change:transform;
        }
        .tilt-card:hover{z-index:10;}

        /* ── FLOATING PARALLAX CARDS ── */
        .float-card{animation:floatY 6s ease-in-out infinite;will-change:transform;}
        .float-card:nth-child(2n){animation:floatRotate 7s ease-in-out infinite;}
        .float-card:nth-child(3n){animation:floatY 8s ease-in-out infinite 1s;}

        /* ── CINEMATIC SECTION DIVIDERS ── */
        section{position:relative;}
        section+section{margin-top:-2px;}
        .section-cinematic::before{
          content:'';position:absolute;top:0;left:0;right:0;height:1px;
          background:linear-gradient(to right,transparent,rgba(63,155,240,0.2),transparent);z-index:2;
        }

        /* ── SHIMMER on headings ── */
        .shimmer-heading{position:relative;display:inline-block;overflow:hidden;}
        .shimmer-heading::after{
          content:'';position:absolute;top:0;left:0;width:40%;height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.055),transparent);
          animation:shimmerLine 3.5s ease infinite;pointer-events:none;
        }

        /* ── GOLD GLOW pulse ── */
        .gold-glow-el{animation:glowPulse 3.5s ease-in-out infinite;}

        /* ── PROJECT CARDS — cinematic ── */
        .proj-card{
          position:relative;overflow:hidden;cursor:pointer;
          border-radius:3px;border:1px solid ${GLASS_BORDER};box-shadow:${SHADOW_MD};
          transition:transform 0.4s cubic-bezier(0.16,1,0.3,1),box-shadow 0.4s cubic-bezier(0.16,1,0.3,1),border-color 0.4s ease;
          transform-style:preserve-3d;will-change:transform;
        }
        .proj-card::after{
          content:'';position:absolute;inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,0.04) 0%,transparent 50%);
          opacity:0;transition:opacity 0.4s ease;pointer-events:none;z-index:5;
        }
        .proj-card:hover::after{opacity:1;}
        .proj-card:hover{
          transform:translateY(-10px) scale(1.02);
          box-shadow:0 32px 80px rgba(0,0,0,0.7),0 8px 30px rgba(63,155,240,0.12),inset 0 1px 0 rgba(255,255,255,0.08);
          border-color:rgba(63,155,240,0.3);
        }
        .proj-card img{
          width:100%;height:100%;object-fit:cover;opacity:0.18;
          transition:transform 1s cubic-bezier(0.16,1,0.3,1),opacity 0.6s ease;
        }
        .proj-card:hover img{transform:scale(1.25);opacity:0.65;}

        /* ── PRODUCT CARDS ── */
        .prod-card{
          background:linear-gradient(145deg,${BG_RAISED},${BG_SURFACE});
          border:1px solid ${GLASS_BORDER};border-radius:3px;overflow:hidden;box-shadow:${SHADOW_MD};
          transition:box-shadow 0.4s cubic-bezier(0.16,1,0.3,1),transform 0.4s cubic-bezier(0.16,1,0.3,1),border-color 0.4s ease;
          position:relative;transform-style:preserve-3d;
        }
        .prod-card::before{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,rgba(255,255,255,0.04) 0%,transparent 60%);pointer-events:none;z-index:0;}
        .prod-card:hover{
          box-shadow:${SHADOW_LG},0 0 0 1px rgba(63,155,240,0.25),0 0 60px rgba(63,155,240,0.06);
          transform:translateY(-8px) rotateX(1deg);border-color:rgba(63,155,240,0.35);
        }

        /* ── EXPERTISE ACCORDION ── */
        .exp-row{border-top:1px solid ${DIVIDER};padding:28px 0;cursor:pointer;transition:all 0.3s ease;}
        .exp-row:last-child{border-bottom:1px solid ${DIVIDER};}
        .exp-row:hover{opacity:0.88;padding-left:8px;}

        /* ── PROFILE CARDS ── */
        .prof-card{border-top:1px solid ${DIVIDER};padding-top:28px;transition:opacity 0.3s,transform 0.3s;}
        .prof-card:hover{opacity:0.88;transform:translateY(-4px);}

        /* ── MARQUEE ── */
        .mrq-track{display:flex;gap:72px;width:max-content;animation:marquee 26s linear infinite;}
        .mrq-track:hover{animation-play-state:paused;}

        /* ── AI PANEL ── */
        .ai-panel{position:fixed;bottom:88px;right:20px;width:460px;height:78vh;max-height:780px;background:linear-gradient(145deg,${BG_RAISED},${BG_SURFACE});border:1px solid ${GLASS_BORDER};border-top:1px solid ${EDGE_LIGHT};border-radius:14px 14px 4px 4px;box-shadow:${SHADOW_XL};display:flex;flex-direction:column;overflow:hidden;z-index:400;animation:slideInRight 0.35s cubic-bezier(0.16,1,0.3,1);}
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

        /* ═══════════════════════════════════════════
           RESPONSIVE BREAKPOINTS
           ═══════════════════════════════════════════ */

        /* ── TABLET (768–1024px) ── */
        @media (max-width: 1024px) {
          .nr-nav-links{gap:28px !important;}
          .nr-nav-pad{padding:0 32px !important;}
          .hero-content{padding:0 40px !important;}
          .hero-title{font-size:clamp(44px,7vw,80px) !important;}
          .section-pad{padding:80px 40px !important;}
          .grid-3{grid-template-columns:repeat(2,1fr) !important;}
          .grid-4{grid-template-columns:repeat(2,1fr) !important;}
          .grid-2{grid-template-columns:1fr !important;gap:56px !important;}
          .expertise-grid{grid-template-columns:1fr !important;gap:48px !important;}
          .stat-strip{flex-wrap:wrap !important;}
          .stat-strip > div{flex:1 1 40% !important;border-right:none !important;border-bottom:1px solid rgba(255,255,255,0.07) !important;}
          .ai-panel{width:380px !important;right:16px !important;}
          .about-float-card{bottom:-20px !important;right:-16px !important;}
          .footprint-grid{grid-template-columns:1fr !important;}
          .metrics-row{grid-template-columns:repeat(2,1fr) !important;}
          .footer-grid{grid-template-columns:1fr 1fr !important;gap:40px !important;}
          .banner-glass{padding:32px 40px !important;}
          .banner-title{font-size:clamp(22px,4vw,44px) !important;}
        }

        /* ── MOBILE (≤767px) ── */
        @media (max-width: 767px) {
          .nr-nav-links{display:none !important;}
          .nr-nav-pad{padding:0 20px !important;height:60px !important;}
          .btn-rfi{padding:7px 14px !important;font-size:9px !important;}
          .hero-content{padding:0 20px !important;}
          .hero-title{font-size:clamp(36px,10vw,60px) !important;line-height:1 !important;}
          .hero-sub{font-size:14px !important;max-width:100% !important;}
          .hero-cta-row{flex-direction:column !important;gap:10px !important;}
          .hero-cta-row button{width:100% !important;}
          .hero-scroll-cue{display:none !important;}
          .stat-strip{display:grid !important;grid-template-columns:1fr 1fr !important;}
          .stat-strip > div{padding:16px 12px !important;border-right:1px solid rgba(255,255,255,0.06) !important;border-bottom:1px solid rgba(255,255,255,0.06) !important;}
          .stat-strip > div:nth-child(2n){border-right:none !important;}
          .grid-3,.grid-4,.grid-2,.expertise-grid,.footprint-grid,.metrics-row,.footer-grid{grid-template-columns:1fr !important;gap:16px !important;}
          .footprint-grid > div{border-left:2px solid ${GOLD} !important;}
          .section-h2{font-size:clamp(32px,9vw,52px) !important;}
          .proj-card{height:260px !important;grid-column:span 1 !important;}
          .slide-info-card{bottom:24px !important;left:20px !important;right:20px !important;padding:18px 20px !important;}
          .slide-progress{right:20px !important;bottom:12px !important;}
          .about-img{height:340px !important;}
          .about-float-card{bottom:-16px !important;right:8px !important;padding:16px 18px !important;}
          .ai-panel{width:calc(100vw - 24px) !important;right:12px !important;bottom:76px !important;height:72vh !important;}
          .ai-fab,.ai-fab-ring{bottom:16px !important;right:16px !important;width:46px !important;height:46px !important;}
          .rfi-modal-inner{padding:28px 20px 0 !important;}
          .rfi-modal-body{padding:0 20px 28px !important;grid-template-columns:1fr !important;}
          .banner-glass{padding:28px 24px !important;}
          .banner-title{font-size:clamp(18px,6vw,32px) !important;}
          .footer-pad{padding:56px 20px 32px !important;}
          .float-card{animation:none !important;}
          .tilt-card{transform:none !important;}
        }

        /* ── EXTRA SMALL (≤390px) ── */
        @media (max-width: 390px) {
          .hero-title{font-size:34px !important;}
          .section-h2{font-size:28px !important;}
          .stat-strip{grid-template-columns:1fr !important;}
          .stat-strip > div{border-right:none !important;}
        }

        /* ── TOUCH DEVICES: disable mouse-driven effects ── */
        @media (hover: none) {
          .tilt-card{transform:none !important;transition:none !important;}
          .float-card{animation:none !important;}
          .proj-card:hover{transform:translateY(-4px) !important;}
          .shimmer-heading::after{display:none;}
        }

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
const EXPERTISE = [
    { num: "01", title: "Curtain Wall Systems", desc: "Unitized and stick-built curtain wall systems engineered for high-rise towers with LMI/SMI impact ratings. FBC-approved from FL-12847.", detail: "NR 8000 · NR 5000 · NR 1100" },
    { num: "02", title: "Window Wall Systems", desc: "Floor-to-floor window wall solutions designed for multi-family and mixed-use residential towers with full impact certification.", detail: "Series 6000 · Series 6000-i" },
    { num: "03", title: "Lift & Slide Doors", desc: "Ultra-large format lift-and-slide doors for seamless indoor/outdoor living in luxury residential and resort environments.", detail: "Series 7000 · Series 10000" },
    { num: "04", title: "Point Support Glass", desc: "Spider-fitting point-support glass systems for dramatic all-glass facades, canopies, and overhead skylight installations.", detail: "PSG Systems · PSG Overhead" },
]
const STATS = [
    { value: "30+", label: "Years of Excellence" },
    { value: "$120M", label: "Annual Revenue" },
    { value: "200+", label: "Global Employees" },
    { value: "1.5M", label: "Sq Ft Produced Annually" },
]
const LEADERSHIP = [
    { initials: "NS", name: "Noshad Ali Shamshad", title: "Founder & President", bio: "Founded NR Group in 1990 with a vision to deliver precision-engineered facade systems. Over 30 years leading NR's growth across North America and the Caribbean." },
    { initials: "SA", name: "Shahzad Ali", title: "COO / Vice President", bio: "Co-founder overseeing operations, procurement, and the NRV Façade joint venture production facility in Cartagena, Colombia." },
    { initials: "DT", name: "David Taylor", title: "Chief Estimator", bio: "20+ years estimating complex curtain wall and window wall systems. Expert in FBC compliance, value engineering, and design-assist coordination." },
    { initials: "KK", name: "Krishna V. Konda", title: "Pre-Construction / PM", bio: "Leads design-assist and pre-construction services, coordinating BIM/Revit modelling, shop drawings, and engineering from concept to installation." },

]
const CATEGORIES = ["All", "Commercial", "Aviation", "Hospitality", "Residential", "Mixed-Use", "Healthcare"]


// ─── FINISH / WALL COLOUR MAPS ────────────────────────────────────────────────
const FINISH_COLORS: Record<string, { frame: string; label: string; hex: string; code: string }> = {
    "mill":            { frame: "#c0b89a", label: "Mill Finish",          hex: "#c0b89a", code: "Mill" },
    "anodized clear":  { frame: "#b8c4c8", label: "Anodized — Clear",     hex: "#b8c4c8", code: "ANO-CLR" },
    "anodized bronze": { frame: "#6b4f35", label: "Anodized — Bronze",    hex: "#6b4f35", code: "ANO-BRZ" },
    "anodized black":  { frame: "#1a1a1a", label: "Anodized — Black",     hex: "#1a1a1a", code: "ANO-BLK" },
    "powder white":    { frame: "#e8e4de", label: "Powder Coat — White",  hex: "#e8e4de", code: "RAL-9016" },
    "powder bronze":   { frame: "#7a5c3a", label: "Powder Coat — Bronze", hex: "#7a5c3a", code: "RAL-8019" },
    "powder black":    { frame: "#1c1c1c", label: "Powder Coat — Black",  hex: "#1c1c1c", code: "RAL-9005" },
}
const WALL_COLORS: Record<string, { bg: string; label: string; hex: string }> = {
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
type DiagramConfig = {
    system: string; frameColor: string; wallColor: string; glassColor: string
    floors?: number; bays?: number; panelW?: number; panelH?: number
    finishLabel?: string; wallLabel?: string
}

function generateCurtainWallSVG(cfg: DiagramConfig): string {
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

function generateWindowWallSVG(cfg: DiagramConfig): string {
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

function generateDoorSVG(cfg: DiagramConfig): string {
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

function generateJointDetailSVG(frameColor: string, system: string, finishLabel: string): string {
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

function generateElevationSVG(cfg: DiagramConfig): string {
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
const ENGINEERING_DB: Record<string, {
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

type DiagramMsg = { svgContent: string; title: string; subtitle: string; diagramType: string }
type ChatMessage = {
    role: "user" | "assistant" | "system"; content: string
    type?: "text" | "spec-table" | "rfi" | "warning" | "workflow" | "diagram"
    data?: Record<string, string | string[]>; diagram?: DiagramMsg
}

function detectFinish(q: string) {
    for (const [key, val] of Object.entries(FINISH_COLORS))
        if (q.includes(key) || q.includes(val.code.toLowerCase()))
            return { frameColor: val.frame, finishLabel: val.label, finishKey: key }
    return { frameColor: FINISH_COLORS["mill"].frame, finishLabel: "Mill Finish", finishKey: "mill" }
}
function detectWall(q: string) {
    for (const [key, val] of Object.entries(WALL_COLORS))
        if (q.includes(key)) return { wallColor: val.bg, wallLabel: val.label }
    return { wallColor: WALL_COLORS["concrete"].bg, wallLabel: "Concrete" }
}
function detectSeries(q: string): string | null {
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

function processEngineering(input: string): ChatMessage {
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
    const [aiMessages, setAiMessages] = useState<ChatMessage[]>([{ role:"assistant", type:"text", content:"**NR Group Visual Engineering Specialist — Online**\n\nI render live architectural diagrams and provide technical data.\n\nTry: *\"Show NR 8000 with Powder Black frame and gray wall\"*" }])
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

        // ── Scroll tracker ──
        const onScroll = () => setScrollY(window.scrollY)
        window.addEventListener("scroll", onScroll, { passive: true })

        // ── IntersectionObserver: reveal + 3D entrance ──
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("nr-visible")
                        obs.unobserve(e.target)
                    }
                })
            },
            { threshold: 0.08, rootMargin: "0px 0px -48px 0px" }
        )
        document.querySelectorAll(".nr-reveal").forEach((el) => obs.observe(el))

        // ── Parallax depth layers on scroll ──
        const onParallax = () => {
            const sy = window.scrollY
            document.querySelectorAll("[data-depth]").forEach((el) => {
                const d = parseFloat((el as HTMLElement).dataset.depth || "0")
                ;(el as HTMLElement).style.transform = `translateY(${sy * d}px)`
            })
            document.querySelectorAll(".float-card").forEach((el, i) => {
                const speed = 0.04 + i * 0.01
                const drift = Math.sin(sy * 0.002 + i * 1.2) * 10
                ;(el as HTMLElement).style.transform =
                    `translateY(${sy * speed + drift}px) rotateX(${drift * 0.15}deg)`
            })
        }
        window.addEventListener("scroll", onParallax, { passive: true })

        // ── 3D tilt on mouse move ──
        const onMouseMove = (e: MouseEvent) => {
            document.querySelectorAll(".tilt-card").forEach((card) => {
                const rect = (card as HTMLElement).getBoundingClientRect()
                const cx = rect.left + rect.width / 2
                const cy = rect.top + rect.height / 2
                const dx = (e.clientX - cx) / (rect.width / 2)
                const dy = (e.clientY - cy) / (rect.height / 2)
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < 1.4) {
                    const rx = dy * -8; const ry = dx * 8
                    ;(card as HTMLElement).style.transform =
                        `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`
                } else {
                    ;(card as HTMLElement).style.transform =
                        "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
                }
            })
        }
        window.addEventListener("mousemove", onMouseMove)

        return () => {
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("scroll", onParallax)
            window.removeEventListener("mousemove", onMouseMove)
            obs.disconnect()
        }
    }, [])

    useEffect(() => {
        const t = setInterval(() => setActiveSlide((p) => (p + 1) % PROJECTS.length), 5000)
        return () => clearInterval(t)
    }, [])

    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }) }, [aiMessages, aiTyping])

    const filteredProjects = filterCat === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filterCat)
    const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    const navScrolled = scrollY > 40
    const navBg = navScrolled ? "rgba(14,17,23,0.94)" : "transparent"
    const navBorder = navScrolled ? `1px solid ${DIVIDER}` : "none"

    const getCanvasSVG = () => {
        const db = ENGINEERING_DB[canvasSystem] || ENGINEERING_DB["8000"]
        const fc = FINISH_COLORS[canvasFinish]?.frame || FINISH_COLORS["mill"].frame
        const fl = FINISH_COLORS[canvasFinish]?.label || "Mill Finish"
        const wc = WALL_COLORS[canvasWall]?.bg || WALL_COLORS["concrete"].bg
        const wl = WALL_COLORS[canvasWall]?.label || "Concrete"
        const gl = "rgba(140,190,230,0.55)"
        const cfg: DiagramConfig = { system: db.series, frameColor: fc, wallColor: wc, glassColor: gl, finishLabel: fl, wallLabel: wl, floors: canvasFloors, bays: canvasBays }
        if (canvasDiagramType === "joint") return generateJointDetailSVG(fc, db.series, fl)
        if (canvasDiagramType === "elevation") return generateElevationSVG({ ...cfg, floors: Math.max(canvasFloors, 4) })
        if (db.diagramType === "curtainwall") return generateCurtainWallSVG(cfg)
        if (db.diagramType === "windowwall") return generateWindowWallSVG(cfg)
        return generateDoorSVG({ ...cfg, panelW: 96, panelH: 120 })
    }

    const sendAIMessage = () => {
        if (!aiInput.trim()) return
        const userMsg: ChatMessage = { role: "user", type: "text", content: aiInput }
        const inputText = aiInput
        setAiMessages((prev) => [...prev, userMsg]); setAiInput(""); setAiTyping(true)
        setTimeout(() => {
            const response = processEngineering(inputText)
            if (response.content === "RFI_GENERATE") setRfiMode(true)
            setAiMessages((prev) => [...prev, response]); setAiTyping(false)
        }, 700 + Math.random() * 400)
    }

    const renderMsg = (msg: ChatMessage, idx: number) => {
        if (msg.role === "user") return (
            <div key={idx} style={{ display:"flex", justifyContent:"flex-end", marginBottom:14 }}>
                <div style={{ background:`linear-gradient(135deg,${BG_FLOAT},${BG_RAISED})`, border:`1px solid ${GLASS_BORDER}`, borderRadius:"10px 10px 2px 10px", padding:"10px 14px", maxWidth:"82%", boxShadow:SHADOW_SM }}>
                    <p style={{ fontFamily:"'Jost',sans-serif", fontWeight:300, fontSize:13, color:TEXT_PRIMARY, lineHeight:1.55, whiteSpace:"pre-wrap" }}>{msg.content}</p>
                </div>
            </div>
        )
        if (msg.type === "diagram" && msg.diagram) return (
            <div key={idx} style={{ marginBottom:18 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                    <div style={{ width:22, height:22, background:`linear-gradient(135deg,${GOLD},#1a64b8)`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10 }}>◈</div>
                    <span style={{ fontFamily:"'Jost',sans-serif", fontSize:10, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:GOLD }}>Visual Render · MCP Canvas</span>
                </div>
                <div style={{ background:`linear-gradient(145deg,${BG_RAISED},${BG_SURFACE})`, border:`1px solid ${GLASS_BORDER}`, borderTop:`1px solid ${EDGE_LIGHT}`, borderRadius:4, overflow:"hidden", boxShadow:SHADOW_MD, marginBottom:10 }}>
                    <div style={{ padding:"8px 12px", borderBottom:`1px solid ${DIVIDER}`, display:"flex", justifyContent:"space-between", background:"rgba(0,0,0,0.2)" }}>
                        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:GOLD }}>{msg.diagram.diagramType.toUpperCase()} DIAGRAM</div>
                        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, color:TEXT_SUBTLE }}>NR Group · West Palm Beach FL</div>
                    </div>
                    <div style={{ padding:"12px 10px", overflowX:"auto" }} dangerouslySetInnerHTML={{ __html:msg.diagram.svgContent }} />
                    <div style={{ padding:"6px 12px", borderTop:`1px solid ${DIVIDER}`, background:"rgba(0,0,0,0.15)" }}>
                        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, color:TEXT_SUBTLE }}>{msg.diagram.subtitle}</div>
                    </div>
                </div>
                <div style={{ paddingLeft:30 }}>
                    {msg.content.split("\n").map((line,li) => {
                        if (!line.trim()) return <div key={li} style={{height:5}}/>
                        const clean = line.replace(/\*\*/g,""); const isBold = line.startsWith("**")
                        return <p key={li} style={{ fontFamily:"'Jost',sans-serif", fontWeight:isBold?500:300, fontSize:12, color:isBold?TEXT_PRIMARY:TEXT_SECONDARY, lineHeight:1.65, marginBottom:2 }}>{clean}</p>
                    })}
                </div>
            </div>
        )
        if (msg.type === "spec-table" && msg.data) return (
            <div key={idx} style={{ marginBottom:18 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                    <div style={{ width:22, height:22, background:`linear-gradient(135deg,${GOLD},#1a64b8)`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10 }}>◈</div>
                    <span style={{ fontFamily:"'Jost',sans-serif", fontSize:10, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:GOLD }}>Technical Specification Sheet</span>
                </div>
                <div style={{ background:`linear-gradient(145deg,${BG_RAISED},${BG_SURFACE})`, border:`1px solid ${GLASS_BORDER}`, borderTop:`1px solid ${EDGE_LIGHT}`, borderRadius:3, overflow:"hidden", boxShadow:SHADOW_MD }}>
                    <div style={{ padding:"12px 14px", background:"rgba(63,155,240,0.06)", borderBottom:`1px solid ${DIVIDER}` }}>
                        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:15, color:TEXT_PRIMARY }}>{msg.data.series as string}</div>
                        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, marginTop:2 }}>{msg.data.category as string}</div>
                    </div>
                    <div style={{ padding:"10px 14px" }}>
                        <p style={{ fontFamily:"'Jost',sans-serif", fontWeight:300, fontSize:11, color:TEXT_SECONDARY, lineHeight:1.6, marginBottom:12 }}>{msg.data.description as string}</p>
                        {[["FBC Approval",msg.data.fbc],["Impact",msg.data.impact],["Max DP",msg.data.maxDP],["Water DP",msg.data.waterDP],["Max Width",msg.data.maxWidth],["Max Height",msg.data.maxHeight],["U-Factor",msg.data.uFactor],["SHGC",msg.data.shgc],["Thermal Break",msg.data.thermalBreak],["Finishes",msg.data.finishes]].map(([k,v]) => (
                            <div key={k as string} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${DIVIDER}`, gap:10 }}>
                                <span style={{ fontFamily:"'Jost',sans-serif", fontSize:9, fontWeight:400, letterSpacing:"0.08em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, flexShrink:0 }}>{k as string}</span>
                                <span style={{ fontFamily:"'Jost',sans-serif", fontSize:10, fontWeight:400, color:TEXT_PRIMARY, textAlign:"right" as const }}>{v as string}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
        if (msg.type === "workflow" && msg.data) {
            const steps = (msg.data.steps as string).split("||")
            return (
                <div key={idx} style={{ marginBottom:18 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                        <div style={{ width:22, height:22, background:`linear-gradient(135deg,${GOLD},#1a64b8)`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10 }}>◈</div>
                        <span style={{ fontFamily:"'Jost',sans-serif", fontSize:10, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:GOLD }}>Turnkey Lifecycle</span>
                    </div>
                    <p style={{ fontFamily:"'Jost',sans-serif", fontWeight:300, fontSize:11, color:TEXT_SECONDARY, lineHeight:1.6, marginBottom:12 }}>{msg.content}</p>
                    {steps.map((step,i) => (
                        <div key={i} style={{ display:"flex", gap:10, marginBottom:6, padding:"8px 12px", background:`linear-gradient(145deg,${BG_RAISED},${BG_SURFACE})`, border:`1px solid ${GLASS_BORDER}`, borderLeft:`2px solid ${GOLD}`, borderRadius:2 }}>
                            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:16, color:GOLD, lineHeight:1, flexShrink:0, opacity:0.7, minWidth:22 }}>{String(i+1).padStart(2,"0")}</div>
                            <div style={{ fontFamily:"'Jost',sans-serif", fontWeight:300, fontSize:11, color:TEXT_SECONDARY, lineHeight:1.5, alignSelf:"center" }}>{step}</div>
                        </div>
                    ))}
                </div>
            )
        }
        if (msg.type === "warning") return (
            <div key={idx} style={{ marginBottom:14 }}>
                <div style={{ background:"rgba(239,68,68,0.07)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:3, padding:"12px 14px" }}>
                    <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:"#f87171", marginBottom:6 }}>⚠ Structural Notice</div>
                    <p style={{ fontFamily:"'Jost',sans-serif", fontWeight:300, fontSize:11, color:"#fca5a5", lineHeight:1.6 }}>{msg.content}</p>
                </div>
            </div>
        )
        const lines = msg.content.split("\n")
        return (
            <div key={idx} style={{ marginBottom:18 }}>
                <div style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                    <div style={{ width:22, height:22, background:`linear-gradient(135deg,${GOLD},#1a64b8)`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, flexShrink:0, marginTop:1 }}>◈</div>
                    <div style={{ flex:1 }}>
                        {lines.map((line,li) => {
                            if (!line.trim()) return <div key={li} style={{height:5}}/>
                            const isSep = line.includes("---"); if (isSep) return null
                            const isTableRow = line.startsWith("|")
                            if (isTableRow) {
                                const cells = line.split("|").filter(c=>c.trim())
                                const isHeader = lines[li+1]?.includes("---")
                                return <div key={li} style={{ display:"grid", gridTemplateColumns:`repeat(${cells.length},1fr)`, gap:1, marginBottom:1, background:DIVIDER }}>
                                    {cells.map((c,ci) => <div key={ci} style={{ padding:"4px 7px", background:isHeader?"rgba(63,155,240,0.08)":BG_SURFACE, fontFamily:"'Jost',sans-serif", fontSize:9, fontWeight:isHeader?500:300, color:isHeader?GOLD:TEXT_SECONDARY }}>{c.trim()}</div>)}
                                </div>
                            }
                            const clean = line.replace(/\*\*/g,""); const isBold = line.startsWith("**")&&line.includes("**",2)
                            return <p key={li} style={{ fontFamily:"'Jost',sans-serif", fontWeight:isBold?500:300, fontSize:12, color:isBold?TEXT_PRIMARY:TEXT_SECONDARY, lineHeight:1.65, marginBottom:line.startsWith("•")?3:0, paddingLeft:line.startsWith("•")?6:0 }}>{clean}</p>
                        })}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={{ fontFamily:"'Jost','Helvetica Neue',Arial,sans-serif", backgroundColor:BG_BASE, color:TEXT_PRIMARY, overflowX:"hidden", width:"100%", opacity:loaded?1:0, transition:"opacity 0.55s ease" }}>
            <style>{GLOBAL_CSS}</style>

            {/* ── NAV ──────────────────────────────────────────────────────────────── */}
            <nav className="nr-nav-pad" style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, height:72, padding:"0 48px", display:"flex", alignItems:"center", justifyContent:"space-between", background:navBg, borderBottom:navBorder, backdropFilter:navScrolled?"blur(28px) saturate(180%)":"none", transition:"background 0.4s ease,border 0.4s ease", boxShadow:navScrolled?"0 1px 0 rgba(255,255,255,0.04),0 4px 24px rgba(0,0,0,0.5)":"none" }}>
                <div style={{ cursor:"pointer", flexShrink:0, display:"flex", alignItems:"center", gap:12 }} onClick={() => scrollTo("hero")}>
                    <div style={{ width:34, height:34, borderRadius:2, border:`1px solid ${GOLD_DIM}`, background:"linear-gradient(135deg,rgba(63,155,240,0.20),rgba(63,155,240,0.04))", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 16px rgba(63,155,240,0.25)", flexShrink:0 }}>
                        <span className="serif" style={{ fontSize:15, fontWeight:600, color:"#ffffff", letterSpacing:"0.04em" }}>NR</span>
                    </div>
                    <div>
                        <div className="sans" style={{ fontSize:16, fontWeight:600, letterSpacing:"0.22em", textTransform:"uppercase" as const, color:"#ffffff", lineHeight:1 }}>NR Group</div>
                        <div className="sans" style={{ fontSize:8, fontWeight:500, letterSpacing:"0.22em", textTransform:"uppercase" as const, color:"rgba(140,200,255,0.85)", marginTop:3, lineHeight:1 }}>Facade & Envelope Specialists</div>
                    </div>
                </div>
                <div className="nr-nav-links" style={{ display:"flex", gap:48, position:"absolute", left:"50%", transform:"translateX(-50%)" }}>
                    {[["projects","Projects"],["expertise","Expertise"],["products","Products"],["about","About"],["contact","Contact"]].map(([id,label]) => (
                        <span key={id} className="nav-lnk" onClick={() => scrollTo(id)}>{label}</span>
                    ))}
                </div>
                <button className="btn-rfi" onClick={() => setRfiOpen(true)}>Submit RFI</button>
            </nav>

            {/* ── HERO ─────────────────────────────────────────────────────────────── */}
            <section id="hero" className={loaded?"hero-loaded":""} style={{ position:"relative", minHeight:"100vh", overflow:"hidden", display:"flex", flexDirection:"column", justifyContent:"flex-end", paddingBottom:"8vh", background:`radial-gradient(ellipse at 30% 60%,rgba(30,40,70,0.9) 0%,${BG_BASE} 65%)` }}>
                <div style={{ position:"absolute", inset:0 }}>
                    <img
                        src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=2400&q=90&fit=crop"
                        alt=""
                        data-depth="0.22"
                        style={{ width:"100%", height:"110%", top:"-5%", objectFit:"cover", opacity:0.28, transform:`translateY(${scrollY * 0.22}px)`, position:"absolute", left:0, right:0 }}
                    />
                    <div style={{ position:"absolute", inset:0, background:`linear-gradient(to top,${BG_BASE} 0%,rgba(14,17,23,0.75) 50%,rgba(14,17,23,0.4) 100%)` }} />
                    <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 60% at 20% 80%,rgba(63,155,240,0.06) 0%,transparent 60%)" }} />
                </div>
                <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize:"88px 88px", opacity:0.6, pointerEvents:"none" }} />
                <div className="hero-content" style={{ position:"relative", zIndex:2, padding:"0 64px", maxWidth:1280, width:"100%" }}>
                    <div className="h-label sans" style={{ fontSize:10, fontWeight:500, letterSpacing:"0.28em", textTransform:"uppercase" as const, color:GOLD, marginBottom:28, display:"flex", alignItems:"center", gap:12 }}><span style={{width:32,height:1,background:GOLD,opacity:0.6,display:"inline-block"}}></span>NR Group · Est. 1990 · West Palm Beach, Florida<span style={{width:32,height:1,background:GOLD,opacity:0.6,display:"inline-block"}}></span></div>
                    <h1 className="h-title serif hero-title shimmer-heading section-h2" style={{ fontWeight:300, fontSize:"clamp(54px,8vw,110px)", lineHeight:0.93, letterSpacing:"0.02em", color:TEXT_PRIMARY, marginBottom:28, maxWidth:820 }}>
                        Architectural <span style={{ color:GOLD, fontStyle:"italic", textShadow:`0 0 60px ${GOLD_GLOW}` }}>Glazing Systems</span>
                        <br />&amp; Engineered Building Envelopes
                    </h1>
                    <p className="h-sub sans hero-sub" style={{ fontWeight:300, fontSize:16, color:TEXT_SECONDARY, maxWidth:520, lineHeight:1.78, marginBottom:44 }}>NR Group delivers precision-engineered curtain walls, window walls, and specialty glazing systems for the world's most ambitious architectural projects.</p>
                    <div className="h-cta hero-cta-row" style={{ display:"flex", gap:14, flexWrap:"wrap" as const }}>
                        <button className="btn-hero" onClick={() => scrollTo("projects")}>Explore Projects</button>
                        <button className="btn-hero" onClick={() => scrollTo("expertise")}>Our Expertise</button>
                    </div>
                    <div className="h-stats stat-strip" style={{ display:"flex", marginTop:68, background:GLASS_BG, backdropFilter:"blur(20px)", border:`1px solid ${GLASS_BORDER}`, borderBottom:"none", boxShadow:SHADOW_MD, flexWrap:"wrap" as const }}>
                        {STATS.map((s,i) => (
                            <div key={s.label} style={{ flex:"1 1 120px", padding:"22px 32px", borderRight:i<STATS.length-1?`1px solid ${DIVIDER}`:"none" }}>
                                <div className="serif gold-glow-el" style={{ fontWeight:300, fontSize:48, color:GOLD, lineHeight:1, textShadow:`0 0 30px ${GOLD_GLOW}` }}>{s.value}</div>
                                <div className="sans" style={{ fontWeight:400, fontSize:10, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, marginTop:8 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="hero-scroll-cue" style={{ position:"absolute", right:48, bottom:36, display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
                    <div className="sans" style={{ fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, writingMode:"vertical-rl" }}>Scroll</div>
                    <div style={{ width:1, height:56, background:`linear-gradient(to bottom,${GOLD},transparent)`, animation:"fadeIn 2.5s ease infinite alternate" }} />
                </div>
            </section>

            {/* ── MARQUEE ──────────────────────────────────────────────────────────── */}
            <div style={{ background:BG_SURFACE, borderTop:`1px solid ${DIVIDER}`, borderBottom:`1px solid ${DIVIDER}`, padding:"13px 0", overflow:"hidden", boxShadow:`inset 0 1px 0 ${EDGE_LIGHT}` }}>
                <div className="mrq-track">
                    {[...MARQUEE_NAMES,...MARQUEE_NAMES].map((n,i) => (
                        <span key={i} className="sans" style={{ fontSize:11, fontWeight:400, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:72 }}>
                            {n} <span style={{ color:GOLD_DIM, fontSize:5 }}>◆</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* ── PROJECTS SLIDER ──────────────────────────────────────────────────── */}
            <section id="projects" style={{ background:`linear-gradient(180deg,${BG_BASE} 0%,${BG_MID} 100%)`, paddingTop:120 }}>
                <div style={{ padding:"0 64px", marginBottom:52, display:"flex", justifyContent:"space-between", alignItems:"flex-end", maxWidth:1280, margin:"0 auto 52px" }}>
                    <div>
                        <div className="sans nr-reveal" style={{ fontSize:11, fontWeight:400, letterSpacing:"0.18em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, marginBottom:16 }}>Featured Projects</div>
                        <h2 className="serif nr-reveal nr-reveal-delay-1 section-h2" style={{ fontWeight:300, fontSize:"clamp(40px,5vw,70px)", lineHeight:0.92, letterSpacing:"0.02em", color:TEXT_PRIMARY }}>Landmark<br />Installations</h2>
                    </div>
                    <div style={{ display:"flex", gap:10 }}>
                        <button className="slide-ctrl" onClick={() => setActiveSlide(p=>(p-1+PROJECTS.length)%PROJECTS.length)}>←</button>
                        <button className="slide-ctrl" onClick={() => setActiveSlide(p=>(p+1)%PROJECTS.length)}>→</button>
                    </div>
                </div>
                <div style={{ position:"relative", height:"65vh", minHeight:460, overflow:"hidden" }}>
                    {PROJECTS.map((p,i) => (
                        <div key={p.id} style={{ position:"absolute", inset:0, opacity:i===activeSlide?1:0, transition:"opacity 0.9s cubic-bezier(0.4,0,0.2,1)", pointerEvents:i===activeSlide?"auto":"none" }}>
                            <img src={p.img} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.55, transform:i===activeSlide?"scale(1.02)":"scale(1.05)", transition:"transform 5.5s cubic-bezier(0.4,0,0.2,1)" }} />
                            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(14,17,23,0.95) 0%,rgba(14,17,23,0.4) 55%,rgba(14,17,23,0.1) 100%)" }} />
                            <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 50% 80% at 0% 50%,rgba(63,155,240,0.04) 0%,transparent 60%)", pointerEvents:"none" }} />
                            <div style={{ position:"absolute", bottom:64, left:80, maxWidth:560 }}>
                                <div className="slide-info-card tilt-card" style={{ background:GLASS_BG, backdropFilter:"blur(20px)", border:`1px solid ${GLASS_BORDER}`, borderRadius:2, padding:"24px 28px", boxShadow:SHADOW_LG, transition:"transform 0.15s ease,box-shadow 0.15s ease", transformStyle:"preserve-3d" as const }}>
                                    <div className="sans" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.18em", textTransform:"uppercase" as const, color:GOLD, marginBottom:12 }}>{p.category} · {p.year}</div>
                                    <h3 className="serif slide-info-title" style={{ fontWeight:300, fontSize:"clamp(22px,3.5vw,40px)", lineHeight:1.05, letterSpacing:"0.02em", color:TEXT_PRIMARY, marginBottom:10 }}>{p.name}</h3>
                                    <div className="sans" style={{ fontSize:13, fontWeight:300, color:TEXT_SECONDARY, marginBottom:8 }}>{p.location}</div>
                                    <div className="sans" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.12em", textTransform:"uppercase" as const, color:GOLD }}>{p.system}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="slide-progress" style={{ position:"absolute", bottom:22, right:80, display:"flex", gap:8 }}>
                        {PROJECTS.map((_,i) => (
                            <button key={i} onClick={() => setActiveSlide(i)} style={{ width:i===activeSlide?26:6, height:2, background:i===activeSlide?GOLD:GLASS_BORDER, border:"none", cursor:"pointer", transition:"all 0.4s", borderRadius:1, boxShadow:i===activeSlide?`0 0 8px ${GOLD_GLOW}`:"none" }} />
                        ))}
                    </div>
                </div>
                <div style={{ padding:"18px 64px", borderTop:`1px solid ${DIVIDER}`, display:"flex", justifyContent:"space-between", alignItems:"center", maxWidth:1280, margin:"0 auto", background:BG_SURFACE }}>
                    <div className="sans" style={{ fontSize:11, fontWeight:400, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:TEXT_SUBTLE }}>{String(activeSlide+1).padStart(2,"0")} / {String(PROJECTS.length).padStart(2,"0")}</div>
                    <div className="sans" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.1em", textTransform:"uppercase" as const, color:TEXT_SUBTLE }}>{PROJECTS[activeSlide].system}</div>
                </div>
            </section>

            {/* ── EXPERTISE ────────────────────────────────────────────────────────── */}
            <section id="expertise" className="section-cinematic" style={{ padding:"120px 64px", background:`linear-gradient(180deg,${BG_MID} 0%,${BG_SURFACE} 100%)` }}>
                <div className="expertise-grid" style={{ maxWidth:1280, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1.25fr", gap:96, alignItems:"start" }}>
                    <div>
                        <div className="sans nr-reveal" style={{ fontSize:11, fontWeight:400, letterSpacing:"0.18em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, marginBottom:18 }}>Turn-Key Capabilities</div>
                        <h2 className="serif nr-reveal nr-reveal-delay-1 section-h2" style={{ fontWeight:300, fontSize:"clamp(40px,4vw,66px)", lineHeight:0.93, letterSpacing:"0.02em", color:TEXT_PRIMARY, marginBottom:30 }}>Precision<br />Engineering<br />at Every Scale</h2>
                        <p className="sans nr-reveal nr-reveal-delay-2" style={{ fontWeight:300, fontSize:15, color:TEXT_SECONDARY, lineHeight:1.82, marginBottom:48 }}>From concept to installation, NR Group delivers turnkey facade solutions for the world's most demanding architectural projects. Our 30+ years of expertise spans airports, luxury towers, healthcare, and resort developments across North America and the Caribbean.</p>
                        <div style={{ display:"flex", gap:44 }} className="nr-reveal nr-reveal-delay-3">
                            {[["$100M","Annual Bonding"],["FBC","Approved Systems"],["3","Global Offices"]].map(([val,lbl]) => (
                                <div key={lbl} className="tilt-card" style={{ padding:"20px 24px", background:GLASS_BG, border:`1px solid ${GLASS_BORDER}`, borderRadius:2, boxShadow:SHADOW_SM, position:"relative", overflow:"hidden" }}>
                                    <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:EDGE_LIGHT }} />
                                    <div className="serif" style={{ fontWeight:300, fontSize:38, color:GOLD, lineHeight:1, textShadow:`0 0 20px ${GOLD_GLOW}` }}>{val}</div>
                                    <div className="sans" style={{ fontSize:9, fontWeight:400, letterSpacing:"0.16em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, marginTop:6 }}>{lbl}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        {EXPERTISE.map((e,i) => (
                            <div key={i} className={`exp-row nr-reveal nr-reveal-delay-${i+1}`} onClick={() => setActiveAccordion(i===activeAccordion?-1:i)}>
                                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:20 }}>
                                    <div style={{ display:"flex", gap:18, alignItems:"baseline" }}>
                                        <span className="sans" style={{ fontSize:11, fontWeight:400, letterSpacing:"0.14em", color:activeAccordion===i?GOLD:TEXT_SUBTLE, transition:"color 0.3s" }}>{e.num}</span>
                                        <h3 className="serif" style={{ fontWeight:400, fontSize:22, color:TEXT_PRIMARY, letterSpacing:"0.01em" }}>{e.title}</h3>
                                    </div>
                                    <span style={{ color:activeAccordion===i?GOLD:TEXT_SUBTLE, fontSize:18, transition:"all 0.3s", transform:activeAccordion===i?"rotate(45deg)":"none", flexShrink:0 }}>+</span>
                                </div>
                                {activeAccordion===i && (
                                    <div style={{ paddingTop:16, animation:"fadeUp 0.38s ease" }}>
                                        <p className="sans" style={{ fontWeight:300, fontSize:14, color:TEXT_SECONDARY, lineHeight:1.75, marginBottom:12 }}>{e.desc}</p>
                                        <div className="sans" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:GOLD }}>{e.detail}</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURE BANNER ───────────────────────────────────────────────────── */}
            <div style={{ position:"relative", height:"52vh", minHeight:360, overflow:"hidden", background:BG_BASE }}>
                <img
                    src="https://images.unsplash.com/photo-1569327944665-59a8c1ddbabc?w=2400&q=90&fit=crop"
                    alt=""
                    data-depth="0.12"
                    style={{ width:"100%", height:"110%", top:"-5%", objectFit:"cover", opacity:0.28, transform:`translateY(${(scrollY-1400)*0.1}px)`, position:"absolute", left:0 }}
                />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(14,17,23,0.9) 0%,rgba(14,17,23,0.5) 100%)" }} />
                <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 70% 60% at 50% 100%,rgba(63,155,240,0.07) 0%,transparent 65%)" }} />
                <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"0 64px" }}>
                    <div className="banner-glass tilt-card" style={{ background:GLASS_BG, backdropFilter:"blur(24px)", border:`1px solid ${GLASS_BORDER}`, borderRadius:3, padding:"48px 64px", boxShadow:SHADOW_XL, position:"relative", overflow:"hidden" }}>
                        <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:EDGE_LIGHT }} />
                        <h2 className="serif banner-title" style={{ fontWeight:300, fontSize:"clamp(26px,4vw,56px)", lineHeight:1.05, letterSpacing:"0.02em", color:TEXT_PRIMARY, marginBottom:18 }}>
                            FBC Approved · LMI + SMI Rated<br /><em style={{ fontStyle:"italic", color:GOLD }}>Built to Withstand the Elements</em>
                        </h2>
                        <div className="sans" style={{ fontSize:11, fontWeight:400, letterSpacing:"0.2em", textTransform:"uppercase" as const, color:TEXT_SUBTLE }}>FL-12847 · FL-14521 · FL-13892 · NOA Certified</div>
                    </div>
                </div>
            </div>

            {/* ── ARCHITECTURAL PRODUCT SYSTEMS ────────────────────────────────── */}
            <ArchitecturalProductSystems />

            {/* ── PROJECT GRID ──────────────────────────────────────────────────────── */}
            <section className="section-cinematic" style={{ padding:"120px 64px", background:BG_BASE }}>
                <div style={{ maxWidth:1280, margin:"0 auto" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:48, flexWrap:"wrap" as const, gap:20 }}>
                        <div>
                            <div className="sans nr-reveal" style={{ fontSize:11, fontWeight:400, letterSpacing:"0.18em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, marginBottom:14 }}>Project Portfolio</div>
                            <h2 className="serif nr-reveal nr-reveal-delay-1 section-h2" style={{ fontWeight:300, fontSize:"clamp(36px,4vw,62px)", lineHeight:0.93, letterSpacing:"0.02em", color:TEXT_PRIMARY }}>All Projects</h2>
                        </div>
                        <div style={{ display:"flex", gap:7, flexWrap:"wrap" as const }}>
                            {CATEGORIES.map(c => <button key={c} className={`flt-btn${filterCat===c?" on":""}`} onClick={() => setFilterCat(c)}>{c}</button>)}
                        </div>
                    </div>
                    <div className="grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:28 }}>
                        {filteredProjects.map((p,i) => (
                            <div key={p.id} className="proj-card nr-reveal tilt-card float-card" style={{ height:i%5===0?440:290, gridColumn:i%5===0?"span 2":"span 1", background:i%2===0?`linear-gradient(145deg,${BG_RAISED},${BG_SURFACE})`:`linear-gradient(145deg,${BG_FLOAT},${BG_RAISED})` }}
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
                                    {hoveredProject===p.id && <div className="sans" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.1em", textTransform:"uppercase" as const, color:GOLD, animation:"fadeUp 0.28s ease" }}>{p.system}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GLOBAL FOOTPRINT ─────────────────────────────────────────────────── */}
            <section className="section-cinematic" style={{ padding:"120px 64px", background:`radial-gradient(ellipse at 50% 0%,rgba(30,40,70,0.5) 0%,${BG_MID} 60%)` }}>
                <div style={{ maxWidth:1280, margin:"0 auto" }}>
                    <div style={{ marginBottom:60 }}>
                        <div className="sans nr-reveal" style={{ fontSize:11, fontWeight:400, letterSpacing:"0.18em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, marginBottom:16 }}>Global Footprint</div>
                        <h2 className="serif nr-reveal nr-reveal-delay-1 section-h2" style={{ fontWeight:300, fontSize:"clamp(36px,4vw,62px)", lineHeight:0.93, letterSpacing:"0.02em", color:TEXT_PRIMARY }}>Tri-Continental<br />Operations</h2>
                    </div>
                    <div className="footprint-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2, marginBottom:60 }}>
                        {[
                            { flag:"🇺🇸", region:"United States", city:"West Palm Beach, Florida", role:"Headquarters", desc:"Management, estimating, pre-construction, procurement, and design development." },
                            { flag:"🇵🇭", region:"Philippines", city:"Manila Engineering Office", role:"Engineering Hub", desc:"Shop drawing production, 3D modelling, BIM/Revit, material takeoff, and technical support." },
                            { flag:"🇨🇴", region:"Colombia", city:"Cartagena — NRV Façade S.A.S", role:"Production Facility", desc:"250,000 sq ft facility. Paint finishes, frame assembly, glazing, CNC machining, and export." },
                        ].map((o,i) => (
                            <div key={i} className="nr-reveal tilt-card" style={{ padding:"36px 32px", background:`linear-gradient(145deg,${i===1?BG_FLOAT:BG_RAISED},${BG_SURFACE})`, borderLeft:`2px solid ${GOLD}`, borderTop:`1px solid ${EDGE_LIGHT}`, boxShadow:i===1?SHADOW_LG:SHADOW_MD, position:"relative", overflow:"hidden", animationDelay:`${i*0.12}s` }}>
                                <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:EDGE_LIGHT }} />
                                <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 50% at 0% 0%,rgba(255,255,255,0.03) 0%,transparent 60%)", pointerEvents:"none" }} />
                                <div style={{ fontSize:32, marginBottom:14, position:"relative" }}>{o.flag}</div>
                                <div className="sans" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.18em", textTransform:"uppercase" as const, color:GOLD, marginBottom:6, position:"relative" }}>{o.role}</div>
                                <div className="serif" style={{ fontWeight:400, fontSize:20, color:TEXT_PRIMARY, marginBottom:4, position:"relative" }}>{o.region}</div>
                                <div className="sans" style={{ fontSize:11, fontWeight:300, color:TEXT_SECONDARY, marginBottom:16, position:"relative" }}>{o.city}</div>
                                <p className="sans" style={{ fontSize:13, fontWeight:300, color:TEXT_SECONDARY, lineHeight:1.7, position:"relative" }}>{o.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="metrics-row" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:2 }}>
                        {[["$35M–$50M","Revenue Range"],["250,000 ft²","Production Facility"],["1.5M ft²","Annual Output"],["48hr","RFI Response"]].map(([v,l]) => (
                            <div key={l as string} className="nr-reveal tilt-card" style={{ padding:"28px 24px", background:`linear-gradient(145deg,${BG_RAISED},${BG_SURFACE})`, textAlign:"center", border:`1px solid ${GLASS_BORDER}`, borderTop:`1px solid ${EDGE_LIGHT}`, boxShadow:SHADOW_SM, position:"relative", overflow:"hidden" }}>
                                <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 50% at 50% 0%,rgba(255,255,255,0.03) 0%,transparent 60%)" }} />
                                <div className="serif" style={{ fontWeight:300, fontSize:38, color:GOLD, lineHeight:1, marginBottom:8, textShadow:`0 0 20px ${GOLD_GLOW}`, position:"relative" }}>{v as string}</div>
                                <div className="sans" style={{ fontSize:9, fontWeight:400, letterSpacing:"0.16em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, position:"relative" }}>{l as string}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ABOUT ─────────────────────────────────────────────────────────────── */}
            <section id="about" className="section-cinematic" style={{ padding:"120px 64px", background:`linear-gradient(180deg,${BG_BASE} 0%,${BG_SURFACE} 100%)` }}>
                <div className="grid-2" style={{ maxWidth:1280, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:96, alignItems:"center" }}>
                    <div style={{ position:"relative" }} className="nr-reveal">
                        <div style={{ overflow:"hidden", borderRadius:3, border:`1px solid ${GLASS_BORDER}`, boxShadow:SHADOW_LG }}>
                            <img src="https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?w=900&q=90&fit=crop" alt="NR Group" className="about-img" style={{ width:"100%", height:560, objectFit:"cover", display:"block", opacity:0.85 }} />
                            <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:EDGE_LIGHT }} />
                        </div>
                        <div className="about-float-card tilt-card" style={{ position:"absolute", bottom:-28, right:-28, padding:"24px 28px", background:`linear-gradient(145deg,${BG_FLOAT},${BG_RAISED})`, minWidth:190, borderRadius:3, border:`1px solid ${GLASS_BORDER}`, boxShadow:SHADOW_XL, overflow:"hidden" }}>
                            <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:EDGE_LIGHT }} />
                            <div className="serif" style={{ fontWeight:300, fontSize:40, color:GOLD, lineHeight:1, textShadow:`0 0 20px ${GOLD_GLOW}` }}>1990</div>
                            <div className="sans" style={{ fontSize:9, fontWeight:400, letterSpacing:"0.16em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, marginTop:6 }}>Founded in West Palm Beach, FL</div>
                        </div>
                    </div>
                    <div>
                        <div className="sans nr-reveal" style={{ fontSize:11, fontWeight:400, letterSpacing:"0.18em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, marginBottom:18 }}>About NR Group</div>
                        <h2 className="serif nr-reveal nr-reveal-delay-1 section-h2" style={{ fontWeight:300, fontSize:"clamp(36px,4vw,58px)", lineHeight:0.93, letterSpacing:"0.02em", color:TEXT_PRIMARY, marginBottom:28 }}>A Legacy of<br />Engineering<br /><em style={{ fontStyle:"italic", color:GOLD }}>Excellence</em></h2>
                        <div style={{ width:48, height:1, background:`linear-gradient(to right,${GOLD},transparent)`, marginBottom:26, boxShadow:`0 0 12px ${GOLD_GLOW}` }} className="nr-reveal" />
                        <p className="sans nr-reveal" style={{ fontWeight:300, fontSize:15, color:TEXT_SECONDARY, lineHeight:1.82, marginBottom:20 }}>Founded in 1990 by Noshad Ali Shamshad, NR Group has grown from a regional glazing contractor to one of North America's most trusted facade engineering firms. Our turnkey delivery — from design assist through fabrication and installation — sets us apart.</p>
                        <p className="sans nr-reveal nr-reveal-delay-1" style={{ fontWeight:300, fontSize:15, color:TEXT_SECONDARY, lineHeight:1.82, marginBottom:40 }}>Through our joint venture NRV Façade S.A.S in Cartagena, Colombia, we operate a 250,000 sq ft state-of-the-art facility producing 1.5 million sq ft of product annually, supported by our Manila engineering office for BIM and shop drawings.</p>
                        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:40 }} className="nr-reveal nr-reveal-delay-2">
                            {[["🇺🇸","USA HQ","West Palm Beach"],["🇵🇭","Engineering","Manila"],["🇨🇴","Production","Cartagena"]].map(([flag,role,city]) => (
                                <div key={city as string} className="tilt-card" style={{ background:GLASS_BG, border:`1px solid ${GLASS_BORDER}`, borderTop:`1px solid ${EDGE_LIGHT}`, borderRadius:2, padding:"16px 14px", boxShadow:SHADOW_SM }}>
                                    <div style={{ fontSize:20, marginBottom:8 }}>{flag as string}</div>
                                    <div className="sans" style={{ fontSize:9, fontWeight:400, letterSpacing:"0.16em", textTransform:"uppercase" as const, color:GOLD, marginBottom:4 }}>{role as string}</div>
                                    <div className="sans" style={{ fontSize:12, fontWeight:300, color:TEXT_SECONDARY }}>{city as string}</div>
                                </div>
                            ))}
                        </div>
                        <button className="btn-dark nr-reveal nr-reveal-delay-3" onClick={() => setRfiOpen(true)}>Request a Consultation</button>
                    </div>
                </div>
            </section>

            {/* ── EXECUTIVE PROFILES ───────────────────────────────────────────────── */}
            <section className="section-cinematic" style={{ padding:"0 64px 120px", background:`linear-gradient(180deg,${BG_SURFACE} 0%,${BG_BASE} 100%)` }}>
                <div style={{ maxWidth:1280, margin:"0 auto" }}>
                    <div style={{ borderTop:`1px solid ${DIVIDER}`, paddingTop:72, marginBottom:52 }}>
                        <div className="sans nr-reveal" style={{ fontSize:11, fontWeight:400, letterSpacing:"0.18em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, marginBottom:16 }}>Leadership</div>
                        <h2 className="serif nr-reveal nr-reveal-delay-1 section-h2" style={{ fontWeight:300, fontSize:"clamp(36px,4vw,62px)", lineHeight:0.93, letterSpacing:"0.02em", color:TEXT_PRIMARY }}>Executive Profiles</h2>
                    </div>
                    <div className="grid-4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:28 }}>
                        {LEADERSHIP.map((l,i) => (
                            <div key={i} className={`prof-card nr-reveal nr-reveal-delay-${i+1}`} style={{ borderTopColor:DIVIDER }}>
                                <div style={{ width:64, height:64, background:`radial-gradient(circle at 35% 35%,${BG_FLOAT},${BG_SURFACE})`, border:`1px solid ${GLASS_BORDER}`, borderTop:`1px solid ${EDGE_LIGHT}`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18, boxShadow:SHADOW_MD }}>
                                    <span className="serif" style={{ fontWeight:400, fontSize:18, color:GOLD, textShadow:`0 0 12px ${GOLD_GLOW}` }}>{l.initials}</span>
                                </div>
                                <div className="serif" style={{ fontWeight:400, fontSize:20, color:TEXT_PRIMARY, letterSpacing:"0.01em", marginBottom:6 }}>{l.name}</div>
                                <div className="sans" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.16em", textTransform:"uppercase" as const, color:GOLD, marginBottom:14 }}>{l.title}</div>
                                <p className="sans" style={{ fontWeight:300, fontSize:14, color:TEXT_SECONDARY, lineHeight:1.72 }}>{l.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CONTACT ──────────────────────────────────────────────────────────── */}
            <section id="contact" className="section-cinematic" style={{ padding:"120px 64px", background:`radial-gradient(ellipse at 50% 100%,rgba(30,40,70,0.6) 0%,${BG_BASE} 60%)` }}>
                <div style={{ maxWidth:820, margin:"0 auto" }}>
                    <div style={{ textAlign:"center", marginBottom:72 }}>
                        <div className="sans nr-reveal" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.2em", textTransform:"uppercase" as const, color:GOLD, marginBottom:20 }}>Start Your Project</div>
                        <h2 className="serif nr-reveal nr-reveal-delay-1 section-h2" style={{ fontWeight:300, fontSize:"clamp(48px,6vw,80px)", lineHeight:0.93, letterSpacing:"0.02em", color:TEXT_PRIMARY, marginBottom:24 }}>Submit an RFI</h2>
                        <p className="sans nr-reveal nr-reveal-delay-2" style={{ fontWeight:300, fontSize:15, color:TEXT_SECONDARY, maxWidth:440, margin:"0 auto", lineHeight:1.78 }}>Whether you're an architect seeking design assist or a GC pricing a facade package, NR Group responds to all RFIs within 48 hours.</p>
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 36px" }}>
                        {[["Full Name","text","John Smith"],["Company","text","Smith Architects LLC"],["Email","email","john@company.com"],["Phone","tel","+1 000 000 0000"]].map(([label,type,ph]) => (
                            <div key={label as string} style={{ marginBottom:36 }}>
                                <label className="sans" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.16em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, display:"block", marginBottom:2 }}>{label as string}</label>
                                <input type={type as string} placeholder={ph as string} className="fi-dark" />
                            </div>
                        ))}
                        <div style={{ gridColumn:"span 2", marginBottom:36 }}>
                            <label className="sans" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.16em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, display:"block", marginBottom:2 }}>System of Interest</label>
                            <select className="fi-dark">
                                {["NR 8000 Unitized Curtain Wall","NR 5000 Stick Curtain Wall","NR 1100 Thermally Broken","Series 6000 Window Wall","Series 6000-i Insulated","Series 7000 Lift & Slide","Series 10000 Large Format","PSG Point Support Glass","Other / Not Sure"].map(o => <option key={o}>{o}</option>)}
                            </select>
                        </div>
                        <div style={{ gridColumn:"span 2", marginBottom:36 }}>
                            <label className="sans" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.16em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, display:"block", marginBottom:2 }}>Project Description</label>
                            <textarea className="fi-dark" rows={4} placeholder="Describe your project requirements, timeline, and facade area..." style={{ resize:"vertical" as const }} />
                        </div>
                        <div style={{ gridColumn:"span 2", textAlign:"center" }}>
                            <button className="btn-gold" style={{ fontSize:11, padding:"16px 52px" }}>Submit Inquiry →</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ────────────────────────────────────────────────────────────── */}
            <footer className="footer-pad" style={{ background:BG_BASE, borderTop:`1px solid ${DIVIDER}`, padding:"80px 64px 48px", boxShadow:`inset 0 1px 0 ${EDGE_LIGHT}` }}>
                <div style={{ maxWidth:1280, margin:"0 auto" }}>
                    <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:64, marginBottom:64 }}>
                        <div>
                            <div className="serif footer-brand-name" style={{ fontWeight:300, fontSize:48, color:"rgba(255,255,255,0.04)", lineHeight:1, letterSpacing:"0.04em", textTransform:"uppercase" as const, marginBottom:6 }}>NR Group</div>
                            <p className="sans" style={{ fontWeight:300, fontSize:13, color:TEXT_SECONDARY, lineHeight:1.75, maxWidth:260, marginBottom:24 }}>Facade & Building Envelope Specialists since 1990. Delivering precision glazing systems across North America and the Caribbean.</p>
                            <div className="sans" style={{ fontWeight:300, fontSize:12, color:TEXT_SUBTLE, lineHeight:1.75 }}>4348 Westroads Drive<br />West Palm Beach, FL 33407</div>
                            <div style={{ marginTop:14 }}>
                                <a href="tel:15618441121" className="sans" style={{ fontWeight:300, fontSize:12, color:GOLD, textDecoration:"none", display:"block", marginBottom:4 }}>+1 561 844 1121</a>
                                <a href="mailto:info@nrwindows.com" className="sans" style={{ fontWeight:300, fontSize:12, color:TEXT_SUBTLE, textDecoration:"none" }}>info@nrwindows.com</a>
                            </div>
                        </div>
                        {[
                            { heading:"Curtain Wall", items:["NR 8000 — Unitized","NR 5000 — Stick-Built","NR 1100 — Thermally Broken"] },
                            { heading:"Windows & Doors", items:["Series 6000 — Window Wall","Series 7000 — Lift & Slide","3500 — Single Hung","PSG Systems"] },
                            { heading:"Markets", items:["Aviation & Airports","Luxury Hospitality","High-Rise Residential","Healthcare","Commercial Office"] },
                        ].map(col => (
                            <div key={col.heading}>
                                <div className="sans" style={{ fontWeight:400, fontSize:10, letterSpacing:"0.16em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, marginBottom:20 }}>{col.heading}</div>
                                {col.items.map(s => (
                                    <div key={s} className="sans" style={{ fontWeight:300, fontSize:13, color:TEXT_SECONDARY, marginBottom:10, cursor:"pointer", transition:"color 0.25s" }}
                                        onMouseEnter={e => (e.currentTarget.style.color=GOLD)} onMouseLeave={e => (e.currentTarget.style.color=TEXT_SECONDARY)}>{s}</div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div style={{ borderTop:`1px solid ${DIVIDER}`, paddingTop:28, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap" as const, gap:12 }}>
                        <div className="sans" style={{ fontWeight:300, fontSize:11, color:TEXT_SUBTLE }}>© 2024 NR Group. All rights reserved. NR Architectural Products™</div>
                        <div className="sans" style={{ fontWeight:300, fontSize:11, color:TEXT_SUBTLE }}>Facade & Envelope Specialists</div>
                    </div>
                </div>
            </footer>

            {/* ── RFI MODAL ─────────────────────────────────────────────────────────── */}
            {rfiOpen && (
                <div onClick={e => e.target===e.currentTarget&&setRfiOpen(false)} style={{ position:"fixed", inset:0, zIndex:300, background:"rgba(8,10,14,0.96)", backdropFilter:"blur(32px) saturate(160%)", display:"flex", alignItems:"flex-start", justifyContent:"center", padding:"60px 24px", overflowY:"auto" }}>
                    <div style={{ width:"100%", maxWidth:680, background:`linear-gradient(145deg,${BG_RAISED},${BG_SURFACE})`, border:`1px solid ${GLASS_BORDER}`, borderTop:`1px solid ${EDGE_LIGHT}`, position:"relative", animation:"modalIn 0.42s cubic-bezier(0.16,1,0.3,1)", borderRadius:3, boxShadow:SHADOW_XL, overflow:"hidden" }}>
                        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 50% at 50% 0%,rgba(255,255,255,0.03) 0%,transparent 60%)", pointerEvents:"none" }} />
                        <button onClick={() => setRfiOpen(false)} style={{ position:"absolute", top:20, right:20, background:GLASS_BG, border:`1px solid ${GLASS_BORDER}`, color:TEXT_SECONDARY, width:36, height:36, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, transition:"all 0.2s", borderRadius:2, boxShadow:SHADOW_SM }}
                            onMouseEnter={e => {(e.currentTarget.style.borderColor=GOLD);(e.currentTarget.style.color=GOLD)}}
                            onMouseLeave={e => {(e.currentTarget.style.borderColor=GLASS_BORDER);(e.currentTarget.style.color=TEXT_SECONDARY)}}>✕</button>
                        <div className="rfi-modal-inner" style={{ padding:"48px 48px 0", position:"relative" }}>
                            <div className="sans" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.2em", textTransform:"uppercase" as const, color:GOLD, marginBottom:14 }}>NR Group</div>
                            <h3 className="serif" style={{ fontWeight:300, fontSize:34, letterSpacing:"0.02em", color:TEXT_PRIMARY, marginBottom:10 }}>Submit RFI</h3>
                            <p className="sans" style={{ fontWeight:300, fontSize:13, color:TEXT_SECONDARY, marginBottom:36 }}>Complete this form and our technical team will respond within 48 hours.</p>
                        </div>
                        <div className="rfi-modal-body" style={{ padding:"0 48px 48px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 24px", position:"relative" }}>
                            {[["Full Name","text","John Smith"],["Company","text","Smith Architects LLC"],["Email","email","john@company.com"],["Phone","tel","+1 000 000 0000"],["Project Name","text","The Grand Tower"],["Location","text","Miami, FL"]].map(([label,type,ph]) => (
                                <div key={label as string} style={{ marginBottom:28 }}>
                                    <label className="sans" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.16em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, display:"block", marginBottom:2 }}>{label as string}</label>
                                    <input type={type as string} placeholder={ph as string} className="fi-dark" />
                                </div>
                            ))}
                            <div style={{ gridColumn:"span 2", marginBottom:28 }}>
                                <label className="sans" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.16em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, display:"block", marginBottom:2 }}>System of Interest</label>
                                <select className="fi-dark">{["NR 8000 Unitized Curtain Wall","NR 5000 Stick Curtain Wall","Series 6000 Window Wall","Series 7000 Lift & Slide","PSG Point Support Glass","Other / Not Sure"].map(o => <option key={o}>{o}</option>)}</select>
                            </div>
                            <div style={{ gridColumn:"span 2", marginBottom:36 }}>
                                <label className="sans" style={{ fontSize:10, fontWeight:400, letterSpacing:"0.16em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, display:"block", marginBottom:2 }}>Description</label>
                                <textarea className="fi-dark" rows={4} placeholder="Describe your project, timeline, and requirements..." style={{ resize:"vertical" as const }} />
                            </div>
                            <div style={{ gridColumn:"span 2" }}>
                                <button className="btn-gold" style={{ width:"100%", padding:"16px", fontSize:11, letterSpacing:"0.14em" }}>Submit RFI →</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── AI VISUAL ENGINEERING SPECIALIST ─────────────────────────────────── */}
            {!aiOpen && <div className="ai-fab-ring" />}
            <button className="ai-fab" onClick={() => setAiOpen(o=>!o)} title="NR Visual Engineering Specialist">{aiOpen?"✕":"◈"}</button>

            {aiOpen && (
                <div className="ai-panel">
                    <div style={{ padding:"14px 16px 10px", borderBottom:`1px solid ${DIVIDER}`, background:`linear-gradient(145deg,${BG_FLOAT},${BG_RAISED})`, flexShrink:0, position:"relative", overflow:"hidden" }}>
                        <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:EDGE_LIGHT }} />
                        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 60% at 50% 0%,rgba(63,155,240,0.05) 0%,transparent 70%)" }} />
                        <div style={{ display:"flex", alignItems:"center", gap:10, position:"relative" }}>
                            <div style={{ width:30, height:30, background:`linear-gradient(135deg,#2f86e0,${GOLD})`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:`0 0 12px ${GOLD_GLOW}`, fontSize:13 }}>◈</div>
                            <div style={{ flex:1 }}>
                                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase" as const, color:TEXT_PRIMARY, lineHeight:1 }}>Visual Engineering Specialist</div>
                                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, fontWeight:400, letterSpacing:"0.1em", textTransform:"uppercase" as const, color:GOLD, marginTop:2, display:"flex", alignItems:"center", gap:5 }}>
                                    <span style={{ width:4, height:4, borderRadius:"50%", background:"#4ade80", display:"inline-block", boxShadow:"0 0 5px rgba(74,222,128,0.6)" }} />
                                    NR Group MCP Canvas · Online
                                </div>
                            </div>
                            <div style={{ display:"flex", gap:3 }}>
                                <button className={`tab-btn ${activeTab==="chat"?"on":"off"}`} onClick={() => setActiveTab("chat")}>Chat</button>
                                <button className={`tab-btn ${activeTab==="canvas"?"on":"off"}`} onClick={() => setActiveTab("canvas")}>Canvas</button>
                            </div>
                        </div>
                        {activeTab==="chat" && (
                            <div style={{ display:"flex", gap:5, marginTop:10, flexWrap:"wrap" as const, position:"relative" }}>
                                {["Show NR 8000","Series 7000 layout","NR 8000 joint detail","Powder Black frame","Anodized Bronze","Gray wall","FBC Compliance","Thermal Data"].map(chip => (
                                    <button key={chip} onClick={() => {const msg:ChatMessage={role:"user",type:"text",content:chip};const resp=processEngineering(chip);setAiMessages(prev=>[...prev,msg,resp])}} style={{ background:GLASS_BG, border:`1px solid ${GLASS_BORDER}`, color:TEXT_SUBTLE, fontFamily:"'Jost',sans-serif", fontSize:8, fontWeight:400, letterSpacing:"0.1em", textTransform:"uppercase" as const, padding:"3px 9px", borderRadius:20, cursor:"pointer", transition:"all 0.2s" }}
                                        onMouseEnter={e=>{(e.currentTarget.style.borderColor=GOLD);(e.currentTarget.style.color=GOLD)}}
                                        onMouseLeave={e=>{(e.currentTarget.style.borderColor=GLASS_BORDER);(e.currentTarget.style.color=TEXT_SUBTLE)}}>{chip}</button>
                                ))}
                            </div>
                        )}
                    </div>

                    {activeTab==="chat" && !rfiMode && (
                        <>
                            <div className="ai-messages">
                                {aiMessages.map((msg,idx) => renderMsg(msg,idx))}
                                {aiTyping && (
                                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
                                        <div style={{ width:22, height:22, background:`linear-gradient(135deg,${GOLD},#1a64b8)`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10 }}>◈</div>
                                        <div style={{ background:`linear-gradient(145deg,${BG_RAISED},${BG_SURFACE})`, border:`1px solid ${GLASS_BORDER}`, borderRadius:"10px 10px 10px 2px", padding:"10px 14px", boxShadow:SHADOW_SM }}>
                                            <span className="typing-dot"/><span className="typing-dot"/><span className="typing-dot"/>
                                        </div>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>
                            <div className="ai-input-row">
                                <input value={aiInput} onChange={e=>setAiInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendAIMessage()} placeholder='Try: "Show NR 8000 with Powder Black frame and gray wall"' />
                                <button className="ai-send" onClick={sendAIMessage}>→</button>
                            </div>
                        </>
                    )}

                    {activeTab==="chat" && rfiMode && (
                        <div style={{ flex:1, overflowY:"auto", padding:"14px" }}>
                            <div style={{ background:"rgba(63,155,240,0.06)", border:`1px solid rgba(63,155,240,0.2)`, borderRadius:3, padding:"12px 14px", marginBottom:14 }}>
                                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:GOLD, marginBottom:4 }}>◈ Formal RFI — Generation Mode</div>
                                <p style={{ fontFamily:"'Jost',sans-serif", fontWeight:300, fontSize:11, color:TEXT_SECONDARY, lineHeight:1.55 }}>Complete the fields below to compile a formal RFI for the NR Group West Palm Beach engineering team.</p>
                            </div>
                            {[["Full Name","name","text"],["Company","company","text"],["Email","email","email"],["Project Name","project","text"],["Location","location","text"],["Facade Area (sq ft)","area","text"]].map(([label,key,type]) => (
                                <div key={key as string} style={{ marginBottom:12 }}>
                                    <label style={{ fontFamily:"'Jost',sans-serif", fontSize:8, fontWeight:400, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, display:"block", marginBottom:3 }}>{label as string}</label>
                                    <input type={type as string} value={(rfiData as Record<string,string>)[key as string]} onChange={e=>setRfiData(d=>({...d,[key as string]:e.target.value}))} style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${GLASS_BORDER}`, color:TEXT_PRIMARY, fontFamily:"'Jost',sans-serif", fontSize:11, fontWeight:300, padding:"7px 10px", width:"100%", outline:"none", borderRadius:4, transition:"border-color 0.3s" }} onFocus={e=>(e.target.style.borderColor=GOLD)} onBlur={e=>(e.target.style.borderColor=GLASS_BORDER)} />
                                </div>
                            ))}
                            <div style={{ marginBottom:12 }}>
                                <label style={{ fontFamily:"'Jost',sans-serif", fontSize:8, fontWeight:400, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, display:"block", marginBottom:3 }}>System of Interest</label>
                                <select value={rfiData.system} onChange={e=>setRfiData(d=>({...d,system:e.target.value}))} style={{ background:BG_SURFACE, border:`1px solid ${GLASS_BORDER}`, color:TEXT_PRIMARY, fontFamily:"'Jost',sans-serif", fontSize:11, fontWeight:300, padding:"7px 10px", width:"100%", outline:"none", borderRadius:4 }}>
                                    {["NR 8000 Unitized Curtain Wall","NR 1100 Thermally Broken WW","Series 6000 Window Wall","Series 6000-i Insulated WW","Series 7000 Lift & Slide","Series 10000 Large Format","Series 6001/6500 Sliding Door","Series 3500 Single Hung","Series 3250/2500 Casement","Multiple Systems / Not Sure"].map(o => <option key={o}>{o}</option>)}
                                </select>
                            </div>
                            <div style={{ marginBottom:14 }}>
                                <label style={{ fontFamily:"'Jost',sans-serif", fontSize:8, fontWeight:400, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, display:"block", marginBottom:3 }}>Project Description</label>
                                <textarea value={rfiData.description} onChange={e=>setRfiData(d=>({...d,description:e.target.value}))} rows={3} style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${GLASS_BORDER}`, color:TEXT_PRIMARY, fontFamily:"'Jost',sans-serif", fontSize:11, fontWeight:300, padding:"7px 10px", width:"100%", outline:"none", borderRadius:4, resize:"vertical" as const, transition:"border-color 0.3s" }} onFocus={e=>(e.target.style.borderColor=GOLD)} onBlur={e=>(e.target.style.borderColor=GLASS_BORDER)} />
                            </div>
                            <div style={{ display:"flex", gap:8 }}>
                                <button onClick={() => {
                                    const doc = `REQUEST FOR INFORMATION\n${"═".repeat(48)}\nNR GROUP — ARCHITECTURAL GLAZING SYSTEMS\n${"─".repeat(48)}\nDate: ${new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}\nRef: RFI-${Date.now().toString().slice(-6)}\n${"─".repeat(48)}\nName: ${rfiData.name||"—"} | Company: ${rfiData.company||"—"}\nEmail: ${rfiData.email||"—"}\nProject: ${rfiData.project||"—"} | Location: ${rfiData.location||"—"}\nSystem: ${rfiData.system}\nDESCRIPTION: ${rfiData.description||"—"}\n${"═".repeat(48)}`
                                    setAiMessages(prev=>[...prev,{role:"assistant",type:"text",content:`**RFI Compiled — Ref: RFI-${Date.now().toString().slice(-6)}**\n\nRoute to: engineering@nrwindows.com\n\n\`\`\`\n${doc}\n\`\`\``}])
                                    setRfiMode(false)
                                }} style={{ flex:1, background:`linear-gradient(135deg,#2f86e0,${GOLD})`, color:"#ffffff", border:"none", fontFamily:"'Jost',sans-serif", fontSize:10, fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase" as const, padding:"10px 0", cursor:"pointer", borderRadius:4, boxShadow:`0 4px 16px ${GOLD_GLOW}` }}>Compile RFI →</button>
                                <button onClick={() => setRfiMode(false)} style={{ background:GLASS_BG, border:`1px solid ${GLASS_BORDER}`, color:TEXT_SUBTLE, fontFamily:"'Jost',sans-serif", fontSize:10, padding:"10px 12px", cursor:"pointer", borderRadius:4 }}>Cancel</button>
                            </div>
                        </div>
                    )}

                    {activeTab==="canvas" && (
                        <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column" }}>
                            <div style={{ padding:"12px 14px", borderBottom:`1px solid ${DIVIDER}`, background:"rgba(0,0,0,0.2)", flexShrink:0 }}>
                                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px 10px", marginBottom:8 }}>
                                    <div>
                                        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, fontWeight:400, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, marginBottom:4 }}>System</div>
                                        <select className="ctrl-sel" value={canvasSystem} onChange={e=>setCanvasSystem(e.target.value)}>
                                            {Object.entries(ENGINEERING_DB).map(([k,v]) => <option key={k} value={k}>{v.series.split(" — ")[0]}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, fontWeight:400, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:TEXT_SUBTLE, marginBottom:4 }}>View Type</div>
                                        <select className="ctrl-sel" value={canvasDiagramType} onChange={e=>setCanvasDiagramType(e.target.value as "elevation"|"layout"|"joint")}>
                                            <option value="layout">System Layout</option>
                                            <option value="elevation">Building Elevation</option>
                                            <option value="joint">Joint Detail / Section</option>
                                        </select>
                                    </div>
                                    {canvasDiagramType!=="joint" && <>
                                        <div>
                                            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, color:TEXT_SUBTLE, marginBottom:4 }}>Floors: {canvasFloors}</div>
                                            <input type="range" min="2" max="10" value={canvasFloors} onChange={e=>setCanvasFloors(Number(e.target.value))} style={{ width:"100%", accentColor:GOLD }} />
                                        </div>
                                        <div>
                                            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, color:TEXT_SUBTLE, marginBottom:4 }}>Bays: {canvasBays}</div>
                                            <input type="range" min="2" max="8" value={canvasBays} onChange={e=>setCanvasBays(Number(e.target.value))} style={{ width:"100%", accentColor:GOLD }} />
                                        </div>
                                    </>}
                                </div>
                                <div style={{ marginBottom:6 }}>
                                    <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, color:TEXT_SUBTLE, marginBottom:5 }}>Frame Finish — {FINISH_COLORS[canvasFinish]?.label}</div>
                                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" as const }}>
                                        {Object.entries(FINISH_COLORS).map(([key,val]) => (
                                            <div key={key} className={`swatch${canvasFinish===key?" active":""}`} style={{ background:val.hex }} title={val.label} onClick={() => setCanvasFinish(key)} />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, color:TEXT_SUBTLE, marginBottom:5 }}>Wall Cladding — {WALL_COLORS[canvasWall]?.label}</div>
                                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" as const }}>
                                        {Object.entries(WALL_COLORS).map(([key,val]) => (
                                            <div key={key} className={`swatch${canvasWall===key?" active":""}`} style={{ background:val.hex, border:key==="white"?"1px solid rgba(255,255,255,0.3)":undefined }} title={val.label} onClick={() => setCanvasWall(key)} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div style={{ flex:1, padding:"12px", overflowX:"auto", overflowY:"hidden" }}>
                                <div style={{ background:"#0a0c10", border:`1px solid ${GLASS_BORDER}`, borderRadius:4, overflow:"hidden", boxShadow:SHADOW_LG }}>
                                    <div style={{ padding:"6px 10px", borderBottom:`1px solid ${DIVIDER}`, display:"flex", justifyContent:"space-between", background:"rgba(0,0,0,0.3)" }}>
                                        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:GOLD }}>◈ MCP CANVAS — LIVE RENDER</div>
                                        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, color:TEXT_SUBTLE }}>{canvasDiagramType.toUpperCase()} · {ENGINEERING_DB[canvasSystem]?.fbc}</div>
                                    </div>
                                    <div style={{ padding:"10px 8px", minHeight:240 }} dangerouslySetInnerHTML={{ __html:getCanvasSVG() }} />
                                    <div style={{ padding:"5px 10px", borderTop:`1px solid ${DIVIDER}`, background:"rgba(0,0,0,0.2)" }}>
                                        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, color:TEXT_SUBTLE }}>Frame: {FINISH_COLORS[canvasFinish]?.code} · Wall: {WALL_COLORS[canvasWall]?.label} · NR Group WPB FL</div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding:"8px 12px", borderTop:`1px solid ${DIVIDER}`, display:"flex", gap:8, background:"rgba(0,0,0,0.15)", flexShrink:0 }}>
                                <button onClick={() => {
                                    const db=ENGINEERING_DB[canvasSystem]
                                    const msg:ChatMessage={role:"user",type:"text",content:`Show ${db.series} with ${FINISH_COLORS[canvasFinish].label} frame and ${WALL_COLORS[canvasWall].label} wall`}
                                    const resp=processEngineering(msg.content)
                                    setAiMessages(prev=>[...prev,msg,resp]); setActiveTab("chat")
                                }} style={{ flex:1, background:`linear-gradient(135deg,${GOLD},#1a64b8)`, color:"#ffffff", border:"none", fontFamily:"'Jost',sans-serif", fontSize:9, fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase" as const, padding:"8px 0", cursor:"pointer", borderRadius:4, boxShadow:`0 2px 12px ${GOLD_GLOW}` }}>Send to Chat ◈</button>
                                <button onClick={() => setRfiMode(true)} style={{ background:GLASS_BG, border:`1px solid ${GLASS_BORDER}`, color:TEXT_SUBTLE, fontFamily:"'Jost',sans-serif", fontSize:9, padding:"8px 12px", cursor:"pointer", borderRadius:4 }}>Generate RFI</button>
                            </div>
                        </div>
                    )}

                    <div style={{ padding:"6px 14px", borderTop:`1px solid ${DIVIDER}`, display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0, background:"rgba(0,0,0,0.15)" }}>
                        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, color:TEXT_SUBTLE }}>NR Group · FBC 8th Ed · Visual MCP v2</div>
                        <button onClick={() => {setRfiMode(true);setActiveTab("chat")}} style={{ background:"transparent", border:"none", fontFamily:"'Jost',sans-serif", fontSize:8, fontWeight:400, letterSpacing:"0.12em", textTransform:"uppercase" as const, color:GOLD, cursor:"pointer", padding:0 }}>Generate RFI ◈</button>
                    </div>
                </div>
            )}
        </div>
    )
}

addPropertyControls(NRGroupWebsite, {})
