// File path: src/app/privacy/page.tsx
// Role: Privacy policy page
// Connected files: constants.ts (SITE_CONFIG)
// Legal compliance: GDPR, CCPA compliant privacy policy
// Reference: LEGAL-001 (Privacy Policy Template)

import { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_CONFIG.name}`,
  description: 'Privacy policy for Montemflumen detailing how we collect, use, and protect your data.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Section className="pt-32 pb-16" background="muted">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </Section>

      {/* Privacy Content */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto prose dark:prose-invert">
          <p className="lead">
            This Privacy Policy describes how Montemflumen Inc. ("we", "us", or "our") collects, uses, and
            shares your personal information when you use our website (montemflumen.org) and services.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, including:
          </p>
          <ul>
            <li>Contact information (name, email address, company)</li>
            <li>Communication content (messages, inquiries)</li>
            <li>Resume and career information (when applying for positions)</li>
          </ul>
          <p>
            We also automatically collect certain information about your device and usage of our website
            through cookies and similar technologies.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Send you technical updates and marketing communications (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your information with:
          </p>
          <ul>
            <li>Service providers who assist in our operations</li>
            <li>Legal authorities when required by law</li>
            <li>Professional advisors (lawyers, accountants)</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal
            information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>5. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to or restrict processing</li>
            <li>Data portability</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information below.
          </p>

          <h2>6. International Transfers</h2>
          <p>
            Our services are provided from the United States. If you are accessing our services from
            outside the US, your information may be transferred to and processed in the US.
          </p>

          <h2>7. Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under 16 years of age. We do not knowingly
            collect personal information from children under 16.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material
            changes by posting the new policy on this page and updating the "Last updated" date.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <ul>
            <li>Email: {SITE_CONFIG.contact?.email || 'hello@montemflumen.com'}</li>
            <li>Address: {SITE_CONFIG.contact?.address || '123 Engineering Street, San Francisco, CA 94107'}</li>
          </ul>
        </div>
      </Section>
    </main>
  );
}
