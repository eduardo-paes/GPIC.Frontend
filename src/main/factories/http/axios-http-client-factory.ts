import { AxiosHttpClient } from "@/infrastructure/data/protocols";

export const AxiosHttpClientFactory = (): AxiosHttpClient =>
	new AxiosHttpClient();
