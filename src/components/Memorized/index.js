import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Memorized/index.css";
import "../Memorized/guide.css";
import "../Memorized/global.css";
import logo from "../../assets/images/logo.png";
import face from "../../assets/icons/facebook.png";
import gmail from "../../assets/icons/gmail.png";
import instgram from "../../assets/icons/instgram.png";
import Storing from "../../assets/icons/sorting.png";
import book from "../../assets/images/book.png";
import voice from "../../assets/icons/voice.png";
import close from "../../assets/icons/close.png";
import favorite from "../../assets/icons/copy.png"; // أيقونة المفضلة (تأكد إنها موجودة)

const Memorized = () => {
  const [wordList, setWordList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingIds, setDeletingIds] = useState(new Set());
  const [favoritingIds, setFavoritingIds] = useState(new Set());

  // Cache for definitions to avoid repeated requests
  const definitionCache = new Map();

  // جلب قائمة الكلمات العامة
  const fetchWordList = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token found in localStorage");

      const startTime = performance.now();
      const response = await fetch(`/api/wordlist/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("التوكن غير صالح. من فضلك، قم بتسجيل الدخول مجددًا.");
          return [];
        }
        throw new Error(`Failed to fetch data from API: ${response.status}`);
      }

      const data = await response.json();
      const words = data.data ? (Array.isArray(data.data) ? data.data : [data.data]) : [];
      console.log("Fetched wordList from /wordlist/:", words, `took ${performance.now() - startTime} ms`);
      return words;
    } catch (err) {
      console.error("Fetch error (wordlist):", err.message);
      setError("فشل جلب القائمة بسبب مشكلة في الاتصال. جرب مرة تانية لاحقًا.");
      return [];
    }
  };

  // جلب قائمة الكلمات حسب الـ document
  const fetchWordListByDocument = async (documentId = 1) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token found in localStorage");

      const startTime = performance.now();
      const response = await fetch(`/api/wordlist/by-document/${documentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("التوكن غير صالح. من فضلك، قم بتسجيل الدخول مجددًا.");
          return [];
        }
        throw new Error(`Failed to fetch data from API: ${response.status}`);
      }

      const data = await response.json();
      const words = data.data ? (Array.isArray(data.data) ? data.data : [data.data]) : [];
      console.log(`Fetched wordList by document/${documentId}:`, words, `took ${performance.now() - startTime} ms`);
      return words;
    } catch (err) {
      console.error("Fetch error (wordlist by document):", err.message);
      setError("فشل جلب القائمة بسبب مشكلة في الاتصال. جرب مرة تانية لاحقًا.");
      return [];
    }
  };

  // جلب الكلمات المفضلة
  const fetchFavourites = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token found in localStorage");

      const startTime = performance.now();
      const response = await fetch(`/api/wordlist/favourites`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("التوكن غير صالح. من فضلك، قم بتسجيل الدخول مجددًا.");
          return [];
        }
        throw new Error(`Failed to fetch favourites from API: ${response.status}`);
      }

      const data = await response.json();
      const words = data.data ? (Array.isArray(data.data) ? data.data : [data.data]) : [];
      console.log("Fetched favourites:", words, `took ${performance.now() - startTime} ms`);
      return words;
    } catch (err) {
      console.error("Fetch error (favourites):", err.message);
      setError("فشل جلب المفضلة بسبب مشكلة في الاتصال. جرب مرة تانية لاحقًا.");
      return [];
    }
  };

  // دالة لتفعيل/إلغاء تفعيل المفضلة
  const toggleFavourite = async (wordId) => {
    if (favoritingIds.has(wordId)) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token found in localStorage");

      setFavoritingIds((prev) => new Set(prev).add(wordId));

      const response = await fetch(`/api/favourites/toggle/${wordId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("التوكن غير صالح. من فضلك، قم بتسجيل الدخول مجددًا.");
          return;
        }
        if (response.status === 404) throw new Error("Word not found.");
        throw new Error(`Failed to toggle favorite: ${response.status}`);
      }

      console.log(`Favorite toggled for word ID ${wordId}`);
      await fetchAllWordLists(); // إعادة جلب القائمة لتحديث حالة المفضلة
    } catch (err) {
      setError(err.message);
    } finally {
      setFavoritingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(wordId);
        return newSet;
      });
    }
  };

  // دالة لجلب التعريفات والأمثلة مع التخزين المؤقت
  const fetchDefinitionsAndExamples = async (word) => {
    const cacheKey = `${word.original_text.toLowerCase()}-${word.target_language || "ar"}`;
    if (definitionCache.has(cacheKey)) {
      return definitionCache.get(cacheKey);
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token found in localStorage");

      const response = await axios.post(
        `/api/translate/translate`,
        {
          text: word.original_text,
          target: word.target_language || "ar",
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );

      const data = response.data;
      console.log(`Definitions for ${word.original_text}:`, data);

      const result = {
        adjectiveDefinition: data.adjective_definition || "غير متوفر",
        example: data.example || "غير متوفر",
      };

      definitionCache.set(cacheKey, result);
      return result;
    } catch (err) {
      console.error("Fetch definitions error:", err.message);
      return {
        adjectiveDefinition: "غير متوفر",
        example: "غير متوفر",
      };
    }
  };

  // دالة لجلب ومعالجة قائمة الكلمات
  const fetchAllWordLists = async (fetchType = "general") => {
    setLoading(true);
    setError(null);
    try {
      let words = [];
      if (fetchType === "byDocument") {
        words = await fetchWordListByDocument(1);
      } else if (fetchType === "favourites") {
        words = await fetchFavourites();
      } else {
        words = await fetchWordList();
      }

      if (words.length === 0) {
        setError("لم يتم العثور على كلمات. تحقق من الاتصال أو تسجيل الدخول.");
        setLoading(false);
        return;
      }

      // إزالة التكرارات حسب الـ id
      const uniqueWordsMap = new Map();
      words.forEach((word) => {
        if (uniqueWordsMap.has(word.id)) {
          console.warn(`Duplicate ID detected: ${word.id} for word "${word.original_text}"`);
        } else {
          uniqueWordsMap.set(word.id, word);
        }
      });
      const uniqueWords = Array.from(uniqueWordsMap.values());

      // تحديد عدد الكلمات إلى 50 لتقليل الحمل
      const limitedWords = uniqueWords.slice(0, 50);

      // معالجة الكلمات على دفعات
      const batchSize = 5;
      const enhancedWords = [];
      for (let i = 0; i < limitedWords.length; i += batchSize) {
        const batch = limitedWords.slice(i, i + batchSize);
        const batchResults = await Promise.all(
          batch.map(async (word) => {
            const { adjectiveDefinition, example } = await fetchDefinitionsAndExamples(word);
            return { ...word, adjectiveDefinition, example };
          })
        );
        enhancedWords.push(...batchResults);
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      setWordList(enhancedWords);
      console.log("Enhanced wordList:", enhancedWords);
    } catch (err) {
      setError(`فشل تحميل الكلمات: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // دالة تشغيل الصوت
  const handlePlayAudio = async (audioUrl) => {
    if (!audioUrl) {
      setError("لا يوجد صوت متاح لهذه الكلمة.");
      return;
    }

    try {
      const audio = new Audio(audioUrl);
      await audio.play();
    } catch (err) {
      console.error("Audio play failed:", err);
      setError("فشل تشغيل الصوت. تحقق من إعدادات المتصفح.");
    }
  };

  // دالة حذف كلمة
  const deleteWord = async (wordId) => {
    if (deletingIds.has(wordId)) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token found in localStorage");

      setDeletingIds((prev) => new Set(prev).add(wordId));

      const response = await fetch(`/api/wordlist/${wordId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("التوكن غير صالح. من فضلك، قم بتسجيل الدخول مجددًا.");
          return;
        }
        if (response.status === 404) throw new Error("الكلمة غير موجودة. من فضلك، قم بتحديث الصفحة.");
        throw new Error(`فشل حذف الكلمة: ${response.status}`);
      }

      console.log(`Word with ID ${wordId} deleted successfully`);
      await fetchAllWordLists();
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(wordId);
        return newSet;
      });
    }
  };

  useEffect(() => {
    fetchAllWordLists(); // جلب القائمة العامة عند تحميل الصفحة
  }, []);

  if (loading) return <div>جارٍ التحميل...</div>;

  if (error) {
    return (
      <div>
        خطأ: {error}
        <button onClick={() => fetchAllWordLists()} style={{ marginLeft: "10px" }}>
          إعادة المحاولة
        </button>
      </div>
    );
  }

  if (wordList.length === 0) {
    return <div>لا توجد كلمات في القائمة حاليًا.</div>;
  }

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
                  OurStudio is a digital agency UI / UX Design and Website Development located in Ohio, United States of America
                </p>
              </div>
              <div className="frame-9">
                <div className="text-wrapper-4">تابعنا</div>
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
                  <div className="text-wrapper-6">معلومات عنا</div>
                </div>
                <div className="frame-13">
                  <div className="text-wrapper-6">الشروط والأحكام</div>
                </div>
                <div className="frame-13">
                  <div className="text-wrapper-6">سياسة الخصوصية</div>
                </div>
              </div>
            </div>
          </div>
          <div className="frame-14">
            <p className="text-wrapper-7">قائمة الكلمات > الكلمات المحفوظة</p>
            <div className="frame-15">
              <img className="img-2" src={Storing} alt="Sort" />
              <div className="text-wrapper-8">الترتيب حسب</div>
            </div>
          </div>
          <div className="frame-16">
            {wordList.slice(0, 2).map((word, index) => (
              <div className="word-list-button-wrapper" key={`${word.id}-${word.original_text}-${index}`}>
                <div className="word-list-button">
                  <div className="frame-17">
                    <div className="frame-18">
                      <div className="frame-19">
                        <div className="frame-10">
                          <div className="text-wrapper-9">{word.original_text}</div>
                          <div className="frame-20">
                            <div className="text-wrapper-10">التعريف (فعل):</div>
                            <p className="text-wrapper-11">{word.translated_text || "غير متوفر"}</p>
                            <div className="text-wrapper-12">مثال:</div>
                            <p className="text-wrapper-11">{word.example || "غير متوفر"}</p>
                            <img className="line" src="img/line-1.svg" alt="Line" />
                            <div className="text-wrapper-12">التعريف (صفة):</div>
                            <p className="text-wrapper-13">{word.adjectiveDefinition || "غير متوفر"}</p>
                            <div className="text-wrapper-12">مثال:</div>
                            <p className="text-wrapper-11">{word.example || "غير متوفر"}</p>
                            <div className="frame-21">
                              <img className="image" src={book} alt="Book" />
                              <div className="text-wrapper-14">{word.document?.title || "غير متوفر"}</div>
                            </div>
                          </div>
                        </div>
                        <div className="volume-high-wrapper">
                          {word.audio_url ? (
                            <img
                              className="img-2"
                              src={voice}
                              alt="Play Audio"
                              onClick={() => handlePlayAudio(word.audio_url)}
                              style={{ cursor: "pointer" }}
                            />
                          ) : (
                            <img className="img-2" src={voice} alt="Voice" style={{ opacity: 0.5 }} />
                          )}
                          <img
                            className="img-2"
                            src={favorite}
                            alt="Favorite"
                            onClick={() => toggleFavourite(word.id)}
                            style={{
                              cursor: favoritingIds.has(word.id) ? "not-allowed" : "pointer",
                              opacity: favoritingIds.has(word.id) ? 0.5 : word.is_favorite ? 1 : 0.5,
                            }}
                            disabled={favoritingIds.has(word.id)}
                          />
                        </div>
                      </div>
                      <div style={{ position: "relative" }}>
                        <img
                          className="img-2 close-icon"
                          src={close}
                          alt="Close"
                          onClick={() => deleteWord(word.id)}
                          style={{ cursor: deletingIds.has(word.id) ? "not-allowed" : "pointer", opacity: deletingIds.has(word.id) ? 0.5 : 1 }}
                          disabled={deletingIds.has(word.id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="frame-22">
            {wordList.slice(2, 4).map((word, index) => (
              <div className="word-list-button-wrapper" key={`${word.id}-${word.original_text}-${index}`}>
                <div className="word-list-button">
                  <div className="frame-17">
                    <div className="frame-18">
                      <div className="frame-19">
                        <div className="frame-10">
                          <div className="text-wrapper-9">{word.original_text}</div>
                          <div className="frame-20">
                            <div className="text-wrapper-10">التعريف (فعل):</div>
                            <p className="text-wrapper-11">{word.translated_text || "غير متوفر"}</p>
                            <div className="text-wrapper-12">مثال:</div>
                            <p className="text-wrapper-11">{word.example || "غير متوفر"}</p>
                            <img className="line" src="img/line-1-2.svg" alt="Line" />
                            <div className="text-wrapper-12">التعريف (صفة):</div>
                            <p className="text-wrapper-13">{word.adjectiveDefinition || "غير متوفر"}</p>
                            <div className="text-wrapper-12">مثال:</div>
                            <p className="text-wrapper-11">{word.example || "غير متوفر"}</p>
                            <div className="frame-21">
                              <img className="image" src={book} alt="Book" />
                              <div className="text-wrapper-14">{word.document?.title || "غير متوفر"}</div>
                            </div>
                          </div>
                        </div>
                        <div className="volume-high-wrapper">
                          {word.audio_url ? (
                            <img
                              className="img-2"
                              src={voice}
                              alt="Play Audio"
                              onClick={() => handlePlayAudio(word.audio_url)}
                              style={{ cursor: "pointer" }}
                            />
                          ) : (
                            <img className="img-2" src={voice} alt="Voice" style={{ opacity: 0.5 }} />
                          )}
                          <img
                            className="img-2"
                            src={favorite}
                            alt="Favorite"
                            onClick={() => toggleFavourite(word.id)}
                            style={{
                              cursor: favoritingIds.has(word.id) ? "not-allowed" : "pointer",
                              opacity: favoritingIds.has(word.id) ? 0.5 : word.is_favorite ? 1 : 0.5,
                            }}
                            disabled={favoritingIds.has(word.id)}
                          />
                        </div>
                      </div>
                      <div style={{ position: "relative" }}>
                        <img
                          className="img-2 close-icon"
                          src={close}
                          alt="Close"
                          onClick={() => deleteWord(word.id)}
                          style={{ cursor: deletingIds.has(word.id) ? "not-allowed" : "pointer", opacity: deletingIds.has(word.id) ? 0.5 : 1 }}
                          disabled={deletingIds.has(word.id)}
                        />
                      </div>
                    </div>
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