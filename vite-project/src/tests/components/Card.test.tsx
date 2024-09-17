import React from "react"; // Импорт React
//import { it, expect, describe, afterEach} from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Card from "../../components/Card/Card.tsx";
import { vi, MockedFunction } from "vitest";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";
import ThemeContext from "../../services/ThemeContext.ts";
afterEach(() => {
  cleanup();
});

vi.mock("./Card.module.css", () => ({}));
vi.mock("react-router-dom", async () => {
  const actual = (await vi.importActual("react-router-dom")) as any;
  return {
    ...actual,
    useNavigate: vi.fn(),
    useSearchParams: vi.fn(),
  };
});
vi.mock("../../hooks/hooks.ts", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe("Card", () => {
  const mockNavigate = vi.fn();
  const mockSetSearchParams = vi.fn();
  const mockDispatch = vi.fn();
  const mockUseAppSelector = useAppSelector as MockedFunction<
    typeof useAppSelector
  >;
  const mockUseAppDispatch = useAppDispatch as MockedFunction<
    typeof useAppDispatch
  >;
  const mockUseNavigate = useNavigate as MockedFunction<typeof useNavigate>;
  const mockUseSearchParams = useSearchParams as MockedFunction<
    typeof useSearchParams
  >;

  beforeEach(() => {
    mockUseNavigate.mockReturnValue(mockNavigate);
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ]);
    mockUseAppDispatch.mockReturnValue(mockDispatch);
    mockUseAppSelector.mockImplementation((selectorFn) => {
      if (selectorFn.toString().includes("state.details")) {
        return { isBlocked: false };
      } else if (selectorFn.toString().includes("state.cardList")) {
        return { selectedCards: [] };
      }
      return {};
    });
  });

  const defaultProps = {
    key: 1,
    id: 1,
    title: "Monie Furie",
    date_display: "2024",
    artist_display: "Kerim D",
    image_id: "21133",
    image:
      "C:\\Users\\John\\WebstormProjects\\RSschool\\vite-project\\src\\assets\\react.svg",
  };

  const renderComponent = (props = defaultProps) =>
    render(
      <ThemeContext.Provider value={{ theme: "light", setTheme: null }}>
        <Card {...props} />
      </ThemeContext.Provider>,
    );

  it("should render Card with data", () => {
    renderComponent();

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Monie Furie/i);
  });

  it("should render Card without image", () => {
    render(
      <Card
        id={1}
        title={"Monie Furie"}
        date_display={"2024"}
        artist_display={"Kerim D"}
        image_id={"21133"}
        image={null}
      />,
    );
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
  });
});
