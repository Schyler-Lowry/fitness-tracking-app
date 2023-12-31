export const editUrl = "http://10.0.0.155:8000/api/entries/edit";
export const entriesUrl2 = (page) =>
  `http://10.0.0.155:8000/api/entries/list/?page=${page}`;
export const deleteUrl = "http://10.0.0.155:8000/api/entries/delete";
const checkLoginApiUrl = "http://10.0.0.155:8000/api/checklogin";
const loginApiUrl = "http://10.0.0.155:8000/api/login";

const herokuUrl = "https://weight-tracking-app-a9db95db2d03.herokuapp.com/api/";
export const herokuUrls = {
  entries: herokuUrl + "entries/list/",
  edit: herokuUrl + "entries/edit",
  login: herokuUrl + "login",
  checklogin: herokuUrl + "checklogin",
};
