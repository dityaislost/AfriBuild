"use client"
import React, { createContext, useState, useEffect } from "react"
export const StateContext = createContext()
export const StateProvider = ({ children }) => {
	const [position, setPosition] = useState(null)
	const [locate, setLocate] = useState(false)
	const [clickedLocation, setClickedLocation] = useState(false)
	const [currentSubCategorySelected, setCurrentSubCategorySelected] =
		useState("")
	const [cumulativeVotes, setCumulativeVotes] = useState({}) //
	const [personalVotes, setPersonalVotes] = useState([])

	useEffect(() => {
		console.log(cumulativeVotes, personalVotes)
		async function postReq() {
			var cumulativeVotesDocs = []
			Object.keys(cumulativeVotes).forEach((cVote) => {
				cumulativeVotesDocs.push(cumulativeVotes[cVote])
			})
			var personalVotesDocs = []
			personalVotes.forEach((cVote) => {
				personalVotesDocs.push({ latlng: cVote })
			})
			console.log(cumulativeVotesDocs, personalVotesDocs)
			const response = await fetch("/api/db", {
				method: "POST",
				body: JSON.stringify({
					cumulativeVotes: cumulativeVotesDocs,
					personalVotes: personalVotesDocs,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			})
			console.log(await response.json())
		}
		return () => {
			if (personalVotes.length > 0) {
				// postReq()
			}
		}
	}, [personalVotes, cumulativeVotes])

	useEffect(() => {
		async function getReq() {
			const response = await fetch("/api/db", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})
			var res = await response.json()

			res.cumulativeVotesData.forEach((element) => {
				// var key = JSON.stringify(element.latlng)
				setCumulativeVotes((prev) => ({
					...prev,
					[JSON.stringify(element.latlng)]: element,
				}))
			})
		}
		return () => {
			// getReq()
		}
	}, [])

	return (
		<StateContext.Provider
			value={{
				position,
				setPosition,
				locate,
				setLocate,
				clickedLocation,
				setClickedLocation,
				currentSubCategorySelected,
				setCurrentSubCategorySelected,
				cumulativeVotes,
				setCumulativeVotes,
				personalVotes,
				setPersonalVotes,
			}}>
			{children}
		</StateContext.Provider>
	)
}
