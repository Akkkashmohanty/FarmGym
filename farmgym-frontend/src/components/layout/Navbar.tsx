"use client";

type Props = {
  onLogout: () => void;
};

export default function Navbar({
  onLogout
}: Props) {

  return (

    <div className="h-16 border-b flex items-center justify-between px-6 bg-white">

      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      <button
        onClick={onLogout}
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>

    </div>
  );
}