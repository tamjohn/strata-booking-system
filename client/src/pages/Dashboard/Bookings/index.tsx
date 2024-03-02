import React, { useEffect, useState } from 'react';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import enCA from 'date-fns/locale/en-CA';
import { useBookings } from './hooks/useBooking';
import { AddBookingModal } from './components/AddBookingModal';
import { GetBookingModal } from './components/GetBookingModal';

const locales = {
  'en-CA': enCA,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Booking {
    eid: number;
    start?: string | Date;
    end_time?: string | Date;
}

const formats = {
  timeGutterFormat: 'HH:mm',
};

function CalendarTemplate() {
  const hook = useBookings();

  const [isSlotOpen, setIsSlotOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [eid, setEid] = useState<number | null>(null);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const handleSlotClick = () => {
    setIsSlotOpen(!isSlotOpen);
  };

  const handleCloseModal = () => {
    setIsSlotOpen(false);
    setIsEventModalOpen(false);
    setShouldRefetch(true);
  };
  const handleEventClick = (event: any) => {
    setIsEventModalOpen(!isEventModalOpen);
    setEid(event.eid as number);
  };

  const convertDate = (data: Booking[]): Booking[] => data.map((item) => {
    const newItem = { ...item };
    if (newItem.start) {
      newItem.start = new Date(newItem.start);
    }
    if (newItem.end_time) {
      newItem.end_time = new Date(newItem.end_time);
    }
    return newItem;
  });

  const refetchBookings = () => {
    hook.hookGetBookings();
    setShouldRefetch(false);
  };

  useEffect(() => {
    if (shouldRefetch) {
      refetchBookings();
    }
  }, [shouldRefetch, hook.hookGetBookings]);

  return (
    <div>
      <h1> EPS Multi-Court Booking</h1>
      <div>
        {isSlotOpen && (
        <AddBookingModal
          isOpen={isSlotOpen}
          onClose={handleCloseModal}
        />
        )}
        {isEventModalOpen && (
        <GetBookingModal
          isOpen={isEventModalOpen}
          onClose={handleCloseModal}
          eid={eid!}
        />
        )}
      </div>
      <Calendar
        localizer={localizer}
        formats={formats}
        events={convertDate(hook.hookBookings as Booking[])}
        startAccessor="start"
        endAccessor="end_time"
        style={{ height: 900, margin: '50px' }}
        onSelectSlot={handleSlotClick}
        onSelectEvent={handleEventClick}
        selectable
      />
    </div>
  );
}

export default CalendarTemplate;
