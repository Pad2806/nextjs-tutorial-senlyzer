import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <FaceFrownIcon className="mb-4 h-12 w-12 text-gray-400" />

      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        User not found
      </h2>

      <Link
        href="/dashboard/users"
        className="rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
      >
        Back to Users
      </Link>
    </div>
  );
}
