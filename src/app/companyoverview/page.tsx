// File path: src/app/companyoverview/page.tsx
// Purpose: Premium Company Overview page with custom sections, team layout, and awards
// Connected files: src/components/ui/Section.tsx, src/lib/constants.ts, src/components/companyoverview/DownloadPdfButton.tsx
// Changes: Added clickable links to team member cards, added PDF download button

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { SITE_CONFIG } from '@/lib/constants';
import { DownloadPdfButton } from '@/components/companyoverview/DownloadPdfButton';

export const metadata: Metadata = {
  title: `Company Overview | ${SITE_CONFIG.name}`,
  description: 'Company Overview & Growth document — Building English-first platforms that help foreigners thrive in Korea.',
};

// =============================================================================
// DATA: Team Members (with slug for linking to detail pages)
// =============================================================================

const CEO = {
  name: 'Sagar Pandey',
  role: 'Founder / CEO',
  image: '/images/team/sagar.png',
  slug: 'sagar',
  quote: 'Our mission is to make Korea easier to navigate for global residents and help Korean businesses operate at an international standard.',
};

const ENGINEERING_TEAM = [
  { name: 'Firdavs', role: 'Senior Developer & Team Leader', image: '/images/team/fred.png', slug: 'fred' },
  { name: 'Sahil Gevariya', role: 'Full Stack Developer', image: '/images/team/sahil.png', slug: 'sahil' },
  { name: 'John Paul', role: 'AI Engineer & Python Developer', image: '/images/team/paul.png', slug: 'paul' },
  { name: 'Kate Chernetskaya', role: 'Electrical Engineer', image: '/images/team/kate.png', slug: 'kate' },
];

