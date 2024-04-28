"use client"

import { useState, useEffect, useContext } from "react"
import React from "react"
import { StateProvider } from "../contexts/StateContext"
import App from "./app/page"

export default function Home() {
	return (
		<StateProvider>
			<App></App>
		</StateProvider>
	)
}
