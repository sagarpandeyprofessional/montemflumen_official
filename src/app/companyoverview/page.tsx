// File path: src/app/companyoverview/page.tsx
// Purpose: Premium Company Overview page with custom sections, team layout, and awards

import { Metadata } from 'next';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Company Overview | ${SITE_CONFIG.name}`,
  description: 'Company Overview & Growth document — Building English-first platforms that help foreigners thrive in Korea.',
};

// =============================================================================
// DATA: Team Members
// =============================================================================

const CEO = {
  name: 'Sagar Pandey',
  role: 'Founder / CEO',
  image: '/images/team/sagar.png',
  quote: 'Our mission is to make Korea easier to navigate for global residents and help Korean businesses operate at an international standard.',
};

const ENGINEERING_TEAM = [
  { name: 'Firdavs', role: 'Senior Developer & Team Leader', image: '/images/team/fred.png' },
  { name: 'Sahil Gevariya', role: 'Full Stack Developer', image: '/images/team/sahil.png' },
  { name: 'John Paul', role: 'AI Engineer & Python Developer', image: '/images/team/paul.png' },
  { name: 'Kate Chernetskaya', role: 'Electrical Engineer', image: '/images/team/kate.png' },
];

const ADVISORS = [
  { name: 'Daniel Fellegger', role: 'Advisor', image: '/images/team/daniel.png' },
  { name: 'Joon M. Kim', role: 'Special Advisor', image: '/images/team/joon.png' },
  { name: 'Winner Apata', role: 'Advisor', image: '/images/team/winner.png' },
  { name: 'Niranjan Dahal', role: 'Advisor', image: '/images/team/niranjan.png' },
];

// =============================================================================
// DATA: Services
// =============================================================================

const SERVICES = [
  {
    id: 1,
    title: 'KoreaEasy (Keasy)',
    subtitle: 'Daily-life operating system',
    features: [
      'Discovery: events, community, guides',
      'Action: connect/services, jobs, marketplace',
      'Retention: repeat value, identity, trust',
    ],
    quote: 'One ecosystem for everything foreigners need to thrive in Korea.',
    image: '/images/case-studies/keasylogo.svg',
  },
  {
    id: 2,
    title: 'Keasy Marketplace',
    subtitle: 'Trust + repeat engagement',
    features: [
      'Verified transactions and trusted sellers',
      'Safe payment escrow system',
      'Community-driven commerce',
    ],
    quote: 'Commerce that builds community trust.',
    image: '/images/case-studies/keasy-marketplace.svg',
  },
  {
    id: 3,
    title: 'Digital Application  with Guides',
    subtitle: 'Error prevention for high-stakes systems',
    features: [
      'Step-by-step checklists',
      'Document requirements clearly listed',
      'Common error prevention tips',
    ],
    quote: 'Reduce repeated visits, delays, and uncertainty.',
    image: '/images/case-studies/sgp-application.svg',
  },
];

// =============================================================================
// DATA: Awards
// =============================================================================

const AWARDS = [
  {
    year: '2024',
    title: 'Korea Entrepreneurship',
    subtitle: 'Foundation(U300+)',
    image: '/images/certifications/oasis1.svg',
  },
  {
    year: '2024',
    title: 'Korea Invention',
    subtitle: 'Promotion Association',
    image: '/images/certifications/oasis1.svg',
  },
  {
    year: '2025',
    title: 'Korea Invention',
    subtitle: 'Promotion Association',
    image: '/images/certifications/oasis8.svg',
  },
];

// =============================================================================
// DATA: Table of Contents
// =============================================================================

const TOC_ITEMS = [
  { label: 'Cover', href: '#cover' },
  { label: 'Introduction', href: '#introduction' },
  { label: 'Challenges', href: '#challenges' },
  { label: 'Solution', href: '#solution' },
  { label: 'Our Services', href: '#services' },
  { label: 'Business Model', href: '#business-model' },
  { label: 'Market Strategy', href: '#market-strategy' },
  { label: 'Team', href: '#team' },
  { label: 'Awards', href: '#awards' },
  { label: 'Mission', href: '#mission' },
  { label: 'Contact', href: '#contact' },
];

// =============================================================================
// COMPONENTS
// =============================================================================

function TocSidebar() {
  return (
    <aside className="hidden xl:block xl:sticky xl:top-24 xl:self-start shrink-0">
      <div className="rounded border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 w-max">
        <div className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wide">Contents</div>
        <ol className="mt-3 space-y-1">
          {TOC_ITEMS.map((item, idx) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="flex items-center gap-2 px-2 py-1 text-xs whitespace-nowrap text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <span className="tabular-nums text-gray-400 dark:text-gray-500">{idx + 1}.</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}

function MobileContents() {
  return (
    <div className="xl:hidden mb-6">
      <div className="rounded border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wide">Contents</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {TOC_ITEMS.map((item, idx) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
            >
              {idx + 1}. {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="scroll-mt-24 text-2xl font-bold text-gray-900 dark:text-white mb-4">
      {children}
    </h2>
  );
}

function SectionSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
      {children}
    </h3>
  );
}

function Divider() {
  return <hr className="my-10 border-gray-200 dark:border-gray-800" />;
}

// Professional blockquote with left border
function Callout({ children, variant = 'blue' }: { children: React.ReactNode; variant?: 'blue' | 'yellow' }) {
  const borderColor = variant === 'yellow' ? 'border-l-yellow-500' : 'border-l-blue-500';
  const bgColor = variant === 'yellow' ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'bg-gray-50 dark:bg-gray-800/80';
  
  return (
    <div className={`my-5 border-l-4 ${borderColor} ${bgColor} py-3 px-4`}>
      <div className="text-gray-700 dark:text-gray-200 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

// Image with subtle shadow for dark mode visibility
function ContentImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="my-6">
      <div className="overflow-hidden rounded bg-gray-100 dark:bg-gray-800 shadow-sm dark:shadow-gray-950/50">
        <Image
          src={src}
          alt={alt}
          width={900}
          height={500}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}

function TeamMemberCard({ name, role, image }: { name: string; role: string; image: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mb-2" />
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 80px, 96px"
        />
      </div>
      <div className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{name}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 max-w-[120px]">{role}</div>
    </div>
  );
}

function AwardCard({ year, title, subtitle, image }: { year: string; title: string; subtitle: string; image: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-full aspect-[3/4] max-w-[220px] rounded overflow-hidden bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-950/50 mb-4 border border-gray-100 dark:border-gray-700">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-2"
          sizes="220px"
        />
      </div>
      <div className="text-base font-bold text-gray-900 dark:text-white">{title}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</div>
      <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">{year}</div>
    </div>
  );
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function CompanyOverviewPage() {
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <Section className="py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* LEFT: Table of Contents */}
            <TocSidebar />

            {/* CENTER: Main Content - Much wider */}
            <div className="flex-1 min-w-0 max-w-5xl mx-auto">
              <MobileContents />

              <div className="rounded border border-gray-200 bg-white shadow-sm overflow-hidden dark:border-gray-800 dark:bg-gray-900">

                {/* COVER PAGE */}
                <section id="cover" className="px-8 py-16 sm:px-14 sm:py-20">
                  <div className="mx-auto flex min-h-[40vh] max-w-2xl flex-col items-center justify-center text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                      Montem Flumen Inc.
                    </h1>

                    <p className="mt-3 text-xl text-gray-600 dark:text-gray-300">
                      Company Overview
                    </p>

                    <p className="mt-6 text-base text-gray-500 dark:text-gray-400">{year}</p>

                    <div className="mt-10">
                      <Image
                        src="/images/banners/montemflumen-logo.svg"
                        alt="Montemflumen Logo"
                        width={100}
                        height={100}
                        className="h-20 w-auto"
                        priority
                      />
                    </div>

                    <p className="mt-8 text-lg italic text-gray-600 dark:text-gray-300 max-w-md">
                      &quot;We build platforms that scale—launching English-first digital ecosystems that help foreigners thrive in Korea.&quot;
                    </p>
                  </div>
                </section>

                {/* INTRODUCTION */}
                <div className="border-t border-gray-200 dark:border-gray-800 px-8 py-10 sm:px-14">
                  <section id="introduction">
                    <SectionTitle>Introduction</SectionTitle>

                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      If you&apos;ve ever moved to a new country, you know the feeling: you&apos;re capable, motivated, and ready to build a new chapter—yet small things suddenly become hard. Not because you&apos;re unprepared, but because the <em>systems</em> around you were not designed with you in mind.
                    </p>

                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                      That is the real reason Montemflumen exists.
                    </p>

                    <Callout>
                      Make Korea easier to navigate for global residents—and help Korean businesses operate at an international standard.
                    </Callout>

                    <ContentImage
                      src="/images/keasy/keasy1.svg"
                      alt="Keasy Platform Overview"
                    />
                  </section>

                  <Divider />

                  {/* CHALLENGES */}
                  <section id="challenges">
                    <SectionTitle>Challenges</SectionTitle>

                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      Korea is a world-class country with impressive infrastructure. But there is a structural reality that affects millions of people: many systems are Korean-first by default.
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-5">
                        <SectionSubtitle>Everyday Friction</SectionSubtitle>
                        <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span>Food ordering requires local knowledge</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span>Shopping locations and options unclear</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span>Language barriers in daily transactions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span>Trust verification is difficult</span>
                          </li>
                        </ul>
                      </div>

                      <div className="rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-5">
                        <SectionSubtitle>High-Stakes Paperwork</SectionSubtitle>
                        <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span>Banking and immigration processes</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span>Complex forms with unclear requirements</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span>Mistakes lead to delays and repeat visits</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span>Inconsistent English support</span>
                          </li>
                        </ul>
                      </div>

                      <div className="rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-5">
                        <SectionSubtitle>Fragmented Solutions</SectionSubtitle>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Users currently juggle multiple disconnected tools: meetup platforms, community groups, blogs, job boards, marketplace apps, and local directories. This fragmentation reduces trust and prevents any single platform from becoming the default.
                        </p>
                      </div>
                    </div>

                    <ContentImage
                      src="/images/keasy/keasy1 copy 3.svg"
                      alt="Challenges Overview"
                    />
                  </section>

                  <Divider />

                  {/* SOLUTION */}
                  <section id="solution">
                    <SectionTitle>Solution</SectionTitle>

                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                      Montemflumen&apos;s solution is not &quot;one feature.&quot; It&apos;s a system: <strong className="text-gray-900 dark:text-white">One ecosystem → multiple modules → shared trust + identity layer.</strong>
                    </p>

                    <Callout>
                      Instead of forcing users to jump between apps, Keasy creates continuity: the same identity follows you through community, guides, services, jobs, and marketplace.
                    </Callout>

                    <ContentImage
                      src="/images/keasy/keasy1 copy 4.svg"
                      alt="Keasy Solution Ecosystem"
                    />
                  </section>

                  <Divider />

                  {/* OUR SERVICES */}
                  <section id="services">
                    <SectionTitle>Our Services</SectionTitle>

                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                      People don&apos;t wake up wanting an app. They wake up wanting results. Our products are built around completion.
                    </p>

                    <div className="space-y-10">
                      {SERVICES.map((service, index) => (
                        <div
                          key={service.id}
                          className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6`}
                        >
                          {/* Image - fixed height to match content */}
                          <div className="w-full md:w-1/2">
                            <div className="h-full rounded overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm dark:shadow-gray-950/50">
                              <Image
                                src={service.image}
                                alt={service.title}
                                width={500}
                                height={350}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="w-full md:w-1/2 flex flex-col justify-center">
                            {/* Title on same line: "1) KoreaEasy (Keasy)" */}
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                              <span className="text-blue-600 dark:text-blue-400">{service.id})</span>{' '}
                              {service.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                              {service.subtitle}
                            </p>

                            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-4">
                              {service.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-green-500 dark:text-green-400 mt-0.5">✓</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>

                            <Callout variant="yellow">
                              <p className="text-sm italic">&quot;{service.quote}&quot;</p>
                            </Callout>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <Divider />

                  {/* BUSINESS MODEL */}
                  <section id="business-model">
                    <SectionTitle>Business Model</SectionTitle>

                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                      Montemflumen is built on a hybrid model combining platform subscriptions and engineering services.
                    </p>

                    <div className="grid gap-8 md:grid-cols-2">
                      <div className="flex flex-col">
                        <div className="rounded overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm dark:shadow-gray-950/50 mb-4">
                          <Image
                            src="/images/keasy/b2b2c.svg"
                            alt="Platform Model"
                            width={500}
                            height={300}
                            className="w-full h-auto"
                          />
                        </div>
                        <div>
                          <SectionSubtitle>Platform Model (Keasy)</SectionSubtitle>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                            Tiered subscriptions aligned with user maturity:
                          </p>
                          <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                            <li className="flex items-start gap-2">
                              <span className="text-blue-500">•</span>
                              <span><strong className="text-gray-900 dark:text-white">Free:</strong> Marketplace, communities, job applications</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-500">•</span>
                              <span><strong className="text-gray-900 dark:text-white">Creator:</strong> More listings, unlimited events</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-500">•</span>
                              <span><strong className="text-gray-900 dark:text-white">Professional:</strong> Service listings, bookings</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-500">•</span>
                              <span><strong className="text-gray-900 dark:text-white">Business:</strong> Business profile, managed website</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <div className="rounded overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm dark:shadow-gray-950/50 mb-4">
                          <Image
                            src="/images/keasy/keasy1 copy 6.svg"
                            alt="Engineering Services"
                            width={500}
                            height={300}
                            className="w-full h-auto"
                          />
                        </div>
                        <div>
                          <SectionSubtitle>Engineering Services</SectionSubtitle>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                            Montemflumen builds and operates production systems:
                          </p>
                          <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                            <li className="flex items-start gap-2">
                              <span className="text-green-500">•</span>
                              <span>Design and delivery</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-500">•</span>
                              <span>Scalability and reliability</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-500">•</span>
                              <span>Operations and improvement cycles</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-500">•</span>
                              <span>Strong handover and best-practices transfer</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  <Divider />

                  {/* MARKET STRATEGY */}
                  <section id="market-strategy">
                    <SectionTitle>Market Strategy</SectionTitle>

                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      Keasy is designed to grow through compounding loops across key segments.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2 mb-6">
                      <div className="rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">New Arrivals</div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Highest pain + highest need for trusted step-by-step guidance in first 90 days.</p>
                      </div>
                      <div className="rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">International Students</div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Strong community need + career transition pressure + repeated admin tasks.</p>
                      </div>
                      <div className="rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Long-term Residents</div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Marketplace + services + community create stable retention.</p>
                      </div>
                      <div className="rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Local Businesses</div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Desire international customers but need packaging and multilingual ops.</p>
                      </div>
                    </div>

                    <ContentImage
                      src="/images/keasy/keasy1 copy 7.svg"
                      alt="Market Strategy"
                    />
                  </section>

                  <Divider />

                  {/* MONTEMFLUMEN TEAM */}
                  <section id="team">
                    <SectionTitle>Montemflumen Team</SectionTitle>

                    <div className="flex flex-col md:flex-row gap-6 items-start mb-10">
                      <div className="relative w-40 h-40 md:w-44 md:h-44 rounded overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-md dark:shadow-gray-950/50 flex-shrink-0 border border-gray-200 dark:border-gray-700">
                        <Image
                          src={CEO.image}
                          alt={CEO.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 160px, 176px"
                          priority
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {CEO.name}
                        </div>
                        <div className="mt-1 text-base text-gray-500 dark:text-gray-400">
                          {CEO.role}
                        </div>
                        <Callout>
                          <p className="text-sm italic">&quot;{CEO.quote}&quot;</p>
                        </Callout>
                      </div>
                    </div>

                    <div className="mb-8">
                      <div className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                        Engineering Team
                      </div>
                      <div className="h-px bg-gray-300 dark:bg-gray-700 mb-0" />
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {ENGINEERING_TEAM.map((member) => (
                          <TeamMemberCard
                            key={member.name}
                            name={member.name}
                            role={member.role}
                            image={member.image}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                        Advisors
                      </div>
                      <div className="h-px bg-gray-300 dark:bg-gray-700 mb-0" />
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {ADVISORS.map((advisor) => (
                          <TeamMemberCard
                            key={advisor.name}
                            name={advisor.name}
                            role={advisor.role}
                            image={advisor.image}
                          />
                        ))}
                      </div>
                    </div>
                  </section>

                  <Divider />

                  {/* AWARDS */}
                  <section id="awards">
                    <SectionTitle>Certifications &amp; Awards</SectionTitle>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-6">
                      {AWARDS.map((award) => (
                        <AwardCard
                          key={`${award.year}-${award.title}`}
                          year={award.year}
                          title={award.title}
                          subtitle={award.subtitle}
                          image={award.image}
                        />
                      ))}
                    </div>
                  </section>

                  <Divider />

                  {/* MISSION */}
                  <section id="mission">
                    <SectionTitle>Mission</SectionTitle>

                    <Callout>
                      <p className="leading-relaxed mb-3">
                        Korea is becoming more international, but many everyday interfaces remain Korean-first. That gap creates friction for foreign residents and limits growth for local SMEs. Montemflumen turns that gap into a scalable platform ecosystem—combining community, guidance, jobs, services, and marketplace—while building practical automation tools that reduce errors in high-stakes tasks.
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        Our mission is simple: make Korea easier to navigate for global residents and help Korean businesses operate at an international standard.
                      </p>
                    </Callout>

                    <ContentImage
                      src="/images/banners/plantbanner.png"
                      alt="Montemflumen Mission"
                    />
                  </section>

                  <Divider />

                  {/* CONTACT */}
                  <section id="contact">
                    <SectionTitle>Contact Us</SectionTitle>

                    <div className="rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-6">
                      <div className="flex items-center gap-4 mb-5">
                        <Image
                          src="/images/banners/montemflumen-logo.svg"
                          alt="Montemflumen Logo"
                          width={48}
                          height={48}
                          className="h-10 w-auto"
                        />
                        <div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            Montemflumen Inc.
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Korea Easy (Keasy)
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2 text-sm">
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white mb-0.5">Email</div>
                          <a href="mailto:keasy.contact@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                            keasy.contact@gmail.com
                          </a>
                        </div>

                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white mb-0.5">Privacy</div>
                          <a href="mailto:keasy.contact@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                            keasy.contact@gmail.com
                          </a>
                        </div>

                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white mb-0.5">Phone</div>
                          <p className="text-gray-600 dark:text-gray-400">+82 10-9695-9805</p>
                        </div>

                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white mb-0.5">Hours</div>
                          <p className="text-gray-600 dark:text-gray-400">Mon–Fri 09:30–17:30 KST</p>
                        </div>

                        <div className="sm:col-span-2">
                          <div className="font-semibold text-gray-900 dark:text-white mb-0.5">Address</div>
                          <p className="text-gray-600 dark:text-gray-400">
                            103, 1F, 162 Dongdaejeon-ro, Dong-gu, Daejeon, Republic of Korea
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}