export const injectJwt = (jwt: string) => {
  const header = {
    Authorization: `Bearer ${jwt}`,
  };
  return header;
};
