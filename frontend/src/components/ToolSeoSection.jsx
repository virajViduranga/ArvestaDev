'use client';
import { HelpCircle, CheckCircle2 } from 'lucide-react';
import FAQ from './FAQ';
export default function ToolSeoSection({ steps, faqs }) {
  return (
    <div className="max-w-4xl mx-auto mt-20 pt-10 border-t border-[var(--color-border)]">
      
      {/* How it works */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">How to use this tool</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-[var(--color-surface)] p-5 rounded-lg border border-[var(--color-border)] shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer">
              <div className="w-8 h-8 bg-[var(--color-primary)] text-[var(--color-text-on-primary)] rounded-full flex items-center justify-center font-bold mb-4">
                {index + 1}
              </div>
              <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">{step.title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <FAQ faqs={faqs} />
      
    </div>
  );
}