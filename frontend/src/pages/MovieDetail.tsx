import { useEffect, useState } from "react";
import CastAndCrew from "../components/movieDetail/CastAndCrew";
import HeroSection from "../components/movieDetail/HeroSection";
import TrailerModal from "../components/movieDetail/TrailerModal";
import UserReviews from "../components/movieDetail/UserReviews";
import { getMovieById } from "../apis/movie.api";
import { useParams } from "react-router-dom";

export const MovieDetail = () => {
  const { id } = useParams();

  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const [movie, setMovie] = useState<any>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalReviewCount, setTotalReviewCount] = useState(0);

  // 👉 fetch movie + reviews
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const movieRes = await getMovieById(id);
        console.log("🚀 movieRes:", movieRes.data);
        setMovie(movieRes.data);

        //const reviewRes = await getMovieReviews(id);
        //setReviews(reviewRes);
        //setTotalReviewCount(reviewRes.length);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

//   // add review (call API)
//   const handleAddReview = async (
//     newReviewData: Omit<
//       Review,
//       "id" | "likes" | "isLiked" | "initials" | "time"
//     >,
//   ) => {
//     if (!id) return;

//     const res = await createReview(id, newReviewData);

//     setReviews([res, ...reviews]);
//     setTotalReviewCount((prev) => prev + 1);
//   };

//   const handleLikeReview = (id: string) => {
//     setReviews(
//       reviews.map((review) => {
//         if (review.id === id) {
//           const isLiked = !review.isLiked;
//           return {
//             ...review,
//             isLiked,
//             likes: review.likes + (isLiked ? 1 : -1),
//           };
//         }
//         return review;
//       }),
//     );
//   };

//   const handleDeleteReview = (id: string) => {
//     setReviews(reviews.filter((review) => review.id !== id));
//     setTotalReviewCount((prev) => prev - 1);
//   };

  return (
    <div className="pt-24 min-h-screen bg-background text-on-background font-body selection:bg-primary-fixed selection:text-on-primary-fixed overflow-x-hidden">
      <main>
        <HeroSection
          movie={movie}
          onWatchTrailer={() => setIsTrailerOpen(true)}
        />

        <CastAndCrew members={movie?.cast} />

        {/* <UserReviews
          reviews={reviews}
          onAddReview={handleAddReview}
          onLikeReview={handleLikeReview}
          onDeleteReview={handleDeleteReview}
          totalCount={totalReviewCount}
        /> */}
      </main>

      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        trailerUrl={movie?.trailerUrl}
      />
    </div>
  );
};
