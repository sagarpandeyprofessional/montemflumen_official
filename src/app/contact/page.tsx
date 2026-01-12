// File path: src/app/contact/page.tsx
// Role: Contact page with form and company information
// Connected files: ContactForm component, constants.ts (SITE_CONFIG)
// UI patterns: CONTACT-01 Two-column layout
// Edge cases: Form submission, error handling, empty states
// Reference: PIT-99 (form submission), PIT-87 (validation)

import { Metadata } from 'next';
import { ContactForm } from '@/components/sections/ContactForm';
import { Section } from '@/components/ui/Section';
import { SITE_CONFIG, CONTACT_COPY } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Contact | ${SITE_CONFIG.name}`,
  description: 'Get in touch with Montemflumen for platform engineering consulting and services.',
  openGraph: {
    title: `Contact | ${SITE_CONFIG.name}`,
    description: 'Get in touch with Montemflumen for platform engineering consulting and services.',
  },
};

export default function ContactPage() {
  const contactInfo = [
    {
      label: 'Email',
      value: SITE_CONFIG.contact?.email || 'hello@montemflumen.com',
      href: `mailto:${SITE_CONFIG.contact?.email || 'hello@montemflumen.com'}`,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'Address',
      value: SITE_CONFIG.contact?.address || '123 Engineering Street, San Francisco, CA 94107',
      href: `https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.contact?.address || '123 Engineering Street, San Francisco, CA 94107')}`,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: 'Response Time',
      value: CONTACT_COPY.info.response.value,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Section className="pt-32 pb-16" background="muted">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {CONTACT_COPY.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {CONTACT_COPY.hero.subtitle}
          </p>
        </div>
      </Section>

      {/* Contact Content */}
      <Section className="py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-8">{CONTACT_COPY.form.title}</h2>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-8">{CONTACT_COPY.info.title}</h2>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">{info.label}</h3>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.label === 'Address' ? '_blank' : '_self'}
                        rel={info.label === 'Address' ? 'noopener noreferrer' : undefined}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="mt-12">
              <div className="aspect-video rounded-xl overflow-hidden bg-muted">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(SITE_CONFIG.contact?.address || 'San Francisco, CA')}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Montemflumen Office Location"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Our office location in San Francisco
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section className="py-16" background="muted">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: 'What types of projects do you typically work on?',
                answer: 'We specialize in platform engineering projects including cloud infrastructure, Kubernetes orchestration, CI/CD pipelines, and developer tooling. Our work ranges from greenfield projects to legacy modernization.',
              },
              {
                question: 'How do you structure engagements?',
                answer: 'We offer flexible engagement models including fixed-scope projects, time-and-materials consulting, and ongoing platform support. We start with a discovery phase to understand your needs and propose the best approach.',
              },
              {
                question: 'What is your typical response time?',
                answer: 'We aim to respond to all inquiries within 1-2 business days. For urgent matters, please indicate this in your message and we will prioritize accordingly.',
              },
              {
                question: 'Do you work with startups as well as enterprises?',
                answer: 'Yes, we work with organizations of all sizes. Our approach is tailored to each client’s stage, constraints, and growth trajectory.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white dark:bg-forest-900 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
