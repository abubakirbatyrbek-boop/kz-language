/* V5 beginner-first learning engine: pronunciation -> reading -> words -> sentences -> dialogue */
const V5_PATHS = {
  kk: {
    label: '哈萨克语', flag: '🇰🇿',
    desc: '从字母与发音开始，先学会读，再学词、句型、造句，最后进入真实场景。',
    units: [
      {id:'kk-u1',num:1,title:'字母与发音',desc:'42 个字母：特殊元音、特殊辅音、常用字母、外来词字母和拼读',level:'入门',lessons:[
        {id:'kk-u1-l1',title:'特殊元音 Ә Ө Ұ Ү І',type:'intro',items:[
          {symbol:'Ә ә',example:'әке',meaning:'爸爸',note:'哈萨克语最常见的特殊元音。嘴张开、舌头靠前，介于“啊”和“哎”之间。'},
          {symbol:'Ө ө',example:'өзен',meaning:'河流',note:'圆唇、舌头靠前，像德语 ö。先发“哦”，嘴形不变把舌头往前推。'},
          {symbol:'Ұ ұ',example:'ұл',meaning:'儿子',note:'短促的圆唇“乌”，舌头靠后。'},
          {symbol:'Ү ү',example:'үй',meaning:'房子',note:'圆唇、舌头靠前，接近汉语拼音 ü（“鱼”的韵母）。'},
          {symbol:'І і',example:'тіл',meaning:'语言',note:'短而轻的“衣”，比俄语的 и 更短、更松。'}
        ]},
        {id:'kk-u1-l5',title:'特殊辅音 Қ Ғ Ң Һ',type:'intro',items:[
          {symbol:'Қ қ',example:'қала',meaning:'城市',note:'比普通 к 更靠后，在喉咙深处发出，声音更厚。'},
          {symbol:'Ғ ғ',example:'ғасыр',meaning:'世纪',note:'喉咙后部的浊摩擦音，像轻轻漱口的声音。'},
          {symbol:'Ң ң',example:'таң',meaning:'黎明',note:'后鼻音，像汉语“昂”的尾音 ng，不要发成 н。'},
          {symbol:'Һ һ',example:'жиһаз',meaning:'家具',note:'轻的“h”气音，比 х 更轻。只在少数词里出现。'}
        ]},
        {id:'kk-u1-l2',title:'听音认特殊元音',type:'listen',items:[
          ['听单词，找出其中的特殊元音。','әке',['Ә ә','Ө ө','Ү ү'],0,'Ә ә'],
          ['听单词，找出其中的特殊元音。','өзен',['Ә ә','Ө ө','Ү ү'],1,'Ө ө'],
          ['听单词，找出其中的特殊元音。','үй',['Ү ү','Ұ ұ','І і'],0,'Ү ү'],
          ['听单词，找出其中的特殊元音。','ұл',['Ү ү','Ұ ұ','У у'],1,'Ұ ұ'],
          ['听单词，找出开头的辅音。','қала',['К к','Қ қ','Ғ ғ'],1,'Қ қ']
        ]},
        {id:'kk-u1-l6',title:'常用元音 А Е И О У Ы',type:'intro',items:[
          {symbol:'А а',example:'ана',meaning:'妈妈',note:'和汉语“啊”接近。'},
          {symbol:'Е е',example:'ел',meaning:'国家',note:'像“耶”的韵母，不要读成俄语的“ye”。'},
          {symbol:'И и',example:'ине',meaning:'针',note:'读作长的“衣”，实际带一点滑音。'},
          {symbol:'О о',example:'от',meaning:'火',note:'圆唇“哦”。'},
          {symbol:'У у',example:'су',meaning:'水',note:'读作“乌”；在元音后面时接近 w。'},
          {symbol:'Ы ы',example:'қыз',meaning:'女孩',note:'舌头后缩、不圆唇，接近汉语“思”的韵母。'}
        ]},
        {id:'kk-u1-l7',title:'常用辅音',type:'intro',items:[
          {symbol:'Б б',example:'бала',meaning:'孩子',note:'像汉语 b，但声带要振动。'},
          {symbol:'Г г',example:'гүл',meaning:'花',note:'靠前的 g，常和前元音一起出现。'},
          {symbol:'Д д',example:'дос',meaning:'朋友',note:'浊的 d。'},
          {symbol:'Ж ж',example:'жол',meaning:'路',note:'哈萨克语读作“zh”，比汉语 zh 更软、声带振动。'},
          {symbol:'З з',example:'зат',meaning:'东西',note:'浊的 z，像蜜蜂嗡嗡声。'},
          {symbol:'Й й',example:'ай',meaning:'月亮',note:'短促的 y 音，常在词尾。'},
          {symbol:'К к',example:'кітап',meaning:'书',note:'靠前的 k，和 қ 对比着练。'},
          {symbol:'Л л',example:'көл',meaning:'湖',note:'l 音。'},
          {symbol:'М м',example:'мектеп',meaning:'学校',note:'m 音。'},
          {symbol:'Н н',example:'нан',meaning:'面包',note:'前鼻音 n，和 ң 区分开。'},
          {symbol:'П п',example:'пияз',meaning:'洋葱',note:'p 音。'},
          {symbol:'Р р',example:'рақмет',meaning:'谢谢',note:'舌尖颤音，练不出来可以先轻轻弹一下舌尖。'},
          {symbol:'С с',example:'сабақ',meaning:'课',note:'s 音。'},
          {symbol:'Т т',example:'тау',meaning:'山',note:'t 音。'},
          {symbol:'Ш ш',example:'шай',meaning:'茶',note:'sh 音，像汉语“诗”的声母。'}
        ]},
        {id:'kk-u1-l8',title:'外来词里的字母',type:'intro',items:[
          {symbol:'В в',example:'вагон',meaning:'车厢',note:'主要出现在俄语借词中，像英语 v。'},
          {symbol:'Ф ф',example:'фото',meaning:'照片',note:'f 音，多见于外来词。'},
          {symbol:'Х х',example:'хат',meaning:'信',note:'喉部的 h，比汉语 h 更用力。'},
          {symbol:'Ц ц',example:'цирк',meaning:'马戏团',note:'ts 音，只在外来词中出现。'},
          {symbol:'Ч ч',example:'чемпион',meaning:'冠军',note:'ch 音，只在外来词中出现。'},
          {symbol:'Щ щ',example:'щётка',meaning:'刷子',note:'长而软的 sh 音，只在外来词中出现。'},
          {symbol:'Ё ё',example:'ёлка',meaning:'新年枞树',note:'读作“yo”，只在外来词中出现。'},
          {symbol:'Ъ ъ',example:'подъезд',meaning:'楼门口',note:'硬音符号，本身不发音，把前后隔开。'},
          {symbol:'Ь ь',example:'фильм',meaning:'电影',note:'软音符号，本身不发音，让前面的辅音变软。'},
          {symbol:'Э э',example:'экран',meaning:'屏幕',note:'读作“e”，多见于外来词。'},
          {symbol:'Ю ю',example:'аю',meaning:'熊',note:'读作“yu”。'},
          {symbol:'Я я',example:'аяқ',meaning:'脚',note:'读作“ya”。'}
        ]},
        {id:'kk-u1-l9',title:'易混字母对比',type:'listen',items:[
          ['听单词，开头是哪个字母？','кітап',['К к','Қ қ','Г г'],0,'К к'],
          ['听单词，开头是哪个字母？','ғасыр',['Г г','Ғ ғ','Қ қ'],1,'Ғ ғ'],
          ['听单词，结尾是哪个字母？','нан',['Н н','Ң ң','М м'],0,'Н н'],
          ['听单词，结尾是哪个字母？','таң',['Н н','Ң ң','Г г'],1,'Ң ң'],
          ['听单词，其中的元音是哪个？','ұл',['Ү ү','Ұ ұ','У у'],1,'Ұ ұ'],
          ['听单词，其中的元音是哪个？','қыз',['І і','И и','Ы ы'],2,'Ы ы']
        ]},
        {id:'kk-u1-l3',title:'拼读短词',type:'select',items:[
          ['“ана”是什么意思？',['妈妈','爸爸','语言'],0,'妈妈'],
          ['“үй”是什么意思？',['城市','房子','河流'],1,'房子'],
          ['“тіл”是什么意思？',['朋友','语言','学者'],1,'语言'],
          ['“қала”是什么意思？',['城市','野兽','车站'],0,'城市'],
          ['“су”是什么意思？',['火','水','山'],1,'水'],
          ['“нан”是什么意思？',['面包','茶','花'],0,'面包'],
          ['“дос”是什么意思？',['路','朋友','孩子'],1,'朋友']
        ]},
        {id:'kk-u1-l4',title:'发音小练习',type:'listen',items:[
          ['听单词，找出开头的字母。','тіл',['И и','Т т','Й й'],1,'Т т'],
          ['听单词，找出结尾的字母。','аң',['Н н','Ң ң','Г г'],1,'Ң ң'],
          ['听单词，找出开头的字母。','ғасыр',['Қ қ','Ғ ғ','Г г'],1,'Ғ ғ'],
          ['听单词，找出开头的字母。','шай',['Ш ш','Щ щ','Ж ж'],0,'Ш ш'],
          ['听单词，选出它的意思。','бала',['孩子','学校','山'],0,'孩子']
        ]}
      ]},
      {id:'kk-u2',num:2,title:'拼读与基础词',desc:'先会认、会读，再积累最常用的人称、地点和日常词',level:'入门+',lessons:[
        {id:'kk-u2-l1',title:'人称和高频词',type:'select',items:[
          ['“Мен”是什么意思？',['我','你','他'],0,'我'],
          ['“Сен”是什么意思？',['我','你','他们'],1,'你'],
          ['“үй”是什么意思？',['家/房子','工作','车站'],0,'家/房子'],
          ['“жол”是什么意思？',['路','货物','时间'],0,'路']
        ]},
        {id:'kk-u2-l2',title:'听懂基础词',type:'listen',items:[
          ['听“Мен”，选择对应中文。','Мен',['我','你','他'],0,'我'],
          ['听“Сен”，选择对应中文。','Сен',['我','你','他'],1,'你']
        ]},
        {id:'kk-u2-l3',title:'基础短语',type:'select',items:[
          ['“Рақмет.”是什么意思？',['谢谢','你好','再见'],0,'谢谢'],
          ['“Сәлеметсіз бе.”是什么意思？',['对不起','你好/您好','请等一下'],1,'你好/您好'],
          ['“Кешіріңіз.”是什么意思？',['对不起/不好意思','谢谢','再见'],0,'对不起/不好意思']
        ]}
      ]},
      {id:'kk-u3',num:3,title:'问候与自我介绍',desc:'从固定表达开始，让你第一次能开口交流',level:'初级',lessons:[
        {id:'kk-u3-l1',title:'问候',type:'select',items:[
          ['“你好。”怎么说？',['Сәлеметсіз бе.','Рақмет.','Қайырлы түн.'],0,'Сәлеметсіз бе.'],
          ['“谢谢。”怎么说？',['Кешіріңіз.','Рақмет.','Кездескенше.'],1,'Рақмет.']
        ]},
        {id:'kk-u3-l2',title:'简单介绍自己',type:'translate',items:[
          ['我是中国人。','Мен Қытайданмын.'],
          ['我在哈萨克斯坦工作。','Мен Қазақстанда жұмыс істеймін.']
        ]},
        {id:'kk-u3-l3',title:'第一轮组句',type:'reorder',items:[
          ['组成：你好。',['Сәлеметсіз','бе.'],'Сәлеметсіз бе.'],
          ['组成：我在哈萨克斯坦工作。',['Мен','Қазақстанда','жұмыс','істеймін.'],'Мен Қазақстанда жұмыс істеймін.']
        ]}
      ]},
      {id:'kk-u4',num:4,title:'基本句型',desc:'学会谁 + 在哪里 + 做什么，把词变成完整句子',level:'初级',lessons:[
        {id:'kk-u4-l1',title:'人称 + 动作',type:'select',items:[
          ['“Мен жұмыс істеймін.”是什么意思？',['我工作。','我休息。','我回家。'],0,'我工作。'],
          ['“Ол үйде.”是什么意思？',['他在家。','他在车站。','他在公司。'],0,'他在家。']
        ]},
        {id:'kk-u4-l2',title:'句子重组',type:'reorder',items:[
          ['组成：货物明天到。',['Жүк','ертең','келеді.'],'Жүк ертең келеді.'],
          ['组成：我需要帮助。',['Маған','көмек','керек.'],'Маған көмек керек.']
        ]},
        {id:'kk-u4-l3',title:'自己写一句',type:'write',items:[
          ['请用“Қазақстанда”造一句完整的话。','Мен Қазақстанда жұмыс істеймін.'],
          ['请用“ертең”造一句完整的话。','Мен ертең жұмыс істеймін.']
        ]}
      ]},
      {id:'kk-u5',num:5,title:'生活交流与造句',desc:'时间、地点、价格、方向，并开始自己组织表达',level:'初级+',lessons:[
        {id:'kk-u5-l1',title:'常用问句',type:'select',items:[
          ['“现在几点？”怎么说？',['Қай жерде?','Қазір сағат неше?','Қанша тұрады?'],1,'Қазір сағат неше?'],
          ['“多少钱？”怎么说？',['Қанша тұрады?','Қайырлы таң.','Кешіріңіз.'],0,'Қанша тұрады?']
        ]},
        {id:'kk-u5-l2',title:'中文 → 哈语',type:'translate',items:[
          ['在哪里？','Қай жерде?'],
          ['请等一下。','Күте тұрыңызшы.'],
          ['我要去车站。','Мен вокзалға барғым келеді.']
        ]},
        {id:'kk-u5-l3',title:'自己造句',type:'write',items:[
          ['请用“вокзалға”表达：我要去车站。','Мен вокзалға барғым келеді.'],
          ['请用“көмек”表达：我需要帮助。','Маған көмек керек.']
        ]}
      ]},
      {id:'kk-u6',num:6,title:'真实场景：工作与商务',desc:'从车站、仓库、装卸、运输到工厂、办公室、销售、安保和商务沟通',level:'实用',lessons:[
        {id:'kk-u6-l1',title:'车站与铁路',type:'select',items:[
          ['“火车什么时候发车？”',['Пойыз қашан жөнеледі?','Пойыз қайда?','Вагон қайда?'],0,'Пойыз қашан жөнеледі?'],
          ['“在哪个车站？”',['Қай станцияда?','Қай қоймада?','Қай жерде тиеу керек?'],0,'Қай станцияда?'],
          ['“请确认车厢编号。”',['Құжаттарды беріңізші.','Вагон нөмірін тексеріңізші.','Пойызды күтіңіз.'],1,'Вагон нөмірін тексеріңізші.']
        ]},
        {id:'kk-u6-l2',title:'仓库',type:'listen',items:[
          ['听句子，选择“货物在哪里？”','Жүк қай жерде?',['货物在哪里？','货物什么时候到？','货物已经装好了。'],0,'Жүк қай жерде?'],
          ['听句子，选择“仓库在哪里？”','Қойма қайда?',['仓库在哪里？','司机在哪里？','车站在哪里？'],0,'Қойма қайда?'],
          ['听句子，选择“请确认数量。”','Сан мөлшерін тексеріңізші.',['请确认数量。','请确认车号。','请确认时间。'],0,'Сан мөлшерін тексеріңізші.']
        ]},
        {id:'kk-u6-l3',title:'装卸作业',type:'translate',items:[
          ['什么时候开始装货？','Тиеу қашан басталады?'],
          ['在哪里卸货？','Жүкті қай жерде түсіреміз?'],
          ['请慢一点。','Баяуырақ жасаңызшы.']
        ]},
        {id:'kk-u6-l4',title:'运输与司机',type:'select',items:[
          ['“司机到了。”是什么意思？',['Жүргізуші келді.','Жүргізуші кетіп қалды.','Жүргізуші күтіп тұр.'],0,'Жүргізуші келді.'],
          ['“车还没到。”怎么说？',['Көлік келіп қалды.','Көлік әлі келген жоқ.','Көлік жолға шықты.'],1,'Көлік әлі келген жоқ.'],
          ['“什么时候发车？”怎么说？',['Қашан жөнелтіледі?','Қайда түсіреміз?','Кім жауап береді?'],0,'Қашан жөнелтіледі?']
        ]},
        {id:'kk-u6-l5',title:'单据与海关',type:'reorder',items:[
          ['组成：请把文件给我。',['Құжаттарды','маған','беріңізші.'],'Құжаттарды маған беріңізші.'],
          ['组成：请准备海关文件。',['Кеден','құжаттарын','дайындаңызшы.'],'Кеден құжаттарын дайындаңызшы.'],
          ['组成：文件已经准备好了。',['Құжаттар','дайын','болды.'],'Құжаттар дайын болды.']
        ]},
        {id:'kk-u6-l6',title:'工厂现场',type:'listen',items:[
          ['听句子，选择“设备坏了。”','Жабдық істен шықты.',['设备坏了。','设备已经启动。','设备还没到。'],0,'Жабдық істен шықты.'],
          ['听句子，选择“请停机。”','Жабдықты тоқтатыңызшы.',['请停机。','请开机。','请检查文件。'],0,'Жабдықты тоқтатыңызшы.'],
          ['听句子，选择“生产什么时候开始？”','Өндіріс қашан басталады?',['生产什么时候开始？','什么时候下班？','仓库什么时候关门？'],0,'Өндіріс қашан басталады?']
        ]},
        {id:'kk-u6-l7',title:'安全与安保',type:'translate',items:[
          ['请出示证件。','Құжатыңызды көрсетіңізші.'],
          ['这里禁止进入。','Бұл жерге кіруге болмайды.'],
          ['请先登记。','Алдымен тіркеліңіз.']
        ]},
        {id:'kk-u6-l8',title:'办公室',type:'select',items:[
          ['“今天几点开会？”怎么说？',['Бүгін жиналыс сағат нешеде?','Бүгін жұмыс қашан бітеді?','Бүгін кім келеді?'],0,'Бүгін жиналыс сағат нешеде?'],
          ['“请把文件发给我。”怎么说？',['Құжатты маған жіберіңізші.','Құжатты маған көрсетіңізші.','Құжатты алып кетіңізші.'],0,'Құжатты маған жіберіңізші.'],
          ['“我稍后回复。”怎么说？',['Кейінірек жауап беремін.','Қазір келемін.','Ертең кетемін.'],0,'Кейінірек жауап беремін.']
        ]},
        {id:'kk-u6-l9',title:'销售与报价',type:'translate',items:[
          ['请给我发一份报价。','Маған баға ұсынысын жіберіңізші.'],
          ['这个价格可以谈。','Бұл бағаны келісуге болады.'],
          ['客户什么时候到？','Клиент қашан келеді?']
        ]},
        {id:'kk-u6-l10',title:'商务与合同',type:'select',items:[
          ['“合同什么时候签？”怎么说？',['Шартқа қашан қол қоямыз?','Шарт қайда?','Шарт дайын емес пе?'],0,'Шартқа қашан қол қоямыз?'],
          ['“我们明天再讨论。”是什么意思？',['Біз ертең қайта талқылаймыз.','Біз бүгін кетеміз.','Біз қазір қол қоямыз.'],0,'Біз ертең қайта талқылаймыз.'],
          ['“客户要求修改合同。”是什么意思？',['Клиент шартты өзгертуді сұрады.','Клиент жолды өзгертті.','Клиент төлемді тоқтатты.'],0,'Клиент шартты өзгертуді сұрады.']
        ]},
        {id:'kk-u6-l11',title:'客户沟通',type:'write',items:[
          ['用“көмек”表达：我需要帮助。','Маған көмек керек.'],
          ['用“келісеміз”表达：我们同意。','Біз келісеміз.'],
          ['用“кейінірек”表达：我们稍后联系。','Біз кейінірек хабарласамыз.']
        ]},
        {id:'kk-u6-l12',title:'综合场景表达',type:'reorder',items:[
          ['组成：货物明天到。',['Жүк','ертең','келеді.'],'Жүк ертең келеді.'],
          ['组成：请确认装货时间。',['Тиеу','уақытын','тексеріңізші.'],'Тиеу уақытын тексеріңізші.'],
          ['组成：哪里可以停车？',['Көлікті','қай жерде','қоюға болады?'],'Көлікті қай жерде қоюға болады?']
        ]}
      ]}
    ]
  },
  ru: {
    label: '俄语', flag:'🇷🇺',
    desc: '从字母、发音和拼读开始，逐步进入词汇、句型、造句和真实交流。',
    units: [
      {id:'ru-u1',num:1,title:'字母与发音',desc:'33 个字母：元音、形似拉丁字母的“假朋友”、辅音、软硬音符号和重音',level:'入门',lessons:[
        {id:'ru-u1-l1',title:'元音与难点辅音',type:'intro',items:[
          {symbol:'А а',example:'мама',meaning:'妈妈',note:'基础元音，和汉语“啊”接近。'},
          {symbol:'О о',example:'он',meaning:'他',note:'重读时是圆唇“哦”；不重读时会弱化成接近“啊”。'},
          {symbol:'У у',example:'утро',meaning:'早晨',note:'圆唇“乌”。'},
          {symbol:'Э э',example:'это',meaning:'这/这是',note:'清楚的“e”音，前面没有 y。'},
          {symbol:'Ы ы',example:'мы',meaning:'我们',note:'俄语难点：舌头后缩、嘴角向两边，接近汉语“思”的韵母再拉长。'},
          {symbol:'И и',example:'мир',meaning:'世界/和平',note:'“衣”音，同时让前面的辅音变软。'},
          {symbol:'Й й',example:'чай',meaning:'茶',note:'短促的 y 音，常在元音后。'},
          {symbol:'Ж ж',example:'жить',meaning:'生活',note:'浊的“zh”，舌头比汉语 r 更靠后、更硬。'},
          {symbol:'Ш ш',example:'шар',meaning:'球',note:'硬的“sh”。'},
          {symbol:'Ч ч',example:'час',meaning:'小时',note:'软的“ch”，像汉语“七”的声母。'}
        ]},
        {id:'ru-u1-l5',title:'形似拉丁字母的“假朋友”',type:'intro',items:[
          {symbol:'В в',example:'вода',meaning:'水',note:'长得像 B，读作 v。'},
          {symbol:'Н н',example:'нет',meaning:'不/没有',note:'长得像 H，读作 n。'},
          {symbol:'Р р',example:'рыба',meaning:'鱼',note:'长得像 P，读作舌尖颤音 r。'},
          {symbol:'С с',example:'сок',meaning:'果汁',note:'长得像 C，读作 s。'},
          {symbol:'Х х',example:'хлеб',meaning:'面包',note:'长得像 X，读作喉部的 h，像汉语“喝”的声母。'},
          {symbol:'Е е',example:'есть',meaning:'有/吃',note:'长得像 E，读作“ye”。'},
          {symbol:'Б б',example:'брат',meaning:'兄弟',note:'像数字 6，读作 b。'}
        ]},
        {id:'ru-u1-l2',title:'听音认字',type:'listen',items:[
          ['听单词，找出其中的元音。','мы',['И и','Ы ы','У у'],1,'Ы ы'],
          ['听单词，找出开头的辅音。','час',['Ш ш','Ч ч','Щ щ'],1,'Ч ч'],
          ['听单词，找出开头的辅音。','жить',['Ж ж','Ш ш','Ч ч'],0,'Ж ж'],
          ['听单词，找出开头的辅音。','шар',['С с','Ш ш','Ж ж'],1,'Ш ш'],
          ['听单词，找出开头的辅音。','вода',['Б б','В в','Ф ф'],1,'В в']
        ]},
        {id:'ru-u1-l6',title:'其余辅音',type:'intro',items:[
          {symbol:'Г г',example:'город',meaning:'城市',note:'g 音。'},
          {symbol:'Д д',example:'дом',meaning:'家/房子',note:'浊的 d。'},
          {symbol:'З з',example:'зима',meaning:'冬天',note:'浊的 z。'},
          {symbol:'К к',example:'кот',meaning:'猫',note:'k 音，不送气。'},
          {symbol:'Л л',example:'лето',meaning:'夏天',note:'l 音；在 а、о、у 前舌头更靠后。'},
          {symbol:'М м',example:'молоко',meaning:'牛奶',note:'m 音。'},
          {symbol:'П п',example:'папа',meaning:'爸爸',note:'p 音，不送气。'},
          {symbol:'Т т',example:'там',meaning:'那里',note:'t 音，不送气。'},
          {symbol:'Ф ф',example:'фото',meaning:'照片',note:'f 音。'},
          {symbol:'Ц ц',example:'цирк',meaning:'马戏团',note:'ts 音，像汉语“次”的声母。'},
          {symbol:'Щ щ',example:'щи',meaning:'菜汤',note:'长而软的“sh”，比 ш 更软、更长。'}
        ]},
        {id:'ru-u1-l7',title:'带 y 的元音和软硬音符号',type:'intro',items:[
          {symbol:'Ё ё',example:'ёж',meaning:'刺猬',note:'读作“yo”，含 ё 的音节总是重读。'},
          {symbol:'Ю ю',example:'юг',meaning:'南方',note:'读作“yu”。'},
          {symbol:'Я я',example:'я',meaning:'我',note:'读作“ya”，单独就是“我”。'},
          {symbol:'Ь ь',example:'день',meaning:'天/日子',note:'软音符号，本身不发音，让前面的辅音变软。'},
          {symbol:'Ъ ъ',example:'подъезд',meaning:'楼门口',note:'硬音符号，本身不发音，把前后隔开。'}
        ]},
        {id:'ru-u1-l8',title:'易混字母对比',type:'listen',items:[
          ['听单词，开头是哪个字母？','щи',['Ш ш','Щ щ','Ч ч'],1,'Щ щ'],
          ['听单词，开头是哪个字母？','это',['Е е','Э э','Ё ё'],1,'Э э'],
          ['听单词，其中的元音是哪个？','мир',['И и','Ы ы','Й й'],0,'И и'],
          ['听单词，开头是哪个字母？','хлеб',['Х х','К к','Г г'],0,'Х х'],
          ['听单词，开头是哪个字母？','юг',['У у','Ю ю','Я я'],1,'Ю ю']
        ]},
        {id:'ru-u1-l3',title:'拼读短词',type:'select',items:[
          ['“мама”是什么意思？',['妈妈','爸爸','世界'],0,'妈妈'],
          ['“чай”是什么意思？',['茶','水','早晨'],0,'茶'],
          ['“утро”是什么意思？',['晚上','早晨','道路'],1,'早晨'],
          ['“мир”是什么意思？',['工作','语言','世界/和平'],2,'世界/和平'],
          ['“вода”是什么意思？',['水','面包','鱼'],0,'水'],
          ['“дом”是什么意思？',['猫','家/房子','城市'],1,'家/房子'],
          ['“хлеб”是什么意思？',['牛奶','果汁','面包'],2,'面包']
        ]},
        {id:'ru-u1-l4',title:'重音与弱化',type:'select',items:[
          ['“молоко”里只有最后一个 о 重读。前两个 о 读起来接近？',['а','о','у'],0,'а'],
          ['俄语单词里一般有几个重读音节？',['一个','两个','每个音节都重读'],0,'一个'],
          ['“вода”的重音在哪里？',['во','да','没有重音'],1,'да'],
          ['含有 ё 的音节是否重读？',['总是重读','从不重读','看情况'],0,'总是重读']
        ]}
      ]},
      {id:'ru-u2',num:2,title:'拼读与基础词',desc:'先读准最常用词，再学人称、地点和日常表达',level:'入门+',lessons:[
        {id:'ru-u2-l1',title:'人称和高频词',type:'select',items:[
          ['“Я”是什么意思？',['我','你','他'],0,'我'],
          ['“Ты”是什么意思？',['我','你','他们'],1,'你'],
          ['“дом”是什么意思？',['家','工作','车站'],0,'家'],
          ['“дорога”是什么意思？',['路','货物','时间'],0,'路']
        ]},
        {id:'ru-u2-l2',title:'基础短语',type:'select',items:[
          ['“Спасибо.”是什么意思？',['谢谢','你好','再见'],0,'谢谢'],
          ['“Здравствуйте.”是什么意思？',['对不起','你好/您好','请等一下'],1,'你好/您好'],
          ['“Извините.”是什么意思？',['对不起/不好意思','谢谢','再见'],0,'对不起/不好意思']
        ]},
        {id:'ru-u2-l3',title:'听懂基础词',type:'listen',items:[
          ['听“Я”，选择对应中文。','Я',['我','你','他'],0,'我'],
          ['听“Ты”，选择对应中文。','Ты',['我','你','他'],1,'你']
        ]}
      ]},
      {id:'ru-u3',num:3,title:'问候与自我介绍',desc:'从固定表达开始，让你第一次能开口交流',level:'初级',lessons:[
        {id:'ru-u3-l1',title:'问候',type:'select',items:[
          ['“你好。”怎么说？',['Здравствуйте.','Спасибо.','Доброй ночи.'],0,'Здравствуйте.'],
          ['“谢谢。”怎么说？',['Извините.','Спасибо.','До свидания.'],1,'Спасибо.']
        ]},
        {id:'ru-u3-l2',title:'简单介绍自己',type:'translate',items:[
          ['我是中国人。','Я из Китая.'],
          ['我在哈萨克斯坦工作。','Я работаю в Казахстане.']
        ]},
        {id:'ru-u3-l3',title:'第一轮组句',type:'reorder',items:[
          ['组成：你好。',['Здравствуйте.'],'Здравствуйте.'],
          ['组成：我在哈萨克斯坦工作。',['Я','работаю','в','Казахстане.'],'Я работаю в Казахстане.']
        ]}
      ]},
      {id:'ru-u4',num:4,title:'基本句型',desc:'学会谁 + 在哪里 + 做什么，把词变成完整句子',level:'初级',lessons:[
        {id:'ru-u4-l1',title:'人称 + 动作',type:'select',items:[
          ['“Я работаю.”是什么意思？',['我工作。','我休息。','我回家。'],0,'我工作。'],
          ['“Он дома.”是什么意思？',['他在家。','他在车站。','他在公司。'],0,'他在家。']
        ]},
        {id:'ru-u4-l2',title:'句子重组',type:'reorder',items:[
          ['组成：货物明天到。',['Груз','прибудет','завтра.'],'Груз прибудет завтра.'],
          ['组成：需要准备文件。',['Нужно','подготовить','документы.'],'Нужно подготовить документы.']
        ]},
        {id:'ru-u4-l3',title:'自己写一句',type:'write',items:[
          ['请用“Казахстане”造一句完整的话。','Я работаю в Казахстане.'],
          ['请用“завтра”造一句完整的话。','Я завтра работаю.']
        ]}
      ]},
      {id:'ru-u5',num:5,title:'生活交流与造句',desc:'时间、地点、价格、方向，并开始自己组织表达',level:'初级+',lessons:[
        {id:'ru-u5-l1',title:'常用问句',type:'select',items:[
          ['“现在几点？”怎么说？',['Где находится?','Который сейчас час?','Сколько стоит?'],1,'Который сейчас час?'],
          ['“多少钱？”怎么说？',['Сколько стоит?','Доброе утро.','Извините.'],0,'Сколько стоит?']
        ]},
        {id:'ru-u5-l2',title:'中文 → 俄语',type:'translate',items:[
          ['在哪里？','Где находится?'],
          ['请等一下。','Подождите, пожалуйста.'],
          ['我要去车站。','Я хочу поехать на вокзал.']
        ]},
        {id:'ru-u5-l3',title:'自己造句',type:'write',items:[
          ['请用“вокзал”表达：我要去车站。','Я хочу поехать на вокзал.'],
          ['请用“помощь”表达：我需要帮助。','Мне нужна помощь.']
        ]}
      ]},
      {id:'ru-u6',num:6,title:'真实场景：工作与商务',desc:'从车站、仓库、装卸、运输到工厂、办公室、销售、安保和商务沟通',level:'实用',lessons:[
        {id:'ru-u6-l1',title:'车站与铁路',type:'select',items:[
          ['“火车什么时候发车？”',['Когда отправляется поезд?','Где поезд?','Где вагон?'],0,'Когда отправляется поезд?'],
          ['“在哪个车站？”',['На какой станции?','На каком складе?','Где погрузка?'],0,'На какой станции?'],
          ['“请确认车厢编号。”',['Дайте документы, пожалуйста.','Проверьте номер вагона, пожалуйста.','Подождите поезд.'],1,'Проверьте номер вагона, пожалуйста.']
        ]},
        {id:'ru-u6-l2',title:'仓库',type:'listen',items:[
          ['听句子，选择“货物在哪里？”','Где находится груз?',['货物在哪里？','货物什么时候 прибудет？','货物 уже загружен.'],0,'Где находится груз?'],
          ['听句子，选择“仓库在哪里？”','Где склад?',['仓库在哪里？','司机在哪里？','车站在哪里？'],0,'Где склад?'],
          ['听句子，选择“请确认数量。”','Проверьте количество, пожалуйста.',['请确认数量。','请确认车号。','请确认时间。'],0,'Проверьте количество, пожалуйста.']
        ]},
        {id:'ru-u6-l3',title:'装卸作业',type:'translate',items:[
          ['什么时候开始装货？','Когда начнётся погрузка?'],
          ['在哪里卸货？','Где разгружать груз?'],
          ['请慢一点。','Пожалуйста, медленнее.']
        ]},
        {id:'ru-u6-l4',title:'运输与司机',type:'select',items:[
          ['“司机到了。”是什么意思？',['Водитель приехал.','Водитель уехал.','Водитель ждёт.'],0,'Водитель приехал.'],
          ['“车还没到。”怎么说？',['Машина уже приехала.','Машина ещё не приехала.','Машина отправилась.'],1,'Машина ещё не приехала.'],
          ['“什么时候发车？”怎么说？',['Когда отправляется?','Где разгружаем?','Кто отвечает?'],0,'Когда отправляется?']
        ]},
        {id:'ru-u6-l5',title:'单据与海关',type:'reorder',items:[
          ['组成：请把文件给我。',['Дайте','мне','документы,','пожалуйста.'],'Дайте мне документы, пожалуйста.'],
          ['组成：请准备海关文件。',['Подготовьте','таможенные','документы,','пожалуйста.'],'Подготовьте таможенные документы, пожалуйста.'],
          ['组成：文件已经准备好了。',['Документы','уже','готовы.'],'Документы уже готовы.']
        ]},
        {id:'ru-u6-l6',title:'工厂现场',type:'listen',items:[
          ['听句子，选择“设备坏了。”','Оборудование сломалось.',['设备坏了。','设备已经启动。','设备还没到。'],0,'Оборудование сломалось.'],
          ['听句子，选择“请停机。”','Остановите оборудование, пожалуйста.',['请停机。','请开机。','请检查文件。'],0,'Остановите оборудование, пожалуйста.'],
          ['听句子，选择“生产什么时候开始？”','Когда начинается производство?',['生产什么时候开始？','什么时候下班？','仓库什么时候关门？'],0,'Когда начинается производство?']
        ]},
        {id:'ru-u6-l7',title:'安全与安保',type:'translate',items:[
          ['请出示证件。','Предъявите, пожалуйста, документ.'],
          ['这里禁止进入。','Вход сюда запрещён.'],
          ['请先登记。','Сначала зарегистрируйтесь.']
        ]},
        {id:'ru-u6-l8',title:'办公室',type:'select',items:[
          ['“今天几点开会？”怎么说？',['Во сколько сегодня совещание?','Когда сегодня заканчивается работа?','Кто сегодня придёт?'],0,'Во сколько сегодня совещание?'],
          ['“请把文件发给我。”怎么说？',['Отправьте мне документ, пожалуйста.','Покажите мне документ, пожалуйста.','Заберите документ, пожалуйста.'],0,'Отправьте мне документ, пожалуйста.'],
          ['“我稍后回复。”怎么说？',['Я отвечу позже.','Я сейчас приду.','Я уеду завтра.'],0,'Я отвечу позже.']
        ]},
        {id:'ru-u6-l9',title:'销售与报价',type:'translate',items:[
          ['请给我发一份报价。','Пришлите мне коммерческое предложение.'],
          ['这个价格可以谈。','Эту цену можно обсудить.'],
          ['客户什么时候到？','Когда приедет клиент?']
        ]},
        {id:'ru-u6-l10',title:'商务与合同',type:'select',items:[
          ['“合同什么时候签？”怎么说？',['Когда подпишем договор?','Где договор?','Договор ещё не готов?'],0,'Когда подпишем договор?'],
          ['“我们明天再讨论。”是什么意思？',['Обсудим завтра.','Мы сегодня уедем.','Мы сейчас подпишем.'],0,'Обсудим завтра.'],
          ['“客户要求修改合同。”是什么意思？',['Клиент попросил изменить договор.','Клиент изменил маршрут.','Клиент остановил оплату.'],0,'Клиент попросил изменить договор.']
        ]},
        {id:'ru-u6-l11',title:'客户沟通',type:'write',items:[
          ['用“помощь”表达：我需要帮助。','Мне нужна помощь.'],
          ['用“согласны”表达：我们同意。','Мы согласны.'],
          ['用“позже”表达：我们稍后联系。','Мы свяжемся позже.']
        ]},
        {id:'ru-u6-l12',title:'综合场景表达',type:'reorder',items:[
          ['组成：货物明天到。',['Груз','прибудет','завтра.'],'Груз прибудет завтра.'],
          ['组成：请确认装货时间。',['Проверьте','время','погрузки,','пожалуйста.'],'Проверьте время погрузки, пожалуйста.'],
          ['组成：哪里可以停车？',['Где','можно','припарковаться?'],'Где можно припарковаться?']
        ]}
      ]}
    ]
  }
};

