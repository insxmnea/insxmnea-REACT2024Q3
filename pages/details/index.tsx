import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { HomePage } from "src/pages/homepage";
import "src/index.scss";
import { Providers } from "src/app/providers";
import { DealDetails } from "src/widgets/deal-details";
import App from "src/app/App";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <App children={<DealDetails />} />
      </main>
    </>
  );
}
