import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};

    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'H5C2seKUlBJJmiAwsTJHfirf';

    if (!razorpay_payment_id) {
      return res.status(400).json({ error: 'Missing payment ID' });
    }

    // Verify HMAC-SHA256 signature if order_id is present
    if (razorpay_order_id && razorpay_signature) {
      const hmac = crypto.createHmac('sha256', keySecret.trim());
      hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const generatedSignature = hmac.digest('hex');

      if (generatedSignature !== razorpay_signature) {
        return res.status(400).json({
          valid: false,
          error: 'Razorpay payment signature verification failed'
        });
      }
    }

    return res.status(200).json({
      valid: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id || null
    });
  } catch (err) {
    console.error('Error in verify-razorpay-payment:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
