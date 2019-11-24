import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Elements, StripeProvider } from "react-stripe-elements";
import { Divider, Button, Modal, Collapse } from "antd";
import CheckoutForm from "./CheckoutForm";
import { getAllPaymentMethods, createPaymentMethodIntent, addPaymentMethod } from "../../../actions/paymentMethodAction";

const { Panel } = Collapse;

const PaymentHead = (props) => {
  return (
    <div>
      <span className="row align-items-center">
        <span className="col-md-6 mb-2 mb-md-0">
          <span className="media align-items-center">
            <img className="max-width-9 mr-3" alt={props.id} src="https://htmlstream.com/preview/front-v2.9.2/assets/img/100x60/img2.jpg" />
            <span className="media-body">
              <span className="font-size-1">
                {props.card.brand} Card ending in {props.card.last4}
              </span>
            </span>
          </span>
        </span>
        {props.default && (
          <span className="col-4 col-md-2 text-md-right">
            <span className="btn btn-xs btn-soft-warning btn-pill">Primary</span>
          </span>
        )}
        <span className="col-6 col-md-3">
          <span className="d-block font-size-1">Expires: 12/2019</span>
        </span>
      </span>
    </div>
  );
};
const PaymentMethod = (props) => {
  const [visible, setVisible] = useState(false);
  const paymentMethodList = useSelector((state) => state.paymentMethodReducer.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPaymentMethods());
  }, [dispatch]);
  const createPaymentMethod = (stripe, cardElement) => {
    console.log("createPaymentMethod token", stripe);
    console.log("createPaymentMethod cardElement", cardElement);
    dispatch(createPaymentMethodIntent()).then((res) => {
      console.log("createPaymentMethodIntent token", res);
      stripe
        .confirmCardSetup(res.client_secret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: "Jenny Rosen",
            },
          },
        })
        .then((result) => {
          console.log("Received Stripe setupIntent:", result);
          dispatch(addPaymentMethod(result)).then((res) => {
            dispatch(getAllPaymentMethods());
            setVisible(false);
          });
        });

      // stripe
      //   .createPaymentMethod({
      //     type: "card",
      //     card: cardElement,
      //     billing_details: { name: "Jenny Rosen" },
      //   })
      //   .then((result) => {
      //     console.log("Received Stripe result:", result);
      //     const { paymentMethod } = result;
      //     console.log("Received Stripe PaymentMethod:", paymentMethod);
      //     dispatch(addPaymentMethod(paymentMethod));
      //   });
    });
  };

  return (
    <div className="container py-5">
      <div className="card">
        <div className="card-body">
          <Modal className="site-model" visible={visible} footer={false} onOk={() => setVisible(false)} onCancel={() => setVisible(false)}>
            <StripeProvider apiKey="pk_test_zcsqbHWgJNW8Z580mnUksalT007lA3h2EI">
              <div className="example mt-4">
                <Elements>
                  <CheckoutForm handleResult={createPaymentMethod} />
                </Elements>
              </div>
            </StripeProvider>
          </Modal>
          <Button type="primary" onClick={() => setVisible(true)}>
            + Add New Card
          </Button>
          <Divider />
          <Collapse accordion expandIconPosition="right">
            {paymentMethodList.map((item, index) => (
              <Panel header={PaymentHead(item)} key={index}>
                <div className="card-body px-4">
                  {/* Card Details */}
                  <div className="row">
                    <div className="col-sm-7 mb-2 mb-sm-0">
                      <h4 className="h6 mb-1">Natalie Curtis</h4>
                      <span className="d-block font-size-1 mb-1">Bank of America</span>
                      <p className="small">
                        <span className="fas fa-info-circle mr-1" />
                        Use this card to add funds to Your Front Balance. <a href="#">See Benefits</a>
                      </p>
                    </div>
                    <div className="col-sm-5 mb-2 mb-sm-0">
                      <h5 className="h6 mb-0">Billing address</h5>
                      <h5 className="h6">{item.billing_details.name}</h5>
                      <address className="font-size-1">
                        77408 Satterfield Motorway
                        <br />
                        Suite 469 New Antonetta, BC K3L6P6
                        <br />
                        New York, NY, 09122-9122
                        <br />
                        United States
                      </address>
                      <button type="button" className="btn btn-xs btn-soft-secondary mr-1">
                        Delete
                      </button>
                      <button type="button" className="btn btn-xs btn-primary">
                        Edit
                      </button>
                    </div>
                  </div>
                  {/* End Card Details */}
                </div>
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
