export default class ErrorHelper {
  static buildErrorMessage = (response: Response) => {
    const status = response.status;
    const statusText = response.statusText;
    const trace = response.headers.get('x-trace-id');
    return `${statusText} Status: ${status} ${trace ? `(traceId: ${trace})` : ``}`;
  };
}
