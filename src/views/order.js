import * as React from 'react';
import {request} from 'graphql-request';
import {StyleSheet, View} from 'react-native';
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
  Row,
  ListItem,
  List,
  Left,
  Body,
} from 'native-base';
import {upperFirst} from '../utils';
import Globals from '../navigation/globals';
import getTheme from '../../native-base-theme/components/';
import theme from '../../native-base-theme/variables/platform';
import Avatar from './components/avatar';
import {ORDER_QUERY, ORDER_TITLE, CLIENT_PROBLEMS} from './constants';

export default class Order extends React.Component {
  state = {
    loading: true,
  };

  static navigationOptions = ORDER_TITLE;

  async componentDidMount() {
    const {state: {params: {orderId}}} = this.props.navigation;

    const result = await request(
      'http://192.168.119.66:8200/graphql',
      ORDER_QUERY,
      {orderId},
    );
    Globals.order = result.orders[0];
    this.updateTitle();
    this.setState({loading: false});
  }

  updateTitle = () => {
    this.props.navigation.setParams({});
  }

  goToPaymentType = () => {
    const {navigate} = this.props.navigation;
    navigate('PaymentType');
  };

  showProblemActions = () => {
    const CANCEL_INDEX = 4;
    ActionSheet.show(
      {
        options: CLIENT_PROBLEMS,
        cancelButtonIndex: CANCEL_INDEX,
      },
      index => {
        const problem = CLIENT_PROBLEMS[index].name;
        if (!problem) return;
        const {navigate} = this.props.navigation;
        navigate('ClientProblem', {problem});
      },
    );
  };

  render() {
    if (this.state.loading)
      return (
        <Container>
          <Content>
            <Spinner color="red" />
          </Content>
        </Container>
      );

    if (!Globals.order)
      return (
        <Container>
          <Content>
            <Card>
              <H2 style={styles.title2}>Заказ не найден</H2>
            </Card>
          </Content>
        </Container>
      );

    const {name, price, subjects, aim, executor} = Globals.order;
    return (
      <StyleProvider style={getTheme(theme)}>
        <Container>
          <Content style={styles.content} withPadding>
            <View>
              <H2 style={styles.title2}>Имя клиента</H2>
              <Text>{name}</Text>
            </View>

            <View style={styles.withPadding}>
              <H2 style={styles.title2}>Сумма к оплате</H2>
              <Text>{price}</Text>
            </View>

            <View style={styles.withPadding}>
              <H2 style={styles.title2}>Услуги</H2>
              <Text>{upperFirst(subjects)}</Text>
              {aim && <Text note>
                {aim}
              </Text>}
            </View>

            <View style={styles.withPadding}>
              <H2 style={styles.title2}>Специалист</H2>
              <List style={styles.list}>
                <ListItem avatar>
                  <Left style={styles.withoutPadding}>
                    <Avatar path={executor && executor.avatar} />
                  </Left>
                  <Body>
                    <Text>{executor && executor.name}</Text>
                    <Text note>
                      {executor && upperFirst((executor.topServices || []).map(({name}) => name).join(', '))}
                    </Text>
                  </Body>
                </ListItem>
              </List>
            </View>
          </Content>

          <Footer style={styles.footer}>
            <List>
              <ListItem style={styles.footerItem}>
                <Button block onPress={this.goToPaymentType}>
                  <Text>Выбрать способ оплаты</Text>
                </Button>
              </ListItem>
              <ListItem style={styles.footerItem}>
                <Button transparent onPress={this.showProblemActions}>
                  <Text>Это ошибка</Text>
                </Button>
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
    paddingBottom: 3,
    fontSize: 20,
    fontWeight: 'bold',
  },
  withPadding: {
    paddingTop: 20,
  },
  withoutPadding: {
    padding: 0,
  },
  list: {
    paddingTop: 10,
  },
  content: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  footer: {
    padding: 20,
    height: 130,
    alignItems: 'center',
  },
  footerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
});
