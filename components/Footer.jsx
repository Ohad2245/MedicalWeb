import Link from "next/link";
import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2023 ShovalOhad All rights reserved</p>
      <p className="icons">
        <AiFillInstagram />

        <AiOutlineTwitter />
      </p>
      <p className="logo">
        <Link href="/Home">
          <img src={"/logo.png"} width={100} style={{ cursor: "pointer" ,filter:'blur(1px)'}} />
        </Link>
      </p>
    </div>
  );
};

export default Footer;
