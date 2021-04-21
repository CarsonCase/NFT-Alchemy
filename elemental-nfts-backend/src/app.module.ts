import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ElementModule } from './element/element.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/elemental-nfts', { useNewUrlParser: true }),
    ElementModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
