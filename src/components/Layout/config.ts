export type MenuType = {
  key: string;
  icon: string;
  label: string;
  children?: MenuType[];
};

export const getMenuList: MenuType[] = [
  {
    key: "/home",
    icon: "",
    label: "工作台",
    children: [
      {
        key: "/dashboard",
        icon: "",
        label: "数据报表",
      },
    ],
  },
  {
    key: "/system",
    icon: "",
    label: "系统管理",
    children: [
      {
        key: "/user",
        icon: "",
        label: "用户管理",
      },
    ],
  },
  {
    key: "/editor",
    icon: "",
    label: "富文本",
  },
];
