import StubComponent from "../components/stubs/StubComponent";
import SpotifyCallback from "./spotify/SpotifyCallback";

type Handlers = {
  [id: string]: React.ReactNode;
};

const callbackHandlers: Handlers = {
  spotify: <SpotifyCallback />,
  lasfm: <StubComponent />
};

export default callbackHandlers;