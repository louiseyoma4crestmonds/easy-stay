import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "react-circular-progressbar/dist/styles.css";

// ✅ Register chart components ONCE globally
ChartJS.register(ArcElement, Tooltip, Legend);

function DashProgressBar() {
  const percentage11 = (0 / 100) * 100;
  const percentage12 = (0 / 100) * 100;
  const percentage13 = (0 / 100) * 100;
  const percentage14 = (0 / 100) * 100;

  const total = 0;

  const allZero =
    percentage11 === 0 &&
    percentage12 === 0 &&
    percentage13 === 0 &&
    percentage14 === 0;

  const colors = ["#0E9F6E", "#3F83F8", "#E5E7EB", "#E02424"];

  const data = {
    labels: [
      `Active - ${percentage11}%`,
      `Upcoming - ${percentage12}%`,
      `Past - ${percentage13}%`,
      `Cancelled - ${percentage14}%`,
    ],
    datasets: [
      {
        data: allZero
          ? [1] // single segment to render
          : [percentage11, percentage12, percentage13, percentage14],
        backgroundColor: allZero ? ["#E5E7EB"] : colors,
        // data: [percentage11, percentage12, percentage13, percentage14],
        // backgroundColor: ["#0E9F6E", "#3F83F8", "#E5E7EB", "#E02424"],
        borderWidth: 0,
        borderRadius: 0,
        offset: 0,
      },
    ],
  };

  const options = {
    cutout: "80%",
    events: [], // disables hover events
    plugins: {
      legend: {
        display: false, // disable default legend
      },
      //   legend: {
      //     position: "bottom" as const,
      //     labels: {
      //       color: "#6B7280", // dark gray text color
      //       usePointStyle: true,
      //       pointStyle: "circle",
      //       boxWidth: 10,
      //       boxHeight: 8,
      //       font: {
      //         size: 12,
      //         family: "Inter, sans-serif",
      //       },
      //     },
      //   },
    },
  };

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw(chart: any) {
      const { ctx, width, height } = chart;
      ctx.save();

      // MAIN NUMBER (e.g. 501)
      ctx.font = "bold 18px Inter, sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#111827"; // dark text
      const text = total.toString();
      const textX = (width - ctx.measureText(text).width) / 2;
      const textY = height / 2;
      ctx.fillText(text, textX, textY - 5);

      // SUBTEXT (e.g. Total Bookings)
      ctx.font = "9px Inter, sans-serif"; // smaller, fixed size
      ctx.fillStyle = "#6B7280"; // gray text
      const subText = "Total Bookings";
      const subTextX = (width - ctx.measureText(subText).width) / 2;
      ctx.fillText(subText, subTextX, textY + 15);

      ctx.restore();
    },
  };

  //   useEffect(() => {
  //     ChartJS.register(centerTextPlugin);
  //   }, []);

  return (
    <div className="bg-white flex flex-col  p-4 w-[33.33%] rounded-lg">
      <p className="text-gray-500 font-normal text-sm md:text-base text-left">
        Bookings Status Breakdown
      </p>
      <div className="w-full mt-4 flex mx-auto justify-center items-center">
        <div className="w-32 h-32  flex justify-center items-center">
          <Doughnut
            data={data}
            options={options}
            plugins={[centerTextPlugin]}
          />
        </div>
      </div>

      {/* ✅ Custom Legend (2 per row) */}
      <div className="mt-4 flex flex-wrap justify-center items-center mx-auto w-[80%] gap-x-4 gap-y-2">
        {data.labels.map((label, i) => (
          <div key={i} className="flex items-center ">
            <span
              className="inline-block w-2 h-2 rounded-full mr-1"
              style={{ backgroundColor: colors[i] }}
            ></span>
            <span className="text-xs text-gray-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashProgressBar;
