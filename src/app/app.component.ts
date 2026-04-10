import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Item {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="page">
      <div class="badge">🚀 Flui Demo Application</div>
      <h1>Flui Demo — Angular 21</h1>
      <p class="subtitle">
        Angular 21 · Standalone components · Signals · Served via nginx
      </p>

      <section class="card">
        <h2>About this template</h2>
        <p>
          This is a frontend-only template. It's bundled with the Angular CLI
          and served by nginx in production. Customize it freely to start your
          own project.
        </p>
      </section>

      <section class="card">
        <h2>Items ({{ count() }})</h2>
        <div class="form-row">
          <input
            [(ngModel)]="newItem"
            placeholder="Add a new item..."
            (keyup.enter)="addItem()"
          />
          <button (click)="addItem()">Add</button>
        </div>
        @for (item of items(); track item.id) {
          <div class="item">
            <div class="item-name">{{ item.name }}</div>
            <div class="item-desc">{{ item.description }}</div>
            <button class="btn-del" (click)="removeItem(item.id)">×</button>
          </div>
        }
      </section>

      <footer>
        Powered by <a href="https://flui.cloud">Flui</a>
      </footer>
    </main>
  `,
  styles: [
    `
      .page {
        max-width: 800px;
        margin: 0 auto;
        padding: 4rem 2rem;
      }
      .badge {
        display: inline-block;
        padding: 0.4rem 0.9rem;
        border-radius: 999px;
        background: linear-gradient(135deg, #4f9eff, #a855f7);
        color: #fff;
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
      }
      h1 {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
      }
      .subtitle {
        color: #888;
        margin-bottom: 2rem;
      }
      .card {
        background: #15151c;
        border: 1px solid #2a2a35;
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 2rem;
      }
      .card h2 {
        font-size: 1.2rem;
        margin-bottom: 1rem;
      }
      .card p {
        color: #aaa;
      }
      .form-row {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
      input {
        flex: 1;
        background: #0a0a0f;
        border: 1px solid #2a2a35;
        color: #e8e8ed;
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        font-family: inherit;
      }
      button {
        background: #4f9eff;
        border: none;
        color: #fff;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
      }
      button:hover {
        background: #6ab0ff;
      }
      .item {
        display: flex;
        align-items: center;
        padding: 0.75rem 0;
        border-bottom: 1px solid #2a2a35;
      }
      .item-name {
        font-weight: 600;
        flex: 1;
      }
      .item-desc {
        color: #888;
        font-size: 0.9rem;
        flex: 2;
      }
      .btn-del {
        background: transparent;
        color: #888;
        font-size: 1.2rem;
        padding: 0 0.5rem;
      }
      .btn-del:hover {
        color: #ff6b6b;
        background: transparent;
      }
      footer {
        margin-top: 3rem;
        padding-top: 1.5rem;
        border-top: 1px solid #2a2a35;
        color: #666;
        font-size: 0.85rem;
        text-align: center;
      }
    `,
  ],
})
export class AppComponent {
  protected newItem = '';
  protected items = signal<Item[]>([
    {
      id: '1',
      name: 'Welcome to Flui',
      description: 'Your first demo item — feel free to delete it.',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Try Angular 21',
      description: 'Standalone components, signals, and zoneless detection.',
      createdAt: new Date().toISOString(),
    },
  ]);

  protected count = computed(() => this.items().length);

  protected addItem(): void {
    const name = this.newItem.trim();
    if (!name) return;
    const item: Item = {
      id: String(Date.now()),
      name,
      description: 'Added from the demo UI',
      createdAt: new Date().toISOString(),
    };
    this.items.update((arr) => [item, ...arr]);
    this.newItem = '';
  }

  protected removeItem(id: string): void {
    this.items.update((arr) => arr.filter((it) => it.id !== id));
  }
}
