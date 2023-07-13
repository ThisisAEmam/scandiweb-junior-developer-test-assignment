import { render, screen } from "@testing-library/react";
import Header from "./Header";

const text = "This is a header!";
const buttons: Button[] = [
  {
    text: "Click me!",
    onClick: () => {},
  },
];

describe("Header", () => {
  it("renders Header component", () => {
    render(<Header title={text} buttons={buttons} />);
  });

  it("renders Header Title", () => {
    render(<Header title={text} buttons={buttons} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("renders Header Buttons", () => {
    render(<Header title={text} buttons={buttons} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
