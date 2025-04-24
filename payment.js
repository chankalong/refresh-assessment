document.getElementById('myButton_payment').addEventListener('click', async function() {
    const requestData = {
        amount: 10,
        description: "Hillman Group",
        account_code: "account",
        activity_code: "activity",
      };
      console.log('Initiating checkout with data:', requestData);

      const response = await fetch('https://payment-gateway-five-rho.vercel.app/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
});
