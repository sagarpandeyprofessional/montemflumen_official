/**
 * File path: src/app/team/page.tsx
 * Role/responsibility: Team listing page with all team members
 * Connections: Loads from markdown via content.ts, links to individual profiles
 * Data/copy source: Team markdown files in content/team/
 * Reference: PIT-76 (undefined.map/includes prevention)
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Section, SectionHeader, Card, CardContent, Tag } from '@/components/ui';
import { getAllTeamMembers } from '@/lib/content';
import { EMPTY_STATES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Team',
  description: 'Meet the engineers, operators, and advisors behind Montemflumen.',
};

export default async function TeamPage() {
  const teamMembers = await getAllTeamMembers();

  // Group members by type (core vs advisors)
  // PIT-76: Safe array access with fallback
  const coreTeam = teamMembers.filter((m) => !(m.tags || []).includes('Advisor'));
  const advisors = teamMembers.filter((m) => (m.tags || []).includes('Advisor'));

  if (teamMembers.length === 0) {
    return (
      <Section>
        <div className="py-16 text-center">
          <h1 className="text-display-2 mb-4">{EMPTY_STATES.team.title}</h1>
          <p className="text-body-lg text-ash-600 dark:text-ash-400">
            {EMPTY_STATES.team.message}
          </p>
        </div>
      </Section>
    );
  }

  return (
    <>
            {/* Hero */}
        <Section className="relative overflow-hidden">
          {/* Full-bleed background that fits the entire hero section */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <Image
              src="/images/banners/banner.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-40 dark:opacity-100"
            />
            {/* Overlay for readability (lower the /70 to /40 if you want the image stronger) */}
            <div className="absolute inset-0 bg-picket-100/70 dark:bg-forest-950/70" />
          </div>

          <div className="py-8 md:py-12 lg:py-16 relative z-10">
            <h1 className="text-display-1 mb-6">Our Team</h1>
            <p className="text-body-lg text-ash-600 dark:text-ash-400 max-w-3xl">
              Meet the engineers, operators, and advisors who make Montemflumen what it is.
              We come from diverse backgrounds but share a passion for building great platforms.
            </p>
          </div>
        </Section>


      {/* Core Team */}
      {coreTeam.length > 0 && (
        <Section background="muted">
          <SectionHeader
            title="Core Team"
            subtitle="The people building and delivering for our clients"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreTeam.map((member, index) => {
              const memberTags = member.tags || [];
              return (
                <Link
                  key={member.slug}
                  href={`/team/${member.slug}`}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Card hoverable className="h-full">
                    <CardContent className="p-6 text-center">
                      {member.image ? (
                        <div className="w-full aspect-square mb-4 relative rounded-lg overflow-hidden">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className="w-full aspect-square mb-4 rounded-lg bg-gradient-to-br from-forest-200 to-ash-200 dark:from-forest-700 dark:to-forest-800" />
                      )}
                      <h3 className="text-heading-2 mb-1 group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-body-sm text-ash-600 dark:text-ash-400 mb-3">
                        {member.role}
                      </p>
                      {memberTags.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-1 mt-4">
                          {memberTags.slice(0, 3).map((tag) => (
                            <Tag key={tag} size="sm">
                              {tag}
                            </Tag>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Section>
      )}

      {/* Advisors */}
      {advisors.length > 0 && (
        <Section>
          <SectionHeader
            title="Advisors"
            subtitle="External experts who guide our strategy and approach"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisors.map((member, index) => (
              <Link
                key={member.slug}
                href={`/team/${member.slug}`}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Card hoverable className="h-full">
                  <CardContent className="p-6 text-center">
                    {member.image ? (
                      <div className="w-full aspect-square mb-4 relative rounded-lg overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-square mb-4 rounded-lg bg-gradient-to-br from-ash-200 to-ash-300 dark:from-forest-800 dark:to-forest-700" />
                    )}
                    <h3 className="text-heading-2 mb-1 group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-body-sm text-ash-600 dark:text-ash-400 mb-3">
                      {member.role}
                    </p>
                    {member.tags && member.tags.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-1 mt-4">
                        {member.tags.slice(0, 3).map((tag) => (
                          <Tag key={tag} size="sm">
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
