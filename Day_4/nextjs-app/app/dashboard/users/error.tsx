"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <ExclamationTriangleIcon className="mb-4 h-12 w-12 text-red-400" />

      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        Something went wrong
      </h2>

      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
        >
          Try again
        </button>

        <Link
          href="/dashboard/users"
          className="rounded-md border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Back to Users
        </Link>
      </div>
    </div>
  );
}
