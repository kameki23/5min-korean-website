import React, { useState, useEffect, useRef } from 'react';
import { Camera, Mic, Book, Settings, Trophy, Flame, Star, ChevronRight, Volume2, Check, X, RotateCcw, Sparkles, Crown, Lock, TrendingUp, MessageCircle, Zap, Gift, Calendar, Heart } from 'lucide-react';

// 100日分の学習データ生成
const generateLessons = () => {
  const lessons = [];
  
  // Phase 1: 基礎（Day 1-20）
  const basicPhrases = [
    { ja: "こんにちは", ko: "안녕하세요", romanji: "annyeonghaseyo", category: "挨拶", premium: "友達同士の「안녕!」とフォーマルな使い分け" },
    { ja: "ありがとうございます", ko: "감사합니다", romanji: "gamsahamnida", category: "挨拶", premium: "カジュアルな「고마워」との違い" },
    { ja: "〜したい", ko: "〜고 싶어요", romanji: "go sipeoyo", category: "基本動詞", premium: "推しに会いたいときの特別表現" },
    { ja: "いくらですか？", ko: "얼마예요?", romanji: "eolmayeyo", category: "ショッピング", premium: "値引き交渉「깎아 주세요」" },
    { ja: "おいしい！", ko: "맛있어요!", romanji: "masisseoyo", category: "食事", premium: "韓国料理の名前と注文フレーズ" },
    { ja: "どこですか？", ko: "어디예요?", romanji: "eodiyeyo", category: "場所", premium: "地下鉄・タクシーでの道案内" },
    { ja: "ください", ko: "주세요", romanji: "juseyo", category: "依頼", premium: "カフェでの完璧な注文方法" },
    { ja: "好きです", ko: "좋아해요", romanji: "johahaeyo", category: "感情", premium: "推しへの愛を伝える表現集" },
    { ja: "分かりません", ko: "모르겠어요", romanji: "moreugesseoyo", category: "会話", premium: "聞き返す丁寧な表現" },
    { ja: "会いたいです", ko: "보고 싶어요", romanji: "bogo sipeoyo", category: "感情", premium: "恋人に「너무 보고 싶어」" },
    { ja: "食べます", ko: "먹어요", romanji: "meogeoyo", category: "基本動詞", premium: "一緒に食べよう「같이 먹어요」" },
    { ja: "行きます", ko: "가요", romanji: "gayo", category: "基本動詞", premium: "デートの誘い「같이 갈래요?」" },
    { ja: "大丈夫です", ko: "괜찮아요", romanji: "gwaenchanayo", category: "会話", premium: "心配する「괜찮아?」の使い方" },
    { ja: "すみません", ko: "죄송합니다", romanji: "joesonghamnida", category: "謝罪", premium: "ビジネスでの謝罪表現" },
    { ja: "できません", ko: "못해요", romanji: "mothaeyo", category: "能力", premium: "できない理由を説明する" },
    { ja: "楽しいです", ko: "재미있어요", romanji: "jaemiisseoyo", category: "感情", premium: "デートの感想を伝える" },
    { ja: "ゆっくり話してください", ko: "천천히 말해주세요", romanji: "cheoncheonhi malhaejuseyo", category: "依頼", premium: "電話での聞き取り術" },
    { ja: "ちょっと待ってください", ko: "잠깐만요", romanji: "jamkkanmanyo", category: "時間", premium: "電話での保留フレーズ" },
    { ja: "かわいい！", ko: "귀여워요!", romanji: "gwiyeowoyo", category: "褒め言葉", premium: "推しへの褒め言葉完全版" },
    { ja: "かっこいい！", ko: "멋있어요!", romanji: "meositsseoyo", category: "褒め言葉", premium: "異性を褒めるタイミング" }
  ];

  // Phase 2: 日常応用（Day 21-40）
  const dailyPhrases = [
    { ja: "愛してる", ko: "사랑해요", romanji: "saranghaeyo", category: "恋愛", premium: "告白のフレーズ集「사귀어 주세요」" },
    { ja: "頑張って！", ko: "화이팅!", romanji: "hwaiting", category: "応援", premium: "SNSでの応援メッセージ術" },
    { ja: "お腹すいた", ko: "배고파요", romanji: "baegopayo", category: "体調", premium: "デートでの「뭐 먹을래요?」" },
    { ja: "眠いです", ko: "졸려요", romanji: "jollyeoyo", category: "体調", premium: "仕事での「피곤해요」" },
    { ja: "忙しいです", ko: "바빠요", romanji: "bappayo", category: "仕事", premium: "ビジネスでの断り方" },
    { ja: "暑いです", ko: "더워요", romanji: "deowoyo", category: "天気", premium: "スモールトーク術" },
    { ja: "寒いです", ko: "추워요", romanji: "chuwoyo", category: "天気", premium: "気遣いの表現" },
    { ja: "綺麗です", ko: "예쁘요", romanji: "yeppeoyo", category: "褒め言葉", premium: "異性を褒めるタイミング" },
    { ja: "また会いましょう", ko: "또 만나요", romanji: "tto mannayo", category: "別れ", premium: "デート後のメッセージ" },
    { ja: "お疲れ様でした", ko: "수고했어요", romanji: "sugohaesseoyo", category: "労い", premium: "ビジネスでの使い分け" },
    { ja: "一緒に行きましょう", ko: "같이 가요", romanji: "gachi gayo", category: "誘い", premium: "デートの誘い方完全版" },
    { ja: "今何してる？", ko: "지금 뭐 해?", romanji: "jigeum mwo hae", category: "会話", premium: "LINEでのカジュアル会話" },
    { ja: "どう思う？", ko: "어떻게 생각해?", romanji: "eotteoke saenggakhae", category: "会話", premium: "意見を聞く丁寧な表現" },
    { ja: "教えてください", ko: "알려주세요", romanji: "allyeojuseyo", category: "依頼", premium: "質問の仕方完全版" },
    { ja: "本当ですか？", ko: "정말이에요?", romanji: "jeongmarieyo", category: "会話", premium: "驚きの表現バリエーション" },
    { ja: "分かりました", ko: "알겠어요", romanji: "algesseoyo", category: "会話", premium: "ビジネスでの承諾表現" },
    { ja: "気をつけて", ko: "조심해", romanji: "josimhae", category: "気遣い", premium: "別れ際の気遣い表現" },
    { ja: "お先に失礼します", ko: "먼저 가볼게요", romanji: "meonjeo gabolgeyo", category: "別れ", premium: "職場での退勤挨拶" },
    { ja: "連絡ください", ko: "연락주세요", romanji: "yeollakjuseyo", category: "依頼", premium: "ビジネスメールでの表現" },
    { ja: "元気ですか？", ko: "잘 지내요?", romanji: "jal jinaeyo", category: "挨拶", premium: "久しぶりの挨拶" }
  ];

  // Phase 3: 感情・恋愛（Day 41-60）
  const emotionPhrases = [
    { ja: "付き合ってください", ko: "사귀어 주세요", romanji: "sagwieo juseyo", category: "告白", premium: "告白の完全シナリオ" },
    { ja: "好きになりました", ko: "좋아하게 됐어요", romanji: "johahage dwaesseoyo", category: "告白", premium: "気持ちを伝えるタイミング" },
    { ja: "寂しいです", ko: "외로워요", romanji: "oerowoyo", category: "感情", premium: "遠距離恋愛の表現" },
    { ja: "会いたかった", ko: "보고 싶었어", romanji: "bogo sipeosseo", category: "感情", premium: "再会の喜びを伝える" },
    { ja: "ずっと一緒にいたい", ko: "계속 같이 있고 싶어", romanji: "gyesok gachi itgo sipeo", category: "恋愛", premium: "深い愛情表現" },
    { ja: "君だけを見てる", ko: "너만 보고 있어", romanji: "neoman bogo isseo", category: "恋愛", premium: "韓ドラ風の告白" },
    { ja: "大好き", ko: "너무 좋아해", romanji: "neomu johahae", category: "恋愛", premium: "カジュアルな愛情表現" },
    { ja: "どうしたの？", ko: "왜 그래?", romanji: "wae geurae", category: "気遣い", premium: "心配を示す表現" },
    { ja: "大丈夫？", ko: "괜찮아?", romanji: "gwaenchana", category: "気遣い", premium: "優しく聞く方法" },
    { ja: "嬉しい！", ko: "기뻐!", romanji: "gippeo", category: "感情", premium: "喜びの表現バリエーション" },
    { ja: "悲しい", ko: "슬퍼", romanji: "seulpeo", category: "感情", premium: "感情を共有する" },
    { ja: "怒ってる？", ko: "화났어?", romanji: "hwanasseo", category: "感情", premium: "仲直りのフレーズ" },
    { ja: "ごめんね", ko: "미안해", romanji: "mianhae", category: "謝罪", premium: "親しい人への謝り方" },
    { ja: "許してください", ko: "용서해주세요", romanji: "yongseohae juseyo", category: "謝罪", premium: "真剣な謝罪表現" },
    { ja: "信じて", ko: "믿어줘", romanji: "mideojwo", category: "お願い", premium: "信頼を求める表現" },
    { ja: "応援してる", ko: "응원하고 있어", romanji: "eungwonhago isseo", category: "応援", premium: "励ましの言葉" },
    { ja: "心配しないで", ko: "걱정하지마", romanji: "geokjeonghajima", category: "気遣い", premium: "安心させる表現" },
    { ja: "夢見た", ko: "꿈꿨어", romanji: "kkumkkwosseo", category: "会話", premium: "夢の話をする" },
    { ja: "思い出した", ko: "생각났어", romanji: "saenggakn asseo", category: "会話", premium: "記憶を共有する" },
    { ja: "忘れないで", ko: "잊지마", romanji: "itjima", category: "お願い", premium: "別れ際の言葉" }
  ];

  // Phase 4: ビジネス基礎（Day 61-80）
  const businessPhrases = [
    { ja: "お世話になっております", ko: "항상 신세지고 있습니다", romanji: "hangsang sinsejigo itsseumnida", category: "ビジネス挨拶", premium: "メールの書き出し完全版" },
    { ja: "確認いたします", ko: "확인하겠습니다", romanji: "hwaginhagetsseumnida", category: "ビジネス対応", premium: "電話対応の流れ" },
    { ja: "承知いたしました", ko: "알겠습니다", romanji: "algetsseumnida", category: "ビジネス対応", premium: "上司への返答" },
    { ja: "お待ちください", ko: "잠시만 기다려주세요", romanji: "jamsiman gidaryeojuseyo", category: "電話対応", premium: "保留の丁寧な表現" },
    { ja: "申し訳ございません", ko: "죄송합니다", romanji: "joesonghamnida", category: "謝罪", premium: "クレーム対応" },
    { ja: "ご確認ください", ko: "확인해 주세요", romanji: "hwaginhae juseyo", category: "依頼", premium: "メールでの確認依頼" },
    { ja: "よろしくお願いします", ko: "잘 부탁드립니다", romanji: "jal butakdeurimnida", category: "挨拶", premium: "初対面のビジネスマナー" },
    { ja: "お時間よろしいでしょうか", ko: "시간 괜찮으세요?", romanji: "sigan gwaenchaneuseyo", category: "依頼", premium: "アポイントの取り方" },
    { ja: "ご意見をお聞かせください", ko: "의견을 들려주세요", romanji: "uigyeoneul deullyeojuseyo", category: "会議", premium: "会議での発言" },
    { ja: "検討させていただきます", ko: "검토하도록 하겠습니다", romanji: "geomtohadorok hagetsseumnida", category: "交渉", premium: "保留の表現" },
    { ja: "お手数おかけします", ko: "번거롭게 해드려 죄송합니다", romanji: "beongeoreopge haedeuryeo joesonghamnida", category: "謝罪", premium: "依頼時の謝罪" },
    { ja: "ご連絡お待ちしております", ko: "연락 기다리겠습니다", romanji: "yeollak gidarigetsseumnida", category: "メール", premium: "メールの結び" },
    { ja: "いつもお世話になっております", ko: "항상 신세지고 있습니다", romanji: "hangsang sinsejigo itsseumnida", category: "挨拶", premium: "取引先への挨拶" },
    { ja: "資料をお送りします", ko: "자료를 보내드리겠습니다", romanji: "jayoreul bonaedeurigetsseumnida", category: "メール", premium: "添付ファイルの送り方" },
    { ja: "ご都合はいかがでしょうか", ko: "일정이 어떠세요?", romanji: "iljeongi eotteoseyo", category: "アポイント", premium: "日程調整" },
    { ja: "お疲れ様でございます", ko: "수고하셨습니다", romanji: "sugohasyeotsseumnida", category: "労い", premium: "上司への労い" },
    { ja: "失礼いたします", ko: "실례하겠습니다", romanji: "sillyehagetsseumnida", category: "挨拶", premium: "退室の挨拶" },
    { ja: "お名刺を頂戴してもよろしいでしょうか", ko: "명함을 받아도 될까요?", romanji: "myeonghameul badado doelkkayo", category: "名刺交換", premium: "名刺交換のマナー" },
    { ja: "恐れ入りますが", ko: "죄송하지만", romanji: "joesonghajiman", category: "依頼", premium: "丁寧な依頼の前置き" },
    { ja: "ご協力ありがとうございます", ko: "협조해 주셔서 감사합니다", romanji: "hyeopjohae jusyeoseo gamsahamnida", category: "感謝", premium: "ビジネス感謝表現" }
  ];

  // Phase 5: ビジネス応用（Day 81-100）
  const advancedBusinessPhrases = [
    { ja: "ご提案させていただきます", ko: "제안 드리겠습니다", romanji: "jean deurigetsseumnida", category: "プレゼン", premium: "プレゼンの構成" },
    { ja: "ご検討いただけますか", ko: "검토해 주시겠습니까?", romanji: "geomtohae jusigetsseumnikka", category: "交渉", premium: "交渉術" },
    { ja: "予算はどのくらいでしょうか", ko: "예산은 어느 정도입니까?", romanji: "yesaneun eoneu jeongdoimnikka", category: "商談", premium: "価格交渉" },
    { ja: "納期はいつでしょうか", ko: "납기는 언제입니까?", romanji: "napgineun enjeimnnikka", category: "商談", premium: "スケジュール確認" },
    { ja: "条件についてお話したいのですが", ko: "조건에 대해 얘기하고 싶은데요", romanji: "jogeone daehae yaegihago sipeundeyo", category: "交渉", premium: "条件交渉の切り出し" },
    { ja: "win-winの関係を築きたい", ko: "윈윈 관계를 만들고 싶습니다", romanji: "win-win gwangyereul mandeulgo sipseumnida", category: "交渉", premium: "協力関係の提案" },
    { ja: "詳細をご説明させていただきます", ko: "자세히 설명드리겠습니다", romanji: "jasehi seolmyeongdeurigetsseumnida", category: "プレゼン", premium: "詳細説明の流れ" },
    { ja: "質問はございますか", ko: "질문 있으십니까?", romanji: "jilmun itsseusimnikka", category: "プレゼン", premium: "Q&Aの進め方" },
    { ja: "前向きに検討させていただきます", ko: "긍정적으로 검토하겠습니다", romanji: "geungjeongjeog-euro geomtohagetsseumnida", category: "交渉", premium: "前向きな返答" },
    { ja: "今後ともよろしくお願いします", ko: "앞으로도 잘 부탁드립니다", romanji: "apeurodo jal butakdeurimnida", category: "挨拶", premium: "長期関係構築" },
    { ja: "お時間を頂戴しありがとうございます", ko: "시간 내주셔서 감사합니다", romanji: "sigan naejusyeoseo gamsahamnida", category: "感謝", premium: "会議終了時の挨拶" },
    { ja: "契約書を確認させてください", ko: "계약서를 확인하게 해주세요", romanji: "gyeyagseoreul hwaginhage haejuseyo", category: "契約", premium: "契約プロセス" },
    { ja: "合意に達しました", ko: "합의에 도달했습니다", romanji: "habuie dodalhaetsseumnida", category: "交渉", premium: "合意の確認" },
    { ja: "サインをお願いします", ko: "서명해 주세요", romanji: "seomyeonghae juseyo", category: "契約", premium: "契約締結" },
    { ja: "乾杯！", ko: "건배!", romanji: "geonbae", category: "接待", premium: "接待マナー完全版" },
    { ja: "お忙しいところ恐縮です", ko: "바쁘신 와중에 죄송합니다", romanji: "bappeusin wajung-e joesonghamnida", category: "謝罪", premium: "時間を取らせる謝罪" },
    { ja: "成果を上げることができました", ko: "성과를 올릴 수 있었습니다", romanji: "seonggwareul ollil su isseotsseumnida", category: "報告", premium: "成果報告の仕方" },
    { ja: "目標を達成しました", ko: "목표를 달성했습니다", romanji: "mokpyoreul dalseonghaetsseumnida", category: "報告", premium: "業績報告" },
    { ja: "ご期待に応えられるよう努力します", ko: "기대에 부응할 수 있도록 노력하겠습니다", romanji: "gidaee bueunghal su itdorok noryeokhagetsseumnida", category: "約束", premium: "決意表明" },
    { ja: "これからもご指導ください", ko: "앞으로도 지도해 주세요", romanji: "apeurodo jidohae juseyo", category: "挨拶", premium: "上司への挨拶" }
  ];

  // 全フェーズを統合
  const allPhrases = [...basicPhrases, ...dailyPhrases, ...emotionPhrases, ...businessPhrases, ...advancedBusinessPhrases];

  allPhrases.forEach((phrase, index) => {
    const day = index + 1;
    const phase = day <= 20 ? "基礎" : day <= 40 ? "日常応用" : day <= 60 ? "感情表現" : day <= 80 ? "ビジネス基礎" : "ビジネス応用";
    
    lessons.push({
      day,
      phase,
      category: phrase.category,
      phrase_ja: phrase.ja,
      phrase_ko: phrase.ko,
      phrase_romanji: phrase.romanji,
      words: [
        { ja: "単語1", ko: phrase.ko.split(' ')[0] || phrase.ko.substring(0, 2), romanji: "word1" },
        { ja: "単語2", ko: phrase.ko.split(' ')[1] || phrase.ko.substring(2, 4), romanji: "word2" }
      ],
      pronunciation_focus: `${phrase.ko}の発音ポイント`,
      diary_template_ja: `今日は${phrase.ja}を使いました`,
      diary_template_ko: `오늘은 ${phrase.ko}를 사용했어요`,
      premium_bonus: phrase.premium,
      quiz: [
        { type: "fill", question_ja: `「${phrase.ja}」の一部は？`, question_ko: "___", answer: phrase.ko.substring(0, 1), options: [phrase.ko.substring(0, 1), "답", "오답"] },
        { type: "sort", question_ja: `「${phrase.ja}」を並べて`, words: phrase.ko.split('').slice(0, 2), answer: phrase.ko.split('').slice(0, 2) }
      ]
    });
  });

  return lessons;
};

