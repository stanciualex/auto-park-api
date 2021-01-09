import * as passwordHash from "password-hash";

const carRepo = require('./src/repositories/carRepo');
const userRepo = require('./src/repositories/userRepo');

const generateDate = (startYear, endYear) => {
    const startDate = new Date(null);
    const endDate = new Date(null);
    startDate.setFullYear(startYear);
    endDate.setFullYear(endYear);
    const start = startDate.getTime();
    const end = endDate.getTime();

    return start + Math.random() * (end - start);
};

const generateVIN = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 17; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const generateEngine = () => {
    const engines = ['1.9 TDI', '2.0 TDI', '1.6 TDCI', '1.4 MPI', '1.0 EcoBoost', '3.0 TDI V6', '1.6 16v'];
    const index = Math.floor(Math.random() * engines.length);
    return engines[index];
};

const generateColor = () => {
    const colors = ['blue', 'black', 'white', 'red', 'green', 'yellow', 'grey', 'dark grey', 'dark red'];
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
};

const generateLicencePlate = () => {
    const num = Math.floor(Math.random() * 100, 2);
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lettersCombination = '';
    for (let i = 0; i < 3; i++ ) {
        lettersCombination += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    return `CJ ${num < 10 ? `0${num}` : num} ${lettersCombination}`;
};

const populateCars = () => {
    console.log('[CARS] Start creating cars...');
    const cars = [{
        manufacturer: 'Audi',
        models: ['A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q3', 'Q5', 'Q7', 'Q8', 'TT', 'R8'],
    }, {
        manufacturer: 'BMW',
        models: ['3 Series', '5 Series', '7 Series', 'X3', 'X5', 'X6', 'X7']
    }, {
        manufacturer: 'Mercedes-Benz',
        models: ['C Class', 'E Class', 'Sprinter'],
    }, {
        manufacturer: 'Dacia',
        models: ['Logan', 'Sandero', 'Duster'],
    }, {
        manufacturer: 'Ford',
        models: ['Focus', 'Fiesta', 'Mondeo', 'Transit'],
    }, {
        manufacturer: 'Opel',
        models: ['Astra', 'Insignia', 'Corsa']
    }, {
        manufacturer: 'Renault',
        models: ['Megane', 'Talisman']
    }, {
        manufacturer: 'Volkswagen',
        models: ['Golf', 'Polo', 'Passat', 'Transporter'],
    }];

    cars.forEach((item) => {
        const { manufacturer, models } = item;

        models.forEach((model) => {
            const inputData = {
                vin: generateVIN(),
                manufacturer,
                model,
                engine: generateEngine(),
                color: generateColor(),
                licencePlate: generateLicencePlate(),
                fabricationDate: generateDate(2002, 2020),
                insuranceValability: generateDate(2020, 2022),
                itpValability: generateDate(2020, 2022),
                nextService: generateDate(2020, 2022),
            };

            carRepo.create(inputData);
        });
    })

    console.log('[CARS] Done creating cars...');
};

const populateUsers = () => {
    const hashedPassword = passwordHash.generate('asdf1234A');

    userRepo.create({
        email: 'admin@admin.com',
        password: hashedPassword,
        role: 'admin',
    });

    userRepo.create({
        email: 'user@user.com',
        password: hashedPassword,
        role: 'user',
    });
};

const populateTables = () => {
    console.log('Start creating default data...');
    populateCars();
    populateUsers();
    console.log('Done creating default data...');
    console.log('Press CTRL + C to exit');
};

populateTables();
