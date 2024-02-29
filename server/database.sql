CREATE DATABASE eps2669;

CREATE TABLE BOOKINGS (
    eid INTEGER PRIMARY KEY,
    title VARCHAR (100) NOT NULL,
    start_time timestamp NOT NULL,
    end_time timestamp NOT NULL,
    allDay BOOLEAN,
    resource BOOLEAN
);

INSERT INTO BOOKINGS (eid, title, start_time, end_time)
VALUES (1, 'A303 Badminton', '2023-07-02 14:30:00', '2023-07-02 15:30:00');

INSERT INTO BOOKINGS (eid, title, start_time, end_time)
VALUES (2, 'D123 Basketball', '2023-07-04 18:30:00', '2023-07-04 20:30:00');

INSERT INTO BOOKINGS (eid, title, start_time, end_time)
VALUES (3, 'B004 Basketball', '2023-07-07 18:30:00', '2023-07-07 20:30:00');