import Link from "next/link";
import { TbArrowBackUp } from "react-icons/tb";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2">
      <h1 className="text-8xl font-bold text-accent">Not Found</h1>
      <Link
        href="/"
        className="border-lg flex gap-2 rounded-lg p-2 text-lg font-semibold text-secondary transition-colors duration-200 hover:bg-secondary-alt hover:text-foreground-alt-2"
      >
        <TbArrowBackUp size={24} /> Return Home
      </Link>
    </div>
  );
}
