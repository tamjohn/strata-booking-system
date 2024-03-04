import { useEffect, useState } from 'react';

interface Booking {
  eid: number;
  title: string;
  start: string;
  end_time: string;
  resident_id?: number;
}

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookingID, setBookingID] = useState<number | null>(null);
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const formatDateToInput = (date: Date | string): string => {
    const adjustDate = new Date(date);

    const year = adjustDate.getFullYear();
    const month = String(adjustDate.getMonth() + 1).padStart(2, '0');
    const day = String(adjustDate.getDate()).padStart(2, '0');
    const hours = String(adjustDate.getHours()).padStart(2, '0');
    const minutes = String(adjustDate.getMinutes()).padStart(2, '0');

    const modifiedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    return modifiedDate;
  };

  const getBookings = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:5000/bookings');
      const data = await response.json();
      setBookings(data);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const getSingleBooking = async (eid: number): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:5000/bookings/${eid}`);
      const data = await response.json();
      setSelectedBooking(data);
      setBookingID(data.eid);
      setDescription(data.title);
      setStartDate(formatDateToInput(data.start));
      setEndDate(formatDateToInput(data.end_time));
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const updateSingleBooking = async (): Promise<void> => {
    try {
      const token = localStorage.getItem('token');
      const body = {
        eid: bookingID,
        title: description,
        start: startDate,
        end_time: endDate,
      };
      await fetch(`http://localhost:5000/bookings/${bookingID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      setBookingID(bookingID);
      setDescription(description);
      setStartDate(formatDateToInput(startDate));
      setEndDate(formatDateToInput(endDate));
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const deleteBooking = async (eid: number): Promise<void> => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:5000/bookings/${eid}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete the booking');
      }
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.eid !== eid));
      if (selectedBooking && selectedBooking.eid === eid) {
        setSelectedBooking(null);
      }
      console.log('Booking was deleted successfully');
    } catch (err) {
      console.error('Error deleting booking:', err);
    }
  };

  const setDescriptionHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('Setting description to:', e.target.value);
    setDescription(e.target.value);
  };

  const setStartDateHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setStartDate(formatDateToInput(new Date(e.target.value)));
  };

  const setEndDateHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEndDate(formatDateToInput(new Date(e.target.value)));
  };

  useEffect(() => {
    getBookings();
  }, []);

  return {
    hookBookings: bookings,
    hookGetBookings: getBookings,

    hookSelectedBooking: selectedBooking,
    hookSetSelectedBooking: getSingleBooking,

    hookDescription: description,
    hookSetDescriptionHandler: setDescriptionHandler,

    hookStartDate: startDate,
    hookSetStartDateHandler: setStartDateHandler,

    hookEndDate: endDate,
    hookSetEndDateHandler: setEndDateHandler,

    hookBookingID: bookingID,

    hookUpdateSingleBooking: updateSingleBooking,

    hookDeleteBooking: deleteBooking,
  };
};
