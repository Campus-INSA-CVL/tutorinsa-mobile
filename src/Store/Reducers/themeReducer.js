
const LIGHT = {
  name: 'Light',
  background: '#eee',
  foreground: 'white',
  separator: '#777',
  title: 'black',
  subtitle: '#999',
  text: 'black',
  button: '#4e73df',
  buttonLabel: 'white',
  eleve: '#1cc88a',
  tuteur: '#4e73df',
  statusbarMode: 'dark-content',
}

const BROWN = {
  name: 'Brown',
  background: '#322214',
  foreground: '#4c443c',
  separator: '#eee',
  title: '#d4ebff',
  subtitle: '#7c898b',
  text: '#93a3b1',
  button: '#4e73df',
  buttonLabel: 'white',
  eleve: '#1cc88a',
  tuteur: '#4e73df',
  statusbarMode: 'light-content',
}

const DARK = {
  name: 'Dark',
  background: '#333',
  foreground: '#222',
  separator: 'white',
  title: 'white',
  subtitle: '#8a8a8a',
  text: 'white',
  button: '#4e73df',
  buttonLabel: 'white',
  eleve: '#1cc88a',
  tuteur: '#4e73df',
  statusbarMode: 'light-content',
}

const BLUE = {
  name: 'Blue',
  background: '#404452',
  foreground: '#333743',
  separator: 'white',
  title: 'white',
  subtitle: '#8a8a8a',
  text: 'white',
  button: '#4e73df',
  buttonLabel: 'white',
  eleve: '#1cc88a',
  tuteur: '#4e73df',
  statusbarMode: 'light-content'
}

const initialState = {
  theme: LIGHT,
  allThemes: [LIGHT, DARK, BROWN, BLUE]
};

function themeFunctions(state = initialState, action) {
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

export default themeFunctions
