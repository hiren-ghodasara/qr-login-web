import React, { Component } from "react";
import { Button } from "antd";
import { CardElement, injectStripe } from "react-stripe-elements";
const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: "18px",
        color: "#424770",
        fontFamily: "Open Sans, sans-serif",
        letterSpacing: "0.025em",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#c23d4b",
      },
    },
  };
};
class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorMessage: "",
    };
  }
  handleChange = (data) => {
    console.log("data", data);
    const { error } = data;
    if (error) {
      this.setState({ errorMessage: error.message });
    } else {
      this.setState({ errorMessage: "" });
    }
  };
  handleSubmit = (evt) => {
    evt.preventDefault();
    if (this.props.stripe) {
      //this.setState({ loading: true });
      console.log("this.props.stripe",this.props.stripe);
      const cardElement = this.props.elements.getElement("card");
      console.log("cardElement",cardElement);
      this.props.handleResult(this.props.stripe,cardElement);

      // this.props.stripe.createToken().then((res) => {
      //   console.log("res", res);
      // });

      // this.props.stripe
      //   .createPaymentMethod({
      //     type: "card",
      //     card: cardElement,
      //     billing_details: { name: "Jenny Rosen" },
      //   })
      //   .then(({ paymentMethod }) => {
      //     console.log("Received Stripe PaymentMethod:", paymentMethod);
      //   });

      // this.props.stripe
      //   .confirmCardSetup("{PAYMENT_INTENT_CLIENT_SECRET}", {
      //     payment_method: {
      //       card: cardElement,
      //       billing_details: {
      //         name: "Jenny Rosen",
      //       },
      //     },
      //   })
      //   .then((result) => {
      //     console.log("Received Stripe setupIntent:", result);
      //   });

    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <div className="checkout">
        <p className="font-size-main">Card details </p>
        <CardElement onChange={this.handleChange} {...createOptions()} value={{ postalCode: "34564" }} />
        <div className="mt-3 text-danger font-size-main">{this.state.errorMessage}</div>
        <Button type="primary" loading={this.state.loading} className="mt-3" onClick={this.handleSubmit} block>
          Save
        </Button>
        <p className="font-size-main mt-3">
          Need a{" "}
          <a href="https://stripe.com/docs/testing" target="_blank" rel="noopener noreferrer">
            test card?
          </a>{" "}
          Try <b>4242 4242 4242 4242</b>, a valid expiration date in the future, and any CVC number and zip code.
        </p>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
