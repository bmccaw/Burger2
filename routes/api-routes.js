const db = require('../models');

module.exports = function (app) {

    app.get("/", function (req, res) {
        db.Burger.findAll({}).then(function(data) {

            res.render("index", { burgers: data });
        })
        });

    app.post("/burgers", function (req, res) {
        const newBurg = req.body.burger_name;
        const devoured = false;
        db.Burger.create({
            burger_name: newBurg,
            devoured: devoured
        }).then(function(burger) {
        res.redirect('/');
        })
    });


    app.put("/burgers/:id", function (req, res) {
        var condition = req.params.id;

        console.log('Condition is' + condition);

        db.Burger.update({
            devoured: true
        }, {
                where: {
                    id: condition
                }
            }).then(function(data){

        res.redirect('/');
            })
    });


}