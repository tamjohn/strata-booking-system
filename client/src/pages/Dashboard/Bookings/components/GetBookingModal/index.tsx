import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import * as Styled from './styles';
import { useBookings } from '../../hooks/useBooking';

interface GetBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  eid?: number;
}

interface DecodedToken {
  userId: number;
  email?: string;
}

export const GetBookingModal: React.FC<GetBookingModalProps> = ({ isOpen, onClose, eid }) => {
  const hook = useBookings();
  const [userId, setUserId] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      setUserId(decoded.userId);
    }

    console.log('eid:', eid);

    if (eid !== undefined) {
      hook.hookSetSelectedBooking(eid);
    }

    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/bookings/${eid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch booking details');
        }
        const data = await response.json();
        setDescription(data.title);
        setStartDate(formatDateToInput(data.start));
        setEndDate(formatDateToInput(data.end_time));
        console.log('start date:', startDate);
        console.log('end date:', endDate);
      } catch (err) {
        setError('Could not load booking details');
      }
    };

    if (isOpen) {
      fetchBookingDetails();
    }
  }, [isOpen, eid]);

  const isOwner = userId === hook.hookSelectedBooking?.resident_id;

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
    const formValidationError = validateForm();
    if (formValidationError) {
      setError(formValidationError);
      return;
    }
    const token = localStorage.getItem('token');

    try {
      const body = { title: description, start: startDate, end_time: endDate };
      const response = await fetch(`http://localhost:5000/bookings/${eid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred while updating the booking');
        return;
      }
      setError(null);
      onClose();
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  const handleDelete = async () => {
    if (eid) {
      await hook.hookDeleteBooking(eid);
      onClose();
      hook.hookGetBookings();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Styled.ModalOverlay>
      <Styled.ModalContainer>
        <Styled.ModalHeader>
          <Styled.ModalTitle>Booking Details</Styled.ModalTitle>
          <Styled.CloseButton onClick={onClose}>×</Styled.CloseButton>
        </Styled.ModalHeader>
        <Styled.ModalBody>
          {error && <Styled.Error>{error}</Styled.Error>}
          <form onSubmit={handleSubmit}>
            <Styled.FormField>
              <Styled.Label>Description:</Styled.Label>
              <Styled.Input
                type="text"
                value={description}
                onChange={handleInputTitle}
                placeholder="Enter the title of the booking"
                disabled={!isOwner}
              />
            </Styled.FormField>
            <Styled.FormField>
              <Styled.Label>Start Time:</Styled.Label>
              <Styled.Input
                type="datetime-local"
                value={startDate}
                onChange={handleStartDate}
                disabled={!isOwner}
              />
            </Styled.FormField>
            <Styled.FormField>
              <Styled.Label>End Time:</Styled.Label>
              <Styled.Input
                type="datetime-local"
                value={endDate}
                onChange={handleEndDate}
                disabled={!isOwner}
              />
            </Styled.FormField>
            <Styled.ButtonRow>
              <Styled.SubmitButton
                type="submit"
                disabled={!isOwner}
              >
                Save
              </Styled.SubmitButton>
              <Styled.DeleteButton
                onClick={handleDelete}
                disabled={!isOwner}
              >
                Delete
              </Styled.DeleteButton>
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
