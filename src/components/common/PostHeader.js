import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { TextCustom } from './TextCustom';
import { CustomIcons } from './CustomIcons';
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

// ({ id, messageType, title, isFavorite, dispatch, pressedStarId }) => means this.props......
const PostHeader = ({ id, messageType, title, isFavorite, dispatch, pressedStarId }) => {
  onStarPress = () => {
    if (pressedStarId[id] === undefined) {
      dispatch(onStarPressed(id, !isFavorite));
    }
  };
  return (
    <View style={styles.headerViewStyle}>
      <View style={styles.textViewWrapper}>
        {CustomIcons.getPostIcon(messageType)}
        <TextCustom
          type={'t1_light'}
          style={styles.titleTextStyle}
          numberOfLines={3}
        >
          {title}
        </TextCustom>
      </View>
      <View style={styles.starViewWrapper}>
        <TouchableWithoutFeedback onPress={this.onStarPress}>
          {CustomIcons.getStart(isFavorite)}
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  const { post, error, pressedStarId } = state.postsList;

  return { post, error, pressedStarId };
};


export default connect(mapStateToProps)(PostHeader);
