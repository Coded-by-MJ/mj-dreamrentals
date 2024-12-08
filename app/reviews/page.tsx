import EmptyList from "@/components/home/EmptyList";
import {
  deleteReviewAction,
  fetchPropertyReviewsByUser,
} from "@/utils/actions";
import ReviewCard from "@/components/reviews/ReviewCard";
import Title from "@/components/properties/Title";
import FormContainer from "@/components/form/FormContainer";
import { IconButton } from "@/components/form/Buttons";
async function ReviewsPage() {
  const reviews = await fetchPropertyReviewsByUser();
  if (reviews.length === 0)
    return <EmptyList heading="You haven't written a review yet." />;

  return (
    <>
      <Title text="Your Reviews" />
      <section className="grid md:grid-cols-2 gap-8 mt-4 ">
        {reviews.map((review) => {
          const { comment, rating } = review;
          const { name } = review.property;
          const image = (review.property.images as string[])[0];
          const reviewInfo = {
            comment,
            rating,
            name,
            image,
          };
          return (
            <ReviewCard key={review.id} reviewInfo={reviewInfo}>
              <DeleteReview reviewId={review.id} />
            </ReviewCard>
          );
        })}
      </section>
    </>
  );
}

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteReview = deleteReviewAction.bind(null, { reviewId });
  return (
    <FormContainer action={deleteReview} className="absolute top-3 right-3">
      <IconButton actionType="delete" />
    </FormContainer>
  );
};

export default ReviewsPage;
