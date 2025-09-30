import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getVehicleTypes = async (req, res) => {
    try {
        const { wheels } = req.query;
        if(!wheels){
            return res.status(400).json({ error: 'Wheels parameter is required' });
        }

        const noOfWheels = parseInt(wheels);
        if(noOfWheels !== 2 && noOfWheels !== 4){
            return res.status(400).json({ error: 'Wheels parameter must be 2 or 4' });
        }
        const vehicleTypes = await prisma.vehicleType.findMany({
            where: {
                wheels: noOfWheels
            },
            select: {
                id: true,
                name: true,
                wheels: true
            },
            orderBy: {
                name : 'asc'
            }
        });
        res.json(vehicleTypes);


    } catch (error) {
        console.error('Error fetching vehicle types:', error);
        res.status(500).json({ 
            error: 'Failed to fetch vehicle types', message: error.message 
        });
        
    }
}


const getVehiclesByType = async (req, res) => {
    try {
        const { typeId } = req.query;
        if(!typeId){
            return res.status(400).json({ error: 'typeId parameter is required' });
        }

        const vehicles = await prisma.vehicle.findMany({
            where: {
                vehicleTypeId: parseInt(typeId)
            },
            select: {
                id: true,
                model: true,
                vehicleType: {
                    select: {
                        name: true,
                        wheels: true
                    }
                }
            },
            orderBy: {
                model : 'asc'
            }
        })
        res.json(vehicles);
    } catch (error) {
        console.error('Error fetching vehicle ', error);
        res.status(500).json({ 
            error: 'Failed to fetch vehicle ', message: error.message 
        });
    }
}

export {
    getVehicleTypes,
    getVehiclesByType
}