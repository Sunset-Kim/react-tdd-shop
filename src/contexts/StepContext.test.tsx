import { Action, stepReducer } from "./StepContext";

describe("Step Context", () => {
  describe("Step Reducer", () => {
    it("next", () => {
      const initState = {
        step: 0,
      };

      const action: Action = {
        type: "next",
      };
      const state = stepReducer(initState, action);
      expect(state.step).toBe(1);
    });

    it("PREV", () => {
      const initState = {
        step: 1,
      };

      const action: Action = {
        type: "prev",
      };
      const state = stepReducer(initState, action);
      expect(state.step).toBe(0);
    });

    it("RESET", () => {
      const initState = {
        step: 101,
      };

      const action: Action = {
        type: "reset",
      };
      const state = stepReducer(initState, action);
      expect(state.step).toBe(0);
    });

    it("set step", () => {
      const initState = {
        step: 0,
      };

      const action: Action = {
        type: "setStep",
        step: 3,
      };
      const state = stepReducer(initState, action);
      expect(state.step).toBe(3);
    });
  });
});
