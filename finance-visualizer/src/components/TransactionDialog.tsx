'use client';

import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { TransactionForm } from './TransactionForm';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface TransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => Promise<void>;
}

export function TransactionDialog({
  open,
  onOpenChange,
  onSubmit,
}: TransactionDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-semibold">
              Add Transaction
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </Dialog.Close>
          </div>
          <TransactionForm
            onSubmit={onSubmit}
            onCancel={() => onOpenChange(false)}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
