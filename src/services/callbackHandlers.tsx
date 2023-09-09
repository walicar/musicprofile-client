import SpotifyCallback from "@spotify/SpotifyCallback";

type Handlers = {
  [id: string]: React.ReactNode;
};

const callbackHandlers: Handlers = {
  spotify: <SpotifyCallback />,
  lasfm: <></>,
};

export default callbackHandlers;
