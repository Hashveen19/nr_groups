// ─── SITE THEME — colour tokens + global CSS (black / dark-blue) ────────────
// NOTE: token names keep their original names (GOLD = primary accent, now
// steel blue) so the rest of the codebase doesn't need to change.

export const BG_BASE = "#05070b"; export const BG_SURFACE = "#090d15"; export const BG_RAISED = "#0f1626"
export const BG_FLOAT = "#152038"; export const BG_MID = "#0a0f1a"
export const TEXT_PRIMARY = "#f2f5fa"; export const TEXT_SECONDARY = "#929eb8"; export const TEXT_SUBTLE = "#4f5a72"
export const GOLD = "#3f9bf0"; export const GOLD_DIM = "rgba(63,155,240,0.55)"; export const GOLD_GLOW = "rgba(63,155,240,0.15)"
export const EDGE_LIGHT = "rgba(255,255,255,0.06)"; export const GLASS_BG = "rgba(255,255,255,0.035)"
export const GLASS_BORDER = "rgba(255,255,255,0.08)"; export const DIVIDER = "rgba(255,255,255,0.055)"
export const SHADOW_SM = "0 2px 8px rgba(0,0,0,0.4),0 1px 2px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.06)"
export const SHADOW_MD = "0 8px 32px rgba(0,0,0,0.5),0 2px 8px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.07)"
export const SHADOW_LG = "0 20px 60px rgba(0,0,0,0.6),0 8px 24px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.08)"
export const SHADOW_XL = "0 40px 80px rgba(0,0,0,0.7),0 16px 40px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.09)"
export const GOLD_SHADOW = `0 0 40px ${GOLD_GLOW},0 8px 32px rgba(0,0,0,0.5)`

export const GLOBAL_CSS = `
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
          width:100%;height:100%;object-fit:cover;
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
