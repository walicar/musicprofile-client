import React from "react";

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
        {
        items.map((item: any, index: number) => (<li key={`${title}_${index}`}>{item.name} by {item.artist}</li>))
        }
      </ol>
    );
  }
};

export default List;
