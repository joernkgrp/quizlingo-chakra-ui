const questions = [
  {
    id: 17,
    category: "grammar",
    level: 1,
    type: "gap",
    taskText: "Welcher Ausdruck ist korrekt?",
    questionText: "No existe … problema.",
    terms: ["problema", "ningún"],
    options: ["un", "de", "ninguna", "ningún"],
    correctOption: 3,
  },
  {
    id: 14,
    category: "grammar",
    type: "gap",
    taskText: "Welcher Satz ist korrekt?",
    questionText: "Lola es una chica … ",
    terms: [
      "simpático",
      "sociable",
      "joven",
      "guapo",
      "organizado",
      "inteligente",
      "fuerte",
      "abierto",
    ],
    options: [
      "simpático y sociable.",
      "joven y guapa.",
      "organizado y inteligente.",
      "fuerte y abierto.",
    ],
    correctOption: 1,
    level: 1,
  },
  {
    id: 5,
    category: "grammar",
    level: 1,
    type: "translate",
    taskText: "Wie sagt man folgenden Satz auf Spanisch?",
    questionText: "Sie ist 72 Jahre alt.",
    terms: ["terms"],
    options: [
      "Tengo setenta y dos años.",
      "Tiene setenta y dos años.",
      "Tiene setenta dos años.",
      "Tienes setenta dos años.",
    ],
    correctOption: 1,
  },
  {
    id: 4,
    category: "grammar",
    level: 2,
    type: "translate",
    taskText: "Wie sagt man folgenden Satz auf Spanisch?",
    questionText: "Wo ist unser Hotel?",
    terms: ["terms"],
    options: [
      "¿Dónde está nuestro hotel?",
      "¿Aquí está nuestro hotel?",
      "¿Cuándo está nuestra hotel?",
      "¿Dónde es nuestro hotel?",
    ],
    correctOption: 0,
  },
  {
    id: 3,
    category: "grammar",
    level: 1,
    type: "translate",
    taskText: "Wie sagt man folgenden Satz auf Spanisch?",
    questionText: "Die Strecke geht über Sevilla.",
    terms: ["terms"],
    options: [
      "La routa pasa par Sevilla.",
      "La routa corre por Sevilla.",
      "La ruta pasa por Sevilla.",
      "La ruta corre para Sevilla.",
    ],
    correctOption: 2,
  },
];

export { questions };
