import { ActivateIcon, BlacklistIcon, EyeIcon, SelectIcon } from "assets";
import styles from "./styles.module.scss";
import { useClickOutside } from "helpers";
import { useState, useRef } from "react";

export interface StatusProps {
  className?: string;
  submit: (id: any) => void;
  blacklist: (id: any) => void;
  activate: (id: any) => void;
}

const StatusCard: React.FC<StatusProps> = ({ submit, blacklist, activate }) => {
  const [show, setList] = useState(false);

  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setList(false));

  return (
    <div ref={dropdownRef} className={`${styles.sort} ${""}`}>
      <div
        onClick={() => setList(!show)}
        role="button"
        className={styles.sortHd}
      >
        <SelectIcon />
      </div>

      {show && (
        <div className={styles.sortList}>
          {show ? (
            <form className={styles.sortList__items}>
              <div className={styles.eye} onClick={submit}>
                <EyeIcon />
                <p>View Details</p>
              </div>
              <div className={styles.eye} onClick={blacklist}>
                <BlacklistIcon />
                <p>Blacklist User</p>
              </div>
              <div className={styles.eye} onClick={activate}>
                <ActivateIcon className={styles.fill}/>
                <p>Activate User</p>
              </div>
            </form>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export { StatusCard };
