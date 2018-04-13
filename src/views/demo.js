import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  Text,
  Container,
  Title,
  Content,
  StyleProvider,
} from 'native-base';

import Globals from '../navigation/globals';
import {CreditCards} from '../ui';
import getTheme from '../../native-base-theme/components/';
import theme from '../../native-base-theme/variables/platform';
import {SPECIALIST, CLIENT} from './constants';

export default class Demo extends React.Component {
  static navigationOptions = {
    title: 'Demo',
  };

  goToChoseOrder = (version) => () => {
    const {navigate} = this.props.navigation;
    Globals.version = version;
    navigate('ChooseOrder');
  };

  openBrowser = () => {
    const {navigate} = this.props.navigation;
    navigate('Browser', {url: 'http://profi.ru', back: 'Home'});
  };

  render() {
    return (
      <StyleProvider style={getTheme(theme)}>
        <Container>
          <Content style={styles.content} withPadding>
            <Button
              style={styles.marginTop}
              block
              onPress={this.goToChoseOrder(CLIENT)}
            >
              <Text>Я клиент</Text>
            </Button>
            <Button
              block
              style={styles.marginTop}
              onPress={this.goToChoseOrder(SPECIALIST)}
            >
              <Text>Я специалист</Text>
            </Button>

            <Text onPress={this.openBrowser}>Открыть браузер</Text>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  content: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  marginTop: {
    marginTop: 20,
  },
});
