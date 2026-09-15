import {
  calculateFinalGrade,
  getAcademicStatus,
  getPerformanceRemark,
  calculateClassAverage,
  countPassingStudents,
  getTopStudent,
} from "./gradeUtils.js";

const studentListEl = document.getElementById("studentList");
const classAverageEl = document.getElementById("classAverage");
const passingCountEl = document.getElementById("passingCount");
const displayedCountEl = document.getElementById("displayedCount");
const topStudentEl = document.getElementById("topStudent");
const messageAreaEl = document.getElementById("messageArea");

export function displayStudents(students) {
  studentListEl.innerHTML = "";

  if (students.length === 0) {
    displayMessage("No students found");
    return;
  }

  displayMessage("");

  students.forEach((student) => {
    const { id, name, block, quiz, lab, exam } = student; 

    const finalGrade = calculateFinalGrade(student);
    const status = getAcademicStatus(finalGrade);
    const remark = getPerformanceRemark(finalGrade);

    const card = document.createElement("article");
    card.className = "student-card";
    card.dataset.id = id;

    card.innerHTML = `
      <h3 class="student-card__name">${name}</h3>
      <p class="student-card__block">Block: ${block}</p>
      <ul class="student-card__scores">
        <li>Quiz: ${quiz}</li>
        <li>Lab: ${lab}</li>
        <li>Exam: ${exam}</li>
      </ul>
      <p class="student-card__grade">Final Grade: ${finalGrade.toFixed(2)}</p>
      <p class="student-card__status">Status: <span class="badge">${status}</span></p>
      <p class="student-card__remark">Remark: ${remark}</p>
    `;

    studentListEl.appendChild(card);
  });
}

export function displaySummary(students) {
  const average = calculateClassAverage(students);
  const passing = countPassingStudents(students);
  const topStudent = getTopStudent(students);

  classAverageEl.textContent = average.toFixed(2);
  passingCountEl.textContent = passing;
  displayedCountEl.textContent = students.length;
  topStudentEl.textContent = topStudent
    ? `${topStudent.name} (${calculateFinalGrade(topStudent).toFixed(2)})`
    : "N/A";
}

export function displayMessage(message) {
  messageAreaEl.textContent = message;
}