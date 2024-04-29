"use client"

import { useState, useEffect, useContext } from "react"
import React from "react"
import { StateProvider } from "../contexts/StateContext"
import App from "./app/page"
import dynamic from "next/dynamic"
const DynamicApp = dynamic(() => import("./app/page"), {
	ssr: false,
})

// const App = dynamic(() => import("./app/page"), { ssr: false })

export default function Home() {
	return (
		<StateProvider>
			<DynamicApp />
		</StateProvider>
	)
}
