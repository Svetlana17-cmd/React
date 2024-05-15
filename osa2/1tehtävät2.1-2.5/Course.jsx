import React from 'react';

const Course = ({ course }) => {
	const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

	return (
		<div>
			<h1>{course.name}</h1>
			{course.parts.map((part) => (
				<p key={part.id}>
					{part.name}: {part.exercises} exercises
				</p>
			))}

			<p>Total number of exercises: {totalExercises}</p>
		</div>
	);
}

export default Course;
