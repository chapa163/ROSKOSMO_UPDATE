if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});

(function(){
  const c=document.getElementById('stars-canvas'),x=c.getContext('2d');let s=[];
  function rz(){c.width=innerWidth;c.height=innerHeight}
  function cr(){s=[];for(let i=0,n=Math.floor(c.width*c.height/3500);i<n;i++)s.push({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*1.4+.3,a:Math.random(),d:(Math.random()-.5)*.01})}
  function dr(){x.clearRect(0,0,c.width,c.height);s.forEach(p=>{p.a+=p.d;if(p.a>1||p.a<.1)p.d*=-1;x.beginPath();x.arc(p.x,p.y,p.r,0,Math.PI*2);x.fillStyle=`rgba(200,210,255,${p.a})`;x.fill()});requestAnimationFrame(dr)}
  rz();cr();dr();addEventListener('resize',()=>{rz();cr()});
})();

const QS=[
  {id:'level',t:'Кто ты сейчас?',s:'Выбери свой текущий статус',m:false,o:[
    {e:'🎓',t:'Школьник / абитуриент',v:'school'},{e:'📚',t:'Студент 1–2 курса (вуз или СПО)',v:'junior_student'},{e:'📖',t:'Студент 3–4 курса / магистрант',v:'senior_student'},{e:'🎯',t:'Выпускник / молодой специалист',v:'young_pro'},{e:'💼',t:'Специалист с опытом (2–5 лет)',v:'mid_pro'}]},
  {id:'interest',t:'Что тебя вдохновляет?',s:'Выбери до 3-х направлений',m:true,mx:3,o:[
    {e:'🚀',t:'Ракеты и космические аппараты',v:'rockets'},{e:'🛰️',t:'Спутники и связь',v:'satellites'},{e:'💻',t:'IT и цифровые технологии',v:'it'},{e:'🔬',t:'Наука и исследования',v:'science'},{e:'📊',t:'Аналитика данных и ИИ',v:'analytics'},{e:'🏗️',t:'Производство и инженерия',v:'engineering'},{e:'📋',t:'Управление проектами',v:'management'},{e:'🌍',t:'Навигация и ДЗЗ',v:'geo'}]},
  {id:'skill',t:'Какие навыки тебе ближе?',s:'Выбери 2–3 сильных стороны',m:true,mx:3,o:[
    {e:'⌨️',t:'Программирование',v:'prog'},{e:'📐',t:'Математика и моделирование',v:'math'},{e:'🖥️',t:'Конструирование / CAD',v:'cad'},{e:'📈',t:'Работа с данными',v:'data'},{e:'🗣️',t:'Коммуникация',v:'comm'},{e:'👥',t:'Лидерство и командная работа',v:'lead'},{e:'🔌',t:'Электроника',v:'elec'},{e:'🧩',t:'Системное мышление',v:'sys'}]},
  {id:'goal',t:'Что ты ищешь прямо сейчас?',s:'Что для тебя актуальнее всего?',m:false,o:[
    {e:'🏆',t:'Хакатон / конкурс',v:'comp'},{e:'📝',t:'Стажировка или практика',v:'intern'},{e:'🎓',t:'Целевое обучение',v:'edu'},{e:'💼',t:'Работа в отрасли',v:'job'},{e:'🤝',t:'Присоединиться к проекту',v:'proj'},{e:'📅',t:'Форум или мероприятие',v:'event'},{e:'🔍',t:'Просто узнать, что есть',v:'explore'}]},
  {id:'format',t:'Какой формат подходит?',s:'Как удобнее участвовать?',m:false,o:[
    {e:'🌐',t:'Онлайн / удалённо',v:'online'},{e:'🏢',t:'Очно, готов к переезду',v:'onsite'},{e:'📍',t:'Очно, в моём городе',v:'local'},{e:'🔄',t:'Любой формат',v:'any'}]},
  {id:'time',t:'Когда готов(а) начать?',s:'Выбери временные рамки',m:false,o:[
    {e:'⚡',t:'Сейчас / в ближайший месяц',v:'now'},{e:'📆',t:'В течение полугода',v:'half'},{e:'🗓️',t:'В следующем учебном году',v:'next'},{e:'👀',t:'Пока присматриваюсь',v:'later'}]},
  {id:'exp',t:'Есть ли релевантный опыт?',s:'Можно выбрать несколько',m:true,mx:5,o:[
    {e:'🥇',t:'Олимпиады / конкурсы',v:'olymp'},{e:'🛠️',t:'Свои проекты',v:'pet'},{e:'🏢',t:'Проходил(а) стажировку',v:'stag'},{e:'📘',t:'Профильная специальность',v:'prof'},{e:'🌱',t:'Нет опыта, хочу начать',v:'none'}]}
];

const OPS=[
  {id:1,n:'Форум «Команда будущего»',tp:'event',tl:'Форум',d:'Флагманский молодёжный форум Роскосмоса: стратегические сессии, проектная работа, лекции руководителей, встречи с космонавтами.',org:'Роскосмос',fmt:'Очно',url:'https://keytostart.space',btn:'Подать заявку',tg:{level:['senior_student','young_pro','mid_pro'],interest:['rockets','satellites','it','engineering','management','science','analytics','geo'],skill:['lead','comm','sys'],goal:['event','explore','proj'],format:['onsite','any'],time:['now','half','next','later']}},
  {id:2,n:'Космические смены (Артек, Орлёнок, Океан)',tp:'event',tl:'Образовательная программа',d:'Космические смены для школьников 12–17 лет: ракетостроение, спутники, ДЗЗ, робототехника, программирование.',org:'Роскосмос / детские центры',fmt:'Очно (выездные)',url:'https://keytostart.space',btn:'Узнать о сменах',tg:{level:['school'],interest:['rockets','satellites','it','science','engineering','geo'],skill:['prog','elec','math','sys','lead'],goal:['event','explore','proj'],format:['onsite','any'],time:['half','next','later']}},
  {id:3,n:'Поездки на космодромы',tp:'event',tl:'Экскурсия',d:'Поездки на Байконур и Восточный для победителей конкурсов и активных участников молодёжных проектов.',org:'Роскосмос',fmt:'Очно',url:'https://keytostart.space',btn:'Условия участия',tg:{level:['school','junior_student','senior_student','young_pro'],interest:['rockets','engineering','satellites','science'],skill:['lead','sys','comm'],goal:['event','explore'],format:['onsite','any'],time:['half','next','later']}},
  {id:4,n:'Кейс-чемпионат «Орбита поколений»',tp:'competition',tl:'Кейс-чемпионат',d:'Командное соревнование: школьники, студенты и сотрудники решают реальные кейсы предприятий Роскосмоса.',org:'Роскосмос',fmt:'Онлайн + очный финал',url:'https://keytostart.space',btn:'Зарегистрироваться',tg:{level:['school','junior_student','senior_student','young_pro'],interest:['management','it','engineering','analytics','rockets','satellites'],skill:['lead','comm','sys','data','prog'],goal:['comp','explore','proj'],format:['online','onsite','any'],time:['now','half']}},
  {id:5,n:'Инженерный хакатон «Кедр»',tp:'competition',tl:'Хакатон',d:'Командный хакатон: инженерные и цифровые задачи, моделирование спутниковых систем, технологии ИИ.',org:'Роскосмос',fmt:'Онлайн + финал очно',url:'https://keytostart.space',btn:'Зарегистрироваться',tg:{level:['junior_student','senior_student','young_pro','mid_pro'],interest:['it','analytics','satellites','geo','engineering'],skill:['prog','data','math','sys','elec'],goal:['comp','explore','proj'],format:['online','any'],time:['now','half']}},
  {id:6,n:'Конкурс научно-технических работ молодёжи',tp:'competition',tl:'Конкурс',d:'Космические технологии, новые материалы, цифровые решения, ИИ, производственные технологии.',org:'Роскосмос',fmt:'Заочный + очный финал',url:'https://keytostart.space',btn:'Подать работу',tg:{level:['junior_student','senior_student','young_pro'],interest:['science','it','engineering','analytics','rockets'],skill:['math','prog','data','sys'],goal:['comp','explore','proj'],format:['online','onsite','any'],time:['now','half','next']}},
  {id:7,n:'Чемпионат «Молодые профессионалы Роскосмоса»',tp:'competition',tl:'Чемпионат',d:'Корпоративный чемпионат профмастерства: развитие навыков, выявление перспективных специалистов.',org:'Роскосмос',fmt:'Очно',url:'https://keytostart.space',btn:'Узнать подробнее',tg:{level:['young_pro','mid_pro','senior_student'],interest:['engineering','rockets','satellites','it'],skill:['cad','elec','prog','sys'],goal:['comp','job','explore'],format:['onsite','local','any'],time:['now','half']}},
  {id:8,n:'Практика в РКК «Энергия»',tp:'internship',tl:'Практика',d:'Ведущее предприятие пилотируемой космонавтики: корабли «Союз», Российская орбитальная станция.',org:'РКК «Энергия» (Королёв)',fmt:'Очно',url:'https://www.energia.ru/ru/career/career.html',btn:'Подать заявку',tg:{level:['senior_student'],interest:['rockets','engineering','satellites'],skill:['cad','math','elec','sys'],goal:['intern','explore','job'],format:['onsite','any'],time:['half','next']}},
  {id:9,n:'Стажировка в РКЦ «Прогресс»',tp:'internship',tl:'Стажировка',d:'Крупнейший производитель ракет-носителей «Союз»: конструкторская документация, производство, испытания.',org:'РКЦ «Прогресс» (Самара)',fmt:'Очно',url:'https://www.samspace.ru/about/vacancies/',btn:'Смотреть вакансии',tg:{level:['senior_student','young_pro'],interest:['rockets','engineering'],skill:['cad','math','sys','elec'],goal:['intern','job'],format:['onsite','any'],time:['now','half']}},
  {id:10,n:'Стажировка в АО «РКС»',tp:'internship',tl:'Стажировка',d:'Навигационные технологии, системы связи, ДЗЗ, геоинформационные сервисы, обработка спутниковых данных.',org:'АО «РКС» (Москва)',fmt:'Очно / гибрид',url:'https://www.spacecorp.ru/career/',btn:'Подать заявку',tg:{level:['senior_student','young_pro'],interest:['it','analytics','geo','satellites'],skill:['prog','data','math','sys'],goal:['intern','job'],format:['onsite','online','any'],time:['now','half']}},
  {id:11,n:'Практика на космодроме (ЦЭНКИ)',tp:'internship',tl:'Практика',d:'Космодромы Байконур, Восточный, Плесецк. Подготовка пусковых кампаний.',org:'АО «ЦЭНКИ»',fmt:'Очно',url:'https://www.tsenki.com/career/',btn:'Подать заявку',tg:{level:['senior_student'],interest:['rockets','engineering'],skill:['elec','cad','sys','math'],goal:['intern','explore'],format:['onsite','any'],time:['half','next']}},
  {id:12,n:'Стажировка в ИСС им. Решетнёва',tp:'internship',tl:'Стажировка',d:'Крупнейший разработчик спутников: связь, ГЛОНАСС, перспективные платформы.',org:'ИСС (Железногорск)',fmt:'Очно',url:'https://www.iss-reshetnev.ru/career',btn:'Смотреть вакансии',tg:{level:['senior_student','young_pro'],interest:['satellites','engineering','it'],skill:['elec','prog','cad','math'],goal:['intern','job'],format:['onsite','any'],time:['now','half']}},
  {id:13,n:'Стажировка в НПО Лавочкина',tp:'internship',tl:'Стажировка',d:'Автоматические КА: межпланетные станции, лунные программы, обсерватории.',org:'НПО Лавочкина (Химки)',fmt:'Очно',url:'https://www.laspace.ru/career/',btn:'Подать заявку',tg:{level:['senior_student','young_pro'],interest:['science','rockets','satellites'],skill:['prog','math','sys','cad'],goal:['intern','job','proj'],format:['onsite','any'],time:['now','half']}},
  {id:14,n:'Стажировка в проектном офисе Роскосмоса',tp:'internship',tl:'Стажировка',d:'Координация программ, аналитика, управление проектами, цифровая трансформация. 1–6 месяцев.',org:'Роскосмос (Москва)',fmt:'Очно',url:'https://www.roscosmos.ru/careers/',btn:'Подать заявку',tg:{level:['senior_student','young_pro'],interest:['management','analytics','it'],skill:['comm','lead','data','sys'],goal:['intern','job'],format:['onsite','local','any'],time:['now','half']}},
  {id:15,n:'Целевое — МГТУ им. Баумана',tp:'education',tl:'Целевое обучение',d:'Ракетостроение и космическая техника. Оплата, стипендия, гарантированное трудоустройство.',org:'МГТУ / Роскосмос',fmt:'Очно (Москва)',url:'https://bmstu.ru/entrant/target-training',btn:'Условия приёма',tg:{level:['school','junior_student'],interest:['rockets','engineering','satellites'],skill:['math','cad','elec','sys'],goal:['edu','explore'],format:['onsite','any'],time:['half','next','later']}},
  {id:16,n:'Целевое — МАИ',tp:'education',tl:'Целевое обучение',d:'Аэрокосмические специальности: спутниковые системы, авиастроение, двигатели.',org:'МАИ / Роскосмос',fmt:'Очно (Москва)',url:'https://mai.ru/entrant/target/',btn:'Условия приёма',tg:{level:['school','junior_student'],interest:['rockets','satellites','engineering','it'],skill:['math','prog','elec','cad'],goal:['edu','explore'],format:['onsite','any'],time:['half','next','later']}},
  {id:17,n:'Целевое — Самарский университет',tp:'education',tl:'Целевое обучение',d:'Ракетостроение и двигателестроение. Практика на РКЦ «Прогресс».',org:'Самарский ун-т / РКЦ',fmt:'Очно (Самара)',url:'https://ssau.ru/entrant',btn:'Условия приёма',tg:{level:['school','junior_student'],interest:['rockets','engineering'],skill:['math','cad','sys'],goal:['edu','explore'],format:['onsite','any'],time:['half','next','later']}},
  {id:18,n:'Целевое — СибГУ им. Решетнёва',tp:'education',tl:'Целевое обучение',d:'Космические специальности. Практика и трудоустройство в ИСС им. Решетнёва.',org:'СибГУ / ИСС',fmt:'Очно (Красноярск)',url:'https://www.sibsau.ru/entrant/',btn:'Условия приёма',tg:{level:['school','junior_student'],interest:['satellites','engineering','it'],skill:['math','elec','prog','cad'],goal:['edu','explore'],format:['onsite','any'],time:['half','next','later']}},
  {id:19,n:'Вакансии Роскосмоса',tp:'job',tl:'Вакансии',d:'Единый портал: инженерные, IT, управленческие, научные и производственные позиции.',org:'Роскосмос',fmt:'По всей России',url:'https://www.roscosmos.ru/careers/',btn:'Смотреть вакансии',tg:{level:['young_pro','mid_pro'],interest:['rockets','satellites','it','science','analytics','engineering','management','geo'],skill:['prog','math','cad','data','comm','lead','elec','sys'],goal:['job'],format:['onsite','local','online','any'],time:['now','half']}},
  {id:20,n:'IT-вакансии — цифровая трансформация',tp:'job',tl:'Вакансия',d:'Разработка ПО, Data Science, DevOps, ИИ, кибербезопасность, цифровые двойники.',org:'РКС / ЦНИИмаш',fmt:'Москва / гибрид',url:'https://www.spacecorp.ru/career/',btn:'Смотреть IT-вакансии',tg:{level:['young_pro','mid_pro'],interest:['it','analytics','geo'],skill:['prog','data','math','sys'],goal:['job'],format:['onsite','online','any'],time:['now','half']}},
  {id:21,n:'Инженерные вакансии — РКК «Энергия»',tp:'job',tl:'Вакансия',d:'Инженер-конструктор, системы управления, испытания. Пилотируемые корабли и орбитальная станция.',org:'РКК «Энергия»',fmt:'Очно (Королёв)',url:'https://www.energia.ru/ru/career/career.html',btn:'Откликнуться',tg:{level:['young_pro','mid_pro'],interest:['rockets','engineering','satellites'],skill:['cad','math','elec','sys'],goal:['job','intern'],format:['onsite','any'],time:['now','half']}},
  {id:22,n:'Вакансии НПО Энергомаш',tp:'job',tl:'Вакансия',d:'Жидкостные ракетные двигатели, перспективные установки, испытательные комплексы.',org:'НПО Энергомаш (Химки)',fmt:'Очно',url:'https://engine.space/career/',btn:'Откликнуться',tg:{level:['young_pro','mid_pro'],interest:['rockets','engineering'],skill:['cad','math','elec','sys'],goal:['job'],format:['onsite','any'],time:['now','half']}},
  {id:23,n:'Космические классы Роскосмоса',tp:'project',tl:'Профориентация',d:'Ранняя профориентация: космонавтика, робототехника, программирование, спутниковые технологии.',org:'Роскосмос',fmt:'Очно (вся Россия)',url:'https://keytostart.space',btn:'Найти свой класс',tg:{level:['school'],interest:['rockets','satellites','it','science','engineering'],skill:['prog','elec','math','sys'],goal:['explore','event','proj'],format:['local','any'],time:['now','half','next','later']}},
  {id:24,n:'Молодёжные проектные команды',tp:'project',tl:'Проект',d:'Работа над задачами реальных предприятий, взаимодействие с экспертами, решения для внедрения.',org:'Роскосмос',fmt:'Очно + онлайн',url:'https://keytostart.space',btn:'Присоединиться',tg:{level:['junior_student','senior_student','young_pro'],interest:['rockets','satellites','it','engineering','management','analytics','science','geo'],skill:['prog','cad','data','lead','sys','comm'],goal:['proj','explore','comp'],format:['online','onsite','any'],time:['now','half','next','later']}},
  {id:25,n:'Портал «Ключ на старт»',tp:'education',tl:'Портал',d:'Единый молодёжный портал: все мероприятия, стажировки, конкурсы, форумы и проекты.',org:'Роскосмос',fmt:'Онлайн',url:'https://keytostart.space',btn:'Перейти на портал',tg:{level:['school','junior_student','senior_student','young_pro','mid_pro'],interest:['rockets','satellites','it','science','analytics','engineering','management','geo'],skill:['prog','math','cad','data','comm','lead','elec','sys'],goal:['explore','event','comp','intern','proj','edu','job'],format:['online','any'],time:['now','half','next','later']}}
];

