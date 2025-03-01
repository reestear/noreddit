-- Create a New User with a Profile
DELIMITER $$
CREATE PROCEDURE sp_create_user(
    IN p_username VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_is_admin BOOLEAN,
    IN p_bio TEXT,
    IN p_profile_image_url VARCHAR(255)
)
BEGIN
    DECLARE new_user_id INT;

    START TRANSACTION;
    
    -- Insert user record
    INSERT INTO `User` (username, email, password, is_admin)
    VALUES (p_username, p_email, p_password, p_is_admin);
    
    SET new_user_id = LAST_INSERT_ID();
    
    -- Insert corresponding user profile record
    INSERT INTO UserProfile (user_id, bio, profile_image_url)
    VALUES (new_user_id, p_bio, p_profile_image_url);
    
    COMMIT;
    
    SELECT new_user_id AS user_id;
END$$
DELIMITER ;

-- Create a New Post

DELIMITER $$
CREATE PROCEDURE sp_create_post(
    IN p_subreddit_id INT,
    IN p_user_id INT,
    IN p_title VARCHAR(255),
    IN p_description_doc_id VARCHAR(255)
)
BEGIN
    DECLARE new_post_id INT;
    
    START TRANSACTION;
    
    INSERT INTO Post (subreddit_id, user_id, title, description_doc_id)
    VALUES (p_subreddit_id, p_user_id, p_title, p_description_doc_id);
    
    SET new_post_id = LAST_INSERT_ID();
    
    COMMIT;
    
    SELECT new_post_id AS post_id;
END$$
DELIMITER ;

-- Create a New Comment

DELIMITER $$
CREATE PROCEDURE sp_create_comment(
    IN p_post_id INT,
    IN p_user_id INT,
    IN p_parent_comment_id INT,
    IN p_description_doc_id VARCHAR(255)
)
BEGIN
    DECLARE new_comment_id INT;
    
    START TRANSACTION;
    
    INSERT INTO Comment (post_id, user_id, parent_comment_id, description_doc_id)
    VALUES (p_post_id, p_user_id, p_parent_comment_id, p_description_doc_id);
    
    SET new_comment_id = LAST_INSERT_ID();
    
    COMMIT;
    
    SELECT new_comment_id AS comment_id;
END$$
DELIMITER ;

-- Cast a Vote

DELIMITER $$
CREATE PROCEDURE sp_create_vote(
    IN p_user_id INT,
    IN p_post_id INT,
    IN p_comment_id INT,
    IN p_vote_type ENUM('up', 'down')
)
BEGIN
    -- Validate that vote is applied to exactly one target
    IF (p_post_id IS NOT NULL AND p_comment_id IS NOT NULL)
       OR (p_post_id IS NULL AND p_comment_id IS NULL) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Vote must apply to exactly one target: either post or comment';
    END IF;
    
    INSERT INTO Vote (user_id, post_id, comment_id, vote_type)
    VALUES (p_user_id, p_post_id, p_comment_id, p_vote_type);
    
    SELECT LAST_INSERT_ID() AS vote_id;
END$$
DELIMITER ;

-- Update a User Profile
DELIMITER $$
CREATE PROCEDURE sp_update_user_profile(
    IN p_user_id INT,
    IN p_bio TEXT,
    IN p_profile_image_url VARCHAR(255)
)
BEGIN
    UPDATE UserProfile
    SET bio = p_bio,
        profile_image_url = p_profile_image_url
    WHERE user_id = p_user_id;
    
    SELECT ROW_COUNT() AS rows_updated;
END$$
DELIMITER ;

-- Retrieve Posts by Subreddit
DELIMITER $$
CREATE PROCEDURE sp_get_posts_by_subreddit(
    IN in_subreddit_id INT
)
BEGIN
    SELECT p.post_id, p.title, p.description_doc_id, p.created_at,
           u.username
    FROM Post p
    JOIN `User` u ON p.user_id = u.user_id
    WHERE p.subreddit_id = in_subreddit_id
    ORDER BY p.created_at DESC;
END$$
DELIMITER ;


