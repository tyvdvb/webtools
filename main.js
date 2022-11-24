import {additionalUsers, randomUserMock} from "./mock.js";

const bgColor = ['#d699ff', '#f55555', '#d759d7', '#6f6fb7', '#99FFFF', '#99FF99', '#99FF66', '#CCCC66', '#CCCCCC', '#FF9933'];

const course = ['Mathematics', 'Physics', 'English', 'Computer Science', 'Dancing', 'Chess', 'Biology', 'Chemistry', 'Law', 'Art', 'Medicine', 'Statistics'];

const note = ['new teacher', 'assistant', 'unqualified', 'student-tutor', 'teach only grade 1-6', 'teach only grade 7-9', 'teach only grade 10-12', 'no notes'];

const randomInt = function (min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const getFavorite = () => {
    const caseFav = randomInt(0, 100);
    if (caseFav < 101 && caseFav > 65) return true;
    else return false;
}



//Завдання 1. Данні з обєкту random-user-mock привести до вигляду.До кожного з об’єктів масиву додати поля: id, favorite, course, bg_color,note, заповнюючи їх ПРАВИЛЬНИМ типом данних. По’єднати два обєкти
// (random_user_mock та additional_users) в один, позбуваючись повторів, якщо такі є. Значення поля course заповнювати рандомно зі списку:
// Mathematics, Physics, English, Computer Science, Dancing, Chess, Biology, Chemistry, Law, Art, Medicine, Statistics
// Обєкти можуть мати не однакову кількість полів та різні інтерфейси. Результатом виконання, є функція, що повертає масив відформатованних об’єктів.

export function normalize(randomUserMock, additionalUsers) {
    let normalized_array = randomUserMock.map((item, index) => {
        return {
            gender: item.gender,
            title: item.name.title,
            full_name: item.name.first + ' ' + item.name.last,
            city: item.location.city,
            state: item.location.state,
            country: item.location.country,
            postcode: item.location.postcode,
            coordinates: {
                latitude: item.location.coordinates.latitude,
                longitude: item.location.coordinates.longitude,
            },
            timezone: {
                offset: item.location.timezone.offset,
                description: item.location.timezone.description,
            },
            email: item.email,
            b_date: item.dob.date,
            age: item.dob.age,
            phone: item.phone,
            picture_large: item.picture.large,
            picture_thumbnail: item.picture.thumbnail,
            // у додати поля: id, favorite, course, bg_color, note
            id: index,
            favorite: getFavorite(),
            course: course[randomInt(0, 10)],
            bg_color: bgColor[randomInt(0, 8)],
            note: note[randomInt(0, 6)],
        }
    })
    normalized_array.push(...additionalUsers);
    const withoutDuplicates = [];

    for (let i of normalized_array) {
        if (!withoutDuplicates.find((el) => i.full_name === el.full_name)) {
            withoutDuplicates.push(i);
        }
    }
    return withoutDuplicates;
}


const arr = normalize(randomUserMock, additionalUsers);
// console.log(arr);


//Завдання 2. Провалідувати обєкт. Тобто перевірити, чи відповідають поля заданого обєкту вимогам до нього. Валідними вважаються такі поля, які відповідають наступним вимогам:
//  Поля full_name, gender, note, state, city, country мають бути строками, та починатись з великої літери.
//  Поле age має бути чисельним.
//  Поле phone має відповідати заданому формату (формат залежить від країни).
//  Поле email має відповідати формату запису email, тобто мати @.
const phoneRegex = /(\+)?([- _():=+]?\d[- _():=+]?){8,14}/

const func2=function validate(arr) {
    let res = "";
    for (let i of arr) {
        Object.keys(i).forEach((item) => {
            if (item === 'gender' || item === 'full_name' || item === 'note' || item === 'state' || item === 'city' || item === 'country') {
                if (typeof i[item] !== 'string') {
                    res += ` ! Error in object with name ${i.full_name}.\nValue type of field ${item} is ${typeof i[item]} ( ! string is required )\n\n`;
                } else if (i[item][0].toUpperCase() !== i[item][0]) {
                    res += ` ! Error in object with name ${i.full_name}.\nValue of field ${item} doesn't start with upper case ( ! upper case is required )\n\n`;
                }

            }
            if (item === 'age') {
                if (typeof i[item] !== 'number') {
                    res += ` ! Error in object with name ${i.full_name}.\nValue type of field ${item} is ${typeof i[item]} ( ! number is required )\n\n`;
                }
            }
            if (item === 'phone'){
            if (!phoneRegex.test(i[item])) {
                res += ` ! Error in object with name ${i.full_name}.\nPhone form does not match \n\n`;
            }
            }
            if (item === 'email') {
                    if (i[item].indexOf('@') === -1 || i[item].indexOf('@') === 0 || i === undefined || i === null || i[item] === 'string') {
                        res += ` ! Error in object with name ${i.full_name}.\nEmail doesn't have a symbol '@'\n\n`;
                    }
                }
    })
    }
    return res;
}

// const func2 = validate(arr);
// console.log(func2(arr));

//Завдання 3. Написати функцію фільтрації массиву обєктів за параметрами (параметри змінними). Параметри є полями обєкту: country, age, gender, favorite. Фільтрація повинна працювати як логічне «і».
export function filterUser(country, age, gender, favorite, array) {
    return array.filter(item => item.country === country && item.age === age && item.gender === gender && item.favorite === favorite);
}

const func3 = filterUser('Germany', 65, 'male', true, arr);
// console.log(func3);

//Завдання 4. Написати функцію сортування массиву обєктів за параметрами (параметри змінними). Сортування може бути як за зростанням так і за спаданням.Сортуватись можуть чисельні поля та строкові: full_name, age, b_day, country.
// Сортування працює по одному парамету (логічне «або»)

function sortUser(param, order = 'increase', array) {
    const way = order==='increase' ? 1 : -1;
    return array.sort((a, b) => (a[param] > b[param]) ? 1*way : ((b[param] > a[param]) ? -1*way : 0))
    // if (order === 'increase') {
    //     return array.sort((a, b) => (a[param] > b[param]) ? 1 : ((b[param] > a[param]) ? -1 : 0))
    // } else {
    //     return array.sort((a, b) => (b[param] > a[param]) ? 1 : ((a[param] > b[param]) ? -1 : 0))
    // }
}

const func4 = sortUser('full_name','increase',arr);
console.log(func4);


//Завдання 5. Знайти в масиві об’єкт, який відповідає параметру пошуку. Параметром може бути як строкове, так і чисельне поле: name, note, age.

// function findByParams (name, note, age, array)  {
//     return array.find(item => item.full_name === name && item.note === note && item.age === age);
// }
// const func5 = findByParams('ClaudePayne', 'Lorem Ipsum', 55, arr);
// console.log(func5);

// function findByParams (array, params){
//     return array.filter(param => Object.values(param).includes(params));
// }

function findUser(array, filed, arg) {
    // if (!(array && filed && arg && array[0][filed])) return "none"; // with this can't print array in task 6 func1
    return array.filter((user) => user[filed] === arg);
}
const func5 = findUser(arr, 'age',65)
// console.log(func5)


//Завдання 6. Написати функцію, яка повертає відсоток від загального числа обєктів в массиві, що відповідають пошуку. Тобто, якщо у нас пошук за віком більше 30, то
// функція поверне число відсотків, які відповідають кількості юзерів. Пр: загальна кількість юзерів – 50, з них 30 за віком більше 30 років, то функція поверне 60.
function getPercentOfUsers(array,field,arg) {
    const foundUsersByField = findUser(array,field,arg);
    return [findUser(array,field,arg) , ' percent by argument  '+ field +' : '+arg  +' ( '+ foundUsersByField.length+' ) in array ('+array.length+' ) is '+ (foundUsersByField.length / (array.length))*100+' % '];
}

const func6 = getPercentOfUsers(arr,'country','Germany');
// console.log(func6);

//наче для всіх
function f(array,field,arg) {
    const foundUser = array.filter((user) => user[field] === arg);
    return [foundUser, 'percent by argument  '+ field +' : '+arg  +' ( '+ foundUser.length+' ) in array ('+array.length+' ) is '+ (foundUser.length / (array.length))*100+' % '];

}
const func61 = f(arr,'country',"Germany");
// console.log(func61);


//більше по віку( менше рівне ?)
function getUsersAge (array,age){
    const filteredUsers = array.filter(item => item.age > age);
    return [filteredUsers,' more  than age : '+age  +' ( '+ filteredUsers.length+' ) in array ('+array.length+' ) is '+filteredUsers.length / array.length * 100]+' % ';
}
const func62 = getUsersAge(arr,65);
// console.log(func62);

