import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeOrmConfig } from '../ormconfig';
import { AuthModule } from './auth/auth.module.js';
import { TripModule } from './trip/trip.module.js';
import { DayPlacesModule } from './day_places/day_places.module.js';
import { PlaceModule } from './place/place.module.js';
import { CityModule } from './city/city.module.js';
import { AudioModule } from './audio/audio.module.js';
import { User } from './auth/user.model.js';
import { ConfigModule } from '@nestjs/config';
// import { AdminModule } from '@adminjs/nestjs';
// import Adapter from '@adminjs/sql';
// import AdminJS from 'adminjs';
// AdminJS.registerAdapter({
//   Database,
//   Resource,
// })
// Динамический импорт для adminjs
// import('adminjs').then((AdminJSModule) => {
//   const AdminJS = AdminJSModule.default;

//   // Динамический импорт адаптера @adminjs/sql внутри первого импорта
//   import('@adminjs/sql').then(({ Database, Resource }) => {
//     AdminJS.registerAdapter({
//       Database,
//       Resource,
//     });

//     // Теперь AdminJS зарегистрирован с адаптером и можем его использовать
//     // Здесь можно инициализировать AdminJS и добавлять ресурсы, настраивать админ-панель и т.д.

// }).catch(error => {
//   console.error('Ошибка при динамическом импорте adminjs:', error);
// });

// import { createAgent } from '@forestadmin/agent';
// import { createSqlDataSource } from '@forestadmin/datasource-sql';
// import { NestFactory } from '@nestjs/core';
// import { AdminJS } from 'adminjs';
// import * as AdminJSTypeorm from '@adminjs/typeorm'
// let AdminJS: any
// let AdminJSTypeorm: any
// import('adminjs').then((nestjsAdmin) => {
//   AdminJS = require('adminjs').AdminJS
//   // Use AdminUser here…

// }).catch(error => {
//   // Handle any loading error
// });

// import('@adminjs/typeorm').then((nestjsAdmin) => {
//   AdminJSTypeorm = require('@adminjs/typeorm').AdminJSTypeorm

// }).catch(error => {
//   // Handle any loading error
// });

// AdminJS.registerAdapter({
//   Resource: AdminJSTypeorm.Resource,
//   Database: AdminJSTypeorm.Database,
// })
// const AdminJS = import('adminjs').then((res) => {
//   res
// })
// import('@adminjs/typeorm').then((one) => {
//   AdminJS.registerAdapter({ Database, Resource })
// })

// import('adminjs')
//   .then((AdminJSModule) => {
//     const AdminJS = AdminJSModule.default; // или AdminJSModule, если нет default экспорта.
//     // Используйте AdminJS здесь внутри .then()

//     import('@adminjs/typeorm').then((nestjsAdmin) => {
//       const Database = nestjsAdmin.Database
//       const Resource = nestjsAdmin.Resource
//       AdminJS.registerAdapter({ Database, Resource });
//     }).catch(error => {
//       // Handle any loading error
//     });
//   })
//   .catch(error => {
//     console.log('Ошибка при импорте AdminJS:', error);
//   });

// import AdminJS from 'adminjs'
// import { Database, Resource } from '@adminjs/typeorm' // or any other adapter

// AdminJS.registerAdapter({ Database, Resource })

// const AdminJS = require('adminjs').AdminJS
// const AdminJSTypeorm = require('@adminjs/typeorm').AdminJSTypeorm
// const AdminJS = import('adminjs');
// import { Database, Resource } from '@adminjs/typeorm';

// // Register the TypeORM adapter
// AdminJS.registerAdapter({ Database, Resource });
const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};
import { DefaultAdminModule } from 'nestjs-admin';
import json from '../ormconfig.json'
// const AdminUser = require('nestjs-admin').AdminUserEntity
// module.exports = {
//   entities: [AdminUser],
// }
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    // TypeOrmModule.forRoot({
    //   type: 'postgres', 
    //   host: 'localhost', 
    //   port: 5432,
    //   username: 'your_username', 
    //   password: 'your_password',
    //   database: 'your_database',
    //   // entities: [AdminUser], 
    //   synchronize: true, 
    // }
    // ),
    // TypeOrmModule.forRoot({entities: [AdminUser]}),
    // TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    TripModule,
    DayPlacesModule,
    PlaceModule,
    CityModule,
    AudioModule,
    // DefaultAdminModule,
    // AdminModule.createAdmin({
    //   rootPath: '/admin',
    //   resources: [],
    // }),
    // AdminModule.createAdmin({
    //   adminJsOptions: {
    //     rootPath: '/admin',
    //     resources: [],
    //     // ...другие опции AdminJS
    //   },
    // }),
    //   import('@adminjs/nestjs').then(({ AdminModule }) => AdminModule.createAdminAsync({
    //     useFactory: async () => {
    //       const options = {
    //         connectionString: process.env.DATABASE_URL,
    //         database: process.env.DATABASE_NAME,
    //       };
    //       const db = await new Adapter('postgresql', options).init();

    //       return {
    //         adminJsOptions: {
    //           rootPath: '/admin',
    //           // Rename "organizations" to your table name or set "resources" to []
    //           resources: [db.table('user')],
    //         },
    //         auth: {
    //           authenticate: async (email, password) => {
    //             return { email };
    //           },
    //           cookiePassword: 'secret',
    //           cookieName: 'adminjs',
    //         },
    //         sessionOptions: {
    //           resave: true,
    //           saveUninitialized: true,
    //           secret: 'secret',
    //         },
    //       };
    //     },
    //   }),
    // ),
  //   import('@adminjs/nestjs').then(({ AdminModule }) => AdminModule.createAdminAsync({
  //     useFactory: () => ({
  //       adminJsOptions: {
  //         rootPath: '/admin',
  //         resources: [],
  //       },
  //       auth: {
  //         authenticate,
  //         cookieName: 'adminjs',
  //         cookiePassword: 'secret'
  //       },
  //       sessionOptions: {
  //         resave: true,
  //         saveUninitialized: true,
  //         secret: 'secret'
  //       },
  //     }),
  //   })),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
