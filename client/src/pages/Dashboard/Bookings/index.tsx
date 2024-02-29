import React, { useState } from 'react';
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
    start_time?: string | Date;
    end_time?: string | Date;
}

const formats = {
  timeGutterFormat: 'HH:mm',
};

function CalendarTemplate() {
  const hook = useBookings();

  const [isSlotOpen, setIsSlotOpen] = useState<boolean>(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState<boolean>(false);
  const [eid, setEid] = useState<number | null>(null);

  const handleSlotClick = () => {
    setIsSlotOpen(!isSlotOpen);
  };

  const handleCloseSlotModal = () => {
    setIsSlotOpen(false);
  };

  const handleCloseEventModal = () => {
    setIsEventModalOpen(false);
  };

  const handleEventClick = (event: any) => {
    setIsEventModalOpen(!isEventModalOpen);
    setEid(event.eid as number);
  };

  const convertDate = (data: Booking[]): Booking[] => {
    const modifiedData = data.map((item) => {
      const newItem = { ...item };
      if (newItem.start_time) {
        newItem.start_time = new Date(newItem.start_time);
      }
      if (newItem.end_time) {
        newItem.end_time = new Date(newItem.end_time);
      }
      return newItem;
    });

    return modifiedData;
  };

  return (
    <div>
      <h1> EPS Multi-Court Booking</h1>
      <div>
        {isSlotOpen && (
        <AddBookingModal
          isOpen={isSlotOpen}
          onClose={handleCloseSlotModal}
        />
        )}
        {isEventModalOpen && (
        <GetBookingModal
          isOpen={isEventModalOpen}
          onClose={handleCloseEventModal}
          eid={eid!}
        />
        )}
      </div>
      <Calendar
        localizer={localizer}
        formats={formats}
        events={convertDate(hook.hookBookings as Booking[])}
        startAccessor="start_time"
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
