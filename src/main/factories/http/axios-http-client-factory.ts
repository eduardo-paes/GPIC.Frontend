import { AxiosHttpClient } from "@/infra/http";

export const AxiosHttpClientFactory = (): AxiosHttpClient =>
  new AxiosHttpClient();
