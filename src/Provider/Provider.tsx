"use client";

import store from "@/redux/store";
import { Provider } from "react-redux";
// import { store } from "../lib/store";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}