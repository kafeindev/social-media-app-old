"use client";

import Link from "next/link";
import { TbArrowBackUp } from "react-icons/tb";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 ">
      <h1 className="text-7xl font-bold text-secondary/30">404 Error</h1>
      <Link
        href="/"
        className="border-lg flex h-12 w-48 items-center justify-center gap-2 rounded-lg text-lg font-semibold text-secondary hover:bg-secondary/20"
      >
        <TbArrowBackUp className="h-6 w-6" /> Return Home
      </Link>
    </div>
  );
}
