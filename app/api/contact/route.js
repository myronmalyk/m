import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const data = await req.json();
        const { name, email, message, honeypot } = data || {};

        // Honeypot anti-spam check
        if (honeypot) return Response.json({ ok: true });

        if (!name || !email || !message) {
            return Response.json({ ok: false, error: "Missing required fields" }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const html = `
            <div style="font-family: system-ui, Arial">
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, "<br>")}</p>
            </div>
        `;

        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: process.env.SMTP_TO,
            replyTo: email,
            subject: `New message from ${name} via Portfolio Contact Form`,
            text: `New contact form submission from ${name} (${email}):\n\n${message}`,
            html,
        });

        return Response.json({ ok: true });
    } catch (error) {
        console.error("Error sending email:", error);
        return Response.json({ ok: false, error: "Failed to send email" }, { status: 500 });
    }
}