var express = require('express');
var router = express.Router();
const { uniqueNamesGenerator, names, colors } = require('unique-names-generator');
var randomBirthday = require('random-birthday');

var caesarShift = function (str, amount) {
  if (amount < 0) {
    return caesarShift(str, amount + 26);
  }
  var output = "";
  for (var i = 0; i < str.length; i++) {
    var c = str[i];
    if (c.match(/[a-z]/i)) {
      // Get its code
      var code = str.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
      }
      else if (code >= 97 && code <= 122) {
        c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
      }
    }
    output += c;
  }
  return output;
};

// Setting up last name list
const lastNames = ['Smith','Johnson','Williams','Jones','Brown','Davis','Miller','Wilson','Moore','Taylor','Anderson','Thomas','Jackson','White','Harris','Martin','Thompson','Garcia','Martinez','Robinson','Clark','Rodriguez','Lewis','Lee','Walker','Hall','Allen','Young','Hernandez','King','Wright','Lopez','Hill','Scott','Green','Adams','Baker','Gonzalez','Nelson','Carter','Mitchell','Perez','Roberts','Turner','Phillips','Campbell','Parker','Evans','Edwards','Collins','Stewart','Sanchez','Morris','Rogers','Reed','Cook','Morgan','Bell','Murphy','Bailey','Rivera','Cooper','Richardson','Cox','Howard','Ward','Torres','Peterson','Gray','Ramirez','James','Watson','Brooks','Kelly','Sanders','Price','Bennett','Wood','Barnes','Ross','Henderson','Coleman','Jenkins','Perry','Powell','Long','Patterson','Hughes','Flores','Washington','Butler','Simmons','Foster','Gonzales','Bryant','Alexander','Russell','Griffin','Diaz','Hayes','Myers','Ford','Hamilton','Graham','Sullivan','Wallace','Woods','Cole','West','Jordan','Owens','Reynolds','Fisher','Ellis','Harrison','Gibson','McDonald','Cruz','Marshall','Ortiz','Gomez','Murray','Freeman','Wells','Webb','Simpson','Stevens','Tucker','Porter','Hunter','Hicks','Crawford','Henry','Boyd','Mason','Morales','Kennedy','Warren','Dixon','Ramos','Reyes','Burns','Gordon','Shaw','Holmes','Rice','Robertson','Hunt','Black','Daniels','Palmer','Mills','Nichols','Grant','Knight','Ferguson','Rose','Stone','Hawkins','Dunn','Perkins','Hudson','Spencer','Gardner','Stephens','Payne','Pierce','Berry','Matthews','Arnold','Wagner','Willis','Ray','Watkins','Olson','Carroll','Duncan','Snyder','Hart','Cunningham','Bradley','Lane','Andrews','Ruiz','Harper','Fox','Riley','Armstrong','Carpenter','Weaver','Greene','Lawrence','Elliott','Chavez','Sims','Austin','Peters','Kelley','Franklin','Lawson','Fields','Gutierrez','Ryan','Schmidt','Carr','Vasquez','Castillo','Wheeler','Chapman','Oliver','Montgomery','Richards','Williamson','Johnston','Banks','Meyer','Bishop','McCoy','Howell','Alvarez','Morrison','Hansen','Fernandez','Garza','Harvey','Little','Burton','Stanley','Nguyen','George','Jacobs','Reid','Kim','Fuller','Lynch','Dean','Gilbert','Garrett','Romero','Welch','Larson','Frazier','Burke','Hanson','Day','Mendoza','Moreno','Bowman','Medina','Fowler','Brewer','Hoffman','Carlson','Silva','Pearson','Holland','Douglas','Fleming','Jensen','Vargas','Byrd','Davidson','Hopkins','May','Terry','Herrera','Wade','Soto','Walters','Curtis','Neal','Caldwell','Lowe','Jennings','Barnett','Graves','Jimenez','Horton','Shelton','Barrett','Obrien','Castro','Sutton','Gregory','McKinney','Lucas','Miles','Craig','Rodriquez','Chambers','Holt','Lambert','Fletcher','Watts','Bates','Hale','Rhodes','Pena','Beck','Newman','Haynes','McDaniel','Mendez','Bush','Vaughn','Parks','Dawson','Santiago','Norris','Hardy','Love','Steele','Curry','Powers','Schultz','Barker','Guzman','Page','Munoz','Ball','Keller','Chandler','Weber','Leonard','Walsh','Lyons','Ramsey','Wolfe','Schneider','Mullins','Benson','Sharp','Bowen','Daniel','Barber','Cummings','Hines','Baldwin','Griffith','Valdez','Hubbard','Salazar','Reeves','Warner','Stevenson','Burgess','Santos','Tate','Cross','Garner','Mann','Mack','Moss','Thornton','Dennis','McGee','Farmer','Delgado','Aguilar','Vega','Glover','Manning','Cohen','Harmon','Rodgers','Robbins','Newton','Todd','Blair','Higgins','Ingram','Reese','Cannon','Strickland','Townsend','Potter','Goodwin','Walton','Rowe','Hampton','Ortega','Patton','Swanson','Joseph','Francis','Goodman','Maldonado','Yates','Becker','Erickson','Hodges','Rios','Conner','Adkins','Webster','Norman','Malone','Hammond','Flowers','Cobb','Moody','Quinn','Blake','Maxwell','Pope','Floyd','Osborne','Paul','McCarthy','Guerrero','Lindsey','Estrada','Sandoval','Gibbs','Tyler','Gross','Fitzgerald','Stokes','Doyle','Sherman','Saunders','Wise','Colon','Gill','Alvarado','Greer','Padilla','Simon','Waters','Nunez','Ballard','Schwartz','McBride','Houston','Christensen','Klein','Pratt','Briggs','Parsons','McLaughlin','Zimmerman','French','Buchanan','Moran','Copeland','Roy','Pittman','Brady','McCormick','Holloway','Brock','Poole','Frank','Logan','Owen','Bass','Marsh','Drake','Wong','Jefferson','Park','Morton','Abbott','Sparks','Patrick','Norton','Huff','Clayton','Massey','Lloyd','Figueroa','Carson','Bowers','Roberson','Barton','Tran','Lamb','Harrington','Casey','Boone','Cortez','Clarke','Mathis','Singleton','Wilkins','Cain','Bryan','Underwood','Hogan','McKenzie','Collier','Luna','Phelps','McGuire','Allison','Bridges','Wilkerson','Nash','Summers','Atkins','Potter','Singh','Agarwal','Jain','Ahuja','Anand','Patel']

