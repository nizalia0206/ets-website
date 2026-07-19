import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  ChevronLeft, ChevronRight, Menu, X, Phone, Mail, MapPin,
  Activity, Microscope, Layers, Radar, Snowflake, Thermometer,
  Box, Package, Truck, ShieldCheck, Droplet, TestTube, FlaskConical,
  Beaker, Wrench, Settings2, Gauge, Wind, Table2, DoorClosed,
  Radio, Timer, Dna, ArrowRight, CircleDot, Scan, Users, Handshake, Globe,
  Maximize2
} from "lucide-react";
import { PRODUCT_IMAGES } from "./product_images";
import { PARTNER_IMAGES, PARTNER_VIDEO, DIAPRO_ORIENTATION_VIDEO } from "./partner_images";

/* ---------------------------------------------------------------
   ETS — Exquisite Products Trading Services
   Design tokens
   ink        #061826  (near-black navy — page ground)
   navyDeep   #0B2C48  (panels)
   navy       #123F60  (mid panels / cards)
   teal       #1C7293  (structural accent)
   cyan       #4FC3D9  (primary accent / links)
   cyanBright #9FEFF7  (highlights, glow)
   paper      #EAF3F7  (light text on dark)
   ------------------------------------------------------------- */

const TOKENS = {
  ink: "#061826",
  navyDeep: "#0B2C48",
  navy: "#123F60",
  teal: "#1C7293",
  cyan: "#4FC3D9",
  cyanBright: "#9FEFF7",
  paper: "#EAF3F7",
};

/* ---------------- Background photography ---------------- */
const BG_IMAGES = {};

/* ---------------- Contact details (from ETS company profile) ---------------- */
const CONTACT = {
  address: "Al Aqrabiyah, Al Khobar | Dammam, P.O. 34446, Kingdom of Saudi Arabia",
  email: "info@etsksa.com",
  website: "www.etsksa.com",
  phones: [
    { label: "Telephone", value: "+966 (0)13 819 0064" },
    { label: "Telephone", value: "+966 (0)13 881 9992" },
    { label: "Mobile", value: "+966 59 559 9948" },
    { label: "Mobile", value: "+966 50 127 8615" },
    { label: "UAE", value: "+971 50 345 1489" },
  ],
};

/* ---------------- Data ---------------- */

