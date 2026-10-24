import "@/styles/globals.css";
import Head from "next/head";
import AuthHydrator from "@/components/auth/AuthHydrator";

export default function App({ Component, pageProps }) {
  return <AuthHydrator><Head><title>ToolMart Admin Portal</title><meta name="description" content="ToolMart staff administration portal"/><meta name="viewport" content="width=device-width, initial-scale=1"/></Head><Component {...pageProps} /></AuthHydrator>;
}
