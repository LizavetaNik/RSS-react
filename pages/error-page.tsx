import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface ErrorDisplayProps {
  error: Error | null;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1>Caught an error</h1>
      <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go back to home
      </Link>
    </div>
  );
};

export default ErrorDisplay;
