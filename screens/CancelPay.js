import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {FlutterwaveInit} from 'flutterwave-react-native';

class CancelPay extends React.Component {
  abortController = null;

  componentWillUnmout() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  handlePaymentInitialization = () => {
    this.setState({
      isPending: true,
    }, () => {
      // set abort controller
      this.abortController = new AbortController;
      try {
        // initialize payment
        const paymentLink = await FlutterwaveInit(
          {
            tx_ref: generateTransactionRef(),
            authorization: '[merchant public key]',
            amount: 100,
            currency: 'USD',
            customer: {
              email: 'customer-email@example.com',
            },
            payment_options: 'card',
          },
          this.abortController
        );
        // use payment link
        return this.usePaymentLink(paymentLink);
      } catch (error) {
        // do nothing if our payment initialization was aborted
        if (error.code === 'ABORTERROR') {
          return;
        }
        // handle other errors
        this.displayErrorMessage(error.message);
      }
    });
  }

  render() {
    const {isPending} = this.state;
    return (
      <View>
        ...
        <TouchableOpacity
          style={[
            styles.paymentbutton,
            isPending ? styles.paymentButtonBusy : {}
          ]}
          disabled={isPending}
          onPress={this.handlePaymentInitialization}
        >
          Pay $100
        </TouchableOpacity>
      </View>
    )
  }
}

export default CancelPay;