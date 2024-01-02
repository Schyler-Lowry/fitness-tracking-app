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
import DrawerMenu from "./Drawer";
import { useColorsScheme } from "../context/ColorsContext";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  const { appColorScheme } = useColorsScheme();

  return (
    <Box
      // bg={"gray.200"}
      // bgGradient={
      //   "repeating-linear(180deg,teal.200,teal.900, teal.200, teal.900)"
      // }
      bgGradient={appColorScheme.value}
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
        {/* <Spacer /> */}
        <LinkBox
        // flexGrow={1}
        // backgroundImage={"/static/banner3.png"}
        // backgroundRepeat={"no-repeat"}
        >
          <LinkOverlay href="/" p={0}>
            <Box position="relative">
              <Image src="/static/banner3.png" h="50px" />
              <Heading
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                zIndex="10"
                display="flex"
                justifyContent="center"
                alignItems="center"
                // textShadow={"1px 1px #049cfb"}
                style={{
                  // WebkitTextStroke: "1px black", // for Chrome and Safari
                  WebkitTextFillColor: "white",
                  textShadow:
                    "-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000",
                }}
              >
                Weight Tracking
              </Heading>
            </Box>
          </LinkOverlay>
        </LinkBox>

        <ButtonGroup>
          <DrawerMenu />
        </ButtonGroup>
      </Flex>

      <Outlet />
    </Box>
  );
}
