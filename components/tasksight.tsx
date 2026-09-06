'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Check,
  ScanLine,
  Eye,
  FileCheck2,
  Layers,
  Menu,
  X,
  Code2 as Github,
  Download,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  experiments,
  evaluationDimensions,
  evidenceUrl,
} from '@/lib/experiments';

const steps = [
  ['Identify', 'Rack B12 detected', 'Correct rack'],
  ['Verify asset', 'Server B12-U18', 'Correct server'],
  ['Guide', 'Remove failed drive from Bay 04', 'Target acquired'],
  ['Observe', 'Technician selects Bay 03', 'Incorrect drive bay'],
  ['Correct', 'Technician selects Bay 04', 'Action verified'],
  [
    'Document',
    'Evidence attached to work order',
    'Maintenance report generated',
  ],
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Link className="skip-link" href="#main">
        Skip to content
      </Link>
      <header className="ts-nav">
        <Link href="/" className="ts-brand">
          <ScanLine size={23} strokeWidth={1.5} />
          TaskSight
        </Link>
        <nav
          className={open ? 'ts-links is-open' : 'ts-links'}
          aria-label="Main navigation"
        >
          {['Product', 'Demo', 'Evidence', 'Technology', 'Vision', 'Team'].map(
            (x) => (
              <Link
                key={x}
                href={
                  x === 'Demo'
                    ? '/demo'
                    : x === 'Evidence'
                      ? '/research'
                      : '/#' + x.toLowerCase()
                }
                onClick={() => setOpen(false)}
              >
                {x}
              </Link>
            ),
          )}
        </nav>
        <Link className="pill light nav-invest" href="/invest">
          Investor brief <ArrowUpRight size={14} />
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer className="ts-footer">
      <Link className="ts-brand" href="/">
        <ScanLine size={20} /> TaskSight
      </Link>
      <span>© 2026 Prabhmannat Singh</span>
      <div>
        <Link href="/research">Research</Link>
        <Link href="https://github.com/PRABHMANNAT/TASKSIGHT">
          GitHub <ArrowUpRight size={13} />
        </Link>
      </div>
    </footer>
  );
}
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="ts-site">
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
function Label({ children }: { children: React.ReactNode }) {
  return <p className="ts-label">{children}</p>;
}
function SectionTitle({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading">
      <Label>{number}</Label>
      <h2>{title}</h2>
      {text && <p className="lede">{text}</p>}
    </div>
  );
}

function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      className="hero-scene"
      ref={ref}
      onPointerMove={(e) => {
        if (
          window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
          e.pointerType !== 'mouse'
        )
          return;
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty(
          '--ry',
          `${((e.clientX - r.left) / r.width - 0.5) * 12}deg`,
        );
        e.currentTarget.style.setProperty(
          '--rx',
          `${-((e.clientY - r.top) / r.height - 0.5) * 8}deg`,
        );
      }}
      onPointerLeave={() => {
        ref.current?.style.setProperty('--ry', '0deg');
        ref.current?.style.setProperty('--rx', '0deg');
      }}
    >
      <div className="scene-grid" />
      <div className="scene-caption">
        <span className="dot" /> INTERFACE CONCEPT / 001
      </div>
      <Image
        className="glasses"
        src="/assets/ai-glasses-hero.png"
        width={1640}
        height={896}
        alt="Concept smart glasses for viewing maintenance guidance"
        priority
        sizes="(max-width: 720px) 100vw, 900px"
      />
      <div className="ar-tag ar-left">
        <span>RACK B12 / U18</span>
        <b>
          <Check size={12} /> ASSET VERIFIED
        </b>
      </div>
      <div className="ar-tag ar-right">
        <span>PROCEDURE 04 / 06</span>
        <b>
          <ScanLine size={12} /> ACTION VERIFIED
        </b>
      </div>
      <div className="scene-bottom">
        <span>PHONE · BODY CAMERA · EXISTING GLASSES</span>
        <span>ILLUSTRATIVE OVERLAY</span>
      </div>
    </div>
  );
}

