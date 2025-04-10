import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Inspect() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [criteria, setCriteria] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/criteria').then(cRes => {
      setCriteria(cRes.data);
      setResults(cRes.data.map(c => ({
        criteriaId: c._id,
        is_good: true,
        note: ''
      })));
    });
  }, [carId]);

  const updateResult = (index, field, value) => {
    const updated = [...results];
    updated[index][field] = value;
    setResults(updated);
  };

  const handleSubmit = async () => {
    const hasErrors = results.some(r => !r.is_good && (!r.note || r.note.trim() === ''));
    if (hasErrors) {
      alert('Please provide a note for each failed criteria.');
      return;
    }

    await axios.post(`http://localhost:4000/api/inspection/${carId}`, { results });
    navigate('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Inspect Car</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {criteria.map((c, i) => (
          <li key={c._id} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '8px', borderRadius: '4px' }}>
            <label>{c.name}</label>
            <div>
              <label style={{ marginRight: '10px' }}>
                <input
                  type="checkbox"
                  checked={results[i].is_good}
                  onChange={(e) => updateResult(i, 'is_good', e.target.checked)}
                /> Passed
              </label>
              {!results[i].is_good && (
                <input
                  type="text"
                  value={results[i].note}
                  onChange={(e) => updateResult(i, 'note', e.target.value)}
                  placeholder="Enter note..."
                  style={{ marginTop: '5px', padding: '4px', width: '100%' }}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={handleSubmit}
        style={{ marginTop: '20px', padding: '10px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Submit Inspection
      </button>
    </div>
  );
}
