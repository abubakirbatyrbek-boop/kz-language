const lessons = [
  { id:'daily-01', course:'daily-kz', title:'日常打招呼', tag:'生活', level:'入门', cn:'您好。', kz:'Сәлеметсіз бе?', ru:'Здравствуйте.', tip:'正式、礼貌地向陌生人打招呼时可以使用。' },
  { id:'daily-02', course:'daily-kz', title:'感谢别人', tag:'生活', level:'入门', cn:'谢谢。', kz:'Рақмет.', ru:'Спасибо.', tip:'两个语言里都是非常高频的礼貌表达。' },
  { id:'daily-03', course:'daily-kz', title:'问现在几点', tag:'生活', level:'入门', cn:'现在几点？', kz:'Қазір сағат неше?', ru:'Который сейчас час?', tip:'问时间时可以直接使用。' },
  { id:'daily-04', course:'daily-kz', title:'我听不懂', tag:'生活', level:'入门', cn:'我听不懂。', kz:'Мен түсінбеймін.', ru:'Я не понимаю.', tip:'交流卡住时先明确告诉对方你没有听懂。' },
  { id:'daily-05', course:'daily-kz', title:'请再说一次', tag:'生活', level:'入门', cn:'请再说一次。', kz:'Қайта айтып жіберіңізші.', ru:'Повторите, пожалуйста.', tip:'适合在工作和生活中请求对方重复。' },
  { id:'daily-06', course:'daily-kz', title:'多少钱', tag:'生活', level:'入门', cn:'多少钱？', kz:'Қанша тұрады?', ru:'Сколько стоит?', tip:'购物、打车、服务咨询都能用。' },
  { id:'daily-07', course:'daily-kz', title:'我要去这里', tag:'生活', level:'入门', cn:'我要去这里。', kz:'Мен мұнда барғым келеді.', ru:'Я хочу поехать сюда.', tip:'打车或问路时可以配合地图直接使用。' },
  { id:'daily-08', course:'daily-kz', title:'在哪里', tag:'生活', level:'入门', cn:'在哪里？', kz:'Қай жерде?', ru:'Где находится?', tip:'询问地点的基础句型。' },
  { id:'daily-09', course:'daily-kz', title:'明天见', tag:'生活', level:'入门', cn:'明天见。', kz:'Ертең көріскенше.', ru:'До завтра.', tip:'结束今天的交流时可以使用。' },
  { id:'daily-10', course:'daily-kz', title:'没问题', tag:'生活', level:'入门', cn:'没问题。', kz:'Мәселе жоқ.', ru:'Без проблем.', tip:'工作沟通里也经常出现。' },
  { id:'log-01', course:'work-ru', title:'货物什么时候到', tag:'物流', level:'实用', cn:'货物什么时候到？', kz:'Жүк қашан келеді?', ru:'Когда прибудет груз?', tip:'物流沟通里的高频句。' },
  { id:'log-02', course:'work-ru', title:'货物到了吗', tag:'物流', level:'实用', cn:'货物到了吗？', kz:'Жүк келді ме?', ru:'Груз прибыл?', tip:'适合向司机、仓库或同事确认状态。' },
  { id:'log-03', course:'work-ru', title:'什么时候装货', tag:'物流', level:'实用', cn:'什么时候开始装货？', kz:'Тиеу қашан басталады?', ru:'Когда начнётся погрузка?', tip:'装车、装箱前确认时间。' },
  { id:'log-04', course:'work-ru', title:'在哪里卸货', tag:'物流', level:'实用', cn:'在哪里卸货？', kz:'Жүкті қай жерде түсіреміз?', ru:'Где разгружать груз?', tip:'现场沟通时直接询问卸货地点。' },
  { id:'log-05', course:'work-ru', title:'请把单据给我', tag:'物流', level:'实用', cn:'请把单据给我。', kz:'Құжаттарды маған беріңізші.', ru:'Дайте мне документы, пожалуйста.', tip:'文件交接时使用。' },
  { id:'log-06', course:'work-ru', title:'司机到了', tag:'物流', level:'实用', cn:'司机到了。', kz:'Жүргізуші келді.', ru:'Водитель приехал.', tip:'通知同事或仓库司机已经到场。' },
  { id:'log-07', course:'work-ru', title:'车还没到', tag:'物流', level:'实用', cn:'车还没到。', kz:'Көлік әлі келген жоқ.', ru:'Машина ещё не приехала.', tip:'延迟时可以直接说明状态。' },
  { id:'log-08', course:'work-ru', title:'请等一下', tag:'物流', level:'实用', cn:'请等一下。', kz:'Күте тұрыңызшы.', ru:'Подождите, пожалуйста.', tip:'让对方稍等时使用。' },
  { id:'log-09', course:'work-ru', title:'这里不能停车', tag:'物流', level:'实用', cn:'这里不能停车。', kz:'Бұл жерде көлік қоюға болмайды.', ru:'Здесь нельзя парковаться.', tip:'装卸区和厂区里很实用。' },
  { id:'log-10', course:'work-ru', title:'什么时候发车', tag:'物流', level:'实用', cn:'什么时候发车？', kz:'Қашан жөнелтіледі?', ru:'Когда отправляется?', tip:'铁路、车辆运输等场景都可继续扩展。' },
  { id:'rail-01', course:'work-kz', title:'火车什么时候发', tag:'铁路', level:'实用', cn:'火车什么时候发车？', kz:'Пойыз қашан жөнеледі?', ru:'Когда отправляется поезд?', tip:'车站和运输计划沟通。' },
  { id:'rail-02', course:'work-kz', title:'这批车皮到了吗', tag:'铁路', level:'实用', cn:'这批车皮到了吗？', kz:'Бұл вагондар келді ме?', ru:'Эти вагоны уже прибыли?', tip:'铁路物流现场常见表达。' },
  { id:'rail-03', course:'work-kz', title:'哪个站', tag:'铁路', level:'实用', cn:'在哪个车站？', kz:'Қай станцияда?', ru:'На какой станции?', tip:'确认接车站或作业站。' },
  { id:'rail-04', course:'work-kz', title:'请确认编号', tag:'铁路', level:'实用', cn:'请确认车厢编号。', kz:'Вагон нөмірін тексеріңізші.', ru:'Проверьте номер вагона, пожалуйста.', tip:'核对车厢信息时使用。' },
  { id:'rail-05', course:'work-kz', title:'什么时候装车', tag:'铁路', level:'实用', cn:'什么时候开始装车？', kz:'Вагонға тиеу қашан басталады?', ru:'Когда начнётся погрузка в вагоны?', tip:'铁路装车作业时间确认。' },
  { id:'factory-01', course:'work-kz', title:'设备坏了', tag:'工厂', level:'实用', cn:'设备坏了。', kz:'Жабдық істен шықты.', ru:'Оборудование сломалось.', tip:'报告设备故障的基础表达。' },
  { id:'factory-02', course:'work-kz', title:'请停机', tag:'工厂', level:'实用', cn:'请停机。', kz:'Жабдықты тоқтатыңызшы.', ru:'Остановите оборудование, пожалуйста.', tip:'操作前要根据现场安全规定沟通。' },
  { id:'factory-03', course:'work-ru', title:'今天几点开会', tag:'工作', level:'实用', cn:'今天几点开会？', kz:'Бүгін жиналыс сағат нешеде?', ru:'Во сколько сегодня совещание?', tip:'工作会议安排。' },
  { id:'factory-04', course:'work-ru', title:'请把这个翻译一下', tag:'工作', level:'实用', cn:'请把这个翻译一下。', kz:'Мынаны аударып беріңізші.', ru:'Переведите это, пожалуйста.', tip:'在多语言工作环境中非常实用。' },
  { id:'factory-05', course:'work-ru', title:'明天再讨论', tag:'工作', level:'实用', cn:'明天再讨论。', kz:'Ертең қайта талқылаймыз.', ru:'Обсудим завтра.', tip:'会议和商务沟通中的常见表达。' },
  { id:'store-01', course:'work-kz', title:'在哪里可以买到？', tag:'商店', level:'日常', cn:'这个在哪里可以买到？', kz:'Мұны қайдан сатып алуға болады?', ru:'Где это можно купить?', tip:'在商店寻找商品时使用。' },
  { id:'store-02', course:'work-kz', title:'我要买这个', tag:'商店', level:'日常', cn:'我要买这个。', kz:'Мынаны сатып аламын.', ru:'Я хочу купить это.', tip:'确认购买商品时使用。' },
  { id:'store-03', course:'work-kz', title:'有这个型号吗？', tag:'商店', level:'日常', cn:'有这个型号吗？', kz:'Осы үлгісі бар ма?', ru:'Есть такая модель?', tip:'购买设备或商品时询问型号。' },
  { id:'store-04', course:'work-kz', title:'可以刷卡吗？', tag:'商店', level:'日常', cn:'可以刷卡吗？', kz:'Картамен төлеуге бола ма?', ru:'Можно оплатить картой?', tip:'结账时使用。' },
  { id:'pharmacy-01', course:'work-kz', title:'我需要这个药', tag:'药店', level:'日常', cn:'我需要这个药。', kz:'Маған осы дәрі керек.', ru:'Мне нужно это лекарство.', tip:'在药店说明需要的药品。' },
  { id:'pharmacy-02', course:'work-kz', title:'这个药怎么服用', tag:'药店', level:'日常', cn:'这个药怎么服用？', kz:'Бұл дәріні қалай қабылдайды?', ru:'Как принимать это лекарство?', tip:'询问用法时使用。' },
  { id:'pharmacy-03', course:'work-kz', title:'需要处方吗？', tag:'药店', level:'日常', cn:'需要处方吗？', kz:'Рецепт керек пе?', ru:'Нужен рецепт?', tip:'购买药品前确认是否需要处方。' },
  { id:'pharmacy-04', course:'work-kz', title:'有没有止痛药？', tag:'药店', level:'日常', cn:'有没有止痛药？', kz:'Ауырсынуды басатын дәрі бар ма?', ru:'Есть обезболивающее?', tip:'询问是否有止痛药。' },
  { id:'sales-01', course:'work-kz', title:'请给我发一份报价', tag:'销售', level:'工作', cn:'请给我发一份报价。', kz:'Маған баға ұсынысын жіберіңізші.', ru:'Пришлите мне коммерческое предложение.', tip:'向客户或供应商索取报价。' },
  { id:'sales-02', course:'work-kz', title:'这个价格可以谈', tag:'销售', level:'工作', cn:'这个价格可以谈。', kz:'Бұл бағаны келісуге болады.', ru:'Эту цену можно обсудить.', tip:'商务谈价时使用。' },
  { id:'sales-03', course:'work-kz', title:'客户什么时候到？', tag:'销售', level:'工作', cn:'客户什么时候到？', kz:'Клиент қашан келеді?', ru:'Когда приедет клиент?', tip:'接待客户前确认时间。' },
  { id:'sales-04', course:'work-kz', title:'客户问这个多少钱', tag:'销售', level:'工作', cn:'客户问这个多少钱。', kz:'Клиент мұның бағасы қанша екенін сұрады.', ru:'Клиент спрашивает, сколько это стоит.', tip:'销售沟通中转述客户问题。' },
  { id:'office-01', course:'work-kz', title:'今天几点开会？', tag:'办公室', level:'工作', cn:'今天几点开会？', kz:'Бүгін жиналыс сағат нешеде?', ru:'Во сколько сегодня совещание?', tip:'办公室日常沟通。' },
  { id:'office-02', course:'work-kz', title:'请把文件发给我', tag:'办公室', level:'工作', cn:'请把文件发给我。', kz:'Құжатты маған жіберіңізші.', ru:'Отправьте мне документ, пожалуйста.', tip:'文件传递。' },
  { id:'office-03', course:'work-kz', title:'我稍后回复', tag:'办公室', level:'工作', cn:'我稍后回复。', kz:'Кейінірек жауап беремін.', ru:'Я отвечу позже.', tip:'暂时无法立即处理时使用。' },
  { id:'office-04', course:'work-kz', title:'请确认一下', tag:'办公室', level:'工作', cn:'请确认一下。', kz:'Тексеріп жіберіңізші.', ru:'Проверьте, пожалуйста.', tip:'让同事确认信息。' },
  { id:'security-01', course:'work-kz', title:'请出示证件', tag:'安保', level:'工作', cn:'请出示证件。', kz:'Құжатыңызды көрсетіңізші.', ru:'Предъявите, пожалуйста, документ.', tip:'门岗或安保检查时使用。' },
  { id:'security-02', course:'work-kz', title:'这里禁止进入', tag:'安保', level:'工作', cn:'这里禁止进入。', kz:'Бұл жерге кіруге болмайды.', ru:'Вход сюда запрещён.', tip:'限制区域现场沟通。' },
  { id:'security-03', course:'work-kz', title:'车辆停在这里', tag:'安保', level:'工作', cn:'车辆停在这里。', kz:'Көлікті осы жерге қойыңыз.', ru:'Поставьте машину здесь.', tip:'车辆引导。' },
  { id:'security-04', course:'work-kz', title:'请先登记', tag:'安保', level:'工作', cn:'请先登记。', kz:'Алдымен тіркеліңіз.', ru:'Сначала зарегистрируйтесь.', tip:'访客进入时使用。' },
  { id:'engineering-01', course:'work-kz', title:'图纸在哪里？', tag:'工程', level:'工作', cn:'图纸在哪里？', kz:'Сызба қайда?', ru:'Где чертёж?', tip:'现场查找技术图纸。' },
  { id:'engineering-02', course:'work-kz', title:'这里需要测量', tag:'工程', level:'工作', cn:'这里需要测量。', kz:'Бұл жерде өлшеу керек.', ru:'Здесь нужно измерить.', tip:'工程现场沟通。' },
  { id:'engineering-03', course:'work-kz', title:'什么时候开始施工？', tag:'工程', level:'工作', cn:'什么时候开始施工？', kz:'Құрылыс қашан басталады?', ru:'Когда начинается строительство?', tip:'施工计划沟通。' },
  { id:'engineering-04', course:'work-kz', title:'请检查设备', tag:'工程', level:'工作', cn:'请检查设备。', kz:'Жабдықты тексеріңізші.', ru:'Проверьте оборудование, пожалуйста.', tip:'设备检查。' },
  { id:'engineering-05', course:'work-kz', title:'这里需要技术人员', tag:'工程', level:'工作', cn:'这里需要技术人员。', kz:'Бұл жерге техникалық маман керек.', ru:'Здесь нужен технический специалист.', tip:'现场人员协调。' },
  { id:'customs-01', course:'work-kz', title:'需要报关', tag:'海关', level:'工作', cn:'需要报关。', kz:'Кедендік декларация қажет.', ru:'Нужно оформить таможенную декларацию.', tip:'办理进出口货物手续时使用。' },
  { id:'customs-02', course:'work-kz', title:'请准备海关文件', tag:'海关', level:'工作', cn:'请准备好海关文件。', kz:'Кедендік құжаттарды дайындаңызшы.', ru:'Подготовьте таможенные документы, пожалуйста.', tip:'海关申报和查验前确认资料。' },
  { id:'customs-03', course:'work-kz', title:'什么时候查验', tag:'海关', level:'工作', cn:'什么时候查验？', kz:'Кедендік тексеру қашан болады?', ru:'Когда будет досмотр?', tip:'询问查验时间。' },
  { id:'customs-04', course:'work-kz', title:'货物什么时候放行', tag:'海关', level:'工作', cn:'货物什么时候放行？', kz:'Жүк қашан шығарылады?', ru:'Когда груз будет выпущен?', tip:'确认货物放行时间。' },
  { id:'customs-05', course:'work-kz', title:'这是过境货物', tag:'海关', level:'工作', cn:'这是过境货物。', kz:'Бұл транзиттік жүк.', ru:'Это транзитный груз.', tip:'说明货物运输性质。' },
  { id:'business-01', course:'work-kz', title:'这个价格太高了', tag:'商务', level:'工作', cn:'这个价格太高了。', kz:'Бұл баға тым жоғары.', ru:'Эта цена слишком высокая.', tip:'谈价时使用。' },
  { id:'business-02', course:'work-kz', title:'我们什么时候开会', tag:'商务', level:'工作', cn:'我们什么时候开会？', kz:'Біз қашан жиналамыз?', ru:'Когда у нас будет совещание?', tip:'安排商务会议。' },
  { id:'business-03', course:'work-kz', title:'请把合同发给我', tag:'商务', level:'工作', cn:'请把合同发给我。', kz:'Шартты маған жіберіңізші.', ru:'Отправьте мне договор, пожалуйста.', tip:'合同文件往来。' },
  { id:'business-04', course:'work-kz', title:'请发一份报价', tag:'商务', level:'工作', cn:'请发一份报价。', kz:'Баға ұсынысын жіберіңізші.', ru:'Пришлите коммерческое предложение, пожалуйста.', tip:'索取商务报价。' },
  { id:'business-05', course:'work-kz', title:'我们明天再讨论', tag:'商务', level:'工作', cn:'我们明天再讨论。', kz:'Ертең қайта талқылаймыз.', ru:'Обсудим завтра.', tip:'结束当次讨论并约定后续。' },
  { id:"sentence-kz-01", course:"sentence-kz", title:"人称：我、你、他、我们、你们、他们", tag:'语法与造句', level:'基础语法', cn:"我 / 你 / 他 / 我们 / 你们 / 他们", kz:"Мен / Сен / Ол / Біз / Сендер / Олар", ru:"", tip:"认识基本人称代词，为后面的句子主语打基础。", group:"人称代词" },
  { id:"sentence-kz-02", course:"sentence-kz", title:"第一、二、三人称的使用", tag:'语法与造句', level:'基础语法', cn:"我工作。你工作。他工作。", kz:"Мен жұмыс істеймін. Сен жұмыс істейсің. Ол жұмыс істейді.", ru:"", tip:"根据人称变化选择正确的动词形式。", group:"人称代词" },
  { id:"sentence-kz-03", course:"sentence-kz", title:"我是……", tag:'语法与造句', level:'基础语法', cn:"我是中国人。", kz:"Мен қытаймын.", ru:"", tip:"在哈萨克语中，身份或类别可以直接用名词性谓语表达。", group:"名词谓语" },
  { id:"sentence-kz-04", course:"sentence-kz", title:"你是……", tag:'语法与造句', level:'基础语法', cn:"你是学生。", kz:"Сен студентсің.", ru:"", tip:"第二人称名词性谓语出现相应的人称形式。", group:"名词谓语" },
  { id:"sentence-kz-05", course:"sentence-kz", title:"他是……", tag:'语法与造句', level:'基础语法', cn:"他是老师。", kz:"Ол мұғалім.", ru:"", tip:"第三人称名词性谓语通常不加人称词尾。", group:"名词谓语" },
  { id:"sentence-kz-06", course:"sentence-kz", title:"这是……", tag:'语法与造句', level:'基础语法', cn:"这是公司。", kz:"Бұл компания.", ru:"", tip:"用“Бұл + 名词”介绍或指认事物。", group:"名词谓语" },
  { id:"sentence-kz-07", course:"sentence-kz", title:"我不是……", tag:'语法与造句', level:'基础语法', cn:"我不是学生。", kz:"Мен студент емеспін.", ru:"", tip:"名词性谓语的否定使用“емес”。", group:"否定" },
  { id:"sentence-kz-08", course:"sentence-kz", title:"你不是……吗？", tag:'语法与造句', level:'基础语法', cn:"你不是老师吗？", kz:"Сен мұғалім емессің бе?", ru:"", tip:"把名词性谓语变成否定疑问句。", group:"否定" },
  { id:"sentence-kz-09", course:"sentence-kz", title:"你是……吗？", tag:'语法与造句', level:'基础语法', cn:"你是中国人吗？", kz:"Сен қытайсың ба?", ru:"", tip:"一般疑问句常用句尾疑问词“ба/бе/па/пе”。", group:"疑问句" },
  { id:"sentence-kz-10", course:"sentence-kz", title:"这是我的……", tag:'语法与造句', level:'基础语法', cn:"这是我的车。", kz:"Бұл менің көлігім.", ru:"", tip:"学习人称所属形式：менің + 名词的人称所属形式。", group:"所属关系" },
  { id:"sentence-kz-11", course:"sentence-kz", title:"你的……在哪里？", tag:'语法与造句', level:'基础语法', cn:"你的车在哪里？", kz:"Сенің көлігің қайда?", ru:"", tip:"把所属结构与地点问句结合起来。", group:"所属关系" },
  { id:"sentence-kz-12", course:"sentence-kz", title:"我有……", tag:'语法与造句', level:'基础语法', cn:"我有车。", kz:"Менің көлігім бар.", ru:"", tip:"表达“有”时使用“бар”，并结合所属结构。", group:"存在句" },
  { id:"sentence-kz-13", course:"sentence-kz", title:"我没有……", tag:'语法与造句', level:'基础语法', cn:"我没有钱。", kz:"Менде ақша жоқ.", ru:"", tip:"“没有”常用“жоқ”表达。", group:"存在句" },
  { id:"sentence-kz-14", course:"sentence-kz", title:"你有……吗？", tag:'语法与造句', level:'基础语法', cn:"你有时间吗？", kz:"Сенде уақыт бар ма?", ru:"", tip:"把存在句变成一般疑问句。", group:"存在句" },
  { id:"sentence-kz-15", course:"sentence-kz", title:"这里有……", tag:'语法与造句', level:'基础语法', cn:"这里有人。", kz:"Бұл жерде адам бар.", ru:"", tip:"“有”可以用于地点存在。", group:"存在句" },
  { id:"sentence-kz-16", course:"sentence-kz", title:"我在家。", tag:'语法与造句', level:'基础语法', cn:"我在家。", kz:"Мен үйдемін.", ru:"", tip:"地点常通过处所格表达，如 үйде。", group:"地点" },
  { id:"sentence-kz-17", course:"sentence-kz", title:"我在公司。", tag:'语法与造句', level:'基础语法', cn:"我在公司。", kz:"Мен кеңседемін.", ru:"", tip:"地点结构与人称形式结合。", group:"地点" },
  { id:"sentence-kz-18", course:"sentence-kz", title:"你在哪里？", tag:'语法与造句', level:'基础语法', cn:"你在哪里？", kz:"Сен қай жердесің?", ru:"", tip:"用“қай жерде”询问所在位置。", group:"地点" },
  { id:"sentence-kz-19", course:"sentence-kz", title:"我去公司。", tag:'语法与造句', level:'基础语法', cn:"我去公司。", kz:"Мен кеңсеге барамын.", ru:"", tip:"去某地使用方向格形式，如 кеңсеге。", group:"地点与方向" },
  { id:"sentence-kz-20", course:"sentence-kz", title:"我从公司回来。", tag:'语法与造句', level:'基础语法', cn:"我从公司回来。", kz:"Мен кеңседен қайтып келдім.", ru:"", tip:"从某地使用出发/离开方向的格形式。", group:"地点与方向" },
  { id:"sentence-kz-21", course:"sentence-kz", title:"我工作。", tag:'语法与造句', level:'基础语法', cn:"我工作。", kz:"Мен жұмыс істеймін.", ru:"", tip:"学习第一人称现在/习惯动作。", group:"动词现在时" },
  { id:"sentence-kz-22", course:"sentence-kz", title:"你工作。", tag:'语法与造句', level:'基础语法', cn:"你工作。", kz:"Сен жұмыс істейсің.", ru:"", tip:"学习第二人称动词变化。", group:"动词现在时" },
  { id:"sentence-kz-23", course:"sentence-kz", title:"他工作。", tag:'语法与造句', level:'基础语法', cn:"他工作。", kz:"Ол жұмыс істейді.", ru:"", tip:"学习第三人称动词变化。", group:"动词现在时" },
  { id:"sentence-kz-24", course:"sentence-kz", title:"我不工作。", tag:'语法与造句', level:'基础语法', cn:"我不工作。", kz:"Мен жұмыс істемеймін.", ru:"", tip:"现在时否定形式。", group:"动词否定" },
  { id:"sentence-kz-25", course:"sentence-kz", title:"你工作吗？", tag:'语法与造句', level:'基础语法', cn:"你工作吗？", kz:"Сен жұмыс істейсің бе?", ru:"", tip:"把动词句改成一般疑问句。", group:"动词疑问" },
  { id:"sentence-kz-26", course:"sentence-kz", title:"我今天工作。", tag:'语法与造句', level:'基础语法', cn:"我今天工作。", kz:"Мен бүгін жұмыс істеймін.", ru:"", tip:"时间词通常放在动作之前或句首。", group:"时间" },
  { id:"sentence-kz-27", course:"sentence-kz", title:"我明天去公司。", tag:'语法与造句', level:'基础语法', cn:"我明天去公司。", kz:"Мен ертең кеңсеге барамын.", ru:"", tip:"“барамын”可以根据上下文表达计划或将要发生的动作。", group:"时间" },
  { id:"sentence-kz-28", course:"sentence-kz", title:"谁？什么？", tag:'语法与造句', level:'基础语法', cn:"谁来了？这是什么？", kz:"Кім келді? Бұл не?", ru:"", tip:"认识基本问词 кім / не。", group:"问词" },
  { id:"sentence-kz-29", course:"sentence-kz", title:"哪里？从哪里？", tag:'语法与造句', level:'基础语法', cn:"你在哪里？你从哪里来？", kz:"Сен қайдасың? Сен қайдан келдің?", ru:"", tip:"比较 қайда 与 қайдан 的方向差别。", group:"问词" },
  { id:"sentence-kz-30", course:"sentence-kz", title:"什么时候？多少钱？", tag:'语法与造句', level:'基础语法', cn:"什么时候到？多少钱？", kz:"Қашан келеді? Қанша тұрады?", ru:"", tip:"高频时间与数量问句。", group:"问词" },
  { id:"sentence-kz-31", course:"sentence-kz", title:"我需要……", tag:'语法与造句', level:'基础语法', cn:"我需要帮助。", kz:"Маған көмек керек.", ru:"", tip:"“керек”表示需要、必要。", group:"情态" },
  { id:"sentence-kz-32", course:"sentence-kz", title:"我想……", tag:'语法与造句', level:'基础语法', cn:"我想去车站。", kz:"Мен вокзалға барғым келеді.", ru:"", tip:"用 -ғым/-гім/-қым/-кім келеді 表达愿望。", group:"情态" },
  { id:"sentence-kz-33", course:"sentence-kz", title:"可以……吗？", tag:'语法与造句', level:'基础语法', cn:"我可以进去吗？", kz:"Мен кірсем бола ма?", ru:"", tip:"用“бола ма”表达许可或可行性。", group:"情态" },
  { id:"sentence-kz-34", course:"sentence-kz", title:"不可以……", tag:'语法与造句', level:'基础语法', cn:"这里不能停车。", kz:"Бұл жерде көлік қоюға болмайды.", ru:"", tip:"“болмайды”表达禁止或不允许。", group:"情态" },
  { id:"sentence-kz-35", course:"sentence-kz", title:"我去了……", tag:'语法与造句', level:'基础语法', cn:"我昨天去了公司。", kz:"Мен кеше кеңсеге бардым.", ru:"", tip:"学习过去时第一人称形式。", group:"过去时" },
  { id:"sentence-kz-36", course:"sentence-kz", title:"他来了。", tag:'语法与造句', level:'基础语法', cn:"他来了。", kz:"Ол келді.", ru:"", tip:"学习过去时第三人称形式。", group:"过去时" },
  { id:"sentence-kz-37", course:"sentence-kz", title:"明天我们去……", tag:'语法与造句', level:'基础语法', cn:"明天我们去车站。", kz:"Ертең біз вокзалға барамыз.", ru:"", tip:"用上下文和动词形式表达计划或将来动作。", group:"未来与计划" },
  { id:"sentence-kz-38", course:"sentence-kz", title:"我工作，但是他休息。", tag:'语法与造句', level:'基础语法', cn:"我工作，但是他休息。", kz:"Мен жұмыс істеймін, бірақ ол демалады.", ru:"", tip:"学习基本连接词 бірақ。", group:"连接句" },
  { id:"sentence-kz-39", course:"sentence-kz", title:"因为……所以……", tag:'语法与造句', level:'基础语法', cn:"因为下雨，我不去。", kz:"Жаңбыр жауып тұрғандықтан, мен бармаймын.", ru:"", tip:"先建立因果关系的基本表达。", group:"连接句" },
  { id:"sentence-kz-40", course:"sentence-kz", title:"三个词组句", tag:'语法与造句', level:'基础语法', cn:"我 / 公司 / 工作", kz:"Мен кеңседе жұмыс істеймін.", ru:"", tip:"把人称、地点和动词组合成完整句子。", group:"组句" },
  { id:"sentence-kz-41", course:"sentence-kz", title:"四个词组句", tag:'语法与造句', level:'基础语法', cn:"我 / 明天 / 公司 / 去", kz:"Мен ертең кеңсеге барамын.", ru:"", tip:"把时间、地点和动作按正确顺序组合。", group:"组句" },
  { id:"sentence-kz-42", course:"sentence-kz", title:"中文 → 哈萨克语", tag:'语法与造句', level:'基础语法', cn:"我没有车。", kz:"Менде көлік жоқ.", ru:"", tip:"根据句型自己写出完整句子。", group:"造句" },
  { id:"sentence-kz-43", course:"sentence-kz", title:"中文 → 哈萨克语", tag:'语法与造句', level:'基础语法', cn:"他在家。", kz:"Ол үйде.", ru:"", tip:"独立完成地点句。", group:"造句" },
  { id:"sentence-kz-44", course:"sentence-kz", title:"场景：办公室", tag:'语法与造句', level:'基础语法', cn:"请把文件给我。", kz:"Құжатты маған беріңізші.", ru:"", tip:"把基础语法迁移到工作交流。", group:"场景造句" },
  { id:"sentence-kz-45", course:"sentence-kz", title:"场景：物流", tag:'语法与造句', level:'基础语法', cn:"货物明天到。", kz:"Жүк ертең келеді.", ru:"", tip:"把时间和动作句用于物流场景。", group:"场景造句" },
  { id:"sentence-ru-01", course:"sentence-ru", title:"人称：我、你、他、我们、你们、他们", tag:'语法与造句', level:'基础语法', cn:"我 / 你 / 他 / 我们 / 你们 / 他们", kz:"", ru:"Я / Ты / Он / Мы / Вы / Они", tip:"认识基本人称代词，为后面的句子主语打基础。", group:"人称代词" },
  { id:"sentence-ru-02", course:"sentence-ru", title:"第一、二、三人称的使用", tag:'语法与造句', level:'基础语法', cn:"我工作。你工作。他工作。", kz:"", ru:"Я работаю. Ты работаешь. Он работает.", tip:"根据人称变化选择正确的动词形式。", group:"人称与动词" },
  { id:"sentence-ru-03", course:"sentence-ru", title:"我是……", tag:'语法与造句', level:'基础语法', cn:"我是中国人。", kz:"", ru:"Я из Китая.", tip:"用“Я + 身份/来源”表达基本身份信息。", group:"名词谓语" },
  { id:"sentence-ru-04", course:"sentence-ru", title:"你是……", tag:'语法与造句', level:'基础语法', cn:"你是学生。", kz:"", ru:"Ты студент.", tip:"名词作表语，注意性别和形式。", group:"名词谓语" },
  { id:"sentence-ru-05", course:"sentence-ru", title:"他是……", tag:'语法与造句', level:'基础语法', cn:"他是老师。", kz:"", ru:"Он учитель.", tip:"第三人称身份句。", group:"名词谓语" },
  { id:"sentence-ru-06", course:"sentence-ru", title:"这是……", tag:'语法与造句', level:'基础语法', cn:"这是公司。", kz:"", ru:"Это компания.", tip:"用“Это + 名词”介绍事物。", group:"指示句" },
  { id:"sentence-ru-07", course:"sentence-ru", title:"我不是……", tag:'语法与造句', level:'基础语法', cn:"我不是学生。", kz:"", ru:"Я не студент.", tip:"俄语名词性谓语常用 не 构成否定。", group:"否定" },
  { id:"sentence-ru-08", course:"sentence-ru", title:"你是……吗？", tag:'语法与造句', level:'基础语法', cn:"你是中国人吗？", kz:"", ru:"Ты из Китая?", tip:"俄语一般疑问句主要靠语调，不需要单独的“吗”。", group:"疑问句" },
  { id:"sentence-ru-09", course:"sentence-ru", title:"这是我的……", tag:'语法与造句', level:'基础语法', cn:"这是我的车。", kz:"", ru:"Это моя машина.", tip:"掌握人称物主词与名词性数的基本搭配。", group:"所有关系" },
  { id:"sentence-ru-10", course:"sentence-ru", title:"你的……在哪里？", tag:'语法与造句', level:'基础语法', cn:"你的车在哪里？", kz:"", ru:"Где твоя машина?", tip:"把所有关系与地点问句结合。", group:"所有关系" },
  { id:"sentence-ru-11", course:"sentence-ru", title:"我有……", tag:'语法与造句', level:'基础语法', cn:"我有车。", kz:"", ru:"У меня есть машина.", tip:"俄语表达“有”常用 у + 人 + есть。", group:"存在句" },
  { id:"sentence-ru-12", course:"sentence-ru", title:"我没有……", tag:'语法与造句', level:'基础语法', cn:"我没有钱。", kz:"", ru:"У меня нет денег.", tip:"“没有”使用 нет，并注意后面的格变化。", group:"存在句" },
  { id:"sentence-ru-13", course:"sentence-ru", title:"你有……吗？", tag:'语法与造句', level:'基础语法', cn:"你有时间吗？", kz:"", ru:"У тебя есть время?", tip:"把“有”结构变成疑问句。", group:"存在句" },
  { id:"sentence-ru-14", course:"sentence-ru", title:"我在家。", tag:'语法与造句', level:'基础语法', cn:"我在家。", kz:"", ru:"Я дома.", tip:"домой / дома 区别要逐步建立。", group:"地点" },
  { id:"sentence-ru-15", course:"sentence-ru", title:"我在公司。", tag:'语法与造句', level:'基础语法', cn:"我在公司。", kz:"", ru:"Я в офисе.", tip:"地点常用 в + 前置格。", group:"地点与前置词" },
  { id:"sentence-ru-16", course:"sentence-ru", title:"你在哪里？", tag:'语法与造句', level:'基础语法', cn:"你在哪里？", kz:"", ru:"Где ты?", tip:"基本地点问句。", group:"地点与前置词" },
  { id:"sentence-ru-17", course:"sentence-ru", title:"我去公司。", tag:'语法与造句', level:'基础语法', cn:"我去公司。", kz:"", ru:"Я иду в офис.", tip:"去某地常用 в + 宾格。", group:"方向" },
  { id:"sentence-ru-18", course:"sentence-ru", title:"我从公司回来。", tag:'语法与造句', level:'基础语法', cn:"我从公司回来。", kz:"", ru:"Я возвращаюсь из офиса.", tip:"从某处出来常用 из + 第二格。", group:"来源" },
  { id:"sentence-ru-19", course:"sentence-ru", title:"我工作。", tag:'语法与造句', level:'基础语法', cn:"我工作。", kz:"", ru:"Я работаю.", tip:"第一人称现在时。", group:"现在时" },
  { id:"sentence-ru-20", course:"sentence-ru", title:"你工作。", tag:'语法与造句', level:'基础语法', cn:"你工作。", kz:"", ru:"Ты работаешь.", tip:"第二人称现在时。", group:"现在时" },
  { id:"sentence-ru-21", course:"sentence-ru", title:"他工作。", tag:'语法与造句', level:'基础语法', cn:"他工作。", kz:"", ru:"Он работает.", tip:"第三人称现在时。", group:"现在时" },
  { id:"sentence-ru-22", course:"sentence-ru", title:"我不工作。", tag:'语法与造句', level:'基础语法', cn:"我不工作。", kz:"", ru:"Я не работаю.", tip:"现在时否定使用 не。", group:"否定" },
  { id:"sentence-ru-23", course:"sentence-ru", title:"你工作吗？", tag:'语法与造句', level:'基础语法', cn:"你工作吗？", kz:"", ru:"Ты работаешь?", tip:"语调和语序共同表达疑问。", group:"疑问句" },
  { id:"sentence-ru-24", course:"sentence-ru", title:"我今天工作。", tag:'语法与造句', level:'基础语法', cn:"我今天工作。", kz:"", ru:"Я сегодня работаю.", tip:"时间副词放入基本句型。", group:"时间" },
  { id:"sentence-ru-25", course:"sentence-ru", title:"我明天去公司。", tag:'语法与造句', level:'基础语法', cn:"我明天去公司。", kz:"", ru:"Я завтра поеду в офис.", tip:"通过 завтра + 将来形式表达计划。", group:"时间" },
  { id:"sentence-ru-26", course:"sentence-ru", title:"谁？什么？", tag:'语法与造句', level:'基础语法', cn:"谁来了？这是什么？", kz:"", ru:"Кто пришёл? Что это?", tip:"基本问词 кто / что。", group:"问词" },
  { id:"sentence-ru-27", course:"sentence-ru", title:"哪里？从哪里？", tag:'语法与造句', level:'基础语法', cn:"你在哪里？你从哪里来？", kz:"", ru:"Где ты? Откуда ты?", tip:"比较 где 与 откуда。", group:"问词" },
  { id:"sentence-ru-28", course:"sentence-ru", title:"什么时候？多少钱？", tag:'语法与造句', level:'基础语法', cn:"什么时候到？多少钱？", kz:"", ru:"Когда прибудет? Сколько стоит?", tip:"高频时间与价格问句。", group:"问词" },
  { id:"sentence-ru-29", course:"sentence-ru", title:"我需要……", tag:'语法与造句', level:'基础语法', cn:"我需要帮助。", kz:"", ru:"Мне нужна помощь.", tip:"нужен / нужна / нужно / нужны 需与名词性配合。", group:"情态" },
  { id:"sentence-ru-30", course:"sentence-ru", title:"我想……", tag:'语法与造句', level:'基础语法', cn:"我想去车站。", kz:"", ru:"Я хочу поехать на вокзал.", tip:"хотеть 后面常接不定式。", group:"情态" },
  { id:"sentence-ru-31", course:"sentence-ru", title:"可以……吗？", tag:'语法与造句', level:'基础语法', cn:"我可以进去吗？", kz:"", ru:"Можно мне войти?", tip:"можно 表达许可或可能。", group:"情态" },
  { id:"sentence-ru-32", course:"sentence-ru", title:"不能……", tag:'语法与造句', level:'基础语法', cn:"这里不能停车。", kz:"", ru:"Здесь нельзя парковаться.", tip:"нельзя 表达禁止。", group:"情态" },
  { id:"sentence-ru-33", course:"sentence-ru", title:"我去了……", tag:'语法与造句', level:'基础语法', cn:"我昨天去了公司。", kz:"", ru:"Я вчера ездил в офис.", tip:"过去时要根据说话者性别变化。", group:"过去时" },
  { id:"sentence-ru-34", course:"sentence-ru", title:"他来了。", tag:'语法与造句', level:'基础语法', cn:"他来了。", kz:"", ru:"Он пришёл.", tip:"第三人称过去时。", group:"过去时" },
  { id:"sentence-ru-35", course:"sentence-ru", title:"明天我们去……", tag:'语法与造句', level:'基础语法', cn:"明天我们去车站。", kz:"", ru:"Завтра мы поедем на вокзал.", tip:"用复合将来时表达计划动作。", group:"将来时" },
  { id:"sentence-ru-36", course:"sentence-ru", title:"我工作，但是他休息。", tag:'语法与造句', level:'基础语法', cn:"我工作，但是他休息。", kz:"", ru:"Я работаю, но он отдыхает.", tip:"学习基本连接词 но。", group:"连接句" },
  { id:"sentence-ru-37", course:"sentence-ru", title:"因为……所以……", tag:'语法与造句', level:'基础语法', cn:"因为下雨，我不去。", kz:"", ru:"Я не иду, потому что идёт дождь.", tip:"建立原因关系。", group:"连接句" },
  { id:"sentence-ru-38", course:"sentence-ru", title:"三个词组句", tag:'语法与造句', level:'基础语法', cn:"我 / 公司 / 工作", kz:"", ru:"Я работаю в офисе.", tip:"把主语、地点、动词组合成完整句子。", group:"组句" },
  { id:"sentence-ru-39", course:"sentence-ru", title:"四个词组句", tag:'语法与造句', level:'基础语法', cn:"我 / 明天 / 公司 / 去", kz:"", ru:"Я завтра поеду в офис.", tip:"把时间、地点和动作组合。", group:"组句" },
  { id:"sentence-ru-40", course:"sentence-ru", title:"中文 → 俄语", tag:'语法与造句', level:'基础语法', cn:"我没有车。", kz:"", ru:"У меня нет машины.", tip:"根据句型独立写句子。", group:"造句" },
  { id:"sentence-ru-41", course:"sentence-ru", title:"中文 → 俄语", tag:'语法与造句', level:'基础语法', cn:"他在家。", kz:"", ru:"Он дома.", tip:"独立完成地点句。", group:"造句" },
  { id:"sentence-ru-42", course:"sentence-ru", title:"场景：办公室", tag:'语法与造句', level:'基础语法', cn:"请把文件给我。", kz:"", ru:"Дайте мне документы, пожалуйста.", tip:"把基础语法迁移到工作交流。", group:"场景造句" },
  { id:"sentence-ru-43", course:"sentence-ru", title:"场景：物流", tag:'语法与造句', level:'基础语法', cn:"货物明天到。", kz:"", ru:"Груз прибудет завтра.", tip:"把时间和动作句用于物流场景。", group:"场景造句" },
  {"id":"speaking-kz-01","course":"speaking-kz","title":"我","tag":"造句与口语","level":"零基础口语","cn":"我","kz":"Мен","ru":"","tip":"从一个词开始开口。","group":"口语起步"},
  {"id":"speaking-kz-02","course":"speaking-kz","title":"你","tag":"造句与口语","level":"零基础口语","cn":"你","kz":"Сен","ru":"","tip":"认识对方。","group":"口语起步"},
  {"id":"speaking-kz-03","course":"speaking-kz","title":"他","tag":"造句与口语","level":"零基础口语","cn":"他","kz":"Ол","ru":"","tip":"谈论第三个人。","group":"口语起步"},
  {"id":"speaking-kz-04","course":"speaking-kz","title":"我们","tag":"造句与口语","level":"零基础口语","cn":"我们","kz":"Біз","ru":"","tip":"表达一起做事。","group":"口语起步"},
  {"id":"speaking-kz-05","course":"speaking-kz","title":"你们","tag":"造句与口语","level":"零基础口语","cn":"你们","kz":"Сендер","ru":"","tip":"对多人说话。","group":"口语起步"},
  {"id":"speaking-kz-06","course":"speaking-kz","title":"他们","tag":"造句与口语","level":"零基础口语","cn":"他们","kz":"Олар","ru":"","tip":"谈论多人。","group":"口语起步"},
  {"id":"speaking-kz-07","course":"speaking-kz","title":"我是中国人。","tag":"造句与口语","level":"零基础口语","cn":"我是中国人。","kz":"Мен қытаймын.","ru":"","tip":"直接练一条完整口语句。","group":"基础表达"},
  {"id":"speaking-kz-08","course":"speaking-kz","title":"你是中国人吗？","tag":"造句与口语","level":"零基础口语","cn":"你是中国人吗？","kz":"Сен қытайсың ба?","ru":"","tip":"直接练提问。","group":"基础表达"},
  {"id":"speaking-kz-09","course":"speaking-kz","title":"他是我的同事。","tag":"造句与口语","level":"零基础口语","cn":"他是我的同事。","kz":"Ол менің әріптесім.","ru":"","tip":"把人称词放进真实表达。","group":"基础表达"},
  {"id":"speaking-kz-10","course":"speaking-kz","title":"我是新员工。","tag":"造句与口语","level":"零基础口语","cn":"我是新员工。","kz":"Мен жаңадан келген қызметкермін.","ru":"","tip":"工作场景自我介绍。","group":"基础表达"},
  {"id":"speaking-kz-11","course":"speaking-kz","title":"我在这里。","tag":"造句与口语","level":"零基础口语","cn":"我在这里。","kz":"Мен осындамын.","ru":"","tip":"表达所在位置。","group":"基础表达"},
  {"id":"speaking-kz-12","course":"speaking-kz","title":"你在哪里？","tag":"造句与口语","level":"零基础口语","cn":"你在哪里？","kz":"Сен қайдасың?","ru":"","tip":"高频口语问位置。","group":"基础表达"},
  {"id":"speaking-kz-13","course":"speaking-kz","title":"他在办公室。","tag":"造句与口语","level":"零基础口语","cn":"他在办公室。","kz":"Ол кеңседе.","ru":"","tip":"描述别人所在地点。","group":"基础表达"},
  {"id":"speaking-kz-14","course":"speaking-kz","title":"我有车。","tag":"造句与口语","level":"零基础口语","cn":"我有车。","kz":"Менің көлігім бар.","ru":"","tip":"直接掌握“我有”。","group":"基础表达"},
  {"id":"speaking-kz-15","course":"speaking-kz","title":"你有时间吗？","tag":"造句与口语","level":"零基础口语","cn":"你有时间吗？","kz":"Сенің уақытың бар ма?","ru":"","tip":"询问对方是否有时间。","group":"基础表达"},
  {"id":"speaking-kz-16","course":"speaking-kz","title":"我没有钱。","tag":"造句与口语","level":"零基础口语","cn":"我没有钱。","kz":"Менде ақша жоқ.","ru":"","tip":"直接表达“没有”。","group":"基础表达"},
  {"id":"speaking-kz-17","course":"speaking-kz","title":"这是我的手机。","tag":"造句与口语","level":"零基础口语","cn":"这是我的手机。","kz":"Бұл менің телефоным.","ru":"","tip":"指着物品开口说。","group":"基础表达"},
  {"id":"speaking-kz-18","course":"speaking-kz","title":"这是什么？","tag":"造句与口语","level":"零基础口语","cn":"这是什么？","kz":"Бұл не?","ru":"","tip":"最常用的确认句。","group":"基础表达"},
  {"id":"speaking-kz-19","course":"speaking-kz","title":"谁？","tag":"造句与口语","level":"零基础口语","cn":"谁？","kz":"Кім?","ru":"","tip":"问人。","group":"高频交流"},
  {"id":"speaking-kz-20","course":"speaking-kz","title":"什么？","tag":"造句与口语","level":"零基础口语","cn":"什么？","kz":"Не?","ru":"","tip":"问事物。","group":"高频交流"},
  {"id":"speaking-kz-21","course":"speaking-kz","title":"在哪里？","tag":"造句与口语","level":"零基础口语","cn":"在哪里？","kz":"Қай жерде?","ru":"","tip":"问地点。","group":"高频交流"},
  {"id":"speaking-kz-22","course":"speaking-kz","title":"我去公司。","tag":"造句与口语","level":"零基础口语","cn":"我去公司。","kz":"Мен кеңсеге барамын.","ru":"","tip":"练习“我 + 去”。","group":"高频交流"},
  {"id":"speaking-kz-23","course":"speaking-kz","title":"我要回家。","tag":"造句与口语","level":"零基础口语","cn":"我要回家。","kz":"Мен үйге қайтқым келеді.","ru":"","tip":"表达想做什么。","group":"高频交流"},
  {"id":"speaking-kz-24","course":"speaking-kz","title":"我来了。","tag":"造句与口语","level":"零基础口语","cn":"我来了。","kz":"Мен келдім.","ru":"","tip":"到场时直接说。","group":"高频交流"},
  {"id":"speaking-kz-25","course":"speaking-kz","title":"我看到了。","tag":"造句与口语","level":"零基础口语","cn":"我看到了。","kz":"Мен көрдім.","ru":"","tip":"告诉对方自己看到了。","group":"高频交流"},
  {"id":"speaking-kz-26","course":"speaking-kz","title":"我知道。","tag":"造句与口语","level":"零基础口语","cn":"我知道。","kz":"Мен білемін.","ru":"","tip":"表示知道。","group":"高频交流"},
  {"id":"speaking-kz-27","course":"speaking-kz","title":"我不知道。","tag":"造句与口语","level":"零基础口语","cn":"我不知道。","kz":"Мен білмеймін.","ru":"","tip":"不知道时直接说。","group":"高频交流"},
  {"id":"speaking-kz-28","course":"speaking-kz","title":"我懂了。","tag":"造句与口语","level":"零基础口语","cn":"我懂了。","kz":"Түсіндім.","ru":"","tip":"听懂后回应。","group":"高频交流"},
  {"id":"speaking-kz-29","course":"speaking-kz","title":"我没听懂。","tag":"造句与口语","level":"零基础口语","cn":"我没听懂。","kz":"Мен түсінбедім.","ru":"","tip":"没听懂时回应。","group":"高频交流"},
  {"id":"speaking-kz-30","course":"speaking-kz","title":"请再说一次。","tag":"造句与口语","level":"零基础口语","cn":"请再说一次。","kz":"Қайта айтып жіберіңізші.","ru":"","tip":"请求对方重复。","group":"高频交流"},
  {"id":"speaking-kz-31","course":"speaking-kz","title":"请说慢一点。","tag":"造句与口语","level":"零基础口语","cn":"请说慢一点。","kz":"Баяуырақ сөйлеңізші.","ru":"","tip":"对方说快时使用。","group":"高频交流"},
  {"id":"speaking-kz-32","course":"speaking-kz","title":"请帮我。","tag":"造句与口语","level":"零基础口语","cn":"请帮我。","kz":"Маған көмектесіңізші.","ru":"","tip":"请求帮助。","group":"高频交流"},
  {"id":"speaking-kz-33","course":"speaking-kz","title":"我需要帮助。","tag":"造句与口语","level":"零基础口语","cn":"我需要帮助。","kz":"Маған көмек керек.","ru":"","tip":"表达需要帮助。","group":"高频交流"},
  {"id":"speaking-kz-34","course":"speaking-kz","title":"我想喝水。","tag":"造句与口语","level":"零基础口语","cn":"我想喝水。","kz":"Мен су ішкім келеді.","ru":"","tip":"从“我想”开始说。","group":"高频交流"},
  {"id":"speaking-kz-35","course":"speaking-kz","title":"我想吃饭。","tag":"造句与口语","level":"零基础口语","cn":"我想吃饭。","kz":"Мен тамақ жегім келеді.","ru":"","tip":"日常吃饭表达。","group":"高频交流"},
  {"id":"speaking-kz-36","course":"speaking-kz","title":"我喜欢这个。","tag":"造句与口语","level":"零基础口语","cn":"我喜欢这个。","kz":"Маған бұл ұнайды.","ru":"","tip":"表达喜欢。","group":"实用场景"},
  {"id":"speaking-kz-37","course":"speaking-kz","title":"我不喜欢这个。","tag":"造句与口语","level":"零基础口语","cn":"我不喜欢这个。","kz":"Маған бұл ұнамайды.","ru":"","tip":"表达不喜欢。","group":"实用场景"},
  {"id":"speaking-kz-38","course":"speaking-kz","title":"多少钱？","tag":"造句与口语","level":"零基础口语","cn":"多少钱？","kz":"Қанша тұрады?","ru":"","tip":"购物和服务高频句。","group":"实用场景"},
  {"id":"speaking-kz-39","course":"speaking-kz","title":"什么时候？","tag":"造句与口语","level":"零基础口语","cn":"什么时候？","kz":"Қашан?","ru":"","tip":"问时间。","group":"实用场景"},
  {"id":"speaking-kz-40","course":"speaking-kz","title":"今天我上班。","tag":"造句与口语","level":"零基础口语","cn":"今天我上班。","kz":"Мен бүгін жұмыс істеймін.","ru":"","tip":"加入今天。","group":"实用场景"},
  {"id":"speaking-kz-41","course":"speaking-kz","title":"明天我不来。","tag":"造句与口语","level":"零基础口语","cn":"明天我不来。","kz":"Мен ертең келмеймін.","ru":"","tip":"表达明天的计划。","group":"实用场景"},
  {"id":"speaking-kz-42","course":"speaking-kz","title":"现在可以吗？","tag":"造句与口语","level":"零基础口语","cn":"现在可以吗？","kz":"Қазір бола ма?","ru":"","tip":"询问现在是否可以。","group":"实用场景"},
  {"id":"speaking-kz-43","course":"speaking-kz","title":"这里可以坐吗？","tag":"造句与口语","level":"零基础口语","cn":"这里可以坐吗？","kz":"Бұл жерде отыруға бола ма?","ru":"","tip":"生活中的许可表达。","group":"实用场景"},
  {"id":"speaking-kz-44","course":"speaking-kz","title":"这里不能停车。","tag":"造句与口语","level":"零基础口语","cn":"这里不能停车。","kz":"Бұл жерде көлік қоюға болмайды.","ru":"","tip":"真实环境中的禁止。","group":"实用场景"},
  {"id":"speaking-kz-45","course":"speaking-kz","title":"打车：我要去火车站。","tag":"造句与口语","level":"零基础口语","cn":"打车：我要去火车站。","kz":"Мен вокзалға барғым келеді.","ru":"","tip":"把口语带入打车。","group":"实用场景"},
  {"id":"speaking-kz-46","course":"speaking-kz","title":"商店：我要买这个。","tag":"造句与口语","level":"零基础口语","cn":"商店：我要买这个。","kz":"Мынаны сатып аламын.","ru":"","tip":"把口语带入购物。","group":"实用场景"},
  {"id":"speaking-kz-47","course":"speaking-kz","title":"餐厅：请给我菜单。","tag":"造句与口语","level":"零基础口语","cn":"餐厅：请给我菜单。","kz":"Мәзірді беріңізші.","ru":"","tip":"把口语带入餐厅。","group":"实用场景"},
  {"id":"speaking-kz-48","course":"speaking-kz","title":"办公室：请把文件给我。","tag":"造句与口语","level":"零基础口语","cn":"办公室：请把文件给我。","kz":"Құжатты маған беріңізші.","ru":"","tip":"把口语带入办公室。","group":"实用场景"},
  {"id":"speaking-kz-49","course":"speaking-kz","title":"物流：货物什么时候到？","tag":"造句与口语","level":"零基础口语","cn":"物流：货物什么时候到？","kz":"Жүк қашан келеді?","ru":"","tip":"把口语带入物流。","group":"实用场景"},
  {"id":"speaking-ru-01","course":"speaking-ru","title":"我","tag":"造句与口语","level":"零基础口语","cn":"我","kz":"","ru":"Я","tip":"从一个词开始开口。","group":"口语起步"},
  {"id":"speaking-ru-02","course":"speaking-ru","title":"你","tag":"造句与口语","level":"零基础口语","cn":"你","kz":"","ru":"Ты","tip":"认识对方。","group":"口语起步"},
  {"id":"speaking-ru-03","course":"speaking-ru","title":"他","tag":"造句与口语","level":"零基础口语","cn":"他","kz":"","ru":"Он","tip":"谈论第三个人。","group":"口语起步"},
  {"id":"speaking-ru-04","course":"speaking-ru","title":"我们","tag":"造句与口语","level":"零基础口语","cn":"我们","kz":"","ru":"Мы","tip":"表达一起做事。","group":"口语起步"},
  {"id":"speaking-ru-05","course":"speaking-ru","title":"你们","tag":"造句与口语","level":"零基础口语","cn":"你们","kz":"","ru":"Вы","tip":"对多人说话或礼貌称呼。","group":"口语起步"},
  {"id":"speaking-ru-06","course":"speaking-ru","title":"他们","tag":"造句与口语","level":"零基础口语","cn":"他们","kz":"","ru":"Они","tip":"谈论多人。","group":"口语起步"},
  {"id":"speaking-ru-07","course":"speaking-ru","title":"我是中国人。","tag":"造句与口语","level":"零基础口语","cn":"我是中国人。","kz":"","ru":"Я из Китая.","tip":"直接练一条完整口语句。","group":"基础表达"},
  {"id":"speaking-ru-08","course":"speaking-ru","title":"你是中国人吗？","tag":"造句与口语","level":"零基础口语","cn":"你是中国人吗？","kz":"","ru":"Ты из Китая?","tip":"直接练提问。","group":"基础表达"},
  {"id":"speaking-ru-09","course":"speaking-ru","title":"他是我的同事。","tag":"造句与口语","level":"零基础口语","cn":"他是我的同事。","kz":"","ru":"Он мой коллега.","tip":"把人称词放进真实表达。","group":"基础表达"},
  {"id":"speaking-ru-10","course":"speaking-ru","title":"我是新员工。","tag":"造句与口语","level":"零基础口语","cn":"我是新员工。","kz":"","ru":"Я новый сотрудник.","tip":"工作场景自我介绍。","group":"基础表达"},
  {"id":"speaking-ru-11","course":"speaking-ru","title":"我在这里。","tag":"造句与口语","level":"零基础口语","cn":"我在这里。","kz":"","ru":"Я здесь.","tip":"表达所在位置。","group":"基础表达"},
  {"id":"speaking-ru-12","course":"speaking-ru","title":"你在哪里？","tag":"造句与口语","level":"零基础口语","cn":"你在哪里？","kz":"","ru":"Где ты?","tip":"高频口语问位置。","group":"基础表达"},
  {"id":"speaking-ru-13","course":"speaking-ru","title":"他在办公室。","tag":"造句与口语","level":"零基础口语","cn":"他在办公室。","kz":"","ru":"Он в офисе.","tip":"描述别人所在地点。","group":"基础表达"},
  {"id":"speaking-ru-14","course":"speaking-ru","title":"我有车。","tag":"造句与口语","level":"零基础口语","cn":"我有车。","kz":"","ru":"У меня есть машина.","tip":"直接掌握“我有”。","group":"基础表达"},
  {"id":"speaking-ru-15","course":"speaking-ru","title":"你有时间吗？","tag":"造句与口语","level":"零基础口语","cn":"你有时间吗？","kz":"","ru":"У тебя есть время?","tip":"询问对方是否有时间。","group":"基础表达"},
  {"id":"speaking-ru-16","course":"speaking-ru","title":"我没有钱。","tag":"造句与口语","level":"零基础口语","cn":"我没有钱。","kz":"","ru":"У меня нет денег.","tip":"直接表达“没有”。","group":"基础表达"},
  {"id":"speaking-ru-17","course":"speaking-ru","title":"这是我的手机。","tag":"造句与口语","level":"零基础口语","cn":"这是我的手机。","kz":"","ru":"Это мой телефон.","tip":"指着物品开口说。","group":"基础表达"},
  {"id":"speaking-ru-18","course":"speaking-ru","title":"这是什么？","tag":"造句与口语","level":"零基础口语","cn":"这是什么？","kz":"","ru":"Что это?","tip":"最常用的确认句。","group":"基础表达"},
  {"id":"speaking-ru-19","course":"speaking-ru","title":"谁？","tag":"造句与口语","level":"零基础口语","cn":"谁？","kz":"","ru":"Кто?","tip":"问人。","group":"高频交流"},
  {"id":"speaking-ru-20","course":"speaking-ru","title":"什么？","tag":"造句与口语","level":"零基础口语","cn":"什么？","kz":"","ru":"Что?","tip":"问事物。","group":"高频交流"},
  {"id":"speaking-ru-21","course":"speaking-ru","title":"在哪里？","tag":"造句与口语","level":"零基础口语","cn":"在哪里？","kz":"","ru":"Где?","tip":"问地点。","group":"高频交流"},
  {"id":"speaking-ru-22","course":"speaking-ru","title":"我去公司。","tag":"造句与口语","level":"零基础口语","cn":"我去公司。","kz":"","ru":"Я иду в офис.","tip":"练习“我 + 去”。","group":"高频交流"},
  {"id":"speaking-ru-23","course":"speaking-ru","title":"我要回家。","tag":"造句与口语","level":"零基础口语","cn":"我要回家。","kz":"","ru":"Я хочу пойти домой.","tip":"表达想做什么。","group":"高频交流"},
  {"id":"speaking-ru-24","course":"speaking-ru","title":"我来了。","tag":"造句与口语","level":"零基础口语","cn":"我来了。","kz":"","ru":"Я пришёл.","tip":"到场时直接说。","group":"高频交流"},
  {"id":"speaking-ru-25","course":"speaking-ru","title":"我看到了。","tag":"造句与口语","level":"零基础口语","cn":"我看到了。","kz":"","ru":"Я видел.","tip":"告诉对方自己看到了。","group":"高频交流"},
  {"id":"speaking-ru-26","course":"speaking-ru","title":"我知道。","tag":"造句与口语","level":"零基础口语","cn":"我知道。","kz":"","ru":"Я знаю.","tip":"表示知道。","group":"高频交流"},
  {"id":"speaking-ru-27","course":"speaking-ru","title":"我不知道。","tag":"造句与口语","level":"零基础口语","cn":"我不知道。","kz":"","ru":"Я не знаю.","tip":"不知道时直接说。","group":"高频交流"},
  {"id":"speaking-ru-28","course":"speaking-ru","title":"我懂了。","tag":"造句与口语","level":"零基础口语","cn":"我懂了。","kz":"","ru":"Я понял.","tip":"听懂后回应。","group":"高频交流"},
  {"id":"speaking-ru-29","course":"speaking-ru","title":"我没听懂。","tag":"造句与口语","level":"零基础口语","cn":"我没听懂。","kz":"","ru":"Я не понял.","tip":"没听懂时回应。","group":"高频交流"},
  {"id":"speaking-ru-30","course":"speaking-ru","title":"请再说一次。","tag":"造句与口语","level":"零基础口语","cn":"请再说一次。","kz":"","ru":"Повторите, пожалуйста.","tip":"请求对方重复。","group":"高频交流"},
  {"id":"speaking-ru-31","course":"speaking-ru","title":"请说慢一点。","tag":"造句与口语","level":"零基础口语","cn":"请说慢一点。","kz":"","ru":"Говорите медленнее, пожалуйста.","tip":"对方说快时使用。","group":"高频交流"},
  {"id":"speaking-ru-32","course":"speaking-ru","title":"请帮我。","tag":"造句与口语","level":"零基础口语","cn":"请帮我。","kz":"","ru":"Помогите мне, пожалуйста.","tip":"请求帮助。","group":"高频交流"},
  {"id":"speaking-ru-33","course":"speaking-ru","title":"我需要帮助。","tag":"造句与口语","level":"零基础口语","cn":"我需要帮助。","kz":"","ru":"Мне нужна помощь.","tip":"表达需要帮助。","group":"高频交流"},
  {"id":"speaking-ru-34","course":"speaking-ru","title":"我想喝水。","tag":"造句与口语","level":"零基础口语","cn":"我想喝水。","kz":"","ru":"Я хочу пить воду.","tip":"从“我想”开始说。","group":"高频交流"},
  {"id":"speaking-ru-35","course":"speaking-ru","title":"我想吃饭。","tag":"造句与口语","level":"零基础口语","cn":"我想吃饭。","kz":"","ru":"Я хочу поесть.","tip":"日常吃饭表达。","group":"高频交流"},
  {"id":"speaking-ru-36","course":"speaking-ru","title":"我喜欢这个。","tag":"造句与口语","level":"零基础口语","cn":"我喜欢这个。","kz":"","ru":"Мне это нравится.","tip":"表达喜欢。","group":"实用场景"},
  {"id":"speaking-ru-37","course":"speaking-ru","title":"我不喜欢这个。","tag":"造句与口语","level":"零基础口语","cn":"我不喜欢这个。","kz":"","ru":"Мне это не нравится.","tip":"表达不喜欢。","group":"实用场景"},
  {"id":"speaking-ru-38","course":"speaking-ru","title":"多少钱？","tag":"造句与口语","level":"零基础口语","cn":"多少钱？","kz":"","ru":"Сколько стоит?","tip":"购物和服务高频句。","group":"实用场景"},
  {"id":"speaking-ru-39","course":"speaking-ru","title":"什么时候？","tag":"造句与口语","level":"零基础口语","cn":"什么时候？","kz":"","ru":"Когда?","tip":"问时间。","group":"实用场景"},
  {"id":"speaking-ru-40","course":"speaking-ru","title":"今天我上班。","tag":"造句与口语","level":"零基础口语","cn":"今天我上班。","kz":"","ru":"Я сегодня работаю.","tip":"加入今天。","group":"实用场景"},
  {"id":"speaking-ru-41","course":"speaking-ru","title":"明天我不来。","tag":"造句与口语","level":"零基础口语","cn":"明天我不来。","kz":"","ru":"Я завтра не приду.","tip":"表达明天的计划。","group":"实用场景"},
  {"id":"speaking-ru-42","course":"speaking-ru","title":"现在可以吗？","tag":"造句与口语","level":"零基础口语","cn":"现在可以吗？","kz":"","ru":"Можно сейчас?","tip":"询问现在是否可以。","group":"实用场景"},
  {"id":"speaking-ru-43","course":"speaking-ru","title":"这里可以坐吗？","tag":"造句与口语","level":"零基础口语","cn":"这里可以坐吗？","kz":"","ru":"Можно здесь сесть?","tip":"生活中的许可表达。","group":"实用场景"},
  {"id":"speaking-ru-44","course":"speaking-ru","title":"这里不能停车。","tag":"造句与口语","level":"零基础口语","cn":"这里不能停车。","kz":"","ru":"Здесь нельзя парковаться.","tip":"真实环境中的禁止。","group":"实用场景"},
  {"id":"speaking-ru-45","course":"speaking-ru","title":"打车：我要去火车站。","tag":"造句与口语","level":"零基础口语","cn":"打车：我要去火车站。","kz":"","ru":"Я хочу поехать на вокзал.","tip":"把口语带入打车。","group":"实用场景"},
  {"id":"speaking-ru-46","course":"speaking-ru","title":"商店：我要买这个。","tag":"造句与口语","level":"零基础口语","cn":"商店：我要买这个。","kz":"","ru":"Я хочу купить это.","tip":"把口语带入购物。","group":"实用场景"},
  {"id":"speaking-ru-47","course":"speaking-ru","title":"餐厅：请给我菜单。","tag":"造句与口语","level":"零基础口语","cn":"餐厅：请给我菜单。","kz":"","ru":"Дайте меню, пожалуйста.","tip":"把口语带入餐厅。","group":"实用场景"},
  {"id":"speaking-ru-48","course":"speaking-ru","title":"办公室：请把文件给我。","tag":"造句与口语","level":"零基础口语","cn":"办公室：请把文件给我。","kz":"","ru":"Дайте мне документы, пожалуйста.","tip":"把口语带入办公室。","group":"实用场景"},
  {"id":"speaking-ru-49","course":"speaking-ru","title":"物流：货物什么时候到？","tag":"造句与口语","level":"零基础口语","cn":"物流：货物什么时候到？","kz":"","ru":"Когда прибудет груз?","tip":"把口语带入物流。","group":"实用场景"},
];

