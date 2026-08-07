/* =====================================================
   КосмоNav — Космический Навигатор
   ===================================================== */

if('serviceWorker'in navigator){
  navigator.serviceWorker.register('./sw.js').catch(()=>{});
}

// ── Stars ───────────────────────────────────────────
(function(){
  const c=document.getElementById('stars-canvas'),x=c.getContext('2d');
  let s=[];
  function resize(){c.width=innerWidth;c.height=innerHeight}
  function create(){
    s=[];const n=Math.floor((c.width*c.height)/3000);
    for(let i=0;i<n;i++)s.push({
      x:Math.random()*c.width,y:Math.random()*c.height,
      r:Math.random()*1.5+.3,a:Math.random(),d:(Math.random()-.5)*.01
    });
  }
  function draw(){
    x.clearRect(0,0,c.width,c.height);
    s.forEach(p=>{
      p.a+=p.d;if(p.a>1||p.a<.1)p.d*=-1;
      x.beginPath();x.arc(p.x,p.y,p.r,0,Math.PI*2);
      x.fillStyle=`rgba(200,210,255,${p.a})`;x.fill();
    });
    requestAnimationFrame(draw);
  }
  resize();create();draw();
  addEventListener('resize',()=>{resize();create()});
})();

// ══════════════════════════════════════════════════════
//  QUESTIONS
// ══════════════════════════════════════════════════════
const QUESTIONS=[
  {
    id:'level',title:'Кто ты сейчас?',
    subtitle:'Выбери свой текущий статус',multi:false,
    options:[
      {emoji:'🎓',text:'Школьник / абитуриент',tag:'school'},
      {emoji:'📚',text:'Студент 1–2 курса (вуз или СПО)',tag:'junior_student'},
      {emoji:'📖',text:'Студент 3–4 курса / магистрант',tag:'senior_student'},
      {emoji:'🎯',text:'Выпускник / молодой специалист',tag:'young_pro'},
      {emoji:'💼',text:'Специалист с опытом (2–5 лет)',tag:'mid_pro'}
    ]
  },
  {
    id:'interest',title:'Что тебя вдохновляет?',
    subtitle:'Выбери до 3-х направлений',multi:true,maxSelect:3,
    options:[
      {emoji:'🚀',text:'Ракеты и космические аппараты',tag:'rockets_spacecraft'},
      {emoji:'🛰️',text:'Спутники и связь',tag:'satellites'},
      {emoji:'💻',text:'IT и цифровые технологии',tag:'it_digital'},
      {emoji:'🔬',text:'Наука и исследования',tag:'science'},
      {emoji:'📊',text:'Аналитика данных и ИИ',tag:'analytics'},
      {emoji:'🏗️',text:'Производство и инженерия',tag:'engineering'},
      {emoji:'📋',text:'Управление проектами',tag:'management'},
      {emoji:'🌍',text:'Навигация и ДЗЗ',tag:'geo_navigation'}
    ]
  },
  {
    id:'skill',title:'Какие навыки тебе ближе?',
    subtitle:'Выбери 2–3 сильных стороны',multi:true,maxSelect:3,
    options:[
      {emoji:'⌨️',text:'Программирование (Python, C++, Java)',tag:'programming'},
      {emoji:'📐',text:'Математика и моделирование',tag:'math'},
      {emoji:'🖥️',text:'Конструирование / CAD-системы',tag:'cad'},
      {emoji:'📈',text:'Работа с данными и аналитика',tag:'data'},
      {emoji:'🗣️',text:'Коммуникация и презентации',tag:'communication'},
      {emoji:'👥',text:'Лидерство и командная работа',tag:'leadership'},
      {emoji:'🔌',text:'Электроника и схемотехника',tag:'electronics'},
      {emoji:'🧩',text:'Системное мышление',tag:'systems_thinking'}
    ]
  },
  {
    id:'goal',title:'Что ты ищешь прямо сейчас?',
    subtitle:'Что для тебя сейчас самое актуальное?',multi:false,
    options:[
      {emoji:'🏆',text:'Попробовать себя на хакатоне / конкурсе',tag:'competition'},
      {emoji:'📝',text:'Пройти стажировку или практику',tag:'internship'},
      {emoji:'🎓',text:'Поступить на целевое обучение',tag:'target_education'},
      {emoji:'💼',text:'Найти работу в отрасли',tag:'job'},
      {emoji:'🤝',text:'Присоединиться к проекту',tag:'project'},
      {emoji:'📅',text:'Посетить форум или мероприятие',tag:'event'},
      {emoji:'🔍',text:'Просто узнать, что есть',tag:'explore'}
    ]
  },
  {
    id:'format',title:'Какой формат тебе подходит?',
    subtitle:'Как тебе удобнее участвовать?',multi:false,
    options:[
      {emoji:'🌐',text:'Онлайн / удалённо',tag:'online'},
      {emoji:'🏢',text:'Очно, готов(а) к переезду',tag:'onsite_relocate'},
      {emoji:'📍',text:'Очно, в моём городе',tag:'onsite_local'},
      {emoji:'🔄',text:'Любой формат',tag:'any'}
    ]
  },
  {
    id:'time',title:'Когда готов(а) начать?',
    subtitle:'Выбери удобные временные рамки',multi:false,
    options:[
      {emoji:'⚡',text:'Сейчас / в ближайший месяц',tag:'now'},
      {emoji:'📆',text:'В течение полугода',tag:'half_year'},
      {emoji:'🗓️',text:'В следующем учебном году',tag:'next_year'},
      {emoji:'👀',text:'Пока присматриваюсь',tag:'exploring'}
    ]
  },
  {
    id:'experience',title:'Есть ли у тебя релевантный опыт?',
    subtitle:'Можно выбрать несколько вариантов',multi:true,maxSelect:5,
    options:[
      {emoji:'🥇',text:'Участвовал(а) в олимпиадах / конкурсах',tag:'competitions'},
      {emoji:'🛠️',text:'Есть свои проекты (pet-projects)',tag:'projects'},
      {emoji:'🏢',text:'Проходил(а) стажировку',tag:'intern_exp'},
      {emoji:'📘',text:'Учусь по профильной специальности',tag:'profile_edu'},
      {emoji:'🌱',text:'Нет опыта, но хочу начать',tag:'none'}
    ]
  }
];

