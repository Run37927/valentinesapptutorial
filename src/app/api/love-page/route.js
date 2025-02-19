import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET(req) {
    try {
        const session = await getAuthSession();

        if (!session?.user?.id) {
            return Response.json({ error: "unauthorized" }, { status: 401 })
        }

        const { searchParams } = new URL(req.url);
        const slug = searchParams.get("slug")

        if (!slug) {
            return Response.json({ error: "slug is required" }, { status: 400 })
        }

        const lovePage = await prisma.lovePage.findUnique({
            where: {
                slug,
                userId: session.user.id
            }
        })

        if (!lovePage) {
            return Response.json({ error: "page not found" }, { status: 404 })
        }

        return Response.json(lovePage)
    } catch (error) {
        console.error("error fetching love page: ", error);
        return Response.json({ error: "something went wrong" }, { status: 500 })
    }
}