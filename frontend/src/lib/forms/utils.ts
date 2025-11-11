import { FieldError, UseFormReturn } from 'react-hook-form';

/**
 * Get error message from form field
 */
export const getErrorMessage = (
  errors: UseFormReturn<any>['formState']['errors'],
  fieldName: string
): string | undefined => {
  const error = errors[fieldName] as FieldError | undefined;
  return error?.message;
};

/**
 * Format validation errors from API response
 */
export const formatApiErrors = (errors: Array<{ path: string; message: string }>) => {
  const formatted: Record<string, string> = {};
  errors.forEach((error) => {
    formatted[error.path] = error.message;
  });
  return formatted;
};