const courses = [
  { id:'daily-kz', icon:'🔤', title:'哈萨克语｜零基础·字母与发音', desc:'从 42 个字母、特殊音和拼读开始，先把基础读音学扎实', accent:'KZ', kind:'foundation', targetLang:'kk' },
  { id:'sentence-kz', icon:'📘', title:'哈萨克语｜基础语法课', desc:'正式系统学习人称、否定、疑问、地点、时态、格和句型', accent:'KZ', kind:'sentence', targetLang:'kk' },
  { id:'speaking-kz', icon:'💬', title:'哈萨克语｜零基础造句与口语', desc:'不要求先学完整语法，从“我、你、他”开始直接开口说', accent:'KZ', kind:'speaking', targetLang:'kk' },
  { id:'daily-ru', icon:'🔤', title:'俄语｜零基础·字母与发音', desc:'从 33 个字母、发音、重音和拼读开始，先把基础读音学扎实', accent:'RU', kind:'foundation', targetLang:'ru' },
  { id:'sentence-ru', icon:'📘', title:'俄语｜基础语法课', desc:'正式系统学习人称、否定、疑问、地点、时态、格、前置词和句型', accent:'RU', kind:'sentence', targetLang:'ru' },
  { id:'speaking-ru', icon:'💬', title:'俄语｜零基础造句与口语', desc:'不要求先学完整语法，从“我、你、他”开始直接开口说', accent:'RU', kind:'speaking', targetLang:'ru' }
];

