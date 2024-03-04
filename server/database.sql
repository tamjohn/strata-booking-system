CREATE DATABASE eps2669;

CREATE TABLE bookings (
    eid integer NOT NULL,
    title character varying(100) NOT NULL,
    start timestamp with time zone NOT NULL,
    end_time timestamp with time zone NOT NULL,
    allday boolean,
    resource boolean,
    resident_id integer,
    PRIMARY KEY (eid),
    FOREIGN KEY (resident_id) REFERENCES residents(resident_id)
);

INSERT INTO bookings (eid, title, start_time, end_time)
VALUES (1, 'A303 Badminton', '2023-07-02 14:30:00', '2023-07-02 15:30:00');

INSERT INTO bookings (eid, title, start_time, end_time)
VALUES (2, 'D123 Basketball', '2023-07-04 18:30:00', '2023-07-04 20:30:00');

INSERT INTO bookings (eid, title, start_time, end_time)
VALUES (3, 'B004 Basketball', '2023-07-07 18:30:00', '2023-07-07 20:30:00');

CREATE SEQUENCE residents_resident_id_seq;

CREATE TABLE residents (
    resident_id integer NOT NULL DEFAULT nextval('residents_resident_id_seq'::regclass),
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL UNIQUE,
    password character varying(255) NOT NULL UNIQUE,
    phone_number character varying(20) NOT NULL,
    address character varying(255) NOT NULL,
    unit_number character varying(50) NOT NULL,
    PRIMARY KEY (resident_id)
);

ALTER SEQUENCE residents_resident_id_seq OWNED BY residents.resident_id;

INSERT INTO residents (resident_id, first_name, last_name, email, password, phone_number, address, unit_number) VALUES
(1, 'John', 'Tam', 'tamjohnathan@gmail.com', '$2b$10$neFsRUIASlmUn9K7PNHcgOLmXn664DEM.tPA6qM16IdYKxyqG0yAO', '604-123-1234', '111 Alexandra Road', 'A111'),
(2, 'Tester', 'One', 'tester1@gmail.com', '$2b$10$iPpTo8Y4ArNjrqMgE4Ur3OdtdjP3405WZP0j/3L6A8/Esvot6p6ym', '604-123-1234', '111 Alexandra Road', 'A112');

