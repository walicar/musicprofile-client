import React from "react";
import { render, screen } from "@testing-library/react";
import {vi, describe, beforeEach} from "vitest";
import StubComponent from "../../components/stubs/StubComponent";

/**
 * This is just a test file to experiment with mocking fetch
 */

// Mock the fetch function

describe("MyComponent", () => {
  const mockResponse = new Response(
    JSON.stringify([
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ]),
  );

  beforeEach(() => {
    vi.spyOn(global, "fetch").mockResolvedValue(mockResponse);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders data from API", async () => {
    console.log("hello?????");
    render(<StubComponent />);

    const item1 = await screen.findByText("Item 1");
    const item2 = await screen.findByText("Item 2");

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });
});
