
const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");

// Load saved students from browser storage
let students = JSON.parse(
    localStorage.getItem("students") || "[]"
);

// Display students
function displayStudents() {
    studentList.innerHTML = "";

    students.forEach((student, index) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;

        const emailCell = document.createElement("td");
        emailCell.textContent = student.email;

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            deleteStudent(index);
        });

        actionCell.appendChild(deleteButton);

        row.append(nameCell, emailCell, actionCell);
        studentList.appendChild(row);
    });
}

// Add a student
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    students.push({
        name: name,
        email: email
    });

    saveStudents();
    displayStudents();

    form.reset();
});

// Delete a student
function deleteStudent(index) {
    students.splice(index, 1);

    saveStudents();
    displayStudents();
}

// Save students in browser storage
function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

// Show existing students when page opens
displayStudents();
