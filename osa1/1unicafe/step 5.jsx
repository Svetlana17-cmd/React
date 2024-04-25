
import { useState } from 'react'

const StatisticLine = ({ text, value}) => {
	return (
		<p>{text} {value}</p>
	);
};


const Statistics = (props) => {
	const total = props.good + props.neutral + props.bad;
	const average = (props.good - props.bad) / total
	const positive = (props.good / total) * 100
	if (total === 0) {
		return <p>No feedback given</p>
	}

	return (
		<div>
			<StatisticLine	/>
			<StatisticLine text="Good" value={props.good} />
			<StatisticLine text="Neutral" value={props.neutral} />
			<StatisticLine text="Bad" value={props.bad} />
			<StatisticLine text="All" value={total} />
			<StatisticLine text="Average" value={average} />
			<StatisticLine text="Positive" value={positive} />
		</div>
	);
};


const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)



	const handleGoodClick = () => {
		const newGood = good + 1
		setGood(newGood);
	}
	const handleNeutralClick = () => {
		const newNeutral = neutral + 1
		setNeutral(newNeutral);
	}
	const handleBadClick = () => {
		const newBad = bad + 1
		setBad(newBad);
	}


	return (
		<div>
			<h1>Unicafe - Asikaspalaute</h1>
			<button onClick={handleGoodClick}>Good</button>
			<button onClick={handleNeutralClick}>Neutral</button>
			<button onClick={handleBadClick}>Bad</button>
			<h2>Statistics</h2>
			<Statistics
				good ={good}
				neutral={neutral}
				bad={bad}
			/>

		</div>
	);

};
export default App