const scenes = [
  { id:'taxi', icon:'🚕', title:'打车', desc:'问价、目的地、下车', type:'daily-kz', category:'life' },
  { id:'rent', icon:'🏠', title:'租房', desc:'看房、合同、水电', type:'daily-kz', category:'life' },
  { id:'bank', icon:'🏦', title:'银行', desc:'开户、转账、咨询', type:'daily-kz', category:'life' },
  { id:'restaurant', icon:'🍽️', title:'餐厅', desc:'点餐、结账、需求', type:'daily-kz', category:'life' },
  { id:'store', icon:'🛒', title:'商店', desc:'找商品、询价、付款', type:'store', category:'life' },
  { id:'pharmacy', icon:'💊', title:'药店', desc:'买药、用法、处方', type:'pharmacy', category:'life' },
  { id:'factory', icon:'🏭', title:'工厂', desc:'设备、生产、安全', type:'factory', category:'work' },
  { id:'logistics', icon:'📦', title:'物流', desc:'装货、卸货、单据、运输', type:'log', category:'work' },
  { id:'rail', icon:'🚆', title:'铁路', desc:'车站、车皮、发运', type:'rail', category:'work' },
  { id:'sales', icon:'💼', title:'销售', desc:'报价、客户、谈价', type:'sales', category:'work' },
  { id:'office', icon:'🗂️', title:'办公室', desc:'会议、文件、沟通', type:'office', category:'work' },
  { id:'security', icon:'🛡️', title:'安保', desc:'证件、门岗、车辆', type:'security', category:'work' },
  { id:'engineering', icon:'🏗️', title:'工程', desc:'图纸、施工、设备', type:'engineering', category:'work' },
  { id:'customs', icon:'🛃', title:'海关', desc:'报关、查验、放行', type:'customs', category:'work' },
  { id:'business', icon:'🤝', title:'商务', desc:'谈价、会议、合同', type:'business', category:'work' }
];

