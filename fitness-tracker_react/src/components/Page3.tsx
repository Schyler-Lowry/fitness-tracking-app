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
  Editable,
  EditableInput,
  EditablePreview,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  LinkBox,
  LinkOverlay,
  useHighlight,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
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
import {
  AddWeightEntryModal,
  DeleteWeightEntryModal,
  EditWeightEntryModal,
  TestModal,
} from "./Modal2";
import { useCheckLogin } from "../hooks/useAuthentication";
import { useGetAllWeightEntries } from "../hooks/useWeightEntries";
import { useSearchParams } from "react-router-dom";
import {
  BsClock,
  BsClockFill,
  BsPenFill,
  BsPencil,
  BsPencilSquare,
  BsTrash,
  BsTrashFill,
} from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";

import { QuestionOutlineIcon } from "@chakra-ui/icons";
import DropdownMenu from "./DropdownMenu";
import { useAuthentication } from "../context/AuthenticationContext";
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

export default function Page3() {
  return (
    // <FlexBoxGrid />
    <Main />
    // <MyGrid />
  );
}

function Main() {
  const { data, isFetching, refetch, isRefetching, error, isError } =
    useGetAllWeightEntries();
  const {
    user,
    isFetching: isLoggingIn,
    error: loginError,
    isError: isLoginError,
    isAuthenticated,
  } = useCheckLogin();

  // const { isAuthenticated } = useAuthentication();

  // const { testFunc } = useModalContext();
  // testFunc();
  // {Array.from({ length: 10 }).map((_, index) => ())}

  return (
    <Box
      // bg={"gray.200"}
      // bgGradient={
      //   "repeating-linear(180deg,teal.200,teal.900, teal.200, teal.900)"
      // }
      bgGradient={"repeating-radial(gray.200, gray.400)"}
      w={"100vw"}
      p={4}
      h={"100vh"}
      display={"flex"}
      overflowX={"hidden"}
      boxSizing={"border-box"}
      flexDir={"column"}
    >
      <Flex
        gap={4}
        mb={2}
        boxSizing={"border-box"}
        justifyContent={"space-between"}
      >
        <LinkBox
        // backgroundImage="/banner1.png"
        // flexGrow={1}
        // display={"flex"}
        // gap={1}
        // border={"1px solid black"}
        // p={1}
        // borderRadius={"lg"}
        // bg={"teal.100"}
        // _hover={{ background: "blackAlpha.200", color: "teal.300" }}
        // mt={-5}
        // p={0}
        >
          <LinkOverlay href="/" p={0}>
            {/* <IconButton
              aria-label="homebutton"
              isRound
              boxSize={"3em"}
              icon={
                <Image
                  // boxSize="3em"
                  src="/icon.png"
                />
              }
            /> */}
            <Image
              // bg={"blue.200"}
              src="/banner4.png"
              // objectFit="cover"
              h="50px"
            />
          </LinkOverlay>
          {/* <Heading>Weight Tracking</Heading> */}
          {/* <Text my={"auto"} pe={2}>
            <Highlight
              query={"Home"}
              styles={{
                px: "2",
                pt: "0",
                rounded: "full",
                bg: "teal.300",
                outline: "1px solid black",
                fontSize: "2xl",
                color: "white",
                fontWeight: "semibold",
                _hover: { background: "blackAlpha.200", color: "teal.300" },
              }}
            >
              Home
            </Highlight>
          </Text> */}
        </LinkBox>

        {/* <Spacer /> */}

        <ButtonGroup>
          <DrawerMenu />
        </ButtonGroup>
      </Flex>
      <Box display={"flex"} boxSizing={"border-box"}>
        <Grid
          border={"1px solid gray"}
          borderRadius={"lg"}
          // h={"40vh"}
          // overflowY={"scroll"}
          w={"100vw"}
          gridTemplateColumns={{ base: "1fr", lg: "repeat(2,1fr)" }}
          gridGap={2}
          p={2}
          // h={"60vh"}
          h={["350px", "60vh"]}
          // bg={"gray.300"}
          bgGradient={"radial( gray.600,gray.200)"}
          overflowY={"scroll"}
          // overflowY={["scroll", "auto"]}
          boxSizing={"border-box"}
        >
          {data &&
            !isFetching &&
            !isRefetching &&
            data.weightentries.map((entry) => (
              <GridItem key={entry.id}>
                <DisplayData data={entry} />
              </GridItem>
            ))}
        </Grid>
      </Box>
      <Box
        my={2}
        display="flex"
        // bg={"gray.500"}
        alignContent={"stretch"}
        justifyContent={"center"}
      >
        {/* <Hide above="sm"> */}
        <Box display={"flex"} flexDir={"column"} h={"30vh"} gap={4}>
          {isFetching ? (
            <Spinner size={"xl"} />
          ) : isError ? (
            <AlertItem message={error?.message} />
          ) : (
            <>
              <Paginator
                totalPages={data?.total_pages || 10}
                totalEntries={data.total_entries}
              />
              <AddWeightEntryModal isDisabled={!isAuthenticated} />
            </>
          )}
        </Box>
        {/* <Paginator totalPages={data?.total_pages || 10} totalEntries={data.total_entries} />
            <AddWeightEntryModal isDisabled={!isAuthenticated} /> */}

        {/* </Hide> */}
      </Box>
    </Box>
  );
}

