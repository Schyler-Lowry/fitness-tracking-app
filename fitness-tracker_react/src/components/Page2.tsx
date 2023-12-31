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
  chakra,
  Hide,
  useDisclosure,
} from "@chakra-ui/react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import DrawerMenu from "./Drawer";
import AlertItem from "./Alert";
import MyModal, { Lorem, useModalContext } from "./Modal";
import { format } from "date-fns";
import { memo } from "react";
import { EditWeightEntryModal } from "./Modal2";

const Content = chakra("div", {
  baseStyle: {
    display: "grid",
    backgroundColor: "gray.100",
    // mt: "-100px",
    p: 4,
    // w: "100vw",
    w: "calc(100vw - 16px)",

    gridTemplateColumns: {
      base: "1fr",
      lg: "repeat(2,1fr)",
    },
    gridTemplateRows: {
      base: "repeat(3, auto)",
      lg: "repeat(2,auto)",
    },
    gridGap: "4",
    boxSizing: "border-box",
  },
});

export default function Page2() {
  return (
    // <FlexBoxGrid />
    <Main />
    // <MyGrid />
  );
}

function Main() {
  const [page, setPage] = useState(1);
  const { data, isFetching, refetch, isRefetching, error, isError } = useQuery({
    queryKey: ["entries"],
    queryFn: getAllEntries,
  });

  // const { testFunc } = useModalContext();
  // testFunc();
  const entriesUrl = `http://127.0.0.1:8000/api/entries/list/?page=${page}`;
  // {Array.from({ length: 10 }).map((_, index) => ())}

  return (
    <Box
      bg={"gray.200"}
      w={"100vw"}
      p={4}
      h={"100vh"}
      display={"flex"}
      overflowX={"hidden"}
      boxSizing={"border-box"}
      flexDir={"column"}
    >
      <Flex gap={4} mb={2} boxSizing={"border-box"}>
        <IconButton
          aria-label="homebutton"
          isRound
          boxSize={"3em"}
          icon={
            <Image
              // boxSize="3em"
              src="/icon.png"
            />
          }
        />
        <Spacer />

        <ButtonGroup>
          <DrawerMenu />
        </ButtonGroup>
      </Flex>
      <Flex justifyContent={"center"} mb={1}>
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
      </Flex>
      <MyModal>
        <Box display={"flex"} bg={"gray.400"} boxSizing={"border-box"}>
          <Grid
            border={"1px solid gray"}
            // h={"40vh"}
            // overflowY={"scroll"}
            w={"100vw"}
            gridTemplateColumns={{ base: "1fr", lg: "repeat(2,1fr)" }}
            gridGap={2}
            // p={2}

            // h={"60vh"}
            h={["350px", "60vh"]}
            bg={"gray.300"}
            overflowY={"scroll"}
            // overflowY={["scroll", "auto"]}
            boxSizing={"border-box"}
          >
            {data &&
              !isFetching &&
              !isRefetching &&
              data.map((entry) => (
                <GridItem key={entry.id}>
                  <DisplayData data={entry} />
                </GridItem>
              ))}
          </Grid>
        </Box>
        <Box
          display="flex"
          bg={"gray.500"}
          alignContent={"stretch"}
          justifyContent={"center"}
        >
          <MyModal.ModalUi></MyModal.ModalUi>
          {/* <MyModal.AddWeightEntryUi></MyModal.AddWeightEntryUi> */}

          {/* <Hide above="sm"> */}
          <ButtonGroup>
            {/* <DrawerMenu header="DrawerTwo" content={<MuhContent />} /> */}
            {/* <ModalUi title="The Modal" body={<MyForm />} /> */}
            {/* <Button onClick={() => setIsAdding(true)}>Modal</Button> */}
            <OpenAddWeightEntryModal />
          </ButtonGroup>
          {/* </Hide> */}
        </Box>
      </MyModal>
    </Box>
  );
}

function OpenAddWeightEntryModal() {
  const { myOpen, onOpen, onClose, setIsAdding } = useModalContext();

  return <Button onClick={() => setIsAdding(true)}>Modal</Button>;
}
export function DisplayData({ data }) {
  const { myOpen, isOpen, onOpen, onClose, setIsEditing, setFormData } =
    useModalContext();

  if (!data) return;
  // console.log(format(data.recorded, "EEEE MMM do, yyyy @ HH:mm a"));
  // const recorded = format(data.recorded, "EEEE MMM do, yyyy @ HH:mm a");
  const recorded = {
    dayOfWeek: format(data.recorded, "EEEE"),
    month: format(data.recorded, "MMMM"),
    dayOfMonth: format(data.recorded, "do"),
    year: format(data.recorded, "yyyy"),
    time: format(data.recorded, "HH:mm"),
    timeOfDay: format(data.recorded, "a"),
  };

  const updated = {
    dayOfWeek: format(data.updated, "EEEE"),
    month: format(data.updated, "MMMM"),
    dayOfMonth: format(data.updated, "do"),
    year: format(data.updated, "yyyy"),
    time: format(data.updated, "HH:mm"),
    timeOfDay: format(data.updated, "a"),
  };

  const created = {
    dayOfWeek: format(data.created, "EEEE"),
    month: format(data.created, "MMMM"),
    dayOfMonth: format(data.created, "do"),
    year: format(data.created, "yyyy"),
    time: format(data.created, "HH:mm"),
    timeOfDay: format(data.created, "a"),
  };

  // console.log(Object.keys(updated).map((key) => updated[key]));

  return (
    <>
      <Card>
        <CardHeader>
          <Text>Weight: {data.weight}</Text>
          <Text>
            Recorded: {format(data.recorded, "EEEE MMM do, yyyy @ HH:mm a")}
          </Text>
        </CardHeader>
        <CardBody>
          <Text>ID: {data.id}</Text>
          <Text>User: {data.username}</Text>
          <Text>Note: {data.note}</Text>
          <Text>
            Created: {Object.keys(updated).map((key) => created[key] + " ")}
          </Text>
          <Text>
            Updated: {Object.keys(updated).map((key) => updated[key] + " ")}
          </Text>
          {/* <Text>
          Updated: {updated.dayOfWeek} {updated.month} {updated.dayOfMonth},{" "}
          {updated.year} @ {updated.time} {updated.timeOfDay}
        </Text> */}
        </CardBody>
        <CardFooter>
          <ButtonGroup border={"1px solid gray"} borderRadius={4} p={2}>
            <Button
              onClick={() => {
                // console.log("edit clicked");
                myOpen({ ...data });
                setIsEditing(true);
                setFormData({ ...data });
                // onOpen();
              }}
            >
              Edit
            </Button>
            <Button>Delete</Button>
            <EditWeightEntryModal data={data} />
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
}

export function MuhContent() {
  return (
    <Box>
      <Text>some sTUFFF</Text>
      <ButtonGroup>
        <DrawerMenu
          header="DrawerThree"
          content={<Text>Here's some stuff</Text>}
        />
        <MyModal title="The Modal" body={<Lorem />} />
      </ButtonGroup>
    </Box>
  );
}
