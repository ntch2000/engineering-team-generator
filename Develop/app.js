const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employees = [];
// 1) prompt for manager information

const createManager = () => {
  const managerQuestions = [
    // Questions for the manager information
    {
      type: "input",
      name: "managerName",
      message: "What is the Manager's name?",
      // validation to ensure the user enters a name longer than 1 character
      validate: (value) => {
        if (value.length > 1 && value.match(/^[A-Z]+$/i)) return true;
        else return "Please enter a name!";
      },
    },
    {
      type: "input",
      name: "managerId",
      message: "What is the Manager's ID Number?",
      // validates if the user enters a number using regex expression
      validate: (value) => {
        if (value.match(/^\d+$/)) return true;
        else return "Please enter a valid ID Number.";
      },
    },
    {
      type: "input",
      name: "managerEmail",
      message: "What is the Manager's email?",
      // uses regex to validate the user enters a proper email address
      validate: (value) => {
        if (value.match(/\S+@\S+\.\S+/)) return true;
        else return "Please enter a valid email.";
      },
    },
    {
      type: "input",
      name: "managerOfficeNumber",
      message: "What is the Manager's Office Number?",
      // validates if the user enters a number using regex expression
      validate: (value) => {
        if (value.match(/^\d+$/)) return true;
        else return "Please enter a valid ID Number.";
      },
    },
  ];

  inquirer.prompt(managerQuestions).then((answers) => {
    const {
      managerName,
      managerId,
      managerEmail,
      managerOfficeNumber,
    } = answers;

    // create manager object
    const manager = new Manager(
      managerName,
      managerId,
      managerEmail,
      managerOfficeNumber
    );
    employees.push(manager);
    //console.log(manager);
    newTeamMember();
  });
};

const newTeamMember = () => {
  const teamQuestion = [
    {
      type: "list",
      name: "createTeam",
      message: "Which team member do you want to add?",
      choices: ["Engineer", "Intern", "None"],
    },
  ];
  inquirer.prompt(teamQuestion).then((answers) => {
    if (answers.createTeam === "Engineer") createEngineer();
    else if (answers.createTeam === "Intern") createIntern();
    else {
      // After the user has input all employees desired, call the `render` function (required
      // above) and pass in an array containing all employee objects; the `render` function will
      // generate and return a block of HTML including templated divs for each employee!
      console.log(employees);
      writeTeamPage(render(employees));
      console.log("Done!");
    }
  });
};

const createEngineer = () => {
  const engineerQuestions = [
    // Questions for the Engineer information.
    {
      type: "input",
      name: "engineerName",
      message: "What is the Engineer's name?",
      // validation to ensure the user enters a name longer than 1 character
      validate: (value) => {
        if (value.length > 1 && value.match(/^[A-Z]+$/i)) return true;
        else return "Please enter a name!";
      },
    },
    {
      type: "input",
      name: "engineerId",
      message: "What is the Engineer's ID Number?",
      // validates if the user enters a number using regex expression
      validate: (value) => {
        if (value.match(/^\d+$/)) return true;
        else return "Please enter a valid ID Number.";
      },
    },
    {
      type: "input",
      name: "engineerEmail",
      message: "What is the Engineer's Email?",
      // uses regex to validate the user enters a proper email address
      validate: (value) => {
        if (value.match(/\S+@\S+\.\S+/)) return true;
        else return "Please enter a valid email.";
      },
    },
    {
      type: "input",
      name: "engineerGithub",
      message: "What is the Engineer's GitHub?",
    },
  ];

  inquirer.prompt(engineerQuestions).then((answers) => {
    const { engineerName, engineerId, engineerEmail, engineerGithub } = answers;

    // create manager object
    const engineer = new Engineer(
      engineerName,
      engineerId,
      engineerEmail,
      engineerGithub
    );
    employees.push(engineer);
    newTeamMember();
  });
};

const createIntern = () => {
  const internQuestions = [
    // Questions for the Intern information.
    {
      type: "input",
      name: "internName",
      message: "What is the Intern's name?",
      // validation to ensure the user enters a name longer than 1 character
      validate: (value) => {
        if (value.length > 1 && value.match(/^[A-Z]+$/i)) return true;
        else return "Please enter a name!";
      },
    },
    {
      type: "input",
      name: "internId",
      message: "What is the Intern's ID Number?",
      // validates if the user enters a number using regex expression
      validate: (value) => {
        if (value.match(/^\d+$/)) return true;
        else return "Please enter a valid ID Number.";
      },
    },
    {
      type: "input",
      name: "internEmail",
      message: "What is the Intern's Email?",
      // uses regex to validate the user enters a proper email address
      validate: (value) => {
        if (value.match(/\S+@\S+\.\S+/)) return true;
        else return "Please enter a valid email.";
      },
    },
    {
      type: "input",
      name: "internSchool",
      message: "What is the Intern's School?",
      // validation to ensure the user enters a school name longer than 1 character
      validate: (value) => {
        if (value.length > 1 && value.match(/^[A-Z]+$/i)) return true;
        else return "Please enter a name!";
      },
    },
  ];

  inquirer.prompt(internQuestions).then((answers) => {
    const { internName, internId, internEmail, internSchool } = answers;

    // create manager object
    const intern = new Intern(internName, internId, internEmail, internSchool);
    employees.push(intern);
    newTeamMember();
  });
};

createManager();

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// creates the final html page with all employee data and html files
const writeTeamPage = (data) => {
  // checks to see if the output directory exists and creates it if it does not exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdir(OUTPUT_DIR, (err) => {
      if (err) throw err;
    });
  }
  fs.writeFile(outputPath, data, (err) => {
    if (err) throw err;
    console.log("Team Page Generated!");
  });
};

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
