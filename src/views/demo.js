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
import getTheme from '../../native-base-theme/components/';
import theme from '../../native-base-theme/variables/platform';

export default class Demo extends React.Component {
  static navigationOptions = {
    title: 'Demo',
  };

  goToOrderScreen = () => {
    const {navigate} = this.props.navigation;
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
              onPress={this.goToOrderScreen}
            >
              <Text>Я клиент</Text>
            </Button>
            <Button block style={styles.marginTop}>
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
