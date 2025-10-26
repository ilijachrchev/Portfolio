'use client';

import React, { useEffect, useRef } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import {motion} from "motion/react"
import { OrbitProgress } from 'react-loading-indicators';


const projects = [
  {
    title: 'Port Optimization with AI',
    event: 'GDG Hackathon 2025',
    role: 'Team Lead, Backend & Database, System Integrator',
    description:
      'Intelligent port management system addressing berth allocation, vessel queuing, and port optimization using AI predictions. Built a comprehensive solution integrating multiple technologies.',
    stack: ['C# .NET', 'MySQL', 'React', 'Python', 'Unity', 'AI'],
    github: 'https://github.com/ilijachrchev/Full-App-Hackathon.git',
    type: 'Hackathon',
    featured: true,
  },
  {
    title: 'Personal Portfolio Website',
    event: 'Side Project',
    role: 'Designer & Developer',
    description:
      "Responsie portfolio built with Next.js and Tailwind 4 featuring a frosted glass nabar,smooth section naigation, dark mode and reusable card components.",
    stack: ['React', 'Next.js', 'TailwindCSS'],
    github: 'https://github.com/ilijachrchev/Full-App-Hackathon.git',
    type: 'Web App',
    featured: true,
  },
  {
    title: 'SendWise-AI',
    event: 'In Development– SaaS Chatbot Platform',
    role: 'Builder',
    description:
      'Developing an intelligent email automation platform that uses AI to craft, optimize, and schedule marketing campaigns. Focused on enhancing personalization and efficiency for small businesses.',
    stack: ['Next.js', 'React', 'Clerk Auth', 'Stripe', 'PostrgreSQL', 'OpenAI API'],
    github: null,
    type: 'SaaS',
    featured: false,
  },
];

const Work = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-6');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 }
    );

    const items = sectionRef.current?.querySelectorAll('[data-reveal]');
    items?.forEach(el => {
      el.classList.add('opacity-0', 'translate-y-6');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
     transition={{ duration: 1 }} 
    id="work" ref={sectionRef} className="w-full px-[12%] py-16 scroll-m-20">


      <motion.h2
      initial={{ y: -20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}
      className="text-center text-5xl font-Ovo">
        Featured{' '}
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text">
          Projects
        </span>
      </motion.h2>

      <motion.p
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.5 }}
      className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo text-muted-foreground">
        Showcasing innovative solutions and technical expertise through hands-on projects.
      </motion.p>

      <motion.div
      initial={{ opacity: 0 }} whileInView={{  opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
          whileHover={{ scale: 1.05}} transition={{ duration: 0.3 }}
            key={index}
            data-reveal
            style={{ transitionDelay: `${index * 100}ms` }}
            className={[
              'bg-card rounded-2xl overflow-hidden shadow-lg transition-all duration-300 transform-gpu will-change-transform',
              project.featured ? 'border-3 border-blue-700' : 'border border-blue-300',
              'hover:-translate-y-1 hover:shadow-xl',
            ].join(' ')}
          >
            <div className="h-2 bg-gradient-to-r from-primary to-accent" />

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span
                  className={[
                    'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                    project.featured
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'bg-muted text-muted-foreground',
                  ].join(' ')}
                >
                  {project.type}
                </span>
                {index === 2 ? (
                  <OrbitProgress
                    color="#ffec91"
                    size="small"
                    text=""
                    textColor=""
                    speedPlus="-5"
                  />
                ) : project.featured ? (
                    <span className="text-xs font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Featured
                  </span>
                ) : null }

              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.event}</p>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-foreground"><b>Role:</b></span>
                <span className="text-muted-foreground ">{project.role}</span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-muted rounded-md text-xs font-medium text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.github ? (
                <Button
                  asChild
                  variant="outline"
                  className="w-full hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <Github size={16} />
                    View on GitHub
                    <ExternalLink size={14} className="ml-auto transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              ) : (
                <Button variant="outline" disabled className="w-full">
                  Coming Soon
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Work;
