import { FilterIcon } from "assets";
import styles from "./styles.module.scss";
import { useClickOutside } from "helpers";
import { useState, useRef } from "react";
import * as yup from "yup";
import { CustomSelect, Input } from "components/form";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { OptionType } from "types";
import { Button } from "components/button";

interface FilterDetails {
  username?: string;
  date?: string;
  phoneNumber?: string;
  organization?: {
    label?: string;
    value?: string;
  };
  status?: {
    label?: string;
    value?: string;
  };
  email?: string;
}

const initFilterData: FilterDetails = {
  organization: { label: "", value: "" },
  username: "",
  email: "",
  date: "",
  phoneNumber: "",
  status: { label: "", value: "" },
};

const filterSchema = yup.object({
  organization: yup
    .object({
      label: yup.string(),
      value: yup.string(),
    })
    .optional(),
  username: yup.string(),
  email: yup.string().email("Enter a valid email"),
  date: yup.string(),
  phoneNumber: yup.string(),
  status: yup
    .object({
      label: yup.string(),
      value: yup.string(),
    })
    .optional(),
});

export interface FilterProps {
  className?: string;
  submit: (data: FilterDetails) => void;
}

const Filter: React.FC<FilterProps> = ({ submit, className }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm<FilterDetails>({
    resolver: yupResolver(filterSchema),
    defaultValues: initFilterData,
  });
  const [show, setList] = useState(false);
  const sort: OptionType[] = [
    {
      label: "active",
      value: "active",
    },
    {
      label: "draft",
      value: "draft",
    },
  ];
  const status: OptionType[] = [
    {
      label: "Active",
      value: "Active",
    },
    {
      label: "Inactive",
      value: "Inactive",
    },
    {
      label: "Pending",
      value: "Pending",
    },
    {
      label: "Blacklisted",
      value: "Blacklisted",
    },
  ];
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setList(false));

  const onSubmit: SubmitHandler<FilterDetails> = (data) => {
    submit(data);
  };

  const handleReset = () => {
    reset(initFilterData);
    submit(initFilterData);
  };

  return (
    <div ref={dropdownRef} className={`${styles.sort}`}>
      <div
        onClick={() => setList(!show)}
        role="button"
        className={styles.sortHd}
      >
        <FilterIcon />
      </div>

      {show && (
        <div className={`${className} ${styles.sortList}`}>
          {show ? (
            <form className={styles.sortList__items}>
              <CustomSelect
                onChange={(val) => setValue("organization", val)}
                validatorMessage={""}
                name={"sector"}
                placeholder={"Select"}
                label={"Organization"}
                value={watch("organization")}
                options={sort}
                inputClass={styles.selectClass}
                parentClassName={styles.parent}
              />
              <Input
                label="Username"
                placeholder="User"
                type="username"
                required
                validatorMessage={errors.username?.message}
                name="username"
                register={register}
                value={watch("username")}
                className={styles.filterInput}
                parentClassName={styles.parent}
              />
              <Input
                label="Email"
                placeholder="Email"
                type="email"
                required
                validatorMessage={""}
                name="email"
                register={register}
                value={watch("email")}
                className={styles.filterInput}
                parentClassName={styles.parent}
              />
              <Input
                label="Date"
                placeholder="Date"
                type="date"
                required
                validatorMessage={errors.date?.message}
                name="date"
                register={register}
                value={watch("date")}
                className={`${styles.filterInput} ${styles.dateInput}`}
                parentClassName={styles.parent}
              />
              <Input
                label="Phone Number"
                placeholder="Phone Number"
                type="phoneNumber"
                required
                validatorMessage={errors.phoneNumber?.message}
                name="phoneNumber"
                register={register}
                value={watch("phoneNumber")}
                className={styles.filterInput}
                parentClassName={styles.parent}
              />
              <CustomSelect
                onChange={(val) => setValue("status", val)}
                validatorMessage={""}
                name={"sector"}
                placeholder={"Select"}
                label={"Status"}
                value={watch("status")}
                options={status}
                inputClass={styles.selectClass}
                parentClassName={styles.parent}
              />
              <div className={styles.buttons}>
                <Button
                  type="secondary"
                  onClick={handleReset}
                  className={`${styles.resetBtn} ${styles.btn}`}
                >
                  Reset
                </Button>
                <Button
                  type="primary"
                  onClick={handleSubmit(onSubmit)}
                  className={`${styles.btn}`}
                >
                  Filter
                </Button>
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

export { Filter };
