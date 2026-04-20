import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ message: 'Invalid email.' }, { status: 400 });
  }

  return NextResponse.json({ message: 'Subscribed successfully', email });
}
