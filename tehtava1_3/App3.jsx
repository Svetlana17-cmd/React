const Header = (props) => {
	console.log(props);
	return (
		<div>
			<h1>{props.course}</h1>
		</div>
	);
}
const Parts=(props)=>{
	return (
		<>
			<div>{props.part1.name} {props.part1.exercises}</div>
			<div>{props.part2.name} {props.part2.exercises}</div>
			<div>{props.part3.name} {props.part3.exercises}</div>
		</>
	)
}

  const Total = (props) => {
	return (
		<div>
			<p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
		</div>
	)
  };
  const App = () => {
	const course = 'Half Stack application development';

	const exercises1 = 10;
	const exercises2 = 7;
	const exercises3 = 14;

	const part1 = {
		name: 'Fundamentals of React',
		exercises: 10
	}
	const part2 = {
		name: 'Using props to pass data',
		exercises: 7
	}
	const part3 = {
		name: 'State of a component',
		exercises: 14
	}


	return (
		<div>
			<Header course={course}/>
			<Parts
				part1={part1}
				part2={part2}
				part3={part3}
			/>
			<Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
		</div>
	)
  }

  export default App
