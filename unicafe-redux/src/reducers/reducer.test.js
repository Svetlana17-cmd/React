import { describe, test, expect } from "vitest";
import deepFreeze from "deep-freeze";
import counterReducer, { good, ok, bad, reset } from "./reducer";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test("should return initial state", () => {
    const action = { type: "DO_NOTHING" };
    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("good is incremented", () => {
    const action = good();
    const state = { good: 0, ok: 0, bad: 0 };
    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({ good: 1, ok: 0, bad: 0 });
  });

  test("ok is incremented", () => {
    const action = ok();
    const state = initialState;
    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({ good: 0, ok: 1, bad: 0 });
  });

  test("bad is incremented", () => {
    const action = bad();
    const state = initialState;
    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({ good: 0, ok: 0, bad: 1 });
  });

  test("reset sets all values to zero", () => {
    const action = reset();
    const state = { good: 5, ok: 3, bad: 2 };
    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual(initialState);
  });
});
