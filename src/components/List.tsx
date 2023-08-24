import React from "react";
import statusIcons from "@utils/statusIcons";

type Prop = {
  // items: string[] | { [key: string]: any }[]
  items: any;
  title: string;
};
const List: React.FC<Prop> = ({ items, title }) => {
  if (Array.isArray(items) && typeof items[0] === "string") {
    return (
      <ol>
        {items.map((item: string, index: number) => (
          <li key={`${title}_${index}`}>{item}</li>
        ))}
      </ol>
    );
  } else {
    // assume that we a listing out songs from DB
    // is there a better way to do this
    return (
      <ol>
        {items.map((item: TopItemEntry, index: number) => (
          <li key={`${title}_${index}`}>
            {item.name} {item.artist ? `by ${item.artist} ` : ""}===
            {item.status ? " " + statusIcons[item.status] : ""}
          </li>
        ))}
      </ol>
    );
  }
};

export default List;
