import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/cars').then(res => setCars(res.data));
  }, []);

  const statusLabel = (s) => ['Not Inspected', 'Inspecting', 'Inspected'][s];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Car List</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {cars.map(car => (
          <li key={car._id} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '8px', borderRadius: '4px' }}>
            <span>{car.name} - <strong>{statusLabel(car.status)}</strong></span>
            <Link to={`/inspect/${car._id}`} style={{ float: 'right', color: 'blue' }}>Inspect</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}