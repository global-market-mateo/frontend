import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Products",
          icon: SquarePen,
          submenus: [
            {
              href: "/dashboard/products",
              label: "Todos los productos",
            },
            {
              href: "/dashboard/products/new",
              label: "Nuevo producto",
            },
            {
              href: "/dashboard/products/catalog",
              label: "Catalogo",
            },
          ],
        },
        {
          href: "/dashboard/categories",
          label: "Categorias",
          icon: Bookmark,
          submenus: [
            {
              href: "/dashboard/category",
              label: "Todas las categorias",
            },
          ],
        },
        {
          href: "/dashboard/orders",
          label: "Pedidos",
          icon: Tag,
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/dashboard/user",
          label: "Usuario / Negocio",
          icon: Users,
        },
        
      ],
    },
  ];
}
