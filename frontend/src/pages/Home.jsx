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
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Car List</h1>
      <ul className='space-y-2'>
        {cars.map(car => (
          <li key={car._id} className='border p-3 rounded shadow flex justify-between items-center'>
            <span>{car.name} - <strong>{statusLabel(car.status)}</strong></span>
            <Link className='text-blue-500 underline' to={`/inspect/${car._id}`}>Inspect</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}