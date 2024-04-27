import * as React from "react";
import styles from "./styles.module.scss";

interface CheckProps {
  id: string;
  label?: string;
  checked: boolean;
  className?: string;
  inputClassName?: string;
  onChange: () => void;
  direction?: "left" | "right";
  dark?: boolean;
}

const CheckBox: React.FC<CheckProps> = ({
  id,
  label,
  checked,
  className,
  onChange,
  direction,
  inputClassName,
  dark
}) => {
  return (
    <label
      htmlFor={id}
      className={`${styles.check} ${dark ? styles.dark : ""} ${
        direction ? styles[direction] : ""
      }  ${className}`}
    >
      {label ? <p>{label}</p> : ""}
      <input id={id} checked={checked} type={"checkbox"} />
      <span
        role="button"
        onClick={onChange}
        className={`${styles.mark} ${direction ? styles[direction] : ""} ${inputClassName}`}
      ></span>
    </label>
  );
};

export { CheckBox };
