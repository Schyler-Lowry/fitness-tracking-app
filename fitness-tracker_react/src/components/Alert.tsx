import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import React from "react";

export default function AlertItem({ message }) {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>ERROR:</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
