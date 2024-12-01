//libs
import { useMutation, gql } from "@apollo/client";
import { useCallback } from "react";
import toast from "react-hot-toast";

const ADD_NEW_DESTINATION_MUTATION = gql`
  mutation CreateDestination($task: DestinationDTO!) {
    createDestination(task: $task)
  }
`;

export const useAddNewDestinationMutation = () => {
  const onCompleted = useCallback(
    () => toast.success("New Destination successfully added."),
    []
  );
  const onError = useCallback(
    () => toast.error("Failed to add new Destination."),
    []
  );
  const [addDestination] = useMutation(ADD_NEW_DESTINATION_MUTATION, {
    onCompleted,
    onError,
  });
  return addDestination;
};