const CATEGORIES = [
  {
    id: "diagnostics",
    eyebrow: "Dia-Pro · Türkiye",
    title: "Blood Bank Automation",
    blurb: "Gel-card blood grouping and cross-match automation, from sample loading to result imaging.",
    icon: Radar,
    items: [
      { name: "Octo-Hawk Analyser", spec: "100 gel-card areas · 3×24 sample slots · dual LISS/Bromeline", icon: Activity, img: "dp_octohawk" },
      { name: "Across System Card Reader", spec: "CCD imaging · barcode auto-interpretation · bidirectional link", icon: Scan, img: "dp_cardreader" },
      { name: "Across System Card Centrifuge", spec: "24-card capacity · balance & power-fail alarms", icon: CircleDot, img: "dp_centrifuge" },
      { name: "Across System Card Incubator", spec: "Two 12-card blocks · calibrated 37°C", icon: Thermometer, img: "dp_incubator" },
      { name: "Across Gel Forward & Reverse ABO", spec: "ABO / Rh(D) with DVI⁻ / Kell control card", icon: Layers, img: "dp_abocard" },
      { name: "Across Aqua Inhalation Water", spec: "Sterile, single-use · 250 ml & 500 ml", icon: Droplet, img: "aqua_bottles" },
    ],
  },
  {
    id: "coldchain",
    eyebrow: "B Medical Systems",
    title: "Blood Bank & Plasma Cold Chain",
    blurb: "Ultra-low freezers, plasma storage, blood bank refrigeration and cold-chain transport, WHO-PQS certified.",
    icon: Snowflake,
    items: [
      { name: "Ultra-Low Freezer U201", spec: "217 L · set point −82°C", icon: Snowflake, img: "u201" },
      { name: "Ultra-Low Freezer U501", spec: "602 L · set point −82°C", icon: Snowflake, img: "u501" },
      { name: "Laboratory Freezer F900", spec: "768 L · set point −41°C", icon: Box, img: "f900" },
      { name: "Laboratory Refrigerator ML670SG", spec: "615 L · set point +5°C", icon: Box, img: "ml670sg" },
      { name: "Pharmacy Refrigerator P380", spec: "768 L · set point −41°C", icon: Package, img: "p380" },
      { name: "Plasma Storage Freezer F291", spec: "281 L · set point −32°C", icon: Snowflake, img: "f291" },
      { name: "Blood Bank Refrigerator B901", spec: "773 L · set point +4°C", icon: Droplet, img: "b901" },
      { name: "Blood Bank Chest Refrigerator", spec: "Hot-zone rated · +4°C · 278 L gross", icon: Box, img: "blood_chest_refrigerator" },
      { name: "Plasma Contact Shock Freezer CSF61", spec: "Rapid freeze · set point −50°C", icon: Wind, img: "csf61" },
      { name: "Vaccine Transport Box RCW25", spec: "20 L vaccine capacity · WHO PQS", icon: Truck, img: "vaccine_rcw25" },
      { name: "Blood Transport Box MT8", spec: "8 × 450 ml bags · cold life 57 h", icon: Truck, img: "blood_transport_mt8" },
      { name: "Remote Temperature Logger", spec: "Live temp, lid-open & GPS over SIM", icon: Radio, img: "remote_logger" },
    ],
  },
  {
    id: "consumables",
    eyebrow: "Medical Consumables",
    title: "Disposables & Reagents",
    blurb: "Reliable single-use labware for sample collection, processing and dispatch.",
    icon: TestTube,
    items: [
      { name: "PS Container, Blood Cell Counter", spec: "Coulter type · 25 ml", icon: FlaskConical, img: "ps_container" },
      { name: "Sediplast with Na Citrate", spec: "Pre-labelled ESR kit", icon: TestTube, img: "sediplast" },
      { name: "Anticoag. KF + NA2 EDTA", spec: "For 2.5 ml whole blood", icon: Droplet, img: "anticoag" },
      { name: "Crystal Tip 0.5–10 µl", spec: "Eppendorf-compatible", icon: Beaker, img: "crystaltip" },
      { name: "Mini Pasteur Pipette", spec: "1.5 ml, sterile", icon: TestTube, img: "pasteur_pipette" },
      { name: "PS Blood Grouping Plates", spec: "Multi-well slide format", icon: Layers, img: "blood_grouping_plates" },
      { name: "Slide Mailer, PP", spec: "Protective dispatch case", icon: Package, img: "slide_mailer" },
      { name: "Polypropylene Mailing Box", spec: "Holds 4 slides", icon: Package, img: "mailing_box" },
    ],
  },
  {
    id: "monitoring",
    eyebrow: "MadgeTech · Cold-Chain IoT",
    title: "Temperature Monitoring",
    blurb: "Continuous, alarm-configurable logging for storage and transport, wired straight into your quality system.",
    icon: Gauge,
    items: [
      { name: "RFTEMP2000A", spec: "Digital display · continuous logging · 5–7 day lead time", icon: Thermometer, img: "rftemp2000a" },
      { name: "RFCO2RHTEMP2000A", spec: "CO₂, humidity & temperature · 5-week lead time", icon: Gauge, img: "rfco2rhtemp2000a" },
    ],
  },
  {
    id: "equipment",
    eyebrow: "Laboratory Equipment",
    title: "Processing & Separation",
    blurb: "Tube sealing, agitation, thawing and centrifugation for the blood bank workflow.",
    icon: Settings2,
    items: [
      { name: "SureSeal SE170 Tube Sealer", spec: "Single & multi-segment operation", icon: Wrench, img: "tube_sealer" },
      { name: "Pro Line Platelet Agitator", spec: "5 WBD / 7 apheresis bags · 0.27 kWh/day", icon: Activity, img: "platelet_agitator" },
      { name: "Plasma Thawing System", spec: "4-bag capacity · 18 L chamber", icon: Droplet, img: "plasma_thawing" },
      { name: "Roto Silenta 630 RS", spec: "6 × 2,000 ml · max RCF 6,520", icon: CircleDot, img: "roto_silenta" },
      { name: "Universal 320 / 320 R", spec: "4×200 ml or 6×94 ml · max RCF 24,900", icon: CircleDot, img: "universal_320" },
      { name: "EBA 200 / 200 S", spec: "8 × 15 ml · max RCF 3,461–6,153", icon: CircleDot, img: "eba200" },
    ],
  },
  {
    id: "furniture",
    eyebrow: "Laboratory Furniture",
    title: "Bench & Fume Containment",
    blurb: "ASHRAE 110, CE and ISO-certified workstations and fume hoods built for reconfigurable lab floors.",
    icon: Table2,
    items: [
      { name: "Lab Workstation Table", spec: "Leveler or castor base · modular", icon: Table2, img: "lab_workstation" },
      { name: "Bench Mounted Fume Hood", spec: "ASHRAE 110 · CE & ISO certified", icon: DoorClosed, img: "bench_fume_hood" },
      { name: "Fume Hood Lab Equipment", spec: "900–1,700 m³/h exhaust · 850 mm surface", icon: Wind, img: "fume_hood_lab_equipment" },
      { name: "PP Fume Hood", spec: "Anti-corrosive tap · memory on power-fail", icon: DoorClosed, img: "pp_fume_hood" },
      { name: "Floor Mounted Fume Hood", spec: "All-steel / PP / GRP structure", icon: DoorClosed, img: "floor_fume_hood" },
      { name: "Laboratory Fume Cupboard", spec: "Floor-mounted or walk-in", icon: Table2, img: "lab_fume_cupboard" },
    ],
  },
];

