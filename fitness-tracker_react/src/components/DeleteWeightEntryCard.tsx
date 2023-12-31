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
import { format } from "date-fns";
import {
  BsClock,
  BsClockFill,
  BsPenFill,
  BsPencil,
  BsPencilSquare,
  BsTrash,
  BsTrashFill,
} from "react-icons/bs";
export default function DeleteWeightEntryCard({ data }) {
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

            {/* <Text fontSize={"x-small"} display={"flex"} gap={1}>
              Added to log on:{" "}
              {Object.keys(created).map((key) => {
                if (key === "time") {
                  return (
                    <>
                      <Box key={key} my={0.5}>
                        <BsClock />
                      </Box>
                      {created.time}{" "}
                    </>
                  );
                }
                return created[key] + " ";
              })}
            </Text> */}
          </Box>
          {data.updated != data.created && (
            <Box
              display={"flex"}
              gap={2}
              // background={"blue.200"}
            >
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
            </Box>
          )}
        </CardBody>
      </Card>
    </>
  );
}
