import React from 'react'
import { StyleSheet, View, Platform, Text, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Overlay } from 'react-native-elements';

class DateTimeDurationPicker extends React.Component {
  render() {
    if (Platform.OS == 'android') {
      return (
        this.props.isOpened
        ? <DateTimePicker
            minimumDate={new Date()}
            minuteInterval={5}
            value={this.props.mode == 'date' ? this.props.date : this.props.duration}
            mode={this.props.mode}
            locale={'fr'}    // for IOS
            is24Hour={true}  // for Android
            display={this.props.mode == 'date' ? undefined : 'spinner'}
            onChange={this.props.onChange}
          />
        : null
      );
    }
    else {
      StatusBar.setHidden(this.props.isOpened)
      return (
        this.props.isOpened
        ? <Overlay
            isVisible={this.props.isOpened}
            onBackdropPress={this.props.onChange}
            containerStyle={{backgroundColor: '#000a'}}
            overlayStyle={{backgroundColor: 'white', ...styles.overlay}}
          >
            <Text> test </Text>
          </Overlay>
        : null
      );
    }
  }
}

const styles = StyleSheet.create({
  overlay: {
    height: undefined,
    borderRadius: 10
  },
  container: {

  }
});

DateTimeDurationPicker.propTypes = {
  mode: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  duration: PropTypes.instanceOf(Date).isRequired,
};

export default DateTimeDurationPicker