function qs(name){return new URLSearchParams(location.search).get(name)}
function langKey(){return qs('lang')==='ru'?'ru':'kk'}
function getPath(){return V5_PATHS[langKey()]}
function qs(name){return new URLSearchParams(location.search).get(name)}
function langKey(){return qs('lang')==='ru'?'ru':'kk'}
function getPath(){return V5_PATHS[langKey()]}
function nodeKey(k){return 'v5:'+k}
function currentUserKey(){return getUser()?.id ? `v5_progress_user_${getUser().id}` : 'v5_progress_guest'}
function localProgress(){
  try {
    const legacy=localStorage.getItem('v5_progress');
    if(legacy && !localStorage.getItem('v5_progress_guest')) localStorage.setItem('v5_progress_guest',legacy);
    return JSON.parse(localStorage.getItem(currentUserKey())||'{}');
  } catch { return {}; }
}
function saveLocal(k,v){const p=localProgress();p[k]=v;localStorage.setItem(currentUserKey(),JSON.stringify(p))}
function getUser(){return window.__v5User||null}
function progressEntry(id){const p=localProgress(); return p[nodeKey(id)] || p[id] || null}
function supabaseConfigured(){return !!(window.supabase&&window.SUPABASE_CONFIG?.url&&window.SUPABASE_CONFIG?.publishableKey&&!String(window.SUPABASE_CONFIG.url).includes('YOUR-PROJECT')&&!String(window.SUPABASE_CONFIG.publishableKey).includes('YOUR_SUPABASE'))}
async function initUser(){
  try {
    await window.KZLearning.ready();
    const c=window.KZAuth.getClient();
    window.__v5Supabase=c;
    const {data:authData}=await c.auth.getSession();
    window.__v5User=authData?.session?.user||null;
    if(window.__v5User){
      const guestKey='v5_progress_guest';
      const guestRaw=localStorage.getItem(guestKey);
      const {data:rows}=await c.from('learning_progress').select('node_id,language,status,score,updated_at').eq('user_id',window.__v5User.id).limit(2000);
      const remote={};
      if(Array.isArray(rows)) rows.forEach(r=>remote[r.node_id]={language:r.language,status:r.status,score:r.score,updated_at:r.updated_at});
      let guest={};
      try{guest=JSON.parse(guestRaw||'{}')}catch{guest={}}
      const merged={...guest,...remote,...localProgress()};
      localStorage.setItem(currentUserKey(),JSON.stringify(merged));
      // One-time migration of guest progress into the first logged-in account.
      if(guestRaw && !localStorage.getItem(`v5_guest_migrated_${window.__v5User.id}`)){
        const rowsToUpload=Object.entries(guest).filter(([node_id])=>!remote[node_id]).map(([node_id,v])=>({user_id:window.__v5User.id,node_id,language:v.language||langKey(),status:v.status||'in_progress',score:v.score??null,updated_at:v.updated_at||new Date().toISOString()}));
        if(rowsToUpload.length){try{await c.from('learning_progress').upsert(rowsToUpload,{onConflict:'user_id,node_id'})}catch(e){console.warn('guest migration failed',e)}}
        localStorage.setItem(`v5_guest_migrated_${window.__v5User.id}`,'1');
      }
    }
  } catch(e){console.warn('auth/progress init failed',e)}
  return getUser();
}
async function saveRemoteProgress(nodeId,data){
  const key=nodeId.startsWith('v5:')?nodeId:nodeKey(nodeId);
  saveLocal(key,data);
  const u=getUser(),s=window.__v5Supabase;
  if(!u||!s)return;
  try{await s.from('learning_progress').upsert({user_id:u.id,node_id:key,language:data.language,status:data.status||'in_progress',score:data.score??null,updated_at:new Date().toISOString()},{onConflict:'user_id,node_id'})}catch(e){console.warn('remote progress failed',e)}
}
async function saveTestResult(nodeId,data){
  const u=getUser(),s=window.__v5Supabase;
  if(!u||!s)return;
  const key=nodeId.startsWith('v5:')?nodeId:nodeKey(nodeId);
  try{await s.from('test_results').insert({user_id:u.id,node_id:key,language:data.language,score:data.score,passed:data.passed,answers:data.answers||[],created_at:new Date().toISOString()})}catch(e){console.warn('remote test failed',e)}
}
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function calcUnitState(unit){const done=unit.lessons.filter(l=>progressEntry(l.id)?.status==='done').length,test=progressEntry(unit.id)?.status==='passed';return {done,total:unit.lessons.length,percent:Math.round(done/unit.lessons.length*100),test}}
// Units unlock by exam results only; an account is optional (it syncs progress across devices).
function requiresAccount(path,idx){return false}
function unitUnlocked(path,idx){
  if(idx===0)return true;
  if(requiresAccount(path,idx))return false;
  return !!calcUnitState(path.units[idx-1]).test;
}
function loginGate(path,unit,idx){
  const next=encodeURIComponent(`unit.html?lang=${langKey()}&unit=${unit.id}`);
  return `<div class="login-gate"><span class="eyebrow">免费体验到这里</span><h2>从第 2 单元开始，请先注册 / 登录继续</h2><p>前面的课程可以先免费体验。注册后，我们会把你的学习进度和考试成绩绑定到这个账号，换设备也能继续。</p><div class="gate-stats"><span>✅ 第1单元可免费体验</span><span>☁️ 登录后云端保存进度</span><span>📊 可查看考试成绩</span></div><div class="result-actions"><a class="secondary-btn" href="path.html?lang=${langKey()}">返回学习路径</a><a class="primary-btn" href="auth.html?mode=signup&next=${next}">注册 / 登录</a></div></div>`;
}
function speak(text,lang){if(window.KZLearning){window.KZLearning.voice(text,String(lang).startsWith('kk')?'kk':'ru',0.86);return;}if(!('speechSynthesis' in window)){alert('当前浏览器不支持语音朗读');return}window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=lang==='kk'?'kk-KZ':'ru-RU';u.rate=0.86;u.pitch=1;window.speechSynthesis.speak(u)}
function renderPath(){
  const path=getPath();
  document.title=`${path.label}学习路径｜中亚语言通`;
  document.getElementById('pathTitle').textContent=`${path.flag} ${path.label}`;
  document.getElementById('pathDesc').textContent=getUser()?path.desc:`${path.desc} 无需注册即可学习全部单元；登录后进度可在其他设备继续。`;
  const unlocked=path.units.filter((u,i)=>unitUnlocked(path,i)).length;
  document.getElementById('pathStats').innerHTML=`<div><b>${unlocked}</b><span>当前可进入</span></div><div><b>${path.units.length}</b><span>总单元</span></div><div><b>${getUser()?'已登录':'游客'}</b><span>${getUser()?'进度云端同步':'登录后可同步进度'}</span></div>`;
  document.getElementById('pathList').innerHTML=path.units.map((u,i)=>{
    const open=unitUnlocked(path,i),st=calcUnitState(u),gate=requiresAccount(path,i);
    let action='';
    if(open) action=`<a class="primary-btn small" href="unit.html?lang=${langKey()}&unit=${u.id}">${st.percent?'继续':'开始'} →</a>`;
    else if(gate) action=getUser()?`<span class="lock-copy">通过上一单元考试后解锁</span>`:`<a class="secondary-btn small" href="auth.html?mode=signup&next=${encodeURIComponent(`path.html?lang=${langKey()}`)}">注册 / 登录后继续</a>`;
    else action=`<span class="lock-copy">通过上一单元考试后解锁</span>`;
    return `<div class="path-node ${open?'open':'locked'} ${gate?'account-locked':''}"><div class="node-num">${open?u.num:'🔒'}</div><div class="node-main"><div class="node-top"><span class="eyebrow">UNIT ${u.num} · ${u.level}</span><span>${st.test?'✅ 已通过':st.percent+'%'}</span></div><h3>${u.title}</h3><p>${u.desc}</p><div class="progress-track"><span style="width:${st.percent}%"></span></div></div><div class="node-action">${action}</div></div>`;
  }).join('');
}
function renderUnit(){
  const path=getPath(),unitId=qs('unit')||path.units[0].id,unit=path.units.find(u=>u.id===unitId);
  if(!unit)return location.href=`path.html?lang=${langKey()}`;
  const idx=path.units.indexOf(unit);
  if(requiresAccount(path,idx) && !getUser()){document.getElementById('backLink').href=`path.html?lang=${langKey()}`;document.getElementById('unitHeader').innerHTML=loginGate(path,unit,idx);document.getElementById('lessonList').innerHTML='';return;}
  if(!unitUnlocked(path,idx))return location.href=`path.html?lang=${langKey()}`;
  document.getElementById('backLink').href=`path.html?lang=${langKey()}`;
  const st=calcUnitState(unit);
  document.getElementById('unitHeader').innerHTML=`<span class="eyebrow">UNIT ${unit.num} · ${unit.level}</span><h1>${unit.title}</h1><p>${unit.desc}</p><div class="unit-meter"><span>${st.done}/${st.total} 小课完成</span><div class="progress-track"><span style="width:${st.percent}%"></span></div></div>`;
  document.getElementById('lessonList').innerHTML=unit.lessons.map((l,i)=>{const done=progressEntry(l.id)?.status==='done';const typeLabel={intro:'认识发音',listen:'听音选择',select:'认识词语',translate:'翻译',reorder:'组句',write:'造句'}[l.type]||'练习';return `<a class="lesson-row ${done?'done':''}" href="lesson-v4.html?lang=${langKey()}&unit=${unit.id}&lesson=${l.id}"><div class="lesson-index">${done?'✓':i+1}</div><div><strong>${l.title}</strong><span>${typeLabel}</span></div><b>${done?'已完成':'开始 →'}</b></a>`}).join('')+`<div class="unit-test-card"><div><span class="eyebrow">UNIT TEST</span><h3>单元考试</h3><p>必须先完成本单元所有小课，再参加测试；达到 70% 才能解锁下一单元。</p></div><a class="primary-btn" href="quiz-v4.html?lang=${langKey()}&unit=${unit.id}">参加考试 →</a></div>`;
}
function renderLesson(){
  const path=getPath(),unit=path.units.find(u=>u.id===qs('unit')),lesson=unit?.lessons.find(l=>l.id===qs('lesson'));
  if(!lesson)return;
  const idx=unit?path.units.indexOf(unit):-1;
  if(unit && requiresAccount(path,idx) && !getUser()){document.getElementById('lessonTop').innerHTML=loginGate(path,unit,idx);document.getElementById('exerciseArea').innerHTML='';return;}
  if(unit && !unitUnlocked(path,idx)){location.href=`path.html?lang=${langKey()}`;return;}
  document.getElementById('lessonTop').innerHTML=`<a class="back-link" href="unit.html?lang=${langKey()}&unit=${unit.id}">← ${unit.title}</a><span class="eyebrow">小课 · ${unit.num}</span><h1>${lesson.title}</h1><p>从最简单的一步开始，完成本小课后再进入下一项。</p>`;
  const area=document.getElementById('exerciseArea');let i=0,score=0;const items=lesson.items;function finish(){const pct=Math.round(score/items.length*100);saveRemoteProgress(lesson.id,{language:langKey(),status:'done',score:pct});area.innerHTML=`<div class="result-card"><span class="eyebrow">完成</span><h2>本小课完成！</h2><div class="score-big">${pct}%</div><p>你完成了 ${items.length} 个练习。${getUser()?'进度已保存在本设备。联网后会尝试同步到账号。':'当前为游客模式，进度仅保存在本设备。'}</p><a class="primary-btn" href="unit.html?lang=${langKey()}&unit=${unit.id}">返回单元 →</a></div>`}
  function next(){if(i>=items.length){finish();return}const it=items[i];const meta=`<div class="exercise-meta"><span>${i+1} / ${items.length}</span><div class="progress-track"><span style="width:${Math.round(i/items.length*100)}%"></span></div></div>`;
  if(lesson.type==='intro'){area.innerHTML=meta+`<div class="exercise-card pronunciation-card"><span class="eyebrow">认识发音</span><div class="pronunciation-item"><div class="sound-symbol">${it.symbol}</div><button class="pronunciation-audio" id="playSymbol" type="button">🔊 听字母</button></div><div class="pronunciation-item"><h2>${it.example}</h2><button class="pronunciation-audio" id="playExample" type="button">🔊 听单词</button></div><p class="meaning">${it.meaning}</p><p class="hint">${it.note}</p><div class="pronunciation-actions"><button class="secondary-btn" id="knowIt">我会了，下一张 →</button></div></div>`;area.querySelector('#playSymbol').onclick=()=>speak(it.symbol.replace(/\s+/g,' '),langKey());area.querySelector('#playExample').onclick=()=>speak(it.example,langKey());area.querySelector('#knowIt').onclick=()=>{score++;i++;next()};return}
  if(lesson.type==='listen'||lesson.type==='select'){const prompt=it[0],audioText=lesson.type==='listen'?it[1]:null,options=Array.isArray(it[2])?it[2]:it[1],correct=Number.isInteger(it[3])?it[3]:0;area.innerHTML=meta+`<div class="exercise-card"><span class="eyebrow">${lesson.type==='listen'?'先听再选':'认识词语'}</span><h2>${prompt}</h2>${audioText?`<button class="audio-btn" id="playAudio">🔊 播放发音</button>`:''}${options.map((x,j)=>`<button class="answer-option" data-j="${j}">${x}</button>`).join('')}</div>`;if(audioText)area.querySelector('#playAudio').onclick=()=>speak(audioText,langKey());area.querySelectorAll('.answer-option').forEach(b=>b.onclick=()=>{const ok=+b.dataset.j===correct;if(ok)score++;area.querySelectorAll('.answer-option').forEach(x=>x.disabled=true);b.classList.add(ok?'correct':'wrong');if(!ok){const right=area.querySelector(`[data-j="${correct}"]`);if(right)right.classList.add('correct')}const fb=document.createElement('div');fb.className='feedback-box '+(ok?'good':'bad');fb.textContent=ok?'正确！':'看看绿色的正确答案。';area.querySelector('.exercise-card').appendChild(fb);setTimeout(()=>{i++;next()},650)});return}
  if(lesson.type==='translate'||lesson.type==='write'){const answer=it[1];const title=lesson.type==='translate'?`中文 → ${path.label}`:'自己造句';area.innerHTML=meta+`<div class="exercise-card"><span class="eyebrow">${title}</span><h2>${it[0]}</h2><textarea id="textAnswer" class="answer-input" rows="3" placeholder="写出你的答案"></textarea><button id="submitText" class="primary-btn">提交答案</button><p class="hint">初学阶段先用标准答案帮助建立正确句型；可以参考例句修改后再练。</p></div>`;area.querySelector('#submitText').onclick=()=>{const v=area.querySelector('#textAnswer').value.trim();const ok=v===answer;if(ok)score++;area.querySelector('#textAnswer').disabled=true;area.querySelector('#submitText').disabled=true;const fb=document.createElement('div');fb.className='feedback-box '+(ok?'good':'bad');fb.textContent=ok?'正确！':`参考表达：${answer}`;area.querySelector('.exercise-card').appendChild(fb);setTimeout(()=>{i++;next()},900)};return}
  if(lesson.type==='reorder'){const phrase=shuffle(it[1]);area.innerHTML=meta+`<div class="exercise-card"><span class="eyebrow">组句</span><h2>${it[0]}</h2><div id="chips" class="chip-bank">${phrase.map((x,j)=>`<button class="word-chip" data-word="${x}" data-id="${j}">${x}</button>`).join('')}</div><div id="chosen" class="chosen-line"></div><button id="checkOrder" class="primary-btn" disabled>检查句子</button></div>`;const chosen=[];area.querySelectorAll('.word-chip').forEach(b=>b.onclick=()=>{if(b.disabled)return;chosen.push(b.dataset.word);b.disabled=true;area.querySelector('#chosen').textContent=chosen.join(' ');area.querySelector('#checkOrder').disabled=false});area.querySelector('#checkOrder').onclick=()=>{const expected=it[2],got=chosen.join(' '),ok=got===expected;if(ok)score++;const fb=document.createElement('div');fb.className='feedback-box '+(ok?'good':'bad');fb.textContent=ok?'组句正确！':`正确顺序：${expected}`;area.querySelector('.exercise-card').appendChild(fb);area.querySelector('#checkOrder').disabled=true;setTimeout(()=>{i++;next()},900)};return}
  }
  next()
}
function normalizeQuestion(l,it){if(l.type==='listen'){return {type:'select',prompt:it[0],options:it[2],correct:it[3],audio:it[1]}}if(l.type==='select'){return {type:'select',prompt:it[0],options:it[2],correct:it[3]}}if(l.type==='translate'||l.type==='write'){return {type:l.type,prompt:it[0],answer:it[1]}}if(l.type==='reorder'){return {type:l.type,prompt:it[0],words:it[1],answer:it[2]}}return null}
function renderQuiz(){
  const path=getPath(),unit=path.units.find(u=>u.id===qs('unit'));
  if(!unit)return;
  const idx=path.units.indexOf(unit);
  if(requiresAccount(path,idx) && !getUser()){document.getElementById('quizArea').innerHTML=loginGate(path,unit,idx);return;}
  if(!v7UnitUnlocked(path,idx)){document.getElementById('quizArea').innerHTML=`<div class="result-card"><h2>这个单元还没有解锁</h2><a class="primary-btn" href="path.html?lang=${langKey()}">返回学习路径 →</a></div>`;return}
  const ready=unit.lessons.every(l=>progressEntry(l.id)?.status==='done');
  if(!ready){document.getElementById('quizArea').innerHTML=`<div class="result-card"><span class="eyebrow">UNIT TEST</span><h2>先完成本单元的小课</h2><p>你需要完成所有 ${unit.lessons.length} 个小课，之后才能参加单元考试。</p><a class="primary-btn" href="unit.html?lang=${langKey()}&unit=${unit.id}">返回单元 →</a></div>`;return}
  const all=[];unit.lessons.forEach(l=>l.items.forEach(it=>{const q=normalizeQuestion(l,it);if(q)all.push(q)}));const q=shuffle(all).slice(0,Math.min(10,all.length));let i=0,score=0,answers=[];
  function draw(){const area=document.getElementById('quizArea');if(i>=q.length){const pct=Math.round(score/q.length*100),passed=pct>=70;saveRemoteProgress(unit.id,{language:langKey(),status:passed?'passed':'failed',score:pct});saveTestResult(unit.id,{language:langKey(),score:pct,passed,answers});area.innerHTML=`<div class="result-card ${passed?'pass':'fail'}"><span class="eyebrow">UNIT TEST</span><h1>${passed?'恭喜过关！':'还差一点'}</h1><div class="score-big">${pct}%</div><p>答对 ${score} / ${q.length}。${passed?'下一单元已解锁。':'需要达到 70%，回去复习后再试一次。'}</p><div class="result-actions"><a class="secondary-btn" href="unit.html?lang=${langKey()}&unit=${unit.id}">返回单元</a><a class="primary-btn" href="path.html?lang=${langKey()}">返回路线 →</a></div></div>`;return}const x=q[i];const hasTargetText=/[А-Яа-яӘәӨөҮүҰұҚқҒғҢңІіҺһЁёЫыЭэЮюЯя]/.test(x.prompt);let html=`<div class="quiz-head"><div><span class="eyebrow">UNIT TEST · ${i+1}/${q.length}</span><h1>${unit.title}</h1></div><div class="quiz-score">${score} 分</div></div><div class="exercise-card"><div class="question-with-audio"><h2>${x.prompt}</h2>${hasTargetText?`<button class="question-audio" id="quizPromptAudio" type="button">🔊 听这句</button>`:''}</div>`;if(x.audio)html+=`<button class="audio-btn" id="quizAudio">🔊 播放听力</button>`;if(x.type==='select')html+=x.options.map((o,j)=>`<button class="answer-option" data-j="${j}"><span>${o}</span>${/[А-Яа-яӘәӨөҮүҰұҚқҒғҢңІіҺһЁёЫыЭэЮюЯя]/.test(o)?`<span class="option-audio" data-text="${o.replace(/"/g,'&quot;')}" data-lang="${langKey()==='kk'?'kk-KZ':'ru-RU'}">🔊</span>`:''}</button>`).join('');else if(x.type==='translate'||x.type==='write')html+=`<textarea id="quizInput" class="answer-input" rows="3" placeholder="请输入答案"></textarea><button class="primary-btn" id="quizSubmit">提交</button>`;else html+=`<div class="chip-bank">${shuffle(x.words).map(w=>`<button class="word-chip" data-word="${w}">${w}</button>`).join('')}</div><div id="chosen" class="chosen-line"></div><button class="primary-btn" id="quizSubmit" disabled>检查句子</button>`;html+='</div>';area.innerHTML=html;if(hasTargetText){const b=area.querySelector('#quizPromptAudio');if(b)b.onclick=()=>speak(x.prompt.match(/[А-Яа-яӘәӨөҮүҰұҚқҒғҢңІіҺһЁёЫыЭэЮюЯя][А-Яа-яӘәӨөҮүҰұҚқҒғҢңІіҺһЁёЫыЭэЮюЯя\s.-]*/)?.[0]||x.prompt,langKey());}area.querySelectorAll('.option-audio').forEach(b=>b.onclick=e=>{e.stopPropagation();speak(b.dataset.text,b.dataset.lang)});if(x.audio)area.querySelector('#quizAudio').onclick=()=>speak(x.audio,langKey());if(x.type==='select'){area.querySelectorAll('.answer-option').forEach(b=>b.onclick=()=>{const ok=+b.dataset.j===x.correct;if(ok)score++;answers.push({prompt:x.prompt,correct:ok});area.querySelectorAll('.answer-option').forEach(z=>z.disabled=true);b.classList.add(ok?'correct':'wrong');if(!ok){const right=area.querySelector(`[data-j="${x.correct}"]`);if(right)right.classList.add('correct')}const box=document.createElement('div');box.className='feedback-box '+(ok?'good':'bad');box.textContent=ok?'正确！':'再看一下正确答案。';area.querySelector('.exercise-card').appendChild(box);setTimeout(()=>{i++;draw()},650)})}else if(x.type==='translate'||x.type==='write'){area.querySelector('#quizSubmit').onclick=()=>{const v=area.querySelector('#quizInput').value.trim(),ok=v===x.answer;if(ok)score++;answers.push({prompt:x.prompt,correct:ok});area.querySelector('#quizInput').disabled=true;area.querySelector('#quizSubmit').disabled=true;const box=document.createElement('div');box.className='feedback-box '+(ok?'good':'bad');box.textContent=ok?'正确！':`参考答案：${x.answer}`;area.querySelector('.exercise-card').appendChild(box);setTimeout(()=>{i++;draw()},900)}}else{const chosen=[];area.querySelectorAll('.word-chip').forEach(b=>b.onclick=()=>{if(b.disabled)return;chosen.push(b.dataset.word);b.disabled=true;area.querySelector('#chosen').textContent=chosen.join(' ');area.querySelector('#quizSubmit').disabled=false});area.querySelector('#quizSubmit').onclick=()=>{const ok=chosen.join(' ')===x.answer;if(ok)score++;answers.push({prompt:x.prompt,correct:ok});const box=document.createElement('div');box.className='feedback-box '+(ok?'good':'bad');box.textContent=ok?'正确！':`正确顺序：${x.answer}`;area.querySelector('.exercise-card').appendChild(box);area.querySelector('#quizSubmit').disabled=true;setTimeout(()=>{i++;draw()},900)}}}
  draw()
}
function renderProgress(){initUser().then(()=>{const p=localProgress(),paths=[V5_PATHS.kk,V5_PATHS.ru];const u=getUser();document.getElementById('progressUser').textContent=u?`当前账号：${u.email}。学习进度将同步到云端。`:'当前为游客模式：可以学习全部单元，进度保存在本设备；登录后可同步到账号。';document.getElementById('progressDashboard').innerHTML=paths.map(path=>{const passed=path.units.filter(u=>p[nodeKey(u.id)]?.status==='passed').length,done=path.units.reduce((n,u)=>n+u.lessons.filter(l=>p[nodeKey(l.id)]?.status==='done').length,0),total=path.units.reduce((n,u)=>n+u.lessons.length,0),pct=Math.round(done/total*100);const rows=path.units.map((unit,idx)=>{const st=calcUnitState(unit);const gate=requiresAccount(path,idx);let state=st.test?'✅ 已通过':gate&&!getUser()?'🔐 注册后继续':st.percent?`学习中 · ${st.percent}%`:'未开始';return `<div class="mini-unit-row"><span>${unit.num}. ${unit.title}</span><b>${state}</b></div>`}).join('');return `<div class="dashboard-card"><div class="dashboard-title"><span>${path.flag} ${path.label}</span><b>${pct}%</b></div><div class="progress-track"><span style="width:${pct}%"></span></div><p>${passed}/${path.units.length} 个单元通过 · ${done}/${total} 小课完成</p><div class="mini-unit-list">${rows}</div><a class="secondary-btn" href="path.html?lang=${path===V5_PATHS.kk?'kk':'ru'}">继续学习 →</a></div>`}).join('')})}