const sceneTestBank = {
  taxi:[
    ['我要去火车站。','Мен вокзалға барғым келеді.','Я хочу поехать на вокзал.'],
    ['多少钱？','Қанша тұрады?','Сколько стоит?'],
    ['请在这里停车。','Осы жерде тоқтатыңызшы.','Остановите здесь, пожалуйста.'],
    ['请右转。','Оңға бұрылыңызшы.','Поверните направо, пожалуйста.'],
    ['请等我一下。','Мені сәл күте тұрыңызшы.','Подождите меня немного, пожалуйста.']
  ],
  rent:[
    ['一个月房租多少钱？','Бір айлық жалдау ақысы қанша?','Сколько стоит аренда за месяц?'],
    ['水电费包括在内吗？','Коммуналдық төлемдерге су мен электр энергиясы кіре ме?','Коммунальные услуги, вода и электричество, включены?'],
    ['合同可以看看吗？','Шартты көрсете аласыз ба?','Можно посмотреть договор?'],
    ['我想看一下房子。','Пәтерді көргім келеді.','Я хочу посмотреть квартиру.'],
    ['地址在哪里？','Мекенжайы қай жерде?','Где находится адрес?']
  ],
  bank:[
    ['我要开银行账户。','Банк шотын ашқым келеді.','Я хочу открыть банковский счёт.'],
    ['手续费是多少？','Комиссия қанша?','Какая комиссия?'],
    ['可以转账吗？','Ақша аударуға бола ма?','Можно сделать перевод?'],
    ['银行卡什么时候可以拿？','Банк картасын қашан ала аламын?','Когда я могу получить банковскую карту?'],
    ['请告诉我需要什么文件。','Қандай құжаттар қажет екенін айтып беріңізші.','Скажите, пожалуйста, какие документы нужны.']
  ],
  restaurant:[
    ['请给我菜单。','Мәзірді беріңізші.','Дайте, пожалуйста, меню.'],
    ['这个菜辣吗？','Бұл тағам ащы ма?','Это блюдо острое?'],
    ['请给我一杯水。','Маған бір стақан су беріңізші.','Дайте мне, пожалуйста, стакан воды.'],
    ['买单。','Есеп айырысайық.','Счёт, пожалуйста.'],
    ['可以刷卡吗？','Картамен төлеуге бола ма?','Можно оплатить картой?']
  ],
  factory:[
    ['设备坏了。','Жабдық істен шықты.','Оборудование сломалось.'],
    ['请停机。','Жабдықты тоқтатыңызшы.','Остановите оборудование, пожалуйста.'],
    ['请戴安全帽。','Қауіпсіздік каскасын киіңізші.','Наденьте защитную каску, пожалуйста.'],
    ['今天几点下班？','Бүгін жұмысты сағат нешеде аяқтаймыз?','Во сколько сегодня заканчиваем работу?'],
    ['这里不安全。','Бұл жерде қауіпсіз емес.','Здесь небезопасно.']
  ],
  rail:[
    ['火车什么时候发车？','Пойыз қашан жөнеледі?','Когда отправляется поезд?'],
    ['请确认车厢编号。','Вагон нөмірін тексеріңізші.','Проверьте номер вагона, пожалуйста.'],
    ['在哪个站？','Қай станцияда?','На какой станции?'],
    ['什么时候开始装车？','Вагонға тиеу қашан басталады?','Когда начнётся погрузка в вагоны?'],
    ['请把单据给我。','Құжаттарды маған беріңізші.','Дайте мне документы, пожалуйста.']
  ],
  customs:[
    ['需要报关。','Кедендік декларация қажет.','Нужно оформить таможенную декларацию.'],
    ['请准备好海关文件。','Кедендік құжаттарды дайындаңызшы.','Подготовьте таможенные документы, пожалуйста.'],
    ['什么时候查验？','Кедендік тексеру қашан болады?','Когда будет досмотр?'],
    ['货物什么时候放行？','Жүк қашан шығарылады?','Когда груз будет выпущен?'],
    ['这是过境货物。','Бұл транзиттік жүк.','Это транзитный груз.']
  ],
  logistics:[
    ['货物什么时候到？','Жүк қашан келеді?','Когда прибудет груз?'],
    ['货物到了吗？','Жүк келді ме?','Груз прибыл?'],
    ['什么时候开始装货？','Тиеу қашан басталады?','Когда начнётся погрузка?'],
    ['在哪里卸货？','Жүкті қай жерде түсіреміз?','Где разгружать груз?'],
    ['请把单据给我。','Құжаттарды маған беріңізші.','Дайте мне документы, пожалуйста.']
  ],
  store:[
    ['这个在哪里可以买到？','Мұны қайдан сатып алуға болады?','Где это можно купить?'],
    ['我要买这个。','Мынаны сатып аламын.','Я хочу купить это.'],
    ['有这个型号吗？','Осы үлгісі бар ма?','Есть такая модель?'],
    ['可以刷卡吗？','Картамен төлеуге бола ма?','Можно оплатить картой?'],
    ['多少钱？','Қанша тұрады?','Сколько стоит?']
  ],
  pharmacy:[
    ['我需要这个药。','Маған осы дәрі керек.','Мне нужно это лекарство.'],
    ['这个药怎么服用？','Бұл дәріні қалай қабылдайды?','Как принимать это лекарство?'],
    ['需要处方吗？','Рецепт керек пе?','Нужен рецепт?'],
    ['有没有止痛药？','Ауырсынуды басатын дәрі бар ма?','Есть обезболивающее?'],
    ['一天吃几次？','Күніне неше рет қабылдау керек?','Сколько раз в день принимать?']
  ],
  sales:[
    ['请给我发一份报价。','Маған баға ұсынысын жіберіңізші.','Пришлите мне коммерческое предложение.'],
    ['这个价格可以谈。','Бұл бағаны келісуге болады.','Эту цену можно обсудить.'],
    ['客户什么时候到？','Клиент қашан келеді?','Когда приедет клиент?'],
    ['客户问这个多少钱。','Клиент мұның бағасы қанша екенін сұрады.','Клиент спрашивает, сколько это стоит.'],
    ['我们明天再讨论。','Ертең қайта талқылаймыз.','Обсудим завтра.']
  ],
  office:[
    ['今天几点开会？','Бүгін жиналыс сағат нешеде?','Во сколько сегодня совещание?'],
    ['请把文件发给我。','Құжатты маған жіберіңізші.','Отправьте мне документ, пожалуйста.'],
    ['我稍后回复。','Кейінірек жауап беремін.','Я отвечу позже.'],
    ['请确认一下。','Тексеріп жіберіңізші.','Проверьте, пожалуйста.'],
    ['会议在哪里举行？','Жиналыс қай жерде өтеді?','Где будет проходить совещание?']
  ],
  security:[
    ['请出示证件。','Құжатыңызды көрсетіңізші.','Предъявите, пожалуйста, документ.'],
    ['这里禁止进入。','Бұл жерге кіруге болмайды.','Вход сюда запрещён.'],
    ['请先登记。','Алдымен тіркеліңіз.','Сначала зарегистрируйтесь.'],
    ['车辆停在这里。','Көлікті осы жерге қойыңыз.','Поставьте машину здесь.'],
    ['谁来负责？','Кім жауап береді?','Кто отвечает?']
  ],
  engineering:[
    ['图纸在哪里？','Сызба қайда?','Где чертёж?'],
    ['这里需要测量。','Бұл жерде өлшеу керек.','Здесь нужно измерить.'],
    ['什么时候开始施工？','Құрылыс қашан басталады?','Когда начинается строительство?'],
    ['请检查设备。','Жабдықты тексеріңізші.','Проверьте оборудование, пожалуйста.'],
    ['这里需要技术人员。','Бұл жерге техникалық маман керек.','Здесь нужен технический специалист.']
  ],
  customs:[
    ['需要报关。','Кедендік декларация қажет.','Нужно оформить таможенную декларацию.'],
    ['请准备好海关文件。','Кедендік құжаттарды дайындаңызшы.','Подготовьте таможенные документы, пожалуйста.'],
    ['什么时候查验？','Кедендік тексеру қашан болады?','Когда будет досмотр?'],
    ['货物什么时候放行？','Жүк қашан шығарылады?','Когда груз будет выпущен?'],
    ['这是过境货物。','Бұл транзиттік жүк.','Это транзитный груз.']
  ],
  business:[
    ['这个价格太高了。','Бұл баға тым жоғары.','Эта цена слишком высокая.'],
    ['我们什么时候开会？','Біз қашан жиналамыз?','Когда у нас будет совещание?'],
    ['请把合同发给我。','Шартты маған жіберіңізші.','Отправьте мне договор, пожалуйста.'],
    ['请发一份报价。','Баға ұсынысын жіберіңізші.','Пришлите коммерческое предложение, пожалуйста.'],
    ['我们明天再讨论。','Ертең қайта талқылаймыз.','Обсудим завтра.']
  ]
};

