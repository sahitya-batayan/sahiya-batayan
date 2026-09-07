/* ===== কনফিগ ===== */
const SCRIPT_URL='https://script.google.com/macros/s/AKfycbxXnm_qrdwIVuQPtM3yAe3AfvBFVIVvuLxXieSQCkGx9_OOZur2maOMquKbMFDDpOH0/exec';
const EDITOR_CODE='SB2026';

/* ===== স্টেট ===== */
let articles=[];
let currentArticleId=null;
let currentFontSize=16;
let editingId=null;
let currentUser=JSON.parse(localStorage.getItem('sb_currentUser')||'null');
let epaperPage=0;
const EP_PER_PAGE=4;

/* ===== ২৫টি ক্লাসিক সাহিত্য ===== */
const CLASSICS=[
{id:'c1',title:'বনলতা সেন',author:'জীবনানন্দ দাশ',category:'কবিতা',date:'১৯৩৫',content:`হাজার বছর ধরে আমি পথ হাঁটিতেছি পৃথিবীর পথে,\nসিংহল সমুদ্র থেকে নিশীথের অন্ধকারে মালয় সাগরে\nঅনেক ঘুরেছি আমি; বিম্বিসার অশোকের ধূসর জগতে\nসেখানে ছিলাম আমি; আরো দূর অন্ধকারে বিদর্ভ নগরে;\nআমি ক্লান্ত প্রাণ এক, চারিদিকে জীবনের সমুদ্র সফেন,\nআমারে দু-দণ্ড শান্তি দিয়েছিলো নাটোরের বনলতা সেন।\n\nচুল তার কবেকার অন্ধকার বিদিশার নিশা,\nমুখ তার শ্রাবস্তীর কারুকার্য; অতিদূর সমুদ্রের 'পর\nহাল ভেঙে যে-নাবিক হারায়েছে দিশা\nসবুজ ঘাসের দেশ যখন সে চোখে দেখে দারুচিনি-দ্বীপের ভিতর,\nতেমনি দেখেছি তারে অন্ধকারে; বলেছে সে, 'এতোদিন কোথায় ছিলেন?'\nপাখির নীড়ের মতো চোখ তুলে নাটোরের বনলতা সেন।\n\nসমস্ত দিনের শেষে শিশিরের শব্দের মতন\nসন্ধ্যা আসে; ডানার রৌদ্রের গন্ধ মুছে ফেলে চিল;\nপৃথিবীর সব রঙ নিভে গেলে পাণ্ডুলিপি করে আয়োজন\nতখন গল্পের তরে জোনাকির রঙে ঝিলমিল;\nসব পাখি ঘরে আসে—সব নদী—ফুরায় এ-জীবনের সব লেনদেন;\nথাকে শুধু অন্ধকার, মুখোমুখি বসিবার বনলতা সেন।`},
{id:'c2',title:'বিদ্রোহী',author:'কাজী নজরুল ইসলাম',category:'কবিতা',date:'১৯২২',content:`বল বীর—\nবল উন্নত মম শির!\nশির নেহারি আমারি নতশির ওই শিখর হিমাদ্রির!\n\nবল বীর—\nবল মহাবিশ্বের মহাকাশ ফাড়ি'\nচন্দ্র সূর্য গ্রহ তারা ছাড়ি'\nভূলোক দ্যুলোক গোলক ভেদিয়া,\nখোদার আসন 'আরশ' ছেদিয়া,\nউঠিয়াছি চির-বিস্ময় আমি বিশ্ব-বিধাতৃর!\n\nআমি চিরদুর্দম, দুর্বিনীত, নৃশংস,\nমহা-প্রলয়ের আমি নটরাজ, আমি সাইক্লোন, আমি ধ্বংস!\nআমি মহাভয়, আমি অভিশাপ পৃথ্বীর,\nআমি দুর্বার,\nআমি ভেঙে করি সব চুরমার!\n\nআমি বিদ্রোহী ভৃগু, আমি বিশ্বহারা চিরবিদ্রোহী জ্বালামুখী!\nআমি সেই দিন হবো শান্ত,\nযবে উৎপীড়িতের ক্রন্দন-রোল আকাশে-বাতাসে ধ্বনিবে না,\nঅত্যাচারীর খড়্গ কৃপাণ ভীম রণ-ভূমে রণিবে না—\nবিদ্রোহী রণ-ক্লান্ত\nআমি সেই দিন হবো শান্ত!`},
{id:'c3',title:'যদি তোর ডাক শুনে কেউ না আসে',author:'রবীন্দ্রনাথ ঠাকুর',category:'কবিতা',date:'১৮৯৩',content:`যদি তোর ডাক শুনে কেউ না আসে তবে একলা চলো রে।\nএকলা চলো, একলা চলো, একলা চলো, একলা চলো রে॥\n\nযদি কেউ কথা না কয়, ওরে ওরে ও অভাগা,\nযদি সবাই থাকে মুখ ফিরায়ে সবাই করে ভয়—\nতবে পরান খুলে\nও তুই মুখ ফুটে তোর মনের কথা একলা বলো রে।\n\nযদি সবাই ফিরে যায়, ওরে ওরে ও অভাগা,\nযদি গহন পথে যাবার কালে কেউ ফিরে না চায়—\nতবে পথের কাঁটা\nও তুই রক্তমাখা চরণতলে একলা দলো রে।\n\nযদি ঝড়-বাদলে আঁধার রাতে দুয়ার দেয় ঘরে,\nতবে বজ্রানলে\nআপন বুকের পাঁজর জ্বালিয়ে নিয়ে একলা জ্বলো রে।`},
{id:'c4',title:'কাবুলিওয়ালা',author:'রবীন্দ্রনাথ ঠাকুর',category:'ছোটগল্প',date:'১৮৯২',content:`আমার পাঁচ বৎসরের মেয়ে মিনি কথা কহিবার প্রারম্ভ হইতেই এক মুহূর্তও চুপ করিয়া থাকে না।\n\nএকদিন প্রভাতে আমি যখন উপন্যাস লিখিতেছি, মিনি আসিয়া কহিল, 'বাবা!'\n\nএই সময়ে একজন কাবুলিওয়ালা পথ দিয়া যাইতেছিল। তাহার মাথায় লম্বা চুল, পিঠে ঝুলি, হাতে আঙুর কিশমিস বাদাম ভরা থলি। মিনি তাহাকে দেখিয়া চীৎকার করিয়া কহিল, 'বাবা, কাবুলিওয়ালা! কাবুলিওয়ালা!'\n\nসেই কাবুলিওয়ালার নাম রহমত। সে আফগানিস্তান হইতে আসিয়াছে। কিছুদিনের মধ্যে দুইজনে বড়ো বন্ধু হইয়া গেল।\n\nতাহাদের একটি পুরাতন রসিকতা ছিল—মিনি হাসিয়া জিজ্ঞাসা করিত, 'কাবুলিওয়ালা, তুমি শ্বশুরবাড়ি যাবে?' রহমত মিষ্ট হাসিয়া উত্তর দিত, 'শ্বশুরবাড়ি যাব।'\n\nবহু বৎসর পরে মিনির বিবাহের দিন উপস্থিত হইল। সেদিন রহমত আসিল। বহু বৎসর জেল খাটিয়া সে বাহির হইয়াছে। সে মিনিকে দেখিতে চায়।\n\nমিনি সাজিয়াগুজিয়া বধূবেশে আসিল। রহমত তাহাকে চিনিতে পারিল না। সে আস্তে আস্তে কহিল, 'খুকি, তুমি শ্বশুরবাড়ি যাইতেছ?'\n\nমিনি লজ্জায় মুখ ফিরাইয়া লইল।\n\nরহমতের চোখ দিয়া জল পড়িতে লাগিল। সে তাহার কোটের ভিতর হইতে একটি ময়লা কাগজ বাহির করিল—তাহাতে একটি ছোটো হাতের ছাপ। সেটি তাহার নিজের মেয়ের হাতের ছাপ।\n\nআমার চোখে জল আসিল। মিনির বিবাহের খরচের কিছু টাকা বাহির করিয়া রহমতের হাতে দিলাম—'যাও, তোমার মেয়ের কাছে যাও।'`},
{id:'c5',title:'সাম্যবাদী',author:'কাজী নজরুল ইসলাম',category:'কবিতা',date:'১৯২৫',content:`গাহি সাম্যের গান—\nযেখানে আসিয়া এক হয়ে গেছে সব বাধা-ব্যবধান,\nযেখানে মিশেছে হিন্দু-বৌদ্ধ-মুসলিম-ক্রীশ্চান।\n\nগাহি সাম্যের গান!\n\nকে তুমি?—পার্সী? জৈন? ইহুদী? সাঁওতাল, ভীল, গারো?\nকনফুসিয়াসী—চার্বাক-চেলা—বলে' দে, কিছু আটকায় নি তার'।\n\nমানুষের চেয়ে বড় কিছু নাই, নহে কিছু মহীয়ান!\nনাই দেশ-কাল-পাত্রের ভেদ, অভেদ ধর্মজাতি,\nসব দেশে সব কালে ঘরে ঘরে তিনি মানুষের জ্ঞাতি।`},
{id:'c6',title:'আবার আসিব ফিরে',author:'জীবনানন্দ দাশ',category:'কবিতা',date:'১৯৩৫',content:`আবার আসিব ফিরে ধানসিড়িটির তীরে—এই বাংলায়,\nহয়তো মানুষ নয়—হয়তো বা শঙ্খচিল শালিকের বেশে;\nহয়তো ভোরের কাক হয়ে এই কার্তিকের নবান্নের দেশে\nকুয়াশার বুকে ভেসে একদিন আসিব এ কাঁঠাল-ছায়ায়;\n\nহয়তো বা হাঁস হবো—কিশোরীর—ঘুঙুর রহিবে লাল পায়,\nসারাদিন কেটে যাবে কলমির গন্ধভরা জলে ভেসে ভেসে;\nআবার আসিব আমি বাংলার নদী মাঠ ক্ষেত ভালোবেসে\nজলাঙ্গীর ঢেউয়ে ভেজা বাংলায়—এই পদ্মা লোহিত্যের তীরে।\n\nতখন হয়তো দেখা হবে সন্ধ্যার গোধূলির মতোন লাল—\nফাল্গুনের আকাশে কাঁদা মেঘ জ্বলে যায় পেঁজা তুলোর মতোন;\nআবার আসিব ফিরে ধানসিড়িটির তীরে—এই বাংলায়।`},
{id:'c7',title:'দুই বিঘা জমি',author:'রবীন্দ্রনাথ ঠাকুর',category:'কবিতা',date:'১৮৯৪',content:`এই গাঁয়ে আমার জমি ছিল কত কাল—\nদুই বিঘা শুধু ছিল মোর ভূমিস্বত্ব ধনে,\nযাহা উৎপন্ন তাহা যথেষ্ট নহিল—\nতবু নিজ দু'বিঘা জমিতে বিরাট ধন-মনে।\n\nবাবু-বাড়ির বাগানের ধারে—\nআমার দুই বিঘা ছিল, ধানে ভরা মাঠের পারে।\nসে জমি কেড়ে নিল রাজার সেবক—\nএমনি করে দুর্বলেরে সবল করে শাসন!\n\nময়না-শুকের মতন ছিল মোর সংসার,\nদুই বিঘা জমি ছিল ধন, সুখ, আধার।\nএখন পথের ধুলায় গড়াগড়ি দিই,\nদুই বিঘা জমি স্বপ্নে দেখি, জাগি অশ্রু সিঁচি।`},
{id:'c8',title:'ছাড়পত্র',author:'সুকান্ত ভট্টাচার্য',category:'কবিতা',date:'১৯৪৭',content:`এ বিশ্বকে এ শিশুর বাসযোগ্য করে যাব আমি—\nনবজাতকের কাছে এ আমার দৃঢ় অঙ্গীকার।\nসাত-কোটি সন্তানেরে, হে মুগ্ধ জননী,\nরেখো না এই ভোলাবার আর।\n\nকাঁদো না কাঁদো না, মা, তোমার কান্না পাছে\nচিরদিন আমারও কান্নার ঋণ থেকে যায়—\nআমরা এক দুনিয়া গড়িতে লাগিয়াছি যেখানে\nকেউ কারো অধীন নয়, সকলেই সমান—\n\nহে মহাজীবন, আর এ কবিতা নয়—\nএবার কঠিন, কঠিন গদ্যে আনো,\nপদ্যের মত নয় কিন্তু ক্ষুধার রাজ্যে পৃথিবী গদ্যময়,\nপূর্ণিমার চাঁদ যেন ঝলসানো রুটি!`},
{id:'c9',title:'নিমগাছ',author:'বনফুল',category:'ছোটগল্প',date:'১৯৩২',content:`একটা নিমগাছ। বাড়ির কোণে দাঁড়িয়ে। খুব নিতান্ত নিরীহ, শান্ত চেহারা। কেউ তার দিকে ফিরেও তাকায় না।\n\nকিন্তু নিমগাছের খুব গুণ। নিমের পাতা তেতো, কিন্তু তবু মানুষের বড়ো উপকারী।\n\nএকদিন একজন কবি এল। বাড়ির সামনে দাঁড়িয়ে নিমগাছের দিকে তাকাল। বলল, 'বাঃ, চমৎকার! কী অপরূপ!'\n\nনিমগাছটা চমকে উঠল। কী? কেউ তাকে চমৎকার বলছে? এত দিনে, কত দিনে!\n\nকবি চলে গেল। কিন্তু সে দিন থেকে নিমগাছ একটু একটু বেশি সবুজ হতে লাগল, একটু একটু বেশি ফুল ফোটাতে লাগল। কেউ না দেখুক—একজন তো দেখেছে!\n\nনিমগাছটা বেড়ে উঠেছে। অনেক বড় হয়েছে। পথচারী তার ছায়ায় বিশ্রাম করে। কিন্তু ঘরের লোকে তাকে বলে—'ওটা কেটে ফেল, জায়গা নষ্ট করছে।'\n\nনিমগাছ কি কাঁদতে পারে? পারে না। কারণ তাদের চোখ নেই, মুখ নেই—শুধু মূক প্রাণ আছে।`},
{id:'c10',title:'মহেশ',author:'শরৎচন্দ্র চট্টোপাধ্যায়',category:'ছোটগল্প',date:'১৯২২',content:`গফুর তার একমাত্র বলদ মহেশকে নিয়ে সারাদিন ক্ষেতে খাটে। গফুর গরীব চাষী, তার আর কিছুই নেই শুধু মহেশ ছাড়া। মহেশকে সে নিজের সন্তানের মতো ভালোবাসে।\n\nগফুরের মেয়ে আমিনা। আজ ঘরে চাল নেই, তরকারি নেই।\n\nগরমের দিনে মহেশ পানি পায় না, খাবার পায় না। মহেশ ক্ষুধায় কাতরায়, তৃষ্ণায় ছটফট করে।\n\nএকদিন তীব্র গরমে মহেশ পাগলের মতো হয়ে গেল। পানির খোঁজে সে পাশের জমিদারের পুকুরে ঢুকে পড়ল। জমিদারের লোকেরা মহেশকে মারতে লাগল।\n\nগফুর মহেশকে টেনে নিয়ে এলো ঘরে। মহেশের গায়ে আঘাতের দাগ। গফুরের চোখে জল।\n\nসেদিন সন্ধ্যায় আমিনা একমুঠো ভাত রান্না করল—কিন্তু তা কেবল গফুরের জন্য। মহেশের জন্য কিছু নেই।\n\nমহেশ ক্ষুধায় অস্থির হয়ে ভাতের হাঁড়ি উলটে দিল। গফুর রাগে অন্ধ হয়ে একটি কাঠের লাঠি তুলে মহেশকে মারল। মহেশ মাটিতে পড়ে গেল—আর উঠল না।\n\nগফুর বুঝতে পারল—সে তার সবচেয়ে প্রিয় মহেশকে মেরে ফেলেছে। সে মাটিতে পড়ে কাঁদতে লাগল।`},
{id:'c11',title:'কারার ঐ লৌহকপাট',author:'কাজী নজরুল ইসলাম',category:'কবিতা',date:'১৯২১',content:`কারার ঐ লৌহকপাট\nভেঙে ফেল কর রে লোপাট\nরক্ত-জমাট শিকল পুজোর পাষাণ-বেদী!\n\nওরে ও তরুণ ঈশান!\nবাজা তোর প্রলয় বিষাণ,\nধ্বংস নিশান উড়ুক প্রাচীর প্রাচীর ভেদি!\n\nএই শিকল-পরা ছল মোদের এ শিকল-পরা ছল।\nএই শিকল পরেই শিকল তোদের করব রে বিকল!`},
{id:'c12',title:'আমার সোনার বাংলা',author:'রবীন্দ্রনাথ ঠাকুর',category:'কবিতা',date:'১৯০৫',content:`আমার সোনার বাংলা, আমি তোমায় ভালোবাসি।\nচিরদিন তোমার আকাশ, তোমার বাতাস, আমার প্রাণে বাজায় বাঁশি।\nও মা, ফাগুনে তোর আমের বনে ঘ্রাণে পাগল করে,\nমরি হায়, হায় রে—\nও মা, অঘ্রানে তোর ভরা ক্ষেতে আমি কী দেখেছি মধুর হাসি।\n\nকী শোভা, কী ছায়া গো, কী স্নেহ, কী মায়া গো—\nকী আঁচল বিছায়েছ বটের মূলে, নদীর কূলে কূলে।\n\nমা, তোর মুখের বাণী আমার কানে লাগে সুধার মতো,\nমরি হায়, হায় রে—\nমা, তোর বদনখানি মলিন হলে, ও মা, আমি নয়নজলে ভাসি।\n\n(বাংলাদেশের জাতীয় সংগীত)`},
{id:'c13',title:'পোস্টমাস্টার',author:'রবীন্দ্রনাথ ঠাকুর',category:'ছোটগল্প',date:'১৮৯১',content:`পোস্টমাস্টারের প্রথম পোস্টিং হইল উলাপুর গ্রামে। অত্যন্ত অখ্যাত গ্রাম।\n\nএই গ্রামে তাহার একটি পরিচারিকা আছে—রতন নামে একটি অনাথ মেয়ে। বয়স বারো-তেরো হইবে। সে রান্না করিয়া দেয়, ঘর ঝাঁটপাট দেয়।\n\nসন্ধ্যায় পোস্টমাস্টার রতনকে ডাকিয়া কহিতেন, 'রতন, তোর মা-বাবার কথা মনে পড়ে?'\n\nপোস্টমাস্টার রতনকে বাংলা পড়া শেখাইতে লাগিলেন।\n\nএকদিন পোস্টমাস্টার অসুস্থ হইয়া পড়িলেন। রতন দিনরাত তাঁহার সেবা করিল। সুস্থ হইয়া পোস্টমাস্টার বদলি চাহিয়া পাঠাইলেন।\n\nবদলি হইয়া আসিল। পোস্টমাস্টার রতনকে ডাকিয়া কহিলেন, 'রতন, আমি চলিলাম।'\n\nরতন জিজ্ঞাসা করিল, 'দাদাবাবু, আমাকে আপনার বাড়িতে নিয়ে যাবেন?'\n\nপোস্টমাস্টার হাসিয়া কহিলেন, 'সে কি করে হবে!'\n\nনৌকায় উঠিবার সময় পোস্টমাস্টারের মনে হইল—একটি ছোটো মেয়ে সেই গ্রামে একা দাঁড়াইয়া কাঁদিতেছে।\n\nকিন্তু রতন কোনো সান্ত্বনা পাইল না। সে পোস্ট-আফিসের দরজার কাছে অনেকক্ষণ বসিয়া বসিয়া কাঁদিল—হয়তো মনে মনে আশা করিল, দাদাবাবু ফিরিয়া আসিবেন।`},
{id:'c14',title:'সোনার তরী',author:'রবীন্দ্রনাথ ঠাকুর',category:'কবিতা',date:'১৮৯৪',content:`গগনে গরজে মেঘ, ঘন বরষা।\nকূলে একা বসে আছি, নাহি ভরসা।\nরাশি রাশি ভারা ভারা\nধান কাটা হলো সারা,\nভরা নদী ক্ষুরধারা\nখরপরশা—\nকাটিতে কাটিতে ধান এল বরষা।\n\nএকখানি ছোটো খেত, আমি একেলা,\nচারি দিকে বাঁকা জল করিছে খেলা।\nপরপারে দেখি আঁকা\nতরুছায়ামসী-মাখা\nগ্রামখানি মেঘে ঢাকা—\nপ্রভাতবেলা—\nএ পারেতে ছোটো খেত, আমি একেলা।\n\nঠাঁই নাই, ঠাঁই নাই— ছোটো সে তরী\nআমারই সোনার ধানে গিয়েছে ভরি।\nশ্রাবণ গগন ঘিরে\nঘন মেঘ ঘুরে ফিরে,\nশূন্য নদীর তীরে\nরহিনু পড়ি—\nযাহা ছিল নিয়ে গেল সোনার তরী।`},
{id:'c15',title:'আবোল তাবোল (হাঁসের ছানা)',author:'সুকুমার রায়',category:'ছড়া',date:'১৯২৩',content:`হাঁসের ছানা গেলো জলে, গেলো যে ধারে কিনারে,\nখোকন বলে 'হাঁস যে আমার, কোথায় পালায় বিনা পারে!'\nমুরগি বলে 'কক্ কক্ কক্', ঘোড়া বলে 'হিঁ-হিঁ',\nদুটো পায়ে দাঁড়িয়ে হেসে ব্যাঙ বলে 'ক্যাং ক্যাং গিন গিন'!\n\nবাবুরাম সাপুড়ে\nকোথা যাও দাদা?\nবলি তোমার বেড়ালটা\nকেমন কেমন সাদা।\n\nভ্যাম্ পি ভেম্ পি ভোম্‌পা\nগাধা নাচে টম্‌পা।\nচলে বিড়াল রোজ রোজ\nইঁদুর খোঁজে চম্‌পা।\n\n(সুকুমার রায়ের হাসির ছড়ার জগতে স্বাগতম!)`},
{id:'c16',title:'বীরপুরুষ',author:'রবীন্দ্রনাথ ঠাকুর',category:'ছড়া',date:'১৮৯৩',content:`মনে করো যেন বিদেশ ঘুরে\nমাকে নিয়ে যাচ্ছি গাড়ি চড়ে।\nতুমি যাচ্ছ পালকিতে চড়ে মা\nদরজা দুটো বন্ধ করে,\nআমি ঘোড়ায় চড়ে যাচ্ছি তোমার পাশে পাশে।\n\nরাস্তা অন্ধকার, মাঠ চুপচাপ—\nতুমি একটুও ভয় পেয়ো না মা।\nআমি আছি তোমার পাশে।\n\nমাঠ ফাঁকা, চারদিক নিরব—\nহঠাৎ তুমি পালকি থেকে ডাকলে 'বাবা!'\nকী হয়েছে মা?\n\nআমি বললুম 'ভয় পেয়ো না মা আমি আছি।'\nখুব অন্ধকার, কিচ্ছু দেখা যায় না,\nনদীর জল কালো—\nআমি বললুম 'ভয় কিসের মা আমি আছি।'`},
{id:'c17',title:'প্রাণ',author:'রবীন্দ্রনাথ ঠাকুর',category:'কবিতা',date:'১৮৯৩',content:`মরিতে চাহি না আমি সুন্দর ভুবনে,\nমানবের মাঝে আমি বাঁচিবারে চাই।\nএই সূর্যকরে, এই পুষ্পিত কাননে\nজীবন্ত হৃদয়-মাঝে যদি স্থান পাই!\n\nধরায় প্রাণের খেলা চিরদিন চলিতেছে\nকত রূপে কত রঙে কত গানে কত ছন্দে,\nমিলনে বিরহ-শোকে, কত হাসি-কান্নাতে\nমানবের সুখে-দুঃখে আমি যেন জাগি নিত্যমন্দে।\n\nকত বেলা গেল—আর কত বেলা যাবে,\nকত রাত পোহালো—আর কত রাত আসিবে।\nকিন্তু এই ধরণীর কোলে\nযতদিন রবে বেঁচে মানবের প্রাণ—\nএই জন্মের স্মৃতি, এই সুখদুঃখের গান\nবহিবে মানুষ চিরকাল—আর আমি থাকিব তাহাদের সকলের মাঝে।`},
{id:'c18',title:'স্বর্গে আর নরকে',author:'বনফুল',category:'ছোটগল্প',date:'১৯৩৫',content:`একটা লোক মরে গিয়ে ঈশ্বরের কাছে গেল।\n\nঈশ্বর জিজ্ঞেস করলেন, 'তুমি কী করেছিলে পৃথিবীতে?'\n\nলোকটা বলল, 'আমি ডাক্তার ছিলাম।'\n\nঈশ্বর বললেন, 'গরীব রোগীদের থেকে কি ফি নিতে?'\n\nলোকটা একটু চুপ করে থেকে বলল, 'হ্যাঁ, নিতাম। যা পারতাম।'\n\nঈশ্বর বললেন, 'যাও, তোমাকে নরকে যেতে হবে।'\n\nতারপর আর একটা লোক এল। সে বলল, 'আমি চোর ছিলাম। ধনীদের বাড়িতে চুরি করতাম আর গরীবদের দিতাম।'\n\nঈশ্বর বললেন, 'যাও, স্বর্গে যাও।'\n\nডাক্তার নরক থেকে চিৎকার করে বলল, 'এ কেমন বিচার! আমি মানুষের সেবা করেছি, আমাকে নরক দিলেন! আর একজন চোর, তাকে স্বর্গ দিলেন!'\n\nঈশ্বর বললেন, 'তুমি গরীবের থেকে টাকা নিয়ে তাদের আরো গরীব করেছ। আর ও ধনীর থেকে নিয়ে গরীবকে দিয়েছে—ওই হলো আসল সেবা!'\n\n(শিক্ষা: সেবা মানে শুধু কাজ করা নয়, সেবা মানে ভালোবাসা দিয়ে কাজ করা।)`},
{id:'c19',title:'কান্ডারী হুঁশিয়ার',author:'কাজী নজরুল ইসলাম',category:'কবিতা',date:'১৯২৫',content:`দুর্গম গিরি কান্তার-মরু দুস্তর পারাবার\nলঙ্ঘিতে হবে রাত্রি নিশীথে যাত্রীরা হুঁশিয়ার!\n\nথামিলে এ তরী হেথায় তাকালে পিছন পানে\nফিরিবে না ফিরিবে না সে পিছু ডাকে,\nযে-মরু আসিবে সম্মুখে ভয়াল\nতাকে ভয় পাবে না!\n\nনিশীথ রাতে ঘোর ঝড়ে\nতরী যাচ্ছে ডুবে—\nমাঝি হাল ধর, ভয় নেই,\nওই দেখা যায় আলোর দিশা ওই!\n\nকান্ডারী! তব সম্মুখে ওই\nপলাশীর প্রান্তর।\nবাংলার সেই রক্তক্ষেত্র—\nলক্ষ শহীদের চুড়ান্ত সমর!\n\nকান্ডারী হুঁশিয়ার!`},
{id:'c20',title:'তালগাছ',author:'রবীন্দ্রনাথ ঠাকুর',category:'ছড়া',date:'১৮৯৩',content:`তালগাছ এক পায়ে দাঁড়িয়ে\nসব গাছ ছাড়িয়ে\nউঁকি মারে আকাশে।\n\nমনে সাধ কালো মেঘের ওপার\nছুঁয়ে দেখি তারা,\nএই ভেবে কেটে যায় বারো মাসে।\n\nকোনোদিন হয়তো স্বপ্ন দেখে—\nসে আকাশ ছুঁয়ে দেখেছে মেঘ!\nহাওয়া বলে 'মোহ ছাড়ো,\nপায়ের তলায় মাটি ভালো—\nআকাশের কাছে যেতে হলে ডানা চাই।'\n\nতালগাছ দোলে, তালগাছ হাসে—\nএক পায়ে দাঁড়িয়ে থাকে বারো মাসে।`},
{id:'c21',title:'গ্রাম্য ছবি',author:'জসীমউদ্দীন',category:'কবিতা',date:'১৯২৯',content:`এইখানে তোর দাদির কবর ডালিম গাছের তলে,\nতিরিশ বছর ভিজায়ে রেখেছে দুই নয়নের জলে।\n\nএইখানে তোর কুটির ছিল, ফুলের বাগান ছিল,\nমুরগী চড়িত খামারে তোর, গোয়ালভরা গরু ছিল।\nঝাউ-বাগানের ধারে নদী, কলমি-ডাঙার বিলে—\nএসেছিল বরষার জল, বাদামীর রঙে মিলে।\n\nসেই নদী আজও বয়ে যায়, সেই ক্ষেত ধান ফলায়—\nকিন্তু তোর কবর আজকে চাপা পড়ে ঘাসে ভরা মাটিতলায়।`},
{id:'c22',title:'রূপনারানের কূলে',author:'রবীন্দ্রনাথ ঠাকুর',category:'কবিতা',date:'১৯৪১',content:`রূপনারানের কূলে\nজেগে উঠিলাম,\nজানিলাম এ জগৎ\nস্বপ্ন নয়।\n\nরক্তের অক্ষরে দেখিলাম\nআপনার রূপ,\nচিনিলাম আপনারে\nআঘাতে আঘাতে\nবেদনায় বেদনায়;\nসত্য যে কঠিন,\nকঠিনেরে ভালোবাসিলাম—\nসে কখনো করে না বঞ্চনা।\n\nআমৃত্যু দুঃখের তপস্যা এ জীবন—\nসত্যের দারুণ মূল্য লাভ করিবারে,\nমৃত্যুতে সকল দেনা শোধ করে দিতে।\n\n(রবীন্দ্রনাথের জীবনের শেষ কবিতা, ১৯৪১)`},
{id:'c23',title:'সুভা',author:'রবীন্দ্রনাথ ঠাকুর',category:'ছোটগল্প',date:'১৮৯৩',content:`সুভার কথা বলিতে পারে না। সে বোবা। কিন্তু তাহার দুটি বড়ো বড়ো কালো চোখ আছে—যে-চোখ দিয়া সে সব কথা বলে।\n\nসুভার বন্ধু আছে দুটি গাভী—সর্বশী আর পাঙ্গুলি। সুভা তাহাদের গায়ে হাত বুলায়, তাহাদের সাথে কথা বলে—চোখ দিয়ে, হাত দিয়ে।\n\nআর একটি বন্ধু আছে—গোঁসাই পাড়ার প্রতাপ। প্রতাপ দিনভর নদীর ধারে বসিয়া মাছ ধরে। সুভাও তাহার কাছে আসিয়া বসে।\n\nএকদিন সুভার বাবা তাহাকে কলকাতায় লইয়া গেলেন—বিবাহ দিবার জন্য। সুভা কাঁদিতে পারিল না—তাহার চোখে শুধু অশ্রু গড়াইল।\n\nকলকাতায় এক ছেলের সাথে তাহার বিবাহ হইল। ছেলেটি জানিত না সুভা বোবা—পরে জানিয়া খুব রাগ করিল।\n\nসুভা শ্বশুরবাড়িতে একা একা বসিয়া থাকে। সে সব শুনিতে পায়—কিন্তু কিছু বলিতে পারে না। তাহার সেই গ্রাম, সেই নদী, সেই সর্বশী-পাঙ্গুলি, সেই প্রতাপ—সব মনে পড়ে।\n\nকিন্তু ফিরিয়া যাইবার উপায় নাই।`},
{id:'c24',title:'আনন্দলোকে মঙ্গলালোকে',author:'রবীন্দ্রনাথ ঠাকুর',category:'কবিতা',date:'১৮৯৩',content:`আনন্দলোকে মঙ্গলালোকে বিরাজ সত্য-সুন্দর,\nএই সুন্দরের পূজা করো, এই সত্যের দীপ জ্বালো অন্তর।\n\nএই আকাশ-ভরা সূর্যতারা, এই মাটি-ভরা প্রাণ—\nএই আলোয়-ভরা দিন-রাত্রি, এই আনন্দ-ভরা গান!\n\nজগতে আনন্দযজ্ঞে আমার নিমন্ত্রণ,\nধন্য হলো, ধন্য হলো মানবজীবন।\nদুখ-সুখ-মিলনে সত্য যে কঠিন,\nতবু তারে ভালোবাসি, আমি তার অধীন।`},
{id:'c25',title:'দেনা পাওনা (অংশ)',author:'শরৎচন্দ্র চট্টোপাধ্যায়',category:'ছোটগল্প',date:'১৯২৩',content:`ষোড়শীর বিবাহ হইয়াছিল অত্যন্ত অল্প বয়সে। শ্বশুরবাড়িতে আসিয়া সে অনেক স্বপ্ন দেখিয়াছিল—কিন্তু বাস্তবে স্বামীর সাথে তাহার সুখ হইল না।\n\nস্বামী জীবানন্দ ডাক্তারি পড়ে কলকাতায়। ষোড়শী গ্রামে শ্বশুরবাড়িতে থাকে। শাশুড়ির সাথে তাহার বনিবনা হয় না।\n\nষোড়শী চুপ করিয়া সহ্য করে। সে মনে করে—স্বামী ফিরিলে সব ঠিক হইয়া যাইবে।\n\nকিন্তু জীবানন্দ যখন ফিরিয়া আসিল, সে ষোড়শীকে দেখিয়া মনে মনে ভাবিল—'এই গ্রাম্য মেয়েটাকে লইয়া কলকাতায় কেমন করিয়া থাকিব!'\n\nষোড়শী বুঝিতে পারিল—তাহার স্বামীর মনে সে নাই। সে চুপ করিয়া শুধু কাজ করিয়া যায়।\n\nএকদিন সে শ্বশুরবাড়ি ছাড়িয়া বাপের বাড়ি চলিয়া গেল। জীবানন্দ তাহাকে আনিতে গেল না।\n\nবহুদিন পরে জীবানন্দের মনে হইল—ষোড়শী কেমন আছে? সে গেল বাপের বাড়িতে। কিন্তু ষোড়শী তাহাকে ফিরাইয়া দিল। সে বলিল, 'যে ঘরে আমার মান নাই, সেই ঘরে আমি ফিরিব না।'\n\nজীবানন্দ বুঝিতে পারিল—দেনা পাওনার হিসাব শুধু টাকায় হয় না, ভালোবাসায়ও হয়।`}
];