// ══════════════════════════════════════════════════════
//  OPPORTUNITIES — реальные программы Роскосмоса
// ══════════════════════════════════════════════════════
const OPPORTUNITIES=[
  {
    id:1,title:'Форум «Команда будущего»',
    type:'event',typeLabel:'Форум',
    description:'Флагманский молодёжный форум Роскосмоса: стратегические сессии, проектная работа, лекции руководителей отрасли, встречи с космонавтами и экспертами.',
    organization:'Госкорпорация «Роскосмос»',format:'Очно',
    actionUrl:'https://keytostart.space',actionText:'Подать заявку',
    tags:{
      level:['senior_student','young_pro','mid_pro'],
      interest:['rockets_spacecraft','satellites','it_digital','engineering','management','science','analytics','geo_navigation'],
      skill:['leadership','communication','systems_thinking'],
      goal:['event','explore','project'],
      format:['onsite_relocate','any'],
      time:['now','half_year','next_year','exploring']
    }
  },
  {
    id:2,title:'Космические смены (Артек, Орлёнок, Океан, Смена)',
    type:'event',typeLabel:'Образовательная программа',
    description:'Космические смены для школьников 12–17 лет: ракетостроение, спутникостроение, ДЗЗ, робототехника, программирование.',
    organization:'Роскосмос / детские центры',format:'Очно (выездные смены)',
    actionUrl:'https://keytostart.space',actionText:'Узнать о сменах',
    tags:{
      level:['school'],
      interest:['rockets_spacecraft','satellites','it_digital','science','engineering','geo_navigation'],
      skill:['programming','electronics','math','systems_thinking','leadership'],
      goal:['event','explore','project'],
      format:['onsite_relocate','any'],
      time:['half_year','next_year','exploring']
    }
  },
  {
    id:3,title:'Программа поощрительных поездок на космодромы',
    type:'event',typeLabel:'Экскурсионная программа',
    description:'Поездки на Байконур и Восточный для победителей конкурсов, кейс-чемпионатов и активных участников молодёжных проектов.',
    organization:'Госкорпорация «Роскосмос»',format:'Очно (Байконур / Восточный)',
    actionUrl:'https://keytostart.space',actionText:'Условия участия',
    tags:{
      level:['school','junior_student','senior_student','young_pro'],
      interest:['rockets_spacecraft','engineering','satellites','science'],
      skill:['leadership','systems_thinking','communication'],
      goal:['event','explore'],
      format:['onsite_relocate','any'],
      time:['half_year','next_year','exploring']
    }
  },
  {
    id:4,title:'Кейс-чемпионат «Орбита поколений»',
    type:'competition',typeLabel:'Кейс-чемпионат',
    description:'Всероссийское командное соревнование: школьники, студенты и молодые сотрудники решают реальные кейсы предприятий Роскосмоса.',
    organization:'Госкорпорация «Роскосмос»',format:'Онлайн-отбор + очный финал',
    actionUrl:'https://keytostart.space',actionText:'Зарегистрироваться',
    tags:{
      level:['school','junior_student','senior_student','young_pro'],
      interest:['management','it_digital','engineering','analytics','rockets_spacecraft','satellites'],
      skill:['leadership','communication','systems_thinking','data','programming'],
      goal:['competition','explore','project'],
      format:['online','onsite_relocate','any'],
      time:['now','half_year']
    }
  },
  {
    id:5,title:'Инженерный хакатон «Кедр»',
    type:'competition',typeLabel:'Хакатон',
    description:'Командный хакатон: инженерные и цифровые задачи, моделирование спутниковых систем, технологии ИИ. Призы и менторство экспертов.',
    organization:'Госкорпорация «Роскосмос»',format:'Онлайн + финал очно',
    actionUrl:'https://keytostart.space',actionText:'Зарегистрироваться',
    tags:{
      level:['junior_student','senior_student','young_pro','mid_pro'],
      interest:['it_digital','analytics','satellites','geo_navigation','engineering'],
      skill:['programming','data','math','systems_thinking','electronics'],
      goal:['competition','explore','project'],
      format:['online','any'],
      time:['now','half_year']
    }
  },
  {
    id:6,title:'Всероссийский конкурс научно-технических работ молодёжи',
    type:'competition',typeLabel:'Конкурс',
    description:'Направления: космические технологии, новые материалы, цифровые решения, ИИ, производственные технологии.',
    organization:'Госкорпорация «Роскосмос»',format:'Заочный отбор + очный финал',
    actionUrl:'https://keytostart.space',actionText:'Подать работу',
    tags:{
      level:['junior_student','senior_student','young_pro'],
      interest:['science','it_digital','engineering','analytics','rockets_spacecraft'],
      skill:['math','programming','data','systems_thinking'],
      goal:['competition','explore','project'],
      format:['online','onsite_relocate','any'],
      time:['now','half_year','next_year']
    }
  },
  {
    id:7,title:'Чемпионат «Молодые профессионалы Роскосмоса»',
    type:'competition',typeLabel:'Чемпионат',
    description:'Корпоративный чемпионат профмастерства: развитие навыков, выявление перспективных специалистов, обмен лучшими практиками.',
    organization:'Госкорпорация «Роскосмос»',format:'Очно на предприятиях',
    actionUrl:'https://keytostart.space',actionText:'Узнать подробнее',
    tags:{
      level:['young_pro','mid_pro','senior_student'],
      interest:['engineering','rockets_spacecraft','satellites','it_digital'],
      skill:['cad','electronics','programming','systems_thinking'],
      goal:['competition','job','explore'],
      format:['onsite_relocate','onsite_local','any'],
      time:['now','half_year']
    }
  },
  {
    id:8,title:'Производственная практика в РКК «Энергия»',
    type:'internship',typeLabel:'Практика',
    description:'Практика на ведущем предприятии пилотируемой космонавтики: корабли «Союз», Российская орбитальная станция, реальные проекты.',
    organization:'РКК «Энергия» (Королёв)',format:'Очно (Королёв, МО)',
    actionUrl:'https://www.energia.ru/ru/career/career.html',actionText:'Подать заявку',
    tags:{
      level:['senior_student'],
      interest:['rockets_spacecraft','engineering','satellites'],
      skill:['cad','math','electronics','systems_thinking'],
      goal:['internship','explore','job'],
      format:['onsite_relocate','any'],
      time:['half_year','next_year']
    }
  },
  {
    id:9,title:'Стажировка в РКЦ «Прогресс»',
    type:'internship',typeLabel:'Стажировка',
    description:'Стажировка у крупнейшего производителя ракет-носителей «Союз»: конструкторская документация, производство, испытания.',
    organization:'РКЦ «Прогресс» (Самара)',format:'Очно (Самара)',
    actionUrl:'https://www.samspace.ru/about/vacancies/',actionText:'Смотреть вакансии',
    tags:{
      level:['senior_student','young_pro'],
      interest:['rockets_spacecraft','engineering'],
      skill:['cad','math','systems_thinking','electronics'],
      goal:['internship','job'],
      format:['onsite_relocate','any'],
      time:['now','half_year']
    }
  },
  {
    id:10,title:'Стажировка в АО «Российские космические системы»',
    type:'internship',typeLabel:'Стажировка',
    description:'Навигационные технологии, системы связи, ДЗЗ, геоинформационные сервисы, обработка спутниковых данных. IT и аналитика.',
    organization:'АО «РКС» (Москва)',format:'Очно / гибрид (Москва)',
    actionUrl:'https://www.spacecorp.ru/career/',actionText:'Подать заявку',
    tags:{
      level:['senior_student','young_pro'],
      interest:['it_digital','analytics','geo_navigation','satellites'],
      skill:['programming','data','math','systems_thinking'],
      goal:['internship','job'],
      format:['onsite_relocate','online','any'],
      time:['now','half_year']
    }
  },
  {
    id:11,title:'Практика на космодроме (АО «ЦЭНКИ»)',
    type:'internship',typeLabel:'Практика',
    description:'Практика на космодромах Байконур, Восточный, Плесецк. Подготовка пусковых кампаний, эксплуатация космодромной инфраструктуры.',
    organization:'АО «ЦЭНКИ»',format:'Очно (Байконур / Восточный)',
    actionUrl:'https://www.tsenki.com/career/',actionText:'Подать заявку',
    tags:{
      level:['senior_student'],
      interest:['rockets_spacecraft','engineering'],
      skill:['electronics','cad','systems_thinking','math'],
      goal:['internship','explore'],
      format:['onsite_relocate','any'],
      time:['half_year','next_year']
    }
  },
  {
    id:12,title:'Стажировка в ИСС им. Решетнёва',
    type:'internship',typeLabel:'Стажировка',
    description:'Крупнейший разработчик спутников: спутники связи, ГЛОНАСС, перспективные орбитальные платформы.',
    organization:'АО «ИСС им. Решетнёва» (Железногорск)',format:'Очно (Железногорск)',
    actionUrl:'https://www.iss-reshetnev.ru/career',actionText:'Смотреть вакансии',
    tags:{
      level:['senior_student','young_pro'],
      interest:['satellites','engineering','it_digital'],
      skill:['electronics','programming','cad','math'],
      goal:['internship','job'],
      format:['onsite_relocate','any'],
      time:['now','half_year']
    }
  },
  {
    id:13,title:'Стажировка в НПО Лавочкина',
    type:'internship',typeLabel:'Стажировка',
    description:'Автоматические космические аппараты: межпланетные станции, лунные программы, астрофизические обсерватории.',
    organization:'АО «НПО Лавочкина» (Химки)',format:'Очно (Химки, МО)',
    actionUrl:'https://www.laspace.ru/career/',actionText:'Подать заявку',
    tags:{
      level:['senior_student','young_pro'],
      interest:['science','rockets_spacecraft','satellites'],
      skill:['programming','math','systems_thinking','cad'],
      goal:['internship','job','project'],
      format:['onsite_relocate','any'],
      time:['now','half_year']
    }
  },
  {
    id:14,title:'Стажировка в проектном офисе Роскосмоса',
    type:'internship',typeLabel:'Стажировка',
    description:'Координация крупных программ, аналитика, управление проектами, цифровая трансформация. От 1 до 6 месяцев.',
    organization:'Госкорпорация «Роскосмос» (Москва)',format:'Очно (Москва)',
    actionUrl:'https://www.roscosmos.ru/careers/',actionText:'Подать заявку',
    tags:{
      level:['senior_student','young_pro'],
      interest:['management','analytics','it_digital'],
      skill:['communication','leadership','data','systems_thinking'],
      goal:['internship','job'],
      format:['onsite_relocate','onsite_local','any'],
      time:['now','half_year']
    }
  },
  {
    id:15,title:'Целевое обучение — МГТУ им. Баумана',
    type:'education',typeLabel:'Целевое обучение',
    description:'Ракетостроение и космическая техника. Оплата обучения, стипендия, гарантированное место практики и трудоустройство.',
    organization:'МГТУ им. Баумана / предприятия Роскосмоса',format:'Очно (Москва)',
    actionUrl:'https://bmstu.ru/entrant/target-training',actionText:'Условия приёма',
    tags:{
      level:['school','junior_student'],
      interest:['rockets_spacecraft','engineering','satellites'],
      skill:['math','cad','electronics','systems_thinking'],
      goal:['target_education','explore'],
      format:['onsite_relocate','any'],
      time:['half_year','next_year','exploring']
    }
  },
  {
    id:16,title:'Целевое обучение — МАИ',
    type:'education',typeLabel:'Целевое обучение',
    description:'Аэрокосмические специальности: спутниковые системы, авиастроение, двигатели. Поддержка работодателя и трудоустройство.',
    organization:'МАИ / предприятия Роскосмоса',format:'Очно (Москва)',
    actionUrl:'https://mai.ru/entrant/target/',actionText:'Условия приёма',
    tags:{
      level:['school','junior_student'],
      interest:['rockets_spacecraft','satellites','engineering','it_digital'],
      skill:['math','programming','electronics','cad'],
      goal:['target_education','explore'],
      format:['onsite_relocate','any'],
      time:['half_year','next_year','exploring']
    }
  },
  {
    id:17,title:'Целевое обучение — Самарский университет',
    type:'education',typeLabel:'Целевое обучение',
    description:'Ракетостроение и двигателестроение. Практика на РКЦ «Прогресс» и предприятиях отрасли.',
    organization:'Самарский университет / РКЦ «Прогресс»',format:'Очно (Самара)',
    actionUrl:'https://ssau.ru/entrant',actionText:'Условия приёма',
    tags:{
      level:['school','junior_student'],
      interest:['rockets_spacecraft','engineering'],
      skill:['math','cad','systems_thinking'],
      goal:['target_education','explore'],
      format:['onsite_relocate','any'],
      time:['half_year','next_year','exploring']
    }
  },
  {
    id:18,title:'Целевое обучение — СибГУ им. Решетнёва',
    type:'education',typeLabel:'Целевое обучение',
    description:'Космические специальности. Практика и трудоустройство в ИСС им. Решетнёва — крупнейшем спутникостроительном предприятии.',
    organization:'СибГУ им. Решетнёва / ИСС',format:'Очно (Красноярск)',
    actionUrl:'https://www.sibsau.ru/entrant/',actionText:'Условия приёма',
    tags:{
      level:['school','junior_student'],
      interest:['satellites','engineering','it_digital'],
      skill:['math','electronics','programming','cad'],
      goal:['target_education','explore'],
      format:['onsite_relocate','any'],
      time:['half_year','next_year','exploring']
    }
  },
  {
    id:19,title:'Вакансии Роскосмоса — единый портал',
    type:'job',typeLabel:'Вакансии',
    description:'Единый портал карьерных возможностей: инженерные, IT, управленческие, научные и производственные позиции на предприятиях отрасли.',
    organization:'Госкорпорация «Роскосмос»',format:'По всей России',
    actionUrl:'https://www.roscosmos.ru/careers/',actionText:'Смотреть вакансии',
    tags:{
      level:['young_pro','mid_pro'],
      interest:['rockets_spacecraft','satellites','it_digital','science','analytics','engineering','management','geo_navigation'],
      skill:['programming','math','cad','data','communication','leadership','electronics','systems_thinking'],
      goal:['job'],
      format:['onsite_relocate','onsite_local','online','any'],
      time:['now','half_year']
    }
  },
  {
    id:20,title:'IT-вакансии — цифровая трансформация',
    type:'job',typeLabel:'Вакансия',
    description:'Разработка ПО, Data Science, DevOps, ИИ, кибербезопасность, цифровые двойники, большие данные. Работа над космическими системами.',
    organization:'РКС / ЦНИИмаш / ЦЭНКИ',format:'Москва / гибрид',
    actionUrl:'https://www.spacecorp.ru/career/',actionText:'Смотреть IT-вакансии',
    tags:{
      level:['young_pro','mid_pro'],
      interest:['it_digital','analytics','geo_navigation'],
      skill:['programming','data','math','systems_thinking'],
      goal:['job'],
      format:['onsite_relocate','online','any'],
      time:['now','half_year']
    }
  },
  {
    id:21,title:'Инженерные вакансии — РКК «Энергия»',
    type:'job',typeLabel:'Вакансия',
    description:'Инженер-конструктор, инженер по системам управления, инженер по испытаниям. Пилотируемые корабли и орбитальная станция.',
    organization:'РКК «Энергия» (Королёв)',format:'Очно (Королёв, МО)',
    actionUrl:'https://www.energia.ru/ru/career/career.html',actionText:'Откликнуться',
    tags:{
      level:['young_pro','mid_pro'],
      interest:['rockets_spacecraft','engineering','satellites'],
      skill:['cad','math','electronics','systems_thinking'],
      goal:['job','internship'],
      format:['onsite_relocate','any'],
      time:['now','half_year']
    }
  },
  {
    id:22,title:'Вакансии НПО Энергомаш — ракетные двигатели',
    type:'job',typeLabel:'Вакансия',
    description:'Разработка жидкостных ракетных двигателей, перспективных установок, работа на испытательных комплексах.',
    organization:'АО «НПО Энергомаш» (Химки)',format:'Очно (Химки, МО)',
    actionUrl:'https://engine.space/career/',actionText:'Откликнуться',
    tags:{
      level:['young_pro','mid_pro'],
      interest:['rockets_spacecraft','engineering'],
      skill:['cad','math','electronics','systems_thinking'],
      goal:['job'],
      format:['onsite_relocate','any'],
      time:['now','half_year']
    }
  },
  {
    id:23,title:'Космические классы Роскосмоса',
    type:'project',typeLabel:'Профориентация',
    description:'Ранняя профориентация школьников: космонавтика, робототехника, программирование, спутниковые технологии, инженерное творчество.',
    organization:'Госкорпорация «Роскосмос»',format:'Очно (по всей России)',
    actionUrl:'https://keytostart.space',actionText:'Найти свой класс',
    tags:{
      level:['school'],
      interest:['rockets_spacecraft','satellites','it_digital','science','engineering'],
      skill:['programming','electronics','math','systems_thinking'],
      goal:['explore','event','project'],
      format:['onsite_local','any'],
      time:['now','half_year','next_year','exploring']
    }
  },
  {
    id:24,title:'Молодёжные проектные команды Роскосмоса',
    type:'project',typeLabel:'Проект',
    description:'Работа над задачами реальных предприятий, взаимодействие с экспертами, возможность предложить решение для внедрения.',
    organization:'Госкорпорация «Роскосмос»',format:'Очно + онлайн',
    actionUrl:'https://keytostart.space',actionText:'Присоединиться',
    tags:{
      level:['junior_student','senior_student','young_pro'],
      interest:['rockets_spacecraft','satellites','it_digital','engineering','management','analytics','science','geo_navigation'],
      skill:['programming','cad','data','leadership','systems_thinking','communication'],
      goal:['project','explore','competition'],
      format:['online','onsite_relocate','any'],
      time:['now','half_year','next_year','exploring']
    }
  },
  {
    id:25,title:'Портал «Ключ на старт» — все возможности',
    type:'education',typeLabel:'Портал',
    description:'Единый молодёжный портал Роскосмоса: все мероприятия, стажировки, конкурсы, форумы и проекты в одном месте.',
    organization:'Госкорпорация «Роскосмос»',format:'Онлайн',
    actionUrl:'https://keytostart.space',actionText:'Перейти на портал',
    tags:{
      level:['school','junior_student','senior_student','young_pro','mid_pro'],
      interest:['rockets_spacecraft','satellites','it_digital','science','analytics','engineering','management','geo_navigation'],
      skill:['programming','math','cad','data','communication','leadership','electronics','systems_thinking'],
      goal:['explore','event','competition','internship','project','target_education','job'],
      format:['online','any'],
      time:['now','half_year','next_year','exploring']
    }
  }
];

