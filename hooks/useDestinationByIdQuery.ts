//libs
import { gql, useQuery } from "@apollo/client";

// types
import { Destination } from "@/types";

type Params = {
  id: string;
};

type ReturnType = {
  destination?: Destination;
  loading: boolean;
};

export const GET_DESTINATION_BY_ID = gql`
  query GetDestinationById($id: ID!) {
    getDestinationById(id: $id) {
      description
      favorite
      id
      location
      name
      rating
    }
  }
`;
// TODO: use apollo query for this
export const useDestinationByIdQuery = ({ id }: Params): ReturnType => {
  const { data, loading } = useQuery(GET_DESTINATION_BY_ID, {
    variables: {
      id,
    },
  });

  return {
    destination: data?.getDestinationById,
    loading,
  };
};
