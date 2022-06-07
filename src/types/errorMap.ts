export enum ErrorCodeEnum {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
}

export enum ErrorTypeEnum {
  UNAUTHORIZED = "unauthorized",
  FORBIDDEN = "forbidden",
}

export const errorMap: Record<
  ErrorTypeEnum,
  { code: ErrorCodeEnum; message: string }
> = {
  [ErrorTypeEnum.UNAUTHORIZED]: {
    code: ErrorCodeEnum.UNAUTHORIZED,
    message: "unauthorized",
  },
  [ErrorTypeEnum.FORBIDDEN]: {
    code: ErrorCodeEnum.FORBIDDEN,
    message: "forbidden",
  },
};