/* ===== হেল্পার ===== */
function epBn(n){return String(n).replace(/\d/g,d=>'০১২৩৪৫৬৭৮৯'[d]);}
function notify(m){const n=document.createElement('div');n.className='notification';n.textContent=m;document.body.appendChild(n);setTimeout(()=>n.remove(),3000);}
function setCurrentDate(){const d=new Date();document.getElementById('currentDate').textContent=d.toLocaleDateString('bn-BD',{weekday:'long',year:'numeric',month:'long',day:'numeric'})+', '+d.toLocaleTimeString('bn-BD',{hour:'2-digit',minute:'2-digit'});}
function toggleTheme(){const c=document.documentElement.getAttribute('data-theme');const t=c==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',t);localStorage.setItem('theme',t);}
document.documentElement.setAttribute('data-theme',localStorage.getItem('theme')||'light');
function findArticle(id){return articles.find(x=>String(x.id)===String(id))||CLASSICS.find(x=>String(x.id)===String(id));}
function allPublished(){return [...articles.filter(a=>a.status==='approved'),...CLASSICS];}

/* ===== Google Sheets ===== */
async function loadArticlesFromSheet(){
  try{
    const res=await fetch(SCRIPT_URL+'?action=getPosts');
    const posts=await res.json();
    if(Array.isArray(posts)&&posts.length>0){
      articles=posts.map(p=>({id:String(p.id),title:p.title,author:p.author,category:p.category,image:p.image||'',content:p.content,date:p.date,views:parseInt(p.views)||0,status:'approved'}));
      saveArticles();return;
    }
  }catch(e){}
  const local=localStorage.getItem('sb_articles');
  articles=local?JSON.parse(local):[];
}
async function submitToSheet(d){try{await fetch(SCRIPT_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:JSON.stringify(d)});return true;}catch(e){return false;}}
function saveArticles(){localStorage.setItem('sb_articles',JSON.stringify(articles));}

