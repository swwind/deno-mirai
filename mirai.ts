import { MessageChain } from "./types/chain.ts";
import {
  FriendInformation,
  GroupInformation,
  GroupMemberInformation,
  MessageEvent,
} from "./types/event/message.ts";

type ResponseHeader = {
  code: number;
  msg: string;
};

type ResponseData<T> = ResponseHeader & {
  data: T;
};

type PluginInformation = {
  version: string;
};

type PersonalInformation = {
  /** 昵称 */
  nickname: string;
  /** 邮箱 */
  email: string;
  /** 年龄 */
  age: number;
  /** 等级 */
  level: number;
  /** 个性签名 */
  sign: string;
  /** 性别（也许应该添加更多？） */
  sex: "UNKNOWN" | "MALE" | "FEMALE";
};

type SendMessage = {
  /** 发送消息目标好友的 QQ 号（或者群号） */
  target: number;
  /** 引用一条消息的 messageId 进行回复 */
  quote?: number;
  /** 消息链，是一个消息对象构成的数组 */
  messageChain: MessageChain;
};

type SendNudge = {
  /** 戳一戳的目标, QQ号, 可以为 bot QQ号 */
  target: number;
  /** 戳一戳接受主体(上下文), 戳一戳信息会发送至该主体, 为群号/好友QQ号 */
  subject: number;
  /** 上下文类型, 可选值 Friend, Group, Stranger */
  kind: "Group" | "Friend" | "Stranger";
};

type Recall = {
  /** 需要撤回的消息的 messageId */
  target: number;
};

type DeleteFriend = {
  /** 删除好友的 QQ 号 */
  target: number;
};

type Mute = {
  /** 指定群的群号 */
  target: number;
  /** 指定群员 QQ 号 */
  memberId: number;
  /** 禁言时长，单位为秒，最多30天 */
  time: number;
};

type Unmute = {
  /** 指定群的群号 */
  target: number;
  /** 指定群员 QQ 号 */
  memberId: number;
};

type Kick = {
  /** 指定群的群号 */
  target: number;
  /** 指定群员 QQ 号 */
  memberId: number;
  /** 信息 */
  msg?: string;
};

type Quit = {
  /** 指定群的群号 */
  target: number;
};

type MuteAll = {
  /** 指定群的群号 */
  target: number;
};

type UnmuteAll = {
  /** 指定群的群号 */
  target: number;
};

type SetEssence = {
  /** 精华消息的 messageId */
  target: number;
};
type GroupConfig = {
  /** 群名 */
  name: string;
  /** 群公告 */
  announcement: string;
  /** 是否开启坦白说 */
  confessTalk: boolean;
  /** 是否允许群员邀请 */
  allowMemberInvite: boolean;
  /** 是否开启自动审批入群 */
  autoApprove: boolean;
  /** 是否允许匿名聊天 */
  anonymousChat: boolean;
};

type SetGroupConfig = {
  /** 指定群的群号 */
  target: number;
  /** 群设置 */
  config: GroupConfig;
};

type SetMemberInfo = {
  /** 指定群的群号 */
  target: number;
  /** 群员 QQ 号 */
  memberId: number;
  /** 群员资料 */
  info: {
    /** 群名片，即群昵称 */
    name?: string;
    /** 群头衔 */
    specialTitle?: string;
  };
};

type MemberAdmin = {
  /** 指定群的群号 */
  target: number;
  /** 群员 QQ 号 */
  memberId: number;
  /** 是否设置为管理员 */
  assign: boolean;
};

type GroupAnnouncement = {
  /** 群组信息 */
  group: GroupInformation;
  /** 群公告内容 */
  content: string;
  /** 发布者账号 */
  senderId: number;
  /** 公告唯一 id */
  fid: string;
  /** 是否所有群成员已确认 */
  allConfirmed: false;
  /** 确认群成员人数 */
  confirmedMembersCount: 0;
  /** 发布时间 */
  publicationTime: number;
};

type AnnoPublish = {
  /** 群号 */
  target: number;

  /** 公告内容 */
  content: string;
  /** 是否发送给新成员 */
  sendToNewMember?: boolean;
  /** 是否置顶 */
  pinned?: boolean;
  /** 是否显示群成员修改群名片的引导 */
  showEditCard?: boolean;
  /** 是否自动弹出 */
  showPopup?: boolean;
  /** 是否需要群成员确认 */
  requireConfirmation?: boolean;

  /** 公告图片 url */
  imageUrl: string | null;
  /** 公告图片本地路径 */
  imagePath: string | null;
  /** 公告图片 base64 编码 */
  imageBase64: string | null;
};

