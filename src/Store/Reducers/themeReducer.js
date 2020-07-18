import AsyncStorage from '@react-native-community/async-storage';

const LIGHT = {
  name: 'Light',
  background: '#eeeeee',
  foreground: '#ffffff',
  separator: '#777777',
  title: '#000000',
  subtitle: '#999999',
  text: '#000000',
  button: '#4e73df',
  buttonLabel: '#ffffff',
  eleve: '#1cc88a',
  tuteur: '#4e73df',
  statusbarMode: 'dark-content',
}

const BROWN = {
  name: 'Brown',
  background: '#322214',
  foreground: '#4c443c',
  separator: '#eeeeee',
  title: '#d4ebff',
  subtitle: '#7c898b',
  text: '#93a3b1',
  button: '#4e73df',
  buttonLabel: '#ffffff',
  eleve: '#1cc88a',
  tuteur: '#4e73df',
  statusbarMode: 'light-content',
}

const DARK = {
  name: 'Dark',
  background: '#333333',
  foreground: '#222222',
  separator: '#ffffff',
  title: '#ffffff',
  subtitle: '#8a8a8a',
  text: '#ffffff',
  button: '#4e73df',
  buttonLabel: '#ffffff',
  eleve: '#1cc88a',
  tuteur: '#4e73df',
  statusbarMode: 'light-content',
}

const BLUE = {
  name: 'Blue',
  background: '#404452',
  foreground: '#333743',
  separator: '#ffffff',
  title: '#ffffff',
  subtitle: '#8a8a8a',
  text: '#ffffff',
  button: '#4e73df',
  buttonLabel: '#ffffff',
  eleve: '#1cc88a',
  tuteur: '#4e73df',
  statusbarMode: 'light-content'
}

const initialState = {
  theme: LIGHT,
  allThemes: [LIGHT, DARK, BROWN, BLUE]
};

function themeFunctions(state = initialState, action) {
  const actionType = action.type.split('_');
  if (actionType[0]=='THEME') {
    saveTheme(actionType[1]);

    switch (action.type) {
      case "THEME_LIGHT":
      return { ...state, theme: LIGHT };
      case "THEME_DARK":
      return { ...state, theme: DARK };
      case "THEME_BROWN":
      return { ...state, theme: BROWN };
      case "THEME_BLUE":
      return { ...state, theme: BLUE };
      default:
      return state;
    }
  }
  else {
    return state;
  }
}

async function saveTheme(theme) {
  try {
    await AsyncStorage.setItem('tutorinsa_theme', theme)
  } catch (e) {
    console.log('Error while saving the theme : ' + e.name);
  }
}

export default themeFunctions
