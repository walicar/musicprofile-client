type ServiceTokens = {
  spotify?: string;
  lastfm?: string;
};

type Token = {
  access_token: string;
  created_at: string;
  expires_in: number;
};

type Tokens = {
  spotify?: Token,
  lastfm?: Token
}

type SupportedService = 'spotify' | 'lastfm'