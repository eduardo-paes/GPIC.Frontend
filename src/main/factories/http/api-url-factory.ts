
const apiURL = import.meta.env.VITE_API_URL;

export const ApiUrlFactory = (path: string): string =>
  `${apiURL}${path}`;
