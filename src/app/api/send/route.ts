import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data } = body;

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not defined in environment variables.");
      return NextResponse.json(
        { error: "Email service is not configured (missing API key)." },
        { status: 500 }
      );
    }

    // Determine recipient email (fallback to verified Resend email if not set in env)
    const recipientEmail = process.env.NOTIFICATION_EMAIL || "yashwantmaindad@gmail.com";

    if (!recipientEmail) {
      console.error("Recipient email is not configured.");
      return NextResponse.json(
        { error: "Recipient email is not configured." },
        { status: 500 }
      );
    }

    let subject = "";
    let htmlContent = "";

    if (type === "inquiry") {
      subject = `🔥 New Contact Inquiry: ${data.firstName} ${data.lastName}`;
      htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; rounded-lg: 8px;">
          <h2 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 0;">Hypertrex Fitness Contact Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563; width: 120px;">Name:</td>
              <td style="padding: 8px 0; color: #1f2937;">${data.firstName} ${data.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Email:</td>
              <td style="padding: 8px 0; color: #1f2937;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Phone:</td>
              <td style="padding: 8px 0; color: #1f2937;">${data.phone || "Not provided"}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-left: 4px solid #d4af37; border-radius: 4px;">
            <h4 style="margin-top: 0; margin-bottom: 8px; color: #374151;">Message:</h4>
            <p style="margin: 0; color: #4b5563; white-space: pre-wrap; line-height: 1.5;">${data.message}</p>
          </div>
        </div>
      `;
    } else if (type === "application") {
      subject = `🏆 Elite Coaching Application: ${data.name}`;
      
      const sections = [
        {
          title: "👤 PROFILE INFO",
          fields: [
            ["Name", data.name],
            ["Email", data.email],
            ["Phone", data.phone],
            ["WhatsApp", data.whatsapp],
            ["Instagram", data.instagram],
            ["Age", data.age],
            ["Gender", data.gender],
            ["Location", data.location],
            ["Height", data.height],
            ["Weight", data.weight],
          ]
        },
        {
          title: "🎯 GOALS & CONDITIONING",
          fields: [
            ["Primary Goal", data.goal],
            ["Current Diet", data.diet],
            ["Medical History", data.medical || "None"],
            ["Activity Level", data.activity],
            ["Time Commitment", data.commitment],
          ]
        },
        {
          title: "🔍 DIAGNOSTICS & MOTIVATION",
          fields: [
            ["Biggest Struggle", data.struggle],
            ["Why Failed Before", data.failedBefore],
            ["Motivation Level", data.motivation],
            ["Expected Outcome", data.expectedOutcome],
          ]
        },
        {
          title: "📅 DISCOVERY & DETAILS",
          fields: [
            ["Where heard", data.source],
            ["Referral source", data.referral || "None"],
            ["Duration choice", data.duration],
            ["Investment Choice", data.budget],
            ["Start Date", data.start],
          ]
        }
      ];

      let tableHtml = "";
      for (const section of sections) {
        tableHtml += `
          <h3 style="color: #d4af37; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; margin-top: 25px; margin-bottom: 12px; font-size: 14px; letter-spacing: 0.05em;">${section.title}</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px;">
        `;
        for (const [key, value] of section.fields) {
          tableHtml += `
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563; width: 180px; font-size: 13px; vertical-align: top;">${key}:</td>
              <td style="padding: 8px 0; color: #1f2937; font-size: 13px; line-height: 1.4; vertical-align: top;">${value || "N/A"}</td>
            </tr>
          `;
        }
        tableHtml += `</table>`;
      }

      htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 0; text-align: center; font-size: 20px;">Elite Online Coaching Application</h2>
          ${tableHtml}
        </div>
      `;
    } else {
      return NextResponse.json({ error: "Invalid form type." }, { status: 400 });
    }

    // Call Resend API via Fetch
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Hypertrex Fitness <onboarding@resend.dev>",
        to: [recipientEmail],
        subject: subject,
        html: htmlContent,
      }),
    });

    const resData = await response.json();

    if (!response.ok) {
      console.error("Resend API error response:", resData);
      return NextResponse.json(
        { error: resData.message || "Failed to send email." },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, id: resData.id });
  } catch (error: any) {
    console.error("Error in send API:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
