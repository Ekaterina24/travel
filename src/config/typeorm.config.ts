import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

// const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'fizika852',
  database: 'travel',
  autoLoadEntities: true,
  synchronize: true,
};
