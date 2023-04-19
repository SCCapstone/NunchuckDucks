import * as React from "react";
import renderer from "react-test-renderer";
import BackButton from "./BackButton";

jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => {
      return {
        goBack: () => console.log("Went back"),
      };
    },
  };
});

it(`renders correctly`, () => {
  const tree = renderer.create(<BackButton></BackButton>);
  expect(tree).toBeDefined();
});
