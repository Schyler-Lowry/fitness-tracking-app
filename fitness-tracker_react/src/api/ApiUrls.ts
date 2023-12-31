export const editUrl = "http://10.0.0.155:8000/api/entries/edit";
export const entriesUrl2 = (page: string | number) =>
  `http://10.0.0.155:8000/api/entries/list/?page=${page}`;
export const deleteUrl = "http://10.0.0.155:8000/api/entries/delete";
const checkLoginApiUrl = "http://10.0.0.155:8000/api/checklogin";
const loginApiUrl = "http://10.0.0.155:8000/api/login";

const djangoUrl = "http://10.0.0.155:8000/api/";

const herokuUrl = "https://weight-tracking-app-a9db95db2d03.herokuapp.com/api/";
// export const herokuUrls = {
//   entries: herokuUrl + "entries/list/",
//   add: herokuUrl + "entries/add",
//   edit: herokuUrl + "entries/edit",
//   delete: herokuUrl + "entries/delete",

//   login: herokuUrl + "login",
//   checklogin: herokuUrl + "checklogin",
//   logout: herokuUrl + "logout",
// };
// export const herokuUrls = {
//   entries: djangoUrl + "entries/list/",
//   add: djangoUrl + "entries/add",
//   edit: djangoUrl + "entries/edit",
//   delete: djangoUrl + "entries/delete",

//   login: djangoUrl + "login",
//   checklogin: djangoUrl + "checklogin",
//   logout: djangoUrl + "logout",
// };
export const herokuUrls = {
  entries: "/api/entries/list/",
  add: "/api/entries/add",
  edit: "/api/entries/edit",
  delete: "/api/entries/delete",
  login: "/api/login",
  checklogin: "/api/checklogin",
  logout: "/api/logout",
};

export const djangoUrls = {
  entries: djangoUrl + "entries/list/",
  edit: djangoUrl + "entries/edit",
  login: djangoUrl + "login",
  checklogin: djangoUrl + "checklogin",
};
