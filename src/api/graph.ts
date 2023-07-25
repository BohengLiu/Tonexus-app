import {
  friendlyAddressToRawForm,
  rawFormToFriendlyAddress,
} from "@/utils/formatAddress";

const baseUrl = "http://192.168.110.122:8080";

export const getTransctionByAddress = async (
  addr: string,
  direction: string
) => {
  const resp = await fetch(
    `${baseUrl}/ListGroupedTransactionsByAddress?Address=${friendlyAddressToRawForm(
      addr
    )}&Direction=${direction}&PageNum=1&PageSize=100`
  );
  const data = await resp.json();
  return data.Data.map((item: any) => ({
    Count: item.Count,
    Destination: rawFormToFriendlyAddress(item.Destination),
    InTxCount: item.InTxCount,
    OutTxCount: item.OutTxCount,
    Source: rawFormToFriendlyAddress(item.Source),
    TotalValue: item.TotalValue,
  }));
};
