import React, { Component } from 'react';
import { View, Modal, TouchableWithoutFeedback } from 'react-native';
import { CardSection, Card } from './';
import { TextCustom} from "./TextCustom";
import { setAdvert, setEvent, setPoll, getFilteredPosts } from '../../actions';
import { InputAndroid  } from "./";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
  ADVERT,
  POLL,
  EVENT,
} from '../../Constants';

const styles = {
  cardSectionStyle: {
    justifyContent: 'center',
  },
  textStyle: {
    margin: 20,
    flexDirection: 'row',
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  },
  elementContainer: {
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
  },
  iconStyle: {
    fontSize: 32,
    marginRight: 10,
  },
};

class DialogFilterBy extends Component {

  isChecked(checked) {
    if (checked) {
      return <Icon name="check-square-o" style={styles.iconStyle} />;
    }
    return <Icon name="square-o" style={styles.iconStyle} />;
  }

  onAdvert() {
    this.props.onDecline();
    this.props.dispatch(setAdvert(!this.props.sortByAdvert));
    this.props.dispatch(getFilteredPosts(this.createQuery()));
  }

  onPoll() {
    this.props.onDecline();
    this.props.dispatch(setPoll(!this.props.sortByPoll));
    this.props.dispatch(getFilteredPosts(this.createQuery()));
  }

  onEvent() {
    this.props.onDecline();
    this.props.dispatch(setEvent(!this.props.sortByEvent));
    this.props.dispatch(getFilteredPosts(this.createQuery()));
  }

  createQuery() {
    var mySet = new Set();
    if (this.props.sortByAdvert) {
      mySet.add(ADVERT);
    } else {
      mySet.delete(ADVERT);
    }

    if (this.props.sortByPoll) {
      mySet.add(POLL);
    } else {
      mySet.delete(POLL);
    }

    if (this.props.sortByEvent) {
      mySet.add(EVENT);
    } else {
      mySet.delete(EVENT);
    }
    return Array.from(mySet);
  }

  render () {
    return (

      <Modal
        visible={this.props.visible}
        transparent
        onRequestClose={() => {}}>

        <TouchableWithoutFeedback onPress={this.props.onDecline}>
          <View style={styles.containerStyle} >
            <TouchableWithoutFeedback onPress={() => {}} >
              <View style={{ marginLeft: 30, marginRight: 30,}} >
                <Card style={{borderRadius: 15}}>
                  <CardSection style={{flexDirection: 'column'}}>
                    <TouchableWithoutFeedback onPress={this.onAdvert.bind(this)}>
                      <View style={styles.textStyle}>
                        {this.isChecked(this.props.sortByAdvert)}
                        <TextCustom type={'sortBy'}>Объявления</TextCustom>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.onPoll.bind(this)}>
                      <View style={styles.textStyle}>
                        {this.isChecked(this.props.sortByPoll)}
                        <TextCustom type={'sortBy'} >Опросы</TextCustom>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.onEvent.bind(this)}>
                      <View style={styles.textStyle}>
                        {this.isChecked(this.props.sortByEvent)}
                        <TextCustom type={'sortBy'} >События</TextCustom>
                      </View>
                    </TouchableWithoutFeedback>
                  </CardSection>
                </Card>
              </View>
            </TouchableWithoutFeedback>
          </View>

        </TouchableWithoutFeedback>

      </Modal>
    );
  }
}

export { DialogFilterBy };