function Paginator({
  totalPages,
  totalEntries,
}: {
  totalPages: number;
  totalEntries: number;
}) {
  // const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  function handleClick(value) {
    console.log("handleCLickVal", value);
    console.log("handleCLickPage", page);
    // console.log("handleCLickVal+Page", page + value);
    if (value === "+") {
      searchParams.set("page", page + 1);
    } else {
      searchParams.set("page", page - 1);
    }
    // if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  function handleChange(value) {
    console.log("handleCHange", +value);
    console.log("handleCHange", typeof value);
    if (+value <= totalPages && +value >= 1) {
      searchParams.set("page", value);
    } else {
      return;
    }
    setSearchParams(searchParams);
  }

  const [inputField, setInputField] = useState("10");
  const [editable, setEditable] = useState({
    editableString: `Page ${page} of ${totalPages}`,
    editablePresentation: `Page ${page} of ${totalPages}`,
  });

  return (
    <Flex
      // bg={"blue.300"}
      // borderRadius={6}
      // justifyContent={"center"}
      alignItems={"center"}
      mb={1}
      flexDir={"column"}
      // flexGrow={1}
    >
      <Box display={"flex"} flexDir={"column"}>
        {/* <Text>
          Showing {page === totalPages ? totalEntries : page * 10} of{" "}
          {totalEntries}
        </Text> */}
        <Text>
          Showing {(page - 1) * 10 + 1} through{" "}
          {page === totalPages ? totalEntries : page * 10} of {totalEntries}{" "}
          total entries.
        </Text>
        {/* <Text>{totalEntries} Entries Total</Text> */}
      </Box>

      <ButtonGroup
        display={"flex"}
        justifyContent={"space-between"}
        // gap={4}
        // flexGrow={1}
        // bg={"gray.400"}
      >
        <Button
          size={"lg"}
          // colorScheme="blue"
          boxShadow={"xl"}
          onClick={() => {
            if (page > 1) {
              handleClick("-");
              setEditable({
                ...editable,
                editablePresentation: `Page ${page - 1} of ${totalPages}`,
              });
            }
          }}
          isDisabled={page === 1}
        >
          -
        </Button>

        <Editable
          // defaultValue={`Page ${page} of ${totalPages}`}
          value={editable.editablePresentation}
          onEdit={() => {
            setEditable({ ...editable, editablePresentation: page });
            setInputField(page);
          }}
          onBlur={() => {
            // +value <= totalPages && +value >= 1
            const prevString = `Page ${page} of ${totalPages}`;
            if (+inputField > totalPages || +inputField < 1) {
              setEditable({
                ...editable,
                editablePresentation: prevString,
              });

              return;
            }
            handleChange(inputField);
            setEditable({
              ...editable,
              editablePresentation: `Page ${inputField} of ${totalPages}`,
            });
          }}
          onChange={(e) => {
            setEditable({
              ...editable,
              editablePresentation: e,
            });
            setInputField(e);
          }}
          // startWithEditView={true}
          // w={8}
          // variant={"filled"}
          p={-1}
          // px={2}
          // w={"120px"}
        >
          <EditablePreview
            textAlign={"center"}
            border={"solid 1px #808080"}
            shadow={"lg"}
            p={2.5}
            bg={"white"}
            w={"160px"}
            // bg={"blue.200"}
          />

          <EditableInput
            textAlign={"center"}
            mt={0.5}
            p={2.5}
            w={"160px"}
            bg={"white"}
            type="number"
            min={1}
            max={10}
          />
        </Editable>

        <Button
          size={"lg"}
          boxShadow={"xl"}
          onClick={() => {
            if (page < totalPages) {
              handleClick("+");
              setEditable({
                ...editable,
                editablePresentation: `Page ${page + 1} of ${totalPages}`,
              });
            }
          }}
          isDisabled={page === totalPages}
        >
          +
        </Button>
      </ButtonGroup>
    </Flex>
  );
}

