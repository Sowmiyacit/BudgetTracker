import PDFDocument from 'pdfkit';
import Transaction from '../models/Transaction.js';

export const generatePDFReport = async (userId, res) => {
  const transactions = await Transaction.find({ user: userId });

  const doc = new PDFDocument();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');

  doc.pipe(res);

  doc.fontSize(20).text('Expense Report', { align: 'center' });
  doc.moveDown();

  transactions.forEach(tx => {
    doc.fontSize(12).text(
      `${tx.date.toISOString().split('T')[0]} | ${tx.type.toUpperCase()} | ${tx.category} | ₹${tx.amount} | ${tx.notes || ''}`
    );
  });

  doc.end();
};