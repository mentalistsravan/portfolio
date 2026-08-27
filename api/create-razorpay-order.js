export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency = 'INR', receipt, notes } = req.body || {};

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return res.status(400).json({ error: 'Invalid or missing amount' });
    }

    const keyId =
      process.env.RAZORPAY_KEY_ID ||
      process.env.VITE_RAZORPAY_KEY_ID ||
      'rzp_live_TUtOXJ88N8ANSp';
    const keySecret =
      process.env.RAZORPAY_KEY_SECRET ||
      'H5C2seKUlBJJmiAwsTJHfirf';

    if (!keyId || !keySecret) {
      return res.status(500).json({ error: 'Razorpay keys are not configured on the server' });
    }

    const auth = Buffer.from(`${keyId.trim()}:${keySecret.trim()}`).toString('base64');
    const amountInPaise = Math.round(Number(amount) * 100);

    const rzpResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency,
        receipt: receipt ? String(receipt).slice(0, 40) : `rcpt_${Date.now()}`,
        notes: notes || {}
      })
    });

    const data = await rzpResponse.json();

    if (!rzpResponse.ok) {
      console.error('Razorpay order creation failed:', data);
      return res.status(rzpResponse.status).json({
        error: data.error?.description || 'Failed to create Razorpay order',
        details: data
      });
    }

    return res.status(200).json({
      orderId: data.id,
      amount: data.amount,
      currency: data.currency,
      keyId: keyId.trim()
    });
  } catch (err) {
    console.error('Error in create-razorpay-order:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
