import { Module } from '@nestjs/common';

import { CustomConfigModule } from './config/config.module';
import { ExampleModule } from './examples/example.module';
import { FavouritesModule } from './favourites/favourites.module';
import { ReviewsModule } from './reviews/reviews.module';
import { StoresModule } from './stores/stores.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    CustomConfigModule,
    UsersModule,
    OrdersModule,
    ExampleModule,
    StoresModule,
    ReviewsModule,
    FavouritesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
