import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import Separator from '../../Components/Separator';
import Announce from '../../Components/Announce';
import { Feather as Icon } from '@expo/vector-icons';




class ThemesCard extends React.Component {

  render() {
    const { theme } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: theme.title}}>Thème</Text>
          <Separator backgroundColor={theme.separator}/>
        </View>
        <Carousel
          data={this.props.allThemes}
          renderItem={({item,index}) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  backgroundColor: item.background,
                  padding: 10,
                  paddingBottom: 20,
                  borderRadius: 10,
                  borderWidth: item.name==theme.name ? 0.5 : 0
                }}
                onPress={() => {this.props.dispatch({ type: "THEME_"+item.name.toUpperCase() })}}
              >
                <View style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingBottom: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <Text style={{marginLeft: 10,color: item.title, fontSize: 20, fontWeight: 'bold'}}>{item.name}</Text>
                  <View style={{ height: 32 }}>
                    <Icon
                      name='check'
                      size={32}
                      color='green'
                      style={{
                        display: item.name==theme.name ? 'flex' : 'none'
                      }}
                    />
                  </View>
                </View>
                <Announce
                  item={{
                    date: "2020-03-16T18:00:00.000Z",
                    endAt: "2020-03-16T19:00:00.000Z",
                    subject: {
                      name: "Résistance Des Matériaux",
                    },
                    type: "tuteur",
                  }}
                  themeOverride={item}
                />
              </TouchableOpacity>
            );
          }}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width*0.85}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  header: {
    width: Dimensions.get('window').width*0.85,
  }
});

const mapStateToProps = (store) => {
  return {
    theme: store.themeFunctions.theme,
    allThemes: store.themeFunctions.allThemes,
  }
}

export default connect(mapStateToProps)(ThemesCard);