const sceneTestInfo = {
  taxi:{title:'打车场景考试'}, rent:{title:'租房场景考试'}, bank:{title:'银行场景考试'},
  restaurant:{title:'餐厅场景考试'}, factory:{title:'工厂场景考试'}, rail:{title:'铁路场景考试'},
  customs:{title:'海关场景考试'}, business:{title:'商务场景考试'}
};

function readCompleted(){
  try { return JSON.parse(localStorage.getItem('completedLessons') || '[]'); } catch { return []; }
}
let completed = readCompleted();

function courseLessons(id){
  return lessons.filter(l => l.course === id);
}
function sceneLessons(type, sceneId){
  if(sceneId){ const exact=lessons.filter(l=>l.id.startsWith(sceneId+'-')); if(exact.length) return exact; }
  if(type==='rail') return lessons.filter(l=>l.id.startsWith('rail-'));
  if(type==='log') return lessons.filter(l=>l.id.startsWith('log-'));
  if(type==='factory') return lessons.filter(l=>l.id.startsWith('factory-'));
  if(type==='sales') return lessons.filter(l=>l.id.startsWith('sales-'));
  if(type==='office') return lessons.filter(l=>l.id.startsWith('office-'));
  if(type==='security') return lessons.filter(l=>l.id.startsWith('security-'));
  if(type==='engineering') return lessons.filter(l=>l.id.startsWith('engineering-'));
  if(type==='customs') return lessons.filter(l=>false);
  if(type==='store') return lessons.filter(l=>l.id.startsWith('store-'));
  if(type==='pharmacy') return lessons.filter(l=>l.id.startsWith('pharmacy-'));
  return lessons.filter(l=>l.course==='daily-kz');
}
function percentFor(pool){ return pool.length ? Math.round(pool.filter(l=>completed.includes(l.id)).length/pool.length*100) : 0; }
function saveCompleted(){ localStorage.setItem('completedLessons', JSON.stringify(completed)); }