/* ========================= V7 ========================= */
const V7_PLACEMENT = { kk: {questions: [["选出正确的特殊元音。",["Ә ә","Е е","И и","А а"],0],["“үй”是什么意思？",["房子","语言","朋友","车站"],0],["“Рақмет.”是什么意思？",["你好","谢谢","再见","对不起"],1],["“Сәлеметсіз бе.”是什么意思？",["谢谢","对不起","你好/您好","请等一下"],2],["“Мен”是什么意思？",["我","你","他","我们"],0],["“Мен Қазақстанда жұмыс істеймін.”是什么意思？",["我住在中国。","我在哈萨克斯坦工作。","我去火车站。","我需要帮助。"],1],["“Қазір сағат неше?”是什么意思？",["多少钱？","在哪里？","现在几点？","什么时候到？"],2],["“Қанша тұрады?”是什么意思？",["多少钱？","在哪里？","几点？","什么时候？"],0],["“Күте тұрыңызшы.”是什么意思？",["请坐下。","请等一下。","请进来。","请签字。"],1],["“Маған көмек керек.”是什么意思？",["我要走了。","我需要帮助。","我有时间。","我在工作。"],1],["哪一句表示“货物明天到”？",["Жүк ертең келеді.","Жүк қашан келеді?","Жүк әлі келген жоқ.","Жүк қайда?"],0],["哪一句表示“火车什么时候发车”？",["Вагон нөмірін тексеріңізші.","Пойыз қашан жөнеледі?","Пойыз қайда?","Пойызды күтіңіз."],1],["“Құжаттарды маған беріңізші.”是什么意思？",["请把单据给我。","请确认车厢。","请等一下。","请开始装货。"],0],["“Жүкті қай жерде түсіреміз?”是什么意思？",["什么时候装货？","在哪里卸货？","货物到了吗？","谁负责运输？"],1],["“Жүк әлі келген жоқ.”是什么意思？",["货物已经到了。","货物还没到。","货物明天到。","货物在哪里？"],1],["哪一句表示“我需要帮助”？",["Мен жұмыс істеймін.","Маған көмек керек.","Көмек қашан болады?","Мен үйдемін."],1],["哪一句表示“我在哈萨克斯坦工作”？",["Мен Қазақстанда жұмыс істеймін.","Мен Қазақстанға барамын.","Мен Қазақстанды білемін.","Мен үйде жұмыс істеймін."],0],["你看到“Вагон нөмірін тексеріңізші.”，它最可能用于什么场景？",["餐厅点菜","铁路现场","租房","医院"],1]]}, ru: {questions: [["选出正确的特殊元音。",["Ы ы","И и","У у","Э э"],0],["“чай”是什么意思？",["茶","水","早晨","道路"],0],["“Спасибо.”是什么意思？",["谢谢","你好","对不起","再见"],0],["“Здравствуйте.”是什么意思？",["谢谢","你好/您好","请等一下","明天见"],1],["“Я”是什么意思？",["我","你","他","我们"],0],["“Я работаю в Казахстане.”是什么意思？",["我住在俄罗斯。","我在哈萨克斯坦工作。","我去车站。","我需要帮助。"],1],["“Который сейчас час?”是什么意思？",["多少钱？","现在几点？","在哪里？","什么时候到？"],1],["“Сколько стоит?”是什么意思？",["多少钱？","在哪里？","几点？","怎么走？"],0],["“Подождите, пожалуйста.”是什么意思？",["请进来。","请等一下。","请签字。","请停车。"],1],["“Мне нужна помощь.”是什么意思？",["我需要帮助。","我有时间。","我要回家。","我在工作。"],0],["哪一句表示“货物明天到”？",["Груз прибудет завтра.","Когда прибудет груз?","Груз ещё не приехал.","Где груз?"],0],["哪一句表示“货物什么时候到”？",["Груз завтра.","Когда прибудет груз?","Дайте документы.","Где водитель?"],1],["“Дайте мне документы, пожалуйста.”是什么意思？",["请把单据给我。","请关闭门。","请等一下。","请开始装货。"],0],["“Оборудование сломалось.”是什么意思？",["设备坏了。","设备到了。","设备很新。","设备在仓库。"],0],["“Машина ещё не приехала.”是什么意思？",["车还没到。","车已经到了。","车在这里。","车要出发了。"],0],["哪一句表示“这里不能停车”？",["Здесь можно парковаться.","Здесь нельзя парковаться.","Здесь стоит машина.","Здесь парковка."],1],["哪一句表示“我在哈萨克斯坦工作”？",["Я работаю в Казахстане.","Я еду в Казахстан.","Я живу дома.","Я знаю Казахстан."],0],["你看到“Когда начнётся погрузка?”，它最可能用于什么场景？",["餐厅点菜","货物装运","医院问诊","租房"],1]]} };

