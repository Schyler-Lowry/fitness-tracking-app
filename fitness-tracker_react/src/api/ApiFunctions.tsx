import { djangoUrls, herokuUrls } from "./ApiUrls";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export async function getAllEntriesApi(page: string) {
  //   const nonPaginatedUrl = `http://localhost:8000/api/entries/list/?page=1`;
  // const entriesUrl = `http://127.0.0.1:8000/api/entries/list/?page=${page}`;
  // const entriesUrl = `http://10.0.0.155:8000/api/entries/list/?page=${page}`;
  // const entriesUrl = `https://weight-tracking-app-a9db95db2d03.herokuapp.com/api/entries/list/?page=${page}`;
  const entriesUrl = herokuUrls.entries + `?page=${page}`;

  // console.log("apiGetAllEntries page:", page);
  // console.log("apiGetAllEntries url:", entriesUrl);

  const response = await fetch(entriesUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
  // setFetchedEntry(data);
  // console.log(data);
}

// const editUrl = "http://localhost:8000/api/entries/edit";
const editUrl = "http://10.0.0.155:8000/api/entries/edit";

export async function editWeightEntryApi(data = {}) {
  const response = await fetch(herokuUrls.edit, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function addWeightEntryApi(data = {}) {
  // Get the CSRF token
  // const csrftoken = getCookie("csrftoken");
  // console.log(csrftoken);

  const response = await fetch(herokuUrls.add, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Include the CSRF token in the 'X-CSRFToken' header
      "X-CSRFToken": cookies.get("csrftoken"),
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

const deleteUrl = "http://10.0.0.155:8000/api/entries/delete";

export async function deleteWeightEntryApi(data = {}) {
  const response = await fetch(herokuUrls.delete, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function loginApi(credentials = {}) {
  const response = await fetch(herokuUrls.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": cookies.get("csrftoken"),
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // console.log(data);
  return data;
}

export async function checkLoginApi() {
  const response = await fetch(herokuUrls.checklogin, {
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": cookies.get("csrftoken"),
    },
    credentials: "include", // Include cookies in the request
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  console.log(data);
  return data;
}

export function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// path("session-view/", session_view, name="api_session_view"),
// path("whoami-view/", whoami_view, name="api_whoami_view"),
// path("login-view/", login_view, name="api_login_view"),
// path("logout-view/", logout_view, name="api_logout_view"),

export function getSession() {
  fetch("http://10.0.0.155:8000/api/session-view/", {
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  return { message: "This is just temporary" };
}

export function whoAmI() {
  fetch("http://10.0.0.155:8000/api/whoami-view/", {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

export function loginAuth(credentials = {}) {
  console.log("creds", credentials);
  fetch("http://10.0.0.155:8000/api/login-view/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": cookies.get("csrftoken"),
    },
    credentials: "same-origin",
    body: JSON.stringify(credentials),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}