function isTargetScript(text){return /[А-Яа-яӘәӨөҮүҰұҚқҒғҢңІіҺһЁёЫыЭэЮюЯя]/.test(text||'');}

function speak(text, lang){
  if(!('speechSynthesis' in window)){ alert('当前浏览器不支持语音朗读。'); return; }
  window.speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); u.lang=lang; u.rate=0.88; window.speechSynthesis.speak(u);
}

function courseById(id){ return courses.find(c=>c.id===id); }
function qs(name){ return new URLSearchParams(location.search).get(name); }
function go(url){ location.href = url; }

function bindSounds(){
  document.addEventListener('click', e=>{
    const btn=e.target.closest('[data-text]');
    if(btn) speak(btn.dataset.text, btn.dataset.lang);
  });
}

function renderSceneList(){
  const grid=document.getElementById('sceneGrid'); if(!grid) return;
  const group=(title,sub,items)=>`<section class="scene-group"><div class="scene-group-head"><div><span class="eyebrow">${title==='生活场景'?'LIFE':'WORK'}</span><h2>${title}</h2></div><p>${sub}</p></div><div class="scene-grid">${items.map(s=>`<a class="scene scene-link" href="scene.html?id=${s.id}"><div><div class="scene-icon">${s.icon}</div><h3>${s.title}</h3><p>${s.desc}</p></div><div class="tagline">练习 → <span class="test-pill">场景小测</span></div></a>`).join('')}</div></section>`;
  const life=scenes.filter(s=>s.category==='life'),work=scenes.filter(s=>s.category==='work');
  grid.outerHTML=group('生活场景','先学在哈萨克斯坦生活时最常遇到的表达。',life)+group('工作场景','再按岗位和现场分类学习：工厂、物流、铁路、销售、办公室、安保、工程等。',work);
}

