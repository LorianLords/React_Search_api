import React from "react"; // Импорт React
//import { it, expect, describe, afterEach} from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Card from "../../components/Card/Card.tsx";

afterEach(() => {
  cleanup();
});

describe("Card", () => {
  it("should render Card with data", () => {
    render(
      <Card
        id={1}
        title={"Monie Furie"}
        date_display={"2024"}
        artist_display={"Kerim D"}
        image_id={"21133"}
        image={
          "C:\\Users\\John\\WebstormProjects\\RSschool\\vite-project\\src\\assets\\react.svg"
        }
      />,
    );
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
