import React from 'react';
import { useState } from 'react';
import { Code } from 'react-feather';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Badge,
  Card,
  CardBody,
} from 'reactstrap';
import { FaRupeeSign } from 'react-icons/fa';
// const images = [
//   {
//     src: sliderImage2,
//     id: 1,
//   },
//   {
//     src: sliderImage3,
//     id: 2,
//   },
//   {
//     src: sliderImage1,
//     id: 3,
//   },
// ];

function PreviousOrders() {
  // ** State
  const [open, setOpen] = useState('');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  return (
    <>
      <Card className="card-snippet">
        <CardBody>
          <div className="d-flex justify-content-between align-items-center">
            <Badge color="primary">12, Aug 2023</Badge>
            <p className="fs-2 mb-0 text-center" style={{ padding: '5px 0px' }}>
              <FaRupeeSign size={18} /> <strong>850</strong>
            </p>
          </div>
          <Accordion open={open} toggle={toggle}>
            <AccordionItem>
              <AccordionHeader targetId="1" className="p-0">
                Order Details
              </AccordionHeader>
              <AccordionBody
                accordionId="1"
                className="p-0"
                style={{ paddingBottom: '0px 0px 0px' }}
              >
                <div className="d-flex justify-content-between">
                  <p className="mb-0">Hello</p>
                  <p className="mb-0">2</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-0">Hello</p>
                  <p className="mb-0">2</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-0">Hello</p>
                  <p className="mb-0">2</p>
                </div>
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        </CardBody>
      </Card>
    </>
  );
}

export default PreviousOrders;
