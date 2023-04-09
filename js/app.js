const gameElement = document.getElementById('game');

let suspescts;
let skipped;

const ask = (property) => {
    gameElement.innerHTML = `
    <h2>هل الشخصية ${property}؟</h2>
    <div class="options">
        <button class="option-btn" onclick="handleProperty('${property}', true);">أه</button>
        <button class="option-btn" onclick="handleProperty('${property}', false);">لا</button>
        <button class="option-btn" onclick="skipProperty('${property}');">مش متأكد</button>
        <button class="option-btn" onclick="skipProperty('${property}');">ساعات</button>
    </div>
    `;
}

const handleProperty = (property, value) => {
    skipped.push(property);
    let newSuspects = [];
    for (let i = 0; i < suspescts.length; i++) {
        if (suspescts[i].properties.includes(property) == value) {
            newSuspects.push(suspescts[i]);
        }
    }
    suspescts = newSuspects;
    progress();
}

const skipProperty = (property) => {
    skipped.push(property);
    progress();
}

const progress = () => {
    if (suspescts.length == 1) {
        guess();
    }
    else if (suspescts.length == 0) {
        fail();
    } else {
        try {
            ask(mostCommonProperty());
        } catch {
            guess();
        }
    }
}

const wrongGuess = () => {
    suspescts.splice(0, 1);
    progress();
}

const guess = () => {
    gameElement.innerHTML = `
    <h2>قصدك ${suspescts[0].name}؟</h2>
    <div class="options">
        <button class="option-btn" onclick="succeed();">أه</button>
        <button class="option-btn" onclick="wrongGuess();">لا</button>
    </div>
    `;
}

const fail = () => {
    gameElement.innerHTML = `
    <h2>مش عارف يصحبي</h2>
    <div class="options">
        <button class="option-btn" onclick="play();">العب تاني</button>
    </div>
    `;
}

const succeed = () => {
    gameElement.innerHTML = `
    <h2>ابقى صعبها شوية المرة الجاية</h2>
    <div class="options">
        <button class="option-btn" onclick="play();">العب تاني</button>
    </div>
    `;
}

const mostCommonProperty = () => {
    let freq = {};

    for (let character of suspescts) {
        for (let property of character.properties) {
            if (skipped.includes(property)) continue;
            if (property in freq) {
                freq[property] += 1;
            } else {
                freq[property] = 1;
            }
        }
    }
    return Object.keys(freq).reduce((a, b) => freq[a] > freq[b] ? a : b);
}

const play = () => {
    suspescts = [...characters];
    skipped = [];
    progress();
}