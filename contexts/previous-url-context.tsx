"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { usePathname } from "next/navigation";

const PreviousURLContext = createContext<string | null>(null);

const PreviousURLProvider = ({ children }: { children?: ReactNode }) => {
  const pathname = usePathname();
  const ref = useRef<string | null>(null);

  useEffect(() => {
    ref.current = pathname;
  }, [pathname]);

  const memoized = useMemo(() => {
    return ref.current;
  }, [ref.current]);

  return (
    <PreviousURLContext.Provider value={memoized}>
      {children}
    </PreviousURLContext.Provider>
  );
};

const usePreviousURLContext = () => {
  return useContext(PreviousURLContext);
};

export { PreviousURLProvider, PreviousURLContext, usePreviousURLContext };
