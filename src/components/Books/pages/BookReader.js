// src/components/Books/pages/BookReader.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import axios from "axios";
import voice from "../components/assetes/volume.png"
// import sum from "../components/assetes/sum.png"
// import summery from "../components/assetes/"
// import summery from "../../assets/summery.png";



const API_BASE_URL = "http://app.elfar5a.com";
const USER_TOKEN = localStorage.getItem("authToken");

// --- تم إعادة تصميم الـ CSS بالكامل لحل مشكلة التنسيق ---
const styles = `
  .reader-page-container {
    background-color: #f4f7f9; /* خلفية أفتح قليلاً */
    min-height: 100vh;
    font-family: sans-serif;
  }
  .reader-breadcrumbs {
    padding: 20px 5%; /* استخدام نسبة مئوية للمرونة */
    font-size: 14px;
    color: #555;
    background-color: #fff;
    border-bottom: 1px solid #e0e0e0;
  }
  .reader-breadcrumbs a {
    // color: #29436D;
    text-decoration: none;
    font-weight: 500;
  }
  .reader-breadcrumbs a:hover {
    text-decoration: underline;
  }
  .reader-breadcrumbs span {
    margin: 0 8px;
    color: #999;
  }

  /* حاوية المحتوى الرئيسية */
  .reader-main-content {
    display: flex;
    flex-direction: column; /* الأهم: جعل العناصر تحت بعضها */
    padding: 30px 5%;
    gap: 30px;
  }

  /* القسم العلوي الجديد: يحتوي على الغلاف والمعلومات */
  .reader-header {
    display: flex;
    gap: 30px;
    align-items: flex-start; /* محاذاة العناصر من الأعلى */
    background-color: #fff;
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }

  .reader-header-cover {
    flex-shrink: 0; /* منع الصورة من التقلص */
  }

  .reader-header-cover img {
    width: 150px; /* حجم مناسب للغلاف */
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  .reader-header-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  
  .reader-header-info h2 {
    font-size: 28px;
    margin: 0 0 5px 0;
    color: #2c3a50;
  }

  .reader-header-info .author-name {
    font-size: 16px;
    color: #667;
    margin-bottom: 20px;
  }

  .reader-header-buttons {
    display: flex;
    gap: 15px;
    margin-top: auto; /* يدفع الأزرار للأسفل إذا كان هناك مساحة */
  }

  /* قسم محتوى الكتاب الفعلي */
  .reader-content-column {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    padding: 40px;
    height: auto; /* الارتفاع يتحدد بالمحتوى */
    position: relative;
    line-height: 1.8;
    font-size: 17px;
    color: #333;
  }

  .reader-content-column .loading-message {
    text-align: center;
    font-size: 18px;
    color: #777;
    padding: 50px 0;
  }

  /* أزرار الإضافة والتنزيل */
  .action-button-primary, .action-button-secondary {
    padding: 10px 20px;
    border-radius: 6px;
    border: 1px solid transparent;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;
    display: inline-block;
    text-align: center;
  }
  .action-button-primary {
    background-color: #29436D;
    color: white;
  }
  .action-button-primary:hover {
    background-color: #385a94;
  }
  .action-button-secondary {
    background-color: #f0f4f8;
    color: #29436D;
    border: 1px solid #d1d9e6;
  }
  .action-button-secondary:hover {
    background-color: #e1e7f0;
  }

  /* ستايل الـ Tooltip لم يتغير */
  #reader-tooltip {
    position: absolute;
    background: #2c3a50;
    color: white;
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 14px;
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  #reader-tooltip button {
    background: transparent;
    border: none;
    cursor: pointer;
    color: #ffc107;
    font-size: 1.5em;
    padding: 0;
  }
`;

