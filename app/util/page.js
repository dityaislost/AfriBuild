"use client"
import { StateContext } from "../../contexts/StateContext"
import { useState, useEffect, useContext } from "react"

const MongoHandler = () => {
	const ctx = useContext(StateContext)
	useEffect(() => {
		async function postReq() {
			const response = await fetch("/api/db", {
				method: "POST",
				body: JSON.stringify({
					cumulativeVotes: ctx.cumulativeVotes,
					personalVotes: ctx.personalVotes,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			})
			console.log(await response.json())
		}
		return () => {
			postReq()
		}
	}, [ctx.personalVotes, ctx.cumulativeVotes])
	// return (  );
}

export default MongoHandler
