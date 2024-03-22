import Link from "next/link";
import { ArrowLeftStartOnRectangleIcon } from "./icons";

export default function NotFound() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <h1 className="text-8xl font-bold text-secondary/30">Not Found</h1>
      <Link
        href="/"
        className="border-lg flex h-12 w-48 items-center justify-center gap-2 rounded-lg text-lg font-semibold text-secondary-foreground/50 hover:bg-secondary/20"
      >
        {ArrowLeftStartOnRectangleIcon} Return Home
      </Link>
    </div>
  );
}
