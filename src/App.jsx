import { useState } from "react";
import "./App.css";
import axios from "axios";

// Define the base URL as a constant
const DEV = "http://0.0.0.0:8899";
const PROD = "https://zonal-nessi-mkks-dde95a1c.koyeb.app";
const BASE_URL = PROD;

function App() {
  const [entries, setEntries] = useState([]);
  const [entry, setEntry] = useState(null);
  const [UA, setUA] = useState("");
  const [checkResult, setCheckResult] = useState(null);

  const createEntry = async (entryData) => {
    try {
      const response = await axios.post(`${BASE_URL}/entries`, entryData);
      console.log("Entry created:", response.data);
    } catch (error) {
      console.error("Error creating entry:", error);
    }
  };

  const getAllEntries = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/entries`);
      setEntries(response.data);
      console.log("All entries:", response.data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  const getEntryById = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/entries/${id}`);
      setEntry(response.data);
      console.log("Entry fetched by ID:", response.data);
    } catch (error) {
      console.error("Error fetching entry by ID:", error);
    }
  };

  const checkUserAnswer = async (userAnswerData) => {
    setCheckResult("");
    try {
      // const URI = "https://zonal-nessi-mkks-dde95a1c.koyeb.app/checkUserAnswer"
      const response = await axios.post(
        `${BASE_URL}/checkUserAnswer`,
        userAnswerData
      );
      setCheckResult(response.data);
      console.log("Check user answer result:", response.data);
    } catch (error) {
      console.error("Error checking user answer:", error);
    }
  };

  // Example data for creating a new entry
  const newEntry = {
    id: "001",
    answer: "Sample Answer",
    nLevel: 2,
    inputString: "\\frac{a+b}{c}",
  };

  // Example data for checking user answer
  const userAnswerData = {
    userAnswer: UA,
    AI_JSON: {
      n: "1",
      ia: [
        {
          hint: "Om twee breuken met elkaar te vermenigvuldigen moet je teller keer teller en noemer keer noemer doen.",
          steps: [
            {
              step: "$\\frac{3}{2x} \\cdot \\frac{1}{2y}$",
              explanation:
                "Je hebt $x$ vermenigvuldigt met de noemer in plaats van de teller.",
            },
            {
              step: "$\\frac{3}{4xy}$",
              explanation:
                "Bereken $\\frac{3}{2x} \\cdot \\frac{1}{2y}$ door teller keer teller en noemer keer noemer.",
            },
          ],
          value: "$\\frac{3}{4xy}$",
          mistakeStep: 1,
        },
        {
          hint: "Om twee breuken met elkaar te vermenigvuldigen moet je teller keer teller en noemer keer noemer doen.",
          steps: [
            {
              step: "$x \\cdot \\frac{3+1}{2+2y}$",
              explanation:
                "Je hebt de tellers en de noemers opgeteld in plaats van de tellers en noemers vermenigvuldigd.",
            },
            {
              step: "$x \\cdot \\frac{4}{2+2y}$",
              explanation: "Bereken $3+1$.",
            },
            {
              step: "$\\frac{x}{1} \\cdot \\frac{4}{2+2y}$",
              explanation: "Maak een breuk van $x$",
            },
            {
              step: "$\\frac{4x}{2+2y}$",
              explanation:
                "Bereken $\\frac{x}{1} \\cdot \\frac{4}{2+2y}$ door teller keer teller en noemer keer noemer.",
            },
          ],
          value: "$\\frac{4x}{2+2y}$",
          mistakeStep: 1,
        },
        {
          hint: "Om twee breuken met elkaar te vermenigvuldigen moet je teller keer teller en noemer keer noemer doen.",
          steps: [
            {
              step: "$x \\cdot \\frac{3+1}{2+2y}$",
              explanation:
                "Je hebt de tellers en de noemers opgeteld in plaats van de tellers en noemers vermenigvuldigd.",
            },
            {
              step: "$x \\cdot \\frac{4}{2+2y}$",
              explanation: "Bereken $3+1$.",
            },
            {
              step: "$\\frac{x}{1} \\cdot \\frac{4}{2+2y}$",
              explanation: "Maak een breuk van $x$",
            },
            {
              step: "$\\frac{4x}{2+2y}$",
              explanation:
                "Bereken $\\frac{x}{1} \\cdot \\frac{4}{2+2y}$ door teller keer teller en noemer keer noemer.",
            },
            {
              step: "$\\frac{4x}{4y}$",
              explanation:
                "Je hebt nu twee termen opgeteld die je niet kan optellen.",
            },
            {
              step: "$\\frac{x}{y}$",
              explanation:
                "Deel de teller en de noemer van $\\frac{4x}{4y}$ door 4.",
            },
          ],
          value: "$\\frac{x}{y}$",
          mistakeStep: 1,
        },
        {
          hint: "Om twee breuken met elkaar te vermenigvuldigen moet je teller keer teller en noemer keer noemer doen.",
          steps: [
            {
              step: "$x\\cdot \\frac{3}{2y}$",
              explanation:
                "Je bent vergeten de noemers met elkaar te vermenigvuldigen.",
            },
            {
              step: "$\\frac{x}{1} \\cdot \\frac{3}{2y}$",
              explanation: "Maak een breuk van $x$.",
            },
            {
              step: "$\\frac{3x}{2y}$",
              explanation:
                "Bereken $\\frac{x}{1} \\cdot \\frac{3}{2y}$ door teller keer teller en noemer keer noemer.",
            },
          ],
          value: "$\\frac{3x}{2y}$",
          mistakeStep: 1,
        },
        {
          hint: "Om twee breuken met elkaar te vermenigvuldigen moet je teller keer teller en noemer keer noemer doen.",
          steps: [
            {
              step: "$x\\cdot \\frac{3}{2}$",
              explanation:
                "Je bent vergeten de noemers met elkaar te vermenigvuldigen.",
            },
            {
              step: "$\\frac{x}{1}\\cdot \\frac{3}{2}$",
              explanation: "Maak een breuk van $x$.",
            },
            {
              step: "$\\frac{3x}{2}$",
              explanation:
                "Bereken $\\frac{x}{1}\\cdot \\frac{3}{2}$ door teller keer teller en noemer keer noemer.",
            },
          ],
          value: "$\\frac{3x}{2}$",
          mistakeStep: 1,
        },
        {
          hint: "Om twee breuken met elkaar te vermenigvuldigen moet je teller keer teller en noemer keer noemer doen.",
          steps: [
            {
              step: "$$\\frac{3x+1}{2+2y}$$",
              explanation:
                "Je hebt de tellers en de noemers opgeteld in plaats van de tellers en noemers vermenigvuldigd.",
            },
          ],
          value: "$$\\frac{3x+1}{2+2y}$$",
          mistakeStep: 3,
        },
      ],
      answer: "$\\frac{3x}{4y}$",
      correctSteps: [
        {
          step: "$x \\cdot \\frac{3}{2} \\cdot \\frac{1}{2y}$",
          explanation: "Dit is de gegeven uitdrukking.",
        },
        {
          step: "$\\frac{x}{1} \\cdot \\frac{3}{2} \\cdot \\frac{1}{2y}$",
          explanation: "Maak een breuk van $x$.",
        },
        {
          step: "$\\frac{3x}{2} \\cdot \\frac{1}{2y}$",
          explanation:
            "Bereken $\\frac{x}{1} \\cdot \\frac{3}{2}$ door teller keer teller en noemer keer noemer.",
        },
        {
          step: "$\\frac{3x}{4y}$",
          explanation:
            "Bereken $\\frac{3x}{2} \\cdot \\frac{1}{2y}$ door teller keer teller en noemer keer noemer.",
        },
      ],
    },
  };

  const deleteEntry = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/entries/${id}`);
      console.log("Entry deleted:", response.data);
      // Refresh the entries list after deletion
      getAllEntries();
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };
  return (
    <>
      <input value={UA} onChange={(e) => setUA(e.target.value)} type="text" />
      <button onClick={() => checkUserAnswer(userAnswerData)}>
        Check User Answer
      </button>
      <div>
        <h3>All Entries:</h3>
        <pre>{JSON.stringify(entries, null, 2)}</pre>
      </div>
      <div>
        <h3>Entry by ID:</h3>
        <pre>{JSON.stringify(entry, null, 2)}</pre>
      </div>
      <div>
        <h3>Check User Answer Result:</h3>
        <pre>{JSON.stringify(checkResult, null, 2)}</pre>
      </div>
    </>
  );
}

export default App;
