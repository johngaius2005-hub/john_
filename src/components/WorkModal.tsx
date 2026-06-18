import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Github, Cpu, Layers, Globe, Sparkles, AlertCircle } from "lucide-react";
import { Project } from "../types";

interface WorkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const projects: Project[] = [
  {
    id: "project-1",
    title: "Aetheria Forge",
    category: "AI & Neural Tech",
    description: "An offline-first, highly-optimized visualization platform and local runtime dashboard for small LLMs. Integrates real-time parameter tweaking and direct hardware metrics monitoring.",
    logo: "Cpu",
    tags: ["React", "TypeScript", "WebAssembly", "Tailwind CSS", "ONNX"],
    stats: { label: "Performance Max", value: "62 ms/Token" },
    demoUrl: "https://demo.example.com/aetheria",
    githubUrl: "https://github.com/example/aetheria-forge"
  },
  {
    id: "project-2",
    title: "Chronos Graph Engine",
    category: "System Engineering",
    description: "High-performance time-series data modeling engine capable of resolving, query-aggregating, and mapping 12M+ sensory points inside sub-millisecond frames with persistent caches.",
    logo: "Layers",
    tags: ["TypeScript", "Node.js", "D3.js", "Redis", "Web Workers"],
    stats: { label: "Query Speedup", value: "480x Better" },
    demoUrl: "https://demo.example.com/chronos",
    githubUrl: "https://github.com/example/chronos-graph"
  },
  {
    id: "project-3",
    title: "Cosmic Canvas IDE",
    category: "Authoring & Rich Media",
    description: "A collaborative, infinite canvas-editing system supporting custom shaders, procedural vector brushes, real-time sync networks, and asset compilation pipelines on WebGL.",
    logo: "Globe",
    tags: ["React", "WebGL", "Vite", "WebSockets", "Drizzle ORM"],
    stats: { label: "Asset Pipeline", value: "<1.2s Build" },
    demoUrl: "https://demo.example.com/cosmic",
    githubUrl: "https://github.com/example/cosmic-canvas"
  },
  {
    id: "project-4",
    title: "Gemini Agent Orchestrator",
    category: "AI Core Integrations",
    description: "A resilient multi-agent microservice architecture utilizing server-side prompt engineering, live audio streams, context-cache recycling, and auto-correcting safety rails.",
    logo: "Sparkles",
    tags: ["Express", "Google GenAI SDK", "Node.js", "TypeScript", "SSE"],
    stats: { label: "Prompt Savings", value: "34% Saved" },
    demoUrl: "https://demo.example.com/gemini-orchestrator",
    githubUrl: "https://github.com/example/gemini-orchestrator"
  }
];

export default function WorkModal({ isOpen, onClose }: WorkModalProps) {
  // Map icon strings to components safely
  const getIcon = (name: string) => {
    switch (name) {
      case "Cpu": return <Cpu className="w-5 h-5 text-sky-400" />;
      case "Layers": return <Layers className="w-5 h-5 text-indigo-400" />;
      case "Globe": return <Globe className="w-5 h-5 text-cyan-400" />;
      case "Sparkles": return <Sparkles className="w-5 h-5 text-purple-400" />;
      default: return <Cpu className="w-5 h-5 text-zinc-400" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#06070c]/90 backdrop-blur-md"
            id="work-modal-backdrop"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl bg-[#0d101d]/90 border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-2xl max-h-[85vh] overflow-y-auto no-scrollbar scroll-smooth z-10"
            id="work-modal-content"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition"
              aria-label="Close Work Showcase"
              id="close-work-modal-btn"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="mb-8">
              <span className="text-xs uppercase font-mono tracking-widest text-sky-400 font-medium">Curated Artifacts</span>
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-white mt-1">
                Explore My Work
              </h2>
              <p className="text-sm text-zinc-400 mt-2 max-w-xl">
                A selection of architectural implementations combining high-performance algorithms, sleek vector rendering, and robust state engines.
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="projects-grid">
              {projects.map((project, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={project.id}
                  className="flex flex-col h-full bg-zinc-900/40 border border-zinc-800/50 hover:border-sky-500/30 rounded-xl p-5 hover:bg-zinc-900/60 transition group relative overflow-hidden"
                >
                  {/* Atmospheric Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-500" />

                  {/* Top Header */}
                  <div className="flex items-start justify-between mb-3 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center p-2 group-hover:border-zinc-700 transition">
                        {getIcon(project.logo)}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
                          {project.category}
                        </span>
                        <h3 className="text-base font-semibold text-zinc-200 mt-0.5 group-hover:text-sky-400 transition">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {project.stats && (
                      <div className="text-right">
                        <span className="block text-[9px] font-mono text-zinc-500 uppercase">{project.stats.label}</span>
                        <span className="text-xs font-mono font-semibold text-emerald-400">{project.stats.value}</span>
                      </div>
                    )}
                  </div>

                  {/* Body description */}
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-5 flex-grow relative z-10">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800/40 text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions footer */}
                  <div className="flex items-center gap-4 mt-auto pt-3 border-t border-zinc-800/45 relative z-10">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Repository</span>
                    </a>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition ml-auto"
                    >
                      <span>Interactive Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sandbox Notice Banner (Very humble/professional) */}
            <div className="mt-8 p-3 rounded-lg bg-zinc-950/60 border border-zinc-900 flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-zinc-500 flex-shrink-0" />
              <p className="text-[11px] text-zinc-500 font-sans leading-tight">
                All showcase items are conceptual mock designs reflecting architecture proficiencies in systems integration, client-side animation pipelines, and full-stack engineering.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
