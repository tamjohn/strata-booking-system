import { useEffect, useState } from 'react';

interface Booking {
  eid: number;
  title: string;
  start: string;
  end_time: string;
  allday?: boolean;
  resource?: boolean;
  resident_id: number;
}

export const useResidentBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const getResidentBookings = async (): Promise<void> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('http://localhost:5000/userbookings', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const bookingsData: Booking[] = await response.json();

      const sortedBookings = bookingsData.sort((a: Booking, b: Booking) => new Date(a.start).getTime() - new Date(b.start).getTime());

      setBookings(sortedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    getResidentBookings();
  }, []);

  return {
    hookBookings: bookings,
    hookGetResidentBookings: getResidentBookings,
  };
};
