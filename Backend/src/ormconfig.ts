import { join } from "path"
import {ConnectionOptions} from "typeorm"


const config:ConnectionOptions  = {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'supercam',
      entities:[join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
      migrationsRun:false,
      logging:false,


      migrations: [join(__dirname , `/*.ts`)],
      cli: {
        migrationsDir: "src/migrations",
        entitiesDir: "src/entities"
      },

}
export default   config
