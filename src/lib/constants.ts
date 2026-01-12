/**
 * File path: src/lib/constants.ts
 * Role/responsibility: Centralized copy and configuration (no hardcoded text in components)
 * Connections: Used by all pages and components for text content
 * Data/copy source: All UI text centralized here for i18n readiness
 * Reference documents: VOICE-VAULT (UX Writing), AIP-004 (No hardcoded text)
 */

import type { SiteConfig, NavItem, FooterSection } from '@/types';

// =============================================================================
// SITE CONFIGURATION
// =============================================================================

export const SITE_CONFIG: SiteConfig = {
  name: 'Montemflumen Inc.',
  description:
    'Platform engineering company building scalable infrastructure and high-performing engineering teams.',
  url: 'https://montemflumen.org',
  email: 'sagar.pandey.professional@gmail.com',
  contact: {
    email: 'sagar.pandey.professional@gmail.com',
    address: '162, Dongdaejeon-ro, Dong-gu, Daejeon, South Korea',
  },
  social: {
    linkedin: 'https://linkedin.com/company/montemflumen',
    github: 'https://github.com/montemflumen',
  },
};

// =============================================================================
// NAVIGATION
// =============================================================================

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Company', href: '/about' },
      { label: 'How We Think', href: '/about/how-we-think' },
      { label: 'Our Story', href: '/about/story' },
    ],
  },
  { label: 'Team', href: '/team' },
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Insights', href: '/insights' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Team', href: '/team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Work', href: '/work' },
      { label: 'Services', href: '/services' },
      { label: 'Insights', href: '/insights' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

// =============================================================================
// HOME PAGE COPY
// =============================================================================

export const HOME_COPY = {
  hero: {
    headline: 'We Build Platforms That Scale',
    subheadline:
      'Montemflumen is a platform engineering company that helps organizations build resilient infrastructure and high-performing engineering teams.',
    cta: {
      primary: 'Start a Conversation',
      secondary: 'View Our Work',
    },
  },
  bento: {
    title: 'What We Do',
    subtitle: 'End-to-end platform engineering capabilities',
    items: [
      {
        title: 'Build',
        description: 'Design and implement cloud-native platforms from the ground up.',
        icon: 'build',
      },
      {
        title: 'Operate',
        description: 'Run and maintain production systems with reliability and efficiency.',
        icon: 'operate',
      },
      {
        title: 'Scale',
        description: 'Grow your infrastructure to meet demand without compromising quality.',
        icon: 'scale',
      },
      {
        title: 'Learn',
        description: 'Transfer knowledge and build internal capabilities that last.',
        icon: 'learn',
      },
    ],
  },
  caseStudies: {
    title: 'Featured Work',
    subtitle: 'Real impact for real organizations',
    cta: 'View All Case Studies',
  },
  team: {
    title: 'Meet Our Team',
    subtitle: 'Engineers, operators, and advisors with deep expertise',
    cta: 'View Full Team',
  },
  insights: {
    title: 'Latest Insights',
    subtitle: 'Thoughts on engineering, platforms, and building great teams',
    cta: 'View All Insights',
  },
  cta: {
    title: 'Ready to Build Something Great?',
    subtitle:
      "Let's discuss how Montemflumen can help you build scalable platforms and high-performing teams.",
    button: 'Get in Touch',
  },
} as const;

// =============================================================================
// ABOUT PAGE COPY
// =============================================================================

export const ABOUT_COPY = {
  hero: {
    title: 'About Montemflumen',
    subtitle:
      'We are platform engineers, operators, and builders dedicated to creating infrastructure that empowers teams to do their best work.',
  },
  mission: {
    title: 'Our Mission',
    content:
      'To help organizations build platforms that are resilient, scalable, and enable engineering teams to move fast with confidence.',
  },
  values: {
    title: 'Our Values',
    items: [
      {
        title: 'Reliability First',
        description:
          'We build systems that work when it matters most. Reliability is not negotiable.',
      },
      {
        title: 'Continuous Learning',
        description:
          'Technology evolves rapidly. We stay curious, experiment often, and share what we learn.',
      },
      {
        title: 'Pragmatic Excellence',
        description:
          'We balance perfection with progress, delivering solutions that work today while building for tomorrow.',
      },
      {
        title: 'Transparent Partnership',
        description:
          'We succeed when our clients succeed. Every decision is made with their best interests in mind.',
      },
    ],
  },
  howWeThink: {
    title: 'How We Think',
    subtitle: 'Our engineering philosophy and approach',
    content: `Platform engineering is about more than just infrastructure. It's about creating the foundations that enable teams to build, ship, and iterate with confidence.

We believe in:
- **Developer Experience First**: Platforms exist to serve developers. If engineers don't want to use your platform, it's failed.
- **Sensible Defaults, Flexible Overrides**: Provide golden paths that work for 80% of cases, but allow escape hatches for the rest.
- **Observable by Design**: You can't improve what you can't measure. Observability is a first-class concern, not an afterthought.
- **Incremental Adoption**: Big bang migrations fail. We build platforms that teams can adopt piece by piece.`,
  },
  story: {
    title: 'Our Story',
    subtitle: 'How Montemflumen came to be',
    content: `Montemflumen was founded with a simple observation: most organizations struggle not with the technology itself, but with building the platforms and teams that make technology useful.

We've seen too many companies invest heavily in the latest tools and cloud services, only to find themselves stuck in operational complexity. The promise of cloud-native development often becomes a reality of alert fatigue, deployment anxiety, and frustrated engineers.

Our founders came together from diverse backgrounds—hyperscale cloud providers, fast-moving startups, and enterprise transformation projects—united by a shared belief that platform engineering, done right, can be transformative.

We named ourselves Montemflumen—from the Latin "mountain river"—because we believe in the power of persistent flow. Like water carving through mountains, good platform engineering creates channels that guide work toward its destination, naturally and reliably.`,
  },
  navigation: [
    {
      title: 'How We Think',
      description: 'Our engineering philosophy and approach',
      href: '/about/how-we-think',
    },
    {
      title: 'Our Story',
      description: 'How Montemflumen came to be',
      href: '/about/story',
    },
    {
      title: 'Meet the Team',
      description: 'The people behind Montemflumen',
      href: '/team',
    },
  ],
} as const;

// =============================================================================
// SERVICES PAGE COPY
// =============================================================================

export const SERVICES_COPY = {
  hero: {
    title: 'Our Services',
    subtitle:
      'From architecture design to team building, we provide end-to-end platform engineering support.',
  },
  offerings: [
    {
      title: 'Platform Architecture',
      description:
        'Design cloud-native platforms that scale with your business. We help you choose the right technologies, design resilient architectures, and create foundations that last.',
      features: [
        'Cloud architecture design and review',
        'Kubernetes and container orchestration',
        'Infrastructure as Code implementation',
        'CI/CD pipeline design',
        'Security and compliance frameworks',
      ],
    },
    {
      title: 'Engineering Teams',
      description:
        'Build and scale high-performing platform teams. We help you hire, train, and organize engineers who can build and operate production systems.',
      features: [
        'Team structure and organization design',
        'Hiring process development',
        'Technical interview frameworks',
        'Onboarding program design',
        'Mentorship and growth frameworks',
      ],
    },
    {
      title: 'Operations Consulting',
      description:
        'Transform how you run production systems. We help you implement SRE practices, improve reliability, and build operational excellence.',
      features: [
        'SRE practice implementation',
        'Incident management processes',
        'On-call and escalation design',
        'Observability stack implementation',
        'Capacity planning and optimization',
      ],
    },
  ],
  process: {
    title: 'How We Work',
    subtitle: 'A proven approach to platform engineering',
    steps: [
      {
        title: 'Discover',
        description:
          'We start by understanding your current state, challenges, and goals. Deep discovery ensures we solve the right problems.',
      },
      {
        title: 'Design',
        description:
          'We design solutions collaboratively, ensuring alignment with your team and constraints. No ivory tower architecture.',
      },
      {
        title: 'Deliver',
        description:
          'We implement alongside your team, building capabilities and transferring knowledge as we go.',
      },
      {
        title: 'Iterate',
        description:
          'Platforms evolve. We help you establish feedback loops and continuous improvement practices.',
      },
    ],
  },
  cta: {
    title: "Let's Build Together",
    subtitle:
      "Every organization is different. Let's discuss how we can help with your specific challenges.",
    button: 'Start a Conversation',
  },
} as const;

// =============================================================================
// CONTACT PAGE COPY
// =============================================================================

export const CONTACT_COPY = {
  hero: {
    title: 'Get in Touch',
    subtitle:
      "Whether you're ready to start a project or just want to explore possibilities, we'd love to hear from you.",
  },
  form: {
    title: 'Send Us a Message',
    fields: {
      name: {
        label: 'Name',
        placeholder: 'Your name',
        error: 'Please enter your name',
      },
      email: {
        label: 'Email',
        placeholder: 'you@company.com',
        error: 'Please enter a valid email address',
      },
      company: {
        label: 'Company (optional)',
        placeholder: 'Your company',
      },
      message: {
        label: 'Message',
        placeholder: 'Tell us about your project or challenge...',
        error: 'Please enter a message',
      },
    },
    submit: 'Send Message',
    submitting: 'Sending...',
    success: {
      title: 'Message Sent!',
      message:
        "Thanks for reaching out. We'll get back to you within 1-2 business days.",
    },
    error: {
      title: 'Something Went Wrong',
      message: 'Please try again or email us directly.',
      retry: 'Try Again',
    },
  },
  info: {
    title: 'Other Ways to Reach Us',
    email: {
      label: 'Email',
      value: 'hello@montemflumen.com',
    },
    response: {
      label: 'Response Time',
      value: 'Usually within 1-2 business days',
    },
  },
} as const;

// =============================================================================
// CAREERS PAGE COPY
// =============================================================================

export const CAREERS_COPY = {
  hero: {
    title: 'Join Our Team',
    subtitle:
      "We're always looking for talented engineers, operators, and builders who share our passion for platform engineering.",
  },
  culture: {
    title: 'Why Montemflumen?',
    items: [
      {
        title: 'Impactful Work',
        description:
          'Work on challenging problems with real impact. Our projects help organizations transform how they build and operate software.',
      },
      {
        title: 'Continuous Learning',
        description:
          'Stay at the cutting edge of platform engineering. We invest in learning, experimentation, and knowledge sharing.',
      },
      {
        title: 'Remote-First',
        description:
          'Work from anywhere. Our team spans multiple time zones, and we prioritize async communication and documentation.',
      },
      {
        title: 'Ownership & Autonomy',
        description:
          'We trust our team to make decisions and own outcomes. No micromanagement, just accountability and support.',
      },
    ],
  },
  openings: {
    title: 'Open Positions',
    empty: "We don't have any open positions right now, but we're always interested in meeting talented people.",
    cta: 'Send us your resume at careers@montemflumen.com',
  },
  cta: {
    title: "Don't See a Fit?",
    subtitle:
      "We're always open to meeting talented engineers. Send us your resume and tell us what you're passionate about.",
    email: 'careers@montemflumen.com',
  },
} as const;

// =============================================================================
// EMPTY STATES
// =============================================================================

export const EMPTY_STATES = {
  team: {
    title: 'Team information coming soon',
    message: "We're updating our team page. Check back soon!",
  },
  caseStudies: {
    title: 'Case studies coming soon',
    message: "We're documenting our latest projects. Check back soon!",
  },
  blog: {
    title: 'No posts yet',
    message: "We're working on our first articles. Check back soon!",
  },
  search: {
    title: 'No results found',
    message: 'Try adjusting your search or filters.',
  },
} as const;

// =============================================================================
// ERROR STATES
// =============================================================================

export const ERROR_STATES = {
  notFound: {
    title: '404 - Page Not Found',
    message: "Sorry, we couldn't find the page you're looking for.",
    description: "Sorry, we couldn't find the page you're looking for.",
    cta: 'Back to Home',
  },
  serverError: {
    title: '500 - Server Error',
    message: 'Something went wrong on our end. Please try again later.',
    description: 'Something went wrong on our end. Please try again later.',
    cta: 'Refresh Page',
  },
  generic: {
    title: 'Something Went Wrong',
    message: "We're having trouble loading this content. Please try again.",
    cta: 'Try Again',
  },
} as const;

// =============================================================================
// FOOTER COPY
// =============================================================================

export const FOOTER_COPY = {
  tagline: 'Building platforms that scale.',
  copyright: `© ${new Date().getFullYear()} Montemflumen Inc. All rights reserved.`,
} as const;

// =============================================================================
// SEO DEFAULTS
// =============================================================================

export const SEO_DEFAULTS = {
  titleSuffix: ' | Montemflumen',
  defaultDescription: SITE_CONFIG.description,
  defaultKeywords: [
    'platform engineering',
    'cloud infrastructure',
    'DevOps',
    'SRE',
    'Kubernetes',
    'engineering teams',
  ] as string[],
} as const;
