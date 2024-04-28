"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getUser } from "@/lib/actions/get-user";
import { User } from "@/lib/types/user";

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => null,
  isLoading: true,
  setLoading: () => null,
});

const UserProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userResponse = await getUser();
      setUser(userResponse);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const memoized = useMemo(() => {
    return {
      user,
      setUser,
      isLoading,
      setLoading,
    };
  }, [user, isLoading]);

  return (
    <UserContext.Provider value={memoized}>{children}</UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, UserContext, useUserContext };
