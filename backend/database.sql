SET foreign_key_checks = 0;

DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id int primary key NOT NULL AUTO_INCREMENT,
    username varchar(100) UNIQUE NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    hashedPassword varchar(255) NOT NULL
)
ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO user (username, email, hashedPassword) 
VALUES 
(
"LightQv", 
"vivian@gmail.com", 
"$argon2id$v=19$m=65536,t=5,p=1$+8QKgBU+Z7zr2EVICuFDOg$74Nu7DWmpa/+VW7543Xm28gd+ATVrhtCV2lAakJ4i+A"
),
(
"Tun4", 
"jim.halpert@gmail.com", 
"$argon2id$v=19$m=65536,t=5,p=1$+8QKgBU+Z7zr2EVICuFDOg$74Nu7DWmpa/+VW7543Xm28gd+ATVrhtCV2lAakJ4i+A"
),
(
"TheB0ss", 
"michael.scott@gmail.com", 
"$argon2id$v=19$m=65536,t=5,p=1$+8QKgBU+Z7zr2EVICuFDOg$74Nu7DWmpa/+VW7543Xm28gd+ATVrhtCV2lAakJ4i+A"
),
(
"AssistRegMng", 
"dwight.schultz@gmail.com", 
"$argon2id$v=19$m=65536,t=5,p=1$+8QKgBU+Z7zr2EVICuFDOg$74Nu7DWmpa/+VW7543Xm28gd+ATVrhtCV2lAakJ4i+A"
);

DROP TABLE IF EXISTS post;
CREATE TABLE post (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  gif_url TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT NOW(),
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
  ON DELETE CASCADE
)
ENGINE=InnoDB DEFAULT CHARSET = utf8;

INSERT INTO post (title, gif_url, created_at, user_id) 
VALUES 
(
"Too much at work...", 
"https://media.giphy.com/media/hyyV7pnbE0FqLNBAzs/giphy.gif", 
"2023-07-16 15:12:22", 
1
),
(
"Looking at my to-do list.", 
"https://media.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif", 
"2023-07-15 10:22:42", 
2
),
(
"Where are my keys ?", 
"https://media.giphy.com/media/NS7gPxeumewkWDOIxi/giphy.gif", 
"2023-07-13 21:00:00", 
1
),
(
"I'm the boss!", 
"https://media.giphy.com/media/buE4eDkXkpWYZIAyVB/giphy.gif", 
"2023-07-18 11:23:45", 
4
),
(
"Hey, have a good day !", 
"https://media.giphy.com/media/xTiIzJSKB4l7xTouE8/giphy.gif", 
"2023-07-20 21:23:45", 
1
),
(
"Parkour !", 
"https://media.giphy.com/media/DoCIC5Pxp57qg/giphy.gif", 
"2023-07-20 21:55:45", 
3
);

DROP TABLE IF EXISTS post_like;
CREATE TABLE post_like (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  post_id INT NOT NULL,
  FOREIGN KEY (post_id) REFERENCES post(id),
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
)
ENGINE=InnoDB DEFAULT CHARSET = utf8;

INSERT INTO post_like (post_id, user_id) 
VALUES 
(
1,
1
),
(
2,
1
);

DROP TABLE IF EXISTS post_feeling;
CREATE TABLE post_feeling (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  type TEXT NOT NULL,
  post_id INT NOT NULL,
  FOREIGN KEY (post_id) REFERENCES post(id),
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
)
ENGINE=InnoDB DEFAULT CHARSET = utf8;

INSERT INTO post_feeling (type, post_id, user_id) 
VALUES 
(
"Cool!", 
1,
1
),
(
"Top!", 
1,
2
);

SET foreign_key_checks = 1;