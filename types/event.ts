import type { ActionEvent } from "./event/action.ts";
import type { MessageEvent } from "./event/message.ts";

/** mirai 的全部事件类型 */
export type MiraiEvent = MessageEvent | ActionEvent;
