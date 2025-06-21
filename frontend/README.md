# Budget Tracking Application

A full-stack web application to track your income, expenses, budgets, and get smart insights using NLP.

---

## Features

- **User Authentication**: Register and log in securely.
- **Add Transactions**: Record income and expenses with category and description.
- **NLP Auto-Categorization**: Category is predicted from description using NLP (Natural Language Processing).
- **Smart Suggestions**: Get sample descriptions when you select a category.
- **Monthly Budgets**: Set and view budgets for each month.
- **Dashboard**: Visualize income, expenses, budgets, and category-wise spending.
- **Overspending Alerts**: AI detects and alerts you about overspending.
- **Responsive UI**: Works on desktop and mobile.

---

## Tech Stack

- **Frontend**: React, Redux Toolkit, Axios, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **NLP**: [natural](https://www.npmjs.com/package/natural) (Node.js NLP library)
- **Authentication**: JWT

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/budget-tracking-app.git
cd budget-tracking-app
```

### 2. Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3. Set up environment variables

#### Backend

Create a `.env` file in the `backend` folder:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

### 4. Run the app

#### Backend

```bash
cd backend
npm start
```

#### Frontend

```bash
cd frontend
npm start
```

- The frontend runs on [http://localhost:3000](http://localhost:3000)
- The backend runs on [http://localhost:5000](http://localhost:5000)

---

## Folder Structure

```
backend/
  controllers/
  models/
  routes/
  services/
  utils/
  server.js
frontend/
  src/
    components/
    pages/
    redux/
    api/
    App.js
    index.js
```

---

## Usage

1. **Register** a new account or log in.
2. **Add transactions** with amount, date, type, category, and description.
3. **Set monthly budgets** in the Budget page.
4. **View dashboard** for charts, summaries, and overspending alerts.
5. **Edit or delete** transactions as needed.

---

## Notes

- **Month Format**: Always use `"MMM YYYY"` (e.g., `"Jun 2025"`) for months.
- **NLP**: Description auto-predicts category, and category can suggest a sample description.
- **API Endpoints**: All backend endpoints are under `/api`.

---

## License

MIT

---

**Happy Budgeting!**