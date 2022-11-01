import React from 'react';
import { WiSunrise, WiSunset, WiThermometer } from 'react-icons/wi';
import { convertToCelcius, convertToTime } from '../utils';

interface TCurrentWeather {
	icon: string;
	desc: string;
	temp: number;
	sunrise: number;
	sunset: number;
	fetched: Boolean;
}

const CurrentWeather: React.FC<TCurrentWeather> = ({
	icon,
	desc,
	temp,
	sunrise,
	sunset,
	fetched,
}) => {
	return (
		<div>
			<div className="flex flex-col items-center">
				{fetched && (
					<>
						<img
							src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
							width={150}
							height={150}
							alt={desc}
							loading="lazy"
						/>
						<span className="text-2xl capitalize">{desc}</span>
					</>
				)}
			</div>
			<div className="flex justify-evenly mt-5">
				<div className="flex flex-col items-center gap-y-2">
					<WiThermometer size={50} />
					<span>{convertToCelcius(temp)}&deg;C</span>
				</div>
				<div className="flex flex-col items-center gap-y-2">
					<WiSunrise size={50} />
					<span>{convertToTime(sunrise)}</span>
				</div>
				<div className="flex flex-col items-center gap-y-2">
					<WiSunset size={50} />
					<span>{convertToTime(sunset)}</span>
				</div>
			</div>
		</div>
	);
};

export default CurrentWeather;
