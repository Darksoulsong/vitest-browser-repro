import { describe, it, expect } from "vitest";
import { MY_CONSTANT_A, MY_CONSTANT_B } from "../constants";

describe("Constants", () => {
  it("should have correct values", () => {
    expect(MY_CONSTANT_A).toBe("ValueA");
    expect(MY_CONSTANT_B).toBe("ValueB");
  });
});
