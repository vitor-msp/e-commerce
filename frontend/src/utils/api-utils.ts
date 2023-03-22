export const isHttpStatusSuccess = (status: number): boolean => {
  const isHttpStatusSuccess = status >= 200 && status < 300;
  return isHttpStatusSuccess;
};
