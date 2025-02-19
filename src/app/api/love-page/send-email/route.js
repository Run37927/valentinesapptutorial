import prisma from "@/lib/db";
import sgMail from "@sendgrid/mail"

sgMail.setApiKey(process.env.SENDGRID_APIKEY);
export async function POST(req) {
    try {
        const { responses, ownerId } = await req.json();
        const { answers } = responses;

        const owner = await prisma.user.findUnique({
            where: { id: ownerId },
            select: { email: true }
        })

        if (!owner) {
            return Response.json({ error: "owner not found" }, { status: 404 })
        }

        const formattedDate = new Date(answers.q4).toLocaleDateString();

        const emailContent = `
            Here are their responses:
            Q1: ${answers.q1}
            Q2: ${answers.q2}
            Q3: ${formattedDate}
            Q4: ${answers.q5}
            Q5: ${answers.q6}
            Q6: ${answers.q7}
        `
        const message = {
            to: owner.email,
            from: "hello@runbuilds.xyz",
            subject: "Someone has completed your can you go out with me!",
            text: emailContent,
            html: emailContent.replace(/\n/g, '<br>')
        }

        await sgMail.send(message);

        return Response.json({ success: true })
    } catch (error) {
        console.error('erro sending email', error)
        return Response.json({ error: "failed to send email" }, { status: 500 })
    }
}