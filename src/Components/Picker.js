import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements';

class Picker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
    }

    this.data = {}
    this.props.data.forEach((item) => {
      this.data[item._id] = item.name;
    });
  }

  _setupPicker(theme) {
    const { data } = this.props;
    var pickerItems = []

    this.props.data.forEach((item, index) => {
      pickerItems.push(
        <View
          key={item._id}
          style={{
          borderColor: theme.separator,
          borderBottomWidth: index==this.props.data.length-1 ? 0 : 0.5,
        }}>
          <TouchableOpacity
            onPress={() => {
              this.props.onValueChange(item._id);
              this.setState({isOpened: false});
              StatusBar.setHidden(false);
            }}
            style={{
              width: '100%',
              padding: 10,
              flexDirection: 'row'
            }}
          >
            <Text style={{color: theme.text}}>{item.name}</Text>
            {
              (this.props.selectedValue==item._id)
              ? <Feather
                  name='check'
                  size={20}
                  color={theme.separator}
                  style={{marginLeft: 'auto'}}
                />
              : null
            }
          </TouchableOpacity>
        </View>
      );
    });

    return pickerItems;
  }

  render() {
    const { theme } = this.props;
    const props = this.props;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({isOpened: true});
          StatusBar.setHidden(true);
        }}
        style={props.style}
      >
        <View style={styles.container}>
          <Text style={{color: theme.text, ...props.textStyle}}>
            {props.selectedValue=='' ? props.title : this.data[props.selectedValue]}
          </Text>
          <FontAwesome name='caret-down' size={20} color={theme.text} style={styles.caret}/>
        </View>
        <Overlay
          isVisible={this.state.isOpened}
          onBackdropPress={() => {
            this.setState({isOpened: false});
            StatusBar.setHidden(false);
          }}
          containerStyle={{backgroundColor: theme.background + 'aa', ...props.dialogStyle}}
          overlayStyle={{backgroundColor: theme.foreground, ...styles.overlay, ...props.dialogStyle}}
        >
          <View>
            {
              (props.title!='')
              ? <Text style={{
                  color: theme.text,
                  fontWeight: 'bold',
                  fontSize: 20,
                  borderBottomWidth: 1,
                  borderColor: theme.separator,
                  alignSelf: 'center'
                }}>
                  {props.title}
                </Text>
              : null
            }
            {this._setupPicker(theme)}
          </View>
        </Overlay>
      </TouchableOpacity>
    );
  }
}

Picker.propTypes = {
  selectedValue: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
  theme: PropTypes.object,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  dialogStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Picker.defaultProps = {
  theme: {
    text: '#000000',
    background: '#000000',
    foreground: '#ffffff',
    separator: '#777777',
  },
  title: '',
  selectedValue: ''
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  caret: {
    marginHorizontal: 20
  },
  overlay: {
    height: undefined,
    borderRadius: 10
  }
});

export default Picker
