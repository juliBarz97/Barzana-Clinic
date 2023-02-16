const fs = require('fs');
const path = require('path');

const doctorsFilePath = path.join(__dirname, '../data/doctors.json');
const turnsFilePath = path.join(__dirname, '../data/turns.json')
let doctors = JSON.parse(fs.readFileSync(doctorsFilePath, 'utf-8'));
let turns = JSON.parse(fs.readFileSync(turnsFilePath, 'utf-8'));

const db = require('../database/models')


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const mainController = 
// controllers to render pages
{ 
    	home: (req, res) => {
            doctors = JSON.parse(fs.readFileSync(doctorsFilePath, 'utf-8'));
            res.render('home',{d: doctors});	
        },
        appointment:( req, res) => {
            let idDoctor = req.params.id
            let appDoctor 
            for (let docs of doctors) {
                if (docs.id == idDoctor){
                    appDoctor = docs
                    break
                 }
            }      

            res.render('appointment', { d : appDoctor } )
        },
        doctor:(req,res) => {
            doctors = JSON.parse(fs.readFileSync(doctorsFilePath, 'utf-8'));
            res.render('doctor', {d: doctors})
        },
        professional: (req,res) => {
            res.render('professional')
        },
        add: (req,res) => {
            db.expertise.findAll().then(areas => {
            return res.render('addDoctor', {areas})
            })
           
        },
//controllers to store a doc
        createDoctor: (req, res) => {
       
        let availableDays = [req.body.monday,req.body.tuesday,req.body.wednesday,req.body.thursday,req.body.friday]
                    .filter(element => { return element !== undefined})
        console.log(availableDays)

        console.log("Aca viajo lo del form: ",req.body, " //////")
        if (availableDays == undefined){
            return res.render('appointment', {
                errors :{
                    days : {
                        msg :'You must select at least 1 day.'
                    }
                },
                oldData : req.body })
        }
       
        
       let docCreated = req.body

		db.doctor.create({
			
			name: req.body.name,
			expertise_id: req.body.expertise_id,
			birthdate: req.body.birthdate,
			city: req.body.city,
			email: req.body.email,
            phone: req.body.phone,
            days: availableDays,
            image: req.file.filename
		})
            .then((results)  => { 
		db.doctor.findOne( { where : { name : docCreated.name } } )
	        .then((newResults)  => {
			
            
			
			console.log(newResults.id)
            for (let i = 0; i < availableDays.length; i++){
                if (availableDays[i]){
                    db.dayDoc.create({
                        doctors_id : newResults.id,
                        days_id: availableDays[i]
                    })
                }
            }
		})
		
	 });
	
        /*
        console.log("llegue")
        for ( let i = 0 ; i < availableDays.length ; i++  ){
            if (availableDays[i] != undefined){
            db.dayDoc.create({
                doctors_id : list.id ,
                days_id: availableDays[i]
            })}
        }
*/
       

        

		res.redirect('/');
        },
        newTurn: (req, res) => {
            let newID=(turns[turns.length-1].id)+1 
		
            let newTurn = {
                id: newID,
                appointment: req.body.datepicker,
                hour: req.body.hour,
                doctor: "Jerry",// cambiar cuando use la base de datos  
                patient: req.session.userLogged.firstName + ' ' + req.session.userLogged.lastName // and the user on session 
            }
            
            //console.log(appDoctor)
            
            turns.push(newTurn)
          
            fs.writeFileSync(turnsFilePath, JSON.stringify(turns,null,' '));
    
            res.redirect('/users/profile');

        } 
}

module.exports = mainController;
