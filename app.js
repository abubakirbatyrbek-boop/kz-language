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
  { id:'documents-01', course:'work-kz', title:'开付款发票', tag:'单据', level:'工作', cn:'请给我们开一张付款发票。', kz:'Бізге төлемге шот жазып беріңізші.', ru:'Выставьте нам, пожалуйста, счёт на оплату.', tip:'付款发票：俄语 счёт на оплату，哈语 төлемге шот。对方凭它付款。' },
  { id:'documents-02', course:'work-kz', title:'开税务发票', tag:'单据', level:'工作', cn:'请开具税务发票。', kz:'Шот-фактураны жазып беріңізші.', ru:'Выпишите, пожалуйста, счёт-фактуру.', tip:'税务发票：счёт-фактура / шот-фактура，用于增值税抵扣，和付款发票不是一回事。' },
  { id:'documents-03', course:'work-kz', title:'电子发票开了吗', tag:'单据', level:'工作', cn:'电子发票开了吗？', kz:'Электрондық шот-фактура жазылды ма?', ru:'Электронный счёт-фактура уже выписан?', tip:'哈萨克斯坦的税务发票必须在电子系统里开，俗称 ЭСФ（ЭШФ）。' },
  { id:'documents-04', course:'work-kz', title:'确认电子发票', tag:'单据', level:'工作', cn:'请在系统里确认电子发票。', kz:'Жүйеде электрондық шот-фактураны растаңызшы.', ru:'Подтвердите, пожалуйста, электронный счёт-фактуру в системе.', tip:'растаңызшы / подтвердите = 请确认。' },
  { id:'documents-05', course:'work-kz', title:'签完工单', tag:'单据', level:'工作', cn:'请签一下完工单。', kz:'Орындалған жұмыстар актісіне қол қойыңызшы.', ru:'Подпишите, пожалуйста, акт выполненных работ.', tip:'完工单：акт выполненных работ（常简称 АВР），哈语 орындалған жұмыстар актісі。' },
  { id:'documents-06', course:'work-kz', title:'完工单什么时候签', tag:'单据', level:'工作', cn:'完工单什么时候能签好？', kz:'Орындалған жұмыстар актісіне қашан қол қойылады?', ru:'Когда будет подписан акт выполненных работ?', tip:'催对方签单时用。' },
  { id:'documents-07', course:'work-kz', title:'发一下发货单', tag:'单据', level:'工作', cn:'请把发货单发给我。', kz:'Жүкқұжатты маған жіберіңізші.', ru:'Отправьте мне, пожалуйста, накладную.', tip:'发货单：накладная，哈语 жүкқұжат。' },
  { id:'documents-08', course:'work-kz', title:'发货单数量不对', tag:'单据', level:'工作', cn:'发货单上的数量不对。', kz:'Жүкқұжаттағы саны дұрыс емес.', ru:'В накладной неверное количество.', tip:'дұрыс емес / неверное = 不对、不正确。' },
  { id:'documents-09', course:'work-kz', title:'发一份商业报价', tag:'单据', level:'工作', cn:'请给我们发一份商业报价。', kz:'Бізге коммерциялық ұсыныс жіберіңізші.', ru:'Пришлите нам, пожалуйста, коммерческое предложение.', tip:'商业报价：коммерческое предложение（常简称 КП），哈语 коммерциялық ұсыныс。' },
  { id:'documents-10', course:'work-kz', title:'价格含增值税吗', tag:'单据', level:'工作', cn:'价格包含增值税吗？', kz:'Бағаға ҚҚС кіре ме?', ru:'Цена включает НДС?', tip:'增值税：俄语 НДС，哈语 ҚҚС。' },
  { id:'documents-11', course:'work-kz', title:'盖章签字', tag:'单据', level:'工作', cn:'请盖章并签字。', kz:'Мөр басып, қол қойыңызшы.', ru:'Поставьте, пожалуйста, печать и подпись.', tip:'мөр / печать = 公章，қол / подпись = 签字。' },
  { id:'documents-12', course:'work-kz', title:'发银行信息', tag:'单据', level:'工作', cn:'请把你们的银行信息发给我。', kz:'Банк деректемелеріңізді маған жіберіңізші.', ru:'Отправьте мне, пожалуйста, ваши банковские реквизиты.', tip:'银行信息（收款账户、公司税号 БИН 等）：реквизиты / деректемелер。' },
  { id:'business-01', course:'work-kz', title:'这个价格太高了', tag:'商务', level:'工作', cn:'这个价格太高了。', kz:'Бұл баға тым жоғары.', ru:'Эта цена слишком высокая.', tip:'谈价时使用。' },
  { id:'business-02', course:'work-kz', title:'我们什么时候开会', tag:'商务', level:'工作', cn:'我们什么时候开会？', kz:'Біз қашан жиналамыз?', ru:'Когда у нас будет совещание?', tip:'安排商务会议。' },
  { id:'business-03', course:'work-kz', title:'请把合同发给我', tag:'商务', level:'工作', cn:'请把合同发给我。', kz:'Шартты маған жіберіңізші.', ru:'Отправьте мне договор, пожалуйста.', tip:'合同文件往来。' },
  { id:'business-04', course:'work-kz', title:'请发一份报价', tag:'商务', level:'工作', cn:'请发一份报价。', kz:'Баға ұсынысын жіберіңізші.', ru:'Пришлите коммерческое предложение, пожалуйста.', tip:'索取商务报价。' },
  { id:'business-05', course:'work-kz', title:'我们明天再讨论', tag:'商务', level:'工作', cn:'我们明天再讨论。', kz:'Ертең қайта талқылаймыз.', ru:'Обсудим завтра.', tip:'结束当次讨论并约定后续。' },
  { id:"sentence-kz-pronoun-01", course:"sentence-kz", title:"我：Мен", tag:'语法与造句', level:'基础语法', cn:"我", kz:"Мен", ru:"", tip:"第一人称单数。先只记一个词：Мен = 我。先听发音，再跟读，再自己说一遍。", group:"人称代词" },
  { id:"sentence-kz-pronoun-02", course:"sentence-kz", title:"你：Сен", tag:'语法与造句', level:'基础语法', cn:"你", kz:"Сен", ru:"", tip:"第二人称单数。先只记一个词：Сен = 你。先听发音，再跟读，再自己说一遍。", group:"人称代词" },
  { id:"sentence-kz-pronoun-03", course:"sentence-kz", title:"他 / 她：Ол", tag:'语法与造句', level:'基础语法', cn:"他 / 她", kz:"Ол", ru:"", tip:"第三人称单数常用 Ол，可指男性或女性。先单独记住这个词。", group:"人称代词" },
  { id:"sentence-kz-pronoun-04", course:"sentence-kz", title:"我们：Біз", tag:'语法与造句', level:'基础语法', cn:"我们", kz:"Біз", ru:"", tip:"第一人称复数。Біз = 我们。先听、跟读，再脱离中文说一遍。", group:"人称代词" },
  { id:"sentence-kz-pronoun-05", course:"sentence-kz", title:"你们：Сендер", tag:'语法与造句', level:'基础语法', cn:"你们", kz:"Сендер", ru:"", tip:"第二人称复数。Сендер = 你们。先单独记熟，再进入句子。", group:"人称代词" },
  { id:"sentence-kz-pronoun-06", course:"sentence-kz", title:"他们：Олар", tag:'语法与造句', level:'基础语法', cn:"他们", kz:"Олар", ru:"", tip:"第三人称复数。Олар = 他们。先单独记词，再学习它在句子中的作用。", group:"人称代词" },
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
  { id:"sentence-ru-pronoun-01", course:"sentence-ru", title:"我：Я", tag:'语法与造句', level:'基础语法', cn:"我", kz:"", ru:"Я", tip:"第一人称单数。先只记一个词：Я = 我。先听发音，再跟读，再自己说一遍。", group:"人称代词" },
  { id:"sentence-ru-pronoun-02", course:"sentence-ru", title:"你：Ты", tag:'语法与造句', level:'基础语法', cn:"你", kz:"", ru:"Ты", tip:"第二人称单数。先只记一个词：Ты = 你。先听、跟读，再自己说一遍。", group:"人称代词" },
  { id:"sentence-ru-pronoun-03", course:"sentence-ru", title:"他：Он", tag:'语法与造句', level:'基础语法', cn:"他", kz:"", ru:"Он", tip:"第三人称阳性单数。Он = 他。先单独记熟词形和读音。", group:"人称代词" },
  { id:"sentence-ru-pronoun-04", course:"sentence-ru", title:"她：Она", tag:'语法与造句', level:'基础语法', cn:"她", kz:"", ru:"Она", tip:"第三人称阴性单数。Она = 她。俄语里要和“Он”分开记。", group:"人称代词" },
  { id:"sentence-ru-pronoun-05", course:"sentence-ru", title:"我们：Мы", tag:'语法与造句', level:'基础语法', cn:"我们", kz:"", ru:"Мы", tip:"第一人称复数。Мы = 我们。先单独掌握，再进入动词句。", group:"人称代词" },
  { id:"sentence-ru-pronoun-06", course:"sentence-ru", title:"你们 / 您：Вы", tag:'语法与造句', level:'基础语法', cn:"你们 / 您", kz:"", ru:"Вы", tip:"Вы 可表示复数“你们”，也可用于礼貌称呼“您”。先整体记住。", group:"人称代词" },
  { id:"sentence-ru-pronoun-07", course:"sentence-ru", title:"他们：Они", tag:'语法与造句', level:'基础语法', cn:"他们", kz:"", ru:"Они", tip:"第三人称复数。Они = 他们。先单独掌握，再进入复数句。", group:"人称代词" },
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
  {"id":"speaking-kz-01","course":"speaking-kz","title":"我想喝茶。","tag":"造句与口语","level":"零基础口语","cn":"我想喝茶。","kz":"Мен шай ішкім келеді.","ru":"","tip":"“我想做……”= 动词 + -ғым/-гім келеді。шай = 茶。先会这一句，就能开口提要求。","group":"口语起步"},
  {"id":"speaking-kz-02","course":"speaking-kz","title":"你想喝茶吗？","tag":"造句与口语","level":"零基础口语","cn":"你想喝茶吗？","kz":"Сен шай ішкің келе ме?","ru":"","tip":"问对方想不想：把 -ғым 换成 -ғың，句尾加 ме。","group":"口语起步"},
  {"id":"speaking-kz-03","course":"speaking-kz","title":"我想吃饭。","tag":"造句与口语","level":"零基础口语","cn":"我想吃饭。","kz":"Мен тамақ жегім келеді.","ru":"","tip":"тамақ = 饭、食物；же = 吃。同一个句型，只换动词。","group":"口语起步"},
  {"id":"speaking-kz-04","course":"speaking-kz","title":"你想去哪里？","tag":"造句与口语","level":"零基础口语","cn":"你想去哪里？","kz":"Сен қайда барғың келеді?","ru":"","tip":"қайда = 去哪里。问路、打车前先问对方。","group":"口语起步"},
  {"id":"speaking-kz-05","course":"speaking-kz","title":"我想睡觉。","tag":"造句与口语","level":"零基础口语","cn":"我想睡觉。","kz":"Мен ұйықтағым келеді.","ru":"","tip":"ұйықта = 睡觉。同一个句型，换一个动词。","group":"口语起步"},
  {"id":"speaking-kz-06","course":"speaking-kz","title":"我不想去。","tag":"造句与口语","level":"零基础口语","cn":"我不想去。","kz":"Мен барғым келмейді.","ru":"","tip":"否定：келеді → келмейді。“不想”就这样说。","group":"口语起步"},
  {"id":"speaking-kz-07","course":"speaking-kz","title":"我叫王明。","tag":"造句与口语","level":"零基础口语","cn":"我叫王明。","kz":"Менің атым Ван Мин.","ru":"","tip":"自我介绍：Менің атым + 名字。把“王明”换成你的名字。","group":"基础表达"},
  {"id":"speaking-kz-08","course":"speaking-kz","title":"你叫什么名字？","tag":"造句与口语","level":"零基础口语","cn":"你叫什么名字？","kz":"Сенің атың кім?","ru":"","tip":"问名字：атың кім？对长辈或正式场合说 Сіздің атыңыз кім?","group":"基础表达"},
  {"id":"speaking-kz-09","course":"speaking-kz","title":"他是我的同事。","tag":"造句与口语","level":"零基础口语","cn":"他是我的同事。","kz":"Ол менің әріптесім.","ru":"","tip":"把人称词放进真实表达。","group":"基础表达"},
  {"id":"speaking-kz-10","course":"speaking-kz","title":"我是新员工。","tag":"造句与口语","level":"零基础口语","cn":"我是新员工。","kz":"Мен жаңадан келген қызметкермін.","ru":"","tip":"工作场景自我介绍。","group":"基础表达"},
  {"id":"speaking-kz-11","course":"speaking-kz","title":"我在这里。","tag":"造句与口语","level":"零基础口语","cn":"我在这里。","kz":"Мен осындамын.","ru":"","tip":"表达所在位置。","group":"基础表达"},
  {"id":"speaking-kz-12","course":"speaking-kz","title":"很高兴认识你。","tag":"造句与口语","level":"零基础口语","cn":"很高兴认识你。","kz":"Танысқаныма қуаныштымын.","ru":"","tip":"认识新朋友、新同事时说。","group":"基础表达"},
  {"id":"speaking-kz-13","course":"speaking-kz","title":"他在办公室。","tag":"造句与口语","level":"零基础口语","cn":"他在办公室。","kz":"Ол кеңседе.","ru":"","tip":"描述别人所在地点。","group":"基础表达"},
  {"id":"speaking-kz-14","course":"speaking-kz","title":"我会说一点哈萨克语。","tag":"造句与口语","level":"零基础口语","cn":"我会说一点哈萨克语。","kz":"Мен қазақша аздап сөйлеймін.","ru":"","tip":"аздап = 一点点。对方说太快时，先让他知道你在学。","group":"基础表达"},
  {"id":"speaking-kz-15","course":"speaking-kz","title":"你会说中文吗？","tag":"造句与口语","level":"零基础口语","cn":"你会说中文吗？","kz":"Сен қытайша сөйлей аласың ба?","ru":"","tip":"-а аласың ба = 你会（能）……吗。","group":"基础表达"},
  {"id":"speaking-kz-16","course":"speaking-kz","title":"我在这里工作。","tag":"造句与口语","level":"零基础口语","cn":"我在这里工作。","kz":"Мен осында жұмыс істеймін.","ru":"","tip":"осында = 在这里。","group":"基础表达"},
  {"id":"speaking-kz-17","course":"speaking-kz","title":"这是我的手机。","tag":"造句与口语","level":"零基础口语","cn":"这是我的手机。","kz":"Бұл менің телефоным.","ru":"","tip":"指着物品开口说。","group":"基础表达"},
  {"id":"speaking-kz-18","course":"speaking-kz","title":"这个用哈萨克语怎么说？","tag":"造句与口语","level":"零基础口语","cn":"这个用哈萨克语怎么说？","kz":"Мұны қазақша қалай айтады?","ru":"","tip":"学习最有用的一句：指着东西问。","group":"基础表达"},
  {"id":"speaking-kz-19","course":"speaking-kz","title":"谁？","tag":"造句与口语","level":"零基础口语","cn":"谁？","kz":"Кім?","ru":"","tip":"问人。","group":"高频交流"},
  {"id":"speaking-kz-20","course":"speaking-kz","title":"什么？","tag":"造句与口语","level":"零基础口语","cn":"什么？","kz":"Не?","ru":"","tip":"问事物。","group":"高频交流"},
  {"id":"speaking-kz-21","course":"speaking-kz","title":"在哪里？","tag":"造句与口语","level":"零基础口语","cn":"在哪里？","kz":"Қай жерде?","ru":"","tip":"问地点。","group":"高频交流"},
  {"id":"speaking-kz-22","course":"speaking-kz","title":"我马上到。","tag":"造句与口语","level":"零基础口语","cn":"我马上到。","kz":"Мен қазір келемін.","ru":"","tip":"қазір = 现在、马上。约好见面时常用。","group":"高频交流"},
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
  {"id":"speaking-kz-33","course":"speaking-kz","title":"请稍等一下。","tag":"造句与口语","level":"零基础口语","cn":"请稍等一下。","kz":"Сәл күте тұрыңыз.","ru":"","tip":"сәл = 稍微；күте тұрыңыз = 请等一下。","group":"高频交流"},
  {"id":"speaking-kz-34","course":"speaking-kz","title":"我想休息。","tag":"造句与口语","level":"零基础口语","cn":"我想休息。","kz":"Мен демалғым келеді.","ru":"","tip":"демал = 休息。累了就这样说。","group":"高频交流"},
  {"id":"speaking-kz-35","course":"speaking-kz","title":"你想要什么？","tag":"造句与口语","level":"零基础口语","cn":"你想要什么？","kz":"Сен не қалайсың?","ru":"","tip":"не = 什么；қалайсың = 你想要。点餐、买东西时常听到。","group":"高频交流"},
  {"id":"speaking-kz-36","course":"speaking-kz","title":"我喜欢这个。","tag":"造句与口语","level":"零基础口语","cn":"我喜欢这个。","kz":"Маған бұл ұнайды.","ru":"","tip":"表达喜欢。","group":"实用场景"},
  {"id":"speaking-kz-37","course":"speaking-kz","title":"我不喜欢这个。","tag":"造句与口语","level":"零基础口语","cn":"我不喜欢这个。","kz":"Маған бұл ұнамайды.","ru":"","tip":"表达不喜欢。","group":"实用场景"},
  {"id":"speaking-kz-38","course":"speaking-kz","title":"太贵了。","tag":"造句与口语","level":"零基础口语","cn":"太贵了。","kz":"Бұл тым қымбат.","ru":"","tip":"тым = 太；қымбат = 贵。讲价时先说这一句。","group":"实用场景"},
  {"id":"speaking-kz-39","course":"speaking-kz","title":"什么时候？","tag":"造句与口语","level":"零基础口语","cn":"什么时候？","kz":"Қашан?","ru":"","tip":"问时间。","group":"实用场景"},
  {"id":"speaking-kz-40","course":"speaking-kz","title":"今天我没有时间。","tag":"造句与口语","level":"零基础口语","cn":"今天我没有时间。","kz":"Бүгін менің уақытым жоқ.","ru":"","tip":"жоқ = 没有。婉拒邀约时用。","group":"实用场景"},
  {"id":"speaking-kz-41","course":"speaking-kz","title":"明天我不来。","tag":"造句与口语","level":"零基础口语","cn":"明天我不来。","kz":"Мен ертең келмеймін.","ru":"","tip":"表达明天的计划。","group":"实用场景"},
  {"id":"speaking-kz-42","course":"speaking-kz","title":"现在可以吗？","tag":"造句与口语","level":"零基础口语","cn":"现在可以吗？","kz":"Қазір бола ма?","ru":"","tip":"询问现在是否可以。","group":"实用场景"},
  {"id":"speaking-kz-43","course":"speaking-kz","title":"这里可以坐吗？","tag":"造句与口语","level":"零基础口语","cn":"这里可以坐吗？","kz":"Бұл жерде отыруға бола ма?","ru":"","tip":"生活中的许可表达。","group":"实用场景"},
  {"id":"speaking-kz-44","course":"speaking-kz","title":"洗手间在哪里？","tag":"造句与口语","level":"零基础口语","cn":"洗手间在哪里？","kz":"Дәретхана қайда?","ru":"","tip":"дәретхана = 洗手间。","group":"实用场景"},
  {"id":"speaking-kz-45","course":"speaking-kz","title":"打车：请开慢一点。","tag":"造句与口语","level":"零基础口语","cn":"打车：请开慢一点。","kz":"Баяуырақ жүріңізші.","ru":"","tip":"баяуырақ = 慢一点；жүріңізші = 请开（车）。","group":"实用场景"},
  {"id":"speaking-kz-46","course":"speaking-kz","title":"商店：我要买这个。","tag":"造句与口语","level":"零基础口语","cn":"商店：我要买这个。","kz":"Мынаны сатып аламын.","ru":"","tip":"把口语带入购物。","group":"实用场景"},
  {"id":"speaking-kz-47","course":"speaking-kz","title":"餐厅：请给我菜单。","tag":"造句与口语","level":"零基础口语","cn":"餐厅：请给我菜单。","kz":"Мәзірді беріңізші.","ru":"","tip":"把口语带入餐厅。","group":"实用场景"},
  {"id":"speaking-kz-48","course":"speaking-kz","title":"办公室：我明天给你打电话。","tag":"造句与口语","level":"零基础口语","cn":"办公室：我明天给你打电话。","kz":"Мен саған ертең қоңырау шаламын.","ru":"","tip":"қоңырау шалу = 打电话。","group":"实用场景"},
  {"id":"speaking-kz-49","course":"speaking-kz","title":"物流：货物什么时候到？","tag":"造句与口语","level":"零基础口语","cn":"物流：货物什么时候到？","kz":"Жүк қашан келеді?","ru":"","tip":"把口语带入物流。","group":"实用场景"},
  {"id":"speaking-ru-01","course":"speaking-ru","title":"我想喝茶。","tag":"造句与口语","level":"零基础口语","cn":"我想喝茶。","kz":"","ru":"Я хочу чай.","tip":"хочу + 名词 = 我想要……。先会这一句，就能开口提要求。","group":"口语起步"},
  {"id":"speaking-ru-02","course":"speaking-ru","title":"你想喝茶吗？","tag":"造句与口语","level":"零基础口语","cn":"你想喝茶吗？","kz":"","ru":"Ты хочешь чай?","tip":"问对方：хочу 换成 хочешь，语调上扬就是问句。","group":"口语起步"},
  {"id":"speaking-ru-03","course":"speaking-ru","title":"我想吃饭。","tag":"造句与口语","level":"零基础口语","cn":"我想吃饭。","kz":"","ru":"Я хочу есть.","tip":"хочу + 动词原形。есть = 吃。","group":"口语起步"},
  {"id":"speaking-ru-04","course":"speaking-ru","title":"你想去哪里？","tag":"造句与口语","level":"零基础口语","cn":"你想去哪里？","kz":"","ru":"Куда ты хочешь пойти?","tip":"куда = 去哪里。问路、打车前先问对方。","group":"口语起步"},
  {"id":"speaking-ru-05","course":"speaking-ru","title":"我想睡觉。","tag":"造句与口语","level":"零基础口语","cn":"我想睡觉。","kz":"","ru":"Я хочу спать.","tip":"спать = 睡觉。同一个句型，换一个动词。","group":"口语起步"},
  {"id":"speaking-ru-06","course":"speaking-ru","title":"我不想去。","tag":"造句与口语","level":"零基础口语","cn":"我不想去。","kz":"","ru":"Я не хочу идти.","tip":"не хочу = 不想。","group":"口语起步"},
  {"id":"speaking-ru-07","course":"speaking-ru","title":"我叫王明。","tag":"造句与口语","level":"零基础口语","cn":"我叫王明。","kz":"","ru":"Меня зовут Ван Мин.","tip":"自我介绍：Меня зовут + 名字。把“王明”换成你的名字。","group":"基础表达"},
  {"id":"speaking-ru-08","course":"speaking-ru","title":"你叫什么名字？","tag":"造句与口语","level":"零基础口语","cn":"你叫什么名字？","kz":"","ru":"Как тебя зовут?","tip":"问名字。对长辈或正式场合说 Как вас зовут?","group":"基础表达"},
  {"id":"speaking-ru-09","course":"speaking-ru","title":"他是我的同事。","tag":"造句与口语","level":"零基础口语","cn":"他是我的同事。","kz":"","ru":"Он мой коллега.","tip":"把人称词放进真实表达。","group":"基础表达"},
  {"id":"speaking-ru-10","course":"speaking-ru","title":"我是新员工。","tag":"造句与口语","level":"零基础口语","cn":"我是新员工。","kz":"","ru":"Я новый сотрудник.","tip":"工作场景自我介绍。","group":"基础表达"},
  {"id":"speaking-ru-11","course":"speaking-ru","title":"我在这里。","tag":"造句与口语","level":"零基础口语","cn":"我在这里。","kz":"","ru":"Я здесь.","tip":"表达所在位置。","group":"基础表达"},
  {"id":"speaking-ru-12","course":"speaking-ru","title":"很高兴认识你。","tag":"造句与口语","level":"零基础口语","cn":"很高兴认识你。","kz":"","ru":"Приятно познакомиться.","tip":"认识新朋友、新同事时说。","group":"基础表达"},
  {"id":"speaking-ru-13","course":"speaking-ru","title":"他在办公室。","tag":"造句与口语","level":"零基础口语","cn":"他在办公室。","kz":"","ru":"Он в офисе.","tip":"描述别人所在地点。","group":"基础表达"},
  {"id":"speaking-ru-14","course":"speaking-ru","title":"我会说一点俄语。","tag":"造句与口语","level":"零基础口语","cn":"我会说一点俄语。","kz":"","ru":"Я немного говорю по-русски.","tip":"немного = 一点点。对方说太快时，先让他知道你在学。","group":"基础表达"},
  {"id":"speaking-ru-15","course":"speaking-ru","title":"你会说中文吗？","tag":"造句与口语","level":"零基础口语","cn":"你会说中文吗？","kz":"","ru":"Ты говоришь по-китайски?","tip":"по-китайски = 用中文。","group":"基础表达"},
  {"id":"speaking-ru-16","course":"speaking-ru","title":"我在这里工作。","tag":"造句与口语","level":"零基础口语","cn":"我在这里工作。","kz":"","ru":"Я работаю здесь.","tip":"здесь = 在这里。","group":"基础表达"},
  {"id":"speaking-ru-17","course":"speaking-ru","title":"这是我的手机。","tag":"造句与口语","level":"零基础口语","cn":"这是我的手机。","kz":"","ru":"Это мой телефон.","tip":"指着物品开口说。","group":"基础表达"},
  {"id":"speaking-ru-18","course":"speaking-ru","title":"这个用俄语怎么说？","tag":"造句与口语","level":"零基础口语","cn":"这个用俄语怎么说？","kz":"","ru":"Как это сказать по-русски?","tip":"学习最有用的一句：指着东西问。","group":"基础表达"},
  {"id":"speaking-ru-19","course":"speaking-ru","title":"谁？","tag":"造句与口语","level":"零基础口语","cn":"谁？","kz":"","ru":"Кто?","tip":"问人。","group":"高频交流"},
  {"id":"speaking-ru-20","course":"speaking-ru","title":"什么？","tag":"造句与口语","level":"零基础口语","cn":"什么？","kz":"","ru":"Что?","tip":"问事物。","group":"高频交流"},
  {"id":"speaking-ru-21","course":"speaking-ru","title":"在哪里？","tag":"造句与口语","level":"零基础口语","cn":"在哪里？","kz":"","ru":"Где?","tip":"问地点。","group":"高频交流"},
  {"id":"speaking-ru-22","course":"speaking-ru","title":"我马上到。","tag":"造句与口语","level":"零基础口语","cn":"我马上到。","kz":"","ru":"Я сейчас приду.","tip":"сейчас = 现在、马上。约好见面时常用。","group":"高频交流"},
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
  {"id":"speaking-ru-33","course":"speaking-ru","title":"请稍等一下。","tag":"造句与口语","level":"零基础口语","cn":"请稍等一下。","kz":"","ru":"Подождите немного.","tip":"подождите = 请等一下。","group":"高频交流"},
  {"id":"speaking-ru-34","course":"speaking-ru","title":"我想休息。","tag":"造句与口语","level":"零基础口语","cn":"我想休息。","kz":"","ru":"Я хочу отдохнуть.","tip":"отдохнуть = 休息。累了就这样说。","group":"高频交流"},
  {"id":"speaking-ru-35","course":"speaking-ru","title":"你想要什么？","tag":"造句与口语","level":"零基础口语","cn":"你想要什么？","kz":"","ru":"Что ты хочешь?","tip":"что = 什么。点餐、买东西时常听到。","group":"高频交流"},
  {"id":"speaking-ru-36","course":"speaking-ru","title":"我喜欢这个。","tag":"造句与口语","level":"零基础口语","cn":"我喜欢这个。","kz":"","ru":"Мне это нравится.","tip":"表达喜欢。","group":"实用场景"},
  {"id":"speaking-ru-37","course":"speaking-ru","title":"我不喜欢这个。","tag":"造句与口语","level":"零基础口语","cn":"我不喜欢这个。","kz":"","ru":"Мне это не нравится.","tip":"表达不喜欢。","group":"实用场景"},
  {"id":"speaking-ru-38","course":"speaking-ru","title":"太贵了。","tag":"造句与口语","level":"零基础口语","cn":"太贵了。","kz":"","ru":"Это слишком дорого.","tip":"слишком = 太；дорого = 贵。讲价时先说这一句。","group":"实用场景"},
  {"id":"speaking-ru-39","course":"speaking-ru","title":"什么时候？","tag":"造句与口语","level":"零基础口语","cn":"什么时候？","kz":"","ru":"Когда?","tip":"问时间。","group":"实用场景"},
  {"id":"speaking-ru-40","course":"speaking-ru","title":"今天我没有时间。","tag":"造句与口语","level":"零基础口语","cn":"今天我没有时间。","kz":"","ru":"Сегодня у меня нет времени.","tip":"нет времени = 没有时间。婉拒邀约时用。","group":"实用场景"},
  {"id":"speaking-ru-41","course":"speaking-ru","title":"明天我不来。","tag":"造句与口语","level":"零基础口语","cn":"明天我不来。","kz":"","ru":"Я завтра не приду.","tip":"表达明天的计划。","group":"实用场景"},
  {"id":"speaking-ru-42","course":"speaking-ru","title":"现在可以吗？","tag":"造句与口语","level":"零基础口语","cn":"现在可以吗？","kz":"","ru":"Можно сейчас?","tip":"询问现在是否可以。","group":"实用场景"},
  {"id":"speaking-ru-43","course":"speaking-ru","title":"这里可以坐吗？","tag":"造句与口语","level":"零基础口语","cn":"这里可以坐吗？","kz":"","ru":"Можно здесь сесть?","tip":"生活中的许可表达。","group":"实用场景"},
  {"id":"speaking-ru-44","course":"speaking-ru","title":"洗手间在哪里？","tag":"造句与口语","level":"零基础口语","cn":"洗手间在哪里？","kz":"","ru":"Где туалет?","tip":"туалет = 洗手间。","group":"实用场景"},
  {"id":"speaking-ru-45","course":"speaking-ru","title":"打车：请开慢一点。","tag":"造句与口语","level":"零基础口语","cn":"打车：请开慢一点。","kz":"","ru":"Езжайте помедленнее, пожалуйста.","tip":"помедленнее = 慢一点。","group":"实用场景"},
  {"id":"speaking-ru-46","course":"speaking-ru","title":"商店：我要买这个。","tag":"造句与口语","level":"零基础口语","cn":"商店：我要买这个。","kz":"","ru":"Я хочу купить это.","tip":"把口语带入购物。","group":"实用场景"},
  {"id":"speaking-ru-47","course":"speaking-ru","title":"餐厅：请给我菜单。","tag":"造句与口语","level":"零基础口语","cn":"餐厅：请给我菜单。","kz":"","ru":"Дайте меню, пожалуйста.","tip":"把口语带入餐厅。","group":"实用场景"},
  {"id":"speaking-ru-48","course":"speaking-ru","title":"办公室：我明天给你打电话。","tag":"造句与口语","level":"零基础口语","cn":"办公室：我明天给你打电话。","kz":"","ru":"Я позвоню тебе завтра.","tip":"позвонить = 打电话。","group":"实用场景"},
  {"id":"speaking-ru-49","course":"speaking-ru","title":"物流：货物什么时候到？","tag":"造句与口语","level":"零基础口语","cn":"物流：货物什么时候到？","kz":"","ru":"Когда прибудет груз?","tip":"把口语带入物流。","group":"实用场景"},
];

