import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    const newCensus = await prisma.census.create({
        data: {
            males: 0,
            females: 0,
            langGroup: {
                create: {
                    name: ''
                }
            }


        },
    })

    // const newLink = await prisma.langGroup.create({
    //     data: {
    //         name: ''
    //     },
    // })

    // const allLangGroups = await prisma.langGroup.findMany();

}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

