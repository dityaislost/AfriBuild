const { MongoClient, ServerApiVersion } = require("mongodb")
const uri =
	"mongodb+srv://afribuild:JYcbhS70QH9gNmzA@cluster0.mn9yerk.mongodb.net/?retryWrites=true&w=majority&appName=cluster0"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
})

async function run() {
	try {
		// Connect the client to the server	(optional starting in v4.7)
		await client.connect()
		// Send a ping to confirm a successful connection
		await client.db("admin").command({ ping: 1 })
		console.log(
			"Pinged your deployment. You successfully connected to MongoDB!"
		)
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close()
	}
}
export async function GET(req, res) {
	async function fetchDataFromMongoDB() {
		try {
			var personalVotesData, cumulativeVotesData
			await client.connect()
			const db = client.db("votes")

			const cumulativeVotesCollection = db.collection("cumulativeVotes")
			const personalVotesCollection = db.collection("personalVotes")

			// Fetch cumulativeVotes data
			cumulativeVotesData = await cumulativeVotesCollection
				.find()
				.toArray()
			console.log("Cumulative votes fetched:", cumulativeVotesData)

			// Fetch personalVotes data
			personalVotesData = await personalVotesCollection.find().toArray()
			console.log("Personal votes fetched:", personalVotesData)
			return {
				cumulativeVotesData,
				personalVotesData,
			}
		} catch (error) {
			console.error("Error fetching data from MongoDB:", error)
		} finally {
			await client.close()
			console.log("MongoDB connection closed")
		}
	}
	var { cumulativeVotesData, personalVotesData } =
		await fetchDataFromMongoDB()
	return Response.json({
		cumulativeVotesData,
		personalVotesData,
	})
	return Response.json({ get: false })
	// console.log({
	// 	personalVotes: personalVotesData,
	// 	cumulativeVotes: cumulativeVotesData,
	// })
}
export async function POST(req, res) {
	const data = await req.json()
	console.log(data)
	// const data2 = await JSON.parse(data)
	// if (res.cumulativeVote.length === 0) {
	// 	return Response.json({ post: false })
	// }
	await run()

	async function saveDataToMongoDB() {
		await client.connect()
		const db = client.db("votes")

		const cumulativeVotesCollection = db.collection("cumulativeVotes")
		const personalVotesCollection = db.collection("personalVotes")

		try {
			await cumulativeVotesCollection.insertMany(data.cumulativeVotes)
			console.log("Cumulative votes saved successfully")
			await personalVotesCollection.insertMany(data.personalVotes)
			console.log("Personal votes saved successfully")
		} catch (error) {
			console.error("Error saving data to MongoDB:", error)
		}
	}
	await client.close()
	await saveDataToMongoDB()

	// run().catch(console.dir)
	// const searchParams = req.nextUrl.searchParams;
	// var id = searchParams.get("query");
	return Response.json({ post: true })
}
