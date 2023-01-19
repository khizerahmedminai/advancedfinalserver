const express = require('express');
const app = express();
const sql = require('mssql');

const cors = require('cors');

const sqlConfig = {
  user: 'sa',
  password: 'a.h.m.a.d.12',
  database: 'Uni',
  server: 'ONYX',
  options: {
    // instanceName: 'SQLEXPRESS',
    trustServerCertificate: true,
  },
};

app.use(cors());
app.use(express.json());
// const db = sql.connect(sqlConfig);

app.post('/delete', (req, res) => {
  const table = req.body.table;
  const number = req.body.number;
  const select = 'DELETE FROM ' + table + " WHERE id='" + number + "'";
  console.log(select)
  sql.connect(sqlConfig, function (err) {
    if (err) {
      console.log(err);
    }
    var db = new sql.Request();
    db.query(select, (err, result) => {
      if (err) {
        res.send(false);
      }
      res.send(true);
    });
  });
});


app.post('/create', (req, res) => {
  const dat = req.body.dat;
  const table = req.body.table;
  const columns = req.body.columns;
  let array = '';
  let columnList = '';
  let amount = '';
  for (let i = 0; i < columns.length; i++) {
    if (i == columns.length - 1) {
      columnList = columnList + columns[i];
      array = array + "'" + dat[columns[i]] + "'";
      amount = amount + '?';
    } else {
      columnList = columnList + columns[i] + ', ';
      array = array + "'" + dat[columns[i]] + "'" + ', ';
      amount = amount + '?,';
    }
  }

  let insert;
  if (dat['Number']) {
    insert =
      'SET IDENTITY_INSERT ' +
      table +
      ' ON INSERT INTO ' +
      table +
      '(' +
      columnList +
      ') VALUES (' +
      array +
      ') SET IDENTITY_INSERT ' +
      table +
      ' OFF';
  } else {
    insert = 'INSERT INTO ' + table + '(' + columnList + ') VALUES (' + array + ')';
  }
  sql.connect(sqlConfig, function (err) {
    if (err) {
      console.log(err);
    }
    var db = new sql.Request();

    db.query(insert, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.email;

  const authenticate =
    "SELECT * from dbo.users Where Email='" + email + " AND Password= '" + password + "'";
  sql.connect(sqlConfig, function (err) {
    if (err) {
      console.log(err);
    }
    var db = new sql.Request();

    db.query(authenticate, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });
});

app.post('/update', (req, res) => {
  const dat = req.body.dat;
  const table = req.body.table;
  const columns = req.body.columns;
  const num = req.body.num;
  let array = '';
  let columnList = '';
  let amount = '';
  let setlist = '';
  for (let i = 0; i < columns.length; i++) {
    if (i == columns.length - 1) {
      setlist = setlist + columns[i] + "= '" + dat[columns[i]] + "'";
    } else {
      setlist = setlist + columns[i] + "= '" + dat[columns[i]] + "', ";
    }
  }

  const insert = 'UPDATE ' + table + ' SET ' + setlist + " WHERE id= '" + num + "'";
  sql.connect(sqlConfig, function (err) {
    if (err) {
      console.log(err);
    }
    var db = new sql.Request();

    db.query(insert, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });
});

app.post('/iteminfo', (req, res) => {
  const table = req.body.table;
  const num = req.body.num;
  const select = 'select * from dbo.' + table + " WHERE id='" + num + "'";
  sql.connect(sqlConfig, function (err) {
    if (err) {
      console.log(err);
    }
    var db = new sql.Request();
    db.query(select, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    });
  });
});

app.post('/info', (req, res) => {
  const table = req.body.table;
  const select = "select * from INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='" + table + "'";
  sql.connect(sqlConfig, function (err) {
    if (err) {
      console.log(err);
    }
    var db = new sql.Request();
    db.query(select, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    });
  });
});

app.post('/list', (req, res) => {
  const table = req.body.table;
  const select = 'select * from dbo.' + table;
  sql.connect(sqlConfig, function (err) {
    if (err) {
      console.log(err);
    }
    var db = new sql.Request();
    db.query(select, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    });
  });
});

app.post('/search/tables', (req, res) => {
  const value = req.body.value;
  let tables = [];
  const select = 'SELECT * FROM INFORMATION_SCHEMA.TABLES';
  sql.connect(sqlConfig, function (err) {
    if (err) {
      console.log(err);
    }
    var db = new sql.Request();
    db.query(select, (err, result) => {
      if (err) {
        console.log(err);
      }
      for (let i = 0; i < result['recordset'].length; i++) {
        if (value) {
          const ser = value[0].toUpperCase() + value.slice(1);
          const serr = value[0].toLowerCase() + value.slice(1);
          if (
            result['recordset'][i].TABLE_NAME.substring(0, value.length) == ser ||
            result['recordset'][i].TABLE_NAME.substring(0, value.length) == serr
          ) {
            tables.push(result['recordset'][i].TABLE_NAME);
          }
        }
      }
      res.send(tables);
    });
  });
});

app.post('/search/entries', (req, res) => {
  const value = req.body.value;
  const table = req.body.table;
  let tables = [];
  const select = 'select * from ' + table;
  sql.connect(sqlConfig, function (err) {
    if (err) {
      console.log(err);
    }
    var db = new sql.Request();
    db.query(select, (err, result) => {
      if (err) {
        console.log(err);
      }
      for (let i = 0; i < result['recordset'].length; i++) {
        let Name = result['recordset'][i].FirstName + ' ' + result['recordset'][i].LastName;
        if (value) {
          const ser = value[0].toUpperCase() + value.slice(1);

          if (
            Name.substring(0, value.length) == ser ||
            Name.substring(0, value.length) == value
          ) {
            tables.push(result['recordset'][i]);
          }
        }
      }
      res.send(tables);
    });
  });
});

app.post('/alerts/get', (req, res) => {
  const select = 'Select * from dbo.alerts';
  sql.connect(sqlConfig, function (err) {
    if (err) {
      console.log(err);
    }
    var db = new sql.Request();
    db.query(select, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    });
  });
});

app.post('/alerts/check', (req, res) => {
  const select = 'UPDATE TABLE dbo.alerts SET Read = 1 WHERE Number=' + req.body.num;
  sql.connect(sqlConfig, function (err) {
    if (err) {
      console.log(err);
    }
    var db = new sql.Request();
    db.query(select, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    });
  });
});

