import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom';
import { Card, CardBody, CardHeader, Progress } from 'reactstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function OrderAcceptPage() {
  const location = useLocation();
  const { orderId } = location.state;
  const [time, setTime] = useState(0);
  const [homeButton, setHomeButton] = useState(false);

  useEffect(() => {
    setTimer();
  }, []);
  useEffect(() => {
    if (time === 60) {
      setHomeButton(true);
    }
  }, [time]);

  const setTimer = () => {
    const interval = setInterval(() => {
      setTime((preTime) => {
        if (preTime !== 60) {
          return (preTime += 1);
        } else {
          clearInterval(interval);
          return 60;
        }
      });
    }, 1000);
  };
  return (
    <Card className="d-flex flex-column justify-content-center align-items-center">
      <CardHeader className="my-1 fs-2 align-items-center">
        !! Wait for the Order Accept !!
      </CardHeader>
      <CardBody style={{ width: '200px', height: '200px' }}>
        <CircularProgressbar
          value={time}
          maxValue={60}
          minValue={0}
          text={`${Math.floor((time * 100) / 60)}%`}
          styles={buildStyles({
            // Colors
            pathColor: `#7367f0`,
            textColor: '#7367f0',
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7',
          })}
        />

        {/* <Progress className="" color="success" striped value="25" /> */}
      </CardBody>
      <div className="d-flex flex-column justify-content-center align-items-center">
        {homeButton ? (
          <>
            <Link to="/home">
              <span>Back to home</span>
            </Link>
            <p>You will be notify when your order accepted</p>
          </>
        ) : (
          <></>
        )}
      </div>
    </Card>
  );
}

export default OrderAcceptPage;
