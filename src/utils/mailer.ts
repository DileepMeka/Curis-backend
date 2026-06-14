// import nodemailer from "nodemailer";

// export const transporter =
//   nodemailer.createTransport({
//     host: process.env.MAIL_HOST,

//     port: Number(
//       process.env.MAIL_PORT
//     ),

//     secure: true,

//     auth: {
//       user:
//         process.env.MAIL_USER,

//       pass:
//         process.env.MAIL_PASSWORD,
//     },
//   });

import { Resend } from "resend";

export const resend = new Resend(
  process.env.RESEND_API_KEY
);