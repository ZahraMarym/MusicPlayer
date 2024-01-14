import { Icon } from "@iconify/react";
import Textfield from "../components/shared/textfield";
import Password from "../components/shared/passwordfield";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelper";
const SignupComponent = () => {
  useEffect(() => {
    document.body.classList.add("bg-gray-900");

    return () => {
      document.body.classList.remove("bg-gray-900");
    };
  }, []);

  const [email, setEmail] = useState("");
  const [confirmemail, setConfirmEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const signUp = async () => {
    if (email !== confirmemail) {
      alert("Email and confirm email fields must match. Please check again");
      return;
    }
    const data = {
      firstName,
      lastName,
      email,
      userName,
      password
    };
    const response = await makeUnauthenticatedPOSTRequest(
      "/auth/register",
      data
    );
    if (response && !response.err) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, {path: "/", expires: date});
      alert("Success");
      navigate("/home");
    } else {
      alert("Failure");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="logo p-5 border-b border-solid border-blue-600 w-full flex justify-center">
        <Icon icon="arcticons:simplemusicplayer" color="#1c3db6" width="120" />
      </div>
      <div className="inputRegion w-1/3 py-10 flex flex-col justify-center items-center text-blue-600">
        <div className="font-bold mb-4 text-blue-600 text-2xl">
          SignUp for free to start listening!
        </div>
        <Textfield
          label="Email address"
          placeholder="Enter Email address"
          className="my-2"
          value={email}
          setValue={setEmail}
        />
        <Textfield
          label="Confirm Email address"
          placeholder="Enter your email again"
          className="mb-6"
          value={confirmemail}
          setValue={setConfirmEmail}
        />
        <Textfield
          label="Username"
          placeholder="Enter your username"
          className="mb-6"
          value={userName}
          setValue={setUsername}
        />
        <Password
          label="Create Password"
          placeholder="Enter a strong Password"
          value={password}
          setValue={setPassword}
        />
        <div className="w-full flex justify-between items-center space-x-8">
          <Textfield
            label="First Name"
            placeholder="Enter your First Name"
            className="my-6"
            value={firstName}
            setValue={setFirstName}
          />
          <Textfield
            label="Last Name"
            placeholder="Enter your Last Name"
            className="my-6"
            value={lastName}
            setValue={setLastName}
          />
        </div>
        <div className="w-full flex items-center justify-center my-8">
          <button
            className="bg-blue-700 text-blue-50 font-semibold p-3 px-10 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              signUp();
            }}
          >
            Sign up
          </button>
        </div>
        <div className="w-full border-b border-solid border-blue-600"></div>
        <div className="font-bold my-6 text-blue-600 text-lg">
          Already have an account?
        </div>
        <div className="border border-blue-600 py-4 text-gray-500 font-bold rounded-full w-full flex items-center justify-center">
          <Link to="/login">Log In instead!</Link>
        </div>
      </div>
    </div>
  );
};
export default SignupComponent;
