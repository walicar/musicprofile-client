import StubComponent from "../utils/StubComponent";
import SpotifyCallback from "./spotify/SpotifyCallback";

type Handlers = {
  [id: string]: React.ReactNode;
};

const callbackHandlers: Handlers = {
  spotify: <SpotifyCallback />,
  lastfm: <StubComponent />,
};

export default callbackHandlers;
