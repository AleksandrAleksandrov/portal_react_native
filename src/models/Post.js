import Realm from 'realm';

class Post extends Realm.Object {}
Post.schema = {
  name: 'Post',
  properties: {
    id: 'int',
    user: 'int',
    message: 'Message',
    my_vote: { type: 'string', optional: true },
    is_favorite: 'bool',
    is_readed: 'bool',
    read_dt: { type: 'string', optional: true },
  },
};

class Message extends Realm.Object {}
Message.schema = {
  name: 'Message',
  properties: {
    id: 'int',
    is_actual: 'bool',
    title: 'string',
    text: 'string',
    comments_count: 'int',
    object_id: 'int',
    content_type: 'int',
    message_type: 'string',
    create_dt: 'string',
    edit_dt: 'string',
  },
};

class Option extends Realm.Object {}
Option.schema = {
  id: 'int',
  value: 'string',
  votes: 'int',
};

export default new Realm({ schema: [Post, Message] });
