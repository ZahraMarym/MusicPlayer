import { Icon } from "@iconify/react";
import Textfield from "../components/shared/textfield";
import Password from "../components/shared/passwordfield";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const SignupComponent = () => {
  useEffect(() => {
    document.body.classList.add("bg-gray-900");

    return () => {
      document.body.classList.remove("bg-gray-900");
    };
  }, []);
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
        />
        <Textfield
          label="Confirm Email address"
          placeholder="Enter your email again"
          className="mb-6"
        />
        <Password
          label="Create Password"
          placeholder="Enter a strong Password"
        />
        <Textfield
          label="What should we call you?"
          placeholder="Enter a profile name"
          className="my-6"
        />
        <div className="w-full flex items-center justify-center my-8">
          <button className="bg-blue-700 text-blue-50 font-semibold p-3 px-10 rounded-full">
            Sign up
          </button>
        </div>
        <div className="w-full border-b border-solid border-blue-600"></div>
        <div className="font-bold my-6 text-blue-600 text-lg">
          Already have an account?
        </div>
        <div className="border border-blue-600 py-4 text-gray-500 font-bold rounded-full w-full flex items-center justify-center">
          <Link to="/login">Log In instaed!</Link>
        </div>
      </div>
    </div>
  );
};
export default SignupComponent;
