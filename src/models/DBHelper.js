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
      if (post.message.author) {
        Post.create('Author', {
          id: post.message.author.id,
          first_name: post.message.author.first_name,
          last_name: post.message.author.last_name,
          photo: post.message.author.photo,
          photo_thumbnail: post.message.author.photo_thumbnail,
        });
      }

      Post.create('ContentObject', {
        id: post.message.content_object.id,
        is_important: post.message.content_object.is_important,
        relevance_dt: post.message.content_object.relevance_dt,
        location: post.message.content_object.location,
        date_time: post.message.content_object.date_time,
        poll_end_date: post.message.content_object.poll_end_date,
        location_url: post.message.content_object.location_url,
      });
      // let opt = [];
      // if (post.message.options.length !== 0) {
      //   post.message.options.forEach((object, index) => {
      //     console.log('writePostsToDB', object);
      //     Post.create('Option', {
      //       id: object.id,
      //       value: object.value,
      //       votes: object.votes,
      //     });
      //   });
      // }
      // opt = post.message.options;

      // opt = Post.objects('Option');
      Post.create('Message', {
        id: post.message.id,
        is_actual: post.message.is_actual,
        // options: opt[0],
        author: post.message.author,
        content_object: post.message.content_object,
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
