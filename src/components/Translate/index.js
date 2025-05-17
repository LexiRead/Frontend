import React , {useState} from "react";
import axios from "axios";
import "./index.css";
import "./global.css";
import "./guide.css";
import logo from "../../assets/images/logo.png";
import face from "../../assets/icons/facebook.png";
import gmail from "../../assets/icons/gmail.png";
import instgram from "../../assets/icons/instgram.png";
import text from "../../assets/icons/text.png";
import image from "../../assets/icons/image.png";
import Switch from "../../assets/icons/switch.png";
import paste from "../../assets/icons/paste.png";
import voice from "../../assets/icons/voice.png";
import copy from "../../assets/icons/copy.png";
const Translate = () => {



    return (
        <div>
            <div class="translate">
            <div class="div">
                <div class="frame-wrapper">
                <div class="frame-6">
                    <div class="frame-7">
                    <div class="group">
                        <img class="group" src={logo} />
                        <div class="lexi-read">
                        <img class="vector" src="img/vector-7.png" />
                        <img class="vector-2" src="img/vector-5.png" />
                        <img class="vector-3" src="img/vector-6.png" />
                        <img class="vector-4" src="img/vector-3.png" />
                        <img class="vector-5" src="img/image.png" />
                        <img class="vector-6" src="img/vector-2.png" />
                        <img class="vector-7" src="img/vector-4.png" />
                        <img class="vector-8" src="img/vector.png" />
                        </div>
                    </div>
                    <p class="p">
                        OurStudio is a digital agency UI / UX Design and Website Development located in Ohio, United States of
                        America OurStudio
                    </p>
                    </div>
                    <div class="frame-7">
                    <div class="text-wrapper-3">Follow Us</div>
                    <div class="frame-8">
                        <div class="frame-9">
                        <img class="img-2" src={face} />
                        <p class="text-wrapper-4">8819 Ohio St. South Gate, CA</p>
                        </div>
                        <div class="frame-10">
                        <img class="img-2" src={gmail} />
                        <div class="text-wrapper-4">Ourstudio@hello.com</div>
                        </div>
                        <div class="frame-10">
                        <img class="img-2" src={instgram}/>
                        <div class="text-wrapper-4">+1 386-688-3295</div>
                        </div>
                    </div>
                    </div>
                    <div class="frame-11">
                    <div class="div-wrapper"><div class="text-wrapper-5">About us</div></div>
                    <div class="frame-12"><div class="text-wrapper-5">Terms and Conditions</div></div>
                    <div class="frame-12"><div class="text-wrapper-5">privacy policy</div></div>
                    </div>
                </div>
                </div>
                <div class="frame-13">
                <div class="frame-14">
                    <div class="frame-15">
                    <img class="img-2" src={text}/>
                    <div class="text-wrapper-6">Text</div>
                    </div>
                    <div class="frame-16">
                    <img class="img-2" src={image} />
                    <div class="text-wrapper-6">images</div>
                    </div>
                </div>
                <div class="frame-17">
                    <div class="frame-18">
                    <div class="frame-19"><div class="text-wrapper-7">English (USA)</div></div>
                    <img class="img" src={Switch} />
                    <div class="frame-19"><div class="text-wrapper-7">Arabic(Egypt)</div></div>
                    </div>
                    <div class="frame-20">
                    <div class="frame-21">
                        <div class="frame-22"><div class="text-wrapper-8">Enter text...</div></div>
                        <div class="frame-23">
                        <div class="frame-24">
                            <img class="paste-svgrepo-com" src={paste} />
                            <div class="text-wrapper-9">Paste</div>
                        </div>
                        </div>
                    </div>
                    <div class="frame-25">
                        <div class="frame-26">
                        <div class="frame-22"><div class="text-wrapper-10">Translation</div></div>
                        <div class="frame-27">
                            <img class="img-2" src={voice} />
                            <div class="copy-wrapper"><img class="img-2" src={copy} /></div>
                        </div>
                        </div>
                        <div class="frame-28">
                        <div class="frame-29"><div class="text-wrapper-11">More Translations</div></div>
                        <div class="frame-30">
                            <div class="frame-31">
                            <div class="frame-32">
                                <div class="frame-33">
                                <div class="text-wrapper-12">استفتاء</div>
                                <div class="frame-23">
                                    <div class="text-wrapper-13">Noun</div>
                                    <div class="text-wrapper-14">questionnaires</div>
                                </div>
                                </div>
                            </div>
                            <div class="frame-34"></div>
                            </div>
                            <div class="frame-31">
                            <div class="frame-32">
                                <div class="frame-33">
                                <div class="text-wrapper-12">استطلاع</div>
                                <div class="frame-23">
                                    <div class="text-wrapper-13">Noun</div>
                                    <div class="text-wrapper-14">questionnaires, questionnaires, sc...</div>
                                </div>
                                </div>
                            </div>
                            <div class="frame-34"></div>
                            </div>
                            <div class="frame-31">
                            <div class="frame-32">
                                <div class="frame-33">
                                <div class="text-wrapper-12">نموذج الإستطلاع</div>
                                <div class="frame-23">
                                    <div class="text-wrapper-7">Noun</div>
                                    <div class="text-wrapper-14">questionnaire</div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
};
export default Translate;