type AnnoDelete = {
  /** 群号 */
  id: number;
  /** 群公告唯一 id */
  fid: string;
};

type HandleNewFriendRequest = {
  /** 响应申请事件的标识 */
  eventId: number;
  /** 事件对应申请人 QQ 号 */
  fromId: number;
  /** 事件对应申请人的群号，可能为 0 */
  groupId: number;
  /**
   * 响应的操作类型
   *
   * - 0: 同意添加好友
   * - 1: 拒绝添加好友
   * - 2: 拒绝添加好友并添加黑名单，不再接收该用户的好友申请
   */
  operate: 0 | 1 | 2;
  /** 回复的信息 */
  message: string;
};

type HandleMemberJoinRequest = {
  /** 响应申请事件的标识 */
  eventId: number;
  /** 事件对应申请人 QQ 号 */
  fromId: number;
  /** 事件对应申请人的群号 */
  groupId: number;
  /**
   * 响应的操作类型
   *
   * - 0: 同意入群
   * - 1: 拒绝入群
   * - 2: 忽略请求
   * - 3: 拒绝入群并添加黑名单，不再接收该用户的入群申请
   * - 4: 忽略入群并添加黑名单，不再接收该用户的入群申请
   */
  operate: 0 | 1 | 2 | 3 | 4;
  /** 回复的信息 */
  message: string;
};

type HandleBotInvitedJoinGroupRequest = {
  /** 事件标识 */
  eventId: number;
  /** 邀请人（好友）的 QQ 号 */
  fromId: number;
  /** 被邀请进入群的群号 */
  groupId: number;
  /**
   * 响应的操作类型
   *
   * - 0: 同意邀请
   * - 1: 拒绝邀请
   */
  operate: 0 | 1;
  /** 回复的信息 */
  message: string;
};

export class Mirai {
  /** 发送 mirai-api-http 请求到指定的 url */
  constructor(private url: string) {}

