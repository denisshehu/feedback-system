import { signInUser } from "../utils/api";

// contexts
import { useAuthenticationContext } from "../hooks/useAuthenticationContext";

// components
import SignForm from "../components/SignForm";

const SignIn = () => {
  const { dispatch } = useAuthenticationContext();

  const isButtonDisabled = ({ email, password }) => {
    return !email || !password;
  };

  const handleSubmit = async ({ email, password }) => {
    const { isResponseOkay, data } = await signInUser(
      email,
      password,
      dispatch
    );

    if (isResponseOkay) {
      localStorage.setItem("user", JSON.stringify(data));
    } else {
      throw new Error(data.error);
    }
  };

  return (
    <SignForm
      isSigningUp={false}
      isButtonDisabled={isButtonDisabled}
      onSubmit={handleSubmit}
    />
  );
};

export default SignIn;
