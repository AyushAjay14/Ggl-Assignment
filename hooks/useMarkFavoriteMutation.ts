//libs
import { useMutation, gql } from "@apollo/client";
import { useCallback } from "react";
import { toast } from "react-hot-toast";

const MARK_FAVORITE = gql`
  mutation MarkFavorite($markFavoriteId: ID!, $value: Boolean) {
    markFavorite(id: $markFavoriteId, value: $value)
  }
`;

export const useMarkFavoriteMutation = ({
  isFavorite,
}: {
  isFavorite?: boolean;
}) => {
  const onCompleted = useCallback(
    () =>
      toast.success(
        isFavorite ? "Added to favorites" : "Removed from favorites"
      ),
    [isFavorite]
  );
  const onError = useCallback(
    () =>
      toast.error(
        isFavorite
          ? "Could not unfavourite the project, please try again"
          : "Could not favourite the project, please try again."
      ),
    [isFavorite]
  );

  const [_toggleFavorite] = useMutation(MARK_FAVORITE, {
    onCompleted,
    onError,
  });
  return useCallback(
    ({ markFavoriteId }: { markFavoriteId: string }) =>
      _toggleFavorite({
        variables: { markFavoriteId, value: !isFavorite },
        optimisticResponse: {
          markFavorite: !isFavorite,
        },
        update: (cache) => {
          const destinationId = cache.identify({
            id: markFavoriteId,
            __typename: "Destination",
          });
          cache.modify({
            id: destinationId,
            fields: {
              favorite() {
                return !isFavorite;
              },
            },
          });
        },
      }),
    [_toggleFavorite, isFavorite]
  );
};
