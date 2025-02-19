import PublicLovePage from "@/components/PublicLovePage";
import prisma from "@/lib/db";


async function page({ params }) {
  const { slug } = await params;

  const lovePage = await prisma.lovePage.findUnique({
    where: {
      slug,
      published: true
    }
  })

  if (!lovePage) {
    return <div className="text-center mt-10 text-2xl text-brand font-bold">Private Page</div>
  }

  return (
    <PublicLovePage initialData={lovePage} />
  )
}

export default page