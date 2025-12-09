
// =======================
// SUBJECT NOTES DATA (FIXED FORMAT)
// =======================
const sampleNote = [
  {
    subject: "Mathematics(M3)",
    branch: "ECE",
    semester: 3,
    resources: {
      notes: {
        module_1: {
          url: "https://drive.google.com/file/d/1NKm5XG3iG61tZB6OCtuPsHjhAwYvdn8C/view?usp=sharing",
          filename: "Mathematics_M3_Module1.pdf"
        },
        module_2: {
          url: "https://drive.google.com/file/d/1JVJz4zJw3ce4WAakkrXD7oOf_4tq4Qvd/view?usp=sharing",
          filename: "Mathematics_M3_Module2.pdf"
        },
        module_3: {
          url: "https://drive.google.com/file/d/1P6nqEvQ9cd7XY5I-8WIZWUXs3cUQS3Uh/view?usp=sharing",
          filename: "Mathematics_M3_Module3.pdf"
        },
        module_4: {
          url: "https://drive.google.com/file/d/1P6nqEvQ9cd7XY5I-8WIZWUXs3cUQS3Uh/view?usp=sharing",
          filename: "Mathematics_M3_Module4.pdf"
        },
        module_5: {
          url: "https://docs.google.com/document/d/1KhXfQ5CzLgfpUjQag9ZYLOtj15f3IIir/edit#heading=h.k7psfdy6cc1d",
          filename: "Mathematics_M3_Module5.doc"
        }
      }
    }
  },

  {
    subject: "Analog and Digital",
    branch: "ECE",
    semester: 3,
    resources: {
      notes: {
        module_1: {
          url: "https://drive.google.com/file/d/1cp6fhiRKhX1ZsGUBk8xJ_BFy0mI3zODY/view?usp=sharing",
          filename: "Analog_Digital_Module1.pdf"
        },
        module_2: {
          url: "https://drive.google.com/file/d/1oMvo8zQ5dzDJbV-Wz5rGVwpg1Nvi2iN1/view?usp=sharing",
          filename: "Analog_Digital_Module2.pdf"
        },
        module_3: {
          url: "https://drive.google.com/file/d/1PJx38cq8FnAt9l22Yr2hCWBOHyJMoGy6/view?usp=sharing",
          filename: "Analog_Digital_Module3.pdf"
        },
        module_4: {
          url: "https://drive.google.com/file/d/1SLlY5eVP9oX-2j-xu0eajjFjW1qFi5zO/view?usp=sharing",
          filename: "Analog_Digital_Module4.pdf"
        },
        module_5: {
          url: "https://drive.google.com/file/d/1NYRNSfQ-D0kL5DsZU_ojQRbzH-_M8Db2/view?usp=sharing",
          filename: "Analog_Digital_Module5.pdf"
        }
      }
    }
  },

  {
    subject: "Basic Electronics",
    branch: "ECE",
    semester: 2,
    resources: {
      notes: {
        module_1: {
          url: "https://drive.google.com/file/d/1cp6fhiRKhX1ZsGUBk8xJ_BFy0mI3zODY/view?usp=sharing",
          filename: "Basic_Electronics_Module1.pdf"
        },
        module_2: {
          url: "https://drive.google.com/file/d/1oMvo8zQ5dzDJbV-Wz5rGVwpg1Nvi2iN1/view?usp=sharing",
          filename: "Basic_Electronics_Module2.pdf"
        },
        module_3: {
          url: "https://drive.google.com/file/d/1PJx38cq8FnAt9l22Yr2hCWBOHyJMoGy6/view?usp=sharing",
          filename: "Basic_Electronics_Module3.pdf"
        },
        module_4: {
          url: "https://docs.google.com/document/d/1SUsufxAd5x9DvdkF5AcYettPza0SZn0B0iA1wn22tX4/edit?usp=sharing",
          filename: "Basic_Electronics_Module4.doc"
        },
        module_5: {
          url: "https://drive.google.com/file/d/1NYRNSfQ-D0kL5DsZU_ojQRbzH-_M8Db2/view?usp=sharing",
          filename: "Basic_Electronics_Module5.pdf"
        }
      }
    }
  }
];

