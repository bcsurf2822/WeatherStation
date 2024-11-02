import { NextResponse } from 'next/server';

export async function GET() {
  const googleMapAPI = process.env.GOOGLE_MAP_API; // Get the API key from environment variables

  if (!googleMapAPI) {
    return NextResponse.json({ error: "API key is not accessible" }, { status: 500 });
  }

  return NextResponse.json({ googleMapAPI }, { status: 200 });
}