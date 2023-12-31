import {
  Box,
  Text,
  Container,
  Grid,
  GridItem,
  Flex,
  Spacer,
  Card,
  CardHeader,
  CardBody,
  Heading,
  StackDivider,
  Stack,
  CardFooter,
  Button,
  ButtonGroup,
  SimpleGrid,
  HStack,
  Image,
  Center,
  AbsoluteCenter,
  Link,
  VStack,
  Highlight,
  Table,
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  IconButton,
  Badge,
  Select,
  Input,
  Divider,
  CloseButton,
  Tooltip,
  Spinner,
  Skeleton,
} from "@chakra-ui/react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DrawerMenu from "./Drawer";
import AlertItem from "./Alert";

export default function Page() {
  const [queryId, setQueryId] = useState("");
  const testUrl = `http://127.0.0.1:8000/api/entries/detail/${queryId}/`;
  const { data, isFetching, refetch, error, isError } = useQuery({
    queryKey: ["entries"],
    queryFn: getAllEntries,
  });
  const [fetchedEntry, setFetchedEntry] = useState(null);
  const [page, setPage] = useState(1);
  const entriesUrl = `http://127.0.0.1:8000/api/entries/list/?page=${page}`;
  const herokuEntriesUrl =
    "https://weight-tracking-app-a9db95db2d03.herokuapp.com/api/entries/detail/1/";

  async function getEntry() {
    const response = await fetch(testUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // return data;
    setFetchedEntry(data);
  }

  async function getAllEntries() {
    const response = await fetch(entriesUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
    // setFetchedEntry(data);
    // console.log(data);
  }

  const editUrl1 = "http://127.0.0.1:8000/api/entries/detail/1/edit";
  const editUrl2 = "http://127.0.0.1:8000/api/entries/edit";
  async function testUpdate(data = {}) {
    const response = await fetch(editUrl2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  //   useEffect(() => {
  //     console.log(fetchedEntry);
  //   }, [fetchedEntry]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  //   function handleClick(){
  //     getEntry(queryId)
  //   }
  return (
    <Container
      bg="gray.200"
      // w={[200, 300, 400, 500]}
      maxW={"100vw"}
      w={"100vw"}
      maxH={"100vh"}
      h={"100vh"}
      // display={"flex"}
      // flexDir={"column"}
      // maxW={[200, 300, 400, 500]}
      //   centerContent={true}
    >
      <ButtonGroup>
        <DrawerMenu />
      </ButtonGroup>
      <Box bg={"blue.400"}>
        <Heading>
          Test | <Button onClick={getAllEntries}>Get All Entries</Button>
        </Heading>
        <ButtonGroup>
          <Button
            onClick={() => {
              if (page === 1) {
                return;
              } else {
                setPage((page) => page - 1);
                refetch();
              }
            }}
          >
            -
          </Button>
          <Button isDisabled>Page: {page}</Button>
          <Button
            onClick={() => {
              setPage((page) => page + 1);
              refetch();
            }}
          >
            +
          </Button>
        </ButtonGroup>
        {isError && <AlertItem message={error.message} />}
        <SimpleGrid
          columns={[1, 2]}
          gap={4}
          p={3}
          m={5}
          shadow="md"
          borderWidth="1px"
        >
          <Box bg={"blue.200"}>
            <Heading>Test</Heading>
            <ButtonGroup>
              <Button onClick={getEntry}>Test</Button>
              <Input
                value={queryId}
                type="number"
                onChange={(e) => setQueryId(e.target.value)}
              />
              <Button
                onClick={() => {
                  testUpdate({ id: 2, weight: 420 }).then((data) =>
                    console.log(data)
                  );
                }}
              >
                test Update
              </Button>
            </ButtonGroup>
          </Box>

          {fetchedEntry && <DisplayData data={fetchedEntry} />}
          {/* {isFetching && <Spinner />}
          {data &&
            !isFetching &&
            data.map((entry, index) => <DisplayData data={entry} />)} */}
        </SimpleGrid>
      </Box>
    </Container>
  );
}

function DisplayData({ data }) {
  if (!data) return;
  return (
    <Card>
      <CardHeader>
        <Text>Weight: {data.weight}</Text>
        <Text>Recorded: {data.recorded}</Text>
      </CardHeader>
      <CardBody>
        <Text>ID: {data.id}</Text>
        <Text>User: {data.user}</Text>
        <Text>Note: {data.note}</Text>
        <Text>Created: {data.created}</Text>
        <Text>Updated: {data.Updated}</Text>
      </CardBody>
      <CardFooter>
        <ButtonGroup border={"1px solid gray"} borderRadius={4} p={2}>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
