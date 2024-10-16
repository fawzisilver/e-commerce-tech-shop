import  { useState } from 'react';
import { Container, Row, Col, Collapse, Button } from 'react-bootstrap';

const Footer = () => {
  const [open, setOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="custom-footer">
      <Container>
        {/* Toggle button for small screens */}
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="footer-collapse"
          aria-expanded={open}
          className="d-md-none mb-3 w-100 btn-hover bg-white text-black border-dark-subtle border-none" // Only visible on small screens
        >
          Footer Menu
        </Button>

        {/* Collapsible content for small screens */}
        <Collapse in={open} className="d-md-none">
          <div id="footer-collapse">
            <Row>
              <Col className="text-center">
                <h6 className="my-3 fw-normal">Customer Support</h6>
                <ul className="list-unstyled fw-lighter">
                    <li className="text-hover-primary">Contact Us</li>
                    <li className="text-hover-primary">Returns & Exchanges</li>
                    <li className="text-hover-primary">About TechShop</li>
                  </ul>
              </Col>
              <Col className="text-center">
                <h6 className="my-3 fw-normal">Account</h6>
                <ul className="list-unstyled fw-lighter">
                  <li className='text-hover-primary'>Order Status</li>
                  <li className='text-hover-primary'>Manage Account</li>
                  <li className='text-hover-primary'>Preference Center</li>
                </ul>
              </Col>
              <Col className="text-center">
                <h6 className="my-3 fw-normal">Services</h6>
                <ul className="list-unstyled fw-lighter">
                  <li className='text-hover-primary'>Tech Support</li>
                  <li className='text-hover-primary'>Membership</li>
                  <li className='text-hover-primary'>Financing</li>
                </ul>
              </Col>
            </Row>
          </div>
        </Collapse>

        {/* Normal footer content for larger screens */}
        <Row className="d-none d-md-flex justify-content-center">
          <Col md={3} className="text-center">
            <h6 className="my-3 fw-normal">Customer Support</h6>
            <ul className="list-unstyled fw-lighter">
              <li className='text-hover-primary'>Contact Us</li>
              <li className='text-hover-primary'>Returns & Exchanges</li>
              <li className='text-hover-primary'>About TechShop</li>
            </ul>
          </Col>

          <Col md={3} className="text-center">
            <h6 className="my-3 fw-normal">Account</h6>
            <ul className="list-unstyled fw-lighter">
              <li className='text-hover-primary'>Order Status</li>
              <li className='text-hover-primary'>Manage Account</li>
              <li className='text-hover-primary'>Preference Center</li>
            </ul>
          </Col>

          <Col md={3} className="text-center">
            <h6 className="my-3 fw-normal">Services</h6>
            <ul className="list-unstyled fw-lighter">
              <li className='text-hover-primary'>Tech Support</li>
              <li className='text-hover-primary'>Membership</li>
              <li className='text-hover-primary'>Financing</li>
            </ul>
          </Col>
        </Row>

        {/* Footer copyright information */}
        <Row className="pt-3">
          <Col className="text-center">
            <p>TechShop &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
