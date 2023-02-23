import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';

@Module({
  imports: [HttpModule],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