// Setting up pet name list
const petsNames = ["Max","Buddy","Charlie","Jack","Cooper","Rocky","Toby","Tucker","Jake","Bear","Duke","Teddy","Oliver","Riley","Bailey","Bentley","Milo","Buster","Cody","Dexter","Winston","Murphy","Leo","Lucky","Oscar","Louie","Zeus","Henry","Sam","Harley","Baxter","Gus","Sammy","Jackson","Bruno","Diesel","Jax","Gizmo","Bandit","Rusty","Marley","Jasper","Brody","Roscoe","Hank","Otis","Bo","Joey","Beau","Ollie","Tank","Shadow","Peanut","Hunter","Scout","Blue","Rocco","Simba","Tyson","Ziggy","Boomer","Romeo","Apollo","Ace","Luke","Rex","Finn","Chance","Rudy","Loki","Moose","George","Samson","Coco","Benny","Thor","Rufus","Prince","Chester","Brutus","Scooter","Chico","Spike","Gunner","Sparky","Mickey","Kobe","Chase","Oreo","Frankie","Mac","Benji","Bubba","Champ","Brady","Elvis","Copper","Cash","Archie","Walter"]

// Setting up common pet species list
const petSpecies = ["Dog","Cat","Goldfish","Rabbit","Hedgehog","Parrot","Hamster","Parakeet","Lizard","Owl","Finch"]

// Ordinal generation function (for general use)
function nth(n){return["st","nd","rd"][((n+90)%100-10)%10-1]||"th"}

// Function to generate a 'person' with data like their name, age, birthday, favorite color and pets name (species unused)
function generatePerson() {

    const TYPES = [
        "teen",
        "adult"
    ]

    var birthday = randomBirthday({ type: TYPES[Math.floor(Math.random() * TYPES.length)]})
    const day = Math.floor((Math.random() * 28) + 1);
    const out = { 
        person: {
                name: [uniqueNamesGenerator({dictionaries: [names]}).replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase()), uniqueNamesGenerator({dictionaries: [lastNames]}).replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase())],
                birthday: [birthday, {day: [day, day + nth(day)], month: birthday.toLocaleString('default', { month: 'long' }), year: birthday.getFullYear()}],
                color: uniqueNamesGenerator({dictionaries: [colors]}).replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase())
            },
        pet: {
            name: uniqueNamesGenerator({dictionaries: [petsNames]}).replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase()),
            species: uniqueNamesGenerator({dictionaries: [petSpecies]})
        }
    }
    // console.log(out)
    return out
}



