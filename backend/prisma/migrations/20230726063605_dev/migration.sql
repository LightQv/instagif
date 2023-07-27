-- DropForeignKey
ALTER TABLE `feeling` DROP FOREIGN KEY `post_feeling_ibfk_1`;

-- DropForeignKey
ALTER TABLE `feeling` DROP FOREIGN KEY `post_feeling_ibfk_2`;

-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `post_like_ibfk_1`;

-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `post_like_ibfk_2`;

-- AddForeignKey
ALTER TABLE `feeling` ADD CONSTRAINT `feeling_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `feeling` ADD CONSTRAINT `feeling_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `like` ADD CONSTRAINT `like_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `like` ADD CONSTRAINT `ike_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
