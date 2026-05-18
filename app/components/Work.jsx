'use client'

import { motion } from 'motion/react'
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react'
import { OrbitProgress } from 'react-loading-indicators'
import { Button } from '../components/ui/button'
import ScrollRail from './ScrollRail'

const projects = [
  {
    title: 'SendWise AI',
    event: 'Nov 2025 – Present',
    role: 'Builder',
    description:
      'Multi-tenant B2B SaaS platform delivering AI-powered chatbot and email automation for customer communication workflows. Built on the Next.js 15 app router with real time messaging via a self hosted Socket.IO server, Clerk authentication with organisation level multi-tenancy, Stripe billing integration, and Prisma ORM on Neon PostgreSQL. Features configurable response routing, automation logic layers, and a live chat widget embeddable into client websites.',
    stack: ['Next.js', 'React', 'Node.js', 'TypeScript', 'Clerk', 'Stripe', 'PostgreSQL', 'Socket.IO', 'OpenAI API', 'Prisma'],
    github: 'https://github.com/ilijachrchev/ChatBot-AI',
    live: 'https://www.sendwiseai.com/',
    type: 'SaaS',
    featured: true,
    inDevelopment: true,
  },
  {
    title: 'AI Detective',
    event: 'DragonHack · April 2026',
    role: 'Builder',
    description:
      'Forensic investigation assistant built at DragonHack 2026. Combines an OAK-D Pro Wide camera for spatial scene scanning with real time depth mapping, Gemini API for AI driven questioning and probability weighted evidence analysis, and a frame annotation pipeline for documenting and timestamping findings. Evidence integrity is verified through Flare blockchain hashing. The backend streams AI analysis to the React frontend via server sent events, producing a fully live investigation interface.',
    stack: ['Python', 'React', 'FastAPI', 'Gemini API', 'DepthAI', 'Flare Blockchain'],
    github: 'https://github.com/FT1E/AI-Detective-K',
    live: null,
    type: 'Hackathon',
    featured: true,
  },
  {
    title: 'Underwater Visibility Predictor',
    event: 'FAMNIT Hackathon · May 2026 · 2nd Place',
    role: 'ML Engineer & System Developer',
    description:
      'End-to-end underwater visibility prediction system for a marine reef site, placing 2nd at FAMNIT Hackathon 2026. Trained an XGBoost regressor over 22 features spanning wave physics, meteorological data, astronomical conditions and cyclical time encodings, alongside two CLIP based image scorers — a LAION pretrained finetune against semantic text anchors and a frozen encoder regression head — on 108 hand labeled reef frames from the OBSEA Mediterranean observatory, matched per image to environmental conditions via closest hour lookup. A full sensor station was designed from scratch (ESP32 surface buoy with ultrasonic sensor, DFRobot turbidity and salinity sensors at 18m, concrete seabed anchor) and a physically motivated data simulator generates synthetic training data covering wave driven sediment impulses and river plume events, validated via KS test. Seven Copernicus Marine satellite datasets are integrated with auto pixel selection for coastal land masking, and Firebase persists fetched data for continuous model retraining. Active deployment with YouR Sea includes sensor station construction, EU biodiversity funding and a 3h advance Telegram bot for optimal window alerts.',
    stack: ['Python', 'JavaScript', 'FastAPI', 'React', 'XGBoost', 'PyTorch', 'Firebase', 'Copernicus Marine API'],
    github: 'https://github.com/VukIG/famnit_hackathon2026',
    live: null,
    type: 'Hackathon',
    featured: true,
  },
  {
    title: 'ReachLog',
    event: 'April 2026 – Present',
    role: 'Builder',
    description:
      'Job outreach tracker with aggregate skill gap analytics, a multi-platform internship scraper, a Chrome extension for LinkedIn outreach automation, and an email parser for tracking application threads. Designed to surface patterns across outreach campaigns and highlight which skills appear consistently across job listings but are absent from your own profile.',
    stack: ['C#', '.NET', 'TypeScript', 'Angular', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/ilijachrchev/reachlog',
    live: null,
    type: 'Full-Stack',
    featured: false,
    inDevelopment: true,
  },
  {
    title: 'Personal Portfolio',
    event: 'Oct 2025',
    role: 'Designer & Developer',
    description:
      'Polished, responsive portfolio with adaptive theming and a reusable component architecture. Frosted-glass navbar, smooth section navigation, and dark mode support throughout.',
    stack: ['Next.js', 'React', 'TailwindCSS'],
    github: 'https://github.com/ilijachrchev/portfolio',
    live: 'https://ilijachrchev.com',
    type: 'Web App',
    featured: false,
  },
  {
    title: 'Port Optimization with AI',
    event: 'GDG Hackathon · May 2025',
    role: 'Team Lead, Backend & System Integrator',
    description:
      'Real time port operations system modeling berth allocation, vessel queuing and traffic flow under realistic operational constraints. Led a team of four to design and deliver the full system; built the scheduling and analysis layer that adapts dynamically to vessel arrivals and changing external conditions to improve operational efficiency and reliability.',
    stack: ['C#', '.NET', 'Python', 'React', 'SQL', 'Unity'],
    github: 'https://github.com/ilijachrchev/Full-App-Hackathon.git',
    live: null,
    type: 'Hackathon',
    featured: false,
  },
  {
    title: 'NFT Wash Trading Detection',
    event: 'Dec 2025 – Feb 2026',
    role: 'Builder',
    description:
      'Graph based system for detecting wash trading behaviour in NFT markets. Evaluates sequential, parallel and distributed processing strategies on real transaction data to identify coordinated self-dealing patterns at scale, comparing throughput and accuracy characteristics across each processing model.',
    stack: ['Java', 'MPJ'],
    github: 'https://github.com/ilijachrchev/NFTWashTradingRecognition',
    live: null,
    type: 'Research',
    featured: false,
  },
]

function ProjectActions({ project }) {
  if (!project.github && !project.live) {
    return (
      <Button variant="outline" disabled className="w-full">
        Coming Soon
      </Button>
    )
  }

  if (project.github && project.live) {
    return (
      <div className="grid grid-cols-2 gap-2">
        <Button
          asChild
          variant="outline"
          className="group hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <Github size={16} />
            GitHub
          </a>
        </Button>
        <Button
          asChild
          className="bg-primary text-primary-foreground hover:opacity-90"
        >
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            Visit
            <ArrowUpRight size={14} />
          </a>
        </Button>
      </div>
    )
  }

  if (project.github) {
    return (
      <Button
        asChild
        variant="outline"
        className="group w-full hover:border-primary hover:bg-primary hover:text-primary-foreground"
      >
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2"
        >
          <Github size={16} />
          View on GitHub
          <ExternalLink
            size={14}
            className="ml-auto transition-transform group-hover:translate-x-1"
          />
        </a>
      </Button>
    )
  }

  return (
    <Button asChild className="w-full bg-primary text-primary-foreground hover:opacity-90">
      <a
        href={project.live}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2"
      >
        Visit site
        <ArrowUpRight size={14} />
      </a>
    </Button>
  )
}

export default function Work() {
  return (
    <motion.section
      id="work"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1 }}
      className="w-full scroll-m-20 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center font-display text-4xl text-foreground md:text-5xl"
        >
          Featured{' '}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Projects
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-5 mb-12 max-w-2xl text-center font-display text-muted-foreground"
        >
          Showcasing innovative solutions and technical expertise through hands-on projects.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mx-auto max-w-7xl"
      >
        <ScrollRail ariaLabel="Featured projects, scroll horizontally">
          {projects.map((project) => (
            <article
              key={project.title}
              data-rail-item
              className={[
                'flex w-[85vw] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-card shadow-lg transition-all duration-300',
                'sm:w-[60vw] md:w-[400px] lg:w-[420px]',
                project.featured ? 'border-2 border-primary/40' : 'border border-border',
                'hover:-translate-y-1 hover:shadow-xl',
              ].join(' ')}
            >
              <div className="h-2 bg-gradient-to-r from-primary to-accent" />

              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                  <span
                    className={[
                      'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
                      project.featured
                        ? 'border border-primary/20 bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground',
                    ].join(' ')}
                  >
                    {project.type}
                  </span>

                  {project.inDevelopment ? (
                    <OrbitProgress color="#ffec91" size="small" text="" textColor="" speedPlus="-5" />
                  ) : project.featured ? (
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-xs font-semibold text-transparent">
                      Featured
                    </span>
                  ) : null}
                </div>

                <div>
                  <h3 className="mb-1 font-display text-xl text-foreground">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.event}</p>
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <span className="font-semibold text-foreground">Role:</span>
                  <span className="text-muted-foreground">{project.role}</span>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-2">
                  <ProjectActions project={project} />
                </div>
              </div>
            </article>
          ))}
        </ScrollRail>
      </motion.div>
    </motion.section>
  )
}