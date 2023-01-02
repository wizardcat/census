import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import express, { Application } from 'express'
import { regionsRoute, censusRoute, importData } from './routes'
// import axios from 'axios'
// import * as cheerio from 'cheerio'
// import * as iconv from 'iconv-lite'

// import { Region, LanguageGroup, Language, CensusRecord } from './types'
// import { SOURCE_URL_EN, SOURCE_URL_RU } from '../../client/src/config'
// import { region } from "./mock";

const prisma = new PrismaClient()
const app: Application = express();

app.use(express.json())
app.use(cors())

// grabCensusData()

// app.get('/import',async (req,res)=>{
// const html =await app.get(url+'0') 
// })

// app.post(`/add_regions`, async (req, res) => {
//     const { id, parentId, name } = req.body


app.use('/:lang/regions', regionsRoute)
app.use(`/:lang/census`, censusRoute)
app.use(`/extractData`, importData)

const server = app.listen(3001, () =>
    console.log(
        '🚀 Server ready at: http://localhost:3001',
    ),
)