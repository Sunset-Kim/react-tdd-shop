import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrderPage from "../OrderPage";
import CounterProvider from "../../../contexts/ProductsProvider";

describe("Order page", () => {
  function setup() {
    return render(<OrderPage />, { wrapper: CounterProvider });
  }

  context("when Products render", () => {
    it("display products list, input count is 0", async () => {
      setup();

      const inputElements = (await screen.findAllByRole(
        "spinbutton"
      )) as HTMLInputElement[];

      expect(inputElements).toHaveLength(2);
      expect(inputElements.map((product) => product.value)).toEqual(["0", "0"]);
    });
  });

  context("increase products count", () => {
    it("increase count value, total price", async () => {
      setup();

      // given
      const inputElements = (await screen.findAllByRole(
        "spinbutton"
      )) as HTMLInputElement[];

      const totalPrice = screen.getByText("Total:", { exact: false });

      // when
      userEvent.type(inputElements[0], "1");

      //then
      expect(totalPrice).toHaveTextContent("Total: 50000");
    });
  });
});
