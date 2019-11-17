import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Elements, StripeProvider } from "react-stripe-elements";
import { Divider, Button, Modal, Table } from "antd";
import CheckoutForm from "./CheckoutForm";
import { getAllPaymentMethods, createPaymentMethodIntent, addPaymentMethod } from "../../../actions/paymentMethodAction";

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
          dispatch(addPaymentMethod(result)).then(res=>{
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
  const columns = [
    {
      title: "Last 4 Digit",
      dataIndex: "card",
      key: "card",
      render: text => text.last4,
      //render: text => <a>{text.card.last4}</a>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Created At",
      dataIndex: "created",
      key: "created_at",
    },
  ];
  return (
    <div className="container py-5">
      <div className="card">
        <div className="card-body">
          <Button type="primary" onClick={() => setVisible(true)}>
            + Add New Card
          </Button>
          <Modal className="site-model" visible={visible} footer={false} onOk={() => setVisible(false)} onCancel={() => setVisible(false)}>
            <StripeProvider apiKey="pk_test_zcsqbHWgJNW8Z580mnUksalT007lA3h2EI">
              <div className="example mt-4">
                <Elements>
                  <CheckoutForm handleResult={createPaymentMethod} />
                </Elements>
              </div>
            </StripeProvider>
          </Modal>
          <Divider />
          <Table rowKey="id" bordered columns={columns} dataSource={paymentMethodList} />
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
