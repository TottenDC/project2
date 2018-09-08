/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const arrayOfStudents = document.querySelectorAll('.student-item');
const pageDiv = document.querySelector('.page');
const headerDiv = document.querySelector('.page-header');
let searchResults = [];

/*
Show/Hide Student function
Parameters: an array of objects containing student information / the current page number
1. Loop to hide from DOM
2. Display only 10 students based on page # (Ex: page 3 is (i=20; i<=29; i=i+1))
  - If statement avoids JS error when i > array.length
*/
const displayStudents = (studentList, page) => {
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
//Call function so that page loads with first 10
displayStudents(arrayOfStudents, 1);

/*
Function to add page numbers
1. Create new div and ul HTML elements and append to each other
2. Create dynamic li based on list of students with for loop
  - Add the anchor tag to each li and append to ul
3. Append entire new div to main div
*/
const addPageButtons = studentList => {
  const buttonDiv = document.createElement('div');
  buttonDiv.className = 'pagination';
  const buttonUl = document.createElement('ul');
  buttonDiv.appendChild(buttonUl);
  for (i=0; i<(Math.ceil(studentList.length/10)); i++) {
    let buttonLi = document.createElement('li');
    buttonLi.innerHTML = `<a href='#'>${i+1}</a>`;
    buttonUl.appendChild(buttonLi);
  }
  pageDiv.appendChild(buttonDiv);
}
//Call function to add page numbers
addPageButtons(arrayOfStudents);

//Create an event handler for the buttons - linked to Show/Hide function
const paginationDiv = document.querySelector('.pagination');
paginationDiv.addEventListener('click', (event) => {
  let pageNumber = event.target.textContent;
  displayStudents(arrayOfStudents, pageNumber);
});

//Add search feature. Relatively complicated, comments are placed above line.

//Create search bar and search button
const searchBarDiv = document.createElement('div');
searchBarDiv.className = 'student-search';
searchBarDiv.innerHTML = '<input placeholder="Search for students..."> <button>Search</button>';
headerDiv.appendChild(searchBarDiv);

//Create search function
const searchFunction = () => {
//Clear previous results
  searchResults = [];
  const errorRemoval = document.querySelector('.noResultMessage');
  if (errorRemoval) {
  errorRemoval.parentNode.removeChild(errorRemoval);
  }
/*
Search 'meat-and-potatoes'
1. Grab input and store in variables
2. Loop through all students.
  -Turn off display
  -Grab student name and email
  -Create a regular expression from input so can use .test method
  -Add matches to new array
*/
  let searchInput = document.querySelector('.student-search input').value.toLowerCase();
  for (i=0; i<arrayOfStudents.length; i++) {
    arrayOfStudents[i].style.display = 'none';
    let name = arrayOfStudents[i].querySelector('h3').textContent;
    let email = arrayOfStudents[i].querySelector('.email').textContent;
    let searchQuery = new RegExp(searchInput);
    if (searchQuery.test(name) || searchQuery.test(email)) {
      searchResults.push(arrayOfStudents[i]);
    }
  }
//Create an error message if no results are found
  if (searchResults.length === 0) {
    let messageElement = document.createElement('h2');
    messageElement.className = 'noResultMessage'
    messageElement.textContent = 'Sorry, no results found.';
    pageDiv.appendChild(messageElement);
  }
//Remove old buttons
  const buttonDiv = document.querySelector('.pagination');
  buttonDiv.parentNode.removeChild(buttonDiv);
//Add buttons related to search results
  addPageButtons(searchResults);
//Display the results
  displayStudents(searchResults, 1);
};

//Create seach button functionality
const searchButton = document.querySelector('.student-search button');
searchButton.addEventListener('click', function () { searchFunction () });

//Create a 'keyup' event to 'autosearch'
const searchText = document.querySelector('.student-search input');
searchText.addEventListener('keyup', function () { searchFunction () });
