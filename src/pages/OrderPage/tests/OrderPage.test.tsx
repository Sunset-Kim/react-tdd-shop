import { render, screen } from "@testing-library/react";
import OrderPage from "../OrderPage";

describe("Order page", () => {
  function setup() {
    return render(<OrderPage />);
  }
  describe("when render", () => {
    it("fetch data", async () => {
      setup();
      const imgElements = (await screen.findAllByRole(
        "img"
      )) as HTMLImageElement[];
      expect(imgElements).toHaveLength(2);
    });

    it("products price", async () => {
      setup();
      const spanElements = (await screen.findAllByText(/price: /i)).map(
        (el) => el.textContent
      );
      expect(spanElements).toEqual(["price: 50000", "price: 10000"]);
    });

    it.todo("All products count is 0");

    it.todo("options price");

    it.todo("All options checked is false");
  });

  describe("products increase", () => {
    it.todo("each products");

    it.todo("total price");
  });

  describe("products decrease", () => {
    it.todo("0 to decrease");

    it.todo("total price");
  });

  describe("option enable checked", () => {
    it.todo("total price");
  });
});
