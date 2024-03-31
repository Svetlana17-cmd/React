const Header = (props) => {
	console.log(props);
	return (
		<div>
			<h1>{props.course}</h1>
		</div>
	);
}
const parts = [
	{
		id: 'part1',
		name: 'Fundamentals of React',
		exercises: 10
	},
	{
		id: 'part2',
		name: 'Using props to pass data',
		exercises: 7
	},
	{
		id: 'part3',
		name: 'State of a component',
		exercises: 14
	},
]
const Total = (props) => {
	return (
		<div>
			<p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
		</div>
	)
  };


const Parts=(props)=>{
	console.log(props);
	return (
		<>
			<ul>
				{props.parts.map(el => (
					<li key={el.id}>
						{el.name}
						{el.exercises}
					</li>))}
			</ul>
		</>
	)
}

  const App = () => {
	const course = 'Half Stack application development';
	const exercises1 = 10;
	const exercises2 = 7;
	const exercises3 = 14;

	return (
		<div>
			<Header course={course}/>
			<Parts	parts={parts}/>
			<Total  exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
		</div>
	)
};

export default App
