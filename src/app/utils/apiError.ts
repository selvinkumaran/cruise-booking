// api-error-handler.ts
export function handleApiError(err: any): string {
  let message: string = err.error.error.message;
  return message.includes(',') ? message.split(',')[0] : message;
}