/* ===== লাইক ===== */
function likeCount(id){return parseInt(localStorage.getItem('sb_likecount_'+id)||'0');}
function isLiked(id){return localStorage.getItem('sb_liked_'+id)==='1';}
function toggleLike(id){
  if(isLiked(id)){localStorage.removeItem('sb_liked_'+id);localStorage.setItem('sb_likecount_'+id,Math.max(0,likeCount(id)-1));}
  else{localStorage.setItem('sb_liked_'+id,'1');localStorage.setItem('sb_likecount_'+id,likeCount(id)+1);}
  document.querySelectorAll('[data-like="'+id+'"]').forEach(b=>{b.classList.toggle('liked',isLiked(id));b.innerHTML='❤ '+epBn(likeCount(id));});
}
function likeBtnHTML(id){return '<button class="like-btn '+(isLiked(id)?'liked':'')+'" data-like="'+id+'" onclick="event.stopPropagation();toggleLike(\''+id+'\')">❤ '+epBn(likeCount(id))+'</button>';}

/* ===== কার্ড ===== */
function createArticleCard(a){
  const img=a.image||'https://placehold.co/600x350/8B0000/ffffff?text=সাহিত্য+বাতায়ন';
  return `<div class="article-card" onclick="viewArticle('${a.id}')"><img src="${img}" class="article-image" onerror="this.src='https://placehold.co/600x350/8B0000/ffffff?text=SB'"><div class="article-content"><span class="article-category">${a.category}</span><h3 class="article-title">${a.title}</h3><p class="article-meta">✍️ ${a.author} | 📅 ${a.date}</p><p class="article-excerpt">${(a.content||'').substring(0,90)}...</p>${likeBtnHTML(a.id)}<button class="read-more">read more</button></div></div>`;
}

