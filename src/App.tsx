import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { weatherAPI } from "./api/weather";
import { convertHPAtoMM, convertToTime } from "./utils";
import { WiHumidity, WiWindDeg } from "react-icons/wi";
import Forecast from "./components/Forecast";
import { LiaWeightHangingSolid } from "react-icons/lia";
import { VscLoading } from "react-icons/vsc";
import { WiSunrise, WiSunset } from "react-icons/wi";
import { useQuery } from "@tanstack/react-query";

ChartJS.register(ArcElement, Tooltip, Legend);

type TForecast = {
  dt: number;
  main: {
    temp: string;
  };
  weather: [
    {
      description: string;
      icon: string;
      main: string;
    }
  ];
};

const App: React.FC = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const { isLoading, data: currentWeather } = useQuery({
    queryKey: ["weather"],
    queryFn: weatherAPI?.getCurrentWeather,
  });

  const { data: hourlyWeather } = useQuery({
    queryKey: ["hourlyWeather"],
    queryFn: weatherAPI.getHourlyWeather,
  });

  const labels =
    hourlyWeather &&
    hourlyWeather?.list
      ?.slice(0, 8)
      .map((hourly: TForecast) => convertToTime(hourly?.dt));
  const dataChart = {
    labels: labels,
    datasets: [
      {
        label: "Temp",
        data: hourlyWeather?.list
          ?.slice(0, 8)
          .map((hourly: TForecast) => hourly?.main?.temp),
        borderColor: "rgba(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.5)",
      },
    ],
  };

  return (
    <>
      <header className="w-full py-4 px-4">
        <div className="xl:max-w-[1200px] mx-auto container">
          <div className="flex items-center gap-4">
            <svg
              id="logo-15"
              width="49"
              height="48"
              viewBox="0 0 49 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z"
                className="ccustom"
                fill="#17CF97"
              ></path>{" "}
              <path
                d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z"
                className="ccustom"
                fill="#17CF97"
              ></path>{" "}
              <path
                d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z"
                className="ccustom"
                fill="#17CF97"
              ></path>{" "}
              <path
                d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z"
                className="ccustom"
                fill="#17CF97"
              ></path>{" "}
            </svg>
            <span className="font-title text-lg font-bold">Weather.Cebu</span>
          </div>
        </div>
      </header>
      <main className="w-full py-8 md:py-16 px-4 h-full">
        <section className="xl:max-w-[1200px] mx-auto container pb-5">
          <h1 className="text-6xl font-title font-bold">Cebu</h1>
          <span className="block mt-2 font-plain text-sm">
            Region VII, Visayas, Philippines
          </span>
        </section>
        <section className="xl:max-w-[1200px] mx-auto container pt-5 grid grid-cols-1 grid-rows-auto xl:grid-cols-2 xl:grid-rows-1 gap-2 xl:h-[400px]">
          <div className="grid grid-cols-1 md:grid-cols-6 xl:grid-rows-5 xl:grid-cols-3 gap-2">
            <div className="col-span-full md:col-span-3 xl:col-span-2 xl:row-span-3 shadow-lg shadow-green-200/25 rounded-3xl p-5 border border-slate-300 flex flex-col justify-center">
              <span>Now</span>
              <div className="my-1">
                {isLoading && <VscLoading size={35} className="animate-spin" />}
                {currentWeather && (
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="font-title font-medium text-5xl">
                        {Math.floor(currentWeather.main.temp)}°
                      </h2>
                      <img
                        src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                        width={90}
                        height={90}
                        alt={currentWeather.weather[0].description}
                        className="motion-reduce:animate-bounce drop-shadow-md"
                      />
                    </div>

                    <span className="font-plain font-medium text-black">
                      {currentWeather && currentWeather.weather[0].main}
                    </span>
                    <span className="block capitalize text-sm font-plain font-medium text-gray-500">
                      Feels like{" "}
                      <span className="text-black">
                        {currentWeather &&
                          Math.floor(currentWeather.main.feels_like)}
                        °
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-full md:col-span-3 xl:col-span-1 xl:row-span-3 shadow-lg shadow-green-200/25 rounded-3xl p-5 border border-slate-300 overflow-hidden h-[250px] xl:h-full">
              <div className="w-full h-full bg-no-repeat bg-cover bg-center bg-[url('/public/cebu_map.png')] scale-[7]" />
            </div>
            <div className="col-span-full md:col-span-2 xl:col-span-1 xl:row-span-2 shadow-lg shadow-green-200/25 rounded-3xl p-5 border border-slate-300 flex flex-col justify-between">
              <span>Wind</span>
              <div className="my-1">
                {isLoading && <VscLoading size={40} className="animate-spin" />}
                {currentWeather && (
                  <div className="flex items-center gap-2">
                    <div
                      className={`rotate-[${Math.round(
                        currentWeather.wind.deg
                      )}deg]`}
                    >
                      <WiWindDeg className="text-green-500" size={36} />
                    </div>
                    <span className="font-title text-xl font-medium">
                      {currentWeather.wind.speed} m/s
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-full md:col-span-2 xl:col-span-1 xl:row-span-2 shadow-lg shadow-green-200/25 rounded-3xl p-5 border border-slate-300 flex flex-col justify-between">
              <span>Humidity</span>
              <div className="my-1">
                {isLoading && <VscLoading size={40} className="animate-spin" />}
                {currentWeather && (
                  <div className="flex items-center gap-2">
                    <WiHumidity className="text-green-500" size={36} />
                    <span className="font-title text-xl font-medium">
                      {currentWeather.main.humidity} m/s
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-full md:col-span-2 xl:col-span-1 xl:row-span-2 shadow-lg shadow-green-200/25 rounded-3xl p-5 border border-slate-300 flex flex-col justify-between">
              <span>Pressure Hg</span>
              <div className="my-1">
                {isLoading && <VscLoading size={40} className="animate-spin" />}
                {currentWeather && (
                  <div className="flex items-center gap-2">
                    <LiaWeightHangingSolid
                      className="text-green-500"
                      size={36}
                    />
                    <span className="font-title text-xl font-medium">
                      {convertHPAtoMM(currentWeather.main.pressure)} mm
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-rows-5 xl:grid-cols-2 gap-2">
            <div className="col-span-full md:col-span-1 xl:col-span-1 xl:row-span-2 shadow-lg shadow-green-200/25 rounded-3xl p-3 border border-slate-300 flex items-center justify-center">
              <Line options={options} data={dataChart} redraw={true} />
            </div>
            <div className="col-span-full md:col-span-1 xl:col-span-1 xl:row-span-2 shadow-lg shadow-green-200/25 rounded-3xl p-5 border border-slate-300 flex items-center">
              <div className="flex items-center justify-around w-full">
                <div className="flex flex-col items-center">
                  <span className="mt-2 text-xs font-semibold capitalize">
                    sunrise
                  </span>
                  <WiSunrise className="text-yellow-400" size={48} />
                  <span className="text-sm font-semibold">
                    {isLoading && (
                      <VscLoading size={35} className="animate-spin" />
                    )}
                    {currentWeather &&
                      convertToTime(currentWeather.sys.sunrise)}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="mt-2 text-xs font-semibold capitalize">
                    sunset
                  </span>
                  <WiSunset className="text-yellow-400" size={48} />
                  <span className="text-sm font-semibold">
                    {isLoading && (
                      <VscLoading size={35} className="animate-spin" />
                    )}
                    {currentWeather && convertToTime(currentWeather.sys.sunset)}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-full shadow-lg xl:row-span-2 shadow-green-200/25 rounded-3xl p-5 border border-slate-300 overflow-hidden flex items-center justify-evenly flex-nowrap relative">
              {hourlyWeather &&
                hourlyWeather.list.slice(0, 6).map((hourly: TForecast) => (
                  <div key={hourly.dt} className="flex flex-col items-center">
                    <Forecast
                      icon={hourly.weather[0].icon}
                      desc={hourly.weather[0].description}
                      dt={hourly.dt}
                    />
                  </div>
                ))}
            </div>
            <div className="flex items-center justify-center col-span-full xl:row-span-1 shadow-lg shadow-green-200/25 rounded-3xl p-5 border border-slate-300 bg-green-500/90 text-white">
              © All Rights Reserved.&nbsp;
              <a
                href="https://jun-edris.github.io/portfolio/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Junaire Edris Buico
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default App;

// <div className="h-full lg:h-screen text-white">
//   <div className="container mx-auto px-4 pb-10">
//     <header className="py-8 border-b border-gray-300 flex flex-col lg:flex-row justify-between items-center gap-y-4 lg:gap-y-0">
//       <span className="bg-white text-md px-2 py-2 inline-block w-[125px] font-bold text-black rounded-lg">
//         Weather.Cebu
//       </span>
//       <div>
//         <ul className="flex  gap-x-3 xl:gap-x-5 flex-wrap gap-y-2 justify-center lg:justify-end lg:gap-y-0">
//           {cityName.map((city, index) => (
//             <li key={index}>
//               <button
//                 type="button"
//                 onClick={(e) => getCurrentWeather(`${city.cityName}`)}
//                 disabled={fetching ? true : false}
//                 className="text-white hover:bg-violet-600 hover:text-white p-3 transition ease-in-out rounded-lg"
//               >
//                 {city?.cityName}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </header>

//     {currentWeather ? (
//       <main className="mt-5 py-10 rounded-xl bg-black/50">
//         <div className="px-4 lg:px-20 pb-10">
//           {currentWeather && !fetching && (
//             <h1 className="text-5xl font-bold">
//               {currentWeather?.name}'s Forecast
//             </h1>
//           )}
//         </div>
//         {/* <hr /> */}
//         <div className="px-4 lg:px-20 mt-5 flex flex-col justify-between lg:flex-row gap-y-5 lg:gap-y-0 lg:gap-x-5">
//           <div className="lg:basis-2/6 px-1 py-8 bg-white/10 text-white rounded-lg">
//             {/* <span className=" font-semibold">Current</span> */}

//             <Suspense
//               fallback={
//                 <div className="flex flex-col items-center">
//                   <AiOutlineLoading3Quarters
//                     size={40}
//                     className="animate-spin"
//                   />
//                 </div>
//               }
//             >
//               <CurrentWeather
//                 icon={currentWeather?.weather.icon}
//                 desc={currentWeather?.weather.description}
//                 temp={convertToCelcius(currentWeather?.temp)}
//                 sunrise={currentWeather?.sunrise}
//                 sunset={currentWeather?.sunset}
//                 fetched={currentWeather ? true : false}
//               />
//             </Suspense>
//           </div>
//           <div className="lg:basis-4/6 flex flex-col justify-between">
//             <div className="py-5">
//               <Suspense
//                 fallback={
//                   <div className="flex flex-col items-center">
//                     <AiOutlineLoading3Quarters
//                       size={40}
//                       className="animate-spin"
//                     />
//                   </div>
//                 }
//               >
//                 <CurrentData
//                   fetching={fetching}
//                   speed={currentWeather?.wind.speed}
//                   deg={currentWeather?.wind.deg}
//                   humidity={currentWeather?.humidity}
//                 />
//               </Suspense>
//             </div>
//             <div className="relative overflow-hidden pt-10 w-full h-full">
//               <h3 className="text-xl font-bold">3 Hour Forecast</h3>
//               <div className="relative overflow-x-scroll overflow-y-hidden min-h-[290px] w-full">
//                 <div className="flex gap-x-5 mt-5 flex-nowrap absolute">
//                   <Suspense
//                     fallback={
//                       <div className="flex justify-items-stretch items-stretch gap-x-5">
//                         <div className="bg-white/10 animate-pulse rounded-lg py-12 h-full flex flex-1 flex-col justify-between items-center w-[160px]"></div>
//                         <div className="bg-white/10 animate-pulse rounded-lg py-12 h-full flex flex-1 flex-col justify-between items-center w-[160px]"></div>
//                       </div>
//                     }
//                   >
//                     {forecast.map((cast, index) => (
//                       <div
//                         key={index}
//                         className="bg-white/10 rounded-lg p-5 flex flex-1 flex-col justify-between items-center w-[160px]"
//                       >
//                         <Forecast
//                           icon={cast?.weather[0].icon}
//                           key={index}
//                           desc={cast?.weather[0].description}
//                           dt={cast?.dt}
//                         />
//                       </div>
//                     ))}
//                   </Suspense>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* <div className=" p-20">sheeesh</div> */}
//       </main>
//     ) : fetching ? (
//       <div className="flex flex-col items-center mt-10">
//         <AiOutlineLoading3Quarters size={25} className="animate-spin" />
//       </div>
//     ) : (
//       <div className="h-full">
//         <p className="text-center mt-8">
//           Choose from the city names above to show the city weather.
//         </p>
//       </div>
//     )}
//   </div>
// </div>
