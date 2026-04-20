'use client';

import Link from 'next/link';
import { Menu, Moon, Search, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = ['Energy', 'Infrastructure', 'Economy', 'Companies', 'Opinion'];

export function SiteHeader() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/95">
      <div className="container-x flex h-16 items-center justify-between gap-3">
        <div className="flex items-center gap-6">
          <button className="md:hidden" aria-label="Open menu"><Menu className="h-5 w-5" /></button>
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight">
            Power<span className="text-accent">News</span>
          </Link>
          <nav className="hidden gap-4 md:flex">
            {navItems.map((item) => (
              <Link key={item} href={`/category/${item.toLowerCase()}`} className="text-sm font-medium text-zinc-700 hover:text-accent dark:text-zinc-300">
                {item}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button aria-label="Search" className="rounded p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"><Search className="h-5 w-5" /></button>
          <button aria-label="Toggle theme" className="rounded p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => setDarkMode((v) => !v)}>
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
