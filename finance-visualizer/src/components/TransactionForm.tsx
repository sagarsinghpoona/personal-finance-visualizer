'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';

const transactionSchema = z.object({
  amount: z.number().min(-1000000).max(1000000),
  description: z.string().min(1).max(100),
  date: z.string(),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => Promise<void>;
  onCancel: () => void;
  initialData?: TransactionFormData;
}

export function TransactionForm({ onSubmit, onCancel, initialData }: TransactionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: initialData || {
      date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmitHandler = async (data: TransactionFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium mb-1">
          Amount
        </label>
        <input
          type="number"
          step="0.01"
          id="amount"
          {...register('amount', { valueAsNumber: true })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter amount (use negative for expenses)"
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <input
          type="text"
          id="description"
          {...register('description')}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter description"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium mb-1">
          Date
        </label>
        <input
          type="date"
          id="date"
          {...register('date')}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
