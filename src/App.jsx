import { useState } from "react";
import "./App.css";
import ARPage from "./ARPage";

const solarSystemVideo =
  "https://www.youtube.com/embed/Y2ijS8jY4F4";

const planets = [
  {
    name: "Merkurius",
    order: "Planet pertama dari Matahari",

    image:
      "https://science.nasa.gov/wp-content/uploads/2023/04/EW0108829708G4release_mercury-jpg.webp",

    description:
      "Merkurius adalah planet terdekat dengan Matahari dan merupakan planet terkecil di tata surya.",

    facts: {
      diameter: "4.879 km",
      temperature: "Sangat ekstrem",
      moons: "0",
      rotation: "59 hari"
    }
  },

  {
    name: "Venus",
    order: "Planet kedua dari Matahari",

    image:
      "https://science.nasa.gov/wp-content/uploads/2023/05/venus-single.png",

    description:
      "Venus merupakan planet kedua dari Matahari dan memiliki atmosfer yang sangat tebal.",

    facts: {
      diameter: "12.104 km",
      temperature: "Sekitar 465°C",
      moons: "0",
      rotation: "243 hari"
    }
  },

  {
    name: "Bumi",
    order: "Planet ketiga dari Matahari",

    image:
      "https://images-assets.nasa.gov/image/PIA18033/PIA18033~large.jpg",

    description:
      "Bumi adalah planet tempat kita tinggal dan merupakan planet yang diketahui mendukung kehidupan.",

    facts: {
      diameter: "12.742 km",
      temperature: "Sekitar 15°C",
      moons: "1",
      rotation: "24 jam"
    }
  },

  {
    name: "Mars",
    order: "Planet keempat dari Matahari",

    image:
      "https://science.nasa.gov/wp-content/uploads/2023/04/hs-2016-15-a-full_tif-jpg.webp",

    description:
      "Mars dikenal sebagai Planet Merah karena permukaannya banyak mengandung mineral besi.",

    facts: {
      diameter: "6.779 km",
      temperature: "Sekitar -63°C",
      moons: "2",
      rotation: "24,6 jam"
    }
  },

  {
    name: "Jupiter",
    order: "Planet kelima dari Matahari",

    image:
      "https://science.nasa.gov/wp-content/uploads/2023/05/jupiter-marble-pia22946-1920x640-1.jpg",

    description:
      "Jupiter adalah planet terbesar di tata surya dan termasuk planet raksasa gas.",

    facts: {
      diameter: "139.820 km",
      temperature: "Sangat dingin",
      moons: "Banyak",
      rotation: "Sekitar 10 jam"
    }
  },

  {
    name: "Saturnus",
    order: "Planet keenam dari Matahari",

    image:
      "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/webb/science/2026/03/STScI-01KJTMDAZWZ2WCK5QF477J3279.jpg",

    description:
      "Saturnus dikenal karena sistem cincinnya yang sangat jelas dan luas.",

    facts: {
      diameter: "116.460 km",
      temperature: "Sangat dingin",
      moons: "Banyak",
      rotation: "Sekitar 10,7 jam"
    }
  },

  {
    name: "Uranus",
    order: "Planet ketujuh dari Matahari",
    image: "https://images-assets.nasa.gov/image/PIA18182/PIA18182~orig.jpg",
    description: "Uranus merupakan planet raksasa es yang memiliki warna biru kehijauan.",
    facts: {
      diameter: "50.724 km",
      temperature: "Sangat dingin",
      moons: "27",
      rotation: "Sekitar 17 jam"
    }
  },
  {
    name: "Neptunus",
    order: "Planet kedelapan dari Matahari",

    image:
      "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/09/p/i/a/0/PIA01492-1.jpg",

    description:
      "Neptunus merupakan planet terjauh dari Matahari dan memiliki warna biru yang khas.",

    facts: {
      diameter: "49.244 km",
      temperature: "Sangat dingin",
      moons: "Banyak",
      rotation: "Sekitar 16 jam"
    }
  }
];

