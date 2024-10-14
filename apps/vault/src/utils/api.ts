export interface ErrorInfo {
  httpStatusCode: number;
  errorCode: string;
  message: string;
}

export default function checkError(result: any): ErrorInfo | undefined {
  let httpStatusCode;
  let errorCode;
  let message;
  if (result && result.error) {
    if ('status' in result.error) {
      httpStatusCode = result.error.status;
    }
    if (
      'data' in result.error &&
      result.error.data &&
      typeof result.error.data === 'object'
    ) {
      if ('code' in result.error.data) {
        errorCode = result.error.data.code;
      }
      if ('message' in result.error.data) {
        message = result.error.data.message;
      }
    }
    return {
      httpStatusCode,
      errorCode,
      message,
    };
  }
}
