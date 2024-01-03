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
  Spinner,
  Skeleton,
  chakra,
  Hide,
  useDisclosure,
  Editable,
  EditableInput,
  EditablePreview,
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
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";
import {
  useGetAllWeightEntries,
  useGetWeightEntriesToDate,
} from "../hooks/useWeightEntries";
import {
  differenceInDays,
  differenceInMilliseconds,
  format,
  parseISO,
} from "date-fns";
import { sampleEntries } from "./SampleEntries";
import Chart from "react-apexcharts";
import { useSearchParams } from "react-router-dom";

export default function GraphPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queriedDays = searchParams.get("days") || "30";

  return (
    <Box bg={"gray.200"} borderRadius={"lg"}>
      <Flex
        ms={[4, 0]}
        me={[4, 4]}
        mt={3}
        justifyContent={"space-between"}
        flexDir={["column", "row"]}
        gap={[1, 0]}
      >
        <Heading
          mx={"auto"}
          fontSize={["medium", "x-large"]}
          style={{
            // WebkitTextStroke: "1px black", // for Chrome and Safari
            WebkitTextFillColor: "white",
            textShadow:
              "-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000",
          }}
        >
          {queriedDays === "all"
            ? "Showing all recorded entries"
            : `Showing entries in the last ${queriedDays} days`}
        </Heading>
        <DaysFilter />
      </Flex>
      <Box mx={4} mt={4}>
        <ApexChart />
      </Box>
    </Box>
  );
}

function DaysFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queriedDays = searchParams.get("days") || "30";
  console.log(queriedDays);

  function handleClick(e) {
    const value = e.target.value;
    searchParams.set("days", value);
    setSearchParams(searchParams);
    // console.log(value);
  }

  return (
    <ButtonGroup
      isAttached
      colorScheme="teal"
      variant={"outline"}
      // size={"sm"}
      // flexGrow={1}
      display={"flex"}
    >
      <Button
        isDisabled={queriedDays === "30"}
        value={30}
        onClick={(e) => handleClick(e)}
        flexGrow={1}
      >
        30
      </Button>
      <Button
        isDisabled={queriedDays === "60"}
        value={60}
        onClick={(e) => handleClick(e)}
        flexGrow={1}
      >
        60
      </Button>
      <Button
        isDisabled={queriedDays === "90"}
        value={90}
        onClick={(e) => handleClick(e)}
        flexGrow={1}
      >
        90
      </Button>
      <Button
        isDisabled={queriedDays === "all"}
        value={"all"}
        onClick={(e) => handleClick(e)}
        flexGrow={1}
      >
        All
      </Button>
    </ButtonGroup>
  );
}

function ApexChart() {
  const { data, isFetching, refetch, isRefetching, error, isError } =
    useGetWeightEntriesToDate();

  const [searchParams, setSearchParams] = useSearchParams();
  const queriedDays = searchParams.get("days") || 30;

  if (isFetching) return <Spinner />;
  const days =
    queriedDays === "all"
      ? Math.abs(
          differenceInDays(
            new Date(data.weightentries.at(1).recorded),
            new Date()
          )
        )
      : +queriedDays;

  // const entriesMapped = sampleEntries
  const entriesMapped = data.weightentries
    .map((entry) => {
      //   const parsed = parseISO(entry.recorded);

      // return [format(parsed, "MMM"),];
      //   console.log(entriesMapped);
      return [new Date(entry.recorded).getTime(), entry.weight];
    })
    .reverse();
  // //   console.log(entriesMapped);
  // //   console.log(new Date(sampleEntries[0].recorded).getTime());

  const apexChartStuff = {
    options: {
      chart: {
        id: "basic-line",
        type: "line",
        background: "white",
      },
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        colors: ["#0d857b"],
        width: 2,
        dashArray: 0,
      },

      markers: {
        size: 1,
        colors: undefined,
        strokeColors: "#474545",
        strokeWidth: 2,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        onClick: undefined,
        onDblClick: undefined,
        showNullDataPoints: true,
        hover: {
          size: undefined,
          sizeOffset: 3,
        },
      },
      xaxis: {
        // categories: ["Nov", "Dec", "Jan"],
        // categories: entriesMonths,
        type: "datetime",
        // min: new Date("31 Oct 2023").getTime(),
        min: Date.now() - days * 86400000,
        max: Date.now(),
        title: {
          text: "Month",
        },
        // overwriteCategories: ["", ""],
        // tickPlacement: "between",
        labels: {
          show: true,
          showDuplicates: false,
          format: "MMM",
        },
      },

      //   labels: entriesMonths,
      yaxis: {
        title: {
          text: "Weight",
        },
        min: 130,
        max: 170,
      },
    },
    dataLabels: false,
    series: [
      {
        name: "Weight",
        // data: [30, 40, 45, 50, 49, 60, 70, 91],
        data: entriesMapped,
      },
    ],
  };

  return (
    <Chart
      //   type="line"
      options={apexChartStuff.options}
      series={apexChartStuff.series}
      //   type="line"
      width="100%"
    />
    // <Box>test</Box>
  );
}
