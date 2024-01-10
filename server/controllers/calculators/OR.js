const {
    Assignment,
    HTMLOutputGenerator,
    Transportation
} = require("operations-research");

module.exports = {
    calculateAssignment: (req, res, next)=>{
        const {costTable} = req.body;
        const htmlGenerator = new HTMLOutputGenerator("ASSIGNMENT");
        const assignmentSolver = new Assignment(costTable,htmlGenerator);
        let cost;
        try{
            [_,cost,_] = assignmentSolver.solve();
        }catch(error){
            return res.status(400).json({
                success:false,
                message:"Error during calculations",
                data:{}
            });
        }

        return res.status(200).json({
            success:true,
            message:"Assignment Done",
            data:{
                cost,
                htmlContent : htmlGenerator.getContent()
            }
        });
    },
    calculateTransportation : (req,res,next) => {
        const {costTable,origins,destinations,method} = req.body;
        const htmlGenerator = new HTMLOutputGenerator("TRANSPORTATION");
        const transportationSolver = new Transportation(costTable,origins,destinations,htmlGenerator);
        let cost;
        try{
            switch(method){
                case "VA":transportationSolver.findIBFSUsingVogelApproximation();
                break;
            }
        }catch(error){
            return res.status(400).json({
                success:false,
                message:"Error during calculations",
                data:{}
            });
        }

        return res.status(200).json({
            sucess:true,
            message:"Transportation problem solved",
            data:{
                htmlContent:htmlGenerator.getContent()
            }
        });
    }
}