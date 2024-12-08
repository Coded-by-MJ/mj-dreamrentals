import { Profile } from "@prisma/client";
import ReviewCard from "../reviews/ReviewCard";
import { fetchPropertyReviews, findExistingReview } from "@/utils/actions";
import { CircleAlert } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import SubmitReview from "../reviews/SubmitReview";

async function Reviews({
  propertyId,
  owner,
}: {
  propertyId: string;
  owner: Profile;
}) {
  const reviews = await fetchPropertyReviews(propertyId);
  const { userId } = await auth();
  const isNotOwner = owner.clerkId !== userId;
  const reviewDoesNotExist =
    userId && isNotOwner && !(await findExistingReview(userId, propertyId));
  return (
    <>
      <h2 className="font-bold text-main text-3xl mb-5">Guest Reviews</h2>

      <div className="w-full grid md:grid-cols-2 mb-5 gap-3 py-2 pr-3 max-h-[400px] overflow-y-auto scrollbar-thumb-primary scrollbar-track-muted scrollbar-thumb-rounded-md scrollbar-track-rounded-md scrollbar-thin">
        {reviews.length === 0 ? (
          <p className="flex items-center gap-1 text-sm text-primary my-3">
            <CircleAlert className="size-4 text-primary" />{" "}
            <span>No reviews available. Be the first to write one</span>{" "}
          </p>
        ) : (
          reviews.map((review) => {
            const { comment, rating } = review;
            const { firstName, lastName, imageUrl } = review.profile;
            return (
              <ReviewCard
                key={review.id}
                reviewInfo={{
                  comment,
                  rating,
                  name: `${firstName} ${lastName}`,
                  image: imageUrl,
                }}
              />
            );
          })
        )}
      </div>

      {reviewDoesNotExist && <SubmitReview propertyId={propertyId} />}
    </>
  );
}
export default Reviews;
