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

class Option extends Realm.Object {}
Option.schema = {
  name: 'Option',
  properties: {
    id: 'int',
    value: 'string',
    votes: 'int',
  },
};

class Message extends Realm.Object {}
Message.schema = {
  name: 'Message',
  properties: {
    id: 'int',
    is_actual: 'bool',
    // options: { type: 'list', objectType: 'Option', optional: true, default: [] },
    // options: { type: 'Option[]', optional: true },
    author: { type: 'Author', optional: true },
    content_object: 'ContentObject',
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

class Author extends Realm.Object {}
Author.schema = {
  name: 'Author',
  properties: {
    id: 'int',
    first_name: 'string',
    last_name: 'string',
    photo: 'string',
    photo_thumbnail: 'string',
  },
};

class ContentObject extends Realm.Object {}
ContentObject.schema = {
  name: 'ContentObject',
  properties: {
    id: 'int',
    is_important: { type: 'bool', optional: true },
    relevance_dt: { type: 'string', optional: true },
    location: { type: 'string', optional: true },
    date_time: { type: 'string', optional: true },
    poll_end_date: { type: 'string', optional: true },
    location_url: { type: 'string', optional: true },
  },
};

export default new Realm({ schema: [Post, Message, Author, ContentObject] });
