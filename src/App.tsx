import { useState } from "react";
import Dice from "./components/Dice";
import { rollDice } from "./utils/dice";
import RollTable from "./components/RollTable";
import FrequencyTable from "./components/FrequencyTable";
import ProbabilityChart from "./components/ProbabilityChart";
import FrequencyBarChart from "./components/FrequencyBarChart";
import TheoreticalProbabilityTable from "./components/TheoreticalProbability";

function App() {
  const [rolls, setRolls] = useState<number[]>([]);
  const [numRolls, setNumRolls] = useState<string>("500");
  const [isSimulating, setIsSimulating] = useState(false);

  const cardStyle = {
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(12px)",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 12px 32px rgba(37,99,235,0.10)",
    border: "1px solid rgba(255,255,255,0.6)",
  };

  const buttonStyle = {
    background:
      "linear-gradient(135deg,#60A5FA,#2563EB)",
    color: "white",
    border: "none",
    padding: "12px 22px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold" as const,
    fontSize: "15px",
    transition: "all 0.25s ease",
  };

  const sectionTitleStyle = {
    color: "#1E40AF",
    marginBottom: "16px",
    fontWeight: 700,
  };

  const inputStyle = {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #CBD5E1",
    marginLeft: "8px",
    fontSize: "14px",
    outline: "none",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
  };

  const currentRoll =
    rolls.length > 0 ? rolls[rolls.length - 1] : 1;

  const totalRolls = rolls.length;

  const latestRoll =
    rolls.length > 0
      ? rolls[rolls.length - 1]
      : "-";

  const handleRoll = () => {
  const result = rollDice();
  setRolls([result]);
};

  const handleSimulation = async () => {
    setIsSimulating(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 0)
    );

    const parsedRolls = Number(numRolls);

    const safeRolls = Math.min(
      Math.max(1, parsedRolls || 1),
      100000
    );

    const newRolls: number[] = [];

    for (let i = 0; i < safeRolls; i++) {
      newRolls.push(rollDice());
    }

   setRolls(newRolls);

    setIsSimulating(false);
  };

  const handleReset = () => {
    setRolls([]);
  };

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "40px",
        fontFamily: "'Inter', Arial, sans-serif",
        background:
          "linear-gradient(135deg,#dbeafe 0%,#eff6ff 40%,#f8fafc 100%)",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "48px",
          fontWeight: 800,
          color: "#1D4ED8",
          marginBottom: "30px",
          letterSpacing: "-1px",
        }}
      >
        🎲 Dice Probability Simulator
      </h1>

      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "15px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            ...cardStyle,
            borderLeft: "6px solid #3B82F6",
          }}
        >
          <h3
            style={{
              color: "#1E3A8A",
              marginBottom: "10px",
            }}
          >
            Total Rolls
          </h3>

          <p
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              margin: 0,
              color: "#2563EB",
            }}
          >
            {totalRolls}
          </p>
        </div>

        <div
          style={{
            ...cardStyle,
            borderLeft: "6px solid #10B981",
          }}
        >
          <h3
            style={{
              color: "#065F46",
              marginBottom: "10px",
            }}
          >
            Latest Roll
          </h3>

          <p
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              margin: 0,
              color: "#10B981",
            }}
          >
            {latestRoll}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div
        style={{
          ...cardStyle,
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
     <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "35px",
  }}
>
  <Dice value={currentRoll} />
</div>

        <button
          style={buttonStyle}
          onClick={handleRoll}
        >
          🎲 Roll Once
        </button>

        <div
          style={{
            marginTop: "20px",
          }}
        >
          <label
            style={{
              fontWeight: 600,
              color: "#334155",
            }}
          >
            Number of Rolls:
            <input
              type="number"
              min="1"
              value={numRolls}
              style={inputStyle}
              onChange={(e) =>
                setNumRolls(e.target.value)
              }
            />
          </label>

          <button
            onClick={handleSimulation}
            style={{
              ...buttonStyle,
              marginLeft: "10px",
            }}
          >
            ▶ Run Simulation
          </button>

          <button
            onClick={handleReset}
            style={{
              ...buttonStyle,
              background:
                "linear-gradient(135deg,#F87171,#DC2626)",
              marginLeft: "10px",
            }}
          >
            ↺ Reset
          </button>
        </div>

        {isSimulating && (
          <p
            style={{
              color: "#2563EB",
              fontWeight: 600,
              marginTop: "15px",
            }}
          >
            ⏳ Running simulation...
          </p>
        )}
      </div>

      {/* Roll History + Experimental Probability */}
      <div
        style={{
          ...gridStyle,
          marginBottom: "24px",
        }}
      >
        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>
            Roll History
          </h2>
          <RollTable rolls={rolls} />
        </div>

        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>
            Experimental Probability
          </h2>
          <ProbabilityChart rolls={rolls} />
        </div>
      </div>

      {/* Experimental vs Theoretical */}
      <div
        style={{
          ...cardStyle,
          marginBottom: "24px",
        }}
      >
        <h2 style={sectionTitleStyle}>
          Experimental vs Theoretical
          Probability
        </h2>

        <TheoreticalProbabilityTable
          rolls={rolls}
        />
      </div>

      {/* Frequency Table */}
      <div
        style={{
          ...cardStyle,
          marginBottom: "24px",
        }}
      >
        <h2 style={sectionTitleStyle}>
          Frequency Table
        </h2>

        <FrequencyTable rolls={rolls} />
      </div>

      {/* Frequency Distribution */}
      <div style={cardStyle}>
        <h2 style={sectionTitleStyle}>
          Frequency Distribution
        </h2>

        <FrequencyBarChart rolls={rolls} />
      </div>
    </div>
  );
}

export default App;