const ADVISORS = [
  { name: 'Daniel Fellegger', role: 'Special Advisor', image: '/images/team/daniel.png', slug: 'daniel' },
  { name: 'Joon M. Kim', role: 'Special Advisor', image: '/images/team/joon.png', slug: 'joon' },
  { name: 'Winner Apata', role: 'Policy Advisor', image: '/images/team/winner.png', slug: 'winner' },
  { name: 'Niranjan Dahal', role: 'Special Advisor', image: '/images/team/niranjan.png', slug: 'niranjan' },
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
    url: 'https://koreaeasy.org/',
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
    url: 'https://koreaeasy.org/marketplace/',
  },
  {
    id: 3,
    title: 'Digital Application with Guides',
    subtitle: 'Error prevention for high-stakes systems',
    features: [
      'Step-by-step checklists',
      'Document requirements clearly listed',
      'Common error prevention tips',
    ],
    quote: 'Reduce repeated visits, delays, and uncertainty.',
    image: '/images/case-studies/sgp-application.svg',
    url: 'https://koreaeasy.org/sgp-application/',
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
    <aside className="hidden xl:block xl:sticky xl:top-24 xl:self-start shrink-0" data-pdf-exclude="true">
      <div className="rounded border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 w-max">
        <div className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wide">Contents</div>
        <ol className="mt-3 space-y-1">
          {TOC_ITEMS.map((item, idx) => (
            <li key={item.href}>
              <a href={item.href} className="flex items-center gap-2 px-2 py-1 text-xs whitespace-nowrap text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
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
    <div className="xl:hidden mb-6" data-pdf-exclude="true">
      <div className="rounded border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wide">Contents</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {TOC_ITEMS.map((item, idx) => (
            <a key={item.href} href={item.href} className="rounded border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-colors">
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

function ContentImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="my-6">
      <div className="overflow-hidden rounded bg-gray-100 dark:bg-gray-800 shadow-sm dark:shadow-gray-950/50">
        <Image src={src} alt={alt} width={900} height={500} className="w-full h-auto" />
      </div>
    </div>
  );
}

function TeamMemberCard({ name, role, image, slug }: { name: string; role: string; image: string; slug: string }) {
  return (
    <Link href={`/team/${slug}`} className="flex flex-col items-center text-center group cursor-pointer">
      <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mb-2" />
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-transform duration-200 group-hover:scale-105 group-hover:shadow-lg">
        <Image src={image} alt={name} fill className="object-cover" sizes="(max-width: 640px) 80px, 96px" />
      </div>
      <div className="mt-2 text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{name}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 max-w-[120px]">{role}</div>
    </Link>
  );
}

function AwardCard({ year, title, subtitle, image }: { year: string; title: string; subtitle: string; image: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-full aspect-[3/4] max-w-[220px] rounded overflow-hidden bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-950/50 mb-4 border border-gray-100 dark:border-gray-700">
        <Image src={image} alt={title} fill className="object-contain p-2" sizes="220px" />
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
      {/* PDF Download Button */}
      <DownloadPdfButton contentId="pdf-content" />

      <Section className="py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <TocSidebar />
            <div className="flex-1 min-w-0 max-w-5xl mx-auto">
              <MobileContents />

              {/* PDF Content Container - This is what gets downloaded */}
              <div id="pdf-content" className="rounded border border-gray-200 bg-white shadow-sm overflow-hidden dark:border-gray-800 dark:bg-gray-900">

                {/* COVER PAGE */}
                <section id="cover" className="px-8 py-16 sm:px-14 sm:py-20">
                  <div className="mx-auto flex min-h-[40vh] max-w-2xl flex-col items-center justify-center text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">Montem Flumen Inc.</h1>
                    <p className="mt-3 text-xl text-gray-600 dark:text-gray-300">Company Overview</p>
                    <p className="mt-6 text-base text-gray-500 dark:text-gray-400">{year}</p>
                    <div className="mt-10">
                      <Image src="/images/banners/montemflumen-logo.svg" alt="Montemflumen Logo" width={100} height={100} className="h-20 w-auto" priority />
                    </div>
                    <p className="mt-8 text-lg italic text-gray-600 dark:text-gray-300 max-w-md">&quot;We build platforms that scale—launching English-first digital ecosystems that help foreigners thrive in Korea.&quot;</p>
                  </div>
                </section>

                {/* INTRODUCTION */}
                <div className="border-t border-gray-200 dark:border-gray-800 px-8 py-10 sm:px-14">
                  <section id="introduction">
                    <SectionTitle>Introduction</SectionTitle>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">If you&apos;ve ever moved to a new country, you know the feeling: you&apos;re capable, motivated, and ready to build a new chapter—yet small things suddenly become hard. Not because you&apos;re unprepared, but because the <em>systems</em> around you were not designed with you in mind.</p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">That is the real reason Montemflumen exists.</p>
                    <Callout>Make Korea easier to navigate for global residents—and help Korean businesses operate at an international standard.</Callout>
                    <ContentImage src="/images/keasy/keasy1.svg" alt="Keasy Platform Overview" />
                  </section>

                  <Divider />

                  {/* CHALLENGES */}
                  <section id="challenges">
                    <SectionTitle>Challenges</SectionTitle>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">Korea is a world-class country with impressive infrastructure. But there is a structural reality that affects millions of people: many systems are Korean-first by default.</p>
                    <div className="space-y-4 mb-6">
                      <div className="rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-5">
                        <SectionSubtitle>Everyday Friction</SectionSubtitle>
                        <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                          <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span><span>Food ordering requires local knowledge</span></li>
                          <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span><span>Shopping locations and options unclear</span></li>
                          <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span><span>Language barriers in daily transactions</span></li>
                          <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span><span>Trust verification is difficult</span></li>
                        </ul>
                      </div>
                      <div className="rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-5">
                        <SectionSubtitle>High-Stakes Paperwork</SectionSubtitle>
                        <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                          <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span><span>Banking and immigration processes</span></li>
                          <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span><span>Complex forms with unclear requirements</span></li>
                          <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span><span>Mistakes lead to delays and repeat visits</span></li>
                          <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span><span>Inconsistent English support</span></li>
                        </ul>
                      </div>
                      <div className="rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-5">
                        <SectionSubtitle>Fragmented Solutions</SectionSubtitle>
                        <p className="text-sm text-gray-700 dark:text-gray-300">Users currently juggle multiple disconnected tools: meetup platforms, community groups, blogs, job boards, marketplace apps, and local directories. This fragmentation reduces trust and prevents any single platform from becoming the default.</p>
                      </div>
                    </div>
                    <ContentImage src="/images/keasy/keasy1 copy 3.svg" alt="Challenge Overview" />
                  </section>

                  <Divider />

                  {/* SOLUTION */}
                  <section id="solution">
                    <SectionTitle>Solution</SectionTitle>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">Keasy is a unified digital ecosystem for foreigners living in Korea. We consolidate fragmented touchpoints—community, events, services, jobs, marketplace—into a single platform where trust is built through repeated use.</p>
                    <Callout variant="yellow">Keasy is designed to become the default first stop for English-speaking residents in Korea.</Callout>
                    <div className="grid gap-4 md:grid-cols-3 my-6">
                      <div className="rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Discovery</div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Events, community, guides to explore Korea confidently.</p>
                      </div>
                      <div className="rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Action</div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Connect with services, find jobs, buy/sell on marketplace.</p>
                      </div>
                      <div className="rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Retention</div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Repeat value, identity, and trust that compounds over time.</p>
                      </div>
                    </div>
                    <ContentImage src="/images/keasy/keasy1 copy 4.svg" alt="Solution Overview" />
                  </section>

                  <Divider />

                  {/* OUR SERVICES */}
                  <section id="services">
                    <SectionTitle>Our Services</SectionTitle>
                    <div className="space-y-8">
                      {SERVICES.map((service, idx) => (
                        <div key={service.id} className="rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 overflow-hidden group hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                          <div className="flex flex-col md:flex-row">
                            <a href={service.url} target="_blank" rel="noopener noreferrer" className="md:w-1/3 bg-white dark:bg-gray-800 flex items-center justify-center p-6 transition-transform group-hover:scale-[1.02]">
                              <Image src={service.image} alt={service.title} width={200} height={200} className="w-auto h-24 md:h-32 object-contain" />
                            </a>
                            <div className="flex-1 p-6">
                              <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1">SERVICE {idx + 1}</div>
                              <a href={service.url} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-2">
                                {service.title}
                                <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                              </a>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{service.subtitle}</p>
                              <ul className="mt-4 space-y-1.5">
                                {service.features.map((feature, fIdx) => (
                                  <li key={fIdx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <span className="text-green-500 mt-0.5">✓</span>
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                              <p className="mt-4 text-sm italic text-gray-600 dark:text-gray-400">&quot;{service.quote}&quot;</p>
                              <a href={service.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                Visit Website
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <Divider />

                  {/* BUSINESS MODEL */}
                  <section id="business-model">
                    <SectionTitle>Business Model</SectionTitle>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">Montemflumen operates a multi-revenue model designed for sustainable growth:</p>
                    <div className="grid gap-4 sm:grid-cols-2 mb-6">
                      <div className="rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">1</div>
                          <div className="text-base font-semibold text-gray-900 dark:text-white">Marketplace Fees</div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Transaction-based revenue from buyer/seller activity.</p>
                      </div>
                      <div className="rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">2</div>
                          <div className="text-base font-semibold text-gray-900 dark:text-white">Premium Listings</div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Featured placement for businesses and job postings.</p>
                      </div>
                      <div className="rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">3</div>
                          <div className="text-base font-semibold text-gray-900 dark:text-white">B2B Services</div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Custom platform development and white-label solutions.</p>
                      </div>
                      <div className="rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">4</div>
                          <div className="text-base font-semibold text-gray-900 dark:text-white">Consulting</div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Technical advisory for international expansion.</p>
                      </div>
                    </div>
                    <div className="rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-5">
                      <SectionSubtitle>Our Delivery Promise</SectionSubtitle>
                      <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                        <li className="flex items-start gap-2"><span className="text-green-500">•</span><span>Design and delivery</span></li>
                        <li className="flex items-start gap-2"><span className="text-green-500">•</span><span>Scalability and reliability</span></li>
                        <li className="flex items-start gap-2"><span className="text-green-500">•</span><span>Operations and improvement cycles</span></li>
                        <li className="flex items-start gap-2"><span className="text-green-500">•</span><span>Strong handover and best-practices transfer</span></li>
                      </ul>
                    </div>
                  </section>

                  <Divider />

                  {/* MARKET STRATEGY */}
                  <section id="market-strategy">
                    <SectionTitle>Market Strategy</SectionTitle>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">Keasy is designed to grow through compounding loops across key segments.</p>
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
                    <ContentImage src="/images/keasy/keasy1 copy 7.svg" alt="Market Strategy" />
                  </section>

                  <Divider />

                  {/* MONTEMFLUMEN TEAM */}
                  <section id="team">
                    <SectionTitle>Montemflumen Team</SectionTitle>
                    <div className="flex flex-col md:flex-row gap-6 items-start mb-10">
                      <Link href={`/team/${CEO.slug}`} className="relative w-40 h-40 md:w-44 md:h-44 rounded overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-md dark:shadow-gray-950/50 flex-shrink-0 border border-gray-200 dark:border-gray-700 transition-transform duration-200 hover:scale-105 hover:shadow-xl">
                        <Image src={CEO.image} alt={CEO.name} fill className="object-cover" sizes="(max-width: 768px) 160px, 176px" priority />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href={`/team/${CEO.slug}`} className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{CEO.name}</Link>
                        <div className="mt-1 text-base text-gray-500 dark:text-gray-400">{CEO.role}</div>
                        <Callout><p className="text-sm italic">&quot;{CEO.quote}&quot;</p></Callout>
                      </div>
                    </div>
                    <div className="mb-8">
                      <div className="text-base font-semibold text-gray-900 dark:text-white mb-2">Engineering Team</div>
                      <div className="h-px bg-gray-300 dark:bg-gray-700 mb-0" />
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {ENGINEERING_TEAM.map((member) => (
                          <TeamMemberCard key={member.name} name={member.name} role={member.role} image={member.image} slug={member.slug} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-base font-semibold text-gray-900 dark:text-white mb-2">Advisors</div>
                      <div className="h-px bg-gray-300 dark:bg-gray-700 mb-0" />
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {ADVISORS.map((advisor) => (
                          <TeamMemberCard key={advisor.name} name={advisor.name} role={advisor.role} image={advisor.image} slug={advisor.slug} />
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
                        <AwardCard key={`${award.year}-${award.title}`} year={award.year} title={award.title} subtitle={award.subtitle} image={award.image} />
                      ))}
                    </div>
                  </section>

                  <Divider />

                  {/* MISSION */}
                  <section id="mission">
                    <SectionTitle>Mission</SectionTitle>
                    <Callout>
                      <p className="leading-relaxed mb-3">Korea is becoming more international, but many everyday interfaces remain Korean-first. That gap creates friction for foreign residents and limits growth for local SMEs. Montemflumen turns that gap into a scalable platform ecosystem—combining community, guidance, jobs, services, and marketplace—while building practical automation tools that reduce errors in high-stakes tasks.</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">Our mission is simple: make Korea easier to navigate for global residents and help Korean businesses operate at an international standard.</p>
                    </Callout>
                    <ContentImage src="/images/banners/mainbanner.svg" alt="Montemflumen Mission" />
                  </section>

                  <Divider />

                  {/* CONTACT */}
                  <section id="contact">
                    <SectionTitle>Contact Us</SectionTitle>
                    <div className="rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-6">
                      <div className="flex items-center gap-4 mb-5">
                        <Image src="/images/banners/montemflumen-logo.svg" alt="Montemflumen Logo" width={48} height={48} className="h-10 w-auto" />
                        <div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">Montemflumen Inc.</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Korea Easy (Keasy)</div>
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2 text-sm">
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white mb-0.5">Email</div>
                          <a href="mailto:keasy.contact@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">keasy.contact@gmail.com</a>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white mb-0.5">Privacy</div>
                          <a href="mailto:keasy.contact@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">keasy.contact@gmail.com</a>
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
                          <p className="text-gray-600 dark:text-gray-400">103, 1F, 162 Dongdaejeon-ro, Dong-gu, Daejeon, Republic of Korea</p>
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
