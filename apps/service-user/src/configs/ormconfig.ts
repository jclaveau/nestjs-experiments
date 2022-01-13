import { getConnectionOptions, TypeORMError } from 'typeorm'
import { get, from } from 'env-var';

// https://github.com/Sairyss/backend-best-practices#configuration
// TypeOrmModuleOptions

export async function getDBConfig() : Promise<Object> {
  let typeormConfig
  try {
    typeormConfig = await getConnectionOptions();
    console.log(typeormConfig)
  } catch (error) {

    if(! (error instanceof TypeORMError)) {
      throw error;
    }
    if(error.toString() != 'TypeORMError: No connection options were found in any orm configuration files.') {
      throw error;
    }

    typeormConfig = {}
  }

  const config = Object.assign(typeormConfig, {
    type: get('DB_TYPE')
      .required()
      .asEnum(typeOrmSupportTypes),
    host: get('DB_HOST')
      .required()
      .asString(),
    port: get('DB_PORT')
      .required()
      .asIntPositive(),
    username: get('DB_USERNAME')
      // .required()
      .asString(),
    password: get('DB_PASSWORD')
      // .required()
      .asString(),
    database: get('DB_NAME')
      .required()
      .asString(),
    entities: [
      __dirname + '/../**/*.entity{.ts,.js}',
    ],
    autoLoadEntities: true,
    // connectTimeoutMS: 2000,
    logging: [
      'error',
      'migration',
      'schema'
    ],
    synchronize: true,
  });

  if (config.type == 'mongodb') {
    Object.assign(config, {
      useUnifiedTopology: true,
    })
  } else if (config.type == 'postrgres') {
    // defults
    // port 5432
    // host localhost
  }

  // console.log(config)
  return config
}

const typeOrmSupportTypes = [
  "mysql",
  "mariadb",
  "postgres",
  "cockroachdb",
  "sqlite",
  "mssql",
  "sap",
  "oracle",
  "cordova",
  "nativescript",
  "react-native",
  "sqljs",
  "mongodb",
  "aurora-data-api",
  "aurora-data-api-pg",
  "expo",
  "better-sqlite3",
  "capacitor",
]
