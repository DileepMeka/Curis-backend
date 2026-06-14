import { transporter }
from "../../utils/mailer";

type MailPayload = {
  name: string;
  email: string;
  phone: string;
  category: string;
  service: string;
  date: string;
  slot: string;
};

export class ConsultationMailService {

  static async sendPatientMail(
    payload: MailPayload
  ) {
    console.log("Clinic mail sending with payload:", payload);
    await transporter.sendMail({
  from: process.env.MAIL_USER,

  to: payload.email,

  subject: "Your Consultation Request Has Been Received",

  html: `
  <div style="
    max-width: 650px;
    margin: 0 auto;
    font-family: Arial, Helvetica, sans-serif;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
  ">

    <div style="
      background: #111827;
      padding: 30px;
      text-align: center;
    ">
      <h1 style="
        color: white;
        margin: 0;
        font-size: 28px;
      ">
        Consultation Request Received
      </h1>
    </div>

    <div style="padding: 30px;">

      <p style="
        font-size: 16px;
        color: #374151;
      ">
        Dear <strong>${payload.name}</strong>,
      </p>

      <p style="
        font-size: 15px;
        line-height: 1.8;
        color: #4b5563;
      ">
        Thank you for choosing our clinic.
        We have successfully received your consultation request.
        Our team will review the details and contact you shortly to confirm your appointment.
      </p>

      <div style="
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        padding: 20px;
        margin: 25px 0;
      ">

        <h3 style="
          margin-top: 0;
          color: #111827;
        ">
          Appointment Details
        </h3>

        <table style="
          width: 100%;
          border-collapse: collapse;
        ">
          <tr>
            <td style="padding: 8px 0;"><strong>Category</strong></td>
            <td>${payload.category}</td>
          </tr>

          <tr>
            <td style="padding: 8px 0;"><strong>Service</strong></td>
            <td>${payload.service}</td>
          </tr>

          <tr>
            <td style="padding: 8px 0;"><strong>Date</strong></td>
            <td>${payload.date}</td>
          </tr>

          <tr>
            <td style="padding: 8px 0;"><strong>Time Slot</strong></td>
            <td>${payload.slot}</td>
          </tr>
        </table>
      </div>

      <p style="
        font-size: 15px;
        line-height: 1.8;
        color: #4b5563;
      ">
        If you need to make any changes or have any questions,
        please feel free to contact our clinic.
      </p>

      <p style="
        margin-top: 30px;
        color: #111827;
      ">
        Warm Regards,<br/>
        <strong>ABC Skin & Hair Clinic</strong>
      </p>

    </div>

    <div style="
      background: #f3f4f6;
      padding: 15px;
      text-align: center;
      font-size: 12px;
      color: #6b7280;
    ">
      This is an automated confirmation email.
    </div>

  </div>
  `,
});
  }
  static async sendClinicMail(
      payload: MailPayload
    ) {
      console.log("Clinic mail sending with payload:", payload);
    await transporter.sendMail({
  from: process.env.MAIL_USER,

  to: process.env.CLINIC_EMAIL,

  subject: "📅 New Consultation Booking",

  html: `
  <div style="
    max-width: 700px;
    margin: 0 auto;
    font-family: Arial, Helvetica, sans-serif;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
  ">

    <div style="
      background: #059669;
      padding: 25px;
      text-align: center;
    ">
      <h2 style="
        color: white;
        margin: 0;
      ">
        New Consultation Booking
      </h2>
    </div>

    <div style="padding: 30px;">

      <p style="
        font-size: 16px;
        color: #374151;
      ">
        A new consultation request has been submitted.
      </p>

      <div style="
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        padding: 20px;
      ">

        <table style="
          width: 100%;
          border-collapse: collapse;
        ">

          <tr>
            <td style="padding: 10px 0;"><strong>Patient Name</strong></td>
            <td>${payload.name}</td>
          </tr>

          <tr>
            <td style="padding: 10px 0;"><strong>Email</strong></td>
            <td>${payload.email}</td>
          </tr>

          <tr>
            <td style="padding: 10px 0;"><strong>Phone</strong></td>
            <td>${payload.phone}</td>
          </tr>

          <tr>
            <td style="padding: 10px 0;"><strong>Category</strong></td>
            <td>${payload.category}</td>
          </tr>

          <tr>
            <td style="padding: 10px 0;"><strong>Service</strong></td>
            <td>${payload.service}</td>
          </tr>

          <tr>
            <td style="padding: 10px 0;"><strong>Preferred Date</strong></td>
            <td>${payload.date}</td>
          </tr>

          <tr>
            <td style="padding: 10px 0;"><strong>Preferred Slot</strong></td>
            <td>${payload.slot}</td>
          </tr>

        </table>

      </div>

      <div style="
        margin-top: 25px;
        padding: 15px;
        background: #ecfdf5;
        border-left: 4px solid #10b981;
      ">
        <strong>Action Required:</strong><br/>
        Contact the patient and confirm the appointment.
      </div>

    </div>

  </div>
  `,
});
    console.log("Clinic mail sent successfully");
  }
}