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
import React, { useEffect, useRef } from "react";
import { LoginForm } from "./Form";
import { useCheckLogin } from "../hooks/useAuthentication";
import { getSession, whoAmI } from "../api/ApiFunctions";
import { useAuthentication } from "../context/AuthenticationContext";
import { herokuUrls } from "../api/ApiUrls";

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
              <LoggedInUserInfoDisplay user={user} />
            )}
          </DrawerHeader>

          <DrawerBody>
            {!isAuthenticated ? <LoginForm /> : <Text>Stuff will go here</Text>}
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
