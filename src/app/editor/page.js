import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PaymentSuccessModal from "@/components/PaymentSuccessModal";
import { getAuthSession } from "@/lib/auth"
import { redirect } from "next/navigation";

async function page({ searchParams }) {
    const session = await getAuthSession();

    if (!session?.user?.id) {
        return redirect('/sign-in')
    }

    const { success, session_id } = await searchParams;

    return (
        <MaxWidthWrapper className='mb-12 mt-8'>
            {success && session_id ? (
                <PaymentSuccessModal userId={session.user.id} />
            ): null}
        </MaxWidthWrapper>
    )
}

export default page