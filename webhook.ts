import { serve } from "https://deno.land/std@0.145.0/http/mod.ts";
import { Evt } from "https://deno.land/x/evt@v1.11.2/mod.ts";

import type { MiraiEvent } from "./types/event.ts";

export class Webhook extends Evt<MiraiEvent> {
  /**
   * 事件上报服务器，监听一个端口，等待 mirai 上报事件
   */
  constructor(port: number) {
    super();

    serve(async (req) => {
      try {
        const data = await req.json();
        this.post(data as MiraiEvent);
      } catch (_) {
        return new Response("Bad Request", { status: 400 });
      }
      return new Response(null, { status: 204 });
    }, { port });
  }
}
