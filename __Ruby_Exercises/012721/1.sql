
-- CREATE TABLE for classroom
CREATE TABLE classrooms (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    student_id INTEGER,
    section VARCHAR(50) 
)

-- INSERT 10 RECORDS
INSERT INTO classrooms VALUES (1, 1, 'A');
INSERT INTO classrooms VALUES (2, 2, 'A');
INSERT INTO classrooms VALUES (3, 3, 'B');
INSERT INTO classrooms VALUES (4, 4, 'C');
INSERT INTO classrooms VALUES (5, 5, 'B');
INSERT INTO classrooms VALUES (6, 6, 'A');
INSERT INTO classrooms VALUES (7, 7, 'C');
INSERT INTO classrooms VALUES (8, 8, 'B');
INSERT INTO classrooms VALUES (9, 9, 'B');
INSERT INTO classrooms VALUES (10, 10, 'C');


-- SELECT USING JOINS
SELECT * FROM students 
    INNER join classrooms 
ON students.id=classrooms.student_id;

SELECT * FROM students 
    LEFT join classrooms 
ON students.id=classrooms.student_id;

SELECT * FROM students 
    RIGHT join classrooms 
ON students.id=classrooms.student_id;

SELECT * FROM students 
    FULL join classrooms 
ON students.id=classrooms.student_id;