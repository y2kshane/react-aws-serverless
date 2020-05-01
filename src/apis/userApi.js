import { Amplify, Auth } from "aws-amplify";

const signUp = async (signUpData) => {
  const { email, password, username, firstName, lastName, phone } = signUpData;
  const result = await Auth.signUp({
    username,
    password,
    attributes: {
      name: firstName,
      family_name: lastName,
      phone_number: phone,
      email, // optional
    },
    validationData: [], //optional
  });
};

const confirmSignUp = async (username, code) => {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    console.error("error confirming sign up", error);
    return null;
  }
};

const resendConfirmationCode = async (username) => {
  try {
    await Auth.resendSignUp(username);
    return true;
  } catch (error) {
    console.error("error resending code", error);
    return null;
  }
};

const signIn = async (username, password) => {
  const user = await Auth.signIn({ username, password });
  return user;
};

const signOut = async () => {
  try {
    await Auth.signOut();
    return true;
  } catch (error) {
    console.error("error signing out", error);
    return null;
  }
};

export { signUp, confirmSignUp, resendConfirmationCode, signIn, signOut };
