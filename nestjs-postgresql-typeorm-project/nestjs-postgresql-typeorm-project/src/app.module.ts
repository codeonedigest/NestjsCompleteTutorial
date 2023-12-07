import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Configuration from './config/Configuration'; 
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Configuration]
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get('database.host'),
          port: +configService.get<number>('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get('database.name'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true, // Don't use this option for prod mode
          keepConnectionAlive: true,
          timezone: 'UTC',
          ssl: configService.get('database.ssl'),
          extra: configService.get('database.ssl') ? {
              ssl: {
                  rejectUnauthorized: false
              }
          } : null,
          autoLoadEntities: true
        }),
      inject: [ConfigService]
      }),

    BookModule
  ],
  controllers: [AppController ],
  providers: [AppService ],
})
export class AppModule {}
