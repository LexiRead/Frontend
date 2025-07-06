import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import "./global.css";
import "./guide.css";
import logo from "../../assets/images/logo.png";
import face from "../../assets/icons/facebook.png";
import gmail from "../../assets/icons/gmail.png";
import instgram from "../../assets/icons/instgram.png";
import Sorting from "../../assets/icons/sorting.png";
import Close from "../../assets/icons/close.png";
import Voice from "../../assets/icons/voice.png";

const Memorized = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch word list
  useEffect(() => {
    const fetchWordList = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Token not found. Please log in first.");
          return;
        }

        console.log("Current Token from localStorage:", token);
        const response = await axios.get("http://app.elfar5a.com/api/wordlist/", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            lang: "ar",
            document_id: 1,
          },
        });

        const data = response.data;
        console.log("Word List API Response:", JSON.stringify(data, null, 2));

        if (response.status === 200 && data.data) {
          // Add default is_favourite if not present
          setWords(data.data.map(word => ({ ...word, is_favourite: word.is_favourite || false })));
        } else {
          setError("Failed to fetch word list.");
        }
      } catch (error) {
        console.error("Error fetching word list:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        setError("An error occurred while fetching the word list. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWordList();
  }, []);

  // Delete word function
  const deleteWord = async (wordId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Token not found. Please log in first.");
        return;
      }

      await axios.delete(`http://app.elfar5a.com/api/wordlist/${wordId}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Update state by removing the deleted word
      setWords(words.filter((word) => word.id !== wordId));
      console.log(`Word with ID ${wordId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting word:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      setError("An error occurred while deleting the word. Please try again.");
    }
  };

  // Toggle favorite function
  const toggleFavorite = async (wordId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Token not found. Please log in first.");
        return;
      }

      console.log(`Sending POST request to toggle favorite for word ID ${wordId} with token: ${token}`);
      const response = await axios.post(
        `http://app.elfar5a.com/api/favourites/toggle/${wordId}`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Toggle Favorite API Response:", JSON.stringify(response.data, null, 2));
      // Check if is_favourite is present in the response
      const is_favourite = response.data.is_favourite !== undefined 
        ? response.data.is_favourite 
        : !words.find(word => word.id === wordId).is_favourite;
      // Update is_favourite status in the state
      setWords(
        words.map((word) =>
          word.id === wordId ? { ...word, is_favourite } : word
        )
      );
      console.log(`Favorite toggled for word ID ${wordId}: ${is_favourite}`);
    } catch (error) {
      console.error("Error toggling favorite:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      setError(`An error occurred while toggling favorite status: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="word-list-memorized">
        <div className="div">
          <div className="frame-wrapper">
            <div className="frame-8">
              <div className="frame-9">
                <div className="group">
                  <img className="group" src={logo} alt="Logo" />
                </div>
                <p className="p">
                  OurStudio is a digital agency UI / UX Design and Website Development located in Ohio, United States of
                  America
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
                    <div className="text-wrapper-5">+1 386-688-3295</div>
                  </div>
                </div>
              </div>
              <div className="frame-12">
                <div className="div-wrapper">
                  <div className="text-wrapper-6">About Us</div>
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
          <div className="frame-14">
            <p className="text-wrapper-7">Word List Memorized Words</p>
            <div className="frame-15">
              <img className="img-2" src={Sorting} alt="Sort" />
              <div className="text-wrapper-8">Sort By</div>
            </div>
          </div>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {words.length === 0 && !loading && !error && <p>No memorized words available.</p>}
          <div className="frame-16">
            {words.slice(0, 2).map((word) => (
              <div className="word-list-button-wrapper" key={word.id}>
                <div className="word-list-button">
                  <div className="frame-17" style={{ position: "relative" }}>
                    <i
                      className={word.is_favourite ? "fas fa-heart favorite-icon" : "far fa-heart favorite-icon"}
                      style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }}
                      onClick={() => toggleFavorite(word.id)}
                    />
                    <div className="frame-18">
                      <div className="frame-19">
                        <div className="frame-10">
                          <div className="text-wrapper-9">{word.original_text}</div>
                          <div className="frame-20">
                            <div className="text-wrapper-10">Translated Text:</div>
                            <p className="text-wrapper-11">{word.translated_text || "No translation available"}</p>
                            <div className="text-wrapper-12">Target Language:</div>
                            <p className="text-wrapper-13">{word.target_language}</p>
                          </div>
                        </div>
                      </div>
                      <div className="volume-high-wrapper">
                        {word.audio_url && (
                          <img
                            className="img-2"
                            src={Voice}
                            alt="Voice"
                            onClick={() => new Audio(word.audio_url).play()}
                          />
                        )}
                      </div>
                    </div>
                    <img
                      className="img-2 close-icon"
                      src={Close}
                      alt="Close"
                      onClick={() => deleteWord(word.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="frame-22">
            {words.slice(2, 4).map((word) => (
              <div className="word-list-button-wrapper" key={word.id}>
                <div className="word-list-button">
                  <div className="frame-17" style={{ position: "relative" }}>
                    <i
                      className={word.is_favourite ? "fas fa-heart favorite-icon" : "far fa-heart favorite-icon"}
                      style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }}
                      onClick={() => toggleFavorite(word.id)}
                    />
                    <div className="frame-18">
                      <div className="frame-19">
                        <div className="frame-10">
                          <div className="text-wrapper-9">{word.original_text}</div>
                          <div className="frame-20">
                            <div className="text-wrapper-10">Translated Text:</div>
                            <p className="text-wrapper-11">{word.translated_text || "No translation available"}</p>
                            <div className="text-wrapper-12">Target Language:</div>
                            <p className="text-wrapper-13">{word.target_language}</p>
                          </div>
                        </div>
                      </div>
                      <div className="volume-high-wrapper">
                        {word.audio_url && (
                          <img
                            className="img-2"
                            src={Voice}
                            alt="Voice"
                            onClick={() => new Audio(word.audio_url).play()}
                          />
                        )}
                      </div>
                    </div>
                    <img
                      className="img-2 close-icon"
                      src={Close}
                      alt="Close"
                      onClick={() => deleteWord(word.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Memorized;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./index.css";
// import "./global.css";
// import "./guide.css";
// import logo from "../../assets/images/logo.png";
// import face from "../../assets/icons/facebook.png";
// import gmail from "../../assets/icons/gmail.png";
// import instgram from "../../assets/icons/instgram.png";
// import Sorting from "../../assets/icons/sorting.png";

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
//         setWords(response.data.data || []);
//       } catch (err) {
//         console.error("API Error:", err);
//         setError("Failed to fetch words.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWords();
//   }, []);

//   return (
//     <div className="word-list-memorized">
//       <div className="div">
//         {/* Header */}
//         <div className="frame-wrapper">
//           <div className="frame-8">
//             <div className="frame-9">
//               <div className="group">
//                 <img className="group" src={logo} alt="Logo" />
//               </div>
//               <p className="p">
//                 OurStudio is a digital agency UI / UX Design and Website
//                 Development located in Ohio, United States of America OurStudio
//               </p>
//             </div>

//             <div className="frame-9">
//               <div className="text-wrapper-4">Follow Us</div>
//               <div className="frame-10">
//                 <div className="frame-11">
//                   <img className="img-2" src={face} alt="Facebook" />
//                   <p className="text-wrapper-5">8819 Ohio St. South Gate, CA</p>
//                 </div>
//                 <div className="frame-6">
//                   <img className="img-2" src={gmail} alt="Gmail" />
//                   <div className="text-wrapper-5">Ourstudio@hello.com</div>
//                 </div>
//                 <div className="frame-6">
//                   <img className="img-2" src={instgram} alt="Instagram" />
//                   <div className="text-wrapper-5">‪+1 386-688-3295‬</div>
//                 </div>
//               </div>
//             </div>

//             <div className="frame-12">
//               <div className="div-wrapper">
//                 <div className="text-wrapper-6">About us</div>
//               </div>
//               <div className="frame-13">
//                 <div className="text-wrapper-6">Terms and Conditions</div>
//               </div>
//               <div className="frame-13">
//                 <div className="text-wrapper-6">Privacy Policy</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Title and Sorting */}
//         <div className="frame-14">
//           <p className="text-wrapper-7">Word List &gt; Memorized Words</p>
//           <div className="frame-15">
//             <img className="img-2" src={Sorting} alt="Sorting" />
//             <div className="text-wrapper-8">Sort by</div>
//           </div>
//         </div>

//         {/* Word List */}
//         <div className="frame-16">
//           {loading && <p>Loading...</p>}
//           {error && <p style={{ color: "red" }}>{error}</p>}
//           {!loading && !error && words.length === 0 && <p>No words found.</p>}

//           {!loading && !error && words.map((word, index) => (
//             <div key={index} className="word-list-button-wrapper">
//               <div className="word-list-button">
//                 <div className="frame-17">
//                   <div className="frame-18">
//                     <div className="frame-19">
//                       <div className="frame-10">
//                         <div className="text-wrapper-9">
//                           {word.original_text}
//                         </div>
//                         <div className="frame-20">
//                           <div className="text-wrapper-10">Translated:</div>
//                           <p className="text-wrapper-11">
//                             {word.translated_text}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Memorized;
