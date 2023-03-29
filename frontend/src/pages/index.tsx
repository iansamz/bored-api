import type { NextPage } from "next";
import Head from "next/head";
import {
  Heading,
  Box,
  Center,
  UnorderedList,
  ListItem,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";

import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { useEffect, useState } from "react";
import { CreateActivitiesButton } from "../components/CreateActivitiesButton";
import { Activity } from "../types/Activitity";
import { SelectType } from "../components/SelectType/SelectType";

const Home: NextPage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [type, setType] = useState<string>();
  const [totalActivities, setTotalActivities] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchActivities = async () => {
    const { data } = await client.query({
      query: gql`
        query Activities($query: GetActivities, $limit: Int) {
          activities(query: $query, limit: $limit) {
            items {
              id
              activity
              type
              participants
              price
              link
              key
              accessibility
            }
            totalCount
          }
        }
      `,
      variables: {
        query: {
          type,
        },
        limit: 10,
        offset: null,
      },
    });
    setTotalActivities(data.activities.totalCount);
    setActivities(data.activities.items);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchActivities();
  }, [type]);

  return (
    <Box my="10">
      <Head>
        <title>Bored API</title>
        <meta name="description" content="Bored API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Center>
          <Heading
            role="heading"
            as="h1"
            color="white"
            borderRadius={4}
            mt={8}
            p={4}
            bg="#2464ec"
          >
            BORED API
          </Heading>
        </Center>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="8"
          mt="8"
        >
          <Box mt="4">
            <SelectType type={type} setType={setType} />
          </Box>
          {!isLoading ? (
            <Text>
              Here are {activities.length} activities of total {totalActivities}{" "}
            </Text>
          ) : (
            ""
          )}
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="self-start"
            gap="4"
          >
            {isLoading ? (
              <Spinner size="xl" color="blue" />
            ) : (
              activities.map((activity) => (
                <Box key={activity.id} mt={8}>
                  <Text fontSize="lg">Key: {activity.key}</Text>
                  <UnorderedList>
                    <ListItem>Activity: {activity.activity}</ListItem>
                    <ListItem>Type: {activity.type}</ListItem>
                    <ListItem>Participants: {activity.participants}</ListItem>
                    <ListItem>Price: {activity.price}</ListItem>
                    <ListItem>Link: {activity.link}</ListItem>
                    <ListItem>Accesibility: {activity.accessibility}</ListItem>
                  </UnorderedList>
                </Box>
              ))
            )}
          </Flex>
          <CreateActivitiesButton />
        </Flex>
      </Box>
    </Box>
  );
};

export default Home;
