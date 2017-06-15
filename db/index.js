const conn = require('./conn');
const faker = require('faker');

const User = require('./user');
const Group = require('./group');
const UserGroup = require('./userGroup');
const UserLocation = require('./userLocations');


Group.belongsTo(User, { as: 'owner' });


UserGroup.belongsTo(User, { onDelete: 'CASCADE' });
UserGroup.belongsTo(Group, { onDelete: 'CASCADE' });
User.hasMany(UserGroup);
Group.hasMany(UserGroup);

User.hasMany(UserLocation);

const sync = () => conn.sync({ force: true });

const seed = () => {
  const groups = ['group1', 'group2', 'group3'];
  const users = [
    { name: 'Summer', email: 'summergun10@gmail.com' },
    { name: 'Evan', email: 'evan@evan.com' },
    { name: 'Arum', email: 'arumbit@gmail.com' },
    { name: 'Mauro', email: 'mrestuccia@mac.com' }
  ];
  const userlocations = [{name:'Home', lat:'40.7502672', long:'-73.9764766', userId:'1'},
  {name:'Work', lat:'40.749686', long:'-73.977407', userId:'2'}];
  let group1, group2, group3, user1, user2, user3, user4;

  return sync()
    .then(() => {
      const promises = groups.map(name => Group.create({ name }))
        .concat(users.map(user => {
          return User.create({
            name: user.name,
            email: user.email,
            password: user.name.toUpperCase(),
            lat: faker.finance.amount(40.75,40.76,5),
            long: faker.finance.amount(-73.95,-74.04,5)
          });
        }));
      return Promise.all(promises);
    })
    .then(result => {
      [group1, group2, group3, user1, user2, user3, user4] = result;

      // Create sample user / groups
      UserGroup.create({ userId: user1.id, groupId: group1.id, status: 'confirmed' });
      UserGroup.create({ userId: user2.id, groupId: group1.id, status: 'confirmed' });
      UserGroup.create({ userId: user3.id, groupId: group1.id, status: 'confirmed' });
      UserGroup.create({ userId: user3.id, groupId: group2.id, status: 'confirmed' });
      UserGroup.create({ userId: user4.id, groupId: group1.id, status: 'confirmed' });
      UserGroup.create({ userId: user4.id, groupId: group2.id, status: 'confirmed' });
      UserGroup.create({ userId: user1.id, groupId: group3.id, status: 'confirmed' });

     // UserLocation.create({name:'Home', lat:'40.7502672', long:'-73.9764766', userId:'1'});
       UserLocation.bulkCreate(userlocations)
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
    UserGroup,
    UserLocation
  },
  sync,
  seed
};
