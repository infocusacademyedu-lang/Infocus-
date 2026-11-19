import {
  AcademySettings,
  AcademyTest,
  AdmissionEnquiry,
  Course,
  DoubtItem,
  EnrollmentRecord,
  NotificationItem,
  PaymentRecord,
  PracticeQuestion,
  StudyResource,
  TestAttempt,
  UserProfile,
} from '../types/academy';

export const IMG_HERO = '/src/assets/images/hero_infocus_learning_1795076768647.jpg';
export const IMG_BIO = '/src/assets/images/course_biology_lab_1795076768589.jpg';
export const IMG_CHEM = '/src/assets/images/course_chemistry_molecular_1795076767329.jpg';
export const IMG_FOUNDATION = '/src/assets/images/course_foundation_study_1795076768481.jpg';

export const INITIAL_SETTINGS: AcademySettings = {
  academyName: 'INFOCUS ACADEMY',
  mainTagline: 'Learn Better. Understand Deeper. Achieve More.',
  secondaryTagline: 'Your Concepts. Your Confidence. Your Future.',
  establishedYear: '2015',
  address: 'B-20, J-3 Market, DDA Flats, Kalkaji, New Delhi – 110019, India.',
  phones: ['8851008500', '8802196760'],
  razorpayConfigured: false,
  whatsappNumber: '918851008500',
  showPrototypeBanner: true,
};

