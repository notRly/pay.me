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
import {Image} from 'react-native';
import Globals from '../navigation/globals';
import getTheme from '../../native-base-theme/components/';
import theme from '../../native-base-theme/variables/platform';
import {SPECIALIST, CLIENT} from './constants';

export default class Demo extends React.Component {
  static navigationOptions = {
    title: 'Оплата заказа PROFI.RU',
  };

  goToChoseOrder = version => () => {
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
        <Container style={styles.container}>
          <Content style={styles.content} withPadding>
            <View style={styles.logo}>
              <Image
                source={require('../../assets/logo.png')}
                style={{height: 31, width: 200, flex: 1, alignSelf: 'center'}}
              />
            </View>

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
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    padding: 30,
    paddingTop: 50,
  },
  content: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  marginTop: {
    marginTop: 20,
  },
});
