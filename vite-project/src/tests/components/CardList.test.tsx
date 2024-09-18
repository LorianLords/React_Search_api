import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import React from "react";
import CardList from "../../components/CardList/CardList.tsx";
import { vi, MockedFunction, expect } from "vitest";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";
import { useGetCardListQuery } from "../../state/Api/ApiSlice.ts";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { CardProps } from "../../types/types.ts";

vi.mock("../../hooks/hooks.ts", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock("../../state/Api/ApiSlice.ts", () => ({
  useGetCardListQuery: vi.fn(),
}));

vi.mock("../../components/Loading.tsx", () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock("../../components/Card/Card.tsx", () => ({
  default: (props: CardProps) => <div>{props.title}</div>,
}));

const mockStore = configureStore({
  reducer: {
    search: (state = { searchText: "" }) => state,
    pagination: (state = { currentPage: 1 }) => state,
  },
});

const mockUseAppSelector = useAppSelector as MockedFunction<
  typeof useAppSelector
>;
const mockUseAppDispatch = useAppDispatch as MockedFunction<
  typeof useAppDispatch
>;
const mockUseGetCardListQuery = useGetCardListQuery as MockedFunction<
  typeof useGetCardListQuery
>;
vi.mock("./CardList.module.css", () => ({}));

afterEach(() => {
  cleanup();
});

describe("CardList", () => {
  beforeEach(() => {
    mockUseAppSelector.mockImplementation((selector) => {
      if (selector.toString().includes("state.search")) {
        return { searchText: "" };
      } else if (selector.toString().includes("state.pagination")) {
        return { currentPage: 1 };
      }
      return {};
    });

    mockUseAppDispatch.mockReturnValue(vi.fn());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render Loading component when loading", () => {
    mockUseGetCardListQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isFetching: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={mockStore}>
        <CardList />
      </Provider>,
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  it("should be render data on screen", () => {
    const mockData: CardProps[] = [
      {
        id: 1,
        title: "Monie Furie",
        date_display: "2024",
        artist_display: "Kerim D",
        image_id: "21133",
        image: null,
      },
      {
        id: 2,
        title: "Ferario",
        date_display: "2022",
        artist_display: "Olan D",
        image_id: "2332",
        image: null,
      },
    ];
    mockUseGetCardListQuery.mockReturnValue({
      data: { cards: mockData },
      error: undefined,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });

    // Настройка замоканной функции fetchData

    const mockSetSearch = vi.fn();
    render(
      <Provider store={mockStore}>
        <CardList />
      </Provider>,
    );

    expect(screen.getByText("Monie Furie")).toBeInTheDocument();
    expect(screen.getByText("Ferario")).toBeInTheDocument();
  });
  it("should be message if there is no data", () => {
    mockUseGetCardListQuery.mockReturnValue({
      data: { cards: [] },
      error: undefined,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={mockStore}>
        <CardList />
      </Provider>,
    );

    expect(
      screen.getByText("Sorry. There are no such pictures"),
    ).toBeInTheDocument();
  });
  it('should throw "I crashed!" error when handErr is true', () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const mockData: CardProps[] = [
      {
        id: 1,
        title: "Monie Furie",
        date_display: "2024",
        artist_display: "Kerim D",
        image_id: "21133",
        image: null,
      },
    ];
    mockUseGetCardListQuery.mockReturnValue({
      data: {
        cards: mockData,
      },
      error: undefined,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });

    expect(() => {
      render(
        <Provider store={mockStore}>
          <CardList />
        </Provider>,
      );

      const errorButton = screen.getByText("Error");
      fireEvent.click(errorButton);
    }).toThrow("I crashed!");

    consoleErrorSpy.mockRestore();
  });
});
