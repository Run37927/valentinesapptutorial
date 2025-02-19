import prisma from "@/lib/db";

export async function POST(req) {
    try {
        const { slug, responses } = await req.json();

        const lovePage = await prisma.lovePage.update({
            where: { slug },
            data: {
                responses: {
                    answers: responses
                }
            }
        })
        return Response.json(lovePage)
    } catch (error) {
        console.error('error saving response:', error)
        return Response.json({ error: "somehting went wrong" }, { status: 500 })
    }
}