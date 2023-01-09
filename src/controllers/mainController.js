const mainController = 
{
    	home: (req, res) => {	
             res.render('home');
        },
        appointment:( req, res) => {
            res.render('appointment')
        },
        doctor:(req,res) => {
            res.render('doctor')
        },
        professional: (req,res) => {
            res.render('professional')
        },
        add: (req,res) => {
            res.render('addDoctor')
        }
}

module.exports = mainController;
