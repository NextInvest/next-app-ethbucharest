import { BSC_CHAIN_ID, client } from "./client";

// export async function mirrorBucket(bucketName: string, bucketId: string, address: string) {
//     const res = await client.crosschain.mirrorBucket({
//         bucketName: bucketName,
//         destChainId: GREEN_CHAIN_ID,
//         operator: address,
//         id: bucketId
//     })
// }

export async function mirrorGroup(groupName: string, id: string, operator: string) {
  return await client.crosschain.mirrorGroup({
    groupName,
    id,
    operator,
    destChainId: BSC_CHAIN_ID,
  });
}
