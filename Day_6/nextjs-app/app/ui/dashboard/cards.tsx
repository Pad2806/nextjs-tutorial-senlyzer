import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";

const iconMap = {
  total: UserGroupIcon,
  active: BanknotesIcon,
  pending: ClockIcon,
};
import { fetchCardData } from "@/app/lib/data";
export default async function CardWrapper() {
  const { numberOfUsers, numberOfActiveUsers, numberOfPendingUsers } =
    await fetchCardData();
  return (
    <>
      <Card title="Users" value={numberOfUsers} type="total" />
      <Card title="Active" value={numberOfActiveUsers} type="active" />
      <Card title="Pending" value={numberOfPendingUsers} type="pending" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "total" | "active" | "pending";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