function renderHome(){
  const cg=document.getElementById('courseGrid');
  if(cg){
    cg.innerHTML=courses.map(c=>{const p=percentFor(courseLessons(c.id)); return `<a class="course course-link" href="course.html?id=${c.id}"><div class="course-icon">${c.icon}</div><h3>${c.title}</h3><p>${c.desc}</p><div class="bar"><i style="width:${p}%"></i></div><div class="meta"><span>${courseLessons(c.id).length} 课</span><span>${p}%</span></div></a>`}).join('');
  }
  const sg=document.getElementById('sceneGrid');
  if(sg){
    sg.innerHTML=scenes.map(s=>`<a class="scene scene-link" href="scene.html?id=${s.id}"><div><div class="scene-icon">${s.icon}</div><h3>${s.title}</h3><p>${s.desc}</p></div><div class="tagline">练习 → <span class="test-pill">小测</span></div></a>`).join('');
  }
  const overall=document.getElementById('progressText'); if(overall) overall.textContent=percentFor(lessons)+'%';
}

function renderCoursePage(){
  const id=qs('id') || 'daily-kz'; const c=courseById(id) || courses[0];
  document.title = `${c.title}｜中亚语言通`;
  const title=document.getElementById('courseTitle'); if(title) title.textContent=c.title;
  const desc=document.getElementById('courseDesc'); if(desc) desc.textContent=c.desc;
  const list=document.getElementById('lessonList');
  const pool=courseLessons(c.id);
  const detailLead=document.querySelector('.course-detail');
  if(detailLead){
    const intro=document.getElementById('courseIntroNote');
    if(intro && c.kind==='sentence') intro.textContent='正式语法路线：和“零基础·字母与发音”分开，不重复教字母。按体系学习人称、名词性谓语、否定、疑问、所属、存在句、地点与方向、动词时态、情态表达、连接句，再进入组句、翻译和独立造句。';
    if(intro && c.kind==='speaking') intro.textContent='零基础口语路线：不要求先学完整语法，从“我、你、他”开始，先把短句说出来，再逐步扩展到提问、回应、请求、时间和生活/工作场景。';
  }
  if(list){
    let lastGroup='';
    list.forEach(l=>{});
    list.innerHTML=pool.map((l,i)=>{
      const group=l.group&&l.group!==lastGroup ? (lastGroup=l.group, `<div class="course-group-label">${l.group}</div>`) : '';
      const target = c.targetLang==='kk' ? l.kz : c.targetLang==='ru' ? l.ru : (l.kz||l.ru);
      return `${group}<a class="list-item" href="learn.html?pool=course&id=${encodeURIComponent(c.id)}&start=${i}"><span class="num">${String(i+1).padStart(2,'0')}</span><span><strong>${l.title}</strong><small>${l.cn}${target?` · ${target}`:''}</small></span><span class="arrow">→</span></a>`;
    }).join('');
  }
  const pct=document.getElementById('courseProgress'); if(pct) pct.textContent=percentFor(pool)+'%';
  const start=document.getElementById('courseStart'); if(start) start.href=`learn.html?pool=course&id=${encodeURIComponent(c.id)}&start=0`;
}

