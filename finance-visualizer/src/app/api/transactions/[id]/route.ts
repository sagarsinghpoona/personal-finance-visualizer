import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    await db.updateTransaction(params.id, body);
    return NextResponse.json({ message: 'Transaction updated successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update transaction' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.deleteTransaction(params.id);
    return NextResponse.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete transaction' },
      { status: 500 }
    );
  }
}
