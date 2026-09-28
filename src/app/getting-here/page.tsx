import type { Metadata } from 'next';
import Image from 'next/image';
import { event } from '@/lib/event';
import gettingHere from '../../../data/getting-here.json';

export const metadata: Metadata = { title: 'Getting Here' };

const PROSE_SECTIONS = ['flights', 'thingsToDo', 'eats'] as const;

interface ProseEntry {
  name: string;
  body: string[];
  url?: string;
}

interface ProseSection {
  title: string;
  items: ProseEntry[];
}

interface Parking {
  image: string | null;
  alt: string;
  copy: string | null;
}

interface LinkOut {
  label: string;
  url: string;
}

interface Stay {
  title: string;
  intro: string[];
  rentals: { copy: string; links: LinkOut[] };
  hotelsTitle: string;
  hotels: { name: string; url: string; distance: string }[];
}

export default function GettingHerePage() {
  const data = gettingHere as unknown as Record<string, ProseSection | undefined> & {
    parking: Parking;
    stay?: Stay;
  };
  const { parking, stay } = data;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${event.venue.name}, ${event.venue.address}`,
  )}`;

  return (
    <div className="space-y-8 px-4 pt-6 sm:px-0">
      <section className="bg-deepnavy p-5 shadow-sm">
        <h1 className="display text-2xl text-gold">{event.venue.name}</h1>
        <p className="mt-1 text-offwhite">{event.venue.address}</p>
        <p className="mt-3 text-sm">
          <a className="font-semibold text-yellow hover:underline" href={mapsUrl} target="_blank" rel="noreferrer">
            &rarr; Open in Maps
          </a>
        </p>
        <p className="mt-4 border-t border-teal pt-3 text-sm text-offwhite">
          <span className="display text-xs text-gold">Dress code</span>{' '}
          <span className="ml-1">{event.dressCode}</span>
        </p>
      </section>

      {parking?.image && (
        <section>
          <h2 className="display pb-3 text-xl text-navy">Parking</h2>
          <div className="overflow-hidden border-t-4 border-navy bg-paper shadow-sm">
            <Image
              src={parking.image}
              alt={parking.alt}
              width={1200}
              height={826}
              className="h-auto w-full"
            />
            {/* Renders only once Nick supplies a line. */}
            {parking.copy && <p className="p-4 text-sm text-muted">{parking.copy}</p>}
          </div>
        </section>
      )}

      {stay && (
        <section>
          <h2 className="display pb-3 text-xl text-navy">{stay.title}</h2>

          <div className="border-l-4 border-yellow bg-paper p-4 shadow-sm">
            {stay.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-ink/80">
                {paragraph}
              </p>
            ))}

            {/* The rental sites read as one sentence, so they sit inline rather
                than as their own cards. */}
            <p className="mt-3 text-sm leading-relaxed text-ink/80">
              {stay.rentals.links.map((link, i) => (
                <span key={link.url}>
                  {i > 0 && ' and '}
                  <a
                    className="font-semibold text-navy hover:underline"
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                </span>
              ))}{' '}
              {stay.rentals.copy}
            </p>
          </div>

          <h3 className="display pb-2 pt-6 text-sm text-muted">{stay.hotelsTitle}</h3>
          <ul className="grid gap-3">
            {stay.hotels.map((hotel) => (
              <li key={hotel.url} className="border-l-4 border-navy bg-paper shadow-sm">
                <a
                  href={hotel.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-baseline justify-between gap-3 p-4 transition-colors hover:bg-offwhite"
                >
                  <span className="font-semibold text-navy hover:underline">
                    &rarr; {hotel.name}
                  </span>
                  <span className="whitespace-nowrap text-xs text-muted">{hotel.distance}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {PROSE_SECTIONS.map((key) => {
        const section = data[key] as ProseSection | undefined;
        // Empty by design. Nothing renders until Nick supplies content.
        if (!section || section.items.length === 0) return null;

        return (
          <section key={key}>
            <h2 className="display pb-3 text-xl text-navy">{section.title}</h2>
            <ul className="grid gap-3">
              {section.items.map((entry) => (
                <li key={entry.name} className="border-l-4 border-navy bg-paper p-4 shadow-sm">
                  <h3 className="display text-lg text-navy">{entry.name}</h3>
                  {entry.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="mt-2 text-sm leading-relaxed text-muted">
                      {paragraph}
                    </p>
                  ))}
                  {entry.url && (
                    <p className="mt-3 text-sm">
                      <a
                        className="font-semibold text-navy hover:underline"
                        href={entry.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        &rarr; {entry.url.replace(/^https?:\/\//, '')}
                      </a>
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        );
      })}

    </div>
  );
}
