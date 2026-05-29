import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateEntity } from './entities/template.entity';
import { WidgetEntity } from './entities/widget.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseUrl = config.get<string>('database.url');

        if (databaseUrl) {
          return {
            type: 'postgres' as const,
            url: databaseUrl,
            ssl: config.get('nodeEnv') === 'production' ? { rejectUnauthorized: false } : false,
            entities: [TemplateEntity, WidgetEntity],
            synchronize: config.get<boolean>('database.synchronize'),
            logging: config.get<boolean>('database.logging'),
          };
        }

        return {
          type: 'postgres' as const,
          host: config.get<string>('database.host'),
          port: config.get<number>('database.port'),
          username: config.get<string>('database.username'),
          password: config.get<string>('database.password'),
          database: config.get<string>('database.database'),
          entities: [TemplateEntity, WidgetEntity],
          synchronize: config.get<boolean>('database.synchronize'),
          logging: config.get<boolean>('database.logging'),
        };
      },
    }),
    TypeOrmModule.forFeature([TemplateEntity, WidgetEntity]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
