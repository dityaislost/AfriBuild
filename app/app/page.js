"use client"

import { useState, useEffect, useContext } from "react"
import React from "react"
// import LeafletMap from "../../components/LeafletMap"

// import L from "leaflet"

// const L = dynamic(() => import("leaflet"), { ssr: false })
import { StateContext } from "../../contexts/StateContext"
import { useNotification } from "../../components/ui/NotificationProvider.js"
import dynamic from "next/dynamic"
const DynamicLeaflet = dynamic(() => import("../../components/LeafletMap"), {
	ssr: false,
})
export default function App() {
	const ctx = useContext(StateContext)
	const [disp, setDisp] = useState(false)
	const [level, setLevel] = useState("93px")
	const { alertMessage } = useNotification()

	const [categoryKey, setCategoryKey] = useState({
		residential: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24"
				viewBox="0 -960 960 960"
				width="24"
				className="fill-black dark:fill-white">
				<path d="M200-160v-366L88-440l-48-64 440-336 160 122v-82h120v174l160 122-48 64-112-86v366H520v-240h-80v240H200Zm80-80h80v-240h240v240h80v-347L480-739 280-587v347Zm120-319h160q0-32-24-52.5T480-632q-32 0-56 20.5T400-559Zm-40 319v-240h240v240-240H360v240Z" />
			</svg>
		),
		sports: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24"
				viewBox="0 -960 960 960"
				width="24"
				className="fill-black dark:fill-white">
				<path d="M120-680v-160l160 80-160 80Zm600 0v-160l160 80-160 80Zm-280-40v-160l160 80-160 80Zm0 640q-76-2-141.5-12.5t-114-26.5Q136-135 108-156t-28-44v-360q0-25 31.5-46.5t85.5-38q54-16.5 127-26t156-9.5q83 0 156 9.5t127 26q54 16.5 85.5 38T880-560v360q0 23-28 44t-76.5 37q-48.5 16-114 26.5T520-80v-160h-80v160Zm40-440q97 0 167.5-11.5T760-558q0-5-76-23.5T480-600q-128 0-204 18.5T200-558q42 15 112.5 26.5T480-520ZM360-166v-154h240v154q80-8 131-23.5t69-27.5v-271q-55 22-138 35t-182 13q-99 0-182-13t-138-35v271q18 12 69 27.5T360-166Zm120-161Z" />
			</svg>
		),
		governmentBuilding: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24"
				viewBox="0 -960 960 960"
				width="24"
				className="fill-black dark:fill-white">
				<path d="M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Zm178-80h444-444Zm0 0h444L480-830 258-720Z" />
			</svg>
		),
		transportation: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="fill-black dark:fill-white"
				height="24"
				viewBox="0 -960 960 960"
				width="24">
				<path d="M340-80v-60l80-60v-220L80-320v-80l340-200v-220q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v220l340 200v80L540-420v220l80 60v60l-140-40-140 40Z" />
			</svg>
		),
		publicBuilding: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24"
				viewBox="0 -960 960 960"
				width="24"
				className="fill-black dark:fill-white">
				<path d="M321-240h120v-40h-80v-40h80v-120H321v40h80v40h-80v120Zm280 0h40v-200h-40v80h-40v-80h-40v120h80v80Zm240-278v318q0 33-23.5 56.5T761-120H201q-33 0-56.5-23.5T121-200v-318q-23-21-35.5-54t-.5-72l42-136q8-26 28.5-43t47.5-17h556q27 0 47 16.5t29 43.5l42 136q12 39-.5 71T841-518Zm-272-42q27 0 41-18.5t11-41.5l-22-140h-78v148q0 21 14 36.5t34 15.5Zm-180 0q23 0 37.5-15.5T441-612v-148h-78l-22 140q-4 24 10.5 42t37.5 18Zm-178 0q18 0 31.5-13t16.5-33l22-154h-78l-40 134q-6 20 6.5 43t41.5 23Zm540 0q29 0 42-23t6-43l-42-134h-76l22 154q3 20 16.5 33t31.5 13ZM201-200h560v-282q-5 2-6.5 2H751q-27 0-47.5-9T663-518q-18 18-41 28t-49 10q-27 0-50.5-10T481-518q-17 18-39.5 28T393-480q-29 0-52.5-10T299-518q-21 21-41.5 29.5T211-480h-4.5q-2.5 0-5.5-2v282Zm560 0H201h560Z" />
			</svg>
		),
		religiousPlaces: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24"
				viewBox="0 -960 960 960"
				width="24"
				className="fill-black dark:fill-white">
				<path d="M80-80v-440h80v80h80l119-395v-85h80v80h81v-80h80v80l120 400h80v-80h80v440H520v-200h-80v200H80Zm268-440h264l-24-80H372l-24 80Zm48-160h168l-24-80H420l-24 80ZM160-160h200v-200h240v200h200v-200H660l-24-80H324l-24 80H160v200Zm320-300Z" />
			</svg>
		),
	})

	const [categoryChild, setCategoryChild] = useState()
	useEffect(() => {
		async function loadData() {
			const L = (await import("leaflet")).default
			// import L from ("leaflet")
			setCategoryChild({
				residential: [
					{
						name: "House",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path d="M200-160v-366L88-440l-48-64 440-336 160 122v-82h120v174l160 122-48 64-112-86v366H520v-240h-80v240H200Zm80-80h80v-240h240v240h80v-347L480-739 280-587v347Zm120-319h160q0-32-24-52.5T480-632q-32 0-56 20.5T400-559Zm-40 319v-240h240v240-240H360v240Z" />
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/house.png?alt=media&token=da5bf471-4ea5-417d-9802-519d829d4aa2",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/house.png?alt=media&token=da5bf471-4ea5-417d-9802-519d829d4aa2",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Aparts",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path d="M120-120v-560h160v-160h400v320h160v400H520v-160h-80v160H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z" />
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/apartment.png?alt=media&token=b76ef574-a942-4cc2-bd93-ff994b32a017",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/apartment.png?alt=media&token=b76ef574-a942-4cc2-bd93-ff994b32a017",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Home",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/home.png?alt=media&token=60a2ab1c-534f-471d-b992-fd404cfba9eb",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/home.png?alt=media&token=60a2ab1c-534f-471d-b992-fd404cfba9eb",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Hostel",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								className="fill-black dark:fill-white"
								viewBox="0 -960 960 960"
								width="24">
								<path d="M80-200v-360l160-160h40v-80h80v80h360l160 160v360H80Zm560-80h160v-247l-80-80-80 80v247Zm-480 0h400v-200H160v200Z" />
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/hostel.png?alt=media&token=339f8050-6621-4fa6-8894-19d3898bb487",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/hostel.png?alt=media&token=339f8050-6621-4fa6-8894-19d3898bb487",
							iconSize: [24, 24],
						}),
					},
				],
				sports: [
					{
						name: "BasketBall",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path d="M162-520h114q-6-38-23-71t-43-59q-18 29-30.5 61.5T162-520Zm522 0h114q-5-36-17.5-68.5T750-650q-26 26-43 59t-23 71ZM210-310q26-26 43-59t23-71H162q5 36 17.5 68.5T210-310Zm540 0q18-29 30.5-61.5T798-440H684q6 38 23 71t43 59ZM358-520h82v-278q-53 8-98.5 29.5T260-712q39 38 64.5 86.5T358-520Zm162 0h82q8-57 33.5-105.5T700-712q-36-35-81.5-56.5T520-798v278Zm-80 358v-278h-82q-8 57-33.5 105.5T260-248q36 35 81.5 56.5T440-162Zm80 0q53-8 98.5-29.5T700-248q-39-38-64.5-86.5T602-440h-82v278Zm-40-318Zm0 400q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/sports_basketball_FILL0_wght400_GRAD0_opsz24.png?alt=media&token=9334da98-e778-4163-92a1-dc1aabd12020",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/sports_basketball_FILL0_wght400_GRAD0_opsz24.png?alt=media&token=9334da98-e778-4163-92a1-dc1aabd12020",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Soccer",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm200-500 54-18 16-54q-32-48-77-82.5T574-786l-54 38v56l160 112Zm-400 0 160-112v-56l-54-38q-54 17-99 51.5T210-652l16 54 54 18Zm-42 308 46-4 30-54-58-174-56-20-40 30q0 65 18 118.5T238-272Zm242 112q26 0 51-4t49-12l28-60-26-44H378l-26 44 28 60q24 8 49 12t51 4Zm-90-200h180l56-160-146-102-144 102 54 160Zm332 88q42-50 60-103.5T800-494l-40-28-56 18-58 174 30 54 46 4Z" />
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/sports_soccer_FILL0_wght400_GRAD0_opsz24.png?alt=media&token=060b3fc4-5f04-4818-89b6-d07839ce1a41",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/sports_soccer_FILL0_wght400_GRAD0_opsz24.png?alt=media&token=060b3fc4-5f04-4818-89b6-d07839ce1a41",
							iconSize: [24, 24],
						}),
					},
					{
						name: "VolleyBall",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path d="M782-582q-31-87-101-145.5T520-798v64l262 152ZM320-434l120-70v-294q-32 3-62 14.5T320-756v322Zm-134 78 54-32v-302q-39 44-59.5 98T160-480q0 32 6.5 63.5T186-356Zm134 152 280-160-120-70-254 148q20 25 43 46t51 36Zm160 44q75 0 142-34t112-94l-54-30-264 152q16 3 32 4.5t32 1.5Zm294-196q13-29 19.5-60.5T800-480L520-642v138l254 148ZM480-480Zm0 400q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/sports_volleyball_FILL0_wght400_GRAD0_opsz24.png?alt=media&token=639dd3f8-0b4b-4cea-bc6a-52c54a978a20",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/sports_volleyball_FILL0_wght400_GRAD0_opsz24.png?alt=media&token=639dd3f8-0b4b-4cea-bc6a-52c54a978a20",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Cricket",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path d="M600-392 488-280q-12 12-28 12t-28-12L92-620q-12-12-12-27t12-27l112-112q12-12 29-12t29 12l338 338q12 12 12 28t-12 28Zm-140 28 56-56-284-284-56 56 284 284ZM744-80 574-250l56-56 170 170-56 56Zm-4-520q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 58-41 99t-99 41Zm0-80q25 0 42.5-17.5T800-740q0-25-17.5-42.5T740-800q-25 0-42.5 17.5T680-740q0 25 17.5 42.5T740-680Zm0-60ZM346-534Z" />
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/sports_cricket_FILL0_wght400_GRAD0_opsz24.png?alt=media&token=22b5f852-1c5b-4ff0-bb63-bf1317685b09",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/sports_cricket_FILL0_wght400_GRAD0_opsz24.png?alt=media&token=22b5f852-1c5b-4ff0-bb63-bf1317685b09",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Tennis",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path d="m137-160-57-56 164-164q31-31 42.5-77.5T298-600q0-58 26-114t74-104q91-91 201-103t181 61q72 72 60 182T738-478q-48 48-104 74t-114 26q-97 0-142 11t-77 43L137-160Zm275-334q47 46 127 34t143-75q64-64 76.5-143.5T724-803q-48-48-125.5-36T456-763q-63 63-76.5 142.5T412-494ZM720-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113T720-40Zm0-80q33 0 56.5-23.5T800-200q0-33-23.5-56.5T720-280q-33 0-56.5 23.5T640-200q0 33 23.5 56.5T720-120Zm0-80Z" />
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/sports_tennis_FILL0_wght400_GRAD0_opsz24.png?alt=media&token=36cef553-07ef-410e-b0f8-848a0b79c48e",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/sports_tennis_FILL0_wght400_GRAD0_opsz24.png?alt=media&token=36cef553-07ef-410e-b0f8-848a0b79c48e",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Baseball",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path d="M224-288q45-35 70.5-85T320-480q0-57-25.5-107T224-672q-31 42-47.5 91T160-480q0 52 16.5 101t47.5 91Zm256 128q55 0 106.5-17.5T680-230q-57-46-88.5-111.5T560-480q0-73 31.5-138.5T680-730q-42-35-93.5-52.5T480-800q-55 0-106.5 17.5T280-730q57 46 88.5 111.5T400-480q0 73-31.5 138.5T280-230q42 35 93.5 52.5T480-160Zm256-128q31-42 47.5-91T800-480q0-52-16.5-101T736-672q-45 35-70.5 85T640-480q0 57 25.5 107t70.5 85ZM480-480Zm0 400q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/sports_baseball_FILL0_wght400_GRAD0_opsz24.png?alt=media&token=287e845b-8418-4c4a-954f-b81fa071b6a0",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/sports_baseball_FILL0_wght400_GRAD0_opsz24.png?alt=media&token=287e845b-8418-4c4a-954f-b81fa071b6a0",
							iconSize: [24, 24],
						}),
					},
				],
				governmentBuilding: [
					{
						name: "Bank",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path d="M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Zm178-80h444-444Zm0 0h444L480-830 258-720Z" />
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/account_balance.png?alt=media&token=c17e239b-e4b0-4ea5-88f6-4b70656cb736",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/account_balance.png?alt=media&token=c17e239b-e4b0-4ea5-88f6-4b70656cb736",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Hospital",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path d="M420-280h120v-140h140v-120H540v-140H420v140H280v120h140v140ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_hospital.png?alt=media&token=aed29081-8547-454e-89ac-21cc3fc993f0",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_hospital.png?alt=media&token=aed29081-8547-454e-89ac-21cc3fc993f0",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Gas Station",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="M160-120v-640q0-33 23.5-56.5T240-840h240q33 0 56.5 23.5T560-760v280h40q33 0 56.5 23.5T680-400v180q0 17 11.5 28.5T720-180q17 0 28.5-11.5T760-220v-288q-9 5-19 6.5t-21 1.5q-42 0-71-29t-29-71q0-32 17.5-57.5T684-694l-84-84 42-42 148 144q15 15 22.5 35t7.5 41v380q0 42-29 71t-71 29q-42 0-71-29t-29-71v-200h-60v300H160Zm80-440h240v-200H240v200Zm480 0q17 0 28.5-11.5T760-600q0-17-11.5-28.5T720-640q-17 0-28.5 11.5T680-600q0 17 11.5 28.5T720-560ZM240-200h240v-280H240v280Zm240 0H240h240Z"
								/>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_gas_station.png?alt=media&token=a4110785-c5c2-486f-96e8-5174d17b5ab4",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_gas_station.png?alt=media&token=a4110785-c5c2-486f-96e8-5174d17b5ab4",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Court",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="M160-120v-80h480v80H160Zm226-194L160-540l84-86 228 226-86 86Zm254-254L414-796l86-84 226 226-86 86Zm184 408L302-682l56-56 522 522-56 56Z"
								/>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/court.png?alt=media&token=9f155f24-8f8a-47f0-8cad-203c3c846ec5",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/court.png?alt=media&token=9f155f24-8f8a-47f0-8cad-203c3c846ec5",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Post Office",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="M640-200v80q0 17-11.5 28.5T600-80H120q-17 0-28.5-11.5T80-120v-320q0-17 11.5-28.5T120-480h120v-160q0-100 70-170t170-70h160q100 0 170 70t70 170v560h-80v-120H640Zm0-80h160v-360q0-66-47-113t-113-47H480q-66 0-113 47t-47 113v160h280q17 0 28.5 11.5T640-440v160ZM400-560v-80h320v80H400Zm-40 274 200-114H160l200 114Zm0 70L160-330v170h400v-170L360-216ZM160-400v240-240Z"
								/>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_post_office_FILL0_wght400_GRAD0_opsz24.png?alt=media&token=5d275082-d894-4242-be9f-32303e137048",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_post_office_FILL0_wght400_GRAD0_opsz24.png?alt=media&token=5d275082-d894-4242-be9f-32303e137048",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Police",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="m368-336 112-84 110 84-42-136 112-88H524l-44-136-44 136H300l110 88-42 136ZM480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"
								/>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_police.png?alt=media&token=36d328ab-1714-4bb1-b049-e42d37f9479b",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_police.png?alt=media&token=36d328ab-1714-4bb1-b049-e42d37f9479b",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Fire Station",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="M240-400q0 52 21 98.5t60 81.5q-1-5-1-9v-9q0-32 12-60t35-51l113-111 113 111q23 23 35 51t12 60v9q0 4-1 9 39-35 60-81.5t21-98.5q0-50-18.5-94.5T648-574q-20 13-42 19.5t-45 6.5q-62 0-107.5-41T401-690q-39 33-69 68.5t-50.5 72Q261-513 250.5-475T240-400Zm240 52-57 56q-11 11-17 25t-6 29q0 32 23.5 55t56.5 23q33 0 56.5-23t23.5-55q0-16-6-29.5T537-292l-57-56Zm0-492v132q0 34 23.5 57t57.5 23q18 0 33.5-7.5T622-658l18-22q74 42 117 117t43 163q0 134-93 227T480-80q-134 0-227-93t-93-227q0-129 86.5-245T480-840Z"
								/>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_fire.png?alt=media&token=1a108208-e09b-4b6a-94fe-39302f873523",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_fire.png?alt=media&token=1a108208-e09b-4b6a-94fe-39302f873523",
							iconSize: [24, 24],
						}),
					},

					{
						name: "University",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="22"
								viewBox="0 0 512 512"
								width="22"
								className="fill-black dark:fill-white">
								<path d="M480.813,221.945v-42.138H512V95.229h-53.029L255.999,13.103L53.029,95.229H0v84.579h31.187v42.138h15.209V372.18H31.187    v42.138H0v84.579h512v-84.579h-31.187V372.18h-15.209V221.945H480.813z M255.999,45.916l121.874,49.312H134.127L255.999,45.916z     M480.813,444.734h0.77v23.745H30.417v-23.745h0.77H480.813z M379.021,191.529H354.73h-86.584h-24.292H157.27h-24.291H61.604    v-11.721h388.792v11.721H379.021z M435.187,221.945v150.234h-25.749V221.945H435.187z M379.02,221.945v150.234h-24.291V221.945    H379.02z M324.313,221.945v150.234h-25.749V221.945H324.313z M243.854,221.945h24.292v150.234h-24.292V221.945z M213.437,221.945    v150.234h-25.749V221.945H213.437z M157.27,221.945v150.234h-24.291V221.945H157.27z M102.562,221.945v150.234H76.813V221.945    H102.562z M132.979,402.596h24.291h86.584h24.292h86.584h24.291h71.375v11.721H61.604v-11.721H132.979z M31.187,149.391h-0.77    v-23.745h451.166v23.745h-0.77H31.187z" />
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/university-svgrepo-com.png?alt=media&token=0b639e25-d39e-4731-8734-9c5e4d3e6bf2",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/university-svgrepo-com.png?alt=media&token=0b639e25-d39e-4731-8734-9c5e4d3e6bf2",
							iconSize: [24, 24],
						}),
					},

					{
						name: "EV Station",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path d="m340-200 100-160h-60v-120L280-320h60v120ZM240-560h240v-200H240v200Zm0 360h240v-280H240v280Zm-80 80v-640q0-33 23.5-56.5T240-840h240q33 0 56.5 23.5T560-760v280h50q29 0 49.5 20.5T680-410v185q0 17 14 31t31 14q18 0 31.5-14t13.5-31v-375h-10q-17 0-28.5-11.5T720-640v-80h20v-60h40v60h40v-60h40v60h20v80q0 17-11.5 28.5T840-600h-10v375q0 42-30.5 73.5T725-120q-43 0-74-31.5T620-225v-185q0-5-2.5-7.5T610-420h-50v300H160Zm320-80H240h240Z" />
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/ev_station.png?alt=media&token=8a16929c-9b79-4af2-9f21-ef0bcd2d3894",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/ev_station.png?alt=media&token=8a16929c-9b79-4af2-9f21-ef0bcd2d3894",
							iconSize: [24, 24],
						}),
					},

					{
						name: "Dam",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 15 15"
								version="1.1"
								className="fill-black dark:fill-white">
								<path
									d="M13.94,9.5c0,0.2761-0.2239,0.5-0.5,0.5l0,0c-0.259,0.0219-0.4994,0.1439-0.67,0.34c-0.2714,0.2887-0.6175,0.4964-1,0.6&#10;&#9;c-0.6115,0.1816-1.2734,0.0424-1.76-0.37l-0.39-0.35c-0.2976-0.3038-0.7851-0.3087-1.0889-0.0111&#10;&#9;C8.5274,10.2126,8.5237,10.2163,8.52,10.22c-0.14,0.12-0.27,0.25-0.42,0.37c-0.7278,0.5784-1.7663,0.5489-2.46-0.07L5.3,10.19&#10;&#9;l-0.1-0.06l0.3,1.22l0.49,2c0.0829,0.2634-0.0634,0.5441-0.3267,0.6271C5.6105,13.9937,5.5553,14.0014,5.5,14h-4&#10;&#9;C1.2239,14,1,13.7761,1,13.5v-12C1,1.2239,1.2239,1,1.5,1h1.1c0.2346-0.0011,0.4384,0.1611,0.49,0.39L4,5.06V5.2&#10;&#9;c0.6569-0.314,1.4361-0.2205,2,0.24c0.16,0.13,0.31,0.28,0.47,0.41c0.2847,0.2546,0.7153,0.2546,1,0c0.16-0.13,0.31-0.28,0.47-0.41&#10;&#9;c0.7076-0.5968,1.7424-0.5968,2.45,0c0.15,0.13,0.29,0.27,0.44,0.39c0.2847,0.2546,0.7153,0.2546,1,0l0.47-0.41&#10;&#9;c0.3163-0.2672,0.7159-0.4157,1.13-0.42l0,0c0.2761,0,0.5,0.2239,0.5,0.5S13.7061,6,13.43,6l0,0&#10;&#9;c-0.259,0.0219-0.4994,0.1439-0.67,0.34c-0.2714,0.2887-0.6175,0.4964-1,0.6C11.1485,7.1216,10.4866,6.9824,10,6.57L9.67,6.23&#10;&#9;C9.3724,5.9262,8.8849,5.9213,8.5811,6.2189C8.5774,6.2226,8.5737,6.2263,8.57,6.23C8.43,6.35,8.3,6.48,8.15,6.6&#10;&#9;C7.4222,7.1784,6.3837,7.1489,5.69,6.53L5.3,6.19c-0.2847-0.2546-0.7153-0.2546-1,0L4.24,6.24L4.93,9&#10;&#9;C5.3226,9.029,5.6965,9.1793,6,9.43c0.16,0.13,0.31,0.28,0.47,0.41c0.2847,0.2546,0.7153,0.2546,1,0c0.16-0.13,0.31-0.28,0.47-0.41&#10;&#9;c0.7076-0.5968,1.7424-0.5968,2.45,0c0.15,0.13,0.29,0.27,0.44,0.39c0.2847,0.2546,0.7153,0.2546,1,0l0.47-0.41&#10;&#9;c0.3177-0.2636,0.7172-0.4085,1.13-0.41l0,0c0.2761-0.0055,0.5044,0.2138,0.5099,0.4899C13.94,9.4933,13.94,9.4966,13.94,9.5z"
								/>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/dam.png?alt=media&token=5754e867-48e4-43a5-9c21-bf25f2d80841",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/dam.png?alt=media&token=5754e867-48e4-43a5-9c21-bf25f2d80841",
							iconSize: [24, 24],
						}),
					},

					{
						name: "Car Repair",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="fill-black dark:fill-white"
								height="24"
								viewBox="0 -960 960 960"
								width="24">
								<path d="M440-80v-120H160v-80h640v80H520v120h-80Zm-80-420q17 0 28.5-11.5T400-540q0-17-11.5-28.5T360-580q-17 0-28.5 11.5T320-540q0 17 11.5 28.5T360-500Zm240 0q17 0 28.5-11.5T640-540q0-17-11.5-28.5T600-580q-17 0-28.5 11.5T560-540q0 17 11.5 28.5T600-500ZM200-616l66-192q5-14 16.5-23t25.5-9h344q14 0 25.5 9t16.5 23l66 192v264q0 14-9 23t-23 9h-16q-14 0-23-9t-9-23v-48H280v48q0 14-9 23t-23 9h-16q-14 0-23-9t-9-23v-264Zm106-64h348l-28-80H334l-28 80Zm-26 80v120-120Zm0 120h400v-120H280v120Z" />
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/car-repair-svgrepo-com.png?alt=media&token=fdd289c4-0906-40b2-b538-79ef2a1d39da",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/car-repair-svgrepo-com.png?alt=media&token=fdd289c4-0906-40b2-b538-79ef2a1d39da",
							iconSize: [24, 24],
						}),
					},
				],
				transportation: [
					{
						name: "Flight",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path d="M340-80v-60l80-60v-220L80-320v-80l340-200v-220q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v220l340 200v80L540-420v220l80 60v60l-140-40-140 40Z" />
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/flight.png?alt=media&token=49a9cc66-721c-49a0-9e44-76ac3995cd7e",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/flight.png?alt=media&token=49a9cc66-721c-49a0-9e44-76ac3995cd7e",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Parking",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="M240-120v-720h280q100 0 170 70t70 170q0 100-70 170t-170 70H400v240H240Zm160-400h128q33 0 56.5-23.5T608-600q0-33-23.5-56.5T528-680H400v160Z"
								/>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_parking.png?alt=media&token=6d91e9be-2302-4dcf-aff7-8750a8d0608f",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_parking.png?alt=media&token=6d91e9be-2302-4dcf-aff7-8750a8d0608f",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Train",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="M160-340v-380q0-53 27.5-84.5t72.5-48q45-16.5 102.5-22T480-880q66 0 124.5 5.5t102 22q43.5 16.5 68.5 48t25 84.5v380q0 59-40.5 99.5T660-200l60 60v20h-80l-80-80H400l-80 80h-80v-20l60-60q-59 0-99.5-40.5T160-340Zm320-460q-106 0-155 12.5T258-760h448q-15-17-64.5-28.5T480-800ZM240-560h200v-120H240v120Zm420 80H240h480-60Zm-140-80h200v-120H520v120ZM340-320q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm280 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm-320 40h360q26 0 43-17t17-43v-140H240v140q0 26 17 43t43 17Zm180-480h226-448 222Z"
								/>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/train.png?alt=media&token=2689164a-bd68-445c-a956-2a411eedf3cd",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/train.png?alt=media&token=2689164a-bd68-445c-a956-2a411eedf3cd",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Taxi",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="M240-200v40q0 17-11.5 28.5T200-120h-40q-17 0-28.5-11.5T120-160v-320l84-240q6-18 21.5-29t34.5-11h100v-80h240v80h100q19 0 34.5 11t21.5 29l84 240v320q0 17-11.5 28.5T800-120h-40q-17 0-28.5-11.5T720-160v-40H240Zm-8-360h496l-42-120H274l-42 120Zm-32 80v200-200Zm100 160q25 0 42.5-17.5T360-380q0-25-17.5-42.5T300-440q-25 0-42.5 17.5T240-380q0 25 17.5 42.5T300-320Zm360 0q25 0 42.5-17.5T720-380q0-25-17.5-42.5T660-440q-25 0-42.5 17.5T600-380q0 25 17.5 42.5T660-320Zm-460 40h560v-200H200v200Z"
								/>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_taxi.png?alt=media&token=ddcaf956-f730-474e-af1e-8768ad75d904",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_taxi.png?alt=media&token=ddcaf956-f730-474e-af1e-8768ad75d904",
							iconSize: [24, 24],
						}),
					},
				],
				publicBuilding: [
					{
						name: "Laundromat",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80H240Zm0-80h480v-640H240v640Zm240-40q83 0 141.5-58.5T680-400q0-83-58.5-141.5T480-600q-83 0-141.5 58.5T280-400q0 83 58.5 141.5T480-200Zm0-68q-26 0-50.5-9.5T386-306l188-188q19 19 28.5 43.5T612-400q0 55-38.5 93.5T480-268ZM320-680q17 0 28.5-11.5T360-720q0-17-11.5-28.5T320-760q-17 0-28.5 11.5T280-720q0 17 11.5 28.5T320-680Zm120 0q17 0 28.5-11.5T480-720q0-17-11.5-28.5T440-760q-17 0-28.5 11.5T400-720q0 17 11.5 28.5T440-680ZM240-160v-640 640Z" />
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_laundry_service_.png?alt=media&token=6a8288c3-dd04-45ce-9525-02839b75edf2",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_laundry_service_.png?alt=media&token=6a8288c3-dd04-45ce-9525-02839b75edf2",
							iconSize: [24, 24],
						}),
					},

					{
						name: "Library",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path d="M480-60q-72-68-165-104t-195-36v-440q101 0 194 36.5T480-498q73-69 166-105.5T840-640v440q-103 0-195.5 36T480-60Zm0-104q63-47 134-75t146-37v-276q-73 13-143.5 52.5T480-394q-66-66-136.5-105.5T200-552v276q75 9 146 37t134 75Zm0-436q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-760q0-33-23.5-56.5T480-840q-33 0-56.5 23.5T400-760q0 33 23.5 56.5T480-680Zm0-80Zm0 366Z" />
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_library.png?alt=media&token=744f548b-e6b9-4024-9d70-7db6ec45f691",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_library.png?alt=media&token=744f548b-e6b9-4024-9d70-7db6ec45f691",
							iconSize: [24, 24],
						}),
					},

					{
						name: "Convenience",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="M321-240h120v-40h-80v-40h80v-120H321v40h80v40h-80v120Zm280 0h40v-200h-40v80h-40v-80h-40v120h80v80Zm240-278v318q0 33-23.5 56.5T761-120H201q-33 0-56.5-23.5T121-200v-318q-23-21-35.5-54t-.5-72l42-136q8-26 28.5-43t47.5-17h556q27 0 47 16.5t29 43.5l42 136q12 39-.5 71T841-518Zm-272-42q27 0 41-18.5t11-41.5l-22-140h-78v148q0 21 14 36.5t34 15.5Zm-180 0q23 0 37.5-15.5T441-612v-148h-78l-22 140q-4 24 10.5 42t37.5 18Zm-178 0q18 0 31.5-13t16.5-33l22-154h-78l-40 134q-6 20 6.5 43t41.5 23Zm540 0q29 0 42-23t6-43l-42-134h-76l22 154q3 20 16.5 33t31.5 13ZM201-200h560v-282q-5 2-6.5 2H751q-27 0-47.5-9T663-518q-18 18-41 28t-49 10q-27 0-50.5-10T481-518q-17 18-39.5 28T393-480q-29 0-52.5-10T299-518q-21 21-41.5 29.5T211-480h-4.5q-2.5 0-5.5-2v282Zm560 0H201h560Z"
								/>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_convenience_store.png?alt=media&token=b6b615af-14f7-4d28-ab13-11a49096c5d0",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_convenience_store.png?alt=media&token=b6b615af-14f7-4d28-ab13-11a49096c5d0",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Pharmacy",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="M120-120v-80l80-240-80-240v-80h508l58-160 94 34-46 126h106v80l-80 240 80 240v80H120Zm320-160h80v-120h120v-80H520v-120h-80v120H320v80h120v120Zm-236 80h552l-80-240 80-240H204l80 240-80 240Zm276-240Z"
								/>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_pharmacy.png?alt=media&token=feeb0678-3717-4097-b24d-96c03847e1ad",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_pharmacy.png?alt=media&token=feeb0678-3717-4097-b24d-96c03847e1ad",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Museum",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="M80-80v-80h80v-360H80v-80l400-280 400 280v80h-80v360h80v80H80Zm160-80h480-480Zm80-80h80v-160l80 120 80-120v160h80v-280h-80l-80 120-80-120h-80v280Zm400 80v-454L480-782 240-614v454h480Z
								"
								/>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/museum.png?alt=media&token=75548ecf-95aa-4f19-85ed-c795f497c244",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/museum.png?alt=media&token=75548ecf-95aa-4f19-85ed-c795f497c244",
							iconSize: [24, 24],
						}),
					},

					{
						name: "Resturant",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="M280-80v-366q-51-14-85.5-56T160-600v-280h80v280h40v-280h80v280h40v-280h80v280q0 56-34.5 98T360-446v366h-80Zm400 0v-320H560v-280q0-83 58.5-141.5T760-880v800h-80Z"
								/>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/restaurant_.png?alt=media&token=55905a55-06fb-4b57-8714-af1dc4787a1c",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/restaurant_.png?alt=media&token=55905a55-06fb-4b57-8714-af1dc4787a1c",
							iconSize: [24, 24],
						}),
					},

					{
						name: "School",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"
								/>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/school.png?alt=media&token=59acc123-fe4d-4749-ad55-94456a33eb80",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/school.png?alt=media&token=59acc123-fe4d-4749-ad55-94456a33eb80",
							iconSize: [24, 24],
						}),
					},

					{
						name: "Bar",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="M240-120v-80h200v-200L120-760v-80h720v80L520-400v200h200v80H240Zm58-560h364l72-80H226l72 80Zm182 204 111-124H369l111 124Zm0 0Z"
								/>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_bar.png?alt=media&token=17411e94-8ea0-4239-9fa4-7dfb3253ebfb",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_bar.png?alt=media&token=17411e94-8ea0-4239-9fa4-7dfb3253ebfb",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Gym",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="m536-84-56-56 142-142-340-340-142 142-56-56 56-58-56-56 84-84-56-58 56-56 58 56 84-84 56 56 58-56 56 56-142 142 340 340 142-142 56 56-56 58 56 56-84 84 56 58-56 56-58-56-84 84-56-56-58 56Z"
								/>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/fitness_center.png?alt=media&token=3e085c2f-f040-47ec-a976-232aec0bcc6e",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/fitness_center.png?alt=media&token=3e085c2f-f040-47ec-a976-232aec0bcc6e",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Mall",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="M200-80q-33 0-56.5-23.5T120-160v-480q0-33 23.5-56.5T200-720h80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720h80q33 0 56.5 23.5T840-640v480q0 33-23.5 56.5T760-80H200Zm0-80h560v-480H200v480Zm280-240q83 0 141.5-58.5T680-600h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85h-80q0 83 58.5 141.5T480-400ZM360-720h240q0-50-35-85t-85-35q-50 0-85 35t-35 85ZM200-160v-480 480Z"
								/>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_mall.png?alt=media&token=bbd1c238-49fa-4029-b0a1-c61da114b8b2",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/local_mall.png?alt=media&token=bbd1c238-49fa-4029-b0a1-c61da114b8b2",
							iconSize: [24, 24],
						}),
					},

					{
						name: "Theatre",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="M160-120v-720h80v80h80v-80h320v80h80v-80h80v720h-80v-80h-80v80H320v-80h-80v80h-80Zm80-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm400 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80ZM400-200h160v-560H400v560Zm0-560h160-160Z"
								/>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/theaters.png?alt=media&token=fe3c5770-1e77-480e-b184-2d13af31e37d",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/theaters.png?alt=media&token=fe3c5770-1e77-480e-b184-2d13af31e37d",
							iconSize: [24, 24],
						}),
					},

					{
						name: "Store",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z"
								/>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/store.png?alt=media&token=9e13d509-6498-4544-bd12-63df04f2147d",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/store.png?alt=media&token=9e13d509-6498-4544-bd12-63df04f2147d",
							iconSize: [24, 24],
						}),
					},

					{
						name: "Bakery",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="M804-282q17 9 30-4t4-30l-58-108-42 108 66 34Zm-200-38h48l96-238q3-8-1.5-13.5T736-580l-80-32q-9-3-17.5 2T628-596l-24 276Zm-296 0h48l-24-276q-2-11-10.5-15t-17.5-1l-80 32q-8 3-11.5 8.5T212-558l96 238Zm-152 38 66-34-42-108-58 108q-9 17 4 30t30 4Zm280-38h88l30-338q2-9-4.5-15.5T534-680H426q-8 0-14.5 6.5T406-658l30 338ZM138-200q-42 0-70-31.5T40-306q0-12 3.5-23.5T52-352l88-168q-14-40 1-79t53-55l80-32q14-5 28-7t28 1q14-29 39-48.5t57-19.5h108q32 0 57 19.5t39 48.5q14-2 28-.5t28 6.5l80 32q40 16 56 55t-2 77l88 168q6 11 9 23t3 25q0 45-30.5 75.5T814-200q-11 0-22-2.5t-22-7.5l-62-30H250l-56 30q-13 7-27.5 8.5T138-200Zm342-280Z"
								/>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/bakery.png?alt=media&token=2fcd67e2-419c-49bf-adbf-2b0e40820deb",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/bakery.png?alt=media&token=2fcd67e2-419c-49bf-adbf-2b0e40820deb",
							iconSize: [24, 24],
						}),
					},

					{
						name: "Store Front",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="M841-518v318q0 33-23.5 56.5T761-120H201q-33 0-56.5-23.5T121-200v-318q-23-21-35.5-54t-.5-72l42-136q8-26 28.5-43t47.5-17h556q27 0 47 16.5t29 43.5l42 136q12 39-.5 71T841-518Zm-272-42q27 0 41-18.5t11-41.5l-22-140h-78v148q0 21 14 36.5t34 15.5Zm-180 0q23 0 37.5-15.5T441-612v-148h-78l-22 140q-4 24 10.5 42t37.5 18Zm-178 0q18 0 31.5-13t16.5-33l22-154h-78l-40 134q-6 20 6.5 43t41.5 23Zm540 0q29 0 42-23t6-43l-42-134h-76l22 154q3 20 16.5 33t31.5 13ZM201-200h560v-282q-5 2-6.5 2H751q-27 0-47.5-9T663-518q-18 18-41 28t-49 10q-27 0-50.5-10T481-518q-17 18-39.5 28T393-480q-29 0-52.5-10T299-518q-21 21-41.5 29.5T211-480h-4.5q-2.5 0-5.5-2v282Zm560 0H201h560Z"
								/>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/storefront.png?alt=media&token=0a9297af-b388-444b-a177-23c351fbc5aa",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/storefront.png?alt=media&token=0a9297af-b388-444b-a177-23c351fbc5aa",
							iconSize: [24, 24],
						}),
					},
				],
				religiousPlaces: [
					{
						name: "Synagogue",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path d="M40-120v-560q0-50 35-85t85-35q50 0 85 35t35 85v12l200-172 200 172v-12q0-50 35-85t85-35q50 0 85 35t35 85v560H520v-200q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320v200H40Zm720-520h80v-40q0-17-11.5-28.5T800-720q-17 0-28.5 11.5T760-680v40Zm-640 0h80v-40q0-17-11.5-28.5T160-720q-17 0-28.5 11.5T120-680v40Zm0 440h80v-360h-80v360Zm160 0h80v-120q0-50 35-85t85-35q50 0 85 35t35 85v120h80v-363L480-735 280-563v363Zm480 0h80v-360h-80v360ZM480-500q-25 0-42.5-17.5T420-560q0-25 17.5-42.5T480-620q25 0 42.5 17.5T540-560q0 25-17.5 42.5T480-500Z" />
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/synagogue.png?alt=media&token=49405fd3-120c-42c5-8b6e-b7d8866d730c",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/synagogue.png?alt=media&token=49405fd3-120c-42c5-8b6e-b7d8866d730c",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Monastery",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="M160-80v-366q-52-13-86-55t-34-98h80q0 32 23.5 55.5T199-520h41v-86q-52-13-86-55t-34-98h80q0 32 23.5 55.5T279-680h21l180-240 180 240h21q32 0 55.5-23.5T760-759h80q0 56-34 98t-86 55v86h41q32 0 55.5-23.5T840-599h80q0 56-34 98t-86 55v366H520v-160q0-17-11.5-28.5T480-280q-17 0-28.5 11.5T440-240v160H160Zm240-600h160l-80-107-80 107Zm-80 160h320v-80H320v80Zm-80 360h120v-80q0-50 35-85t85-35q50 0 85 35t35 85v80h120v-280H240v280Zm240-280Zm0-240Zm0 160Z"
								/>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/temple_buddhist.png?alt=media&token=c06f8616-5340-429c-8214-e8a796c8ad20",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/temple_buddhist.png?alt=media&token=c06f8616-5340-429c-8214-e8a796c8ad20",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Temple",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								className="fill-black dark:fill-white">
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="M80-80v-440h80v80h80l119-395v-85h80v80h81v-80h80v80l120 400h80v-80h80v440H520v-200h-80v200H80Zm268-440h264l-24-80H372l-24 80Zm48-160h168l-24-80H420l-24 80ZM160-160h200v-200h240v200h200v-200H660l-24-80H324l-24 80H160v200Zm320-300Z"
								/>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/temple_hindu.png?alt=media&token=08c27cc2-0ded-4275-9c85-fb076c34438d",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/temple_hindu.png?alt=media&token=08c27cc2-0ded-4275-9c85-fb076c34438d",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Chruch",
						svg: (
							<svg
								height="24px"
								width="24px"
								xmlns="http://www.w3.org/2000/svg"
								className="fill-black dark:fill-white"
								viewBox="0 0 512 512">
								<g>
									<g>
										<path
											d="M83.478,367.304c-9.22,0-16.696,7.475-16.696,16.696c0,16.186,0,30.586,0,50.087h33.391c0-19.368,0-33.83,0-50.087
									C100.174,374.78,92.699,367.304,83.478,367.304z"
										/>
									</g>
								</g>
								<g>
									<g>
										<path
											d="M150.261,367.304c-9.22,0-16.696,7.475-16.696,16.696c0,16.186,0,30.586,0,50.087h33.391c0-19.368,0-33.83,0-50.087
									C166.957,374.78,159.481,367.304,150.261,367.304z"
										/>
									</g>
								</g>
								<g>
									<g>
										<path
											d="M283.826,267.13c-9.22,0-16.696,7.475-16.696,16.696c0,16.186,0,30.586,0,50.087h33.391c0-16.186,0-30.586,0-50.087
									C300.522,274.606,293.047,267.13,283.826,267.13z"
										/>
									</g>
								</g>
								<g>
									<g>
										<path
											d="M417.391,367.304c-9.22,0-16.696,7.475-16.696,16.696c0,19.368,0,33.83,0,50.087h33.391c0-16.186,0-30.586,0-50.087
									C434.087,374.78,426.612,367.304,417.391,367.304z"
										/>
									</g>
								</g>
								<g>
									<g>
										<path
											d="M510.237,309.75l-33.391-66.782c-2.827-5.656-8.608-9.229-14.933-9.229h-94.609v-16.696v-33.391
									c0-37.739-45.59-66.056-66.783-77.18v-39.69h16.696c9.22,0,16.696-7.475,16.696-16.696s-7.475-16.696-16.696-16.696h-16.696
									V16.696c0-9.22-7.475-16.696-16.696-16.696c-9.22,0-16.696,7.475-16.696,16.696v16.696h-16.696
									c-9.22,0-16.696,7.475-16.696,16.696s7.475,16.696,16.696,16.696h16.696v39.69c-21.192,11.124-66.783,39.441-66.783,77.18v33.391
									v1.928c-6.833-6.55-14.693-13.055-23.602-19.504c-16.613-12.025-33.091-21.106-43.18-26.257v-39.646h16.696
									c9.22,0,16.696-7.475,16.696-16.696s-7.475-16.696-16.696-16.696h-16.696V83.478c0-9.22-7.475-16.696-16.696-16.696
									s-16.696,7.475-16.696,16.696v16.696H83.478c-9.22,0-16.696,7.475-16.696,16.696s7.475,16.696,16.696,16.696h16.696v39.646
									c-10.09,5.151-26.568,14.231-43.181,26.257C19.176,226.843,0,255.225,0,283.826v33.391v178.087C0,504.525,7.475,512,16.696,512
									c50.847,0,411.977,0,467.478,0c9.22,0,16.696-7.475,16.696-16.696V332.95c3.536-1.251,6.607-3.671,8.637-6.956
									C512.549,321.072,512.825,314.926,510.237,309.75z M200.348,478.609H33.391V333.913h166.957V478.609z M200.348,300.522H33.391
									v-16.696c0-33.145,56.043-67.962,83.489-81.688c27.459,13.696,83.467,48.441,83.467,81.688V300.522z M333.913,478.609H233.739
									c0-4.774,0-241.115,0-244.87h100.174C333.913,237.615,333.913,473.947,333.913,478.609z M333.913,200.348H233.739v-16.696
									c0-15.998,27.8-36.783,50.086-48.247c22.297,11.471,50.088,32.252,50.088,48.247V200.348z M467.478,478.609H367.304V333.913
									h100.174V478.609z M367.304,300.522V267.13h84.29l16.696,33.391H367.304z"
										/>
									</g>
								</g>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/church.png?alt=media&token=cfbd4a26-264a-4b78-9283-fbe1acfcfb7e",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/church.png?alt=media&token=cfbd4a26-264a-4b78-9283-fbe1acfcfb7e",
							iconSize: [24, 24],
						}),
					},
					{
						name: "Mosque",
						svg: (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="#000000"
								height="24px"
								width="24px"
								className="fill-black dark:fill-white"
								viewBox="0 0 366.559 366.559">
								<g>
									<path d="M254.031,192.313h-2.761c-4.316-25.05-5.012-50.752-19.972-65.424c-14.656-14.37-33.821-18.816-46.536-30.446v-5.444   c1.165-0.558,1.977-1.738,1.977-3.113c0-1.375-0.812-2.557-1.977-3.114v-2.315c0.303-0.348,0.493-0.797,0.493-1.295   c0-1.093-1.977-6.725-1.977-6.725s-1.978,5.632-1.978,6.725c0,0.498,0.191,0.948,0.495,1.296v2.314   c-1.165,0.558-1.979,1.739-1.979,3.115c0,1.375,0.813,2.556,1.979,3.113v5.443c-12.717,11.63-31.882,16.077-46.536,30.446   c-14.961,14.672-15.655,40.374-19.972,65.424h-2.761l-4.748,12.262h151L254.031,192.313z" />
									<path d="M28.779,214.139v152.42h109.5v-81.615c0-19.889,44.998-32.922,44.998-32.922s45.002,13.033,45.002,32.922v81.615h109.5   v-152.42H28.779z" />
									<path d="M289.385,204.25h40.965v-50.418h3.867v-12.604h-7.734V92.242h7.734V79.638h-12.19V47.689   c0-5.862-4.149-10.753-9.669-11.902v-7.967c1.96-0.935,3.32-2.93,3.32-5.242s-1.361-4.307-3.32-5.242v-3.873   c0.51-0.583,0.83-1.338,0.83-2.175c0-1.834-3.321-11.29-3.321-11.29s-3.319,9.456-3.319,11.29c0,0.836,0.32,1.591,0.83,2.175v3.872   c-1.959,0.935-3.32,2.93-3.32,5.242s1.361,4.308,3.32,5.242v7.966c-5.52,1.149-9.669,6.039-9.669,11.902v31.948h-12.19v12.604   h7.734v48.986h-7.734v12.604h3.867V204.25z" />
									<path d="M36.208,204.25h40.965v-50.418h3.867v-12.604h-7.734V92.242h7.734V79.638H68.85V47.689c0-5.862-4.148-10.753-9.669-11.902   v-7.967c1.959-0.935,3.32-2.93,3.32-5.242s-1.361-4.307-3.32-5.242v-3.873c0.51-0.583,0.83-1.338,0.83-2.175   C60.011,9.456,56.689,0,56.689,0S53.37,9.456,53.37,11.29c0,0.836,0.32,1.591,0.83,2.175v3.872c-1.959,0.935-3.32,2.93-3.32,5.242   s1.361,4.308,3.32,5.242v7.966c-5.521,1.149-9.669,6.039-9.669,11.902v31.948h-12.19v12.604h7.734v48.986h-7.734v12.604h3.867   V204.25z" />
								</g>
							</svg>
						),
						uri: "https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/mosque.png?alt=media&token=8fcadd02-f063-4564-ab49-f549a98c9c15",
						icon: new L.Icon({
							iconUrl:
								"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/mosque.png?alt=media&token=8fcadd02-f063-4564-ab49-f549a98c9c15",
							iconSize: [24, 24],
						}),
					},
				],
			})
		}

		loadData()
	}, [])

	const [currentCategorySelected, setCurrentCategorySelected] = useState("")
	useEffect(() => {
		console.log(ctx.cumulativeVotes)
		// alertMessage(ctx.currentSubCategorySelected)
	}, [ctx.cumulativeVotes])
	function toggleBox(event, category = null) {
		if (category === null) {
			setDisp(false)
			setCurrentCategorySelected(null)
			return
		}
		setDisp(true)
		const data = event.target
		const value = data.classList.contains("last-button")
		const newAdjustedY = event.clientY - 150
		const adjustedY = event.clientY - 60
		setCurrentCategorySelected(category)
		value ? setLevel(`${newAdjustedY}px`) : setLevel(`${adjustedY}px`)
	}

	return (
		<div className="sm:flex-row w-full h-full bg-[#121212] flex items-center justify-evenly flex-col-reverse px-[20px] static">
			<div
				style={
					disp ? { display: "flex", top: level } : { display: "none" }
				}
				className="max-w-[350px] min-h-[14] h-max absolute top-[19%] left-[7%] z-30 rounded-[5px] bg-none flex items-center justify-center flex-row flex-wrap overflow-hidden">
				{currentCategorySelected &&
					categoryChild[currentCategorySelected].map(
						(child, index) => (
							<button
								onClick={() => {
									ctx.setCurrentSubCategorySelected(child)
								}}
								className="sm:min-w-[70px] sm:min-h-[70px] first-button hover:bg-[#302f35] sm:border-b-8px bg-[#1c1c1e]  w-[60px] h-[60px] text-white sm:border-b-[2px] sm:border-[#2a2a2c] flex items-center justify-evenly flex-col"
								key={index}>
								{child.svg}
								<div className="text-[12px]">{child.name}</div>
							</button>
						)
					)}
			</div>
			<div className="sm:flex-col  sm:translate-y-[45px] h-max w-max rounded-[5px] flex items-center justify-center flex-row overflow-hidden">
				{categoryChild &&
					Object.keys(categoryChild).map((category, index) => (
						<button
							key={index}
							onClick={(e) => {
								category != currentCategorySelected
									? toggleBox(e, category)
									: toggleBox(e, null)
							}}
							className="sm:w-[80px] sm:h-[80px] first-button hover:bg-[#302f35] sm:border-b-8px bg-[#1c1c1e]  w-[60px]  h-[60px] text-white sm:border-b-[2px] sm:border-[#2a2a2c] flex items-center justify-center">
							{categoryKey[category]}
						</button>
					))}
			</div>
			<div className="sm:h-[95%] w-[95%] h-[90%] rounded-[20px] overflow-hidden flex items-center justify-evenly flex-col ">
				<div className="h-[10%] w-[95%] rounded-[20px] flex items-center justify-center text-[40px] font-bold">
					<h2 className="font-roboto tracking-wide text-white">
						AFRI BUILD
					</h2>
				</div>
				<div className="h-[85%] w-[95%] bg-red-800 rounded-[20px] flex items-center justify-evenly flex-col relative z-10">
					<div className="h-[100vh] w-full overflow-hidden rounded-[7px] z-10">
						<DynamicLeaflet />
					</div>
				</div>
			</div>
		</div>
	)
}
