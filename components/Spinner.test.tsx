import { render, screen } from "@testing-library/react"
import { Spinner } from "./Spinner"

describe("Spinner", () => {
  it("renders without crashing", () => {
    render(<Spinner />)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("applies size variant classes", () => {
    render(<Spinner size="lg" data-testid="spinner" />)
    expect(screen.getByTestId("spinner")).toHaveClass("h-10", "w-10")
  })

  it("forwards extra className", () => {
    render(<Spinner className="text-primary" data-testid="spinner" />)
    expect(screen.getByTestId("spinner")).toHaveClass("text-primary")
  })
})
