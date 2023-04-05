export interface IUniReponse<T> extends Record<string, unknown> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}
