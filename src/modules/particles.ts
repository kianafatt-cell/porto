import type { LifecycleModule } from '@/types';
import { isNarrowViewport } from '@/modules/motion';
import { el } from '@/utils/dom';
import { mulberry32 } from '@/utils/math';
import { scheduler } from '@/utils/rafScheduler';

/**
 * A gentle constellation of floating particles connected with thin lines.
 * Runs on a 2D canvas. On narrow viewports we reduce the particle count to
 * roughly 35 to keep things smooth on mid-range phones.
 */
export function createParticlesModule(): LifecycleModule {
  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  let unregister: (() => void) | null = null;

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
    alpha: number;
  }

  let particles: Particle[] = [];
  let width = 0;
  let height = 0;
  let dpr = 1;
  const random = mulberry32(42);

  function resize(): void {
    if (!canvas) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawn(count: number): void {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: random() * width,
        y: random() * height,
        vx: (random() - 0.5) * 0.2,
        vy: (random() - 0.5) * 0.2,
        r: 0.6 + random() * 1.1,
        alpha: 0.2 + random() * 0.4,
      });
    }
  }

  function draw(): void {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    // Lines between nearby particles.
    const maxDist = 140;
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i]!;
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j]!;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < maxDist) {
          const t = 1 - d / maxDist;
          ctx.strokeStyle = `rgba(168, 85, 247, ${(t * 0.15).toFixed(3)})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    // Dots on top.
    for (const p of particles) {
      ctx.fillStyle = `rgba(192, 132, 252, ${p.alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function tick(dt: number): void {
    for (const p of particles) {
      p.x += p.vx * dt * 60;
      p.y += p.vy * dt * 60;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;
    }
    draw();
  }

  return {
    id: 'particles',
    init() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      canvas = el('canvas', { class: 'particles', 'aria-hidden': 'true' });
      document.body.prepend(canvas);
      ctx = canvas.getContext('2d');
      if (!ctx) return;
      resize();
      spawn(isNarrowViewport() ? 35 : 75);
      const onResize = () => {
        resize();
        spawn(isNarrowViewport() ? 35 : 75);
      };
      window.addEventListener('resize', onResize, { passive: true });
      const unregisterTick = scheduler.add(tick);
      unregister = () => {
        window.removeEventListener('resize', onResize);
        unregisterTick();
        canvas?.remove();
      };
    },
    destroy() {
      unregister?.();
      unregister = null;
    },
  };
}
