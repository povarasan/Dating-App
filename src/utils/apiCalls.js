import { onApiCall } from "./CommonApi";

export const companyLogin = (formData) => {
  return onApiCall({
    url: ``,
    method: "POST",
    data: formData,
  });
};