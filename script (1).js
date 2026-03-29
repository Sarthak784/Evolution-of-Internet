/* ============================================
   THE EVOLUTION OF THE INTERNET — script.js
   GSAP + ScrollTrigger powered interactions
   ============================================ */

// ——————————————————————————————————————————————
// 1. REGISTER GSAP PLUGINS
// ——————————————————————————————————————————————
gsap.registerPlugin(ScrollTrigger);

// ——————————————————————————————————————————————
// 2. CUSTOM CURSOR
// ——————————————————————————————————————————————
const cursorDot = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + "px";
  cursorDot.style.top = mouseY + "px";
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursorRing.style.left = ringX + "px";
  cursorRing.style.top = ringY + "px";
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ——————————————————————————————————————————————
// 3. LOADER ANIMATION
// ——————————————————————————————————————————————
const loader = document.getElementById("loader");
const loaderPercent = document.getElementById("loaderPercent");
const loaderCircle = document.querySelector(".loader-circle");
const circumference = 2 * Math.PI * 54; // r=54

let loadProgress = 0;
const loadInterval = setInterval(() => {
  loadProgress += Math.random() * 8 + 2;
  if (loadProgress >= 100) {
    loadProgress = 100;
    clearInterval(loadInterval);
    setTimeout(() => {
      loader.classList.add("hidden");
      initAnimations();
    }, 400);
  }
  loaderPercent.textContent = Math.floor(loadProgress);
  const offset = circumference - (loadProgress / 100) * circumference;
  loaderCircle.style.strokeDashoffset = offset;
}, 80);

