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
  useDisclosure,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Textarea,
  useTheme,
} from "@chakra-ui/react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DrawerMenu from "./Drawer";
import AlertItem from "./Alert";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import {
  useAddWeightEntry,
  useDeleteWeightEntry,
  useEditWeightEntry,
  useGetAllWeightEntries,
} from "../hooks/useWeightEntries";
import { useModalContext } from "./Modal";
import { useCheckLogin, useLogin } from "../hooks/useAuthentication";

export function AddWeightEntryForm({ onClose }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  console.log(format(new Date(), "yyyy-MM-dd kk:mm"));

  // const { refetch } = useGetAllWeightEntries();
  const { user } = useCheckLogin();

  const { addWeightEntry, isError, isPending, error } = useAddWeightEntry();
  const toast = useToast();
  function saveWeight() {
    const [weight, dateTime, note] = getValues(["weight", "dateTime", "note"]);
    console.log(`SUBMITTED:\nWeight: ${weight}\nDate/Time: ${dateTime}`);
    if (note) console.log(`And Note:\n${note}`);
    addWeightEntry(
      { weight: weight, recorded: dateTime, user_id: user.id, note: note },
      {
        onSettled: (data) => {
          console.log(data);
          reset();
          onClose();
          toast({
            title: "Added",
            description: `Added weight entry with ID: ${data.id}`,
            status: "success",
            duration: 4000,
            isClosable: true,
          });
        },
      }
    );
    if (errors?.message) {
      console.log(errors);
    }

    // myClose();
    // refetch();
  }
  return (
    // <Box
    //   as="form"
    //   gap={2}
    //   display={"flex"}
    //   flexDir={"column"}
    //   onSubmit={handleSubmit(saveWeight)}
    // >
    //   <Box>
    //     <Text>Weight:</Text>
    //     <Input
    //       type="number"
    //       placeholder="Weight"
    //       step="0.01"
    //       min="0"
    //       max="999.0"
    //       {...register("weight", { required: "This field is required" })}
    //     />
    //   </Box>

    //   <Box>
    //     <Text>Recorded</Text>
    //     <Input
    //       type="datetime-local"
    //       placeholder="date/time"
    //       {...register("dateTime", { required: "This field is required" })}
    //       defaultValue={format(new Date(), "yyyy-MM-dd kk:mm")}
    //     />
    //   </Box>
    //   <Button type="submit" colorScheme={"whatsapp"}>
    //     Save
    //   </Button>
    // </Box>
    <Box
      mb={3}
      gap={2}
      display={"flex"}
      flexDir={"column"}
      as="form"
      onSubmit={handleSubmit(saveWeight)}
    >
      <Box display={"flex"} flexDir={"column"} gap={2}>
        <Text>Weight:</Text>
        <Input
          isDisabled={isPending}
          type="number"
          placeholder="Weight"
          step="0.01"
          min="0"
          max="999.0"
          {...register("weight", { required: "This field is required" })}
        />

        <Accordion
          allowToggle
          // borderTopWidth={"0px"}
          // borderBottomWidth={0}
          borderTop={"transparent"}
          borderBottom={"transparent"}
        >
          <AccordionItem>
            <h2>
              <AccordionButton
                // style={inputStyles}

                borderRadius="md"
                // boxShadow="md"
                borderColor={"gray.200"}
                border={"solid 1px gray.200"}
                _hover={{ boxShadow: "lg" }}
                _focus={{ boxShadow: "lg" }}
                p={2}
              >
                <Box as="span" flex="1" textAlign="left">
                  Note:
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={0} px={1}>
              <Textarea
                placeholder="Add a note (optional)"
                {...register("note")}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Box>
          <Text>Recorded</Text>
          <Input
            isDisabled={isPending}
            type="datetime-local"
            placeholder="date/time"
            {...register("dateTime", { required: "This field is required" })}
            // defaultValue={format(new Date(), "yyyy-MM-dd kk:mm")}
            defaultValue={format(new Date(), "yyyy-MM-dd kk:mm")}

            // defaultValue={formData.recorded}
          />
        </Box>
      </Box>

      <ButtonGroup display={"flex"} justifyContent={"space-between"}>
        <Button colorScheme="red" onClick={onClose}>
          Cancel
        </Button>
        <Button
          flexGrow={1}
          type="submit"
          colorScheme={"whatsapp"}
          isDisabled={isPending}
          isLoading={isPending}
        >
          Save
        </Button>
      </ButtonGroup>
    </Box>
  );
}
export function EditWeightEntryForm({ data, onClose }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const toast = useToast();

  const { editWeightEntry, isPending, error, isError } = useEditWeightEntry();
  const [loading, setLoading] = useState(false);
  function saveEditWeight() {
    const [weight, dateTime, note] = getValues(["weight", "dateTime", "note"]);
    console.log(`SUBMITTED:\nWeight: ${weight}\nDate/Time: ${dateTime}`);
    if (note) console.log(`And Note:\n${note}`);

    // THIS is for delaying the modal close.
    // setLoading(true);
    // const examplePromise = new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     try {
    //       const result = editWeightEntry(
    //         {
    //           weight: weight,
    //           recorded: dateTime,
    //           id: data.id,
    //           user_id: data.user_id,
    //         },
    //         {
    //           onSettled: (data) => {
    //             console.log(data);
    //             setLoading(false);
    //             toast({
    //               title: "Updated",
    //               description: `Updated weight entry with ID: ${data.updated_entry.id}`,
    //               status: "success",
    //               duration: 4000,
    //               isClosable: true,
    //             });
    //           },
    //         }
    //       );
    //       resolve(result);
    //     } catch (error) {
    //       reject(error);
    //     }
    //   }, 1000);
    // });

    editWeightEntry(
      {
        weight: weight,
        recorded: dateTime,
        id: data.id,
        note: note,
        user_id: data.user_id,
      },
      {
        onSettled: (data) => {
          console.log(data);
          setLoading(false);
          toast({
            title: "Updated",
            description: `Updated weight entry with ID: ${data.updated_entry.id}`,
            status: "success",
            duration: 4000,
            isClosable: true,
          });
        },
      }
    );

    if (errors?.message) {
      console.log(errors);
    }
    // reset();
    // myClose();
    // refetch();
  }

  // const theme = useTheme();
  // console.log(theme);

  function testFunc() {
    const [weight, dateTime, note] = getValues(["weight", "dateTime", "note"]);
    console.log(`Weight: ${weight}\nTime: ${dateTime}\nNote: ${note}`);
  }

  return (
    <Box
      mb={3}
      gap={2}
      display={"flex"}
      flexDir={"column"}
      as="form"
      onSubmit={handleSubmit(saveEditWeight)}
    >
      <Box display={"flex"} flexDir={"column"} gap={2}>
        <Text>Weight:</Text>
        <Input
          isDisabled={isPending || loading}
          type="number"
          placeholder="Weight"
          defaultValue={data.weight}
          step="0.01"
          min="0"
          max="999.0"
          {...register("weight", { required: "This field is required" })}
        />

        <Accordion
          allowToggle
          // borderTopWidth={"0px"}
          // borderBottomWidth={0}
          borderTop={"transparent"}
          borderBottom={"transparent"}
        >
          <AccordionItem>
            <h2>
              <AccordionButton
                // style={inputStyles}

                borderRadius="md"
                // boxShadow="md"
                borderColor={"gray.200"}
                border={"solid 1px gray.200"}
                _hover={{ boxShadow: "lg" }}
                _focus={{ boxShadow: "lg" }}
                p={2}
              >
                <Box as="span" flex="1" textAlign="left">
                  Note:
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={0} px={1}>
              <Textarea defaultValue={data.note} {...register("note")} />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Box>
          <Text>Recorded</Text>
          <Input
            isDisabled={isPending || loading}
            type="datetime-local"
            placeholder="date/time"
            {...register("dateTime", { required: "This field is required" })}
            defaultValue={format(data.recorded, "yyyy-MM-dd hh:mm")}
            // defaultValue={formData.recorded}
          />
        </Box>
      </Box>

      <ButtonGroup display={"flex"} justifyContent={"space-between"}>
        <Button colorScheme="red" onClick={onClose}>
          Cancel
        </Button>
        <Button
          flexGrow={1}
          type="submit"
          colorScheme={"whatsapp"}
          isDisabled={isPending || loading}
          isLoading={isPending || loading}
        >
          Save
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export function TestForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { editWeightEntry, isPending, error, isError } = useEditWeightEntry();
  const { errors } = formState;
  // const { refetch } = useGetAllWeightEntries();

  const testSubmit = () => {
    const [testField] = getValues(["testField"]);

    console.log("TEST", testField);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(testSubmit)}>
      <Text>THis is a test</Text>
      <Input
        placeholder="test"
        {...register("testField", { required: "This field is required" })}
      />
      <Button type="submit" colorScheme={"whatsapp"}>
        Save
      </Button>
    </Box>
  );
}

