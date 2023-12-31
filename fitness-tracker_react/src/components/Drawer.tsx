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
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { LoginForm } from "./Form";
import { useCheckLogin } from "../hooks/useAuthentication";
import { getSession, whoAmI } from "../api/ApiFunctions";
import { useAuthentication } from "../context/AuthenticationContext";
import { herokuUrls } from "../api/ApiUrls";

export default function DrawerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const {
    user,
    isFetching,
    error,
    isError,
    isAuthenticated,
    // isAuthenticated: isAuthenticatedApi,
    refetch,
  } = useCheckLogin();

  // const { isAuthenticated, setIsAuthenticated } = useAuthentication();
  // console.log("user?", user);
  // console.log("isAuth?", isAuthenticated);
  const checkLoginUrl = "http://10.0.0.155:8000/api/checklogin";
  const toast = useToast();

  const checkAuthUrl = "http://localhost:8000/api/check-auth/";
  const checkAuthStatus = async () => {
    try {
      const response = await fetch(checkAuthUrl, {
        credentials: "include", // Ensure cookies are sent
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Authentication status:", data);
        return data.is_authenticated;
      } else {
        console.error("Error checking authentication status");
        return false;
      }
    } catch (error) {
      console.error("Network error:", error);
      return false;
    }
  };
  const logoutApiUrl = "http://10.0.0.155:8000/api/logout";

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
      // refetch();
      // setIsAuthenticated(false);
      localStorage.removeItem("user");
    });
  }

  // useEffect(() => {
  //   checkAuthStatus().then((isAuthenticated) => {
  //     if (isAuthenticated) {
  //       console.log("User is logged in");
  //       // Perform actions for logged-in user
  //     } else {
  //       console.log("User is not logged in");
  //       // Redirect to login page or show login form
  //     }
  //   });
  // }, []);

  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is logged in");
      // Perform actions for logged-in user
    } else {
      console.log("User is not logged in");
      // Redirect to login page or show login form
    }
  }, [isAuthenticated]);

  // const { data, isFetching, error, isError } = useCheckLogin();
  return (
    <>
      {/* <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open
      </Button> */}
      <IconButton
        onClick={onOpen}
        ref={btnRef}
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
              <LoggedInUserInfoDisplay user={user} />
            )}
          </DrawerHeader>

          <DrawerBody>
            {!isAuthenticated ? <LoginForm /> : <Text>Stuff will go here</Text>}
          </DrawerBody>

          <DrawerFooter>
            <ButtonGroup>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              {/* <Button onClick={getSession}>Session</Button>
              <Button onClick={whoAmI}>whoAmI</Button> */}

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
