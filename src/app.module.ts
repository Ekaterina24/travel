import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/ormconfig';
import { AuthModule } from './auth/auth.module';
import { TripModule } from './trip/trip.module';
import { DayPlacesModule } from './day_places/day_places.module';
import { PlaceModule } from './place/place.module';
import { CityModule } from './city/city.module';
import { AudioModule } from './audio/audio.module';
import { User } from './auth/user.model';
// import { AdminJS } from 'adminjs';
// import * as AdminJSTypeorm from '@adminjs/typeorm'
// import('adminjs').then((nestjsAdmin) => {
//   const AdminJS = require('adminjs').AdminJS
//   // Use AdminUser here…
//   import('@adminjs/typeorm').then((nestjsAdmin) => {
//     const AdminJSTypeorm = require('@adminjs/typeorm').AdminJSTypeorm
//     AdminJS.registerAdapter({
//       Resource: AdminJSTypeorm.Resource,
//       Database: AdminJSTypeorm.Database,
//     })
//   }).catch(error => {
//     // Handle any loading error
//   });
// }).catch(error => {
//   // Handle any loading error
// });
// import AdminJS from 'adminjs'
// import { Database, Resource } from '@adminjs/typeorm' // or any other adapter

// AdminJS.registerAdapter({ Database, Resource })

// const AdminJS = require('adminjs').AdminJS
// const AdminJSTypeorm = require('@adminjs/typeorm').AdminJSTypeorm

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
}

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN)
  }
  return null
}

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    TripModule,
    DayPlacesModule,
    PlaceModule,
    CityModule,
    AudioModule,
    import('@adminjs/nestjs').then(({ AdminModule }) => AdminModule.createAdminAsync({
      useFactory: () => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [],
        },
        auth: {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'secret'
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret'
        },
      }),
    })),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
