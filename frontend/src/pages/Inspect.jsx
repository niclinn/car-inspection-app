import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Inspect() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [criteria, setCriteria] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/cars').then(res => {
      axios.get('http://localhost:4000/api/criteria').then(cRes => {
        setCriteria(cRes.data);
        setResults(cRes.data.map(c => ({ criteriaId: c._id, is_good: true, note: '' })));
      });
    });
  }, [carId]);

  const updateResult = (index, field, value) => {
    const updated = [...results];
    updated[index][field] = value;
    setResults(updated);
  };

  const handleSubmit = async () => {
    const hasErrors = results.some(r => r.is_good === false && (!r.note || r.note.trim() === ''));
    if (hasErrors) return alert('Please add notes for all failed criteria.');

    await axios.post(`http://localhost:4000/api/inspection/${carId}`, { results });
    navigate('/');
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Inspection</h1>
      <ul className='space-y-4'>
        {criteria.map((c, i) => (
          <li key={c._id} className='border p-3 rounded'>
            <label className='block font-medium'>{c.name}</label>
            <div className='flex items-center gap-4'>
              <label>
                <input
                  type='checkbox'
                  checked={results[i]?.is_good}
                  onChange={e => updateResult(i, 'is_good', e.target.checked)}
                /> Passed
              </label>
              {!results[i]?.is_good && (
                <input
                  type='text'
                  className='border p-1 flex-1'
                  placeholder='Enter note...'
                  value={results[i]?.note || ''}
                  onChange={e => updateResult(i, 'note', e.target.value)}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
      <button className='mt-6 bg-blue-500 text-white px-4 py-2 rounded' onClick={handleSubmit}>
        Submit Inspection
      </button>
    </div>
  );
}
