import { TextInput, StyleSheet, View, Text } from "react-native";

// Mainly a wrapper for some custom styling.
const CustomTextInputWithError = ({
  onChangeHandler,
  onBlurHandler,
  enteredValue,
  placeholder,
  customStyles,
  hasError,
  errorMessage,
  ...rest
}) => {
  const textInputStyles = hasError
    ? { ...styles.TextInput, borderColor: "red", backgroundColor: "#FFCCCB" }
    : styles.TextInput;

  return (
    <View style={{ ...styles.container, ...customStyles }}>
      <TextInput
        onChangeText={onChangeHandler}
        onBlur={onBlurHandler}
        value={enteredValue}
        placeholder={placeholder}
        placeholderTextColor="gray"
        style={textInputStyles}
        {...rest}
      ></TextInput>
      {hasError && <Text style={styles.errorText}>{errorMessage}</Text>}
      {!hasError && <Text style={styles.errorText}> </Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  TextInput: {
    color: "black",
    width: "100%",
    minWidth: "75%",
    padding: 8,

    borderWidth: 1,
    borderRadius: 20,
    borderColor: "black",
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  errorText: {
    color: "red",
    fontSize: 11,
    paddingLeft: 10,
    minHeight: 16,
  },
});

export default CustomTextInputWithError;
