import { client, selectSp } from "./client";
import { getOffchainAuthKeys } from "./offchainAuth";
import { ReedSolomon } from "@bnb-chain/reed-solomon";
import { Connector } from "wagmi";
import { BasicFileInfo, CreateObjectInfo, MsgCreateGroup } from "~~/types/greenfied";

/**
 * returns true on success and false on failure
 */
export async function transfer(fromAddress: string, toAddress: string, amount: number | bigint, connector: Connector) {
  const transferTx = await client.account.transfer({
    fromAddress: fromAddress,
    toAddress,
    amount: [
      {
        denom: "BNB",
        amount: amount.toString(),
      },
    ],
  });

  const simulateInfo = await transferTx.simulate({
    denom: "BNB",
  });

  const res = await transferTx.broadcast({
    denom: "BNB",
    gasLimit: Number(simulateInfo.gasLimit),
    gasPrice: simulateInfo.gasPrice,
    payer: fromAddress,
    granter: "",
    signTypedDataCallback: async (addr: string, message: string) => {
      const provider: any = await connector.getProvider();
      return await provider?.request({
        method: "eth_signTypedData_v4",
        params: [addr, message],
      });
    },
  });

  if (res.code === 0) {
    return true;
  } else {
    false;
  }
}

/** returns true on succcess, false on failure */
export async function createBucketTx(bucketName: string, connector: Connector, address: string) {
  const spInfo = await selectSp();

  const provider = await connector?.getProvider();
  const offChainData = await getOffchainAuthKeys(address, provider);
  if (!offChainData) {
    console.error("No offchain, please create offchain pairs first");
    return false;
  }

  try {
    const createBucketTx = await client.bucket.createBucket(
      {
        bucketName: bucketName,
        creator: address,
        visibility: "VISIBILITY_TYPE_PUBLIC_READ",
        chargedReadQuota: "0",
        spInfo: {
          primarySpAddress: spInfo.primarySpAddress,
        },
        paymentAddress: address,
      },
      {
        type: "EDDSA",
        domain: window.location.origin,
        seed: offChainData.seedString,
        address,
      },
    );

    const simulateInfo = await createBucketTx.simulate({
      denom: "BNB",
    });

    console.log("simulateInfo", simulateInfo);

    const res = await createBucketTx.broadcast({
      denom: "BNB",
      gasLimit: Number(simulateInfo?.gasLimit),
      gasPrice: simulateInfo?.gasPrice || "5000000000",
      payer: address,
      granter: "",
    });

    if (res.code === 0) {
      return true;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
    if (err && typeof err === "object") {
      console.error(JSON.stringify(err));
    }
  }
  return false;
}

/**
 *
 * returns txHash on success, null on failure
 */
export async function createObjectTx(info: CreateObjectInfo, connector: Connector, address: string) {
  const provider = await connector?.getProvider();
  const offChainData = await getOffchainAuthKeys(address, provider);
  if (!offChainData) {
    console.error("No offchain, please create offchain pairs first");
    return null;
  }

  const rs = new ReedSolomon();
  const fileBytes = await info.file.arrayBuffer();
  const expectCheckSums = rs.encode(new Uint8Array(fileBytes));

  try {
    const createObjectTx = await client.object.createObject(
      {
        bucketName: info.bucketName,
        objectName: info.objectName,
        creator: address,
        visibility: "VISIBILITY_TYPE_PRIVATE",
        fileType: info.file.type,
        redundancyType: "REDUNDANCY_EC_TYPE",
        contentLength: fileBytes.byteLength,
        expectCheckSums: expectCheckSums,
      },
      {
        type: "EDDSA",
        domain: window.location.origin,
        seed: offChainData.seedString,
        address,
      },
    );

    const simulateInfo = await createObjectTx.simulate({
      denom: "BNB",
    });

    const res = await createObjectTx.broadcast({
      denom: "BNB",
      gasLimit: Number(simulateInfo?.gasLimit),
      gasPrice: simulateInfo?.gasPrice || "5000000000",
      payer: address,
      granter: "",
    });

    if (res.code === 0) {
      return res.transactionHash;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
    if (err && typeof err === "object") {
      console.error(JSON.stringify(err));
    }
  }
  return null;
}

export const CreateGroup = async (params: MsgCreateGroup) => {
  return await client.group.createGroup(params);
};

// export async function createMirroredGroupTx(groupName: string, address: string,  extra: string) {
//     const createGroupTx = await CreateGroup({
//         creator: address,
//         groupName: groupName,
//         members: [address],
//         extra,
//     });
//     const mirrorGroupTx = await mirrorGroup(
//         groupName,
//         '0',
//         address as string,
//       );

//       let policyTx;
//       const { name, bucketName, type } = parseGroupName(groupName);
//       const statement: PermissionTypes.Statement = {
//         effect: PermissionTypes.Effect.EFFECT_ALLOW,
//         actions: [PermissionTypes.ActionType.ACTION_GET_OBJECT],
//         resources:
//           type === 'Data' ? [] : [GRNToString(newObjectGRN(bucketName, '*'))],
//       };

//       const principal = {
//         type: PermissionTypes.PrincipalType.PRINCIPAL_TYPE_GNFD_GROUP,
//         value: GRNToString(newGroupGRN(address as string, groupName)),
//       };
//       if (type === 'Collection') {
//         policyTx = await client.bucket.putBucketPolicy(bucketName, {
//           operator: address,
//           statements: [statement],
//           principal,
//         });
//       } else {
//         policyTx = await client.object.putObjectPolicy(bucketName, name, {
//           operator: address,
//           statements: [statement],
//           principal,
//         });
//       }

//       const { simulate, broadcast } = await client.txClient.multiTx([
//         createGroupTx,
//         mirrorGroupTx,
//         policyTx,
//       ]);

//       const simulateMultiTxInfo = await simulate({
//         denom: 'BNB',
//       });

// }

export async function uploadFile(info: CreateObjectInfo, connector: Connector, address: string, txnHash: string) {
  const provider = await connector?.getProvider();
  const offChainData = await getOffchainAuthKeys(address, provider);
  if (!offChainData) {
    console.error("No offchain, please create offchain pairs first");
    return false;
  }

  const uploadRes = await client.object.uploadObject(
    {
      bucketName: info.bucketName,
      objectName: info.objectName,
      body: info.file,
      txnHash: txnHash,
    },
    {
      type: "EDDSA",
      domain: window.location.origin,
      seed: offChainData.seedString,
      address,
    },
  );

  if (uploadRes.code === 0) {
    return true;
  }
}

/** starts downlad on success */
export async function downloadFile(info: BasicFileInfo, address: string, connector: Connector) {
  const provider = await connector?.getProvider();
  const offChainData = await getOffchainAuthKeys(address, provider);
  if (!offChainData) {
    const keyErrMessage = "No offchain, please create offchain pairs first";
    console.error(keyErrMessage);
    throw new Error(keyErrMessage);
  }

  await client.object.downloadFile(
    {
      bucketName: info.bucketName,
      objectName: info.objectName,
    },
    {
      type: "EDDSA",
      address,
      domain: window.location.origin,
      seed: offChainData.seedString,
    },
  );
}

export async function updateFile(info: BasicFileInfo, address: string, connector: Connector) {
  const provider = await connector?.getProvider();
  const offChainData = await getOffchainAuthKeys(address, provider);
  if (!offChainData) {
    console.error("No offchain, please create offchain pairs first");
    return false;
  }

  const tx = await client.object.updateObjectInfo({
    bucketName: info.bucketName,
    objectName: info.objectName,
    operator: address,
    visibility: 1,
  });

  const simulateTx = await tx.simulate({
    denom: "BNB",
  });

  const res = await tx.broadcast({
    denom: "BNB",
    gasLimit: Number(simulateTx?.gasLimit),
    gasPrice: simulateTx?.gasPrice || "5000000000",
    payer: address,
    granter: "",
  });

  if (res.code === 0) {
    return true;
  }
  return false;
}

export async function deleteObject(info: BasicFileInfo, address: string, connector: Connector) {
  const provider = await connector?.getProvider();
  const offChainData = await getOffchainAuthKeys(address, provider);
  if (!offChainData) {
    console.error("No offchain, please create offchain pairs first");
    return false;
  }

  const tx = await client.object.deleteObject({
    bucketName: info.bucketName,
    objectName: info.objectName,
    operator: address,
  });

  const simulateTx = await tx.simulate({
    denom: "BNB",
  });

  const res = await tx.broadcast({
    denom: "BNB",
    gasLimit: Number(simulateTx?.gasLimit),
    gasPrice: simulateTx?.gasPrice || "5000000000",
    payer: address,
    granter: "",
  });

  if (res.code === 0) {
    return true;
  }
  return false;
}

// export function parseGroupName(groupName: string): { name: any; bucketName: any; type: any } {
//   throw new Error("Function not implemented.");
// }
