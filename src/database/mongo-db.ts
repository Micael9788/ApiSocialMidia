import mongoose from 'mongoose'
mongoose.set('strictQuery', true)

export async function mongoConnect () {

  if (!process.env.MONGO_URL) {
    throw new Error('MONGO_URL is required')
  }

  try {
    await mongoose.connect(
      process.env.MONGO_URL,
      { dbName: 'rede' }
    )
  } catch (error: any) {
    throw new Error(error.message)
  }
}
