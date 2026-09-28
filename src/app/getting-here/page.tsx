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
  note?: string;
}

export default function GettingHerePage() {
  const data = gettingHere as unknown as Record<string, ProseSection | undefined> & {
    parking: Parking;
    accommodations?: LinkOut;
  };
  const { parking, accommodations } = data;

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

      {accommodations && (
        <section>
          <a
            href={accommodations.url}
            target="_blank"
            rel="noreferrer"
            className="block border-l-4 border-yellow bg-paper p-4 shadow-sm transition-colors hover:border-navy"
          >
            <p className="display text-lg text-navy">&rarr; {accommodations.label}</p>
            {accommodations.note && (
              <p className="mt-1 text-sm text-muted">{accommodations.note}</p>
            )}
          </a>
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
