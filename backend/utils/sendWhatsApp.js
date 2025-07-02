import twilio from 'twilio';

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

export const sendWhatsAppMessage = async (booking) => {
  await client.messages.create({
    body: `Hello! Your ${booking.type} booking is confirmed. Invoice ID: ${booking.paymentId}`,
    from: 'whatsapp:+14155238886', // Twilio's sandbox number
    to: `whatsapp:+91${booking.phone}`
  });
};
