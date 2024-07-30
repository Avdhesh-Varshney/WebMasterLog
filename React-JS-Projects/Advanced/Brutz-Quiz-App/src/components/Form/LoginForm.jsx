import { Link, Form } from "react-router-dom";
import spinner from "../../assets/spinner.svg";

function LoginForm({ loading }) {
  return (
    <>
      <Form
        className="flex flex-col max-w-[420px] mx-auto"
        action="/login"
        method="post"
      >
        <h1 className="font-bold text-lg text-neutral-900 mb-5">
          Login to Your Account
        </h1>
        <label
          className="text-xs md:text-sm text-neutral-600 font-semibold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          autoComplete="off"
          name="email"
          placeholder="Enter your email"
          className="bg-neutral-50 ring-[1px] ring-gray-200 rounded-lg p-2 md:p-3 placeholder:text-gray-300 text-xs md:text-sm focus:border-none placeholder:text-xs md:placeholder:text-sm focus:outline-none focus:ring-[1px] focus:ring-orange-500/80 "
        />{" "}
        <br />
        <div className="flex justify-between items-center mb-2">
          <label
            className="text-xs md:text-sm text-neutral-600 font-semibold"
            htmlFor="password"
          >
            Password
          </label>
        </div>
        <input
          type="password"
          className="bg-neutral-50 ring-[1px] ring-gray-200 rounded-lg p-2 md:p-3 placeholder:text-gray-300 text-xs md:text-sm focus:border-none placeholder:text-xs md:placeholder:text-sm focus:outline-none focus:ring-[1px] focus:ring-orange-500/80"
          name="password"
          placeholder="Enter your password"
        />
        <br />
        <button
          disabled={loading}
          className={`flex rounded-full ${!loading
              ? "bg-orange-500 hover:bg-neutral-50 hover:text-orange-500"
              : "bg-orange-500/70 cursor-not-allowed"
            }  p-1 justify-center font-semibold md:font-bold text-base md:text-lg text-center  mb-3 transition text-white`}
          type="submit"
        >
          {loading ? (
            <div className="flex items-center">
              <img
                src={spinner}
                alt="spinner"
                className="w-6 h-6 object-contain mr-2 animate-spin"
              />
              <p className="text-neutral-50/80 text-sm font-normal">
                Loading...
              </p>
            </div>
          ) : (
            <span>Sign In</span>
          )}
        </button>
        <p className="text-gray-600 text-xs font-semibold mt-3">
          Don't have account ?
          <Link className="ml-2 text-orange-500" to={"/register"}>
            Sign Up
          </Link>{" "}
        </p>
      </Form>
    </>
  );
}

export default LoginForm;