// “数字与情景对话” course: numbers, prices, time, and short two-person dialogues.
// drill: [[shown label, spoken word], ...] → "listen, pick the number" practice.
// turns: [[speaker, Chinese, target], ...] → dialogue lines; the last turn is the reply learners must understand.
const TALK_COURSE = {
  kk: [
    {g:'数字 0–10', cn:'1、2、3', drill:[['1','бір'],['2','екі'],['3','үш']], tip:'先会 1 到 3。'},
    {g:'数字 0–10', cn:'4、5、6', drill:[['4','төрт'],['5','бес'],['6','алты']], tip:'бес（5）和 бір（1）开头一样，注意听清。'},
    {g:'数字 0–10', cn:'7、8、9', drill:[['7','жеті'],['8','сегіз'],['9','тоғыз']], tip:'жеті（7）和 жетпіс（70）别混。'},
    {g:'数字 0–10', cn:'0 和 10', drill:[['0','нөл'],['10','он']], tip:'电话号码里常听到 нөл（0）。'},
    {g:'数字 0–10', cn:'我要两瓶水。', t:'Маған екі бөтелке су керек.', tip:'数字直接放在名词前面：екі бөтелке = 两瓶。'},
    {g:'大数字与价格', cn:'20、30、40、50', drill:[['20','жиырма'],['30','отыз'],['40','қырық'],['50','елу']], tip:'整十要单独记，没有规律。'},
    {g:'大数字与价格', cn:'60、70、80、90', drill:[['60','алпыс'],['70','жетпіс'],['80','сексен'],['90','тоқсан']], tip:'жетпіс（70）= жеті（7）变来的，好记。'},
    {g:'大数字与价格', cn:'100 和 1000', drill:[['100','жүз'],['1000','мың']], tip:'价格里最常听到的两个词。'},
    {g:'大数字与价格', cn:'15、25、48、250', drill:[['15','он бес'],['25','жиырма бес'],['48','қырық сегіз'],['250','екі жүз елу']], tip:'大数字按顺序拼：25 = 20 + 5 = жиырма бес。'},
    {g:'大数字与价格', cn:'问价', turns:[['A','多少钱？','Қанша тұрады?'],['B','两千五百坚戈。','Екі мың бес жүз теңге.']], tip:'2500 = екі мың（两千）+ бес жүз（五百）。重点是听懂对方报的价格。'},
    {g:'大数字与价格', cn:'讲价', turns:[['A','有点贵。一千五百行吗？','Қымбат екен. Бір мың бес жүзге бола ма?'],['B','好吧。','Жарайды.']], tip:'讲价：数字 + -ге/-ға бола ма？（……可以吗？）'},
    {g:'时间与日期', cn:'问时间', turns:[['A','现在几点？','Қазір сағат неше?'],['B','三点。','Сағат үш.']], tip:'сағат = 点钟。回答：сағат + 数字。'},
    {g:'时间与日期', cn:'我们十点见。', t:'Сағат онда кездесейік.', tip:'сағат онда = 在十点。'},
    {g:'时间与日期', cn:'星期一、二、三', drill:[['星期一','дүйсенбі'],['星期二','сейсенбі'],['星期三','сәрсенбі']], tip:'工作日安排、约时间都要用。'},
    {g:'时间与日期', cn:'星期四到星期日', drill:[['星期四','бейсенбі'],['星期五','жұма'],['星期六','сенбі'],['星期日','жексенбі']], tip:'жұма = 星期五，也是“主麻日”。'},
    {g:'时间与日期', cn:'问日期', turns:[['A','今天几号？','Бүгін нешесі?'],['B','今天五号。','Бүгін бесінші.']], tip:'日期用序数词：бес（5）→ бесінші（第五）。'},
    {g:'时间与日期', cn:'明天早上九点可以吗？', t:'Ертең таңғы сағат тоғызда бола ма?', tip:'таңғы = 早上的。约时间的完整句。'},
    {g:'对话：认识与寒暄', cn:'打招呼', turns:[['A','您好！','Сәлеметсіз бе!'],['B','您好！您好吗？','Сәлеметсіз бе! Қалыңыз қалай?'],['A','很好，谢谢。','Жақсы, рақмет.']], tip:'Қалыңыз қалай? = 您好吗？回答 Жақсы（好）。'},
    {g:'对话：认识与寒暄', cn:'问名字', turns:[['A','您叫什么名字？','Атыңыз кім?'],['B','我叫阿斯哈尔。您呢？','Менің атым Асқар. Ал сіздің?'],['A','我叫王明。','Менің атым Ван Мин.']], tip:'Ал сіздің? = 您呢？把问题抛回给对方。'},
    {g:'对话：认识与寒暄', cn:'问从哪里来', turns:[['A','您从哪里来？','Қайдан келдіңіз?'],['B','我从中国来。','Мен Қытайдан келдім.']], tip:'-дан/-дан = 从……。Қытайдан = 从中国。'},
    {g:'对话：认识与寒暄', cn:'问工作', turns:[['A','您在这里做什么工作？','Мұнда немен айналысасыз?'],['B','我是工程师。','Мен инженермін.']], tip:'职业 + -мін = 我是……。'},
    {g:'对话：购物与点餐', cn:'买东西', turns:[['A','这个多少钱？','Мынау қанша тұрады?'],['B','一千二百坚戈。','Бір мың екі жүз теңге.'],['A','我要这个。','Мынаны аламын.']], tip:'听懂价格后，用 Мынаны аламын 买下。'},
    {g:'对话：购物与点餐', cn:'问能否刷卡', turns:[['A','可以刷卡吗？','Картамен төлеуге бола ма?'],['B','不行，只收现金。','Жоқ, тек қолма-қол ақша.']], tip:'қолма-қол ақша = 现金。'},
    {g:'对话：购物与点餐', cn:'点餐', turns:[['A','您点什么？','Не тапсырыс бересіз?'],['B','一份抓饭和一杯茶。','Бір палау және бір шай.']], tip:'这里你是回答的一方：数字 + 菜名。'},
    {g:'对话：购物与点餐', cn:'结账', turns:[['A','请结账。','Есепті әкеліңізші.'],['B','一共三千坚戈。','Барлығы үш мың теңге.']], tip:'барлығы = 一共。'},
    {g:'对话：打车与问路', cn:'打车', turns:[['A','去哪里？','Қайда барасыз?'],['B','去火车站。','Вокзалға.'],['A','五百坚戈。','Бес жүз теңге.']], tip:'司机先问去哪里，再报价。'},
    {g:'对话：打车与问路', cn:'问路', turns:[['A','请问，银行在哪里？','Кешіріңіз, банк қайда?'],['B','一直走，然后左转。','Тура жүріңіз, содан кейін солға бұрылыңыз.']], tip:'тура = 直走；солға = 向左；оңға = 向右。'},
    {g:'对话：打车与问路', cn:'问远不远', turns:[['A','远吗？','Алыс па?'],['B','不远，走路五分钟。','Алыс емес, жаяу бес минут.']], tip:'жаяу = 步行。'},
    {g:'对话：打车与问路', cn:'下车付钱', turns:[['A','请在这里停。','Осы жерде тоқтаңызшы.'],['B','好的。','Жақсы.'],['A','给您一千，不用找了。','Мә, мың теңге, қайтарымы керек емес.']], tip:'қайтарым = 找零。'}
  ],
  ru: [
    {g:'数字 0–10', cn:'1、2、3', drill:[['1','один'],['2','два'],['3','три']], tip:'先会 1 到 3。'},
    {g:'数字 0–10', cn:'4、5、6', drill:[['4','четыре'],['5','пять'],['6','шесть']], tip:'пять（5）和 пятьдесят（50）别混。'},
    {g:'数字 0–10', cn:'7、8、9', drill:[['7','семь'],['8','восемь'],['9','девять']], tip:'семь（7）和 восемь（8）听起来接近，注意第一个音。'},
    {g:'数字 0–10', cn:'0 和 10', drill:[['0','ноль'],['10','десять']], tip:'电话号码里常听到 ноль（0）。'},
    {g:'数字 0–10', cn:'我要两瓶水。', t:'Мне нужно две бутылки воды.', tip:'два 在阴性名词前变成 две：две бутылки。'},
    {g:'大数字与价格', cn:'20、30、40、50', drill:[['20','двадцать'],['30','тридцать'],['40','сорок'],['50','пятьдесят']], tip:'сорок（40）没有规律，单独记。'},
    {g:'大数字与价格', cn:'60、70、80、90', drill:[['60','шестьдесят'],['70','семьдесят'],['80','восемьдесят'],['90','девяносто']], tip:'-десят = 十。девяносто（90）是例外。'},
    {g:'大数字与价格', cn:'100 和 1000', drill:[['100','сто'],['1000','тысяча']], tip:'价格里最常听到的两个词。'},
    {g:'大数字与价格', cn:'15、25、48、250', drill:[['15','пятнадцать'],['25','двадцать пять'],['48','сорок восемь'],['250','двести пятьдесят']], tip:'大数字按顺序拼：25 = 20 + 5 = двадцать пять。'},
    {g:'大数字与价格', cn:'问价', turns:[['A','多少钱？','Сколько стоит?'],['B','两千五百坚戈。','Две тысячи пятьсот тенге.']], tip:'2500 = две тысячи（两千）+ пятьсот（五百）。重点是听懂对方报的价格。'},
    {g:'大数字与价格', cn:'讲价', turns:[['A','有点贵。一千五百行吗？','Дорого. Можно за тысячу пятьсот?'],['B','好吧。','Хорошо.']], tip:'讲价：Можно за + 价格？（……可以吗？）'},
    {g:'时间与日期', cn:'问时间', turns:[['A','现在几点？','Который час?'],['B','三点。','Три часа.']], tip:'2–4 点说 часа，5 点以后说 часов。'},
    {g:'时间与日期', cn:'我们十点见。', t:'Встретимся в десять.', tip:'в + 数字 = 在……点。'},
    {g:'时间与日期', cn:'星期一、二、三', drill:[['星期一','понедельник'],['星期二','вторник'],['星期三','среда']], tip:'工作日安排、约时间都要用。'},
    {g:'时间与日期', cn:'星期四到星期日', drill:[['星期四','четверг'],['星期五','пятница'],['星期六','суббота'],['星期日','воскресенье']], tip:'выходные = 周末（星期六和星期日）。'},
    {g:'时间与日期', cn:'问日期', turns:[['A','今天几号？','Какое сегодня число?'],['B','今天五号。','Сегодня пятое.']], tip:'日期用序数词：пять（5）→ пятое（第五）。'},
    {g:'时间与日期', cn:'明天早上九点可以吗？', t:'Завтра в девять утра можно?', tip:'утра = 早上。约时间的完整句。'},
    {g:'对话：认识与寒暄', cn:'打招呼', turns:[['A','您好！','Здравствуйте!'],['B','您好！您好吗？','Здравствуйте! Как дела?'],['A','很好，谢谢。','Хорошо, спасибо.']], tip:'Как дела? = 你好吗？回答 Хорошо（好）。'},
    {g:'对话：认识与寒暄', cn:'问名字', turns:[['A','您叫什么名字？','Как вас зовут?'],['B','我叫阿斯哈尔。您呢？','Меня зовут Аскар. А вас?'],['A','我叫王明。','Меня зовут Ван Мин.']], tip:'А вас? = 您呢？把问题抛回给对方。'},
    {g:'对话：认识与寒暄', cn:'问从哪里来', turns:[['A','您从哪里来？','Откуда вы?'],['B','我从中国来。','Я из Китая.']], tip:'из + 国家 = 来自……。'},
    {g:'对话：认识与寒暄', cn:'问工作', turns:[['A','您做什么工作？','Кем вы работаете?'],['B','我是工程师。','Я инженер.']], tip:'俄语现在时不用“是”：Я инженер = 我是工程师。'},
    {g:'对话：购物与点餐', cn:'买东西', turns:[['A','这个多少钱？','Сколько это стоит?'],['B','一千二百坚戈。','Тысяча двести тенге.'],['A','我要这个。','Я возьму это.']], tip:'听懂价格后，用 Я возьму это 买下。'},
    {g:'对话：购物与点餐', cn:'问能否刷卡', turns:[['A','可以刷卡吗？','Можно оплатить картой?'],['B','不行，只收现金。','Нет, только наличными.']], tip:'наличными = 用现金。'},
    {g:'对话：购物与点餐', cn:'点餐', turns:[['A','您点什么？','Что будете заказывать?'],['B','一份抓饭和一杯茶。','Один плов и один чай.']], tip:'这里你是回答的一方：数字 + 菜名。'},
    {g:'对话：购物与点餐', cn:'结账', turns:[['A','请结账。','Счёт, пожалуйста.'],['B','一共三千坚戈。','Всего три тысячи тенге.']], tip:'всего = 一共。'},
    {g:'对话：打车与问路', cn:'打车', turns:[['A','去哪里？','Куда едем?'],['B','去火车站。','На вокзал.'],['A','五百坚戈。','Пятьсот тенге.']], tip:'司机先问去哪里，再报价。'},
    {g:'对话：打车与问路', cn:'问路', turns:[['A','请问，银行在哪里？','Извините, где банк?'],['B','一直走，然后左转。','Идите прямо, потом поверните налево.']], tip:'прямо = 直走；налево = 向左；направо = 向右。'},
    {g:'对话：打车与问路', cn:'问远不远', turns:[['A','远吗？','Это далеко?'],['B','不远，走路五分钟。','Недалеко, пять минут пешком.']], tip:'пешком = 步行。'},
    {g:'对话：打车与问路', cn:'下车付钱', turns:[['A','请在这里停。','Остановите здесь, пожалуйста.'],['B','好的。','Хорошо.'],['A','给您一千，不用找了。','Вот тысяча, сдачи не надо.']], tip:'сдача = 找零。'}
  ]
};
// “主题词汇与换词造句”: 20 themes × 30 words ("中文|哈萨克语|俄语"), taught 6 per lesson,
// plus one substitution-drill lesson per theme (a sentence frame + words that fit its gap).
const VOCAB_THEMES = [
  {g:'家庭与人', w:'家庭|отбасы|семья;父亲|әке|отец;母亲|ана|мать;儿子|ұл|сын;女儿|қыз|дочь;哥哥|аға|старший брат;弟弟|іні|младший брат;姐姐|әпке|старшая сестра;妹妹|сіңлі|младшая сестра;丈夫|күйеу|муж;妻子|әйел|жена;孩子|бала|ребёнок;爷爷|ата|дедушка;奶奶|әже|бабушка;亲戚|туыс|родственник;父母|ата-ана|родители;朋友|дос|друг;邻居|көрші|сосед;客人|қонақ|гость;孙子|немере|внук;男人|ер адам|мужчина;女人|әйел адам|женщина;男孩|ұл бала|мальчик;女孩|қыз бала|девочка;老人|қария|пожилой человек;年轻人|жастар|молодёжь;名字|ат|имя;年龄|жас|возраст;婚礼|үйлену тойы|свадьба;家|үй|дом',
    swap:{cn:['这是我的','。'], kk:['Бұл менің ','.'], ru:['Это ','.'], items:[['父亲','әкем','мой отец'],['母亲','анам','моя мама'],['儿子','ұлым','мой сын'],['女儿','қызым','моя дочь'],['朋友','досым','мой друг']]}},
  {g:'身体与健康', w:'头|бас|голова;眼睛|көз|глаз;耳朵|құлақ|ухо;鼻子|мұрын|нос;嘴|ауыз|рот;牙齿|тіс|зуб;脸|бет|лицо;头发|шаш|волосы;脖子|мойын|шея;手|қол|рука;脚|аяқ|нога;手指|саусақ|палец;背|арқа|спина;肚子|іш|живот;心脏|жүрек|сердце;血|қан|кровь;皮肤|тері|кожа;医生|дәрігер|врач;医院|аурухана|больница;药|дәрі|лекарство;药店|дәріхана|аптека;病|ауру|болезнь;疼痛|ауырсыну|боль;体温|дене қызуы|температура;感冒|тұмау|простуда;咳嗽|жөтел|кашель;健康|денсаулық|здоровье;病人|науқас|больной;急救车|жедел жәрдем|скорая помощь;牙医|тіс дәрігері|стоматолог',
    swap:{cn:['我','疼。'], kk:['Менің ',' ауырады.'], ru:['У меня болит ','.'], items:[['头','басым','голова'],['牙','тісім','зуб'],['肚子','ішім','живот'],['背','арқам','спина'],['脚','аяғым','нога']]}},
  {g:'食物', w:'饭菜|тамақ|еда;面包|нан|хлеб;肉|ет|мясо;牛肉|сиыр еті|говядина;羊肉|қой еті|баранина;鸡肉|тауық еті|курица;马肉|жылқы еті|конина;鱼|балық|рыба;鸡蛋|жұмыртқа|яйцо;米饭|күріш|рис;面条|кеспе|лапша;汤|сорпа|суп;盐|тұз|соль;糖|қант|сахар;黄油|сары май|сливочное масло;奶酪|ірімшік|сыр;抓饭|палау|плов;烤包子|самса|самса;饺子|тұшпара|пельмени;早饭|таңғы ас|завтрак;午饭|түскі ас|обед;晚饭|кешкі ас|ужин;菜单|мәзір|меню;餐厅|мейрамхана|ресторан;咖啡馆|кафе|кафе;服务员|даяшы|официант;好吃的|дәмді|вкусный;甜的|тәтті|сладкий;辣的|ащы|острый;饿|аш|голодный',
    swap:{cn:['请给我','。'], kk:['Маған ',' беріңізші.'], ru:['Дайте мне, пожалуйста, ','.'], items:[['面包','нан','хлеб'],['肉','ет','мясо'],['鱼','балық','рыбу'],['米饭','күріш','рис'],['抓饭','палау','плов']]}},
  {g:'饮料、水果和蔬菜', w:'水|су|вода;茶|шай|чай;咖啡|кофе|кофе;牛奶|сүт|молоко;果汁|шырын|сок;马奶|қымыз|кумыс;骆驼奶|шұбат|шубат;啤酒|сыра|пиво;杯子|кесе|чашка;瓶子|бөтелке|бутылка;苹果|алма|яблоко;梨|алмұрт|груша;葡萄|жүзім|виноград;西瓜|қарбыз|арбуз;甜瓜|қауын|дыня;香蕉|банан|банан;橙子|апельсин|апельсин;柠檬|лимон|лимон;杏|өрік|абрикос;土豆|картоп|картофель;洋葱|пияз|лук;胡萝卜|сәбіз|морковь;西红柿|қызанақ|помидор;黄瓜|қияр|огурец;白菜|қырыққабат|капуста;大蒜|сарымсақ|чеснок;蔬菜|көкөніс|овощи;水果|жеміс|фрукты;冷水|суық су|холодная вода;热茶|ыстық шай|горячий чай',
    swap:{cn:['我想喝','。'], kk:['Мен ',' ішкім келеді.'], ru:['Я хочу выпить ','.'], items:[['水','су','воды'],['茶','шай','чаю'],['咖啡','кофе','кофе'],['牛奶','сүт','молока'],['果汁','шырын','сока']]}},
  {g:'颜色与衣服', w:'红色|қызыл|красный;蓝色|көк|синий;绿色|жасыл|зелёный;黄色|сары|жёлтый;白色|ақ|белый;黑色|қара|чёрный;灰色|сұр|серый;棕色|қоңыр|коричневый;衣服|киім|одежда;衬衫|көйлек|рубашка;裤子|шалбар|брюки;裙子|юбка|юбка;外套|күрте|куртка;大衣|пальто|пальто;鞋|аяқ киім|обувь;靴子|етік|сапоги;帽子|бас киім|шапка;袜子|шұлық|носки;手套|қолғап|перчатки;围巾|шарф|шарф;包|сөмке|сумка;口袋|қалта|карман;眼镜|көзілдірік|очки;手表|сағат|часы;尺码|өлшем|размер;大的|үлкен|большой;小的|кішкентай|маленький;新的|жаңа|новый;旧的|ескі|старый;贵的|қымбат|дорогой',
    swap:{cn:['我要','的。'], kk:['Маған ',' түстісі керек.'], ru:['Мне нужен ',' цвет.'], items:[['红色','қызыл','красный'],['蓝色','көк','синий'],['白色','ақ','белый'],['黑色','қара','чёрный'],['黄色','сары','жёлтый']]}},
  {g:'家与日用品', w:'公寓|пәтер|квартира;房间|бөлме|комната;厨房|ас үй|кухня;浴室|жуынатын бөлме|ванная;厕所|дәретхана|туалет;卧室|жатын бөлме|спальня;门|есік|дверь;窗户|терезе|окно;墙|қабырға|стена;地板|еден|пол;桌子|үстел|стол;椅子|орындық|стул;床|төсек|кровать;沙发|диван|диван;柜子|шкаф|шкаф;灯|шам|лампа;钥匙|кілт|ключ;电视|теледидар|телевизор;冰箱|тоңазытқыш|холодильник;洗衣机|кір жуғыш машина|стиральная машина;暖气|жылу|отопление;电|электр|электричество;热水|ыстық су|горячая вода;毛巾|орамал|полотенце;肥皂|сабын|мыло;被子|көрпе|одеяло;枕头|жастық|подушка;盘子|тәрелке|тарелка;勺子|қасық|ложка;刀|пышақ|нож',
    swap:{cn:['','坏了。'], kk:['',' істемейді.'], ru:['Не работает ','.'], items:[['灯','Шам','свет'],['冰箱','Тоңазытқыш','холодильник'],['电视','Теледидар','телевизор'],['洗衣机','Кір жуғыш машина','стиральная машина'],['空调','Кондиционер','кондиционер']]}},
  {g:'城市与地点', w:'城市|қала|город;村子|ауыл|деревня;街道|көше|улица;广场|алаң|площадь;公园|саябақ|парк;市场|базар|рынок;商店|дүкен|магазин;超市|супермаркет|супермаркет;银行|банк|банк;学校|мектеп|школа;大学|университет|университет;宾馆|қонақүй|гостиница;邮局|пошта|почта;警察局|полиция|полиция;火车站|вокзал|вокзал;机场|әуежай|аэропорт;公交车站|аялдама|остановка;办公室|кеңсе|офис;工厂|зауыт|завод;仓库|қойма|склад;清真寺|мешіт|мечеть;教堂|шіркеу|церковь;博物馆|мұражай|музей;剧院|театр|театр;电影院|кинотеатр|кинотеатр;桥|көпір|мост;河|өзен|река;大楼|ғимарат|здание;大使馆|елшілік|посольство;地址|мекенжай|адрес',
    swap:{cn:['请问，','在哪里？'], kk:['Кешіріңіз, ',' қайда?'], ru:['Извините, где ','?'], items:[['银行','банк','банк'],['市场','базар','рынок'],['商店','дүкен','магазин'],['公交车站','аялдама','остановка'],['邮局','пошта','почта']]}},
  {g:'交通与出行', w:'汽车|көлік|машина;出租车|такси|такси;公交车|автобус|автобус;地铁|метро|метро;火车|пойыз|поезд;飞机|ұшақ|самолёт;自行车|велосипед|велосипед;卡车|жүк көлігі|грузовик;司机|жүргізуші|водитель;乘客|жолаушы|пассажир;票|билет|билет;护照|төлқұжат|паспорт;签证|виза|виза;行李|жолжүк|багаж;路|жол|дорога;路口|қиылыс|перекрёсток;红绿灯|бағдаршам|светофор;停车场|тұрақ|парковка;加油站|жанармай бекеті|заправка;汽油|бензин|бензин;速度|жылдамдық|скорость;旅行|саяхат|путешествие;出发|жөнелу|отправление;到达|келу|прибытие;站台|перрон|перрон;座位|орын|место;时刻表|кесте|расписание;堵车|кептеліс|пробка;事故|апат|авария;边境|шекара|граница',
    swap:{cn:['我要一张去','的票。'], kk:['Маған ',' билет керек.'], ru:['Мне нужен билет до ','.'], items:[['阿拉木图','Алматыға','Алматы'],['阿斯塔纳','Астанаға','Астаны'],['奇姆肯特','Шымкентке','Шымкента'],['北京','Бейжіңге','Пекина'],['乌鲁木齐','Үрімжіге','Урумчи']]}},
  {g:'方向与位置', w:'左边|сол жақ|левая сторона;右边|оң жақ|правая сторона;前面|алдында|впереди;后面|артында|сзади;上面|үстінде|наверху;下面|астында|внизу;里面|ішінде|внутри;外面|сыртында|снаружи;旁边|жанында|рядом;中间|ортасында|посередине;对面|қарсысында|напротив;近|жақын|близко;远|алыс|далеко;这里|мұнда|здесь;那里|анда|там;东|шығыс|восток;西|батыс|запад;南|оңтүстік|юг;北|солтүстік|север;直走|тура|прямо;往左|солға|налево;往右|оңға|направо;往回|кері|назад;楼层|қабат|этаж;入口|кіреберіс|вход;出口|шығу жолы|выход;拐角|бұрыш|угол;地图|карта|карта;方向|бағыт|направление;距离|қашықтық|расстояние',
    swap:{cn:['药店在','。'], kk:['Дәріхана ','.'], ru:['Аптека ','.'], items:[['银行旁边','банктің жанында','рядом с банком'],['商店对面','дүкеннің қарсысында','напротив магазина'],['二楼','екінші қабатта','на втором этаже'],['街道左边','көшенің сол жағында','на левой стороне улицы'],['这里','осы жерде','здесь']]}},
  {g:'时间词', w:'时间|уақыт|время;小时|сағат|час;分钟|минут|минута;秒|секунд|секунда;天|күн|день;星期|апта|неделя;月|ай|месяц;年|жыл|год;今天|бүгін|сегодня;昨天|кеше|вчера;明天|ертең|завтра;后天|бүрсігүні|послезавтра;前天|алдыңғы күні|позавчера;早上|таңертең|утром;中午|түсте|днём;晚上|кешке|вечером;夜里|түнде|ночью;现在|қазір|сейчас;以前|бұрын|раньше;以后|кейін|потом;立刻|дереу|сразу;早|ерте|рано;晚|кеш|поздно;每天|күнде|каждый день;周末|демалыс күндері|выходные;假期|демалыс|отпуск;节日|мереке|праздник;生日|туған күн|день рождения;新年|жаңа жыл|Новый год;纳吾肉孜节|Наурыз|Наурыз',
    swap:{cn:['我','工作。'], kk:['Мен ',' жұмыс істеймін.'], ru:['',' я работаю.'], items:[['今天','бүгін','Сегодня'],['明天','ертең','Завтра'],['早上','таңертең','Утром'],['晚上','кешке','Вечером'],['每天','күнде','Каждый день']]}},
  {g:'天气与季节', w:'天气|ауа райы|погода;太阳|күн|солнце;云|бұлт|облако;雨|жаңбыр|дождь;雪|қар|снег;风|жел|ветер;雾|тұман|туман;冰|мұз|лёд;雷雨|найзағай|гроза;温度|температура|температура;度|градус|градус;冷|суық|холодно;热|ыстық|жарко;暖和|жылы|тепло;凉快|салқын|прохладно;晴朗|ашық|ясно;阴天|бұлтты|облачно;下雨|жаңбыр жауады|идёт дождь;下雪|қар жауады|идёт снег;季节|жыл мезгілі|время года;春天|көктем|весна;夏天|жаз|лето;秋天|күз|осень;冬天|қыс|зима;天空|аспан|небо;空气|ауа|воздух;潮湿|дымқыл|влажно;干燥|құрғақ|сухо;零下|нөлден төмен|ниже нуля;天气预报|ауа райы болжамы|прогноз погоды',
    swap:{cn:['今天','。'], kk:['Бүгін ','.'], ru:['Сегодня ','.'], items:[['冷','суық','холодно'],['热','ыстық','жарко'],['暖和','жылы','тепло'],['凉快','салқын','прохладно'],['阴天','бұлтты','облачно']]}},
  {g:'自然与动物', w:'山|тау|гора;湖|көл|озеро;海|теңіз|море;草原|дала|степь;沙漠|шөл|пустыня;森林|орман|лес;树|ағаш|дерево;花|гүл|цветок;草|шөп|трава;石头|тас|камень;土地|жер|земля;动物|жануар|животное;马|жылқы|лошадь;牛|сиыр|корова;羊|қой|овца;骆驼|түйе|верблюд;狗|ит|собака;猫|мысық|кошка;鸡|тауық|курица;鸟|құс|птица;狼|қасқыр|волк;熊|аю|медведь;狐狸|түлкі|лиса;兔子|қоян|заяц;金雕|бүркіт|беркут;蛇|жылан|змея;牧民|малшы|пастух;牲畜|мал|скот;星星|жұлдыз|звезда;岛|арал|остров',
    swap:{cn:['我看见了','。'], kk:['Мен ',' көрдім.'], ru:['Я видел ','.'], items:[['骆驼','түйе','верблюда'],['狼','қасқыр','волка'],['金雕','бүркіт','беркута'],['狐狸','түлкі','лису'],['兔子','қоян','зайца']]}},
  {g:'职业', w:'工作|жұмыс|работа;工人|жұмысшы|рабочий;工程师|инженер|инженер;老师|мұғалім|учитель;学生|студент|студент;护士|мейірбике|медсестра;警察|полицей|полицейский;律师|заңгер|юрист;会计|бухгалтер|бухгалтер;经理|менеджер|менеджер;领导|басшы|начальник;同事|әріптес|коллега;翻译|аудармашы|переводчик;厨师|аспаз|повар;企业家|кәсіпкер|предприниматель;售货员|сатушы|продавец;秘书|хатшы|секретарь;保安|күзетші|охранник;电工|электрик|электрик;焊工|дәнекерлеуші|сварщик;建筑工人|құрылысшы|строитель;农民|шаруа|фермер;程序员|бағдарламашы|программист;记者|журналист|журналист;设计师|дизайнер|дизайнер;工资|жалақы|зарплата;合同|келісімшарт|договор;面试|сұхбат|собеседование;经验|тәжірибе|опыт;职位|лауазым|должность',
    swap:{cn:['我是','。'], kk:['Мен ','.'], ru:['Я ','.'], items:[['工程师','инженермін','инженер'],['老师','мұғаліммін','учитель'],['翻译','аудармашымын','переводчик'],['会计','бухгалтермін','бухгалтер'],['厨师','аспазбын','повар']]}},
  {g:'办公与文件', w:'文件|құжат|документ;纸|қағаз|бумага;笔|қалам|ручка;铅笔|қарындаш|карандаш;电脑|компьютер|компьютер;打印机|принтер|принтер;电话|телефон|телефон;电子邮件|электрондық пошта|электронная почта;会议|жиналыс|совещание;报告|есеп|отчёт;签名|қолтаңба|подпись;公章|мөр|печать;表格|бланк|бланк;复印件|көшірме|копия;文件夹|папка|папка;计划|жоспар|план;问题|мәселе|проблема;任务|тапсырма|задание;期限|мерзім|срок;预算|бюджет|бюджет;税务发票|шот-фактура|счёт-фактура;收据|түбіртек|квитанция;公司|компания|компания;部门|бөлім|отдел;客户|клиент|клиент;合作伙伴|серіктес|партнёр;密码|құпиясөз|пароль;网络|интернет|интернет;通知|хабарландыру|объявление;出差|іссапар|командировка',
    swap:{cn:['请把','发给我。'], kk:['',' маған жіберіңізші.'], ru:['Отправьте мне, пожалуйста, ','.'], items:[['文件','Құжатты','документ'],['报告','Есепті','отчёт'],['发票','Шот-фактураны','счёт-фактуру'],['计划','Жоспарды','план'],['合同','Келісімшартты','договор']]}},
  {g:'工厂与工具', w:'设备|жабдық|оборудование;机床|станок|станок;工具|құрал|инструмент;锤子|балға|молоток;螺丝刀|бұрағыш|отвёртка;扳手|гайка кілті|гаечный ключ;钳子|қысқаш|плоскогубцы;钉子|шеге|гвоздь;螺丝|бұранда|винт;电线|сым|провод;管子|құбыр|труба;梯子|баспалдақ|лестница;安全帽|каска|каска;零件|бөлшек|деталь;材料|материал|материал;钢|болат|сталь;铁|темір|железо;油|май|масло;箱子|жәшік|ящик;生产|өндіріс|производство;质量|сапа|качество;安全|қауіпсіздік|безопасность;危险的|қауіпті|опасный;修理|жөндеу|ремонт;故障|ақау|неисправность;车间|цех|цех;班次|ауысым|смена;电机|қозғалтқыш|двигатель;测量|өлшеу|измерение;叉车|жүк тиегіш|погрузчик',
    swap:{cn:['请把','递给我。'], kk:['Маған ',' беріңізші.'], ru:['Дайте мне, пожалуйста, ','.'], items:[['锤子','балғаны','молоток'],['螺丝刀','бұрағышты','отвёртку'],['扳手','гайка кілтін','гаечный ключ'],['钳子','қысқашты','плоскогубцы'],['梯子','баспалдақты','лестницу']]}},
  {g:'购物与钱', w:'钱|ақша|деньги;坚戈|теңге|тенге;价格|баға|цена;便宜的|арзан|дешёвый;折扣|жеңілдік|скидка;现金|қолма-қол ақша|наличные;银行卡|банк картасы|банковская карта;找零|қайтарым|сдача;收银台|касса|касса;顾客|сатып алушы|покупатель;买卖|сауда|торговля;买|сатып алу|купить;卖|сату|продать;付钱|төлеу|платить;换货|ауыстыру|обменять;退货|қайтару|вернуть;公斤|келі|килограмм;克|грамм|грамм;升|литр|литр;件|дана|штука;一半|жартысы|половина;包装|орау|упаковка;袋子|пакет|пакет;小票|чек|чек;营业时间|жұмыс уақыты|часы работы;营业中|ашық|открыто;已关门|жабық|закрыто;排队|кезек|очередь;美元|доллар|доллар;礼物|сыйлық|подарок',
    swap:{cn:['请给我一公斤','。'], kk:['Маған бір келі ',' беріңізші.'], ru:['Дайте мне, пожалуйста, килограмм ','.'], items:[['苹果','алма','яблок'],['肉','ет','мяса'],['土豆','картоп','картошки'],['米','күріш','риса'],['糖','қант','сахара']]}},
  {g:'常用动词：日常', w:'去|бару|идти;来|келу|приходить;吃|жеу|есть;喝|ішу|пить;睡觉|ұйықтау|спать;起床|тұру|вставать;坐|отыру|сидеть;走路|жүру|ходить;跑|жүгіру|бегать;看见|көру|видеть;看|қарау|смотреть;听|тыңдау|слушать;说话|сөйлеу|говорить;读|оқу|читать;写|жазу|писать;洗|жуу|мыть;做饭|тамақ пісіру|готовить;打开|ашу|открывать;关上|жабу|закрывать;等|күту|ждать;休息|демалу|отдыхать;生活|өмір сүру|жить;玩|ойнау|играть;唱歌|ән айту|петь;笑|күлу|смеяться;哭|жылау|плакать;穿|кию|надевать;拿|алу|брать;给|беру|давать;找|іздеу|искать',
    swap:{cn:['我想','。'], kk:['Мен ',' келеді.'], ru:['Я хочу ','.'], items:[['睡觉','ұйықтағым','спать'],['休息','демалғым','отдохнуть'],['玩','ойнағым','играть'],['唱歌','ән айтқым','петь'],['做饭','тамақ пісіргім','готовить']]}},
  {g:'常用动词：工作与交流', w:'工作|жұмыс істеу|работать;学习|үйрену|учиться;教|үйрету|учить;知道|білу|знать;明白|түсіну|понимать;问|сұрау|спрашивать;回答|жауап беру|отвечать;帮助|көмектесу|помогать;打电话|қоңырау шалу|звонить;发送|жіберу|отправлять;收到|қабылдау|получать;开始|бастау|начинать;结束|аяқтау|заканчивать;检查|тексеру|проверять;决定|шешу|решать;同意|келісу|соглашаться;拒绝|бас тарту|отказываться;见面|кездесу|встречаться;认识|танысу|знакомиться;解释|түсіндіру|объяснять;翻译|аудару|переводить;签字|қол қою|подписывать;计算|есептеу|считать;准备|дайындау|подготовить;装货|тиеу|грузить;卸货|түсіру|разгружать;送达|жеткізу|доставлять;相信|сену|верить;喜欢|ұнату|любить;想|ойлау|думать',
    swap:{cn:['这个需要','。'], kk:['Мұны ',' керек.'], ru:['Это нужно ','.'], items:[['检查','тексеру','проверить'],['翻译','аудару','перевести'],['发送','жіберу','отправить'],['修理','жөндеу','починить'],['计算','есептеу','посчитать']]}},
  {g:'常用形容词', w:'好的|жақсы|хороший;坏的|жаман|плохой;高的|биік|высокий;矮的|аласа|низкий;长的|ұзын|длинный;短的|қысқа|короткий;快的|жылдам|быстрый;慢的|баяу|медленный;容易的|оңай|простой;难的|қиын|трудный;重的|ауыр|тяжёлый;轻的|жеңіл|лёгкий;干净的|таза|чистый;脏的|лас|грязный;满的|толық|полный;空的|бос|пустой;累的|шаршаған|уставший;高兴的|қуанышты|радостный;生气的|ашулы|сердитый;漂亮的|әдемі|красивый;聪明的|ақылды|умный;富的|бай|богатый;穷的|кедей|бедный;对的|дұрыс|правильный;错的|қате|неправильный;重要的|маңызды|важный;安静的|тыныш|тихий;吵的|шулы|шумный;新鲜的|балғын|свежий;免费的|тегін|бесплатный',
    swap:{cn:['这个很','。'], kk:['Бұл өте ','.'], ru:['Это очень ','.'], items:[['好','жақсы','хорошо'],['难','қиын','трудно'],['重','ауыр','тяжело'],['重要','маңызды','важно'],['漂亮','әдемі','красиво']]}},
  {g:'问词与连接词', w:'谁|кім|кто;什么|не|что;哪里|қайда|где;什么时候|қашан|когда;为什么|неге|почему;怎么|қалай|как;多少|қанша|сколько;哪个|қайсы|какой;那个|анау|тот;很|өте|очень;还|әлі|ещё;和|және|и;但是|бірақ|но;因为|себебі|потому что;所以|сондықтан|поэтому;如果|егер|если;或者|немесе|или;一起|бірге|вместе;只|тек|только;全部|бәрі|все;每个|әр|каждый;一些|біраз|немного;很多|көп|много;很少|аз|мало;再一次|тағы|ещё раз;当然|әрине|конечно;大约|шамамен|примерно;总是|әрқашан|всегда;从不|ешқашан|никогда;有时|кейде|иногда',
    swap:{cn:['你','来？'], kk:['Сен ',' келесің?'], ru:['',' ты придёшь?'], items:[['什么时候','қашан','Когда'],['几点','сағат нешеде','Во сколько'],['和谁','кіммен','С кем'],['从哪里','қайдан','Откуда'],['为什么','неге','Зачем']]}}
];
for (const [lang, key, suffix] of [['kk','kz','kz'],['ru','ru','ru']]) {
  let n = 0;
  const id = () => `vocab-${suffix}-${String(++n).padStart(3,'0')}`;
  const base = { course:`vocab-${suffix}`, tag:'主题词汇', level:'词汇', kz:'', ru:'' };
  VOCAB_THEMES.forEach(t => {
    const words = t.w.split(';').map(x => x.split('|')).map(([cn, kk, ru]) => [cn, lang==='kk' ? kk : ru]);
    for (let i = 0; i < words.length; i += 6) {
      const part = words.slice(i, i + 6);
      lessons.push({ ...base, id:id(), title:`${t.g} ${i/6 + 1}`, cn:`${t.g} ${i/6 + 1}`, [key]:part.map(w => w[1]).join(' · '),
        tip:'先逐个听，再跟读；练习里答错的词会单独进入错题复习。', group:t.g, drill:part });
    }
    const s = t.swap, frame = s[lang], items = s.items.map(x => [x[0], lang==='kk' ? x[1] : x[2]]);
    const sentence = w => frame[0] + w + frame[1], cnSentence = c => s.cn[0] + c + s.cn[1];
    lessons.push({ ...base, id:id(), title:`换词造句：${s.cn[0]}……${s.cn[1]}`, cn:`换词造句：${s.cn[0]}……${s.cn[1]}`,
      [key]:sentence(items[0][1]), tip:'同一个句型，只换中间的词，就能说出很多新句子。', group:t.g,
      swap:{ frame, cnFrame:s.cn, items, sentences:items.map(([c, w]) => [cnSentence(c), sentence(w)]) } });
  });
}
for (const [lang, key, suffix] of [['kk','kz','kz'],['ru','ru','ru']]) {
  TALK_COURSE[lang].forEach((x, i) => {
    // No "—" before dialogue lines: the Kazakh voice mis-reads the dash (verified by speech recognition).
    const target = x.t || (x.drill ? x.drill.map(d => d[1]).join(', ') : x.turns.map(t => t[2]).join(' '));
    const cn = x.turns ? x.cn + '（对话）' : x.cn; // dialogue lines are shown line by line in the dialogue panel
    lessons.push({ id:`talk-${suffix}-${String(i+1).padStart(2,'0')}`, course:`talk-${suffix}`, title:x.cn, tag:'数字与对话', level:'交流', cn,
      kz: key==='kz' ? target : '', ru: key==='ru' ? target : '', tip:x.tip, group:x.g, drill:x.drill||null, turns:x.turns||null });
  });
}

