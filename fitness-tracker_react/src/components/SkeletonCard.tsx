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
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

export default function SkeletonCard() {
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
              <Box>
                <Skeleton height={8}>weight data </Skeleton>
              </Box>
              <Box>
                <SkeletonCircle />
              </Box>
            </Box>
            <Box
              display={"flex"}
              // gap={1}
              flexDir={"column"}
              alignItems={"center"}
            >
              {/* <SkeletonText noOfLines={1}>Lorem ipsumm</SkeletonText> */}

              <Box display={"flex"} gap={1} mt={2}>
                <SkeletonText noOfLines={2}>Lorem ipsumm</SkeletonText>
              </Box>
            </Box>
          </Flex>
          <Spacer />
          <Box flexShrink={2}>
            <SkeletonCircle />
          </Box>
        </CardHeader>
        <CardBody>
          <Box
            display={"flex"}
            gap={2}
            // background={"blue.200"}
          >
            <Box display={"flex"} gap={1}>
              <SkeletonText>Lorem ipsum dolor sit amet</SkeletonText>
            </Box>
          </Box>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}
