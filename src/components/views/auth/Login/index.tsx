import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

function LoginView() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { push, query } = useRouter();

  const callbackURL: any = query.callbackUrl || "/";
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl: Array.isArray(callbackURL) ? callbackURL[0] : callbackURL,
      });
      if (res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackURL);
      } else {
        setIsLoading(false);
        setError("Email or password is incorrect");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Email or password is incorrect");
    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-300">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h1 className="text-center font-bold text-[30px]">Login</h1>
            {error && (
              <p className="text-red-500 text-center mt-[10px]">{error}</p>
            )}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-slate-200"
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-slate-200"
                id="password"
                name="password"
                type="password"
                placeholder="*********"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-600 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
            <hr className="border-b-[1px] border-gray-950 my-4" />
            <div className="mt-4">
              <button
                onClick={() =>
                  signIn("google", {
                    callbackUrl: callbackURL,
                    redirect: false,
                  })
                }
                type="button"
                className="bg-slate-950 w-full hover:bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center items-center gap-2"
              >
                <i className="bx bxl-google text-[20px]"></i> Login With Google
              </button>
            </div>
            <p className="text-center text-gray-950 text-md mt-4">
              Dont Have an account?{" "}
              <Link href="/auth/register" className="text-blue-600 font-bold">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginView;
