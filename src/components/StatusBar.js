import {StatusBar, Platform} from 'react-native';
import {Colors} from '../shared/Themes/index';

const TransparentStatusBar = (backgroundcolor, bartext) => {
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor(backgroundcolor || Colors.backgroundColor);
    StatusBar.setTranslucent(true);
  }
  StatusBar.setBarStyle(bartext || 'light-content');
};

export default TransparentStatusBar;
