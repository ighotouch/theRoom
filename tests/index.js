import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// This sets the mock adapter on the default instance
export const mockAxios = new MockAdapter(axios);

const context = {
  user: async () => {
    const loggedInUser = {
      password: await PasswordManager.hashPassword("testing"),
      id: 1,
      firstName: "igho",
      lastName: "matthew",
      email: "igho@gmail.com",
    };

    const currentUser = {
      userId: 1,
    };

    return {
      currentUser,
      loggedInUser,
      isAuthenticated: true,
    };
  },
};

const testUtils = (contextType) => {
  const server = new ApolloServer({
    ...serverOptions,
    context: context[contextType || "user"],
  });

  return createTestClient(server);
};

export default (contextType) => testUtils(contextType);