const Reader = () => {
  const { bookId } = useParams();
  const location = useLocation();

  const [bookData, setBookData] = useState(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [tooltip, setTooltip] = useState({
  //   visible: false, x: 0, y: 0, selectedText: ""
  // });
  const [tooltip, setTooltip] = useState({
  visible: false,
  x: 0,
  y: 0,
  // selectedText: "",
  translation: "",
});


  const contentRef = useRef(null);
  const initialBookTitle = location.state?.bookTitle || "Book Title";

  const handlePreviewBook = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setContent("");
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/document/preview-gutendexBook`,
        { book_id: bookId },
        { headers: USER_TOKEN ? { Authorization: `Bearer ${USER_TOKEN}` } : {} }
      );
      const data = res.data?.data;
      const fileUrl = data?.file_url;
      setBookData(data);
      if (!fileUrl) throw new Error("لم يتم العثور على رابط ملف المحتوى.");
      const fileRes = await axios.get(fileUrl, { headers: { Accept: "text/html" } });
      setContent(fileRes.data);
    } catch (err) {
      console.error("Error fetching book:", err);
      setError("حدث خطأ أثناء تحميل الكتاب: " + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    if (bookId) {
      handlePreviewBook();
    }
  }, [bookId, handlePreviewBook]);

  // const handleTextSelection = () => {
  //   const selection = window.getSelection();
  //   const selectedText = selection.toString().trim();
  //   if (selectedText.length > 0 && contentRef.current) {
  //     const range = selection.getRangeAt(0);
  //     const rect = range.getBoundingClientRect();
  //     const containerRect = contentRef.current.getBoundingClientRect();
  //     const x = rect.left - containerRect.left + rect.width / 2;
  //     const y = rect.top - containerRect.top + contentRef.current.scrollTop - 40;
  //     setTooltip({ visible: true, x, y, selectedText });
  //   } else {
  //     setTooltip((prev) => ({ ...prev, visible: false }));
  //   }
  // };

const handleTextSelection = async () => {
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();

  if (selectedText.length > 0 && contentRef.current) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const containerRect = contentRef.current.getBoundingClientRect();
    const x = rect.left - containerRect.left + rect.width / 2;
    const y = rect.top - containerRect.top + contentRef.current.scrollTop - 40;

    
    const formData = new FormData();
    formData.append("text", selectedText);
    formData.append("target", "ar"); // لغة الترجمة

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/translate/translate`,
        formData,
        {
          headers: {
            ...(USER_TOKEN && { Authorization: `Bearer ${USER_TOKEN}` }),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const translatedWord = res.data.translation || "لم يتم العثور على ترجمة";

      setTooltip({
        visible: true,
        x,
        y,
        // selectedText,
        translation: translatedWord,
      });
    } catch (err) {
      console.error("Translation API error:", err);
      setTooltip({
        visible: true,
        x,
        y,
        selectedText,
        translation: "فشل الترجمة",
      });
    }
  } else {
    setTooltip((prev) => ({ ...prev, visible: false }));
  }
};




  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltip.visible && !event.target.closest("#reader-tooltip")) {
        setTooltip((prev) => ({ ...prev, visible: false }));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [tooltip.visible]);

  // const handleSaveWord = () => {
  //   alert(`Word saved: "${tooltip.selectedText}"`);
  //   setTooltip((prev) => ({ ...prev, visible: false }));
  // };

  const handleAddMyProfile = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/document/import-gutendexbook`,
        {
          book_id: bookId,
          title: bookData?.title || initialBookTitle,
          format: "text/html",
        },
        { headers: { Authorization: `Bearer ${USER_TOKEN}` } }
      );
      alert("Book added to your profile successfully!");
    } catch (err) {
      alert("Failed to add book to profile: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="reader-page-container">
        <nav className="reader-breadcrumbs">
          <Link to="/">Home</Link> <span>/</span>
          <Link to="/books">Books</Link> <span>/</span> {bookData?.title || initialBookTitle}
        </nav>

        <main className="reader-main-content">
          {/* القسم العلوي الجديد */}
          {!isLoading && bookData && (
            <header className="reader-header">
              <div className="reader-header-cover">
                <img src={bookData.formats?.['image/jpeg']} alt={`Cover of ${bookData.title}`} />
              </div>
              <div className="reader-header-info">
                <h2>{bookData.title}</h2>
                {bookData.authors?.length > 0 && (
                  <p className="author-name">by {bookData.authors.map(a => a.name).join(', ')}</p>
                )}
                <div className="reader-header-buttons">
                  <button className="action-button-primary" onClick={handleAddMyProfile}>
                    Add to My Profile
                  </button>
                  {bookData.file_url && (
                    <a href={bookData.file_url} download className="action-button-secondary">
                      Download
                    </a>
                  )}
                </div>
              </div>
            </header>
          )}

          {/* قسم محتوى القراءة */}
          <section
            ref={contentRef}
            className="reader-content-column"
            onMouseUp={handleTextSelection}
          >
            {/* {tooltip.visible && (
              <div id="reader-tooltip" style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px`, transform: "translateX(-50%)" }}>
                <button onClick={handleSaveWord} title="Save this word">⭐</button>
                <span>{tooltip.selectedText}</span>
              </div>
            )} */}

{tooltip.visible && (
  <div
    id="reader-tooltip"
    style={{
      left: `${tooltip.x}px`,
      top: `${tooltip.y}px`,
      transform: "translateX(-50%)",
      background: "#f0f8ff",
      color: "#333",
      borderRadius: "8px",
      padding: "16px",
      width: "250px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    }}
  >
    <h4 style={{ margin: "0 0 8px 0" }}>{tooltip.selectedText}</h4>
    <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#777" }}>
      {tooltip.translation}
    </p>

    <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
      <button onClick={() => {
        const utterance = new SpeechSynthesisUtterance(tooltip.selectedText);
        speechSynthesis.speak(utterance);
      }}>
      <img src={voice} alt="Save" style={{ width: "20px", height: "20px" }} />
      </button>

      <button onClick={() => alert(`Saved: ${tooltip.selectedText}`)}>
      {/* <img src={summery} alt="Save" style={{ width: "20px", height: "20px" }} /> */}
        </button>

      <button>📝</button>
    </div>
  </div>
)}


            {isLoading && <p className="loading-message">جاري تحميل الكتاب...</p>}
            {error && <p className="loading-message" style={{ color: 'red' }}>{error}</p>}
            {!isLoading && !error && content && (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            )}
            {!isLoading && !error && !content && (
              <p className="loading-message">لم يتم العثور على محتوى لهذا الكتاب.</p>
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export default Reader;
