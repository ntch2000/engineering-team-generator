const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

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
        if (value.length > 1 && value.match(/^[A-Z\s]+$/i)) return true;
        else return "Please enter a valid name!";
      },
    },
    {
      type: "input",
      name: "managerId",
      message: "What is the Manager's ID Number?",
      // validates if the user enters a number using regex expression
      validate: (value) => {
        if (value.match(/^\d+$/)) return true;
        else return "Please enter a valid ID Number (numeric).";
      },
    },
    {
      type: "input",
      name: "managerEmail",
      message: "What is the Manager's email?",
      // uses regex to validate the user enters a proper email address
      validate: (value) => {
        if (value.match(/\S+@\S+\.\S+/)) return true;
        else return "Please enter a valid email (example@email.com).";
      },
    },
    {
      type: "input",
      name: "managerOfficeNumber",
      message: "What is the Manager's Office Number?",
      // validates if the user enters a number using regex expression
      validate: (value) => {
        if (value.match(/^\d+$/)) return true;
        else return "Please enter a valid Office Number (numeric).";
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
      writeTeamPage(render(employees));
      console.log("Team Page Rendered!");
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
        if (value.length > 1 && value.match(/^[A-Z\s]+$/i)) return true;
        else return "Please enter a valid name!";
      },
    },
    {
      type: "input",
      name: "engineerId",
      message: "What is the Engineer's ID Number?",
      // validates if the user enters a number using regex expression
      validate: (value) => {
        if (value.match(/^\d+$/)) return true;
        else return "Please enter a valid ID Number (numeric).";
      },
    },
    {
      type: "input",
      name: "engineerEmail",
      message: "What is the Engineer's Email?",
      // uses regex to validate the user enters a proper email address
      validate: (value) => {
        if (value.match(/\S+@\S+\.\S+/)) return true;
        else return "Please enter a valid email (example@email.com).";
      },
    },
    {
      type: "input",
      name: "engineerGithub",
      message: "What is the Engineer's GitHub?",
      validate: (value) => {
        if (value.length > 0) return true;
        else return "Please enter a GitHub username!";
      },
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
        if (value.length > 1 && value.match(/^[A-Z\s]+$/i)) return true;
        else return "Please enter a valid name!";
      },
    },
    {
      type: "input",
      name: "internId",
      message: "What is the Intern's ID Number?",
      // validates if the user enters a number using regex expression
      validate: (value) => {
        if (value.match(/^\d+$/)) return true;
        else return "Please enter a valid ID Number (numeric).";
      },
    },
    {
      type: "input",
      name: "internEmail",
      message: "What is the Intern's Email?",
      // uses regex to validate the user enters a proper email address
      validate: (value) => {
        if (value.match(/\S+@\S+\.\S+/)) return true;
        else return "Please enter a valid email (example@email.com).";
      },
    },
    {
      type: "input",
      name: "internSchool",
      message: "What is the Intern's School?",
      // validation to ensure the user enters a school name longer than 1 character
      validate: (value) => {
        if (value.length > 1 && value.match(/^[A-Z\s]+$/i)) return true;
        else return "Please enter a valid School!";
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
