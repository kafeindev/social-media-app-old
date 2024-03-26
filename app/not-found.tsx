import Link from "next/link";
import { TbArrowBackUp } from "react-icons/tb";

export default function NotFound() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <h1 className="text-8xl font-bold text-muted">Not Found</h1>
      <Link
        href="/"
        className="border-lg flex h-12 w-48 items-center justify-center gap-2 rounded-lg text-lg font-semibold text-secondary hover:bg-secondary/20"
      >
        <TbArrowBackUp className="h-6 w-6" /> Return Home
      </Link>
    </div>
  );
}
