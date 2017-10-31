import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Modal, TouchableWithoutFeedback, Text, FlatList, ScrollView } from 'react-native';
import { Card } from './';
import PollResultItem from '../PollResultItem';
import { CardSection } from './CardSection';

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

class DialogWhoVoted extends Component {

  render() {
    const { showWhoVoted, pollResult, selectedPollRawIndex } = this.props;
    const { textStyle } = styles;
    return (

      <Modal
        animationType="none"
        visible={showWhoVoted}
        transparent
        onRequestClose={() => {}}>

        <TouchableWithoutFeedback onPress={this.props.onDecline}>
          <View style={styles.containerStyle} >
            <TouchableWithoutFeedback onPress={() => {}} >
              <View style={{ marginLeft: 30, marginRight: 30, }} >
                <Card style={{ flexDirection: 'column', borderRadius: 10 }}>
                  <CardSection style={{ flexDirection: 'column' }}>
                    <Text>who voted </Text>
                    <ScrollView>
                      <FlatList
                        numColumns={2}
                        data={pollResult ? pollResult[selectedPollRawIndex].detail_votes : []}
                        renderItem={({ item }) => <PollResultItem user={item} />}
                        keyExtractor={item => item.user.id}
                      />
                    </ScrollView>

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
  showWhoVoted: state.postsList.showWhoVoted,
  pollResult: state.postsList.pollResult,
  selectedPollRawIndex: state.postsList.selectedPollRawIndex,
});

export default connect(mapStateToProps)(DialogWhoVoted);
