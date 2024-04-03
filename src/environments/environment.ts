export const environment = {
  production: false,
  baseUrl: import.meta.env['NG_APP_API_URL'], // ${backendUrl} + /api
  backendUrl: import.meta.env['NG_APP_BACKEND_URL'],
  imageUrl: import.meta.env['NG_APP_IMAGE_URL'],
  googleApiKEY: import.meta.env['NG_APP_GOOGLEMAP_KEY'],
};

