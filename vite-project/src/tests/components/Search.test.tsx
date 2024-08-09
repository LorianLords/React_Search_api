import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import SearchContainer from "../../components/Search/SearchContainer.tsx";

afterEach(() => {
  cleanup();
});

describe("SearchContainer", () => {
  it("should render header component", () => {
    const mockSetSearch = vi.fn();
    render(<SearchContainer search={""} setSearch={mockSetSearch} />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Search/i);
  });

  it("should be text in input field from props", () => {
    const mockSetSearch = vi.fn();
    const searchValue: string = "mark";
    render(<SearchContainer search={searchValue} setSearch={mockSetSearch} />);

    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue(searchValue);
  });

  it('should save value from search input to local storage after click button "search"', () => {
    const mockSetSearch = vi.fn();
    render(<SearchContainer search={""} setSearch={mockSetSearch} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "test value" } });
    expect(input).toHaveValue("test value");

    fireEvent.click(button);

    expect(localStorage.getItem("searchText")).toBe("test value");
  });
});
