import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createCheckoutSession } from "./actions";

async function page() {
    const session = await getAuthSession();

    if (!session?.user?.id) {
        return redirect('/sign-in?intent=purchase')
    }

    const { url } = await createCheckoutSession({
        userEmail: session.user.email,
        userId: session.user.id
    })

    if (url) redirect(url);
}

export default page