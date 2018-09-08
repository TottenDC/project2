/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const arrayOfStudents = document.querySelectorAll('.student-item');


/*
Show/Hide Student function
Parameters: an array of objects containing student information / the current page number
1. Loop to hide from DOM
2. Display only 10 students based on page # (Ex: page 3 is (i=20; i<=29; i=i+1))
  - If statement avoids JS error when i > array.length
*/
function displayStudents (studentList, page) {
  for (i=0; i<studentList.length; i++) {
    studentList[i].style.display = 'none';
  }
  for (i=((page*10)-10); i<=((page*10)-1); i++) {
    if (studentList[i] === undefined) {
      break;
    } else {
      studentList[i].style.display = 'inherit';
    }
  }
}



// Create and append the pagination links - Creating a function that can do this is a good approach




// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here
