"use client"

const Overview = () => {
	const dataObject = {
		name: "India",
		details: "Info",
		latlng: [1, 1],
		vote: "10",
	}
	return (
		<div className="h-full w-full bg-black flex justify-center py-[40px] overflow-x-hidden">
			<table className="w-[98%] max-h-[88%] bg-[#202024] text-white rounded-[15px] font-roboto font-thin text-[20px] overflow-auto">
				<thead className="border-b-white border-b-[2px] rounded-t-[20px] h-[10%] bg-[#36363a]">
					<tr className="py-[10px]">
						<th>Name</th>
						<th>Details</th>
						<th>Vote</th>
					</tr>
				</thead>
				<tbody className="border-b-[#202024] border-b-[3px] h-max ">
					<tr
						//
						className="border-b-[#36363a] border-b-[1px] h-[15px]">
						<th className="py-[10px] font-thin font-thin">
							{dataObject.name}
						</th>
						<th className="font-thin">{dataObject.details}</th>
						<th className="font-thin">{dataObject.vote}</th>
					</tr>
					<tr className="border-b-[#36363a] border-b-[1px] h-[15px]">
						<th className="py-[10px] font-thin">
							{dataObject.name}
						</th>
						<th className="font-thin">{dataObject.details}</th>
						<th className="font-thin">{dataObject.vote}</th>
					</tr>
					<tr className="border-b-[#36363a] border-b-[1px] h-[15px]">
						<th className="py-[10px] font-thin">
							{dataObject.name}
						</th>
						<th className="font-thin">{dataObject.details}</th>
						<th className="font-thin">{dataObject.vote}</th>
					</tr>
					<tr className="border-b-[#36363a] border-b-[1px] h-[15px]">
						<th className="py-[10px] font-thin">
							{dataObject.name}
						</th>
						<th className="font-thin">{dataObject.details}</th>
						<th className="font-thin">{dataObject.vote}</th>
					</tr>
					<tr className="border-b-[#36363a] border-b-[1px] h-[5%]">
						<th className="py-[10px] font-thin">
							{dataObject.name}
						</th>
						<th className="font-thin">{dataObject.details}</th>
						<th className="font-thin">{dataObject.vote}</th>
					</tr>
					<tr className="border-b-[#36363a] border-b-[1px] h-[5%]">
						<th className="py-[10px] font-thin">
							{dataObject.name}
						</th>
						<th className="font-thin">{dataObject.details}</th>
						<th className="font-thin">{dataObject.vote}</th>
					</tr>
					<tr className="border-b-[#36363a] border-b-[1px] h-[15px]">
						<th className="py-[10px] font-thin">
							{dataObject.name}
						</th>
						<th className="font-thin">{dataObject.details}</th>
						<th className="font-thin">{dataObject.vote}</th>
					</tr>
					<tr className="border-b-[#36363a] border-b-[1px] h-[5%]">
						<th className="py-[10px] font-thin">
							{dataObject.name}
						</th>
						<th className="font-thin">{dataObject.details}</th>
						<th className="font-thin">{dataObject.vote}</th>
					</tr>
					<tr className="border-b-[#36363a] border-b-[1px] h-[5%]">
						<th className="py-[10px] font-thin">
							{dataObject.name}
						</th>
						<th className="font-thin">{dataObject.details}</th>
						<th className="font-thin">{dataObject.vote}</th>
					</tr>
					<tr className="border-b-[#36363a] border-b-[1px] h-[15px]">
						<th className="py-[10px] font-thin">
							{dataObject.name}
						</th>
						<th className="font-thin">{dataObject.details}</th>
						<th className="font-thin">{dataObject.vote}</th>
					</tr>
					<tr className="border-b-[#36363a] border-b-[1px] h-[5%]">
						<th className="py-[10px] font-thin">
							{dataObject.name}
						</th>
						<th className="font-thin">{dataObject.details}</th>
						<th className="font-thin">{dataObject.vote}</th>
					</tr>
					<tr className="border-b-[#36363a] border-b-[1px] h-[5%]">
						<th className="py-[10px] font-thin">
							{dataObject.name}
						</th>
						<th className="font-thin">{dataObject.details}</th>
						<th className="font-thin">{dataObject.vote}</th>
					</tr>
					<tr className="border-b-[#36363a] border-b-[1px] h-[5%]">
						<th className="py-[10px] font-thin">
							{dataObject.name}
						</th>
						<th className="font-thin">{dataObject.details}</th>
						<th className="font-thin">{dataObject.vote}</th>
					</tr>
					<tr className="border-b-[#36363a] border-b-[1px] h-[5%]">
						<th className="py-[10px] font-thin">
							{dataObject.name}
						</th>
						<th className="font-thin">{dataObject.details}</th>
						<th className="font-thin">{dataObject.vote}</th>
					</tr>
					<tr className="border-b-[#36363a] border-b-[1px] h-[5%]">
						<th className="py-[10px] font-thin">
							{dataObject.name}
						</th>
						<th className="font-thin">{dataObject.details}</th>
						<th className="font-thin">{dataObject.vote}</th>
					</tr>
					<tr className="border-b-[#36363a] border-b-[1px] h-[5%]">
						<th className="py-[10px] font-thin">
							{dataObject.name}
						</th>
						<th className="font-thin">{dataObject.details}</th>
						<th className="font-thin">{dataObject.vote}</th>
					</tr>
					<tr className="border-b-[#36363a] border-b-[1px] h-[5%]">
						<th className="py-[10px] font-thin">
							{dataObject.name}
						</th>
						<th className="font-thin">{dataObject.details}</th>
						<th className="font-thin">{dataObject.vote}</th>
					</tr>
					<tr className="border-b-[#36363a] border-b-[1px] h-[5%]">
						<th className="py-[10px] font-thin">
							{dataObject.name}
						</th>
						<th className="font-thin">{dataObject.details}</th>
						<th className="font-thin">{dataObject.vote}</th>
					</tr>
					<tr className="border-b-[#36363a] border-b-[1px] h-[5%]">
						<th className="py-[10px] font-thin">
							{dataObject.name}
						</th>
						<th className="font-thin">{dataObject.details}</th>
						<th className="font-thin">{dataObject.vote}</th>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default Overview