app.get('/generate-time-table', async (req, res) => {
  try {

    const students = await getStudents();
    const courses = await getCourses();
    const rooms = await getRooms();
    const enrollments = await getEnrollments();
    // Generate the time-table
    const timeTable = timeTableGenerator(courses, students, rooms, enrollments);
    // Send the time-table as a JSON response
    res.json({ timeTable });
  } catch (err) {
    console.log(err)
    // Send an error response if something went wrong
    res.status(500).send(err.message);
  }
});

async function generateTimeTable() {
  // Retrieve all students, courses, and enrollments from the database
  const students = await getStudents();
  const courses = await getCourses();
  const enrollments = await getEnrollments();

  // Initialize the time-table
  const timeTable = {};
  for (let day of ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']) {
    timeTable[day] = {};
    for (let hour = 9; hour <= 15; hour++) {
      timeTable[day][hour] = [];
    }
  }

  // Iterate through each student and their enrolled courses
  for (let student of students) {
    for (let enrollment of enrollments) {
      if (enrollment.studentId === student.studentId) {
        // Find the course details for this enrollment
        const course = courses.find(c => c.CourseID === enrollment.CourseID);

        // Find the time slot for this course
        const timeSlot = await getTimeSlotForCourse(course.CourseID);
        // Mark the corresponding time slots in the time-table as occupied
        if(timeSlot.day_of_week && timeSlot.start_time){
          console.log(timeSlot.start_time)
          timeTable[timeSlot.day_of_week][timeSlot.start_time].push(course);
        }
      }
    }
  }

  return timeTable;
}

async function getStudents() {
  const select = 'Select * from dbo.students';
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query(select);
    return result.recordset;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getRooms() {
  const select = 'Select * from dbo.rooms';
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query(select);
    return result.recordset;
  } catch (err) {
    console.log(err);
    throw err;
  }
}


async function getCourses() {
  const select = 'Select * from dbo.courses';
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query(select);
    return result.recordset;
  } catch (err) {
    console.log(err);
    throw err;
  }
}


async function getEnrollments() {
  const select = 'Select * from dbo.enrollments';
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query(select);
    return result.recordset;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getTimeSlotForCourse(courseId) {
  const select = 'select * from dbo.timeslots where id= (Select time_slot_id from dbo.CourseTimeSlots WHERE course_id =' + courseId + ')';
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query(select);
    const timeSlot = result.recordset[0];
      timeSlot.start_time = new Date(timeSlot.start_time).getHours();
      return timeSlot;
    } catch (err) {
    console.log(err);
    return {}
  }
}




// get all courses, students and rooms from the database
// pass as array of objects to this function
// output variable at the end of the file
function timeTableGenerator (courses, students, rooms, enrollments) {
	function genInput(enrollments, courses, rooms) {
	const c = [];
	courses.forEach(course => {
		c.push({
			courseID: course.CourseCode, // check ID
			weeklyHours: course.CreditHours, // check credit hours
			students: [],
		});
	});

  enrollments.forEach(enrolment => {
    for (let i = 0; i < c.length; i++) {
        if (c[i].id === enrolment.courseID) {
            c[i].students.push(enrolment.studentID);
        }
    }
});

	const r = [];
	rooms.forEach(room => {
		r.push({
			roomID: room.id,
		});
	});
	return { c, r };
}
const inp = genInput(students, courses, rooms);
const COURSES = inp.c;
const ROOMS = inp.r;

const POPULATION_SIZE = 500;
const FITNESS_THRESHOLD = 500;
const MAX_ITERATIONS = 1000;
const FITTEST_SURVIVE_RATE = 0.8;

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];

