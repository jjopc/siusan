export const getUser = (data = window.localStorage.getItem("siusan.auth")) => {
  // console.log("AUTH_SERVICE -> getUser, data: ", data);
  // const auth = JSON.parse(window.localStorage.getItem("siusan.auth"));
  if (data) {
    const auth = JSON.parse(data);
    // console.log(auth.access_token)
    if (auth) {
      const [header, payload, signature] = auth.access_token.split(".");
      const decoded = window.atob(payload);
      return JSON.parse(decoded);
    }
  }
  return undefined;
};

export const isStaff = () => {
  const user = getUser();
  return user && user.is_staff;
};

export const getAccessToken = (
  data = window.localStorage.getItem("siusan.auth")
) => {
  // const auth = JSON.parse(window.localStorage.getItem("siusan.auth"));
  const auth = JSON.parse(data);
  if (auth) {
    return auth.access_token;
  }
  return undefined;
};

export const getAuthHeader = () => {
  const accessToken = getAccessToken();

  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` };
  } else {
    return {};
  }
};
