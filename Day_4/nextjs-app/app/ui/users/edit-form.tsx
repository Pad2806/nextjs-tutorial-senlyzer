"use client";

import { updateUser } from "@/app/lib/actions";
import { User } from "@/app/lib/definition";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import {
  UserCircleIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ClockIcon,
  CheckIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

const inputBase =
  "peer w-full rounded-md border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function EditUserForm({ user }: { user: User }) {
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

        {/* Avatar */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Avatar
          </label>

          <div className="flex items-center gap-4">
            {user.image_url && (
              <Image
                src={user.image_url}
                alt="User avatar"
                width={80}
                height={80}
                className="rounded-md border"
              />
            )}

            <label className="flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-600 hover:bg-gray-100">
              <PhotoIcon className="h-5 w-5 text-gray-400" />
              <span>Change avatar (URL)</span>
              <input
                type="text"
                name="image_url"
                defaultValue={user.image_url ?? ""}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            User Status
          </label>

          <div className="flex gap-4">
            <label className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm hover:border-blue-500">
              <input
                type="radio"
                name="status"
                value="pending"
                defaultChecked={user.status === "pending"}
                className="hidden"
              />
              <ClockIcon className="h-4 w-4 text-gray-500" />
              Pending
            </label>

            <label className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm hover:border-green-500">
              <input
                type="radio"
                name="status"
                value="active"
                defaultChecked={user.status === "active"}
                className="hidden"
              />
              <CheckIcon className="h-4 w-4 text-green-500" />
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
