const {
    Assignment,
    HTMLOutputGenerator
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
    }
}