export function LoginForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const { login, isLoggingIn } = useLogin();
  const loginApiUrl = "http://127.0.0.1:8000/api/login";

  const loginApi = async (username, password) => {
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: "include", // Ensure cookies are sent
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        // Handle successful login here
      } else {
        console.error(data.message);
        // Handle login error here
      }
    } catch (error) {
      console.error("Network error:", error);
      // Handle network error here
    }
  };

  function handleLogin() {
    const [username, password] = getValues(["username", "password"]);
    login({ username, password });
    // loginApi(username, password);
  }

  return (
    <Box
      as="form"
      gap={2}
      display={"flex"}
      flexDir={"column"}
      onSubmit={handleSubmit(handleLogin)}
    >
      <Box>
        <Text>Username</Text>
        <Input
          // type="number"
          placeholder="Username"
          {...register("username", { required: "This field is required" })}
        />
      </Box>

      <Box>
        <Text>Password</Text>
        <Input
          type="password"
          placeholder="Password"
          {...register("password", { required: "This field is required" })}
          // defaultValue={formData.recorded}
        />
      </Box>
      <Button type="submit" colorScheme={"teal"}>
        Login
      </Button>
    </Box>
  );
}

export function DeleteWeightEntryForm({ onClose, entryId }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { deleteWeightEntry, isPending, error, isError } =
    useDeleteWeightEntry();
  const { errors } = formState;

  const toast = useToast();

  const submitDeleteWeight = () => {
    console.log("entryId:", entryId);
    deleteWeightEntry(
      { id: entryId },
      {
        onSettled: () => {
          toast({
            title: "Deleted",
            description: "Weight entry deleted",
            status: "info",
            duration: 4000,
            isClosable: true,
          });
        },
      }
    );

    if (errors?.message) {
      console.log(errors);
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(submitDeleteWeight)}
      my={2}
      display={"flex"}
      flexDir={"column"}
      gap={4}
    >
      <Box display={"flex"} flexDir={"column"}>
        <Text>
          <Highlight
            query={"delete"}
            styles={{ fontWeight: "semibold", color: "red" }}
          >
            Are you sure you want to delete this weight entry?
          </Highlight>
        </Text>
        <Text as={"sub"}>This cannot be undone.</Text>
      </Box>

      <ButtonGroup display={"flex"} justifyContent={"space-between"}>
        <Button type="submit" colorScheme={"red"}>
          Delete
        </Button>
        <Button onClick={onClose} border={"1px"}>
          Cancel
        </Button>
      </ButtonGroup>
    </Box>
  );
}
