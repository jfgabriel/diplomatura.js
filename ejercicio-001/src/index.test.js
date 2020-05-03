import sum from "./index";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("adds 10 + (-2) to equal 8", () => {
  expect(sum(10, -2)).toBe(8);
});
