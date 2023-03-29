import { gql } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import client from "../../../apollo-client";

export const CreateActivitiesButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const numActivities = 20;

  const createActivities = async () => {
    setIsLoading(true);

    const { data } = await client.mutate({
      mutation: gql`
        mutation CreateNewBoredActivities($numActivities: Int!) {
          createNewBoredActivities(numActivities: $numActivities) {
            id
            activity
            type
            participants
            price
            link
            key
            accessibility
          }
        }
      `,
      variables: {
        numActivities,
      },
    });

    // const { data } = await client.query({
    //   query: gql`
    //     query Activities($query: GetActivities, $limit: Int) {
    //       activities(query: $query, limit: $limit) {
    //         items {
    //           id
    //           activity
    //           type
    //           participants
    //           price
    //           link
    //           key
    //           accessibility
    //         }
    //         totalCount
    //       }
    //     }
    //   `,
    //   variables: {
    //     query: {
    //       type: "",
    //     },
    //     limit: 10,
    //     offset: null,
    //   },
    // });

    console.log(data);

    setIsLoading(false);
  };

  return (
    <Button
      isLoading={isLoading}
      colorScheme="blue"
      variant="solid"
      onClick={createActivities}
    >
      Create Activities
    </Button>
  );
};
