import * as React from 'react';
import {request} from 'graphql-request';
import {StyleSheet, View} from 'react-native';
import {
  StyleProvider,
  ActionSheet,
  Icon,
  Card,
  Button,
  Title,
  Text,
  Input,
  Container,
  Footer,
  Content,
  Spinner,
  H1,
  H2,
  H3,
  Row,
  Left,
  Body,
  Item,
} from 'native-base';
import {upperFirst} from '../utils';
import Globals from '../navigation/globals';
import getTheme from '../../native-base-theme/components/';
import theme from '../../native-base-theme/variables/platform';
import {ORDER_QUERY, GQL_HOST} from './constants';

export default class ChooseOrder extends React.Component {
  static navigationOptions = {
    title: 'Оплатить заказ',
  };

  state = {
    orderId: "12860037",
    loading: false,
    fetchFailed: false,
  };

  changeOrderId = (orderId) => {
    this.setState({orderId, fetchFailed: false})
  };

  findOrder = async () => {
    this.setState({loading: true});
    try {
      const result = await request(GQL_HOST, ORDER_QUERY, {orderId: this.state.orderId});
      if (!result.orders[0]) throw 'not found';

      Globals.order = result.orders[0];
      this.setState({loading: false});

      const {navigate} = this.props.navigation;
      navigate('Order', {alreadyLoaded: true});
    }
    catch(e){
      this.setState({fetchFailed: true, loading: false})
    }
  };

  render() {
    const {orderId, fetchFailed, loading} = this.state;

    return (
      <StyleProvider style={getTheme(theme)}>
        <Container>
          <Content style={styles.content} withPadding>
            <View>
              <H2 style={styles.title2}>Введите номер заказа</H2>

              <Item error={fetchFailed}>
                <Input
                  value={orderId}
                  disabled={loading}
                  onChangeText={this.changeOrderId}
                />
                {fetchFailed && <Icon name='close-circle' />}
              </Item>
                {fetchFailed && <Text style={styles.errorText}>Заказ не найден</Text>}
            </View>
          </Content>

          <Footer style={styles.footer}>
            <Button block onPress={this.findOrder} disabled={loading || fetchFailed || !orderId}>
              {loading ? <Spinner color="red" /> : <Text>Перейти</Text>}
            </Button>
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
  errorText: {
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
});
