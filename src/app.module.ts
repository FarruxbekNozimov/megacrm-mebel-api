import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RegionModule } from './region/region.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { ProductsModule } from './products/products.module';
import { StaffModule } from './staff/staff.module';
import { CityModule } from './city/city.module';
import { OrderDeliveryModule } from './order-delivery/order-delivery.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    StaffModule,
    RegionModule,
    CategoryModule,
    OrderModule,
    ProductsModule,
    CityModule,
    OrderDeliveryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