// ══════════════════════════════════════════════════════
//  PROFESSIONS MAP
// ══════════════════════════════════════════════════════
const PROF_MAP={
  'rockets_spacecraft+programming':['Разработчик бортового ПО','Инженер по системам управления'],
  'rockets_spacecraft+math':['Баллистик','Инженер по динамике полёта'],
  'rockets_spacecraft+cad':['Инженер-конструктор РН','Инженер-проектировщик КА'],
  'rockets_spacecraft+electronics':['Инженер бортовых систем','Специалист по телеметрии'],
  'rockets_spacecraft+systems_thinking':['Инженер по надёжности','Инженер по компоновке КА'],
  'satellites+programming':['Разработчик ПО спутниковых систем','Backend-инженер наземных станций'],
  'satellites+electronics':['Инженер спутниковой связи','Разработчик бортовой аппаратуры'],
  'satellites+data':['Аналитик спутниковых данных','Инженер обработки сигналов'],
  'satellites+cad':['Конструктор космических аппаратов','Инженер по компоновке КА'],
  'it_digital+programming':['Fullstack-разработчик','Инженер-программист','DevOps-инженер'],
  'it_digital+data':['Data Engineer космических данных','ML-инженер'],
  'it_digital+systems_thinking':['Системный архитектор','Специалист по кибербезопасности'],
  'science+math':['Учёный-баллистик','Астрофизик-исследователь'],
  'science+data':['Научный аналитик','Специалист по космическим экспериментам'],
  'science+systems_thinking':['Исследователь космических систем','Инженер-исследователь'],
  'analytics+data':['Data Scientist','Аналитик данных ДЗЗ'],
  'analytics+programming':['ML-инженер','Аналитик больших данных'],
  'analytics+math':['Аналитик эффективности миссий','Специалист по ИИ'],
  'engineering+cad':['Инженер-конструктор','Инженер-технолог'],
  'engineering+electronics':['Электромонтажник космической техники','Специалист по испытаниям'],
  'engineering+math':['Инженер-расчётчик','Инженер по прочности'],
  'engineering+systems_thinking':['Инженер по надёжности','Специалист по контролю качества'],
  'management+leadership':['Руководитель проекта','Менеджер космической программы'],
  'management+communication':['Координатор проектного офиса','Системный аналитик'],
  'management+systems_thinking':['Продуктовый менеджер','Менеджер по цифровой трансформации'],
  'geo_navigation+data':['Специалист по ДЗЗ','Геоинформатик'],
  'geo_navigation+programming':['Разработчик ГИС','Инженер навигационных систем ГЛОНАСС'],
  'geo_navigation+math':['Геодезист-навигатор','Специалист по ГЛОНАСС']
};

