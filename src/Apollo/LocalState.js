export const defaults = {
  isLoggedIn: Boolean(sessionStorage.getItem("token")) || false,
};

export const resolvers = {
  Mutation: {
    logUserIn: (_, { token }, { cache }) => {
      sessionStorage.setItem("token", token);
      cache.writeData({
        data: {
          isLoggedIn: true,
        },
      });
      return null;
    },
    logUserOut: (_, __, { cache }) => {
      sessionStorage.removeItem("token");
      window.location = "/";
      return null;
    },
  },
};
