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
