import React, { useState } from 'react';
import * as Styled from './styles';
import { useBookings } from '../../hooks/useBooking';

interface AddBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddBookingModal: React.FC<AddBookingModalProps> = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const hook = useBookings();
  const [error, setError] = useState<string | null>(null);

  const handleInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const validateForm = () => {
    if (!description || !startDate || !endDate) {
      return 'ERROR: All fields must be filled out.';
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return 'ERROR: Start Time cannot come after End Time.';
    }

    if (start.getHours() < 8) {
      return 'ERROR: Start Time cannot be before 8 AM.';
    }

    if (end.getHours() >= 23 && end.getMinutes() > 0) {
      return 'ERROR: End Time cannot be after 11 PM.';
    }

    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

    if (duration > 3) {
      return 'ERROR: Booking duration cannot exceed 3 hours.';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);

    const token = localStorage.getItem('token');
    const body = {
      title: description,
      start: new Date(startDate).toISOString(),
      end_time: new Date(endDate).toISOString(),
    };

    fetch('http://localhost:5000/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.message.includes('already made 3 bookings this month')) {
            throw new Error('ERROR: You have already made 3 bookings this month.');
          } else {
            throw new Error('Network response was not ok');
          }
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
        setError(err.message);
      });
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
          {error && <Styled.Error>{error}</Styled.Error>}
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
