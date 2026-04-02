Finance Tracker
A modern, dark-themed personal finance dashboard built with React and TypeScript. This application allows users to track income and expenses, visualize spending patterns via a dynamic donut chart, and manage transaction history with local persistence.


Features
Real-time Dashboard: Summarizes total balance, monthly income, and total expenses.

Dynamic Donut Chart: Visualizes spending by category using CSS conic-gradient (no heavy libraries).

Data Persistence: Uses localStorage to keep your data safe even after a page refresh.


Technical Breakdown
1. State Management
The app uses the React useState hook to manage an array of transactions.

Create: Appends a new object to the state array.

Update: Uses a "Teleport" method to move existing data back into the form for editing.

Delete: Filters the array by ID to remove entries.

2. Local Storage Persistence
We ensure data survives refreshes by using useEffect.

Load: On initial mount, the app checks for a myTransactions key in the browser's storage.

Save: Every time the transactions state changes, the updated array is stringified and saved automatically.

3. The Spending Breakdown (Donut Chart)
Instead of using a heavy library like Chart.js, the chart is rendered using a single div with a conic-gradient. This calculates the percentage of each category (Food, Bills, etc.) and maps it to a color-coded degree on a 360° circle.
