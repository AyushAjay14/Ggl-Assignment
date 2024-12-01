//libs
import { gql, useMutation } from "@apollo/client";
import { useCallback } from "react";

//types
import { Destination } from "@/types";

const UPDATE_DESTINATION_MUTATION = gql`
  mutation UpdateDestination(
    $updateDestinationId: ID!
    $task: DestinationDTO!
  ) {
    updateDestination(id: $updateDestinationId, task: $task)
  }
`;

// type DestinationUpdater = {
//   [key: string]: (existing: string) => keyof Destination;
// };

export const useUpdateMutation = () => {
  const [updateDestination] = useMutation(UPDATE_DESTINATION_MUTATION);
  return useCallback(
    ({ id, _values }: { id: string; _values: Partial<Destination> }) =>
      updateDestination({
        variables: {
          updateDestinationId: id,
          task: _values,
        },
        optimisticResponse: {
          updateDestination: true,
        },
        update(cache) {
          cache.writeFragment({
            id: `Destination:${id}`,
            fragment: gql`
              fragment MyDestination on Destination {
                name
                destination
                location
                rating
              }
            `,
            data: { ..._values },
          });
          /*
          using cache.modify
            const _destinationId = cache.identify({
              id,
              __typename: "Destination",
            });
            cache.modify({
              id: _destinationId,
              fields: Object.keys(_values).reduce<DestinationUpdater>(
                (acc, key) => {
                  acc[key] = (existing) => _values[key] ?? existing;
                  return acc;
                },
                {}
              ),
            });
          */
        },
      }),
    [updateDestination]
  );
};