const PM={
  'rockets+prog':['Разработчик бортового ПО','Инженер систем управления'],
  'rockets+math':['Баллистик','Инженер динамики полёта'],
  'rockets+cad':['Инженер-конструктор РН','Проектировщик КА'],
  'rockets+elec':['Инженер бортовых систем','Специалист по телеметрии'],
  'rockets+sys':['Инженер по надёжности','Инженер по компоновке КА'],
  'satellites+prog':['Разработчик ПО спутников','Backend-инженер наземных станций'],
  'satellites+elec':['Инженер спутниковой связи','Разработчик бортовой аппаратуры'],
  'satellites+data':['Аналитик спутниковых данных','Инженер обработки сигналов'],
  'satellites+cad':['Конструктор КА','Инженер по компоновке'],
  'it+prog':['Fullstack-разработчик','DevOps-инженер','Инженер-программист'],
  'it+data':['Data Engineer','ML-инженер'],
  'it+sys':['Системный архитектор','Специалист по кибербезопасности'],
  'science+math':['Учёный-баллистик','Астрофизик'],
  'science+data':['Научный аналитик','Специалист по экспериментам'],
  'analytics+data':['Data Scientist','Аналитик ДЗЗ'],
  'analytics+prog':['ML-инженер','Аналитик больших данных'],
  'engineering+cad':['Инженер-конструктор','Инженер-технолог'],
  'engineering+elec':['Электромонтажник КТ','Специалист по испытаниям'],
  'engineering+math':['Инженер-расчётчик','Инженер по прочности'],
  'management+lead':['Руководитель проекта','Менеджер программы'],
  'management+comm':['Координатор проектного офиса','Системный аналитик'],
  'management+sys':['Продуктовый менеджер','Менеджер цифровой трансформации'],
  'geo+data':['Специалист по ДЗЗ','Геоинформатик'],
  'geo+prog':['Разработчик ГИС','Инженер ГЛОНАСС'],
  'geo+math':['Геодезист-навигатор','Специалист по ГЛОНАСС']
};

