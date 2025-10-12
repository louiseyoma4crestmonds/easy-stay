import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartOptions, ChartData } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function DashTrends() {
  const dataValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const data: ChartData<"bar", number[], string> = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Bookings",
        data: dataValues,
        backgroundColor: dataValues.map(
          (val) => (val > 0 ? "#3B82F6" : "#E5E7EB") // Blue if data, gray if none
        ),
        borderRadius: 8, // Rounded top corners
        borderSkipped: "bottom" as const,
        //  Only round top edges
        barPercentage: 1.2, //Thinner bars (0.1–1.0)
        categoryPercentage: 0.5, //  Adjust spacing between bars
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: {
          display: false, //  Remove vertical grid lines
        },
        ticks: {
          color: "#6B7280",
          font: { size: 12 },
          maxRotation: 0,
          minRotation: 0,
        },
        title: {
          display: true,
          text: "Month",
          color: "#6B7280",
          font: { size: 12, weight: "normal" },
        },
      },
      y: {
        grid: {
          color: "#F3F4F6",
          // @ts-expect-error Chart.js still supports drawBorder
          drawBorder: false,
        },
        min: 0,
        max: 100,
        ticks: {
          color: "#9CA3AF",
          stepSize: 20,
          //   callback: function (value) {
          //     return [0, 20, 40, 60, 80, 100].includes(value) ? value : null;
          //   },
        },
      },
    },
  };

  return (
    <div className="bg-white flex flex-col p-4 w-[33.33%] rounded-lg">
      <p className="text-gray-500 font-normal text-sm md:text-base text-left">
        Bookings Trends
      </p>

      <div className="w-full mt-4 h-52  flex mx-auto justify-center items-center">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default DashTrends;
