import { DashboardOutlined, ProfileOutlined } from "@ant-design/icons";
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