const DL={rockets:'Ракетостроение и КА',satellites:'Спутниковые системы',it:'IT и цифровая трансформация',science:'Научные исследования',analytics:'Аналитика данных и ИИ',engineering:'Производство и инженерия',management:'Управление проектами',geo:'Навигация и ДЗЗ'};
const DI={rockets:'🚀',satellites:'🛰️',it:'💻',science:'🔬',analytics:'📊',engineering:'🏗️',management:'📋',geo:'🌍'};
const LL={school:'Школьник',junior_student:'Студент младших курсов',senior_student:'Студент старших курсов',young_pro:'Молодой специалист',mid_pro:'Специалист с опытом'};
const SL={prog:'Программирование',math:'Математика',cad:'CAD/Конструирование',data:'Работа с данными',comm:'Коммуникация',lead:'Лидерство',elec:'Электроника',sys:'Системное мышление'};

const RM={
  rockets:{t:'Конструктор космической техники',s:[{l:'Космический класс',t:'Старт'},{l:'МАИ / МГТУ / Самарский ун-т',t:'Обучение'},{l:'Целевое обучение',t:'Поддержка'},{l:'Практика в РКК «Энергия» / РКЦ «Прогресс»',t:'Опыт'},{l:'Молодой инженер-конструктор',t:'Карьера'},{l:'Ведущий инженер → Главный конструктор',t:'Рост'}]},
  it:{t:'Специалист по ИИ и цифровым технологиям',s:[{l:'Олимпиады по программированию',t:'Старт'},{l:'Хакатон «Кедр»',t:'Опыт'},{l:'Обучение IT',t:'Обучение'},{l:'Стажировка в РКС / ЦНИИмаш',t:'Стажировка'},{l:'ML-инженер / разработчик',t:'Карьера'},{l:'Руководитель цифрового продукта',t:'Рост'}]},
  management:{t:'Руководитель проектов',s:[{l:'Студенческое самоуправление',t:'Старт'},{l:'Форум «Команда будущего»',t:'Нетворкинг'},{l:'Кейс-чемпионат «Орбита поколений»',t:'Опыт'},{l:'Проектный офис',t:'Стажировка'},{l:'Менеджер проекта',t:'Карьера'},{l:'Директор направления',t:'Рост'}]},
  science:{t:'Исследователь космоса',s:[{l:'Научные конференции',t:'Старт'},{l:'Университет (физика)',t:'Обучение'},{l:'НИР',t:'Наука'},{l:'НПО Лавочкина / ЦНИИмаш',t:'Стажировка'},{l:'Научный сотрудник',t:'Карьера'},{l:'Руководитель научного проекта',t:'Рост'}]},
  engineering:{t:'Специалист производства',s:[{l:'Колледж / тех. вуз',t:'Обучение'},{l:'Практика на предприятии',t:'Опыт'},{l:'Чемпионат «Молодые профессионалы»',t:'Мастерство'},{l:'Инженер-технолог',t:'Карьера'},{l:'Начальник участка',t:'Рост'},{l:'Руководитель производства',t:'Перспектива'}]},
  analytics:{t:'Аналитик данных в космосе',s:[{l:'Обучение Data Science',t:'Обучение'},{l:'Хакатон «Кедр» / проекты ДЗЗ',t:'Опыт'},{l:'Стажировка в РКС',t:'Стажировка'},{l:'Data Scientist',t:'Карьера'},{l:'ML-инженер',t:'Рост'},{l:'Руководитель аналитики',t:'Перспектива'}]},
  satellites:{t:'Инженер спутниковых систем',s:[{l:'МАИ / СибГУ',t:'Обучение'},{l:'Целевое от ИСС',t:'Поддержка'},{l:'Стажировка в ИСС',t:'Опыт'},{l:'Инженер спутниковых систем',t:'Карьера'},{l:'Ведущий инженер',t:'Рост'},{l:'Главный конструктор',t:'Перспектива'}]},
  geo:{t:'Специалист навигации и ДЗЗ',s:[{l:'Обучение ГИС',t:'Обучение'},{l:'Проекты ДЗЗ / хакатоны',t:'Опыт'},{l:'Стажировка в РКС',t:'Стажировка'},{l:'Специалист ДЗЗ / ГЛОНАСС',t:'Карьера'},{l:'Ведущий специалист',t:'Рост'},{l:'Руководитель направления',t:'Перспектива'}]}
};

