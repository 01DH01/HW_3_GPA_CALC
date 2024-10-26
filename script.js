const coursesTable = document.getElementById("coursesTable");
const gpaResult = document.getElementById("gpaResult");

//GPA values for letter grades
const gradePoints = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D+": 1.3, "D": 1.0, "D-": 0.7,
    "F": 0.0
};

// adds new row
function addRow() {
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td><input type="checkbox" class="selectRow"></td>
        <td><input type="text" placeholder="Course"></td>
        <td>
            <select>
                <option value="">--</option>
                ${Object.keys(gradePoints).map(grade => `<option value="${gradePoints[grade]}">${grade}</option>`).join('')}
            </select>
        </td>
        <td><input type="number" min="0" max="4" placeholder="Credits"></td>
        <td><span class="deleteBtn" onclick="deleteRow(this)">×</span></td>
    `;
    coursesTable.appendChild(newRow);
}

// deletes a specified row
function deleteRow(button) {
    const row = button.closest("tr");
    row.remove();
}

// Function to calculate GPA
function calculateGPA() {
    let totalGradePoints = 0;
    let totalCredits = 0;

    Array.from(coursesTable.children).forEach(row => {
        const isChecked = row.querySelector(".selectRow").checked;
        const grade = row.querySelector("select").value;
        const credits = parseFloat(row.querySelector("input[type='number']").value);

        // Considers rows that are checked and have valid inputs
        if (isChecked && grade && !isNaN(credits) && credits > 0) {
            totalGradePoints += grade * credits;
            totalCredits += credits;
        }
    });

    // Calculate GPA
    const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    gpaResult.textContent = `GPA: ${gpa}`;
}

//Resets all entries to default
function resetTable() {
    // Iterate through each row
    Array.from(coursesTable.rows).forEach((row, index) => {
            // Clear course input
            row.querySelector("input[type='text']").value = "";
            // Reset select to default
            row.querySelector("select").selectedIndex = 0;
            // Clear credits input
            row.querySelector("input[type='number']").value = "";
    });
    // Reset the GPA display
    gpaResult.textContent = "GPA: ";
}

document.getElementById("addRowBtn").addEventListener("click", addRow);
document.getElementById("calculateBtn").addEventListener("click", calculateGPA);
document.getElementById("resetBtn").addEventListener("click", resetTable);
