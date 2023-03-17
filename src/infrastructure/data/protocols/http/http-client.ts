export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

export interface HttpRequest {
  url: string;
  method: string;
  headers?: object;
  body?: object;
}

export interface HttpResponse {
  statusCode: HttpStatusCode;
  body?: any;
}

export interface IHttpClient {
  request(data: HttpRequest): Promise<HttpResponse>;
}