const WT={goal:.30,interest:.25,level:.20,skill:.15,format:.05,time:.05};
const st={c:0,a:{}};
const $=id=>document.getElementById(id);

function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));$(id).classList.add('active')}

function renderQ(){
  const q=QS[st.c],sel=st.a[q.id]||[];
  $('q-title').innerHTML=`<h2>${q.t}</h2><p>${q.s}</p>`;
  let h='';
  if(q.m)h+=`<div class="m-hint">💡 Можно выбрать до ${q.mx}</div>`;
  h+='<div class="q-opts">';
  q.o.forEach(o=>{h+=`<div class="q-opt${sel.includes(o.v)?' sel':''}" data-v="${o.v}"><span class="e">${o.e}</span><span class="t">${o.t}</span></div>`});
  h+='</div>';
  $('q-options').innerHTML=h;
  $('bar').style.width=((st.c+1)/QS.length*100)+'%';
  $('bar-label').textContent=(st.c+1)+'/'+QS.length;
  const b=$('btn-next');
  b.textContent=st.c===QS.length-1?'Получить маршрут 🚀':'Далее →';
  b.disabled=!sel.length;
  $('q-options').querySelectorAll('.q-opt').forEach(el=>{
    el.addEventListener('click',()=>{
      const v=el.dataset.v;
      if(q.m){
        if(!st.a[q.id])st.a[q.id]=[];
        const a=st.a[q.id],i=a.indexOf(v);
        if(i>-1){a.splice(i,1);el.classList.remove('sel')}
        else{if(a.length>=q.mx)return;if(v!=='none'&&a.includes('none')){a.splice(a.indexOf('none'),1);document.querySelector('.q-opt[data-v="none"]')?.classList.remove('sel')}if(v==='none'){a.length=0;document.querySelectorAll('.q-opt.sel').forEach(o=>o.classList.remove('sel'))}a.push(v);el.classList.add('sel')}
      }else{st.a[q.id]=[v];document.querySelectorAll('.q-opt').forEach(o=>o.classList.remove('sel'));el.classList.add('sel')}
      $('btn-next').disabled=!(st.a[q.id]||[]).length;
    });
  });
  $('quiz-mid').scrollTop=0;
}

