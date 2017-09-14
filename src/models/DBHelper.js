import Post from './Post';

const clearPosts = () => {
  Post.write(() => {
    const posts = Post.objects('Post');
    Post.delete(posts);
  });
};

const writePostsToDB = (postsArray) => {
  postsArray.forEach((post) => {
    Post.write(() => {
      Post.create('Message', {
        id: post.message.id,
        is_actual: post.message.is_actual,
        title: post.message.title,
        text: post.message.text,
        comments_count: post.message.comments_count,
        message_type: post.message.message_type,
        create_dt: post.message.create_dt,
        edit_dt: post.message.edit_dt,
        object_id: post.message.object_id,
        content_type: post.message.content_type,
      });
      const r = Post.objects('Message').filtered(`id == ${post.message.id}`);
      Post.create('Post', {
        id: post.id,
        user: post.user,
        message: r[0],
        my_vote: post.my_vote,
        is_favorite: post.is_favorite,
        is_readed: post.is_readed,
        read_dt: post.read_dt,
      });
    });
  });
};

const DBHelper = {
  clearPosts,
  writePostsToDB,
};

export default DBHelper;
