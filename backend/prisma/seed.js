import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log('Starting seed...');

    // Clearing existing data 
    await prisma.booking.deleteMany();
    await prisma.vehicle.deleteMany();
    await prisma.vehicleType.deleteMany();

    // Vehicle Types - 3 car types (4 wheels)
    const hatchback = await prisma.vehicleType.create({
        data: { name: 'Hatchback', wheels: 4 },
    });

    const suv = await prisma.vehicleType.create({
        data: { name: 'SUV', wheels: 4 },
    });

    const sedan = await prisma.vehicleType.create({
        data: { name: 'Sedan', wheels: 4 },
    });

    // Seed Vehicle Types - 1 bike type (2 wheels)
    const cruiser = await prisma.vehicleType.create({
        data: { name: 'Cruiser', wheels: 2 },
    });

    const sports = await prisma.vehicleType.create({
        data: { name: 'Sports', wheels: 2 },
    });

    console.log('Vehicle types created');

    // Seed Vehicles for each type
    // Hatchback vehicles
    await prisma.vehicle.createMany({
        data: [
        { model: 'Maruti Swift', vehicleTypeId: hatchback.id },
        { model: 'Hyundai i20', vehicleTypeId: hatchback.id },
        { model: 'Tata Altroz', vehicleTypeId: hatchback.id },
        ],
    });

    // SUV vehicles
    await prisma.vehicle.createMany({
        data: [
        { model: 'Mahindra Scorpio', vehicleTypeId: suv.id },
        { model: 'Hyundai Creta', vehicleTypeId: suv.id },
        { model: 'Tata Harrier', vehicleTypeId: suv.id },
        ],
    });

    // Sedan vehicles
    await prisma.vehicle.createMany({
        data: [
        { model: 'Honda City', vehicleTypeId: sedan.id },
        { model: 'Hyundai Verna', vehicleTypeId: sedan.id },
        { model: 'Maruti Ciaz', vehicleTypeId: sedan.id },
        ],
    });

    // Cruiser bikes
    await prisma.vehicle.createMany({
        data: [
        { model: 'Royal Enfield Classic 350', vehicleTypeId: cruiser.id },
        { model: 'Bajaj Avenger', vehicleTypeId: cruiser.id },
        { model: 'Harley Davidson Street 750', vehicleTypeId: cruiser.id },
        ],
    });

    // Sports bikes
    await prisma.vehicle.createMany({
        data: [
        { model: 'Yamaha R15', vehicleTypeId: sports.id },
        { model: 'KTM Duke 390', vehicleTypeId: sports.id },
        { model: 'Kawasaki Ninja 300', vehicleTypeId: sports.id },
        ],
    });

    console.log('Vehicles created');
    
    const vehicleCount = await prisma.vehicle.count();
    const typeCount = await prisma.vehicleType.count();
    
    console.log(`Seed completed: ${typeCount} vehicle types, ${vehicleCount} vehicles`);
    }

    main()
    .catch((e) => {
        console.error('Error during seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });