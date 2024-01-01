import { convertToTime } from "../utils";

interface IForecast {
  icon: string;
  desc: string;
  dt: number;
}

const Forecast: React.FC<IForecast> = ({ icon, desc, dt }) => {
  return (
    <>
      {/* <span className="capitalize">{desc}</span> */}
      <div className="">
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          width={75}
          height={75}
          alt={desc}
          className="drop-shadow-md"
        />
      </div>

      {/* <span className="capitalize">{convertToDate(dt)}</span> */}
      <span className="capitalize mt-2 text-sm">{convertToTime(dt)}</span>
    </>
  );
};

export default Forecast;
