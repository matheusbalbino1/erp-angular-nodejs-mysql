import { Logger } from "@nestjs/common";
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({ namespace: "websocket" })
export class WebsocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private logger: Logger) {}

  handleConnection(client: any, ...args: any[]) {
    this.logger.log("New client connected");
    console.log("New client connected");
  }

  @SubscribeMessage("message")
  handleMessage(client: any, payload: any) {
    console.log("message", payload);
  }
}
