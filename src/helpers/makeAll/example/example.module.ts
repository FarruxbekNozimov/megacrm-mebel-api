import { Module } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ExampleController } from './example.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Example, ExampleSchema } from './schemas/example.schema';
import { JwtModule } from '@nestjs/jwt';
import { StaffModule } from '../../../staff/staff.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Example.name, schema: ExampleSchema }]),
    JwtModule, StaffModule
  ],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule { }
