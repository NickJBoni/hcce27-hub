import info from '../../data/info.json';

export default function Footer() {
  return (
    <footer className="mt-16 bg-nearblack">
      <div className="mx-auto max-w-3xl space-y-3 px-4 py-10 text-sm text-offwhite">
        <p className="display text-base text-gold">Questions</p>
        <p>
          <a className="text-yellow hover:underline" href={`mailto:${info.contact.email}`}>
            {info.contact.email}
          </a>
          <span aria-hidden="true" className="text-teal"> &middot; </span>
          <a className="text-yellow hover:underline" href={`tel:${info.contact.phone.replace(/\D/g, '')}`}>
            {info.contact.phone}
          </a>
        </p>
        <p className="pt-2 text-xs text-offwhite/70">Hosted by Digital Champions.</p>
      </div>
    </footer>
  );
}
