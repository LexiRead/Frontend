import React from "react";
import "./style.css";
import "./global.css";
import "./guide.css";
import logo from "../../assets/images/logo.png";
import face from "../../assets/icons/facebook.png";
import gmail from "../../assets/icons/gmail.png";
import instgram from "../../assets/icons/instgram.png";
import view from "../../assets/icons/viewlist.png";
import target from "../../assets/icons/target.png";
const Wordlist = () => {
    return (
        <div className="trans">
            <div class="word-list">
            <div class="div">
                <div class="frame-wrapper">
                <div class="frame-8">
                    <div class="frame-9">
                    <div class="group">
                        <img class="group" src={logo} />
                        <div class="lexi-read">
                        <img class="vector" src="img/vector-11.png" />
                        <img class="img" src="img/vector-5.png" />
                        <img class="vector-2" src="img/vector-8.png" />
                        <img class="vector-3" src="img/vector-15.png" />
                        <img class="vector-4" src="img/vector-9.png" />
                        <img class="vector-5" src="img/vector-6.png" />
                        <img class="vector-6" src="img/vector-4.png" />
                        <img class="vector-7" src="img/vector-14.png" />
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
                        <img class="img-2" src={face} />
                        <p class="text-wrapper-5">8819 Ohio St. South Gate, CA</p>
                        </div>
                        <div class="frame-6">
                        <img class="img-2" src={gmail} />
                        <div class="text-wrapper-5">Ourstudio@hello.com</div>
                        </div>
                        <div class="frame-6">
                        <img class="img-2" src={instgram} />
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
                <img class="view-list-svgrepo" src={view} />
                <div class="frame-15">
                    <div class="text-wrapper-7">Memorized Words</div>
                    <p class="text-wrapper-8">Words memorized from reading books</p>
                </div>
                </div>
                <div class="frame-16">
                <img class="target-svgrepo-com" src={target} />
                <div class="frame-17"><p class="text-wrapper-9">Exercises on words memorized from books</p></div>
                <div class="frame-18">
                    <div class="frame-19"><div class="text-wrapper-10">MCQ</div></div>
                    <div class="frame-20"><div class="text-wrapper-10">Flash card</div></div>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
};
export default Wordlist;