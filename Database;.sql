-- DROP SCHEMA dbo;

CREATE SCHEMA dbo;
-- Uni.dbo.Admins definition

-- Drop table

-- DROP TABLE Uni.dbo.Admins;

CREATE TABLE Admins (
	id int NOT NULL,
	FirstName text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	LastName text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	DateOfBirth date NOT NULL,
	Gender char(1) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Address text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Phone text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Email text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__Admins__719FE4E80B024C93 PRIMARY KEY (id)
);


-- Uni.dbo.Alerts definition

-- Drop table

-- DROP TABLE Uni.dbo.Alerts;

CREATE TABLE Alerts (
	[Number] int NOT NULL,
	isRead bit NULL,
	Expdate date NULL,
	Details varchar(250) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Table_name varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Entry_number int NULL,
	[Date] datetime NULL
);


-- Uni.dbo.Courses definition

-- Drop table

-- DROP TABLE Uni.dbo.Courses;

CREATE TABLE Courses (
	id int NOT NULL,
	CourseName text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CourseCode varchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CreditHours int NOT NULL,
	Description text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__Courses__C92D7187037F009A PRIMARY KEY (id)
);


-- Uni.dbo.Departments definition

-- Drop table

-- DROP TABLE Uni.dbo.Departments;

CREATE TABLE Departments (
	id int NOT NULL,
	DepartmentName text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__Departme__B2079BCDCA39BAFB PRIMARY KEY (id)
);


-- Uni.dbo.Faculty definition

-- Drop table

-- DROP TABLE Uni.dbo.Faculty;

CREATE TABLE Faculty (
	id int NOT NULL,
	FirstName text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	LastName text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	DateOfBirth date NOT NULL,
	Gender char(1) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Address text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Phone text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Email text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__Faculty__306F636EB424D328 PRIMARY KEY (id)
);


-- Uni.dbo.Students definition

-- Drop table

-- DROP TABLE Uni.dbo.Students;

CREATE TABLE Students (
	id int NOT NULL,
	FirstName text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	LastName text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	DateOfBirth date NOT NULL,
	Gender char(1) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Address text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Phone text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Email text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	enrollment_number varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__Students__32C52A792790364D PRIMARY KEY (id)
);


-- Uni.dbo.TimeSlots definition

-- Drop table

-- DROP TABLE Uni.dbo.TimeSlots;

CREATE TABLE TimeSlots (
	id int IDENTITY(1,1) NOT NULL,
	day_of_week varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	start_time time NOT NULL,
	end_time time NOT NULL,
	CONSTRAINT PK__TimeSlot__3213E83F5E9859B7 PRIMARY KEY (id)
);


-- Uni.dbo.buildings definition

-- Drop table

-- DROP TABLE Uni.dbo.buildings;

CREATE TABLE buildings (
	id int NOT NULL,
	building_name text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	location text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__building__3213E83F3A43FFDF PRIMARY KEY (id)
);


-- Uni.dbo.employee definition

-- Drop table

-- DROP TABLE Uni.dbo.employee;

CREATE TABLE employee (
	id int NOT NULL,
	name text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	contact_info text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	department text COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__employee__C52E0BA8E1AA1E2A PRIMARY KEY (id)
);


-- Uni.dbo.CourseTimeSlots definition

-- Drop table

-- DROP TABLE Uni.dbo.CourseTimeSlots;

CREATE TABLE CourseTimeSlots (
	course_id int NOT NULL,
	time_slot_id int NOT NULL,
	CONSTRAINT FK__CourseTim__cours__5070F446 FOREIGN KEY (course_id) REFERENCES Courses(id),
	CONSTRAINT FK__CourseTim__time___5165187F FOREIGN KEY (time_slot_id) REFERENCES TimeSlots(id)
);


-- Uni.dbo.Enrollments definition

-- Drop table

-- DROP TABLE Uni.dbo.Enrollments;

CREATE TABLE Enrollments (
	id int NOT NULL,
	courseID int NOT NULL,
	studentID int NOT NULL,
	CONSTRAINT PK__Enrollme__7F6877FB7CC5A67A PRIMARY KEY (id),
	CONSTRAINT FK__Enrollmen__Cours__412EB0B6 FOREIGN KEY (courseID) REFERENCES Courses(id),
	CONSTRAINT FK__Enrollmen__Stude__403A8C7D FOREIGN KEY (studentID) REFERENCES Students(id)
);


-- Uni.dbo.Semesters definition

-- Drop table

-- DROP TABLE Uni.dbo.Semesters;

CREATE TABLE Semesters (
	id int NOT NULL,
	courseID int NOT NULL,
	FacultyID int NOT NULL,
	Semester char(1) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	[Year] int NOT NULL,
	CONSTRAINT PK__Semester__043301BD8731BBCD PRIMARY KEY (id),
	CONSTRAINT FK__Semesters__Cours__4AB81AF0 FOREIGN KEY (courseID) REFERENCES Courses(id),
	CONSTRAINT FK__Semesters__Facul__49C3F6B7 FOREIGN KEY (FacultyID) REFERENCES Faculty(id)
);


-- Uni.dbo.Teaches definition

-- Drop table

-- DROP TABLE Uni.dbo.Teaches;

CREATE TABLE Teaches (
	CourseID int NOT NULL,
	FacultyID int NOT NULL,
	CONSTRAINT PK__Teaches__5CFDB4765DCF91E0 PRIMARY KEY (id),
	CONSTRAINT FK__Teaches__CourseI__46E78A0C FOREIGN KEY (CourseID) REFERENCES Courses(id),
	CONSTRAINT FK__Teaches__Faculty__45F365D3 FOREIGN KEY (FacultyID) REFERENCES Faculty(id)
);


-- Uni.dbo.rooms definition

-- Drop table

-- DROP TABLE Uni.dbo.rooms;

CREATE TABLE rooms (
	id int NOT NULL,
	room_number text COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	building_id int NULL,
	capacity int NULL,
	amenities text COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__rooms__3213E83F25A33E99 PRIMARY KEY (id),
	CONSTRAINT FK__rooms__building___787EE5A0 FOREIGN KEY (building_id) REFERENCES buildings(id)
);
