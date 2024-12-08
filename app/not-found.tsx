import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
function NotFoundPage() {
  return (
    <section className="container bg-transparent">
      <div className="px-6 py-24 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <div className="flex justify-center">
          <FaExclamationTriangle className=" text-8xl text-yellow-400"></FaExclamationTriangle>
        </div>
        <div className="text-center">
          <h1 className="text-3xl text-main font-bold mt-4 mb-2">
            Page Not Found
          </h1>
          <p className="text-gray-500 text-xl mb-10">
            The page you are looking for does not exist.
          </p>
          <Link
            href="/"
            className="bg-primary hover:bg-primary/50 text-main font-bold py-4 px-6 rounded"
          >
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}
export default NotFoundPage;
