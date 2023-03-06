const fs = require("fs");
const path = require("path");

const db = require("../database/models");

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController =
  // controllers to render pages
  {
    home: (req, res) => {
      db.doctor
        .findAll({ include: [{ association: "areas" }] })
        .then((doctors) => {
          let lists = [];

          for (oneDoctor of doctors) {
            let expertise = [];
            //console.log([oneDoctor.areas.getDataValue('area_expertise')])
            for (expertisss of [
              oneDoctor.areas.getDataValue("area_expertise"),
            ]) {
              expertise.push(expertisss);
            }
            let oneDoc = {
              id: oneDoctor.id,
              name: oneDoctor.name,
              city: oneDoctor.city,
              phone: oneDoctor.phone,
              birthdate: oneDoctor.birthdate,
              email: oneDoctor.email,
              expertise: expertise,
              image: oneDoctor.image,
            };
            //console.log(oneDoc)
            lists.push(oneDoc);
          }

          res.render("home", { d: lists });
        });
    },
    appointment: (req, res) => {
      db.doctor
        .findOne({
          where: { id: req.params.id },
          include: [{ association: "areas" }],
        })
        .then((resultados) => {
          db.dayDoc
            .findAll({ where: { doctors_id: req.params.id } })
            .then((results) => {
              let days = [];
              let area = resultados.areas.getDataValue("area_expertise");
              for (let i = 0; i < results.length; i++) {
                days[i] = results[i].getDataValue("days_id");
              }

              console.log(resultados);
              let oneDoc = {
                id: resultados.id,
                name: resultados.name,
                city: resultados.city,
                phone: resultados.phone,
                birthdate: resultados.birthdate,
                email: resultados.email,
                expertise: area,
                days_available: days,
                image: resultados.image,
              };
              console.log(oneDoc);
              return res.render("appointment", { d: oneDoc });
            });
        });
    },
    doctor: (req, res) => {
      db.doctor
        .findAll({ include: [{ association: "areas" }] })
        .then((doctors) => {
          let lists = [];

          console.log("waddaup biatch");
          for (oneDoctor of doctors) {
            let expertise = [];
            //console.log([oneDoctor.areas.getDataValue('area_expertise')])
            for (expertisss of [
              oneDoctor.areas.getDataValue("area_expertise"),
            ]) {
              expertise.push(expertisss);
            }
            let oneDoc = {
              id: oneDoctor.id,
              name: oneDoctor.name,
              city: oneDoctor.city,
              phone: oneDoctor.phone,
              birthdate: oneDoctor.birthdate,
              email: oneDoctor.email,
              expertise: expertise,
              image: oneDoctor.image,
            };
            //console.log(oneDoc)
            lists.push(oneDoc);
          }

          res.render("doctor", { d: lists });
        });
    },
    professional: (req, res) => {
      res.render("professional");
    },
    add: (req, res) => {
      db.expertise.findAll().then((areas) => {
        return res.render("addDoctor", { areas });
      });
    },
    //controllers to store a doc
    createDoctor: (req, res) => {
      let availableDays = [
        req.body.monday,
        req.body.tuesday,
        req.body.wednesday,
        req.body.thursday,
        req.body.friday,
      ].filter((element) => {
        return element !== undefined;
      });
      console.log(availableDays);

      console.log("Aca viajo lo del form: ", req.body, " ///");
      if (availableDays == undefined) {
        return res.render("appointment", {
          errors: {
            days: {
              msg: "You must select at least 1 day.",
            },
          },
          oldData: req.body,
        });
      }

      let docCreated = req.body;

      db.doctor
        .create({
          name: req.body.name,
          expertise_id: req.body.expertise_id,
          birthdate: req.body.birthdate,
          city: req.body.city,
          email: req.body.email,
          phone: req.body.phone,
          days: availableDays,
          image: req.file.filename,
        })
        .then((results) => {
          db.doctor
            .findOne({ where: { name: docCreated.name } })
            .then((newResults) => {
              console.log(newResults.id);
              for (let i = 0; i < availableDays.length; i++) {
                if (availableDays[i]) {
                  db.dayDoc.create({
                    doctors_id: newResults.id,
                    days_id: availableDays[i],
                  });
                }
              }
            });
        });

      res.redirect("/");
    },
    newTurn: (req, res) => {
      let idDoctor = req.params.id;
      console.log(idDoctor);
      console.log(req.params, "did u got");
      console.log(req.body, "hola aca estoy");
      db.turn
        .create({
          date_turn: req.body.datepicker,
          time_turn: req.body.hour,
          doctors_id: req.params.id, // cambiar cuando use la base de datos
          users_id: req.session.userLogged.id, // and the user on session
        })

        .then(() => {
          res.redirect("/");
        });
    },
    cancelTurn: (req, res) => {
      db.turn
        .destroy({
          where: {
            id: req.params.id,
          },
        })
        .then(() => {
          res.redirect("../users/profile");
        });
    },
  };

module.exports = mainController;
