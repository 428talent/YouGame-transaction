interface ApiError {
  error : String;
  detail : String;
  code : String;
}
export enum ErrorCodes {
    ServerError = '0000001',
    NotFound = '0000002',
}
function createApiError(error: String, detail: String, code: String) {
  return {
    error,
    detail,
    code,
  };
}

export function abortError(res:any, err: ApiError, statusCode : number) {
  res.status(statusCode);
  res.send(err);
}

export function abortResourceNotFound(res:any) {
  res.status(404);
  res.send({
    error:'ResourceNotFoundError',
    detail:'resource not found !',
    code:ErrorCodes.NotFound,
  });
}
