-- Create User table
CREATE TABLE `User` (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create UserProfile table (one-to-one with User)
CREATE TABLE UserProfile (
    user_profile_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    bio TEXT,
    profile_image_url VARCHAR(255),
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_userprofile_user FOREIGN KEY (user_id) REFERENCES `User`(user_id)
        ON DELETE CASCADE
);

-- Create Subreddit table
CREATE TABLE Subreddit (
    subreddit_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    profile_image_url VARCHAR(255),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create SubredditModerator table (composite key)
CREATE TABLE SubredditModerator (
    subreddit_id INT NOT NULL,
    user_id INT NOT NULL,
    assigned_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (subreddit_id, user_id),
    CONSTRAINT fk_subredditmoderator_subreddit FOREIGN KEY (subreddit_id) REFERENCES Subreddit(subreddit_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_subredditmoderator_user FOREIGN KEY (user_id) REFERENCES `User`(user_id)
        ON DELETE CASCADE
);

-- Create Post table (references NoSQL for post content via description_doc_id)
CREATE TABLE Post (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    subreddit_id INT NOT NULL,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description_doc_id VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_post_subreddit FOREIGN KEY (subreddit_id) REFERENCES Subreddit(subreddit_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_post_user FOREIGN KEY (user_id) REFERENCES `User`(user_id)
        ON DELETE CASCADE
);

-- Create Comment table (allows nested comments via self-referencing parent_comment_id)
CREATE TABLE Comment (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    parent_comment_id INT DEFAULT NULL,
    description_doc_id VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comment_post FOREIGN KEY (post_id) REFERENCES Post(post_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_comment_user FOREIGN KEY (user_id) REFERENCES `User`(user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_comment_parent FOREIGN KEY (parent_comment_id) REFERENCES Comment(comment_id)
        ON DELETE CASCADE
);

-- Create Vote table (each vote applies to either a post or a comment)
CREATE TABLE Vote (
    vote_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT DEFAULT NULL,
    comment_id INT DEFAULT NULL,
    vote_type ENUM('up', 'down') NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_vote_user FOREIGN KEY (user_id) REFERENCES `User`(user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_vote_post FOREIGN KEY (post_id) REFERENCES Post(post_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_vote_comment FOREIGN KEY (comment_id) REFERENCES Comment(comment_id)
        ON DELETE CASCADE,
    CHECK ((post_id IS NOT NULL AND comment_id IS NULL) OR (post_id IS NULL AND comment_id IS NOT NULL))
);
