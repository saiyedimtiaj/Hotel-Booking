import { data } from "autoprefixer";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const parseData = (data) => {
  const currentDate = new Date();
  const sixMonthAgo = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 5,
    1
  );

  const filterDate = data.filter(
    (item) => new Date(item?.bookingDate >= sixMonthAgo)
  );

  const monthlyData = {};
  filterDate.forEach((item) => {
    const month = new Date(item?.bookingDate).toLocaleString("default", {
      month: "long",
    });

    // if(monthlyData[month]){
    //     monthlyData[month].totalPrice += item.totalPrice ;
    // }
    // else{
    monthlyData[month] = {
      month,
      totalPrice: item?.totalPrice,
    };
    // }
  });
  return Object.values(monthlyData);
};

const Chart = ({ analytics }) => {
  const chartData = parseData(analytics);
  return (
    <div className="w-full">
    <h2 className="text-2xl font-bold mb-4">Monthly Booking Revenue</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tick={{ transform: "translate(-10, 0)" }} />
        <Tooltip />
        <Bar dataKey="totalPrice" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  </div>
  );
};

export default Chart;