function generatePassword(person) {

    // console.log(person)

    const personFirstName = person['person']['name'][0]
    const personLastName = person['person']['name'][1]
    const personBirthdayYear = person['person']['birthday'][1]['year'].toString().slice(-2)
    const personBirthdayDay = ('0' + person['person']['birthday'][1]['day'][0].toString()).slice(-2)
    const personBirthdayMonth = person['person']['birthday'][0].toLocaleDateString(`en`, {month:`2-digit`})
    const personFavoriteColor = person['person']['color']

    const petName = person['pet']['name']


    const types = 
    {
        1: {   
            password: `${personFirstName}${personLastName}${personBirthdayYear}`,
            aspects: ["person.firstName", "person.lastName", "person.birthdayYear.lastTwoDigits"]
        },
        2: {
            password: `${personFirstName}${personBirthdayDay}${personBirthdayMonth}`,
            aspects: ["person.firstName", "person.birthdayDay", "person.birthdayMonth"]
        },
        3: {
            password: `${personLastName.toLowerCase()}${personFirstName.toLowerCase()}@${personBirthdayYear}`,
            aspects: ["person.lastName.lower", "person.firstName.lower", "person.birthdayYear.lastTwoDigits"]
        },
        4: {
            password: `${personFavoriteColor.toLowerCase()}-${personFirstName.toLowerCase()}.${personBirthdayYear}`,
            aspects: ["person.favoriteColor", "hyphen", "person.firstName.lower", "dot", "person.birthdayYear.lastTwoDigits"]
        },
        5: {
            password: `${personFavoriteColor.toLowerCase()}-${petName.toLowerCase()}.${personBirthdayYear}`,
            aspects: ["person.favoriteColor.lower", "hyphen", "pet.name.lower", "dot", "person.birthdayYear.lastTwoDigits"]
        },
        6: {
            password: `${personFavoriteColor}-${personFirstName}@${personBirthdayDay}${personBirthdayMonth}`,
            aspects: ["person.favoriteColor", "hyphen", "person.firstName", "at", "person.birthdayYear", "person.birthdayMonth"]
        },
        7: {
            password: null
        },
        8: {
            password: null
        }
    }

    return types[Math.floor(Math.random() * 6) + 1]
}

function encryptData(person) {
    const data = [person['person']['name'][0] + " " + person['person']['name'][1], person['person']['color'], person['pet']['name']]
    var outData = []

    for (let i = 0; i < data.length; i++) {
        const randChance = Math.floor(Math.random() * 11);
        var randShift = Math.floor(Math.random() * 16) + 1
        
        if (Math.random() < 0.5) randShift = randShift * -1

        if (randChance >= 7) { // 30% chance
            outData.push(data[i])
        } else { // 70% chance
            outData.push(caesarShift(data[i], randShift) + ` (Shifted by ${randShift})`)
        }
    }

    return outData
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('welcome', { title: 'Express' });
});

router.get('/start', (req, res) => {
  res.render('start')
})

router.get('/round', (req, res) => {
  const person = generatePerson()
  const password = generatePassword(person)
  const encryptedData = encryptData(person)

  var aspectsEncrypted = []

  for (let i = 0; i < password['aspects'].length; i++) {
      const randChance = Math.floor(Math.random() * 11);
      var rand = Math.floor((Math.random() * 3) + 1)

      if (Math.random() < 0.5) rand = rand * -1

      if (randChance >= 5) { // 50% chance
          aspectsEncrypted.push(password['aspects'][i])
      } else { // 50% chance
          aspectsEncrypted.push(caesarShift(password['aspects'][i], rand) + ` (Shifted by ${rand})`)
      }
  }
  console.log(person, password, encryptedData, aspectsEncrypted)


  res.render('round', {
      person: person,
      password: password['password'],
      aspects: aspectsEncrypted,
      encryptedData: encryptedData
  })
})

router.post('/round', async (req, res) => {
  console.log('round', req.body)
})

router.get('/clear', (req, res) => {
  return res.render('clear')
})

module.exports = router;