/* ===== পেজ ===== */
function showPage(p){
  document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
  const el=document.getElementById('page-'+p);
  if(el)el.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  if(p==='home')loadHome();
  if(p==='classics')loadClassicsPage();
  if(p==='gallery')loadGallery();
  if(p==='writers')loadWritersPage();
  if(p==='epaper')loadEpaper();
  if(p==='admin')showAdminTab('submit');
  if(p==='dashboard'){if(!currentUser){showPage('login');return;}loadDashboard();}
}
function setActiveNav(el){document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));if(el)el.classList.add('active');document.getElementById('navMenu').classList.remove('show');}
function toggleMenu(){document.getElementById('navMenu').classList.toggle('show');}

function loadHome(){
  document.getElementById('articlesGrid').innerHTML=articles.filter(a=>a.status==='approved').map(createArticleCard).join('')||'<p style="text-align:center;padding:40px;color:var(--text-light)">লেখা লোড হচ্ছে...</p>';
  buildTicker();loadCalendar();loadWriters();
  document.getElementById('classicGrid').innerHTML=CLASSICS.slice(0,8).map(c=>`<div class="classic-card" onclick="viewArticle('${c.id}')"><div class="classic-icon">📖</div><h4>${c.title}</h4><div class="classic-author">${c.author}</div><span class="classic-type">${c.category}</span></div>`).join('');
}
function loadClassicsPage(){document.getElementById('classicArticlesGrid').innerHTML=CLASSICS.map(createArticleCard).join('');}
function filterCategory(cat){showPage('category');document.getElementById('categoryTitle').textContent=cat+' বিভাগ';const all=allPublished().filter(a=>a.category===cat);document.getElementById('categoryGrid').innerHTML=all.length?all.map(createArticleCard).join(''):'<p style="text-align:center;padding:40px;color:var(--text-light)">এই বিভাগে কোনো লেখা নেই</p>';}
function filterCategories(cats){showPage('category');const list=cats.split(',');document.getElementById('categoryTitle').textContent=list.join(' / ')+' বিভাগ';const all=allPublished().filter(a=>list.includes(a.category));document.getElementById('categoryGrid').innerHTML=all.length?all.map(createArticleCard).join(''):'<p style="text-align:center;padding:40px;color:var(--text-light)">এই বিভাগে কোনো লেখা নেই</p>';}
function doSearch(){
  const q=document.getElementById('searchInput').value.toLowerCase().trim();
  if(q.length<2)return;
  showPage('category');
  document.getElementById('categoryTitle').textContent='অনুসন্ধান: "'+q+'"';
  const all=allPublished().filter(a=>(a.title||'').toLowerCase().includes(q)||(a.author||'').toLowerCase().includes(q)||(a.content||'').toLowerCase().includes(q)||(a.category||'').toLowerCase().includes(q));
  document.getElementById('categoryGrid').innerHTML=all.length?all.map(createArticleCard).join(''):'<p style="text-align:center;padding:40px;color:var(--text-light)">কিছু পাওয়া যায়নি</p>';
}

