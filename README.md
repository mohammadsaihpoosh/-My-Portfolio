/* -----------------------------------------------
   MOHAMMAD SIAHPOOSH — DARK SCRAPBOOK PORTFOLIO
   ----------------------------------------------- */
:root {
  --bg: #080808;
  --panel: #101010;
  --panel-2: #171717;
  --white: #f2f0eb;
  --muted: #a5a39e;
  --dim: #656565;
  --line: #77736e;
  --line-soft: #373737;
  --accent: #d9d5cb;
  --font-body: "Space Mono", "Courier New", monospace;
  --font-display: "Special Elite", Georgia, serif;
  --max-width: 1120px;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 90px; }
body { margin: 0; color: var(--white); background: var(--bg); font-family: var(--font-body); font-size: 12px; line-height: 1.7; }
body::before { content: "✦  ✝  ⟡  ☾  ✧  ✝  ⟡  ✦"; position: fixed; inset: 0; z-index: -1; opacity: .11; font-size: clamp(22px, 5vw, 64px); letter-spacing: 18px; line-height: 2.5; overflow: hidden; overflow-wrap: anywhere; transform: rotate(-8deg) scale(1.2); pointer-events: none; }
a { color: inherit; text-decoration: none; }
button, input, textarea { font: inherit; }
button, a { -webkit-tap-highlight-color: transparent; }
button:focus-visible, a:focus-visible, input:focus-visible, textarea:focus-visible { outline: 2px solid var(--white); outline-offset: 4px; }
.grain { position: fixed; inset: 0; pointer-events: none; z-index: 20; opacity: .055; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E"); }
.topbar { min-height: 62px; width: min(var(--max-width), calc(100% - 32px)); margin: 0 auto; display: flex; align-items: center; gap: 16px; border-bottom: 1px solid var(--line); position: relative; }
.back-mark { font-family: Arial, sans-serif; font-size: 36px; line-height: 1; padding: 0 5px; }
.top-id { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; font-size: 10px; letter-spacing: .04em; }
.tiny-star { color: #b9b3a8; }
.heart { color: #d9d2cc; font-size: 15px; margin: 0 4px; }
.dash { color: var(--dim); letter-spacing: .1em; }
.top-status { white-space: nowrap; font-size: 10px; letter-spacing: .12em; }
.status-light { display: inline-block; width: 6px; height: 6px; background: #d7d4cc; border-radius: 50%; margin-right: 7px; box-shadow: 0 0 8px #ddd; }
.tiny-cross { font-size: 18px; margin-left: 8px; }
.site-nav { display: flex; gap: 15px; font-size: 9px; }
.site-nav a { color: var(--muted); transition: color .2s; }
.site-nav a:hover, .site-nav a.active { color: var(--white); }
.menu-toggle { display: none; color: var(--white); background: none; border: 1px solid var(--line); padding: 6px 9px; cursor: pointer; }
.page-frame { width: min(var(--max-width), calc(100% - 32px)); margin: 18px auto 30px; border: 1px solid var(--line); padding: clamp(12px, 2vw, 22px); position: relative; background: rgba(8,8,8,.93); }
.page-frame::before, .page-frame::after { content: "✝"; position: absolute; color: #e7e2d8; font-size: 28px; z-index: 2; }
.page-frame::before { left: -15px; top: 31%; }
.page-frame::after { right: -12px; bottom: 17%; }
.frame, .panel, .project-card, .identity-panel { border: 1px solid var(--line); background: rgba(15,15,15,.94); }
.hero-grid { display: grid; grid-template-columns: minmax(260px, .92fr) minmax(0, 1.08fr); gap: 14px; }
.portrait-panel { padding: 9px; position: relative; }
.panel-label, .eyebrow, .micro-label { font-size: 9px; letter-spacing: .16em; color: var(--muted); }
.panel-label { border-bottom: 1px solid var(--line-soft); padding: 0 2px 7px; }
.portrait-art { min-height: 290px; height: calc(100% - 43px); margin-top: 8px; overflow: hidden; position: relative; border: 1px solid #b6b2aa; background: repeating-linear-gradient(135deg, #191919 0 2px, #0d0d0d 2px 5px); filter: grayscale(1); }
.portrait-art::before { content: ""; position: absolute; inset: 0; opacity: .42; background: repeating-linear-gradient(0deg, transparent 0 5px, #a6a6a6 6px, transparent 7px 13px), repeating-linear-gradient(90deg, transparent 0 11px, #777 12px, transparent 13px 23px); mix-blend-mode: screen; }
.portrait-halo { position: absolute; width: 65%; height: 85%; left: 18%; top: 4%; border: 1px solid #aaa; border-radius: 48% 48% 40% 40%; transform: rotate(-9deg); box-shadow: 0 0 0 8px #222, 0 0 0 9px #777; }
.portrait-head { position: absolute; width: 41%; height: 51%; left: 29%; top: 17%; background: linear-gradient(115deg, #aaa, #555 50%, #222); border-radius: 48% 48% 42% 43%; clip-path: polygon(10% 0, 88% 2%, 100% 36%, 85% 76%, 62% 100%, 28% 95%, 4% 57%); box-shadow: 0 0 0 2px #ddd; }
.portrait-hair { position: absolute; width: 45%; height: 26%; left: 27%; top: 12%; background: #080808; clip-path: polygon(0 56%, 4% 19%, 22% 0, 61% 0, 95% 25%, 100% 77%, 78% 52%, 56% 31%, 28% 47%, 9% 100%); }
.portrait-neck { position: absolute; width: 20%; height: 20%; top: 58%; left: 40%; background: #777; }
.portrait-coat { position: absolute; width: 90%; height: 39%; left: 5%; bottom: -7%; background: repeating-linear-gradient(110deg, #111 0 8px, #555 9px, #151515 11px 18px); clip-path: polygon(30% 0, 68% 0, 100% 100%, 0 100%); border-top: 2px solid #bbb; }
.portrait-scratch { position: absolute; right: 8%; bottom: 15%; font-size: 35px; color: #eee; }
.portrait-caption { position: absolute; left: 8%; top: 7%; border: 1px solid #bdbdbd; padding: 7px; font-family: var(--font-display); font-size: 9px; background: #111; transform: rotate(-8deg); }
.portrait-footer { display: flex; justify-content: space-between; gap: 8px; padding: 8px 1px 1px; font-size: 8px; letter-spacing: .08em; color: var(--muted); }
.identity-panel { position: relative; padding: 0 12px 15px; overflow: hidden; }
.window-bar { display: flex; justify-content: space-between; align-items: center; margin: 0 -12px 14px; padding: 5px 9px; background: #d9d8d3; color: #111; font-size: 10px; font-weight: bold; }
.window-controls { display: flex; gap: 4px; }
.window-controls button { width: 18px; height: 17px; line-height: 12px; padding: 0; border: 1px solid #333; color: #111; background: #eee; cursor: pointer; font-size: 14px; }
.identity-content { max-width: 540px; }
.eyebrow { margin: 0 0 10px; }
h1, h2, h3, p { margin-top: 0; }
h1 { font-family: var(--font-display); font-size: clamp(32px, 5vw, 58px); font-weight: 400; line-height: .98; letter-spacing: -.055em; margin: 0 0 13px; }
h1 span, .contact-copy h2 span { color: #a8a39b; font-style: italic; }
.hero-role { color: #c7c3ba; font-size: 11px; max-width: 370px; }
.profile-facts { list-style: none; padding: 12px 0; margin: 15px 0; border-top: 1px dashed var(--line); border-bottom: 1px dashed var(--line); }
.profile-facts li { margin: 4px 0; font-size: 11px; }
.profile-facts li span { color: #c7c0b5; margin-right: 8px; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 8px; }
.button { min-height: 36px; padding: 9px 13px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--white); text-transform: uppercase; letter-spacing: .07em; font-size: 9px; cursor: pointer; transition: background .2s, color .2s, transform .2s; }
.button:hover { transform: translateY(-2px); }
.button-light { background: var(--white); color: #090909; }
.button-light:hover { background: #c7c2b7; }
.button-outline { background: transparent; color: var(--white); }
.button-outline:hover { background: #eee; color: #111; }
.cross-stamp { position: absolute; right: 12px; bottom: 4px; font-size: 50px; color: #d5d0c7; opacity: .2; }
.quote-row { display: grid; grid-template-columns: 170px 90px 1fr; gap: 15px; align-items: center; padding: 22px 5px; }
.quote-bubble { border: 1px solid var(--white); border-radius: 0 14px 14px 14px; padding: 12px; font-family: var(--font-display); font-size: 13px; background: #eeeae2; color: #111; transform: rotate(-2deg); }
.quote-art { display: flex; flex-direction: column; align-items: center; font-size: 28px; line-height: .9; color: #e4e0d8; }
.quote-art span:nth-child(2) { font-size: 36px; transform: rotate(35deg); }
blockquote { margin: 0; max-width: 650px; padding-left: 18px; border-left: 1px solid var(--line); font-family: var(--font-display); font-size: clamp(14px, 2vw, 20px); line-height: 1.5; color: #d8d4cc; }
.content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin: 8px 0 20px; }
.panel { padding: 16px; min-width: 0; }
.section-heading { display: flex; align-items: baseline; gap: 10px; margin-bottom: 14px; border-bottom: 1px solid var(--line-soft); padding-bottom: 8px; }
.section-heading > span:first-child { font-size: 9px; color: var(--muted); }
h2 { font-family: var(--font-display); font-weight: 400; font-size: clamp(19px, 2.7vw, 27px); line-height: 1.1; margin: 0; }
h3 { font-family: var(--font-display); font-size: 16px; font-weight: 400; margin: 5px 0 7px; }
p { color: #c5c1b9; }
.large-copy { font-family: var(--font-display); font-size: 19px; color: var(--white); margin-bottom: 10px; }
.mini-tags, .research-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 14px; }
.mini-tags span, .research-tags span { border: 1px solid var(--line); padding: 4px 6px; font-size: 8px; color: var(--muted); }
.facts-panel { padding-top: 0; }
.facts-inner { display: grid; gap: 12px; }
.fact-line { display: flex; align-items: center; gap: 12px; }
.fact-symbol { display: grid; place-items: center; width: 34px; height: 34px; border: 1px solid var(--line); font-size: 19px; flex-shrink: 0; }
.fact-line small, .timeline-item small { display: block; color: var(--muted); font-size: 8px; letter-spacing: .13em; }
.fact-line strong { font-size: 10px; font-weight: 400; }
.goals-panel { margin-bottom: 25px; }
.goal-columns { display: grid; grid-template-columns: repeat(3, 1fr); gap: 17px; }
.goal-columns > div + div { border-left: 1px solid var(--line-soft); padding-left: 16px; }
.micro-label { margin-bottom: 6px; }
.goal-columns p:not(.micro-label) { font-size: 11px; margin-bottom: 0; }
.projects-section { margin: 25px 0; }
.heading-note { margin-left: auto; font-size: 8px; color: var(--muted); }
.filter-bar { display: flex; gap: 6px; flex-wrap: wrap; margin: 0 0 12px; }
.filter-button { padding: 6px 10px; border: 1px solid var(--line); background: transparent; color: var(--muted); font-size: 9px; cursor: pointer; }
.filter-button.active, .filter-button:hover { background: var(--white); color: #111; border-color: var(--white); }
.project-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.project-card { min-width: 0; transition: transform .25s, border-color .25s; }
.project-card:hover { transform: translateY(-4px); border-color: #e2ddd3; }
.project-card.is-hidden { display: none; }
.project-visual { min-height: 160px; position: relative; overflow: hidden; border-bottom: 1px solid var(--line); background: #1a1a1a; padding: 12px; }
.visual-top, .visual-bottom { position: absolute; font-size: 8px; color: #bcb7ae; letter-spacing: .1em; }
.visual-top { top: 10px; left: 12px; }
.visual-bottom { bottom: 9px; right: 12px; }
.visual-portfolio { background: repeating-linear-gradient(135deg, #151515 0 5px, #222 6px 7px); }
.visual-big { position: absolute; left: 12%; top: 30%; font-family: var(--font-display); font-size: clamp(20px, 3vw, 32px); line-height: .95; transform: rotate(-5deg); text-shadow: 2px 2px #555; }
.visual-study { display: flex; align-items: center; justify-content: center; flex-direction: column; background: #e2dfd8; color: #111; }
.study-cross { font-size: 32px; line-height: 1; }
.study-title { font-family: var(--font-display); font-size: 26px; line-height: .95; text-align: center; }
.study-lines { font-size: 7px; margin-top: 10px; letter-spacing: .18em; }
.visual-lab { display: grid; place-items: center; background: radial-gradient(circle at center, #303030, #080808 65%); }
.lab-ring { width: 105px; height: 105px; border: 1px dashed #ddd; border-radius: 50%; position: absolute; }
.lab-ring::before, .lab-ring::after { content: ""; position: absolute; inset: 13px; border: 1px solid #777; border-radius: 50%; }
.lab-ring::after { inset: -8px 28px; transform: rotate(55deg); }
.lab-code { font-size: 36px; z-index: 1; font-family: var(--font-display); }
.lab-caption { position: absolute; bottom: 10px; left: 12px; font-size: 8px; letter-spacing: .1em; }
.project-info { padding: 13px; }
.project-info h3 { margin-top: 3px; }
.project-info p:not(.micro-label) { font-size: 10px; min-height: 66px; }
.card-meta { display: flex; justify-content: space-between; gap: 8px; padding: 8px 0; border-top: 1px solid var(--line-soft); border-bottom: 1px solid var(--line-soft); font-size: 7px; color: var(--muted); }
.text-link { display: inline-block; font-size: 9px; margin-top: 10px; border-bottom: 1px solid #aaa59b; padding-bottom: 2px; }
.text-link:hover { color: #c6bca8; }
.footnote { font-size: 9px; color: var(--dim); margin: 10px 0 0; }
.muted { color: var(--muted); font-size: 10px; }
.skill-row { margin: 14px 0; }
.skill-row > div:first-child { display: flex; justify-content: space-between; gap: 8px; margin-bottom: 5px; font-size: 10px; }
.skill-row small { color: var(--muted); font-size: 8px; }
.skill-track { height: 4px; background: #2c2c2c; }
.skill-track span { display: block; height: 100%; background: #d7d2c8; }
.tool-cloud { display: flex; flex-wrap: wrap; gap: 7px; }
.tool-cloud span { border: 1px solid var(--line); padding: 7px 9px; font-size: 9px; background: #141414; }
.tool-note { display: flex; gap: 12px; align-items: flex-start; border-top: 1px dashed var(--line); margin-top: 20px; padding-top: 14px; }
.tool-note p { font-size: 10px; margin: 0; }
.tool-icon { font-size: 25px; }
.timeline-item { display: flex; gap: 12px; position: relative; padding-bottom: 18px; }
.timeline-item:not(:last-of-type)::before { content: ""; position: absolute; width: 1px; background: var(--line); top: 12px; bottom: 0; left: 5px; }
.timeline-dot { width: 11px; height: 11px; border: 1px solid var(--white); border-radius: 50%; flex-shrink: 0; margin-top: 5px; background: var(--bg); z-index: 1; }
.timeline-item p { font-size: 10px; margin-bottom: 0; }
.disabled-link { margin-top: 3px; opacity: .65; }
.empty-state { text-align: center; padding: 14px 6px 8px; }
.empty-icon { font-size: 34px; }
.empty-state p { font-size: 10px; max-width: 330px; margin: 0 auto 13px; }
.stamp { display: inline-block; border: 1px solid var(--line); color: var(--muted); font-size: 8px; padding: 4px 7px; transform: rotate(-3deg); }
.research-panel p { font-size: 11px; }
.contact-section { margin-top: 25px; border: 1px solid var(--line); display: grid; grid-template-columns: 1fr 1fr; gap: 22px; padding: clamp(16px, 3vw, 30px); position: relative; overflow: hidden; }
.contact-section::after { content: "✝"; position: absolute; right: 10px; top: 10px; font-size: 40px; color: #555; opacity: .35; pointer-events: none; }
.contact-copy h2 { font-size: clamp(30px, 4vw, 48px); margin: 12px 0; }
.contact-copy > p:not(.micro-label) { max-width: 350px; font-size: 11px; }
.contact-sigil { font-size: 35px; color: #d4cfc5; margin-top: 20px; letter-spacing: .4em; }
.contact-sigil span { font-size: 20px; }
.contact-form { display: flex; flex-direction: column; gap: 7px; }
.contact-form label { color: var(--muted); font-size: 8px; letter-spacing: .14em; margin-top: 4px; }
.contact-form input, .contact-form textarea { width: 100%; border: 1px solid var(--line); border-radius: 0; background: #0b0b0b; color: var(--white); padding: 10px; resize: vertical; }
.contact-form input::placeholder, .contact-form textarea::placeholder { color: #686868; }
.submit-button { align-self: flex-start; margin-top: 3px; }
.form-message { min-height: 18px; margin: 0; font-size: 10px; }
.form-message.error { color: #e5aaa3; }
.form-message.success { color: #d9d4c8; }
.footer { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 10px; border-top: 1px solid var(--line); padding-top: 13px; margin-top: 18px; color: var(--muted); font-size: 8px; letter-spacing: .08em; }
.footer a { color: var(--white); }
.reveal { opacity: 0; transform: translateY(12px); transition: opacity .6s ease, transform .6s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
@media (max-width: 850px) {
  .topbar { flex-wrap: wrap; }
  .site-nav { display: none; order: 5; width: 100%; padding: 0 0 12px; flex-wrap: wrap; }
  .site-nav.open { display: flex; }
  .menu-toggle { display: block; }
  .top-status { margin-left: auto; }
  .hero-grid { grid-template-columns: .9fr 1.1fr; }
  .portrait-art { min-height: 260px; }
  .project-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .project-card:last-child { grid-column: span 2; }
  .project-card:last-child .project-visual { min-height: 130px; }
}
@media (max-width: 600px) {
  body { font-size: 11px; }
  .topbar, .page-frame { width: calc(100% - 20px); }
  .topbar { gap: 9px; min-height: 54px; }
  .top-id { font-size: 9px; }
  .dash { display: none; }
  .top-status { font-size: 8px; letter-spacing: .06em; }
  .page-frame { padding: 9px; margin-top: 10px; }
  .hero-grid, .content-grid, .contact-section { grid-template-columns: 1fr; }
  .portrait-art { min-height: 310px; }
  .identity-panel { min-height: 0; }
  .quote-row { grid-template-columns: 115px 45px 1fr; gap: 8px; padding: 18px 0; }
  .quote-bubble { font-size: 11px; padding: 8px; }
  .quote-art { font-size: 20px; }
  .quote-art span:nth-child(2) { font-size: 25px; }
  blockquote { font-size: 12px; padding-left: 10px; }
  .goal-columns { grid-template-columns: 1fr; gap: 15px; }
  .goal-columns > div + div { border-left: 0; border-top: 1px solid var(--line-soft); padding: 13px 0 0; }
  .project-grid { grid-template-columns: 1fr; }
  .project-card:last-child { grid-column: auto; }
  .project-card .project-visual, .project-card:last-child .project-visual { min-height: 180px; }
  .project-info p:not(.micro-label) { min-height: auto; }
  .heading-note { display: none; }
  .contact-section { gap: 10px; }
  .contact-sigil { margin-top: 5px; }
  .footer { flex-direction: column; }
  .page-frame::before { left: -7px; font-size: 19px; }
  .page-frame::after { right: -5px; font-size: 19px; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; transition-duration: .01ms !important; }
  .reveal { opacity: 1; transform: none; }
}


/* --- GOTHIC ANGEL INTERACTION LAYER --- */
:root{--bg:#080808;--panel:#101010;--panel-2:#171717;--white:#f1efeb;--muted:#aaa6a0;--dim:#77736e;--line:#77716a;--line-soft:#383633;--accent:#d9d5ce}
body{background:#080808;color:var(--white)}
body::before{color:#c9c4bc;opacity:.055}
a:hover{color:#fff}
::selection{background:#e8e4dc;color:#090909}
.button{border-color:#aaa49b;color:#e8e4dc}
.button:hover:not(:disabled){background:#e8e4dc;color:#090909}
.button-primary,.button-light{background:#e8e4dc;color:#090909;border-color:#e8e4dc}
.button-outline,.button-quiet{border-color:#625e58;color:#dedbd5}
.button-outline:hover:not(:disabled){background:#e8e4dc;color:#090909}
.status-light{background:#dedbd5;box-shadow:0 0 10px #dedbd588}
.skill-track span{background:#c9c4bc}
.angel-art-wrap{min-height:410px;background:radial-gradient(ellipse at center,#33302d 0,#111 48%,#050505 100%);overflow:hidden}
.angel-art-wrap:before{opacity:.13}
.angel-art-label{position:absolute;z-index:5;left:12px;top:10px;font-size:8px;letter-spacing:.15em;color:#c7c2b9}
.wing-stage{position:absolute;inset:30px 0 38px;display:grid;place-items:center;touch-action:none;cursor:grab;outline:none;overflow:visible}
.wing-stage:active{cursor:grabbing}
.angel-wings{width:min(115%,720px);height:auto;overflow:visible;filter:drop-shadow(0 0 9px #fff7) drop-shadow(0 0 30px #e3e0d6a6);transform-origin:50% 55%;will-change:transform;user-select:none;pointer-events:none}
.angel-wings .feathers path{fill:url(#feather);stroke:#f6f3ec;stroke-width:1.2}
.angel-wings .wing-outline{fill:#171615;stroke:#f5f1e9;stroke-width:2;filter:url(#wingGlow)}
.angel-wings .feather-lines{fill:none;stroke:#fff;stroke-width:1.4;opacity:.7}
.angel-wings .wing-center{filter:drop-shadow(0 0 8px white)}
.wing-light{position:absolute;width:52%;height:45%;border-radius:50%;background:#fff;filter:blur(58px);opacity:.13;pointer-events:none;mix-blend-mode:screen}
.wing-particles{position:absolute;color:#fff;text-shadow:0 0 12px #fff;font-size:19px;letter-spacing:22px;pointer-events:none;animation:angel-drift 7s ease-in-out infinite alternate}
@keyframes angel-drift{from{transform:translate(-12px,8px) rotate(-5deg);opacity:.45}to{transform:translate(15px,-12px) rotate(6deg);opacity:1}}
.wing-control-strip{position:absolute;z-index:8;bottom:5px;left:8px;right:8px;display:flex;justify-content:center;gap:5px;flex-wrap:wrap}
.mini-control{background:#0b0b0b;color:#e3dfd8;border:1px solid #66615a;padding:7px 9px;font:9px "Space Mono",monospace;cursor:pointer;transition:background .2s,color .2s}
.mini-control:hover,.mini-control.is-active{background:#e3dfd8;color:#080808}
.angel-lab{width:min(1120px,calc(100% - 32px));margin:30px auto;padding:clamp(14px,3vw,28px);background:#0d0d0d;border:1px solid #69645d}
.angel-lab .section-heading{margin-bottom:25px}
.angel-lab-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.lab-column{min-width:0;border:1px solid #4c4842;background:#090909;padding:12px}
.window-bar{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:5px 0 10px;border-bottom:1px solid #3a3732;color:#d0cbc2;font-size:9px}
.lab-intro{font-size:11px;color:#aaa69e;line-height:1.8}
.camera-box{height:180px;position:relative;display:grid;place-items:center;background:radial-gradient(ellipse,#272522,#050505 70%);border:1px solid #4a4640;overflow:hidden}
#camera-preview{display:none;width:100%;height:100%;object-fit:cover;transform:scaleX(-1);filter:grayscale(1) contrast(1.12)}
#camera-preview.is-visible{display:block}
.camera-placeholder{position:absolute;text-align:center;font:12px "Space Mono",monospace;letter-spacing:.12em;color:#d6d1c8;line-height:2}
.camera-placeholder span{font-size:8px;color:#817c73}
.camera-actions{display:flex;gap:6px;flex-wrap:wrap;margin:12px 0}
.camera-actions .button{padding:9px;font-size:9px}
.tracking-readout{display:grid;grid-template-columns:auto 1fr;gap:6px 12px;padding:10px 0;font:9px "Space Mono",monospace;color:#8e8981;border-top:1px solid #302d29}
.tracking-readout strong{color:#eee9e0;font-weight:400}
.music-cover{height:135px;position:relative;overflow:hidden;display:grid;place-items:center;background:repeating-linear-gradient(135deg,#171615 0 2px,#080808 2px 7px);border:1px solid #49443e;margin:12px 0}
.music-cover:before,.music-cover:after{content:"";position:absolute;width:180px;height:180px;border:1px solid #8d877e;border-radius:50%;box-shadow:0 0 0 10px #ffffff08,0 0 0 30px #ffffff05}
.music-cover:after{width:90px;height:90px}
.music-cover-orbit{position:absolute;width:80%;height:45%;border:1px solid #aaa49a;border-radius:50%;transform:rotate(-24deg)}
.music-cover-symbol{font-size:44px;color:#f1eee8;z-index:1;text-shadow:0 0 22px #fff}
.music-cover>span{position:absolute;bottom:8px;left:10px;font:8px "Space Mono",monospace;letter-spacing:.15em;color:#b4afa6}
.track-meta{display:flex;justify-content:space-between;gap:12px;align-items:center;font-family:"Space Mono",monospace}
.track-meta small,.track-meta span{display:block;color:#88837b;font-size:8px}
.track-meta strong{display:block;font-size:11px;font-weight:400;color:#e8e4dc;margin:3px 0}
.music-wave{display:block;width:100%;height:44px;margin:10px 0;background:#050505;border:1px solid #282522}
.music-controls{display:flex;gap:6px;justify-content:center;margin:12px 0}
.play-control{min-width:52px;background:#e6e1d8;color:#080808}
.range-line{display:grid;grid-template-columns:60px 1fr 38px;align-items:center;gap:8px;margin:9px 0;font:8px "Space Mono",monospace;color:#99938a}
.range-line input{width:100%;accent-color:#e3dfd7}
.playlist{display:grid;gap:5px;margin-top:12px}
.playlist-item{display:grid;grid-template-columns:24px 1fr auto;text-align:left;gap:8px;padding:8px;background:#10100f;border:1px solid #38342f;color:#d5d0c7;font:9px "Space Mono",monospace}
.playlist-item.is-active{border-color:#b8b1a6}
#contact-form input,#contact-form textarea{background:#111;border-color:#5a554e;color:#eee}
@media(max-width:760px){.angel-lab-grid{grid-template-columns:1fr}.angel-art-wrap{min-height:350px}.wing-stage{inset:32px 0 40px}.angel-wings{width:125%}.camera-box{height:160px}}


/* Persian language font supplied by the user */
@font-face{font-family:"IRANDorandis";src:url("./assets/fonts/IRANDorandis.ttf") format("truetype");font-display:swap}
html[lang="fa"] body,html[lang="fa"] button,html[lang="fa"] input,html[lang="fa"] textarea,html[lang="fa"] .site-nav,html[lang="fa"] .lab-column,html[lang="fa"] .section-heading{font-family:"IRANDorandis","Tahoma",sans-serif}
html[lang="fa"] .lab-intro,html[lang="fa"] .footnote,html[lang="fa"] .window-bar,html[lang="fa"] .tracking-readout,html[lang="fa"] .mini-control{letter-spacing:0}
.portrait-upload-frame{position:relative;min-height:390px;background:radial-gradient(ellipse at center,#302d2b,#101010 56%,#050505);overflow:hidden;display:grid;place-items:center;border:1px solid #66615a}
.portrait-upload-placeholder{display:flex;flex-direction:column;align-items:center;gap:10px;color:#d9d4cb;text-align:center;z-index:1}
.portrait-cross{font-size:64px;text-shadow:0 0 22px #fff}
.portrait-upload-placeholder strong{font:16px "Space Mono",monospace;letter-spacing:.12em}
.portrait-upload-placeholder small{font:8px "Space Mono",monospace;color:#99938b}
#portrait-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.08);z-index:1}
.portrait-upload-button{position:absolute;bottom:15px;left:50%;transform:translateX(-50%);z-index:3;background:#e6e1d8;color:#090909;border:1px solid #fff;padding:10px 12px;white-space:nowrap;font:9px "Space Mono",monospace;cursor:pointer}
.portrait-frame-code{position:absolute;top:12px;left:12px;z-index:2;font:8px "Space Mono",monospace;color:#d6d0c6;letter-spacing:.12em}
.lab-toolbar{display:flex;align-items:center;gap:12px;margin:-8px 0 18px;font:9px "Space Mono",monospace;color:#aaa49b}
.lab-hint{margin-inline-start:auto}
.camera-art-layout{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px;margin-top:12px;align-items:start}
.camera-side,.art-side{min-width:0}
.camera-box{height:220px}
.camera-crosshair{position:absolute;z-index:2;left:50%;top:50%;transform:translate(-50%,-50%);font-size:20px;color:#fff7;pointer-events:none}
.art-side{border:1px solid #4c4842;background:#080808;padding:8px;min-height:280px}
.wing-stage-lab{height:220px;min-height:220px;position:relative;background:radial-gradient(ellipse,#373330 0,#121110 48%,#050505 100%);border:1px solid #3f3a34;overflow:hidden;touch-action:none;cursor:grab}
.wing-stage-lab:active{cursor:grabbing}
.wing-stage-lab .angel-wings{width:120%;height:auto;overflow:visible;filter:drop-shadow(0 0 8px #fff9) drop-shadow(0 0 24px #e3e0d6a6);transform-origin:50% 55%;will-change:transform;pointer-events:none}
.wing-stage-lab .feathers path{fill:url(#feather);stroke:#f6f3ec;stroke-width:1.2}
.wing-stage-lab .wing-outline{fill:#171615;stroke:#f5f1e9;stroke-width:2;filter:url(#wingGlow)}
.wing-stage-lab .feather-lines{fill:none;stroke:#fff;stroke-width:1.4;opacity:.7}
.wing-stage-lab .wing-light{position:absolute;width:52%;height:45%;border-radius:50%;background:#fff;filter:blur(38px);opacity:.18;pointer-events:none}
.wing-stage-lab .wing-particles{position:absolute;color:#fff;text-shadow:0 0 12px #fff;font-size:14px;letter-spacing:10px;pointer-events:none;animation:angel-drift 7s ease-in-out infinite alternate}
.wing-control-strip{position:relative;z-index:5;display:flex;justify-content:center;gap:4px;flex-wrap:wrap;margin-top:7px}
.wing-control-strip .mini-control{font-size:8px;padding:6px}
.wing-explosion{position:absolute;inset:0;display:grid;place-items:center;pointer-events:none;z-index:10}
.wing-explosion i{position:absolute;font-style:normal;font-size:15px;color:#fff;text-shadow:0 0 14px #fff,0 0 26px #fff;opacity:0}
.wing-stage-lab.is-exploding .angel-wings{animation:wing-break 1.1s ease-out forwards}
.wing-stage-lab.is-exploding .wing-light{animation:light-burst 1.1s ease-out forwards}
.wing-stage-lab.is-exploding .wing-explosion i{animation:particle-burst 1.05s ease-out forwards}
@keyframes wing-break{0%{transform:translate(var(--tx,0),var(--ty,0)) scale(1);opacity:1;filter:drop-shadow(0 0 12px #fff)}22%{transform:scale(1.12);opacity:1;filter:drop-shadow(0 0 38px #fff)}100%{transform:scale(1.7) rotate(12deg);opacity:0;filter:blur(7px)}}
@keyframes light-burst{0%{opacity:.15;transform:scale(.5)}25%{opacity:1;transform:scale(2.3)}100%{opacity:0;transform:scale(4)}}
@keyframes particle-burst{0%{opacity:0;transform:translate(0,0) scale(.3)}18%{opacity:1}100%{opacity:0;transform:translate(var(--dx),var(--dy)) rotate(var(--rot)) scale(1.5)}}
@media(max-width:760px){.camera-art-layout{grid-template-columns:1fr}.camera-box,.wing-stage-lab{height:205px;min-height:205px}.portrait-upload-frame{min-height:320px}.lab-hint{display:none}}


/* Carefully scoped refinements — preserve the original layout and proportions. */
.portrait-upload-placeholder[hidden]{display:none}
#portrait-image:not([hidden]){display:block}
.portrait-upload-placeholder small{max-width:85%;line-height:1.8}
.topbar::after{content:"†  GOTHIC ANGEL ARCHIVE  †";position:absolute;left:50%;bottom:-7px;transform:translateX(-50%);padding:0 8px;background:var(--bg);color:#8d857e;font-size:7px;letter-spacing:.12em;white-space:nowrap}
.top-id{transition:letter-spacing .25s,color .25s}
.top-id:hover{letter-spacing:.09em;color:#fff}
.window-bar{position:relative}
.window-bar::after{content:"✣";color:#777067;margin-left:auto;padding-left:8px;opacity:.75}
.footer{position:relative;padding-top:23px}
.footer-ornament{position:absolute;top:-8px;left:50%;transform:translateX(-50%);padding:0 10px;background:var(--bg);color:#a29a90;letter-spacing:.12em;white-space:nowrap;font-size:10px}
.reveal{will-change:transform,opacity}

@media(prefers-reduced-motion:reduce){.top-id,.floating-language{transition:none}}
