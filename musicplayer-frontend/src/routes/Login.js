import { Icon } from "@iconify/react";
import Textfield from "../components/shared/textfield";
import Password from "../components/shared/passwordfield";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelper";
const LoginComponent = () => {
  useEffect(() => {
    document.body.classList.add("bg-gray-900");

    return () => {
      document.body.classList.remove("bg-gray-900");
    };
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const login = async () => {
   try{ const data = {
      email,
      password
    };
    const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);
    if (response.error) {
      if (response.error === "Invalid Credentials") {
        alert("Invalid email or password");
      } else {
        alert("Login failed. Please try again.");
      }
    } else {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      alert("Success");
      navigate("/home");
    }
  }
    catch (error) {
      console.error("Login error:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <div className="logo p-5 border-b border-solid border-blue-600 w-full flex justify-center">
        <Icon icon="arcticons:simplemusicplayer" color="#1c3db6" width="120" />
      </div>
      <div className="inputRegion w-1/3 py-10 flex flex-col justify-center items-center text-blue-600">
        <div className="font-bold mb-4 text-blue-600">
          To continue, log in to spotify
        </div>
        <Textfield
          label="Email ID or username"
          placeholder="Email address or username"
          className="my-2"
          value={email}
          setValue={setEmail}
        />
        <Password
          label="Password"
          placeholder="Password"
          value={password}
          setValue={setPassword}
        />
        <div className="w-full flex items-center justify-end my-8">
          <button className="bg-blue-700 text-blue-50 font-semibold p-3 px-10 rounded-full" onClick={(e)=>{
            e.preventDefault();
            login();
          }}>
            LOG IN
          </button>
        </div>
        <div className="w-full border-b border-solid border-blue-600"></div>
        <div className="font-bold my-6 text-blue-600 text-lg">
          Don't have an account?
        </div>
        <div className="border border-blue-600 py-4 text-gray-500 font-bold rounded-full w-full flex items-center justify-center">
          <Link to="/signup">SIGN UP FOR MUSIC</Link>
        </div>
      </div>
    </div>
  );
};
export default LoginComponent;
