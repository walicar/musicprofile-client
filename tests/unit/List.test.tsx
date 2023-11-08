import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import List from "@components/List";

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
      { name: "Dance Now", artist: "James", status: "promoted" },
      { name: "Kick Off", artist: "Jarvis", status: "unchanged" },
      { name: "Razor", artist: "Bettie", status: "demoted" },
    ];
    render(<List items={myItems} title={"songs"} />);

    const item1 = await screen.findByText("1. Dance Now by James");
    const item2 = await screen.findByText("2. Kick Off by Jarvis");
    const item3 = await screen.findByText("3. Razor by Bettie");

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(item3).toBeInTheDocument();
  });
});
