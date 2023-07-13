import { render, screen } from "@testing-library/react";
import Button from "./Button";

const text = "Click Me!";

describe("Button", () => {
  it("renders button tag", () => {
    render(<Button text={text} onClick={() => {}} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders Button component", () => {
    render(<Button text={text} onClick={() => {}} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
