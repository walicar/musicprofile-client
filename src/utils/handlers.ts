import stubString from "./stubs";

type Handlers = {
    [id: string]: Function;
}

const handlers: Handlers = {
    spotify: stubString,
    apple: stubString,
    lastfm: stubString
}

export default handlers;


