import { logo } from "assets";
import * as React from "react";
import styles from "./styles.module.css";

interface LogoProps {
  className?: string;
  type: "light" | "dark";
}

const LogoWithText: React.FC<LogoProps> = ({
  className = "",
  type = "light",
}) => {
  return (
    <div className={`${styles.logo} ${className} ${styles[type]}`}>
      <img alt="" src={logo} className={styles.logoImg} />{" "}
      <p className={styles.logoText}>Lendsqr</p>
    </div>
  );
};

export { LogoWithText };
