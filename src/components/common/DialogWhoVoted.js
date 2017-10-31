import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Modal, TouchableWithoutFeedback, FlatList, ScrollView } from 'react-native';
import { MKButton } from 'react-native-material-kit';
import { Card, TextCustom } from './';
import PollResultItem from '../PollResultItem';
import { CardSection } from './CardSection';

const styles = {
  cardSectionStyle: {
    justifyContent: 'center',
  },
  textStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
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
    flexDirection: 'column',
    position: 'relative',
  },
};

const ColoredRaisedButton = MKButton.flatButton()
  .build();

class DialogWhoVoted extends Component {

  button = (onPress) => {
    return (
      <ColoredRaisedButton onPress={onPress} >
        <TextCustom type={'t3'} >
          OK
        </TextCustom>
      </ColoredRaisedButton>
    );
  }

  render() {
    const { showWhoVoted, pollResult, selectedPollRawIndex, selectedPollTitle, onDecline } = this.props;
    const { textStyle, elementContainer } = styles;
    return (

      <Modal
        animationType="none"
        visible={showWhoVoted}
        transparent
        supportedOrientations={['portrait', 'landscape']}
        onRequestClose={() => {}}
      >

        <TouchableWithoutFeedback onPress={onDecline}>
          <View style={styles.containerStyle} >
            <TouchableWithoutFeedback onPress={() => {}} >
              <View style={{ marginLeft: 30, marginRight: 30 }} >
                <Card >
                  <View style={elementContainer}>
                    <TextCustom style={textStyle} >
                      За "{selectedPollTitle}" проголосовало:
                    </TextCustom>
                    <View>
                      <ScrollView>
                        <FlatList
                          numColumns={2}
                          data={pollResult ? pollResult[selectedPollRawIndex].detail_votes : []}
                          renderItem={({ item }) => <PollResultItem user={item} />}
                          keyExtractor={item => item.user.id}
                        />
                      </ScrollView>
                    </View>
                    {this.button(onDecline)}
                  </View>
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
  showWhoVoted: state.postsList.showWhoVoted,
  pollResult: state.postsList.pollResult,
  selectedPollRawIndex: state.postsList.selectedPollRawIndex,
  selectedPollTitle: state.postsList.selectedPollTitle,
});

export default connect(mapStateToProps)(DialogWhoVoted);
