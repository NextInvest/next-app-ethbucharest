export type CreateObjectInfo = {
  bucketName: string;
  objectName: string;
  file: File;
};

export type BasicFileInfo = {
  bucketName: string;
  objectName: string;
};

export type MsgCreateGroup = {
  /** owner defines the account address of group owner who create the group */
  creator: string;
  /** group_name defines the name of the group. it's not globally unique. */
  groupName: string;
  /** member_request defines a list of member which to be add or remove */
  members: string[];

  extra: string;
};
