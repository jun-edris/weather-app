import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { WiHumidity, WiStrongWind, WiWindDeg } from 'react-icons/wi';

interface ICurrentData {
	fetching: Boolean;
	speed: number;
	deg: number;
	humidity: number;
}

const CurrentData: React.FC<ICurrentData> = ({
	fetching,
	speed,
	deg,
	humidity,
}) => {
	return (
		<div className="flex justify-evenly">
			<div className="flex flex-col items-center gap-y-2">
				<WiStrongWind size={50} />
				{!fetching ? (
					<span>{speed} m/s</span>
				) : (
					<AiOutlineLoading3Quarters size={25} className="animate-spin" />
				)}
			</div>
			<div className="flex flex-col items-center gap-y-2">
				<WiWindDeg size={50} />
				{!fetching ? (
					<span>{deg}&deg;</span>
				) : (
					<AiOutlineLoading3Quarters size={25} className="animate-spin" />
				)}
			</div>
			<div className="flex flex-col items-center gap-y-2">
				<WiHumidity size={50} />
				{!fetching ? (
					<span>{humidity}</span>
				) : (
					<AiOutlineLoading3Quarters size={25} className="animate-spin" />
				)}
			</div>
		</div>
	);
};

export default CurrentData;
