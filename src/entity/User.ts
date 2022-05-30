export default interface User {
  userId: string;
  accountId: string;
  firstName: string;
  lastName: string;
  email: string;
  groupsId: string;

  criado_em: Date;
  removido_em?: Date;
}
