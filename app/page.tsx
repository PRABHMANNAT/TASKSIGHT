'use client';

import type { SyntheticEvent } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const navItems = ['Product', 'Use Cases', 'Technology', 'About'];

function AccessDialog({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <Dialog onOpenChange={(open) => !open && setSubmitted(false)}>
      <DialogTrigger
        render={
          <Button
            className={
              compact
                ? 'nav-cta h-10 rounded-full px-6 text-[13px] font-semibold'
                : 'hero-cta h-16 rounded-full px-12 text-[18px] font-semibold sm:min-w-[322px]'
            }
          />
        }
      >
        {compact ? 'Request Access' : 'Request Early Access'}
      </DialogTrigger>
      <DialogContent className="access-dialog border-white/15 bg-[#0b0b0c] p-7 text-white sm:max-w-md">
        {submitted ? (
          <div className="flex min-h-48 flex-col items-center justify-center text-center">
            <span className="mb-5 grid size-12 place-items-center rounded-full bg-white text-black">
              <Check className="size-5" />
            </span>
            <DialogTitle className="text-2xl">You’re on the list.</DialogTitle>
            <DialogDescription className="mt-3 max-w-xs text-white/55">
              We’ll share product updates and pilot availability as the project moves forward.
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader className="gap-3">
              <p className="eyebrow text-[11px]">EARLY ACCESS</p>
              <DialogTitle className="text-2xl tracking-[-0.03em]">Bring guidance into the field.</DialogTitle>
              <DialogDescription className="text-white/55">
                Tell us where visual intelligence could help your operations team most.
              </DialogDescription>
            </DialogHeader>
            <form className="mt-3 space-y-3" onSubmit={handleSubmit}>
              <label className="block">
                <span className="sr-only">Work email</span>
                <input
                  required
                  type="email"
                  placeholder="Work email"
                  className="h-12 w-full rounded-xl border border-white/12 bg-white/6 px-4 text-base text-white outline-none transition placeholder:text-white/35 focus:border-white/35 focus:ring-2 focus:ring-white/10"
                />
              </label>
              <Button className="h-12 w-full rounded-xl bg-white text-black hover:bg-white/88">
                Join the waitlist <ArrowRight className="ml-1 size-4" />
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function Home() {
  return (
    <main id="product" className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#product" aria-label="TaskSight home">
          <span className="brand-mark" />
          TaskSight
        </a>
        <nav className="desktop-nav" aria-label="Main menu">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`}>
              {item}
            </a>
          ))}
        </nav>
        <div className="nav-divider" />
        <AccessDialog compact />
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">TASKSIGHT</p>
          <h1 id="hero-title">Visual intelligence for physical operations</h1>
          <p className="subhead">
            Guide every maintenance task, catch mistakes in real time,
            <br className="desktop-break" /> verify each step, and document the job.
          </p>
          <p className="concept">Starting with mission-critical data center maintenance</p>
        </div>

        <div className="product-stage" aria-label="AI smart glasses product rendering">
          <div className="product-halo" />
          <Image
            className="product-image"
            src="/assets/ai-glasses-hero.png"
            alt="Black AI smart glasses with dual cameras and a slim status light"
            width={1640}
            height={896}
            priority
            sizes="(max-width: 560px) 122vw, 930px"
          />
        </div>

        <div className="hero-action">
          <AccessDialog />
          <span className="microcopy">Private pilot · Data center teams</span>
        </div>
      </section>

      <div className="anchor-targets" aria-hidden="true">
        <span id="use-cases" />
        <span id="technology" />
        <span id="about" />
      </div>
    </main>
  );
}