/* ===== গ্যালারি ===== */
function loadGallery(){
  const imgs=articles.filter(a=>a.status==='approved'&&a.image).map(a=>({src:a.image,cap:a.title+' — '+a.author}));
  const grid=document.getElementById('galleryGrid');
  grid.innerHTML=imgs.length?imgs.map(g=>`<div class="gallery-item" onclick="openLightbox('${g.src}')"><img src="${g.src}" loading="lazy"><div class="g-cap">${g.cap}</div></div>`).join(''):'<p style="color:var(--text-light)">এখনো কোনো ছবি নেই। লেখার সাথে ছবি যুক্ত করলে এখানে দেখাবে।</p>';
}
function openLightbox(src){document.getElementById('lightbox-img').src=src;document.getElementById('lightbox').style.display='flex';}

/* ===== আর্টিকেল ভিউ ===== */
function viewArticle(id){
  const a=findArticle(id);
  if(!a)return;
  currentArticleId=String(id);
  if(a.views!==undefined){a.views=(a.views||0)+1;saveArticles();}
  const content=(a.content||'').split('\n').map(p=>p.trim()?`<p>${p}</p>`:'').join('');
  document.getElementById('articleView').innerHTML=`
  <div class="breadcrumb"><a onclick="showPage('home')">🏠 হোম</a> / ${a.category}</div>
  <div class="article-full" id="printableArea">
  <div class="print-header"><h1>সাহিত্য বাতায়ন</h1><p>সাহিত্য, সংস্কৃতি ও সংবাদের আলোয় জাগ্রত মনন</p></div>
  <h1>${a.title}</h1>
  <div class="article-meta-box"><p>✍️ <strong>লেখক:</strong> ${a.author}</p><p>📅 <strong>প্রকাশ:</strong> ${a.date}</p><p>📁 <strong>বিভাগ:</strong> ${a.category}</p>${a.views!==undefined?`<p>👁 <strong>পাঠ:</strong> ${epBn(a.views)} বার</p>`:''}<p>${likeBtnHTML(a.id)}</p></div>
  ${a.image?`<img src="${a.image}" class="article-main-image" onerror="this.style.display='none'">`:''}
  <div class="article-body" id="articleBody">${content}</div></div>`;
  document.getElementById('audioBar').style.display='flex';
  const related=allPublished().filter(x=>x.category===a.category&&String(x.id)!==String(a.id)).slice(0,3);
  document.getElementById('relatedArticles').innerHTML=related.length?`<h2 class="section-title">সম্পর্কিত লেখা</h2><div class="articles-grid">${related.map(createArticleCard).join('')}</div>`:'';
  showPage('article');
  loadComments(currentArticleId);
  document.getElementById('print-sheet').innerHTML=`<div class="ps-header"><h1>সাহিত্য বাতায়ন</h1><p>সাহিত্য, সংস্কৃতি ও সংবাদের আলোয় জাগ্রত মনন</p></div><h1 class="ps-title">${a.title}</h1><div class="ps-author">✍️ ${a.author} | ${a.category} | ${a.date}</div><div class="ps-text">${content}</div><div class="ps-footer">© সাহিত্য বাতায়ন | সম্পাদক: মুহিতুল ইসলাম মুন্না</div>`;
}

