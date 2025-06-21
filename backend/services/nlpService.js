import natural from 'natural';

// Initialize classifier
const classifier = new natural.BayesClassifier();

// Salary
classifier.addDocument('salary credited', 'Salary');
classifier.addDocument('monthly salary', 'Salary');
classifier.addDocument('freelance payment', 'Salary');
classifier.addDocument('income received', 'Salary');
classifier.addDocument('project payment', 'Salary');
classifier.addDocument('bonus credited', 'Salary');

// Food
classifier.addDocument('food delivery', 'Food');
classifier.addDocument('restaurant bill', 'Food');
classifier.addDocument('grocery shopping', 'Food');
classifier.addDocument('supermarket purchase', 'Food');
classifier.addDocument('dinner at restaurant', 'Food');
classifier.addDocument('swiggy order', 'Food');
classifier.addDocument('zomato delivery', 'Food');
classifier.addDocument('coffee shop', 'Food');

// Entertainment
classifier.addDocument('movie tickets', 'Entertainment');
classifier.addDocument('cinema hall', 'Entertainment');
classifier.addDocument('netflix subscription', 'Entertainment');
classifier.addDocument('amazon prime subscription', 'Entertainment');
classifier.addDocument('spotify payment', 'Entertainment');
classifier.addDocument('concert ticket', 'Entertainment');
classifier.addDocument('game purchase', 'Entertainment');

// Shopping
classifier.addDocument('online shopping', 'Shopping');
classifier.addDocument('amazon purchase', 'Shopping');
classifier.addDocument('flipkart order', 'Shopping');
classifier.addDocument('clothing purchase', 'Shopping');
classifier.addDocument('electronics purchase', 'Shopping');
classifier.addDocument('mall shopping', 'Shopping');

// Health
classifier.addDocument('medical bill', 'Health');
classifier.addDocument('hospital visit', 'Health');
classifier.addDocument('medicine purchase', 'Health');
classifier.addDocument('doctor consultation', 'Health');
classifier.addDocument('health checkup', 'Health');
classifier.addDocument('lab test', 'Health');
classifier.addDocument('pharmacy bill', 'Health');

// Bills
classifier.addDocument('electricity bill', 'Bills');
classifier.addDocument('internet bill', 'Bills');
classifier.addDocument('mobile recharge', 'Bills');
classifier.addDocument('water bill', 'Bills');
classifier.addDocument('gas bill', 'Bills');
classifier.addDocument('credit card bill', 'Bills');
classifier.addDocument('loan emi payment', 'Bills');

// Travel
classifier.addDocument('travel booking', 'Travel');
classifier.addDocument('flight tickets', 'Travel');
classifier.addDocument('train tickets', 'Travel');
classifier.addDocument('uber ride', 'Travel');
classifier.addDocument('ola cab', 'Travel');
classifier.addDocument('bus booking', 'Travel');
classifier.addDocument('hotel booking', 'Travel');

// Education
classifier.addDocument('college fees', 'Education');
classifier.addDocument('exam fee', 'Education');
classifier.addDocument('online course purchase', 'Education');
classifier.addDocument('udemy subscription', 'Education');
classifier.addDocument('school fee', 'Education');
classifier.addDocument('tuition fees', 'Education');

// Miscellaneous
classifier.addDocument('gift purchase', 'Others');
classifier.addDocument('charity donation', 'Others');
classifier.addDocument('pet expenses', 'Others');
classifier.addDocument('home maintenance', 'Others');
classifier.addDocument('furniture purchase', 'Others');
classifier.addDocument('insurance premium', 'Others');

// Train the model
classifier.train();
export function categorizeTransaction(description) {
  if (!description || typeof description !== 'string') return 'Others';
  const category = classifier.classify(description.toLowerCase());
  return category || 'Others';
}