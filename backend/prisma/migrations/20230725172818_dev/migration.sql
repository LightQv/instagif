/*
  Warnings:

  - You are about to drop the `post_feeling` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `post_feeling` DROP FOREIGN KEY `post_feeling_ibfk_1`;

-- DropForeignKey
ALTER TABLE `post_feeling` DROP FOREIGN KEY `post_feeling_ibfk_2`;

-- DropForeignKey
ALTER TABLE `post_like` DROP FOREIGN KEY `post_like_ibfk_1`;

-- DropForeignKey
ALTER TABLE `post_like` DROP FOREIGN KEY `post_like_ibfk_2`;

-- DropTable
DROP TABLE `post_feeling`;

-- DropTable
DROP TABLE `post_like`;

-- CreateTable
CREATE TABLE `feeling` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `emoji` TEXT NOT NULL,
    `post_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `post_id`(`post_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO feeling (name, emoji, post_id, user_id) 
VALUES 
(
  "smiley",
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
  "smiley",
"1f603",
2,
2
);

-- CreateTable
CREATE TABLE `like` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `post_id`(`post_id`),
    INDEX `user_id`(`user_id`),
    UNIQUE INDEX `like_post_id_user_id_key`(`post_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO `like` (post_id, user_id) 
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
CREATE TABLE `follow` (
    `followerId` INTEGER NOT NULL,
    `followingId` INTEGER NOT NULL,

    PRIMARY KEY (`followerId`, `followingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `feeling` ADD CONSTRAINT `post_feeling_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `feeling` ADD CONSTRAINT `post_feeling_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `like` ADD CONSTRAINT `post_like_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `like` ADD CONSTRAINT `post_like_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `follow` ADD CONSTRAINT `follow_followerId_fkey` FOREIGN KEY (`followerId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `follow` ADD CONSTRAINT `follow_followingId_fkey` FOREIGN KEY (`followingId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
