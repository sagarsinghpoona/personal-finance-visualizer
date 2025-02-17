import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// For development, we'll use a local JSON file to store data
const DATA_FILE = path.join(process.cwd(), 'data', 'transactions.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'));
}

// Ensure transactions.json exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Mock MongoDB-like operations using local JSON file
export const db = {
  async connect() {
    return true;
  },
  
  async findTransactions() {
    try {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading transactions:', error);
      return [];
    }
  },

  async createTransaction(transaction: any) {
    try {
      const transactions = await this.findTransactions();
      const newTransaction = {
        _id: new mongoose.Types.ObjectId().toString(),
        ...transaction,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      transactions.push(newTransaction);
      fs.writeFileSync(DATA_FILE, JSON.stringify(transactions, null, 2));
      return newTransaction;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  },

  async deleteTransaction(id: string) {
    try {
      const transactions = await this.findTransactions();
      const filteredTransactions = transactions.filter((t: any) => t._id !== id);
      fs.writeFileSync(DATA_FILE, JSON.stringify(filteredTransactions, null, 2));
      return true;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  }
};

export default db;
