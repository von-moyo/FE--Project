export const checkPassword = (password1: any, password2: any) => {
  const caseRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])/);
  const numberAndSymbolRegex = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])/);
  return {
    length: password1.length >= 8 && password2.length >= 8,
    case: caseRegex.test(password1) && caseRegex.test(password2),
    numberAndSymbol: numberAndSymbolRegex.test(password1) && numberAndSymbolRegex.test(password2)
  };
};