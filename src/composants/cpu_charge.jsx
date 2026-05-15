import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function CpuLoadChart({ load }) {

  const data = [
    {
      name: "CPU",
      charge: load
    }
  ];

  return (

    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        border: "1px solid #e5e7eb",
        height: "300px"
      }}
    >

      <h2>Charge CPU</h2>

      <ResponsiveContainer width="100%" height="80%">

        <LineChart data={data}>

          <XAxis dataKey="name" />

          <YAxis
            domain={[0, 100]}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="charge"
            stroke="#2563eb"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );
}

export default CpuLoadChart;