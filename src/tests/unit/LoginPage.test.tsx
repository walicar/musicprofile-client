import { vi, describe, test, expect } from "vitest";
import { render, act } from "@testing-library/react";
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

const mockGetSession = vi.fn();
vi.mock("@components/contexts/SupabaseContext", async () => {
  const actual: any = await vi.importActual(
    "@components/contexts/SupabaseContext"
  );
  return {
    ...actual,
    useSupabaseClient: () => ({
      auth: {
        getSession: mockGetSession,
      },
    }),
  };
});

describe("LoginPageA", async () => {
  test("Page redirects user to dashboard if already signed in", async () => {
    //   vi.mock("use-local-storage-state", () => ({
    //     __esModule: true,
    //     default: () => [
    //       { access_token: "mock", expires_in: 3600, created_at: "my-date" },
    //       vi.fn(),
    //       vi.fn(),
    //     ],
    //   }));
    const mockedResponse = {
      data: {
        session: "some_mocked_session_value",
      },
    };

    mockGetSession.mockResolvedValueOnce(mockedResponse);
    await act(async () => {
      render(
        <BrowserRouter>
          <LoginPageBeta />
        </BrowserRouter>
      );
    });

    expect(mockedUseNavigate).toHaveBeenCalledOnce();
  });
});