class TimetableChromosome {
	constructor() {
		// Generate a random timetable.
		this.timetable = generateRandomTimetable();
		this.fitness = null;
	}
	

	calculateFitness() {
		// Calculate the fitness of the timetable by checking for conflicts and minimizing gaps.
		let fitness = 0;

		// Check for conflicts.
		for (let day = 0; day < DAYS.length; day++) {
			let dayTimetable = this.timetable[day];
			let usedRooms = new Set();
			for (let hour = 0; hour < HOURS.length; hour++) {
				let slot = dayTimetable[hour];
				if (slot != null) {
					// Check for room conflict.
					if (usedRooms.has(slot.roomID)) {
						fitness -= 1;
					} else {
						usedRooms.add(slot.roomID);
					}
				}
			}
		}

		
    for (let course of COURSES) {
      let count = 0;
      for (let day = 0; day < DAYS.length; day++) {
          let dayTimetable = this.timetable[day];
          for (let hour = 0; hour < HOURS.length; hour++) {
              let slot = dayTimetable[hour];
              if (slot != null && slot.courseID === course.courseID) {
                  count += 1;
              }
          }
      }
      if (count > 2) {
        fitness -= (count-2);
        }
      
  }
		this.fitness = fitness;
	}

	crossover(other) {
		// Reproduce with another timetable to create an offspring.
		let offspring = new TimetableChromosome();
		offspring.timetable = [];

		// Choose a random crossover point.
		let crossoverPoint = randomInt(DAYS.length);

		// Inherit the timetable before the crossover point from this timetable.
		for (let day = 0; day < crossoverPoint; day++) {
			offspring.timetable.push(this.timetable[day]);
		}

		// Inherit the timetable after the crossover point from the other timetable.
		for (let day = crossoverPoint; day < DAYS.length; day++) {
			offspring.timetable.push(other.timetable[day]);
		}

		return offspring;
	}

	mutate() {
		// Mutate the timetable by making a small random change.
		let day = randomInt(DAYS.length);
		let hour = randomInt(HOURS.length);
		let slot = this.timetable[day][hour];
		if (slot != null) {
			// Replace the slot with a different random slot.
			this.timetable[day][hour] = generateRandomSlot();
		} else {
			// Add a new random slot.
			this.timetable[day][hour] = generateRandomSlot();
		}
	}
}


function generateTimetable() {
	// Initialize the population with random timetable candidates.
	let population = [];
	for (let i = 0; i < POPULATION_SIZE; i++) {
		population.push(new TimetableChromosome());
	}

	// Evolve the population over the specified number of iterations.
	for (let i = 0; i < MAX_ITERATIONS; i++) {
		// Calculate the fitness of each timetable candidate.
		population.forEach(chromosome => {
			chromosome.calculateFitness();
		});

		// Sort the population by fitness.
		population.sort((a, b) => {
			return b.fitness - a.fitness;
		});

		console.log(`Generation ${i}: Fittest timetable has fitness ${population[0].fitness}`);

		// Check if the fittest timetable meets the fitness threshold.
		if (population[0].fitness >= FITNESS_THRESHOLD) {
			console.log('Satisfactory timetable found!');
			return population[0];
		}

		// Keep the fittest timetable candidates and reproduce the rest.
		let numFittest = Math.round(POPULATION_SIZE * FITTEST_SURVIVE_RATE);
		let newPopulation = population.slice(0, numFittest);
		while (newPopulation.length < POPULATION_SIZE) {
			let parent1 = population[randomInt(numFittest)];
			let parent2 = population[randomInt(numFittest)];
			let offspring = parent1.crossover(parent2);
			offspring.mutate();
			newPopulation.push(offspring);
		}
		population = newPopulation;
	}

	console.log('Maximum number of iterations reached');
	return population[0];
}

function generateRandomTimetable() {
	// Generate a random timetable.
	let timetable = [];
	for (let i = 0; i < DAYS.length; i++) {
		timetable.push(new Array(HOURS.length).fill(null));
	}
	for (let course of COURSES) {
		let day = randomInt(DAYS.length);
		let hour = randomInt(HOURS.length - course.weeklyHours / 2 + 1);
		let slot = {
			roomID: randomFromArray(ROOMS).roomID,
			courseID: course.courseID,
			startTime: hour + 9,
			duration: course.weeklyHours / 2,
		};
		for (let i = 0; i < course.weeklyHours / 2; i++) {
			timetable[day][hour + i] = slot;
		}
	}
	return timetable;
}

function randomInt(max) {
	return Math.floor(Math.random() * max);
}

function randomFromArray(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function generateRandomSlot() {
	// Generate a random slot.
	return {
		roomID: randomFromArray(ROOMS).roomID,
		courseID: randomFromArray(COURSES).courseID,
		startTime: randomInt(9, 17),
		duration: randomFromArray([2, 4, 6]) / 2,
	};
}


// function genOutput();

return generateTimetable();
}

// output variable will contain the generated timetable

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
