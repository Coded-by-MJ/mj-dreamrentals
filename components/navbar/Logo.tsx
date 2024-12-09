import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="cursor-pointer">
      <svg height="30" width="200" xmlns="http://www.w3.org/2000/svg">
        <image href="/mobile-logo.png" x="0" y="2" height="26" width="26" />
        <text x="30" y="24" fill="#e87827" fontSize="15">
          Dream Rentals
        </text>
      </svg>
    </Link>
  );
}
export default Logo;
