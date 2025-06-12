import React, { useState, useEffect } from "react";
import "../Lexibot/index.css";
import "../Lexibot/global.css";
import "../Lexibot/guide.css";
import Logo from "../../assets/images/logo.png";
import face from "../../assets/icons/facebook.png";
import gmail from "../../assets/icons/gmail.png";
import instagram from "../../assets/icons/instgram.png";
import f60 from "../../assets/icons/Frame 60.png";
import send from "../../assets/icons/send-2.png";

const Lexibot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API URL
  const apiUrl = "http://app.elfar5a.com/api/chat?title=first%20chat";

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        // جلب الـ token من localStorage
        const token = localStorage.getItem("token"); // لو المفتاح مختلف، غيّره (مثل "authToken")
        if (!token) {
          throw new Error("لم يتم العثور على توكن المصادقة في localStorage");
        }

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // إضافة الـ token في رأس الطلب
          },
        });

        if (!response.ok) {
          throw new Error(`فشل تحميل سجل الدردشة: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setChatHistory(data); // افتراض أن البيانات عبارة عن مصفوفة من الدردشات
        setLoading(false);
      } catch (err) {
        setError(`خطأ: ${err.message}`);
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, []);

  return (
    <div className="lexi">
      <div className="lexi-bot">
        <div className="div">
          <div className="frame-wrapper">
            <div className="frame-8">
              <div className="frame-9">
                <div className="group">
                  <img className="group" src={Logo} alt="Logo" />
                </div>
                <p className="p">
                  OurStudio is a digital agency UI / UX Design and Website Development located in Ohio, United States of America OurStudio
                </p>
              </div>
              <div className="frame-9">
                <div className="text-wrapper-4">Follow Us</div>
                <div className="frame-10">
                  <div className="frame-11">
                    <img className="img-2" src={face} alt="Facebook" />
                    <p className="text-wrapper-5">8819 Ohio St. South Gate, CA</p>
                  </div>
                  <div className="frame-6">
                    <img className="img-2" src={gmail} alt="Gmail" />
                    <div className="text-wrapper-5">Ourstudio@hello.com</div>
                  </div>
                  <div className="frame-6">
                    <img className="img-2" src={instagram} alt="Instagram" />
                    <div className="text-wrapper-5">+1 386-688-3295</div>
                  </div>
                </div>
              </div>
              <div className="frame-12">
                <div className="div-wrapper"><div className="text-wrapper-6">About us</div></div>
                <div className="frame-13"><div className="text-wrapper-6">Terms and Conditions</div></div>
                <div className="frame-13"><div className="text-wrapper-6">Privacy Policy</div></div>
              </div>
            </div>
          </div>
          <div className="frame-14">
            <div className="frame-15"><div className="text-wrapper-7">Lexi Bot</div></div>
          </div>
          <div className="frame-16">
            <div className="frame-17">
              <div className="frame-18">
                <p className="text-wrapper-8">Text Here Text Here Text Here</p>
                <img className="img-2" src={send} alt="Send" />
              </div>
            </div>
          </div>
          <div className="frame-19">
            <img className="frame-20" src={f60} alt="Frame" />
            <p className="text-wrapper-9">How can I help you today?</p>
          </div>
          <div className="overlap-group">
            <div className="frame-21">
              <div className="text-wrapper-10">New Chat</div>
              <img className="frame-22" src={f60} alt="Frame" />
            </div>
            <div className="text-wrapper-11">History Lexi</div>
            {loading && <p>جاري تحميل سجل الدردشة...</p>}
            {error && <p>{error}</p>}
            {chatHistory.length > 0 ? (
              chatHistory.map((chat, index) => (
                <div className="frame-chat" key={index}>
                  <div className="text-wrapper-12">{chat.title || "دردشة بدون عنوان"}</div>
                  <img className="frame-22" src={f60} alt="Frame" />
                </div>
              ))
            ) : (
              !loading && <p>لا يوجد سجل دردشة متاح.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lexibot;