const lessonsData = generateLessons();

// メインアプリコンポーネント
export default function KoreanLearningApp() {
  const [screen, setScreen] = useState('home');
  const [currentDay, setCurrentDay] = useState(1);
  const [learningStep, setLearningStep] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completedDays, setCompletedDays] = useState([]);
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [currentDiaryText, setCurrentDiaryText] = useState('');
  const [quizAnswers, setQuizAnswers] = useState([null, null]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingResult, setRecordingResult] = useState(null);
  const [sortedWords, setSortedWords] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [premiumDaysLeft, setPremiumDaysLeft] = useState(3); // 無料トライアル
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [consecutiveStudyDays, setConsecutiveStudyDays] = useState(0);
  const [totalStudyTime, setTotalStudyTime] = useState(0); // 分単位

  const currentLesson = lessonsData[currentDay - 1];
  
  // プレミアム特典のロック判定
  const isPremiumLocked = (feature) => {
    if (isPremium) return false;
    if (premiumDaysLeft > 0) return false;
    return true;
  };

  // 学習完了時のボーナス計算
  const calculateBonus = () => {
    let bonus = 0;
    if (streak >= 7) bonus += 100; // 1週間継続
    if (streak >= 30) bonus += 500; // 1ヶ月継続
    if (completedDays.length >= 50) bonus += 1000; // 50日達成
    return bonus;
  };

  // プレミアム誘導タイミング
  useEffect(() => {
    // 3日連続、7日連続、30日達成でプレミアム案内
    if (!isPremium && (completedDays.length === 3 || completedDays.length === 7 || completedDays.length === 30)) {
      setTimeout(() => setShowPremiumModal(true), 2000);
    }
  }, [completedDays.length, isPremium]);

  const startTodayLesson = () => {
    setScreen('learning');
    setLearningStep(0);
    setQuizAnswers([null, null]);
    setSortedWords([]);
    setCurrentDiaryText('');
    setRecordingResult(null);
  };

  const nextStep = () => {
    if (learningStep < 6) {
      setLearningStep(learningStep + 1);
    } else {
      completeLesson();
    }
  };

  const completeLesson = () => {
    if (!completedDays.includes(currentDay)) {
      setCompletedDays([...completedDays, currentDay]);
      setStreak(streak + 1);
      setConsecutiveStudyDays(consecutiveStudyDays + 1);
      setTotalStudyTime(totalStudyTime + 5);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
      
      // マイルストーン達成チェック
      if (completedDays.length + 1 === 10 || completedDays.length + 1 === 30 || completedDays.length + 1 === 50) {
        setTimeout(() => setShowPremiumModal(true), 3500);
      }
    }
    setScreen('home');
    if (currentDay < 100) {
      setCurrentDay(currentDay + 1);
    }
  };

  const checkPronunciation = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const success = Math.random() > 0.3;
      setRecordingResult(success ? 'success' : 'retry');
    }, 2000);
  };

  const answerQuiz = (index, answer) => {
    const newAnswers = [...quizAnswers];
    newAnswers[index] = answer;
    setQuizAnswers(newAnswers);
  };

  const handleSort = (word) => {
    if (sortedWords.includes(word)) {
      setSortedWords(sortedWords.filter(w => w !== word));
    } else {
      setSortedWords([...sortedWords, word]);
    }
  };

  const saveDiary = () => {
    const entry = {
      day: currentDay,
      date: new Date().toISOString(),
      text: currentDiaryText,
      phrase: currentLesson.phrase_ko,
      category: currentLesson.category
    };
    setDiaryEntries([...diaryEntries, entry]);
  };

  // プレミアムモーダル
  const PremiumModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 relative">
        <button
          onClick={() => setShowPremiumModal(false)}
          className="absolute top-4 right-4 text-gray-400"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center mb-6">
          <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">プレミアムで学習加速 🚀</h2>
          <p className="text-gray-600">
            {completedDays.length}日達成おめでとう！さらに上を目指しませんか？
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold">推し・韓ドラ・旅行コース解放</p>
              <p className="text-sm text-gray-600">好きなテーマで楽しく学習</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MessageCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold">AI会話レッスン無制限</p>
              <p className="text-sm text-gray-600">実践で使える会話力</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold">発音チェック無制限</p>
              <p className="text-sm text-gray-600">完璧な発音を目指せる</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Gift className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold">例文帳無制限＆自動整理</p>
              <p className="text-sm text-gray-600">あなただけの韓国語帳</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold">連続記録保険（月2回）</p>
              <p className="text-sm text-gray-600">忙しい日も安心</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 mb-6">
          <p className="text-center text-sm text-gray-700 mb-2">
            <span className="font-bold text-orange-600">3日間無料</span>で全機能お試し
          </p>
          <p className="text-center text-xs text-gray-500">
            その後 月額980円 / 年額9,800円（2ヶ月分お得）
          </p>
        </div>

        <button
          onClick={() => {
            setIsPremium(true);
            setPremiumDaysLeft(3);
            setShowPremiumModal(false);
          }}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-2xl py-4 font-bold mb-3"
        >
          3日間無料で始める
        </button>
        <button
          onClick={() => setShowPremiumModal(false)}
          className="w-full bg-gray-100 text-gray-700 rounded-2xl py-3 font-semibold"
        >
          後で
        </button>
      </div>
    </div>
  );

  // ホーム画面
  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-600 mb-2" style={{fontFamily: 'Comic Sans MS, cursive'}}>
            5분 韓国語
          </h1>
          <p className="text-gray-600">100日で日常会話からビジネスまで</p>
        </div>

        {/* プレミアムバナー */}
        {!isPremium && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 mb-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold flex items-center gap-2">
                  <Crown className="w-5 h-5" />
                  プレミアム無料体験
                </p>
                <p className="text-sm opacity-90">3日間すべての機能が使い放題</p>
              </div>
              <button
                onClick={() => setShowPremiumModal(true)}
                className="bg-white text-orange-500 px-4 py-2 rounded-xl font-bold text-sm"
              >
                試す
              </button>
            </div>
          </div>
        )}

        {/* ストリーク＆進捗 */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">連続記録</p>
                <p className="text-3xl font-bold text-orange-500">{streak}日</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">完了</p>
                <p className="text-3xl font-bold text-yellow-500">{completedDays.length}/100</p>
              </div>
            </div>
          </div>
          
          {/* フェーズ別進捗 */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>{currentLesson.phase}</span>
              <span>Day {currentDay}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                style={{width: `${(completedDays.length / 100) * 100}%`}}
              />
            </div>
          </div>

          {/* マイルストーン */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className={`p-2 rounded-lg ${completedDays.length >= 20 ? 'bg-green-50' : 'bg-gray-50'}`}>
              <p className="text-xs text-gray-600">基礎完了</p>
              <p className="font-bold text-sm">{completedDays.length >= 20 ? '✓' : '20日'}</p>
            </div>
            <div className={`p-2 rounded-lg ${completedDays.length >= 60 ? 'bg-green-50' : 'bg-gray-50'}`}>
              <p className="text-xs text-gray-600">恋愛会話</p>
              <p className="font-bold text-sm">{completedDays.length >= 60 ? '✓' : '60日'}</p>
            </div>
            <div className={`p-2 rounded-lg ${completedDays.length >= 100 ? 'bg-green-50' : 'bg-gray-50'}`}>
              <p className="text-xs text-gray-600">ビジネス</p>
              <p className="font-bold text-sm">{completedDays.length >= 100 ? '✓' : '100日'}</p>
            </div>
          </div>
        </div>

        {/* 今日の5分ボタン */}
        <button
          onClick={startTodayLesson}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-3xl py-6 mb-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8" />
            <div>
              <p className="text-sm opacity-90">Day {currentDay} - {currentLesson.category}</p>
              <p className="text-2xl font-bold">今日の5分</p>
              <p className="text-xs opacity-75">{currentLesson.phrase_ja}</p>
            </div>
            <ChevronRight className="w-8 h-8" />
          </div>
        </button>

        {/* プレミアム限定プレビュー */}
        {isPremiumLocked('preview') && (
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 mb-4 relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <Lock className="w-5 h-5 text-purple-600" />
            </div>
            <p className="font-bold text-purple-800 mb-1">今日のプレミアムボーナス</p>
            <p className="text-sm text-purple-700">{currentLesson.premium_bonus}</p>
            <button
              onClick={() => setShowPremiumModal(true)}
              className="mt-2 text-xs text-purple-600 underline"
            >
              プレミアムで解放 →
            </button>
          </div>
        )}

        {/* メニューボタン */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => setScreen('diary')}
            className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all"
          >
            <Book className="w-6 h-6 text-purple-500 mb-2 mx-auto" />
            <p className="text-center font-semibold text-sm">例文帳</p>
            <p className="text-xs text-gray-500 text-center">{diaryEntries.length}個</p>
          </button>
          <button
            onClick={() => setScreen('stats')}
            className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all"
          >
            <TrendingUp className="w-6 h-6 text-blue-500 mb-2 mx-auto" />
            <p className="text-center font-semibold text-sm">統計</p>
            <p className="text-xs text-gray-500 text-center">{totalStudyTime}分</p>
          </button>
          <button
            onClick={() => setScreen('settings')}
            className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all"
          >
            <Settings className="w-6 h-6 text-gray-500 mb-2 mx-auto" />
            <p className="text-center font-semibold text-sm">設定</p>
          </button>
        </div>

        {/* 学習統計（プレミアム機能プレビュー） */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            あなたの成長
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{totalStudyTime}</p>
              <p className="text-xs text-gray-600">総学習時間（分）</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{consecutiveStudyDays}</p>
              <p className="text-xs text-gray-600">連続学習日数</p>
            </div>
          </div>
        </div>
      </div>

      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-3xl p-8 text-center animate-bounce">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-2xl font-bold text-purple-600 mb-2">Day {currentDay - 1} 完了！</p>
            <p className="text-gray-600">今日もよく頑張りました</p>
            {streak >= 7 && <p className="text-orange-500 font-bold mt-2">🔥 {streak}日連続達成！</p>}
          </div>
        </div>
      )}

      {showPremiumModal && <PremiumModal />}
    </div>
  );

  // 学習画面（前と同じロジック）
  const renderLearning = () => {
    const stepNames = ['今日の一言', '書く', '話す', 'クイズ①', 'クイズ②', '1行日記', '復習'];
    const progress = ((learningStep + 1) / 7) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{stepNames[learningStep]}</span>
              <span>{learningStep + 1}/7</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{width: `${progress}%`}}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">
            {learningStep === 0 && renderIntroStep()}
            {learningStep === 1 && renderWriteStep()}
            {learningStep === 2 && renderSpeakStep()}
            {learningStep === 3 && renderQuizStep(0)}
            {learningStep === 4 && renderQuizStep(1)}
            {learningStep === 5 && renderDiaryStep()}
            {learningStep === 6 && renderReviewStep()}
          </div>
        </div>
      </div>
    );
  };

  const renderIntroStep = () => (
    <div className="text-center">
      <p className="text-sm text-gray-500 mb-2">Day {currentDay} - {currentLesson.category}</p>
      <p className="text-xs text-purple-600 mb-4">{currentLesson.phase}</p>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{currentLesson.phrase_ja}</h2>
      <div className="bg-purple-50 rounded-2xl p-6 mb-6">
        <p className="text-4xl font-bold text-purple-600 mb-2">{currentLesson.phrase_ko}</p>
        <p className="text-gray-500">{currentLesson.phrase_romanji}</p>
      </div>
      <button
        onClick={() => {
          const utterance = new SpeechSynthesisUtterance(currentLesson.phrase_ko);
          utterance.lang = 'ko-KR';
          speechSynthesis.speak(utterance);
        }}
        className="flex items-center gap-2 mx-auto bg-purple-100 text-purple-600 px-6 py-3 rounded-full mb-4"
      >
        <Volume2 className="w-5 h-5" />
        発音を聞く
      </button>
      
      {/* プレミアムボーナスプレビュー */}
      {!isPremiumLocked('bonus') && (
        <div className="bg-yellow-50 rounded-xl p-4 mb-4">
          <p className="text-xs text-yellow-800 mb-1 flex items-center gap-1">
            <Crown className="w-4 h-4" />
            プレミアムボーナス
          </p>
          <p className="text-sm text-yellow-900">{currentLesson.premium_bonus}</p>
        </div>
      )}
      
      <button
        onClick={nextStep}
        className="w-full bg-purple-500 text-white rounded-2xl py-4 font-bold hover:bg-purple-600"
      >
        次へ
      </button>
    </div>
  );

  const renderWriteStep = () => (
    <div>
      <h3 className="text-xl font-bold text-center mb-6">ハングルをなぞろう</h3>
      <div className="bg-purple-50 rounded-2xl p-8 mb-6">
        <p className="text-center text-gray-600 mb-4">指でなぞってみよう</p>
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          {currentLesson.phrase_ko.split('').map((char, i) => (
            <div key={i} className="w-16 h-20 border-4 border-dashed border-purple-300 rounded-xl flex items-center justify-center">
              <span className="text-4xl text-purple-400">{char}</span>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">発音のポイント</p>
          <p className="text-purple-600">{currentLesson.pronunciation_focus}</p>
        </div>
      </div>
      <button
        onClick={nextStep}
        className="w-full bg-purple-500 text-white rounded-2xl py-4 font-bold"
      >
        できた！
      </button>
    </div>
  );

  const renderSpeakStep = () => (
    <div>
      <h3 className="text-xl font-bold text-center mb-6">発音してみよう</h3>
      <div className="bg-purple-50 rounded-2xl p-8 mb-6">
        <p className="text-4xl font-bold text-center text-purple-600 mb-4">
          {currentLesson.phrase_ko}
        </p>
        <p className="text-center text-gray-500 mb-6">{currentLesson.phrase_romanji}</p>
        
        {!isRecording && !recordingResult && (
          <button
            onClick={checkPronunciation}
            className="w-full bg-red-500 text-white rounded-2xl py-6 font-bold flex items-center justify-center gap-3"
          >
            <Mic className="w-6 h-6" />
            タップして発音
          </button>
        )}
        
        {isRecording && (
          <div className="text-center">
            <div className="w-20 h-20 bg-red-500 rounded-full mx-auto mb-4 animate-pulse" />
            <p className="text-gray-600">聞いています...</p>
          </div>
        )}
        
        {recordingResult === 'success' && (
          <div className="text-center">
            <Check className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <p className="text-2xl font-bold text-green-500 mb-2">素晴らしい！✨</p>
            <p className="text-gray-600 mb-4">発音バッチリです</p>
            <button
              onClick={nextStep}
              className="w-full bg-purple-500 text-white rounded-2xl py-4 font-bold"
            >
              次へ
            </button>
          </div>
        )}
        
        {recordingResult === 'retry' && (
          <div className="text-center">
            <RotateCcw className="w-20 h-20 text-orange-500 mx-auto mb-4" />
            <p className="text-xl font-bold text-orange-500 mb-2">もう一度！</p>
            <p className="text-gray-600 mb-4">ゆっくり発音してみよう</p>
            <button
              onClick={() => setRecordingResult(null)}
              className="w-full bg-orange-500 text-white rounded-2xl py-4 font-bold"
            >
              もう一回チャレンジ
            </button>
            <button
              onClick={nextStep}
              className="w-full bg-gray-300 text-gray-700 rounded-2xl py-3 font-bold mt-2"
            >
              スキップ
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderQuizStep = (quizIndex) => {
    const quiz = currentLesson.quiz[quizIndex];
    
    if (quiz.type === 'fill') {
      return (
        <div>
          <h3 className="text-xl font-bold text-center mb-6">穴埋め問題</h3>
          <p className="text-center text-gray-600 mb-6">{quiz.question_ja}</p>
          <div className="bg-purple-50 rounded-2xl p-6 mb-6">
            <p className="text-3xl font-bold text-center text-purple-600">{quiz.question_ko}</p>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {quiz.options.map((option, i) => (
              <button
                key={i}
                onClick={() => answerQuiz(quizIndex, option)}
                className={`py-4 rounded-xl font-bold text-xl ${
                  quizAnswers[quizIndex] === option
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {quizAnswers[quizIndex] && (
            <button
              onClick={nextStep}
              className={`w-full rounded-2xl py-4 font-bold ${
                quizAnswers[quizIndex] === quiz.answer
                  ? 'bg-green-500 text-white'
                  : 'bg-orange-500 text-white'
              }`}
            >
              {quizAnswers[quizIndex] === quiz.answer ? '正解！✨ 次へ' : 'もう一度見直そう'}
            </button>
          )}
        </div>
      );
    } else {
      const remainingWords = quiz.words.filter(w => !sortedWords.includes(w));
      const isCorrect = JSON.stringify(sortedWords) === JSON.stringify(quiz.answer);
      
      return (
        <div>
          <h3 className="text-xl font-bold text-center mb-6">並べ替え問題</h3>
          <p className="text-center text-gray-600 mb-6">{quiz.question_ja}</p>
          
          <div className="bg-purple-50 rounded-2xl p-4 mb-4 min-h-20 flex items-center justify-center gap-2 flex-wrap">
            {sortedWords.length === 0 ? (
              <p className="text-gray-400">タップして並べよう</p>
            ) : (
              sortedWords.map((word, i) => (
                <button
                  key={i}
                  onClick={() => handleSort(word)}
                  className="bg-purple-500 text-white px-4 py-2 rounded-xl font-bold"
                >
                  {word}
                </button>
              ))
            )}
          </div>
          
          <div className="flex gap-2 justify-center mb-6 flex-wrap">
            {remainingWords.map((word, i) => (
              <button
                key={i}
                onClick={() => handleSort(word)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-bold"
              >
                {word}
              </button>
            ))}
          </div>
          
          {sortedWords.length > 0 && (
            <div>
              <button
                onClick={() => setSortedWords([])}
                className="w-full bg-gray-300 text-gray-700 rounded-2xl py-3 font-bold mb-2"
              >
                やり直し
              </button>
              {sortedWords.length === quiz.words.length && (
                <button
                  onClick={nextStep}
                  className={`w-full rounded-2xl py-4 font-bold ${
                    isCorrect ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
                  }`}
                >
                  {isCorrect ? '正解！🎉 次へ' : 'おしい！もう一度'}
                </button>
              )}
            </div>
          )}
        </div>
      );
    }
  };

  const renderDiaryStep = () => (
    <div>
      <h3 className="text-xl font-bold text-center mb-6">1行日記</h3>
      <p className="text-center text-gray-600 mb-4">今日の一言を使って文を作ろう</p>
      <div className="bg-purple-50 rounded-2xl p-4 mb-4">
        <p className="text-sm text-gray-500 mb-2">テンプレート</p>
        <p className="text-gray-700">{currentLesson.diary_template_ja}</p>
        <p className="text-purple-600 mt-2">{currentLesson.diary_template_ko}</p>
      </div>
      <textarea
        value={currentDiaryText}
        onChange={(e) => setCurrentDiaryText(e.target.value)}
        placeholder="例：今日はコーヒーを飲みたいです"
        className="w-full border-2 border-purple-200 rounded-2xl p-4 mb-4 min-h-24"
      />
      <button
        onClick={() => {
          saveDiary();
          nextStep();
        }}
        className="w-full bg-purple-500 text-white rounded-2xl py-4 font-bold"
      >
        保存して次へ
      </button>
    </div>
  );

  const renderReviewStep = () => {
    const yesterday = currentDay > 1 ? lessonsData[currentDay - 2] : null;
    
    return (
      <div className="text-center">
        <h3 className="text-xl font-bold mb-6">復習</h3>
        {yesterday ? (
          <>
            <p className="text-gray-600 mb-4">昨日の一言を覚えてる？</p>
            <div className="bg-purple-50 rounded-2xl p-6 mb-6">
              <p className="text-gray-700 mb-2">{yesterday.phrase_ja}</p>
              <p className="text-3xl font-bold text-purple-600">{yesterday.phrase_ko}</p>
            </div>
          </>
        ) : (
          <p className="text-gray-600 mb-6">明日から復習が始まるよ！</p>
        )}
        <button
          onClick={nextStep}
          className="w-full bg-green-500 text-white rounded-2xl py-6 font-bold text-xl"
        >
          今日の5分完了！🎉
        </button>
      </div>
    );
  };

  // 例文帳画面
  const renderDiary = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setScreen('home')}
            className="text-purple-600"
          >
            ← 戻る
          </button>
          <h2 className="text-2xl font-bold">例文帳</h2>
          <div className="w-8" />
        </div>
        
        {diaryEntries.length === 0 ? (
          <div className="text-center py-12">
            <Book className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">まだ例文がありません</p>
            <p className="text-sm text-gray-400">学習を始めると自動で保存されます</p>
          </div>
        ) : (
          <>
            {isPremium && (
              <div className="mb-4 flex gap-2 flex-wrap">
                <button className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">すべて</button>
                <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">恋愛</button>
                <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">ビジネス</button>
                <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">カフェ</button>
              </div>
            )}
            <div className="space-y-4">
              {diaryEntries.map((entry, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">
                      Day {entry.day} - {entry.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(entry.date).toLocaleDateString('ja-JP')}
                    </span>
                  </div>
                  <p className="text-purple-600 font-bold mb-1">{entry.phrase}</p>
                  <p className="text-gray-700">{entry.text}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );

  // 統計画面
  const renderStats = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setScreen('home')}
            className="text-purple-600"
          >
            ← 戻る
          </button>
          <h2 className="text-2xl font-bold">学習統計</h2>
          <div className="w-8" />
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            累計データ
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-purple-600">{totalStudyTime}</p>
              <p className="text-sm text-gray-600">総学習時間（分）</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">{completedDays.length}</p>
              <p className="text-sm text-gray-600">完了レッスン</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-orange-600">{streak}</p>
              <p className="text-sm text-gray-600">連続記録（日）</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{diaryEntries.length}</p>
              <p className="text-sm text-gray-600">作成した例文</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <h3 className="font-bold mb-4">フェーズ別進捗</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>基礎（Day 1-20）</span>
                <span>{Math.min(completedDays.filter(d => d <= 20).length, 20)}/20</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full"
                  style={{width: `${(Math.min(completedDays.filter(d => d <= 20).length, 20) / 20) * 100}%`}}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>日常応用（Day 21-40）</span>
                <span>{completedDays.filter(d => d >= 21 && d <= 40).length}/20</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{width: `${(completedDays.filter(d => d >= 21 && d <= 40).length / 20) * 100}%`}}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>感情・恋愛（Day 41-60）</span>
                <span>{completedDays.filter(d => d >= 41 && d <= 60).length}/20</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-pink-500 h-2 rounded-full"
                  style={{width: `${(completedDays.filter(d => d >= 41 && d <= 60).length / 20) * 100}%`}}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>ビジネス基礎（Day 61-80）</span>
                <span>{completedDays.filter(d => d >= 61 && d <= 80).length}/20</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full"
                  style={{width: `${(completedDays.filter(d => d >= 61 && d <= 80).length / 20) * 100}%`}}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>ビジネス応用（Day 81-100）</span>
                <span>{completedDays.filter(d => d >= 81).length}/20</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full"
                  style={{width: `${(completedDays.filter(d => d >= 81).length / 20) * 100}%`}}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            達成バッジ
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div className={`text-center ${completedDays.length >= 7 ? '' : 'opacity-30'}`}>
              <div className="text-3xl mb-1">🔥</div>
              <p className="text-xs">7日連続</p>
            </div>
            <div className={`text-center ${completedDays.length >= 30 ? '' : 'opacity-30'}`}>
              <div className="text-3xl mb-1">⭐</div>
              <p className="text-xs">30日達成</p>
            </div>
            <div className={`text-center ${completedDays.length >= 50 ? '' : 'opacity-30'}`}>
              <div className="text-3xl mb-1">💎</div>
              <p className="text-xs">50日達成</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 設定画面
  const renderSettings = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setScreen('home')}
            className="text-purple-600"
          >
            ← 戻る
          </button>
          <h2 className="text-2xl font-bold">設定</h2>
          <div className="w-8" />
        </div>
        
        <div className="bg-white rounded-2xl p-6 mb-4">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            プレミアム会員
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>ステータス</span>
              <span className={isPremium ? 'text-green-500 font-bold' : 'text-gray-400'}>
                {isPremium ? '有効' : '無効'}
              </span>
            </div>
            {isPremium && premiumDaysLeft > 0 && (
              <div className="bg-yellow-50 rounded-xl p-3">
                <p className="text-sm text-yellow-800">
                  無料トライアル残り <span className="font-bold">{premiumDaysLeft}日</span>
                </p>
              </div>
            )}
            {!isPremium && (
              <button
                onClick={() => setShowPremiumModal(true)}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl py-3 font-bold"
              >
                プレミアムに登録
              </button>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 mb-4">
          <h3 className="font-bold mb-4">学習設定</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>毎日の通知</span>
              <label className="relative inline-block w-12 h-6">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>
            <div className="flex justify-between items-center">
              <span>通知時間</span>
              <span className="text-gray-600">19:00</span>
            </div>
            <div className="flex justify-between items-center">
              <span>音声の速度</span>
              <select className="bg-gray-100 rounded-lg px-3 py-1">
                <option>ゆっくり</option>
                <option>ふつう</option>
                <option>はやい</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6">
          <h3 className="font-bold mb-4">その他</h3>
          <div className="space-y-3">
            <button className="w-full text-left py-2 text-gray-700">利用規約</button>
            <button className="w-full text-left py-2 text-gray-700">プライバシーポリシー</button>
            <button className="w-full text-left py-2 text-gray-700">お問い合わせ</button>
            <button className="w-full text-left py-2 text-gray-700">データをエクスポート</button>
            <button className="w-full text-left py-2 text-red-500">アカウント削除</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans">
      {screen === 'home' && renderHome()}
      {screen === 'learning' && renderLearning()}
      {screen === 'diary' && renderDiary()}
      {screen === 'stats' && renderStats()}
      {screen === 'settings' && renderSettings()}
    </div>
  );
}