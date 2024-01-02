import {
  Box,
  Heading,
  Button,
  Input,
  Divider,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  ButtonGroup,
  IconButton,
  Image,
  Select,
  Flex,
  Checkbox,
  Tooltip,
  Card,
  CardHeader,
  CardBody,
  Spacer,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { LoginForm } from "./Form";
import { useCheckLogin } from "../hooks/useAuthentication";
import { getSession, whoAmI } from "../api/ApiFunctions";
import { useAuthentication } from "../context/AuthenticationContext";
import { herokuUrls } from "../api/ApiUrls";
import { useColorsScheme } from "../context/ColorsContext";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from "react-router-dom";

export default function DrawerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const {
    user,
    isFetching,
    error,
    isError,
    isAuthenticated,
    // isAuthenticated: isAuthenticatedApi,
    refetch,
  } = useCheckLogin();

  const toast = useToast();

  const checkAuthUrl = "http://localhost:8000/api/check-auth/";

  async function logoutApi() {
    const response = await fetch(herokuUrls.logout, {
      method: "GET",
      credentials: "include", // Include cookies in the request
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
      });

    return response;
  }

  function handleLogout() {
    logoutApi().then((data) => {
      console.log(data);
      refetch();
    });
  }

  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is logged in");
      // Perform actions for logged-in user
    } else {
      console.log("User is not logged in");
      // Redirect to login page or show login form
    }
  }, [isAuthenticated]);

  return (
    <>
      <IconButton
        onClick={onOpen}
        ref={btnRef}
        aria-label="homebutton"
        isRound
        boxSize={"3em"}
        icon={
          <Image
            // boxSize="3em"
            src="/static/icon.png"
          />
        }
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {!isAuthenticated ? (
              "Login"
            ) : (
              <>
                <LoggedInUserInfoDisplay user={user} />
              </>
            )}
          </DrawerHeader>

          <DrawerBody>
            {!isAuthenticated ? (
              <LoginForm />
            ) : (
              <>
                <Flex
                  flexDir="column"
                  gap={10}
                  // alignContent={"stretch"}
                  // justifyContent={"space-between"}
                >
                  <NavButtons onClose={onClose} />
                  <SelectColorScheme />
                </Flex>
              </>
            )}
          </DrawerBody>

          <DrawerFooter>
            <ButtonGroup>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>

              {isAuthenticated && (
                <Button
                  onClick={handleLogout}
                  bgGradient={"radial(blue.100, blue.600)"}
                  border={"1px solid gray"}
                  color={"blackAlpha.900"}
                >
                  Logout
                </Button>
              )}
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function LoggedInUserInfoDisplay({ user }) {
  return (
    <Box>
      <Heading size={"md"}>Hello, {user.username}</Heading>
    </Box>
  );
}

function SelectColorScheme() {
  const {
    colorSchemes,
    appColorScheme,
    setAppColorScheme,
    prefersRandom,
    setPrefersRandom,
  } = useColorsScheme();

  const getKeyByValue = (object: Record<string, string>, value: string) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  // console.log(getKeyByValue(colorSchemes, appColorScheme));

  // const colorSchemeNamesHumanReadable = colorSchemes.map(colorScheme => {})

  // const colorSchemeKey = getKeyByValue(colorSchemes, appColorScheme);

  function handleChange(e) {
    const index = +e.target.value;
    console.log(colorSchemes.at(index));
    setAppColorScheme(colorSchemes.at(index));
  }

  return (
    <Flex flexDir={"column"}>
      <Text>Change Color Scheme:</Text>

      <Select
        placeholder={`Current Scheme: ${appColorScheme.schemeName}`}
        onChange={handleChange}
        // bgGradient={appColorScheme.value}
        variant={"filled"}
      >
        {colorSchemes.map((colorScheme, index) => (
          <option key={colorScheme.schemeName} value={index}>
            {colorScheme.schemeName}
          </option>
        ))}
      </Select>
      <Flex gap={1}>
        <Box my={["auto", -1]}>
          <Tooltip label="When checked, a random color scheme will be applied when the page loads">
            <IconButton
              // mt={-1.5}
              px={0}
              aria-label="tooltip"
              size={"xs"}
              // background={"red.200"}
              background={"none"}
              isRound
              icon={<QuestionOutlineIcon boxSize={3} />}
            />
          </Tooltip>
        </Box>
        <Text>Prefers Random Color Scheme</Text>

        <Checkbox
          value={prefersRandom}
          isChecked={prefersRandom}
          onChange={() => setPrefersRandom((random) => !random)}
        />
      </Flex>
    </Flex>
  );
}

function NavButtons({ onClose }) {
  const navigate = useNavigate();

  return (
    <Card size={"sm"} variant={"elevated"}>
      <CardHeader>
        <Heading color={"purple.500"} size={"md"}>
          Links
        </Heading>
      </CardHeader>
      <CardBody>
        <NavLink to="/graph">
          <Box
            _hover={{ background: "gray.100" }}
            borderRadius={"md"}
            p={1}
            onClick={onClose}
            textDecoration={"underline"}
            // color={"purple.400"}
          >
            Entries on Chart
          </Box>
        </NavLink>
      </CardBody>
    </Card>
  );
}
