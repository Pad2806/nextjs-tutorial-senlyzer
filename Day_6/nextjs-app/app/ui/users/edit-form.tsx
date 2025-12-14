"use client";

import { useState } from "react";
import { updateUser } from "@/app/lib/actions";
import { User } from "@/app/lib/definition";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import {
  UserCircleIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ClockIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

const inputBase =
  "peer w-full rounded-md border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function EditUserForm({ user }: { user: User }) {
  const [status, setStatus] = useState<"pending" | "active">(user.status);

  const updateUserWithId = updateUser.bind(null, user.id);

  return (
    <form action={updateUserWithId} className="max-w-3xl mx-auto">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-gray-900">
          Edit User Information
        </h2>

        {/* Name */}
        <div className="mb-5">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            User Name
          </label>
          <div className="relative">
            <input
              name="name"
              defaultValue={user.name}
              required
              className={inputBase}
            />
            <UserCircleIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <input
              name="email"
              type="email"
              defaultValue={user.email}
              required
              className={inputBase}
            />
            <EnvelopeIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            New Password
          </label>
          <div className="relative">
            <input
              name="password"
              type="password"
              placeholder="Leave blank to keep current password"
              className={inputBase}
            />
            <LockClosedIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            User Status
          </label>

          <div className="flex gap-4">
            {/* Pending */}
            <label
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm flex items-center gap-2
        ${
          status === "pending"
            ? "border-blue-600 bg-blue-50 text-blue-700"
            : "border-gray-300 hover:border-blue-400"
        }`}
            >
              <input
                type="radio"
                name="status"
                value="pending"
                checked={status === "pending"}
                onChange={() => setStatus("pending")}
                className="sr-only"
              />
              <ClockIcon className="h-4 w-4" />
              Pending
            </label>

            {/* Active */}
            <label
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm flex items-center gap-2
        ${
          status === "active"
            ? "border-green-600 bg-green-50 text-green-700"
            : "border-gray-300 hover:border-green-400"
        }`}
            >
              <input
                type="radio"
                name="status"
                value="active"
                checked={status === "active"}
                onChange={() => setStatus("active")}
                className="sr-only"
              />
              <CheckIcon className="h-4 w-4" />
              Active
            </label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/users"
          className="rounded-md px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </Link>
        <Button type="submit" className="px-6">
          Update User
        </Button>
      </div>
    </form>
  );
}
