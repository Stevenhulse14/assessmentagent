const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
interface Agent {
  id: number;
  display_name: string;
}
interface Device {
  id: number;
  agent_id: string;
  display_name: string;
}
interface Uptime {
  id: number;
  device_id: number;
  uptime: number;
}

const url = "https://interview-app-ppi.vercel.app/api/agent";
async function seed() {
  try {
    const uptimeId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const getUptime = uptimeId.flatMap(async (id) => {
      const response = await fetch(`${url}/1/device/${id}/uptime`);
      return response.json();
    });

    const agentsId = [1, 2, 3];
    const getDevices = agentsId.flatMap(async (id) => {
      const response = await fetch(`${url}/${id}`);
      return response.json();
    });

    const uptimes: Uptime[] = (await Promise.all(getUptime)).flatMap(
      (item) => item
    );
    const devices: Device[] = (await Promise.all(getDevices)).flatMap(
      (item) => item
    );

    const data = await fetch(url);
    const agents: Agent[] = await data.json();
    console.log(agents, devices, uptimes);

    const agent = await prisma.agent.createMany({
      data: agents,
      skipDuplicates: true,
    });

    const device = await prisma.device.createMany({
      data: devices,
      skipDuplicates: true,
    });

    const uptime = await prisma.device_uptime.createMany({
      data: uptimes,
      skipDuplicates: true,
    });
    console.log(agent, device, uptime);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
console.log("Seeding...");
