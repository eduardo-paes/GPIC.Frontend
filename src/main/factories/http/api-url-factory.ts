export const ApiUrlFactory = (path: string): string =>
  `${process.env.API_URL}${path}`;
