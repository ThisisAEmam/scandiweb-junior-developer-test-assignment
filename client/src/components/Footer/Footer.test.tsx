import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders Footer component", () => {
    render(<Footer />);
  });

  it("renders Footer Text", () => {
    render(<Footer />);

    expect(screen.getByText(/Scandiweb Test assignment/i)).toBeInTheDocument();
  });
});