function v7PlacementKey(lang, userId){ return `v7_placement_${lang}_${userId || 'guest'}`; }
function v7GetPlacement(lang){ try { return JSON.parse(localStorage.getItem(v7PlacementKey(lang, getUser()?.id)) || 'null'); } catch { return null; } }
function v7SetPlacement(lang, data){ localStorage.setItem(v7PlacementKey(lang, getUser()?.id), JSON.stringify(data)); }
async function v7SyncPlacement(){
  const u=getUser(), s=window.__v5Supabase; if(!u||!s) return;
  try{
    const langs=['kk','ru'];
    for(const lang of langs){
      const guestKey=v7PlacementKey(lang,'guest');
      const userKey=v7PlacementKey(lang,u.id);
      const guestRaw=localStorage.getItem(guestKey);
      if(guestRaw && !localStorage.getItem(userKey)){
        try{
          const guest=JSON.parse(guestRaw);
          localStorage.setItem(userKey, JSON.stringify(guest));
          if(guest && guest.score!=null){
            await saveTestResult('placement:'+lang,{language:lang,score:guest.score,passed:true,answers:[]});
          }
        }catch(e){ console.warn('guest placement migration failed',e); }
      }
    }
    const {data,error}=await s.from('test_results').select('node_id,language,score,answers,created_at').eq('user_id',u.id).like('node_id','v5:placement:%').order('created_at',{ascending:false}).limit(20);
    if(error) return;
    for(const lang of langs){
      const row=(data||[]).find(r=>r.node_id===`v5:placement:${lang}`);
      if(row) v7SetPlacement(lang,{score:row.score,max:18,index:v7LevelIndex(row.score),level:v7LevelLabel(v7LevelIndex(row.score)),created_at:row.created_at});
    }
  }catch(e){ console.warn('placement sync failed',e); }
}
function v7LevelIndex(score){ if(score<=3)return 0; if(score<=6)return 1; if(score<=9)return 2; if(score<=12)return 3; if(score<=15)return 4; return 5; }
function v7LevelLabel(i){ return ['入门','基础','初级','初级+','生活交流','实用'][i] || '入门'; }
function v7PlacementCard(path){
  const p=v7GetPlacement(langKey());
  if(!p) return `<div class="placement-top"><div><span class="eyebrow">STEP 0 · 等级测试</span><h2>可以直接学习，也可以选做测试</h2><p>18 道题，题目会从发音、词汇、句型逐步变难。测试用于匹配学习起点，不是正式语言水平考试。</p><div class="placement-badges"><span class="placement-badge">18 题</span><span class="placement-badge">约 5 分钟</span><span class="placement-badge">完成后解锁对应起点</span></div></div><a class="primary-btn" href="level-test.html?lang=${langKey()}">开始等级测试 →</a></div>`;
  const u=path.units[p.index];
  return `<div class="placement-top"><div><span class="eyebrow">${p.skipped?'已从基础开始':'已完成等级测试'}</span><h2>你的起点：${p.level}</h2><p>${p.skipped?'你选择直接从入门开始。之后仍可以随时参加测试并重新匹配起点。':`得分 ${p.score}/18，建议从第 ${u?.num||1} 单元开始。前面的单元已开放，可随时复习。`}</p></div><div class="result-actions"><a class="secondary-btn" href="level-test.html?lang=${langKey()}">重新测试</a>${u?`<a class="primary-btn" href="unit.html?lang=${langKey()}&unit=${u.id}">从这里开始 →</a>`:''}</div></div>`;
}
function v7UnitUnlocked(path,idx){
  const p=v7GetPlacement(langKey());
  if(idx===0)return true;
  if(!p) return !requiresAccount(path,idx) && path.units.slice(0,idx).every(u=>calcUnitState(u).test);
  if(idx > p.index){ if(requiresAccount(path,idx) && !getUser()) return false; return !!calcUnitState(path.units[idx-1]).test; }
  if(requiresAccount(path,idx) && !getUser()) return false;
  return true;
}
function v7LessonUnlocked(unit, lessonIdx){ if(lessonIdx===0) return true; return progressEntry(unit.lessons[lessonIdx-1].id)?.status==='done'; }
function v7LoginGate(path,unit,idx){
  const next=encodeURIComponent(`unit.html?lang=${langKey()}&unit=${unit.id}`);
  return `<div class="login-gate"><span class="eyebrow">免费体验到这里</span><h2>从第 2 单元开始，请先注册 / 登录</h2><p>你已经可以免费体验第 1 单元。注册后，系统会把你的学习进度和考试成绩绑定到账号。</p><div class="gate-stats"><span>✅ 第 1 单元免费体验</span><span>☁️ 云端保存进度</span><span>📊 保存考试成绩</span></div><div class="result-actions"><a class="secondary-btn" href="path.html?lang=${langKey()}">返回学习路径</a><a class="primary-btn" href="auth.html?mode=signup&next=${next}">注册 / 登录</a></div></div>`;
}


