import mongoose from 'mongoose'

let isConnected = false

export default async function connectToDB() {
  mongoose.set('strictQuery', true)

  if (isConnected) {
    console.log('MongoDB is already conected')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error)
  }
}
