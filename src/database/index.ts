import { Knex } from 'knex';
import knex from 'knex';
import Postgres from 'pg';

import database_config from '../config/database';

class Database {
  private currentSchema = database_config.connection.schema;
  private _db: Knex | undefined;

  get db(): Knex {
    if (!this._db) {
      throw new Error('Database instance not created');
    }

    return this._db;
  }

  getCurrentSchema(): string {
    return this.currentSchema;
  }

  setCurrentSchema(name: string): void {
    this.currentSchema = name;
  }

  raw(query: string, params?: any | Array<any>): Knex.Raw {
    return this.db.raw(query, params);
  }

  query<T>(table: string): Knex.QueryBuilder<T> {
    return this.db(table).withSchema(this.currentSchema);
  }

  connect(): void {
    this._db = knex({
      ...database_config,
      pool: {
        max: 15,
        idleTimeoutMillis: 30000, // 30 segundos
      },
    });

    Postgres.types.setTypeParser(Postgres.types.builtins.INT8, (value: any) => {
      return parseInt(value, 10);
    });

    Postgres.types.setTypeParser(
      Postgres.types.builtins.FLOAT8,
      (value: any) => {
        return parseFloat(value);
      },
    );

    Postgres.types.setTypeParser(
      Postgres.types.builtins.NUMERIC,
      (value: any) => {
        return parseFloat(value);
      },
    );

    console.log(`✔️ Postgres Database | Connected`);
  }

  async disconnect(): Promise<void> {
    await this._db?.destroy();

    console.log(`✔️ Postgres Database | Disconnected`);
  }
}

const data = new Database();

data.connect();

export default data;

const raw = (query: string, params?: any | Array<any>): Knex.Raw =>
  data.raw(query, params);

const query = <T>(table: string): Knex.QueryBuilder<T> => data.query<T>(table);

type QueryBuilder<T = any> = Knex.QueryBuilder<any, T>;

export { raw, query, QueryBuilder };