export function VerificationDemo() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing || step === 5) return;
    const timer = window.setTimeout(
      () => setStep((current) => Math.min(current + 1, 5)),
      3800,
    );
    return () => window.clearTimeout(timer);
  }, [playing, step]);
  const running = playing && step < 5;
  function replay() {
    setStep(0);
    setPlaying(true);
  }
  function downloadReport() {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            simulation: true,
            workOrder: '072',
            rack: 'B12',
            server: 'U18',
            task: 'Replace failed SSD',
            target: 'Bay 04',
            warning: 'Incorrect Bay 03 selection corrected',
            result: 'Simulated action verified',
            steps: steps.map((s) => s[1]),
          },
          null,
          2,
        ),
      ],
      { type: 'application/json' },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasksight-simulated-report.json';
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <div className="demo-shell">
      <div className="demo-bar">
        <span>
          <span className="dot" /> SIMULATED PROTOTYPE WORKFLOW
        </span>
        <span>WORK ORDER #072</span>
      </div>
      <div className="demo-body">
        <aside className="work-order">
          <Label>MAINTENANCE / STORAGE</Label>
          <h3>Replace failed SSD</h3>
          <dl>
            <div>
              <dt>Location</dt>
              <dd>Rack B12</dd>
            </div>
            <div>
              <dt>Asset</dt>
              <dd>Server U18</dd>
            </div>
            <div>
              <dt>Target</dt>
              <dd>Drive Bay 04</dd>
            </div>
          </dl>
          <ol className="demo-steps">
            {steps.map((s, i) => (
              <li key={s[0]}>
                <button
                  aria-current={i === step ? 'step' : undefined}
                  onClick={() => {
                    setStep(i);
                    setPlaying(false);
                  }}
                >
                  <span>{i < step ? <Check size={13} /> : `0${i + 1}`}</span>
                  {s[0]}
                  {i === step && <span className="step-active" />}
                </button>
              </li>
            ))}
          </ol>
        </aside>
        <div className={'rack-view ' + (step === 3 ? 'is-warning' : '')}>
          <div className="pov-label">
            <Eye size={15} /> TECHNICIAN VIEW <span>SCHEMATIC SIMULATION</span>
          </div>
          <div className="rack-schematic">
            <div className="rack-title">
              B12 <span>ASSET MAP / FRONT ELEVATION</span>
            </div>
            {['U19', 'U18', 'U17'].map((u) => (
              <div
                key={u}
                className={'server-row ' + (u === 'U18' ? 'target-server' : '')}
              >
                <span className="unit">{u}</span>
                <div className="bay-grid">
                  {[1, 2, 3, 4].map((b) => (
                    <button
                      key={b}
                      aria-label={`${u} drive bay ${b}`}
                      disabled={u !== 'U18'}
                      className={
                        'drive-bay ' +
                        (u === 'U18' && b === 4 && step >= 2
                          ? 'target-bay'
                          : '') +
                        (u === 'U18' && b === 3 && step === 3
                          ? 'wrong-bay'
                          : '')
                      }
                      onClick={() => {
                        setPlaying(false);
                        setStep(b === 4 ? 4 : 3);
                      }}
                    >
                      <i />
                      <span>SSD {String(b).padStart(2, '0')}</span>
                      <em />
                    </button>
                  ))}
                </div>
                <div className="rack-vents" />
              </div>
            ))}
            <div className="rack-base">TASKSIGHT / VISUAL CONTEXT</div>
          </div>
          <div
            className={'verdict ' + (step === 3 ? 'warning' : '')}
            aria-live="polite"
          >
            {step === 3 ? (
              <AlertTriangle size={22} />
            ) : step === 5 ? (
              <FileCheck2 size={22} />
            ) : (
              <ScanLine size={22} />
            )}
            <div>
              <span>{steps[step][1]}</span>
              <strong>{steps[step][2]}</strong>
            </div>
          </div>
          <p className="demo-hint">
            Try selecting a drive bay on U18 to explore the verification states.
          </p>
        </div>
      </div>
      <div className="demo-controls">
        <div>
          <button
            onClick={() => {
              if (step === 5) replay();
              else setPlaying(!playing);
            }}
            aria-label={running ? 'Pause demo' : 'Play demo'}
          >
            {running ? <Pause size={15} /> : <Play size={15} />}{' '}
            {running ? 'Pause' : step === 5 ? 'Play again' : 'Play workflow'}
          </button>
          <button onClick={replay}>
            <RotateCcw size={14} /> Replay
          </button>
        </div>
        {step === 5 ? (
          <button onClick={downloadReport}>
            <Download size={14} /> Sample report
          </button>
        ) : (
          <span>
            0{step + 1} / 06 · {Math.min(step * 3.8, 19).toFixed(0)}s / 23s
          </span>
        )}
      </div>
    </div>
  );
}

