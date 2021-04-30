//This function takes the difficulty of the problem as
// a parameter and asks the user a math problem of that difficulty

//level 1 operations allowed: addition, subtraction of single digit integers (0-10)
//level 2 operations allowed: addition, subtraction of double digit integers(0-100)
//level 3 operations allowed: addition, subtraction (0-99) and multiplication/division (0-10)

// The function will calculate the answer and return true
// if the user gave the correct answer 
//and false if the user gave the incorrect answer

// test using the testMathProblem.html file
function mathProblem(level) {

    let operations = [];
    let range = 0;

    switch (Number(level)) {

        case 1:
            operations = ['+', '-'];
            range = 11;
            let a = Math.floor(Math.random() * 10);
            let b = Math.floor[Math.random() * 10];
            break;
        case 2:
            operations = ['+', '-'];
            range = 101;
            break;

        case 3:
            operations = ['+', '-', 'x', '/'];
            break;
        default:
            console.log("invalid parameter. Should be 1, 2, or 3");
            return;
    }


    let op = operations[Math.floor(Math.random() * operations.length)];

    if (level == 3) {
        if (op == '+' || op == '-') {
            range = 101;
        }
        else {
            range = 11;
        }
    }

    let a = Math.floor(Math.random() * range);
    let b = Math.floor(Math.random() * range);

    if (op == '-' && b > a) { // prevent negative answers

        let temp = a;
        a = b;
        b = temp;
    }
    if (op == '/') {
        if (b == 0) { b++; } // prevent the divide by 0 case;
        result = a * b;
        a = result; //result / b = a prevents fraction answers

    }

    var calcAnswer = {
        '+': function (x, y) { return x + y; },
        '-': function (x, y) { return x - y; },
        'x': function (x, y) { return x * y; },
        '/': function (x, y) { return x / y; }
    };

    let correctAnswer = calcAnswer[op](a, b);

    // Show the problem and
    //Get input from the user
    let userAnswer = window.prompt(a + ' ' + op + ' ' + b + ' = ', '');

    // check correct
    if (userAnswer == correctAnswer) {
        console.log('Correct');
        return true;
    } else {
        console.log('That is not right');
        return false;
    }

}


