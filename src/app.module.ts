import { Module, UsePipes } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ValidationPipe } from './pipes/validation.pipe';
import { ValidationException } from './exceptions/validation.exception';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),

    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.3lh9dy6.mongodb.net/shop?retryWrites=true&w=majority',
    ),
    AuthModule,
    UsersModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
