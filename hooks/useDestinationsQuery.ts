//libs
import { useQuery, gql } from "@apollo/client";

// types
import { Destination } from "@/types";

type Params = {
  page: number;
  size?: number;
};

type ReturnType = {
  data?: {
    results: Destination[];
    totalCount: number;
  };
  loading: boolean;
};

const DEFAULT_SIZE = 3;

export const GET_DESTINATIONS_QUERY = gql`
  query destinations($page: Int!, $size: Int!) {
    destinations(page: $page, size: $size) {
      results {
        description
        favorite
        id
        location
        name
        rating
      }
    }
  }
`;

// TODO: use apollo query for this
export const useDestinationsQuery = ({
  page,
  size = DEFAULT_SIZE,
}: Params): ReturnType => {
  const { data, loading } = useQuery(GET_DESTINATIONS_QUERY, {
    variables: { page, size },
  });

  return { data: data?.destinations, loading };
};
