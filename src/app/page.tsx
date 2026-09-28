import Link from 'next/link';
import { datesAnnounced, event, eventDates } from '@/lib/event';
import home from '../../data/home.json';

export default function HomePage() {
  return (
    <div className="space-y-8 px-4 pt-6 sm:px-0">
      <section className="border-l-4 border-yellow bg-paper p-5 shadow-sm">
        <p className="display text-xs text-muted">{event.edition}</p>
        <h1 className="display mt-1 text-2xl leading-tight text-navy">{event.name}</h1>
        <p className="mt-2 text-sm font-semibold text-teal">
          {eventDates}
          <span aria-hidden="true"> &middot; </span>
          San Diego
        </p>
      </section>

      <section className="space-y-4">
        <p className="text-lg font-semibold leading-relaxed text-navy">{home.welcome.lead}</p>

        {home.welcome.body.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="leading-relaxed text-ink/80">
            {paragraph}
          </p>
        ))}

        <div className="border-l-4 border-yellow pl-4 pt-1">
          <p className="display text-lg text-navy">{home.welcome.signoff}</p>
          <p className="text-sm font-medium text-muted">{home.welcome.signature}</p>
        </div>
      </section>

      <nav aria-label="Sections">
        <Link
          href="/getting-here"
          className="block border-l-4 border-navy bg-paper p-4 shadow-sm transition-colors hover:border-yellow"
        >
          <p className="display text-lg text-navy">Getting Here</p>
          <p className="mt-0.5 text-sm text-muted">
            Venue, parking, accommodations, and what to do while you are in town
          </p>
        </Link>
      </nav>

      <section className="bg-deepnavy p-5 shadow-sm">
        <p className="display text-xs text-offwhite/70">Venue</p>
        <p className="display mt-0.5 text-lg text-gold">{event.venue.name}</p>
        <p className="mt-1 text-sm text-offwhite">{event.venue.address}</p>
        <p className="display mt-4 text-xs text-offwhite/70">Dates</p>
        <p className="mt-0.5 text-sm font-semibold text-yellow">{eventDates}</p>
        {/* Only once there is a schedule worth teasing. */}
        {!datesAnnounced && (
          <p className="mt-4 border-t border-teal pt-3 text-sm text-offwhite">
            Agenda, speakers, and partners are still to come. They will appear here as they
            are confirmed.
          </p>
        )}
      </section>
    </div>
  );
}
