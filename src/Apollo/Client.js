import ApolloClient from "apollo-boost";
import { API_SERVER } from "../AWS_IAM";

export default new ApolloClient({
  uri: API_SERVER,
});
