import * as Icons from "@/app/icons";
import { Page } from "./definitions";

export const PAGES: { [key: string]: Page } = {
  home: {
    title: "Home",
    href: "/",
    iconOutline: Icons.HomeIconOutline,
    iconSolid: Icons.HomeIconSolid,
  },
  explore: {
    title: "Explore",
    href: "/explore",
    iconOutline: Icons.ExploreIconOutline,
    iconSolid: Icons.ExploreIconSolid,
  },
  notifications: {
    title: "Notifications",
    href: "/notifications",
    iconOutline: Icons.BellIconOutline,
    iconSolid: Icons.BellIconSolid,
  },
};
