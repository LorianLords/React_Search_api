import React from "react";
import { render, screen } from "@testing-library/react";
import About from "../../views/About.tsx";

describe("About page", () => {
  it("should render about info", () => {
    render(<About />);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/This is About Page/i);
  });
});