function renderPath(){
  const path=getPath(), p=v7GetPlacement(langKey()); document.title=`${path.label}学习路径｜中亚语言通`;
  document.getElementById('pathTitle').textContent=`${path.flag} ${path.label}`;
  document.getElementById('pathDesc').textContent=p?path.desc:`${path.desc} 可直接从第 1 单元开始，等级测试为可选。`;
  const card=document.getElementById('placementCard'); if(card) card.innerHTML=v7PlacementCard(path);
  const unlocked=path.units.filter((u,i)=>v7UnitUnlocked(path,i)).length;
  document.getElementById('pathStats').innerHTML=`<div><b>${unlocked}</b><span>当前可进入</span></div><div><b>${path.units.length}</b><span>总单元</span></div><div><b>${p?p.level:'未测试'}</b><span>${getUser()?'进度云端同步':'游客'}</span></div>`;
  document.getElementById('pathList').innerHTML=path.units.map((u,i)=>{
    const open=v7UnitUnlocked(path,i), st=calcUnitState(u), acct=requiresAccount(path,i), recommended=!!p&&i===p.index;
    let action='';
    if(open) action=`<a class="primary-btn small" href="unit.html?lang=${langKey()}&unit=${u.id}">${st.percent?'继续':'开始'} →</a>`;
    else if(acct && getUser()) action=`<span class="lock-copy">通过上一单元考试后解锁</span>`;
    else if(acct) action=`<a class="secondary-btn small" href="auth.html?mode=signup&next=${encodeURIComponent(`path.html?lang=${langKey()}`)}">注册 / 登录后继续</a>`;
    else if(!p) action=`<a class="secondary-btn small" href="level-test.html?lang=${langKey()}">先做等级测试</a>`;
    else action=`<span class="lock-copy">通过上一单元考试后解锁</span>`;
    const status=st.test?'✅ 已通过':st.percent?`学习中 · ${st.percent}%`:(!p?'未开始':'未开始');
    return `<div class="path-node ${open?'open':'locked'} ${recommended?'recommended':''}"><div class="node-num">${open?u.num:'🔒'}</div><div class="node-main"><div class="node-top"><span class="eyebrow">UNIT ${u.num} · ${u.level}</span><span>${status}${recommended?'<span class="recommend-badge">建议起点</span>':''}</span></div><h3>${u.title}</h3><p>${u.desc}</p><div class="progress-track"><span style="width:${st.percent}%"></span></div></div><div class="node-action">${action}</div></div>`;
  }).join('');
}

