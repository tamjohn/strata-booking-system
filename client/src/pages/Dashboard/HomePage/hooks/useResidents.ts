import { useEffect, useState } from 'react';

export const useResidents = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAd, setEmailAd] = useState('');
  const [phone, setPhone] = useState('');
  const [addressSt, setAddressSt] = useState('');
  const [unit, setUnit] = useState('');

  const getSingleResident = async (): Promise<void> => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('http://localhost:5000/residents', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const [data] = await response.json();
      if (data) {
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmailAd(data.email);
        setPhone(data.phone_number);
        setAddressSt(data.address);
        setUnit(data.unit_number);
      }
    } catch (error) {
      console.log('Error fetching resident data:', error);
    }
  };

  useEffect(() => {
    getSingleResident();
  }, []);

  return {
    hookFirstName: firstName,
    hookLastName: lastName,
    hookEmail: emailAd,
    hookPhone: phone,
    hookAddress: addressSt,
    hookUnit: unit,
  };
};
