import * as React from "react";
import renderer from "react-test-renderer";
import ImageSelector from "./ImageSelector";

jest.mock("expo-image-picker", () => {
  return {
    ImagePicker: {
      launchImageLibraryAsync: () => {
        return {
          uri: "testUri",
        };
      },
      MediaTypeOptions: { Images: "images" },
    },
  };
});

it(`renders correctly`, () => {
  const tree = renderer.create(<ImageSelector></ImageSelector>);
  expect(tree).toBeDefined();
});
