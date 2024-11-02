import { NextResponse } from 'next/server';

export async function GET() {
  const googleMapAPI = process.env.GOOGLE_MAP_API;

  if (!googleMapAPI) {
    return NextResponse.json({ error: "API key is not accessible" }, { status: 500 });
  }

  return NextResponse.json({ googleMapAPI }, { status: 200 });
}