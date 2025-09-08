import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOrderEmail = async (to, orderDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Your Order Confirmation",
    html: `
      <h2>Order Confirmed</h2>
      <p>Thank you for ordering from Foodie!</p>
      <p><strong>Order ID:</strong> ${orderDetails._id}</p>
      <p><strong>Status:</strong> ${orderDetails.status}</p>
      <p><strong>Total:</strong> ₹${orderDetails.total}</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

export default sendOrderEmail;