// ══════════════════════════════════════════════════════
//  LABELS
// ══════════════════════════════════════════════════════
const DIR_LABELS={
  rockets_spacecraft:'Ракетостроение и космические аппараты',
  satellites:'Спутниковые системы и связь',
  it_digital:'IT и цифровая трансформация',
  science:'Научные космические исследования',
  analytics:'Аналитика данных и ИИ',
  engineering:'Производство и инженерия',
  management:'Управление проектами',
  geo_navigation:'Навигация ГЛОНАСС и ДЗЗ'
};
const DIR_ICONS={
  rockets_spacecraft:'🚀',satellites:'🛰️',it_digital:'💻',
  science:'🔬',analytics:'📊',engineering:'🏗️',
  management:'📋',geo_navigation:'🌍'
};
const LVL_LABELS={
  school:'Школьник / абитуриент',junior_student:'Студент младших курсов',
  senior_student:'Студент старших курсов',young_pro:'Молодой специалист',
  mid_pro:'Специалист с опытом'
};
const SKILL_LABELS={
  programming:'Программирование',math:'Математика',
  cad:'CAD/Конструирование',data:'Работа с данными',
  communication:'Коммуникация',leadership:'Лидерство',
  electronics:'Электроника',systems_thinking:'Системное мышление'
};

