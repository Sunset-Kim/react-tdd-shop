import { stepReducer } from "./StepContext";

describe("Step Context", () => {
  describe("Step Reducer", () => {
    it("next", () => {
      const initState = {
        step: 0,
      };

      const action = {
        type: "next",
      };
      const state = stepReducer(initState, action);
      expect(state.step).toBe(1);
    });

    it("PREV", () => {
      const initState = {
        step: 1,
      };

      const action = {
        type: "prev",
      };
      const state = stepReducer(initState, action);
      expect(state.step).toBe(0);
    });

    it("RESET", () => {
      const initState = {
        step: 101,
      };

      const action = {
        type: "reset",
      };
      const state = stepReducer(initState, action);
      expect(state.step).toBe(0);
    });
  });
});
