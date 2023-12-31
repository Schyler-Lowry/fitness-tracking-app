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
} from "@chakra-ui/react";
import React, { createContext, useContext, useState, useEffect } from "react";
// import { AddWeightEntryForm } from "./Form";
import { AddWeightEntryForm, EditWeightEntryForm } from "./Form";
import {
  useEditWeightEntry,
  useGetAllWeightEntries,
} from "../hooks/useWeightEntries";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { memo } from "react";
import { useLogin } from "../hooks/useAuthentication";

const AuthenticationContext = createContext({});

function AuthenticationProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      // console.log("get the user");
      const storedUser = JSON.parse(user);
      setLoggedInUser(storedUser);
      setIsAuthenticated(true);
      console.log("Found previous user, logging in.");
    } else {
      console.log("Please login");
    }
  }, []);

  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   console.log(JSON.parse(user));
  //   const storedUser = JSON.parse(user);
  //   setLoggedInUser(storedUser);
  // }, [isAuthenticated]);

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(loggedInUser));
  // }, [loggedInUser]);

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

function useAuthentication() {
  const context = useContext(AuthenticationContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthenticationProvider, useAuthentication };
