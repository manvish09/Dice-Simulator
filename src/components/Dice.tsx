import { useEffect, useState } from "react";

type DiceProps = {
  value: number;
};

const dotStyle: React.CSSProperties = {
  width: "clamp(10px,1.8vw,18px)",
height: "clamp(10px,1.8vw,18px)",
  borderRadius: "50%",
  background:
    "radial-gradient(circle at 30% 30%, #444, #111)",
  boxShadow:
    "inset 1px 1px 3px rgba(255,255,255,0.3)",
};

export default function Dice({
  value,
}: DiceProps) {
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    setRolling(true);

    const timer = setTimeout(() => {
      setRolling(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [value]);

  const faces: Record<number, number[]> = {
    1: [5],
    2: [1, 9],
    3: [1, 5, 9],
    4: [1, 3, 7, 9],
    5: [1, 3, 5, 7, 9],
    6: [1, 3, 4, 6, 7, 9],
  };

  return (
    <div
      style={{
        perspective: "1000px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
         width: "min(150px, 35vw)",
height: "min(150px, 35vw)",
          display: "grid",
          gridTemplateColumns:
            "repeat(3, 1fr)",
          gridTemplateRows:
            "repeat(3, 1fr)",
          gap: "10px",
          padding: "clamp(10px,2vw,18px)",
          borderRadius: "24px",

          background:
            "linear-gradient(145deg,#ffffff,#e2e8f0)",

          border:
            "1px solid rgba(255,255,255,0.7)",

          boxShadow: `
            0 25px 45px rgba(37,99,235,0.25),
            0 10px 20px rgba(0,0,0,0.12),
            inset 0 2px 2px rgba(255,255,255,0.8),
            inset 0 -4px 8px rgba(0,0,0,0.08)
          `,

          transform: rolling
            ? "rotateX(720deg) rotateY(720deg) scale(1.1)"
            : "rotateX(-18deg) rotateY(18deg)",

          transition:
            "transform 0.7s cubic-bezier(0.22,1,0.36,1)",

          position: "relative",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            inset: "-15px",
            borderRadius: "30px",
            background:
              "radial-gradient(circle, rgba(96,165,250,0.25), transparent 70%)",
            zIndex: 0,
          }}
        />

        {Array.from(
          { length: 9 },
          (_, index) => {
            const position = index + 1;

            return (
              <div
                key={position}
                style={{
                  display: "flex",
                  justifyContent:
                    "center",
                  alignItems:
                    "center",
                  zIndex: 1,
                }}
              >
                {faces[value].includes(
                  position
                ) && (
                  <div
                    style={dotStyle}
                  />
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}