import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ApiInfoCheckerMiddleware } from './middleware/api-info-checker.middleware';
import { ProcessesModule } from './modules/processes/processes.module';
import { ApiPermissionCheckerMiddleware } from './middleware/api-permission-checker.middleware';
import { UserProcessesModule } from './modules/user-processes/user-processes.module';

@Module({
  imports: [UserModule, ProcessesModule, UserProcessesModule],
  controllers: [],
  providers: [],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiInfoCheckerMiddleware)
      .forRoutes(
        { path: 'user/register', method: RequestMethod.POST },
        { path: 'user/login', method: RequestMethod.POST },
      ),
      consumer
        .apply(ApiPermissionCheckerMiddleware)
        .forRoutes({ path: 'processes', method: RequestMethod.POST });
  }
}
