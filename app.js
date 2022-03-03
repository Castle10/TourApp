const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());

app.use((req, res, next) => {
    console.log('Welcome to the middleware');
    next();
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// 1) Get all tours from db

const getAllTours = (req, res) => {
    res.status(200).json({
        status:"success",
        result: tours.length,
        data: {
            tours
        }

    })
}

// 2) Get one tour
const getTour = (req, res) => {
    console.log(req.params);

    const id = req.params.id *1;
    if(id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    const tour = tours.find(el => el.id === id)
    res.status(200).json({
        status:"success",
        data: {
            tour
        }

    })
}

// Create Tour
const createTour = (req, res) => {
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
const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length){
        res.status(404).json({
            status: "Page not found",
            message: "Invalid Page"
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour: "This is a simple testing data"
        }
    })
}

// 5) Delete Tour
const deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length){
        res.status(404).json({
            status: "Page not found",
            message: "Invalid Page"
        })
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
}

//routes
app.route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour)
app.route('/api/v1/tours/:id')
    .patch(updateTour)
    .get(getTour)
    .delete(deleteTour)


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
