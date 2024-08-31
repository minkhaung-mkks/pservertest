import { useState } from 'react';
import './App.css';
import axios from 'axios';

// Define the base URL as a constant
const DEV = "http://0.0.0.0:8888"
const PROD = "https://zonal-nessi-mkks-dde95a1c.koyeb.app"
const BASE_URL = DEV;

function App() {
  const [entries, setEntries] = useState([]);
  const [entry, setEntry] = useState(null);
  const [checkResult, setCheckResult] = useState(null);

  const createEntry = async (entryData) => {
    try {
      const response = await axios.post(`${BASE_URL}/entries`, entryData);
      console.log('Entry created:', response.data);
    } catch (error) {
      console.error('Error creating entry:', error);
    }
  };

  const getAllEntries = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/entries`);
      setEntries(response.data);
      console.log('All entries:', response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const getEntryById = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/entries/${id}`);
      setEntry(response.data);
      console.log('Entry fetched by ID:', response.data);
    } catch (error) {
      console.error('Error fetching entry by ID:', error);
    }
  };

  const checkUserAnswer = async (userAnswerData) => {
    try {
      // const URI = "https://zonal-nessi-mkks-dde95a1c.koyeb.app/checkUserAnswer"
      const response = await axios.post(`${BASE_URL}/checkUserAnswer`, userAnswerData);
      setCheckResult(response.data);
      console.log('Check user answer result:', response.data);
    } catch (error) {
      console.error('Error checking user answer:', error);
    }
  };

  // Example data for creating a new entry
  const newEntry = {
    id: '001',
    answer: 'Sample Answer',
    nLevel: 2,
    inputString: '\\frac{a+b}{c}'
  };

  // Example data for checking user answer
  const userAnswerData = {
    userAnswer: '$$-7680$$',
    AI_JSON:
      {
        "n": "1",
        "ia": [
          {
            "hint": "Je moet de rekenvolgorde aanhouden.",
            "steps": [
              {
                "step": "$64\\cdot(6-16)\\cdot12$",
                "explanation": "Je hebt de rekenvolgorde niet aangehouden."
              },
              {
                "step": "$$64\\cdot(-10)\\cdot12$$",
                "explanation": "Bereken $6-16$."
              },
              {
                "step": "$$-640\\cdot12$$",
                "explanation": "Bereken $64\\cdot(-10)$."
              },
              { "step": "$$-7680$$", "explanation": "Bereken $-640\\cdot12$." }
            ],
            "value": "$$-7680$$",
            "mistakeStep": 2
          },
          {
            "hint": "Je moet de rekenvolgorde aanhouden.",
            "steps": [
              {
                "step": "$(384-16)\\cdot12$",
                "explanation": "Je hebt de rekenvolgorde niet aangehouden."
              },
              { "step": "$368\\cdot12$", "explanation": "Bereken $368\\cdot12$." },
              { "step": "$4416$", "explanation": "Bereken $368\\cdot 12$." }
            ],
            "value": "$4416$",
            "mistakeStep": 3
          }
        ],
        "answer": "$192$",
        "correctSteps": [
          {
            "step": "$(138-74)\\cdot 6 - 16\\cdot 12$",
            "explanation": "Dit is de gegeven vergelijking."
          },
          {
            "step": "$(64)\\cdot 6 - 16\\cdot 12$",
            "explanation": "Bereken $138 - 74$."
          },
          {
            "step": "$384 - 16\\cdot 12$",
            "explanation": "Dit is de gegeven vergelijking."
          },
          {
            "step": "$(64)\\cdot 6 - 16\\cdot 12$",
            "explanation": "Bereken $138 - 74$."
          },
          { "step": "$384 - 16\\cdot 12$", "explanation": "Bereken $64 \\cdot 6$." },
          { "step": "$384 - 192$", "explanation": "Bereken $16 \\cdot 12$." },
          { "step": "$192$", "explanation": "Bereken $384 - 192$." }
        ]
      }      
    
  };

  

  const deleteEntry = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/entries/${id}`);
      console.log('Entry deleted:', response.data);
      // Refresh the entries list after deletion
      getAllEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };
  return (
    <>
      <button onClick={getAllEntries}>Get All Entries</button>
      <button onClick={() => getEntryById('001')}>Get Entry by ID</button>
      <button onClick={() => createEntry(newEntry)}>Create Entry</button>
      <button onClick={() => checkUserAnswer(userAnswerData)}>Check User Answer</button>
      <button onClick={() => deleteEntry("001")}>Delete Entry</button>

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