function renderUnit(){
  const path=getPath(), unitId=qs('unit')||path.units[0].id, unit=path.units.find(u=>u.id===unitId); if(!unit)return location.href=`path.html?lang=${langKey()}`;
  const idx=path.units.indexOf(unit);
  if(requiresAccount(path,idx) && !getUser()){document.getElementById('backLink').href=`path.html?lang=${langKey()}`;document.getElementById('unitHeader').innerHTML=v7LoginGate(path,unit,idx);document.getElementById('lessonList').innerHTML='';return;}
  if(!v7UnitUnlocked(path,idx)) return location.href=`path.html?lang=${langKey()}`;
  const st=calcUnitState(unit);
  document.getElementById('backLink').href=`path.html?lang=${langKey()}`;
  document.getElementById('unitHeader').innerHTML=`<span class="eyebrow">UNIT ${unit.num} · ${unit.level}</span><h1>${unit.title}</h1><p>${unit.desc}</p><div class="unit-meter"><span>${st.done}/${st.total} 小课完成</span><div class="progress-track"><span style="width:${st.percent}%"></span></div></div>`;
  const rows=unit.lessons.map((l,i)=>{
    const done=progressEntry(l.id)?.status==='done', unlocked=v7LessonUnlocked(unit,i), typeLabel={intro:'认识发音',listen:'听音选择',select:'认识词语',translate:'翻译',reorder:'组句',write:'造句'}[l.type]||'练习';
    if(unlocked) return `<a class="lesson-row ${done?'done':''}" href="lesson-v4.html?lang=${langKey()}&unit=${unit.id}&lesson=${l.id}"><div class="lesson-index">${done?'✓':i+1}</div><div><strong>${l.title}</strong><span>${typeLabel}</span></div><b>${done?'已完成':'开始 →'}</b></a>`;
    return `<div class="lesson-row lesson-locked"><div class="lesson-index">🔒</div><div><strong>${l.title}</strong><span>${typeLabel}</span></div><b class="lesson-lock-copy">完成上一小课后解锁</b></div>`;
  }).join('');
  const ready=unit.lessons.every(l=>progressEntry(l.id)?.status==='done');
  const testBlock=ready?`<div class="unit-test-card"><div><span class="eyebrow">UNIT TEST</span><h3>单元考试</h3><p>完成所有小课后参加测试；达到 70% 才能解锁下一单元。</p></div><a class="primary-btn" href="quiz-v4.html?lang=${langKey()}&unit=${unit.id}">参加考试 →</a></div>`:`<div class="unit-test-card"><div><span class="eyebrow">UNIT TEST</span><h3>单元考试</h3><p>先按顺序完成所有小课，完成后这里会自动开放。</p></div><span class="lock-copy">🔒 未开放</span></div>`;
  document.getElementById('lessonList').innerHTML=rows+testBlock;
}

