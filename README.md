# deno-mirai

An experimental Deno port for [Mirai](https://github.com/mamoe/mirai) project.

Full event types supported.

```ts
import { MessagePlain, Mirai, Webhook } from "../mod.ts";

// 创建一个事件上报服务器，用于接收 Mirai 的事件
// create a webhook server for receiving Mirai events
const webhook = new Webhook(8000);
// 创建一个 Mirai 对象，用于发送消息和执行动作
// create a Mirai object to send messages and execute actions
const mirai = new Mirai("http://localhost:8080");

webhook
  // 过滤私信类型的消息
  // filter messages of friend messages
  .pipe((event) =>
    event.type === "FriendMessage" || event.type === "FriendSyncMessage"
      ? [event]
      : null
  )
  // 添加一个消息处理器，用于处理消息
  // add a message handler to handle messages
  .attach((event) => {
    if (
      "/ping" === event.messageChain
        .filter((message): message is MessagePlain => message.type === "Plain")
        .map((message) => message.text)
        .join("")
    ) {
      // 发送一条响应消息给消息发送者
      // send a response message to the sender
      mirai.sendFriendMessage({
        target: event.sender.id,
        messageChain: [{
          type: "Plain",
          text: "pong",
        }],
      });
    }
  });
```

Example of `config/net.mamoe.mirai-api-http/setting.yml` file:

```yml
adapters:
  - http
  - webhook

adapterSettings:
  http:
    host: localhost
    port: 8080
    cors: [*]

  webhook:
    destinations:
      - 'localhost:8000'
```

## Contribution

There is no multi-account and verification support yet, and maybe it will never
be supported.

All the types seems to be stable and correct, but I don't know how to write
tests. Therefore, if you come into any problems, be good luck to debug the code
yourself.

## LICENSE

GLWT (Good Luck With That) Public License
