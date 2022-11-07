import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

describe("options", () => {
  const onUpdate = jest.fn();

  const OPTIONS = [
    { id: 1, name: "First-Class", price: 100000, checked: false },
    { id: 2, name: "Hotel dinner", price: 200000, checked: false },
  ];

  function setup() {
    return render(<Options options={OPTIONS} onUpdate={onUpdate} />);
  }
  context("when render options ", () => {
    it("render list", () => {
      setup();

      const checkBoxes = screen.getAllByRole("checkbox") as HTMLInputElement[];

      expect(checkBoxes).toHaveLength(2);
      expect(checkBoxes.map((v) => v.checked)).toEqual([false, false]);
    });
  });

  context("when options checked", () => {
    it("change input checked true, called onUpdate", () => {
      setup();

      // given
      const checkBox = screen.getByRole("checkbox", {
        name: "First-Class",
      });

      // when
      userEvent.click(checkBox);

      // then
      expect(checkBox).toBeChecked();
      expect(onUpdate).toBeCalledWith(1, true);
    });
  });
});
