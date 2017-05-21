const conn = require('./conn');

const User = require('./user');
const Group = require('./group');
const UserGroup = require('./userGroup');


Group.belongsTo(User, { as: 'owner' });


UserGroup.belongsTo(User, { onDelete: 'CASCADE' });
UserGroup.belongsTo(Group, { onDelete: 'CASCADE' });
User.hasMany(UserGroup);
Group.hasMany(UserGroup);

const sync = () => conn.sync({ force: true });

const seed = () => {
  const groups = ['group1', 'group2', 'group3'];
  const users = ['Summer', 'Evan', 'Arum', 'Mauro'];
  let group1, group2, group3, user1, user2, user3, user4;

  return sync()
    .then(() => {
      const promises = groups.map(name => Group.create({ name }))
        .concat(users.map(name => User.create({ name, password: name.toUpperCase() })));
      return Promise.all(promises);
    })
    .then(result => {
      [group1, group2, group3, user1, user2, user3, user4] = result;

      // Create sample user / groups
      UserGroup.create({ userId: user1.id, groupId: group1.id });
      UserGroup.create({ userId: user2.id, groupId: group1.id });
      UserGroup.create({ userId: user3.id, groupId: group1.id });
      UserGroup.create({ userId: user3.id, groupId: group2.id });
      UserGroup.create({ userId: user4.id, groupId: group2.id });
      UserGroup.create({ userId: user1.id, groupId: group3.id });

      // Add the owner of the group
      group1.setOwner(user1);
      group2.setOwner(user1);
      group3.setOwner(user4);
    });
};

module.exports = {
  models: {
    Group,
    User,
    UserGroup
  },
  sync,
  seed
};
