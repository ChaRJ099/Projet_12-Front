import "./useractivity.scss";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";

/**
 * @param  {Array} {dataActivity}
 * @returns {JSX.Element} Activity component
 */
function UserActivity({ dataActivity }) {
  // const activityChartWidth = window.innerWidth - 400;

  const dayFormat = (value) => {
    const valueDay = value.split("-");
    return Number(valueDay[2]);
  };

  /**
   * @param  {Array} {payload
   * @param  {boolean} active}
   * @returns Customized Tooltip
   */
  function CustomTooltipActivity({ payload, active }) {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-data">{`${payload[0].value}`}kg</p>
          <p className="tooltip-data">{`${payload[1].value}`}Kcal</p>
        </div>
      );
    }
    return null;
  }

  return (
    <ResponsiveContainer width="100%">
      <div className="user-activity-container">
        <h2 className="user-activity-title">Activité quotidienne</h2>

        <BarChart
          className="user-activity-barchart"
          width={634}
          height={270}
          data={dataActivity}
          barSize={7}
          barGap={8}
          margin={{ top: 80, right: 30, left: 30, bottom: 10 }}
        >
          <CartesianGrid
            vertical="false"
            strokeDasharray="3"
            height={1}
            horizontalPoints={[90, 185]}
          />
          <XAxis
            dataKey="day"
            tickFormatter={dayFormat}
            interval="preserveStartEnd"
            tickSize="0"
            tickMargin="25"
            stroke="#9B9EAC"
          />
          <YAxis
            dataKey="calories"
            tickLine={false}
            orientation="right"
            tickCount="3"
            tickSize="0"
            axisLine={false}
            tickMargin="50"
            width={80}
            stroke="#9B9EAC"
          />
          <Tooltip content={<CustomTooltipActivity />} />
          <Legend
            className="user-activity-legend"
            verticalAlign="top"
            align="right"
            width={270}
            iconType={"circle"}
            iconSize={8}
            wrapperStyle={{ top: 0, right: 30 }}
            formatter={(value) => (
              <span className="activityLegendColor">{value}</span>
            )}
          />
          <Bar
            dataKey="kilogram"
            name="Poids (kg)"
            fill="#282D30"
            radius={[25, 25, 0, 0]}
            barSize={7}
          />
          <Bar
            dataKey="calories"
            name="Calories brûlées (kCal)"
            fill="#E60000"
            radius={[25, 25, 0, 0]}
            barSize={7}
          />
        </BarChart>
      </div>
    </ResponsiveContainer>
  );
}

UserActivity.propTypes = {
  dataActivity: PropTypes.arrayOf(
    PropTypes.shape({
      calories: PropTypes.number,
      day: PropTypes.string,
      kilogram: PropTypes.number,
    })
  ),
};

export default UserActivity;
