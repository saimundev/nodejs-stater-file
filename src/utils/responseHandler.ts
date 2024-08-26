const responseHandler = <T>(
  data: T,
  message: string,
  success: boolean,
  statusCode: number,
  error?: unknown
) => {
  return {
    data,
    message,
    success,
    statusCode,
    error,
  };
};

export default responseHandler;
