import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import DiamondIcon from '@mui/icons-material/Diamond';
import BusinessIcon from '@mui/icons-material/Business';
import FlightIcon from '@mui/icons-material/Flight';
import PublicIcon from '@mui/icons-material/Public';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-light py-4 mb-0 footer" style={{}}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <Link to={"/"} className="navbar-brand">
              <img src="https://diamant.kwst.net/site/images/logo2.png" alt="" width={150} />
            </Link>
            <p>Departure defective arranging rapturous did believe him all had supported.</p>
            <ul className="list-unstyled my-3">
              <li><LocalPhoneOutlinedIcon />: +123 456 7890</li>
              <li><MailOutlineOutlinedIcon />: info@example.com</li>
              <li>Address: 123 Street, City, Country</li>
            </ul>
          </div>
          <div className="col-md-2 mb-3 my-2">
            <h5>Page</h5>
            <ul className="list-unstyled my-3">
              <li>About us</li>
              <li>Sign up</li>
              <li>Sign in</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="col-md-2 mb-3 my-2">
            <h5>Link</h5>
            <ul className="list-unstyled my-3">
              <li>About us</li>
              <li>Contact us</li>
              <li>News and Blog</li>
              <li>Meet a Team</li>
              <li>Terms</li>
              <li>Cookie</li>
              <li>Support</li>
            </ul>
          </div>
          <div className="col-md-2 mb-3 my-2">
            <h5>Global Site</h5>
            <ul className="list-unstyled my-3">
              <li>India</li>
              <li>California</li>
              <li>Indonesia</li>
              <li>Canada</li>
              <li>Malaysia</li>
            </ul>
          </div>
          <div className="col-md-2 mb-3 my-2">
            <h5>Booking</h5>
            <ul className="list-unstyled my-3">
              <li><BusinessIcon /> Hotel</li>
              <li><FlightIcon /> Flight</li>
              <li><PublicIcon /> Tour</li>
              <li><DriveEtaIcon /> Cabs</li>
            </ul>
          </div>
        </div>
        <div className="row my-5">
          <div className="col-md-6 text-start">
            <h3>Payment & Security</h3>
            <div className='row'>
              <div className="col"><img src="https://themes.coderthemes.com/booking_v/assets/paypal-CnQJ_SOt.svg" alt="" style={{ width: "80px", height: "40px" }} />
                <img src="data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27utf-8%27?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2023.0.0,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version=%271.1%27%20id=%27Layer_1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%20x=%270px%27%20y=%270px%27%20width=%272426.5px%27%20height=%271530.8px%27%20viewBox=%270%200%202426.5%201530.8%27%20style=%27enable-background:new%200%200%202426.5%201530.8;%27%20xml:space=%27preserve%27%3e%3cstyle%20type=%27text/css%27%3e%20.st0{fill-rule:evenodd;clip-rule:evenodd;fill:%23FFFFFF;}%20.st1{fill-rule:evenodd;clip-rule:evenodd;fill:%23315881;}%20.st2{fill-rule:evenodd;clip-rule:evenodd;fill:%23DFA43B;}%20%3c/style%3e%3cg%3e%3cpath%20class=%27st0%27%20d=%27M158.6,0h2109.2c87.6,0,158.6,71,158.6,158.6v1213.5c0,87.6-71,158.6-158.6,158.6H158.6%20C71,1530.8,0,1459.7,0,1372.1V158.6C0,71,71,0,158.6,0z%27/%3e%3cpath%20class=%27st1%27%20d=%27M2426.5,174.4C2426.5,57.8,2365.9,0,2248.4,0H178C119.3,0,76.2,15.6,47.7,47.7C15.6,79.8,0,121.1,0,174.4v1182%20c0,53.2,15.6,93.6,47.7,126.6c33,32.1,75.3,47.7,130.3,47.7h2070.4c117.5,0,178.1-58.7,178.1-174.4V174.4z%20M2248.4,27.5%20c97.3,0,146.8,49.6,146.8,146.8v1182c0,98.2-49.6,146.8-146.8,146.8H178c-46.8,0-82.6-13.8-109.2-41.3%20c-27.5-26.6-41.3-63.3-41.3-105.5v-1182C27.5,77.1,76.2,27.5,178,27.5H2248.4z%27/%3e%3cpath%20class=%27st1%27%20d=%27M194.6,95.4c-39.5,0-64.2,6.4-78,20.2c-11.9,15.6-17.4,41.3-17.4,78.9v256h2228.2v-256%20c0-67-33.1-99.1-99.1-99.1H194.6z%27/%3e%3cpath%20class=%27st2%27%20d=%27M99.1,1332.5c0,67.9,32.1,102.8,95.4,102.8h2033.7c66.1,0,99.1-34.9,99.1-102.8v-256H99.1V1332.5z%27/%3e%3cpath%20class=%27st1%27%20d=%27M837,559.8c0,11.9-1.8,21.1-6.4,27.5L670,867.3l-10.1-341.4h-257l86.3,41.3c24.8,15.6,37.6,35.8,37.6,61.5%20l23.9,362.5h125.7l301-465.3H823.2C832.4,534.1,837,547,837,559.8z%20M1875.9,539.6l10.1-13.8H1729c5.5,5.5,7.3,8.3,7.3,10.1%20c-1.9,7.3-5.5,11.9-7.3,17.4L1500.5,970c-5.5,7.3-11,13.8-17.4,21.1h129.4l-6.4-13.8c0-11.9,6.4-33.9,20.2-65.1l27.5-51.4h133.1%20c5.5,43.1,9.2,78.9,11,105.6l-11,24.8h160.6l-23.9-34.9L1875.9,539.6L1875.9,539.6z%20M1780.4,795.7H1685l81.7-156.9L1780.4,795.7z%20M1383.9,502c-49.5,0-91.8,13.8-129.4,41.3c-41.3,23.9-61.5,54.1-61.5,91.8c0,43.1,14.7,80.8,44,109.2l89,61.5%20c32.1,23,47.7,43.1,47.7,61.5c0,17.4-8.3,33-23.9,45c-15.6,11.9-33.1,17.4-55.1,17.4c-32.1,0-87.2-22.9-163.4-65.1v85.3%20c59.6,35.8,117.5,54.2,173.4,54.2c53.2,0,98.2-14.7,136.8-47.7c41.3-30.3,61.5-66.1,61.5-105.5c0-33.1-14.7-63.3-47.7-95.5%20l-85.4-61.5c-28.4-22.9-44-43.1-44-58.7c0-35.8,21.1-54.1,64.2-54.1c29.4,0,72.5,16.5,130.3,51.4l17.5-89%20C1489.5,515.8,1439,502,1383.9,502L1383.9,502z%20M1042.5,991.1c-1.8-19.3-5.5-36.7-7.4-55.1l116.6-376.3l27.5-34h-167.9%20c1.8,8.3,3.7,19.3,5.5,27.5c0,8.3,0,18.4-1.8,27.5L898.5,953.5l-23.9,37.6L1042.5,991.1L1042.5,991.1z%27/%3e%3c/g%3e%3c/svg%3e" style={{ width: "80px", height: "40px" }} alt="" />
                <img src="https://themes.coderthemes.com/booking_v/assets/mastercard-DsB0xFij.svg" alt="" style={{ width: "80px", height: "40px" }} />
                <img src="https://themes.coderthemes.com/booking_v/assets/expresscard-CXNv2BxY.svg" alt="" style={{ width: "80px", height: "40px" }} />
              </div>
            </div>
          </div>
          <div className="col-md-6 text-end">
            <h3>Follow us on</h3>
            <div className="row">
              <div className="col">
                <FacebookIcon color="primary" sx={{ fontSize: 40 }} />
                <InstagramIcon color="secondary" sx={{ fontSize: 40 }} />
                <TwitterIcon color="primary" sx={{ fontSize: 40 }} />
                <LinkedInIcon color="primary" sx={{ fontSize: 40 }} />
              </div>
            </div>
          </div>
        </div>
        <div className="row border-top p-3">
          <div className="col-md-6 text-start">
            <p> Copyrights ©2024 Booking. Build by <Link>Nguyễn Bảo Hòa</Link> </p>
          </div>
          <div className="col-md-6 text-end p-2">
            <Link className="mx-2" style={{ textDecoration: 'none', color: 'white' }}>Privacy policy</Link>
            <Link className="mx-2" style={{ textDecoration: 'none', color: 'white' }}>Terms and conditions</Link>
            <Link className="mx-2" style={{ textDecoration: 'none', color: 'white' }}>Refund policy</Link>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer