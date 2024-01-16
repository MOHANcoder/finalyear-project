const {
    Assignment,
    HTMLOutputGenerator,
    Transportation,
    ObjectiveFunction,
    MinifiedNumber,
    Constraint
} = require("operations-research");

module.exports = {
    calculateAssignment: (req, res, next) => {
        const { costTable } = req.body;
        const htmlGenerator = new HTMLOutputGenerator("ASSIGNMENT");
        const assignmentSolver = new Assignment(costTable, htmlGenerator);
        let cost;
        try {
            [_, cost, _] = assignmentSolver.solve();
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Error during calculations",
                data: {}
            });
        }

        return res.status(200).json({
            success: true,
            message: "Assignment Done",
            data: {
                cost,
                htmlContent: htmlGenerator.getContent()
            }
        });
    },
    calculateTransportation: (req, res, next) => {
        const { costTable, origins, destinations, method } = req.body;
        const htmlGenerator = new HTMLOutputGenerator("TRANSPORTATION");
        const transportationSolver = new Transportation(costTable, origins, destinations, htmlGenerator);
        let cost;
        try {
            switch (method) {
                case "VA": transportationSolver.findIBFSUsingVogelApproximation();
                    break;
                case "NW": transportationSolver.findIBFSUsingNorthWestCorner();
                    break;
                case "RM": transportationSolver.findIBFSUsingRowMinima();
                    break;
                case "CM": transportationSolver.findIBFSUsingColumnMinima();
                    break;
                case "MM": transportationSolver.findIBFSUsingMatrixMinima();
                    break;
                //Error required
            }
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Error during calculations",
                data: {}
            });
        }

        return res.status(200).json({
            sucess: true,
            message: "Transportation problem solved",
            data: {
                htmlContent: htmlGenerator.getContent()
            }
        });
    },
    calculateSimplex: (req, res, next) => {
        const { noOfDecisionVariables,objectiveCoefficients, optimizeType, constraints ,nonNegativeConstraints} = req.body;
        const htmlGenerator = new HTMLOutputGenerator("SIMPLEX");
        const simplexSolver = new ObjectiveFunction(
            noOfDecisionVariables,
            optimizeType,
            objectiveCoefficients.map(coefficient => new MinifiedNumber(coefficient.dividend,coefficient.divisor)),
            constraints.map(constraint => new Constraint(
                noOfDecisionVariables,
                constraint.coefficient.map(coefficient => new MinifiedNumber(coefficient.dividend,coefficient.divisor)),
                constraint.symbol,
                new MinifiedNumber(constraint.constant.dividend,constraint.constant.divisor)
            )),
            nonNegativeConstraints.map(constraint => new Constraint(
                noOfDecisionVariables,
                constraint.coefficient.map(coefficient => new MinifiedNumber(coefficient.dividend,coefficient.divisor)),
                constraint.symbol,
                new MinifiedNumber(constraint.constant.dividend,constraint.constant.divisor)
            )),
            htmlGenerator
        );
        let cost;
        try{
            cost = simplexSolver.solve();
        }catch(error){
            return res.status(400).json({
                success: false,
                message: "Error during calculations",
                data: {error:error.message,htmlContent:htmlGenerator.getContent()}
            });
        }
        return res.status(200).json({
            success: true,
            message: "Simplex Done",
            data: {
                cost,
                htmlContent: htmlGenerator.getContent()
            }
        });
    }
}