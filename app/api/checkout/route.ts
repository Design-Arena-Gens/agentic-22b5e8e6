import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, items } = body as { customer: { name: string; email: string; address: string }, items: Array<{ id: string; quantity: number }> };

    if (!customer?.name || !customer?.email || !customer?.address) {
      return NextResponse.json({ error: 'Invalid customer' }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Simulate processing and generate an order id
    const orderId = `ORD-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;

    return NextResponse.json({ success: true, orderId });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
