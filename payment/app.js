const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { MongoClient } = require('mongodb');
const cron = require('node-cron');

const app = express();
app.use(bodyParser.json());

let db; // Database reference

// Connect to MongoDB
async function connectToDatabase() {
  try {
    const uri = 'mongodb://localhost:27017'; // Your MongoDB URI
    const dbName = 'yourDatabaseName'; // Your database name
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to database');
  } catch (err) {
    console.error('Error connecting to database:', err);
  }
}

// Endpoint to link wallet
app.post('/api/wallet/link', async (req, res) => {
  const { walletAddress } = req.body;
  if (!db) {
    res.status(500).json({ error: 'Database connection error' });
    return;
  }
  try {
    const walletsCollection = db.collection('wallets');
    await walletsCollection.insertOne({ address: walletAddress });
    res.status(200).json({ message: 'Wallet linked successfully', walletAddress });
  } catch (err) {
    console.error('Error linking wallet:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to unlink wallet
app.delete('/api/wallet/unlink', async (req, res) => {
  if (!db) {
    res.status(500).json({ error: 'Database connection error' });
    return;
  }
  try {
    const walletsCollection = db.collection('wallets');
    await walletsCollection.deleteMany({});
    res.status(200).json({ message: 'Wallet unlinked successfully' });
  } catch (err) {
    console.error('Error unlinking wallet:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to verify transaction ID from an external API
app.get('/api/transactions/:transactionId', async (req, res) => {
  const { transactionId } = req.params;

  try {
    const externalApiUrl = `https://external-api.com/verify?id=${transactionId}`;
    const response = await axios.get(externalApiUrl);

    if (response.data.status === 'confirmed') {
      res.status(200).json({ status: 'confirmed', walletAddress: 'YOUR_WALLET_ADDRESS_HERE' });
    } else {
      res.status(200).json({ status: 'pending' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mock database (replace with actual database integration)
let subscriptions = [];

// Endpoint to initiate a subscription
app.post('/api/subscribe', (req, res) => {
  const { transactionId, subscriptionPlan } = req.body;
  const paymentAmount = calculatePaymentAmount(subscriptionPlan);

  // Simulate transaction initiation
  console.log(`Initiating subscription for Transaction ID: ${transactionId}, Amount: ${paymentAmount} ADA`);

  // Schedule recurring payments using Node-cron
  scheduleRecurringPayment(transactionId, paymentAmount, subscriptionPlan);

  // Store subscription details (for demonstration)
  subscriptions.push({ transactionId, subscriptionPlan, paymentAmount });

  res.status(200).json({ message: 'Subscription initiated successfully', transactionId });
});

// Function to calculate payment amount based on the subscription plan
function calculatePaymentAmount(subscriptionPlan) {
  if (subscriptionPlan === '1') {
    return 50;
  } else if (subscriptionPlan === '3') {
    return 140;
  } else {
    // Add more subscription plan options as needed
    return 0;
  }
}

// Function to simulate scheduling recurring payments using cron
function scheduleRecurringPayment(transactionId, paymentAmount, subscriptionPlan) {
  const subscriptionMonths = parseInt(subscriptionPlan);
  const cronSchedule = `0 0 1 */${subscriptionMonths} * *`;

  cron.schedule(cronSchedule, async () => {
    try {
      // Logic to process recurring payments
      // This section should handle the actual charging of the paymentAmount and update subscription status

      // For demonstration, logging payment details
      console.log(`Processing recurring payment for Transaction ID: ${transactionId}, Amount: ${paymentAmount} ADA`);

      // Find and update subscription status in the subscriptions array or database
      const subscription = subscriptions.find(sub => sub.transactionId === transactionId);
      if (subscription) {
        subscription.paymentAmount = paymentAmount; // Update payment amount or subscription status
      }
    } catch (error) {
      console.error('Error processing recurring payment:', error);
    }
  });

  console.log(`Scheduled recurring payment for Transaction ID: ${transactionId}, Amount: ${paymentAmount} ADA for every ${subscriptionMonths} month(s)`);
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToDatabase(); // Connect to the database when the server starts
});