// ══════════════════════════════════════════════════════
//  CAREER ROADMAPS
// ══════════════════════════════════════════════════════
const CAREER_ROADMAPS={
  rockets_spacecraft:{
    title:'Будущий конструктор космической техники',
    steps:[
      {label:'Космический класс / профильная школа',time:'Старт'},
      {label:'МАИ / МГТУ им. Баумана / Самарский ун-т',time:'Обучение'},
      {label:'Целевое обучение от предприятия',time:'Финансирование'},
      {label:'Практика в РКК «Энергия» / РКЦ «Прогресс»',time:'Опыт'},
      {label:'Молодой инженер-конструктор',time:'Карьера'},
      {label:'Ведущий инженер → Главный конструктор',time:'Рост'}
    ]
  },
  it_digital:{
    title:'Специалист по ИИ и цифровым технологиям',
    steps:[
      {label:'Олимпиады по программированию',time:'Старт'},
      {label:'Хакатон «Кедр» / кейс-чемпионат',time:'Опыт'},
      {label:'Обучение по направлению IT',time:'Обучение'},
      {label:'Стажировка в РКС / ЦНИИмаш',time:'Стажировка'},
      {label:'ML-инженер / разработчик ПО',time:'Карьера'},
      {label:'Руководитель цифрового продукта',time:'Рост'}
    ]
  },
  management:{
    title:'Руководитель проектов',
    steps:[
      {label:'Студенческое самоуправление / лидерство',time:'Старт'},
      {label:'Форум «Команда будущего»',time:'Нетворкинг'},
      {label:'Кейс-чемпионат «Орбита поколений»',time:'Опыт'},
      {label:'Проектный офис предприятия',time:'Стажировка'},
      {label:'Менеджер проекта',time:'Карьера'},
      {label:'Руководитель программы → Директор направления',time:'Рост'}
    ]
  },
  science:{
    title:'Исследователь космоса',
    steps:[
      {label:'Космический класс / научные конференции',time:'Старт'},
      {label:'Университет (физика, астрономия)',time:'Обучение'},
      {label:'Научно-исследовательская работа',time:'Наука'},
      {label:'НПО Лавочкина / ЦНИИмаш / ИМБП РАН',time:'Стажировка'},
      {label:'Научный сотрудник',time:'Карьера'},
      {label:'Руководитель научного проекта',time:'Рост'}
    ]
  },
  engineering:{
    title:'Специалист производственного контура',
    steps:[
      {label:'Колледж / технический вуз',time:'Обучение'},
      {label:'Практика на предприятии отрасли',time:'Опыт'},
      {label:'Чемпионат «Молодые профессионалы Роскосмоса»',time:'Мастерство'},
      {label:'Инженер-технолог / мастер участка',time:'Карьера'},
      {label:'Начальник участка',time:'Рост'},
      {label:'Руководитель производственного направления',time:'Перспектива'}
    ]
  },
  analytics:{
    title:'Аналитик данных и ИИ в космосе',
    steps:[
      {label:'Обучение Data Science / аналитике',time:'Обучение'},
      {label:'ИИ-хакатон «Кедр» / проекты по ДЗЗ',time:'Опыт'},
      {label:'Стажировка в РКС / ЦНИИмаш',time:'Стажировка'},
      {label:'Data Scientist / аналитик ДЗЗ',time:'Карьера'},
      {label:'ML-инженер',time:'Рост'},
      {label:'Руководитель направления аналитики',time:'Перспектива'}
    ]
  },
  satellites:{
    title:'Инженер спутниковых систем',
    steps:[
      {label:'Профильное обучение (МАИ / СибГУ)',time:'Обучение'},
      {label:'Целевое обучение от ИСС им. Решетнёва',time:'Финансирование'},
      {label:'Практика / стажировка в ИСС',time:'Опыт'},
      {label:'Инженер спутниковых систем',time:'Карьера'},
      {label:'Ведущий инженер / конструктор КА',time:'Рост'},
      {label:'Главный конструктор проекта',time:'Перспектива'}
    ]
  },
  geo_navigation:{
    title:'Специалист по навигации и ДЗЗ',
    steps:[
      {label:'Обучение ГИС / геоинформатика',time:'Обучение'},
      {label:'Проекты по ДЗЗ / хакатоны',time:'Опыт'},
      {label:'Стажировка в РКС',time:'Стажировка'},
      {label:'Специалист по ДЗЗ / инженер ГЛОНАСС',time:'Карьера'},
      {label:'Ведущий специалист',time:'Рост'},
      {label:'Руководитель геоинформационного направления',time:'Перспектива'}
    ]
  }
};

