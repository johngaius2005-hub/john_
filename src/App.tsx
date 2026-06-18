import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, Mail, Terminal, ExternalLink } from "lucide-react";
import ParticleCanvas from "./components/ParticleCanvas";
import WorkModal from "./components/WorkModal";
import ContactModal from "./components/ContactModal";

const TYPEWRITER_SKILLS = [
  "React & TypeScript Engineering",
  "High-Performance System Design",
  "Gemini API & LLM Agent Workflows",
  "Client-Side Hardware Renderings",
  "Modular & Resilient Server Architecture"
];

export default function App() {
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  // Custom typewriter state
  const [skillIndex, setSkillIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Dynamic interactive lighting coords
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Dynamically pulled metadata for John Gaius
  const userEmail = "johngaius2005@gmail.com";

  // Typewriter loop
  useEffect(() => {
    const fullWord = TYPEWRITER_SKILLS[skillIndex];
    
    const handleType = () => {
      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setTypingSpeed(60);

        if (currentText === fullWord) {
          setTypingSpeed(2500); // Wait on completed word
          setIsDeleting(true);
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setTypingSpeed(35);

        if (currentText === "") {
          setIsDeleting(false);
          setSkillIndex((prev) => (prev + 1) % TYPEWRITER_SKILLS.length);
          setTypingSpeed(250);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, skillIndex, typingSpeed]);

  // Track cursor position to update interactive backdrop light source
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#08080a] text-zinc-100 flex flex-col justify-between overflow-hidden font-sans">
      
      {/* Background Grid Lines & Panels for Editorial Aesthetic */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#16162a_0%,transparent_50%)] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-1/3 h-full border-l border-zinc-900/30 pointer-events-none z-0" />
      <div className="absolute top-[15%] left-[6%] w-[1px] h-[70%] bg-gradient-to-b from-transparent via-zinc-805/40 to-transparent pointer-events-none z-0" />

      {/* 1. Dynamic Interactive Spot Ambient Light */}
      <div
        className="absolute pointer-events-none rounded-full blur-[140px] opacity-15 w-[450px] h-[450px] transition-transform duration-300 ease-out z-10"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(56, 189, 248, 0.15) 70%, transparent 100%)",
          left: `${mousePos.x - 225}px`,
          top: `${mousePos.y - 225}px`,
          transform: "translate3d(0, 0, 0)",
        }}
      />

      {/* 2. Constellation Node Interactive Canvas Background */}
      <div className="absolute inset-0 z-0">
        <ParticleCanvas />
      </div>

      {/* 3. Navigation Bar (Editorial Aesthetic Layout) */}
      <nav className="relative z-20 flex justify-between items-center px-6 sm:px-16 py-8 md:py-10">
        <div className="text-lg font-bold tracking-tighter cursor-default font-display">
          JG<span className="text-indigo-500 text-xl font-black">.</span>
        </div>
        <div className="flex gap-6 sm:gap-10 text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-medium items-center">
          <span className="text-zinc-100 cursor-pointer font-semibold transition">Home</span>
          <span 
            onClick={() => setIsWorkOpen(true)}
            className="hover:text-zinc-100 cursor-pointer transition"
          >
            Work
          </span>
          <span 
            onClick={() => setIsContactOpen(true)}
            className="hover:text-zinc-100 cursor-pointer transition"
          >
            Contact
          </span>
        </div>
      </nav>

      {/* 4. Elegant Hero Content Workspace (Editorial Aesthetic) */}
      <main className="flex-1 flex flex-col justify-center px-6 sm:px-16 md:px-24 z-10 py-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
          id="hero-container"
        >
          {/* Elegant Greeting Label */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-indigo-500/50"></div>
            <p className="text-indigo-400 text-[10px] sm:text-xs font-semibold tracking-[0.4em] uppercase">
              Hello, I'm
            </p>
          </div>

          {/* Medium-sized name with layered Neon Glow Effect */}
          <div className="relative mb-8 w-fit">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-white relative z-10 font-display">
              John Gaius
            </h1>
            {/* Ambient glows behind name */}
            <div className="absolute inset-0 -inset-x-4 blur-2xl bg-indigo-500/10 rounded-full" />
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-indigo-500/0 via-indigo-500/40 to-indigo-500/0 blur-md pointer-events-none" />
          </div>

          {/* Professional Tagline with dots */}
          <h2 className="text-sm sm:text-base md:text-lg text-zinc-400 font-light tracking-wide mb-8 flex flex-wrap items-center gap-2 sm:gap-3 leading-relaxed">
            Full Stack Developer 
            <span className="w-1.5 h-1.5 bg-zinc-700/80 rounded-full inline-block" />
            AI Enthusiast 
            <span className="w-1.5 h-1.5 bg-zinc-700/80 rounded-full inline-block" />
            Problem Solver
          </h2>

          {/* Typewriter Animation in terminal-line style */}
          <div className="mb-10 h-10 flex flex-col justify-center">
            <div className="inline-flex self-start items-center gap-2.5 font-mono text-[11px] sm:text-xs text-zinc-300 border-l-2 border-indigo-500 pl-4">
              <span className="text-indigo-400 opacity-70 select-none">$</span>
              <span className="text-zinc-500 font-semibold select-none">john@gaius ~</span>
              <span className="text-zinc-300 font-light">{currentText}</span>
              <span className="w-1.5 h-4 bg-indigo-500 opacity-80 animate-pulse" />
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* CTA Group: Primary Work Explore */}
            <button
              onClick={() => setIsWorkOpen(true)}
              className="px-8 sm:px-12 py-4 sm:py-5 bg-white text-black text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] transition-all hover:bg-zinc-200 active:scale-95 duration-200 hover:shadow-lg hover:shadow-white/5 cursor-pointer z-10 text-center"
              id="cta-explore-work"
            >
              Explore My Work
            </button>

            {/* CTA Group: Secondary Contact */}
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-8 sm:px-12 py-4 sm:py-5 border border-zinc-700 text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] transition-all hover:bg-zinc-900 active:scale-95 duration-200 cursor-pointer z-10 text-center"
              id="cta-contact-me"
            >
              Contact Me
            </button>
          </div>
        </motion.div>
      </main>

      {/* Right Column visual accent pointer-events-none */}
      <div className="absolute right-10 md:right-16 bottom-1/2 translate-y-1/2 flex flex-col items-center gap-16 pointer-events-none z-10 hidden lg:flex">
        <div className="rotate-90 text-[9px] text-zinc-600 uppercase tracking-[0.8em] whitespace-nowrap">
          Architecting Intelligent Systems
        </div>
        <div className="h-32 w-[1px] bg-gradient-to-b from-zinc-800 via-zinc-800/40 to-transparent"></div>
      </div>

      {/* 5. Minimalistic Professional Footer */}
      <footer className="relative z-20 px-6 sm:px-16 py-8 md:py-10 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 border-t border-zinc-900/30">
        <div className="flex flex-col gap-2.5 items-center sm:items-start text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-medium">Available for select projects</span>
          </div>
          <p className="text-[9px] text-zinc-600 uppercase tracking-widest">© 2026 Design Portfolio • Edition 002</p>
        </div>

        <div className="flex gap-8 items-center">
          <div className="text-[9px] sm:text-[10px] text-zinc-500 font-mono">37.7749° N, 122.4194° W</div>
          <div className="flex gap-3">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-[32px] h-[32px] border border-zinc-800 flex items-center justify-center text-[10px] text-zinc-500 hover:border-zinc-400 hover:text-white transition-colors cursor-pointer">LN</a>
            <a href="https://github.com/johngaius" target="_blank" rel="noopener noreferrer" className="w-[32px] h-[32px] border border-zinc-800 flex items-center justify-center text-[10px] text-zinc-500 hover:border-zinc-400 hover:text-white transition-colors cursor-pointer">GH</a>
          </div>
        </div>
      </footer>

      {/* 6. Modals for dynamic same-page context switching */}
      <WorkModal isOpen={isWorkOpen} onClose={() => setIsWorkOpen(false)} />
      
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
        userEmail={userEmail} 
      />
    </div>
  );
}
