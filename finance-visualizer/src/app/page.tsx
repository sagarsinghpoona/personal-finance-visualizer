'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency, formatDate } from '@/lib/utils';
import { TransactionDialog } from '@/components/TransactionDialog';

interface Transaction {
  _id: string;
  amount: number;
  description: string;
  date: string;
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      if (!response.ok) throw new Error('Failed to fetch transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (data: Omit<Transaction, '_id'>) => {
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to add transaction');
      
      await fetchTransactions();
      setIsDialogOpen(false);
    } catch (err) {
      console.error('Failed to add transaction:', err);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete transaction');
      
      await fetchTransactions();
    } catch (err) {
      console.error('Failed to delete transaction:', err);
    }
  };

  const getMonthlyData = () => {
    const monthlyExpenses = transactions.reduce((acc: { [key: string]: number }, transaction) => {
      const date = new Date(transaction.date);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      acc[monthYear] = (acc[monthYear] || 0) + transaction.amount;
      return acc;
    }, {});

    return Object.entries(monthlyExpenses).map(([name, value]) => ({
      name,
      amount: value,
    }));
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Personal Finance Tracker</h1>
        <Button onClick={() => setIsDialogOpen(true)}>Add Transaction</Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getMonthlyData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="amount" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction._id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{formatDate(new Date(transaction.date))}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className={`font-semibold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {formatCurrency(transaction.amount)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTransaction(transaction._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TransactionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleAddTransaction}
      />
    </main>
  );
}
