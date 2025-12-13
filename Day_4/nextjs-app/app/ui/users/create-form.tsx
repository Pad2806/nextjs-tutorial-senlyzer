"use client";
import { useState } from "react";
import Link from "next/link";
import {
  UserCircleIcon,
  EnvelopeIcon,
  ClockIcon,
  CheckIcon,
  LockClosedIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createUser } from "@/app/lib/actions";

const inputBase =
  "peer w-full rounded-md border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function CreateUserForm() {
  const [fileName, setFileName] = useState<string>("No file chosen");
  return (
    <form action={createUser} className="max-w-3xl mx-auto">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-gray-900">
          User Information
        </h2>

        {/* Name */}
        <div className="mb-5">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            User Name
          </label>
          <div className="relative">
            <input name="name" required className={inputBase} />
            <UserCircleIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <input name="email" type="email" required className={inputBase} />
            <EnvelopeIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              name="password"
              type="password"
              minLength={8}
              required
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

          <div className="flex items-center gap-3">
            <label className="flex flex-1 cursor-pointer items-center gap-3 rounded-md border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-600 hover:bg-gray-100">
              <PhotoIcon className="h-5 w-5 text-gray-400" />
              <span className="font-medium">Choose file</span>
              <span className="truncate text-gray-500">{fileName}</span>

              <input
                type="file"
                name="image"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  setFileName(f ? f.name : "No file chosen");
                }}
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
            <label className="cursor-pointer">
              <input
                type="radio"
                name="status"
                value="pending"
                defaultChecked
                className="peer sr-only"
              />
              <span
                className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm
                       hover:border-blue-500
                       peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-700"
              >
                <ClockIcon className="h-4 w-4" />
                Pending
              </span>
            </label>

            <label className="cursor-pointer">
              <input
                type="radio"
                name="status"
                value="active"
                className="peer sr-only"
              />
              <span
                className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm
                       hover:border-green-500
                       peer-checked:border-green-600 peer-checked:bg-green-50 peer-checked:text-green-700"
              >
                <CheckIcon className="h-4 w-4" />
                Active
              </span>
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
          Create User
        </Button>
      </div>
    </form>
  );
}