const WHY = [
  { title: "Trusted partner", body: "Highly experienced professionals across the region's healthcare sector.", icon: ShieldCheck },
  { title: "Certified excellence", body: "Every product approved by global regulatory bodies.", icon: Layers },
  { title: "Unwavering support", body: "Factory-certified engineers for installation, maintenance and training.", icon: Wrench },
  { title: "Rapid delivery", body: "Streamlined logistics keep critical supplies on schedule.", icon: Truck },
  { title: "Customer-centric", body: "Solutions tailored to each institution's own workflow.", icon: Activity },
];

/* ---------------- Lightbox (click-to-fullscreen for images & video) ---------------- */
const LightboxContext = React.createContext(() => {});

function useLightbox() {
  return React.useContext(LightboxContext);
}

function LightboxProvider({ children }) {
  const [media, setMedia] = useState(null); // { type: 'image'|'video', src, alt, poster }

  const open = useCallback((m) => setMedia(m), []);
  const close = useCallback(() => setMedia(null), []);

  useEffect(() => {
    if (!media) return;
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [media, close]);

  return (
    <LightboxContext.Provider value={open}>
      {children}
      {media && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
          style={{ background: "rgba(2,10,17,0.92)", backdropFilter: "blur(4px)" }}
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
            aria-label="Close fullscreen view"
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            style={{ background: "rgba(6,24,38,0.8)", border: "1px solid rgba(159,239,247,0.35)", color: TOKENS.cyanBright }}
          >
            <X size={20} />
          </button>
          {media.type === "video" ? (
            <video
              src={media.src}
              poster={media.poster}
              controls
              autoPlay
              playsInline
              className="max-w-full max-h-full rounded-xl"
              style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.8)" }}
              onClick={(e) => e.stopPropagation()}
            >
              Sorry, your browser does not support embedded video.
            </video>
          ) : (
            <img
              src={media.src}
              alt={media.alt || ""}
              className="max-w-full max-h-full object-contain rounded-xl"
              style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.8)" }}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </LightboxContext.Provider>
  );
}

/* ---------------- Reduced motion hook ---------------- */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", fn);
    return () => mq.removeEventListener?.("change", fn);
  }, []);
  return reduced;
}

/* ---------------- Reveal on scroll ---------------- */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------- Network canvas (hero signature motif) ----------------
   Reused as a lightweight ambient layer behind product image rows (see
   SectionAmbient below) — same drifting-node / connecting-thread motif
   that anchors the hero, just dialed down in density and opacity so it
   sits quietly behind the cards instead of competing with them. */
