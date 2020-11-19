import ApolloClient from "apollo-boost";
import { API_SERVER } from "../AWS_IAM";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
  uri: API_SERVER,
  clientState: {
    defaults,
    resolvers,
  },
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});
