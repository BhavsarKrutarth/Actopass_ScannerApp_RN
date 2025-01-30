import FetchMethod from "./FetchMethod";

export const loginUser = async (Id, Password) => {
  try {
    const response = await FetchMethod.POST({
      EndPoint: "Scanner",
      Params: {
        Code: Id,
        Password: Password,
      },
    });
    return response;
  } catch (error) {
    console.log("Login API Error:", error);
    throw error;
  }
};

export const ScannedData = async (QrCode, ScannerLoginId) => {
  try {
    const response = await FetchMethod.POST({
      EndPoint: `SacnneTicket`,
      Params: {
        QrCode: QrCode,
        ScannerLoginId: ScannerLoginId,
        Type: "QRCode",
      },
      NeedToken: true,
    });
    return response;
  } catch (error) {
    console.log("Login API Error:", error);
    throw error;
  }
};

export const ScannedTicket = async (
  BookTicketDeatils,
  ScannerLoginId,
  TotalSacnnerTicketQty
) => {
  try {
    const response = await FetchMethod.POST({
      EndPoint: `SacnneTicket/confirm-ticket`,
      Params: {
        BookTicketDeatils: BookTicketDeatils,
        ScannerLoginId: ScannerLoginId,
        TotalSacnnerTicketQty: TotalSacnnerTicketQty,
      },
      NeedToken: true,
    });
    return response;
  } catch (error) {
    console.log("Login API Error:", error);
    throw error;
  }
};

export const userProfile = async (ScannerLoginId) => {
  try {
    const response = await FetchMethod.GET({
      EndPoint: `SacnneTicket/Profile/${ScannerLoginId}`,
      NeedToken: true,
    });
    return response;
  } catch (error) {
    console.log("Login API Error:", error);
    throw error;
  }
};

export const HistoryData = async (ScannerLoginId) => {
  try {
    const response = await FetchMethod.GET({
      EndPoint: `SacnneTicket/TicketHistory/${ScannerLoginId}`,
      NeedToken: true,
    });
    return response;
  } catch (error) {
    console.log("Login API Error:", error);
    throw error;
  }
};
