import { MainRoutes } from "@/src/constant/routes";
import { access } from "fs";

export const MenuLinks = [
  {
    id: 1,
    name: "home",
    link: "/#",
  },
  {
    id: 2,
    name: "shop",
    link: "/#shop",
  },
  {
    id: 3,
    name: "about",
    link: "/#about",
  },
  {
    id: 4,
    name: "blogs",
    link: "/#blogs",
  },
];

export const DropdownLinks = [
  {
    id: 1,
    name: "dashboard",
    link: MainRoutes.DASHBOARD,
    roleToAccess: ["ADMIN"],
  },
  {
    id: 2,
    name: "profile",
    link: MainRoutes.PROFILE,
    roleToAccess: ["ADMIN", "USER"],
  },
];
