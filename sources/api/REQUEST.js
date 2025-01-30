import { Functions } from "../utils";

import Axios from "axios";

import URL from "./URL";

const REQUEST = async ({
  Method,
  EndPoint,
  Params,
  IsformData = false,
  NeedToken = true,
}) => {
  try {
    const appData = await Functions.getUserData();
    // console.log("appData", appData?.AuthorizationKey);
    const Headers = Header(NeedToken, appData?.AuthorizationKey, IsformData);
    const options = {
      method: Method,
      headers: Headers,
      data: Params,
      url: URL.AppUrl + EndPoint,
    };

    const response = await Axios(options);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.log("API Request Error:", error);
    throw error?.response?.data?.title
      ? {
          msg: error?.response?.data?.title,
          status: error?.response?.data?.status,
        }
      : error?.message;
  }
};

const Header = (NeedToken, Token, IsformData) => {
  let apiHeaders = {
    Accept: "*/*",
    "Content-Type": IsformData ? "multipart/form-data" : "application/json",
  };
  if (NeedToken) {
    apiHeaders = { ...apiHeaders, Authorization: `Bearer ${Token}` };
  }
  return apiHeaders;
};
export default REQUEST;