function renderLesson(){
  const path=getPath(),unit=path.units.find(u=>u.id===qs('unit')),lesson=unit?.lessons.find(l=>l.id===qs('lesson')); if(!lesson)return;
  const idx=unit?path.units.indexOf(unit):-1, li=unit?unit.lessons.indexOf(lesson):-1;
  if(unit && requiresAccount(path,idx) && !getUser()){document.getElementById('lessonTop').innerHTML=v7LoginGate(path,unit,idx);document.getElementById('exerciseArea').innerHTML='';return;}
  if(unit && !v7UnitUnlocked(path,idx)) return location.href=`path.html?lang=${langKey()}`;
  if(unit && !v7LessonUnlocked(unit,li)){document.getElementById('lessonTop').innerHTML=`<div class="result-card"><h2>这一小课还没解锁</h2><p>请先完成上一小课。</p><a class="primary-btn" href="unit.html?lang=${langKey()}&unit=${unit.id}">返回单元 →</a></div>`;document.getElementById('exerciseArea').innerHTML='';return;}
  document.getElementById('lessonTop').innerHTML=`<a class="back-link" href="unit.html?lang=${langKey()}&unit=${unit.id}">← ${unit.title}</a><span class="eyebrow">小课 · ${unit.num}</span><h1>${lesson.title}</h1><p>按顺序完成这一小课，完成后才会解锁下一项。</p>`;
  // Re-run the original lesson engine body by calling a temporary copy stored from V5.
  window.KZLearning.remember('foundation-'+langKey(),path.label+' · '+lesson.title);
  v7RenderLessonBody(path,unit,lesson);
}

