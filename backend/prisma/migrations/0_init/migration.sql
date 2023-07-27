-- CreateTable
CREATE TABLE `post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `gif_url` TEXT NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `user_id` INTEGER NOT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `post_feeling` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `emoji` TEXT NOT NULL,
    `post_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `post_id`(`post_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO post_feeling (name, emoji, post_id, user_id) 
VALUES 
(
  "gin",
"1f603",
1,
1
),
(
  "heart",
"2764-fe0f",
2,
1
),
(
  "gin",
"1f603",
2,
2
);

-- CreateTable
CREATE TABLE `post_like` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `post_id`(`post_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `hashedPassword` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `username`(`username`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `post_feeling` ADD CONSTRAINT `post_feeling_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `post_feeling` ADD CONSTRAINT `post_feeling_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `post_like` ADD CONSTRAINT `post_like_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `post_like` ADD CONSTRAINT `post_like_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

