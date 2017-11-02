import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Modal, TouchableWithoutFeedback, FlatList, Dimensions } from 'react-native';
import { MKButton } from 'react-native-material-kit';
import { Card, TextCustom } from './';
import { color } from '../../constants/color';
import PollResultItem from '../PollResultItem';
import { CardSection } from './CardSection';
import Orientation from 'react-native-orientation';
import EStyleSheet from 'react-native-extended-stylesheet';

const { width, height } = Dimensions.get('window');
EStyleSheet.build({
  $width: width - 100,
});
const styles = EStyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    // flex: 1,
    // height: height - 200,
    marginTop: 40,
    marginBottom: 40,
    marginLeft: 30,
    marginRight: 30,
    // width: width - 60,
    backgroundColor: color.white,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    // marginLeft: 5,
    // marginRight: 5,
    width: width - 60,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
});

const ColoredRaisedButton = MKButton.flatButton()
  .build();

class DialogWhoVoted extends Component {
  constructor() {
    super();
    this.state = { numberOfColumn: 3 };
  }

  onLayout = (event) => {
    const num = parseInt(event.nativeEvent.layout.width / 80, 10);
    this.setState({ numberOfColumn: num });
  }

  okButton = (onPress) => {
    return (
      <ColoredRaisedButton onPress={onPress} style={styles.buttonStyle} >
        <TextCustom type={'t3'} >
          OK
        </TextCustom>
      </ColoredRaisedButton>
    );
  }

  render() {
    const {
      showWhoVoted,
      pollResult,
      selectedPollRawIndex,
      selectedPollTitle,
      onDecline,
    } = this.props;
    const { textStyle, modalContainer, modalBody } = styles;
    return (

      <Modal
        animationType="none"
        visible={showWhoVoted}
        transparent
        supportedOrientations={['portrait', 'landscape']}
        onRequestClose={() => {}}
      >
        <TouchableWithoutFeedback onPress={onDecline}>
          <View style={modalContainer} >
            <Card
              onLayout={(event) => this.onLayout(event)}
              style={modalBody}
            >
              <TextCustom
                style={textStyle}
              >
                За "{selectedPollTitle}" проголосовало: {pollResult ? pollResult[selectedPollRawIndex].votes : '' }
              </TextCustom>
              <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={this.state.numberOfColumn}
                data={pollResult ? pollResult[selectedPollRawIndex].detail_votes : []}
                renderItem={({ item }) => <PollResultItem user={item} />}
                keyExtractor={item => item.user.id}
                key={this.state.numberOfColumn}
              />

                {this.okButton(onDecline)}
            </Card>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  showWhoVoted: state.postsList.showWhoVoted,
  pollResult: state.postsList.pollResult,
  selectedPollRawIndex: state.postsList.selectedPollRawIndex,
  selectedPollTitle: state.postsList.selectedPollTitle,
});

export default connect(mapStateToProps)(DialogWhoVoted);
