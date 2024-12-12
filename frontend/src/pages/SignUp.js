import { signUpUser } from "../utils/api";

// contexts
import { useAuthenticationContext } from "../hooks/useAuthenticationContext";

// components
import SignForm from "../components/SignForm";

const SignUp = () => {
  const { dispatch } = useAuthenticationContext();

  const isButtonDisabled = ({ name, email, password }) => {
    return !name || !email || !password;
  };

  const handleSubmit = async ({ name, email, password }) => {
    const { isResponseOkay, data } = await signUpUser(
      name,
      email,
      password,
      "customer",
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
      isSigningUp={true}
      isButtonDisabled={isButtonDisabled}
      onSubmit={handleSubmit}
    />
  );
};

export default SignUp;
