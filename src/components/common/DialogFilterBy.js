import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    this.props.dispatch(setAdvert(!this.props.sortByAdvert)).then(() => {
      this.props.dispatch(getFilteredPosts(this.createQuery()));
      this.props.onDecline();
    });
  }

  onPoll() {
    this.props.dispatch(setPoll(!this.props.sortByPoll)).then(() => {
      this.props.dispatch(getFilteredPosts(this.createQuery()));
      this.props.onDecline();
    });
  }

  onEvent() {
    this.props.dispatch(setEvent(!this.props.sortByEvent)).then(() => {
      this.props.dispatch(getFilteredPosts(this.createQuery()));
      this.props.onDecline();
    });
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
    const { showSortBy, sortByAdvert, sortByPoll, sortByEvent } = this.props;
    const { textStyle } = styles;
    return (

      <Modal
        visible={showSortBy}
        transparent
        onRequestClose={() => {}}>

        <TouchableWithoutFeedback onPress={this.props.onDecline}>
          <View style={styles.containerStyle} >
            <TouchableWithoutFeedback onPress={() => {}} >
              <View style={{ marginLeft: 30, marginRight: 30,}} >
                <Card style={{borderRadius: 15}}>
                  <CardSection style={{flexDirection: 'column'}}>
                    <TouchableWithoutFeedback onPress={this.onAdvert.bind(this)}>
                      <View style={textStyle}>
                        {this.isChecked(sortByAdvert)}
                        <TextCustom type={'sortBy'}>Объявления</TextCustom>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.onPoll.bind(this)}>
                      <View style={textStyle}>
                        {this.isChecked(sortByPoll)}
                        <TextCustom type={'sortBy'} >Опросы</TextCustom>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.onEvent.bind(this)}>
                      <View style={textStyle}>
                        {this.isChecked(sortByEvent)}
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

const mapStateToProps = state => ({
  showSortBy: state.postsList.showSortBy,
  sortByAdvert: state.postsList.sortByAdvert,
  sortByPoll: state.postsList.sortByPoll,
  sortByEvent: state.postsList.sortByEvent,
});

export default connect(mapStateToProps)(DialogFilterBy);
