import Link from "next/link";
import { Button } from "../ui/button";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="container px-8 flex flex-col md:flex-row justify-between items-center flex-wrap gap-4 py-8">
        <p className="text-main  text-base">
          Copyright &copy;{year} dreamrentals.com
        </p>
      </div>
    </footer>
  );
}
export default Footer;
