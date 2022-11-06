import { TextInput, StyleSheet } from "react-native";

// Mainly a wrapper for some custom styling.
export default function CustomTextInput({
  onChangeHandler,
  onBlurHandler,
  enteredValue,
  placeholder,
  customStyles,
  ...rest
}) {
  return (
    <TextInput
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      value={enteredValue}
      placeholder={placeholder}
      style={{ ...styles.TextInput, ...customStyles }}
      {...rest}
    ></TextInput>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    color: "black",
    width: "75%",
    padding: 8,

    borderWidth: 1,
    borderRadius: 20,
    borderColor: "black",
  },
});
