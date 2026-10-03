import { useEffect } from "react";

function ARPage({ onBack }) {
  useEffect(() => {
    // Memastikan halaman dimulai dari posisi atas
    window.scrollTo(0, 0);

    return () => {
      // Tidak ada cleanup khusus untuk prototype ini.
      // MindAR akan berhenti ketika scene dilepas.
    };
  }, []);

  return (
    <div className="ar-page">
      <button className="ar-back-button" onClick={onBack}>
        ← Kembali
      </button>

      <div className="ar-header">
        <h1>📱 AR Tata Surya</h1>
        <p>
          Arahkan kamera ke gambar marker untuk melihat objek planet
          dalam Augmented Reality.
        </p>
      </div>

      <div className="ar-camera-container">
        <a-scene
          mindar-image="
            imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.mind;
          "
          color-space="sRGB"
          renderer="colorManagement: true, physicallyCorrectLights"
          vr-mode-ui="enabled: false"
          device-orientation-permission-ui="enabled: false"
          embedded
        >
          <a-assets>
            <img
              id="ar-marker"
              src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.png"
              alt="AR Marker"
            />
          </a-assets>

          <a-camera
            position="0 0 0"
            look-controls="enabled: false"
          ></a-camera>

          <a-entity mindar-image-target="targetIndex: 0">

            {/* Marker */}
            <a-plane
              src="#ar-marker"
              position="0 0 0"
              height="0.552"
              width="1"
              rotation="0 0 0"
            ></a-plane>

            {/* Planet 3D */}
            <a-sphere
              position="0 0 0.3"
              radius="0.22"
              color="#dc2626"
              animation="
                property: rotation;
                to: 0 360 0;
                dur: 5000;
                easing: linear;
                loop: true;
              "
            ></a-sphere>

            {/* Ring sederhana */}
            <a-torus
              position="0 0 0.3"
              rotation="90 0 0"
              radius="0.32"
              radius-tubular="0.025"
              color="#facc15"
              animation="
                property: rotation;
                to: 90 360 0;
                dur: 7000;
                easing: linear;
                loop: true;
              "
            ></a-torus>

            {/* Label */}
            <a-text
              value="MARS"
              position="0 -0.45 0.3"
              align="center"
              color="#ffffff"
              width="2"
            ></a-text>

          </a-entity>
        </a-scene>

        <div className="ar-guide">
          📷 Arahkan kamera ke marker
        </div>
      </div>

      <div className="ar-info">
        <h2>🔴 Mars</h2>
        <p>
          Planet virtual akan muncul ketika kamera berhasil mengenali
          marker.
        </p>
      </div>
    </div>
  );
}

export default ARPage;