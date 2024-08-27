import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [PrismaModule, UserModule, ProfileModule, PostModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
