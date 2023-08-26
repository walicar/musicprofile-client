import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import StubComponent from "../../components/stubs/StubComponent";

describe("StubCompoent, test drive using MSW", () => {
  test("renders data from API", async () => {
    render(<StubComponent />);
    const item1 = await screen.findByText("Item 1");
    const item2 = await screen.findByText("Item 2");
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });
});
