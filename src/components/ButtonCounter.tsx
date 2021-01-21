import { h } from 'preact';
import { useState } from 'preact/hooks';

interface IButtonCounterProps {
	name: string;
	onClicked?: (e: number) => void;
}

export const ButtonCounter = ({ name, onClicked }: IButtonCounterProps) => {
	const [count, setCount] = useState(0);

	const handleClick = () => {
		setCount(count + 1);
		onClicked && onClicked(count);
	}

	return (
		<button onClick={() => handleClick()} class='btn btn-primary'>
			{name} - You clicked me {count} times
		</button>
	);
}
