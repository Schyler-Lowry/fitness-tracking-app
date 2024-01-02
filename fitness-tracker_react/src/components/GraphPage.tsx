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
import { format, parseISO } from "date-fns";
import { sampleEntries } from "./SampleEntries";
import Chart from "react-apexcharts";
import { useSearchParams } from "react-router-dom";

export default function GraphPage() {
  //   const { data, isFetching, refetch, isRefetching, error, isError } =
  //     useGetAllWeightEntries();

  //   if (isFetching) return <Spinner />;

  return (
    <Box bg={"gray.200"}>
      <Flex mx={4} mt={3} justifyContent={"space-between"}>
        <Heading>
          <Text>Chart</Text>
        </Heading>
        <DaysFilter />
      </Flex>
      <ApexChart />
    </Box>
  );
}

// function ScatterChart({ data }) {
//   return (
//     <ScatterChart
//     //   style={{ backgroundColor: "white" }}
//     //   margin={{
//     //     top: 20,
//     //     right: 20,
//     //     bottom: 10,
//     //     left: 10,
//     //   }}
//     >
//       <XAxis dataKey={"day"} type="number" name="day" />
//       <YAxis dataKey={"weight"} type="number" name="weight" />
//       <ZAxis dataKey="id" type="number" range={[95, 125]} name="id" />
//       <CartesianGrid strokeDasharray={"3 3"} />
//       <Tooltip cursor={{ strokeDasharray: "3 3" }} />
//       <Legend />
//       <Scatter data={data.entries} name="Test" fill="#8884d8" />
//     </ScatterChart>
//   );
// }

function DaysFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(e) {
    const value = e.target.value;
    searchParams.set("days", value);
    setSearchParams(searchParams);
    // console.log(value);
  }

  return (
    <ButtonGroup isAttached>
      <Button
        border={"1px"}
        borderColor={"gray.900"}
        value={30}
        onClick={(e) => handleClick(e)}
      >
        30
      </Button>
      <Button
        border={"1px"}
        borderColor={"gray.900"}
        value={60}
        onClick={(e) => handleClick(e)}
      >
        60
      </Button>
      <Button
        border={"1px"}
        borderColor={"gray.900"}
        value={90}
        onClick={(e) => handleClick(e)}
      >
        90
      </Button>
      <Button
        isDisabled
        border={"1px"}
        borderColor={"gray.900"}
        value={"all"}
        onClick={(e) => handleClick(e)}
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
  const days = searchParams.get("days") || 30;

  if (isFetching) return <Spinner />;

  const entriesMapped = sampleEntries
    .map((entry) => {
      //   const parsed = parseISO(entry.recorded);

      // return [format(parsed, "MMM"),];
      //   console.log(entriesMapped);
      return [new Date(entry.recorded).getTime(), entry.weight];
    })
    .reverse();
  //   console.log(entriesMapped);
  //   console.log(new Date(sampleEntries[0].recorded).getTime());

  const apexChartStuff = {
    options: {
      chart: {
        id: "basic-line",
        type: "line",
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
        min: 140,
        max: 170,
      },
    },
    dataLabels: false,
    series: [
      {
        name: "series-1",
        // data: [30, 40, 45, 50, 49, 60, 70, 91],
        data: entriesMapped,
      },
    ],
  };

  //   console.log(new Date("01 Nov 2023").getTime());
  return (
    <Chart
      //   type="line"
      options={apexChartStuff.options}
      series={apexChartStuff.series}
      //   type="line"
      width="100%"
    />
  );
}