// ══════════════════════════════════════════════════════
//  SCORING
// ══════════════════════════════════════════════════════
const W={goal:.30,interest:.25,level:.20,skill:.15,format:.05,time:.05};

// ══════════════════════════════════════════════════════
//  STATE & DOM
// ══════════════════════════════════════════════════════
const state={cur:0,ans:{}};
const $=id=>document.getElementById(id);

const screens={
  landing:$('screen-landing'),quiz:$('screen-quiz'),
  loading:$('screen-loading'),results:$('screen-results')
};

function showScreen(n){
  Object.values(screens).forEach(s=>s.classList.remove('active'));
  screens[n].classList.add('active');
}

// ══════════════════════════════════════════════════════
//  QUIZ
// ══════════════════════════════════════════════════════
function renderQ(idx){
  const q=QUESTIONS[idx],body=$('quiz-body'),sel=state.ans[q.id]||[];

  let h=`<div class="quiz-question">
    <h2>${q.title}</h2><p>${q.subtitle}</p></div>`;

  if(q.multi) h+=`<div class="multi-hint">💡 Можно выбрать до ${q.maxSelect}</div>`;

  h+='<div class="quiz-options">';
  q.options.forEach(o=>{
    const s=sel.includes(o.tag)?'selected':'';
    h+=`<div class="quiz-option ${s}" data-tag="${o.tag}">
      <span class="opt-emoji">${o.emoji}</span>
      <span class="opt-text">${o.text}</span></div>`;
  });
  h+='</div>';

  body.innerHTML=h;

  // Progress
  $('progress-bar').style.width=`${((idx+1)/QUESTIONS.length)*100}%`;
  $('progress-text').textContent=`${idx+1}/${QUESTIONS.length}`;

  // Fixed next button
  const btn=$('btn-next-fixed');
  btn.textContent=idx===QUESTIONS.length-1?'Получить маршрут 🚀':'Далее →';
  btn.disabled=!sel.length;

  // Bind clicks
  body.querySelectorAll('.quiz-option').forEach(el=>{
    el.addEventListener('click',()=>clickOpt(el,q));
  });

  // Scroll to top
  $('quiz-scroll').scrollTop=0;
}

