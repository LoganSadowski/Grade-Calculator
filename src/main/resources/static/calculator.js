//keeps track of the number of rows
var numRows = 1;

var rows = document.getElementsByClassName("row");

// Add listeners to keep the percent updated
function changePercent(rowNum) {
    // Extract the numerator, denominator, and percent from the row
    let numerator = rows[rowNum].getElementsByClassName("gradeNum");
    let denominator = rows[rowNum].getElementsByClassName("gradeDenom");
    let percent = rows[rowNum].getElementsByClassName("percent");

    // Add a listener to update the percent when the numerator is changed
    numerator[0].addEventListener('input', function() {
        if (!numerator[0].value || !denominator[0].value || denominator[0].value == 0) {
            percent[0].innerHTML = '';
        } else {
            percent[0].innerHTML = Math.round(numerator[0].value/denominator[0].value*10000)/100 + "%";
        }
    });

    // Add a listener to update the percent when the denominator is changed
    denominator[0].addEventListener('input', function() {
        if (!numerator[0].value || !denominator[0].value || denominator[0].value == 0) {
            percent[0].innerHTML = '';
        } else {
            percent[0].innerHTML = Math.round(numerator[0].value/denominator[0].value*10000)/100 + "%";
        }
    });
}

// Calculate the percent for the first row
changePercent(0);

numRows++;

var button = document.getElementById("addRow");

// Functionality for the add row button
button.addEventListener('click', function(evt) {
    evt.preventDefault();

    // Create the new row and add give it the "row" class
    var newRow = document.createElement('tr');
    newRow.classList.add('row');

    // Update the row's innerHTML and append it to the table
    newRow.innerHTML = '<td>Activity ' + numRows + '</td><td>A' + numRows + '</td><td><input name="weight" class="weight" type="number"></td><td><input name="gradeNum" class="gradeNum" type="number"> / <input name="gradeDenom" class="gradeDenom" type="number"></td><td class="percent"></td>';
    document.getElementsByTagName("table")[0].appendChild(newRow);

    // Update the percent for every row
    for (let i = 0; i < numRows; i++) {
       changePercent(i);
    }

    numRows++;
})


// Mean Button
var mean = document.getElementById("mean");
mean.addEventListener('click', function() {

    // Find the calculated percent for every row
    let scores = document.getElementsByClassName("percent");

    // total holds the sum of all percentages
    let total = 0;

    // Holds the number of non-empty percentages
    // Dividing by the number of rows is incorrect because the number of rows could be different from the number of non-empty rows
    let nonEmptys = 0;

    // calculate the sum of percentages and the number of non-empty rows
    for (let i = 0; i < numRows - 1; i++) {
        if (scores[i].innerHTML) {
            total += Number(scores[i].innerHTML.replace('%',''));
            nonEmptys++;
        }
    }

    // Display the calculated mean.
    document.getElementById("result").innerHTML = Math.round(total/nonEmptys)/100;

});


// Weighted button
var weighted = document.getElementById("weighted");
weighted.addEventListener('click', function() {

    // Find every row
    let rows = document.getElementsByClassName("row");

    // total holds the sum of each percentage multiplied by its weight
    let total = 0;

    // Holds the sum of the weights
    let weight = 0;

    // Find the sum of the weights and the sum of each percentage multiplied by its weight
    for (let i = 0; i < numRows - 1; i++) {
        if (rows[i].getElementsByClassName("percent")[0].innerHTML) {
            weight += Number(rows[i].getElementsByClassName("weight")[0].value);
            total += rows[i].getElementsByClassName("weight")[0].value * Number(rows[i].getElementsByClassName("percent")[0].innerHTML.replace('%',''));
        }
    }

    // If the total weight is not 0, display the calculated weighted grade
    if (weight != 0) {
        document.getElementById("result").innerHTML = Math.round(10*total/weight)/1000;
    }
})