function Evidence({ full = false }: { full?: boolean }) {
  return (
    <>
      <div className="evidence-grid">
        <article className="evidence-article">
          <Label>INDUSTRY EVIDENCE / 2026</Label>
          <h3>Procedure failures remain an operational risk.</h3>
          <p>
            Uptime Institute identifies failure to follow established procedures
            as the leading driver of human-error-related outages in 2026.
          </p>
          <Link
            className="text-link"
            href={evidenceUrl}
            target="_blank"
            rel="noreferrer"
          >
            Annual Outage Analysis 2026 <ArrowUpRight size={15} />
          </Link>
          <small>Uptime Institute · May 13, 2026</small>
        </article>
        <article className="evidence-article">
          <Label>INDUSTRY EVIDENCE / COST</Label>
          <div className="evidence-number">1 in 5</div>
          <p>
            Respondents in Uptime’s 2025 Annual Survey reported that their most
            recent major outage cost more than $1 million, as summarized in the
            2026 analysis.
          </p>
          <Link
            className="text-link"
            href={evidenceUrl}
            target="_blank"
            rel="noreferrer"
          >
            Read source & survey context <ArrowUpRight size={15} />
          </Link>
        </article>
      </div>
      <div className="validation-strip">
        <div>
          <Label>TASKSIGHT VALIDATION</Label>
          <h3>Evidence before claims.</h3>
          <p>
            Prototype V0.1 is in development. The interactive workflow is a
            frontend simulation; operational effectiveness has not been
            measured.
          </p>
        </div>
        <div className="validation-status">
          <span>
            Prototype <b>IN DEVELOPMENT</b>
          </span>
          <span>
            Evaluation <b>PLANNED</b>
          </span>
          <span>
            Design partners <b>WELCOME</b>
          </span>
        </div>
      </div>
      {!full && (
        <Link href="/research" className="text-link">
          Inspect our validation protocol <ArrowRight size={16} />
        </Link>
      )}
    </>
  );
}

