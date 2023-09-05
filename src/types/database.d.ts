type TopItemEntry = {
  name: string;
  status: string;
  artist?: string;
  id?: string;
  url?: string;
  img?: string;
};

type StatusIcons = {
  [status: string]: any;
};

type TopItemColumns = {
  id?: string;
  songs: TopItemEntry[];
  artists: TopItemEntry[];
  genres: TopItemEntry[];
  last_updated?: string;
};
