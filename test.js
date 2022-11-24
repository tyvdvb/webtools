import {additionalUsers, randomUserMock} from "./mock.js";
import {normalize} from "./main.js";
import {filterUser} from "./main.js";

window.addEventListener("load", () => {
    const teachersList = normalize(randomUserMock, additionalUsers)
    teachersList.forEach((teacher) => {
        createTeacher(teacher);
    })

})


function createTeacher(teacher) {
    const teacherListEl = document.createElement("li");
    teacherListEl.id = `${teacher.uuid}-listEl`;
    teacherListEl.classList.add("person-info");
    const teacherImageFigureEl = document.createElement("figure");
    teacherImageFigureEl.classList.add("person");
    const teacherImgWrapperEl = document.createElement("div");
    teacherImgWrapperEl.classList.add("img-wrapper");
    const teacherImgEl = document.createElement("img");
    teacherImgEl.src = teacher.picture_large;
    teacherImgEl.alt = "teacher";
    teacherImgEl.classList.add("img");

    teacherImgEl.onclick = () => displayTeacherCard(teacher);

    const teacherImgFigCaptionEl = document.createElement("figcaption");
    teacherImgFigCaptionEl.innerText = teacher.full_name.split(" ")[0]+"\n"+teacher.full_name.split(" ")[1];
    teacherImgWrapperEl.appendChild(teacherImgEl);
    teacherImageFigureEl.appendChild(teacherImgWrapperEl);
    teacherImageFigureEl.appendChild(teacherImgFigCaptionEl);
    const teacherSubjectEl = document.createElement("div");
    teacherSubjectEl.classList.add("subject");
    teacherSubjectEl.innerText = "Math";
    const teacherCountryEl = document.createElement("div");
    teacherCountryEl.classList.add("country");
    teacherCountryEl.innerText = teacher.country;

    const addFavoriteButton = document.createElement("button");
    addFavoriteButton.id = `${teacher.uuid}-addFavorite`;
    addFavoriteButton.innerText = "add to favorite";
    addFavoriteButton.onclick = () => addTeacherToFavorite(teacher);

    teacherListEl.appendChild(teacherImageFigureEl);
    teacherListEl.appendChild(teacherSubjectEl);
    teacherListEl.appendChild(teacherCountryEl);
    teacherListEl.appendChild(addFavoriteButton);

    const teacherListContainerElement = document.getElementById("teacherList");
    teacherListContainerElement.appendChild(teacherListEl);
}

function displayTeacherCard(teacher) {
    document.getElementsByClassName("teacher-information")[0].className = 'teacher-active';
    document.getElementsByClassName("main-wrapper")[0].className = 'main-wrapper-active';
    const modalPic = document.getElementById("modalPic");
    modalPic.src = teacher.picture_large;
    const modalTeacherName = document.getElementById("modalTeacherName");
    modalTeacherName.innerText = teacher.full_name;
    const modalTeacherJob = document.getElementById("modalTeacherJob");
    modalTeacherJob.innerText = "Math";
    const modalTeacherLive = document.getElementById("modalTeacherLive");
    modalTeacherLive.innerText = teacher.city+', '+teacher.country;
    const modalTeacherAge = document.getElementById("modalTeacherAge");
    modalTeacherAge.innerText = teacher.age+", "+teacher.gender;
    const modalTeacherEmail = document.getElementById("modalTeacherEmail");
    modalTeacherEmail.innerText = teacher.email;
    const modalTeacherNumber = document.getElementById("modalTeacherNumber");
    modalTeacherNumber.innerText = teacher.phone;




}

function addTeacherToFavorite(teacher) {
    const teacherListEl = document.getElementById(`${teacher.uuid}-listEl`);
    teacherListEl.classList.add("favorite");

    const addFavoriteButton = document.getElementById(`${teacher.uuid}-addFavorite`);
    addFavoriteButton.innerText = "remove from favorite";
    addFavoriteButton.onclick = () => removeTeacherFromFavorite(teacher);
}

function removeTeacherFromFavorite(teacher) {
    const teacherListEl = document.getElementById(`${teacher.uuid}-listEl`);
    teacherListEl.classList.remove("favorite");

    const addFavoriteButton = document.getElementById(`${teacher.uuid}-addFavorite`);
    addFavoriteButton.innerText = "add to favorite";
    addFavoriteButton.onclick = () => addTeacherToFavorite(teacher);
}

// function filterTeacher(teacher) {
//     const teacherFilteredAge =
//
// }

