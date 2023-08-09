import React from "react";
import { Card, Text, Metric, AreaChart } from "@tremor/react";
interface Device_uptime {
  id: number;
  device_id: number;
  uptime: number;
}

interface KPIProps {
  device_uptime: Device_uptime[];
}

const KPIComponent: React.FC<KPIProps> = ({ device_uptime }) => {
  const calculateAverageUptime = () => {
    if (device_uptime.length === 0) {
      return 0;
    }

    const totalUptime = device_uptime.reduce(
      (sum, item) => sum + item.uptime,
      0
    );
    return (totalUptime / device_uptime.length).toFixed(2);
  };
  const chartdata = [
    {
      date: "Jan 22",
      SemiAnalysis: 2890,
      "The Pragmatic Engineer": 2338,
    },
    {
      date: "Feb 22",
      SemiAnalysis: 2756,
      "The Pragmatic Engineer": 2103,
    },
    {
      date: "Mar 22",
      SemiAnalysis: 3322,
      "The Pragmatic Engineer": 2194,
    },
    {
      date: "Apr 22",
      SemiAnalysis: 3470,
      "The Pragmatic Engineer": 2108,
    },
    {
      date: "May 22",
      SemiAnalysis: 3475,
      "The Pragmatic Engineer": 1812,
    },
    {
      date: "Jun 22",
      SemiAnalysis: 3129,
      "The Pragmatic Engineer": 1726,
    },
  ];
  return (
    <div className="bg-gray-700 p-4 rounded mt-4">
      <Card>
        <Text>Average Uptime</Text>
        <Metric>{calculateAverageUptime()}</Metric>
        <AreaChart
          className="h-72 mt-4"
          data={device_uptime}
          index="uptime"
          categories={["device_id"]}
          colors={["green", "cyan"]}
        ></AreaChart>
      </Card>
    </div>
  );
};

export default KPIComponent;
