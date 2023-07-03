import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma';

import { MenusController } from './menus/menus.controller';
import { MenusService } from './menus/menus.service';
import { StoresController } from './stores/stores.controller';
import { StoresRepository } from './stores/stores.repository';
import { StoresService } from './stores/stores.service';
import { MenusRepository } from './menus/menus.repository';

@Module({
  imports: [],
  controllers: [StoresController, MenusController],
  providers: [
    StoresService,
    MenusService,
    PrismaService,
    StoresRepository,
    MenusRepository,
  ],
  exports: [StoresService, MenusService, StoresRepository, MenusRepository],
})
export class StoresModule {}
