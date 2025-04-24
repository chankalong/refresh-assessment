document.getElementById('myButton_payment').addEventListener('click', async function() {
    // Function to generate a UUID
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const merchantId = '010831209'; // Replace with your actual merchant ID
    const apiPassword = 'c68a08a7a20743305d6d48bb7aa12897'; // Replace with your actual API password
    const checkoutOrderId = generateUUID(); // Generate UUID for checkoutOrderId
    const requestData = {
        apiOperation: "INITIATE_CHECKOUT",
        interaction: {
          operation: "PURCHASE",
          merchant: {
            name: "Re:Fresh 精神健康自助平台",
            url: null
          },
          displayControl: {
            customerEmail: "MANDATORY"
          }
        },
        order: {
          amount: 10,
          currency: "HKD",
          id: checkoutOrderId, // Use the generated UUID here
          description: "Hillman Group",
          notificationUrl: "https://payment-gateway-five-rho.vercel.app/api/webhook"
        }
      };
      console.log('Initiating checkout with data:', requestData);
      
      const response = await fetch(
        `https://ap-gateway.mastercard.com/api/rest/version/100/merchant/${merchantId}/session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Basic ' + btoa(`merchant.${merchantId}:${apiPassword}`),
          },
          body: JSON.stringify(requestData)
        }
      );

      console.log('Checkout response status:', response.status);
      const data = await response.json();
      console.log('Checkout response data:', data);

      if (!response.ok) {
        throw new Error(`Failed to initiate checkout: ${data.error || 'Unknown error'}`);
      }

      if (data.session && data.session.id) {
      const url = 'https://ap-gateway.mastercard.com/checkout/pay/' + data.session.id + '?checkoutVersion=1.0.0'
        console.log('Redirecting to payment gateway:', url);
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        throw new Error('Invalid response format: missing session URL');
      }
        console.log('Payment initiated successfully');
});
