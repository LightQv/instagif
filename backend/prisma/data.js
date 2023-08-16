const users = [
  {
    username: "LightQv",
    email: "vivian@gmail.com",
    hashedPassword:
      "$argon2id$v=19$m=65536,t=5,p=1$+8QKgBU+Z7zr2EVICuFDOg$74Nu7DWmpa/+VW7543Xm28gd+ATVrhtCV2lAakJ4i+A",
  },
  {
    username: "Tun4",
    email: "jim.halpert@gmail.com",
    hashedPassword:
      "$argon2id$v=19$m=65536,t=5,p=1$+8QKgBU+Z7zr2EVICuFDOg$74Nu7DWmpa/+VW7543Xm28gd+ATVrhtCV2lAakJ4i+A",
  },
  {
    username: "TheB0ss",
    email: "michael.scott@gmail.com",
    hashedPassword:
      "$argon2id$v=19$m=65536,t=5,p=1$+8QKgBU+Z7zr2EVICuFDOg$74Nu7DWmpa/+VW7543Xm28gd+ATVrhtCV2lAakJ4i+A",
  },
  {
    username: "AssistRegMng",
    email: "dwight.schultz@gmail.com",
    hashedPassword:
      "$argon2id$v=19$m=65536,t=5,p=1$+8QKgBU+Z7zr2EVICuFDOg$74Nu7DWmpa/+VW7543Xm28gd+ATVrhtCV2lAakJ4i+A",
  },
];

const posts = [
  {
    title: "Too much at work...",
    gif_url: "https://media.giphy.com/media/hyyV7pnbE0FqLNBAzs/giphy.gif",
    created_at: new Date("2023-07-16 15:12:22"),
    user_id: 1,
  },
  {
    title: "Looking at my to-do list.",
    gif_url: "https://media.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif",
    created_at: new Date("2023-07-15 10:22:42"),
    user_id: 2,
  },
  {
    title: "Where are my keys ?",
    gif_url: "https://media.giphy.com/media/NS7gPxeumewkWDOIxi/giphy.gif",
    created_at: new Date("2023-07-13 21:00:00"),
    user_id: 1,
  },
  {
    title: "I'm the boss!",
    gif_url: "https://media.giphy.com/media/buE4eDkXkpWYZIAyVB/giphy.gif",
    created_at: new Date("2023-07-18 11:23:45"),
    user_id: 4,
  },
  {
    title: "Hey, have a good day !",
    gif_url: "https://media.giphy.com/media/xTiIzJSKB4l7xTouE8/giphy.gif",
    created_at: new Date("2023-07-20 21:23:45"),
    user_id: 1,
  },
  {
    title: "Parkour !",
    gif_url: "https://media.giphy.com/media/DoCIC5Pxp57qg/giphy.gif",
    created_at: new Date("2023-07-20 21:55:45"),
    user_id: 3,
  },
];

const likes = [
  {
    post_id: 1,
    user_id: 1,
  },
  {
    post_id: 2,
    user_id: 1,
  },
];

const feelings = [
  {
    name: "gin",
    emoji: "1f603",
    post_id: 1,
    user_id: 1,
  },
  {
    name: "heart",
    emoji: "2764-fe0f",
    post_id: 2,
    user_id: 1,
  },
  {
    name: "gin",
    emoji: "1f603",
    post_id: 2,
    user_id: 2,
  },
];

module.exports = {
  users,
  posts,
  likes,
  feelings,
};
