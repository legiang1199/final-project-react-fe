import StatsApi from "@/api/statsApi";
import { useEffect, useState } from "react";

export default function StatsAll() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    StatsApi.statsAll().then((response) => {
      setStats(response.data);
    });
  }, []); // Empty dependency array to fetch data once when the component mounts

  return (
    <div>
      <h1>Stats</h1>
      <table>
        <thead>
          <tr>
            <th>Stat</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(stats).map(([stat, value]) => (
            <tr key={stat}>
              <td>{stat}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
