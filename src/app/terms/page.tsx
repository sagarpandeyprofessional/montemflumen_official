// File path: src/app/terms/page.tsx
// Role: Terms of service page
// Connected files: constants.ts (SITE_CONFIG)
// Legal compliance: Standard terms of service
// Reference: LEGAL-002 (Terms of Service Template)

import { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_CONFIG.name}`,
  description: 'Terms of service governing the use of Montemflumen website and services.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Section className="pt-32 pb-16" background="muted">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Terms of Service
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Effective date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </Section>

      {/* Terms Content */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto prose dark:prose-invert">
          <p className="lead">
            These Terms of Service ("Terms") govern your access to and use of Montemflumen Inc.'s
            website and services. By accessing or using our services, you agree to be bound by these Terms.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using montemflumen.org (the "Website") and our services, you accept and
            agree to be bound by these Terms. If you do not agree to these Terms, you may not access
            or use our services.
          </p>

          <h2>2. Services Description</h2>
          <p>
            Montemflumen provides platform engineering consulting services, including but not limited
            to cloud infrastructure design, Kubernetes implementation, CI/CD pipeline development,
            and engineering team development.
          </p>

          <h2>3. Intellectual Property</h2>
          <p>
            All content on this Website, including text, graphics, logos, and software, is the
            property of Montemflumen or its licensors and is protected by intellectual property laws.
            You may not reproduce, distribute, or create derivative works without our express
            written permission.
          </p>

          <h2>4. User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Website for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt the Website or services</li>
            <li>Submit false or misleading information</li>
          </ul>

          <h2>5. Disclaimer of Warranties</h2>
          <p>
            The Website and services are provided "as is" and "as available" without warranties of any
            kind, either express or implied. We do not warrant that the services will be uninterrupted
            or error-free.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Montemflumen shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages resulting from your use of or
            inability to use the services.
          </p>

          <h2>7. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Montemflumen and its officers, directors,
            employees, and agents from any claims, damages, or expenses arising from your use of
            the services or violation of these Terms.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State
            of California, without regard to its conflict of law provisions.
          </p>

          <h2>9. Dispute Resolution</h2>
          <p>
            Any disputes arising under these Terms shall be resolved through binding arbitration in
            San Francisco, California, in accordance with the rules of the American Arbitration
            Association.
          </p>

          <h2>10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will provide notice of
            material changes by posting the updated Terms on this page and updating the effective date.
          </p>

          <h2>11. Contact Information</h2>
          <p>
            For questions about these Terms, please contact us at:
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
