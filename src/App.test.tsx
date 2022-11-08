import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  function setup() {
    render(<App />);

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

      expect(title.order).toBeInTheDocument();
      expect(title.summary).not.toBeInTheDocument();
      expect(title.complete).not.toBeInTheDocument();
    });
  });

  context("when Product price changes", () => {
    it.todo("price are 0, button is disabled");
    it.todo("price are not 0, button is actived");
    it.todo("click button, display summary page");
  });
});
