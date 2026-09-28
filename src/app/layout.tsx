import type { Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { event, eventDates } from '@/lib/event';
import './globals.css';

// The only typeface on the site. Variable, so every weight from 200 to 900
// comes from one file. Self-hosted at build time by next/font, so there is
// no runtime request to Google.
const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-sans',
});

export const metadata: Metadata = {
  title: {
    default: `${event.name} ${event.year}`,
    template: `%s · ${event.name} ${event.year}`,
  },
  description: `Hub for the ${event.edition} ${event.name}, ${eventDates}, San Diego.`,
  // Noindex while the event is unannounced, same as the 2026 hub. Revisit
  // when Nick wants this page found by search.
  robots: { index: false, follow: false, nocache: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sourceSans.variable}>
      <body className="min-h-screen">
        <Nav />
        <main className="mx-auto max-w-3xl px-0 pb-4 sm:px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