const modules = [
  [
    'Perception',
    'Understand the physical environment.',
    'Camera context, asset tags, rack position, ports, LEDs and technician interactions.',
    Eye,
  ],
  [
    'Procedure intelligence',
    'Turn procedures into guided workflows.',
    'Work orders, manuals, SOPs, safety instructions and asset history.',
    Layers,
  ],
  [
    'Temporal verification',
    'Understand what happened over time.',
    'Action sequence, before-and-after state, incorrect targets and skipped steps.',
    ScanLine,
  ],
  [
    'Evidence engine',
    'Make physical work auditable.',
    'Timestamps, parts, serial numbers, warnings, media and completion reports.',
    FileCheck2,
  ],
] as const;
function Technology() {
  return (
    <section className="ts-section" id="technology">
      <SectionTitle
        number="04 / ARCHITECTURE DIRECTION"
        title="The intelligence between procedure and execution."
        text="A proposed system built around one question: did the intended action happen correctly?"
      />
      <div className="module-grid">
        {modules.map(([name, title, body, Icon], i) => (
          <article key={name}>
            <div className="module-top">
              <span>0{i + 1}</span>
              <Icon size={24} strokeWidth={1} />
            </div>
            <Label>{name}</Label>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <div className="architecture-line">
        WORK ORDER / SOP <ArrowRight size={15} /> MULTIMODAL CONTEXT{' '}
        <ArrowRight size={15} /> VERIFY <ArrowRight size={15} /> GUIDANCE{' '}
        <ArrowRight size={15} /> EVIDENCE
      </div>
      <p className="footnote">
        Architecture direction · CMMS, ticketing and asset-system integrations
        are planned.
      </p>
    </section>
  );
}

function AssetGraph() {
  const [selected, setSelected] = useState('SSD-4');
  return (
    <div className="asset-platform">
      <div className="asset-tree">
        <Label>ILLUSTRATIVE DIGITAL ASSET / B12</Label>
        <div className="asset-rack">
          RACK B12 <span>3 ASSETS</span>
        </div>
        <div className="asset-server muted">SERVER U17</div>
        <div className="asset-server active">
          SERVER U18 <span>ACTIVE CONTEXT</span>
        </div>
        <div className="asset-parts">
          {['NIC-1', 'NIC-2', 'SSD-1', 'SSD-2', 'SSD-3', 'SSD-4'].map((p) => (
            <button
              key={p}
              onClick={() => setSelected(p)}
              aria-pressed={selected === p}
              className={selected === p ? 'selected' : ''}
            >
              <Layers size={16} />
              {p}
              {p === 'SSD-4' && <span className="amber-dot" />}
            </button>
          ))}
        </div>
        <div className="asset-server muted">SERVER U19</div>
      </div>
      <div className="asset-history">
        <Label>{selected} / SAMPLE MAINTENANCE HISTORY</Label>
        <h3>
          {selected === 'SSD-4'
            ? 'From failed drive to verified replacement.'
            : 'Every component has context.'}
        </h3>
        {(selected === 'SSD-4'
          ? [
              '14:05|Technician identified',
              '14:06|Asset confirmed',
              '14:08|Failed SSD verified',
              '14:09|Replacement serial scanned',
              '14:12|Installation verified',
              '14:14|Job completed',
            ]
          : [
              '14:06|Asset identified',
              '14:07|Component context loaded',
              '14:14|Inspection record attached',
            ]
        ).map((v) => (
          <div className="history-event" key={v}>
            <time>{v.split('|')[0]}</time>
            <span>{v.split('|')[1]}</span>
          </div>
        ))}
        <p className="footnote">
          Illustrative events. No live equipment is connected.
        </p>
      </div>
    </div>
  );
}

function InterestModal() {
  const [prepared, setPrepared] = useState(false);
  return (
    <Dialog onOpenChange={() => setPrepared(false)}>
      <DialogTrigger render={<Button className="pill outline" />}>
        Talk to the founder <ArrowUpRight size={16} />
      </DialogTrigger>
      <DialogContent className="interest-modal">
        <DialogTitle className="text-2xl">Start a conversation.</DialogTitle>
        <DialogDescription>
          Prepare an introduction for TaskSight. Direct delivery is not
          connected yet.
        </DialogDescription>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.currentTarget));
            const blob = new Blob(
              [
                Object.entries(data)
                  .map(([k, v]) => `${k}: ${typeof v === 'string' ? v : v.name}`)
                  .join('\n'),
              ],
              { type: 'text/plain' },
            );
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'tasksight-introduction.txt';
            a.click();
            URL.revokeObjectURL(url);
            setPrepared(true);
          }}
        >
          <div className="form-grid">
            {['Name', 'Email', 'Firm', 'Role', 'Typical stage'].map((x) => (
              <label key={x}>
                {x}
                <input
                  name={x}
                  type={x === 'Email' ? 'email' : 'text'}
                  required={x === 'Email' || x === 'Name'}
                  maxLength={200}
                />
              </label>
            ))}
          </div>
          <label>
            Message (optional)
            <textarea name="Message" maxLength={2000} />
          </label>
          <p className="footnote">
            Your information stays in this browser and is exported only to your
            device. Nothing is sent or stored on our servers.
          </p>
          <Button type="submit" className="pill light">
            Prepare introduction <Download size={14} />
          </Button>
          {prepared && (
            <output className="prepared">
              Introduction downloaded. It has not been sent.
            </output>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
function Contact() {
  return (
    <section className="contact-section">
      <Label>BUILDING / PROTOTYPE STAGE</Label>
      <h2>
        Help us build intelligence
        <br />
        for the physical world.
      </h2>
      <p>
        We’re developing TaskSight’s first verification prototype for
        data-center maintenance. Conversations with operators, investors and
        potential design partners will shape what comes next.
      </p>
      <div className="actions">
        <Link className="pill light" href="/invest">
          View investor brief <ArrowUpRight size={16} />
        </Link>
        <InterestModal />
      </div>
    </section>
  );
}
function Team() {
  return (
    <section className="ts-section team-section" id="team">
      <div>
        <Label>08 / FOUNDER</Label>
        <h2>
          Built around a question
          <br />
          worth answering.
        </h2>
        <p className="lede">
          Can AI help a technician verify each physical step, at the moment it
          matters?
        </p>
      </div>
      <article className="founder-card">
        <div className="founder-monogram">PS</div>
        <h3>Prabhmannat Singh</h3>
        <Label>FOUNDER / TASKSIGHT</Label>
        <p>
          Building the first verification workflow for data-center maintenance,
          with an initial focus on camera-based guidance and evidence.
        </p>
        <Link href="https://github.com/PRABHMANNAT" className="text-link">
          <Github size={16} /> Follow the build <ArrowUpRight size={14} />
        </Link>
      </article>
    </section>
  );
}
function Roadmap() {
  return (
    <div className="roadmap">
      {[
        [
          'NOW',
          'A working verification loop',
          'Phone / body-camera prototype',
          'Synthetic rack environment',
          'Asset recognition & action verification',
        ],
        [
          'NEXT',
          'Real technician workflows',
          'Existing smart-glass integration',
          'SOP ingestion & reporting',
          'Design-partner evaluation',
        ],
        [
          'LATER',
          'Physical operations platform',
          'CMMS & asset-system integrations',
          'Remote expert assistance',
          'Historical asset intelligence',
        ],
      ].map(([phase, title, ...items]) => (
        <article key={phase}>
          <Label>{phase} / PLANNED WORK</Label>
          <h3>{title}</h3>
          <ul>
            {items.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function Landing() {
  return (
    <Shell>
      <section className="ts-hero" id="product">
        <div className="hero-copy-new">
          <Label>
            <span className="dot" /> PHYSICAL AI FOR MISSION-CRITICAL OPERATIONS
          </Label>
          <h1>
            AI that verifies
            <br />
            <span>physical work.</span>
          </h1>
          <p>
            We’re building AI that watches data-center maintenance, guides each
            procedure, catches incorrect actions, and creates an auditable
            record of the job.
          </p>
          <div className="actions">
            <Link className="pill light" href="#demo">
              <Play size={13} fill="currentColor" /> Watch the prototype{' '}
              <ArrowRight size={15} />
            </Link>
            <Link className="pill outline" href="/invest">
              Investor brief <ArrowUpRight size={15} />
            </Link>
          </div>
          <p className="hero-stage">
            Starting with data-center maintenance · Prototype in development
          </p>
        </div>
        <HeroScene />
      </section>
      <section className="ts-section" id="demo">
        <SectionTitle
          number="01 / THE VERIFICATION WORKFLOW"
          title="It doesn’t just tell you what to do. It checks that you did it."
          text="One work order. Six steps. A wrong action caught before the next step. Explore the intended experience in this interactive simulation."
        />
        <VerificationDemo />
      </section>
      <section className="ts-section" id="problem">
        <SectionTitle
          number="02 / THE PROBLEM"
          title="One wrong action can become an expensive incident."
          text="Mission-critical maintenance relies on procedures, work orders, documentation and technician experience. TaskSight is being designed to add a verification layer between the procedure and the physical action."
        />
        <div className="failure-chain">
          {[
            'Wrong asset',
            'Wrong port / component',
            'Service interruption',
            'Incident response',
            'Downtime',
          ].map((x, i) => (
            <div key={x}>
              <span>0{i + 1}</span>
              <strong>{x}</strong>
              {i < 4 && <ArrowRight size={18} />}
            </div>
          ))}
        </div>
        <Evidence />
      </section>
      <section className="ts-section loop-section">
        <SectionTitle
          number="03 / THE PHYSICAL AI LOOP"
          title="From perception to verified action."
          text="The intended loop continues beyond a recommendation: observe the action, verify the result, and record the evidence."
        />
        <div className="loop-grid">
          {[
            ['See', 'Camera and sensor context.'],
            ['Understand', 'Asset, work order and environment.'],
            ['Guide', 'Surface the correct next action.'],
            ['Human acts', 'Technician executes the task.'],
            ['Verify', 'Check the action and resulting state.'],
            ['Record', 'Create structured evidence.'],
          ].map(([a, b], i) => (
            <article key={a} style={{ animationDelay: `${i * 0.5}s` }}>
              <span className="loop-node">0{i + 1}</span>
              <h3>{a}</h3>
              <p>{b}</p>
            </article>
          ))}
        </div>
      </section>
      <Technology />
      <section className="ts-section">
        <SectionTitle
          number="05 / THE FIRST VERTICAL"
          title="Start where every step matters."
        />
        <div className="reasons">
          {[
            [
              'High consequence',
              'An incorrect action can interrupt a critical service.',
            ],
            [
              'Structured environment',
              'Racks, labels and ports provide identifiable physical context.',
            ],
            [
              'Repeatable procedures',
              'Defined SOPs offer a starting point for verification.',
            ],
            [
              'Evidence-heavy',
              'Who changed what, when, on which asset—and was the process followed?',
            ],
          ].map(([a, b]) => (
            <article key={a}>
              <h3>{a}</h3>
              <p>{b}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="ts-section" id="vision">
        <SectionTitle
          number="06 / PLATFORM VISION"
          title="Every physical asset becomes machine-understandable."
          text="The long-term goal: a persistent maintenance history connected to each rack, server and component. Select a component to explore the illustrative asset graph."
        />
        <AssetGraph />
      </section>
      <section className="ts-section">
        <SectionTitle
          number="07 / THE ROAD AHEAD"
          title="Today, data centers. Tomorrow, physical operations."
          text="Start in one structured, high-consequence environment. Earn the right to expand through reliable verification and measurable value."
        />
        <div className="future-nodes">
          <strong>Data centers</strong>
          <ArrowRight size={18} />
          <span>Telecom</span>
          <span>Energy</span>
          <span>Manufacturing</span>
          <span>Industrial maintenance</span>
        </div>
        <Roadmap />
      </section>
      <Team />
      <Contact />
    </Shell>
  );
}

export function DemoPage() {
  return (
    <Shell>
      <section className="ts-section page-intro">
        <SectionTitle
          number="INTERACTIVE DEMO / SIMULATION"
          title="Watch the verification loop."
          text="Play the 23-second workflow, pause at any step, or select a drive bay. This deterministic demonstration does not process camera footage or run an AI model."
        />
        <VerificationDemo />
        <Link href="/research" className="text-link below-link">
          What still needs to be validated <ArrowRight size={16} />
        </Link>
      </section>
      <Contact />
    </Shell>
  );
}

export function ResearchPage() {
  return (
    <Shell>
      <section className="ts-section page-intro">
        <SectionTitle
          number="RESEARCH / EVIDENCE"
          title="A clear line between thesis and proof."
          text="Industry research explains the problem. TaskSight experiments will determine whether our approach works."
        />
        <Evidence full />
        <SectionTitle
          number="VALIDATION PROTOCOL / PLANNED"
          title="Measure the loop, including its failures."
          text="The proposed first evaluation includes 100+ scripted actions in a mock rack: correct workflows, wrong assets, wrong ports, incorrect ordering and skipped steps. No trials have been reported yet."
        />
        <div className="metric-list">
          {evaluationDimensions.map((x) => (
            <div key={x}>
              <span>{x}</span>
              <b>NOT YET MEASURED</b>
            </div>
          ))}
        </div>
        <div className="protocol-note">
          <h3>Evaluation design</h3>
          <p>
            Use separately labeled recordings for development and evaluation.
            Record the expected action, model verdict and timestamp for each
            event. Report sample counts, missed errors, false warnings and
            latency distributions, with limitations for lighting, occlusion and
            equipment variation.
          </p>
        </div>
        <SectionTitle
          number="EXPERIMENT LOG"
          title="Results will be inspectable."
        />
        <div className="experiment-log">
          {experiments.length === 0 ? (
            <>
              <FileCheck2 size={32} strokeWidth={1} />
              <h3>No completed experiments published.</h3>
              <p>
                Future entries will include experiment, date, setup, hypothesis,
                sample size, result, limitations and artifacts.
              </p>
            </>
          ) : (
            experiments.map((e) => (
              <article key={e.id}>
                <h3>{e.id}</h3>
                <p>
                  {e.date} · {e.sampleSize} samples
                </p>
                <p>{e.setup}</p>
                <p>{e.hypothesis}</p>
                <p>{e.result}</p>
                <p>{e.limitations}</p>
                {e.artifacts.map((a) => (
                  <Link key={a} href={a}>
                    View artifact
                  </Link>
                ))}
              </article>
            ))
          )}
        </div>
      </section>
    </Shell>
  );
}

export function InvestorPage() {
  return (
    <Shell>
      <section className="ts-section page-intro investor-intro">
        <Label>TASKSIGHT / INVESTOR BRIEF</Label>
        <h1>
          Intelligence that follows
          <br />
          through.
        </h1>
        <p className="lede">
          We build AI that verifies physical work, starting with data-center
          maintenance.
        </p>
        <div className="brief-meta">
          <span>STAGE: PROTOTYPE IN DEVELOPMENT</span>
          <span>WEDGE: DATA-CENTER MAINTENANCE</span>
        </div>
        <div className="actions">
          <Link href="/demo" className="pill light">
            Explore the simulated demo <ArrowRight size={15} />
          </Link>
          <button className="pill outline" onClick={() => window.print()}>
            Print brief <Download size={15} />
          </button>
        </div>
      </section>
      <section className="ts-section brief-grid">
        {[
          [
            '01 / Problem',
            'Procedures leave an execution gap.',
            'Technicians work across SOPs, tickets and physical equipment. The thesis is that observing and verifying the action can catch mistakes that an instruction alone cannot.',
          ],
          [
            '02 / Why now — thesis',
            'Test the visual intelligence layer.',
            'Multimodal perception and existing camera interfaces provide a route to prototype the workflow. Reliability under real maintenance conditions remains an open technical question.',
          ],
          [
            '03 / Product',
            'See. Guide. Verify. Record.',
            'A work order provides context. Camera observations identify the asset and action. A proposed verification engine checks the sequence and captures evidence for a maintenance report.',
          ],
          [
            '04 / Current proof',
            'A simulated experience, with an evaluation plan.',
            'The frontend demonstrates the desired workflow. No field accuracy, latency, customer pilots or operational ROI has been established. Review the research page for planned measurements.',
          ],
          [
            '05 / Market thesis',
            'One focused entry point.',
            'Initial users are data-center maintenance technicians. Likely buyers include operations and maintenance leaders; purchasing ownership and willingness to pay need customer discovery.',
          ],
          [
            '06 / Alternatives to evaluate',
            'Fit into the existing workflow.',
            'The discovery process will compare TaskSight with SOP checklists, CMMS workflows, remote expert support and AR work instructions. Differentiation must be proven through action verification and useful evidence.',
          ],
          [
            '07 / Business model — hypothesis',
            'Software per technician.',
            'A possible model combines technician subscriptions with enterprise integration, deployment and support. Pricing and commercial demand are not yet validated.',
          ],
          [
            '08 / Key risks',
            'Reliability must earn trust.',
            'Occlusion, similar-looking components, camera placement, latency and false warnings may limit performance. Privacy, evidence retention and integration effort also require operator feedback.',
          ],
          [
            '09 / Milestones',
            'From controlled tasks to real workflows.',
            'First demonstrate repeatable detection of wrong targets in a mock rack. Then evaluate held-out recordings, technician usability and reporting before proposing supervised field trials.',
          ],
          [
            '10 / Funding & use of funds',
            'Define the next evidence milestone.',
            'No funding round, target amount or commitments are announced. A future budget would prioritize verification engineering, evaluation equipment and operator-led validation.',
          ],
        ].map(([n, h, p]) => (
          <article key={n}>
            <Label>{n}</Label>
            <h3>{h}</h3>
            <p>{p}</p>
          </article>
        ))}
      </section>
      <Technology />
      <section className="ts-section">
        <SectionTitle
          number="MILESTONES"
          title="A deliberate path to field evidence."
        />
        <Roadmap />
      </section>
      <Team />
      <Contact />
    </Shell>
  );
}
