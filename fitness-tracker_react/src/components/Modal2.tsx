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
  Highlight,
} from "@chakra-ui/react";
import React, { createContext, useContext, useState } from "react";
import {
  AddWeightEntryForm,
  DeleteWeightEntryForm,
  EditWeightEntryForm,
  TestForm,
} from "./Form";
import {
  BsClock,
  BsClockFill,
  BsPenFill,
  BsPencil,
  BsPencilSquare,
  BsTrash,
  BsTrashFill,
} from "react-icons/bs";
import { DisplayData } from "./Page3";
import DeleteWeightEntryCard from "./DeleteWeightEntryCard";

export function ModalUi({
  title = "test",
  body = <Text>Test</Text>,
  isOpen,
  onOpen,
  onClose,
}) {
  function myClose() {
    console.log("closed");

    onClose();
  }
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={myClose} isCentered>
        <ModalOverlay />
        <ModalContent mt={["20em", "auto"]}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{body}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={myClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export function EditWeightEntryModal({ data, isDisabled }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Box
        w={100}
        // bg={"blue.100"}
        flexGrow={1}
        p={2}
        // colorScheme="blue"
        onClick={onOpen}
        // isDisabled={isDisabled}
        display={"flex"}
        justifyContent={"space-between"}
      >
        Edit Weight
        <Box my={"auto"}>
          <BsPencilSquare />
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mt={["20em", "auto"]}>
          <ModalHeader>Edit Weight Entry</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditWeightEntryForm data={data} onClose={onClose} />
            {/* <EditWeightEntryForm /> */}
            {/* <Text>{data.recorded}</Text> */}
            {/* <TestForm /> */}
          </ModalBody>

          {/* <ModalFooter> */}
          {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button> */}

          {/* <Button variant="ghost">Secondary Action</Button> */}
          {/* </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}

export function AddWeightEntryModal({ isDisabled }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        // colorScheme="blue"
        // bgGradient={"repeating-radial(blue.100, blue.500)"}
        bgGradient={"repeating-radial(whiteAlpha.600, blue.400)"}
        onClick={onOpen}
        isDisabled={isDisabled}
        flexGrow={1}
        // color={"whiteAlpha.800"}
        color={"blackAlpha.800"}
        border={"1px solid gray"}
      >
        Add Weight
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mt={["20em", "auto"]}>
          <ModalHeader>Add Weight Entry</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <EditWeightEntryForm data={data} /> */}
            {/* <EditWeightEntryForm /> */}
            {/* <Text>{data.recorded}</Text> */}
            {/* <TestForm /> */}
            <AddWeightEntryForm onClose={onClose} />
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}

export function DeleteWeightEntryModal({ data, isDisabled }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Box
        flexGrow={1}
        p={2}
        // bg={"red.100"}
        // colorScheme="red"
        onClick={onOpen}
        // isDisabled={isDisabled}
        display={"flex"}
        justifyContent={"space-between"}
      >
        Delete
        <Box my={"auto"}>
          <BsTrash />
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mt={["20em", "auto"]}>
          <ModalHeader>Delete Weight Entry</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <DisplayData data={data} showButtons={false} /> */}
            <DeleteWeightEntryCard data={data} />
            <DeleteWeightEntryForm onClose={onClose} entryId={data.id} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export function TestModal({ modalData, isModalOpen }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [isModalOpen, setIsModalOpen] = useState(false);

  if (!modalData) return;

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mt={["20em", "auto"]}>
          <ModalHeader>Delete Weight Entry</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DisplayData data={modalData} showButtons={false} />
            <DeleteWeightEntryForm onClose={onClose} entryId={modalData.id} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
