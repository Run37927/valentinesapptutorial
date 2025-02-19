import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db";

export async function POST(req) {
    try {
        const session = await getAuthSession();
        if (!session?.user?.id) {
            return Response.json({ error: "unauthroized" }, { status: 401 })
        }

        const { slug } = await req.json();
        const lovePage = await prisma.lovePage.update({
            where: {
                slug,
                userId: session.user.id
            },
            data: {
                published: true
            }
        })

        return Response.json(lovePage)

    } catch (error) {
        console.error("error publishing page", error)
        return Response.json({ error: "something went wrong" }, { status: 500 })
    }
}