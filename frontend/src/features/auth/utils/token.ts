let accessToken: string | null = null;

export const getAccessToken = () => accessToken;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const clearAccessToken = () => {
  accessToken = null;
  localStorage.removeItem("accessToken");
};

export const loadTokenFromStorage = () => {
  accessToken = localStorage.getItem("accessToken");
};