// ——————————————————————————————————————————————
// 4. PARTICLES GENERATOR
// ——————————————————————————————————————————————
function createParticles(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.top = Math.random() * 100 + "%";
    p.style.width = (Math.random() * 3 + 1) + "px";
    p.style.height = p.style.width;
    container.appendChild(p);

    gsap.to(p, {
      opacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 3 + 2,
      repeat: -1,
      yoyo: true,
      delay: Math.random() * 2,
    });

    gsap.to(p, {
      y: (Math.random() - 0.5) * 100,
      x: (Math.random() - 0.5) * 60,
      duration: Math.random() * 10 + 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }
}

createParticles("heroParticles", 50);
createParticles("conclusionParticles", 40);

// ——————————————————————————————————————————————
// 5. MAIN ANIMATION INIT (after loader)
// ——————————————————————————————————————————————
function initAnimations() {
  // Show nav
  document.getElementById("nav").classList.add("visible");

  // ---- HERO ANIMATIONS ----
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTl
    .to(".hero-eyebrow", { opacity: 1, duration: 0.8 })
    .to(".hero-line", { opacity: 1, y: 0, duration: 1, stagger: 0.2 }, "-=0.4")
    .to(".hero-sub", { opacity: 1, duration: 0.8 }, "-=0.4")
    .to(".hero-scroll-cue", { opacity: 1, duration: 0.6 }, "-=0.3");

  // ---- PARALLAX on hero watermark ----
  gsap.to(".hero-year-big", {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });

  // ---- ERA SECTIONS ----
  document.querySelectorAll(".era").forEach((section) => {
    const sticky = section.querySelector(".era-sticky");

    // Chapter label + title + date
    gsap.to(section.querySelector(".era-chapter"), {
      opacity: 1,
      scrollTrigger: {
        trigger: sticky,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      duration: 0.6,
    });

    gsap.to(section.querySelector(".era-title"), {
      opacity: 1,
      scrollTrigger: {
        trigger: sticky,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      duration: 0.8,
    });

    gsap.to(section.querySelector(".era-date-range"), {
      opacity: 1,
      scrollTrigger: {
        trigger: sticky,
        start: "top 72%",
        toggleActions: "play none none reverse",
      },
      duration: 0.6,
    });

    // Narrative blocks — scroll-triggered reveal
    section.querySelectorAll(".narrative-block").forEach((block, i) => {
      gsap.to(block, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: block,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Interactive card reveal
    section.querySelectorAll(".interactive-card").forEach((card) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Stat counters
    section.querySelectorAll(".stat-item").forEach((stat, i) => {
      gsap.to(stat, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: stat,
          start: "top 90%",
          onEnter: () => animateCounter(stat),
        },
      });
    });

    // Parallax on watermark
    const watermark = section.querySelector(".era-year-watermark");
    if (watermark) {
      gsap.to(watermark, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  });

  // ---- CONCLUSION ANIMATIONS ----
  const conTrigger = { trigger: ".conclusion", start: "top 60%", toggleActions: "play none none reverse" };

  gsap.to(".conclusion-eyebrow", { opacity: 1, duration: 0.8, scrollTrigger: conTrigger });
  gsap.to(".conclusion-line", { opacity: 1, y: 0, stagger: 0.2, duration: 1, scrollTrigger: conTrigger });
  gsap.to(".conclusion-text", { opacity: 1, stagger: 0.2, duration: 0.8, scrollTrigger: { ...conTrigger, start: "top 50%" } });
  gsap.to(".conclusion-cta", { opacity: 1, duration: 0.8, scrollTrigger: { ...conTrigger, start: "top 45%" } });
  gsap.to(".conclusion-timeline-mini", {
    opacity: 1,
    duration: 0.8,
    scrollTrigger: {
      ...conTrigger,
      start: "top 40%",
      onEnter: () => {
        setTimeout(() => {
          document.querySelector(".timeline-fill-mini").style.width = "100%";
        }, 300);
      },
    },
  });

  // ---- SCROLL PROGRESS BAR ----
  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      document.getElementById("scrollProgress").style.width = (self.progress * 100) + "%";
    },
  });

  // ---- NAV DOT UPDATES ----
  const sections = ["#hero", "#arpanet", "#www", "#social", "#mobile", "#web3", "#conclusion"];
  const navDots = document.querySelectorAll(".nav-dot");

  sections.forEach((sel, i) => {
    ScrollTrigger.create({
      trigger: sel,
      start: "top center",
      end: "bottom center",
      onEnter: () => updateNavDots(i),
      onEnterBack: () => updateNavDots(i),
    });
  });

  function updateNavDots(activeIndex) {
    navDots.forEach((dot, i) => {
      dot.classList.remove("active", "passed");
      if (i === activeIndex) dot.classList.add("active");
      else if (i < activeIndex) dot.classList.add("passed");
    });
    // Update progress line
    const totalGap = navDots.length - 1;
    const progressPercent = (activeIndex / totalGap) * 100;
    const progressEl = document.getElementById("navProgress");
    const containerWidth = document.getElementById("navTimeline").offsetWidth - 12;
    progressEl.style.width = (progressPercent / 100 * containerWidth) + "px";
  }

  // Background color transitions per era
  document.querySelectorAll(".era").forEach((section) => {
    const bgColor = section.dataset.color;
    ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => gsap.to("body", { backgroundColor: bgColor, duration: 1 }),
      onEnterBack: () => gsap.to("body", { backgroundColor: bgColor, duration: 1 }),
    });
  });

  // Reset bg for hero
  ScrollTrigger.create({
    trigger: "#hero",
    start: "top 60%",
    onEnterBack: () => gsap.to("body", { backgroundColor: "#050510", duration: 1 }),
  });

  // Reset bg for conclusion
  ScrollTrigger.create({
    trigger: "#conclusion",
    start: "top 60%",
    onEnter: () => gsap.to("body", { backgroundColor: "#050510", duration: 1 }),
  });
}

// ——————————————————————————————————————————————
// 6. COUNTER ANIMATION
// ——————————————————————————————————————————————
function animateCounter(statEl) {
  const target = parseInt(statEl.dataset.count, 10);
  const numEl = statEl.querySelector(".stat-number");
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    numEl.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ——————————————————————————————————————————————
// 7. TERMINAL INTERACTIVE
// ——————————————————————————————————————————————
const terminalInput = document.getElementById("terminalInput");
const terminalBody = document.getElementById("terminalBody");

const terminalResponses = {
  connect: "Establishing connection to SRI (Stanford)... Connected. Packet switching active.",
  status: "ARPANET Status: 4 nodes online — UCLA, SRI, UCSB, Utah. Bandwidth: 50 kbps.",
  history: "1969: First message sent (\"LO\"). 1971: Email invented. 1973: TCP/IP proposed. 1983: DNS created.",
  login: 'Attempting LOGIN... System crash after "LO". This is historically accurate.',
  help: "Available commands: connect, status, history, login, nodes, email, hello",
  nodes: "Active nodes:\n  1. UCLA — Los Angeles\n  2. SRI — Stanford\n  3. UCSB — Santa Barbara\n  4. Utah — Salt Lake City",
  email: "Ray Tomlinson sends the first email in 1971. He picks @ to separate user from machine. Nobody notices for years.",
  hello: "Hello, explorer! You're using a simulated ARPANET terminal circa 1969. The real thing had 12KB of memory.",
};

if (terminalInput) {
  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const cmd = terminalInput.value.trim().toLowerCase();
      if (!cmd) return;

      // Add command line
      const cmdLine = document.createElement("div");
      cmdLine.className = "terminal-line";
      cmdLine.innerHTML = `<span class="prompt">arpanet@ucla:~$</span> ${escapeHtml(cmd)}`;
      terminalBody.appendChild(cmdLine);

      // Add response
      const response = terminalResponses[cmd] || `Command not found: "${escapeHtml(cmd)}". Type "help" for available commands.`;
      const resLine = document.createElement("div");
      resLine.className = "terminal-line";
      resLine.innerHTML = `<span class="output">${escapeHtml(response)}</span>`;
      terminalBody.appendChild(resLine);

      terminalInput.value = "";
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ——————————————————————————————————————————————
// 8. NASDAQ SLIDER INTERACTIVE
// ——————————————————————————————————————————————
const nasdaqSlider = document.getElementById("nasdaqSlider");
const tickerYear = document.getElementById("tickerYear");
const tickerValue = document.getElementById("tickerValue");
const tickerEvent = document.getElementById("tickerEvent");
const tickerBar = document.getElementById("tickerBar");

const nasdaqData = {
  1995: { value: "1,052", event: "Netscape IPO ignites the dot-com frenzy", bar: 10 },
  1996: { value: "1,291", event: "Yahoo! goes public. The web goes mainstream.", bar: 15 },
  1997: { value: "1,570", event: "Amazon IPO. Netflix founded. Deep Blue beats Kasparov.", bar: 22 },
  1998: { value: "2,193", event: "Google is born in a garage. eBay IPO raises $63M.", bar: 35 },
  1999: { value: "4,069", event: "Dot-com mania peaks. Pets.com Super Bowl ad airs.", bar: 70 },
  2000: { value: "5,048", event: "NASDAQ peaks at 5,048 on March 10. Then the crash begins.", bar: 100 },
  2001: { value: "1,950", event: "Bubble bursts. $5 trillion in value evaporates. Layoffs everywhere.", bar: 25 },
  2002: { value: "1,335", event: "Rock bottom. Only the strongest survive: Amazon, eBay, Google.", bar: 12 },
  2003: { value: "2,003", event: "Recovery begins. The survivors start building Web 2.0.", bar: 28 },
};

if (nasdaqSlider) {
  nasdaqSlider.addEventListener("input", () => {
    const year = nasdaqSlider.value;
    const data = nasdaqData[year];
    if (data) {
      tickerYear.textContent = year;
      tickerValue.textContent = data.value;
      tickerEvent.textContent = data.event;
      tickerBar.style.width = data.bar + "%";

      if (year >= 2001) {
        tickerValue.style.color = "#ff4757";
      } else {
        tickerValue.style.color = "";
      }
    }
  });
}

// ——————————————————————————————————————————————
// 9. APP GRID INTERACTIVE
// ——————————————————————————————————————————————
const appGrid = document.getElementById("appGrid");
const appInfoPanel = document.getElementById("appInfoPanel");

if (appGrid) {
  appGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".app-icon");
    if (!btn) return;

    // Remove active from all
    appGrid.querySelectorAll(".app-icon").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const info = btn.dataset.info;
    appInfoPanel.innerHTML = `<p>${info}</p>`;
    appInfoPanel.classList.add("active");
  });
}

// ——————————————————————————————————————————————
// 10. WEB TOGGLE INTERACTIVE
// ——————————————————————————————————————————————
const webToggle = document.getElementById("webToggle");
if (webToggle) {
  webToggle.addEventListener("click", (e) => {
    const tab = e.target.closest(".web-tab");
    if (!tab) return;

    webToggle.querySelectorAll(".web-tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    document.querySelectorAll(".web-detail").forEach((d) => d.classList.remove("active"));

    const webId = tab.dataset.web;
    const targetMap = { web1: "web1", web2: "web2", web3: "web3Detail" };
    const target = document.getElementById(targetMap[webId]);
    if (target) target.classList.add("active");
  });
}

// ——————————————————————————————————————————————
// 11. SOUND TOGGLE (visual only)
// ——————————————————————————————————————————————
const soundToggle = document.getElementById("soundToggle");
if (soundToggle) {
  soundToggle.addEventListener("click", () => {
    soundToggle.classList.toggle("active");
  });
}

// ——————————————————————————————————————————————
// 12. RESTART BUTTON
// ——————————————————————————————————————————————
const restartBtn = document.getElementById("restartBtn");
if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ——————————————————————————————————————————————
// 13. NAV DOT SMOOTH SCROLL
// ——————————————————————————————————————————————
document.querySelectorAll(".nav-dot").forEach((dot) => {
  dot.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(dot.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ——————————————————————————————————————————————
// 14. ARPANET NODE BACKGROUND ANIMATION (SVG)
// ——————————————————————————————————————————————
function createArpanetNodes() {
  const container = document.getElementById("arpanetNodes");
  if (!container) return;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.style.position = "absolute";
  svg.style.inset = "0";
  svg.style.opacity = "0.08";

  const nodes = [];
  for (let i = 0; i < 20; i++) {
    nodes.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
    });
  }

  // Draw lines
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (dist < 35) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", nodes[i].x + "%");
        line.setAttribute("y1", nodes[i].y + "%");
        line.setAttribute("x2", nodes[j].x + "%");
        line.setAttribute("y2", nodes[j].y + "%");
        line.setAttribute("stroke", "#00ff88");
        line.setAttribute("stroke-width", "1");
        svg.appendChild(line);
      }
    }
  }

  // Draw circles
  nodes.forEach((node) => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", node.x + "%");
    circle.setAttribute("cy", node.y + "%");
    circle.setAttribute("r", "4");
    circle.setAttribute("fill", "#00ff88");
    svg.appendChild(circle);
  });

  container.appendChild(svg);
}

