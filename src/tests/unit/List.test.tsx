import React from "react";
import { render, screen } from "@testing-library/react";
import List from "../../components/List";

describe("Testing List component", () => {

  test("when items are an array of strings, string[]", async () => {
    const myItems = ["Bob", "Charlie", "Alice"];
    render(<List items={myItems} title={"string"} />);

    const item1 = await screen.findByText("Bob");
    const item2 = await screen.findByText("Charlie");
    const item3 = await screen.findByText("Alice");

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(item3).toBeInTheDocument();
  });

  test("List an array of song objects", async () => {
    const myItems = [
      { name: "Dance Now", artist: "James" },
      { name: "Kick Off", artist: "Jarvis" },
      { name: "Razor", artist: "Bettie" },
    ];
    render(<List items={myItems} title={"songs"} />);
    
    const item1 = await screen.findByText("Dance Now by James");
    const item2 = await screen.findByText("Kick Off by Jarvis");
    const item3 = await screen.findByText("Razor by Bettie");

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(item3).toBeInTheDocument();
  });
});
