import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { TextCustom, CustomIcons, LabelImportant, LabelNew } from './';
import { onStarPressed } from '../../actions';

const styles = {
  titleTextStyle: {
    marginLeft: 15,
    flex: 1,
  },
  bodyTextStyle: {
    fontSize: 32,
    margin: 10,
  },
  rootViewStyle: {
    flex: 1,
  },
  headerViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textViewWrapper: {
    flexDirection: 'row',
    flex: 4,
    margin: 10,
  },
  starViewWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    margin: 10,
  },
  authorViewWrapper: {
    flexDirection: 'row',
    marginTop: 10,
  },
  authorView: {
    flex: 1,
  },
  dateViewWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
};

const renderLabel = (post) => {
  if (post.message.content_object !== null & post.message.content_object.is_important && post.message.is_actual) {
    return (<LabelImportant />);
  } else if (!post.is_readed | (!post.is_readed && !post.message.is_actual)) {
    return (<LabelNew />);
  }
  return null;
};

const PostHeader = ({ post, id, pressedStarId, onStarPressed }) => (
  <View>
    <View style={styles.headerViewStyle}>
      <View style={styles.textViewWrapper}>
        {CustomIcons.getPostIcon(post.message.message_type)}
        <TextCustom
          type={'t1_light'}
          style={styles.titleTextStyle}
          numberOfLines={3}
        >
          {post.message.title}
        </TextCustom>
      </View>
      <View style={styles.starViewWrapper}>
        <TouchableWithoutFeedback onPress={() => {
          if (pressedStarId[id] === undefined) {
            onStarPressed(id, !post.is_favorite);
          }
        }}
        >
          {CustomIcons.getStart(post.is_favorite)}
        </TouchableWithoutFeedback>
      </View>
    </View>
    {renderLabel(post)}
  </View>
);


const mapStateToProps = (state) => {
  const { pressedStarId } = state.postsList;

  return { pressedStarId };
};

const mapDispatchToProps = (dispatch) => ({
  onStarPressed: (id, isFavourite) => { dispatch(onStarPressed(id, isFavourite)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostHeader);
