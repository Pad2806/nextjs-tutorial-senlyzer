import logo from "@/app/assets/gdg_logo.png";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";

export default function MyLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image src={logo} alt="my-logo" height={100} width={100} />
      <p className="text-[44px]">PAD</p>
    </div>
  );
}
