import { OptionType } from "types";
import * as yup from "yup";

export const initOptionType: OptionType = { label: "", value: "" };

export const optionTypeSchema = (msg?: string) =>
  yup.object({
    label: yup.string().required(msg ?? "Required"),
    value: yup.string().required(msg ?? "Required")
  });
