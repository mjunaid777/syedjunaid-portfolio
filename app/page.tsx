// @ts-nocheck
"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Mail, MapPin, Download, ExternalLink, ArrowRight,
  Database, Braces, BarChart3, Workflow, Menu, X, ChevronRight, Award, 
  CheckCircle2, Send, Terminal, Layers, Sparkles, Calendar, Briefcase
} from "lucide-react";
// --- CUSTOM BRAND ICONS ---
const Github = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
// --------------------------
/* ------------------------------------------------------------------ */
/*  Fonts                                                              */
/* ------------------------------------------------------------------ */
function useFonts() {
  useEffect(() => {
    const id = "sj-portfolio-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

/* ------------------------------------------------------------------ */
/*  Scroll reveal hook                                                 */
/* ------------------------------------------------------------------ */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
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
        transition: `opacity 0.7s cubic-bezier(.21,.8,.36,1) ${delay}s, transform 0.7s cubic-bezier(.21,.8,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Typing effect                                                      */
/* ------------------------------------------------------------------ */
function useTyping(words, typeSpeed = 55, deleteSpeed = 30, hold = 1500) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[i % words.length];
    let timeout;
    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), hold);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setI((v) => v + 1);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, i, words, typeSpeed, deleteSpeed, hold]);

  return text;
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */
const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const SKILLS = [
  { group: "Languages", icon: Braces, items: ["Python", "SQL"] },
  { group: "Databases", icon: Database, items: ["PostgreSQL", "SQLite"] },
  { group: "Analytics", icon: BarChart3, items: ["Excel", "Power BI"] },
  { group: "Libraries", icon: Layers, items: ["Pandas", "NumPy", "Matplotlib", "openpyxl"] },
  { group: "Engineering", icon: Workflow, items: ["ETL Pipelines", "Star Schema", "Data Warehousing"] },
  { group: "Currently learning", icon: Sparkles, items: ["Machine Learning", "Data Engineering"] },
];

const PROJECTS = [
  {
    id: "aml",
    title: "Enterprise AML & Financial Fraud Data Platform",
    tag: "-- flagship",
    description: "Engineered an end-to-end scalable data pipeline processing 5,000,000+ financial transactions, utilizing Python to extract data and SQL to build a risk-scoring Data Mart.",
    stack: ["Python", "PostgreSQL", "Pandas", "Power BI"],
    points: [
      "Processed 5M+ international transactions.",
      "Architected PostgreSQL star-schema warehouse.",
      "Utilized SQL window functions for high-tier anomaly scoring.",
      "Built interactive Power BI dashboard reducing investigation noise."
    ],
    github: "https://github.com/mjunaid777/enterprise-aml-data-platform",
    image: "/dashboard preview.png"
  
  },
  {
    id: "ai-support",
    title: "AI Customer Support Analytics Pipeline",
    tag: "-- nlp",
    description: "Automated pipeline processing 8,400+ unstructured support tickets using the Llama 3.1 API for sentiment extraction and categorizing root hardware causes.",
    stack: ["Python", "PostgreSQL", "Llama API", "Power BI"],
    points: [
      "Analyzed 8,400+ raw support tickets.",
      "Integrated AI prompt engineering for sentiment extraction.",
      "Maintained data integrity using SQL CTEs for aggregation.",
      "Powered live Power BI dashboards for operational pivots."
    ],
    github: "https://github.com/mjunaid777/ai-support_ticket_pipeline",
    image: "/dashboard_preview.png"
  },
  {
    id: "churn",
    title: "Telco Customer Churn Predictive Analytics",
    tag: "-- ml",
    description: "Predictive analytics pipeline training a Random Forest machine learning model to identify at-risk customers, projecting ₹3.98L in actionable net profit.",
    stack: ["Python", "Scikit-Learn", "PostgreSQL", "Power BI", "Excel"],
    points: [
      "Extracted structured demographic data via PostgreSQL.",
      "Trained Random Forest classifier achieving 74% prediction accuracy.",
      "Built an Excel financial model visualizing key churn drivers.",
      "Mapped out actionable net profit for executive stakeholders."
    ],
    github: "https://github.com/mjunaid777/Telco-Customer-Churn-Analysis",
    image: "/Screenshot_Dashboard.png"
  },
  {
    id: "automation",
    title: "Automated Python Reporting Pipeline",
    tag: "-- automation",
    description: "Fully automated daily reporting engine utilizing SQLite3 and Pandas to dynamically extract daily sales data and dispatch via scheduled SMTP.",
    stack: ["Python", "SQLite3", "Pandas", "SMTP"],
    points: [
      "Eliminated manual daily report preparation workflows.",
      "Generated dynamic, error-free Excel summaries.",
      "Automated distribution using SMTP email protocols.",
      "Ensured zero-latency reporting for daily review."
    ],
    github: "https://github.com/mjunaid777",
    image: "automated report by python.png"
  },
];

const CERTIFICATIONS = [
  { title: "Business Analysis Basics", issuer: "Simplilearn", date: "July 2026", code: "10463448" },
  { title: "Power BI for Beginners", issuer: "Simplilearn", date: "September 2025", code: "8961596" },
  { title: "Python for Data Analysis", issuer: "Simplilearn", date: "September 2025", code: "8956616" },
];

/* ------------------------------------------------------------------ */
/*  Small UI atoms                                                     */
/* ------------------------------------------------------------------ */
function Badge({ children }) {
  return (
    <span className="px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wide bg-purple-500/10 border border-purple-500/20 text-purple-200 font-mono">
      {children}
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-2 mb-4 font-mono text-sm text-purple-400/80">
      <span className="text-fuchsia-400">{"//"}</span> {children}
    </div>
  );
}

function GlowCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      className={`relative rounded-2xl border border-white/10 bg-[#120a1c]/80 backdrop-blur-xl overflow-hidden group ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(168,85,247,0.15), transparent 60%)",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Nav                                                                 */
/* ------------------------------------------------------------------ */
function Nav({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 border transition-all duration-300 ${
            scrolled ? "border-purple-500/20 bg-[#0b0510]/80 backdrop-blur-xl shadow-lg shadow-purple-900/20" : "border-transparent bg-transparent"
          }`}
        >
          <button onClick={() => go("hero")} className="font-mono text-sm text-white flex items-center gap-2">
            <span className="text-purple-400">sj</span>
            <span className="text-zinc-500">.</span>
            <span className="text-fuchsia-400">query()</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  active === l.id ? "text-white bg-purple-500/20" : "text-zinc-400 hover:text-white"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <button onClick={() => go("contact")} className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white hover:opacity-90 transition-opacity shadow-md shadow-purple-500/20">
            Hire me
          </button>

          <button className="md:hidden text-white" onClick={() => setOpen((v) => !v)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                                */
/* ------------------------------------------------------------------ */
function Hero() {
  const typed = useTyping(["Data Analyst", "BI Developer", "Data Engineer (learning)"]);
  const spotRef = useRef(null);

  return (
    <section id="hero" ref={spotRef} className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 sj-grid" />
      <div className="sj-blob sj-blob-1" />
      <div className="sj-blob sj-blob-2" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-mono text-purple-200 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
            Available for opportunities
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="text-zinc-400 font-mono text-sm mb-3">Hi, I'm</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight leading-[1.05] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-zinc-400">
              Syed Junaid
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="text-2xl sm:text-4xl font-medium text-zinc-300 mb-8 h-[1.4em]">
            I turn raw data into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 font-mono">
              {typed}
              <span className="sj-caret">|</span>
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed mb-10">
            BCA graduate from Bangalore University building end-to-end data
            pipelines — from messy source tables to warehouse schemas to
            dashboards people actually make decisions with.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="flex flex-wrap gap-4 mb-16">
            <a
              href="/Syed_Junaid_Resume_ATS_Optimized.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-500 transition-colors shadow-lg shadow-purple-600/30"
            >
              <Download size={17} /> Download Resume
            </a>
            <a
              href="https://github.com/mjunaid777"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 transition-colors font-medium text-purple-100"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/syed-junaid-8657113b1/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 hover:bg-white/[0.05] transition-colors font-medium text-zinc-300"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  About                                                               */
/* ------------------------------------------------------------------ */
function About() {
  return (
    <section id="about" className="py-28 relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionLabel>about.md</SectionLabel>
        </Reveal>
        <div className="grid md:grid-cols-5 gap-12">
          <Reveal className="md:col-span-3" delay={0.05}>
            <h3 className="text-3xl sm:text-4xl font-semibold mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Making sense of data,{" "}
              <span className="text-zinc-500">one pipeline at a time.</span>
            </h3>
            <p className="text-zinc-400 leading-relaxed mb-4">
              I'm an aspiring Data Analyst and Data Engineer with a Bachelor
              of Computer Applications from Bangalore University. I like
              taking messy, real-world data — millions of transactions,
              support tickets, customer records — and building the pipelines,
              warehouses and dashboards that turn it into something a
              business can act on.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-4">
              My focus right now is Python and SQL for analysis, PostgreSQL
              for warehousing, and Power BI for storytelling with data. I'm
              currently deepening my skills in machine learning and data
              engineering so I can own more of the pipeline, from ingestion
              to insight.
            </p>
          </Reveal>

          <Reveal className="md:col-span-2" delay={0.15}>
            <GlowCard className="p-6 h-full">
              <div className="flex items-center gap-2 mb-5 text-zinc-500 text-xs font-mono">
                <Terminal size={14} /> about.json
              </div>
              <dl className="space-y-4 font-mono text-sm">
                <div>
                  <dt className="text-zinc-500 text-xs mb-1">role</dt>
                  <dd className="text-white">Aspiring Data Analyst / BI Dev</dd>
                </div>
                <div>
                  <dt className="text-zinc-500 text-xs mb-1">education</dt>
                  <dd className="text-white">BCA, Bangalore University</dd>
                </div>
                <div>
                  <dt className="text-zinc-500 text-xs mb-1">focus</dt>
                  <dd className="text-white">Python · SQL · Power BI</dd>
                </div>
                <div>
                  <dt className="text-zinc-500 text-xs mb-1">location</dt>
                  <dd className="text-white flex items-center gap-1.5">
                    <MapPin size={13} className="text-purple-400" /> Bengaluru, India
                  </dd>
                </div>
              </dl>
            </GlowCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Skills                                                              */
/* ------------------------------------------------------------------ */
function Skills() {
  return (
    <section id="skills" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionLabel>skills.select_all()</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h3 className="text-3xl sm:text-4xl font-semibold mb-14" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            The stack behind the pipelines
          </h3>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((s, idx) => (
            <Reveal key={s.group} delay={idx * 0.06}>
              <GlowCard className="p-6 h-full hover:-translate-y-1 transition-transform duration-300">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border border-purple-500/30 flex items-center justify-center mb-4">
                  <s.icon size={18} className="text-purple-300" />
                </div>
                <h4 className="font-medium text-white mb-3">{s.group}</h4>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <Badge key={it}>{it}</Badge>
                  ))}
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Experience                                                          */
/* ------------------------------------------------------------------ */
function Experience() {
  return (
    <section id="experience" className="py-28 relative">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <SectionLabel>experience.load()</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h3 className="text-3xl sm:text-4xl font-semibold mb-12" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Corporate Experience
          </h3>
        </Reveal>

        <Reveal delay={0.1}>
          <GlowCard className="p-8 border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.05)]">
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Briefcase size={22} className="text-purple-400" />
                </div>
                <div>
                  <h4 className="text-xl font-medium text-white">Data Analytics Virtual Intern</h4>
                  <p className="text-purple-400 text-sm font-mono mt-1">Tata Group (via Forage)</p>
                </div>
              </div>
              <div className="text-zinc-500 text-sm mt-4 md:mt-0 font-mono flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <Calendar size={14} /> Feb 2026 – Apr 2026
              </div>
            </div>
            
            <ul className="space-y-4 mt-8">
              <li className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed">
                <CheckCircle2 size={16} className="text-fuchsia-400 mt-0.5 shrink-0" />
                Executed a comprehensive corporate data analytics simulation, fulfilling targeted business requests for e-commerce revenue analysis and operational forecasting.
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed">
                <CheckCircle2 size={16} className="text-fuchsia-400 mt-0.5 shrink-0" />
                Developed interactive data visualization reports to translate raw transactional datasets into clear, executive-ready performance metrics.
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed">
                <CheckCircle2 size={16} className="text-fuchsia-400 mt-0.5 shrink-0" />
                Synthesized technical findings into a professional internship log book, effectively communicating data-driven business recommendations to simulated stakeholders.
              </li>
            </ul>
          </GlowCard>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */
function ProjectCard({ p, idx }) {
  return (
    <Reveal delay={idx * 0.08}>
      <GlowCard className="h-full flex flex-col group/card">
        {/* Project Image Header */}
        <div className="h-48 w-full bg-[#0b0510] border-b border-white/10 overflow-hidden relative">
          {p.image ? (
            <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-70 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-500" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-zinc-700 font-mono text-sm">
              <Terminal size={24} className="mr-2" /> script_running.py
            </div>
          )}
          <div className="absolute top-4 left-4">
            <span className="font-mono text-xs text-purple-300 bg-purple-900/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-purple-500/30">
              {p.tag}
            </span>
          </div>
        </div>

        {/* Project Details */}
        <div className="p-7 flex flex-col flex-grow">
          <h4 className="text-xl font-medium text-white mb-3 leading-snug group-hover/card:text-purple-300 transition-colors">{p.title}</h4>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">{p.description}</p>
          <div className="flex flex-wrap gap-2 mb-6 mt-auto">
            {p.stack.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          
          {/* UPDATED BUTTON: Direct GitHub Link */}
          <div className="mt-auto flex items-center pt-4 border-t border-white/5">
            <a 
              href={p.github} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-purple-500/20 text-white transition-colors border border-white/5 hover:border-purple-500/30 z-20"
            >
              <Github size={16} /> View on GitHub
            </a>
          </div>
        </div>
      </GlowCard>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionLabel>SELECT * FROM projects</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h3 className="text-3xl sm:text-4xl font-semibold mb-14" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Featured Architecture
          </h3>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, idx) => (
            <ProjectCard key={p.id} p={p} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
/* ------------------------------------------------------------------ */
/*  Certifications                                                      */
/* ------------------------------------------------------------------ */
function Certifications() {
  return (
    <section id="certifications" className="py-28 relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionLabel>certifications.list()</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h3 className="text-3xl sm:text-4xl font-semibold mb-14" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Verified Credentials
          </h3>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATIONS.map((c, idx) => (
            <Reveal key={c.title} delay={idx * 0.08}>
              <GlowCard className="p-6 h-full flex flex-col justify-between group/cert">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border border-purple-500/30 flex items-center justify-center">
                      <Award size={20} className="text-purple-300" />
                    </div>
                    <span className="text-xs font-mono text-zinc-500 bg-white/5 px-2 py-1 rounded">{c.date}</span>
                  </div>
                  <h4 className="font-medium text-white mb-2 text-lg leading-snug">{c.title}</h4>
                  <p className="text-sm text-zinc-400">Issued by: <span className="text-purple-300 font-medium">{c.issuer}</span></p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-600">ID: {c.code}</span>
                  <Award size={14} className="text-zinc-600 group-hover/cert:text-purple-400 transition-colors" />
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact                                                             */
/* ------------------------------------------------------------------ */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <section id="contact" className="py-28 relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionLabel>contact.connect()</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h3 className="text-3xl sm:text-4xl font-semibold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Let's work together
          </h3>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-zinc-400 max-w-xl mb-14">
            Open to Data Analyst, BI Analyst and Junior Data Engineer roles.
            Reach out — I usually reply within a day.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-5 gap-8">
          <Reveal className="md:col-span-2 space-y-4" delay={0.1}>
            <a href="https://github.com/mjunaid777" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-[#120a1c] hover:border-purple-500/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <Github size={18} className="text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">GitHub</div>
                <div className="text-xs text-zinc-400">github.com/mjunaid777</div>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/syed-junaid-8657113b1/" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-[#120a1c] hover:border-blue-500/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                <Linkedin size={18} className="text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">LinkedIn</div>
                <div className="text-xs text-zinc-400">linkedin.com/in/syed-junaid</div>
              </div>
            </a>
            <a href="mailto:syedjunaid3786@gmail.com" className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-[#120a1c] hover:border-purple-500/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                <Mail size={18} className="text-purple-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Email</div>
                <div className="text-xs text-zinc-400">syedjunaid3786@gmail.com</div>
              </div>
            </a>
          </Reveal>

          <Reveal className="md:col-span-3" delay={0.15}>
            <GlowCard className="p-7">
              {sent ? (
                <div className="flex flex-col items-center justify-center text-center py-14">
                  <CheckCircle2 size={40} className="text-fuchsia-400 mb-4" />
                  <p className="text-white font-medium mb-1 text-lg">Message ready to send</p>
                  <p className="text-zinc-500 text-sm max-w-xs mt-2">
                    Connect an email service like Formspree or Resend to process this payload.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs text-zinc-400 font-mono block mb-2">name</label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-400 font-mono block mb-2">email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50 transition-colors"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 font-mono block mb-2">message</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50 transition-colors resize-none"
                      placeholder="Tell me about the role..."
                    />
                  </div>
                  <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20 w-full justify-center">
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </GlowCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                              */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 bg-[#0b0510]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-zinc-500 font-mono">
          designed &amp; built by Syed Junaid — © 2026
        </p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/mjunaid777" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
            <Github size={18} />
          </a>
          <a href="https://www.linkedin.com/in/syed-junaid-8657113b1/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors">
            <Linkedin size={18} />
          </a>
          <a href="mailto:syedjunaid3786@gmail.com" className="text-zinc-500 hover:text-purple-400 transition-colors">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Active section tracking                                            */
/* ------------------------------------------------------------------ */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const handler = () => {
      const offset = window.innerHeight * 0.4;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [ids]);
  return active;
}

/* ------------------------------------------------------------------ */
/*  Root                                                                */
/* ------------------------------------------------------------------ */
export default function Portfolio() {
  useFonts();
  const active = useActiveSection(["hero", ...NAV_LINKS.map((l) => l.id)]);

  return (
    <div
      className="min-h-screen bg-[#0b0510] text-white antialiased"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        @keyframes sjFloat1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-40px) scale(1.1); } }
        @keyframes sjFloat2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-40px,30px) scale(1.15); } }
        @keyframes sjDash { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes sjBlink { 0%,49% { opacity:1; } 50%,100% { opacity:0; } }
        @keyframes sjModalIn { from { opacity:0; transform: scale(0.96) translateY(12px);} to { opacity:1; transform: scale(1) translateY(0);} }

        .sj-blob { position: absolute; border-radius: 9999px; filter: blur(100px); pointer-events:none; opacity:0.25; }
        .sj-blob-1 { width: 450px; height: 450px; background: radial-gradient(circle,#c026d3,transparent 70%); top: -100px; left: -100px; animation: sjFloat1 12s ease-in-out infinite; }
        .sj-blob-2 { width: 400px; height: 400px; background: radial-gradient(circle,#9333ea,transparent 70%); bottom: -150px; right: -80px; animation: sjFloat2 14s ease-in-out infinite; }
        
        .sj-grid { background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 64px 64px; mask-image: radial-gradient(ellipse 70% 60% at 50% 20%, black 30%, transparent 90%); }
        .sj-caret { display:inline-block; animation: sjBlink 1s step-end infinite; text-shadow: 0 0 10px rgba(168,85,247,0.5); }
        .sj-modal-in { animation: sjModalIn 0.3s cubic-bezier(.21,.8,.36,1); }

        @media (prefers-reduced-motion: reduce) {
          .sj-blob, .sj-caret { animation: none !important; }
        }

        ::selection { background: rgba(168,85,247,0.4); }
        html { scroll-behavior: smooth; }
        
        /* Custom scrollbar for modal */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>

      <Nav active={active} />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}