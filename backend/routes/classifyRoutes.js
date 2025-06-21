import express from 'express';
import { categorizeTransaction, getSampleDescription } from '../utils/classifier.js';  // your NLP logic here

const router = express.Router();

router.post('/', (req, res) => {
  const { description, category } = req.body;
  if (description) {
    const categoryPredicted = categorizeTransaction(description);
    return res.json({ category: categoryPredicted });
  }
  if (category) {
    // Return a sample description for the given category
    const sample = getSampleDescription(category);
    return res.json({ description: sample });
  }
  return res.status(400).json({ message: 'Description or category is required' });
});

export default router;
