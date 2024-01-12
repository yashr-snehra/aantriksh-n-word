function initiatePayment() {
  const transactionId = document.getElementById('txnId').value;
  const paymentAmount = document.getElementById('paymentAmount').value;

  simulateTransactionInitiation(transactionId, paymentAmount);
}

function simulateTransactionInitiation(transactionId, amount) {
  console.log(`Initiating payment for Transaction ID: ${transactionId}, Amount: ${amount} ADA`);

  setTimeout(() => {
    checkPaymentConfirmation(transactionId);
  }, 5000);
}

function checkPaymentConfirmation(transactionId) {
  const isConfirmed = Math.random() < 0.5;
  if (isConfirmed) {
    displayPaymentStatus(`Payment for Transaction ID ${transactionId} confirmed.`);
  } else {
    displayPaymentStatus(`Payment for Transaction ID ${transactionId} pending. Please check again later.`);
  }
}

function displayPaymentStatus(message) {
  const paymentStatus = document.getElementById('paymentStatus');
  paymentStatus.textContent = message;
}

document.getElementById('paymentForm').addEventListener('submit', function(event) {
  event.preventDefault();
  document.getElementById('submitButton').disabled = true;
  document.getElementById('loadingIndicator').style.display = 'block';

  initiatePayment();
});

function linkWallet() {
  const walletAddress = prompt('Enter wallet address:');
  if (walletAddress) {
    fetch('/api/wallet/link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ walletAddress })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }
}

function unlinkWallet() {
  fetch('/api/wallet/unlink', {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
}
