import {
  logo,
  placeholderAvatar,
  NotificationIcon,
  DropdownIcon,
  OrganizationIcon,
  DashboardIcon,
  UsersIcon,
  GuarantorsIcon,
  DecisionModelsIcon,
  SavingsIcon,
  LoanRequestIcon,
  LoanIcon,
  WhitelistIcon,
  KarmaIcon,
  BusinessOrganizationIcon,
  ChevronRightIcon,
} from "assets";
import { Search } from "components";
import * as React from "react";
import { Link } from "react-router-dom";
import { Routes } from "router/routes";
import styles from "./styles.module.scss";
import { useState } from "react";
import { MyContext } from "context/search";

interface SidebarType {
  active: customerPages;
  state:
    | customerPages
    | businessPages
    | "Logout"
    | "Support"
    | "CUSTOMERS"
    | "BUSINESSES"
    | "SETTINGS";

  url?: string;
  type: "link" | "header";
  action?: () => void;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const SidebarItem: React.FC<SidebarType> = ({
  active,
  state,
  type,
  url = "",
  action,
  Icon,
}) => {
  return (
    <li
      className={`${state === "Organization" && styles.last} ${
        type === "header" && styles.header
      } ${styles.sidebarItem} ${active === state ? styles.activeItem : ""}`}
    >
      {type === "link" ? (
        <Link onClick={action} className={styles.sidebarType} to={url}>
          <Icon
            className={`${styles.sidebarIcon} ${
              active === state || state === "Switch User"
                ? styles.activeIcon
                : ""
            }`}
          />
          <span className={styles.sidebarText}>{state}</span>
          {state === "Switch User" && (
            <ChevronRightIcon className={styles.downIcon} />
          )}
        </Link>
      ) : (
        <p className={`${styles.header}`}>{state}</p>
      )}
    </li>
  );
};

type customerPages =
  | "Switch User"
  | "Dashboard"
  | "Phones"
  | "Electronics"
  | "Sport Items"
  | "Toys & Games"
  | "Automobile"
  | "Computing"
  | "Groceries"
  | "Home & Office";

type businessPages =
  | "Organization"

export interface LayoutProps {
  active: customerPages;
  children: any;
}

const Layout: React.FC<LayoutProps> = ({ active, children }) => {
  const EmptyComponent = () => null;
  const SidebarItems: SidebarType[] = [
    {
      active,
      state: "Switch User",
      url: "",
      type: "link",
      Icon: OrganizationIcon,
      action: () => setShowMenu(false),
    },
    {
      active,
      state: "Dashboard",
      url: "",
      type: "link",
      Icon: DashboardIcon,
      action: () => setShowMenu(false),
    },
    {
      active,
      state: "CUSTOMERS",
      url: "",
      type: "header",
      Icon: EmptyComponent,
      action: () => false,
    },
    {
      active,
      state: "Phones",
      url: Routes.products,
      type: "link",
      Icon: UsersIcon,
      action: () => setShowMenu(false),
    },
    {
      active,
      state: "Electronics",
      url: "",
      type: "link",
      Icon: GuarantorsIcon,
      action: () => setShowMenu(false),
    },
    {
      active,
      state: "Sport Items",
      url: "",
      type: "link",
      Icon: LoanIcon,
      action: () => setShowMenu(false),
    },
    {
      active,
      state: "Toys & Games",
      url: "",
      type: "link",
      Icon: DecisionModelsIcon,
      action: () => setShowMenu(false),
    },
    {
      active,
      state: "Automobile",
      url: "",
      type: "link",
      Icon: SavingsIcon,
      action: () => setShowMenu(false),
    },
    {
      active,
      state: "Computing",
      type: "link",
      action: () => setShowLogout(true),
      Icon: LoanRequestIcon,
    },
    {
      active,
      state: "Home & Office",
      type: "link",
      action: () => setShowMenu(true),
      Icon: WhitelistIcon,
    },
    {
      active,
      state: "Groceries",
      type: "link",
      action: () => setShowMenu(true),
      Icon: KarmaIcon,
    },
    {
      active,
      state: "BUSINESSES",
      url: "",
      type: "header",
      Icon: EmptyComponent,
      action: () => false,
    },
    {
      active,
      state: "Organization",
      type: "link",
      action: () => setShowMenu(true),
      Icon: BusinessOrganizationIcon,
    }
  ];

  const [showMenu, setShowMenu] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const menuRef = React.useRef(null);

  const onSearch = (searchTerm: string) => {
    return searchTerm;
  };

  const {text, setText} = React.useContext(MyContext)

  const handleSearch = (s: string) => {
    setSearchTerm(s);
    setText(s);
  };

  return (
    <>
      <main className={styles.main}>
        <nav className={`${styles.sideBar} ${showMenu ? styles.overLay : ""}`}>
          <div className={styles.mobileNav}>
            <OrganizationIcon
              role="button"
              onClick={() => setShowMenu(!showMenu)}
              className={styles.menuBtn}
            />
          </div>
          <ul ref={menuRef} className={styles.sidebarList}>
            {SidebarItems.map((item, index) => (
              <SidebarItem {...item} key={index} />
            ))}
          </ul>
        </nav>
        <header className={styles.navBar}>
          <div className={styles.profileSec}>
            <img src={logo} alt="" className={styles.logo} />
            <Search
              className={styles.search}
              value={searchTerm}
              placeholder={"Search for anything"}
              submit={onSearch}
              handleChange={(e) => {
                handleSearch(e);
              }}
            />
            <div className={styles.details}>
              <NotificationIcon className={styles.noti} />
              <img
                src={placeholderAvatar}
                alt="avatar"
                className={styles.img}
              />
              <div className={styles.name}>
                <p>Adedeji</p>
                <DropdownIcon />
              </div>
            </div>
          </div>
        </header>
        <div className={styles.content}>{children}</div>
      </main>
    </>
  );
};

export { Layout };
