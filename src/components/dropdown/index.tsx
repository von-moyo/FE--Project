import * as React from "react";
import styles from "./styles.module.css";
import { OrganizationIcon } from "assets";

// interface DropdownProps {}

export const useOutsideAlerter = (ref: any, closeFunction: () => any) => {
  React.useEffect(() => {
    /**
     * Hide if clicked on outside of element
     */
    const handleClickOutside = (event: { target: any }) => {
      if (ref.current && !ref.current.contains(event.target)) {
        closeFunction && closeFunction();
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

interface DropdownItemType {
  label: string;
  value: string;
}

interface Props {
  children: any;
  className?: string;
}

interface DropdownListItemProp extends Props {
  value?: string;
  onDropdownChange?: (value?: any) => void;
}

const DropdownListItem = ({
  children,
  className,
  value,
  onDropdownChange = () => {},
}: DropdownListItemProp) => {
  const dispatch = () =>{};

  const closeDropdown = () => {
    onDropdownChange(value);
    dispatch();
  };
  return (
    <div
      role="button"
      onClick={closeDropdown}
      className={`${styles.dropdownListItem} ${className}`}
    >
      {children}
    </div>
  );
};

interface DropdownProps extends Props {
  dropdownClassName?: string;
  dropdownListClassName?: string;
  type: "action" | "select";
  caretColor?: "green" | "black";
  active?: string;
  Icon?: {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    className: string;
  };
}

const Dropdown = ({
  children,
  className,
  dropdownClassName,
  dropdownListClassName,
  type,
  active = "Select...",
  Icon,
  caretColor,
}: DropdownProps) => {
  const dispatch = ()=>{}
  const [show, setShow] = React.useState(false);
  const [showList, setShowList] = React.useState(false);
  const listRef = React.useRef(null);

  const onHide = () => {
    setShowList(false);
  };
  useOutsideAlerter(listRef, onHide);

  const toggleDropdown = () => {
    dispatch();
    setShowList(!showList);
  };

  React.useEffect(() => {
    if (!show && showList) setShowList(false);
  }, [show, showList]);

  React.useEffect(() => {
    if (show && !showList)
      dispatch();
  }, [showList]);
  return (
    <div
      ref={listRef}
      className={`${styles.dropdownWrapper} ${dropdownClassName}`}
    >
      <div
        onClick={toggleDropdown}
        className={`${styles.active} ${className} ${
          type === "action" ? styles.ellipsisWrap : ""
        }`}
        role="button"
        aria-label="dropdown"
        tabIndex={0}
      >
        {type === "select" ? (
          <>
            {active === "" ? "Select..." : active}{" "}
            <OrganizationIcon
              className={`${Icon?.className ?? ""} ${
                caretColor === "green" ? styles.greenCaret : styles.blackCaret
              }`}
            />
          </>
        ) : Icon ? (
            <OrganizationIcon
              className={Icon.className}
            />
        ) : (
          <div className={styles.ellipsis}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>
      {showList ? (
        <div className={`${styles.dropdownList} ${dropdownListClassName}`}>
          {children}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export { Dropdown, DropdownListItem };
export type { DropdownItemType };
