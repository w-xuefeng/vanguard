export interface IUniResponse<T> extends Record<string, unknown> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}
