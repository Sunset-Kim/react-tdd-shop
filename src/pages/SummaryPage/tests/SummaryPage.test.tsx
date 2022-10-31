import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryPage from "../SummaryPage";

describe("Summary Page", () => {
  function renderPage() {
    return render(<SummaryPage />);
  }
  it("checkbox의 초기값은 false 입니다", () => {
    renderPage();

    const checkboxElement = screen.getByRole("checkbox", {
      name: "주문을 확정합니까?",
    });

    expect(checkboxElement).not.toBeChecked();
  });

  it("체크박스가 활성화 되지 않으면 Button은 disabled 상태입니다", () => {
    renderPage();
    const confirmButton = screen.getByRole("button", {
      name: "확정",
    });
    expect(confirmButton).toBeDisabled();
  });

  it("체크박스가 활성화 되면 Button은 enable 상태되어야 한다", () => {
    renderPage();

    const checkboxElement = screen.getByRole("checkbox", {
      name: "주문을 확정합니까?",
    });

    userEvent.click(checkboxElement);

    const confirmButton = screen.getByRole("button", {
      name: "확정",
    });

    expect(checkboxElement).toBeChecked();
    expect(confirmButton).toBeEnabled();
  });
});
