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
        start: new Date(startDate).toISOString(),
        end_time: new Date(endDate).toISOString(),
      };
      fetch('http://localhost:5000/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Response data:', data);
          setDescription('');
          setStartDate('');
          setEndDate('');
          onClose();
          hook.hookGetBookings();
          console.log('Booking submitted successfully');
        })
        .catch((err) => {
          console.error('Error submitting data', err);
        });
    } catch (err) {
      console.error('An unexpected error occurred:', err);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Styled.ModalOverlay>
      <Styled.ModalContainer>
        <Styled.ModalHeader>
          <Styled.ModalTitle>Add New Booking</Styled.ModalTitle>
          <Styled.CloseButton onClick={onClose}>×</Styled.CloseButton>
        </Styled.ModalHeader>
        <Styled.ModalBody>
          <form onSubmit={handleSubmit}>
            <Styled.FormField>
              <Styled.Label>Description (include unit number + activity):</Styled.Label>
              <Styled.Input
                type="text"
                value={description}
                onChange={handleInputTitle}
                placeholder="Enter the title of the booking"
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
            <Styled.ButtonRow>
              <Styled.SubmitButton type="submit">Submit</Styled.SubmitButton>
              <Styled.CancelButton
                type="button"
                onClick={onClose}
              >
                Cancel
              </Styled.CancelButton>
            </Styled.ButtonRow>
          </form>
        </Styled.ModalBody>
      </Styled.ModalContainer>
    </Styled.ModalOverlay>
  );
};
