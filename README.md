# Hierarchical Table Lumel
A React application that displays a hierarchical data table with dynamic value allocation and variance calculation.

## Features

### Table Structure
- Hierarchical display with indentation to show parent-child relationships
- Calculation of subtotals based on child values
- Grand total row that sums all values

### Value Allocation
- Percentage-based allocation: Enter a percentage and click "Allocation %" to increase a row's value
- Direct value allocation: Enter a value and click "Allocation Val" to set a row's value directly

### Value Distribution
- When a parent row's value is changed directly, the change is distributed proportionally to all child rows
- Distribution is based on each child's contribution percentage to the parent's total

### Variance Tracking
- Real-time calculation of variance percentages based on original values
- Visual feedback on how values have changed

## Technologies Used
- React.js
- JavaScript (ES6+)
- CSS for styling

## Project Structure

```
src/
├── components/
│   ├── HierarchicalTable.jsx
│   ├── TableHeader.jsx
│   ├── TableRow.jsx
│   ├── RowInput.jsx
│   └── TableFooter.jsx
├── data/
│   └── initialData.js
├── styles/
│   ├── App.css
│   ├── HierarchicalTable.css
│   ├── TableHeader.css
│   ├── TableRow.css
│   ├── RowInput.css
│   └── TableFooter.css
├── App.jsx
└── index.js
```

## Component Hierarchy

```
App
└── HierarchicalTable
    ├── TableHeader
    ├── TableRow (recursive)
    │   └── RowInput
    └── TableFooter
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/SurajGupta8/hierarchial-table-lumel.git
   ```

2. Navigate to the project directory:
   ```
   cd hierarchial-table-lumel
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open http://localhost:5173/ in your browser

## Live Demo
View the live demo: [hierarchial-table-lumel](https://hierarchial-table-lumel.vercel.app/)
