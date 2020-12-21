const express = require('express');
const app = express();
const studentRoutes = express.Router();

// Require student model in our routes module
let Student = require('../models/student.model');

// Defined store route
studentRoutes.route('/add').post(function (req, res) {
    let student = new Student(req.body);
    student.save()
    .then(student => {
        res.status(200).json({'student': 'student in added successfully'});
    })
    .catch(err => {
        res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
studentRoutes.route('/').get(async function (req, res) {
    await Student.find(function (err, students){
        if(err){
            console.log(err);
        }
        else {
            res.json(students);
        }
    });
});

// Defined edit route
studentRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Student.findById(id, function (err, student){
        res.json(student);
    });
});

// Defined update route
studentRoutes.route('/update/:id').post(function (req, res, next) {
    Student.findById(req.params.id, function(err, student) {
        if (!student)
        return next(new Error('Could not load Document'));
        else {
            student.student_name = req.body.student_name;
            student.type_student_document = req.body.type_student_document;
            student.number_student_number = req.body.number_student_number;
            student.course = req.body.course;
            student.score = req.body.score;
            student.save()
            .then(student => {
                res.json('Update complete');
            })
            .catch(err => {
                res.status(400).send("Unable to update the database");
            });
        }
    });
});

// Defined delete | remove | destroy route
studentRoutes.route('/delete/:id').delete(function (req, res) {
    Student.findByIdAndRemove(req.params.id, function(err, student){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

studentRoutes.route('/average/:course').get(function (req, res){
    Student.find({"course": req.params.course}, function (err,students){
        if(err){
            console.log(err);
        }
        else{
            let totalScore = 0;
            let quantity = students.length;
            for(let stud of students){
                totalScore += stud.score;
            }
            res.json(totalScore/quantity);
        }
    })
})

studentRoutes.route('/approx/:course').get(function (req, res){
    Student.find({"course": req.params.course}, function (err, students){
        if(err){
            console.log(err);
        }
        else{
            let studentUpdated = [];
            for(let stud of students){
                if(stud.score >= 2.95 & stud.score <= 2.99){
                    stud.score = 3;
                    stud.save()
                    .then(student => { console.log("Was updated the score to 3 for the student ", stud.student_name) })
                    .catch(err => { console.log(err) });
                    studentUpdated.push(stud);
                }
            }
            res.json(studentUpdated);
        }
    })
})

module.exports = studentRoutes;