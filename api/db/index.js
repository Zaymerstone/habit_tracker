const { Role } = require("./models");
const { User } = require("./models");
const { Level } = require("./models");
const { UserAchievement } = require("./models");
const { Habit } = require("./models");
const { Mastery } = require("./models");

// найти юзеров с ролью админ
async function findUserByRole() {
  const users = await User.findAll({
    where: {
      roleId: 1,
    },
  });
  console.log("Users with roleId 1: ", users);
}

// найти всю информацию по userachievements где юзер = 1 внешний ключ
async function UserAchievementsByUser() {
  const user = await UserAchievement.findAll({
    where: {
      user: 1,
    },
  });
  console.log(user);
}

async function changeUsername() {
  await User.update(
    { username: "Username was changed" },
    {
      where: {
        username: "wondersome",
      },
    }
  );
  console.log("The username should be changed now");
}

async function addUserAchievement() {
  await UserAchievement.bulkCreate([
    {
      user: 1,
      habit: 1,
      mastery: 1,
    },
    {
      user: 2,
      habit: 2,
      mastery: 3,
    },
  ]);
}

async function addMastery() {
  await Mastery.bulkCreate([
    {
      title: "Bronze",
      streak_target: 7,
      img_url: "some picture from internet for bronze rank",
    },
    {
      title: "Silver",
      streak_target: 21,
      img_url: "some picture from internet for silver rank",
    },
    {
      title: "Gold",
      streak_target: 42,
      img_url: "some picture from internet for gold rank",
    },
  ]);
}

async function addHabit() {
  await Habit.bulkCreate([
    {
      name: "Drink 5L water daily",
      max_streak: 14,
      streak: 3,
    },
    {
      name: "10 push ups daily",
      max_streak: 5,
      streak: 5,
    },
  ]);
}

async function addLevel() {
  await Level.bulkCreate([
    {
      breakpoint: 15,
    },
    {
      breakpoint: 30,
    },
    {
      breakpoint: 45,
    },
    {
      breakpoint: 75,
    },
    {
      breakpoint: 120,
    },
    {
      breakpoint: 180,
    },
    {
      breakpoint: 255,
    },
  ]);
}

async function addUser() {
  await User.bulkCreate([
    {
      username: "John Doe",
      email: "john@gmail.com",
      image: "john's image",
      password_hash: "test",
      first_registration: new Date(),
      last_login: new Date(),
      level: 1,
      xp: 15,
      roleId: 2,
    },

    {
      username: "Jane Doe",
      email: "jane@gmail.com",
      image: "jane's image",
      password_hash: "jane's password",
      first_registration: new Date(),
      last_login: new Date(),
      level: 4,
      xp: 90,
      roleId: 2,
    },

    {
      username: "wondersome",
      email: "some_email@gmail.com",
      image: "some_image",
      password_hash: "hashed_password",
      first_registration: new Date(),
      last_login: new Date(),
      level: 6,
      xp: 195,
      roleId: 1,
    },
  ]);
}

// ADD ADMIN ROLE TO THE TABLE
// async function addRole(){
//     await Role.create({name: "admin"}, {name: "user"})

// }

async function addRole() {
  await Role.bulkCreate([
    {
      name: "admin",
    },
    {
      name: "user",
    },
  ]);
}
// addRole()
// addUser()
// addLevel()
// addHabit()
// addMastery()
// addUserAchievement()
// findUserByRole()
// UserAchievementsByUser()
// changeUsername()