function v7RenderLessonBody(path,unit,lesson){
  const area=document.getElementById('exerciseArea'); let i=0,score=0; const items=lesson.items;
  function finish(){
    const pct=Math.round(score/items.length*100); saveRemoteProgress(lesson.id,{language:langKey(),status:'done',score:pct});
    const next=unit.lessons[unit.lessons.indexOf(lesson)+1]; window.KZLearning.remember('foundation-'+langKey(),path.label+' · '+(next?.title||'单元考试'),next?`lesson-v4.html?lang=${langKey()}&unit=${unit.id}&lesson=${next.id}`:`quiz-v4.html?lang=${langKey()}&unit=${unit.id}`);
    area.innerHTML=`<div class="result-card"><span class="eyebrow">完成</span><h2>本小课完成！</h2><div class="score-big">${pct}%</div><p>你完成了 ${items.length} 个练习。${getUser()?'进度已保存在本设备。联网后会尝试同步到账号。':'当前为游客模式，进度仅保存在本设备。'}</p><div class="result-actions">${next?`<a class="primary-btn" href="lesson-v4.html?lang=${langKey()}&unit=${unit.id}&lesson=${next.id}">下一小课 →</a>`:''}<a class="secondary-btn" href="unit.html?lang=${langKey()}&unit=${unit.id}">返回单元</a></div></div>`;
  }
  function meta(){return `<div class="exercise-meta"><span>${i+1} / ${items.length}</span><div class="progress-track"><span style="width:${Math.round((i)/items.length*100)}%"></span></div></div>`}
  function next(){ if(i>=items.length)return finish(); const it=items[i]; area.innerHTML=meta()+`<div class="exercise-card"><span class="eyebrow">${lesson.type==='intro'?'认识发音':lesson.type==='listen'?'先听再选':lesson.type==='select'?'认识词语':lesson.type==='translate'?`中文 → ${path.label}`:lesson.type==='reorder'?'组句':'自己造句'}</span>${lesson.type==='intro'?`<div class="pronunciation-item"><div class="sound-symbol">${it.symbol}</div><button class="pronunciation-audio" id="playSymbol" type="button">🔊 听字母</button></div><div class="pronunciation-item"><h2>${it.example}</h2><button class="pronunciation-audio" id="playExample" type="button">🔊 听单词</button></div><p class="meaning">${it.meaning}</p><p class="hint">${it.note}</p><div class="pronunciation-actions"><button class="secondary-btn" id="knowIt">我会了，下一张 →</button></div>`:lesson.type==='listen'||lesson.type==='select'?`<h2>${it[0]}</h2>${lesson.type==='listen'?`<button class="audio-btn" id="playAudio">🔊 播放发音</button>`:''}${(Array.isArray(it[2])?it[2]:it[1]).map((x,j)=>`<button class="answer-option" data-j="${j}">${x}</button>`).join('')}`:lesson.type==='translate'||lesson.type==='write'?`<h2>${it[0]}</h2><textarea id="textAnswer" class="answer-input" rows="3" placeholder="写出你的答案"></textarea><button id="submitText" class="primary-btn">提交答案</button><p class="hint">初学阶段先用标准答案建立正确表达；可参考例句修改后再练。</p>`:`<h2>${it[0]}</h2><div class="chip-bank">${shuffle(it[1]).map((x,j)=>`<button class="word-chip" data-word="${x}">${x}</button>`).join('')}</div><div id="chosen" class="chosen-line"></div><button id="checkOrder" class="primary-btn" disabled>检查句子</button>`}</div>`;
    if(lesson.type==='intro'){area.querySelector('#playSymbol').onclick=()=>speak(it.symbol,langKey());area.querySelector('#playExample').onclick=()=>speak(it.example,langKey());area.querySelector('#knowIt').onclick=()=>{score++;i++;next()};return}
    if(lesson.type==='listen'||lesson.type==='select'){if(lesson.type==='listen')area.querySelector('#playAudio').onclick=()=>speak(it[1],langKey());area.querySelectorAll('.answer-option').forEach(b=>b.onclick=()=>{const ok=+b.dataset.j===Number(it[3]);if(ok)score++;area.querySelectorAll('.answer-option').forEach(x=>x.disabled=true);b.classList.add(ok?'correct':'wrong');if(!ok){const right=area.querySelector(`[data-j="${it[3]}"]`);if(right)right.classList.add('correct')}const fb=document.createElement('div');fb.className='feedback-box '+(ok?'good':'bad');fb.textContent=ok?'正确！':'看看绿色的正确答案。';area.querySelector('.exercise-card').appendChild(fb);setTimeout(()=>{i++;next()},650)});return}
    if(lesson.type==='translate'||lesson.type==='write'){area.querySelector('#submitText').onclick=()=>{const v=area.querySelector('#textAnswer').value.trim(),ok=v===it[1];if(ok)score++;area.querySelector('#textAnswer').disabled=true;area.querySelector('#submitText').disabled=true;const fb=document.createElement('div');fb.className='feedback-box '+(ok?'good':'bad');fb.textContent=ok?'正确！':`参考表达：${it[1]}`;area.querySelector('.exercise-card').appendChild(fb);setTimeout(()=>{i++;next()},900)};return}
    const chosen=[];area.querySelectorAll('.word-chip').forEach(b=>b.onclick=()=>{if(b.disabled)return;chosen.push(b.dataset.word);b.disabled=true;area.querySelector('#chosen').textContent=chosen.join(' ');area.querySelector('#checkOrder').disabled=false});area.querySelector('#checkOrder').onclick=()=>{const ok=chosen.join(' ')===it[2];if(ok)score++;const fb=document.createElement('div');fb.className='feedback-box '+(ok?'good':'bad');fb.textContent=ok?'组句正确！':`正确顺序：${it[2]}`;area.querySelector('.exercise-card').appendChild(fb);area.querySelector('#checkOrder').disabled=true;setTimeout(()=>{i++;next()},900)};
  }
  next();
}

function renderPlacement(){
  const lang=langKey(), path=getPath(), list=V7_PLACEMENT[lang].questions; let i=0,score=0,answers=[];
  const area=document.getElementById('placementArea');
  const old=v7GetPlacement(lang);
  if(old){
    const u=path.units[old.index];
    const desc=old.skipped?'你选择直接从入门开始。之后仍可以随时参加测试并重新匹配起点。':`得分 ${old.score}/18。这个结果只是为了帮助你找到合适的学习起点，前面的单元仍然可以复习。`;
    area.innerHTML=`<div class="placement-result"><span class="eyebrow">${old.skipped?'已从基础开始':'等级测试已完成'}</span><div class="level-pill">${old.level}</div><h1>建议从第 ${u?.num||1} 单元开始</h1><p>${desc}</p><div class="result-actions"><a class="secondary-btn" href="path.html?lang=${lang}">返回学习路径</a><button class="primary-btn" id="retake">${old.skipped?'测试一下水平':'重新测试'}</button></div></div>`;
    area.querySelector('#retake').onclick=()=>{localStorage.removeItem(v7PlacementKey(lang,getUser()?.id)); renderPlacement();}; return;
  }
  function renderChoice(){
    area.innerHTML=`<div class="placement-result"><span class="eyebrow">开始前先选一种方式</span><h1>想先测试一下自己的${path.label}水平吗？</h1><p>测试会从简单的字母、词汇逐渐进入句型和真实场景。它只用于帮你找到学习起点，不是正式等级考试。</p><div class="result-actions"><button class="secondary-btn" id="skipPlacement" type="button">不测试，直接从基础开始</button><button class="primary-btn" id="startPlacement" type="button">想测试一下 →</button></div></div>`;
    area.querySelector('#skipPlacement').onclick=()=>{
      const obj={score:null,max:list.length,index:0,level:'入门',skipped:true,created_at:new Date().toISOString()};
      v7SetPlacement(lang,obj);
      const raw=qs('next');let next=null;try{const u=new URL(raw||'',location.href);if(raw&&u.origin===location.origin&&/\/(unit|lesson-v4|path)\.html$/.test(u.pathname))next=u.href}catch{} location.href=next||`unit.html?lang=${lang}&unit=${lang}-u1`;
    };
    area.querySelector('#startPlacement').onclick=()=>draw();
  }
  function draw(){
    if(i>=list.length){
      const idx=v7LevelIndex(score), level=v7LevelLabel(idx), obj={score,max:list.length,index:idx,level,created_at:new Date().toISOString()}; v7SetPlacement(lang,obj);
      if(getUser()) saveTestResult('placement:'+lang,{language:lang,score,passed:true,answers});
      const u=path.units[idx]; const locked=requiresAccount(path,idx)&&!getUser();
      const nextHref=locked?`auth.html?mode=signup&next=${encodeURIComponent(`unit.html?lang=${lang}&unit=${u.id}`)}`:`unit.html?lang=${lang}&unit=${u.id}`;
      area.innerHTML=`<div class="placement-result"><span class="eyebrow">测试完成</span><div class="level-pill">${level}</div><h1>建议从第 ${u?.num||1} 单元开始</h1><div class="score-big">${score}/18</div><p>${locked?'这个起点从第 2 单元开始，先注册/登录后即可进入。':'已根据测试结果开放对应起点及之前的复习单元。'}</p><div class="result-actions"><a class="secondary-btn" href="path.html?lang=${lang}">查看学习路径</a><a class="primary-btn" href="${nextHref}">${locked?'注册 / 登录后开始':'从这里开始 →'}</a></div></div>`; return;
    }
    const q=list[i]; const qHasTarget=/[А-Яа-яӘәӨөҮүҰұҚқҒғҢңІіҺһЁёЫыЭэЮюЯя]/.test(q[0]); area.innerHTML=`<div class="placement-test-head"><span class="eyebrow">STEP 0 · 等级测试</span><h1>${path.flag} ${path.label}起点测试</h1><p>题目会由易到难。不会的可以跳过，系统按答对题数建议学习起点。</p><div class="placement-progress"><span style="width:${Math.round(i/list.length*100)}%"></span></div><div class="exercise-meta"><span>第 ${i+1} / ${list.length} 题</span><span>当前得分：${score}</span></div></div><div class="placement-question"><span class="eyebrow">请选择答案</span><div class="question-with-audio"><h2>${q[0]}</h2>${qHasTarget?`<button class="question-audio" id="placementPromptAudio" type="button">🔊 听这句</button>`:''}</div><div class="placement-options">${q[1].map((x,j)=>`<button class="answer-option" data-j="${j}"><span>${x}</span>${/[А-Яа-яӘәӨөҮүҰұҚқҒғҢңІіҺһЁёЫыЭэЮюЯя]/.test(x)?`<span class="option-audio" data-text="${x.replace(/"/g,'&quot;')}" data-lang="${lang==='kk'?'kk-KZ':'ru-RU'}">🔊</span>`:''}</button>`).join('')}</div></div>`;
    if(qHasTarget){const b=area.querySelector('#placementPromptAudio');if(b)b.onclick=e=>{e.stopPropagation();speak(q[0].match(/[А-Яа-яӘәӨөҮүҰұҚқҒғҢңІіҺһЁёЫыЭэЮюЯя][А-Яа-яӘәӨөҮүҰұҚқҒғҢңІіҺһЁёЫыЭэЮюЯя\s.-]*/)?.[0]||q[0],lang)};}
    area.querySelectorAll('.option-audio').forEach(b=>b.onclick=e=>{e.stopPropagation();speak(b.dataset.text,b.dataset.lang)});
    area.querySelectorAll('.answer-option').forEach(b=>b.onclick=()=>{const ok=+b.dataset.j===q[2];if(ok)score++;answers.push({prompt:q[0],answer:b.textContent,correct:ok});area.querySelectorAll('.answer-option').forEach(x=>x.disabled=true);b.classList.add(ok?'correct':'wrong');if(!ok)area.querySelector(`[data-j="${q[2]}"]`)?.classList.add('correct');const fb=document.createElement('div');fb.className='feedback-box '+(ok?'good':'bad');fb.textContent=ok?'正确！':'这一题记一下，后面会复习。';area.querySelector('.placement-question').appendChild(fb);setTimeout(()=>{i++;draw()},650)});
  }
  renderChoice();
}

(async function(){
  await initUser(); await v7SyncPlacement();
  if(document.getElementById('pathList')) renderPath();
  else if(document.getElementById('lessonList')) renderUnit();
  else if(document.getElementById('exerciseArea')) renderLesson();
  else if(document.getElementById('quizArea')) renderQuiz();
  else if(document.getElementById('progressDashboard')) renderProgress();
  else if(document.getElementById('placementArea')) renderPlacement();
})();


