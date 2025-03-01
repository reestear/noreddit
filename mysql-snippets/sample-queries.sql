-- 1. User Registration: Insert a new user
INSERT INTO `User` (username, email, password, is_admin)
VALUES ('johndoe', 'johndoe@example.com', 'hashed_password', 0);

-- Capture the new user's ID for subsequent queries
SET @user_id = LAST_INSERT_ID();

-- 2. Create UserProfile for the newly registered user
INSERT INTO UserProfile (user_id, bio, profile_image_url)
VALUES (@user_id, 'Hello, I am John Doe!', 'http://example.com/images/johndoe.png');

-- 3. Create a new Subreddit
INSERT INTO Subreddit (name, description, profile_image_url)
VALUES ('AwesomeSub', 'A place to share awesome things', 'http://example.com/images/awesomesub.png');

-- Capture the new subreddit's ID
SET @subreddit_id = LAST_INSERT_ID();

-- 4. Add the user as a moderator for the new Subreddit
INSERT INTO SubredditModerator (subreddit_id, user_id)
VALUES (@subreddit_id, @user_id);

-- 5. Create a new Post in the subreddit.
-- Assume the long-form post content is stored in a NoSQL document with an id 'doc12345'.
INSERT INTO Post (subreddit_id, user_id, title, description_doc_id)
VALUES (@subreddit_id, @user_id, 'My First Post', 'doc12345');

-- Capture the new post's ID
SET @post_id = LAST_INSERT_ID();

-- 6. Add a Comment to the Post.
-- The actual comment content is stored in a NoSQL document with an id 'doc67890'.
INSERT INTO Comment (post_id, user_id, description_doc_id)
VALUES (@post_id, @user_id, 'doc67890');

-- Capture the new comment's ID
SET @comment_id = LAST_INSERT_ID();

-- 7. Reply to the Comment (Nested Comment)
INSERT INTO Comment (post_id, user_id, parent_comment_id, description_doc_id)
VALUES (@post_id, @user_id, @comment_id, 'doc78901');

-- 8. Vote on a Post: Insert an upvote for the post
INSERT INTO Vote (user_id, post_id, vote_type)
VALUES (@user_id, @post_id, 'up');

-- 9. Vote on a Comment: Insert a downvote for the comment
INSERT INTO Vote (user_id, comment_id, vote_type)
VALUES (@user_id, @comment_id, 'down');

-- 10. Update a UserProfile (simulate a profile update; updated_at auto-updates)
UPDATE UserProfile
SET bio = 'Updated bio: I love participating in discussions!',
    profile_image_url = 'http://example.com/images/johndoe_updated.png'
WHERE user_id = @user_id;

-- 11. Delete a Comment (will cascade delete nested replies if any)
DELETE FROM Comment
WHERE comment_id = @comment_id;

-- 12. Fetch Posts with their Comments for a specific Subreddit
SELECT p.post_id, p.title, p.created_at,
       c.comment_id, c.description_doc_id, c.created_at AS comment_created_at
FROM Post p
LEFT JOIN Comment c ON p.post_id = c.post_id
WHERE p.subreddit_id = @subreddit_id;

-- 13. Fetch Subreddit Details along with its Moderators' information
SELECT s.subreddit_id, s.name, s.description, s.profile_image_url,
       u.user_id, u.username, u.email
FROM Subreddit s
JOIN SubredditModerator sm ON s.subreddit_id = sm.subreddit_id
JOIN `User` u ON sm.user_id = u.user_id
WHERE s.subreddit_id = @subreddit_id;
