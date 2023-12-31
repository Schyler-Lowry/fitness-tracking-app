import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { herokuUrls, djangoUrls } from "../api/ApiUrls";
import {
  checkLoginApi,
  loginAuth,
  loginApi,
  getSession,
} from "../api/ApiFunctions";
import { useAuthentication } from "../context/AuthenticationContext";

// const loginApiUrl = "http://127.0.0.1:8000/api/login";
const loginApiUrl = "http://10.0.0.155:8000/api/login";

export function useLogin() {
  const queryClient = useQueryClient();
  const { setIsAuthenticated, setLoggedInUser } = useAuthentication();
  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log("useLogin", data);
      // queryClient.setQueryData(["user"], data.user);
      // if (data.user.is_active) {
      //   const user = {
      //     username: data.user.username,
      //     id: data.user.id,
      //   };
      //   localStorage.setItem("user", JSON.stringify(user));
      // setLoggedInUser(user);
      // setIsAuthenticated(true);
      // }

      queryClient.refetchQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      console.log("ERROR", err);
    },
  });

  return { login, isLoggingIn };
}

const checkLoginApiUrl2 = "http://localhost:8000/api/checklogin";
const checkLoginApiUrl = "http://10.0.0.155:8000/api/checklogin";
const checkAuthUrl = "http://10.0.0.155:8000/api/check-auth";

export function useCheckLogin() {
  // const { isAuthenticated } = useAuthentication();

  const {
    data: user,
    isFetching,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: checkLoginApi,
  });

  return {
    user: user?.user,
    isFetching,
    error,
    isError,
    isAuthenticated: user?.user?.is_active === true ? true : false,
    refetch,
  };
}

// export function useCheckLogin() {
//   const { isAuthenticated, loggedInUser } = useAuthentication();

//   return { isAuthenticated, user: loggedInUser };
// }
