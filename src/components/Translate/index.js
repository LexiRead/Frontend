import React, { useState, useEffect } from "react";
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
  const [inputText, setInputText] = useState("");
  const [translation, setTranslation] = useState("");
  const [moreTranslations, setMoreTranslations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("ar"); // اللغة الافتراضية هي العربي

  // تحقق من وجود الـ token عند تحميل الصفحة
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No token found. Please login first.");
    } else {
      console.log("Current Token from localStorage:", token);
    }
  }, []);

  // دالة تغيير اللغة
  const toggleLanguage = () => {
    setTargetLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const handleTranslate = async () => {
    if (!inputText) {
      setError("Please enter text to translate.");
      return;
    }

    setLoading(true);
    setError("");
    setTranslation("");
    setMoreTranslations([]);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No token available. Please login first.");
        return;
      }

      const response = await axios.post(
        "http://app.elfar5a.com/api/translate/translate",
        {
          text: inputText,
          target: targetLanguage,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      console.log("Full API Response:", JSON.stringify(data, null, 2));

      if (response.status === 200 && data.translation) {
        setTranslation(data.translation || "");
        setMoreTranslations([]);
      } else {
        setError(data.message || "Failed to translate text.");
      }
    } catch (error) {
      console.error("Error Details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      setError("An error occurred while translating. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // دالة الـ TTS
  const handleTTS = async () => {
    if (!translation) {
      setError("No translation available to convert to speech.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = "134|2BCpAbQyKQdjBcM9utPkh59yWs9GrMhNJIgtZDl754600790"; // الـ token اللي بعته
      const response = await axios.post(
        "http://app.elfar5a.com/api/tspeech/tts",
        {
          text: translation, // النص المترجم
          lang: "ar", // اللغة
          document_id: 1, // الـ document_id
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      console.log("TTS API Response:", JSON.stringify(data, null, 2));

      if (response.status === 200 && data.audio_url) {
        const audio = new Audio(data.audio_url); // إنشاء كائن Audio
        audio.play().catch((err) => {
          console.error("Audio play failed:", err);
          setError("Failed to play audio. Check browser permissions.");
        });
      } else {
        setError(data.message || "Failed to generate speech.");
      }
    } catch (error) {
      console.error("TTS Error Details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      setError("An error occurred while generating speech. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="trans">
      <div className="translate">
        <div className="div">
          <div className="frame-wrapper">
            <div className="frame-6">
              <div className="frame-7">
                <div className="group">
                  <img className="group" src={logo} />
                  <div className="lexi-read">
                    <img className="vector" src="img/vector-7.png" />
                    <img className="vector-2" src="img/vector-5.png" />
                    <img className="vector-3" src="img/vector-6.png" />
                    <img className="vector-4" src="img/vector-3.png" />
                    <img className="vector-5" src="img/image.png" />
                    <img className="vector-6" src="img/vector-2.png" />
                    <img className="vector-7" src="img/vector-4.png" />
                    <img className="vector-8" src="img/vector.png" />
                  </div>
                </div>
                <p className="p">
                  OurStudio is a digital agency UI / UX Design and Website Development located in Ohio, United States of
                  America OurStudio
                </p>
              </div>
              <div className="frame-7">
                <div className="text-wrapper-3">Follow Us</div>
                <div className="frame-8">
                  <div className="frame-9">
                    <img className="img-2" src={face} />
                    <p className="text-wrapper-4">8819 Ohio St. South Gate, CA</p>
                  </div>
                  <div className="frame-10">
                    <img className="img-2" src={gmail} />
                    <div className="text-wrapper-4">Ourstudio@hello.com</div>
                  </div>
                  <div className="frame-10">
                    <img className="img-2" src={instgram} />
                    <div className="text-wrapper-4">+1 386-688-3295</div>
                  </div>
                </div>
              </div>
              <div className="frame-11">
                <div className="div-wrapper">
                  <div className="text-wrapper-5">About us</div>
                </div>
                <div className="frame-12">
                  <div className="text-wrapper-5">Terms and Conditions</div>
                </div>
                <div className="frame-12">
                  <div className="text-wrapper-5">privacy policy</div>
                </div>
              </div>
            </div>
          </div>
          <div className="frame-13">
            <div className="frame-14">
              <div className="frame-15">
                <img className="img-2" src={text} />
                <div className="text-wrapper-6">Text</div>
              </div>
              <div className="frame-16">
                <img className="img-2" src={image} />
                <div className="text-wrapper-6">images</div>
              </div>
            </div>
            <div className="frame-17">
              <div className="frame-18">
                <div className="frame-19">
                  <div className="text-wrapper-7">
                    {targetLanguage === "ar" ? "English (USA)" : "Arabic (Egypt)"}
                  </div>
                </div>
                <img
                  className="img"
                  src={Switch}
                  onClick={toggleLanguage}
                  style={{ cursor: "pointer" }}
                />
                <div className="frame-19">
                  <div className="text-wrapper-7">
                    {targetLanguage === "ar" ? "Arabic (Egypt)" : "English (USA)"}
                  </div>
                </div>
              </div>
              <div className="frame-20">
                <div className="frame-21">
                  <div className="frame-22">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Enter text..."
                      className="text-wrapper-8"
                      style={{ border: "none", background: "transparent", width: "100%" }}
                    />
                  </div>
                  <div className="frame-23">
                    <div className="frame-24">
                      <img className="paste-svgrepo-com" src={paste} />
                      <div className="text-wrapper-9">Paste</div>
                    </div>
                    <div
                      className="frame-24"
                      onClick={handleTranslate}
                      style={{ cursor: "pointer", marginLeft: "10px" }}
                    >
                      <div className="text-wrapper-9">
                        {loading ? "Translating..." : "Translate"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="frame-25">
                  <div className="frame-26">
                    <div className="frame-22">
                      <div className="text-wrapper-10">
                        {translation || "Translation"}
                      </div>
                    </div>
                    <div className="frame-27">
                      <img
                        className="img-2"
                        src={voice}
                        onClick={handleTTS} // ربط أيقونة الـ voice بالـ TTS
                        style={{ cursor: "pointer" }}
                      />
                      <div className="copy-wrapper">
                        <img className="img-2" src={copy} />
                      </div>
                    </div>
                  </div>
                  <div className="frame-28">
                    <div className="frame-29">
                      <div className="text-wrapper-11">More Translations</div>
                    </div>
                    <div className="frame-30">
                      {moreTranslations.length > 0 ? (
                        moreTranslations.map((item, index) => (
                          <div className="frame-31" key={index}>
                            <div className="frame-32">
                              <div className="frame-33">
                                <div className="text-wrapper-12">{item.text}</div>
                                <div className="frame-23">
                                  <div className="text-wrapper-13">{item.type}</div>
                                  <div className="text-wrapper-14">{item.synonyms}</div>
                                </div>
                              </div>
                            </div>
                            {index < moreTranslations.length - 1 && (
                              <div className="frame-34"></div>
                            )}
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="frame-31">
                            <div className="frame-32">
                              <div className="frame-33">
                                <div className="text-wrapper-12">استفتاء</div>
                                <div className="frame-23">
                                  <div className="text-wrapper-13">Noun</div>
                                  <div className="text-wrapper-14">questionnaires</div>
                                </div>
                              </div>
                            </div>
                            <div className="frame-34"></div>
                          </div>
                          <div className="frame-31">
                            <div className="frame-32">
                              <div className="frame-33">
                                <div className="text-wrapper-12">استطلاع</div>
                                <div className="frame-23">
                                  <div className="text-wrapper-13">Noun</div>
                                  <div className="text-wrapper-14">
                                    questionnaires, questionnaires, sc...
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="frame-34"></div>
                          </div>
                          <div className="frame-31">
                            <div className="frame-32">
                              <div className="frame-33">
                                <div className="text-wrapper-12">نموذج الإستطلاع</div>
                                <div className="frame-23">
                                  <div className="text-wrapper-7">Noun</div>
                                  <div className="text-wrapper-14">questionnaire</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {error && (
                <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translate;