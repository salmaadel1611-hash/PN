export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-zinc-200 py-8 text-sm text-zinc-600">
      <div className="container-x flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} PowerNews. All rights reserved.</p>
        <p>Energy • Infrastructure • Business intelligence for Egypt and MENA</p>
      </div>
    </footer>
  );
}
