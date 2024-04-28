"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getFriends } from "@/lib/actions/get-friends";
import { Friend } from "@/lib/types/friend";

import { useUserContext } from "./user-context";

interface FriendsContextProps {
  friends: Friend[] | null;
  setFriends: (friends: Friend[] | null) => void;
}

const FriendsContext = createContext<FriendsContextProps>({
  friends: null,
  setFriends: () => null,
});

const FriendsProvider = ({ children }: { children?: ReactNode }) => {
  const [friends, setFriends] = useState<Friend[] | null>(null);
  const { user } = useUserContext();

  useEffect(() => {
    const fetchFriends = async () => {
      if (!user) {
        return;
      }

      const data = await getFriends(user);
      setFriends(data);
    };

    fetchFriends();
  }, [user]);

  const memoized = useMemo(() => ({ friends, setFriends }), [friends]);

  return (
    <FriendsContext.Provider value={memoized}>
      {children}
    </FriendsContext.Provider>
  );
};

const useFriendsContext = () => {
  return useContext(FriendsContext);
};

export { FriendsProvider, FriendsContext, useFriendsContext };
