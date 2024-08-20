// webhook.js
const express = require('express');
const router = express.Router();

router.post('/webhook', (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;
  let response;

  switch (intentName) {
    case 'GetCategories':
      response = {
        fulfillmentText: 'We have the following categories: Electronics, Fashion, Home, etc.'
      };
      break;
    // Add more cases for different intents
    default:
      response = {
        fulfillmentText: 'I did not understand that. Can you please rephrase?'
      };
      break;
  }

  res.json(response);
});

module.exports = router;
