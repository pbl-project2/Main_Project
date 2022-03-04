const food = [
  {
    id: "1",
    name: "Poha",
    price: 20,
    type: "Snacks",
    avlibility: "Yes",
    marathi_name: "पोहा ",
    description:
      "Pohe is flattened rice that is steam cooked with onions, spices and herbs.",
  },
  {
    id: "2",
    name: "Upma",
    price: 20,
    type: "Snacks",
    avlibility: "Yes",
    marathi_name: "उपमा",
    description:
      "Upma is a flavorful South Indian breakfast dish made from rava in water that has been flavored by ghee (or oil), cashews, urad dal (lentils), chana dal (husked chickpeas), onion, ginger and additional herbs and spices. Sugar can be added for a mildly sweet and savory dish.",
  },
  {
    id: "2",
    name: "Poha Upma mix",
    price: 20,
    type: "Snacks",
    avlibility: "Yes",
    marathi_name: "पोहा  उपमा मिक्स",
    description:
      "This dish is usually mixtrue of poha and upma in this you will get half of plate poha and upma in this",
  },
  {
    id: "3",
    name: "Shira",
    price: 20,
    type: "Snacks",
    avlibility: "Yes",
    marathi_name: "शिरा",
    description:
      "A simple and classical south indian dessert recipe made with semolina, ghee and sugar. the recipe is generally made for breakfast and served as an accompaniment to a savory dishes like upma, khara bhath and poha. having said that the recipe can also be served as sweet or dessert for any meal including lunch and dinner",
  },
  {
    id: "4",
    name: "Wada Pav",
    price: 20,
    type: "Snacks",
    avlibility: "Yes",
    marathi_name: "वडा-पाव",
    description:
      "The dish consists of a deep fried potato dumpling placed inside a bread bun (pav) sliced almost in half through the middle. It is generally accompanied with one or more chutneys and a green chili.",
  },
  {
    id: "5",
    name: "Pateis",
    price: 20,
    type: "Snacks",
    avlibility: "Yes",
    marathi_name: "पेटीस",
    description:
      "This snack is nothing but potatoes stuffing between 2 triangle shaped bread slices.",
  },
  {
    id: "6",
    name: "Samosa",
    price: 15,
    type: "Snacks",
    avlibility: "Yes",
    marathi_name: "समोसा",
    description:
      "A samosa is a fried or baked pastry with a savory filling, including ingredients such as spiced potatoes, onions, peas , herbs and many more.",
  },
  {
    id: "7",
    name: "Kanda Bhaji",
    price: 15,
    type: "Snacks",
    avlibility: "Yes",
    marathi_name: "कांदा भजी",
    description:
      "Kanda bhaji are crisp and crunchy fried fritters made mainly with onions and gram flour.",
  },

  {
    id: "7",
    name: "Batata Bhaji",
    price: 25,
    type: "Snacks",
    avlibility: "Yes",
    marathi_name: "बटाटा भजी",
    description:
      "Batata bhaji are crisp and crunchy fried ovel shaped made mainly with Potato and gram flour.",
  },
  {
    id: "8",
    name: "Single Wada",
    price: 15,
    type: "Snacks",
    avlibility: "Yes",
    marathi_name: "सिंगल वडा",
    description:
      "The dish consists of a deep fried potato dumpling cooked with Potato, onions, spices and herbs.",
  },
  {
    id: "9",
    name: "Pav Jodi",
    price: 15,
    type: "Snacks",
    meal: "Break Fast",
    avlibility: "Yes",
    marathi_name: "पाव जोडी ",
    description: "This includes couple of bread",
  },
  {
    id: "10",
    name: "Idli Sambhar",
    price: 30,
    type: "Snacks",
    avlibility: "Yes",
    marathi_name: "इडली संभार ",
    description:
      "Idli Sambar is a hearty, satisfying, comforting and a healthy meal of soft fluffy idlis served with savory, spiced and lightly tangy sambar – a vegetable stew made with lentils and assorted vegetables.",
  },
  {
    id: "11",
    name: "Single Idli Wada",
    price: 20,
    type: "Snacks",
    avlibility: "Yes",
    marathi_name: "सिंगल इडली संभार ",
    description: "",
  },
  {
    id: "12",
    name: "Udid Wada Sambhar",
    price: 40,
    type: "Snacks",
    avlibility: "Yes",
    marathi_name: "उडीद वाडा संभार ",
    description: "",
  },
  {
    id: "13",
    name: "Idli Wada Mix",
    price: 40,
    type: "Snacks",
    avlibility: "Yes",
    marathi_name: "इडली वडा मिक्स",
    description: "",
  },
  {
    id: "14",
    name: "Batata Wada Sambhar",
    price: 40,
    type: "Snacks",
    avlibility: "Yes",
    marathi_name: "बटाटा वडा सांभार",
    description: "",
  },
  {
    id: "15",
    name: "Single Wada Sambhar",
    price: 25,
    type: "Snacks",
    avlibility: "Yes",
    marathi_name: "सिंगल वडा सांभार",
    description: "",
  },
  {
    id: "16",
    name: "Batata Bhaji",
    price: 25,
    type: "Snacks",
    avlibility: "Yes",
    marathi_name: "बटाटा भजी",
    description: "",
  },
  {
    id: "17", //
    name: "Bhel",
    price: 25,
    type: "Snacks",
    avlibility: "Yes",
    marathi_name: "भेळ",
    description: "Crispy crunched with different flavour.",
  },
  {
    id: "18", //
    name: "Mango lassi",
    price: 20,
    type: "Beverages",
    avlibility: "Yes",
    marathi_name: "मँगो लस्सी",
    description: "Summer refreshments made from original mango pulp.",
  },
  {
    id: "19", //
    name: "Tea",
    price: 10,
    type: "Beverages",
    avlibility: "Yes",
    marathi_name: "चहा",
    description: "Special tea with elachi and ginger.",
  },
  {
    id: "20", //
    name: "Coffee",
    price: 15,
    type: "Beverages",
    avlibility: "Yes",
    marathi_name: "कॉफी",
    description: "Made with brazilian coca.",
  },
  {
    id: "21", //
    name: " Hot Elachi Milk",
    price: 20,
    type: "Beverages",
    avlibility: "Yes",
    marathi_name: "गरम इलाची दूध",
    description: "The essence of the pure milk.",
  },
  {
    id: "22", //
    name: "Butter milk",
    price: 25,
    type: "Beverages",
    avlibility: "Yes",
    marathi_name: "लोणी दूध",
    description: "Summer refreshment taste and quality.",
  },
  {
    id: "23", //
    name: "Soft drinks",
    price: 20,
    type: "Beverages",
    avlibility: "Yes",
    marathi_name: "शीतपेये",
    description: "All kinds of soft drinks are available.",
  },
  {
    id: "24", //
    name: "Thick cold coffee",
    price: 30,
    type: "beverages",
    avlibility: "Yes",
    marathi_name: " थिक कोल्ड कॉफी",
    description: "Thick coffee with some crunches and chocolate.",
  },
  {
    id: "25", //
    name: "Cold coffee with ice cream",
    price: 45,
    type: "Beverages",
    avlibility: "Yes",
    marathi_name: "आइस्क्रीम सह कोल्ड कॉफी",
    description: "Thick cold coffee with flavoured ice cream.",
  },
  {
    id: "26", //
    name: "Chappati Bhaji",
    price: 60,
    type: "Lunch",
    avlibility: "Yes",
    marathi_name: "चपाती भाजी",
    description: "Feel the taste of home made lunch.",
  },
  {
    id: "27", //
    name: "Pulav Rice",
    price: 40,
    type: "Lunch",
    avlibility: "Yes",
    marathi_name: "पुलाव भात",
    description:
      "Including all types of veggies and delighted garnished rice.",
  },
  {
    id: "28", //
    name: "Masala Papad ",
    price: 10,
    type: "Snacks",
    avlibility: "Yes",
    marathi_name: "मसाला पापड",
    description: "A good starter with brand LIJJAT Papads.",
  },
  {
    id: "29", //
    name: "Fried Rice",
    price: 40,
    type: "lunch",
    avlibility: "Yes",
    marathi_name: "फ्राईडी रईस ",
    description: "Good for health good to taste.",
  },
  {
    id: "30", //
    name: "Veg Noodles",
    price: 40,
    type: "Lunch",
    avlibility: "Yes",
    marathi_name: "व्हीज नूडल्स ",
    description: "Made from maida essence of veggies.",
  },
  {
    id: "31", //
    name: "Masala Dosa",
    price: 30,
    type: "Snacks",
    avlibility: "Yes",
    marathi_name: "मसाला डोसा ",
    description: "South Indian food with sambar and chutney",
  },
  {
    id: "32", //
    name: "Khara puffs",
    price: 20,
    type: "Snacks",
    avlibility: "Yes",
    marathi_name: "खरा पफ ",
    description: "Stuffing of masala potato in khari.",
  },
];
// for (let i = 0; i < food.length; i++) {
//   coid: "1", nsole.log(food[i].
//     name);
//   console.log(food[i].marathi_name);
//   console.log(food[i].price);
//   console.log(food[i].type);
//   //console.log(food[i].meal);
//   console.log(food[i].avlibility);
//   console.log(food[i].description);
//   console.log("\n")
// }
