import React, { useEffect } from 'react';
import * as Styled from './styles';
import { useBookings } from '../../hooks/useBooking';

// Define the props interface
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

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await hook.hookUpdateSingleBooking();
    hook.hookGetBookings();
    onClose();
  };

  return (
    <Styled.PopUpBox>
      <Styled.ModalOverlay>
        <form onSubmit={handleSubmit}>
          <Styled.FormField>
            <Styled.Label>Title:</Styled.Label>
            <Styled.Input
              type="text"
              value={hook.hookDescription}
              onChange={hook.hookSetDescriptionHandler}
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
          <Styled.StyledButton type="submit">Save</Styled.StyledButton>
          <Styled.StyledCancelButton
            type="button"
            onClick={onClose}
          >
            Cancel
          </Styled.StyledCancelButton>
          {' '}
          {/* Change type to "button" and use onClick to close */}
        </form>
      </Styled.ModalOverlay>
    </Styled.PopUpBox>
  );
};
