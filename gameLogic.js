window.onload = function () {
    var gemImages = [{
        gemstoneURL: 'Images/PetrifiedWood.jpg'

    }, {
        gemstoneURL: 'Images/mineral.gif'
    }, {
        gemstoneURL: 'Images/Cinnabar.jpg'
    }, {
        gemstoneURL: 'Images/Diamond.jpg'
    }, {
        gemstoneURL: 'Images/Feldspar.jpg'
    }, {
        gemstoneURL: 'Images/Obsidian.jpg'
    }, {
        gemstoneURL: 'Images/Minerals.jpg'
    }, {
        gemstoneURL: 'Images/Labradorite.jpg'
    }, {
        gemstoneURL: 'Images/Painite.jpg'
    }, {
        gemstoneURL: 'Images/Malachite.jpg'
    }
    ];
    var number = 45;

    function run() {
        counter = setInterval(decrement, 1000); // gets declared in the global scope because its not attached to a var =...
    }

    function decrement() {
        number--;
        $('#timer').html('<h2>' + number + '</h2>');
        if (number === 0) {
            clearInterval(counter);
            setTimeout(function() {
                alert("Times up! Please click ok to reset the game! ");
                reset();
            }, 200)
        }
    }

    run();

    function reset() {
        var delay = 1000;
        setTimeout(function () {
            window.location.reload();
            //your code to be executed after 1 second
        }, delay);
    }

    var questionArea = document.getElementsByClassName('questions')[0],
        answerArea = document.getElementsByClassName('answers')[0],
        checker = document.getElementsByClassName('checker')[0],
        current = 0,

        allQuestions = {
            'What is the Texas state stone?': ['Limestone', 'Sandstone', 'Petrified Palmwood', 'Texas Blue Topaz', 2],
            'Famous Breaking Bad Quote?': ["Damn it Marie, they’re minerals!", "No they're minerals, Jesus Marie!", "Jesus Marie, they’re minerals!", "Damn it Marie, they’re not  called rocks.", 1],
            'The name of this crystal has translated to dragons blood and is one of the most toxic mineral to handle!': ['Garnet', 'Malachite', 'Cinnabar', 'Sunstone', 2],
            "DeBeers has been know to inflate prices of this extremely common Mineral, whose life is not forever, but with some fire can actually be burned. Better get a fireproof safe.": ['Citrine', 'Opal', 'Ruby', 'Diamond', 3],
            'This mineral is the most common mineral in the Earths crust, accounting for ~40-60% of the Earths crust.': ['Quartz', 'Feldspar', 'Olivine', 'Amethyst', 1],
            "This rock, known for its sharp edges, has been used in civilizations dating back to 700,000 BC. Fun Fact: This rock is so sharp that on a cellular level it will cut between the cells rather than tearing the cells, as steel knives do.": ['Obsidian', 'Diamond', 'Quartz', 'Sandstone', 0],
            'What do rocks all have in common?': ['Crystalline Shape', 'They all contain minerals', 'Their Hardness', 'They are all made under the same temperature and pressure', 1],
            'What is my favorite mineral?': ['Labradorite', 'Moonstone', 'Benitoite', 'Tanzanite', 0],
            'This mineral is the most rare mineral in the world. There are less than 25 known specimens in the world.': ['Tanzanite', 'Fire Opal', 'Red Beryl', 'Painite', 3],
            'This mineral was used by the ancient Egyptians for its green hue. Unfortunately this mineral is also very toxic in its raw state and should be handled with care when grinding, cutting and polishing.': ['Lapis Lazuli', 'Amber', 'Malachite', 'Azurite', 2],
        };


    function loadQuestion(curr) {
        // This function loads all the question into the questionArea
        // It grabs the current question based on the 'current'-variable
        var question = Object.keys(allQuestions)[curr];
        questionArea.innerHTML = '';
        questionArea.innerHTML = question;
    }

    function loadAnswers(curr) {
        // This function loads all the possible answers of the given question
        // It grabs the needed answer-array with the help of the current-variable
        // Every answer is added with an 'onclick'-function
        var answers = allQuestions[Object.keys(allQuestions)[curr]];
        answerArea.innerHTML = '';
        for (var i = 0; i < answers.length - 1; i += 1) {
            var createDiv = document.createElement('div'),
                text = document.createTextNode(answers[i]);
            createDiv.appendChild(text);
            createDiv.addEventListener("click", checkAnswer(i, answers));
            answerArea.appendChild(createDiv);
        }
    }

    function checkAnswer(i, arr) {
        return function () {
            var givenAnswer = i,
                correctAnswer = arr[arr.length -1 ];
            if (givenAnswer === correctAnswer) {
                addChecker(true);
            } else {
                addChecker(false);
            }
            if (current < Object.keys(allQuestions).length - 1) {
                current += 1;
                loadQuestion(current);
                loadAnswers(current);
            }
            else {
                setTimeout(function() {
                    alert("Game Over! Please click ok to reset the game! ");
                    reset();
                }, 100)

            }
        };
    }

    function addChecker(bool) {
        // This function adds a div element to the page
        // Used to see if it was correct or false
        var createDiv = document.createElement('div'),
            txt = document.createTextNode(current + 1);
        createDiv.appendChild(txt);
        var imgCorrect = document.getElementById('pictures');
        imgCorrect.src = gemImages[current].gemstoneURL;
        // append to .gemstone_image
        if (bool) {
            createDiv.className += 'correct';
            checker.appendChild(createDiv);
        } else {
            createDiv.className += 'false';
            checker.appendChild(createDiv);
            imgCorrect.src = '';
        }
    }

    // Start the quiz right away
    loadQuestion(current);
    loadAnswers(current);
};