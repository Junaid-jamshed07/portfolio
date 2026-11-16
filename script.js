/* ===== WHATSAPP NUMBER (country code + number, no + or spaces) ===== */
const WHATSAPP = "917019338963";

/* Loader */
window.addEventListener("load", () => setTimeout(() => document.getElementById("loader").classList.add("done"), 900));

/* Typing effect */
const words = ["split ACs", "window ACs", "inverter ACs", "cassette ACs", "your cooling"];
let w = 0, c = 0, del = false;
const typed = document.getElementById("typed");
(function type() {
  const word = words[w];
  typed.textContent = word.slice(0, c);
  if (!del && c++ === word.length) { del = true; return setTimeout(type, 1400); }
  if (del && c-- === 0) { del = false; w = (w + 1) % words.length; c = 0; }
  setTimeout(type, del ? 45 : 90);
})();

/* Snow / ice particles */
const cv = document.getElementById("snow"), ctx = cv.getContext("2d");
let flakes = [];
function sizeCanvas() { cv.width = innerWidth; cv.height = innerHeight; }
sizeCanvas(); addEventListener("resize", sizeCanvas);
for (let i = 0; i < 70; i++) flakes.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: Math.random() * 2.6 + .6, s: Math.random() * .8 + .3, d: Math.random() * Math.PI * 2 });
(function snow() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  ctx.fillStyle = "rgba(200,240,255,.7)";
  flakes.forEach(f => {
    f.y += f.s; f.d += .01; f.x += Math.sin(f.d) * .5;
    if (f.y > cv.height) { f.y = -5; f.x = Math.random() * cv.width; }
    ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 7); ctx.fill();
  });
  requestAnimationFrame(snow);
})();

/* Cursor glow */
const glow = document.getElementById("glow");
addEventListener("pointermove", e => { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; });

/* Scroll: progress bar, navbar, back-to-top */
const nav = document.getElementById("nav"), prog = document.getElementById("progress"), topBtn = document.getElementById("top");
addEventListener("scroll", () => {
  const h = document.documentElement;
  prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
  nav.classList.toggle("scrolled", scrollY > 60);
  topBtn.classList.toggle("show", scrollY > 500);
});
topBtn.onclick = () => scrollTo({ top: 0, behavior: "smooth" });

/* Close mobile menu on link click */
document.querySelectorAll("#menu a").forEach(a => a.addEventListener("click", () => {
  const m = document.getElementById("menu");
  if (m.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(m).hide();
}));

/* Reveal, counters, skill bars */
function countUp(el) {
  const to = +el.dataset.to; let n = 0; const step = Math.max(1, Math.ceil(to / 80));
  const t = setInterval(() => { n = Math.min(to, n + step); el.textContent = n; if (n >= to) clearInterval(t); }, 25);
}
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add("in");
  e.target.querySelectorAll(".bar i").forEach(b => b.style.width = b.dataset.w + "%");
  io.unobserve(e.target);
}), { threshold: .15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { document.querySelectorAll(".count").forEach(countUp); o.disconnect(); } }), { threshold: .5 }).observe(document.querySelector(".stats"));

/* 3D tilt on photo and cards */
document.querySelectorAll(".tilt").forEach(el => {
  el.addEventListener("pointermove", e => {
    const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    el.style.transform = `perspective(700px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
  });
  el.addEventListener("pointerleave", () => el.style.transform = "");
});

/* Motivation quote rotator */
const quotes = [
  "Hard work in silence, let results make the noise.",
  "Small town roots, big city dreams.",
  "A good technician fixes the AC. A great one earns your trust.",
  "Skill and honesty never go out of season.",
  "Every problem has a solution. Stay calm, stay cool.",
  "Success is built one honest job at a time."
];
const qt = document.getElementById("quoteText"), dots = document.getElementById("dots");
quotes.forEach(() => dots.appendChild(document.createElement("i")));
let qi = 0;
function showQuote() {
  qt.classList.add("out");
  setTimeout(() => {
    qt.textContent = quotes[qi];
    [...dots.children].forEach((d, i) => d.classList.toggle("on", i === qi));
    qt.classList.remove("out");
    qi = (qi + 1) % quotes.length;
  }, 500);
}
showQuote(); setInterval(showQuote, 4500);

/* Contact form -> WhatsApp */
document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  const msg = `Hello, I am ${fn.value} (${fp.value}).\nService: ${fs.value}\nProblem: ${fm.value || "-"}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
});

document.getElementById("yr").textContent = new Date().getFullYear();