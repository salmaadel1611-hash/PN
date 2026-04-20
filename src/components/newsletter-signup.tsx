'use client';

import { FormEvent, useState } from 'react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    setMessage(data.message || 'Done');
    if (res.ok) setEmail('');
  };

  return (
    <section className="rounded-lg border border-zinc-200 bg-zinc-50 p-5">
      <h3 className="text-lg font-semibold">Morning Briefing Newsletter</h3>
      <p className="mt-1 text-sm text-zinc-600">Get top energy and business headlines in your inbox daily.</p>
      <form className="mt-4 space-y-3" onSubmit={onSubmit}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
          className="w-full rounded border border-zinc-300 bg-white px-3 py-2 text-sm"
        />
        <button type="submit" className="w-full rounded bg-accent px-4 py-2 text-sm font-semibold text-white hover:opacity-95">
          Subscribe
        </button>
      </form>
      {message && <p className="mt-3 text-sm text-zinc-700">{message}</p>}
    </section>
  );
}
