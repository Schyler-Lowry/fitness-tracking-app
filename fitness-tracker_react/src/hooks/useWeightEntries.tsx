import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  editWeightEntryApi,
  getAllEntriesApi,
  deleteWeightEntryApi,
  getCookie,
  addWeightEntryApi,
} from "../api/ApiFunctions";
import { useSearchParams } from "react-router-dom";

export function useGetAllWeightEntries() {
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useSearchParams();
  // const currentPage = searchParams.get()
  const page = searchParams.get("page") || "1";
  const { data, isFetching, refetch, error, isError, isRefetching } = useQuery({
    queryKey: ["entries", page],
    queryFn: () => getAllEntriesApi(page),
  });

  return { data, isFetching, refetch, error, isError, isRefetching };
}

export function useEditWeightEntry() {
  const queryClient = useQueryClient();

  const {
    mutate: editWeightEntry,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: editWeightEntryApi,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["entries"],
      });
    },
    onError: (err) => console.log("Error:", err.message),
  });

  return { editWeightEntry, isPending, error, isError };
}

// const addApiUrl = "http://127.0.0.1:8000/api/entries/add";
const addApiUrl = "http://10.0.0.155:8000/api/entries/add";

export function useAddWeightEntry() {
  const queryClient = useQueryClient();

  const {
    mutate: addWeightEntry,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: addWeightEntryApi,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["entries"],
      });
    },
    onError: (err) => console.log("Error:", err.message),
  });

  return { addWeightEntry, isPending, error, isError };
}

export function useDeleteWeightEntry() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteWeightEntry,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: deleteWeightEntryApi,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["entries"],
      });
    },
    onError: (err) => console.log("Error:", err.message),
  });

  return { deleteWeightEntry, isPending, error, isError };
}
