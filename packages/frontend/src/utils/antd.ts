import { notification as antdNotification } from 'antd';
import { catchError } from '.';

export const notification = Object.keys(antdNotification).reduce((t, ck) => {
  t[ck as keyof typeof antdNotification] = (config: any) => catchError(antdNotification[ck as keyof typeof antdNotification], [config])
  return t;
}, {} as typeof antdNotification)
