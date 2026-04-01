import { Books, Users } from "./index";

export function setRelations() {
  console.log('Set Relations');

  Users.hasMany(Books, { foreignKey: "userId" });
  Books.belongsTo(Users, { foreignKey: "userId" });
}
