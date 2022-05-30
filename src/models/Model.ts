import { query, QueryBuilder } from '../database';

export default class Model<T = any, C = Omit<T, 'criado_em'>> {
  private table_name: string;
  private pk: string;

  constructor(table_name: string, pk?: string) {
    if (!pk) {
      pk = `id_${table_name}`;
    }

    this.table_name = table_name;
    this.pk = pk;
  }

  query(ref?: string): QueryBuilder<T | undefined> {
    return query(this.getTableName(ref));
  }

  getTableName(ref?: string): string {
    if (ref) {
      return `${this.table_name} as ${ref}`;
    }

    return this.table_name;
  }

  getPk(ref?: string): string {
    if (ref) {
      return `"${ref}"."${this.pk}"`;
    }

    return this.pk;
  }

  findAll<F = T>(ref?: string): QueryBuilder<F[]> {
    return query<T>(this.getTableName(ref));
  }

  findById(id: string | number, ref?: string): QueryBuilder<T | undefined> {
    const response = query<T>(this.getTableName(ref))
      .where(this.pk, id)
      .first();

    return response;
  }

  findOne(ref?: string): QueryBuilder<T | undefined> {
    return query<T>(this.getTableName(ref)).first();
  }

  create(data: C | C[]): Promise<T[]> {
    const create = query(this.getTableName()).insert(data).returning('*');

    return create;
  }

  update(
    id: string | number | Array<string | number>,
    data: Partial<C>,
  ): Promise<T[]> {
    const update = query(this.getTableName()).update(data).returning('*');

    if (Array.isArray(id)) {
      update.whereIn(this.pk, id);
    } else {
      update.where(this.pk, id);
    }
    return update;
  }
}
