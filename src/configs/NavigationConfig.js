import {
  DashboardOutlined,
  ProfileOutlined,
  CodepenOutlined,
  PartitionOutlined,
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const dashBoardNavTree = [
  {
    key: "home",
    path: `${APP_PREFIX_PATH}/home`,
    title: "Güncel Durum",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "products",
    path: `${APP_PREFIX_PATH}/products`,
    title: "Ürün Yönetimi",
    icon: CodepenOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "category",
        path: `${APP_PREFIX_PATH}/category`,
        title: "Kategori Yönetimi",
        icon: PartitionOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
  {
    key: "commons",
    path: `${APP_PREFIX_PATH}/commons`,
    title: "Tanımlamalar",
    icon: ProfileOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

const navigationConfig = [...dashBoardNavTree];

export default navigationConfig;
