import EditableQuiz from "@/components/EditableQuiz";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

async function page({ params }) {
  const { slug } = await params;

  return (
    <MaxWidthWrapper className='mb-12 mt-8'>
      <EditableQuiz pageSlug={slug} />
    </MaxWidthWrapper>
  )
}

export default page