import {
  MdInventory,
  MdAdd,
  MdEdit,
  MdDelete,
  MdLocalShipping,
  MdAdminPanelSettings,
  MdPeopleAlt,
} from "react-icons/md";

export const drawerProductsItems = [
  {
    title: "inventory",
    view: "inventory",
    icon: <MdInventory className="w-5 h-5" />,
  },
  {
    title: "add-product",
    view: "add-product",
    icon: <MdAdd className="w-5 h-5" />,
  },
  {
    title: "edit-product",
    view: "edit-product",
    icon: <MdEdit className="w-5 h-5" />,
  },
  {
    title: "delete-product",
    view: "delete-product",
    icon: <MdDelete className="w-5 h-5" />,
  },
];

export const drawerOrdersItems = [
  {
    title: "orders",
    view: "orders",
    icon: <MdLocalShipping className="w-5 h-5" />,
  },
];

export const drawerUserItems = [
  {
    title: "admin-manager",
    view: "admin-manager",
    icon: <MdAdminPanelSettings className="w-5 h-5" />,
    roleToSee: ["moderator"],
  },
  {
    title: "users",
    view: "users-manager",
    icon: <MdPeopleAlt className="w-5 h-5" />,
    roleToSee: ["admin", "moderator"],
  },
];