const quizQuestions = [
  {
    question: "Planet manakah yang merupakan planet ketiga dari Matahari?",
    options: ["Mars", "Bumi", "Venus", "Jupiter"],
    answer: "Bumi",
    explanation:
      "Bumi merupakan planet ketiga dari Matahari."
  },

  {
    question: "Planet manakah yang paling dekat dengan Matahari?",
    options: ["Venus", "Mars", "Merkurius", "Bumi"],
    answer: "Merkurius",
    explanation:
      "Merkurius merupakan planet yang paling dekat dengan Matahari."
  },

  {
    question: "Planet manakah yang dikenal sebagai Planet Merah?",
    options: ["Jupiter", "Mars", "Venus", "Saturnus"],
    answer: "Mars",
    explanation:
      "Mars dikenal sebagai Planet Merah karena permukaannya banyak mengandung mineral besi."
  },

  {
    question: "Planet manakah yang merupakan planet terbesar di tata surya?",
    options: ["Saturnus", "Neptunus", "Jupiter", "Uranus"],
    answer: "Jupiter",
    explanation:
      "Jupiter adalah planet terbesar di tata surya."
  },

  {
    question: "Planet manakah yang terkenal dengan sistem cincinnya?",
    options: ["Mars", "Saturnus", "Venus", "Merkurius"],
    answer: "Saturnus",
    explanation:
      "Saturnus terkenal dengan sistem cincin yang sangat jelas."
  }
];

