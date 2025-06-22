Budget Tracking Application

A full-stack AI-powered budget tracker to manage your income, expenses, and budgets with smart analytics and natural language processing.

Local Setup
-------------

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/budget-tracking-app.git
   cd budget-tracking-app
   ```

2. Install dependencies:

   Backend:
   ```bash
   cd backend
   npm install
   ```

   Frontend:
   ```bash
   cd ../frontend
   npm install
   ```

3. Configure environment variables:

   In `backend/.env`:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Run the app locally:

   Backend:
   ```bash
   cd backend
   npm start
   ```

   Frontend:
   ```bash
   cd frontend
   npm start
   ```
   - Frontend: [http://localhost:3000](http://localhost:3000) or [http://localhost:5173](http://localhost:5173) (Vite)
   - Backend: [http://localhost:5000](http://localhost:5000)

---

 
 
 AI Tools & Features
 -------------------

- NLP-based Auto-Categorization: 
     When you enter a transaction description, the app uses a Natural Language Processing (NLP) model (Node.js [natural](https://www.npmjs.com/package/natural)) to automatically predict and assign the most relevant category for your transaction.

- Smart Description Suggestions:  
      When you select a category, the AI suggests a sample description, making data entry faster and more intuitive.

- AI-Powered Overspending Alerts (Saving Predictor):
      The application analyzes your monthly spending patterns using AI. If it detects that you are spending significantly more in a category compared to your usual habits, it triggers an **overspending alert** on the dashboard:
  > ⚠ You are spending 30% more on Food this month.

- Anomaly Detection:
      The backend includes an AI-based anomaly detection system that continuously monitors your expenses. If your spending in any category exceeds your typical range, the system flags it and notifies you on the dashboard.

- Budget Status:  
      The dashboard compares your expenses with your set budget for each month and visually alerts you if you are "Over Budget" or "Under Budget".

In summary:  
This project uses AI not just for convenience, but to actively help you save money and make better financial decisions by predicting overspending and guiding your budgeting with intelligent, real-time feedback.

---

 3.  Deployment Steps
----------------------   

Frontend (Vercel)

1. Push your frontend code to GitHub.
2. Go to [Vercel](https://vercel.com/), import your repo, and deploy.
3. Set your backend API URL in `src/api/axios.js`:
   ```js
   baseURL: 'https://<your-backend-on-render>.onrender.com/api'
   ```
4. Update backend CORS to allow your Vercel domain.

Backend (Render)

1. Push your backend code to GitHub.
2. Go to [Render](https://render.com/), create a new Web Service, and connect your repo.
3. Set environment variables in Render:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Update backend CORS to allow:
   - Your Vercel frontend URL (e.g. `https://your-frontend.vercel.app`)
   - Localhost for development (`http://localhost:3000`, `http://localhost:5173`)
   ```js
   app.use(cors({
     origin: [
       'http://localhost:3000',
       'http://localhost:5173',
       'https://your-frontend.vercel.app'
     ],
     credentials: true
   }));
   ```


Live Link:https://effervescent-smakager-d1d169.netlify.app/
--------------------------------------------------------------
Now your AI-powered budget tracker is ready for both local development and cloud deployment
