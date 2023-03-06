const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const usersFilePath = path.join(__dirname, "../data/users.json");
const userList = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const { validationResult } = require("express-validator");

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const db = require("../database/models");
const { Association } = require("sequelize");

const userController =
  //controllers to render pages
  {
    register: (req, res) => {
      res.cookie("testing", "Hi", { maxAge: 1000 * 60 });
      res.render("register");
    },
    login: (req, res) => {
      console.log(req.session);
      res.render("login");
    },
    validLogin: (req, res) => {
      const resultValidationLogin = validationResult(req);

      if (resultValidationLogin.errors.length > 0) {
        res.render("users/login", {
          errors: resultValidationLogin.mapped(),
          oldData: req.body,
        });
      }

      db.user
        .findOne({ where: { email: req.body.email } })
        .then((userToLogin) => {
          console.log(
            "//////////",
            userToLogin.dataValues,
            userToLogin.password
          );
          if (!userToLogin) {
            return res.redirect("login", {
              errors: {
                email: {
                  msg: " There is no such email in our database.",
                },
              },
            });
          }

          if (userToLogin) {
            const isPasswordOk = bcrypt.compareSync(
              req.body.password,
              userToLogin.password
            );
            console.log(isPasswordOk);
            if (!isPasswordOk) {
              return res.redirect("login");
            } else {
              delete userToLogin.password;
              req.session.userLogged = userToLogin;
              console.log("te logueste");
              return res.redirect("/");
            }
          }
        });
    },
    profile: (req, res) => {
      db.user
        .findOne({ where: { id: req.session.userLogged } })
        .then((username) => {
          let user1 = {
            firstName: req.session.userLogged.first_name,
            lastName: req.session.userLogged.last_name,
            phone: req.session.userLogged.phone,
            birthdate: req.session.userLogged.birthdate,
            city: req.session.userLogged.city,
            email: req.session.userLogged.email,
            sex: req.session.userLogged.sex,
            image: req.session.userLogged.image,
            turns: [],
          };

          db.turn
            .findAll(
              { include: [{ association: "user" }, { association: "doctor" }] },
              { where: { user_id: req.session.userLogged.id } }
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
              console.log(user1.turns);
              console.log(user1.turns.length);
              console.log("llegue");

              res.render("profile", { user: user1 });
            });
        });
    },
    //controllers to create and modify users
    createUser: (req, res) => {
      const resultValidation = validationResult(req);
      console.log(resultValidation);
      if (resultValidation.errors.length > 0) {
        console.log(resultValidation.errors);
        return res.render("register", {
          errors: resultValidation.mapped(),
          oldData: req.body,
        });
      } else {
        console.log("no hay errores");
      }
      // se puede usar segun Javi
      // user.create(req.body)

      //let newID=(userList[userList.length-1].id)+1
      console.log(req.file);
      console.log(req.body);

      db.user
        .findOne({ where: { email: req.body.email } })
        .then((userToLogin) => {
          console.log(userToLogin);
          if (userToLogin) {
            return res.render("register", {
              errors: {
                email: {
                  msg: " That email is already used.",
                },
              },
            });
          } else {
            db.user.create({
              //id: newID,
              first_name: req.body.firstName,
              last_name: req.body.lastName,
              password: bcrypt.hashSync(req.body.password, 10),
              phone: req.body.phone,
              birthdate: req.body.birthdate,
              city: req.body.city,
              email: req.body.email,
              sex: req.body.sex,
              image: req.file.filename,
            });

            res.redirect("/");
          }
        });
    },
    logout: (req, res) => {
      req.session.destroy();
      return res.redirect("/");
    },
  };

module.exports = userController;
