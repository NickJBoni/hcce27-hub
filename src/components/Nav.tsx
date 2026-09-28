'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { event } from '@/lib/event';

// Two links by Nick's call 2026-09-27: nothing else is announced, and an
// empty Agenda or People tab makes the site look abandoned rather than early.
// Add them back here the moment they have content.
const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/getting-here', label: 'Getting Here' },
];

export default function Nav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-20 border-b-4 border-yellow bg-navy">
      <div className="mx-auto max-w-3xl px-4 pt-3">
        {/* Year first, from event.json, so the masthead cannot drift from the
            edition the rest of the site is describing. */}
        <Link href="/" className="display block text-base leading-tight text-paper">
          <span className="text-yellow">{event.year}</span>{' '}
          {event.name}
        </Link>
      </div>
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-3xl flex-wrap gap-x-1 gap-y-0.5 px-2 pb-2 pt-2"
      >
        {LINKS.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={[
                'whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-semibold transition-colors',
                active
                  ? 'bg-deepnavy text-yellow'
                  : 'text-offwhite hover:bg-deepnavy hover:text-yellow',
              ].join(' ')}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