  private async post<R, T>(path: string, data: T) {
    const response = await fetch(`${this.url}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json() as R;
  }

  private async get<R>(path: string) {
    const response = await fetch(`${this.url}${path}`, {
      method: "GET",
    });
    return await response.json() as R;
  }

  /** 获取插件信息 */
  about() {
    return this.get<ResponseData<PluginInformation>>("/about");
  }

  /** 通过 messageId 获取消息 */
  messageFromId(
    /** 获取消息的 messageId */
    id: number,
  ) {
    return this.get<ResponseData<MessageEvent>>(`/messageFromId?id=${id}`);
  }

  /** 获取好友列表 */
  friendList() {
    return this.get<ResponseData<FriendInformation[]>>("/friendList");
  }

  /** 获取群列表 */
  groupList() {
    return this.get<ResponseData<GroupInformation[]>>("/groupList");
  }

  /** 获取群成员列表 */
  groupMemberList(
    /** 指定群的群号 */
    target: number,
  ) {
    return this.get<ResponseData<GroupMemberInformation[]>>(
      `/groupMemberList?target=${target}`,
    );
  }

  /** 获取 Bot 资料 */
  botProfile() {
    return this.get<PersonalInformation>("/botProfile");
  }

  /** 获取好友资料 */
  friendProfile(
    /** 指定好友账号 */
    target: number,
  ) {
    return this.get<PersonalInformation>(`/friendProfile?target=${target}`);
  }

  /** 获取群成员资料 */
  memberProfile(
    /** 指}定群的群号 */
    target: number,
    /** 群成员 QQ 号码 */
    memberId: number,
  ) {
    return this.get<PersonalInformation>(
      `/memberProfile?target=${target}&memberId=${memberId}`,
    );
  }

  /** 获取 QQ 用户资料 */
  userProfile(
    /** 要查询的 QQ 号码 */
    target: number,
  ) {
    return this.get<PersonalInformation>(`/userProfile?target=${target}`);
  }

  /** 发送好友消息 */
  sendFriendMessage(data: SendMessage) {
    return this.post<
      ResponseHeader & {
        /** 标识本条消息，用于撤回和引用回复 */
        messageId: number;
      },
      SendMessage
    >("/sendFriendMessage", data);
  }

  /** 发送群消息 */
  sendGroupMessage(data: SendMessage) {
    return this.post<
      ResponseHeader & {
        /** 标识本条消息，用于撤回和引用回复 */
        messageId: number;
      },
      SendMessage
    >("/sendGroupMessage", data);
  }

  /** 发送临时会话消息 */
  sendTempMessage(data: SendMessage) {
    return this.post<
      ResponseHeader & {
        /** 标识本条消息，用于撤回和引用回复 */
        messageId: number;
      },
      SendMessage
    >("/sendTempMessage", data);
  }

  /** 发送头像戳一戳消息 */
  sendNudge(data: SendNudge) {
    return this.post<ResponseHeader, SendNudge>("/sendNudge", data);
  }

  /** 撤回消息 */
  recall(data: Recall) {
    return this.post<ResponseHeader, Recall>("/recall", data);
  }

  // TODO: 文件部分懒得搞了

  /** 删除好友 */
  deleteFriend(data: DeleteFriend) {
    return this.post<ResponseHeader, DeleteFriend>("/deleteFriend", data);
  }

  /** 禁言群成员 */
  mute(data: Mute) {
    return this.post<ResponseHeader, Mute>("/mute", data);
  }

  /** 解除群成员禁言 */
  unmute(data: Unmute) {
    return this.post<ResponseHeader, Unmute>("/unmute", data);
  }

  /** 移除群成员 */
  kick(data: Kick) {
    return this.post<ResponseHeader, Kick>("/kick", data);
  }

  /** 退出群聊 */
  quit(data: Quit) {
    return this.post<ResponseHeader, Quit>("/quit", data);
  }

  /** 全体禁言 */
  muteAll(data: MuteAll) {
    return this.post<ResponseHeader, MuteAll>("/muteAll", data);
  }

  /** 解除全体禁言 */
  unmuteAll(data: UnmuteAll) {
    return this.post<ResponseHeader, UnmuteAll>("/unmuteAll", data);
  }

  /** 设置群精华消息 */
  setEssence(data: SetEssence) {
    return this.post<ResponseHeader, SetEssence>("/setEssence", data);
  }

  /** 获取群设置 */
  getGroupConfig(
    /** 指定群的群号 */
    target: number,
  ) {
    return this.get<GroupConfig>(`/groupConfig?target=${target}`);
  }

  /** 修改群设置 */
  setGroupConfig(data: SetGroupConfig) {
    return this.post<ResponseHeader, SetGroupConfig>("/groupConfig", data);
  }

  /** 获取群员设置 */
  getMemberInfo(
    /** 指}定群的群号 */
    target: number,
    /** 群员 QQ 号 */
    memberId: number,
  ) {
    return this.get<GroupMemberInformation>(
      `/memberInfo?target=${target}&memberId=${memberId}`,
    );
  }

  /** 修改群员设置 */
  setMemberInfo(data: SetMemberInfo) {
    return this.post<ResponseHeader, SetMemberInfo>("/memberInfo", data);
  }

  /** 修改群员管理员 */
  memberAdmin(data: MemberAdmin) {
    return this.post<ResponseHeader, MemberAdmin>("/memberAdmin", data);
  }

  /** 获取群公告 */
  annoList(
    /** 指定群的群号 */
    target: number,
  ) {
    return this.get<ResponseData<GroupAnnouncement[]>>(
      `/anno/list?target=${target}`,
    );
  }

  /** 发布群公告 */
  annoPublish(data: AnnoPublish) {
    return this.post<ResponseData<GroupAnnouncement[]>, AnnoPublish>(
      "/anno/publish",
      data,
    );
  }

  /** 删除群公告 */
  annoDelete(data: AnnoDelete) {
    return this.post<ResponseHeader, AnnoDelete>("/anno/delete", data);
  }
  /** 处理添加好友申请 */
  handleNewFriendRequest(data: HandleNewFriendRequest) {
    return this.post<ResponseHeader, HandleNewFriendRequest>(
      "/resp/newFriendRequestEvent",
      data,
    );
  }

  /** 用户入群申请（Bot 需要有管理员权限） */
  handleMemberJoinRequest(data: HandleMemberJoinRequest) {
    return this.post<ResponseHeader, HandleMemberJoinRequest>(
      "/resp/memberJoinRequestEvent",
      data,
    );
  }

  /** Bot 被邀请入群申请 */
  handleBotInvitedJoinGroupRequest(data: HandleBotInvitedJoinGroupRequest) {
    return this.post<ResponseHeader, HandleBotInvitedJoinGroupRequest>(
      "/resp/botInvitedJoinGroupRequestEvent",
      data,
    );
  }
}
