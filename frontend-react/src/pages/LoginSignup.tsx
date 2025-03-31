import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

const LoginSignup = () => {
  const navigate = useNavigate();
  const { login, signup, isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const toggleForm = () => {
    setError(null);
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isLogin) {
      login(username, password)
        .then(() => {
          navigate("/");
        })
        .catch((e: AxiosError) => {
          setError(e);
        });
    } else {
      signup(username, email, password).then();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-gray-800 p-8 shadow-lg">
        <div className="mb-4 text-center">
          <h1 className="text-4xl leading-6 font-extrabold tracking-tight text-white">
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Researcher Network
            </span>
            <span className="text-lg"> WebApp</span>
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            {isLogin ? "Sign in to your account" : "Create your account"}
          </p>
        </div>

        <div className="flex justify-center space-x-4 border-b border-gray-700">
          <button
            className={`pb-2 text-sm font-medium ${
              isLogin
                ? "border-b-2 border-orange-500 text-orange-500"
                : "cursor-pointer text-gray-400"
            }`}
            onClick={() => toggleForm()}
          >
            Login
          </button>
          <button
            className={`pb-2 text-sm font-medium ${
              !isLogin
                ? "border-b-2 border-orange-500 text-orange-500"
                : "cursor-pointer text-gray-400"
            }`}
            onClick={() => toggleForm()}
          >
            Sign Up
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email adress
              </label>
              <input
                id="email"
                name="email"
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                placeholder="Enter your email adress"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              placeholder="Enter your password"
            />
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-orange-500 focus:ring-orange-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-orange-500 hover:text-orange-400"
                >
                  Forgot password?
                </a>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>

          {error ? (
            <p className="w-full rounded-md border-2 border-red-500 bg-red-500/30 py-2 text-center text-red-300">
              {(error.response?.data as { message?: string })?.message ||
                "An error occurred"}
            </p>
          ) : null}
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleForm}
              className="ml-1 cursor-pointer font-medium text-orange-500 hover:text-orange-400"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
