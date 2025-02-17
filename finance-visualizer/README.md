# Personal Finance Visualizer

A modern web application for tracking personal finances, built with Next.js, React, and TypeScript.

![Personal Finance Visualizer Dashboard](docs/images/dashboard.png)

## Features

### Transaction Management
- Add, edit, and delete financial transactions
- Track transaction amounts, dates, and descriptions
- Automatic categorization of income and expenses

![Add Transaction](docs/images/add-transaction.png)

### Data Visualization
- Monthly expenses bar chart
- Real-time updates
- Responsive design for all devices

![Monthly Chart](docs/images/monthly-chart.png)

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **UI Components**: shadcn/ui, Tailwind CSS
- **Data Visualization**: Recharts
- **Form Handling**: React Hook Form, Zod
- **Data Storage**: Local JSON (development), MongoDB (production)

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/finance-visualizer.git
cd finance-visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
finance-visualizer/
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   └── page.tsx       # Main page
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   └── ...
│   ├── lib/              # Utilities and database
│   └── models/           # Data models
├── public/               # Static assets
└── ...
```

## Usage

### Adding a Transaction
1. Click the "Add Transaction" button
2. Fill in the amount (use negative for expenses)
3. Add a description
4. Select the date
5. Click "Save"

![Transaction List](docs/images/transaction-list.png)

### Viewing Statistics
- The monthly expenses chart automatically updates
- Green amounts indicate income
- Red amounts indicate expenses

## Development

### Local Storage
During development, transactions are stored in a local JSON file at `data/transactions.json`.

### API Routes
- `GET /api/transactions` - Fetch all transactions
- `POST /api/transactions` - Create a new transaction
- `DELETE /api/transactions/[id]` - Delete a transaction

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)

---

*Note: The screenshots in this README are placeholders. Replace them with actual screenshots of your running application.*
