import { Client, Server } from "@hanseltime/janus-simple-command";
import { WebSocketServer, WebSocket } from "ws";
import {
  ExtensionCommandMap,
  ExtensionCommands,
  ExtensionStatusMap,
  ServerCommandMap,
  ServerCommands,
  ServerStatusMap,
} from "./types";
import { WebSocketConnection } from "./WebSocketConnection";

const wss = new WebSocketServer({ port: 9080 });

wss.on("connection", async (ws) => {
  const server = new Server<ServerCommands, ServerCommandMap, ServerStatusMap>({
    connection: new WebSocketConnection(ws, "server"),
    maxAckRetries: 3,
    ackRetryDelay: 500,
    maxSenderInactivity: 500,
    debug: console.debug,
  });
  const commandClient = new Client<
    ExtensionCommands,
    ExtensionCommandMap,
    ExtensionStatusMap
  >({
    commands: ["click", "fill", "wait"],
    ackRetryDelay: 500,
    maxAckRetries: 3,
    connection: new WebSocketConnection(ws, "client"),
    debug: console.debug,
  });

  server.setMessageHandler("ready", {
    handler: async () => {
      const sender = await commandClient.createSender();
	  console.log('sending actions')
      await sender.command("click", {
        selector: ".premium-banner",
      });
	  console.log('done sending actions')
      await sender.close();
      return {
        isError: false,
        data: {},
      };
    },
  });

  await server.open();
  await commandClient.open();
});

wss.on("error", console.error);
