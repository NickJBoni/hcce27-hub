import eventData from '../../data/event.json';

export interface Venue {
  name: string;
  address: string;
}

export interface EventMeta {
  name: string;
  year: number;
  edition: string;
  dates: string | null;
  datesTBD: string;
  venue: Venue;
  dressCode: string;
  timezone: string;
}

/** Strip every key beginning with "_" at any depth, so an internal note cannot render. */
function stripInternal<T>(value: T): T {
  if (Array.isArray(value)) return value.map(stripInternal) as unknown as T;
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (k.startsWith('_')) continue;
      out[k] = stripInternal(v);
    }
    return out as T;
  }
  return value;
}

export const event: EventMeta = stripInternal(eventData as unknown as EventMeta);

/** The dates, or the placeholder while they are unannounced. One place decides. */
export const eventDates: string = event.dates ?? event.datesTBD;

/** True once dates exist, for anything that should stay hidden until then. */
export const datesAnnounced: boolean = event.dates !== null;
