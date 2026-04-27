/**
 * A single shared requestAnimationFrame loop. Modules register tick callbacks
 * and receive the delta seconds since the last tick. Centralising this keeps
 * us to one RAF even when many modules (particles, cursor, parallax) want to
 * update every frame.
 */

type Tick = (deltaSeconds: number, elapsed: number) => void;

class RafScheduler {
  private ticks: Set<Tick> = new Set();
  private running = false;
  private last = 0;
  private start = 0;

  public add(tick: Tick): () => void {
    this.ticks.add(tick);
    if (!this.running) this.run();
    return () => this.remove(tick);
  }

  public remove(tick: Tick): void {
    this.ticks.delete(tick);
    if (this.ticks.size === 0) this.running = false;
  }

  private run(): void {
    this.running = true;
    this.last = performance.now();
    this.start = this.last;
    const loop = (now: number): void => {
      if (!this.running) return;
      const delta = Math.min((now - this.last) / 1000, 0.05);
      const elapsed = (now - this.start) / 1000;
      this.last = now;
      for (const tick of this.ticks) {
        try {
          tick(delta, elapsed);
        } catch (err) {
          console.error('[raf] tick crashed', err);
        }
      }
      if (this.running) requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  public destroy(): void {
    this.ticks.clear();
    this.running = false;
  }
}

export const scheduler = new RafScheduler();
