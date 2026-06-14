type WhatsappPayload = {
  name: string;
  email: string;
  phone: string;
  category: string;
  service: string;
  date: string;
  slot: string;
};

export class ConsultationWhatsappService {

  private static async sendMessage(
    phone: string,
    message: string
  ) {
    const response = await fetch(
      `${process.env.WHATSAPP_API_URL}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,

          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          messaging_product:
            "whatsapp",

          recipient_type:
            "individual",

          to: phone,

          type: "text",

          text: {
            body: message,
          },
        }),
      }
    );

    if (!response.ok) {
      const error =
        await response.text();

      throw new Error(
        `WhatsApp API Error: ${error}`
      );
    }

    return response.json();
  }

  static async sendPatientWhatsapp(
    payload: WhatsappPayload
  ) {
    console.log(
      "Patient whatsapp sending with payload:",
      payload
    );

    await this.sendMessage(
      payload.phone,
      `
Hello ${payload.name},

Your consultation request has been received.

Category: ${payload.category}
Service: ${payload.service}

Date: ${payload.date}
Slot: ${payload.slot}

Our clinic team will contact you shortly.

Thank you.
      `.trim()
    );

    console.log(
      "Patient whatsapp sent successfully"
    );
  }

  static async sendClinicWhatsapp(
    payload: WhatsappPayload
  ) {
    console.log(
      "Clinic whatsapp sending with payload:",
      payload
    );

    await this.sendMessage(
      process.env.CLINIC_WHATSAPP_NUMBER!,
      `
🔔 New Consultation Booking

Patient: ${payload.name}
Phone: ${payload.phone}
Email: ${payload.email}

Category: ${payload.category}
Service: ${payload.service}

Date: ${payload.date}
Slot: ${payload.slot}
      `.trim()
    );

    console.log(
      "Clinic whatsapp sent successfully"
    );
  }
}