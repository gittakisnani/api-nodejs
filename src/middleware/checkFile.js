const { checkFile } = require("../utils/fs")

const fileExist = (fileName) => async (req, res, next) => {
    try {
        // if(['vehicles', 'drivers', 'trips', 'colors'].some(path => req.url.includes(path))) {
        await checkFile(fileName)
        // }
        next()
    } catch(err) {
        next(err)
    }
}

module.exports = fileExist