/* ===== অডিও (TTS) ===== */
function speakArticle(){
  const a=findArticle(currentArticleId);
  if(!a)return;
  if(!('speechSynthesis' in window)){alert('আপনার ব্রাউজার অডিও সাপোর্ট করে না');return;}
  stopSpeak();
  const u=new SpeechSynthesisUtterance(a.title+'। লেখক: '+a.author+'। '+a.content);
  u.lang='bn-BD';u.rate=0.9;
  speechSynthesis.speak(u);
  notify('🎧 লেখা পড়া হচ্ছে... থামাতে "থামান" চাপুন');
}
function stopSpeak(){if('speechSynthesis' in window)speechSynthesis.cancel();}

/* ===== ফন্ট, শেয়ার, PDF ===== */
function changeFontSize(d){if(d===0)currentFontSize=16;else currentFontSize=Math.max(12,Math.min(24,currentFontSize+d));const b=document.getElementById('articleBody');if(b)b.style.fontSize=currentFontSize+'px';document.getElementById('fontSizeDisplay').textContent=currentFontSize+'px';}
function shareOn(p){const url=window.location.href;const a=findArticle(currentArticleId);const t=a?a.title:'সাহিত্য বাতায়ন';let u='';switch(p){case'facebook':u='https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url);break;case'whatsapp':u='https://wa.me/?text='+encodeURIComponent(t+' '+url);break;case'twitter':u='https://twitter.com/intent/tweet?text='+encodeURIComponent(t)+'&url='+encodeURIComponent(url);break;case'telegram':u='https://t.me/share/url?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(t);break;case'email':u='mailto:?subject='+encodeURIComponent(t)+'&body='+encodeURIComponent(url);break;}if(u)window.open(u,'_blank');}
function copyLink(){navigator.clipboard.writeText(window.location.href).then(()=>notify('✅ লিংক কপি হয়েছে!'));}
function downloadPDF(){const el=document.getElementById('printableArea');if(!el)return;const a=findArticle(currentArticleId);notify('PDF তৈরি হচ্ছে...');html2pdf().set({margin:10,filename:(a?a.title:'article')+'.pdf',image:{type:'jpeg',quality:0.98},html2canvas:{scale:2,useCORS:true},jsPDF:{unit:'mm',format:'a4'}}).from(el).save();}

/* ===== মন্তব্য ===== */
function loadComments(id){
  const c=document.getElementById('commentsList');if(!c)return;
  const comments=JSON.parse(localStorage.getItem('sb_c_'+id)||'[]');
  c.innerHTML=comments.length?comments.map(x=>`<div class="comment"><div class="comment-header"><span class="comment-author">${x.author}</span><span class="comment-date">${x.date}</span></div><p>${x.text}</p><button class="reply-btn" onclick="toggleReply(${x.id})">↩ উত্তর</button><div id="rf-${x.id}" style="display:none;margin-top:10px"><input id="rn-${x.id}" placeholder="নাম" style="width:100%;padding:8px;margin-bottom:5px;border:1px solid var(--border);border-radius:4px"><textarea id="rt-${x.id}" placeholder="উত্তর..." rows="2" style="width:100%;padding:8px;margin-bottom:5px;border:1px solid var(--border);border-radius:4px"></textarea><button onclick="addReply(${x.id})" class="btn-primary" style="padding:6px 15px;font-size:.9rem">পাঠান</button></div><div class="replies">${(x.replies||[]).map(r=>`<div class="reply"><strong>${r.author}</strong> <small>${r.date}</small><p>${r.text}</p></div>`).join('')}</div></div>`).join(''):'<p style="color:var(--text-light);text-align:center;padding:20px">প্রথম মন্তব্য করুন!</p>';
}
function addComment(){const n=document.getElementById('commentName').value.trim();const t=document.getElementById('commentText').value.trim();if(!n||!t){alert('নাম ও মন্তব্য লিখুন');return;}const cs=JSON.parse(localStorage.getItem('sb_c_'+currentArticleId)||'[]');cs.push({id:Date.now(),author:n,text:t,date:new Date().toLocaleDateString('bn-BD'),replies:[]});localStorage.setItem('sb_c_'+currentArticleId,JSON.stringify(cs));document.getElementById('commentName').value='';document.getElementById('commentText').value='';loadComments(currentArticleId);}
function toggleReply(id){const f=document.getElementById('rf-'+id);f.style.display=f.style.display==='none'?'block':'none';}
function addReply(cid){const n=document.getElementById('rn-'+cid).value.trim();const t=document.getElementById('rt-'+cid).value.trim();if(!n||!t){alert('নাম ও উত্তর লিখুন');return;}const cs=JSON.parse(localStorage.getItem('sb_c_'+currentArticleId)||'[]');const c=cs.find(x=>x.id===cid);if(c){if(!c.replies)c.replies=[];c.replies.push({author:n,text:t,date:new Date().toLocaleDateString('bn-BD')});localStorage.setItem('sb_c_'+currentArticleId,JSON.stringify(cs));loadComments(currentArticleId);}}

/* ===== লেখক লগইন / রেজিস্ট্রেশন / ড্যাশবোর্ড ===== */
function showRegister(){document.getElementById('login-form').style.display='none';document.getElementById('register-form').style.display='block';}
function showLogin(){document.getElementById('login-form').style.display='block';document.getElementById('register-form').style.display='none';}
async function writerRegister(){
  const u=document.getElementById('r-username').value.trim();
  const n=document.getElementById('r-name-bn').value.trim();
  const e=document.getElementById('r-email').value.trim();
  const p=document.getElementById('r-password').value;
  if(!u||!n||!e||!p){alert('সব ঘর পূরণ করুন');return;}
  await submitToSheet({action:'registerWriter',username:u,name_bn:n,name_en:document.getElementById('r-name-en').value.trim(),email:e,password:p,bio:document.getElementById('r-bio').value.trim()||'সাহিত্য বাতায়নের সদস্য'});
  const locals=JSON.parse(localStorage.getItem('sb_writers_local')||'[]');
  locals.push({username:u,password:p,name:n});
  localStorage.setItem('sb_writers_local',JSON.stringify(locals));
  notify('✅ রেজিস্ট্রেশন সফল! এখন লগইন করুন।');
  showLogin();
}
async function writerLogin(){
  const u=document.getElementById('login-user').value.trim();
  const p=document.getElementById('login-pass').value;
  if(!u||!p){alert('ইউজারনেম ও পাসওয়ার্ড দিন');return;}
  let me=(JSON.parse(localStorage.getItem('sb_writers_local')||'[]')).find(x=>x.username===u&&x.password===p);
  if(!me){
    try{const res=await fetch(SCRIPT_URL+'?action=loginWriter&username='+encodeURIComponent(u)+'&password='+encodeURIComponent(p));const j=await res.json();if(j&&j.ok)me={username:u,name:j.name||u};}catch(e){}
  }
  if(me){currentUser=me;localStorage.setItem('sb_currentUser',JSON.stringify(me));notify('✅ স্বাগতম, '+me.name+'!');showPage('dashboard');}
  else alert('❌ লগইন ব্যর্থ! ইউজারনেম/পাসওয়ার্ড ভুল।');
}
function writerLogout(){currentUser=null;localStorage.removeItem('sb_currentUser');showPage('home');notify('লগআউট হয়েছে');}
function loadDashboard(){
  document.getElementById('dash-name').textContent=currentUser?(currentUser.name||currentUser.username):'';
  const name=currentUser?(currentUser.name||currentUser.username):'';
  const mine=articles.filter(a=>a.author===name);
  document.getElementById('dash-list').innerHTML=mine.length?mine.map(a=>`<div class="admin-article-item"><div><strong>${a.title}</strong><br><small>${a.category} | ${a.date} | ${a.status==='approved'?'✅ প্রকাশিত':'⏳ অপেক্ষায়'}</small></div><div><button class="btn-warning" onclick="startEdit('${a.id}')">✏️ এডিট</button></div></div>`).join(''):'<p style="color:var(--text-light)">এখনো কোনো লেখা জমা দেননি।</p>';
}
function compressImage(input,targetId){
  const file=input.files[0];if(!file)return;
  if(file.size>2*1024*1024){alert('⚠️ ছবি ২MB এর কম হতে হবে');input.value='';return;}
  const reader=new FileReader();
  reader.onload=e=>{const img=new Image();img.onload=()=>{const c=document.createElement('canvas');const maxW=800;let w=img.width,h=img.height;if(w>maxW){h=h*maxW/w;w=maxW;}c.width=w;c.height=h;c.getContext('2d').drawImage(img,0,0,w,h);document.getElementById(targetId).value=c.toDataURL('image/jpeg',0.7);};img.src=e.target.result;};
  reader.readAsDataURL(file);
}
function handleFileUpload(i){compressImage(i,'aImage');}
function handleDashImage(i){compressImage(i,'d-imageData');}
async function dashSubmit(){
  if(!currentUser){showPage('login');return;}
  const title=document.getElementById('d-title').value.trim();
  const content=document.getElementById('d-content').value.trim();
  if(!title||!content){alert('শিরোনাম ও বিষয়বস্তু দিন');return;}
  const cat=document.getElementById('d-category').value;
  const img=document.getElementById('d-imageData').value;
  const ok=await submitToSheet({action:'submitPost',title,category:cat,author:currentUser.name||currentUser.username,excerpt:content.substring(0,150),content,imageData:img,featured:'',editorcode:'',date:new Date().toLocaleDateString('bn-BD')});
  if(ok){
    notify('✅ জমা হয়েছে! সম্পাদকের অনুমোদনের পর প্রকাশিত হবে।');
    articles.unshift({id:'t'+Date.now(),title,author:currentUser.name||currentUser.username,category:cat,image:img,content,date:new Date().toLocaleDateString('bn-BD'),views:0,status:'pending'});
    saveArticles();
    document.getElementById('d-title').value='';document.getElementById('d-content').value='';document.getElementById('d-imageData').value='';
    loadDashboard();
  }else alert('সমস্যা হয়েছে');
}

/* ===== ই-পেপার ===== */
function loadEpaper(){
  const all=allPublished();
  const totalPages=Math.max(1,Math.ceil(all.length/EP_PER_PAGE));
  if(epaperPage<0)epaperPage=0;
  if(epaperPage>=totalPages)epaperPage=totalPages-1;
  const slice=all.slice(epaperPage*EP_PER_PAGE,(epaperPage+1)*EP_PER_PAGE);
  document.getElementById('epaper-date').textContent=new Date().toLocaleDateString('bn-BD',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  document.getElementById('epaper-body').innerHTML=slice.map(a=>`<article class="ep-article"><h3 class="ep-title">${a.title}</h3><div class="ep-meta">✍️ ${a.author} | ${a.category} | ${a.date}</div><div class="ep-text">${(a.content||'').split('\n').filter(p=>p.trim()).slice(0,5).map(p=>`<p>${p}</p>`).join('')}</div><button class="read-more" onclick="viewArticle('${a.id}')">সম্পূর্ণ পড়ুন</button></article>`).join('');
  let btns='';
  for(let i=0;i<totalPages;i++){btns+=`<button class="ep-page-btn ${i===epaperPage?'active':''}" onclick="gotoEpaper(${i})">${epBn(i+1)}</button>`;}
  document.getElementById('epaper-pages').innerHTML=btns;
  document.getElementById('epaper-pageno').textContent='পাতা '+epBn(epaperPage+1)+' / '+epBn(totalPages);
}
function gotoEpaper(i){const total=Math.max(1,Math.ceil(allPublished().length/EP_PER_PAGE));if(i<0||i>=total)return;epaperPage=i;loadEpaper();document.getElementById('page-epaper').scrollIntoView({behavior:'smooth'});}
function printEpaper(){
  const all=allPublished();
  document.getElementById('print-sheet').innerHTML='<div class="ps-header"><h1>সাহিত্য বাতায়ন - ই-পেপার</h1><p>'+new Date().toLocaleDateString('bn-BD',{weekday:'long',year:'numeric',month:'long',day:'numeric'})+'</p></div>'+all.map(a=>`<div style="margin-bottom:25px;border-bottom:1px solid #999;padding-bottom:15px"><h2 style="color:#8B0000;margin-bottom:6px">${a.title}</h2><div class="ps-author">✍️ ${a.author} | ${a.category} | ${a.date}</div><div class="ps-text">${(a.content||'').split('\n').filter(p=>p.trim()).map(p=>`<p>${p}</p>`).join('')}</div></div>`).join('')+'<div class="ps-footer">© সাহিত্য বাতায়ন | সম্পাদক: মুহিতুল ইসলাম মুন্না</div>';
  window.print();
}

/* ===== অন্যান্য ===== */
function buildTicker(){const items=articles.filter(a=>a.status==='approved').slice(0,5).map(a=>a.title);items.push(...CLASSICS.slice(0,3).map(c=>c.title+' — '+c.author));items.push('আপনার লেখা পাঠান: sahityabatayan@gmail.com');document.getElementById('tickerText').textContent=items.join('   ⭕   ');}
function loadCalendar(){const now=new Date();const months=['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];document.getElementById('calendarHeader').textContent=months[now.getMonth()]+' '+epBn(now.getFullYear());const days=['রবি','সোম','মঙ্গল','বুধ','বৃহ','শুক্র','শনি'];let html=days.map(d=>`<div class="calendar-day-header">${d}</div>`).join('');const fd=new Date(now.getFullYear(),now.getMonth(),1).getDay();const dm=new Date(now.getFullYear(),now.getMonth()+1,0).getDate();for(let i=0;i<fd;i++)html+='<div class="calendar-day"></div>';for(let d=1;d<=dm;d++){html+=`<div class="calendar-day ${d===now.getDate()?'highlight':''}">${epBn(d)}</div>`;}document.getElementById('calendarGrid').innerHTML=html;}
function getWriters(){const approved=articles.filter(a=>a.status==='approved');const unique=[...new Set(approved.map(a=>a.author))];return unique.map(author=>({name:author,count:approved.filter(a=>a.author===author).length,image:'https://ui-avatars.com/api/?name='+encodeURIComponent(author)+'&background=8B0000&color=fff&size=200'}));}
function writerCard(w){return `<div class="writer-card"><img src="${w.image}"><h3>${w.name}</h3><p>${epBn(w.count)}টি প্রকাশনা</p></div>`;}
function loadWriters(){document.getElementById('writersGrid').innerHTML=getWriters().map(writerCard).join('')||'<p style="color:var(--text-light)">লেখক লোড হচ্ছে...</p>';}
function loadWritersPage(){document.getElementById('writersGridPage').innerHTML=getWriters().map(writerCard).join('')||'<p style="color:var(--text-light)">লেখক লোড হচ্ছে...</p>';}
function subscribeNewsletter(){const email=document.getElementById('newsletterEmail').value.trim();if(!email||!email.includes('@')){alert('সঠিক ইমেইল দিন');return;}let subs=JSON.parse(localStorage.getItem('sb_subs')||'[]');if(subs.includes(email)){alert('আপনি ইতিমধ্যে সাবস্ক্রাইব করেছেন!');return;}subs.push(email);localStorage.setItem('sb_subs',JSON.stringify(subs));document.getElementById('newsletterEmail').value='';notify('✅ সাবস্ক্রিপশন সফল!');}

/* ===== অ্যাডমিন + এডিট ===== */
function showAdminTab(tab){
  if(tab==='submit'&&editingId)cancelEdit();
  ['submit','pending','published','stats'].forEach(t=>{document.getElementById('tab-'+t).style.display='none';});
  document.getElementById('tab-'+tab).style.display='block';
  if(tab==='pending')loadPending();
  if(tab==='published')loadPublished();
  if(tab==='stats')loadStats();
}
function clearForm(){['aTitle','aAuthor','aContent','aEditorCode','aImage'].forEach(i=>document.getElementById(i).value='');const f=document.getElementById('aImageFile');if(f)f.value='';}
function showEditBanner(text){
  let b=document.getElementById('edit-banner');
  if(!b){b=document.createElement('div');b.id='edit-banner';b.style.cssText='background:#fff3cd;border-left:4px solid #ffc107;padding:12px 15px;border-radius:5px;margin-bottom:15px';b.innerHTML='<span id="edit-banner-text"></span> <button class="btn-danger" style="margin-left:10px" onclick="cancelEdit()">❌ বাতিল</button>';document.getElementById('tab-submit').prepend(b);}
  b.style.display='block';
  document.getElementById('edit-banner-text').textContent=text;
}
function startEdit(id){
  const a=articles.find(x=>String(x.id)===String(id));
  if(!a)return;
  editingId=String(id);
  showAdminTab('submit');
  document.getElementById('aTitle').value=a.title;
  document.getElementById('aAuthor').value=a.author;
  document.getElementById('aCategory').value=a.category;
  document.getElementById('aContent').value=a.content;
  document.getElementById('aImage').value=a.image||'';
  showEditBanner('✏️ এডিট মোড: "'+a.title+'" — পরিবর্তন করে "জমা দিন" চাপুন');
  window.scrollTo({top:0,behavior:'smooth'});
}
function cancelEdit(){editingId=null;const b=document.getElementById('edit-banner');if(b)b.style.display='none';clearForm();}
async function submitArticle(){
  const title=document.getElementById('aTitle').value.trim();
  const author=document.getElementById('aAuthor').value.trim();
  const category=document.getElementById('aCategory').value;
  const content=document.getElementById('aContent').value.trim();
  const image=document.getElementById('aImage').value.trim();
  if(!title||!author||!content){alert('শিরোনাম, লেখক ও বিষয়বস্তু দিন');return;}
  if(editingId){
    const a=articles.find(x=>String(x.id)===String(editingId));
    if(a){a.title=title;a.author=author;a.category=category;a.content=content;if(image)a.image=image;saveArticles();
      await submitToSheet({action:'updatePost',postId:String(editingId),title,category,author,excerpt:content.substring(0,150),content,image:image||a.image||''});}
    notify('✅ লেখা আপডেট হয়েছে!');
    cancelEdit();showAdminTab('published');
    return;
  }
  const editorCode=document.getElementById('aEditorCode').value.trim();
  const isEditor=editorCode===EDITOR_CODE;
  const ok=await submitToSheet({action:'submitPost',title,category,author,excerpt:content.substring(0,150),content,imageData:image,featured:'',editorcode:editorCode,date:new Date().toLocaleDateString('bn-BD')});
  if(ok){
    notify(isEditor?'✅ প্রকাশিত!':'✅ জমা হয়েছে! অনুমোদনের অপেক্ষায়।');
    articles.unshift({id:'t'+Date.now(),title,author,category,image,content,date:new Date().toLocaleDateString('bn-BD'),views:0,status:isEditor?'approved':'pending'});
    saveArticles();clearForm();
    setTimeout(()=>showPage('home'),1000);
  }else alert('সমস্যা হয়েছে');
}
function loadPending(){
  const list=document.getElementById('pendingArticlesList');
  const pending=articles.filter(a=>a.status==='pending');
  list.innerHTML=pending.length?pending.map(a=>`<div class="admin-article-item"><div><strong>${a.title}</strong><br><small>${a.author} | ${a.category}</small></div><div><button class="approve-btn" onclick="approveArticle('${a.id}')">✅ অনুমোদন</button><button class="btn-warning" onclick="startEdit('${a.id}')">✏️ এডিট</button><button class="reject-btn" onclick="rejectArticle('${a.id}')">❌ বাতিল</button></div></div>`).join(''):'<p style="text-align:center;padding:20px;color:var(--text-light)">কোনো অপেক্ষায় নেই ✅</p>';
}
function loadPublished(){
  const list=document.getElementById('publishedArticlesList');
  const pub=articles.filter(a=>a.status==='approved');
  list.innerHTML=pub.length?pub.map(a=>`<div class="admin-article-item"><div><strong>${a.title}</strong><br><small>${a.author} | ${a.date} | 👁 ${epBn(a.views||0)} | ❤ ${epBn(likeCount(a.id))}</small></div><div><button class="btn-info" onclick="viewArticle('${a.id}')">দেখুন</button><button class="btn-warning" onclick="startEdit('${a.id}')">✏️ এডিট</button><button class="btn-danger" onclick="deleteArticle('${a.id}')">মুছুন</button></div></div>`).join(''):'<p style="text-align:center;padding:20px;color:var(--text-light)">কোনো প্রকাশিত লেখা নেই</p>';
}
function loadStats(){
  const ap=articles.filter(a=>a.status==='approved');
  const w=[...new Set(ap.map(a=>a.author))];
  const likes=ap.reduce((s,a)=>s+likeCount(a.id),0);
  document.getElementById('statsContent').innerHTML=`<div class="stats-grid"><div class="stat-item"><span class="stat-number">${epBn(ap.length)}</span><div class="stat-label">মোট লেখা</div></div><div class="stat-item"><span class="stat-number">${epBn(w.length)}</span><div class="stat-label">মোট লেখক</div></div><div class="stat-item"><span class="stat-number">${epBn(ap.reduce((s,a)=>s+(a.views||0),0))}</span><div class="stat-label">মোট পাঠ</div></div><div class="stat-item"><span class="stat-number">${epBn(likes)}</span><div class="stat-label">মোট লাইক</div></div><div class="stat-item"><span class="stat-number">${epBn(JSON.parse(localStorage.getItem('sb_subs')||'[]').length)}</span><div class="stat-label">সাবস্ক্রাইবার</div></div><div class="stat-item"><span class="stat-number">${epBn(CLASSICS.length)}</span><div class="stat-label">ক্লাসিক সাহিত্য</div></div></div>`;
}
function approveArticle(id){const a=articles.find(x=>String(x.id)===String(id));if(a){a.status='approved';saveArticles();submitToSheet({action:'approvePost',postId:String(id)});notify('✅ অনুমোদিত!');loadPending();}}
function rejectArticle(id){if(confirm('বাতিল করবেন?')){articles=articles.filter(a=>String(a.id)!==String(id));saveArticles();submitToSheet({action:'rejectPost',postId:String(id)});notify('❌ বাতিল হয়েছে');loadPending();}}
function deleteArticle(id){if(confirm('মুছে ফেলবেন?')){articles=articles.filter(a=>String(a.id)!==String(id));saveArticles();submitToSheet({action:'rejectPost',postId:String(id)});notify('✅ মুছে ফেলা হয়েছে');loadPublished();}}

/* ===== শুরু ===== */
window.onscroll=function(){const btn=document.getElementById('backToTop');if(window.scrollY>300)btn.classList.add('show');else btn.classList.remove('show');};
document.addEventListener('DOMContentLoaded',async function(){
  setCurrentDate();
  await loadArticlesFromSheet();
  loadHome();
});