createArpanetNodes();

// ——————————————————————————————————————————————
// 15. FLOATING BACKGROUND ELEMENTS FOR ERAS
// ——————————————————————————————————————————————
function createFloatingWindows() {
  const container = document.getElementById("wwwWindows");
  if (!container) return;

  for (let i = 0; i < 6; i++) {
    const win = document.createElement("div");
    win.style.cssText = `
      position: absolute;
      width: ${60 + Math.random() * 80}px;
      height: ${40 + Math.random() * 60}px;
      border: 1px solid rgba(123, 97, 255, 0.1);
      border-radius: 4px;
      left: ${Math.random() * 90}%;
      top: ${Math.random() * 90}%;
      opacity: 0.06;
    `;
    const titleBar = document.createElement("div");
    titleBar.style.cssText = `
      height: 8px;
      background: rgba(123, 97, 255, 0.15);
      border-radius: 4px 4px 0 0;
    `;
    win.appendChild(titleBar);
    container.appendChild(win);

    gsap.to(win, {
      y: (Math.random() - 0.5) * 50,
      rotation: (Math.random() - 0.5) * 5,
      duration: 8 + Math.random() * 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }
}

createFloatingWindows();

function createSocialBubbles() {
  const container = document.getElementById("socialBubbles");
  if (!container) return;

  const emojis = ["💬", "👍", "❤️", "📸", "🔗", "📱", "🌐", "🔔"];
  for (let i = 0; i < 12; i++) {
    const bubble = document.createElement("div");
    bubble.textContent = emojis[i % emojis.length];
    bubble.style.cssText = `
      position: absolute;
      font-size: ${16 + Math.random() * 20}px;
      left: ${Math.random() * 95}%;
      top: ${Math.random() * 95}%;
      opacity: 0.05;
    `;
    container.appendChild(bubble);

    gsap.to(bubble, {
      y: -30 - Math.random() * 40,
      x: (Math.random() - 0.5) * 30,
      duration: 6 + Math.random() * 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }
}

createSocialBubbles();

// ——————————————————————————————————————————————
// 16. GAME: PACKET DELIVERY
// ——————————————————————————————————————————————
(function initPacketGame() {
  const cv = document.getElementById("packetCanvas");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const st = document.getElementById("packetStatus");
  const sc = document.getElementById("packetScore");
  const rb = document.getElementById("packetRestart");
  const W = 700, H = 200;
  cv.width = W * dpr; cv.height = H * dpr;
  cv.style.width = W + "px"; cv.style.height = H + "px";
  ctx.scale(dpr, dpr);
  const nodeNames = ["UCLA", "SRI", "UCSB", "UTAH"];
  let px, py, vy, nodes, delivered, running, dead, scrollX, speed;

  function reset() {
    px = 40; py = H / 2; vy = 0; scrollX = 0; speed = 1.5; delivered = 0; running = false; dead = false;
    nodes = [
      { x: 200, y: 50 + Math.random() * 100, name: nodeNames[0], got: false },
      { x: 420, y: 40 + Math.random() * 120, name: nodeNames[1], got: false },
      { x: 640, y: 50 + Math.random() * 100, name: nodeNames[2], got: false },
      { x: 860, y: 40 + Math.random() * 120, name: nodeNames[3], got: false },
    ];
    rb.style.display = "none";
    st.textContent = "Click canvas or SPACE to boost upward!";
    sc.textContent = "0 / 4 nodes";
    drawStatic();
  }

  function drawStatic() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "rgba(0,255,136,.05)";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#00ff88";
    ctx.font = "bold 14px 'Space Mono'";
    ctx.textAlign = "center";
    ctx.fillText("[ Click to Start Delivery ]", W / 2, H / 2 + 5);
  }

  function boost() { if (running && !dead) vy = -3; }

  function tick() {
    if (!running || dead) return;
    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "rgba(0,255,136,.04)";
    ctx.lineWidth = 0.5;
    for (let x = (-scrollX % 40); x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

    scrollX += speed;
    vy += 0.12; py += vy;
    if (py < 12) py = 12;
    if (py > H - 12) { py = H - 12; vy = 0; }

    // Connection lines
    ctx.strokeStyle = "rgba(0,255,136,.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length - 1; i++) {
      const a = nodes[i], b = nodes[i + 1];
      ctx.beginPath(); ctx.moveTo(a.x - scrollX, a.y); ctx.lineTo(b.x - scrollX, b.y); ctx.stroke();
    }

    // Nodes
    nodes.forEach((n) => {
      const nx = n.x - scrollX;
      if (nx < -50 || nx > W + 50) return;

      ctx.beginPath(); ctx.arc(nx, n.y, 18, 0, Math.PI * 2);
      if (n.got) {
        ctx.fillStyle = "rgba(0,255,136,.25)"; ctx.fill();
        ctx.strokeStyle = "#00ff88"; ctx.lineWidth = 2; ctx.stroke();
      } else {
        ctx.fillStyle = "rgba(0,255,136,.08)"; ctx.fill();
        ctx.strokeStyle = "rgba(0,255,136,.4)"; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.beginPath(); ctx.arc(nx, n.y, 22 + Math.sin(Date.now() / 300) * 4, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0,255,136,.15)"; ctx.lineWidth = 1; ctx.stroke();
      }

      ctx.fillStyle = n.got ? "#00ff88" : "rgba(0,255,136,.6)";
      ctx.font = "bold 10px 'Space Mono'";
      ctx.textAlign = "center";
      ctx.fillText(n.name, nx, n.y + 4);
      if (n.got) ctx.fillText("✓", nx, n.y - 24);

      if (!n.got && Math.hypot(px - nx, py - n.y) < 26) {
        n.got = true; delivered++;
        sc.textContent = delivered + " / 4 nodes";
        speed += 0.3;
      }
    });

    // Packet trail
    ctx.strokeStyle = "rgba(0,255,136,.2)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(px - 20, py); ctx.lineTo(px, py); ctx.stroke();

    // Packet envelope
    ctx.shadowBlur = 15; ctx.shadowColor = "#00ff88";
    ctx.fillStyle = "#00ff88";
    ctx.beginPath();
    ctx.moveTo(px - 8, py - 5); ctx.lineTo(px + 8, py - 5); ctx.lineTo(px + 8, py + 5); ctx.lineTo(px - 8, py + 5);
    ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(px - 8, py - 5); ctx.lineTo(px, py + 1); ctx.lineTo(px + 8, py - 5);
    ctx.strokeStyle = "#020a02"; ctx.lineWidth = 1; ctx.stroke();
    ctx.shadowBlur = 0;

    // HUD
    ctx.fillStyle = "#00ff88"; ctx.font = "bold 12px 'Space Mono'"; ctx.textAlign = "left";
    ctx.fillText("DELIVERING: " + delivered + "/4", 10, 20);
    const pct = delivered / 4;
    ctx.fillStyle = "rgba(0,255,136,.1)"; ctx.fillRect(W - 160, 8, 140, 8);
    ctx.fillStyle = "#00ff88"; ctx.fillRect(W - 160, 8, 140 * pct, 8);

    if (delivered >= 4) {
      running = false;
      rb.style.display = "inline-block";
      celebratePacket();
      return;
    }

    const lastNode = nodes.filter((n) => !n.got).pop();
    if (lastNode && px > lastNode.x - scrollX + 60 && delivered < 4) {
      dead = true;
      rb.style.display = "inline-block";
      showPacketFact(false);
      return;
    }

    requestAnimationFrame(tick);
  }

  const packetFacts = {
    win: [
      "On Oct 29, 1969, the first ARPANET message was \"LO\" — it was supposed to be \"LOGIN\" but the system crashed after two letters.",
      "ARPANET's 4 original nodes were UCLA, SRI, UCSB, and University of Utah. You just delivered to all of them!",
      "Packet switching — splitting data into small chunks — was considered radical. The phone companies called it impossible.",
    ],
    lose: [
      "Early ARPANET lost ~1 in 10 packets. The network was designed to survive nuclear attack, not to be reliable!",
      "When packets are lost on the real internet, TCP automatically re-sends them. Your browser does this hundreds of times per page.",
      "Packet loss still happens today! When your video call freezes, that's packets failing to arrive in time.",
    ],
  };

  function showPacketFact(won) {
    const pool = won ? packetFacts.win : packetFacts.lose;
    const fact = pool[Math.floor(Math.random() * pool.length)];
    st.innerHTML = (won ? "<strong>ARPANET online!</strong> " : "<strong>Packet lost!</strong> ") + fact;
  }

  function celebratePacket() {
    let particles = [];
    for (let i = 0; i < 60; i++) {
      particles.push({ x: W / 2, y: H / 2, vx: (Math.random() - 0.5) * 8, vy: (Math.random() - 0.5) * 6, r: 2 + Math.random() * 3, life: 1 });
    }
    let frame = 0;
    const msgs = ["NETWORK ONLINE", "UCLA → SRI → UCSB → UTAH", "THE INTERNET IS BORN"];

    function celebFrame() {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(0,255,136,.04)"; ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.life -= 0.012;
        if (p.life <= 0) return;
        ctx.globalAlpha = p.life;
        ctx.shadowBlur = 8; ctx.shadowColor = "#00ff88";
        ctx.fillStyle = "#00ff88"; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      });
      ctx.globalAlpha = 1;

      const nodePos = [{ x: 100, y: 40 }, { x: 270, y: 40 }, { x: 430, y: 40 }, { x: 600, y: 40 }];
      ctx.strokeStyle = "rgba(0,255,136,.5)"; ctx.lineWidth = 1.5;
      const lp = Math.min(frame / 30, 1);
      for (let i = 0; i < 3; i++) {
        const a = nodePos[i], b = nodePos[i + 1];
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(a.x + (b.x - a.x) * lp, a.y + (b.y - a.y) * lp); ctx.stroke();
      }
      nodePos.forEach((n, i) => {
        ctx.beginPath(); ctx.arc(n.x, n.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,255,136,.3)"; ctx.fill();
        ctx.strokeStyle = "#00ff88"; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = "#00ff88"; ctx.font = "bold 9px 'Space Mono'"; ctx.textAlign = "center";
        ctx.fillText(nodeNames[i], n.x, n.y + 3);
      });

      const msgIdx = Math.min(Math.floor(frame / 40), msgs.length - 1);
      const charCount = Math.min(frame - msgIdx * 40, msgs[msgIdx].length);
      const displayMsg = msgs[msgIdx].substring(0, charCount);
      ctx.fillStyle = "#00ff88"; ctx.textAlign = "center";
      ctx.font = "bold 18px 'Space Mono'";
      ctx.shadowBlur = 15; ctx.shadowColor = "#00ff88";
      ctx.fillText(displayMsg, W / 2, H / 2 + 30);
      ctx.shadowBlur = 0;

      if (frame > 80) {
        ctx.font = "bold 12px 'Space Mono'"; ctx.fillStyle = "rgba(0,255,136,.4)";
        ctx.fillText("— October 29, 1969 —", W / 2, H - 15);
      }

      frame++;
      if (frame < 180) requestAnimationFrame(celebFrame);
      else showPacketFact(true);
    }
    celebFrame();
  }

  cv.addEventListener("click", () => {
    if (!running && !dead) { running = true; st.textContent = "Click or SPACE to boost!"; tick(); }
    else boost();
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      const r = cv.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        e.preventDefault();
        if (!running && !dead) { running = true; st.textContent = "Click or SPACE to boost!"; tick(); }
        else boost();
      }
    }
  });

  rb.addEventListener("click", reset);
  reset();
})();

