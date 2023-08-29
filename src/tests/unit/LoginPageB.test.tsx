import { vi, describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPageBeta from "@components/pages/LoginPage";

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual: any = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
  };
});
describe("LoginPageB", () => {
  test("Page redirects user to dashboard if already signed in", async () => {
    vi.mock("use-local-storage-state", () => ({
      __esModule: true,
      default: () => [
        { access_token: "mock", expires_in: 3600, created_at: "my-date" },
        vi.fn(),
        vi.fn(),
      ],
    }));

    render(
      <BrowserRouter>
        <LoginPageBeta />
      </BrowserRouter>
    );
    expect(mockedUseNavigate).toHaveBeenCalledOnce();
  });
});
