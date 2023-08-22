const users = [
  {
    username: "LightQv",
    email: "QVivian23@gmail.com",
    hashedPassword:
      "$argon2id$v=19$m=65536,t=5,p=1$+8QKgBU+Z7zr2EVICuFDOg$74Nu7DWmpa/+VW7543Xm28gd+ATVrhtCV2lAakJ4i+A",
    passwordToken: null,
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/instagif-8d24a.appspot.com/o/avatars%2Fcf9ede7c-f475-4f2e-92be-ba1149d69436LightQv?alt=media&token=b0083c63-6fea-48d7-80ba-d70ce101477b",
  },
  {
    username: "BigTun4",
    email: "jim.halpert@gmail.com",
    hashedPassword:
      "$argon2id$v=19$m=65536,t=5,p=1$+8QKgBU+Z7zr2EVICuFDOg$74Nu7DWmpa/+VW7543Xm28gd+ATVrhtCV2lAakJ4i+A",
    passwordToken: null,
    avatar: null,
  },
  {
    username: "TheB0ss",
    email: "michael.scott@gmail.com",
    hashedPassword:
      "$argon2id$v=19$m=65536,t=5,p=1$+8QKgBU+Z7zr2EVICuFDOg$74Nu7DWmpa/+VW7543Xm28gd+ATVrhtCV2lAakJ4i+A",
    passwordToken: null,
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/instagif-8d24a.appspot.com/o/avatars%2Fc86ae64d-7682-44a4-be5e-d7ec04f8f8c0TheB0ss?alt=media&token=ad05c4ed-dae8-483c-8af9-b71dfc658a39",
  },
  {
    username: "AssistRegMng",
    email: "dwight.schultz@gmail.com",
    hashedPassword:
      "$argon2id$v=19$m=65536,t=5,p=1$+8QKgBU+Z7zr2EVICuFDOg$74Nu7DWmpa/+VW7543Xm28gd+ATVrhtCV2lAakJ4i+A",
    passwordToken: null,
    avatar: null,
  },
];

const posts = [
  {
    title: "Too much at work...",
    gif_url: "https://media.giphy.com/media/hyyV7pnbE0FqLNBAzs/giphy.gif",
    created_at: new Date("2023-08-02 15:12:22"),
    user_id: 1,
  },
  {
    title: "Looking at my to-do list.",
    gif_url: "https://media.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif",
    created_at: new Date("2023-08-09 10:22:42"),
    user_id: 2,
  },
  {
    title: "Where are my keys ?",
    gif_url: "https://media.giphy.com/media/NS7gPxeumewkWDOIxi/giphy.gif",
    created_at: new Date("2023-08-11 21:00:00"),
    user_id: 1,
  },
  {
    title: "I'm the boss!",
    gif_url: "https://media.giphy.com/media/buE4eDkXkpWYZIAyVB/giphy.gif",
    created_at: new Date("2023-08-12 11:23:45"),
    user_id: 4,
  },
  {
    title: "Hey, have a good day !",
    gif_url: "https://media.giphy.com/media/xTiIzJSKB4l7xTouE8/giphy.gif",
    created_at: new Date("2023-08-14 21:23:45"),
    user_id: 1,
  },
  {
    title: "Parkour !",
    gif_url: "https://media.giphy.com/media/DoCIC5Pxp57qg/giphy.gif",
    created_at: new Date("2023-08-16 21:55:45"),
    user_id: 3,
  },
  {
    title: "Nice job everyone.",
    gif_url: "https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif",
    created_at: new Date("2023-08-16 23:15:31"),
    user_id: 3,
  },
  {
    title: "This position is mine...",
    gif_url: "https://media.giphy.com/media/3o84sq21TxDH6PyYms/giphy.gif",
    created_at: new Date("2023-08-17 11:02:12"),
    user_id: 4,
  },
];

const likes = [
  {
    post_id: 1,
    user_id: 2,
  },
  {
    post_id: 1,
    user_id: 3,
  },
  {
    post_id: 2,
    user_id: 1,
  },
  {
    post_id: 1,
    user_id: 4,
  },
  {
    post_id: 2,
    user_id: 1,
  },
  {
    post_id: 4,
    user_id: 1,
  },
  {
    post_id: 6,
    user_id: 1,
  },
  {
    post_id: 6,
    user_id: 3,
  },
  {
    post_id: 7,
    user_id: 3,
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
    post_id: 1,
    user_id: 2,
  },
  {
    name: "gin",
    emoji: "1f603",
    post_id: 6,
    user_id: 3,
  },
  {
    name: "gin",
    emoji: "1f603",
    post_id: 7,
    user_id: 3,
  },
  {
    name: "heart",
    emoji: "2764-fe0f",
    post_id: 8,
    user_id: 1,
  },
];

const follows = [
  {
    followerId: 1,
    followingId: 2,
  },
  {
    followerId: 1,
    followingId: 3,
  },
  {
    followerId: 2,
    followingId: 1,
  },
  {
    followerId: 3,
    followingId: 1,
  },
  {
    followerId: 4,
    followingId: 2,
  },
  {
    followerId: 4,
    followingId: 3,
  },
];

module.exports = {
  users,
  posts,
  likes,
  feelings,
  follows,
};
