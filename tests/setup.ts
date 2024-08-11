import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { server } from "./mocks/server";

beforeAll(() => {
  localStorage.clear();
  server.listen();
  vi.mock("next/router", () => require("next-router-mock"));

  vi.mock("next/navigation", async (importOriginal) => {
    const actual = await importOriginal<typeof import("next/navigation")>();
    const { useRouter } =
      await vi.importActual<typeof import("next-router-mock")>(
        "next-router-mock"
      );
    const usePathname = vi.fn().mockImplementation(() => {
      const router = useRouter();
      return router.pathname;
    });
    const useSearchParams = vi.fn().mockImplementation(() => {
      const router = useRouter();
      return new URLSearchParams(router.query?.toString());
    });
    return {
      ...actual,
      useRouter: vi.fn().mockImplementation(useRouter),
      usePathname,
      useSearchParams,
    };
  });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => server.close());
