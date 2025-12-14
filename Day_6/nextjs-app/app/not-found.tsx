import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="mt-2 text-gray-500">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/dashboard"
        className="mt-6 rounded-md bg-black px-4 py-2 text-white"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
