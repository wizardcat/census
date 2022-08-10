import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import express from 'express'
// import { region } from "./mock";
const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(cors())

// app.post(`/add_regions`, async (req, res) => {
//     const { id, parentId, name } = req.body



//     const result = await prisma.region.create({
//         data: {

//         },
//     })

//     res.json(result)
// })

app.get('/regions', async (req, res) => {
    const regions = await prisma.region.findMany({
        where: { id: { in: [1420, 1600] } },
    })
    res.json(regions)
})

app.get(`/census/:id`, async (req, res) => {

    const { id } = req.params
    const census = await prisma.census.findMany({
        select: {
            id: true,
            males: true,
            females: true,
            lang: {
                select: {
                    name: true
                }

            },
            langGroup: {
                select: {
                    name: true
                }

            }
        },

        where: {
            regionId: Number(id),
        }
    })


    res.json(census)
})


const server = app.listen(3001, () =>
    console.log(
        '🚀 Server ready at: http://localhost:3001',
    ),
)