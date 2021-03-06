const fs = require('fs');

exports.checkID = (req, res, next, val) => {
    console.log(`The Tour ID is: ${val}`); 
    if (req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        });
    }
    next();
}; 

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price){
        return res.status(400).json({
            status: 'Fail',
            message: 'Missing Name or Price'
        });
    }
    next();
};
// 1) Get all tours from db
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
exports.getAllTours = (req, res) => {
    res.status(200).json({
        status:"success",
        result: tours.length,
        data: {
            tours
        }
    })
}

// 2) Get one tour
exports.getTour = (req, res) => {
    const id = req.params.id *1;
    const tour = tours.find(el => el.id === id);
    res.status(200).json({
        status:"success",
        data: {
            tour
        }

    });
};

// Create Tour
exports.createTour = (req, res) => {
    const newID = tours[tours.length-1].id + 1;
    const newTours = Object.assign({id: newID}, req.body);

    tours.push(newTours);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "success",
            data: {
                newTours
            }
        });
    })
}

// 4) Update one Tour
exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: "This is a simple testing data"
        }
    })
}

// 5) Delete Tour
exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    })
}

