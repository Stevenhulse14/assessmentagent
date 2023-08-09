// pages/agents.tsx

import React from "react";
import { PrismaClient } from "@prisma/client";
import KPIComponent from "@components/KPIComponent";

interface Agent {
  id: number;
  display_name: string;
}
interface Device {
  id: number;
  display_name: string;
  agent_id: number;
}

interface Device_uptime {
  id: number;
  device_id: number;
  uptime: number;
}

interface AgentListProps {
  agents: Agent[];
  device: Device[];
  device_uptime: Device_uptime[];
}

async function getAgents(): Promise<AgentListProps | undefined> {
  try {
    const prisma = new PrismaClient();
    const agents = await prisma.agent.findMany();
    const device = await prisma.device.findMany();
    const device_uptime = await prisma.device_uptime.findMany();
    //console.log(res2, res3);

    if (!agents.ok || !device.ok || !device_uptime) {
      console.error("Error fetching data");
    }
    return { agents, device, device_uptime };
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const response: AgentListProps | undefined = await getAgents();
  const { agents, device, device_uptime } = response || {};

  function getColorByUptime(uptime: number | undefined) {
    if (!uptime) {
      return "bg-gray-500";
    }
    if (uptime >= 95 && uptime <= 100) {
      return "bg-green-500";
    } else if (uptime >= 90 && uptime < 95) {
      return "bg-yellow-300";
    } else {
      return "bg-red-300";
    }
  }

  console.log(agents, device, device_uptime);
  return (
    <div className="flex flex-wrap">
      {agents && device && device_uptime ? (
        <>
          <div className="w-full md:w-1/2 p-4">
            <h1 className="text-2xl font-semibold">Agents</h1>
            <div className="flex flex-wrap">
              {agents.map((agent: Agent) => (
                <div key={agent.id} className="w-full md:w-1/2 p-2">
                  <div className="bg-gray-700 p-4 rounded">
                    <p className="font-semibold">{agent.display_name}</p>
                  </div>
                </div>
              ))}
            </div>
            <KPIComponent device_uptime={device_uptime} />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h1 className="text-2xl font-semibold">Devices</h1>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Device ID</th>
                  <th className="px-4 py-2">Agent Name</th>
                  <th className="px-4 py-2">Device Name</th>
                  <th className="px-4 py-2">Device Uptime</th>
                </tr>
              </thead>
              <tbody>
                {device.map((device: Device) => (
                  <tr key={device.id}>
                    <td className="border px-4 py-2">{device.id}</td>
                    <td className="border px-4 py-2">
                      {
                        agents.find(
                          (agent: Agent) => agent.id === device.agent_id
                        )?.display_name
                      }
                    </td>
                    <td className="border px-4 py-2">{device.display_name}</td>
                    <td
                      className={`border px-4 py-2 ${getColorByUptime(
                        device_uptime.find(
                          (uptime: Device_uptime) =>
                            uptime.device_id === device.id
                        )?.uptime
                      )}`}
                    >
                      {
                        device_uptime.find(
                          (uptime: Device_uptime) =>
                            uptime.device_id === device.id
                        )?.uptime
                      }
                      %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full p-4">
            <h1 className="text-2xl font-semibold">Device Uptime</h1>
            <div className="flex flex-wrap">
              {device_uptime.map((item) => (
                <div key={item.id} className="w-full md:w-1/2 p-2">
                  <div
                    className={`p-4 rounded ${getColorByUptime(item.uptime)}`}
                  >
                    <p className="font-semibold">Device ID: {item.device_id}</p>
                    <p>Uptime: {item.uptime}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
