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
    <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
      <input
        placeholder="Patient phone"
        value={phone}
        onChange={(e) => onPhoneChange(e.target.value)}
      />

      <select value={status} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="">All status</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>
  );
}
