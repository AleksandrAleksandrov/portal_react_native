import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
  getTheme,
} from 'react-native-material-kit';
import { getMyId } from '../services/StorageHelper';
import { Card } from './common/Card';
import { voteFor } from '../actions/';
import { TextCustom } from './common/index';
import { color } from '../constants/color';

const styles = {
  bodyTextStyle: {
    fontSize: 32,
    margin: 10,
  },
  rootViewStyle: {
    flex: 1,
  },
  textViewWrapper: {
    flexDirection: 'row',
    flex: 4,
  },
  rootView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  progressBar: {
    flexDirection: 'row',

    backgroundColor: color.primary,
    borderRadius: 1,
    flex: 1,
  },
  valueTextWrapper: {
    borderWidth: 1,
    alignItems: 'center',
    position: 'absolute',

  },
  valueText: {
    flex: 1,
    alignItems: 'center',
  },
  counterWrapper: {
    backgroundColor: color.myGreen,
    width: 45,
    margin: 10,
    borderRadius: 2,
    justifyContent: 'center',
  },
  counterText: {
    color: color.textWhite,
    alignSelf: 'center',
  },
  eyeStyle: {
    fontSize: 32,
    margin: 5,
    alignSelf: 'flex-end',
  },
};

class PollItem extends Component {
  onClick = (id) => {
    getMyId().then((response, reject) => {
      if (!this.props.votingInProgress) {
        console.warn('onClick', this.props.votingInProgress);
        this.props.voteFor(id);
      }
    });
  }

  getPercentage = (total, votes) => {
    return (
      (votes / total) * 100
    );
  }

  render() {
    const { counterWrapper, counterText, progressBar, valueTextWrapper, valueText, eyeStyle } = styles;
    const { option, totalVotes } = this.props;

    return (
      <Card>
        <View style={styles.rootView} >
          <TouchableWithoutFeedback onPress={() => this.onClick(option.id)} >

            <View style={progressBar}>

              <View style={{ position: 'relative', width: `${this.getPercentage(totalVotes, option.votes)}%`, backgroundColor: color.primary }} />
              <View style={{ position: 'relative', width: `${100 - this.getPercentage(totalVotes, option.votes)}%`, backgroundColor: color.white }} />

              <View style={valueTextWrapper} >
                <TextCustom type={'t2_regular'} style={valueText} >{option.value}</TextCustom>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}>
                <View style={counterWrapper} >
                  <TextCustom type={'t2_regular'} style={counterText} >{option.votes}</TextCustom>
                </View>
              </View>

            </View>

          </TouchableWithoutFeedback>
          <Icon name={'eye'} style={eyeStyle} />
        </View>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  votingInProgress: state.postsList.votingInProgress,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  voteFor: (id) => { dispatch(voteFor(id)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PollItem);
