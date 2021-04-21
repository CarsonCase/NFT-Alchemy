import { Module } from '@nestjs/common';
import { ElementService } from './element.service';
import { ElementController } from './element.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ElementSchema } from './schemas/element.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Element', schema: ElementSchema }])

  ],
  providers: [ElementService],
  controllers: [ElementController]
})
export class ElementModule {}
