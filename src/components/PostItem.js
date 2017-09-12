import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Moment from 'moment';

class PostItem extends Component {
getIcon(message_type) {
  switch(message_type) {
    case "advert":
      return <Icon name="bullhorn" style={styles.iconStyle} />;
    case "event":
      return <Icon name="users" style={styles.iconStyle} />;
    case "poll":
      return <Icon name="tasks" style={styles.iconStyle} />; 
    case "remind":
      return <Icon name="calendar" style={styles.iconStyle} />;
  }
}

getStart(is_favorite) {
  if (is_favorite)
    return <Icon name="star" style={styles.startStyle} />;
  else
    return <Icon name="star-o" style={styles.startStyle} />;
}

render() {
  const { is_favorite } = this.props.post;
  const { title, text, message_type, create_dt, author } = this.props.post.message;
  return (
    <View>
      <CardSection >
        <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{ flexDirection: 'row', flex: 4 }}>
            {this.getIcon(message_type)}
            <Text
              style={{ marginTop: 5, flex: 1 }}
              numberOfLines={3}
            >
              {title}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}>
            {this.getStart(is_favorite)}
          </View>
        </View>
          <View>
            <Text numberOfLines={4} >{text}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              <Text>{author.first_name} {author.last_name}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <Text>{Moment(create_dt).format('kk:mm DD MMM YYYY')}</Text>
            </View>
          </View>
        </View>
      </CardSection>
    </View>
  );
}
}

const styles = {
  iconStyle: {
    fontSize: 32,
    margin: 10
  },
  startStyle: {
    fontSize: 32,
    margin: 10
  }
};

export default PostItem;
