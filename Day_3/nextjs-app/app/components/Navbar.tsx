import Link from "next/link";
const Navbar = () => {
  return (
    <nav>
      <Link href="/">Home Page</Link>
      <br />
      <Link href="/about-me">About me</Link>
      <br />
      <Link href="/blogs">Blogs Page</Link>
      <br />
    </nav>
  );
};
export default Navbar;
