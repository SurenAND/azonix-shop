import {
  MdAdd,
  MdEdit,
  MdInventory,
  MdLocalShipping,
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
    title: "product-manager",
    view: "product-manager",
    icon: <MdEdit className="w-5 h-5" />,
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
    title: "users",
    view: "users-manager",
    icon: <MdPeopleAlt className="w-5 h-5" />,
  },
];
