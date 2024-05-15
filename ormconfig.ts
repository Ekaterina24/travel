import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const AdminUser = require('nestjs-admin').AdminUserEntity
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'dpg-coolkqu3e1ms73b86scg-a.oregon-postgres.render.com',
  port: 5432,
  username: 'travel',
  password: 'hlZA13ek0q6SvNzY09oUGUY2i4XYhB8v',
  database: 'travel_ewqk',
  autoLoadEntities: true,
  synchronize: true,
  entities: [AdminUser],
  ssl: true
};

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'fizika852',
//   database: 'travel',
//   autoLoadEntities: true,
//   synchronize: true,
//   entities: [AdminUser],
// };