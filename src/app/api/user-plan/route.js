import prisma from "@/lib/db";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                order: true
            }
        })

        const isPaid = !!user?.order?.isPaid;
        return Response.json({ isPaid })
    } catch (error) {
        console.error("error fetching user plan:", error)
        return Response.json({ error: 'internal server erorr' }, { status: 500 })
    }
}