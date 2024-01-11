import HomePage from '../components/HomePage';
import { useEffect, useState } from 'react';
import { socket } from '@/lib/socket';
import getRoomInfo from '@/lib/actions';

async function getData() {
  const res = await fetch('http://localhost:3000/api', { cache: 'no-store' });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  // const data = await getData();

  return <HomePage />;
}
