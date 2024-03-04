import React, { useState } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import * as Styled from './styles';
import { useResidents } from './hooks/useResidents';
import { useResidentBookings } from './hooks/useResidentBookings';
import { GetBookingModal } from '../Bookings/components/GetBookingModal';
import { useLogOut } from './hooks/useLogOut';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEid, setSelectedEid] = useState<number | undefined>();

  const navigate = useNavigate();
  const hook = useResidents();
  const bookingsHook = useResidentBookings();

  const handleEditClick = (eid: number) => {
    setSelectedEid(eid);
    setIsModalOpen(true);
  };

  const handleLogOut = () => {
    useLogOut();
    navigate('/', { replace: true });
  };

  return (
    <>
      <Styled.UserInfoCard>
        <Styled.SectionHeader>User Information</Styled.SectionHeader>
        <Styled.Row>
          <Styled.Column>
            <Styled.Label>First Name</Styled.Label>
            <Styled.Input
              placeholder="First Name"
              value={hook.hookFirstName}
              disabled
            />
          </Styled.Column>
          <Styled.Column>
            <Styled.Label>Last Name</Styled.Label>
            <Styled.Input
              placeholder="Last Name"
              value={hook.hookLastName}
              disabled
            />
          </Styled.Column>
        </Styled.Row>
        <Styled.Row>
          <Styled.Column>
            <Styled.Label>Email Address</Styled.Label>
            <Styled.Input
              placeholder="Email Address"
              value={hook.hookEmail}
              disabled
            />
          </Styled.Column>
          <Styled.Column>
            <Styled.Label>Password</Styled.Label>
            <Styled.Input
              placeholder="*******"
              type="password"
              disabled
            />
          </Styled.Column>
        </Styled.Row>
        <Styled.Row>
          <Styled.Column>
            <Styled.Label>Phone Number</Styled.Label>
            <Styled.Input
              placeholder="Phone Number"
              value={hook.hookPhone}
              disabled
            />
          </Styled.Column>
          <Styled.Column>
            <Styled.Label>Address</Styled.Label>
            <Styled.Input
              placeholder="Address"
              value={hook.hookAddress}
              disabled
            />
          </Styled.Column>
          <Styled.Column>
            <Styled.Label>Unit Number</Styled.Label>
            <Styled.Input
              placeholder="Unit Number"
              value={hook.hookUnit}
              disabled
            />
          </Styled.Column>
        </Styled.Row>
      </Styled.UserInfoCard>
      <Styled.BookingsSection>
        <Styled.SectionHeader>My Bookings</Styled.SectionHeader>
        {bookingsHook.hookBookings.map((booking) => (
          <Styled.BookingRow key={booking.eid}>
            <Styled.BookingColumn>
              <Styled.BookingLabel>Description</Styled.BookingLabel>
              <Styled.BookingInput
                type="text"
                value={booking.title}
                disabled
              />
            </Styled.BookingColumn>
            <Styled.BookingColumn>
              <Styled.BookingLabel>Start Date</Styled.BookingLabel>
              <Styled.BookingInput
                type="text"
                value={format(new Date(booking.start), 'yyyy-MM-dd HH:mm')}
                disabled
              />
            </Styled.BookingColumn>
            <Styled.BookingColumn>
              <Styled.BookingLabel>End Date</Styled.BookingLabel>
              <Styled.BookingInput
                type="text"
                value={format(new Date(booking.end_time), 'yyyy-MM-dd HH:mm')}
                disabled
              />
            </Styled.BookingColumn>
            <Styled.EditButton onClick={() => handleEditClick(booking.eid)}>Edit</Styled.EditButton>
          </Styled.BookingRow>
        ))}
      </Styled.BookingsSection>
      <Styled.LogoutButton onClick={handleLogOut}>Logout</Styled.LogoutButton>
      <GetBookingModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); bookingsHook.hookGetResidentBookings(); }}
        eid={selectedEid}
      />
    </>
  );
};

export default Home;