const courses = [
  { id:'daily-kz', icon:'🔤', title:'哈萨克语｜零基础·字母与发音', desc:'从 42 个字母、特殊音和拼读开始。先听、再读、再做辨音练习。', accent:'KZ', kind:'foundation', targetLang:'kk' },
  { id:'sentence-kz', icon:'📘', title:'哈萨克语｜基础语法课', desc:'把语法拆成最小单位：一个词、一个结构、一个例句。先单独学清楚，再组合成句子。', accent:'KZ', kind:'sentence', targetLang:'kk' },
  { id:'speaking-kz', icon:'💬', title:'哈萨克语｜零基础造句与口语', desc:'不背单词表，第一课就说整句：“我想喝茶”“你想去哪里？”。学会一个句型，换词就能说新句子。', accent:'KZ', kind:'speaking', targetLang:'kk' },
  { id:'daily-ru', icon:'🔤', title:'俄语｜零基础·字母与发音', desc:'从 33 个字母、发音、重音和拼读开始。先听、再读、再做辨音练习。', accent:'RU', kind:'foundation', targetLang:'ru' },
  { id:'sentence-ru', icon:'📘', title:'俄语｜基础语法课', desc:'把俄语语法拆成最小单位：一个词、一个结构、一个例句。先单独学清楚，再组合成句子。', accent:'RU', kind:'sentence', targetLang:'ru' },
  { id:'speaking-ru', icon:'💬', title:'俄语｜零基础造句与口语', desc:'不背单词表，第一课就说整句：“我想喝茶”“你想去哪里？”。学会一个句型，换词就能说新句子。', accent:'RU', kind:'speaking', targetLang:'ru' },
  { id:'talk-kz', icon:'🗣️', title:'哈萨克语｜数字与情景对话', desc:'听懂价格、时间、日期，再练一问一答的真实对话。重点练“听懂对方的回答”。', accent:'KZ', kind:'speaking', targetLang:'kk' },
  { id:'talk-ru', icon:'🗣️', title:'俄语｜数字与情景对话', desc:'听懂价格、时间、日期，再练一问一答的真实对话。重点练“听懂对方的回答”。', accent:'RU', kind:'speaking', targetLang:'ru' },
  { id:'vocab-kz', icon:'📚', title:'哈萨克语｜主题词汇与换词造句', desc:'20 个生活与工作主题、600 个常用词。每个主题学完词汇，马上用这些词换词造句。所有主题都可以直接学。', accent:'KZ', kind:'speaking', targetLang:'kk', open:true },
  { id:'vocab-ru', icon:'📚', title:'俄语｜主题词汇与换词造句', desc:'20 个生活与工作主题、600 个常用词。每个主题学完词汇，马上用这些词换词造句。所有主题都可以直接学。', accent:'RU', kind:'speaking', targetLang:'ru', open:true }
];