export function DisplayData({
  data,
  showButtons = true,
  setModalData,
  setIsModalOpen,
}) {
  const { user, isFetching, error, isError, isAuthenticated } = useCheckLogin();
  // const { isAuthenticated } = useAuthentication();
  if (!data) return;
  // console.log(format(data.recorded, "EEEE MMM do, yyyy @ HH:mm a"));
  // const recorded = format(data.recorded, "EEEE MMM do, yyyy @ HH:mm a");
  const recorded = {
    dayOfWeek: format(data.recorded, "EEEE"),
    month: format(data.recorded, "MMM"),
    dayOfMonth: format(data.recorded, "d"),
    year: format(data.recorded, "yyyy"),
    time: format(data.recorded, "HH:mm"),
    timeOfDay: format(data.recorded, "a"),
  };

  const updated = {
    dayOfWeek: format(data.updated, "EEEE"),
    month: format(data.updated, "MMM"),
    dayOfMonth: format(data.updated, "do"),
    year: format(data.updated, "yyyy"),
    time: format(data.updated, "HH:mm"),
    timeOfDay: format(data.updated, "a"),
  };

  const created = {
    // dayOfWeek: format(data.created, "EEEE"),
    month: format(data.created, "MMM"),
    dayOfMonth: format(data.created, "do"),
    year: format(data.created, "yyyy"),
    time: format(data.created, "HH:mm"),
    timeOfDay: format(data.created, "a"),
  };

  const tooltipLabel = [
    "This is the date that the entry was actually added to the log. Often times, the time that the weight was measured is different than the time the user actually adds it to the log.",
    "For example, if I measured myself at 8AM but I forgot to add it to the log until 3pm. This is just a means of distinguishing the two times/dates.",
  ];
  // console.log(Object.keys(updated).map((key) => updated[key]));

  return (
    <>
      <Card variant={"outline"} size={"sm"}>
        <CardHeader
          display={"flex"}
          // flexDirection={"column"}
          // alignItems={"center"}
          // justifyContent={"space-between"}
        >
          <Box w={["10%", "auto"]}></Box>
          <Spacer />
          <Flex flexDirection={"column"} alignItems={"center"} flexGrow={1}>
            <Box display={"flex"} gap={1}>
              <Text fontSize={"2xl"} as={"b"} my={"auto"}>
                {data.weight} lbs
              </Text>
              <Box>
                <Image
                  boxSize={"30px"}
                  src={`/daysOfWeekIcons/${recorded.dayOfWeek.toLowerCase()}-icon.png`}
                />
              </Box>
            </Box>
            <Box
              display={"flex"}
              // gap={1}
              flexDir={"column"}
              alignItems={"center"}
            >
              <Text>
                {recorded.month} {recorded.dayOfMonth}, {recorded.year}
              </Text>
              <Box display={"flex"} gap={1}>
                <Box my={"auto"}>
                  <BsClock color="teal" />
                </Box>
                <Text>
                  {recorded.time} {recorded.timeOfDay}
                </Text>
              </Box>
            </Box>
          </Flex>
          <Spacer />
          {isAuthenticated && (
            <Box flexShrink={2}>
              {/* <HiDotsVertical /> */}
              <Menu placement="bottom-end">
                <MenuButton as={"button"}>
                  <HiDotsVertical />
                </MenuButton>
                <MenuList
                  p={1}
                  bg={"gray.200"}
                  // border={"none"}
                >
                  <MenuItem
                    display={"flex"}
                    bg={"blue.100"}
                    p={0}
                    // command={<BsPencilSquare color="blue" />}
                  >
                    {" "}
                    <EditWeightEntryModal
                      data={data}
                      // isDisabled={!isAuthenticated}
                    />{" "}
                  </MenuItem>
                  <MenuDivider m={1} />

                  <MenuItem
                    display={"flex"}
                    bg={"red.100"}
                    p={0}
                    // command={<BsTrashFill color={"red"} />}
                  >
                    <DeleteWeightEntryModal
                      data={data}
                      // isDisabled={!isAuthenticated}
                    />
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          )}
        </CardHeader>
        <CardBody>
          <Text>{data.note}</Text>
          <Text fontSize={"x-small"}>
            Entry
            <span style={{ color: "gray" }}> {data.id}</span> by {data.username}
          </Text>

          <Box
            display={"flex"}
            gap={2}
            // background={"blue.200"}
          >
            <Box display={"flex"} gap={1}>
              <Text id={"keys"} fontSize={"x-small"}>
                Added to log on:
              </Text>
              <Text id={"keys"} fontSize={"x-small"}>
                {created.month} {created.dayOfMonth}, {created.year}
              </Text>
              <Box fontSize={"x-small"} my={0.5}>
                <BsClock />
              </Box>
              <Text id={"keys"} fontSize={"x-small"}>
                {created.time}
              </Text>
              <Text id={"keys"} fontSize={"x-small"}>
                {created.timeOfDay}
              </Text>
            </Box>

            <Tooltip
              ml={8}
              label={tooltipLabel.map((label, index) => (
                <Text key={index}>{label}</Text>
              ))}
              placement="bottom-end"
            >
              <IconButton
                mt={-1.5}
                aria-label="tooltip"
                size={"xs"}
                // background={"red.200"}
                background={"none"}
                isRound
                icon={<QuestionOutlineIcon boxSize={3} />}
              />
            </Tooltip>
          </Box>
          {/* TODO: move all of this into a little tooltip/popup where the teal clock icon is */}
          {/* {data.updated != data.created && (
            // <Box
            //   display={"flex"}
            //   gap={2}
            //   // background={"blue.200"}
            // >
            <Box display={"flex"} gap={1}>
              <Text id={"keys"} fontSize={"x-small"}>
                Edited:
              </Text>
              <Text id={"keys"} fontSize={"x-small"}>
                {updated.month} {updated.dayOfMonth}, {updated.year}
              </Text>
              <Box fontSize={"x-small"} my={0.5}>
                <BsClock />
              </Box>
              <Text id={"keys"} fontSize={"x-small"}>
                {updated.time}
              </Text>
              <Text id={"keys"} fontSize={"x-small"}>
                {updated.timeOfDay}
              </Text>
            </Box>
            // </Box>
          )} */}
        </CardBody>
        {showButtons && (
          <CardFooter>
            {/* <ButtonGroup border={"1px solid gray"} borderRadius={4} p={2}>
              <EditWeightEntryModal data={data} isDisabled={!isAuthenticated} />
              <DeleteWeightEntryModal
                data={data}
                isDisabled={!isAuthenticated}
              />
            </ButtonGroup> */}
          </CardFooter>
        )}
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
