import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export const ErrorHandler = (error: Error | FetchBaseQueryError | SerializedError) => {
  let errorMessage = 'Unknown error occurred';
  if ('status' in error) {
    // Это FetchBaseQueryError (ошибка от запроса)
    const fetchError = error as FetchBaseQueryError;
    errorMessage = `Error ${fetchError.status}: ${fetchError?.data || 'Unknown error'}`;
  } else if ('message' in error) {
    // Это SerializedError (общая ошибка)
    const serializedError = error as SerializedError;
    errorMessage = serializedError.message || 'Unknown serialized error';
  }
  throw new Error(errorMessage);
};
