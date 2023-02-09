const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const AppError = require('./AppError');


async function readFile(fileName) {
    try {
        const fileData = await fsPromises.readFile(path.join(__dirname, '..', 'data', fileName), 'utf8');
        if(!fileData) throw new AppError ('Something went wrong while reading the file.', 500)
        // If the file is empty we init it with empty array;
        return fileData ? JSON.parse(fileData) : [];
    } catch(err) {
        if(err instanceof AppError) {
            throw err
        } else {
            throw new AppError('Cannot proceed your request due to server error.', 500)
        }
    }
}

async function updateFile(fileName, data) {
    try {
        await fsPromises.writeFile(path.join(__dirname, '..', 'data', fileName), JSON.stringify(data, null, 4), 'utf8', err => {
            if (err) {
                console.log(`Error writing file: ${err}`)
                if(err) throw new AppError('Cannot complete this request', 500);
            }
        })
    } catch(err) {
        if(err instanceof AppError) {
            throw err
        } else {
            throw new AppError('Cannot update the locale json due to server issues', 500)
        }
    }
}

async function checkFile(fileName) {
    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'data', fileName))) {
            await fsPromises.writeFile(path.join(__dirname, '..', 'data', fileName), '', 'utf8', (err) => {
                if(err) throw new AppError('Cannot complete this request', 500);
            });
            await updateFile(fileName, [])
        }
    } catch(err) {
        if(err instanceof AppError) {
            throw err
        } else {
            throw new AppError('Cannot compete this request', 500)
        }
    }
}


async function logger (newObject, logFileName) {
    try {
        // Checking if the file exists
        await checkFile(logFileName);

        // Get data from file
        const data = await readFile(logFileName)

        //Pushing new registered user
        data.push(newObject)

        //Updating the JSON 
        await updateFile(logFileName, data)
    } catch(err) {
        if(err instanceof AppError) {
            throw err
        } else {
            console.log({ err })
            throw new AppError('Oops Something went wrong while updating the locale json file', 500)
        }
    }
}

module.exports = { logger, readFile, updateFile, checkFile }