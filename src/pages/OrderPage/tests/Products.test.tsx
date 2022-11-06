import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Products from "../Products";

describe("Products", () => {
  const products = [
    {
      id: 1,
      name: "America",
      price: 10000,
      imgPath: "http://example.com/1.jpg",
      count: 0,
    },
    {
      id: 2,
      name: "Korea",
      price: 20000,
      imgPath: "http://example.com/2.jpg",
      count: 0,
    },
  ];

  const handleUpdate = jest.fn();

  function setup() {
    return render(
      <Products products={products} price={0} onUpdateCount={handleUpdate} />
    );
  }

  context("with render", () => {
    it("display products list, count is '0'", async () => {
      setup();
      const inputElements = (await screen.findAllByRole(
        "spinbutton"
      )) as HTMLInputElement[];
      expect(inputElements).toHaveLength(2);
      expect(inputElements.map((input) => input.value)).toEqual(["0", "0"]);
    });
  });

  context("when count change", () => {
    it("hanldeUpdate called", async () => {
      setup();
      const inputElements = (await screen.findAllByRole(
        "spinbutton"
      )) as HTMLInputElement[];

      // when
      userEvent.type(inputElements[0], "2");

      // then
      expect(handleUpdate).toBeCalled();
      expect(handleUpdate).toBeCalledWith("products", 1, 2);
    });
  });
});
