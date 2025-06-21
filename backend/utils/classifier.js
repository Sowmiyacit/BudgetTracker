import natural from 'natural';

const classifier = new natural.BayesClassifier();

// Training data
classifier.addDocument('salary credited', 'Salary');
classifier.addDocument('monthly salary', 'Salary');
classifier.addDocument('food delivery', 'Food');
classifier.addDocument('restaurant bill', 'Food');
classifier.addDocument('movie tickets', 'Entertainment');
classifier.addDocument('cinema hall', 'Entertainment');
classifier.addDocument('online shopping', 'Shopping');
classifier.addDocument('amazon purchase', 'Shopping');
classifier.addDocument('medical bill', 'Health');
classifier.addDocument('hospital visit', 'Health');
classifier.addDocument('electricity bill', 'Bills');
classifier.addDocument('travel booking', 'Travel');
classifier.addDocument('flight tickets', 'Travel');

// Add more training data to improve accuracy
classifier.addDocument('grocery shopping', 'Food');
classifier.addDocument('bus ticket', 'Travel');
classifier.addDocument('train fare', 'Travel');
classifier.addDocument('doctor consultation', 'Health');
classifier.addDocument('medicines purchase', 'Health');
classifier.addDocument('shopping mall', 'Shopping');
classifier.addDocument('rental payment', 'Rent');
classifier.addDocument('netflix subscription', 'Entertainment');
classifier.addDocument('power bill', 'Bills');
classifier.addDocument('insurance premium', 'Bills');

// Train the model
classifier.train();

export function categorizeTransaction(description) {
  const category = classifier.classify(description.toLowerCase());
  return category || 'Other';
}


export function getSampleDescription(category) {
  const samples = {
    Food: "Lunch at restaurant",
    Rent: "Monthly house rent",
    Salary: "Salary credited",
    Travel: "Bus ticket",
    Shopping: "Online shopping",
    Entertainment: "Movie tickets",
    Health: "Medical bill",
    Bills: "Electricity bill",
    Other: "Miscellaneous expense"
  };
  return samples[category] || "";
}