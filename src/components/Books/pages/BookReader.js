// src/components/Books/pages/BookReader.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://app.elfar5a.com";
const USER_TOKEN = localStorage.getItem("authToken");

// تم إضافة ستايلات الـ Tooltip هنا
const styles = `
  /* ... كل الـ CSS السابق الخاص بك موجود هنا ... */
  .reader-page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #EBF9FF;
    font-family: sans-serif;
  }
  .reader-breadcrumbs {
    padding: 15px 30px;
    font-size: 14px;
    color: #555;
  }
  .reader-breadcrumbs a {
    color: #29436D;
    text-decoration: none;
  }
  .reader-breadcrumbs a:hover {
    text-decoration: underline;
  }
  .reader-breadcrumbs span {
    margin: 0 5px;
    color: #777;
  }
  .reader-main-content {
    display: flex;
    flex-grow: 1;
    padding: 30px;
    gap: 30px;
  }
  .reader-cover-column {
    flex-basis: 30%;
    max-width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .reader-cover-column img {
    width: 100%;
    max-width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  .reader-actions {
    display: flex;
    gap: 15px;
    width: 100%;
  }
  .reader-actions button, .reader-actions a {
    flex-grow: 1;
    padding: 12px 15px;
    border-radius: 6px;
    border: 1px solid transparent;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.2s ease, border-color 0.2s ease;
  }
  .action-button-primary {
    background-color: #29436D;
    color: white;
  }
  .action-button-primary:hover {
    background-color: #2c3a50;
  }
  .action-button-secondary {
    background-color: #EBF9FF;
    color: black;
    border: 1px solid black;
    border-color: #bbb;
  }
  .action-button-secondary:hover {
    background-color: #f0f0f0;
    border-color: #bbb;
  }
  .reader-content-column {
    flex-grow: 1;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    padding: 30px;
    overflow-y: auto; /* للسماح بالتمرير داخل المحتوى */
    height: 80vh; /* تحديد ارتفاع ثابت */
    position: relative; /* مهم لتحديد موقع الـ tooltip */
  }
  .reader-content-column .loading-message {
    text-align: center;
    font-size: 18px;
    color: #777;
  }

  /* --- ستايل الـ Tooltip --- */
  #reader-tooltip {
    position: absolute;
    background: #2c3a50;
    color: white;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    padding: 8px 12px;
    font-size: 14px;
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: opacity 0.2s;
  }

  #reader-tooltip button {
    background: transparent;
    border: none;
    cursor: pointer;
    color: #ffc107; /* لون أصفر للإعجاب */
    font-size: 1.5em;
    padding: 0;
  }
`;

const Reader = () => {
  const location = useLocation();
  const { bookId } = useParams();
  const [bookData, setBookData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    selectedText: "",
  });

  const contentRef = useRef(null); // للوصول إلى div المحتوى

  // البيانات من الصفحة السابقة
  const fileUrl = location.state?.url;
  const fileType = location.state?.type;
  const bookTitle = location.state?.bookTitle || "Book Title";

  const handlePreviewBook = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/document/preview-gutendexBook/${bookId}`,
        {
          headers: USER_TOKEN
            ? {
                Authorization: `Bearer ${USER_TOKEN}`,
                Accept: "application/json",
              }
            : { Accept: "application/json" },
        }
      );
      const selectedBook = response.data.data.results;
      setBookData(selectedBook);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching book:", err);
      setError(
        "Failed to load book content: " +
          (err.response?.data?.message || err.message)
      );
      setIsLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    if (bookId) {
      setIsLoading(true);
      handlePreviewBook();
    }
  }, [bookId, handlePreviewBook]);

  // --- منطق الـ Tooltip ---
  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText.length > 0 && contentRef.current) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const containerRect = contentRef.current.getBoundingClientRect();

      // حساب الموقع بالنسبة إلى div المحتوى
      const x = rect.left - containerRect.left + rect.width / 2;
      const y =
        rect.top - containerRect.top + contentRef.current.scrollTop - 40; // 40px فوق التحديد

      setTooltip({
        visible: true,
        x: x,
        y: y,
        selectedText: selectedText,
      });
    } else {
      setTooltip((prev) => ({ ...prev, visible: false }));
    }
  };

  // إخفاء الـ Tooltip عند الضغط في أي مكان آخر
  useEffect(() => {
    const handleClickOutside = () => {
      if (tooltip.visible) {
        setTooltip((prev) => ({ ...prev, visible: false }));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tooltip.visible]);

  const handleSaveWord = () => {
    alert(`Word saved: "${tooltip.selectedText}"`);
    // هنا يمكنك إضافة منطق الـ API لحفظ الكلمة
    console.log("Saving word to profile:", tooltip.selectedText);
    setTooltip((prev) => ({ ...prev, visible: false })); // إخفاء الـ tooltip بعد الحفظ
  };

  // دالة زر Add My Profile
  const handleAddMyProfile = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/document/import-gutendexbook`,
        {
          book_id: bookId,
          title: bookTitle,
          format: fileType || "html",
        },
        { headers: { Authorization: `Bearer ${USER_TOKEN}` } }
      );
      alert("Book added to your profile successfully!");
    } catch (err) {
      alert(
        "Failed to add book to profile: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="reader-page-container">
        <nav className="reader-breadcrumbs">
          <Link to="/">Home</Link> <span>/</span>
          <Link to="/books">Books</Link> <span>/</span>{" "}
          {bookData?.title || "Book"}
        </nav>

        <main className="reader-main-content" style={{ display: "block" }}>
          <section
            ref={contentRef}
            className="reader-content-column"
            onMouseUp={handleTextSelection}
          >
            {/* عرض الـ Tooltip بشكل مشروط */}
            {tooltip.visible && (
              <div
                id="reader-tooltip"
                style={{
                  left: `${tooltip.x}px`,
                  top: `${tooltip.y}px`,
                  transform: "translateX(-50%)",
                }}
                onMouseDown={(e) => e.stopPropagation()} // يمنع إخفاء الـ tooltip عند الضغط عليه
              >
                <button onClick={handleSaveWord} title="Save this word">
                  ⭐
                </button>
                <span>حفظ الكلمة</span>
              </div>
            )}

            {isLoading && <p className="loading-message">Loading book...</p>}
            {error && <p className="loading-message">{error}</p>}

            {!isLoading && !error && bookData && (
              <div className="">
                <h2>{bookData.title}</h2>
              </div>
            )}

            {!fileUrl && (
              <p className="loading-message">No content URL provided.</p>
            )}
          </section>

          <aside className="reader-cover-column">
            <div
              className="reader-actions"
              style={{
                padding: "10px",
                display: "inline-flex",
                justifyContent: "space-around",
              }}
            >
              <button
                className="action-button-primary"
                onClick={handleAddMyProfile}
              >
                Add My Profile
              </button>
              {fileUrl && (
                <a href={fileUrl} download className="action-button-secondary">
                  Download
                </a>
              )}
            </div>
          </aside>
        </main>
      </div>
    </>
  );
};

export default Reader;
