//  Significant inspiration and code taken from Maximilian Schwarzmuller
//  from his udemy course "react-the-complete-guide-incl-redux"
//  Github: https://github.com/maxschwarzmueller

import { useEffect, useState } from "react";

const useInput = (validateValue, initialValue = "") => {
  const [enteredValue, setEnteredValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    setEnteredValue(initialValue);
  }, [initialValue]);

  const { valueIsValid, errorMessage } = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    errorMessage,
    onChangeHandler: setEnteredValue,
    inputBlurHandler,
    reset,
    isTouched,
  };
};

export default useInput;
