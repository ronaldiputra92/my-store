import { signIn, signOut, useSession } from "next-auth/react";

function Navbar() {
  const { data } = useSession();
  return (
    <div className="flex fixed items-center justify-end w-full h-[80px] p-[20px] bg-slate-950 text-white">
      <button
        className="bg-white border-none px-3 py-2 text-slate-950 text-[15px]"
        onClick={() => (data ? signOut() : signIn())}
      >
        {data ? "Logout" : "Login"}
      </button>
    </div>
  );
}

export default Navbar;
