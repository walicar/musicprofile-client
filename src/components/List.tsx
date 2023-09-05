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
    return (
      <ul
        role="list"
        className="space-y-2 bg-gray-300 p-3 max-height-[90vh] rounded-b-md"
      >
        {items.map((item: TopItemEntry, index: number) => (
          // <li
          //   key={`${title}_${index}`}
          //   className="text-sm overflow-hidden rounded-md justify-between bg-white px-5 py-2 shadow flex"
          // >
          //   <div className="flex items-center">
          //     {index + 1}. <a href={item.url}>{item.name} {item.artist ? `by ${item.artist} ` : ""}</a>
          //   </div>
          //   <div className="mr-2">{statusIcons[item.status]}</div>
          // </li>
          <li
            key={`${title}_${index}`}
            className="text-sm overflow-hidden rounded-md justify-between bg-white px-5 py-2 shadow flex"
          >
            <div className="flex items-center">
              {item.img ? (
                <img
                  className="inline-block mr-3 h-6 w-6 rounded-full"
                  src={item.img}
                />
              ) : (
                <></>
              )}
              <div>
                {index + 1}.{" "}
                {item.url ? (
                  <a href={item.url} className="hover:text-indigo-600">
                    {item.name} {item.artist ? `by ${item.artist} ` : ""}
                  </a>
                ) : (
                  <>
                    {" "}
                    {item.name} {item.artist ? `by ${item.artist} ` : ""}{" "}
                  </>
                )}
              </div>
            </div>
            <div className="mr-2">{statusIcons[item.status]}</div>
          </li>
        ))}
      </ul>
    );
  }
};

export default List;
