import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Modal, TouchableWithoutFeedback } from 'react-native';
import { CardSection, Card, TouchableFilterBy } from './';
import { TextCustom} from "./TextCustom";
import { setAdvert, setEvent, setPoll, getFilteredPosts } from '../../actions';
import { InputAndroid  } from "./";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
  ADVERT,
  POLL,
  EVENT,
  FAVOURITE,
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

  onAdvert() {
    this.props.dispatch(setAdvert(!this.props.filterByAdvert)).then(() => {
      this.props.dispatch(getFilteredPosts(Array.from(this.props.filterSet)));
      this.props.onDecline();
    });
  }

  onPoll() {
    this.props.dispatch(setPoll(!this.props.filterByPoll)).then(() => {
      this.props.dispatch(getFilteredPosts(Array.from(this.props.filterSet)));
      this.props.onDecline();
    });
  }

  onEvent() {
    this.props.dispatch(setEvent(!this.props.filterByEvent)).then(() => {
      this.props.dispatch(getFilteredPosts(Array.from(this.props.filterSet)));
      this.props.onDecline();
    });
  }

  getFilterArray = () => {
    const { filterByAdvert, filterByPoll, filterByEvent } = this.props;
    const filterList = [
      {
        key: ADVERT,
        label: 'Объявления',
        checked: filterByAdvert,
        onPress: () => {
          this.onAdvert();
        },
      },
      {
        key: POLL,
        label: 'Опросы',
        checked: filterByPoll,
        onPress: () => {
          this.onPoll();
        },
      },
      {
        key: EVENT,
        label: 'События',
        checked: filterByEvent,
        onPress: () => {
          this.onEvent();
        },
      },
    ];
    return filterList;
  };
  render() {
    const { showSortBy } = this.props;
    const { textStyle } = styles;

    return (

      <Modal
        animationType="none"
        visible={showSortBy}
        transparent
        onRequestClose={() => {}}>

        <TouchableWithoutFeedback onPress={this.props.onDecline}>
          <View style={styles.containerStyle} >
            <TouchableWithoutFeedback onPress={() => {}} >
              <View style={{ marginLeft: 30, marginRight: 30,}} >
                <CardSection style={{flexDirection: 'column', borderRadius: 10}}>
                  {
                    this.getFilterArray().map(item => (
                      <TouchableFilterBy
                        key={item.key}
                        label={item.label}
                        checked={item.checked}
                        onPress={item.onPress}
                      />
                    ))
                  }
                </CardSection>
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
  filterSet: state.postsList.filterSet,
  filterByAdvert: state.postsList.filterByAdvert,
  filterByPoll: state.postsList.filterByPoll,
  filterByEvent: state.postsList.filterByEvent,
});

export default connect(mapStateToProps)(DialogFilterBy);
