import { ReadonlyURLSearchParams } from "next/navigation";

export const generateQueryParam = (
  currentParam: ReadonlyURLSearchParams,
  key: string,
  value: string
) => {
  const params = new URLSearchParams(currentParam?.toString());
  params.set(key, value);

  return params.toString();
};
