import getPictureFileName from "./getPictureFileName";

test("Generates expected format", () => {
  expect(getPictureFileName()).toMatch(/[0-9]{2}-[0-9]{2}-[0-9]{4}-[0-9]{13}/);
});
