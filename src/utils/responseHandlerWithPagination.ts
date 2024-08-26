interface IExtraData {
  total: number;
  totalPages: number;
  currentPage: number;
  firstPage?: number;
  lastPage?: number;
}

const responseHandlerWithPagination = <T,TError>(
  data: T,
  extraData: IExtraData,
  message: string,
  success: boolean,
  statusCode: number,
  error?: TError
) => {
  return {
    data,
    extraData,
    message,
    success,
    statusCode,
    error,
  };
};

export default responseHandlerWithPagination;
