"use client";

type Props = {
  phone: string;
  status: string;
  onPhoneChange: (v: string) => void;
  onStatusChange: (v: string) => void;
};

export function BookingFilters({
  phone,
  status,
  onPhoneChange,
  onStatusChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <input
        className="border rounded-md px-3 py-2 w-56 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Patient phone"
        value={phone}
        onChange={(e) => onPhoneChange(e.target.value)}
      />

      <select
        className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="all">All status</option>
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
        <option value="expired">Expired</option>
      </select>
    </div>
  );
}