function clickOpt(el,q){
  const tag=el.dataset.tag;
  if(q.multi){
    if(!state.ans[q.id]) state.ans[q.id]=[];
    const a=state.ans[q.id],i=a.indexOf(tag);
    if(i>-1){a.splice(i,1);el.classList.remove('selected')}
    else{
      if(a.length>=q.maxSelect) return;
      if(tag!=='none'&&a.includes('none')){
        a.splice(a.indexOf('none'),1);
        document.querySelector('.quiz-option[data-tag="none"]')?.classList.remove('selected');
      }
      if(tag==='none'){
        a.length=0;
        document.querySelectorAll('.quiz-option.selected').forEach(o=>o.classList.remove('selected'));
      }
      a.push(tag);el.classList.add('selected');
    }
  } else {
    state.ans[q.id]=[tag];
    document.querySelectorAll('.quiz-option').forEach(o=>o.classList.remove('selected'));
    el.classList.add('selected');
  }
  $('btn-next-fixed').disabled=!(state.ans[q.id]||[]).length;
}

function nextQ(){
  if(state.cur<QUESTIONS.length-1){state.cur++;renderQ(state.cur)}
  else startLoad();
}

// ══════════════════════════════════════════════════════
//  LOADING
// ══════════════════════════════════════════════════════
function startLoad(){
  showScreen('loading');
  const bar=$('loading-bar'),stg=document.querySelectorAll('.load-stage');
  bar.style.width='0%';
  stg.forEach(s=>{s.classList.remove('active','done')});
  const orig=['🔭 Анализируем твои интересы...','📡 Ищем подходящие возможности...','🗺️ Строим персональный маршрут...'];
  stg.forEach((s,i)=>{s.textContent=orig[i]});
  stg[0].classList.add('active');
  let p=0;
  const iv=setInterval(()=>{
    p+=2;bar.style.width=p+'%';
    if(p>=33){stg[0].classList.remove('active');stg[0].classList.add('done');stg[0].textContent='✅'+orig[0].slice(1);stg[1].classList.add('active')}
    if(p>=66){stg[1].classList.remove('active');stg[1].classList.add('done');stg[1].textContent='✅'+orig[1].slice(1);stg[2].classList.add('active')}
    if(p>=100){clearInterval(iv);stg[2].classList.remove('active');stg[2].classList.add('done');stg[2].textContent='✅'+orig[2].slice(1);setTimeout(compute,400)}
  },50);
}

// ══════════════════════════════════════════════════════
//  SCORING & COMPUTE
// ══════════════════════════════════════════════════════
function score(opp,ans){
  let t=0;
  for(const d of Object.keys(W)){
    const u=ans[d]||[],o=opp.tags[d]||[];
    if(!u.length||!o.length) continue;
    let m=0;u.forEach(x=>{if(o.includes(x))m++});
    t+=(m/u.length)*W[d];
  }
  return t;
}

function compute(){
  const a=state.ans;
  const scored=OPPORTUNITIES.map(o=>({...o,score:score(o,a)})).sort((x,y)=>y.score-x.score);
  const recs=scored.filter(s=>s.score>.12).slice(0,8);
  const interests=a.interest||[];
  const pi=interests[0]||'it_digital';
  const skills=a.skill||[];
  const profs=new Set();
  for(const i of interests)for(const s of skills){
    const k=`${i}+${s}`;if(PROF_MAP[k])PROF_MAP[k].forEach(p=>profs.add(p));
  }
  if(!profs.size)for(const i of interests)for(const k of Object.keys(PROF_MAP)){
    if(k.startsWith(i+'+')){PROF_MAP[k].forEach(p=>profs.add(p));break}
  }
  renderProfile(pi,a.level?.[0],interests,skills,[...profs].slice(0,6));
  renderRecs(recs);
  renderRoadmap(recs,pi);
  showScreen('results');
  $('results-scroll').scrollTop=0;
}

