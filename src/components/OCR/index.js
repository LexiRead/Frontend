import React from "react";
import "../OCR/index.css";
import Logo from "../../assets/images/logo.png";
import text from "../../assets/icons/text.png";
import image from "../../assets/icons/image.png";
import upload from "../../assets/icons/upload.png";
import img from "../../assets/images/image.png";
import Switch from "../../assets/icons/switch.png";
const OCR = () => {
    return (
        <div className="ocr">
    <div class="translate">
      <div class="div">
        <div class="frame-wrapper">
          <div class="frame-8">
            <div class="frame-9">
              <div class="group">
                <img class="group" src={Logo} />
                <div class="lexi-read">
                  <img class="vector" src="img/vector-6.png" />
                  <img class="img" src="img/vector-13.png" />
                  <img class="vector-2" src="img/vector-9.png" />
                  <img class="vector-3" src="img/vector-10.png" />
                  <img class="vector-4" src="img/vector-2.png" />
                  <img class="vector-5" src="img/vector-15.png" />
                  <img class="vector-6" src="img/vector-4.png" />
                  <img class="vector-7" src="img/vector-8.png" />
                </div>
              </div>
              <p class="p">
                OurStudio is a digital agency UI / UX Design and Website Development located in Ohio, United States of
                America OurStudio
              </p>
            </div>
            <div class="frame-9">
              <div class="text-wrapper-4">Follow Us</div>
              <div class="frame-10">
                <div class="frame-11">
                  <img class="img-2" src="assets/icons/facebook.png" />
                  <p class="text-wrapper-5">8819 Ohio St. South Gate, CA</p>
                </div>
                <div class="frame-6">
                  <img class="img-2" src="assets/icons/gmail.png" />
                  <div class="text-wrapper-5">Ourstudio@hello.com</div>
                </div>
                <div class="frame-6">
                  <img class="img-2" src="assets/icons/instgram.png" />
                  <div class="text-wrapper-5">+1 386-688-3295</div>
                </div>
              </div>
            </div>
            <div class="frame-12">
              <div class="div-wrapper"><div class="text-wrapper-6">About us</div></div>
              <div class="frame-13"><div class="text-wrapper-6">Terms and Conditions</div></div>
              <div class="frame-13"><div class="text-wrapper-6">privacy policy</div></div>
            </div>
          </div>
        </div>
        <div class="frame-14">
          <div class="frame-15">
            <div class="frame-16">
              <img class="img-2" src={text} />
              <div class="text-wrapper-7">Text</div>
            </div>
            <div class="frame-17">
              <img class="img-2" src={image} />
              <div class="text-wrapper-7">images</div>
            </div>
          </div>
          <div class="frame-18">
            <div class="frame-19">
              <div class="frame-20">
                <div class="frame-21"><div class="frame-22"></div></div>
              </div>
            </div>
            <div class="frame-23">
              <div class="frame-24"><div class="text-wrapper-8">English (USA)</div></div>
              <img class="frame-25" src={Switch} />
              <div class="frame-24"><div class="text-wrapper-8">Arabic(Egypt)</div></div>
            </div>
          </div>
        </div>
        <div class="frame-26">
          <div class="text-wrapper-9">Click to Upload</div>
          <img class="cloud-upload-alt" src={upload} />
        </div>
        <img class="image" src={img} />
        <img class="image-2" src={img} />
      </div>
    </div>
        </div>
    );
};
export default OCR;