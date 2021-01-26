
-- CREATE TABLE
CREATE TABLE students (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    middle_name VARCHAR(50),
    last_name VARCHAR(50),
    age INTEGER,
    location VARCHAR(200)
);


-- INSERT RECORDS
INSERT INTO students VALUES (1, 'Juan', 'Blank', 'Cruz', 18, 'Manila');
INSERT INTO students VALUES (2, 'John', 'Blank', 'Young', 20, 'Manila');
INSERT INTO students VALUES (3, 'Victor', 'Blank', 'Rivera', 21, 'Manila');
INSERT INTO students VALUES (4, 'Adrian', 'Blank', 'Co', 19, 'Manila');
INSERT INTO students VALUES (5, 'Pau', 'Blank', 'Riosa', 22, 'Manila');
INSERT INTO students VALUES (6, 'Piolo', 'Blank', 'Pascual', 25, 'Manila');


-- UPDATE FIRST RECORD
UPDATE students SET 
    first_name='Ana',
    middle_name='Cui', 
    last_name='Cajocson', 
    age=25, 
    location='Bulacan' 
WHERE id=1;


-- DELETE LAST RECORD
DELETE FROM students WHERE id=6