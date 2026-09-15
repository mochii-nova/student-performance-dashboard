import { students } from "./students.js";
import {
  searchStudents,
  filterStudentsByBlock,
  filterStudentsByStatus,
} from "./gradeUtils.js";
import { displayStudents, displaySummary } from "./display.js";

const searchInput = document.getElementById("searchInput");
const blockFilter = document.getElementById("blockFilter");
const statusFilter = document.getElementById("statusFilter");
const applyBtn = document.getElementById("applyBtn");
const resetBtn = document.getElementById("resetBtn");

function applyFilters() {
  const query = searchInput.value;
  const block = blockFilter.value;
  const status = statusFilter.value;

  let result = students;
  result = searchStudents(result, query);
  result = filterStudentsByBlock(result, block);
  result = filterStudentsByStatus(result, status);

  displayStudents(result);
  displaySummary(result);
}

function resetDashboard() {
  searchInput.value = "";
  blockFilter.value = "All";
  statusFilter.value = "All";

  displayStudents(students);
  displaySummary(students);
}

applyBtn.addEventListener("click", applyFilters);
resetBtn.addEventListener("click", resetDashboard);

searchInput.addEventListener("input", applyFilters);

blockFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);

displayStudents(students);
displaySummary(students);