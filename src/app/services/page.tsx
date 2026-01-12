// File path: src/app/services/page.tsx
// Role: Services listing page showcasing Montemflumen's core offerings
// Connected files: constants.ts (copy), Section/Card components (UI)
// UI patterns: LP-06 Bento Grid, DASH-01 info cards
// Edge cases: Static page, no dynamic data required
// Reference: PIT-1 (Suspense), ENT-PERF-4.1 (static generation)

import { Metadata } from 'next';
import Link from 'next/link';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SERVICES_COPY, SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Services | ${SITE_CONFIG.name}`,
  description: SERVICES_COPY.hero.subtitle,
  openGraph: {
    title: `Services | ${SITE_CONFIG.name}`,
    description: SERVICES_COPY.hero.subtitle,
  },
};

// Service icons as SVG components for better performance
const icons = {
  build: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
  ),
  operate: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
    </svg>
  ),
  scale: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
    </svg>
  ),
  learn: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  ),
};

const serviceDetails = [
  {
    id: 'build',
    icon: icons.build,
    title: 'Build',
    subtitle: 'From Zero to Product',
    description: 'We transform your vision into production-ready software. Our engineering teams specialize in building scalable, maintainable systems from the ground up.',
    features: [
      'Full-stack web and mobile applications',
      'Cloud-native architecture design',
      'API design and development',
      'Database modeling and optimization',
      'CI/CD pipeline setup',
      'Security-first development practices',
    ],
    cta: 'Start Building',
  },
  {
    id: 'operate',
    icon: icons.operate,
    title: 'Operate',
    subtitle: 'Keep Systems Running',
    description: 'We ensure your systems run reliably 24/7. Our operations team provides comprehensive monitoring, incident response, and continuous improvement.',
    features: [
      'Infrastructure management (AWS, GCP, Azure)',
      '24/7 monitoring and alerting',
      'Incident response and resolution',
      'Performance optimization',
      'Cost optimization and FinOps',
      'Compliance and security audits',
    ],
    cta: 'Explore Operations',
  },
  {
    id: 'scale',
    icon: icons.scale,
    title: 'Scale',
    subtitle: 'Grow Without Limits',
    description: 'We architect systems that scale seamlessly with your business. From handling traffic spikes to expanding globally, we build for growth.',
    features: [
      'Horizontal and vertical scaling strategies',
      'Multi-region deployment',
      'Load balancing and traffic management',
      'Database sharding and replication',
      'Microservices architecture',
      'Performance benchmarking',
    ],
    cta: 'Plan for Scale',
  },
  {
    id: 'learn',
    icon: icons.learn,
    title: 'Learn',
    subtitle: 'Build Internal Capability',
    description: 'We transfer knowledge to your team through hands-on training, workshops, and embedded engineering partnerships.',
    features: [
      'Technical workshops and bootcamps',
      'Pair programming sessions',
      'Code review and mentorship',
      'Architecture design reviews',
      'Best practices documentation',
      'Team assessment and roadmaps',
    ],
    cta: 'Start Learning',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Discovery',
    description: 'We dive deep into your business context, technical landscape, and goals to understand what success looks like.',
  },
  {
    step: '02',
    title: 'Strategy',
    description: 'We design a roadmap with clear milestones, technology choices, and risk mitigation strategies.',
  },
  {
    step: '03',
    title: 'Execution',
    description: 'Our teams work in tight iterations, delivering working software early and often with continuous feedback.',
  },
  {
    step: '04',
    title: 'Evolution',
    description: 'We optimize, document, and transfer knowledge to ensure long-term success and independence.',
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Section className="pt-32 pb-16" background="muted">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {SERVICES_COPY.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {SERVICES_COPY.hero.subtitle}
          </p>
        </div>
      </Section>

      {/* Services Grid */}
      <Section className="py-24">
        <SectionHeader
          title="What We Do"
          subtitle="Four pillars of engineering excellence that cover the full lifecycle of software systems."
          centered
        />
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {serviceDetails.map((service) => (
            <Card key={service.id} variant="elevated" className="group">
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  {service.icon}
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{service.subtitle}</span>
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                  {service.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Process Section */}
      <Section className="py-24" background="muted">
        <SectionHeader
          title="How We Work"
          subtitle="A proven methodology refined over years of delivering complex engineering projects."
          centered
        />
        <div className="grid md:grid-cols-4 gap-8 mt-16">
          {processSteps.map((step, idx) => (
            <div key={step.step} className="relative">
              {idx < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-border -translate-x-1/2" />
              )}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Technologies Section */}
      <Section className="py-24">
        <SectionHeader
          title="Technologies We Love"
          subtitle="We're language and platform agnostic, but here's what we reach for most often."
          centered
        />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-16">
          {['TypeScript', 'React', 'Node.js', 'Python', 'Go', 'Rust', 'AWS', 'GCP', 'Kubernetes', 'PostgreSQL', 'Redis', 'GraphQL'].map((tech) => (
            <div
              key={tech}
              className="p-4 rounded-xl border bg-card text-center hover:border-primary hover:shadow-lg transition-all duration-300"
            >
              <span className="font-medium">{tech}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-24" background="primary">
        <div className="text-center max-w-3xl mx-auto text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Something Great?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Let&apos;s discuss your project and explore how we can help you achieve your engineering goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Start a Conversation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/work">View Our Work</Link>
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
