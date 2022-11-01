import { useMemo, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import CurrentWeather from './components/CurrentWeather';
import { convertToCelcius, convertToDate, convertToTime } from './utils';
import CurrentData from './components/CurrentData';

type TCurrentWeather = {
	name: string;
	clouds: number;
	humidity: number;
	pressure: number;
	coord: {
		lon: number;
		lat: number;
	};
	temp: number;
	temp_max: number;
	temp_min: number;
	sunrise: number;
	sunset: number;
	weather: {
		description: string;
		icon: string;
		main: string;
	};
	wind: {
		deg: number;
		speed: number;
	};
};

type TForecast = {
	dt: number;
	weather: [
		{
			description: string;
			icon: string;
			main: string;
		}
	];
};

type TCityName = {
	cityName: string;
};

const App: React.FC = () => {
	const [fetching, setFetching] = useState<Boolean>(false);
	const [currentWeather, setCurrentWeather] = useState<TCurrentWeather>();
	const [forecast, setForecast] = useState<TForecast[]>([]);
	const api_key: string | undefined = process.env.REACT_APP_KEY;

	const cityName: TCityName[] = [
		{ cityName: 'Cebu' },
		{ cityName: 'Bogo' },
		{ cityName: 'Carcar' },
		{ cityName: 'Danao' },
		{ cityName: 'Lapu-lapu' },
		{ cityName: 'Mandaue' },
		{ cityName: 'Naga' },
		{ cityName: 'Talisay' },
		{ cityName: 'Toledo' },
	];

	const getCurrentWeather = useMemo(
		() => async (cityName: string) => {
			await fetch(
				`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${api_key}`,
				{ method: 'GET' }
			)
				.then((response) => response.json())
				.then(async (data) => {
					setFetching(true);
					return await fetch(
						`https://api.openweathermap.org/data/2.5/weather?lat=${data[0]?.lat}&lon=${data[0]?.lon}&appid=${api_key}`,
						{ method: 'GET' }
					);
				})
				.then((response) => response.json())
				.then(async (data2) => {
					const fetchedData = {
						name: data2.name === 'Calero' ? 'Cebu' : data2.name,
						clouds: data2.clouds.all,
						humidity: data2.main.humidity,
						pressure: data2.main.pressure,
						coord: {
							lon: data2.coord.lon,
							lat: data2.coord.lat,
						},
						temp: data2.main.temp,
						temp_max: data2.main.temp_max,
						temp_min: data2.main.temp_min,
						sunrise: data2.sys.sunrise,
						sunset: data2.sys.sunset,
						weather: {
							description: data2.weather[0].description,
							icon: data2.weather[0].icon,
							main: data2.weather[0].main,
						},
						wind: {
							deg: data2.wind.deg,
							speed: data2.wind.speed,
						},
					};

					setCurrentWeather(fetchedData);
					return await fetch(
						`https://api.openweathermap.org/data/2.5/forecast?lat=${data2.coord.lat}&lon=${data2.coord.lon}&appid=${api_key}`,
						{ method: 'GET' }
					);
				})
				.then((response) => response.json())
				.then((data3) => {
					setForecast(data3.list.slice(0, 10));
					setFetching(false);
				})
				.catch((err) => console.error(err));
		},
		[api_key]
	);

	return (
		<div className="h-full lg:h-screen text-white">
			<div className="container mx-auto px-4 pb-10">
				<header className="py-8 border-b border-gray-300 flex flex-col lg:flex-row justify-between items-center flex-wrap gap-y-4 lg:gap-y-0">
					<span className="bg-white text-md px-2 py-2 inline-block w-[125px] font-bold text-black rounded-lg">
						Cebu Province Weather App
					</span>
					<div>
						<ul className="flex gap-x-5 flex-wrap gap-y-2 lg:gap-y-0">
							{cityName.map((city, index) => (
								<li key={index}>
									<button
										type="button"
										onClick={(e) => getCurrentWeather(`${city.cityName}`)}
										disabled={fetching ? true : false}
										className="text-white hover:bg-violet-600 hover:text-white p-3 transition ease-in-out rounded-lg"
									>
										{city?.cityName}
									</button>
								</li>
							))}
						</ul>
					</div>
				</header>

				{currentWeather ? (
					<main className="mt-5 py-10 rounded-xl bg-black/50">
						<div className="px-4 lg:px-20 pb-10">
							{currentWeather && !fetching && (
								<h1 className="text-5xl font-bold">
									{currentWeather?.name}'s Forecast
								</h1>
							)}
						</div>
						{/* <hr /> */}
						<div className="px-4 lg:px-20 mt-5 flex flex-col justify-between lg:flex-row gap-y-5 lg:gap-y-0 lg:gap-x-5">
							<div className="lg:basis-2/6 px-1 py-8 bg-white/10 text-white rounded-lg">
								{/* <span className=" font-semibold">Current</span> */}
								{!fetching ? (
									<>
										<CurrentWeather
											icon={currentWeather?.weather.icon}
											desc={currentWeather?.weather.description}
											temp={convertToCelcius(currentWeather?.temp)}
											sunrise={currentWeather?.sunrise}
											sunset={currentWeather?.sunset}
											fetched={currentWeather ? true : false}
										/>
									</>
								) : (
									<div className="flex flex-col items-center">
										<AiOutlineLoading3Quarters
											size={40}
											className="animate-spin"
										/>
									</div>
								)}
							</div>
							<div className="lg:basis-4/6 flex flex-col justify-between">
								<div className="py-5">
									<CurrentData
										fetching={fetching}
										speed={currentWeather?.wind.speed}
										deg={currentWeather?.wind.deg}
										humidity={currentWeather?.humidity}
									/>
								</div>
								<div className="relative overflow-hidden pt-10 w-full h-full">
									<h3 className="text-xl font-bold">5 Day Forecast</h3>
									<div className="relative overflow-x-scroll overflow-y-hidden min-h-[290px] w-full">
										<div className="flex gap-x-5 mt-5 flex-nowrap absolute">
											{!fetching ? (
												<>
													{forecast.map((cast, index) => (
														<div
															key={index}
															className="bg-white/10 rounded-lg p-5 flex flex-1 flex-col justify-between items-center w-[160px]"
														>
															<span className="capitalize">
																{cast?.weather[0].description}
															</span>
															<img
																src={`http://openweathermap.org/img/wn/${cast?.weather[0].icon}@2x.png`}
																width={90}
																height={90}
																alt={cast?.weather[0].description}
															/>
															<span className="capitalize">
																{convertToDate(cast?.dt)}
															</span>
															<span className="capitalize">
																{convertToTime(cast?.dt)}
															</span>
														</div>
													))}
												</>
											) : (
												<div className="flex justify-items-stretch items-stretch gap-x-5">
													<div className="bg-white/10 animate-pulse rounded-lg py-12 h-full flex flex-1 flex-col justify-between items-center w-[160px]"></div>
													<div className="bg-white/10 animate-pulse rounded-lg py-12 h-full flex flex-1 flex-col justify-between items-center w-[160px]"></div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* <div className=" p-20">sheeesh</div> */}
					</main>
				) : fetching ? (
					<div className="flex flex-col items-center mt-10">
						<AiOutlineLoading3Quarters size={25} className="animate-spin" />
					</div>
				) : (
					<div className="h-full">
						<p className="text-center mt-8">
							Choose from the city names above to show the city weather.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default App;
