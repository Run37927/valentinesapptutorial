import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db";

export async function PATCH(req) {
    try {
        const session = await getAuthSession();

        if (!session?.user?.id) {
            return Response.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { searchParams } = new URL(req.url);
        const slug = searchParams.get('slug')
        const { stepId, updates, updateSettings } = await req.json();

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
            return Response.json({ error: "page not found" }, { status: 400 })
        }

        const updatedContent = JSON.parse(JSON.stringify(lovePage.content))

        if (updateSettings) {
            updatedContent.settings = {
                ...updatedContent.settings,
                ...updates.settings
            }
        } else {
            const stepIndex = updatedContent.steps.findIndex(step => step.id === stepId)
            if (stepIndex === -1) {
                return Response.json({ error: "step not found" }, { status: 404 })
            }
            updatedContent.steps[stepIndex] = {
                ...updatedContent.steps[stepIndex],
                ...updates
            }
        }

        const updatedPage = await prisma.lovePage.update({
            where: {
                slug,
                userId: session.user.id
            },
            data: {
                content: updatedContent
            }
        })

        return Response.json(updatedPage)
    } catch (error) {
        console.error("error updating love page:", error)
        return Response.json({ error: "something went wrong" }, { status: 500 })
    }
}