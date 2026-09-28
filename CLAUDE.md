# HCCE 2027 Hub

The attendee hub for the 4th Annual Home Care Champions Experience, San Diego.
Static Next.js site, exported and deployed to Vercel.

**This is not the 2026 site.** The 2026 hub lives in `../hcce-hub` and is deployed at
`hcce-hub.vercel.app`. It is finished and frozen: attendees still use it for their
slide decks and photos. Never edit it to serve 2027, and never point this repo at it.

## Status, 2026-09-27

Dates are announced. No speakers, no partners, no agenda. This site exists so
there is a real URL to hand people and something to bookmark. Two pages only:

1. `/` Welcome. Says more is coming, tells people to bookmark it, shows the venue.
2. `/getting-here` Venue, parking, accommodations, flights, things to do, places to eat.
   This is the page with actual content, carried over from 2026.

Agenda, People, Info and the run of show are deliberately absent, not hidden behind a
flag. An empty tab reads as abandoned; a missing tab reads as early. Add each page back
when it has something on it, and add its link to `src/components/Nav.tsx` at the same
time.

## Dates

**September 15-17, 2027**, a Wednesday to Friday, set 2026-09-27. It lives once, in
`data/event.json`. Every surface reads `eventDates` from `src/lib/event.ts`, which falls
back to `datesTBD` when `dates` is null. Do not type a date into a component.

`datesAnnounced` is exported for anything that should appear only once dates exist.
Nothing uses it right now, and note what it is NOT for: the home page's "agenda,
speakers and partners are still to come" line was briefly gated on it, which would have
hidden that line the moment dates landed even though the lineup was still unknown. Dates
existing says nothing about the lineup existing.

## Hard copy rules

Carried over from 2026. These are not style preferences.

- **No em dashes.** Commas or full stops instead.
- **Do not write "conference."** It is an experience, an event, or by name.
- **Do not write "HCCE" in body copy.** Say the full name.
- **Every external link opens in a new tab.** `target="_blank"` with `rel="noreferrer"`.
- Fields prefixed `_note` or `_flag` are internal. `stripInternal` in `src/lib/event.ts`
  removes them before render. Never add a render path that bypasses it.
- Contact is hey@thedigitalchamps.com and 215-774-8772.

## Content provenance

- `data/getting-here.json` is 2026's file, carried over on Nick's confirmation that 2027
  is Yard and Sea in Pacific Beach again. One entry was dropped: the Miramar Air Show,
  whose copy named September 26-28, the 2026 show. Restore it with correct dates once
  2027 dates are set, or leave it out.
- `data/home.json` welcome copy is **Claude's draft**, not Nick's words, unlike the 2026
  file which was verbatim. Nick should rewrite it when he has a minute.
- The accommodations link is the permanent page on homecarechampionsexperience.com, not
  a dated room block, so it did not need replacing.

## Workflow

- Work on a branch. Never commit straight to main. Merge only when Nick says "merge".
- Mobile first. Most people open this on a phone.
- Ask before adding any dependency.
- The folder is under iCloud sync, so "name 2.ext" conflict copies can appear. They are
  gitignored. Never commit one.
- `robots` is noindex while the event is unannounced. Revisit when Nick wants it found.
