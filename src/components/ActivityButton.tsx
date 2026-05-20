"use client";

import { useState } from "react";

interface ActivityButtonProps {
  text: string;
  borderColor: string;
  isDark: boolean;
}

export default function ActivityButton({ text, borderColor, isDark }: ActivityButtonProps) {
  const [active, setActive] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [justifyTop, setJustifyTop] = useState(false);

  const handleClick = () => {
    setClicked(true);
    if (active) {
      setActive(false);
      setTimeout(() => setJustifyTop(false), 600);
    } else {
      setJustifyTop(true);
      setActive(true);
    }
  };

  return (
    <div
      className={`${active ? "active" : ""} ${clicked && !active ? "clicked" : ""}`}
      style={{ position: "relative", display: "inline-block", marginTop: "0.75rem" }}
    >
      <button
        type="button"
        className="activity-btn"
        onClick={handleClick}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: justifyTop ? "flex-start" : "center",
          fontSize: "1.4rem",
          textTransform: "uppercase",
          fontFamily: "inherit",
          fontWeight: 700,
          letterSpacing: "0.1rem",
          padding: "1rem 2rem",
          border: `0.2rem solid ${text}`,
          borderRadius: "0.8rem",
          color: text,
          background: "transparent",
          position: "relative",
          cursor: "pointer",
          minWidth: 0,
          minHeight: 0,
          transition: "300ms color ease-in-out, 300ms background ease-in-out, 300ms min-width ease-in-out, 300ms min-height 300ms ease-in-out",
        }}
      >
        <section
          className="activity-panel"
          style={{
            opacity: 0,
            height: 0,
            transition: "300ms all ease",
            position: "absolute",
            pointerEvents: "none",
            left: "50%",
            top: "5rem",
            transform: "translateX(-50%)",
          }}
        >
          <div
            className="activity-item"
            style={{
              maxHeight: 0,
              opacity: 0,
              margin: "0.8rem",
              padding: "1.2rem",
              fontWeight: 500,
              textTransform: "none",
              letterSpacing: 0,
              fontSize: "1.3rem",
              textAlign: "left",
              borderRadius: "0.6rem",
              border: `1px solid ${borderColor}`,
              transition: "300ms background ease-in-out",
            }}
          >
            <p style={{ margin: 0 }}>Working on Lunar civilization project</p>
          </div>
          <div
            className="activity-item"
            style={{
              maxHeight: 0,
              opacity: 0,
              margin: "0.8rem",
              padding: "1.2rem",
              fontWeight: 500,
              textTransform: "none",
              letterSpacing: 0,
              fontSize: "1.3rem",
              textAlign: "left",
              borderRadius: "0.6rem",
              border: `1px solid ${borderColor}`,
              transition: "300ms background ease-in-out",
            }}
          >
            <p style={{ margin: 0 }}>Archery Training</p>
          </div>
          <div
            className="activity-item"
            style={{
              maxHeight: 0,
              opacity: 0,
              margin: "0.8rem",
              padding: "1.2rem",
              fontWeight: 500,
              textTransform: "none",
              letterSpacing: 0,
              fontSize: "1.3rem",
              textAlign: "left",
              borderRadius: "0.6rem",
              border: `1px solid ${borderColor}`,
              transition: "300ms background ease-in-out",
            }}
          >
            <p style={{ margin: 0 }}>
              Currently reading &ldquo;Descartes&rsquo; Error&rdquo; &mdash;{" "}
              <a
                href="https://www.penguin.co.uk/books/391857/descartes-error-by-damasio-antonio/9780099501640"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: text }}
              >
                Penguin
              </a>
            </p>
          </div>
        </section>

        <span className="activity-label">
          Activity
        </span>
      </button>

      <style>{`
        .activity-btn:hover {
          background: ${isDark ? "#DADADA" : "#161616"} !important;
          color: ${isDark ? "#161616" : "#DADADA"} !important;
        }
        .active .activity-btn {
          min-width: 26rem !important;
          min-height: 26rem !important;
        }
        .activity-btn::before {
          content: "3";
          letter-spacing: 0;
          color: #e6e1d6;
          font-weight: 500;
          font-size: 1.4rem;
          line-height: 2.4rem;
          padding: 0 0.7rem;
          height: 2.4rem;
          background: radial-gradient(orangered 50%, red 75%);
          border-radius: 1.2rem;
          position: absolute;
          top: -1.2rem;
          left: 0.7rem;
        }
        .active .activity-panel {
          opacity: 1 !important;
          width: 100% !important;
          height: auto !important;
          pointer-events: auto !important;
        }
        .active .activity-item {
          animation: itemLoad 800ms ease-in 500ms 1 forwards;
        }
        @media (max-width: 640px) {
          .active .activity-btn {
            min-width: calc(100vw - 3rem) !important;
            min-height: 22rem !important;
          }
          .activity-btn {
            font-size: 1.1rem !important;
            padding: 0.6rem 1.2rem !important;
          }
          .activity-btn::before {
            font-size: 1rem !important;
            line-height: 1.8rem !important;
            padding: 0 0.5rem !important;
            height: 1.8rem !important;
            top: -0.9rem !important;
            left: 0.5rem !important;
          }
          .activity-panel {
            top: 3.6rem !important;
          }
          .activity-item {
            margin: 0.5rem !important;
            padding: 0.8rem !important;
            font-size: 1.1rem !important;
          }
        }
        @keyframes itemLoad {
          to {
            opacity: 1;
            max-height: 20rem;
            outline: 2px solid transparent;
          }
        }
      `}</style>
    </div>
  );
}
