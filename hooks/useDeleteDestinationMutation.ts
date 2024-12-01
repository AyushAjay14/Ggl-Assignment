import { gql, useMutation } from "@apollo/client";
import { useCallback } from "react";
import { GET_DESTINATIONS_QUERY } from "./useDestinationsQuery";

const DELETE_DESTINATION_MUTATION = gql`
  mutation DeleteDestination($deleteDestinationId: ID!) {
    deleteDestination(id: $deleteDestinationId) {
      id
    }
  }
`;

export const useDeleteDestinationMutation = () => {
  const [deleteDestination] = useMutation(DELETE_DESTINATION_MUTATION, {
    refetchQueries: [GET_DESTINATIONS_QUERY],
  });
  return useCallback(
    ({ id }: { id: string }) =>
      deleteDestination({
        variables: { deleteDestinationId: id },
        update(cache) {
          const _destinationId = cache.identify({
            id: id,
            __typename: "Destination",
          });
          cache.evict({ id: _destinationId });
        },
      }),
    [deleteDestination]
  );
};
