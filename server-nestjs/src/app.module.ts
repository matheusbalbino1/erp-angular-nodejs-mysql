import { Logger, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { WebsocketGateway } from "./websocket/websocket.gateway";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, WebsocketGateway, Logger],
})
export class AppModule {}