function App() {

  const [page, setPage] = useState("landing");
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);



  const speakPlanet = () => {
    if (!selectedPlanet) return;

    window.speechSynthesis.cancel();

    const text = `
    ${selectedPlanet.name}.
    ${selectedPlanet.order}.
    ${selectedPlanet.description}.

    Diameter ${selectedPlanet.facts.diameter}.
    Suhu ${selectedPlanet.facts.temperature}.
    Jumlah satelit ${selectedPlanet.facts.moons}.
    Waktu rotasi ${selectedPlanet.facts.rotation}.
  `;

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "id-ID";
    speech.rate = 0.9;
    speech.pitch = 1;

    speech.onstart = () => {
      setIsSpeaking(true);
    };

    speech.onend = () => {
      setIsSpeaking(false);
    };

    speech.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(speech);
  };

  if (page === "quiz") {
    const currentQuestion = quizQuestions[quizIndex];

    const handleAnswer = (answer) => {
      if (selectedAnswer !== null) {
        return;
      }

      setSelectedAnswer(answer);

      if (answer === currentQuestion.answer) {
        setScore(score + 1);
      }
    };

    const nextQuestion = () => {
      if (quizIndex < quizQuestions.length - 1) {
        setQuizIndex(quizIndex + 1);
        setSelectedAnswer(null);
      } else {
        setQuizFinished(true);
      }
    };

    if (quizFinished) {
      return (
        <main className="quiz-page">
          <div className="stars"></div>

          <div className="quiz-result">

            <p className="quiz-label">
              HASIL BELAJAR
            </p>

            <h1>🎉 Selesai!</h1>

            <div className="score-circle">
              {score}/{quizQuestions.length}
            </div>

            <h2>
              Skor kamu
            </h2>

            <p>
              Kamu berhasil menjawab{" "}
              <strong>{score}</strong> dari{" "}
              <strong>{quizQuestions.length}</strong>{" "}
              pertanyaan dengan benar.
            </p>

            <div className="result-buttons">

              <button
                className="quiz-button"
                onClick={() => {
                  setQuizIndex(0);
                  setScore(0);
                  setSelectedAnswer(null);
                  setQuizFinished(false);
                }}
              >
                🔄 Ulangi Kuis
              </button>

              <button
                className="back-explore-button"
                onClick={() => {
                  setPage("explore");
                  setQuizIndex(0);
                  setScore(0);
                  setSelectedAnswer(null);
                  setQuizFinished(false);
                }}
              >
                ← Kembali ke Planet
              </button>

            </div>

          </div>
        </main>
      );
    }

    return (
      <main className="quiz-page">

        <div className="stars"></div>

        <section className="quiz-container">

          <button
            className="detail-back-button"
            onClick={() => setPage("detail")}
          >
            ← Kembali
          </button>

          <div className="quiz-header">

            <p className="quiz-label">
              KUIS TATA SURYA
            </p>

            <div className="quiz-progress">
              Pertanyaan {quizIndex + 1} dari{" "}
              {quizQuestions.length}
            </div>

          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${((quizIndex + 1) /
                  quizQuestions.length) *
                  100
                  }%`
              }}
            ></div>
          </div>

          <div className="question-card">

            <h1>
              {currentQuestion.question}
            </h1>

            <div className="answer-list">

              {currentQuestion.options.map((option) => {

                let className = "answer-button";

                if (selectedAnswer !== null) {

                  if (
                    option === currentQuestion.answer
                  ) {
                    className += " correct";
                  } else if (
                    option === selectedAnswer
                  ) {
                    className += " wrong";
                  }

                }

                return (
                  <button
                    key={option}
                    className={className}
                    onClick={() =>
                      handleAnswer(option)
                    }
                  >
                    <span>{option}</span>

                    {selectedAnswer !== null &&
                      option === currentQuestion.answer && (
                        <span>✓</span>
                      )}

                    {selectedAnswer !== null &&
                      option === selectedAnswer &&
                      option !== currentQuestion.answer && (
                        <span>✕</span>
                      )}
                  </button>
                );
              })}

            </div>

            {selectedAnswer !== null && (
              <div
                className={
                  selectedAnswer ===
                    currentQuestion.answer
                    ? "answer-feedback correct-feedback"
                    : "answer-feedback wrong-feedback"
                }
              >

                <strong>
                  {selectedAnswer ===
                    currentQuestion.answer
                    ? "🎉 Jawaban Benar!"
                    : "❌ Jawaban Kurang Tepat"}
                </strong>

                <p>
                  {currentQuestion.explanation}
                </p>

              </div>
            )}

            {selectedAnswer !== null && (
              <button
                className="next-question"
                onClick={nextQuestion}
              >
                {quizIndex ===
                  quizQuestions.length - 1
                  ? "Lihat Hasil"
                  : "Pertanyaan Berikutnya →"}
              </button>
            )}

          </div>

        </section>
      </main>
    );
  }

  if (page === "detail" && selectedPlanet) {
    return (
      <main className="detail-page">
        <div className="stars"></div>

        <button
          className="detail-back-button"
          onClick={() => setPage("explore")}
        >
          ← Kembali ke Planet
        </button>

        <section className="detail-content">

          <div className="detail-image">
            <img
              src={selectedPlanet.image}
              alt={selectedPlanet.name}
            />
          </div>

          <div className="detail-info">

            <p className="detail-subtitle">
              {selectedPlanet.order}
            </p>

            <h1>{selectedPlanet.name}</h1>

            <p className="detail-description">
              {selectedPlanet.description}
            </p>

            <div className="fact-grid">

              <div className="fact-card">
                <span>Diameter</span>
                <strong>
                  {selectedPlanet.facts.diameter}
                </strong>
              </div>

              <div className="fact-card">
                <span>Suhu</span>
                <strong>
                  {selectedPlanet.facts.temperature}
                </strong>
              </div>

              <div className="fact-card">
                <span>Satelit</span>
                <strong>
                  {selectedPlanet.facts.moons}
                </strong>
              </div>

              <div className="fact-card">
                <span>Rotasi</span>
                <strong>
                  {selectedPlanet.facts.rotation}
                </strong>
              </div>

            </div>

            <div className="learning-buttons">

              <button
                className="audio-button"
                onClick={speakPlanet}
              >
                {isSpeaking
                  ? "🔊 Sedang Membacakan..."
                  : "🔊 Dengarkan"}
              </button>

              <button
                className="stop-audio-button"
                onClick={() => {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                }}
              >
                ⏹ Berhenti
              </button>

              <button
                className="video-button"
                onClick={() => setShowVideo(true)}
              >
                ▶ Tonton Video
              </button>

            </div>

            {showVideo && (
              <div className="video-container">
                <div className="video-header">
                  <h2>🎥 Video Tata Surya</h2>

                  <button
                    className="close-video"
                    onClick={() => setShowVideo(false)}
                  >
                    ✕
                  </button>
                </div>

                <div className="video-wrapper">
                  <iframe
                    src={solarSystemVideo}
                    title="Video Tata Surya"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            <button
              className="quiz-button"
              onClick={() => {
                setQuizIndex(0);
                setScore(0);
                setSelectedAnswer(null);
                setQuizFinished(false);
                setPage("quiz");
              }}
            >
              Mulai Kuis →
            </button>

          </div>

        </section>
      </main>
    );
  }

  if (page === "explore") {
    return (
      <main className="explore-page">
        <div className="stars"></div>

        <header className="explore-header">
          <button
            className="back-button"
            onClick={() => setPage("landing")}
          >
            ← Kembali
          </button>

          <div>
            <p className="explore-subtitle">
              JELAJAHI TATA SURYA
            </p>

            <h1>
              Kenali <span>Planet</span>
            </h1>
          </div>
        </header>

        <section className="planet-section">
          <p className="section-description">
            Pilih salah satu planet untuk mempelajari
            informasi lebih lanjut.
          </p>

          <div className="planet-grid">
            {planets.map((planet) => (
              <button
                key={planet.name}
                className="planet-card"
                onClick={() => {
                  setSelectedPlanet(planet);
                  setPage("detail");
                }}
              >
                <div className="planet-image-container">
                  <img
                    src={planet.image}
                    alt={planet.name}
                  />
                </div>

                <div className="planet-info">
                  <h2>{planet.name}</h2>
                  <p>{planet.order}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {selectedPlanet && (
          <div className="planet-modal">
            <div className="modal-content">
              <button
                className="close-button"
                onClick={() => setSelectedPlanet(null)}
              >
                ×
              </button>

              <img
                src={selectedPlanet.image}
                alt={selectedPlanet.name}
              />

              <p className="modal-subtitle">
                {selectedPlanet.order}
              </p>

              <h2>{selectedPlanet.name}</h2>

              <p>{selectedPlanet.description}</p>

              <button
                className="learn-button"
                onClick={() => setSelectedPlanet(null)}
              >
                Selesai Membaca
              </button>
            </div>
          </div>
        )}
      </main>
    );
  }

  if (page === "ar") {
    return <ARPage onBack={() => setPage("landing")} />;
  }

  return (
    <main className="landing">
      <div className="stars"></div>

      <section className="hero">

        <img
          className="planet planet-one"
          src="https://images-assets.nasa.gov/image/PIA18033/PIA18033~large.jpg"
          alt="Planet Bumi"
        />

        <img
          className="planet planet-two"
          src="https://science.nasa.gov/wp-content/uploads/2023/05/venus-single.png"
          alt="Planet Venus"
        />

        <img
          className="planet planet-three"
          src="https://science.nasa.gov/wp-content/uploads/2023/04/hs-2016-15-a-full_tif-jpg.webp"
          alt="Planet Mars"
        />

        <div className="hero-content">
          <p className="subtitle">
            JELAJAHI ALAM SEMESTA
          </p>

          <h1>
            Tata <span>Surya</span>
          </h1>

          <p className="description">
            Kenali planet-planet di tata surya melalui
            pembelajaran yang interaktif dan menyenangkan.
          </p>

          <button
            className="start-button"
            onClick={() => setPage("explore")}
          >
            Mulai Belajar
            <span>→</span>
          </button>
          <button
            className="ar-button"
            onClick={() => setPage("ar")}
          >
            📱 Coba AR
          </button>
        </div>

        <div className="scroll-text">
          ↓ Scroll untuk menjelajah
        </div>
      </section>
    </main>
  );
}

export default App;