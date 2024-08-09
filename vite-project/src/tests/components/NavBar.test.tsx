import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import NavBar from "../../components/NavBar/NavBar.tsx";
import { expect } from "vitest";
import { links } from "../../types/Const.ts";

vi.mock("../../types/Const.ts", () => ({
  links: [
    { name: "mock Home", url: "/mock-home" },
    { name: "mock Users", url: "/mock-users" },
  ],
}));

describe("NavBar", () => {
  it("should be show links", () => {
    render(<NavBar />);

    links.forEach((link) => {
      const item = screen.getByText(link.name);
      expect(item).toBeInTheDocument();
      expect(item).toHaveAttribute('to')
    });
  });
});
