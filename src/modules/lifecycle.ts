import type { LifecycleModule } from '@/types';

/**
 * A minimal lifecycle manager. Modules register themselves and are started
 * sequentially during `app.start()`. Each module optionally exposes a
 * `destroy` callback used during hot-module replacement in development.
 */
export class Lifecycle {
  private readonly modules: LifecycleModule[] = [];

  public add(module: LifecycleModule): this {
    this.modules.push(module);
    return this;
  }

  public addAll(modules: readonly LifecycleModule[]): this {
    modules.forEach((m) => this.add(m));
    return this;
  }

  public async start(): Promise<void> {
    for (const module of this.modules) {
      try {
        const result = module.init();
        if (result instanceof Promise) await result;
      } catch (error) {
        console.error(`[lifecycle] module "${module.id}" failed to init`, error);
      }
    }
  }

  public async restart(): Promise<void> {
    this.stop();
    await this.start();
  }

  public stop(): void {
    for (const module of this.modules) {
      try {
        module.destroy?.();
      } catch (error) {
        console.error(`[lifecycle] module "${module.id}" failed to destroy`, error);
      }
    }
  }
}
