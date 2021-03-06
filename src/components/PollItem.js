import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { getMyId } from '../services/StorageHelper';
import { Card } from './common/Card';
import { TextCustom } from './common/index';
import { color } from '../constants/color';
import {
  voteFor,
  showWhoVotedDialog,
  getPollResultsAction,
  setSelectedPollRawIndexAction,
  setPollValueAction,
} from '../actions/';

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
    // alignItems: 'center',
    backgroundColor: color.primary,
    borderRadius: 1,
    flex: 1,
  },
  progressElement1: {
    backgroundColor: color.primary,
    position: 'relative',
  },
  progressElement2: {
    backgroundColor: color.white,
    position: 'relative',
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
  valueTextWrapper: {
    flex: 1,
    margin: 5,
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  valueText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
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

  pollResults = () => {
    const {
      showWhoVotedDialog,
      showWhoVoted,
      getPollResultsAction,
      messageId,
      index,
      setSelectedPollRawIndexAction,
      setPollValueAction,
      option: { value }
    } = this.props;
    // console.warn('pollResults', value);
    setPollValueAction(value);
    setSelectedPollRawIndexAction(index);
    getPollResultsAction(messageId);
    showWhoVotedDialog(!showWhoVoted);
  }

  eyeIcon = () => {
    const { eyeStyle } = styles;
    return (
      <TouchableWithoutFeedback onPress={() => this.pollResults()}>
        <Icon name={'eye'} style={eyeStyle} />
      </TouchableWithoutFeedback>
    );
  }

  voteCounter = () => {
    const { option } = this.props;
    const { counterWrapper, counterText } = styles;
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}>
        <View style={counterWrapper} >
          <TextCustom type={'t2_regular'} style={counterText} >{option.votes}</TextCustom>
        </View>
      </View>
    );
  }

  optionValue = () => {
    const { option } = this.props;
    const { valueTextWrapper, valueText } = styles;
    return (
      <View style={valueTextWrapper} >
        <TextCustom type={'t2_regular'} style={valueText} >{option.value}</TextCustom>
      </View>
    );
  }

  render() {
    const { progressBar, progressElement1, progressElement2 } = styles;
    const { option, totalVotes } = this.props;

    return (
      <Card>
        <View style={styles.rootView} >
          <TouchableWithoutFeedback onPress={() => this.onClick(option.id)} >
            <View style={progressBar}>
              <View style={[progressElement1, { width: `${this.getPercentage(totalVotes, option.votes)}%` }]} />
              <View style={[progressElement2, { width: `${100 - this.getPercentage(totalVotes, option.votes)}%` }]} />
              {this.optionValue()}
              {this.voteCounter()}
            </View>
          </TouchableWithoutFeedback>
          {this.eyeIcon()}
        </View>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  votingInProgress: state.postsList.votingInProgress,
  showWhoVoted: state.postsList.showWhoVoted,
});

const mapDispatchToProps = dispatch => ({
  voteFor: (id) => { dispatch(voteFor(id)); },
  showWhoVotedDialog: (isShow) => { dispatch(showWhoVotedDialog(isShow)); },
  getPollResultsAction: (messageId) => { dispatch(getPollResultsAction(messageId)); },
  setSelectedPollRawIndexAction: (index) => { dispatch(setSelectedPollRawIndexAction(index)); },
  setPollValueAction: (value) => { dispatch(setPollValueAction(value)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PollItem);
