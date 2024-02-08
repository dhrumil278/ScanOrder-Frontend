import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';
import { Button, Card, CardBody, CardHeader, DropdownItem } from 'reactstrap';
import { FaRupeeSign } from 'react-icons/fa';
import axios from 'axios';

function confirmOrder() {
  const location = useLocation();
  const { orderDetail } = location.state;
  const [subTotal, setSubTotal] = useState(0);
  const [token, setToken] = useState(0);
  const history = useHistory();
  const countSubTotal = (data) => {
    let total = 0;
    data.map((d) => {
      total += d.price * d.quantity;
    });
    setSubTotal(total);
  };
  const handleConfirmOrder = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/order/userOrderConfirm`,
        {
          orderId: orderDetail?.orderId || null,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (res.status === 200) {
        history.push({
          pathname: '/orderAcceptPage',
          state: {
            orderId: orderDetail.orderId,
          },
        });
      }
    } catch (error) {
      console.log('error: ', { error });
      if (error.response.status === 403) {
        // localStorage.removeItem('accessToken');
        // history.push('/login');
      }
      setIsFavorites(false);
    }
  };
  useEffect(() => {
    countSubTotal(orderDetail.getFood);
    let getToken = localStorage.getItem('accessToken');
    if (getToken) {
      setToken(getToken);
    }
  }, []);

  return (
    <>
      <Card>
        <CardHeader className="fs-3">Order Details</CardHeader>
        <CardBody>
          <div className="d-flex w-100">
            <p style={{ width: '50%' }}>Title</p>
            <p style={{ width: '30%', textAlign: 'center' }}>Quantity</p>
            <p style={{ width: '20%', textAlign: 'center' }}>Price</p>
          </div>
          {orderDetail.getFood && orderDetail.getFood.length > 0 ? (
            <>
              {orderDetail.getFood.map((order) => {
                return (
                  <div className="d-flex w-100">
                    <p className="text-left" style={{ width: '50%' }}>
                      {order.title}
                    </p>
                    <p
                      className="text-right"
                      style={{ width: '30%', textAlign: 'center' }}
                    >
                      {order.quantity}
                    </p>
                    <p
                      className="text-right"
                      style={{ width: '20%', textAlign: 'center' }}
                    >
                      {order.price * order.quantity}
                    </p>
                  </div>
                );
              })}
              <hr />
              <div className="d-flex justify-content-between">
                <p className="mb-0">Subtotal:</p>
                <p className="mb-0">
                  <FaRupeeSign size={12} /> {subTotal}
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="mb-0">CGST:</p>{' '}
                <p className="mb-0">
                  <FaRupeeSign size={12} /> {(subTotal * 2.5) / 100}
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="mb-0">SGST:</p>{' '}
                <p className="mb-0">
                  <FaRupeeSign size={12} /> {(subTotal * 2.5) / 100}
                </p>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <p className="mb-0">Grandtotal:</p>
                <p className="mb-0">
                  <FaRupeeSign size={12} />{' '}
                  {subTotal + (subTotal * 2.5) / 100 + (subTotal * 2.5) / 100}
                </p>
              </div>
            </>
          ) : (
            <>
              <p>Order Details not Found</p>
            </>
          )}
        </CardBody>
      </Card>
      <Button color="primary" className="w-100" onClick={handleConfirmOrder}>
        Confirm Order
      </Button>
    </>
  );
}

export default confirmOrder;
