// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE_URL = "http://app.elfar5a.com";
// const USER_TOKEN = localStorage.getItem("authToken");

// const Memorized = () => {
//   const [words, setWords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchWords = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const response = await axios.get(`${API_BASE_URL}/api/wordlist/`, {
//           headers: {
//             Authorization: `Bearer ${USER_TOKEN}`,
//             Accept: "application/json",
//             "Cache-Control": "no-cache",
//           },
//         });

//         console.log("API Response:", response.data);
//         setWords(response.data.data || []); // تأكد إن البيانات موجودة
//       } catch (err) {
//         console.error("API Error:", err);
//         setError("Failed to fetch words.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWords();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div>
//       <h1>Memorized Words</h1>
//       {words.length === 0 ? (
//         <p>No words found.</p>
//       ) : (
//         <ul>
//           {words.map((word, index) => (
//             <li key={index}>
//               <strong>Original:</strong> {word.original_text} <br />
//               <strong>Translated:</strong> {word.translated_text}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Memorized;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import "./global.css";
import "./guide.css";
import logo from "../../assets/images/logo.png";
import face from "../../assets/icons/facebook.png";
import gmail from "../../assets/icons/gmail.png";
import instgram from "../../assets/icons/instgram.png";
import Sorting from "../../assets/icons/sorting.png";

const API_BASE_URL = "http://app.elfar5a.com";
const USER_TOKEN = localStorage.getItem("authToken");

const Memorized = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWords = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(`${API_BASE_URL}/api/wordlist/`, {
          headers: {
            Authorization: `Bearer ${USER_TOKEN}`,
            Accept: "application/json",
            "Cache-Control": "no-cache",
          },
        });

        console.log("API Response:", response.data);
        setWords(response.data.data || []);
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to fetch words.");
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, []);

  return (
    <div className="word-list-memorized">
      <div className="div">
        {/* Header */}
        <div className="frame-wrapper">
          <div className="frame-8">
            <div className="frame-9">
              <div className="group">
                <img className="group" src={logo} alt="Logo" />
              </div>
              <p className="p">
                OurStudio is a digital agency UI / UX Design and Website
                Development located in Ohio, United States of America OurStudio
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
                  <img className="img-2" src={instgram} alt="Instagram" />
                  <div className="text-wrapper-5">‪+1 386-688-3295‬</div>
                </div>
              </div>
            </div>

            <div className="frame-12">
              <div className="div-wrapper">
                <div className="text-wrapper-6">About us</div>
              </div>
              <div className="frame-13">
                <div className="text-wrapper-6">Terms and Conditions</div>
              </div>
              <div className="frame-13">
                <div className="text-wrapper-6">Privacy Policy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Title and Sorting */}
        <div className="frame-14">
          <p className="text-wrapper-7">Word List &gt; Memorized Words</p>
          <div className="frame-15">
            <img className="img-2" src={Sorting} alt="Sorting" />
            <div className="text-wrapper-8">Sort by</div>
          </div>
        </div>

        {/* Word List */}
        <div className="frame-16">
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!loading && !error && words.length === 0 && <p>No words found.</p>}

          {!loading && !error && words.map((word, index) => (
            <div key={index} className="word-list-button-wrapper">
              <div className="word-list-button">
                <div className="frame-17">
                  <div className="frame-18">
                    <div className="frame-19">
                      <div className="frame-10">
                        <div className="text-wrapper-9">
                          {word.original_text}
                        </div>
                        <div className="frame-20">
                          <div className="text-wrapper-10">Translated:</div>
                          <p className="text-wrapper-11">
                            {word.translated_text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Memorized;
