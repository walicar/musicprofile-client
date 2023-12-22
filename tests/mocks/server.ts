import { type SetupServer, setupServer } from "msw/node";
import { handlers } from "./handlers";

// This configures a request mocking server with the given request handlers.
const server: SetupServer = setupServer(...handlers);
export { server };
