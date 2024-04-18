
import { useState } from 'react'



const Statistics = (props) => {
	const total = props.good + props.neutral + props.bad
	const average = (props.good - props.bad) / total
	const positive = (props.good / total) * 100
	return (
		<div>
			<h2>Statistics</h2>
			<p>All: {total}</p>
			<p>Average: {average}</p>
			<p>Positive: {positive} %</p>
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
			<Statistics
				good ={good}
				neutral={neutral}
				bad={bad}
			/>

		</div>
	);

};
export default App