// ══════════════════════════════════════════════════════
//  RENDER RESULTS
// ══════════════════════════════════════════════════════
function renderProfile(dir,lvl,interests,skills,profs){
  $('profile-icon').textContent=DIR_ICONS[dir]||'🛰️';
  $('profile-direction').textContent=DIR_LABELS[dir]||'Космическая отрасль';
  $('profile-level').textContent=LVL_LABELS[lvl]||'';
  const tags=[...interests.map(i=>DIR_LABELS[i]).filter(Boolean),
    ...skills.map(s=>SKILL_LABELS[s]).filter(Boolean)];
  $('profile-tags').innerHTML=tags.map(t=>`<span class="profile-tag">${t}</span>`).join('');
  $('professions-list').innerHTML=profs.length
    ?profs.map(p=>`<li>${p}</li>`).join('')
    :'<li>Пройдите опрос подробнее для подбора профессий</li>';
}

function renderRecs(recs){
  const c=$('recommendations-list');
  if(!recs.length){c.innerHTML='<p style="text-align:center;color:var(--t2);padding:40px">Не найдено подходящих возможностей. Попробуйте изменить ответы.</p>';return}
  c.innerHTML=recs.map((r,i)=>{
    const mp=Math.round(r.score*100);
    return`<div class="rec-card" style="animation:fadeIn ${.2+i*.07}s ease">
      <div class="rec-card-header">
        <span class="rec-card-type type-${r.type}">${r.typeLabel}</span>
        <span class="rec-match">${mp}% совпадение</span>
      </div>
      <h4>${r.title}</h4>
      <p>${r.description}</p>
      <div class="rec-card-meta">
        <span class="rec-meta-item">🏢 ${r.organization}</span>
        <span class="rec-meta-item">📍 ${r.format}</span>
      </div>
      <button class="btn-action" onclick="doAction('${r.actionUrl}','${r.title.replace(/'/g,"\\'")}')">${r.actionText} →</button>
    </div>`;
  }).join('');
}

function renderRoadmap(recs,primaryInterest){
  const c=$('roadmap');
  const rm=CAREER_ROADMAPS[primaryInterest]||CAREER_ROADMAPS['it_digital'];

  let html=`<h3 style="margin-bottom:18px">🗺️ ${rm.title}</h3>`;
  rm.steps.forEach(step=>{
    html+=`<div class="roadmap-stage">
      <div class="roadmap-stage-time">${step.time}</div>
      <div class="roadmap-items"><div class="roadmap-item">
        <div class="roadmap-item-title">${step.label}</div>
      </div></div></div>`;
  });

  const now=recs.filter(r=>['competition','event'].includes(r.type)).slice(0,2);
  const soon=recs.filter(r=>['internship','education'].includes(r.type)).slice(0,2);
  const fut=recs.filter(r=>['job','project'].includes(r.type)).slice(0,2);
  if(!now.length&&recs.length>0)now.push(recs[0]);
  if(!soon.length&&recs.length>1)soon.push(recs[Math.min(1,recs.length-1)]);
  if(!fut.length&&recs.length>2)fut.push(recs[Math.min(2,recs.length-1)]);

  function items(arr){
    if(!arr.length)return'<div class="roadmap-item"><div class="roadmap-item-title">Исследуй возможности на keytostart.space</div></div>';
    return arr.map(i=>`<div class="roadmap-item">
      <div class="roadmap-item-title">${i.title}</div>
      <div class="roadmap-item-sub">${i.typeLabel} · ${i.organization} · <a href="${i.actionUrl}" target="_blank" rel="noopener" style="color:var(--accent-l);text-decoration:underline">${i.actionText}</a></div>
    </div>`).join('');
  }

  html+=`<h3 style="margin:28px 0 18px">⚡ Твои ближайшие шаги</h3>`;
  html+=`
    <div class="roadmap-stage"><div class="roadmap-stage-time">⚡ Сейчас (0–1 мес.)</div><div class="roadmap-items">${items(now)}</div></div>
    <div class="roadmap-stage"><div class="roadmap-stage-time">📆 Ближайшее будущее (1–6 мес.)</div><div class="roadmap-items">${items(soon)}</div></div>
    <div class="roadmap-stage"><div class="roadmap-stage-time">🚀 Перспектива (6–12+ мес.)</div><div class="roadmap-items">${items(fut)}</div></div>`;

  c.innerHTML=html;
}

// ══════════════════════════════════════════════════════
//  ACTIONS & UTILS
// ══════════════════════════════════════════════════════
window.doAction=function(url,title){
  showToast('Переход: '+title);
  if(url&&url!=='#')setTimeout(()=>window.open(url,'_blank'),500);
};

function showToast(msg){
  const t=$('toast');t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2500);
}

// ══════════════════════════════════════════════════════
//  TABS
// ══════════════════════════════════════════════════════
document.querySelectorAll('.tab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-'+tab.dataset.tab).classList.add('active');
    $('results-scroll').scrollTop=0;
  });
});

// ══════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════
$('btn-start').addEventListener('click',()=>{
  state.cur=0;state.ans={};renderQ(0);showScreen('quiz');
});

$('btn-quiz-back').addEventListener('click',()=>{
  if(state.cur>0){state.cur--;renderQ(state.cur)}
  else showScreen('landing');
});

$('btn-next-fixed').addEventListener('click',nextQ);

$('btn-restart').addEventListener('click',()=>{
  state.cur=0;state.ans={};showScreen('landing');
});

$('btn-share').addEventListener('click',()=>{
  const dir=$('profile-direction').textContent;
  const txt=`🚀 Мой космический маршрут: ${dir}! Найди свой путь в Роскосмосе → keytostart.space`;
  if(navigator.share){
    navigator.share({title:'Космический Навигатор — Роскосмос',text:txt,url:'https://keytostart.space'}).catch(()=>{});
  } else if(navigator.clipboard){
    navigator.clipboard.writeText(txt)
      .then(()=>showToast('✅ Скопировано в буфер обмена!'))
      .catch(()=>showToast('Поделись ссылкой: keytostart.space'));
  } else showToast('Поделись ссылкой: keytostart.space');
});
