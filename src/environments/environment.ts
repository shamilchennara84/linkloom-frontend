export const environment = {
  production: false,
  baseUrl: import.meta.env["NG_APP_BASE_URL"], // ${backendUrl} + /api
//   baseUrl: "http://localhost:3000/api/"
  backendUrl: import.meta.env["NG_APP_BACKEND_URL"],
};
