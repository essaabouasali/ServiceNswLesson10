const readline = require('readline');
const {StudentDataReader , TeacherDataReader} = require("./DataLayer");
const { Student } = require("./Models");
const path = require("path");
const { StudentService } = require("./Services");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(question) {
    let answer;

    return new Promise((resolve, reject) => {
        rl.question(question, (ans) => {
            resolve(ans);
        })
    });
}


async function Program() {
    // Your Code Here...

    const baseFilePath = path.join(__dirname,"../","JSONDATA");
    const _studentDataReader = new StudentDataReader(path.join(baseFilePath,"Students.json"));
    const _teacherDataReader = new TeacherDataReader(path.join(baseFilePath,"Teachers.json"));
    const _studentService = new StudentService(_studentDataReader, _teacherDataReader);
    // console.log(_studentDataReader.getArrayFromFile());
    // console.log(_teacherDataReader.getArrayFromFile());
    let shouldLoop = true;
    while(shouldLoop)
    {
        console.log("[1] Students");
        console.log("[2] Teachers");
        console.log("[3] Exit");

        let userInput = await askQuestion("Select an option from above: ");
        switch(parseInt(userInput))
        {
            case 1:
                console.log("[1] Add Student");
                console.log("[2] search student");
                console.log("[3] Remove Student");
                console.log("[4] Update Student");
                console.log("[5] Delete Student");
                console.log("[6] Go Back");
                let userInputStudent = await askQuestion("Selec an Option from above: ");
                switch(parseInt(userInputStudent))
                {
                    case 1:
                        let Studentfirstname = await askQuestion("Enter Student First Name: ");
                        let Studentlastname = await askQuestion("Enter Student lAST Name: ");
                        let Studentage = await askQuestion("Enter Student Age: ");
                        let grades = await askQuestion("Enter Student Grades (space-separeted): ");
                        let parasedGrades = grades.split(" ").map(num => parseInt(num));
                        let teacherId = await askQuestion("Enter Teacher's ID: ");
                        let newStudent = new Student(
                            Studentfirstname,
                            Studentlastname,
                            Studentage,
                            parasedGrades,
                            teacherId);
                        _studentService.addStudent(newStudent);
                        break;
                    case 2:
                        let searstudent = await askQuestion("enter student name : ");
                        console.log(_studentService.searchByName(searstudent));
                        break;

                    case 6: break;    
                    default : 
                        console.log("going back to main menue");   
                }
                break;
            case 2:

            case 3: 
            shouldLoop=false;
            break;    
            default:

        }
    }
}

Program().then(() => {
    process.exit(0);
});