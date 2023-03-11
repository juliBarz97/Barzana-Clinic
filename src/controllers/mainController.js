const fs = require("fs");
const path = require("path");

const db = require("../database/models");


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
        aDoc.monday,
        aDoc.tuesday,
        aDoc.wednesday,
        aDoc.thursday,
        aDoc.friday,
      ].filter((element) => {
        return element !== undefined;
      });
      console.log(availableDays);

      console.log("Aca viajo lo del form: ", aDoc, " ///");
      if (availableDays == undefined) {
        return res.render("appointment", {
          errors: {
            days: {
              msg: "You must select at least 1 day.",
            },
          },
          oldData: aDoc,
        });
      }

      let docCreated = aDoc;

      db.doctor
        .create({
          name: aDoc.name,
          expertise_id: aDoc.expertise_id,
          birthdate: aDoc.birthdate,
          city: aDoc.city,
          email: aDoc.email,
          phone: aDoc.phone,
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
      console.log(aDoc, "hola aca estoy");
      db.turn
        .create({
          date_turn: aDoc.datepicker,
          time_turn: aDoc.hour,
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
    // APIs
    turnAPI : (req, res) => {
      db.turn.findAll().then((turnApi) =>{
        return res.status(200).json({
          register: turnApi.lenght,
          data: turnApi,
          code:200
        })
      })
    },
    areaAPI: (req, res) => {
      db.expertise.findAll().then((areaApi) => {
        return res.status(200).json({
          register: areaApi.length,
          data: areaApi,
          code:200,
        })
      })
    },
    doctorsAPI : (req,res) => {
      db.doctor
      .findAll({ include: [{ association: "areas" }] })
      .then((doctors) => {
        let lists = [];

        for (oneDoctor of doctors) {
          let expertise = [];
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
          lists.push(oneDoc);
        }

        res.status(200).json({
          data: lists,
          code: 200,
          text: "All Doctors"
        })
      });
  },
    lastDocAPI : (req,res)=> {
      db.doctor.findAll().then((doctors) => {
        let list = [];
        let aDoc = doctors.slice(-1)[0];
        let lastDoc = {
          name: aDoc.name,
          expertise_id: aDoc.expertise_id,
          birthdate: aDoc.birthdate,
          city: aDoc.city,
          email: aDoc.email,
          phone: aDoc.phone,
          image: aDoc.filename,
        }
        list.push(lastDoc)

        res.status(200).json({
          data: list,
          code : 200,
          text: "Last Doctor"
        })
      })
    },
    UsersAPI : (req,res) => {
      db.user
      .findAll()
      .then((username) => {
        let user1 = {
          firstName: username.first_name,
          lastName: username.last_name,
          phone: username.phone,
          birthdate: username.birthdate,
          city: username.city,
          email:username.email,
          sex: username.sex,
          image: username.image,
          turns: [],
        };

        db.turn
          .findAll(
            { include: [{ association: "user" }, { association: "doctor" }] },
            { where: { user_id: username.id } }
          )
          .then((results) => {
            for (result of results) {
              console.log(result.doctor);
              let oneTurn = {
                id: result.id,
                doctor: result.doctor.name,
                area_expertise: result.doctor.expertise_id,
                date: result.date_turn,
                hour: result.time_turn,
              };
              user1.turns.push(oneTurn);
            }
            res.status(200).json({
              data: user1,
              code : 200,
              text: "All Users"
            })
          });
      });
    },
    docAreaAPI: (req, res) => {
      db.doctor.findAll().then((doctors) => {
        function countDoctorsByExpertise(expertiseId) {
          let count = 0;
          for (let i = 0; i < doctors.length; i++) {
            if (doctors[i].expertise_id == expertiseId) {
              count = count + 1;
            }
          }
          return count;
        }
        const expertiseMap = {
          1: 'Dermatologist',
          2: 'Neurologist',
          3: 'Dentist',
          4: 'Veterinary',
          5: 'Nurse',
          6: 'Therapist',
          7: 'Psychologist',
          8: 'Surgeon',
          9: 'Veterinary Surgeon',
        };
        
        const doctorByExpertise = [];
        const areasDoc = {};
        
        for (let i = 1; i <= 9; i++) {
          const count = countDoctorsByExpertise(i);
          doctorByExpertise.push(count);
          areasDoc[expertiseMap[i]] = count;
        }
        /*
        for (oneDoctor of doctors) {
          let aDoc = {
            name: oneDoctor.name,
            descripcion: oneDoctor.descripcion,
            precio: oneDoctor.precio,
            descuento: oneDoctor.descuento,
            stock: oneDoctor.stock,
            categoria: oneDoctor.expertise_id,
          };
          list.push(aDoc);
        }
  */
        //console.log(lista)
        res.status(200).json({
          //register: list.length,
          //data: list,
          doctorsByField: areasDoc,
          code: 200,
        });
      });
    }
  };

module.exports = mainController;