function load(){
  show('screen-loading');
  const b=$('lb'),ss=document.querySelectorAll('.ls');
  b.style.width='0';
  const tx=['🔭 Анализируем твои интересы...','📡 Ищем подходящие возможности...','🗺️ Строим персональный маршрут...'];
  ss.forEach((s,i)=>{s.textContent=tx[i];s.classList.remove('active','done')});
  ss[0].classList.add('active');
  let p=0;
  const iv=setInterval(()=>{
    p+=2;b.style.width=p+'%';
    if(p>=33){ss[0].classList.remove('active');ss[0].classList.add('done');ss[0].textContent='✅'+tx[0].slice(1);ss[1].classList.add('active')}
    if(p>=66){ss[1].classList.remove('active');ss[1].classList.add('done');ss[1].textContent='✅'+tx[1].slice(1);ss[2].classList.add('active')}
    if(p>=100){clearInterval(iv);ss[2].classList.remove('active');ss[2].classList.add('done');ss[2].textContent='✅'+tx[2].slice(1);setTimeout(calc,400)}
  },50);
}

function sc(op,a){let t=0;for(const d of Object.keys(WT)){const u=a[d]||[],o=op.tg[d]||[];if(!u.length||!o.length)continue;let m=0;u.forEach(x=>{if(o.includes(x))m++});t+=(m/u.length)*WT[d]}return t}

