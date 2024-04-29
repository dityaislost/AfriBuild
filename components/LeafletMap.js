// components/LeafletMap.js
"use client"

import "leaflet/dist/leaflet.css"
import React, {
	useEffect,
	useRef,
	useState,
	useContext,
	useCallback,
} from "react"
import {
	MapContainer,
	TileLayer,
	useMap,
	Marker,
	Popup,
	useMapEvents,
} from "react-leaflet"
import { StateContext } from "../contexts/StateContext"
import { Icon } from "leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import cities from "cities.json"
import { useNotification } from "../components/ui/NotificationProvider.js"

function FlyToLocation({ latlng }) {
	const map = useMapEvents({})
	useEffect(() => {
		if (latlng) {
			map.flyTo(latlng, 11)
		}
	}, [latlng, map])
}
function LocationMarker() {
	const ctx = useContext(StateContext)

	const map = useMapEvents({
		locationfound(e) {
			ctx.setPosition(e.latlng)
			map.flyTo(e.latlng, 11)
		},
	})
	useEffect(() => {
		map.locate() // Trigger location detection when component mounts
	}, [map])

	useEffect(() => {
		setTimeout(() => {
			ctx.setLocate(false)
		}, 1000)
	}, [ctx.position])
}
const LocationFinderDummy = () => {
	const ctx = useContext(StateContext)
	const map = useMapEvents({
		click(e) {
			ctx.setClickedLocation({ lat: e.latlng.lat, lng: e.latlng.lng })
		},
	})
	return null
}
function jaccardSimilarity(str1, str2) {
	const set1 = new Set(str1.toLowerCase())
	const set2 = new Set(str2.toLowerCase())
	const intersection = new Set([...set1].filter((x) => set2.has(x)))
	const union = new Set([...set1, ...set2])
	return intersection.size / union.size
}
const africanCountryCodes = [
	"DZ",
	"AO",
	"BJ",
	"BW",
	"BF",
	"BI",
	"CV",
	"CM",
	"CF",
	"TD",
	"KM",
	"CG",
	"CD",
	"DJ",
	"EG",
	"GQ",
	"ER",
	"SZ",
	"ET",
	"GA",
	"GM",
	"GH",
	"GN",
	"GW",
	"CI",
	"KE",
	"LS",
	"LR",
	"LY",
	"MG",
	"MW",
	"ML",
	"MR",
	"MU",
	"MA",
	"MZ",
	"NA",
	"NE",
	"NG",
	"RW",
	"ST",
	"SN",
	"SC",
	"SL",
	"SO",
	"ZA",
	"SS",
	"SD",
	"TZ",
	"TG",
	"TN",
	"UG",
	"ZM",
	"ZW",
]
function searchSimilarCities(searchWord, threshold = 0.9) {
	const similarCities = cities
		.filter((city) => {
			return (
				africanCountryCodes.includes(city.country) &&
				jaccardSimilarity(searchWord, city.name) >= threshold
			)
		})
		.map((city) => ({ ...city, id: crypto.randomUUID() }))

	return similarCities
}
const LeafletMap = () => {
	const { alertMessage } = useNotification()

	const ctx = useContext(StateContext)

	const [timeoutId, setTimeoutId] = useState(null)
	const [markers, setMarkers] = useState([])
	const [flyLatLng, setFlyLatLng] = useState([])
	const [search, setSearch] = useState("")
	const [searchResults, setSearchResults] = useState([])

	useEffect(() => {
		if (ctx.clickedLocation) {
			for (let index = 0; index < markers.length; index++) {
				const m = markers[index]
				if (
					m.geocode[0] === ctx.clickedLocation.lat &&
					m.geocode[1] === ctx.clickedLocation.lng
				) {
					alertMessage("Already Placed")
				}
			}
			ctx.currentSubCategorySelected
				? setMarkers((prev) => [
						...prev,
						{
							geocode: [
								ctx.clickedLocation.lat,
								ctx.clickedLocation.lng,
							],
							popUp: ctx.currentSubCategorySelected.name,
							votes: 0,
							icon:
								ctx.currentSubCategorySelected.icon ||
								new Icon({
									iconUrl:
										"https://firebasestorage.googleapis.com/v0/b/afribuild-aff4e.appspot.com/o/25613.png?alt=media&token=99add968-1438-43f1-a5d4-a06ca5c76d61",
									iconSize: [24, 24],
								}),
						},
				  ])
				: alertMessage("Select First")
		}
	}, [ctx.clickedLocation])

	useEffect(() => {
		clearTimeout(timeoutId)
		setSearchResults([])
		setTimeoutId(
			setTimeout(() => {
				if (search.length > 0) {
					var similarCities = searchSimilarCities(search)
					setSearchResults(similarCities)
				}
			}, 1000)
		)
		return () => {
			clearTimeout(timeoutId)
		}
	}, [search])

	function handleVote(markerIndex, vote) {
		if (vote) {
			if (ctx.personalVotes.includes(markers[markerIndex].geocode)) {
				alertMessage("Already Voted")
				return
			}
			setMarkers(
				markers.map((m, i) =>
					i === markerIndex
						? {
								popUp: m.popUp,
								votes: m.votes + 1,
								geocode: m.geocode,
						  }
						: m
				)
			)
			ctx.setPersonalVotes((prev) => [
				...prev,
				markers[markerIndex].geocode,
			])
			ctx.setCumulativeVotes((prev) => {
				if (prev[JSON.stringify(markers[markerIndex].geocode)]) {
					return {
						...prev,
						[JSON.stringify(markers[markerIndex].geocode)]: {
							info: {
								name: ctx.currentSubCategorySelected.name,
								uri: ctx.currentSubCategorySelected.uri,
							},
							vote:
								prev[
									[
										JSON.stringify(
											markers[markerIndex].geocode
										),
									]
								].vote + 1,
							latlng: markers[markerIndex].geocode,
						},
					}
				} else {
					// If the geocode doesn't exist, add it with an empty string value
					return {
						...prev,
						[JSON.stringify(markers[markerIndex].geocode)]: {
							info: {
								name: ctx.currentSubCategorySelected.name,
								uri: ctx.currentSubCategorySelected.uri,
							},
							vote: 1,
							latlng: markers[markerIndex].geocode,
						},
					}
				}
			})
		} else {
			if (!ctx.personalVotes.includes(markers[markerIndex].geocode)) {
				alertMessage("Never Voted")
				return
			}
			setMarkers(
				markers.map((m, i) =>
					i === markerIndex
						? {
								popUp: m.popUp,
								votes: m.votes - 1,
								geocode: m.geocode,
						  }
						: m
				)
			)
			ctx.setPersonalVotes((prevPersonalVotes) =>
				prevPersonalVotes.filter(
					(geocode) => geocode !== markers[markerIndex].geocode
				)
			)
			ctx.setCumulativeVotes((prev) => {
				if (prev[JSON.stringify(markers[markerIndex].geocode)]) {
					return {
						...prev,
						[JSON.stringify(markers[markerIndex].geocode)]: {
							info: {
								name: ctx.currentSubCategorySelected.name,
								uri: ctx.currentSubCategorySelected.uri,
							},
							vote:
								prev[
									[
										JSON.stringify(
											markers[markerIndex].geocode
										),
									]
								].vote - 1,
							latlng: markers[markerIndex].geocode,
						},
					}
				} else {
					// If the geocode doesn't exist, add it with an empty string value
					return {
						...prev,
						[JSON.stringify(markers[markerIndex].geocode)]: {
							info: {
								name: ctx.currentSubCategorySelected.name,
								uri: ctx.currentSubCategorySelected.uri,
							},
							vote: 0,
							latlng: markers[markerIndex].geocode,
						},
					}
				}
			})
		}
	}

	return (
		<>
			<div className="flex items-center justify-start flex-col z-[20] w-[200px] h-[40px] absolute bg-white dark:bg-[#181918] top-[5px] right-[5px] rounded-[10px] text-white text-[15px] px-[10px] py-[5px] font-semibold">
				<div className="h-full w-full flex items-center justify-evenly py-[5px] ">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24"
						viewBox="0 -960 960 960"
						width="24"
						fill="white">
						<path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
					</svg>
					<input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search"
						className="z-[20] w-full h-full bg-transparent top-[5px] right-[5px] text-white text-[15px] font-semibold outline-none"
						type="text"></input>
				</div>
				<div
					style={
						searchResults.length > 0
							? { padding: "5px" }
							: { padding: "0" }
					}
					className="bg-[#181918] w-full h-max  flex flex-col items-center justify-center rounded-b-[10px] ">
					{search &&
						searchResults.map((searchResult) => (
							<button
								onClick={() => {
									setFlyLatLng([
										searchResult.lat,
										searchResult.lng,
									])
								}}
								key={searchResult.id}
								className="hover:bg-[#302f35] border-b-8px bg-white dark:bg-[#181918] w-full h-full text-white border-b-[2px] border-[#2a2a2c] flex items-center justify-center py-2">
								{searchResult.name +
									" • " +
									searchResult.country}
							</button>
						))}
					{/* <button className="hover:bg-[#302f35] border-b-8px bg-white dark:bg-[#181918] w-full h-full text-white border-b-[2px] border-[#2a2a2c] flex items-center justify-center py-2">
						Juba
					</button> */}
				</div>
			</div>
			<button
				onClick={() => {
					ctx.setLocate(true)
				}}
				className="z-[20] w-max h-max absolute bg-white dark:bg-[#181918] bottom-[5px] right-[5px] rounded-[7px] text-white text-[15px] py-[5px] px-[10px] font-semibold border-2 border-black">
				Locate Me
			</button>
			<MapContainer
				center={[-10, 30]}
				zoom={3.4}
				className="h-[100vh] w-[90vw] z-10"
				scrollWheelZoom={true}
				minZoom={3.4}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<MarkerClusterGroup>
					{markers &&
						markers.map((marker, i) => (
							<Marker
								key={i}
								position={marker.geocode}
								icon={marker.icon}>
								<Popup>
									<div className="text-center p-2">
										{marker.popUp} : {marker.votes}
									</div>
									<div className="flex items-center justify-evenly gap-2">
										<button
											onClick={() => handleVote(i, true)}
											className="z-[20] w-max h-max bg-white dark:bg-[#181918] rounded-[7px] text-white text-[12px] py-[5px] px-[10px] font-semibold border-2 border-black">
											Vote In
										</button>
										<button
											onClick={() => handleVote(i, false)}
											className="z-[20] w-max h-max bg-white dark:bg-[#181918] rounded-[7px] text-white text-[12px] py-[5px] px-[10px] font-semibold border-2 border-black">
											Vote Out
										</button>
									</div>
								</Popup>
							</Marker>
						))}
				</MarkerClusterGroup>
				<LocationFinderDummy />
				<FlyToLocation
					latlng={flyLatLng.length > 0 ? flyLatLng : null}
				/>

				{ctx.locate && <LocationMarker></LocationMarker>}
			</MapContainer>
		</>
	)
}

export default LeafletMap