// ——————————————————————————————————————————————
// 17. GAME: SNAKE
// ——————————————————————————————————————————————
(function initSnakeGame() {
  const cv = document.getElementById("snakeCanvas");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const st = document.getElementById("snakeStatus");
  const sc = document.getElementById("snakeScore");
  const W = 240, H = 360, G = 12, cols = W / G, rows = H / G;
  cv.width = W * dpr; cv.height = H * dpr;
  cv.style.width = W + "px"; cv.style.height = H + "px";
  ctx.scale(dpr, dpr);
  let snake, dir, food, score, running, interval, touchStart;

  const snakeFacts = [
    "Nokia's Snake (1998) was pre-installed on 400 million+ phones — the first game most people ever played on mobile.",
    "The App Store launched in 2008 with 500 apps. Today it has over 2 million. Mobile changed everything.",
    "In 2016 mobile internet usage overtook desktop for the first time. We now carry supercomputers in our pockets.",
    "The first smartphone was IBM's Simon (1994). It had a touchscreen, email, and apps — 13 years before the iPhone.",
    "Mobile games generate more revenue than PC and console gaming combined. Snake started it all.",
  ];

  function reset() {
    snake = [{ x: 10, y: 15 }]; dir = { x: 1, y: 0 }; score = 0; running = false; food = newFood();
    sc.textContent = "Score: 0"; st.textContent = "Press arrow key to start";
    clearInterval(interval); draw();
  }

  function newFood() {
    let f;
    do { f = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) }; }
    while (snake.some((s) => s.x === f.x && s.y === f.y));
    return f;
  }

  function draw() {
    ctx.fillStyle = "#0a0a1a"; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "rgba(255,255,255,.03)";
    for (let x = 0; x < W; x += G) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += G) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    ctx.fillStyle = "#ff5f56"; ctx.shadowBlur = 8; ctx.shadowColor = "#ff5f56";
    ctx.fillRect(food.x * G + 1, food.y * G + 1, G - 2, G - 2); ctx.shadowBlur = 0;
    snake.forEach((s, i) => {
      ctx.fillStyle = i === 0 ? "#00ff88" : "rgba(0,255,136,.6)";
      ctx.fillRect(s.x * G + 1, s.y * G + 1, G - 2, G - 2);
    });
    ctx.fillStyle = "#fff"; ctx.font = "bold 10px 'Space Mono'"; ctx.textAlign = "left";
    ctx.fillText("Score: " + score, 4, 12);
  }

  function step() {
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows || snake.some((s) => s.x === head.x && s.y === head.y)) {
      running = false; clearInterval(interval);
      const fact = snakeFacts[Math.floor(Math.random() * snakeFacts.length)];
      st.innerHTML = "<strong>Game over! Score: " + score + ".</strong> " + fact + " <em>Press arrow to restart.</em>";
      return;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) { score++; sc.textContent = "Score: " + score; food = newFood(); }
    else snake.pop();
    draw();
  }

  function setDir(dx, dy) { if (dir.x !== -dx || dir.y !== -dy) dir = { x: dx, y: dy }; }

  document.addEventListener("keydown", (e) => {
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const r = cv.getBoundingClientRect();
    if (r.top > window.innerHeight || r.bottom < 0) return;
    e.preventDefault();
    if (!running) { reset(); running = true; interval = setInterval(step, 100); st.textContent = "Playing..."; }
    if (e.key === "ArrowUp") setDir(0, -1);
    if (e.key === "ArrowDown") setDir(0, 1);
    if (e.key === "ArrowLeft") setDir(-1, 0);
    if (e.key === "ArrowRight") setDir(1, 0);
  });

  cv.addEventListener("touchstart", (e) => {
    touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    if (!running) { reset(); running = true; interval = setInterval(step, 100); st.textContent = "Playing..."; }
  }, { passive: true });

  cv.addEventListener("touchend", (e) => {
    if (!touchStart) return;
    const dx = e.changedTouches[0].clientX - touchStart.x;
    const dy = e.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > Math.abs(dy)) { if (dx > 0) setDir(1, 0); else setDir(-1, 0); }
    else { if (dy > 0) setDir(0, 1); else setDir(0, -1); }
  }, { passive: true });

  reset();
})();

