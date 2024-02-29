import React, { useState } from 'react';
import * as Styled from './styles';
import { useBookings } from '../../hooks/useBooking';

interface AddBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddBookingModal: React.FC<AddBookingModalProps> = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const hook = useBookings();

  const handleInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const body = {
        eid: Math.floor(Math.random() * 1000),
        title: description,
        start: new Date(startDate),
        end_time: new Date(endDate),
      };
      await fetch('http://localhost:5000/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      setDescription('');
      setStartDate('');
      setEndDate('');
      onClose();
      hook.hookGetBookings(); 

      console.log('Booking submitted successfully');
    } catch (err: any) {
      console.log('Error submitting data', err.message);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Styled.PopUpBox>
      <Styled.ModalOverlay>
        <form onSubmit={handleSubmit}>
          <Styled.FormField>
            <Styled.Label>Title:</Styled.Label>
            <Styled.Input
              type="text"
              value={description}
              onChange={handleInputTitle}
            />
          </Styled.FormField>
          <Styled.FormField>
            <Styled.Label>Start Time:</Styled.Label>
            <Styled.Input
              type="datetime-local"
              value={startDate}
              onChange={handleStartDate}
            />
          </Styled.FormField>
          <Styled.FormField>
            <Styled.Label>End Time:</Styled.Label>
            <Styled.Input
              type="datetime-local"
              value={endDate}
              onChange={handleEndDate}
            />
          </Styled.FormField>
          <Styled.StyledButton type="submit">Submit</Styled.StyledButton>
          <Styled.StyledCancelButton
            type="button"
            onClick={onClose}
          >
            Cancel
          </Styled.StyledCancelButton>
        </form>
      </Styled.ModalOverlay>
    </Styled.PopUpBox>
  );
};
