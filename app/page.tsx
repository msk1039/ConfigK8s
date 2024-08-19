"use client";

// import { ThemeToggle } from "../components/theme-toggle";

// import Image from "next/image";

import K8sYamlGenerator from "../components/K8sYamlGenerator";


export default function Home() {
  return (
    <>
      {/* <div className="container mx-auto py-12 ">
        <CronJobGenerator />
      </div> */}
      <main>
        <K8sYamlGenerator />
      </main>
      {/* <ThemeToggle /> */}

    </>
  );
}