// =======================
// DEGREE LEVEL QUIZ DATA - 10+ QUESTIONS EACH
// =======================
const quizData = {
  'analog electronics': [
    {question: "Primary function of capacitor in AC circuit?", options: ["Store energy", "Block DC pass AC", "Amplify signals", "Rectify AC"], answer: "Block DC pass AC"},
    {question: "CMRR in op-amp stands for?", options: ["Common Mode Rejection Ratio", "Current Mode Rejection Rate", "Common Magnitude Response Ratio", "Coupled Mode Rejection Ratio"], answer: "Common Mode Rejection Ratio"},
    {question: "Which is active component?", options: ["Resistor", "Capacitor", "Transistor", "Diode"], answer: "Transistor"},
    {question: "Unit of transconductance?", options: ["Siemens", "Ohm", "Farad", "Henry"], answer: "Siemens"},
    {question: "CE amplifier voltage gain depends on?", options: ["RC only", "RE only", "Both RC and RE", "Neither"], answer: "Both RC and RE"},
    {question: "Zener diode in reverse bias does?", options: ["Conducts normally", "Avalanche breakdown", "Blocks current", "Heats up"], answer: "Avalanche breakdown"},
    {question: "Highest gain coupling?", options: ["RC coupling", "Direct coupling", "Transformer coupling", "DC coupling"], answer: "Transformer coupling"},
    {question: "Biasing purpose?", options: ["Increase distortion", "Set Q-point", "Reduce gain", "Block DC"], answer: "Set Q-point"},
    {question: "Op-amp ideal input impedance?", options: ["Zero", "Infinite", "1kΩ", "10kΩ"], answer: "Infinite"},
    {question: "Negative feedback in amplifiers?", options: ["Increases gain", "Reduces distortion", "Increases bandwidth", "Both B & C"], answer: "Both B & C"}
  ],
  'digital electronics': [
    {question: "Flip-flop is?", options: ["Combinational", "Sequential with memory", "Logic gate", "Multiplexer"], answer: "Sequential with memory"},
    {question: "Fastest logic family?", options: ["TTL", "ECL", "CMOS", "DCTL"], answer: "ECL"},
    {question: "Race condition is?", options: ["Timing problem flip-flops", "Memory overflow", "Power failure", "Clock stop"], answer: "Timing problem flip-flops"},
    {question: "NAND gates for full adder?", options: ["2", "3", "4", "9"], answer: "9"},
    {question: "MUX stands for?", options: ["Maximum", "Multiplexer", "Memory unit", "Modulator"], answer: "Multiplexer"},
    {question: "DEMUX is?", options: ["One to many", "Many to one", "One to one", "None"], answer: "One to many"},
    {question: "JK flip-flop characteristic?", options: ["Toggle on J=K=1", "Set on J=1", "Reset on K=1", "Hold always"], answer: "Toggle on J=K=1"},
    {question: "Propagation delay unit?", options: ["sec", "Hz", "V", "mA"], answer: "sec"},
    {question: "Ring counter uses?", options: ["1 flip-flop", "n flip-flops", "2 flip-flops", "4 flip-flops"], answer: "n flip-flops"},
    {question: "Priority encoder?", options: ["Single input active", "Multiple inputs highest priority", "All inputs equal", "No priority"], answer: "Multiple inputs highest priority"}
  ],
  'mathematics': [
    {question: "Derivative of sin(x)?", options: ["cos(x)", "-sin(x)", "1/cos(x)", "x cos(x)"], answer: "cos(x)"},
    {question: "Matrix A(m×n) × B(n×p) result?", options: ["m×p", "n×n", "m×n", "p×m"], answer: "m×p"},
    {question: "∫x² dx = ?", options: ["x³/3+C", "x³+C", "3x+C", "x²/2+C"], answer: "x³/3+C"},
    {question: "sin(90°)=?", options: ["0", "1", "0.5", "-1"], answer: "1"},
    {question: "lim x→0 sin(x)/x?", options: ["0", "1", "∞", "undefined"], answer: "1"},
    {question: "Determinant 2×2 matrix?", options: ["ad-bc", "a+d", "ab-cd", "a-b"], answer: "ad-bc"},
    {question: "e^x derivative?", options: ["e^x", "x e^x", "1", "0"], answer: "e^x"},
    {question: "Laplace of 1?", options: ["1/s", "s", "1/s²", "e^{-s}"], answer: "1/s"},
    {question: "cos(0°)=?", options: ["0", "1", "0.5", "-1"], answer: "1"},
    {question: "Taylor series at x=0 called?", options: ["Maclaurin", "Laurent", "Fourier", "Power series"], answer: "Maclaurin"}
  ],
  'basic electronics': [
    {question: "Unit of resistance?", options: ["Volt", "Ampere", "Ohm", "Watt"], answer: "Ohm"},
    {question: "Ohm's law is?", options: ["V=IR", "P=VI", "I=V/R", "All of above"], answer: "V=IR"},
    {question: "PN junction works on?", options: ["Diffusion", "Drift", "Both diffusion & drift", "Neither"], answer: "Both diffusion & drift"},
    {question: "Diode forward bias voltage?", options: ["0.3V", "0.7V", "1.2V", "5V"], answer: "0.7V"},
    {question: "LED stands for?", options: ["Light Emitting Diode", "Light Energy Diode", "Laser Emitting Device", "Light Electric Diode"], answer: "Light Emitting Diode"},
    {question: "Transistor has how many layers?", options: ["1", "2", "3", "4"], answer: "3"},
    {question: "NPN transistor current flow?", options: ["Emitter to collector", "Collector to emitter", "Base to emitter", "Base to collector"], answer: "Emitter to collector"},
    {question: "Rectifier converts?", options: ["AC to DC", "DC to AC", "AC to AC", "DC to DC"], answer: "AC to DC"},
    {question: "Filter capacitor purpose?", options: ["Block DC", "Smooth ripple", "Increase voltage", "Decrease current"], answer: "Smooth ripple"},
    {question: "Voltage regulator IC?", options: ["7805", "7404", "555", "741"], answer: "7805"}
  ],
  // Add this to your quizData object in data.js:
'physics': [
  {question: "Newton's first law?", options: ["Law of inertia", "Action-reaction", "Gravitation", "Acceleration"], answer: "Law of inertia"},
  {question: "Force unit?", options: ["Joule", "Newton", "Watt", "Pascal"], answer: "Newton"},
  {question: "Work = ?", options: ["Force × Distance", "Force × Time", "Power × Time", "Energy"], answer: "Force × Distance"},
  {question: "Speed of light?", options: ["3×10⁸ m/s", "3×10⁶ m/s", "3×10¹⁰ m/s", "3×10⁴ m/s"], answer: "3×10⁸ m/s"},
  {question: "Gravity on Earth?", options: ["9.8 m/s²", "10 m/s²", "8.9 m/s²", "9.5 m/s²"], answer: "9.8 m/s²"}
],

'electrical engineering': [
            {question: "Kirchhoff's Voltage Law?", options: ["Sum currents=0", "Sum voltages loop=0", "Power conserved", "Charge conserved"], answer: "Sum voltages loop=0"},
            {question: "Power unit?", options: ["Joule", "Watt", "Volt", "Ampere"], answer: "Watt"},
            {question: "Power factor=?", options: ["V/I", "cosφ", "Real power", "Apparent power"], answer: "cosφ"},
            {question: "Transformer works on?", options: ["DC only", "AC only", "Both", "Neither"], answer: "AC only"},
            {question: "RMS value of sine wave?", options: ["Peak/√2", "Peak", "Peak/2", "Average"], answer: "Peak/√2"},
            {question: "Star-delta conversion used in?", options: ["DC circuits", "AC unbalanced loads", "Digital circuits", "Power electronics"], answer: "AC unbalanced loads"},
            {question: "Inductor opposes?", options: ["Voltage change", "Current change", "Power change", "Frequency change"], answer: "Current change"},
            {question: "Form factor sine wave?", options: ["1.11", "1", "0.707", "1.414"], answer: "1.11"},
            {question: "DC motor speed control by?", options: ["Armature voltage", "Field flux", "Both", "Neither"], answer: "Both"},
            {question: "3-phase power formula?", options: ["√3 V I cosφ", "V I cosφ", "3 V I cosφ", "V I"], answer: "√3 V I cosφ"}
        ],

        'operating system': [
            {question: "Deadlock condition?", options: ["Mutual exclusion", "Hold & wait", "No preemption", "Circular wait"], answer: "All conditions"},
            {question: "Page replacement FIFO?", options: ["First in first out", "Least recently used", "Optimal", "Random"], answer: "First in first out"},
            {question: "Semaphore is?", options: ["Variable", "Sync primitive", "Memory block", "Process"], answer: "Sync primitive"},
            {question: "Thrashing occurs when?", options: ["Too many processes", "Low memory", "High CPU", "All above"], answer: "Too many processes"},
            {question: "Round Robin uses?", options: ["Fixed time quantum", "Priority", "Shortest job", "Longest job"], answer: "Fixed time quantum"},
            {question: "Virtual memory uses?", options: ["Paging", "Segmentation", "Both", "Neither"], answer: "Both"},
            {question: "Critical section problem?", options: ["Mutual exclusion", "Progress", "Bounded waiting", "All three"], answer: "All three"},
            {question: "Banker's algorithm for?", options: ["Deadlock avoidance", "Deadlock detection", "Scheduling", "Memory allocation"], answer: "Deadlock avoidance"},
            {question: "Context switch time?", options: ["Process dependent", "Fixed", "Variable", "Zero"], answer: "Variable"},
            {question: "FCFS scheduling?", options: ["Non-preemptive", "Preemptive", "Priority based", "Shortest job"], answer: "Non-preemptive"}
        ],

        'dsa': [
            {question: "Binary search time complexity?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], answer: "O(log n)"},
            {question: "Linked list vs array?", options: ["Dynamic size", "Random access", "Cache friendly", "Fixed size"], answer: "Dynamic size"},
            {question: "Stack follows?", options: ["LIFO", "FIFO", "Random", "Priority"], answer: "LIFO"},
            {question: "Queue follows?", options: ["LIFO", "FIFO", "Random", "Priority"], answer: "FIFO"},
            {question: "Tree traversal inorder?", options: ["Left-Root-Right", "Root-Left-Right", "Left-Right-Root", "Root-Right-Left"], answer: "Left-Root-Right"},
            {question: "Hash table collision resolution?", options: ["Chaining", "Open addressing", "Both", "Neither"], answer: "Both"},
            {question: "AVL tree property?", options: ["Height balanced", "Weight balanced", "Color balanced", "Size balanced"], answer: "Height balanced"},
            {question: "Dijkstra's algorithm for?", options: ["Shortest path", "Longest path", "Minimum spanning tree", "Maximum flow"], answer: "Shortest path"},
            {question: "Bubble sort time complexity?", options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"], answer: "O(n²)"},
            {question: "Graph cycle detection?", options: ["DFS", "BFS", "Both", "Neither"], answer: "Both"}
        ],

        'c++': [
            {question: "Polymorphism means?", options: ["Single form", "Multiple forms", "Data hiding", "Inheritance"], answer: "Multiple forms"},
            {question: "Virtual function purpose?", options: ["Runtime polymorphism", "Compile time polymorphism", "Data hiding", "Memory management"], answer: "Runtime polymorphism"},
            {question: "Class access specifier?", options: ["public", "private", "protected", "All three"], answer: "All three"},
            {question: "Constructor called?", options: ["Object creation", "Object destruction", "Function call", "None"], answer: "Object creation"},
            {question: "STL stands for?", options: ["Standard Template Library", "Simple Template Library", "Static Template Library", "System Template Library"], answer: "Standard Template Library"}
        ],

        'chemistry': [
            {question: "Avogadro's number?", options: ["6.022×10²³", "6.626×10⁻³⁴", "9.109×10⁻³¹", "1.602×10⁻¹⁹"], answer: "6.022×10²³"},
            {question: "pH of neutral solution?", options: ["0", "7", "14", "1"], answer: "7"},
            {question: "Atomic number=?", options: ["Protons", "Neutrons", "Electrons", "Nucleons"], answer: "Protons"},
            {question: "Boyle's law?", options: ["P∝1/V", "V∝T", "P∝T", "All above"], answer: "P∝1/V"}
        ],
        'java': [
            {question: "Inheritance keyword?", options: ["implements", "extends", "inherits", "super"], answer: "extends"},
            {question: "Java is?", options: ["Platform dependent", "Platform independent", "Machine dependent", "None"], answer: "Platform independent"},
            {question: "JVM stands for?", options: ["Java Virtual Machine", "Java Verified Machine", "Java Vector Machine", "Java Visual Machine"], answer: "Java Virtual Machine"}
        ],

        'python': [
            {question: "len() returns?", options: ["Length", "List elements", "Object type", "Memory address"], answer: "Length"},
            {question: "Python is?", options: ["Compiled", "Interpreted", "Both", "None"], answer: "Interpreted"},
            {question: "List slicing [1:3]?", options: ["Index 1,2", "Index 1,2,3", "Index 0,1,2", "All"], answer: "Index 1,2"}
        ]

};

// =======================
// BACKWARDS COMPATIBILITY - Old quizzes format
// =======================
const quizzes = [
  {
    subject: "Mathematics",
    questions: quizData['mathematics'] || []
  },
  {
    subject: "Analog and Digital",
    questions: quizData['analog electronics'] || []
  }
];

// =======================
// YOUTUBE LINKS
// =======================
const youtubeLinks = [
  {
    subject: "Mathematics",
    videos: [
      { title: "Trigonometry Basics", link: "https://youtube.com/watch?v=AAA" },
      { title: "Differentiation Full Course", link: "https://youtube.com/watch?v=BBB" }
    ]
  },
  {
    subject: "Analog and Digital",
    videos: [
      { title: "Logic Gates Explained", link: "https://youtube.com/watch?v=CCC" }
    ]
  }
];

// =======================
// SYLLABUS DATA
// =======================

 const syllabusData = {
  "Mathematics": {
    url: "https://drive.google.com/file/d/1PJx38cq8FnAt9l22Yr2hCWBOHyJMoGy6/view?usp=sharing",
    filename: "Mathematics_Syllabus.pdf"
  },

  "Analog and Digital Electronics": {
    url: "https://drive.google.com/file/d/1PJx38cq8FnAt9l22Yr2hCWBOHyJMoGy6/view?usp=sharing",
    filename: "ADE_Syllabus.pdf"
  },

  "Basic Electronics": {
    url: "https://drive.google.com/file/d/1PJx38cq8FnAt9l22Yr2hCWBOHyJMoGy6/view?usp=sharing",
    filename: "Basic_Electronics_Syllabus.pdf"
  },

  "Programming in C": {
    url: "https://drive.google.com/file/d/1PJx38cq8FnAt9l22Yr2hCWBOHyJMoGy6/view?usp=sharing",
    filename: "C_Programming_Syllabus.pdf"
  }
};


// =======================
// PREVIOUS QUESTION_PAPER DATA
// =======================
const paperData = {
  "Mathematics": [
    "https://drive.google.com/file/d/1Q3XTfABRu9B6BeVLmaSvfEpBBRekdMnX/view?usp=sharing",
    "https://drive.google.com/file/d/1fvnB0iLx-q-7WsvVEdewBebPUDO_Rhrb/view?usp=sharing",
    "https://drive.google.com/file/d/15eVvhayxbR4oyzeVSz0u9w7S5tb5SSE1/view?usp=sharing",
    "https://drive.google.com/file/d/1yV_g1YNMwzGSK2DmYi1yh80gGJcmxPq1/view?usp=sharing",
  ],
  "Analog and Digital": [
    "https://drive.google.com/file/d/1yV_g1YNMwzGSK2DmYi1yh80gGJcmxPq1/view?usp=sharing",
    "https://drive.google.com/file/d/1yV_g1YNMwzGSK2DmYi1yh80gGJcmxPq1/view?usp=sharing"
  ]
};

// =======================
// NEW: QUIZ HELPER FUNCTION (for app.js)
// =======================
// =======================
// UPDATED: QUIZ HELPER FUNCTION (Better error handling)
// =======================
const getQuizQuestions = (subject, count = 10) => {
  const subjectKey = subject.toLowerCase().trim();
  const available = quizData[subjectKey] || [];
  
  if (available.length === 0) {
    // NO QUIZ - REDIRECT WITH FLASH MESSAGE
    throw new Error(`No questions available for "${subject}". Available subjects: ${Object.keys(quizData).join(', ')}`);
  }
  
  return available.slice(0, count).map(q => ({
    question: q.question,
    options: q.options.sort(() => Math.random() - 0.5),
    answer: q.answer
  }));
};


// EXPORT EVERYTHING
module.exports = {
  sampleNote,
  quizzes,
  quizData,        // NEW: Full quiz database
  getQuizQuestions, // NEW: Helper function for app.js
  youtubeLinks,
  syllabusData,
  paperData
};






