function calc(){
  const a=st.a;
  const scored=OPS.map(o=>({...o,sc:sc(o,a)})).sort((a,b)=>b.sc-a.sc);
  const recs=scored.filter(s=>s.sc>.12).slice(0,8);
  const ints=a.interest||[],pi=ints[0]||'it',sks=a.skill||[];
  const pr=new Set();
  for(const i of ints)for(const s of sks){const k=i+'+'+s;if(PM[k])PM[k].forEach(p=>pr.add(p))}
  if(!pr.size)for(const i of ints)for(const k of Object.keys(PM)){if(k.startsWith(i+'+')){PM[k].forEach(p=>pr.add(p));break}}

  $('pi').textContent=DI[pi]||'🛰️';
  $('pd').textContent=DL[pi]||'Космическая отрасль';
  $('pl').textContent=LL[a.level?.[0]]||'';
  $('pt').innerHTML=[...ints.map(i=>DL[i]),...sks.map(s=>SL[s])].filter(Boolean).map(t=>`<span>${t}</span>`).join('');
  $('plist').innerHTML=[...pr].slice(0,6).map(p=>`<li>${p}</li>`).join('')||'<li>Пройдите опрос подробнее</li>';

  if(!recs.length){$('rlist').innerHTML='<p style="text-align:center;color:var(--t2);padding:40px">Не найдено. Попробуйте изменить ответы.</p>'}
  else{$('rlist').innerHTML=recs.map(r=>{
    const mp=Math.round(r.sc*100);
    return`<div class="rc"><div class="rc-top"><span class="rc-type ty-${r.tp}">${r.tl}</span><span class="rc-match">${mp}%</span></div><h4>${r.n}</h4><p>${r.d}</p><div class="rc-meta"><span>🏢 ${r.org}</span><span>📍 ${r.fmt}</span></div><button class="btn-a" onclick="go('${r.url}','${r.n.replace(/'/g,"\\'")}')">  ${r.btn} →</button></div>`;
  }).join('')}

  const rm=RM[pi]||RM.it;
  let rh=`<h3>🗺️ ${rm.t}</h3>`;
  rm.s.forEach(s=>{rh+=`<div class="rm-s"><div class="rm-t">${s.t}</div><div class="rm-items"><div class="rm-i"><b>${s.l}</b></div></div></div>`});
  const nw=recs.filter(r=>['competition','event'].includes(r.tp)).slice(0,2);
  const sn=recs.filter(r=>['internship','education'].includes(r.tp)).slice(0,2);
  const ft=recs.filter(r=>['job','project'].includes(r.tp)).slice(0,2);
  if(!nw.length&&recs[0])nw.push(recs[0]);if(!sn.length&&recs[1])sn.push(recs[1]);if(!ft.length&&recs[2])ft.push(recs[2]);
  function ri(arr){return arr.length?arr.map(i=>`<div class="rm-i"><b>${i.n}</b><small>${i.tl} · ${i.org} · <a href="${i.url}" target="_blank" style="color:var(--acl)">${i.btn}</a></small></div>`).join(''):'<div class="rm-i"><b>Исследуй keytostart.space</b></div>'}
  rh+=`<h3 style="margin-top:24px">⚡ Твои ближайшие шаги</h3>`;
  rh+=`<div class="rm-s"><div class="rm-t">⚡ Сейчас</div><div class="rm-items">${ri(nw)}</div></div>`;
  rh+=`<div class="rm-s"><div class="rm-t">📆 1–6 мес.</div><div class="rm-items">${ri(sn)}</div></div>`;
  rh+=`<div class="rm-s"><div class="rm-t">🚀 Перспектива</div><div class="rm-items">${ri(ft)}</div></div>`;
  $('road').innerHTML=rh;

  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('on'));
  document.querySelectorAll('.tp').forEach(t=>t.classList.remove('active'));
  document.querySelector('[data-t="profile"]').classList.add('on');
  $('tp-profile').classList.add('active');
  show('screen-results');
  $('res-mid').scrollTop=0;

  // Pre-fill apply form direction
  $('f-dir').value=DL[pi]||'';
}

