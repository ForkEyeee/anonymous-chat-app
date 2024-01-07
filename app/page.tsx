import HomePage from '../components/HomePage';
import { useEffect, useState } from 'react';
import { socket } from '@/lib/socket';
import getRoomInfo from '@/lib/actions';

export default async function Home() {
  return <HomePage />;
}