export const FACULTY_PROFILE = {
  name: 'Jaidev Roy',
  alias: 'JDR Sir',
  qualifications: ['B.Sc. — University of Delhi', 'M.Sc. — University of Delhi'],
  experience: '10+ Years Teaching Experience',
  classes: 'Classes 11 and 12',
  subjects: ['Biology', 'Chemistry'],
  bio: 'Jaidev Roy, known as JDR Sir, focuses on helping students understand complex topics through simple explanations, concept-based teaching, practical examples, patience, and individual attention.',
  approach:
    'His approach encourages students to ask questions, build confidence, strengthen their fundamentals, and develop a better understanding of science.',
};

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-class-11',
    slug: 'class-11',
    title: 'Class 11 Science Program',
    subtitle: 'Build Strong Foundations for Advanced Science Learning.',
    categories: ['Class 11'],
    primaryCategory: 'Class 11',
    classOrExam: 'Class 11',
    subjects: ['Biology', 'Chemistry'],
    shortDescription:
      'Build a strong foundation in science through concept-based learning, clear explanations, detailed topic understanding, and guided academic preparation.',
    fullDescription:
      'Class 11 introduces the core conceptual framework for senior secondary science and future entrance examinations. This program helps students transition smoothly from school-level science to analytical Biology and Chemistry through step-by-step explanations, structured revision, and personal attention.',
    whoIsItFor: [
      'Students entering Class 11 seeking clarity in Biology and Chemistry fundamentals',
      'Learners preparing for school assessments alongside long-term NEET or CUET goals',
      'Students in Kalkaji and online learners looking for structured concept-first teaching',
    ],
    highlights: [
      'Biology concept learning',
      'Chemistry fundamentals',
      'Detailed topic explanations',
      'Concept clarity',
      'Academic practice',
      'Doubt-clearing support',
      'Revision support',
      'Preparation guidance',
    ],
    learningObjectives: [
      'Master fundamental biological classification, cell biology, and plant/human physiology basics',
      'Understand atomic structure, chemical bonding, thermodynamics, and organic chemistry basics',
      'Develop systematic note-making and answer-writing habits for school exams',
      'Practice topic-wise MCQs and descriptive problems consistently',
    ],
    facultyVerified: true,
    facultyName: 'Jaidev Roy (JDR Sir)',
    facultyRole: 'Senior Faculty — Biology & Chemistry',
    facultyQualifications: 'B.Sc. & M.Sc., University of Delhi · 10+ Years Teaching Experience',
    accessType: 'Free Preview Available',
    configuredFee: null,
    discountFee: null,
    durationLabel: 'Academic Session (Configurable)',
    published: true,
    thumbnail: IMG_BIO,
    seoTitle: 'Class 11 Coaching in Kalkaji | Biology & Chemistry — INFOCUS ACADEMY',
    seoDescription:
      'Class 11 Science Program for Biology and Chemistry in Kalkaji, New Delhi by Jaidev Roy (JDR Sir) at INFOCUS ACADEMY.',
    modules: [
      {
        id: 'mod-c11-1',
        moduleNumber: 'Module 01',
        title: 'The Living World',
        subject: 'Biology',
        description:
          'Sample curriculum structure introducing biological diversity, characteristics of living organisms, and taxonomic hierarchy.',
        lessons: [
          {
            id: 'les-c11-1-1',
            title: 'Introduction to Biology',
            description: 'Scope of modern biology and how conceptual study builds scientific reasoning.',
            durationLabel: 'Sample Structure',
            isFreePreview: true,
            hasVideo: true,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
            videoTitle: 'Sample Lecture Preview: Introduction to Biology',
          },
          {
            id: 'les-c11-1-2',
            title: 'Characteristics of Living Organisms',
            description: 'Growth, reproduction, metabolism, cellular organization, and consciousness.',
            durationLabel: 'Sample Structure',
            isFreePreview: true,
            hasVideo: true,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
          },
          {
            id: 'les-c11-1-3',
            title: 'Biodiversity',
            description: 'Nomenclature rules, ICBN/ICZN conventions, and species diversity.',
            durationLabel: 'Sample Structure',
            isFreePreview: false,
            hasVideo: true,
            hasNotes: true,
            hasPractice: false,
            isSampleStructure: true,
          },
          {
            id: 'les-c11-1-4',
            title: 'Taxonomy',
            description: 'Taxonomic categories from species to kingdom with examples.',
            durationLabel: 'Sample Structure',
            isFreePreview: false,
            hasVideo: true,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
          },
          {
            id: 'les-c11-1-5',
            title: 'Revision',
            description: 'Chapter recap, key definitions, and practice question walkthrough.',
            durationLabel: 'Sample Structure',
            isFreePreview: false,
            hasVideo: true,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
          },
        ],
      },
      {
        id: 'mod-c11-2',
        moduleNumber: 'Module 02',
        title: 'Biological Classification',
        subject: 'Biology',
        description:
          'Sample curriculum structure covering five-kingdom classification and microbial groups.',
        lessons: [
          {
            id: 'les-c11-2-1',
            title: 'Classification Overview',
            description: 'Historical systems and criteria for modern biological classification.',
            durationLabel: 'Sample Structure',
            isFreePreview: false,
            hasVideo: true,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
          },
          {
            id: 'les-c11-2-2',
            title: 'Kingdoms of Life',
            description: 'Monera, Protista, Fungi, Plantae, and Animalia comparative structure.',
            durationLabel: 'Sample Structure',
            isFreePreview: false,
            hasVideo: true,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
          },
          {
            id: 'les-c11-2-3',
            title: 'Key Characteristics',
            description: 'Cell wall composition, nutrition modes, and reproductive cycles.',
            durationLabel: 'Sample Structure',
            isFreePreview: false,
            hasVideo: true,
            hasNotes: true,
            hasPractice: false,
            isSampleStructure: true,
          },
          {
            id: 'les-c11-2-4',
            title: 'Concept Review',
            description: 'Summary tables and conceptual questions for self-assessment.',
            durationLabel: 'Sample Structure',
            isFreePreview: false,
            hasVideo: false,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
          },
        ],
      },
      {
        id: 'mod-c11-3',
        moduleNumber: 'Module 03',
        title: 'Plant Kingdom',
        subject: 'Biology',
        description:
          'Sample curriculum structure for Algae, Bryophytes, Pteridophytes, Gymnosperms, and Angiosperms.',
        lessons: [
          {
            id: 'les-c11-3-1',
            title: 'Plant Classification',
            description: 'Artificial, natural, and phylogenetic systems of plant classification.',
            durationLabel: 'Sample Structure',
            isFreePreview: false,
            hasVideo: true,
            hasNotes: true,
            hasPractice: false,
            isSampleStructure: true,
          },
          {
            id: 'les-c11-3-2',
            title: 'Major Plant Groups',
            description: 'Comparative study of Algae, Bryophytes, and Pteridophytes.',
            durationLabel: 'Sample Structure',
            isFreePreview: false,
            hasVideo: true,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
          },
          {
            id: 'les-c11-3-3',
            title: 'Characteristics',
            description: 'Alternation of generations and vascular tissue evolution.',
            durationLabel: 'Sample Structure',
            isFreePreview: false,
            hasVideo: true,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
          },
          {
            id: 'les-c11-3-4',
            title: 'Practice Questions',
            description: 'Structured chapter exercise sheet and MCQ review.',
            durationLabel: 'Sample Structure',
            isFreePreview: false,
            hasVideo: false,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
          },
        ],
      },
      {
        id: 'mod-c11-4',
        moduleNumber: 'Module 04',
        title: 'Some Basic Concepts of Chemistry & Atomic Structure',
        subject: 'Chemistry',
        description:
          'Sample chemistry module introducing stoichiometry, mole concept, and quantum mechanical atomic structure.',
        lessons: [
          {
            id: 'les-c11-4-1',
            title: 'Mole Concept & Stoichiometry',
            description: 'Understanding molar mass, limiting reagents, and concentration terms.',
            durationLabel: 'Sample Structure',
            isFreePreview: true,
            hasVideo: true,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
          },
          {
            id: 'les-c11-4-2',
            title: 'Quantum Numbers & Orbitals',
            description: 'Aufbau principle, Pauli exclusion, and electronic configurations.',
            durationLabel: 'Sample Structure',
            isFreePreview: false,
            hasVideo: true,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Which subjects are covered in the Class 11 Science Program?',
        answer:
          'The Class 11 Science Program at INFOCUS ACADEMY focuses on Biology and Chemistry with concept-based teaching by Jaidev Roy (JDR Sir).',
      },
      {
        question: 'Are these curriculum chapters final uploaded lectures?',
        answer:
          'The chapters shown above represent a sample curriculum structure in the platform preview. Official academy lectures, notes, and batch schedules are published directly by the faculty.',
      },
      {
        question: 'How can I enquire about batch timings and fees in Kalkaji?',
        answer:
          'You can submit the Admission Enquiry form on this page, call 8851008500 / 8802196760, or message us directly on WhatsApp.',
      },
    ],
  },
  {
    id: 'course-class-12',
    slug: 'class-12',
    title: 'Class 12 Science Program',
    subtitle: 'Strengthen Your Concepts. Prepare with Confidence.',
    categories: ['Class 12'],
    primaryCategory: 'Class 12',
    classOrExam: 'Class 12',
    subjects: ['Biology', 'Chemistry'],
    shortDescription:
      'Prepare for Class 12 with structured academic learning, detailed explanations, important topic revision, practice, and board examination preparation guidance.',
    fullDescription:
      'Designed specifically for Class 12 students aiming for deep conceptual command in Biology and Chemistry. The curriculum emphasizes topic-wise clarity, NCERT-aligned depth, regular unit tests, doubt-solving guidance, and systematic board examination preparation.',
    whoIsItFor: [
      'Class 12 students seeking thorough board examination preparation in Biology & Chemistry',
      'Students wanting structured topic-by-topic revision and regular assessment support',
      'Learners balancing Class 12 boards with NEET or CUET academic preparation',
    ],
    highlights: [
      'Biology & Chemistry focus',
      'Concept-based teaching',
      'Topic-wise learning',
      'Academic revision',
      'Regular assessment support',
      'Doubt-solving guidance',
    ],
    learningObjectives: [
      'Build mastery over Genetics, Biotechnology, Human Reproduction, and Ecology',
      'Gain clarity in Solutions, Electrochemistry, Chemical Kinetics, and Organic Reactions',
      'Practice structured board-style long answers, case-based questions, and MCQs',
      'Strengthen weak topics through regular unit-wise assessments and revision',
    ],
    facultyVerified: true,
    facultyName: 'Jaidev Roy (JDR Sir)',
    facultyRole: 'Senior Faculty — Biology & Chemistry',
    facultyQualifications: 'B.Sc. & M.Sc., University of Delhi · 10+ Years Teaching Experience',
    accessType: 'Free Preview Available',
    configuredFee: null,
    discountFee: null,
    durationLabel: 'Academic Session (Configurable)',
    published: true,
    thumbnail: IMG_CHEM,
    seoTitle: 'Class 12 Coaching in Kalkaji | Biology & Chemistry — INFOCUS ACADEMY',
    seoDescription:
      'Class 12 Biology and Chemistry Coaching in Kalkaji, New Delhi at INFOCUS ACADEMY. Structured board preparation and concept clarity by JDR Sir.',
    modules: [
      {
        id: 'mod-c12-1',
        moduleNumber: 'Module 01',
        title: 'Sexual Reproduction in Flowering Plants & Genetics',
        subject: 'Biology',
        description:
          'Sample Class 12 Biology structure covering floral structure, pollination, and Mendelian inheritance principles.',
        lessons: [
          {
            id: 'les-c12-1-1',
            title: 'Microsporogenesis & Megasporogenesis',
            description: 'Gametophyte development and structural stages explained clearly.',
            durationLabel: 'Sample Structure',
            isFreePreview: true,
            hasVideo: true,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
          },
          {
            id: 'les-c12-1-2',
            title: 'Principles of Inheritance & Variation',
            description: 'Monohybrid, dihybrid crosses, linkage, and pedigree analysis basics.',
            durationLabel: 'Sample Structure',
            isFreePreview: false,
            hasVideo: true,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
          },
        ],
      },
      {
        id: 'mod-c12-2',
        moduleNumber: 'Module 02',
        title: 'Electrochemistry & Chemical Kinetics',
        subject: 'Chemistry',
        description:
          'Sample Class 12 Physical Chemistry module covering galvanic cells, Nernst equation, and reaction rates.',
        lessons: [
          {
            id: 'les-c12-2-1',
            title: 'Nernst Equation & Cell Potential',
            description: 'Conceptual derivation and numerical problem-solving approach.',
            durationLabel: 'Sample Structure',
            isFreePreview: true,
            hasVideo: true,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
          },
          {
            id: 'les-c12-2-2',
            title: 'Order of Reaction & Rate Laws',
            description: 'Zero-order and first-order integrated rate equations and half-life.',
            durationLabel: 'Sample Structure',
            isFreePreview: false,
            hasVideo: true,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Does the Class 12 Science Program include regular unit tests?',
        answer:
          'Yes, regular assessment support, topic-wise revision, and doubt-clearing guidance are core parts of the program.',
      },
      {
        question: 'Who teaches Biology and Chemistry for Class 12?',
        answer:
          'Biology and Chemistry are taught by Jaidev Roy (JDR Sir), B.Sc. and M.Sc. from University of Delhi, with 10+ years of teaching experience.',
      },
    ],
  },
  {
    id: 'course-neet',
    slug: 'neet',
    title: 'NEET Preparation Program',
    subtitle: 'Build Your Medical Entrance Preparation on Strong Concepts.',
    categories: ['NEET', 'Class 11', 'Class 12'],
    primaryCategory: 'NEET',
    classOrExam: 'NEET Entrance',
    subjects: ['Biology', 'Chemistry'],
    shortDescription:
      'Strengthen your understanding of Biology and Chemistry through structured learning, concept-based explanations, topic-wise preparation, and practice support.',
    fullDescription:
      'A focused academic program designed to help medical entrance aspirants build deep conceptual accuracy in Biology and Chemistry. Emphasizes conceptual understanding, systematic NCERT-grounded topic revision, MCQ practice, test practice, and dedicated doubt-solving support.',
    whoIsItFor: [
      'Students preparing for NEET seeking strong conceptual command in Biology and Chemistry',
      'Class 11 and Class 12 learners integrating school studies with MCQ-based entrance practice',
      'Aspirants looking for patient doubt resolution and structured topic-wise revision',
    ],
    highlights: [
      'Biology learning',
      'Chemistry learning',
      'Concept understanding',
      'MCQ practice',
      'Topic-wise revision',
      'Doubt-solving support',
      'Academic preparation guidance',
      'Test practice',
    ],
    learningObjectives: [
      'Develop conceptual clarity across core NEET Biology and Chemistry chapters',
      'Improve MCQ analytical thinking through topic-wise practice and explanation review',
      'Build exam discipline through configurable practice tests and periodic revision',
      'Address conceptual gaps early with dedicated doubt-clearing sessions',
    ],
    facultyVerified: true,
    facultyName: 'Jaidev Roy (JDR Sir)',
    facultyRole: 'Faculty — Biology & Chemistry',
    facultyQualifications: 'B.Sc. & M.Sc., University of Delhi · 10+ Years Teaching Experience',
    accessType: 'Enrolment Required',
    configuredFee: null,
    discountFee: null,
    durationLabel: 'Configurable Program Schedule',
    published: true,
    thumbnail: IMG_BIO,
    seoTitle: 'NEET Preparation in Kalkaji | Biology & Chemistry — INFOCUS ACADEMY',
    seoDescription:
      'NEET Preparation Program in Kalkaji, New Delhi at INFOCUS ACADEMY. Concept-based Biology and Chemistry learning, MCQ practice, and test support.',
    modules: [
      {
        id: 'mod-neet-1',
        moduleNumber: 'Module 01',
        title: 'Cell Biology & Biomolecules (Sample Structure)',
        subject: 'Biology',
        description:
          'Sample structure focusing on cellular organelles, membrane transport, enzymes, and nucleic acids.',
        lessons: [
          {
            id: 'les-neet-1-1',
            title: 'Prokaryotic vs Eukaryotic Cell Organization',
            description: 'Comparative structural analysis and concept check questions.',
            durationLabel: 'Sample Structure',
            isFreePreview: true,
            hasVideo: true,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
          },
          {
            id: 'les-neet-1-2',
            title: 'Enzyme Kinetics & Biomolecules',
            description: 'Cofactors, inhibition concepts, and carbohydrate/protein structure.',
            durationLabel: 'Sample Structure',
            isFreePreview: false,
            hasVideo: true,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
          },
        ],
      },
      {
        id: 'mod-neet-2',
        moduleNumber: 'Module 02',
        title: 'Organic Reaction Mechanisms (Sample Structure)',
        subject: 'Chemistry',
        description:
          'Sample structure covering inductive effect, resonance, hyperconjugation, and reaction intermediates.',
        lessons: [
          {
            id: 'les-neet-2-1',
            title: 'Electronic Effects & Carbocation Stability',
            description: 'Applying fundamental electronic principles to predict reaction outcomes.',
            durationLabel: 'Sample Structure',
            isFreePreview: false,
            hasVideo: true,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Which subjects does JDR Sir teach in the NEET Preparation Program?',
        answer:
          'Jaidev Roy (JDR Sir) teaches Biology and Chemistry, focusing on concept-based understanding, MCQ practice, and structured topic revision.',
      },
      {
        question: 'Does the program include MCQ and test practice?',
        answer:
          'Yes, topic-wise MCQ practice, revision support, and configurable online practice tests are built into the learning structure.',
      },
    ],
  },
  {
    id: 'course-jee',
    slug: 'jee',
    title: 'JEE Foundation & Preparation',
    subtitle: 'Develop Strong Concepts and Problem-Solving Confidence.',
    categories: ['JEE', 'Class 11', 'Class 12'],
    primaryCategory: 'JEE',
    classOrExam: 'JEE Entrance',
    subjects: ['Conceptual Foundations', 'Problem Solving', 'Chemistry'],
    shortDescription:
      'Explore structured preparation and foundational academic learning designed to strengthen concepts, develop problem-solving skills, and support engineering entrance preparation.',
    fullDescription:
      'Built to nurture analytical thinking and structured problem-solving skills for students preparing for engineering entrance pathways. Focuses on foundational clarity, multi-step analytical practice, structured revision, and steady academic guidance.',
    whoIsItFor: [
      'Students aiming to build strong conceptual foundations for engineering entrance exams',
      'Class 11 and 12 learners seeking structured practice and problem-solving guidance',
    ],
    highlights: [
      'Conceptual foundations',
      'Academic learning',
      'Problem-solving development',
      'Structured practice',
      'Revision support',
      'Learning guidance',
    ],
    learningObjectives: [
      'Strengthen core conceptual reasoning before attempting multi-concept problems',
      'Develop systematic problem-solving workflows and accuracy habits',
      'Practice structured problem sets and periodic concept revision',
    ],
    facultyVerified: false,
    accessType: 'Enrolment Required',
    configuredFee: null,
    discountFee: null,
    durationLabel: 'Configurable Program Schedule',
    published: true,
    thumbnail: IMG_CHEM,
    seoTitle: 'JEE Coaching in Kalkaji | Foundation & Preparation — INFOCUS ACADEMY',
    seoDescription:
      'JEE Foundation & Preparation in Kalkaji, New Delhi at INFOCUS ACADEMY. Conceptual foundations, problem-solving development, and structured practice.',
    modules: [
      {
        id: 'mod-jee-1',
        moduleNumber: 'Module 01',
        title: 'Chemical Bonding & Molecular Structure (Sample Structure)',
        subject: 'Chemistry',
        description:
          'Sample foundational module exploring VSEPR theory, hybridization, and molecular orbital concepts.',
        lessons: [
          {
            id: 'les-jee-1-1',
            title: 'Hybridization & Molecular Geometry',
            description: 'Visualizing orbital overlap and bond angle trends.',
            durationLabel: 'Sample Structure',
            isFreePreview: true,
            hasVideo: true,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
          },
          {
            id: 'les-jee-1-2',
            title: 'Structured Problem-Solving Practice',
            description: 'Applying conceptual rules to multi-step analytical questions.',
            durationLabel: 'Sample Structure',
            isFreePreview: false,
            hasVideo: true,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'How is the JEE Foundation & Preparation program structured?',
        answer:
          'It prioritizes conceptual foundations, structured problem-solving development, revision support, and guided academic practice. Please contact the Kalkaji centre for current batch details and faculty schedules.',
      },
    ],
  },
  {
    id: 'course-cuet',
    slug: 'cuet',
    title: 'CUET Preparation Program',
    subtitle: 'Prepare for Your Next Academic Milestone.',
    categories: ['CUET', 'Class 12'],
    primaryCategory: 'CUET',
    classOrExam: 'CUET University Entrance',
    subjects: ['Domain Subjects', 'Concept Revision', 'Objective Practice'],
    shortDescription:
      'Develop subject understanding, strengthen important concepts, and prepare through focused academic learning, practice, and revision.',
    fullDescription:
      'A focused preparation track helping Class 12 students and graduates transition smoothly into objective university entrance assessments. Combines domain subject clarity, time-managed MCQ practice, and structured concept revision.',
    whoIsItFor: [
      'Class 12 students preparing for central and participating university admissions via CUET',
      'Students looking to bridge board preparation with objective MCQ speed and accuracy',
    ],
    highlights: [
      'Subject-focused learning',
      'Academic practice',
      'Concept revision',
      'Structured preparation',
      'Guidance',
    ],
    learningObjectives: [
      'Consolidate NCERT-based domain concepts for objective testing',
      'Practice assertion-reasoning, statement-based, and case-study MCQs',
      'Build structured revision schedules ahead of examination timelines',
    ],
    facultyVerified: false,
    accessType: 'Enrolment Required',
    configuredFee: null,
    discountFee: null,
    durationLabel: 'Configurable Program Schedule',
    published: true,
    thumbnail: IMG_FOUNDATION,
    seoTitle: 'CUET Preparation in Kalkaji | INFOCUS ACADEMY New Delhi',
    seoDescription:
      'CUET Preparation Program in Kalkaji, New Delhi at INFOCUS ACADEMY. Subject-focused learning, concept revision, and academic practice.',
    modules: [
      {
        id: 'mod-cuet-1',
        moduleNumber: 'Module 01',
        title: 'Domain Concept Revision & Objective Practice (Sample Structure)',
        subject: 'Science Domain',
        description:
          'Sample structure aligning Class 12 subject concepts with objective entrance question formats.',
        lessons: [
          {
            id: 'les-cuet-1-1',
            title: 'High-Yield Concept Mapping',
            description: 'Organizing key definitions, reactions, and biological cycles for fast recall.',
            durationLabel: 'Sample Structure',
            isFreePreview: true,
            hasVideo: true,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Can Class 12 students join the CUET Preparation Program alongside board prep?',
        answer:
          'Yes, the structured revision and objective practice complements Class 12 domain subject preparation.',
      },
    ],
  },
  {
    id: 'course-school-foundation',
    slug: 'class-9',
    title: 'School Foundation Program (Class 9 & 10)',
    subtitle: 'Build Strong School-Level Fundamentals Early.',
    categories: ['Class 9', 'Class 10'],
    primaryCategory: 'Class 9',
    classOrExam: 'Classes 9 & 10',
    subjects: ['Mathematics', 'Science'],
    shortDescription:
      'Build strong school-level fundamentals through concept-based learning, easy explanations, practice, academic support, and structured revision.',
    fullDescription:
      'A nurturing school foundation program for Classes 9 and 10 covering Mathematics and Science. Designed to replace rote memorization with genuine curiosity, clear step-by-step explanations, regular guided practice, and steady school examination readiness.',
    whoIsItFor: [
      'Class 9 students building core mathematical and scientific reasoning',
      'Class 10 students preparing for school board examinations with clarity and confidence',
    ],
    highlights: [
      'Mathematics & Science',
      'Fundamental concepts',
      'Guided practice',
      'Doubt-clearing support',
      'Academic revision',
      'School examination preparation',
    ],
    learningObjectives: [
      'Understand core concepts in Physics, Chemistry, Biology, and Mathematics clearly',
      'Practice step-by-step numerical and analytical problem solving',
      'Develop confidence for Class 9 assessments and Class 10 board exams',
    ],
    facultyVerified: false,
    accessType: 'Free Preview Available',
    configuredFee: null,
    discountFee: null,
    durationLabel: 'Academic Session (Configurable)',
    published: true,
    thumbnail: IMG_FOUNDATION,
    seoTitle: 'Class 9 & 10 Mathematics and Science Coaching in Kalkaji | INFOCUS ACADEMY',
    seoDescription:
      'Class 9 Science Coaching and Class 10 Mathematics & Science Coaching in Kalkaji, New Delhi at INFOCUS ACADEMY.',
    modules: [
      {
        id: 'mod-fnd-1',
        moduleNumber: 'Module 01',
        title: 'Matter, Atoms & Fundamental Science Concepts (Sample Structure)',
        subject: 'Science',
        description:
          'Sample foundation module introducing matter, atomic theory, and chemical reactions.',
        lessons: [
          {
            id: 'les-fnd-1-1',
            title: 'Matter in Our Surroundings & Particle Nature',
            description: 'Visualizing states of matter and phase transitions clearly.',
            durationLabel: 'Sample Structure',
            isFreePreview: true,
            hasVideo: true,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
          },
        ],
      },
      {
        id: 'mod-fnd-2',
        moduleNumber: 'Module 02',
        title: 'Number Systems, Algebra & Linear Equations (Sample Structure)',
        subject: 'Mathematics',
        description:
          'Sample foundation math module focused on algebraic reasoning and problem-solving clarity.',
        lessons: [
          {
            id: 'les-fnd-2-1',
            title: 'Polynomials & Algebraic Identities',
            description: 'Step-by-step derivation and guided practice exercises.',
            durationLabel: 'Sample Structure',
            isFreePreview: false,
            hasVideo: true,
            hasNotes: true,
            hasPractice: true,
            isSampleStructure: true,
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Which subjects are taught in the School Foundation Program?',
        answer:
          'Mathematics and Science are covered for both Class 9 and Class 10 with guided practice, doubt-clearing support, and school exam revision.',
      },
    ],
  },
];

export const INITIAL_RESOURCES: StudyResource[] = [
  {
    id: 'res-1',
    title: 'Sample Chapter Summary: The Living World & Taxonomy',
    courseId: 'course-class-11',
    courseTitle: 'Class 11 Science Program',
    subject: 'Biology',
    chapter: 'Module 01: The Living World',
    category: 'Chapter Summary',
    fileType: 'PDF',
    dateAdded: 'Sample Template',
    restricted: false,
    summaryText:
      'Concise structured overview of characteristics of living organisms, binomial nomenclature rules, and taxonomic hierarchy from Species to Kingdom.',
    isSample: true,
  },
  {
    id: 'res-2',
    title: 'Sample Concept Notes: Five Kingdom Classification',
    courseId: 'course-class-11',
    courseTitle: 'Class 11 Science Program',
    subject: 'Biology',
    chapter: 'Module 02: Biological Classification',
    category: 'Class Notes',
    fileType: 'PDF',
    dateAdded: 'Sample Template',
    restricted: true,
    summaryText:
      'Comparative study table of Monera, Protista, Fungi, Plantae, and Animalia covering cell type, cell wall, nuclear membrane, and nutrition modes.',
    isSample: true,
  },
  {
    id: 'res-3',
    title: 'Sample Formula Sheet: Electrochemistry & Nernst Equation',
    courseId: 'course-class-12',
    courseTitle: 'Class 12 Science Program',
    subject: 'Chemistry',
    chapter: 'Module 02: Electrochemistry & Chemical Kinetics',
    category: 'Formula Sheets',
    fileType: 'PDF',
    dateAdded: 'Sample Template',
    restricted: true,
    summaryText:
      'Key relations for standard electrode potential, Nernst equation at 298K, molar conductivity, and Faraday laws of electrolysis.',
    isSample: true,
  },
  {
    id: 'res-4',
    title: 'Sample Practice Worksheet: Genetics & Inheritance Patterns',
    courseId: 'course-class-12',
    courseTitle: 'Class 12 Science Program',
    subject: 'Biology',
    chapter: 'Module 01: Sexual Reproduction & Genetics',
    category: 'Practice Worksheets',
    fileType: 'Worksheet',
    dateAdded: 'Sample Template',
    restricted: true,
    summaryText:
      'Guided Punnett square practice problems, incomplete dominance exercises, and pedigree analysis drills.',
    isSample: true,
  },
  {
    id: 'res-5',
    title: 'Sample Revision Notes: Cell Organelles & Enzyme Action',
    courseId: 'course-neet',
    courseTitle: 'NEET Preparation Program',
    subject: 'Biology',
    chapter: 'Module 01: Cell Biology & Biomolecules',
    category: 'Revision Notes',
    fileType: 'Summary',
    dateAdded: 'Sample Template',
    restricted: true,
    summaryText:
      'High-clarity revision digest on eukaryotic endomembrane systems, enzyme activation energy, and competitive inhibition.',
    isSample: true,
  },
  {
    id: 'res-6',
    title: 'Sample Important Questions: Polynomials & Matter',
    courseId: 'course-school-foundation',
    courseTitle: 'School Foundation Program (Class 9 & 10)',
    subject: 'Mathematics',
    chapter: 'Module 02: Number Systems & Algebra',
    category: 'Important Questions',
    fileType: 'Worksheet',
    dateAdded: 'Sample Template',
    restricted: false,
    summaryText:
      'Step-by-step practice set designed to build confidence in algebraic identities and foundational equations.',
    isSample: true,
  },
];

export const INITIAL_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'q-1',
    courseId: 'course-class-11',
    subject: 'Biology',
    chapter: 'The Living World',
    category: 'Chapter-wise MCQs',
    question:
      'In binomial nomenclature, the first word in a biological name represents the ______ while the second component denotes the ______.',
    options: [
      'Family; Genus',
      'Genus; Specific epithet',
      'Order; Species',
      'Class; Family',
    ],
    correctIndex: 1,
    explanation:
      'According to Carolus Linnaeus’s binomial nomenclature system, every scientific name has two components: the Generic name (Genus) followed by the specific epithet.',
    isSample: true,
  },
  {
    id: 'q-2',
    courseId: 'course-class-11',
    subject: 'Biology',
    chapter: 'Biological Classification',
    category: 'Chapter-wise MCQs',
    question:
      'Which kingdom in R.H. Whittaker’s five-kingdom classification includes unicellular eukaryotic organisms?',
    options: ['Monera', 'Protista', 'Fungi', 'Plantae'],
    correctIndex: 1,
    explanation:
      'All single-celled eukaryotes are placed under Kingdom Protista, whereas unicellular prokaryotes belong to Kingdom Monera.',
    isSample: true,
  },
  {
    id: 'q-3',
    courseId: 'course-class-11',
    subject: 'Chemistry',
    chapter: 'Atomic Structure',
    category: 'Topic Practice',
    question:
      'Which quantum number determines the three-dimensional shape of an atomic orbital?',
    options: [
      'Principal quantum number (n)',
      'Azimuthal quantum number (l)',
      'Magnetic quantum number (m)',
      'Spin quantum number (s)',
    ],
    correctIndex: 1,
    explanation:
      'The azimuthal (or orbital angular momentum) quantum number (l) defines the three-dimensional shape of the orbital (s, p, d, f).',
    isSample: true,
  },
  {
    id: 'q-4',
    courseId: 'course-class-12',
    subject: 'Chemistry',
    chapter: 'Chemical Kinetics',
    category: 'Quick Quiz',
    question:
      'For a first-order reaction, how does the half-life period (t1/2) depend on the initial concentration of reactant?',
    options: [
      'Directly proportional to initial concentration',
      'Inversely proportional to initial concentration',
      'Independent of initial concentration',
      'Proportional to the square of initial concentration',
    ],
    correctIndex: 2,
    explanation:
      'For a first-order reaction, t1/2 = 0.693 / k, which depends only on the rate constant k and is independent of initial reactant concentration.',
    isSample: true,
  },
  {
    id: 'q-5',
    courseId: 'course-neet',
    subject: 'Biology',
    chapter: 'Cell Biology & Biomolecules',
    category: 'Revision Questions',
    question:
      'Which cellular organelles form part of the coordinated endomembrane system in eukaryotic cells?',
    options: [
      'Mitochondria, Chloroplasts, and Peroxisomes',
      'Endoplasmic Reticulum, Golgi complex, Lysosomes, and Vacuoles',
      'Ribosomes, Centrosomes, and Nucleolus',
      'Cilia, Flagella, and Microtubules',
    ],
    correctIndex: 1,
    explanation:
      'The endomembrane system comprises the ER, Golgi apparatus, lysosomes, and vacuoles because their functions are coordinated.',
    isSample: true,
  },
  {
    id: 'q-6',
    courseId: 'course-school-foundation',
    subject: 'Mathematics',
    chapter: 'Algebra & Polynomials',
    category: 'Practice Sets',
    question: 'What is the degree of a non-zero constant polynomial?',
    options: ['1', '0', '2', 'Not defined'],
    correctIndex: 1,
    explanation:
      'A non-zero constant c can be written as c · x^0, so its highest power of variable x is 0.',
    isSample: true,
  },
];

export const INITIAL_TESTS: AcademyTest[] = [
  {
    id: 'test-1',
    title: 'Sample Diagnostic Practice: Class 11 Biology & Chemistry',
    courseId: 'course-class-11',
    courseTitle: 'Class 11 Science Program',
    subject: 'Biology & Chemistry',
    durationMinutes: 15,
    questionIds: ['q-1', 'q-2', 'q-3'],
    status: 'Available',
    passingRuleNote: 'Configurable template test — duration and scoring rules set by Academy.',
    isConfigurableSample: true,
  },
  {
    id: 'test-2',
    title: 'Sample Unit Revision: Class 12 & NEET Concept Check',
    courseId: 'course-class-12',
    courseTitle: 'Class 12 Science Program',
    subject: 'Chemistry & Biology',
    durationMinutes: 15,
    questionIds: ['q-4', 'q-5', 'q-1'],
    status: 'Practice',
    passingRuleNote: 'Configurable practice test template — ready for faculty question bank expansion.',
    isConfigurableSample: true,
  },
  {
    id: 'test-3',
    title: 'Upcoming Unit Assessment (Template Schedule)',
    courseId: 'course-neet',
    courseTitle: 'NEET Preparation Program',
    subject: 'Biology',
    durationMinutes: null,
    questionIds: ['q-5', 'q-2'],
    status: 'Upcoming',
    scheduledDate: 'To be announced by Academy',
    passingRuleNote: 'Duration and marking scheme configurable by faculty before publishing.',
    isConfigurableSample: true,
  },
];

export const INITIAL_DEMO_USERS: UserProfile[] = [
  {
    id: 'user-student-demo',
    name: 'Aarav Sharma (Demo Student)',
    email: 'student.demo@infocusacademy.example',
    phone: '9800000001',
    role: 'student',
    accountStatus: 'Active',
    joinedAt: 'Prototype Preview Account',
    learningGoal: 'Class 11 Biology & Chemistry',
    isPrototypeDemo: true,
  },
  {
    id: 'user-teacher-jdr',
    name: 'Jaidev Roy (JDR Sir)',
    email: 'faculty@infocusacademy.example',
    phone: '8851008500',
    role: 'teacher',
    accountStatus: 'Active',
    joinedAt: 'Faculty Account',
    learningGoal: 'Biology & Chemistry Faculty',
    isPrototypeDemo: true,
  },
  {
    id: 'user-admin-demo',
    name: 'Academy Administrator',
    email: 'admin@infocusacademy.example',
    phone: '8802196760',
    role: 'admin',
    accountStatus: 'Active',
    joinedAt: 'Admin Account',
    isPrototypeDemo: true,
  },
];

export const INITIAL_ENROLLMENTS: EnrollmentRecord[] = [
  {
    id: 'enr-demo-1',
    studentId: 'user-student-demo',
    studentName: 'Aarav Sharma (Demo Student)',
    studentEmail: 'student.demo@infocusacademy.example',
    studentPhone: '9800000001',
    courseId: 'course-class-11',
    courseTitle: 'Class 11 Science Program',
    status: 'Active',
    enrolledAt: 'Prototype Preview',
  },
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-demo-1',
    studentName: 'Aarav Sharma (Demo Student)',
    studentEmail: 'student.demo@infocusacademy.example',
    studentPhone: '9800000001',
    courseId: 'course-class-11',
    courseTitle: 'Class 11 Science Program',
    amount: null,
    discountAmount: null,
    finalAmount: null,
    method: 'Center Admission / Configurable',
    status: 'Pending',
    gatewayMode: 'Razorpay Integration Ready',
    createdAt: 'Prototype Record',
    referenceCode: 'IFA-PROTO-001',
  },
];

export const INITIAL_DOUBTS: DoubtItem[] = [
  {
    id: 'dbt-1',
    studentId: 'user-student-demo',
    studentName: 'Aarav Sharma (Demo Student)',
    courseId: 'course-class-11',
    courseTitle: 'Class 11 Science Program',
    subject: 'Biology',
    chapter: 'Module 01: The Living World',
    question: 'Difference between taxonomy and systematics?',
    description:
      'Could you clarify how evolutionary relationships distinguish systematics from classical taxonomy?',
    status: 'Pending',
    createdAt: 'Prototype Entry',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'Course Announcement',
    title: 'Welcome to INFOCUS ACADEMY Learning Portal',
    message:
      'Explore the sample curriculum modules, practice questions, and configurable test interface in this prototype preview.',
    createdAt: 'Today',
    read: false,
    targetRoute: '/student/classroom',
  },
  {
    id: 'notif-2',
    type: 'Study Material Added',
    title: 'Sample Chapter Summary Available',
    message: 'The Living World summary resource is available in Study Materials.',
    createdAt: 'Recent',
    read: false,
    targetRoute: '/student/materials',
  },
  {
    id: 'notif-3',
    type: 'Upcoming Test',
    title: 'Sample Diagnostic Practice Test Ready',
    message: 'Try the configurable online test interface for Class 11 Biology & Chemistry.',
    createdAt: 'Recent',
    read: true,
    targetRoute: '/student/tests',
  },
];

export const INITIAL_TEST_ATTEMPTS: TestAttempt[] = [];

export const INITIAL_ENQUIRIES: AdmissionEnquiry[] = [
  {
    id: 'enq-proto-1',
    name: 'Sample Enquiry (Prototype)',
    phone: '9800000099',
    email: 'enquiry.sample@example.com',
    courseInterest: 'Class 11 Science Program',
    message: 'Looking for evening batch timings in Kalkaji for Biology and Chemistry.',
    createdAt: 'Prototype Record',
    status: 'New',
  },
];

export const PUBLIC_FAQS = [
  {
    question: 'Which courses are available at INFOCUS ACADEMY?',
    answer:
      'We offer the Class 11 Science Program (Biology & Chemistry), Class 12 Science Program (Biology & Chemistry), NEET Preparation Program, JEE Foundation & Preparation, CUET Preparation Program, and School Foundation Program for Classes 9 & 10 (Mathematics & Science).',
  },
  {
    question: 'Which subjects are taught by Jaidev Roy (JDR Sir)?',
    answer:
      'Jaidev Roy (JDR Sir), B.Sc. and M.Sc. from the University of Delhi with 10+ years of teaching experience, teaches Biology and Chemistry for Classes 11 and 12 as well as medical entrance concept preparation.',
  },
  {
    question: 'How do I enquire about admission or batch timings?',
    answer:
      'You can fill out the Admission Enquiry form on any course page or the Contact page, call us directly at 8851008500 or 8802196760, or message us via the contextual WhatsApp button.',
  },
  {
    question: 'How can I join INFOCUS ACADEMY?',
    answer:
      'Create your student account on the portal, choose your target program, submit an enrolment or admission enquiry, and visit our Kalkaji centre (B-20, J-3 Market, DDA Flats, Kalkaji, New Delhi – 110019) or complete online onboarding once batch registration is confirmed.',
  },
];

export const PORTAL_FAQS = [
  {
    question: 'How do I log in to the Student Portal?',
    answer:
      'Click Login in the top header and enter your registered phone number or email address with your password. You can also preview the Student, Teacher, or Admin portals using the prototype preview accounts on the Login page.',
  },
  {
    question: 'How can I access my enrolled courses?',
    answer:
      'Once logged in, open "My Courses" or click "Continue Learning" from your Student Dashboard to enter the distraction-free Video Classroom.',
  },
  {
    question: 'Where are the study materials and PDF notes located?',
    answer:
      'Study resources are organized in the "Study Materials" tab of the Student Dashboard and inside the Notes & Resources tabs right below each classroom lesson.',
  },
  {
    question: 'How do I take a practice quiz or online test?',
    answer:
      'Navigate to "Practice" for chapter-wise MCQs with instant explanations, or "Tests" for timed mock assessments with a question palette and detailed results review.',
  },
  {
    question: 'How is my learning progress saved?',
    answer:
      'Marking a lesson as complete, submitting practice quizzes, or finishing tests updates your completion percentage and activity history in your Progress Dashboard.',
  },
  {
    question: 'How can I ask an academic doubt?',
    answer:
      'Open "Doubt Support" in your Student Dashboard, select your course, subject, and chapter, and submit your question. Faculty responses appear directly in your Doubt Support thread.',
  },
];

export const ENROLLMENT_FAQS = [
  {
    question: 'How can I enroll in a course?',
    answer:
      'Select any program from the Course Marketplace, review the curriculum and highlights, click "Enroll Now" or "Enquire About Admission", sign in or register, and proceed through the enrollment review screen.',
  },
  {
    question: 'How can I make payment?',
    answer:
      'The checkout system is structured for future integration with secure payment gateways such as Razorpay as well as direct centre admission verification. Card details are never stored on the platform.',
  },
  {
    question: 'How can I access a purchased or approved course?',
    answer:
      'As soon as your enrollment is confirmed by the academy or online checkout, the course unlocks automatically inside your "My Courses" dashboard.',
  },
  {
    question: 'What happens after enrollment?',
    answer:
      'You receive an enrollment confirmation receipt, access to the course curriculum and restricted study materials, online test access, and doubt-support privileges.',
  },
];
