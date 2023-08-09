This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

<--Brief-->

Vantage is often gathering data from various network and hardware monitoring services and storing it in a database. This can come in the form of an API request or Webhook alert. For this exercise we have mocked up the process of gathering data from one of our more used services Domotz https://www.domotz.com/.

In our scenario a Vantage customer has monitoring Agents deployed at sites all around the world. Each Agent is monitoring Devices on a closed local network and is sending that information up to the Domotz cloud.

We have a dashboard on Vantage that we would like to display the network uptime of all Devices across all Agents being monitored.

We want you to demonstrate your ability to fetch data from an external API, store it in a database, and then aggregate that data and display it on a webpage. Normally this data would be gathered using webhooks and we would query the database for the data we need for the webpage. I would like you to do the same but instead of using webhooks you will create a cron job that will fetch the data from the API and store it in the database. Then re-fetch the data from the database to display on the webpage.

Our mock Domotz API lives here at: “https://interview-app-ppi.vercel.app/api”

The “/agent” endpoint will return a list of all Agents.

{

id: number,

display_name: string,

}

The “/agent/[agent_id]” endpoint will return a list of all Devices for that Agent.

{

id: number,

agent_id: number,

display_name: string,

}[]

The “/agent/[agent_id]/device/[device_id]/uptime” endpoint will return an uptime value for the device.

{

id: number,

device_id: number,

uptime: number,

}

For the sake of this exercise each device only has one uptime value.

I have set up a database for you to work against. Your mock database credentials are as follows:

host:

database:
username:
password:

port:

ssl:

The database includes tables that have the same columns/values as the endpoints:

agent
device
device_uptime

Please complete the following tasks:

1. Create a cron job to store the agents, devices, and device uptimes in the database.

2. Create a table that displays all devices and their uptime. This table should include the following columns:

   - Device ID

   - Agent Name

   - Device Name

   - Device Uptime

Bonus Tasks:

1. Create a KPI component that shows the total average uptime of all devices.

2. Style the components with Tailwind CSS.

Tools:

- Next.js

- Typescript

- Postgres

- Tailwind CSS

Let us know when you have completed the app and we will set up the technical interview. And again, feel free to reach out if you have any questions!

Eric
