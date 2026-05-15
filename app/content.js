export const localeOrder = ["ru", "en", "he"];

export const locales = {
  ru: {
    id: "ru",
    lang: "ru",
    dir: "ltr",
    path: "/",
    short: "RU",
    name: "Русский",
  },
  en: {
    id: "en",
    lang: "en",
    dir: "ltr",
    path: "/en",
    short: "EN",
    name: "English",
  },
  he: {
    id: "he",
    lang: "he",
    dir: "rtl",
    path: "/he",
    short: "HE",
    name: "עברית",
  },
};

export const content = {
  ru: {
    metadata: {
      title: "PlaysOnline | Авторские песни для мероприятий",
      description:
        "Яркий сайт студии, которая создает персональные песни для свадеб, дней рождения, корпоративов и любых важных событий.",
    },
    imageAlt: "Музыкальная студия, переходящая в праздничную сцену",
    navAria: "Навигация",
    nav: [
      { href: "formats", label: "Форматы" },
      { href: "examples", label: "Примеры" },
      { href: "process", label: "Процесс" },
      { href: "prices", label: "Стоимость" },
    ],
    languageAria: "Выбор языка",
    briefLabel: "Бриф",
    hero: {
      eyebrow: "персональные песни под ваш повод",
      title: "Авторские песни для ваших мероприятий",
      lead: "Превращаем истории, шутки, имена и важные моменты в трек, который гости не просто услышат, а запомнят.",
      primary: "Собрать песню",
      secondary: "Посмотреть форматы",
      stats: [
        ["7 дней", "быстрый старт"],
        ["6 версий", "для сцены и видео"],
        ["100%", "ваша история"],
      ],
    },
    composer: {
      aria: "Мини-бриф песни",
      title: "Конструктор настроения",
      badge: "demo",
      tabsAria: "Тип события",
      controlsAria: "Характер песни",
      warmth: "тепло",
      drive: "драйв",
      send: "Отправить идею",
      mailSubjectPrefix: "Хочу песню",
    },
    orderModal: {
      eyebrow: "заявка на песню",
      title: "Расскажите, какую песню вы хотите",
      intro:
        "Опишите идею, повод, людей и эмоции. Письмо уйдет на адрес, который указан в админке.",
      close: "Закрыть форму",
      submit: "Отправить заявку",
      submitting: "Отправляем...",
      success: "Заявка отправлена. Мы скоро свяжемся с вами.",
      error: "Не удалось отправить заявку. Проверьте данные или попробуйте позже.",
      subjectPrefix: "Идея песни",
      fields: {
        name: "Ваше имя",
        contact: "Контакт для связи",
        event: "Повод",
        style: "Стиль или настроение",
        deadline: "Дедлайн",
        description: "Описание идеи",
      },
      placeholders: {
        name: "Как к вам обращаться",
        contact: "Email, телефон или мессенджер",
        event: "Выберите событие",
        style: "Поп, лирика, танцевальный трек...",
        deadline: "Когда нужна песня",
        description:
          "Для кого песня, какая история, какие имена, даты, шутки и детали важно добавить...",
      },
    },
    events: [
      {
        id: "wedding",
        label: "Свадьба",
        title: "Песня для первого танца",
        line: "Нежный куплет о знакомстве, припев с именами и финал, под который зал встает с телефоном.",
        tempo: "82 BPM",
        accent: "duo",
      },
      {
        id: "birthday",
        label: "День рождения",
        title: "Хит про именинника",
        line: "Ироничные факты, теплые детали и припев, который гости легко подхватят за столом.",
        tempo: "104 BPM",
        accent: "pop",
      },
      {
        id: "corporate",
        label: "Корпоратив",
        title: "Гимн команды",
        line: "Энергичный трек о победах, общих мемах и большом финале года без канцелярского холода.",
        tempo: "118 BPM",
        accent: "drive",
      },
      {
        id: "party",
        label: "Вечеринка",
        title: "Трек для открытия вечера",
        line: "Яркий танцевальный старт с вашим поводом, именами и моментом, когда свет делает вау.",
        tempo: "126 BPM",
        accent: "club",
      },
    ],
    formatsAria: "Форматы событий",
    formats: [
      "Авторский текст",
      "Студийный вокал",
      "Минус и мастер",
      "Версия для клипа",
      "Караоке-версия",
      "Обложка трека",
    ],
    occasions: {
      eyebrow: "для любого сценария",
      title: "Песня становится частью события, а не просто фоном",
      items: [
        { title: "Свадьбы", text: "первый танец, сюрприз родителям, финал церемонии" },
        { title: "Юбилеи", text: "песня про путь, друзей, семью и любимые фразы" },
        { title: "Корпоративы", text: "гимн команды, открытие вечера, награждение" },
        { title: "Детские праздники", text: "яркий трек про героя дня и его маленькую вселенную" },
      ],
    },
    examples: {
      eyebrow: "живые демо",
      title: "Прокрутите 7 примеров и включите тот, который ближе вашему событию",
      intro: "Свадебный вайб, день рождения, корпоратив и танцевальное открытие в одном плейлисте.",
      loading: "Загружаем примеры",
      emptyTitle: "Свободный слот",
      emptyDescription: "Здесь появится MP3-пример песни",
      noEvent: "пример песни",
      listen: "слушать",
    },
    why: {
      eyebrow: "почему мы",
      title: "Почему стоит заказать песню у нас",
      subtitle: "Почему песня на заказ — это лучший подарок",
      text: "Обычные подарки забываются, а песня остается в памяти. Это не просто музыка — это личная история, созданная специально для человека или события.",
      benefitsTitle: "Наши преимущества",
      benefits: [
        "индивидуальный подход к каждой песне",
        "текст под вашу историю",
        "разные музыкальные стили",
        "возможность добавить имена, даты, важные события",
        "готовый трек под ключ",
        "песня подходит для живого мероприятия, видео, поздравления или сюрприза",
      ],
    },
    process: {
      eyebrow: "от истории до мастера",
      title: "Все идет по понятному ритму",
      steps: [
        {
          title: "Вы оставляете заявку",
          text: "Рассказываете, для кого нужна песня, по какому поводу, в каком стиле и какие детали важно добавить.",
        },
        {
          title: "Мы пишем текст",
          text: "Создаем уникальный текст песни с учетом вашей истории, имен, эмоций, юмора и пожеланий.",
        },
        {
          title: "Подбираем музыку и вокал",
          text: "Делаем музыкальное оформление, выбираем настроение, стиль и голос исполнения.",
        },
        {
          title: "Готовим финальный трек",
          text: "Вы получаете готовую песню в хорошем качестве, которую можно включить на празднике, отправить в мессенджере или использовать в видео.",
        },
      ],
    },
    prices: {
      eyebrow: "тарифы по количеству песен",
      title: "Чем больше песен в заказе, тем ниже цена за каждую",
      choose: "Выбрать",
      packages: [
        {
          name: "До 20 песен",
          price: "$30 за песню",
          detail: "Для небольших заказов, личных поздравлений и первых серий треков.",
          features: ["до 20 песен за раз", "текст под вашу историю", "готовый трек под ключ"],
        },
        {
          name: "От 20 до 50",
          price: "$20 за песню",
          detail: "Оптимальный тариф для серии поздравлений, мероприятий или контента.",
          features: ["20-50 песен в одном заказе", "единый стиль или разные жанры", "выгодная цена за объем"],
          featured: true,
        },
        {
          name: "От 50 песен",
          price: "$10 за песню",
          detail: "Для больших проектов, агентств и регулярного производства песен.",
          features: ["от 50 песен за заказ", "план производства по очереди", "стабильное качество в серии"],
        },
      ],
    },
    finalCta: {
      eyebrow: "ваша история уже звучит",
      title: "Расскажите повод, а мы найдем припев",
      button: "Начать бриф",
    },
    footer: {
      links: ["Terms", "Terms of Service", "Privacy Policy", "Cookie Policy"],
    },
    backToTop: "Наверх",
  },
  en: {
    metadata: {
      title: "PlaysOnline | Custom songs for events",
      description:
        "A vivid studio website for custom songs made for weddings, birthdays, corporate parties and once-in-a-lifetime moments.",
    },
    imageAlt: "A music studio blending into a festive event stage",
    navAria: "Navigation",
    nav: [
      { href: "formats", label: "Formats" },
      { href: "examples", label: "Examples" },
      { href: "process", label: "Process" },
      { href: "prices", label: "Pricing" },
    ],
    languageAria: "Choose language",
    briefLabel: "Brief",
    hero: {
      eyebrow: "personal songs for your event",
      title: "Custom songs for unforgettable celebrations",
      lead: "We turn stories, names, inside jokes and important moments into a track your guests will remember long after the lights come up.",
      primary: "Build a song",
      secondary: "Explore formats",
      stats: [
        ["2-3 days", "make a song"],
        ["2 versions", "music"],
        ["100%", "your story"],
      ],
    },
    composer: {
      aria: "Song mini brief",
      title: "Mood builder",
      badge: "demo",
      tabsAria: "Event type",
      controlsAria: "Song character",
      warmth: "warmth",
      drive: "drive",
      send: "Send the idea",
      mailSubjectPrefix: "I want a song",
    },
    orderModal: {
      eyebrow: "song request",
      title: "Tell us what kind of song you want",
      intro:
        "Describe the idea, occasion, people and emotions. The message will go to the email set in the admin panel.",
      close: "Close form",
      submit: "Send request",
      submitting: "Sending...",
      success: "Request sent. We will contact you soon.",
      error: "Could not send the request. Please check the details or try again later.",
      subjectPrefix: "Song idea",
      fields: {
        name: "Your name",
        contact: "Contact details",
        event: "Occasion",
        style: "Style or mood",
        deadline: "Deadline",
        description: "Idea description",
      },
      placeholders: {
        name: "How should we address you",
        contact: "Email, phone or messenger",
        event: "Choose an event",
        style: "Happy pop, ballad, dance track...",
        deadline: "When do you need the song",
        description:
          "Who the song is for, the story, names, dates, jokes and details we should include...",
      },
    },
    events: [
      {
        id: "wedding",
        label: "Wedding",
        title: "First dance song",
        line: "A tender verse about the beginning, a chorus with your names and a finale made for phone lights.",
        tempo: "82 BPM",
        accent: "duo",
      },
      {
        id: "birthday",
        label: "Birthday",
        title: "A hit for the guest of honor",
        line: "Warm details, playful facts and a chorus everyone can pick up at the table.",
        tempo: "104 BPM",
        accent: "pop",
      },
      {
        id: "corporate",
        label: "Corporate",
        title: "Team anthem",
        line: "An energetic track about wins, shared jokes and the big finish of the year.",
        tempo: "118 BPM",
        accent: "drive",
      },
      {
        id: "party",
        label: "Party",
        title: "Opening-night track",
        line: "A bright dance-start with your occasion, your names and the moment when the lights go up.",
        tempo: "126 BPM",
        accent: "club",
      },
    ],
    formatsAria: "Event song formats",
    formats: [
      "Original lyrics",
      "Studio vocal",
      "Instrumental and master",
      "Video cut",
      "Karaoke version",
      "Cover art",
    ],
    occasions: {
      eyebrow: "for every scenario",
      title: "The song becomes part of the event, not just background music",
      items: [
        { title: "Weddings", text: "first dance, parents surprise, ceremony finale" },
        { title: "Milestones", text: "a song about the journey, friends, family and favorite phrases" },
        { title: "Corporate events", text: "team anthem, night opener, award moment" },
        { title: "Kids parties", text: "a bright track about the hero of the day and their small universe" },
      ],
    },
    examples: {
      eyebrow: "live demos",
      title: "Scroll through 7 examples and play the one closest to your event",
      intro: "Wedding mood, birthday warmth, team anthem energy and dance-floor opening in one playlist.",
      loading: "Loading examples",
      emptyTitle: "Open slot",
      emptyDescription: "An MP3 song example will appear here",
      noEvent: "song example",
      listen: "listen",
    },
    why: {
      eyebrow: "why us",
      title: "Why order a song from us",
      subtitle: "Why a custom song is the best gift",
      text: "Ordinary gifts are forgotten, but a song stays in memory. It is not just music. It is a personal story created especially for a person or an event.",
      benefitsTitle: "Our advantages",
      benefits: [
        "an individual approach to every song",
        "lyrics shaped around your story",
        "different musical styles",
        "names, dates and important moments can be included",
        "a ready turnkey track",
        "the song works for a live event, video, greeting or surprise",
      ],
    },
    process: {
      eyebrow: "from story to master",
      title: "Everything moves in a clear rhythm",
      steps: [
        {
          title: "You send a request",
          text: "Tell us who the song is for, what the occasion is, which style you want and which details should be included.",
        },
        {
          title: "We write the lyrics",
          text: "We create original lyrics around your story, names, emotions, humor and wishes.",
        },
        {
          title: "We choose music and vocal",
          text: "We build the musical arrangement and select the mood, style and performance voice.",
        },
        {
          title: "We prepare the final track",
          text: "You receive a high-quality song that can be played at the celebration, sent in a messenger or used in a video.",
        },
      ],
    },
    prices: {
      eyebrow: "volume pricing",
      title: "The more songs in one order, the lower the price per song",
      choose: "Choose",
      packages: [
        {
          name: "Up to 20 songs",
          price: "$30 per song",
          detail: "For smaller orders, personal greetings and first song batches.",
          features: ["up to 20 songs at once", "lyrics shaped around your story", "ready turnkey track"],
        },
        {
          name: "20 to 50 songs",
          price: "$20 per song",
          detail: "The best fit for a series of greetings, events or content pieces.",
          features: ["20-50 songs in one order", "one shared style or different genres", "better price for volume"],
          featured: true,
        },
        {
          name: "50+ songs",
          price: "$10 per song",
          detail: "For large projects, agencies and regular song production.",
          features: ["from 50 songs per order", "production queue planning", "consistent quality across the series"],
        },
      ],
    },
    finalCta: {
      eyebrow: "your story already has a sound",
      title: "Tell us the occasion and we will find the chorus",
      button: "Start the brief",
    },
    footer: {
      links: ["Terms", "Terms of Service", "Privacy Policy", "Cookie Policy"],
    },
    backToTop: "Top",
  },
  he: {
    metadata: {
      title: "PlaysOnline | שירים מקוריים לאירועים",
      description:
        "אתר צבעוני לסטודיו שיוצר שירים אישיים לחתונות, ימי הולדת, אירועי חברה ורגעים שחשוב לזכור.",
    },
    imageAlt: "אולפן מוזיקה שמתחבר לבמת אירוע חגיגית",
    navAria: "ניווט",
    nav: [
      { href: "formats", label: "פורמטים" },
      { href: "examples", label: "דוגמאות" },
      { href: "process", label: "תהליך" },
      { href: "prices", label: "מחירים" },
    ],
    languageAria: "בחירת שפה",
    briefLabel: "בריף",
    hero: {
      eyebrow: "שירים אישיים לאירוע שלכם",
      title: "שירים מקוריים לאירועים שלכם",
      lead: "הופכים סיפורים, בדיחות, שמות ורגעים חשובים לשיר שהאורחים לא רק ישמעו, אלא יזכרו.",
      primary: "לבנות שיר",
      secondary: "לראות פורמטים",
      stats: [
        ["7 ימים", "התחלה מהירה"],
        ["6 גרסאות", "לבמה ולוידאו"],
        ["100%", "הסיפור שלכם"],
      ],
    },
    composer: {
      aria: "בריף קצר לשיר",
      title: "בונה האווירה",
      badge: "demo",
      tabsAria: "סוג האירוע",
      controlsAria: "אופי השיר",
      warmth: "חום",
      drive: "אנרגיה",
      send: "שלחו רעיון",
      mailSubjectPrefix: "רוצה שיר",
    },
    orderModal: {
      eyebrow: "בקשה לשיר",
      title: "ספרו לנו איזה שיר תרצו",
      intro:
        "תארו את הרעיון, האירוע, האנשים והרגש. ההודעה תישלח למייל שהוגדר במערכת הניהול.",
      close: "סגירת הטופס",
      submit: "שליחת בקשה",
      submitting: "שולחים...",
      success: "הבקשה נשלחה. ניצור קשר בקרוב.",
      error: "לא הצלחנו לשלוח את הבקשה. בדקו את הפרטים או נסו שוב מאוחר יותר.",
      subjectPrefix: "רעיון לשיר",
      fields: {
        name: "שם",
        contact: "פרטי קשר",
        event: "סוג האירוע",
        style: "סגנון או אווירה",
        deadline: "תאריך יעד",
        description: "תיאור הרעיון",
      },
      placeholders: {
        name: "איך לפנות אליכם",
        contact: "אימייל, טלפון או וואטסאפ",
        event: "בחרו אירוע",
        style: "פופ שמח, בלדה, דאנס...",
        deadline: "מתי צריך את השיר",
        description: "למי השיר, מה הסיפור, אילו שמות ופרטים חשובים...",
      },
    },
    events: [
      {
        id: "wedding",
        label: "חתונה",
        title: "שיר לריקוד הראשון",
        line: "בית עדין על ההיכרות, פזמון עם השמות שלכם וסיום שנבנה לרגע של אורות באולם.",
        tempo: "82 BPM",
        accent: "duo",
      },
      {
        id: "birthday",
        label: "יום הולדת",
        title: "להיט לגיבור הערב",
        line: "פרטים חמים, בדיחות קטנות ופזמון שהאורחים יכולים להצטרף אליו בקלות.",
        tempo: "104 BPM",
        accent: "pop",
      },
      {
        id: "corporate",
        label: "אירוע חברה",
        title: "המנון לצוות",
        line: "טראק אנרגטי על ניצחונות, רגעים משותפים וסיום שנה שנשמע כמו במה.",
        tempo: "118 BPM",
        accent: "drive",
      },
      {
        id: "party",
        label: "מסיבה",
        title: "טראק לפתיחת הערב",
        line: "פתיחה רקידה וצבעונית עם הסיבה לחגיגה, השמות והרגע שבו האורות נדלקים.",
        tempo: "126 BPM",
        accent: "club",
      },
    ],
    formatsAria: "פורמטים לשירי אירועים",
    formats: [
      "טקסט מקורי",
      "ווקאל סטודיו",
      "פלייבק ומאסטר",
      "גרסה לקליפ",
      "גרסת קריוקי",
      "עטיפת שיר",
    ],
    occasions: {
      eyebrow: "לכל תרחיש",
      title: "השיר הופך לחלק מהאירוע, לא רק לרקע",
      items: [
        { title: "חתונות", text: "ריקוד ראשון, הפתעה להורים, סיום הטקס" },
        { title: "ימי הולדת", text: "שיר על הדרך, החברים, המשפחה והמשפטים האהובים" },
        { title: "אירועי חברה", text: "המנון צוות, פתיחת ערב, רגע הענקת פרסים" },
        { title: "מסיבות ילדים", text: "טראק צבעוני על גיבור היום והעולם הקטן שלו" },
      ],
    },
    examples: {
      eyebrow: "דמואים חיים",
      title: "גללו בין 7 דוגמאות והשמיעו את זו שהכי קרובה לאירוע שלכם",
      intro: "אווירת חתונה, חום של יום הולדת, אנרגיית צוות ופתיחה לרחבה בפלייליסט אחד.",
      loading: "טוענים דוגמאות",
      emptyTitle: "סלוט פנוי",
      emptyDescription: "כאן תופיע דוגמת MP3 לשיר",
      noEvent: "דוגמת שיר",
      listen: "להאזין",
    },
    why: {
      eyebrow: "למה אנחנו",
      title: "למה כדאי להזמין שיר אצלנו",
      subtitle: "למה שיר בהזמנה הוא המתנה הטובה ביותר",
      text: "מתנות רגילות נשכחות, אבל שיר נשאר בזיכרון. זו לא רק מוזיקה, אלא סיפור אישי שנוצר במיוחד עבור אדם או אירוע.",
      benefitsTitle: "היתרונות שלנו",
      benefits: [
        "גישה אישית לכל שיר",
        "טקסט לפי הסיפור שלכם",
        "מגוון סגנונות מוזיקליים",
        "אפשרות להוסיף שמות, תאריכים ואירועים חשובים",
        "טראק מוכן מקצה לקצה",
        "השיר מתאים לאירוע חי, וידאו, ברכה או הפתעה",
      ],
    },
    process: {
      eyebrow: "מהסיפור ועד המאסטר",
      title: "הכול מתקדם בקצב ברור",
      steps: [
        {
          title: "אתם משאירים בקשה",
          text: "מספרים עבור מי השיר, מה הסיבה, באיזה סגנון תרצו אותו ואילו פרטים חשוב להוסיף.",
        },
        {
          title: "אנחנו כותבים טקסט",
          text: "יוצרים מילים מקוריות לשיר לפי הסיפור שלכם, השמות, הרגש, ההומור והבקשות.",
        },
        {
          title: "בוחרים מוזיקה ווקאל",
          text: "בונים את העיבוד המוזיקלי ובוחרים את האווירה, הסגנון וקול הביצוע.",
        },
        {
          title: "מכינים את הטראק הסופי",
          text: "אתם מקבלים שיר מוכן באיכות גבוהה, שאפשר להשמיע באירוע, לשלוח בהודעה או להשתמש בו בוידאו.",
        },
      ],
    },
    prices: {
      eyebrow: "תמחור לפי כמות",
      title: "ככל שמזמינים יותר שירים, המחיר לכל שיר יורד",
      choose: "לבחור",
      packages: [
        {
          name: "עד 20 שירים",
          price: "$30 לשיר",
          detail: "להזמנות קטנות, ברכות אישיות וסדרות ראשונות של שירים.",
          features: ["עד 20 שירים בהזמנה אחת", "טקסט לפי הסיפור שלכם", "טראק מוכן מקצה לקצה"],
        },
        {
          name: "20 עד 50 שירים",
          price: "$20 לשיר",
          detail: "המסלול המתאים לסדרת ברכות, אירועים או תכנים.",
          features: ["20-50 שירים בהזמנה אחת", "סגנון אחיד או ז'אנרים שונים", "מחיר משתלם לכמות"],
          featured: true,
        },
        {
          name: "מ-50 שירים",
          price: "$10 לשיר",
          detail: "לפרויקטים גדולים, סוכנויות והפקה קבועה של שירים.",
          features: ["מ-50 שירים להזמנה", "תכנון סדר הפקה", "איכות יציבה לאורך הסדרה"],
        },
      ],
    },
    finalCta: {
      eyebrow: "הסיפור שלכם כבר נשמע",
      title: "ספרו לנו על האירוע, ואנחנו נמצא את הפזמון",
      button: "להתחיל בריף",
    },
    footer: {
      links: ["Terms", "Terms of Service", "Privacy Policy", "Cookie Policy"],
    },
    backToTop: "למעלה",
  },
};

export function getLocale(id) {
  return locales[id] ?? locales.ru;
}

export function getContent(id) {
  return content[id] ?? content.ru;
}

export function getPageMetadata(id) {
  const currentLocale = getLocale(id);
  const currentContent = getContent(id);

  return {
    title: currentContent.metadata.title,
    description: currentContent.metadata.description,
    alternates: {
      canonical: currentLocale.path,
      languages: {
        ru: "/",
        en: "/en",
        he: "/he",
      },
    },
    openGraph: {
      title: currentContent.metadata.title,
      description: currentContent.metadata.description,
      locale: currentLocale.lang,
      images: ["/song-studio-stage.png"],
    },
  };
}