// ═══ APPLY FORM ═══
function initApplyForm(){
  const form=$('apply-form');
  const submit=$('btn-submit');
  const agree=$('f-agree');
  const required=form.querySelectorAll('[required]');

  function checkValid(){
    let valid=true;
    required.forEach(f=>{
      if(f.type==='checkbox'){if(!f.checked)valid=false}
      else if(!f.value.trim())valid=false;
    });
    submit.disabled=!valid;
  }

  required.forEach(f=>{
    f.addEventListener('input',checkValid);
    f.addEventListener('change',checkValid);
  });

  // Phone mask
  $('f-phone').addEventListener('input',function(e){
    let v=this.value.replace(/\D/g,'');
    if(v.length>0){
      if(v[0]==='8')v='7'+v.slice(1);
      if(v[0]!=='7')v='7'+v;
      let f='+7';
      if(v.length>1)f+=' ('+v.slice(1,4);
      if(v.length>4)f+=') '+v.slice(4,7);
      if(v.length>7)f+='-'+v.slice(7,9);
      if(v.length>9)f+='-'+v.slice(9,11);
      this.value=f;
    }
  });

  submit.addEventListener('click',(e)=>{
    e.preventDefault();
    if(submit.disabled)return;

    // Collect form data
    const data={};
    new FormData(form).forEach((v,k)=>{data[k]=v});
    data.quiz_results={
      direction:$('pd').textContent,
      level:$('pl').textContent,
      professions:Array.from($('plist').querySelectorAll('li')).map(li=>li.textContent)
    };

    console.log('📋 Заявка на трудоустройство:',data);

    // In production: send to backend API
    // fetch('/api/apply', {method:'POST', body:JSON.stringify(data)})

    show('screen-success');
  });
}

// ═══ ACTIONS ═══
window.go=function(u,n){toast('Переход: '+n);if(u)setTimeout(()=>open(u,'_blank'),500)};
function toast(m){const t=$('toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2500)}

// ═══ TABS ═══
document.querySelectorAll('.tab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('on'));
    document.querySelectorAll('.tp').forEach(t=>t.classList.remove('active'));
    tab.classList.add('on');
    $('tp-'+tab.dataset.t).classList.add('active');
    $('res-mid').scrollTop=0;
  });
});

// ═══ INIT ═══
$('btn-start').addEventListener('click',()=>{st.c=0;st.a={};renderQ();show('screen-quiz')});
$('btn-back').addEventListener('click',()=>{if(st.c>0){st.c--;renderQ()}else show('screen-landing')});
$('btn-next').addEventListener('click',()=>{if(st.c<QS.length-1){st.c++;renderQ()}else load()});
$('btn-again').addEventListener('click',()=>{st.c=0;st.a={};show('screen-landing')});

$('btn-apply').addEventListener('click',()=>{
  show('screen-apply');
  $('apply-mid').scrollTop=0;
});

$('btn-apply-back').addEventListener('click',()=>{show('screen-results')});

$('btn-to-results').addEventListener('click',()=>{show('screen-results')});
$('btn-to-home').addEventListener('click',()=>{st.c=0;st.a={};show('screen-landing')});

$('btn-share').addEventListener('click',()=>{
  const t=`🚀 Мой маршрут: ${$('pd').textContent}! Найди свой путь → keytostart.space`;
  if(navigator.share)navigator.share({title:'КосмоNav',text:t,url:'https://keytostart.space'}).catch(()=>{});
  else if(navigator.clipboard)navigator.clipboard.writeText(t).then(()=>toast('✅ Скопировано!')).catch(()=>toast(t));
  else toast(t);
});

initApplyForm();
