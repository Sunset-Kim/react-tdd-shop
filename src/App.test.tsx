import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import ProductsProvider from "./contexts/ProductsProvider";
import { StepProvider } from "./contexts/StepContext";

describe("App", () => {
  function setup() {
    render(
      <StepProvider>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </StepProvider>
    );

    const orderTitle = screen.queryByRole("heading", {
      level: 1,
      name: /Order/,
    });
    const completeTitle = screen.queryByRole("heading", {
      level: 1,
      name: /Complete/,
    });
    const summaryTitle = screen.queryByRole("heading", {
      level: 1,
      name: /Summary/,
    });

    return {
      title: {
        order: orderTitle,
        complete: completeTitle,
        summary: summaryTitle,
      },
    };
  }

  context("when it is first rendered", () => {
    it("should only display order page", () => {
      const { title } = setup();

      // given
      const button = screen.getByRole("button", { name: /Order Now/ });

      // then
      expect(title.order).toBeInTheDocument();
      expect(title.summary).not.toBeInTheDocument();
      expect(title.complete).not.toBeInTheDocument();
      expect(button).toBeDisabled();
    });
  });

  context("when Product price changes", () => {
    it("price are not 0, button is actived", async () => {
      setup();

      //given
      const input = await screen.findByRole("spinbutton", { name: "America" });
      const totalPrice = screen.getByRole("definition", {
        name: "total-price",
      });
      const button = screen.getByRole("button", { name: /order now/i });

      // when
      userEvent.type(input, "1");

      //then
      expect(totalPrice).toHaveTextContent(/50000/);
      expect(button).toBeEnabled();
    });

    it("click button, display summary page", async () => {
      setup();

      //given
      const input = await screen.findByRole("spinbutton", { name: "America" });
      const button = screen.getByRole("button", { name: /order now/i });

      // when
      userEvent.type(input, "1");
      userEvent.click(button);

      const summaryHeading = screen.getByRole("heading", {
        level: 1,
        name: /Summary/,
      });

      //then
      expect(summaryHeading).toBeInTheDocument();
    });
  });
});
