import { client } from "./client";

export async function getLatestBlockHeight() {
  return await client.basic.getLatestBlockHeight();
}

export async function getAccountBalance(address: string) {
  return await client.account.getAccountBalance({
    address: address,
    denom: "BNB",
  });
}
