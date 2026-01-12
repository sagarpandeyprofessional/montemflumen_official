// File path: src/app/careers/page.tsx
// Role: Careers page showcasing job openings and company culture
// Connected files: constants.ts (copy), Section/Card components (UI)
// UI patterns: CORP-02 Startup Modern, LP-01 Hero Stack
// Edge cases: Empty job listings state, external application links
// Reference: ENT-PERF-4.1 (static generation)

import { Metadata } from 'next';
import Link from 'next/link';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { CAREERS_COPY, SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Careers | ${SITE_CONFIG.name}`,
  description: CAREERS_COPY.hero.subtitle,
  openGraph: {
    title: `Careers | ${SITE_CONFIG.name}`,
    description: CAREERS_COPY.hero.subtitle,
  },
};

// Job listings - in production, this would come from a CMS or API
const jobs = [
  {
    id: 'senior-fullstack-engineer',
    title: 'Senior Full-Stack Engineer',
    location: 'Remote / San Francisco',
    type: 'Full-time',
    department: 'Engineering',
    description: 'Build and scale complex web applications for our clients. You\'ll work across the entire stack, from database design to frontend polish.',
    requirements: [
      '5+ years of professional software development experience',
      'Strong proficiency in TypeScript, React, and Node.js',
      'Experience with cloud platforms (AWS, GCP, or Azure)',
      'Excellent communication and collaboration skills',
    ],
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    location: 'Remote',
    type: 'Full-time',
    department: 'Operations',
    description: 'Design, build, and maintain our infrastructure and deployment pipelines. Help our clients achieve operational excellence.',
    requirements: [
      '3+ years of experience in DevOps or SRE roles',
      'Strong experience with Kubernetes and container orchestration',
      'Proficiency with infrastructure as code (Terraform, Pulumi)',
      'Experience with CI/CD pipelines and GitOps practices',
    ],
  },
  {
    id: 'technical-project-manager',
    title: 'Technical Project Manager',
    location: 'San Francisco',
    type: 'Full-time',
    department: 'Delivery',
    description: 'Lead complex engineering projects from inception to delivery. Bridge the gap between technical teams and client stakeholders.',
    requirements: [
      '4+ years of technical project management experience',
      'Strong understanding of software development lifecycle',
      'Excellent stakeholder management skills',
      'Experience with agile methodologies',
    ],
  },
];

const benefits = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    title: 'Remote-First',
    description: 'Work from anywhere. We\'re distributed across time zones and value async communication.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: 'Learning Budget',
    description: '$2,000 annual budget for conferences, courses, books, and certifications.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: 'Health & Wellness',
    description: 'Comprehensive health insurance, mental health support, and wellness stipend.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Flexible Hours',
    description: 'We care about outcomes, not hours. Work when you\'re most productive.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
    title: 'Equipment Budget',
    description: 'Top-of-the-line equipment. We\'ll get you what you need to do your best work.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
      </svg>
    ),
    title: 'Generous PTO',
    description: 'Unlimited PTO with minimum requirements. We encourage taking real breaks.',
  },
];

const values = [
  {
    title: 'Craft Over Speed',
    description: 'We believe in doing things right. Quality work takes time, and we\'re not interested in cutting corners.',
  },
  {
    title: 'Continuous Learning',
    description: 'The best engineers never stop learning. We invest heavily in growth and knowledge sharing.',
  },
  {
    title: 'Transparent Communication',
    description: 'We default to openness. Clear communication builds trust and enables better collaboration.',
  },
  {
    title: 'Client Partnership',
    description: 'We treat client problems as our own. Success means building lasting relationships, not just shipping code.',
  },
];

export default function CareersPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Section className="pt-32 pb-16" background="muted">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {CAREERS_COPY.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {CAREERS_COPY.hero.subtitle}
          </p>
          <Button asChild size="lg">
            <a href="#openings">View Open Positions</a>
          </Button>
        </div>
      </Section>

      {/* Values Section */}
      <Section className="py-24">
        <SectionHeader
          title="What We Value"
          subtitle="The principles that guide how we work and who we hire."
          centered
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {values.map((value) => (
            <div key={value.title} className="text-center">
              <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
              <p className="text-muted-foreground text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Benefits Section */}
      <Section className="py-24" background="muted">
        <SectionHeader
          title="Benefits & Perks"
          subtitle="We take care of our team so they can focus on doing their best work."
          centered
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
          {benefits.map((benefit) => (
            <Card key={benefit.title}>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Open Positions Section */}
      <Section className="py-24" id="openings">
        <SectionHeader
          title="Open Positions"
          subtitle="Join our team and help build the future of software engineering."
          centered
        />
        <div className="max-w-4xl mx-auto mt-16">
          {jobs.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">No open positions right now</h3>
              <p className="text-muted-foreground mb-6">
                We&apos;re always looking for talented people. Send us your resume!
              </p>
              <Button asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.map((job) => (
                <Card key={job.id} variant="elevated" className="group">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <Tag variant="outline" size="sm">{job.department}</Tag>
                          <span className="text-muted-foreground text-sm">{job.location}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground text-sm">{job.type}</span>
                        </div>
                      </div>
                      <Button asChild variant="outline" className="shrink-0">
                        <Link href={`/contact?type=careers&position=${encodeURIComponent(job.title)}`}>
                          Apply Now
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Requirements:</h4>
                      <ul className="space-y-1">
                        {job.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-24" background="primary">
        <div className="text-center max-w-3xl mx-auto text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Don&apos;t See the Right Role?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            We&apos;re always interested in meeting talented engineers and operators.
            Send us your resume and tell us how you&apos;d like to contribute.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Send Your Resume</Link>
          </Button>
        </div>
      </Section>
    </main>
  );
}
