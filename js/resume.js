//Load Data

fetch('data/data.json')
    .then((response) => response.json())
    .then((json) => readData(json))
    .catch((error) => console.log(error));

var resumeArray = new Array();
var resumeParentArray = new Array();
var resumeCounter = 0;
var buttonNext = document.getElementById("button-next");
var buttonPrev = document.getElementById("button-prev");
buttonPrev.style.display = "none";
buttonNext.style.display = "none";

function readData(json) {
    var resumeObj = json["resume"];
    resumeObj.forEach(resumeElement => {
        resumeParentArray.push(resumeElement);
    });
    resumeArray = resumeParentArray;
    disableEnableButtons();
    resumeCounter = 0;
    showData(resumeParentArray, resumeCounter);
}

function showData(dataArray, arrayCounter) {
    var dataContainer = document.getElementsByClassName("resume-flex-container");
    var errorImage =  document.getElementsByClassName("error-image")[0];
    if (dataArray.length != 0) {
        dataContainer[0].style.display="flex";
        errorImage.style.display="none";
        var selectedObject = dataArray[arrayCounter];
        //Personal Info

        const { basics: { name, AppliedFor, email, phone, profiles: { network, url } }, skills: { keywords }, interests: { hobbies } } = selectedObject;

        //Basic Info
        document.getElementById("person-name-text").innerText = name;
        document.getElementById("applied-for-text").innerText = "Applied For " + AppliedFor;
        document.getElementById("personal-info-text").innerHTML = `${phone} <br> ${email} <br> <a href="${url}">${network}</a>`;

        //Technical Skills
        var skillText = "";
        keywords.forEach(skill => {
            skillText = skillText + skill + '<br>';

        });
        document.getElementById("skills-text").innerHTML = skillText;

        //Hobbies
        var hobbiesText = "";
        hobbies.forEach(hobby => {
            hobbiesText = hobbiesText + hobby + '<br>';

        });
        document.getElementById("hobbies-text").innerHTML = hobbiesText;

        //Work experience in previous company
        const { work: { ['Company Name']: companyName, Position, ['Start Date']: startDate, ['End Date']: endDate, Summary } } = selectedObject;

        document.getElementById("company-name-placeholder").innerText = companyName;
        document.getElementById("position-name-placeholder").innerText = Position;
        document.getElementById("start-date-placeholder").innerText = startDate;
        document.getElementById("end-date-placeholder").innerText = endDate;
        document.getElementById("summary-placeholder").innerText = Summary;

        //Projects info
        const { projects: { name: projectName, description } } = selectedObject;
        document.getElementById("projects-details").innerHTML = `<b>${projectName}</b> : ${description}`;

        //Education info
        const { education: { UG, ['Senior Secondary']: SS, ['High School']: HS }, } = selectedObject;

        var ugText = Object.values(UG).toString();
        var ssText = Object.values(SS).toString();
        var hsText = Object.values(HS).toString();
        document.getElementById("education-details").innerHTML = `<ul><li><b>UG : </b> ${ugText}</li><li><b>PU : </b> ${ssText}</li><li><b>High School : </b> ${hsText}</li></ul>`;

        //Internship
        const { Internship: { ['Company Name']: internshipName, Position: interPosition, ['Start Date']: internStartDate, ['End Date']: internEndDate, Summary: internSummary } } = selectedObject;

        var internshipText = `<ul>
        <li><b>Company Name : </b>${internshipName} </li>
        <li><b>Position : </b> ${interPosition}</li>
        <li><b>Start Date : </b> ${internStartDate}</li>
        <li><b>End Date : </b>${internEndDate}</li>
        <li><b>Summary : </b>${internSummary}</li>
     </ul>`;

        document.getElementById("internship-details").innerHTML = internshipText;

        //Achievement details
        const { achievements: { Summary: achievementSummaryList } } = selectedObject;
        var achievementText = "";
        achievementSummaryList.forEach(achievement => {
            achievementText += `<li>${achievement}</li>`;
        });

        var elementText = `<ul>${achievementText}</ul>`;
        document.getElementById("achievement-details").innerHTML = elementText;
    }
    else {
        dataContainer[0].style.display = "none";
        errorImage.style.display="flex";
    }

}

function showNextRecord(event) {
    resumeCounter++;
    disableEnableButtons();
    showData(resumeArray, resumeCounter);
}

function showPrevRecord(event) {
    resumeCounter--;
    disableEnableButtons();
    showData(resumeArray, resumeCounter);
}

function disableEnableButtons() {
    if (resumeArray.length == 1) {
        buttonPrev.style.display = "none";
        buttonNext.style.display = "none";
    }
    else if (resumeCounter > 0 && resumeCounter < resumeArray.length - 1) {
        buttonPrev.style.display = "block";
        buttonNext.style.display = "block";
    }
    else if (resumeCounter <= 0) {
        buttonPrev.style.display = "none";
        buttonNext.style.display = "block";
    }
    else if (resumeCounter >= resumeArray.length - 1) {
        buttonNext.style.display = "none";
        buttonPrev.style.display = "block";
    }
}

function search_applicant(event) {
    var searchArray = new Array();
    let search_input = document.getElementById('searchKeyword').value.toLowerCase();
    resumeParentArray.forEach(element => {
        const { basics: { AppliedFor } } = element;
        if (AppliedFor.toLowerCase().includes(search_input))
            searchArray.push(element);
    });
    resumeArray = searchArray;
    resumeCounter = 0;
    showData(searchArray, resumeCounter);
    disableEnableButtons();
}