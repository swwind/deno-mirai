import { MessagePlain, Mirai, Webhook } from "../mod.ts";

const webhook = new Webhook(8000);
const mirai = new Mirai("http://localhost:8080");

webhook
  .pipe((event) =>
    event.type === "FriendMessage" || event.type === "FriendSyncMessage"
      ? [event]
      : null
  )
  .attach((event) => {
    if (
      "/ping" === event.messageChain
        .filter((message): message is MessagePlain => message.type === "Plain")
        .map((message) => message.text)
        .join("")
    ) {
      mirai.sendFriendMessage({
        target: event.sender.id,
        messageChain: [{
          type: "Plain",
          text: "pong",
        }],
      });
    }
  });
