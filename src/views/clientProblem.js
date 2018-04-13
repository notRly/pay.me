import * as React from 'react';
import call from 'react-native-phone-call';
import {StyleSheet} from 'react-native';
import {
  StyleProvider,
  ActionSheet,
  Card,
  Button,
  Title,
  Text,
  Container,
  Footer,
  Content,
  Spinner,
  H1,
  H2,
  H3,
} from 'native-base';
import Globals from '../navigation/globals';
import getTheme from '../../native-base-theme/components/';
import theme from '../../native-base-theme/variables/platform';
import {PROFI_PHONE_NUMBER, ORDER_TITLE} from './constants';
import {TEXT_GRAY} from '../ui/constants';

export default class Order extends React.Component {
  static navigationOptions = ORDER_TITLE;

  callToProfi = () => {
    call({
      number: PROFI_PHONE_NUMBER,
      prompt: true,
    }).catch(console.error);
  };

  render() {
    return (
      <StyleProvider style={getTheme(theme)}>
        <Container>
          <Content style={styles.content} withPadding>
            <H2 style={styles.title2}>Мы свяжемся со специалистом</H2>
            <Text>
              Спасибо, что сообщили об ошибке. Мы решим вопрос со специалистом
              и, при необходимости, свяжемся с вами.
            </Text>
          </Content>

          <Footer>
            <Text style={styles.textSmall}>Нужна помощь?</Text>
            <Text onPress={this.callToProfi}>{PROFI_PHONE_NUMBER}</Text>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  title2: {
    paddingBottom: 3,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textSmall: {
    fontSize: 13,
    color: TEXT_GRAY,
  },
  content: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
});
