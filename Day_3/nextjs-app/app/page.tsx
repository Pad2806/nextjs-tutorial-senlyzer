import Image from "next/image";
import logo from "@/app/assets/gdg_logo.png";
export default function Home() {
  return (
    <>
      <h1>HomePage</h1>
      <Image src={logo} alt="gdg logo" width={200} height={200} />
    </>
  );
}