function NetworkCanvas({ density = 1, speed = 1 }) {
  const canvasRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let w, h, nodes;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    function init() {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const count = Math.max(12, Math.min(46, Math.floor(((w * h) / 26000) * density)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4 * speed,
        vy: (Math.random() - 0.5) * 0.4 * speed,
        r: Math.random() * 1.6 + 0.8,
      }));
    }

    function step() {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 150;
          if (dist < maxDist) {
            ctx.strokeStyle = `rgba(79, 195, 217, ${0.16 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(159, 239, 247, 0.75)";
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduced) raf = requestAnimationFrame(step);
    }

    init();
    step();
    const onResize = () => init();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [reduced, density, speed]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}

/* ---------------- Cell / molecule field (healthcare motif) ----------------
   Soft, glowing circles that drift like blood cells or molecules — a
   biological counterpart to the node network above. Layered together they
   read as "lab data + living tissue," which fits a blood-bank/diagnostics
   supplier better than wireframe dots on their own. */
function CellField({ density = 1, speed = 1, opacity = 1 }) {
  const canvasRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let w, h, cells;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    function init() {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const count = Math.max(6, Math.min(20, Math.floor(((w * h) / 46000) * density)));
      cells = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.65 * speed,
        vy: (Math.random() - 0.5) * 0.65 * speed,
        r: Math.random() * 15 + 9,
        wobble: Math.random() * Math.PI * 2,
      }));
    }

    function step() {
      ctx.clearRect(0, 0, w, h);
      for (const c of cells) {
        if (!reduced) {
          c.x += c.vx;
          c.y += c.vy;
          c.wobble += 0.006 * speed;
          if (c.x < -40 || c.x > w + 40) c.vx *= -1;
          if (c.y < -40 || c.y > h + 40) c.vy *= -1;
        }
        const pulse = 1 + Math.sin(c.wobble) * 0.08;
        const rr = c.r * pulse;

        const grad = ctx.createRadialGradient(c.x, c.y, rr * 0.1, c.x, c.y, rr);
        grad.addColorStop(0, "rgba(150, 0, 0, 0.6)");
        grad.addColorStop(0.65, "rgba(120, 0, 0, 0.35)");
        grad.addColorStop(1, "rgba(120, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(c.x, c.y, rr, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(220, 20, 20, 0.7)";
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(c.x, c.y, rr, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "rgba(200, 15, 15, 0.5)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(c.x, c.y, rr * 0.55, 0, Math.PI * 2);
        ctx.stroke();
      }
      if (!reduced) raf = requestAnimationFrame(step);
    }

    init();
    step();
    const onResize = () => init();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [reduced, density, speed]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity }} aria-hidden="true" />;
}/* ---------------- Ambient background for product image sections ----------------
   Sits behind each category's product carousel: a quiet, low-opacity
   drifting network layer so the row of product photography never feels
   static. Purely decorative — pointer-events are disabled and it never
   competes with the cards sitting in front of it (z-10). */
function SectionAmbient({ opacity = 0.55 }) {
  return (
    <div
      className="absolute -inset-x-4 -inset-y-6 pointer-events-none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <NetworkCanvas density={1.1} speed={1.3} />
      <CellField density={1} speed={1} />
    </div>
  );
}

/* ---------------- Drifting photographic art (ambient moving background) ---------------- */
function DriftingArt({ src, className = "", style = {}, driftClass = "drift-a", opacity = 0.5 }) {
  if (!src) return null;
  return (
    <div
      className={`absolute pointer-events-none ${driftClass} ${className}`}
      style={{ opacity, ...style }}
      aria-hidden="true"
    >
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover"
        style={{ filter: "saturate(1.05) brightness(0.95)" }}
      />
    </div>
  );
}

/* ---------------- Connector rail (threads between carousel cards) ---------------- */
function ConnectorRail() {
  return (
    <svg
      className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-6 pointer-events-none"
      viewBox="0 0 100 4" preserveAspectRatio="none" aria-hidden="true"
    >
      <line x1="0" y1="2" x2="100" y2="2" stroke="url(#railGrad)" strokeWidth="0.5" strokeDasharray="1.2 2.4">
        <animate attributeName="stroke-dashoffset" from="0" to="-7.2" dur="3.5s" repeatCount="indefinite" />
      </line>
      <defs>
        <linearGradient id="railGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4FC3D9" stopOpacity="0" />
          <stop offset="50%" stopColor="#4FC3D9" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#4FC3D9" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ---------------- Product card ---------------- */
function ProductCard({ item, index }) {
  const Icon = item.icon;
  const photo = item.img ? PRODUCT_IMAGES[item.img] : null;
  const openLightbox = useLightbox();
  return (
    <div
      className="group relative shrink-0 w-[240px] sm:w-[260px] rounded-2xl overflow-hidden flex flex-col snap-start"
      style={{
        background: "linear-gradient(160deg, rgba(18,63,96,0.9), rgba(11,44,72,0.9))",
        border: "1px solid rgba(79,195,217,0.18)",
        boxShadow: "0 10px 30px -14px rgba(0,0,0,0.6)",
      }}
    >
      <div
        className="relative w-full h-[150px] overflow-hidden shrink-0"
        style={{ background: "linear-gradient(160deg, rgba(234,243,247,0.97), rgba(210,229,236,0.9))" }}
      >
        {photo ? (
          <img
            src={photo}
            alt={item.name}
            loading="lazy"
            onClick={() => openLightbox({ type: "image", src: photo, alt: item.name })}
            className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.08] cursor-zoom-in"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon size={34} color={TOKENS.teal} strokeWidth={1.4} />
          </div>
        )}
        <div
          className="absolute top-2 right-2 w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(6,24,38,0.72)", border: "1px solid rgba(159,239,247,0.35)" }}
        >
          <Icon size={15} color={TOKENS.cyanBright} strokeWidth={1.8} />
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-1.5">
        <div className="text-[10px] tracking-[0.14em] uppercase mb-0.5" style={{ color: TOKENS.cyan, fontFamily: "'JetBrains Mono', monospace" }}>
          {String(index + 1).padStart(2, "0")}
        </div>
        <h4 className="text-[15px] leading-snug font-semibold" style={{ color: TOKENS.paper, fontFamily: "'Fraunces', serif" }}>
          {item.name}
        </h4>
        <p className="text-[12.5px] leading-relaxed mt-1 opacity-70" style={{ color: TOKENS.paper }}>
          {item.spec}
        </p>
      </div>
    </div>
  );
}
/* ---------------- Category carousel with arrows ---------------- */
function CategorySection({ cat, index }) {
  const scrollerRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const Icon = cat.icon;

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => { el.removeEventListener("scroll", updateEdges); window.removeEventListener("resize", updateEdges); };
  }, [updateEdges]);

  const scrollBy = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const step = card ? card.getBoundingClientRect().width + 16 : 260;
    el.scrollBy({ left: dir * step * 2, behavior: "smooth" });
  };

  return (
    <section id={cat.id} className="relative py-16 md:py-20 border-t overflow-hidden" style={{ borderColor: "rgba(79,195,217,0.1)" }}>
      {/* Ambient floating network — now sits behind the whole section, title and blurb included */}
      <SectionAmbient />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div className="flex gap-4 items-start">
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 mt-1"
                style={{ background: "rgba(79,195,217,0.12)", border: "1px solid rgba(79,195,217,0.3)" }}
              >
                <Icon size={20} color={TOKENS.cyan} strokeWidth={1.7} />
              </div>
              <div>
                <div className="text-[11px] tracking-[0.18em] uppercase mb-1.5" style={{ color: TOKENS.cyan, fontFamily: "'JetBrains Mono', monospace" }}>
                  {cat.eyebrow}
                </div>
                <h3 className="text-2xl md:text-[28px] leading-tight" style={{ color: TOKENS.paper, fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                  {cat.title}
                </h3>
                <p className="text-sm mt-2 max-w-xl opacity-70" style={{ color: TOKENS.paper }}>{cat.blurb}</p>
              </div>
            </div>

            <div className="flex gap-2 md:mb-1">
              <button
                onClick={() => scrollBy(-1)}
                disabled={atStart}
                aria-label={`Scroll ${cat.title} left`}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-25 disabled:cursor-not-allowed hover:scale-105 focus:outline-none focus-visible:ring-2"
                style={{ border: "1px solid rgba(79,195,217,0.35)", color: TOKENS.cyanBright, background: "rgba(255,255,255,0.02)", "--tw-ring-color": TOKENS.cyan }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollBy(1)}
                disabled={atEnd}
                aria-label={`Scroll ${cat.title} right`}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-25 disabled:cursor-not-allowed hover:scale-105 focus:outline-none focus-visible:ring-2"
                style={{ border: "1px solid rgba(79,195,217,0.35)", color: TOKENS.cyanBright, background: "rgba(255,255,255,0.02)", "--tw-ring-color": TOKENS.cyan }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative">
            <ConnectorRail />
            <div
              ref={scrollerRef}
              className="relative z-10 flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: "none" }}
            >
              {cat.items.map((item, i) => (
                <div data-card key={item.name}>
                  <ProductCard item={item} index={i} />
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute top-0 bottom-3 right-0 w-16 z-10" style={{ background: `linear-gradient(to left, ${TOKENS.ink}, transparent)` }} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Partners ---------------- */
function PartnerPhoto({ src, alt }) {
  const openLightbox = useLightbox();
  return (
    <div
      className="relative rounded-2xl overflow-hidden aspect-[4/3]"
      style={{ border: "1px solid rgba(79,195,217,0.18)", boxShadow: "0 10px 30px -14px rgba(0,0,0,0.6)" }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover cursor-zoom-in"
          loading="lazy"
          onClick={() => openLightbox({ type: "image", src, alt })}
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "linear-gradient(160deg, rgba(18,63,96,0.7), rgba(11,44,72,0.7))" }}
        >
          <Handshake size={28} color={TOKENS.teal} strokeWidth={1.4} />
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 px-3 py-2.5" style={{ background: "linear-gradient(to top, rgba(6,24,38,0.97) 40%, rgba(6,24,38,0.75) 75%, transparent)" }}>
        <p
          className="text-[12.5px] font-medium tracking-wide leading-snug"
          style={{ color: TOKENS.paper, textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}
        >
          {alt}
        </p>
      </div>
    </div>
  );
}

/* Same footprint as PartnerPhoto so the demo video sits in the same row,
   at the same size, instead of stacking as a separate full-width block. */
function PartnerVideo({ src, poster, label }) {
  const openLightbox = useLightbox();
  return (
    <div
      className="relative rounded-2xl overflow-hidden aspect-[4/3]"
      style={{ border: "1px solid rgba(79,195,217,0.18)", boxShadow: "0 10px 30px -14px rgba(0,0,0,0.6)" }}
    >
      <video
        src={src}
        controls
        playsInline
        poster={poster}
        className="absolute inset-0 w-full h-full object-cover bg-black"
      >
        Sorry, your browser does not support embedded video.
      </video>
      <button
        onClick={() => openLightbox({ type: "video", src, poster })}
        aria-label="View video fullscreen"
        className="absolute bottom-2 right-2 w-8 h-8 rounded-lg flex items-center justify-center hover:scale-105 transition-transform"
        style={{ background: "rgba(6,24,38,0.75)", border: "1px solid rgba(159,239,247,0.35)" }}
      >
        <Maximize2 size={14} color={TOKENS.cyanBright} strokeWidth={2} />
      </button>
      <div className="absolute inset-x-0 top-0 px-3 py-2.5 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(6,24,38,0.97) 40%, rgba(6,24,38,0.75) 75%, transparent)" }}>
        <p
          className="text-[12.5px] font-medium tracking-wide leading-snug"
          style={{ color: TOKENS.paper, textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

function PartnersSection() {
  const hasVideo = Boolean(PARTNER_VIDEO);
  const hasOrientationVideo = Boolean(DIAPRO_ORIENTATION_VIDEO);
  const videoCount = (hasVideo ? 1 : 0) + (hasOrientationVideo ? 1 : 0);
  const colsClass = videoCount === 2 ? "md:grid-cols-5" : videoCount === 1 ? "md:grid-cols-4" : "md:grid-cols-3";
  return (
    <section id="partners" className="py-16 md:py-20 border-t" style={{ borderColor: "rgba(79,195,217,0.1)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="text-[11px] tracking-[0.18em] uppercase mb-2" style={{ color: TOKENS.cyan, fontFamily: "'JetBrains Mono', monospace" }}>
            On the Ground With Our Partners
          </div>
          <h2 className="text-2xl md:text-3xl mb-10 max-w-2xl" style={{ color: TOKENS.paper, fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
            Direct relationships with the manufacturers behind every product.
          </h2>
        </Reveal>

        <div className={`grid grid-cols-2 ${colsClass} gap-5`}>
          <Reveal delay={0}>
            <PartnerPhoto src={PARTNER_IMAGES.bmedBooth} alt="Visiting B Medical booth in Luxembourg" />
          </Reveal>
          <Reveal delay={80}>
            <PartnerPhoto src={PARTNER_IMAGES.bmedTeam} alt="LP Italiana booth visit — Arab Health 2026, UAE" />
          </Reveal>
          <Reveal delay={160}>
            <PartnerPhoto src={PARTNER_IMAGES.lpItaliana} alt="B Medical booth visit — Arab Health 2026, UAE" />
          </Reveal>
          {hasVideo && (
            <Reveal delay={240}>
              <PartnerVideo
                src={PARTNER_VIDEO}
                poster={PRODUCT_IMAGES.dp_octohawk}
                label="Visit at DiaPro — Türkiye for Octohawk inspection"
              />
            </Reveal>
          )}
          {hasOrientationVideo && (
            <Reveal delay={320}>
              <PartnerVideo
                src={DIAPRO_ORIENTATION_VIDEO}
                poster={PRODUCT_IMAGES.dp_octohawk}
                label="Orientation on Dia-Pro products by our engineer"
              />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact / footer section ---------------- */
function ContactSection() {
  const openLightbox = useLightbox();
  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden border-t" style={{ borderColor: "rgba(79,195,217,0.1)" }}>
      <div className="absolute inset-0" aria-hidden="true">
        {PRODUCT_IMAGES.footer_photo && (
          <img
            src={PRODUCT_IMAGES.footer_photo}
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(6,24,38,0.55) 0%, ${TOKENS.ink} 78%)` }} />
        <div className="absolute inset-0 opacity-50">
          <NetworkCanvas density={0.6} speed={0.9} />
          <CellField density={0.8} speed={0.75} />
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          {PRODUCT_IMAGES.ets_logo ? (
            <div className="mx-auto w-44 md:w-56 h-28 md:h-32 mb-8 flex items-center justify-center overflow-visible">
              <img
                src={PRODUCT_IMAGES.ets_logo}
                alt="ETS — Exquisite Products Trading Services"
                className="max-w-full max-h-full w-auto h-auto object-contain opacity-95 cursor-zoom-in"
                onClick={() => openLightbox({ type: "image", src: PRODUCT_IMAGES.ets_logo, alt: "ETS — Exquisite Products Trading Services" })}
              />
            </div>
          ) : (
            <div className="text-[11px] tracking-[0.2em] uppercase mb-6" style={{ color: TOKENS.cyan, fontFamily: "'JetBrains Mono', monospace" }}>
              Exquisite Products Trading Services
            </div>
          )}

          <h3
            className="text-2xl md:text-[32px] leading-tight mb-3"
            style={{ color: TOKENS.paper, fontFamily: "'Fraunces', serif", fontWeight: 600 }}
          >
            Let's talk supply
          </h3>
          <p className="text-sm md:text-base opacity-70 max-w-xl mx-auto mb-12" style={{ color: TOKENS.paper }}>
            We don't just supply products — we deliver solutions that empower healthcare and scientific advancement.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 text-left max-w-2xl mx-auto">
            <div className="flex items-start gap-3 sm:col-span-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(79,195,217,0.12)", border: "1px solid rgba(79,195,217,0.3)" }}>
                <MapPin size={16} color={TOKENS.cyan} strokeWidth={1.8} />
              </div>
              <p className="text-sm mt-1.5 opacity-80" style={{ color: TOKENS.paper }}>{CONTACT.address}</p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(79,195,217,0.12)", border: "1px solid rgba(79,195,217,0.3)" }}>
                <Mail size={16} color={TOKENS.cyan} strokeWidth={1.8} />
              </div>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-sm mt-1.5 opacity-80 hover:opacity-100 transition-opacity"
                style={{ color: TOKENS.paper }}
              >
                {CONTACT.email}
              </a>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(79,195,217,0.12)", border: "1px solid rgba(79,195,217,0.3)" }}>
                <Globe size={16} color={TOKENS.cyan} strokeWidth={1.8} />
              </div>
              <a
                href={`https://${CONTACT.website}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm mt-1.5 opacity-80 hover:opacity-100 transition-opacity"
                style={{ color: TOKENS.paper }}
              >
                {CONTACT.website}
              </a>
            </div>

            <div className="flex items-start gap-3 sm:col-span-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(79,195,217,0.12)", border: "1px solid rgba(79,195,217,0.3)" }}>
                <Phone size={16} color={TOKENS.cyan} strokeWidth={1.8} />
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-1.5">
                {CONTACT.phones.map((p) => (
                  <a
                    key={p.value}
                    href={`tel:${p.value.replace(/[^+\d]/g, "")}`}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                    style={{ color: TOKENS.paper }}
                  >
                    <span className="opacity-60 mr-1">{p.label}:</span>{p.value}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Header / nav ---------------- */
const NAV_LABELS = {
  diagnostics: "Diagnostics",
  coldchain: "Cold Chain",
  consumables: "Disposables",
  monitoring: "Monitoring",
  equipment: "Equipment",
  furniture: "Furniture",
};

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50" style={{ background: "rgba(6,24,38,0.86)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(79,195,217,0.14)" }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <a href="#top" className="shrink-0 text-6xl tracking-wide font-semibold" style={{ color: TOKENS.paper, fontFamily: "'Fraunces', serif" }}>
          ETS
        </a>
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-[13px] lg:text-sm flex-nowrap">
          {CATEGORIES.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="whitespace-nowrap opacity-70 hover:opacity-100 transition-opacity" style={{ color: TOKENS.paper }}>
              {NAV_LABELS[c.id] || c.title}
            </a>
          ))}
          <a href="#partners" className="whitespace-nowrap opacity-70 hover:opacity-100 transition-opacity" style={{ color: TOKENS.paper }}>Partners</a>
          <a href="#contact" className="whitespace-nowrap opacity-70 hover:opacity-100 transition-opacity" style={{ color: TOKENS.paper }}>Contact</a>
        </nav>
        <button
          className="md:hidden shrink-0 w-10 h-10 flex items-center justify-center rounded-lg"
          style={{ color: TOKENS.cyanBright, border: "1px solid rgba(79,195,217,0.3)" }}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-5 flex flex-col gap-4 text-sm" style={{ borderTop: "1px solid rgba(79,195,217,0.12)" }}>
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="pt-4 text-base tracking-wide font-semibold"
            style={{ color: TOKENS.paper, fontFamily: "'Fraunces', serif" }}
          >
            ETS
          </a>
          {CATEGORIES.map((c) => (
            <a key={c.id} href={`#${c.id}`} onClick={() => setOpen(false)} className="pt-4 opacity-80" style={{ color: TOKENS.paper }}>
              {c.title}
            </a>
          ))}
          <a href="#partners" onClick={() => setOpen(false)} className="opacity-80" style={{ color: TOKENS.paper }}>Partners</a>
          <a href="#contact" onClick={() => setOpen(false)} className="opacity-80" style={{ color: TOKENS.paper }}>Contact</a>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden min-h-[86vh] flex items-center" style={{ background: `radial-gradient(120% 100% at 50% 0%, ${TOKENS.navyDeep}, ${TOKENS.ink})` }}>
      <div className="absolute inset-0 opacity-70">
        <NetworkCanvas speed={1.3} />
        <CellField speed={2} />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
        <Reveal>
          <div className="text-[11px] tracking-[0.2em] uppercase mb-5" style={{ color: TOKENS.cyan, fontFamily: "'JetBrains Mono', monospace" }}>
            Exquisite Products Trading Services
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] max-w-3xl" style={{ color: TOKENS.paper, fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
            Certified Laboratory & Blood-Bank Infrastructure, Delivered Across The Region.
          </h1>
          <p className="mt-6 text-base md:text-lg max-w-2xl opacity-75" style={{ color: TOKENS.paper }}>
            Blood bank automation, cold-chain storage, disposables and lab furniture — sourced and distributed from
            world-class manufacturers and backed by factory-certified engineers on the ground.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#diagnostics"
              className="px-6 py-3 rounded-full text-sm font-medium transition-transform hover:scale-[1.03]"
              style={{ background: TOKENS.cyan, color: TOKENS.ink }}
            >
              Explore the product range
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full text-sm font-medium border transition-colors hover:bg-white/5"
              style={{ borderColor: "rgba(79,195,217,0.4)", color: TOKENS.cyanBright }}
            >
              Get in touch
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Why choose ETS ---------------- */
function WhySection() {
  return (
    <section className="py-16 md:py-20 border-t" style={{ borderColor: "rgba(79,195,217,0.1)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="text-[11px] tracking-[0.18em] uppercase mb-2" style={{ color: TOKENS.cyan, fontFamily: "'JetBrains Mono', monospace" }}>
            Why Choose ETS
          </div>
          <h2 className="text-2xl md:text-3xl mb-10 max-w-2xl" style={{ color: TOKENS.paper, fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
            We don't just supply products — we deliver solutions.
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-5">
          {WHY.map((w, i) => {
            const Icon = w.icon;
            return (
              <Reveal key={w.title} delay={i * 60}>
                <div
                  className="h-full rounded-2xl p-5"
                  style={{ background: "linear-gradient(160deg, rgba(18,63,96,0.55), rgba(11,44,72,0.55))", border: "1px solid rgba(79,195,217,0.14)" }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "rgba(79,195,217,0.12)", border: "1px solid rgba(79,195,217,0.3)" }}>
                    <Icon size={18} color={TOKENS.cyan} strokeWidth={1.7} />
                  </div>
                  <h4 className="text-[15px] font-semibold mb-1.5" style={{ color: TOKENS.paper, fontFamily: "'Fraunces', serif" }}>{w.title}</h4>
                  <p className="text-[13px] opacity-70 leading-relaxed" style={{ color: TOKENS.paper }}>{w.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="py-8 border-t" style={{ borderColor: "rgba(79,195,217,0.1)", background: TOKENS.ink }}>
      <div className="max-w-6xl mx-auto px-6 text-center text-xs opacity-50" style={{ color: TOKENS.paper }}>
        © {new Date().getFullYear()} ETS — Exquisite Products Trading Services. All rights reserved.
      </div>
    </footer>
  );
}

/* ---------------- App (default export — the actual page) ---------------- */
export default function App() {
  return (
    <LightboxProvider>
      <div style={{ background: TOKENS.ink }} className="min-h-screen">
        <Header />
        <Hero />
        <WhySection />
        {CATEGORIES.map((cat, i) => (
          <CategorySection key={cat.id} cat={cat} index={i} />
        ))}
        <PartnersSection />
        <ContactSection />
        <Footer />
      </div>
    </LightboxProvider>
  );
}

export { CATEGORIES, WHY, CONTACT, TOKENS, BG_IMAGES, Reveal, NetworkCanvas, CellField, SectionAmbient, DriftingArt, ConnectorRail, ProductCard, CategorySection, PartnersSection, ContactSection, Header, Hero, WhySection, Footer, LightboxProvider, useLightbox };