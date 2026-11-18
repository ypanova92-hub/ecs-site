/* ECS landing · language switch (Hebrew RTL by default, English LTR).
   The page is authored in English. For Hebrew, every text node and translatable attribute
   whose English text appears in HE below is swapped before main.js splits headings into words.
   Switching language saves the current section and unsent form entries, then reloads. */
(() => {
  const root = document.documentElement;
  const lang = root.lang === 'en' ? 'en' : 'he';

  const HE = {
    // page
    'ECS · Entrepreneurship Club Sapir': 'ECS · מועדון היזמות של ספיר',
    'A community for Sapir College students who want to explore entrepreneurship together. Meet people, learn by doing and develop ideas.':
      'קהילה לסטודנטים במכללת ספיר שרוצים להכיר יחד את עולם היזמות. להכיר אנשים, ללמוד דרך עשייה ולפתח רעיונות.',
    '→': '←',

    // intro
    'Skip intro': 'דילוג על הפתיח',
    'idea': 'רעיון', 'team': 'צוות', 'launch': 'השקה',

    // header
    'Skip to content': 'דילוג לתוכן',
    'ECS · Entrepreneurship Club Sapir, back to top': 'ECS · מועדון היזמות של ספיר, חזרה לראש העמוד',
    'Main': 'ניווט ראשי',
    'Mobile': 'תפריט',
    'Language': 'שפה',
    'About': 'על המועדון',
    'Events': 'אירועים',
    'Contact': 'יצירת קשר',
    'Join the Community': 'הצטרפו לקהילה',
    'Open menu': 'פתיחת התפריט',
    'Close menu': 'סגירת התפריט',

    // hero
    'Students working together around laptops': 'סטודנטים עובדים יחד מול מחשבים ניידים',
    'Entrepreneurship Club · Sapir College': 'מועדון היזמות · מכללת ספיר',
    'Take your first step into entrepreneurship': 'הצעד הראשון שלך בעולם היזמות',
    'Dec': 'דצמ׳',
    'Jan': 'ינו׳',
    'Registration open': 'ההרשמה פתוחה',
    'Entrepreneurship dinner': 'ערב יזמות',
    '18:00 · Sapir College': '18:00 · מכללת ספיר',
    'Meet people, learn by doing and explore ideas with students at Sapir College. Curiosity is enough to get started.':
      'להכיר אנשים, ללמוד דרך עשייה ולפתח רעיונות עם סטודנטים במכללת ספיר. אפשר להתחיל מסקרנות.',
    'Explore Events': 'לכל האירועים',
    'Short form, then the ECS WhatsApp community · For Sapir College students, no experience needed':
      'טופס קצר ואז קהילת ECS בוואטסאפ · לסטודנטים במכללת ספיר, בלי צורך בניסיון',
    'Scroll': 'גללו',

    // about
    'What you’ll find at ECS': 'מה מחכה לך ב־ECS',
    'A community for Sapir College students who want to': 'קהילה לסטודנטים במכללת ספיר שרוצים',
    'explore entrepreneurship together': 'להכיר יחד את עולם היזמות',
    '— whether you arrive with an idea or just with curiosity.': '— בין אם הגעתם עם רעיון ובין אם רק מסקרנות.',
    'Students chatting and laughing on campus': 'סטודנטים משוחחים וצוחקים בקמפוס',
    'Meet people': 'להכיר אנשים',
    'Connect with students from every department and with founders, mentors and people from the industry who care about new ideas.':
      'להתחבר לסטודנטים מכל המחלקות, ליזמים, למנטורים ולאנשי תעשייה שאכפת להם מרעיונות חדשים.',
    'Students working through a task at a workshop': 'סטודנטים עובדים על משימה בסדנה',
    'Learn by doing': 'ללמוד דרך עשייה',
    'Hands-on workshops and real challenges: validate an idea, talk to users, build a pitch and get honest feedback.':
      'סדנאות מעשיות ואתגרים אמיתיים: לבדוק רעיון, לדבר עם משתמשים, לבנות פיץ׳ ולקבל משוב כן.',
    'Sticky notes with ideas on a wall': 'פתקים עם רעיונות על הקיר',
    'Develop ideas': 'לפתח רעיונות',
    'Bring a rough idea or just curiosity. Find collaborators, shape the concept and take the first step together.':
      'הביאו רעיון ראשוני או רק סקרנות. מצאו שותפים, גבשו את הקונספט ועשו יחד את הצעד הראשון.',

    // first step
    'Find your first step': 'מאיפה מתחילים',
    'Entrepreneurship is a journey. Curiosity is where it begins.': 'יזמות היא מסע. הכול מתחיל בסקרנות.',
    'Just curious': 'רק מתעניינים',
    'Pick a talk or a networking evening, come with a friend and see what ECS is like.':
      'בחרו הרצאה או ערב נטוורקינג, הגיעו עם חבר או חברה ותראו איך זה ב־ECS.',
    'I have an idea': 'יש לי רעיון',
    'Share it at a workshop or pitch night, get feedback from students and mentors and find your next step.':
      'שתפו אותו בסדנה או בערב הצגת מיזמים, קבלו משוב מסטודנטים וממנטורים ומצאו את הצעד הבא.',
    'See events': 'לאירועים',
    'Looking for a team': 'מחפשים צוות',
    'Meet students from other departments who want to work on ideas together.':
      'הכירו סטודנטים ממחלקות אחרות שרוצים לעבוד יחד על רעיונות.',
    'Not sure where you fit?': 'לא בטוחים מה מתאים לכם?',
    'Come to one open event. No commitment, no experience needed.': 'בואו לאירוע פתוח אחד. בלי התחייבות ובלי צורך בניסיון.',
    '“I came with zero ideas and left with two people I now build with.”':
      '“הגעתי בלי אף רעיון ויצאתי עם שני אנשים שאני בונה איתם היום.”',
    'Amit R. · Economics, 2nd year': 'עמית ר. · כלכלה, שנה ב׳',

    // formats
    '[ How we meet ]': '[ איך נפגשים ]',
    'Five ways to get involved': 'חמש דרכים להשתלב',
    'Scroll to explore': 'גללו כדי לגלות',
    'Swipe to explore': 'החליקו כדי לגלות',
    'Workshops': 'סדנאות',
    'Hands-on': 'התנסות מעשית',
    'Small groups': 'קבוצות קטנות',
    'No experience needed': 'בלי צורך בניסיון',
    'Practical sessions where you try a real founder skill, from testing an idea to building your first pitch.':
      'מפגשים מעשיים שבהם מתנסים במיומנות אמיתית של יזמים, מבדיקת רעיון ועד בניית הפיץ׳ הראשון.',
    'Founder talks': 'הרצאות של יזמים',
    'Industry guests': 'אורחים מהתעשייה',
    'Real stories': 'סיפורים אמיתיים',
    'Open Q&A': 'שאלות ותשובות פתוחות',
    'Entrepreneurs and high-tech people share what actually happened, including the mistakes, and answer your questions.':
      'יזמים ואנשי הייטק מספרים מה באמת קרה, כולל הטעויות, ועונים על השאלות שלכם.',
    'Networking evenings': 'ערבי נטוורקינג',
    'All departments': 'כל המחלקות',
    'Students & industry': 'סטודנטים ותעשייה',
    'Bring a friend': 'הביאו חבר או חברה',
    'Relaxed evenings to meet students from other departments and people from the industry, no pitch required.':
      'ערבים רגועים להכיר סטודנטים ממחלקות אחרות ואנשים מהתעשייה, בלי צורך בפיץ׳.',
    'Pitch nights': 'ערבי הצגת מיזמים',
    'Feedback': 'משוב',
    'Mentors': 'מנטורים',
    'Your idea on stage': 'הרעיון שלך על הבמה',
    'Share an idea in a few minutes and get honest, friendly feedback from students and mentors.':
      'הציגו רעיון בכמה דקות וקבלו משוב כן וידידותי מסטודנטים וממנטורים.',
    'Team projects': 'פרויקטים בצוות',
    'Find co-founders': 'למצוא שותפים',
    'Build together': 'לבנות יחד',
    'Mentor support': 'ליווי של מנטורים',
    'Join forces with students who want to turn an idea into something real, step by step.':
      'חברו לסטודנטים שרוצים להפוך רעיון למשהו אמיתי, צעד אחר צעד.',

    // team
    'The people behind ECS': 'האנשים מאחורי ECS',
    'Meet the Team': 'הכירו את הצוות',
    'Meet the student organisers behind the community.': 'הסטודנטים שמובילים את פעילות הקהילה.',
    'Portrait of Noa Levi': 'דיוקן של נועה לוי',
    'Noa Levi': 'נועה לוי',
    'Club Chair · Industrial Management': 'יו״ר המועדון · ניהול תעשייה',
    'Portrait of Daniel Cohen': 'דיוקן של דניאל כהן',
    'Daniel Cohen': 'דניאל כהן',
    'Events Lead · Economics': 'אחריות על אירועים · כלכלה',
    'Portrait of Maya Ben-David': 'דיוקן של מאיה בן־דוד',
    'Maya Ben-David': 'מאיה בן־דוד',
    'Partnerships Lead · Public Policy': 'אחריות על שותפויות · מדיניות ציבורית',
    'Portrait of Yonatan Peretz': 'דיוקן של יונתן פרץ',
    'Yonatan Peretz': 'יונתן פרץ',
    'Community & Media · Communication': 'קהילה ומדיה · תקשורת',

    // marquees
    'Idea → Team → Launch': 'רעיון ← צוות ← השקה',
    'Build with people': 'לבנות עם אנשים',
    'Curiosity is enough': 'מספיק להיות סקרנים',
    'Your first step starts here': 'הצעד הראשון שלך מתחיל כאן',
    'Sapir College students': 'סטודנטים וסטודנטיות בספיר',
    'Meet. Learn. Build.': 'להכיר. ללמוד. לבנות.',
    'Join the community': 'הצטרפו לקהילה',

    // events
    'Activities & events': 'פעילויות ואירועים',
    'Workshops, talks and evenings': 'סדנאות, הרצאות וערבים',
    'worth showing up for': 'ששווה להגיע אליהם',
    'Workshops, networking, talks and hands-on sessions.': 'סדנאות, מפגשי נטוורקינג, הרצאות והתנסות מעשית.',
    'Event formats': 'סוגי אירועים',
    'Networking': 'נטוורקינג',
    'Talks': 'הרצאות',
    'A dinner with talks on entrepreneurship and high-tech.': 'ארוחת ערב עם הרצאות על יזמות והייטק.',
    'Event details': 'פרטי האירוע',
    'Hide details': 'הסתרת הפרטים',
    'When': 'מתי',
    'Where': 'איפה',
    'Who can attend': 'למי מיועד',
    '3 December · 18:00': '3 בדצמבר · 18:00',
    'Sapir College · Student Center': 'מכללת ספיר · מרכז הסטודנטים',
    'Register for this event': 'להרשמה לאירוע',
    'Add to calendar': 'הוספה ליומן',
    'Questions? Contact ECS': 'יש שאלות? פנו ל־ECS',
    'TBC': 'בקרוב',
    'Date to be confirmed': 'התאריך ייקבע בהמשך',
    'Book Week event': 'אירוע שבוע הספר',
    'A regional collaboration around practical knowledge and entrepreneurship.': 'שיתוף פעולה אזורי סביב ידע מעשי ויזמות.',
    'Date and registration to be confirmed': 'התאריך וההרשמה טרם אושרו',
    'Registration opens soon': 'ההרשמה תיפתח בקרוב',
    'Idea Validation Workshop': 'סדנת בדיקת רעיונות',
    'Learn how to test an idea with real people in 90 minutes. No experience needed.':
      'לומדים לבדוק רעיון מול אנשים אמיתיים ב־90 דקות. בלי צורך בניסיון.',
    '14 January · 17:30': '14 בינואר · 17:30',
    'Sapir College · Innovation Lab': 'מכללת ספיר · מעבדת החדשנות',
    'All Sapir College students': 'כל הסטודנטים והסטודנטיות בספיר',
    'Calendar file downloaded': 'קובץ היומן הורד',

    // projects
    'Student projects': 'מיזמי סטודנטים',
    'From a first conversation to': 'משיחה ראשונה',
    'a real project': 'לפרויקט אמיתי',
    'See how a first conversation can turn into a pilot, a prototype or a paid project.':
      'כך שיחה ראשונה יכולה להפוך לפיילוט, לאב־טיפוס או לפרויקט בתשלום.',
    'Stacked textbooks': 'מדפי ספרים בספרייה',
    'Campus pilot launched': 'הפיילוט הושק בקמפוס',
    'Campus Book Swap': 'החלפת ספרי לימוד בקמפוס',
    'Two students met at an ECS workshop and turned an idea for swapping textbooks into a pilot service on campus.':
      'שני סטודנטים נפגשו בסדנה של ECS והפכו רעיון להחלפת ספרי לימוד לשירות ניסיוני בקמפוס.',
    'Drip irrigation line watering young plants': 'קו טפטוף משקה צמחים צעירים',
    'Prototype testing funded': 'התקבל מימון לבדיקת אב־הטיפוס',
    'Smart Irrigation': 'השקיה חכמה',
    'A team presented its water-saving prototype at an ECS pitch night and found a sponsor to cover materials for field testing.':
      'צוות סטודנטים הציג אב־טיפוס לחיסכון במים בערב הצגת מיזמים של ECS ומצא נותן חסות למימון חומרי הניסוי בשטח.',
    'A student team filming with a video camera': 'צוות סטודנטים מצלם במצלמת וידאו',
    'First paid project': 'פרויקט ראשון בתשלום',
    'Student Media Studio': 'סטודיו מדיה לסטודנטים',
    'Three students met through ECS, formed a production team, and landed their first paid video project.':
      'שלושה סטודנטים הכירו דרך ECS, הקימו צוות הפקה וקיבלו את פרויקט הווידאו הראשון שלהם בתשלום.',

    // impact
    'ECS in numbers': 'ECS במספרים',
    'Example figures for the prototype. Real numbers will be added before launch.':
      'נתונים לדוגמה באב־הטיפוס. המספרים האמיתיים יתווספו לפני ההשקה.',
    'Students in the community': 'סטודנטים בקהילה',
    'Events held': 'אירועים שהתקיימו',
    'Student projects supported': 'מיזמי סטודנטים שליווינו',
    'Partners and mentors': 'שותפים ומנטורים',

    // community
    'Community in action': 'הקהילה בפעולה',
    'Where students and industry meet': 'כאן סטודנטים ותעשייה נפגשים',
    'Community photo gallery': 'גלריית תמונות של הקהילה',
    'Audience at a club workshop': 'קהל בסדנה של המועדון',
    'A student presenting at pitch night': 'סטודנטית מציגה בערב הצגת מיזמים',
    'Students talking at a networking evening': 'סטודנטים משוחחים בערב נטוורקינג',
    'Students at a campus meetup': 'סטודנטים במפגש בקמפוס',
    'A team working together during a hands-on session': 'צוות עובד יחד במפגש מעשי',
    'Students planning a project around a table': 'סטודנטים מתכננים פרויקט סביב שולחן',
    'Crowd at the Book Week event': 'קהל באירוע שבוע הספר',
    'Club members celebrating together': 'חברי המועדון חוגגים יחד',
    'Pitch Night': 'ערב הצגת מיזמים',
    'Networking Evening': 'ערב נטוורקינג',
    'Meetup with Founders': 'מפגש עם יזמים',
    'Hands-on Session': 'מפגש מעשי',
    'Team Project Sprint': 'ספרינט של פרויקט צוותי',
    'Book Week': 'שבוע הספר',
    'End-of-semester Meetup': 'מפגש סוף סמסטר',
    'Your photo could be next': 'התמונה הבאה יכולה להיות שלך',
    'Come to an event and meet the community.': 'בואו לאירוע ותכירו את הקהילה.',

    // faq
    'FAQ': 'שאלות נפוצות',
    'Before You Join': 'לפני שמצטרפים',
    'Do I need a startup idea or experience?': 'צריך ניסיון או רעיון למיזם?',
    'You can start with curiosity. The community is designed for Sapir students who want to explore entrepreneurship or develop an idea.':
      'אפשר להתחיל מסקרנות. הקהילה מיועדת לסטודנטים וסטודנטיות בספיר שרוצים להכיר את עולם היזמות או לפתח רעיון.',
    'Can I just attend one event?': 'אפשר להגיע רק לאירוע אחד?',
    'Check the event card for its participation and registration details. Event registration has its own button when open.':
      'בכרטיס האירוע יש פרטים על תנאי ההשתתפות וההרשמה. כשההרשמה פתוחה, מופיע כפתור ייעודי לאירוע.',
    'What happens after I send the form?': 'מה קורה אחרי שליחת הטופס?',
    'After a successful submission, you’ll be directed to the ECS community invitation in WhatsApp.':
      'לאחר שליחה מוצלחת תופיע הזמנה לקהילת ECS בוואטסאפ.',

    // join
    'Membership': 'הצטרפות למועדון',
    'Leave your details to continue to the ECS WhatsApp community.': 'השאירו פרטים כדי לעבור לקהילת ECS בוואטסאפ.',
    'How joining works': 'איך מצטרפים',
    'Step 01': 'שלב 01',
    'Step 02': 'שלב 02',
    'Step 03': 'שלב 03',
    'Fill in the short form': 'ממלאים טופס קצר',
    'We save your details': 'אנחנו שומרים את הפרטים',
    'Join the ECS WhatsApp community': 'מצטרפים לקהילת ECS בוואטסאפ',
    'For Sapir College students · No idea or experience needed': 'לסטודנטים במכללת ספיר · בלי צורך ברעיון או בניסיון',
    '* Required': '* שדה חובה',
    'Full name': 'שם מלא',
    'Phone number': 'מספר טלפון',
    'Field of study': 'תחום לימודים',
    '(optional)': '(לא חובה)',
    'Year of study': 'שנת לימודים',
    'e.g. Dana Levi': 'לדוגמה: דנה לוי',
    'Select year': 'בחירת שנה',
    'We use your details only to add you to the ECS community. We never share them with third parties.':
      'נשתמש בפרטים רק כדי לצרף אתכם לקהילת ECS. לעולם לא נעביר אותם לצד שלישי.',
    'Submit and Continue': 'שליחה והמשך',
    'Sending…': 'שולחים…',
    'Next: the ECS WhatsApp community opens.': 'בשלב הבא תיפתח קהילת ECS בוואטסאפ.',
    'You’re almost in': 'כמעט בפנים',
    'Your details are saved. Open the invitation to join the ECS WhatsApp community.':
      'הפרטים נשמרו. פתחו את ההזמנה כדי להצטרף לקהילת ECS בוואטסאפ.',
    'Open WhatsApp invitation': 'פתיחת ההזמנה בוואטסאפ',
    'Didn’t open? Use the button above. It works any time.': 'לא נפתח? השתמשו בכפתור שלמעלה. הוא עובד בכל זמן.',
    'Enter your full name.': 'נא להזין שם מלא.',
    'Enter a mobile number like 050-123-4567.': 'נא להזין מספר נייד, למשל 050-123-4567.',

    // partners
    'Partners & sponsors': 'שותפים ונותני חסות',
    'Build the': 'בואו לבנות',
    'next founders': 'את היזמים הבאים',
    'with us': 'איתנו',
    'Support a workshop, mentor a student team or help bring an event to campus.':
      'אפשר לתמוך בסדנה, ללוות צוות סטודנטים או לסייע בקיום אירוע בקמפוס.',
    'Partner with Us': 'הציעו שיתוף פעולה',
    'Partner organisations': 'ארגונים שותפים',
    'Your logo here? Become a partner': 'הלוגו שלכם כאן? הצטרפו כשותפים',

    // contact + footer
    'Contact ECS': 'יצירת קשר עם ECS',
    'Let’s talk ideas.': 'בואו נדבר על רעיונות.',
    'For questions and collaborations, contact the club.': 'לשאלות ולשיתופי פעולה, פנו למועדון.',
    'Official club email': 'דוא״ל רשמי של המועדון',
    'Event photos and announcements': 'תמונות מאירועים ועדכונים',
    'Partnerships and news': 'שותפויות וחדשות',
    'Ideas start here.': 'רעיונות מתחילים כאן.',
    'Footer': 'תחתית העמוד',
    'Join': 'הצטרפות',
    'Sapir College website': 'אתר מכללת ספיר',
    '© 2026 ECS · Sapir College': '© 2026 ECS · מכללת ספיר',

    // placeholder toasts
    '{x} will be connected before launch': '{x}: הקישור יחובר לפני ההשקה',
    'Registration link': 'קישור ההרשמה',
    'WhatsApp invitation': 'ההזמנה לוואטסאפ',
    'Club email': 'הדוא״ל של המועדון',
  };

  const norm = s => s.replace(/\s+/g, ' ').trim();
  const T = s => (lang === 'he' && HE[norm(s)]) || s;
  window.ecsT = T;
  window.ecsLang = lang;

  /* ---------- translate the page ---------- */
  if (lang === 'he') {
    document.title = T(document.title);
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: n => (n.parentElement.closest('script, style, [data-no-i18n]') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => {
      const key = norm(n.nodeValue);
      if (!key || !HE[key]) return;
      const lead = /^\s/.test(n.nodeValue) ? ' ' : '', trail = /\s$/.test(n.nodeValue) ? ' ' : '';
      n.nodeValue = lead + HE[key] + trail;
    });
    ['alt', 'aria-label', 'placeholder', 'title'].forEach(attr => {
      document.querySelectorAll(`[${attr}]`).forEach(el => {
        const v = HE[norm(el.getAttribute(attr))];
        if (v) el.setAttribute(attr, v);
      });
    });
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = T(desc.content);
  }
  root.classList.remove('i18n-pending');

  /* ---------- switch ---------- */
  const STATE = 'ecs-lang-state';
  const form = document.getElementById('join-form');
  const success = document.getElementById('join-success');

  document.querySelectorAll('[data-lang]').forEach(btn => {
    const on = btn.dataset.lang === lang;
    btn.setAttribute('aria-pressed', String(on));
    btn.addEventListener('click', () => {
      if (btn.dataset.lang === lang) return;
      // Remember the section at the top of the viewport and any unsent entries.
      const sections = [...document.querySelectorAll('main > section[id], footer[id]')];
      const line = window.innerHeight * .3;
      let current = sections[0];
      sections.forEach(s => { if (s.getBoundingClientRect().top <= line) current = s; });
      const r = current.getBoundingClientRect();
      const state = {
        section: current.id,
        into: Math.max(0, line - r.top) / Math.max(1, r.height),
        fields: form ? Object.fromEntries([...form.elements].filter(el => el.name).map(el => [el.name, el.value])) : {},
        sent: success ? !success.hidden : false,
      };
      try {
        sessionStorage.setItem(STATE, JSON.stringify(state));
        sessionStorage.setItem('ecs-intro', '1');
        localStorage.setItem('ecs-lang', btn.dataset.lang);
      } catch (e) {}
      const url = new URL(location.href);
      url.searchParams.delete('lang');
      url.hash = '';
      location.replace(url.toString());
    });
  });

  /* ---------- restore after a switch ---------- */
  let saved = null;
  try { saved = JSON.parse(sessionStorage.getItem(STATE) || 'null'); sessionStorage.removeItem(STATE); } catch (e) {}
  if (saved) {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (form && saved.fields) Object.entries(saved.fields).forEach(([k, v]) => { if (form.elements[k]) form.elements[k].value = v; });
    if (form && success && saved.sent) { form.hidden = true; success.hidden = false; }
    addEventListener('load', () => setTimeout(() => {
      const s = document.getElementById(saved.section);
      if (!s) return;
      const top = s.getBoundingClientRect().top + scrollY + saved.into * s.offsetHeight - innerHeight * .3;
      scrollTo({ top: Math.max(0, top), behavior: 'instant' });
    }, 60));
  }
})();
