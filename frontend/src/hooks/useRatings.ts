import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ratingsApi,
  type Review,
  type ReviewPayload,
  type UserEventReview,
  type UserVenueReview,
  type AverageRatingResponse,
  type RatingTargetType,
  type fetchUserReviewsParams,
} from "../api/ratings";

/* =======================
   Query Keys
======================= */

const ratingKeys = {
  all: ["ratings"] as const,
  eventReviews: (eventId: string) =>
    [...ratingKeys.all, "event", eventId] as const,
  venueReviews: (venueId: string) =>
    [...ratingKeys.all, "venue", venueId] as const,
  userEventReviews: (filters?: fetchUserReviewsParams) =>
    filters
      ? ([...ratingKeys.all, "user", "events", filters] as const)
      : ([...ratingKeys.all, "user", "events"] as const),

  userVenueReviews: (filters?: fetchUserReviewsParams) =>
    [...ratingKeys.all, "user", "venues", filters] as const,
  average: (targetType: RatingTargetType, targetId: string) =>
    [...ratingKeys.all, "average", targetType, targetId] as const,
};

/* =======================
   Queries
======================= */

/* ----- Event Reviews ----- */
export const useEventReviews = (eventId: string | null) => {
  return useQuery<Review[]>({
    queryKey: ratingKeys.eventReviews(eventId ?? ""),
    queryFn: () => ratingsApi.fetchEventReviews(eventId!),
    enabled: !!eventId,
    staleTime: 1000 * 60 * 2,
  });
};

/* ----- Venue Reviews ----- */
export const useVenueReviews = (venueId: string | null) => {
  return useQuery<Review[]>({
    queryKey: ratingKeys.venueReviews(venueId ?? ""),
    queryFn: () => ratingsApi.fetchVenueReviews(venueId!),
    enabled: !!venueId,
    staleTime: 1000 * 60 * 2,
  });
};

/* ----- User Reviews (Dashboard) ----- */
export const useUserEventReviews = (filters?: fetchUserReviewsParams) => {
  return useQuery<UserEventReview[]>({
    queryKey: ratingKeys.userEventReviews(filters),
    queryFn: () => ratingsApi.fetchUserEventReviews(filters),
    staleTime: 1000 * 60 * 5,
  });
};

export const useUserVenueReviews = (filters?: fetchUserReviewsParams) => {
  return useQuery<UserVenueReview[]>({
    queryKey: ratingKeys.userVenueReviews(filters),
    queryFn: () => ratingsApi.fetchUserVenueReviews(filters),
    staleTime: 1000 * 60 * 5,
  });
};

/* ----- Average Rating ----- */
export const useAverageRating = (
  targetType: RatingTargetType,
  targetId: string | null
) => {
  return useQuery<AverageRatingResponse>({
    queryKey: ratingKeys.average(targetType, targetId ?? ""),
    queryFn: () => ratingsApi.fetchAverageRating(targetId!, targetType),
    enabled: !!targetId,
    staleTime: 1000 * 60 * 5,
  });
};

/* =======================
   Mutations
======================= */

/* ----- Create Review ----- */
export const useCreateReview = (
  targetType: RatingTargetType,
  targetId: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ReviewPayload) => {
      return targetType === "event"
        ? ratingsApi.createEventReview(targetId, payload)
        : ratingsApi.createVenueReview(targetId, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          targetType === "event"
            ? ratingKeys.eventReviews(targetId)
            : ratingKeys.venueReviews(targetId),
      });

      queryClient.invalidateQueries({
        queryKey: ratingKeys.average(targetType, targetId),
      });

      queryClient.invalidateQueries({
        queryKey:
          targetType === "event"
            ? ratingKeys.userEventReviews()
            : ratingKeys.userVenueReviews(),
      });
    },
  });
};

/* ----- Update Review ----- */
export const useUpdateReview = (
  targetType: RatingTargetType,
  targetId: string,
  reviewId: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ReviewPayload) => {
      return targetType === "event"
        ? ratingsApi.updateEventReview(targetId, reviewId, payload)
        : ratingsApi.updateVenueReview(targetId, reviewId, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          targetType === "event"
            ? ratingKeys.eventReviews(targetId)
            : ratingKeys.venueReviews(targetId),
      });

      queryClient.invalidateQueries({
        queryKey: ratingKeys.average(targetType, targetId),
      });

      queryClient.invalidateQueries({
        queryKey:
          targetType === "event"
            ? ratingKeys.userEventReviews()
            : ratingKeys.userVenueReviews(),
      });
    },
  });
};

/* ----- Delete Review ----- */
export const useDeleteReview = (
  targetType: RatingTargetType,
  targetId: string,
  reviewId: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return targetType === "event"
        ? ratingsApi.deleteEventReview(targetId, reviewId)
        : ratingsApi.deleteVenueReview(targetId, reviewId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          targetType === "event"
            ? ratingKeys.eventReviews(targetId)
            : ratingKeys.venueReviews(targetId),
      });

      queryClient.invalidateQueries({
        queryKey: ratingKeys.average(targetType, targetId),
      });

      queryClient.invalidateQueries({
        queryKey:
          targetType === "event"
            ? ratingKeys.userEventReviews()
            : ratingKeys.userVenueReviews(),
      });
    },
  });
};
