import React, { useEffect } from 'react';
import * as Styled from './styles';
import { useBookings } from '../../hooks/useBooking';

interface GetBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  eid?: number;
}

export const GetBookingModal: React.FC<GetBookingModalProps> = ({ isOpen, onClose, eid }) => {
  const hook = useBookings();

  useEffect(() => {
    if (eid !== undefined) {
      hook.hookSetSelectedBooking(eid);
    }
  }, [eid]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await hook.hookUpdateSingleBooking();
    hook.hookGetBookings();
    onClose();
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
          <form onSubmit={handleSubmit}>
            <Styled.FormField>
              <Styled.Label>Description:</Styled.Label>
              <Styled.Input
                type="text"
                value={hook.hookDescription}
                onChange={(e) => hook.hookSetDescriptionHandler(e)}
                placeholder="Enter the title of the booking"
              />
            </Styled.FormField>
            <Styled.FormField>
              <Styled.Label>Start Time:</Styled.Label>
              <Styled.Input
                type="datetime-local"
                value={hook.hookStartDate}
                onChange={hook.hookSetStartDateHandler}
              />
            </Styled.FormField>
            <Styled.FormField>
              <Styled.Label>End Time:</Styled.Label>
              <Styled.Input
                type="datetime-local"
                value={hook.hookEndDate}
                onChange={hook.hookSetEndDateHandler}
              />
            </Styled.FormField>
            <Styled.ButtonRow>
              <Styled.SubmitButton type="submit">Save</Styled.SubmitButton>
              <Styled.DeleteButton onClick={handleDelete}>Delete</Styled.DeleteButton>
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