function sceneById(id){ return scenes.find(s=>s.id===id); }
function bestScoreForScene(id){ return Number(localStorage.getItem(`sceneBest:${id}`) || 0); }

function renderScenePage(){
  const sceneId=qs('id');
  let scene=sceneById(sceneId);
  if(!scene){
    const type=qs('type') || 'rail';
    scene=scenes.find(s=>s.type===type) || scenes[0];
  }
  const titleText=scene.title+'场景';
  document.title = `${titleText}｜中亚语言通`;
  document.getElementById('sceneTitle').textContent=titleText;
  document.getElementById('sceneDesc').textContent=scene.desc;
  const pool=sceneLessons(scene.type, scene.id);
  const list=document.getElementById('sceneLessonList');
  list.innerHTML=pool.map((l,i)=>`<a class="list-item" href="learn.html?pool=scene&scene=${encodeURIComponent(scene.id)}&type=${encodeURIComponent(scene.type)}&start=${i}"><span class="num">${String(i+1).padStart(2,'0')}</span><span><strong>${l.title}</strong><small>${l.cn}</small></span><span class="arrow">→</span></a>`).join('');
  document.getElementById('sceneCount').textContent=`${pool.length} 句`;
  document.getElementById('sceneStart').href=`learn.html?pool=scene&scene=${encodeURIComponent(scene.id)}&type=${encodeURIComponent(scene.type)}&start=0`;
  const testLink=document.getElementById('sceneTest'); if(testLink) testLink.href=`test.html?scene=${encodeURIComponent(scene.id)}`;
  const best=document.getElementById('sceneBest');
  if(best){ const b=bestScoreForScene(scene.id); best.textContent=b?`最佳成绩：${b}%`:'最佳成绩：未参加'; }
}

function renderLearnPage(){
  let pool=[]; let label='学习';
  if(qs('pool')==='scene'){ pool=sceneLessons(qs('type')||'daily-kz'); label='场景练习'; }
  else { const c=courseById(qs('id')||'daily-kz')||courses[0]; pool=courseLessons(c.id); label=c.title; }
  const courseForLearn=qs('pool')==='scene' ? null : (courseById(qs('id')||'daily-kz')||courses[0]);
  let current=Math.max(0,Math.min(Number(qs('start')||0),pool.length-1));
  const title=document.getElementById('learnTitle'); const count=document.getElementById('learnCount'); const cn=document.getElementById('learnCn'); const kz=document.getElementById('learnKz'); const ru=document.getElementById('learnRu'); const tip=document.getElementById('learnTip'); const grammar=document.getElementById('learnGrammar'); const tag=document.getElementById('learnTag'); const path=document.getElementById('learnPath');
  const kzRow=document.getElementById('learnKzRow'), ruRow=document.getElementById('learnRuRow');
  if(courseForLearn?.kind==='sentence' || courseForLearn?.kind==='speaking'){
    if(kzRow) kzRow.style.display=courseForLearn.targetLang==='kk'?'flex':'none';
    if(ruRow) ruRow.style.display=courseForLearn.targetLang==='ru'?'flex':'none';
    const side=document.getElementById('learnModeNote'); if(side) side.textContent=courseForLearn.kind==='speaking' ? (courseForLearn.targetLang==='kk'?'目标语言：哈萨克语。零基础直接从“我、你、他”开始说。':'目标语言：俄语。零基础直接从“我、你、他”开始说。') : (courseForLearn.targetLang==='kk'?'目标语言：哈萨克语。按语法体系从“我、你、他”开始。':'目标语言：俄语。按语法体系从“我、你、他”开始。');
  } else { if(kzRow) kzRow.style.display='flex'; if(ruRow) ruRow.style.display='flex'; }
  function draw(){
    const l=pool[current]; if(!l) return;
    title.textContent=l.title; count.textContent=`${current+1} / ${pool.length}`; cn.textContent=l.cn; kz.textContent=l.kz; ru.textContent=l.ru; tip.textContent=l.tip; if(grammar) grammar.textContent=l.group ? `语法模块：${l.group}` : ''; tag.textContent=l.tag; path.textContent=`当前内容：${label}`;
    document.getElementById('prevLink').href = learnUrl(current-1<0?pool.length-1:current-1);
    document.getElementById('nextLink').href = learnUrl((current+1)%pool.length);
    document.getElementById('markBtn').textContent = completed.includes(l.id) ? '已记住 ✓' : '记住了，下一句';
    document.getElementById('nextLink').onclick=()=>{ if(!completed.includes(l.id)){completed.push(l.id);saveCompleted();} };
    document.title=`${l.title}｜${label}｜中亚语言通`;
  }
  function learnUrl(i){
    if(qs('pool')==='scene') return `learn.html?pool=scene&scene=${encodeURIComponent(qs('scene')||'')}&type=${encodeURIComponent(qs('type')||'daily-kz')}&start=${i}`;
    return `learn.html?pool=course&id=${encodeURIComponent(qs('id')||'daily-kz')}&start=${i}`;
  }
  draw();
  bindSounds();
}

function buildTestQuestions(sceneId){
  const bank=sceneTestBank[sceneId] || sceneTestBank.rail;
  const shuffle=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
  return shuffle(bank).slice(0,5).map((row,idx)=>{
    const [cn,kz,ru]=row;
    if(idx%3===0){
      const distractors=shuffle(bank.filter(x=>x[0]!==cn)).slice(0,3).map(x=>x[1]);
      return {prompt:'下面哪一个是这句话的哈萨克语？',source:cn,answer:kz,options:shuffle([kz,...distractors]),lang:'kk-KZ'};
    }
    if(idx%3===1){
      const distractors=shuffle(bank.filter(x=>x[0]!==cn)).slice(0,3).map(x=>x[2]);
      return {prompt:'下面哪一个是这句话的俄语？',source:cn,answer:ru,options:shuffle([ru,...distractors]),lang:'ru-RU'};
    }
    const distractors=shuffle(bank.filter(x=>x[0]!==cn)).slice(0,3).map(x=>x[0]);
    return {prompt:'这句话是什么意思？',source:ru,answer:cn,options:shuffle([cn,...distractors]),lang:'ru-RU'};
  });
}

function renderTestPage(){
  const sceneId=qs('scene')||'rail';
  const scene=sceneById(sceneId)||scenes[0];
  document.getElementById('testTitle').textContent=scene.title+'场景考试';
  document.getElementById('testDesc').textContent=`${scene.desc} 每次考试 5 题，答对越多，成绩越高。`;
  document.title=`${scene.title}场景考试｜中亚语言通`;
  let questions=buildTestQuestions(scene.id), current=0, score=0, answered=false;
  const qNo=document.getElementById('qNo'), total=document.getElementById('qTotal'), prompt=document.getElementById('questionPrompt');
  const source=document.getElementById('questionSource'), optionsEl=document.getElementById('testOptions');
  const feedback=document.getElementById('testFeedback'), nextBtn=document.getElementById('nextQuestion'), progress=document.getElementById('testProgress');
  const result=document.getElementById('testResult'), main=document.getElementById('testMain');
  total.textContent=questions.length;
  function render(){
    const q=questions[current]; answered=false;
    qNo.textContent=current+1; prompt.textContent=q.prompt;
    const showSourceAudio=isTargetScript(q.source);
    source.style.display=showSourceAudio?'inline-flex':'none'; source.textContent=showSourceAudio?'🔊 听原句':''; source.dataset.text=showSourceAudio?q.source:''; source.dataset.lang=showSourceAudio?q.lang:'zh-CN';
    optionsEl.innerHTML=q.options.map((opt,i)=>`<button class="answer-option" data-answer-index="${i}"><span class="option-letter">${String.fromCharCode(65+i)}</span><span>${opt}</span>${isTargetScript(opt)?`<span class="option-audio" data-text="${opt.replace(/"/g,'&quot;')}" data-lang="${q.lang||'kk-KZ'}">🔊</span>`:''}</button>`).join('');
    feedback.className='test-feedback'; feedback.textContent=''; nextBtn.disabled=true; nextBtn.textContent=current===questions.length-1?'查看成绩':'下一题'; progress.style.width=`${Math.round((current/questions.length)*100)}%`;
    optionsEl.querySelectorAll('.option-audio').forEach(b=>b.onclick=e=>{e.stopPropagation();speak(b.dataset.text,b.dataset.lang)});
  }
  function choose(btn){
    if(answered)return; answered=true;
    const q=questions[current], value=q.options[Number(btn.dataset.answerIndex)], correct=value===q.answer;
    optionsEl.querySelectorAll('.answer-option').forEach(b=>{b.disabled=true; if(q.options[Number(b.dataset.answerIndex)]===q.answer)b.classList.add('correct');});
    if(correct){btn.classList.add('correct');score++;feedback.className='test-feedback ok';feedback.textContent='回答正确！';}
    else{btn.classList.add('wrong');feedback.className='test-feedback bad';feedback.textContent=`回答错误。正确答案：${q.answer}`;}
    nextBtn.disabled=false;
  }
  optionsEl.addEventListener('click',e=>{const b=e.target.closest('.answer-option');if(b)choose(b);});
  nextBtn.addEventListener('click',()=>{if(!answered)return;if(current<questions.length-1){current++;render();window.scrollTo({top:0,behavior:'smooth'});}else showResult();});
  function showResult(){
    const pct=Math.round(score/questions.length*100), best=Math.max(pct,bestScoreForScene(scene.id));
    localStorage.setItem(`sceneBest:${scene.id}`,String(best));
    main.classList.add('hidden'); result.classList.remove('hidden');
    document.getElementById('resultScore').textContent=`${pct}%`;
    document.getElementById('resultDetail').textContent=`答对 ${score} / ${questions.length} 题`;
    document.getElementById('resultMessage').textContent=pct>=80?'通过！继续学习下一组内容。':'还差一点，再试一次会更稳。';
    document.getElementById('resultRetry').onclick=()=>{questions=buildTestQuestions(scene.id);current=0;score=0;result.classList.add('hidden');main.classList.remove('hidden');render();window.scrollTo({top:0,behavior:'smooth'});};
    document.getElementById('resultBack').href=`scene.html?id=${scene.id}`;
  }
  render();
}

function init(){
  bindSounds();
  const page=document.body.dataset.page;
  if(page==='home') renderHome();
  if(page==='scene-list') renderSceneList();
  if(page==='course') renderCoursePage();
  if(page==='scene') renderScenePage();
  if(page==='learn') renderLearnPage();
  if(page==='test') renderTestPage();
  const reset=document.getElementById('resetProgress'); if(reset) reset.addEventListener('click',()=>{if(confirm('确定要清空本机学习进度吗？')){completed=[];localStorage.removeItem('completedLessons');location.reload();}});
}

document.addEventListener('DOMContentLoaded', init);
