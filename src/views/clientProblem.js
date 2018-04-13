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
  List,
  ListItem,
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
            <H2 style={styles.title2}>Мы&nbsp;свяжемся со&nbsp;специалистом</H2>
            <Text style={styles.paragraph}>
              Спасибо, что сообщили об&nbsp;ошибке. Мы&nbsp;решим вопрос
              со&nbsp;специалистом&nbsp;и, при необходимости, свяжемся
              с&nbsp;вами.
            </Text>
          </Content>

          <Footer style={styles.footer}>
            <List>
              <ListItem>
                <Text style={styles.textSmall}>Нужна помощь?</Text>
              </ListItem>
              <ListItem>
                <Text onPress={this.callToProfi}>{PROFI_PHONE_NUMBER}</Text>
              </ListItem>
            </List>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  title2: {
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  paragraph: {
    lineHeight: 25,
  },
  textSmall: {
    fontSize: 13,
    color: TEXT_GRAY,
    textAlign: 'center',
  },
  content: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  alignCenter: {
    textAlign: 'center',
  },
  footer: {
    height: 60,
    textAlign: 'center',
    lineHeight: 24,
  },
});
