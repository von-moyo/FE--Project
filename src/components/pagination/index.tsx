import * as React from "react";
import styles from "./styles.module.scss";
import { ChevronLeftIcon, ChevronRightIcon } from "assets";
import { CustomSelect } from "components/form";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handleChange: (x: number) => void;
  totalCount: number;
  pageLimit: number;
  hide?: boolean;
  name: string;
  info: any[];
}

const Pagination: React.FC<PaginationProps> = ({
  totalCount,
  currentPage,
  totalPages,
  handleChange,
  pageLimit,
  hide,
  name,
  info,
}) => {
  const onChange = (e: any) => handleChange(e.target.value);
  const handleIncrease = () => {
    if (currentPage < totalPages) handleChange(currentPage + 1);
  };

  const handleDecrease = () => {
    if (currentPage > 1) handleChange(currentPage - 1);
  };

  if (hide) return null;

  const start = currentPage * pageLimit - pageLimit + 1;
  const end =
    currentPage * pageLimit > totalCount ? totalCount : currentPage * pageLimit;

  return (
    <section className={styles.pagination}>
      <div>
        Showing
        <CustomSelect
          parentClassName={styles.parent}
          inputClass={styles.select}
          onChange={onChange}
          validatorMessage={""}
          name={""}
          placeholder={totalCount.toString()}
          label={""}
          options={info}
          value={totalCount.toString()}
        />
        out of {totalCount}
      </div>
      <div className={styles.inputBox}>
        <section className={styles.icon}>
          <ChevronLeftIcon onClick={handleDecrease} className={styles.btn} />
        </section>
        <div className={styles.current}>{currentPage}</div>
        <div>{currentPage + 1}</div>
        <section className={styles.icon}>
          <ChevronRightIcon onClick={handleIncrease} className={styles.btn} />
        </section>
      </div>
    </section>
  );
};

export { Pagination };
