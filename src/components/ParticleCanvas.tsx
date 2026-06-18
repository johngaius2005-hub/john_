import { useEffect, useRef } from "react";

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];
    
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120, // Mouse interaction radius
    };

    const colors = [
      "rgba(56, 189, 248, 0.4)",  // sky blue
      "rgba(34, 211, 238, 0.3)",  // cyan
      "rgba(129, 140, 248, 0.35)", // indigo
    ];

    // Handle Resize
    const resizeCanvas = () => {
      if (!canvas || !containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      canvas.width = width;
      canvas.height = height;

      // Re-initialize particles based on screen space
      const particleCount = Math.min(Math.floor((width * height) / 12000), 80);
      particles = [];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    // Resize observer for container to fit perfectly inside frames or grid cells
    const observer = new ResizeObserver(() => {
      resizeCanvas();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Call initial resize
    resizeCanvas();

    // Mouse Listeners
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Render loop
    const render = () => {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Draw subtle grids (very elegant engineering touch)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;
      const gridSpacing = 60;
      for (let x = 0; x < w; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw connecting lines between particles
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          
          if (dist < 110) {
            // Gradient connecting lines based on distance
            const alpha = (1 - dist / 110) * 0.12;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw connections to mouse cursor
        if (mouse.x > 0 && mouse.y > 0) {
          const mDist = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);
          if (mDist < mouse.radius) {
            const alpha = (1 - mDist / mouse.radius) * 0.22;
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Subtle particle push away from mouse
            const forceDirectionX = (p1.x - mouse.x) / mDist;
            const forceDirectionY = (p1.y - mouse.y) / mDist;
            const force = (mouse.radius - mDist) / mouse.radius; // stronger closer to mouse
            p1.x += forceDirectionX * force * 0.6;
            p1.y += forceDirectionY * force * 0.6;
          }
        }

        // Update particle physics
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce back from walls with wrap-around
        if (p1.x < 0) p1.x = w;
        if (p1.x > w) p1.x = 0;
        if (p1.y < 0) p1.y = h;
        if (p1.y > h) p1.y = 0;

        // Draw Particle Node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = p1.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-auto" />
    </div>
  );
}
