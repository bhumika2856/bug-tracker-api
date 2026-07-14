import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../api/authApi";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  try {
    setLoading(true);

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match.");
      setLoading(false);
      return;
    }

    let response;

    if (isLogin) {
      response = await loginUser({
        email,
        password,
      });
    } else {
      response = await registerUser({
        name,
        email,
        password,
      });
    }

    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));

    navigate("/dashboard");
  }catch (error) {
  console.log(error);
  console.log(error.response);

  alert(
    error.response?.data?.message ||
    error.message ||
    "Something went wrong."
  );
} 
   finally {
    setLoading(false);
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

        {/* Logo */}

        <h1 className="text-center text-3xl font-bold">
          🐞 Bug Tracker
        </h1>

        <p className="mt-2 text-center text-slate-400">
          {isLogin
            ? "Welcome!"
            : "Create your account"}
        </p>

        {/* Toggle */}

        <div className="mt-8 flex rounded-xl bg-white/5 p-1">

          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 rounded-lg py-2 transition ${
              isLogin
                ? "bg-indigo-500 text-white"
                : "text-slate-400"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 rounded-lg py-2 transition ${
              !isLogin
                ? "bg-indigo-500 text-white"
                : "text-slate-400"
            }`}
          >
            Register
          </button>

        </div>

        {/* Form */}

        <div className="mt-8 space-y-5">

          {!isLogin && (
            <div>
              <label className="mb-2 block text-sm">
                Name
              </label>

              <input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-indigo-500"
  placeholder="Enter your name"
/>
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm">
              Email
            </label>

            <input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-indigo-500"
  placeholder="Enter your email"
/>
          </div>

          <div>
            <label className="mb-2 block text-sm">
              Password
            </label>

            <input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-indigo-500"
  placeholder="Enter your password"
/>
          </div>

          {!isLogin && (
            <div>
              <label className="mb-2 block text-sm">
                Confirm Password
              </label>

              <input
  type="password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-indigo-500"
  placeholder="Confirm password"
/>
            </div>
          )}

          <button
  onClick={handleSubmit}
  disabled={loading}
  className="w-full rounded-xl bg-indigo-500 py-3 font-medium transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading
    ? isLogin
      ? "Logging in..."
      : "Creating account..."
    : isLogin
      ? "Login"
      : "Register"}
</button>

        </div>

      </div>
    </div>
  );
}