const scenes = [
  { id:'documents', icon:'🧾', title:'单据与发票', desc:'发票、电子发票、完工单、发货单、报价', type:'documents', category:'docs' },
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
  documents:[
    ['请给我们开一张付款发票。','Бізге төлемге шот жазып беріңізші.','Выставьте нам, пожалуйста, счёт на оплату.'],
    ['请开具税务发票。','Шот-фактураны жазып беріңізші.','Выпишите, пожалуйста, счёт-фактуру.'],
    ['电子发票开了吗？','Электрондық шот-фактура жазылды ма?','Электронный счёт-фактура уже выписан?'],
    ['请签一下完工单。','Орындалған жұмыстар актісіне қол қойыңызшы.','Подпишите, пожалуйста, акт выполненных работ.'],
    ['请把发货单发给我。','Жүкқұжатты маған жіберіңізші.','Отправьте мне, пожалуйста, накладную.'],
    ['发货单上的数量不对。','Жүкқұжаттағы саны дұрыс емес.','В накладной неверное количество.'],
    ['请给我们发一份商业报价。','Бізге коммерциялық ұсыныс жіберіңізші.','Пришлите нам, пожалуйста, коммерческое предложение.'],
    ['价格包含增值税吗？','Бағаға ҚҚС кіре ме?','Цена включает НДС?'],
    ['请盖章并签字。','Мөр басып, қол қойыңызшы.','Поставьте, пожалуйста, печать и подпись.'],
    ['请把你们的银行信息发给我。','Банк деректемелеріңізді маған жіберіңізші.','Отправьте мне, пожалуйста, ваши банковские реквизиты.']
  ],
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
  documents:{title:'单据与发票场景考试'}, taxi:{title:'打车场景考试'}, rent:{title:'租房场景考试'}, bank:{title:'银行场景考试'},
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

let soundsBound=false;
function bindSounds(){
  // Called from init() and again by page renderers; one listener is enough.
  if(soundsBound) return; soundsBound=true;
  document.addEventListener('click', e=>{
    const btn=e.target.closest('[data-text]');
    if(btn) speak(btn.dataset.text, btn.dataset.lang);
  });
}

function renderSceneList(){
  const grid=document.getElementById('sceneGrid'); if(!grid) return;
  const group=(title,sub,items)=>`<section class="scene-group"><div class="scene-group-head"><div><span class="eyebrow">${title==='生活场景'?'LIFE':title==='单据与发票'?'DOCS':'WORK'}</span><h2>${title}</h2></div><p>${sub}</p></div><div class="scene-grid">${items.map(s=>`<a class="scene scene-link" href="scene.html?id=${s.id}"><div><div class="scene-icon">${s.icon}</div><h3>${s.title}</h3><p>${s.desc}</p></div><div class="tagline">练习 → <span class="test-pill">场景小测</span></div></a>`).join('')}</div></section>`;
  const docs=scenes.filter(s=>s.category==='docs'),life=scenes.filter(s=>s.category==='life'),work=scenes.filter(s=>s.category==='work');
  grid.outerHTML=group('单据与发票','工作中每天都要问的单据：发票、电子发票（ЭСФ）、完工单、发货单、商业报价。',docs)+group('生活场景','先学在哈萨克斯坦生活时最常遇到的表达。',life)+group('工作场景','再按岗位和现场分类学习：工厂、物流、铁路、销售、办公室、安保、工程等。',work);
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

function courseGroups(pool){
  const groups=[]; const seen=new Map();
  pool.forEach(l=>{ const g=l.group || '基础练习'; if(!seen.has(g)){ const obj={name:g,items:[]}; seen.set(g,obj); groups.push(obj);} seen.get(g).items.push(l); });
  return groups;
}
function memoryMethod(l, c){
  if(c.kind==='sentence'){
    const patterns={
      '人称代词':'先记“谁”，再把同一句换成我/你/他。',
      '名词谓语':'先记“谁 + 是什么”，再替换最后一个词。',
      '否定':'把肯定句和否定句成对记，先看差别，再开口。',
      '疑问句':'先记完整问句，再只替换一个关键词。',
      '所属关系':'先记“我的/你的 + 名词”，再放回整句。',
      '存在句':'先记“有/没有”的固定结构，再换人和物。',
      '地点':'先记“在哪里”，再换家、公司、车站。',
      '地点与方向':'把“去哪里/从哪里”放成一对记。',
      '动词现在时':'先记我，再练你、他，比较词尾变化。',
      '动词否定':'把“做”与“不做”放在一起对比。',
      '动词疑问':'在已经会说的句子后面练一次疑问。',
      '时间':'同一句只换今天/明天/现在，反复三次。',
      '问词':'一次只记一个问题：谁、什么、哪里、什么时候。',
      '前置词':'先把短语当整体记，再拆开看规则。',
      '格与变化':'先记一个高频例句，再扩展到相同用法。',
      '情态表达':'先记“需要/想要/可以”的完整句式，再替换内容。',
      '连接句':'先说两个短句，再用连接词合成一个长句。',
      '总结复习':'不看答案先说一遍，再对照纠错。'
    };
    return patterns[l.group] || '一个重点只练一次变化：先听，再跟读，再自己说。';
  }
  return '先听 2 次 → 跟读 3 次 → 遮住答案自己说 1 次。';
}
function courseStudyMap(pool,c){
  const groups=courseGroups(pool);
  return `<div class="course-map-grid">${groups.map((g,i)=>`<div class="course-map-card"><span class="course-map-no">${String(i+1).padStart(2,'0')}</span><div><strong>${g.name}</strong><small>${g.items.length} 个小课 · 每次只学一个重点</small></div></div>`).join('')}</div>`;
}
function renderCoursePage(){
  const id=qs('id') || 'daily-kz'; const c=courseById(id) || courses[0];
  document.title = `${c.title}｜中亚语言通`;
  const title=document.getElementById('courseTitle'); if(title) title.textContent=c.title;
  const desc=document.getElementById('courseDesc'); if(desc) desc.textContent=c.desc;
  const pool=courseLessons(c.id);
  const intro=document.getElementById('courseIntroNote');
  if(intro){
    if(c.kind==='foundation') intro.textContent='这是独立的基础课：从字母、特殊音和拼读开始。每一步都配听音练习，不急着背句子。';
    if(c.kind==='sentence') intro.textContent='正式语法课：把语法拆成小块。每节只讲一个结构，再用一个简单例句固定下来，最后自己换词练一次。';
    if(c.kind==='speaking') intro.textContent='零基础口语课：不从单词学起，第一课就开口说整句。先会“我想……”，再换词、提问、否定。';
  }
  const map=document.getElementById('courseStudyMap'); if(map) map.innerHTML=courseStudyMap(pool,c);
  const list=document.getElementById('lessonList');
  if(list){
    let lastGroup='';
    list.innerHTML=pool.map((l,i)=>{
      const group=l.group || '基础练习';
      const heading=group!==lastGroup ? (lastGroup=group, `<div class="course-group-heading"><div><span class="eyebrow">模块</span><h3>${group}</h3></div><span>${pool.filter(x=>(x.group||'基础练习')===group).length} 课</span></div>`) : '';
      const target=c.targetLang==='kk'?l.kz:c.targetLang==='ru'?l.ru:(l.kz||l.ru);
      const memory=memoryMethod(l,c);
      return `${heading}<a class="list-item course-lesson-item" href="learn.html?pool=course&id=${encodeURIComponent(c.id)}&start=${i}"><span class="num">${String(i+1).padStart(2,'0')}</span><span class="lesson-item-main"><strong>${l.title}</strong><small>${l.cn}${target?` · ${target}`:''}</small><em>记忆：${memory}</em></span><span class="arrow">→</span></a>`;
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
  if(!document.getElementById('sceneTitle')) return;
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
  if(qs('pool')==='scene'){ pool=sceneLessons(qs('type')||'daily-kz', qs('scene')); label='场景练习'; }
  else { const c=courseById(qs('id')||'daily-kz')||courses[0]; pool=courseLessons(c.id); label=c.title; }
  const courseForLearn=qs('pool')==='scene' ? null : (courseById(qs('id')||'daily-kz')||courses[0]);
  let current=Math.max(0,Math.min(Number(qs('start')||0),pool.length-1));
  const title=document.getElementById('learnTitle'); const count=document.getElementById('learnCount'); const cn=document.getElementById('learnCn'); const kz=document.getElementById('learnKz'); const ru=document.getElementById('learnRu'); const tip=document.getElementById('learnTip'); const memory=document.getElementById('learnMemory'); const grammar=document.getElementById('learnGrammar'); const tag=document.getElementById('learnTag'); const path=document.getElementById('learnPath');
  const kzRow=document.getElementById('learnKzRow'), ruRow=document.getElementById('learnRuRow');
  if(courseForLearn?.kind==='sentence' || courseForLearn?.kind==='speaking'){
    if(kzRow) kzRow.style.display=courseForLearn.targetLang==='kk'?'flex':'none';
    if(ruRow) ruRow.style.display=courseForLearn.targetLang==='ru'?'flex':'none';
    const side=document.getElementById('learnModeNote'); if(side) side.textContent=courseForLearn.kind==='speaking' ? (courseForLearn.targetLang==='kk'?'目标语言：哈萨克语。直接说整句，一个句型换不同的词。':'目标语言：俄语。直接说整句，一个句型换不同的词。') : (courseForLearn.targetLang==='kk'?'目标语言：哈萨克语。按语法体系从“我、你、他”开始。':'目标语言：俄语。按语法体系从“我、你、他”开始。');
  } else { if(kzRow) kzRow.style.display='flex'; if(ruRow) ruRow.style.display='flex'; }
  function draw(){
    const l=pool[current]; if(!l) return;
    title.textContent=l.title; count.textContent=`${current+1} / ${pool.length}`; cn.textContent=l.cn; kz.textContent=l.kz; ru.textContent=l.ru;
    // learn.html ships placeholder data-text ("您好") on the 🔊 buttons; point them at this sentence.
    kzRow?.querySelector('[data-text]')?.setAttribute('data-text', l.kz||''); ruRow?.querySelector('[data-text]')?.setAttribute('data-text', l.ru||''); tip.textContent=l.tip; if(grammar) grammar.textContent=l.group ? `语法模块：${l.group}` : ''; if(memory) memory.innerHTML=`<span>记忆方法</span><strong>${courseForLearn ? memoryMethod(l,courseForLearn) : '先听 2 次 → 跟读 3 次 → 遮住答案自己说 1 次。'}</strong>`; tag.textContent=l.tag; path.textContent=`当前内容：${label}`;
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
  if(!document.getElementById('testTitle')) return;
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

// Speaking courses use the existing course/learn pages and completedLessons IDs.
const SpeakingFlow = (() => {
  const PASS = 70;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const courseUrl = c => 'course.html?id=' + encodeURIComponent(c.id);
  const lessonUrl = (c, i) => 'learn.html?pool=course&id=' + encodeURIComponent(c.id) + '&start=' + i;
  const examUrl = (c, i) => courseUrl(c) + '&exam=' + (i + 1);
  const loginUrl = next => 'auth.html?next=' + encodeURIComponent(next);
  const scoreKey = (c, m) => 'speakingModuleBest:' + c.id + ':' + encodeURIComponent(m.name);
  function best(c, m) {
    const n = Number(localStorage.getItem(scoreKey(c, m)));
    return Number.isFinite(n) && n >= 0 && n <= 100 ? n : 0;
  }
  function modules(c) { return courseGroups(courseLessons(c.id)); }
  function done(m) {
    const ids = readCompleted();
    return Array.isArray(ids) && m.items.every(l => ids.includes(l.id));
  }
  function unlocked(c, ms, i, user) {
    // Vocabulary themes are reference material: every theme is open (c.open).
    return i >= 0 && i < ms.length && (c.open ||
      ms.slice(0, i).every(m => done(m) && best(c, m) >= PASS));
  }
  // Account sync: lessons live in learning_progress (speaking:<course>:<lesson>),
  // module exams in test_results (speaking-test:<course>:m<n>), same tables as grammar.
  const lessonNode = (c, l) => 'speaking:' + c.id + ':' + l.id;
  const examNode = (c, i) => 'speaking-test:' + c.id + ':m' + (i + 1);
  const synced = {};
  function sync(c, user) {
    if (!user) return Promise.resolve();
    return synced[c.id + user.id] ||= (async () => {
      const client = window.KZAuth?.getClient?.();
      if (!client) return;
      try {
        const ms = modules(c), pool = courseLessons(c.id);
        const [{data:lp}, {data:tr}] = await Promise.all([
          client.from('learning_progress').select('node_id,status').eq('user_id', user.id).like('node_id', 'speaking:' + c.id + ':%').limit(2000),
          client.from('test_results').select('node_id,score').eq('user_id', user.id).like('node_id', 'speaking-test:' + c.id + ':%').limit(1000)
        ]);
        const remoteDone = new Set((lp || []).filter(r => r.status === 'done').map(r => r.node_id));
        const local = readCompleted();
        const merged = new Set(local);
        pool.forEach(l => { if (remoteDone.has(lessonNode(c, l))) merged.add(l.id); });
        completed = [...merged]; saveCompleted();
        const remoteBest = {};
        (tr || []).forEach(r => { remoteBest[r.node_id] = Math.max(remoteBest[r.node_id] || 0, Number(r.score) || 0); });
        ms.forEach((m, i) => {
          const r = remoteBest[examNode(c, i)] || 0;
          if (r > best(c, m)) localStorage.setItem(scoreKey(c, m), String(r));
        });
        // Upload progress made on this device (e.g. as a guest) that the account does not have yet.
        const now = new Date().toISOString();
        const up = pool.filter(l => local.includes(l.id) && !remoteDone.has(lessonNode(c, l)))
          .map(l => ({user_id:user.id, node_id:lessonNode(c, l), language:c.targetLang, status:'done', score:100, updated_at:now}));
        if (up.length) await client.from('learning_progress').upsert(up, {onConflict:'user_id,node_id'});
        const tests = ms.map((m, i) => ({m, i, s:best(c, m)})).filter(x => Math.floor(x.s) > (remoteBest[examNode(c, x.i)] || 0))
          .map(x => ({user_id:user.id, node_id:examNode(c, x.i), language:c.targetLang, score:Math.floor(x.s), passed:x.s >= PASS, answers:[]}));
        if (tests.length) await client.from('test_results').insert(tests);
      } catch (e) { console.warn('speaking sync failed', e); }
    })();
  }
  async function saveLesson(c, l, user) {
    const client = window.KZAuth?.getClient?.();
    if (!user || !client) return;
    const write = client.from('learning_progress').upsert({user_id:user.id, node_id:lessonNode(c, l), language:c.targetLang, status:'done', score:100, updated_at:new Date().toISOString()}, {onConflict:'user_id,node_id'});
    // Never hold the learner on the page for a slow network; the next sync uploads anything missed.
    await Promise.race([write.then(() => {}, e => console.warn('speaking progress save failed', e)), new Promise(r => setTimeout(r, 1500))]);
  }
  function saveExam(c, i, score, user) {
    const client = window.KZAuth?.getClient?.();
    if (!user || !client) return;
    client.from('test_results').insert({user_id:user.id, node_id:examNode(c, i), language:c.targetLang, score:Math.floor(score), passed:score >= PASS, answers:[]})
      .then(() => {}, e => console.warn('speaking exam save failed', e));
  }
  async function userNow() {
    await window.KZLearning.ready();
    const client = window.KZAuth?.getClient?.();
    // An unavailable auth service is not proof that the visitor is signed out.
    if (!client) throw new Error('登录服务尚未就绪，请刷新重试。');
    const {data, error} = await client.auth.getSession();
    if (data?.session?.user) return data.session.user;
    if (error) throw error;
    return null;
  }
  function gate(c, ms, i, user, next) {
    return '<p>未解锁：等待上一模块通过。请先完成前面模块的全部小课，并通过各模块考试（≥70%）。</p><a class="primary-btn" href="' + esc(courseUrl(c)) + '">返回模块列表</a>';
  }
  function questions(c, m) {
    const target = l => c.targetLang === 'kk' ? l.kz : l.ru;
    const shuffle = a => a.map(v => [Math.random(), v]).sort((a,b) => a[0]-b[0]).map(x => x[1]);
    const all = courseLessons(c.id);
    // Number/day lessons: one question per item. Dialogue lessons: question → the right reply.
    const special = l => {
      if (l.drill) {
        const isNum = s => /^\d+$/.test(s), kind = isNum(l.drill[0][0]);
        const words = [...new Set(all.filter(x => x.drill).flatMap(x => x.drill).filter(d => isNum(d[0]) === kind).map(d => d[1]))];
        return (c.open ? shuffle(l.drill).slice(0, 2) : l.drill).map(([label, word]) => ({ prompt: '“' + label + '” 怎么说？', answer: word, options: shuffle([word, ...shuffle(words.filter(w => w !== word)).slice(0,3)]) }));
      }
      if (l.swap) { // substitution drill: two sentences of the pattern, options are the same pattern with other words
        const ss = l.swap.sentences;
        return shuffle(ss).slice(0, 2).map(([cn, t]) => ({ prompt: '用句型说：' + cn, answer: t, options: shuffle([t, ...shuffle(ss.map(x => x[1]).filter(x => x !== t)).slice(0,3)]) }));
      }
      const replies = [...new Set(all.filter(x => x.turns).map(x => x.turns[1][2]))], reply = l.turns[1][2];
      return [{ prompt: '对方说：“' + l.turns[0][2] + '”（' + l.turns[0][1] + '）怎么回答？', answer: reply, options: shuffle([reply, ...shuffle(replies.filter(r => r !== reply)).slice(0,3)]) }];
    };
    if (m.items.some(l => l.drill || l.turns || l.swap)) return shuffle(m.items.flatMap(l => (l.drill || l.turns || l.swap) ? special(l) : [{ prompt:l.cn, answer:target(l), options:shuffle([target(l), ...shuffle([...new Set(all.map(target).filter(v => v && v !== target(l)))]).slice(0,3)]) }]));
    return shuffle(m.items).map(l => ({
      prompt:l.cn, answer:target(l),
      options:shuffle([target(l), ...shuffle([...new Set(courseLessons(c.id).map(target).filter(v => v && v !== target(l))) ]).slice(0,3)])
    }));
  }
  async function renderCourse(c) {
    const user = await userNow(), ms = modules(c), pool = courseLessons(c.id);
    document.title = c.title + '｜中亚语言通';
    document.getElementById('courseTitle').textContent = c.title;
    document.getElementById('courseDesc').textContent = c.desc;
    document.getElementById('courseIntroNote').textContent = (c.open ? '所有主题都可以直接学，按需要挑选。每个主题学完可以参加小测，检查掌握情况。' : '按模块闯关：完成全部小课 → 模块考试达到 70% → 解锁下一模块。') + (user ? '进度已同步到账号。' : '无需注册即可学习全部模块；登录后进度可在其他设备继续。');
    document.getElementById('courseProgress').textContent = percentFor(pool) + '%';
    document.getElementById('courseStudyMap').innerHTML = courseStudyMap(pool, c);
    const root = document.getElementById('lessonList'), start = document.getElementById('courseStart');
    start.hidden = true;
    start.style.display = 'none';
    if (qs('exam') !== null) {
      const index = Number(qs('exam')) - 1;
      if (!Number.isInteger(index) || !ms[index]) {
        root.innerHTML = '<p>没有这个模块。</p><a class="secondary-btn" href="' + esc(courseUrl(c)) + '">返回模块列表</a>';
        return;
      }
      if (!unlocked(c, ms, index, user)) { root.innerHTML = gate(c, ms, index, user, examUrl(c,index)); return; }
      if (!done(ms[index])) { root.innerHTML = '<p>完成本模块全部小课后才能参加考试。</p><a class="primary-btn" href="' + esc(courseUrl(c)) + '">继续学习</a>'; return; }
      renderExam(c, ms, index, root);
      return;
    }
    root.innerHTML = ms.map((m,i) => {
      const open = unlocked(c,ms,i,user), finished = done(m), score = best(c,m);
      const status = score >= PASS && finished ? '考试已通过 · ' + Math.floor(score) + '%' : open ? '已解锁' : '未解锁';
      const heading = '<div class="course-group-heading"><div><span class="eyebrow">模块 ' + (i+1) + ' · ' + status + '</span><h3>' + esc(m.name) + '</h3></div><span>' + m.items.filter(l => completed.includes(l.id)).length + ' / ' + m.items.length + ' 课</span></div>';
      if (!open) return '<details class="study-module"><summary>'+heading+'</summary>'+gate(c,ms,i,user,courseUrl(c))+'</details>';
      const expand = c.open ? i === Math.max(0, ms.findIndex(x => !done(x))) : score < PASS;
      return '<details class="study-module" '+(expand?'open':'')+'><summary>'+heading+'</summary>' + m.items.map(l => '<a class="list-item course-lesson-item" href="' + esc(lessonUrl(c,pool.indexOf(l))) + '"><span class="num">' + (completed.includes(l.id)?'✓':pool.indexOf(l)+1) + '</span><span class="lesson-item-main"><strong>' + esc(l.title) + '</strong><small>' + esc(l.cn) + ' · ' + esc(c.targetLang==='kk'?l.kz:l.ru) + '</small></span><span class="arrow">→</span></a>').join('') +
        (finished ? '<a class="primary-btn" href="' + esc(examUrl(c,i)) + '">' + (score>=PASS?'重新考试':'参加模块考试') + '（≥70%通过）</a>' : '<p>还差 '+m.items.filter(l=>!completed.includes(l.id)).length+' 课，完成后可考试。</p>')+'</details>';
    }).join('');
  }
  function renderExam(c, ms, index, root) {
    const bank = questions(c,ms[index]);
    let current = 0, correct = 0, answered = false, submitting = false;
    function draw() {
      const q = bank[current]; answered = false;
      root.innerHTML = '<div class="lesson-card"><h2>模块 ' + (index+1) + ' · ' + esc(ms[index].name) + '考试</h2><p>第 ' + (current+1) + ' / ' + bank.length + ' 题 · ≥70%通过</p><h3>' + esc(q.prompt) + '</h3><p>请选择正确的' + (c.targetLang==='kk'?'哈萨克语':'俄语') + '：</p><div id="speakingOptions">' + q.options.map((v,i)=>'<button type="button" class="answer-option" data-choice="' + i + '">' + esc(v) + '</button>').join('') + '</div><p id="speakingFeedback" role="status"></p><button type="button" id="speakingNext" class="primary-btn" disabled>' + (current===bank.length-1?'提交考试':'下一题') + '</button><a class="secondary-btn" href="' + esc(courseUrl(c)) + '">返回模块列表</a></div>';
      root.querySelectorAll('[data-choice]').forEach(button => button.onclick = () => {
        if (answered) return;
        answered = true;
        const ok = q.options[Number(button.dataset.choice)] === q.answer;
        if (ok) correct++;
        root.querySelectorAll('[data-choice]').forEach(b => { b.disabled = true; if(q.options[Number(b.dataset.choice)]===q.answer)b.classList.add('correct'); });
        if(!ok)button.classList.add('wrong');
        root.querySelector('#speakingFeedback').textContent = ok?'回答正确！':'正确答案：' + q.answer;
        root.querySelector('#speakingNext').disabled = false;
      });
      root.querySelector('#speakingNext').onclick = async () => {
        if (!answered || submitting) return;
        if (current < bank.length-1) { current++; draw(); return; }
        submitting = true;
        root.querySelector('#speakingNext').disabled = true;
        const user = await userNow();
        if (!unlocked(c,ms,index,user) || !done(ms[index])) { root.innerHTML = gate(c,ms,index,user,examUrl(c,index)); return; }
        // Keep exact score: rounding 69.5% up to 70 must never unlock a module.
        const score = correct / bank.length * 100;
        try { localStorage.setItem(scoreKey(c,ms[index]),String(Math.max(best(c,ms[index]),score))); }
        catch {
          root.querySelector('#speakingFeedback').textContent = '成绩未能保存，请允许浏览器存储后重新提交。';
          submitting = false; root.querySelector('#speakingNext').disabled = false; return;
        }
        saveExam(c, index, score, user);
        const passed = score >= PASS;
        root.innerHTML = '<div class="lesson-card"><h2>' + (passed?'考试通过！':'暂未通过，请复习后重试。') + '</h2><p>答对 ' + correct + ' / ' + bank.length + ' 题 · ' + Math.floor(score) + '%</p><p>' + (passed?(index===ms.length-1?'你已完成全部模块！':'下一模块已解锁。'):'本次未达到 70%。已取得的历史通过成绩会保留。') + '</p><a class="primary-btn" href="' + esc(courseUrl(c)) + '">返回模块列表</a><a class="secondary-btn" href="' + esc(examUrl(c,index)) + '">重新考试</a>' + '</div>';
      };
    }
    draw();
  }
  async function renderLearn(c) {
    const host = document.getElementById('protectedContent'), pool = courseLessons(c.id), ms = modules(c);
    const raw = Number(qs('start') || 0);
    const current = Number.isInteger(raw) && raw >= 0 && raw < pool.length ? raw : 0;
    const index = ms.findIndex(m => m.items.includes(pool[current]));
    const user = await userNow();
    if (!unlocked(c,ms,index,user)) { host.innerHTML = '<section class="section"><div class="container">' + gate(c,ms,index,user,lessonUrl(c,current)) + '</div></section>'; host.hidden = false; return; }
    // Normalize malformed URLs before invoking the existing lesson renderer.
    const url = new URL(location.href); url.searchParams.set('start',String(current)); history.replaceState(null,'',url);
    renderLearnPage();
    const m = ms[index], position = m.items.indexOf(pool[current]);
    const next = document.getElementById('nextLink'), prev = document.getElementById('prevLink');
    prev.href = position === 0 ? courseUrl(c) : lessonUrl(c,pool.indexOf(m.items[position-1]));
    if(position===0)prev.textContent = '返回模块列表';
    const destination = position===m.items.length-1 ? examUrl(c,index) : lessonUrl(c,pool.indexOf(m.items[position+1]));
    next.href = destination;
    document.getElementById('markBtn').textContent = position===m.items.length-1?'完成本课，参加模块考试':'记住了，下一句';
    let saving = false;
    next.onclick = async event => {
      event.preventDefault();
      if(saving)return; saving=true;
      const freshUser = await userNow();
      if(!unlocked(c,ms,index,freshUser)){ saving=false; await renderLearn(c); return; }
      try {
        completed = [...new Set([...readCompleted(),pool[current].id])];
        saveCompleted(); await saveLesson(c, pool[current], freshUser); location.href = destination;
      } catch { saving=false; alert('学习进度未能保存，请允许浏览器存储后重试。'); }
    };
    window.KZLearning.attachLesson(c,pool[current],pool);
    host.hidden = false;
  }
  function start(c, page) {
    const host = page==='learn' ? document.getElementById('protectedContent') : null;
    if(host)host.hidden = true;
    // auth.js initializes its client in its own DOMContentLoaded callback.
    setTimeout(async () => {
      try {
        await window.KZLearning.ready();
        const client = window.KZAuth?.getClient?.();
        if (!client) throw new Error('登录服务尚未就绪');
        // Subscribe before the first session read so sign-in/out cannot be missed.
        // INITIAL_SESSION and token refreshes for the same user must not reload
        // the page (or interrupt a module exam).
        let observedUserId;
        client.auth.onAuthStateChange((event, session) => {
          const nextUserId = session?.user?.id || null;
          const changed = observedUserId !== undefined && observedUserId !== nextUserId;
          observedUserId = nextUserId;
          if (changed) setTimeout(() => location.reload(), 0);
        });
        const user = await userNow();
        if (observedUserId === undefined) observedUserId = user?.id || null;
        await sync(c, user);
        completed = readCompleted();
        if(!Array.isArray(completed))completed=[];
        if(page==='learn')await renderLearn(c); else await renderCourse(c);
      } catch {
        const root = host || document.getElementById('lessonList');
        root.innerHTML = '<p role="status">暂时无法读取登录状态或学习进度，请刷新重试，并检查网络及浏览器是否允许本地存储。</p>';
        root.hidden = false;
      }
    },0);
  }
  return {start, modules, done, unlocked, questions, best, sync};
})();


function init(){
  const page=document.body.dataset.page;
  // The old "字母与发音" course ids hold greeting phrases, not letters; old links go to the real alphabet unit.
  if((page==='course'||page==='learn') && qs('pool')!=='scene'){
    const c=courseById(qs('id')||'daily-kz')||courses[0];
    if(c.kind==='foundation'){ const lang=c.targetLang==='ru'?'ru':'kk'; location.replace(`unit.html?lang=${lang}&unit=${lang}-u1`); return; }
  }
  bindSounds();
  if(page==='home') renderHome();
  if(page==='scene-list') renderSceneList();
  if(page==='course'){
    const c=courseById(qs('id')||'daily-kz')||courses[0];
    if(c.kind==='speaking') SpeakingFlow.start(c,'course');
    else if(c.kind==='sentence' && window.GrammarFlow) window.GrammarFlow.renderCoursePage(c);
    else renderCoursePage();
  }
  if(page==='scene') renderScenePage();
  if(page==='learn'){
    const c=courseById(qs('id')||'daily-kz')||courses[0];
    if(c.kind==='speaking' && qs('pool')!=='scene') SpeakingFlow.start(c,'learn');
    else if(c.kind==='sentence' && window.GrammarFlow) window.GrammarFlow.renderLearnPage(c);
    else renderLearnPage();
  }
  if(page==='test'){
    if(qs('grammar')==='1' && window.GrammarFlow){
      const c=courseById(qs('course')||'sentence-kz')||courses.find(x=>x.kind==='sentence');
      window.GrammarFlow.renderTestPage(c,Math.max(1,Number(qs('module')||1)));
    } else renderTestPage();
  }
  const reset=document.getElementById('resetProgress'); if(reset) reset.addEventListener('click',()=>{if(confirm('确定要清空本机学习进度吗？')){completed=[];localStorage.removeItem('completedLessons');Object.keys(localStorage).filter(key=>key.startsWith('speakingModuleBest:')).forEach(key=>localStorage.removeItem(key));location.reload();}});
}

document.addEventListener('DOMContentLoaded', init);


(function(){
  const foundation = {"kk":{"id":"kk-u1","lessons":[{"id":"kk-u1-l1"},{"id":"kk-u1-l5"},{"id":"kk-u1-l2"},{"id":"kk-u1-l6"},{"id":"kk-u1-l7"},{"id":"kk-u1-l8"},{"id":"kk-u1-l9"},{"id":"kk-u1-l3"},{"id":"kk-u1-l4"}]},"ru":{"id":"ru-u1","lessons":[{"id":"ru-u1-l1"},{"id":"ru-u1-l5"},{"id":"ru-u1-l2"},{"id":"ru-u1-l6"},{"id":"ru-u1-l7"},{"id":"ru-u1-l8"},{"id":"ru-u1-l3"},{"id":"ru-u1-l4"}]}};
  async function draw(){
    const host=document.getElementById('learningHub');if(!host)return;
    try{
      await window.KZLearning.ready();
      const user=window.KZAuth.getUser(),esc=window.KZLearning.esc;
      const read=k=>{try{return JSON.parse(localStorage.getItem(k)||'{}')}catch{return {}}};
      let basic=read(user?'v5_progress_user_'+user.id:'v5_progress_guest');
      if(!user && !Object.keys(basic).length)basic=read('v5_progress');
      if(user){
        try{const {data,error}=await window.KZAuth.getClient().from('learning_progress').select('node_id,status,score').eq('user_id',user.id).like('node_id','v5:%').limit(2000);if(!error){for(const row of data||[]){if(!basic[row.node_id]||row.status==='done'||row.status==='passed')basic[row.node_id]=row;}localStorage.setItem('v5_progress_user_'+user.id,JSON.stringify(basic));}}catch{}
      }
      // #vocab (nav link 主题词汇) turns the hub into the vocabulary page; elsewhere the vocabulary course is not listed.
      const vocabMode=location.hash==='#vocab';
      let html='';
      for(const [lang,label,flag,suffix] of [['kk','哈萨克语','🇰🇿','kz'],['ru','俄语','🇷🇺','ru']]){
        const first=foundation[lang];const fd=first.lessons.filter(l=>(basic['v5:'+l.id]||basic[l.id])?.status==='done').length;
        const states=[{id:'foundation-'+lang,title:'字母与发音',desc:lang==='kk'?'从 42 个字母、特殊音和拼读开始。':'从 33 个字母、重音和拼读开始。',done:fd,total:first.lessons.length,passed:(basic['v5:'+first.id]||basic[first.id])?.status==='passed'?1:0,modules:1,url:`unit.html?lang=${lang}&unit=${first.id}`,storage:'已完成的小课与原字母课程保持一致。'}];
        const gc=courseById('sentence-'+suffix);const gs=await window.GrammarFlow.summary(gc);
        const synced=user?'进度已同步到账号，换设备登录可继续。':'进度保存在本设备，登录后可同步到账号。';
        states.forEach(s=>s.storage=synced);
        states.push({...gs,id:gc.id,title:'基础语法',desc:'一个结构、一个例句，逐模块掌握句子规律。',url:'course.html?id='+gc.id,storage:synced});
        const sc=courseById('speaking-'+suffix);await SpeakingFlow.sync(sc,user);
        const ms=SpeakingFlow.modules(sc),ids=readCompleted();
        states.push({id:sc.id,title:'造句与口语',desc:'从第一句开始，听音、跟读、录音回放。',done:courseLessons(sc.id).filter(l=>ids.includes(l.id)).length,total:courseLessons(sc.id).length,passed:ms.filter(m=>SpeakingFlow.done(m)&&SpeakingFlow.best(sc,m)>=70).length,modules:ms.length,url:'course.html?id='+sc.id,storage:synced});
        const tc=courseById('talk-'+suffix);await SpeakingFlow.sync(tc,user);
        const tms=SpeakingFlow.modules(tc),tids=readCompleted();
        states.push({id:tc.id,title:'数字与情景对话',desc:'听懂价格、时间和日期，练一问一答的真实对话。',done:courseLessons(tc.id).filter(l=>tids.includes(l.id)).length,total:courseLessons(tc.id).length,passed:tms.filter(m=>SpeakingFlow.done(m)&&SpeakingFlow.best(tc,m)>=70).length,modules:tms.length,url:'course.html?id='+tc.id,storage:synced});
        const vc=courseById('vocab-'+suffix);await SpeakingFlow.sync(vc,user);
        const vms=SpeakingFlow.modules(vc),vids=readCompleted();
        states.push({id:vc.id,title:'主题词汇与换词造句',desc:'20 个主题、600 个常用词，学完马上换词造句。',done:courseLessons(vc.id).filter(l=>vids.includes(l.id)).length,total:courseLessons(vc.id).length,passed:vms.filter(m=>SpeakingFlow.done(m)&&SpeakingFlow.best(vc,m)>=70).length,modules:vms.length,url:'course.html?id='+vc.id,storage:synced});
        const shown=states.filter(s=>s.id.startsWith('vocab-')===vocabMode);
        html+=`<section class="study-language" id="${lang}"><div class="study-language-head"><h2>${flag} ${label}</h2>${vocabMode?'':`<a href="level-test.html?lang=${lang}">选做起点测试 →</a>`}</div><div class="study-course-grid">`;
        for(const s of shown){const pct=Math.round(s.done/(s.total||1)*100),last=window.KZLearning.resume(s.id);html+=`<article class="study-course-card" id="card-${s.id}"><span class="eyebrow">${label}</span><h3>${s.title}</h3><p>${s.desc}</p><div class="study-meter" role="progressbar" aria-label="${label}${s.title}完成进度" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div><p class="study-count">${s.done} / ${s.total} 小课 · ${s.passed} / ${s.modules} 模块通过</p><div class="study-actions"><a class="primary-btn" href="${esc(last?.url||s.url)}">${last||s.done?'继续学习':'开始学习'} →</a>${last?`<a class="study-text-link" href="${s.url}">课程目录</a>`:''}</div><small>${s.storage}</small></article>`;}
        html+=vocabMode?'</div></section>':`</div><a class="study-legacy" href="path.html?lang=${lang}">学完字母后：拼读、问候、句型到工作场景的 6 个单元 →</a></section>`;
      }
      host.innerHTML=html;
      const account=document.getElementById('progressUser');if(account)account.textContent=user?'当前账号：'+(user.email||'已登录')+'。字母、语法、口语进度，继续学习位置和错题复习都会同步到账号。':'无需注册即可学习全部课程：完成本模块小课并通过考试（≥70%）即可解锁下一模块。进度保存在本设备，登录后可同步到账号、换设备继续。';
      const review=document.getElementById('dailyReview');if(review)window.KZLearning.renderReview(review);
      window.KZLearning.updateLinks();
      // Page heading follows the mode (the static text describes the normal course list).
      const h1=document.querySelector('main h1'), lead=h1?.parentElement?.querySelector('p');
      if(h1&&vocabMode){ h1.dataset.orig??=h1.innerHTML; if(lead) lead.dataset.orig??=lead.innerHTML;
        h1.textContent='主题词汇与换词造句'; if(lead) lead.textContent='20 个生活与工作主题、600 个常用词。选一种语言开始：每个主题先学词，再用这些词换词造句。'; }
      else if(h1?.dataset.orig!==undefined){ h1.innerHTML=h1.dataset.orig; if(lead?.dataset.orig!==undefined) lead.innerHTML=lead.dataset.orig; }
      if(vocabMode) window.scrollTo(0,0); else if(location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
      // Nav links only change the hash on this page (courses.html ↔ courses.html#vocab): redraw instead of reloading.
      if(!window.__hubHashBound){window.__hubHashBound=true;window.addEventListener('hashchange',draw);}
    }catch(error){console.warn('learning hub failed',error);host.innerHTML='<p role="status">暂时无法读取学习状态，请刷新重试。</p><a href="unit.html?lang=kk&unit=kk-u1">哈语字母课程</a> · <a href="unit.html?lang=ru&unit=ru-u1">俄语字母课程</a>';}
  }
  document.addEventListener('DOMContentLoaded',draw);
})();
