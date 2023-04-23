import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { blueThemeColor } from "../../library/constants";

/**
 *
 * @param {*} buttonType Either default or "hyperlink", default is blue with white text, hyperlink is classic hyperlink but non-blue by default
 * @param {*} isUnderlined For "hyperlink" type, underlines button if true
 * @param {*} isSelected For "hyperlink" type, greys out hyperlink if false
 * @param {*} onClick function that is called when the button is clicked
 * @param {*} text text to display in the button
 * @param {*} style Style overrides for container element
 * @param {*} textStyle Style overrides for text element
 * @returns A JSX Pressable component
 */
const CustomButton = ({ buttonType, isUnderlined, isSelected, onClick, text, style, textStyle }) => {
  // Retrieve dynamic styles
  let dynamicContainerStyles = {};
  let dynamicTextStyles = {};
  if (buttonType === "hyperlink") {
    dynamicTextStyles = { ...styles.hyperLinkText };
    if (isSelected === false) {
      dynamicTextStyles.color = "gray";
    }
    if (isUnderlined) {
      dynamicTextStyles.textDecorationLine = "underline";
    }
  } else {
    dynamicContainerStyles = styles.defaultContainer;
    dynamicTextStyles = styles.defaultText;
  }

  const containerStyles = {
    ...styles.container,
    ...dynamicContainerStyles,
    ...style,
  };
  const textStyles = { ...styles.text, ...dynamicTextStyles, ...textStyle };

  return (
    <Pressable onPressOut={onClick} style={containerStyles}>
      <Text style={textStyles}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  defaultContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: blueThemeColor,
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
  },
  defaultText: {
    color: "white",
  },
  hyperLinkText: {
    color: "black",
  },
});

export default CustomButton;
