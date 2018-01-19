import React from 'react';
import { View } from 'react-native';
import { TextCustom } from './TextCustom';
import { SkillText } from './SkillText';
import { color } from '../../constants/color';

const styles = {
  textStyle: {
    color: color.textBlack,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 1,
  },
  flexContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
};

const KnowBlock = (props) => {
  const { skills } = props;
  const { textStyle, flexContainer } = styles;

  return (
    <View style={flexContainer}>
      {new Array(skills.length).fill().map((_, i) => (
        <View key={i} >
          <SkillText
            style={textStyle}
            skill={skills[i].name}
          />
        </View>
      ))}
    </View>
  );
};

export { KnowBlock };
