import { AxiosHttpClient } from "@/infrastructure/http";

export const AxiosHttpClientFactory = (): AxiosHttpClient =>
  new AxiosHttpClient();
