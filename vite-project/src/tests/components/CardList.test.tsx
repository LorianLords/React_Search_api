import { render, screen, cleanup, waitFor } from "@testing-library/react";
import React from "react";
import { CardProps } from "../../types/types.ts";
import CardList from "../../components/CardList/CardList.tsx";
import { fetchData } from "../../services/apiService.ts";
import { expect } from "vitest";

vi.mock("../../services/apiService", () => ({
  fetchData: vi.fn(),
}));

afterEach(() => {
  cleanup();
});

describe("CardList", () => {
  it("should be render data on screen", async () => {
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

    // Настройка замоканной функции fetchData
    (fetchData as ReturnType<typeof vi.fn>).mockResolvedValue(mockData);
    const mockSetSearch = vi.fn();
    render(<CardList search={""} setSearch={mockSetSearch} />);
    setTimeout(() => {}, 10000);
    for (const card of mockData) {
      await waitFor(() => {
        const tittle = screen.getByRole("heading", { name: card.title });
        expect(tittle).toBeInTheDocument();
      });
    }
  });
  it("should be message if there is no data", async () => {
    const mockData: CardProps[] = [];

    // Настройка замоканной функции fetchData
    (fetchData as ReturnType<typeof vi.fn>).mockResolvedValue(mockData);
    const mockSetSearch = vi.fn();
    render(<CardList search={""} setSearch={mockSetSearch} />);
    setTimeout(() => {}, 10000);

    await waitFor(() => {
      const tittle = screen.getByRole("heading", { name: /Sorry. There are/i });
      expect(tittle).toBeInTheDocument();
      screen.debug();
    });
  });
});
