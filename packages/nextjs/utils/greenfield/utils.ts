export const DAPP_NAME = "NEXT_INVEST";
export const parseGroupName = (groupName: string) => {
  let name = groupName;
  let type = "Collection";
  let bucketName = "";
  if (name.indexOf(`${DAPP_NAME}_`) === 0) {
    if (name.indexOf(`${DAPP_NAME}_o_`) === 0) {
      type = "Data";
    }
    const temp = name.split("_");
    name = temp.slice(-1)[0];
    bucketName = temp[2];
  }
  return {
    type,
    name,
    bucketName,
  };
};
