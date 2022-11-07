import { getByText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrderPage from "../OrderPage";
import CounterProvider from "../../../contexts/ProductsProvider";

describe("Integration test for Order page", () => {
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

      const totalPrice = screen.getByText("Prodcuts Price:", { exact: false });

      // when
      userEvent.type(inputElements[0], "1");

      //then
      expect(totalPrice).toHaveTextContent(/50000/);
    });
  });

  context("when Options render", () => {
    it("display options list, input checked is false", async () => {
      setup();

      const inputElements = (await screen.findAllByRole(
        "checkbox"
      )) as HTMLInputElement[];

      expect(inputElements).toHaveLength(2);
      expect(inputElements.map((product) => product.checked)).toEqual([
        false,
        false,
      ]);
    });
  });

  context("when Option check", () => {
    it("change checked, Option Price", async () => {
      setup();

      // given
      const checkbox = (await screen.findByRole("checkbox", {
        name: "First-Class",
      })) as HTMLInputElement;

      const optPrice = screen.getByText("Options Price:", { exact: false });

      // when
      userEvent.click(checkbox);

      // then
      expect(checkbox).toBeChecked();
      expect(optPrice).toHaveTextContent(/10000/);
    });
  });
});
