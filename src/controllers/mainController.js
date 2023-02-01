const fs = require('fs');
const path = require('path');

const doctorsFilePath = path.join(__dirname, '../data/doctors.json');
const turnsFilePath = path.join(__dirname, '../data/turns.json')
let doctors = JSON.parse(fs.readFileSync(doctorsFilePath, 'utf-8'));
let turns = JSON.parse(fs.readFileSync(turnsFilePath, 'utf-8'));


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
            res.render('addDoctor')
        },
//controllers to store a doc
        createDoctor: (req, res) => {
        let newID=(doctors[doctors.length-1].id)+1 
		
        let availableDays = [req.body.monday,req.body.tuesday,req.body.wednesday,req.body.thursday,req.body.friday]
                    .filter(element => { return element !== undefined})

        console.log(availableDays)
		let newDoctor = {
			id: newID,
			name: req.body.name,
			expertise: req.body.expertise,
			birthdate: req.body.birthdate,
			city: req.body.city,
			email: req.body.email,
            phone: req.body.phone,
            days: availableDays,
            image: req.file.filename
		}

        console.log("/////////")
		
		doctors.push(newDoctor)
      
		fs.writeFileSync(doctorsFilePath, JSON.stringify(doctors,null,' '));

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
            
            console.log(appDoctor)
            
            turns.push(newTurn)
          
            fs.writeFileSync(turnsFilePath, JSON.stringify(turns,null,' '));
    
            res.redirect('/users/profile');

        } 
}

module.exports = mainController;
