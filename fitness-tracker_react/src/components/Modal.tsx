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
import React, { createContext, useContext, useState } from "react";
// import { AddWeightEntryForm } from "./Form";
import { AddWeightEntryForm, EditWeightEntryForm } from "./Form";
import {
  useEditWeightEntry,
  useGetAllWeightEntriesByPage,
} from "../hooks/useWeightEntries";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { memo } from "react";

const ModalContext = createContext({});

function MyModal({ children }) {
  const { onOpen, onClose } = useDisclosure();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  const myOpen = (word) => {
    // onOpen();
    console.log(word);
    setFormData(word);
  };

  const myClose = () => {
    setIsAdding(false);
    setIsEditing(false);
  };

  return (
    <ModalContext.Provider
      value={{
        onOpen,
        onClose,
        myOpen,
        isAdding,
        setIsAdding,
        isEditing,
        setIsEditing,
        formData,
        setFormData,
        myClose,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error("ModalContext was used outside the ModalProvider");
  return context;
}

export function ModalUi() {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    onOpen,
    onClose,
    isAdding,
    setIsAdding,
    isEditing,
    setIsEditing,
    formData,
  } = useContext(ModalContext);

  // const [data, setData] = useState(null);

  function myClose() {
    setIsAdding(false);
    setIsEditing(false);
    // onClose();
  }

  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  // const { myClose } = useModalContext();
  //   console.log(typeof format(new Date(), "yyyy-MM-dd hh:mm"));

  const { refetch } = useGetAllWeightEntriesByPage();

  const { editWeightEntry, isPending, error, isError } = useEditWeightEntry();

  // console.log("data'", data);

  function saveEditWeight() {
    const [weight, dateTime] = getValues(["weight", "dateTime"]);
    console.log(`SUBMITTED:\nWeight: ${weight}\nDate/Time: ${dateTime}`);
    editWeightEntry({
      weight: weight,
      recorded: dateTime,
      id: formData.id,
      user_id: formData.user_id,
    });
    if (errors?.message) {
      console.log(errors);
    }
    reset();
    myClose();
    refetch();
  }
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isEditing || isAdding} onClose={myClose} isCentered>
        <ModalOverlay />
        <ModalContent mt={["20em", "auto"]}>
          <ModalHeader>
            {isAdding && "Record Weight Entry"}
            {isEditing && "Edit Weight Entry"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isAdding && <AddWeightEntryForm />}
            {/* {isEditing && (
              <Box
                as="form"
                gap={2}
                display={"flex"}
                flexDir={"column"}
                onSubmit={handleSubmit(saveEditWeight)}
              >
                <Box>
                  <Text>Weight:</Text>
                  <Input
                    type="number"
                    placeholder="Weight"
                    defaultValue={formData.weight}
                    step="0.01"
                    min="0"
                    max="999.0"
                    {...register("weight", {
                      required: "This field is required",
                    })}
                  />
                </Box>

                <Box>
                  <Text>Recorded</Text>
                  <Input
                    type="datetime-local"
                    placeholder="date/time"
                    {...register("dateTime", {
                      required: "This field is required",
                    })}
                    defaultValue={format(formData.recorded, "yyyy-MM-dd hh:mm")}
                    // defaultValue={formData.recorded}
                  />
                </Box>
                <Button type="submit" colorScheme={"whatsapp"}>
                  Save
                </Button>
              </Box>
            )} */}
            {/* {isEditing && <Text>{formData.recorded}</Text>} */}
            {isEditing && <EditWeightEntryForm />}
          </ModalBody>

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

function AddWeightEntryUi() {
  return <ModalUi title="Record Weight" body={<AddWeightEntryForm />} />;
}

function EditWeightEntryUi() {
  return <ModalUi title="Edit Weight" body={<Text>TESTETSETST</Text>} />;
}

export function Lorem() {
  return (
    <Text>
      Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco
      deserunt aute id consequat veniam incididunt duis in sint irure nisi.
      Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse
      quis. Sunt ad dolore quis aute consequat. Magna exercitation reprehenderit
      magna aute tempor cupidatat consequat elit dolor adipisicing. Mollit dolor
      eiusmod sunt ex incididunt cillum quis. Velit duis sit officia eiusmod
      Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
      consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
      deserunt nostrud ad veniam.
    </Text>
  );
}

MyModal.ModalUi = ModalUi;
MyModal.AddWeightEntryUi = AddWeightEntryUi;
MyModal.EditWeightEntryUi = EditWeightEntryUi;
export default MyModal;
