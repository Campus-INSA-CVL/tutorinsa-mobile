import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  FlatList,
  Dimensions
} from 'react-native';
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
            <Text style={{color: theme.text}}>{this.props.toUpperCase ? item.name.toUpperCase() : item.name}</Text>
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
          StatusBar.setHidden(this.props.hideStatusBar);
        }}
        style={props.style}
      >
        <View style={{...styles.container, ...props.containerStyle}}>
          <Text style={{color: theme.text, ...props.textStyle}}>
            {
              (props.selectedValue=='')
              ? props.title
              : this.props.toUpperCase ? this.data[props.selectedValue].toUpperCase() : this.data[props.selectedValue]
            }
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
                  height: 30,
                  borderBottomWidth: 1,
                  borderColor: theme.separator,
                  alignSelf: 'center'
                }}>
                  {props.title}
                </Text>
              : null
            }
            <FlatList
              data={this.props.data}
              style={{
                height: (this.props.data.length < (Dimensions.get('window').height*0.8
                                                  -(props.title!='' ? 30 : 0))/35)
                        ? undefined
                        : Dimensions.get('window').height*0.8}}
              renderItem={({ item, index }) => {
                return (
                  <View
                    key={item._id}
                    style={{
                      borderColor: theme.separator,
                      borderBottomWidth: index==this.props.data.length-1 ? 0 : 0.5,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.props.onValueChange(item._id);
                        this.setState({isOpened: false});
                        StatusBar.setHidden(false);
                      }}
                      style={{
                        width: '100%',
                        height: 35,
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: 5
                      }}
                    >
                      <Text style={{color: theme.text}}>{this.props.toUpperCase ? item.name.toUpperCase() : item.name}</Text>
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
                )
              }}
              keyExtractor={item => item._id}
            />
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
  hideStatusBar: PropTypes.bool,
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
  selectedValue: '',
  hideStatusBar: true
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 35,
    alignItems: 'center',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
  },
  caret: {
    marginLeft: 10
  },
  overlay: {
    height: undefined,
    borderRadius: 10
  }
});

export default Picker