// ——————————————————————————————————————————————
// 18. INTERACTIVE: HUMAN HASH CHAIN
// ——————————————————————————————————————————————
(function initHashChain() {
  const inputs = [document.getElementById("hashInput0"), document.getElementById("hashInput1"), document.getElementById("hashInput2")];
  const visuals = [document.getElementById("hashVisual0"), document.getElementById("hashVisual1"), document.getElementById("hashVisual2")];
  const strings = [document.getElementById("hashString0"), document.getElementById("hashString1"), document.getElementById("hashString2")];
  const statuses = [document.getElementById("hashStatus0"), document.getElementById("hashStatus1"), document.getElementById("hashStatus2")];
  const links = [document.getElementById("hashLink0"), document.getElementById("hashLink1")];
  const blocks = document.querySelectorAll(".hash-block");
  const hint = document.getElementById("hashHint");
  const mineBtn = document.getElementById("hashMineBtn");
  const resetBtn = document.getElementById("hashResetBtn");

  if (!inputs[0]) return;

  const originalValues = ["", "", ""];
  let mined = false; // chain has been mined/locked

  const shapeColors = [
    "#7b61ff", "#00ff88", "#ff6b6b", "#4ecdc4", "#ffe66d", "#a855f7",
    "#06b6d4", "#f97316", "#ec4899", "#84cc16", "#6366f1", "#14b8a6"
  ];
  const shapes = ["circle", "square", "diamond", "triangle"];

  const hashFacts = [
    "This is how Bitcoin works — each block stores the previous block's fingerprint. Change one old transaction, and every block after it turns invalid.",
    "Blockchains are like a notebook written in permanent ink. You can add new pages, but you can never erase what's already written without everyone noticing.",
    "In 2016, hackers stole $60M from Ethereum. But no one could 'edit' the blockchain to undo it — the community had to create an entirely new version instead.",
  ];

  function simpleHash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    }
    return h;
  }

  function generateHashVisual(str, container) {
    container.innerHTML = "";
    if (!str) return;
    const hash = simpleHash(str);
    const seed = Math.abs(hash);

    for (let i = 0; i < 12; i++) {
      const val = (seed * (i + 1) * 7 + i * 31) % 1000;
      const colorIdx = val % shapeColors.length;
      const shapeIdx = Math.floor(val / 100) % shapes.length;
      const el = document.createElement("div");
      el.className = "hash-shape";
      el.style.background = shapeColors[colorIdx];

      if (shapeIdx === 0) el.style.borderRadius = "50%";
      else if (shapeIdx === 2) { el.style.transform = "rotate(45deg)"; el.style.borderRadius = "2px"; }
      else if (shapeIdx === 3) {
        el.style.width = "0"; el.style.height = "0"; el.style.background = "none";
        el.style.borderLeft = "5px solid transparent"; el.style.borderRight = "5px solid transparent";
        el.style.borderBottom = "10px solid " + shapeColors[colorIdx];
      }
      container.appendChild(el);
    }
  }

  function hashToString(str, prevHash) {
    const combined = str + (prevHash || "genesis");
    const h = Math.abs(simpleHash(combined));
    return "0x" + h.toString(16).padStart(8, "0").substring(0, 8);
  }

  function updateChain() {
    let prevHash = "genesis";
    const currentValues = inputs.map((inp) => inp.value);
    const allHaveText = currentValues.every((v) => v.length > 0);

    // Show mine button when all filled but not yet mined
    if (allHaveText && !mined) {
      mineBtn.style.display = "inline-block";
    } else if (!mined) {
      mineBtn.style.display = "none";
    }

    // Detect tampering only after mining
    let tampered = false;
    let tamperIdx = -1;

    if (mined) {
      for (let i = 0; i < 3; i++) {
        if (currentValues[i] !== originalValues[i]) {
          tamperIdx = i;
          tampered = true;
          break;
        }
      }
    }

    for (let i = 0; i < 3; i++) {
      const val = currentValues[i];
      const hashStr = hashToString(val, prevHash);
      prevHash = hashStr;

      generateHashVisual(val, visuals[i]);
      strings[i].textContent = val ? hashStr : "0x000000";

      if (tampered && i >= tamperIdx) {
        blocks[i].classList.add("invalid");
        blocks[i].classList.remove("valid");
        statuses[i].textContent = "✗ TAMPERED";

        visuals[i].querySelectorAll(".hash-shape").forEach((s) => {
          s.style.background = "#ff4757";
          s.style.borderBottomColor = "#ff4757";
        });

        if (i > 0 && links[i - 1]) {
          links[i - 1].classList.add("broken");
        }
      } else if (val) {
        blocks[i].classList.add("valid");
        blocks[i].classList.remove("invalid");
        statuses[i].textContent = mined ? "✓ Mined" : "✓ Valid";
        if (i > 0 && links[i - 1]) links[i - 1].classList.remove("broken");
      } else {
        blocks[i].classList.remove("valid", "invalid");
        statuses[i].textContent = "✓ Valid";
        if (i > 0 && links[i - 1]) links[i - 1].classList.remove("broken");
      }
    }

    // Update hint
    if (tampered) {
      const hf = hashFacts[Math.floor(Math.random() * hashFacts.length)];
      hint.innerHTML = "<strong>Chain broken!</strong> Changing Block #" + (tamperIdx + 1) + " invalidated all blocks after it. " + hf;
      hint.classList.add("alert");
      resetBtn.style.display = "inline-block";
    } else if (mined) {
      hint.textContent = "Chain mined and locked! Now try tampering — edit any block's data to see what happens.";
      hint.classList.remove("alert");
    } else if (allHaveText) {
      hint.textContent = "All blocks filled! Click \"Mine Chain\" to lock the blockchain.";
      hint.classList.remove("alert");
    } else {
      hint.textContent = "Type data into each block, then mine the chain to lock it in.";
      hint.classList.remove("alert");
    }
  }

  function mineChain() {
    mined = true;
    originalValues[0] = inputs[0].value;
    originalValues[1] = inputs[1].value;
    originalValues[2] = inputs[2].value;
    mineBtn.style.display = "none";
    updateChain();
  }

  function resetChain() {
    mined = false;
    inputs.forEach((inp) => { inp.value = ""; });
    originalValues[0] = ""; originalValues[1] = ""; originalValues[2] = "";
    mineBtn.style.display = "none";
    resetBtn.style.display = "none";
    blocks.forEach((b) => b.classList.remove("valid", "invalid"));
    links.forEach((l) => { if (l) l.classList.remove("broken"); });
    updateChain();
  }

  mineBtn.addEventListener("click", mineChain);
  resetBtn.addEventListener("click", resetChain);
  inputs.forEach((inp) => inp.addEventListener("input", updateChain));
})();
