import React from 'react';
import { convertToDate, convertToTime } from '../utils';

interface IForecast {
	icon: string;
	desc: string;
	dt: number;
}

const Forecast: React.FC<IForecast> = ({ icon, desc, dt }) => {
	return (
		<>
			<span className="capitalize">{desc}</span>
			<img
				src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
				width={90}
				height={90}
				alt={desc}
				loading="lazy"
			/>
			<span className="capitalize">{convertToDate(dt)}</span>
			<span className="capitalize">{convertToTime(dt)}</span>
		</>
	);
};

export default Forecast;
