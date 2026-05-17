import Link from "next/link";

export default function HomePage() {

  return (

    <div className="flex flex-col items-center justify-center h-screen gap-5">

      <h1 className="text-5xl font-bold">
        FarmGym
      </h1>

      <div className="flex gap-4">

        <Link
          href="/login"
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="border px-6 py-3 rounded-xl"
        >
          Register
        </Link>

      </div>

    </div>
  );
}