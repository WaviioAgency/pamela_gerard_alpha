// Simple translation utility for basic art-related terms
// In a real application, you would use a proper translation API like Google Translate

const translations = {
  // Common art terms
  'j\'adore': { en: 'I love', hu: 'imádom' },
  'adore': { en: 'love', hu: 'imádom' },
  'fraises': { en: 'strawberries', hu: 'eper' },
  'fraise': { en: 'strawberry', hu: 'eper' },
  'délicate': { en: 'delicate', hu: 'finom' },
  'célébrant': { en: 'celebrating', hu: 'ünnepli' },
  'beauté': { en: 'beauty', hu: 'szépség' },
  'simple': { en: 'simple', hu: 'egyszerű' },
  'rouges': { en: 'red', hu: 'vörös' },
  'rouge': { en: 'red', hu: 'vörös' },
  'douces': { en: 'sweet', hu: 'édes' },
  'douce': { en: 'sweet', hu: 'édes' },
  'délices': { en: 'delights', hu: 'gyönyörűség' },
  'été': { en: 'summer', hu: 'nyár' },
  'abstrait': { en: 'abstract', hu: 'absztrakt' },
  'paysage': { en: 'landscape', hu: 'tájkép' },
  'portrait': { en: 'portrait', hu: 'portré' },
  'couleur': { en: 'color', hu: 'szín' },
  'couleurs': { en: 'colors', hu: 'színek' },
  'émotion': { en: 'emotion', hu: 'érzelem' },
  'émotions': { en: 'emotions', hu: 'érzelmek' },
  'vie': { en: 'life', hu: 'élet' },
  'âme': { en: 'soul', hu: 'lélek' },
  'cœur': { en: 'heart', hu: 'szív' },
  'lumière': { en: 'light', hu: 'fény' },
  'ombre': { en: 'shadow', hu: 'árnyék' },
  'rêve': { en: 'dream', hu: 'álom' },
  'rêves': { en: 'dreams', hu: 'álmok' },
  'nature': { en: 'nature', hu: 'természet' },
  'mer': { en: 'sea', hu: 'tenger' },
  'océan': { en: 'ocean', hu: 'óceán' },
  'ciel': { en: 'sky', hu: 'ég' },
  'soleil': { en: 'sun', hu: 'nap' },
  'lune': { en: 'moon', hu: 'hold' },
  'étoile': { en: 'star', hu: 'csillag' },
  'étoiles': { en: 'stars', hu: 'csillagok' },
  'fleur': { en: 'flower', hu: 'virág' },
  'fleurs': { en: 'flowers', hu: 'virágok' },
  'arbre': { en: 'tree', hu: 'fa' },
  'arbres': { en: 'trees', hu: 'fák' },
  'montagne': { en: 'mountain', hu: 'hegy' },
  'montagnes': { en: 'mountains', hu: 'hegyek' },
  'rivière': { en: 'river', hu: 'folyó' },
  'lac': { en: 'lake', hu: 'tó' },
  'forêt': { en: 'forest', hu: 'erdő' },
  'jardin': { en: 'garden', hu: 'kert' },
  'maison': { en: 'house', hu: 'ház' },
  'ville': { en: 'city', hu: 'város' },
  'chemin': { en: 'path', hu: 'ösvény' },
  'route': { en: 'road', hu: 'út' },
  'pont': { en: 'bridge', hu: 'híd' },
  'fenêtre': { en: 'window', hu: 'ablak' },
  'porte': { en: 'door', hu: 'ajtó' },
  'temps': { en: 'time', hu: 'idő' },
  'moment': { en: 'moment', hu: 'pillanat' },
  'instant': { en: 'instant', hu: 'pillanat' },
  'éternité': { en: 'eternity', hu: 'örökkévalóság' },
  'paix': { en: 'peace', hu: 'béke' },
  'sérénité': { en: 'serenity', hu: 'nyugalom' },
  'joie': { en: 'joy', hu: 'öröm' },
  'bonheur': { en: 'happiness', hu: 'boldogság' },
  'amour': { en: 'love', hu: 'szerelem' },
  'passion': { en: 'passion', hu: 'szenvedély' },
  'espoir': { en: 'hope', hu: 'remény' },
  'liberté': { en: 'freedom', hu: 'szabadság' },
  'beauté': { en: 'beauty', hu: 'szépség' },
  'harmonie': { en: 'harmony', hu: 'harmónia' },
  'mystère': { en: 'mystery', hu: 'rejtély' },
  'secret': { en: 'secret', hu: 'titok' },
  'secrets': { en: 'secrets', hu: 'titkok' },
  'histoire': { en: 'story', hu: 'történet' },
  'histoires': { en: 'stories', hu: 'történetek' },
  'mémoire': { en: 'memory', hu: 'emlék' },
  'souvenirs': { en: 'memories', hu: 'emlékek' },
  'silence': { en: 'silence', hu: 'csend' },
  'musique': { en: 'music', hu: 'zene' },
  'danse': { en: 'dance', hu: 'tánc' },
  'mouvement': { en: 'movement', hu: 'mozgás' },
  'regard': { en: 'gaze', hu: 'tekintet' },
  'yeux': { en: 'eyes', hu: 'szemek' },
  'visage': { en: 'face', hu: 'arc' },
  'sourire': { en: 'smile', hu: 'mosoly' },
  'larme': { en: 'tear', hu: 'könny' },
  'larmes': { en: 'tears', hu: 'könnyek' },
  'main': { en: 'hand', hu: 'kéz' },
  'mains': { en: 'hands', hu: 'kezek' },
  'doigt': { en: 'finger', hu: 'ujj' },
  'doigts': { en: 'fingers', hu: 'ujjak' },
  'corps': { en: 'body', hu: 'test' },
  'esprit': { en: 'spirit', hu: 'szellem' },
  'pensée': { en: 'thought', hu: 'gondolat' },
  'pensées': { en: 'thoughts', hu: 'gondolatok' },
  'imagination': { en: 'imagination', hu: 'képzelet' },
  'création': { en: 'creation', hu: 'alkotás' },
  'art': { en: 'art', hu: 'művészet' },
  'artiste': { en: 'artist', hu: 'művész' },
  'peinture': { en: 'painting', hu: 'festmény' },
  'toile': { en: 'canvas', hu: 'vászon' },
  'pinceau': { en: 'brush', hu: 'ecset' },
  'palette': { en: 'palette', hu: 'paletta' },
  'œuvre': { en: 'artwork', hu: 'műalkotás' },
  'chef-d\'œuvre': { en: 'masterpiece', hu: 'remekmű' },
  'inspiration': { en: 'inspiration', hu: 'ihlet' },
  'créativité': { en: 'creativity', hu: 'kreativitás' },
  'talent': { en: 'talent', hu: 'tehetség' },
  'génie': { en: 'genius', hu: 'zseni' },
  'style': { en: 'style', hu: 'stílus' },
  'technique': { en: 'technique', hu: 'technika' },
  'forme': { en: 'form', hu: 'forma' },
  'formes': { en: 'forms', hu: 'formák' },
  'ligne': { en: 'line', hu: 'vonal' },
  'lignes': { en: 'lines', hu: 'vonalak' },
  'courbe': { en: 'curve', hu: 'görbe' },
  'courbes': { en: 'curves', hu: 'görbék' },
  'texture': { en: 'texture', hu: 'textúra' },
  'matière': { en: 'matter', hu: 'anyag' },
  'surface': { en: 'surface', hu: 'felület' },
  'profondeur': { en: 'depth', hu: 'mélység' },
  'perspective': { en: 'perspective', hu: 'perspektíva' },
  'dimension': { en: 'dimension', hu: 'dimenzió' },
  'dimensions': { en: 'dimensions', hu: 'méretek' },
  'espace': { en: 'space', hu: 'tér' },
  'volume': { en: 'volume', hu: 'térfogat' },
  'équilibre': { en: 'balance', hu: 'egyensúly' },
  'contraste': { en: 'contrast', hu: 'kontraszt' },
  'nuance': { en: 'nuance', hu: 'árnyalat' },
  'nuances': { en: 'nuances', hu: 'árnyalatok' },
  'ton': { en: 'tone', hu: 'tónus' },
  'tons': { en: 'tones', hu: 'tónusok' },
  'teinte': { en: 'hue', hu: 'színárnyalat' },
  'teintes': { en: 'hues', hu: 'színárnyalatok' },
  'intensité': { en: 'intensity', hu: 'intenzitás' },
  'vivacité': { en: 'vibrancy', hu: 'élénkség' },
  'éclat': { en: 'brilliance', hu: 'ragyogás' },
  'transparence': { en: 'transparency', hu: 'átlátszóság' },
  'opacité': { en: 'opacity', hu: 'átlátszatlanság' },
  'reflet': { en: 'reflection', hu: 'tükröződés' },
  'reflets': { en: 'reflections', hu: 'tükröződések' },
  'miroir': { en: 'mirror', hu: 'tükör' },
  'image': { en: 'image', hu: 'kép' },
  'vision': { en: 'vision', hu: 'látomás' },
  'rêverie': { en: 'reverie', hu: 'álmodozás' },
  'méditation': { en: 'meditation', hu: 'meditáció' },
  'contemplation': { en: 'contemplation', hu: 'szemlélődés' },
  'observation': { en: 'observation', hu: 'megfigyelés' },
  'découverte': { en: 'discovery', hu: 'felfedezés' },
  'exploration': { en: 'exploration', hu: 'felfedezés' },
  'voyage': { en: 'journey', hu: 'utazás' },
  'aventure': { en: 'adventure', hu: 'kaland' },
  'expérience': { en: 'experience', hu: 'tapasztalat' },
  'sensation': { en: 'sensation', hu: 'érzés' },
  'sensations': { en: 'sensations', hu: 'érzések' },
  'sentiment': { en: 'feeling', hu: 'érzés' },
  'sentiments': { en: 'feelings', hu: 'érzések' },
  'impression': { en: 'impression', hu: 'benyomás' },
  'impressions': { en: 'impressions', hu: 'benyomások' },
  'ressenti': { en: 'feeling', hu: 'érzés' },
  'vibration': { en: 'vibration', hu: 'rezgés' },
  'vibrations': { en: 'vibrations', hu: 'rezgések' },
  'énergie': { en: 'energy', hu: 'energia' },
  'force': { en: 'strength', hu: 'erő' },
  'puissance': { en: 'power', hu: 'hatalom' },
  'douceur': { en: 'gentleness', hu: 'gyengédség' },
  'tendresse': { en: 'tenderness', hu: 'gyengédség' },
  'délicatesse': { en: 'delicacy', hu: 'finomság' },
  'finesse': { en: 'finesse', hu: 'finomság' },
  'élégance': { en: 'elegance', hu: 'elegancia' },
  'grâce': { en: 'grace', hu: 'kegyelem' },
  'charme': { en: 'charm', hu: 'báj' },
  'magie': { en: 'magic', hu: 'varázslat' },
  'enchantement': { en: 'enchantment', hu: 'varázslat' },
  'sortilège': { en: 'spell', hu: 'varázslat' },
  'miracle': { en: 'miracle', hu: 'csoda' },
  'merveille': { en: 'wonder', hu: 'csoda' },
  'prodige': { en: 'prodigy', hu: 'csoda' },
  'phénomène': { en: 'phenomenon', hu: 'jelenség' },
  'manifestation': { en: 'manifestation', hu: 'megnyilvánulás' },
  'révélation': { en: 'revelation', hu: 'kinyilatkoztatás' },
  'épiphanie': { en: 'epiphany', hu: 'megvilágosodás' },
  'illumination': { en: 'illumination', hu: 'megvilágítás' },
  'clarté': { en: 'clarity', hu: 'tisztaság' },
  'pureté': { en: 'purity', hu: 'tisztaság' },
  'innocence': { en: 'innocence', hu: 'ártatlanság' },
  'simplicité': { en: 'simplicity', hu: 'egyszerűség' },
  'complexité': { en: 'complexity', hu: 'összetettség' },
  'richesse': { en: 'richness', hu: 'gazdagság' },
  'abondance': { en: 'abundance', hu: 'bőség' },
  'plénitude': { en: 'fullness', hu: 'teljesség' },
  'complétude': { en: 'completeness', hu: 'teljesség' },
  'perfection': { en: 'perfection', hu: 'tökéletesség' },
  'imperfection': { en: 'imperfection', hu: 'tökéletlenség' },
  'défaut': { en: 'flaw', hu: 'hiba' },
  'qualité': { en: 'quality', hu: 'minőség' },
  'excellence': { en: 'excellence', hu: 'kiválóság' },
  'supériorité': { en: 'superiority', hu: 'felsőbbrendűség' },
  'unicité': { en: 'uniqueness', hu: 'egyediség' },
  'originalité': { en: 'originality', hu: 'eredetiség' },
  'authenticité': { en: 'authenticity', hu: 'hitelesség' },
  'vérité': { en: 'truth', hu: 'igazság' },
  'réalité': { en: 'reality', hu: 'valóság' },
  'illusion': { en: 'illusion', hu: 'illúzió' },
  'fantaisie': { en: 'fantasy', hu: 'fantázia' },
  'fiction': { en: 'fiction', hu: 'fikció' },
  'légende': { en: 'legend', hu: 'legenda' },
  'mythe': { en: 'myth', hu: 'mítosz' },
  'conte': { en: 'tale', hu: 'mese' },
  'récit': { en: 'story', hu: 'elbeszélés' },
  'narration': { en: 'narration', hu: 'elbeszélés' },
  'dialogue': { en: 'dialogue', hu: 'párbeszéd' },
  'conversation': { en: 'conversation', hu: 'beszélgetés' },
  'échange': { en: 'exchange', hu: 'csere' },
  'partage': { en: 'sharing', hu: 'megosztás' },
  'communion': { en: 'communion', hu: 'közösség' },
  'connexion': { en: 'connection', hu: 'kapcsolat' },
  'lien': { en: 'bond', hu: 'kötelék' },
  'relation': { en: 'relationship', hu: 'kapcsolat' },
  'rapport': { en: 'relationship', hu: 'viszony' },
  'proximité': { en: 'proximity', hu: 'közelség' },
  'intimité': { en: 'intimacy', hu: 'intimitás' },
  'familiarité': { en: 'familiarity', hu: 'ismeretség' },
  'complicité': { en: 'complicity', hu: 'bűnrészesség' },
  'confiance': { en: 'trust', hu: 'bizalom' },
  'foi': { en: 'faith', hu: 'hit' },
  'croyance': { en: 'belief', hu: 'hiedelem' },
  'conviction': { en: 'conviction', hu: 'meggyőződés' },
  'certitude': { en: 'certainty', hu: 'bizonyosság' },
  'doute': { en: 'doubt', hu: 'kétség' },
  'incertitude': { en: 'uncertainty', hu: 'bizonytalanság' },
  'questionnement': { en: 'questioning', hu: 'kérdezés' },
  'interrogation': { en: 'interrogation', hu: 'kérdezés' },
  'réflexion': { en: 'reflection', hu: 'gondolkodás' },
  'analyse': { en: 'analysis', hu: 'elemzés' },
  'synthèse': { en: 'synthesis', hu: 'szintézis' },
  'compréhension': { en: 'understanding', hu: 'megértés' },
  'intelligence': { en: 'intelligence', hu: 'intelligencia' },
  'sagesse': { en: 'wisdom', hu: 'bölcsesség' },
  'connaissance': { en: 'knowledge', hu: 'tudás' },
  'savoir': { en: 'knowledge', hu: 'tudás' },
  'apprentissage': { en: 'learning', hu: 'tanulás' },
  'enseignement': { en: 'teaching', hu: 'tanítás' },
  'éducation': { en: 'education', hu: 'oktatás' },
  'formation': { en: 'training', hu: 'képzés' },
  'développement': { en: 'development', hu: 'fejlődés' },
  'évolution': { en: 'evolution', hu: 'evolúció' },
  'transformation': { en: 'transformation', hu: 'átalakulás' },
  'métamorphose': { en: 'metamorphosis', hu: 'metamorfózis' },
  'changement': { en: 'change', hu: 'változás' },
  'mutation': { en: 'mutation', hu: 'mutáció' },
  'révolution': { en: 'revolution', hu: 'forradalom' },
  'innovation': { en: 'innovation', hu: 'innováció' },
  'nouveauté': { en: 'novelty', hu: 'újdonság' },
  'modernité': { en: 'modernity', hu: 'modernitás' },
  'contemporain': { en: 'contemporary', hu: 'kortárs' },
  'actuel': { en: 'current', hu: 'jelenlegi' },
  'présent': { en: 'present', hu: 'jelen' },
  'passé': { en: 'past', hu: 'múlt' },
  'futur': { en: 'future', hu: 'jövő' },
  'avenir': { en: 'future', hu: 'jövő' },
  'destinée': { en: 'destiny', hu: 'sors' },
  'destin': { en: 'fate', hu: 'végzet' },
  'hasard': { en: 'chance', hu: 'véletlen' },
  'coïncidence': { en: 'coincidence', hu: 'véletlen egybeesés' },
  'synchronicité': { en: 'synchronicity', hu: 'szinkronitás' },
  'harmonie': { en: 'harmony', hu: 'harmónia' },
  'accord': { en: 'agreement', hu: 'megállapodás' },
  'consonance': { en: 'consonance', hu: 'összhang' },
  'dissonance': { en: 'dissonance', hu: 'disszonancia' },
  'tension': { en: 'tension', hu: 'feszültség' },
  'conflit': { en: 'conflict', hu: 'konfliktus' },
  'opposition': { en: 'opposition', hu: 'ellenzék' },
  'contradiction': { en: 'contradiction', hu: 'ellentmondás' },
  'paradoxe': { en: 'paradox', hu: 'paradoxon' },
  'ambiguïté': { en: 'ambiguity', hu: 'kétértelműség' },
  'ambivalence': { en: 'ambivalence', hu: 'ambivalencia' },
  'dualité': { en: 'duality', hu: 'kettősség' },
  'polarité': { en: 'polarity', hu: 'polaritás' },
  'complémentarité': { en: 'complementarity', hu: 'kiegészítő jelleg' },
  'unité': { en: 'unity', hu: 'egység' },
  'totalité': { en: 'totality', hu: 'totalitás' },
  'ensemble': { en: 'whole', hu: 'egész' },
  'fragment': { en: 'fragment', hu: 'töredék' },
  'partie': { en: 'part', hu: 'rész' },
  'élément': { en: 'element', hu: 'elem' },
  'composant': { en: 'component', hu: 'komponens' },
  'ingrédient': { en: 'ingredient', hu: 'összetevő' },
  'essence': { en: 'essence', hu: 'lényeg' },
  'substance': { en: 'substance', hu: 'anyag' },
  'matériau': { en: 'material', hu: 'anyag' },
  'support': { en: 'support', hu: 'támogatás' },
  'base': { en: 'base', hu: 'alap' },
  'fondation': { en: 'foundation', hu: 'alapítvány' },
  'origine': { en: 'origin', hu: 'eredet' },
  'source': { en: 'source', hu: 'forrás' },
  'racine': { en: 'root', hu: 'gyökér' },
  'racines': { en: 'roots', hu: 'gyökerek' },
  'naissance': { en: 'birth', hu: 'születés' },
  'création': { en: 'creation', hu: 'teremtés' },
  'genèse': { en: 'genesis', hu: 'genezis' },
  'commencement': { en: 'beginning', hu: 'kezdet' },
  'début': { en: 'start', hu: 'kezdet' },
  'fin': { en: 'end', hu: 'vég' },
  'conclusion': { en: 'conclusion', hu: 'következtetés' },
  'achèvement': { en: 'completion', hu: 'befejezés' },
  'accomplissement': { en: 'accomplishment', hu: 'teljesítmény' },
  'réalisation': { en: 'realization', hu: 'megvalósítás' },
  'concrétisation': { en: 'materialization', hu: 'megvalósulás' },
  'manifestation': { en: 'manifestation', hu: 'megnyilvánulás' },
  'expression': { en: 'expression', hu: 'kifejezés' },
  'communication': { en: 'communication', hu: 'kommunikáció' },
  'transmission': { en: 'transmission', hu: 'átvitel' },
  'message': { en: 'message', hu: 'üzenet' },
  'signal': { en: 'signal', hu: 'jel' },
  'signe': { en: 'sign', hu: 'jel' },
  'symbole': { en: 'symbol', hu: 'szimbólum' },
  'métaphore': { en: 'metaphor', hu: 'metafora' },
  'allégorie': { en: 'allegory', hu: 'allegória' },
  'représentation': { en: 'representation', hu: 'ábrázolás' },
  'figuration': { en: 'figuration', hu: 'ábrázolás' },
  'illustration': { en: 'illustration', hu: 'illusztráció' },
  'démonstration': { en: 'demonstration', hu: 'bemutató' },
  'présentation': { en: 'presentation', hu: 'bemutató' },
  'exposition': { en: 'exhibition', hu: 'kiállítás' },
  'galerie': { en: 'gallery', hu: 'galéria' },
  'musée': { en: 'museum', hu: 'múzeum' },
  'collection': { en: 'collection', hu: 'gyűjtemény' },
  'série': { en: 'series', hu: 'sorozat' },
  'suite': { en: 'suite', hu: 'lakosztály' },
  'cycle': { en: 'cycle', hu: 'ciklus' },
  'période': { en: 'period', hu: 'időszak' },
  'époque': { en: 'era', hu: 'korszak' },
  'âge': { en: 'age', hu: 'kor' },
  'génération': { en: 'generation', hu: 'generáció' },
  'héritage': { en: 'heritage', hu: 'örökség' },
  'tradition': { en: 'tradition', hu: 'hagyomány' },
  'coutume': { en: 'custom', hu: 'szokás' },
  'habitude': { en: 'habit', hu: 'szokás' },
  'routine': { en: 'routine', hu: 'rutin' },
  'rituel': { en: 'ritual', hu: 'rituálé' },
  'cérémonie': { en: 'ceremony', hu: 'szertartás' },
  'célébration': { en: 'celebration', hu: 'ünneplés' },
  'fête': { en: 'party', hu: 'buli' },
  'festival': { en: 'festival', hu: 'fesztivál' },
  'événement': { en: 'event', hu: 'esemény' },
  'occasion': { en: 'occasion', hu: 'alkalom' },
  'opportunité': { en: 'opportunity', hu: 'lehetőség' },
  'chance': { en: 'chance', hu: 'esély' },
  'possibilité': { en: 'possibility', hu: 'lehetőség' },
  'potentiel': { en: 'potential', hu: 'potenciál' },
  'capacité': { en: 'capacity', hu: 'kapacitás' },
  'aptitude': { en: 'aptitude', hu: 'alkalmasság' },
  'compétence': { en: 'competence', hu: 'kompetencia' },
  'habileté': { en: 'skill', hu: 'ügyesség' },
  'maîtrise': { en: 'mastery', hu: 'mesterség' },
  'expertise': { en: 'expertise', hu: 'szakértelem' },
  'savoir-faire': { en: 'know-how', hu: 'szakértelem' },
  'virtuosité': { en: 'virtuosity', hu: 'virtuozitás' },
  'perfection': { en: 'perfection', hu: 'tökéletesség' },
  'excellence': { en: 'excellence', hu: 'kiválóság' }
};

// Basic word-by-word translation function
export const translateText = (text, targetLanguage) => {
  if (!text || typeof text !== 'string') return text;
  if (targetLanguage === 'fr') return text; // Original is in French
  
  console.log('Translating:', text, 'to', targetLanguage);
  
  // Enhanced translation with better word boundary detection
  const words = text.toLowerCase().split(/(\s+|[.,!?;:'"()«»])/);
  
  const translatedWords = words.map(word => {
    // Clean word but preserve punctuation context
    const cleanWord = word.toLowerCase().replace(/[.,!?;:'"()«»]/g, '');
    
    // Skip empty words or pure whitespace/punctuation
    if (!cleanWord || /^\s*$/.test(cleanWord)) {
      return word;
    }
    
    console.log('Looking for translation of:', cleanWord);
    
    if (translations[cleanWord] && translations[cleanWord][targetLanguage]) {
      console.log('Found translation:', translations[cleanWord][targetLanguage]);
      // Preserve original capitalization
      const translation = translations[cleanWord][targetLanguage];
      if (text.indexOf(word) === 0 && word[0] === word[0].toUpperCase()) {
        return translation.charAt(0).toUpperCase() + translation.slice(1);
      }
      return translation;
    }
    
    console.log('No translation found for:', cleanWord);
    return word; // Return original word if no translation found
  });
  
  const result = translatedWords.join('');
  console.log('Final translation result:', result);
  return translatedWords.join('');
};

// Enhanced function to create multilingual text with better translation
export const createMultilingualText = (frenchText) => {
  if (!frenchText || typeof frenchText !== 'string') {
    return {
      fr: frenchText || '',
      en: '',
      hu: ''
    };
  }

  // Debug: Let's see what's happening
  console.log('Original French text:', frenchText);
  
  const englishTranslation = translateText(frenchText, 'en');
  const hungarianTranslation = translateText(frenchText, 'hu');
  
  console.log('English translation:', englishTranslation);
  console.log('Hungarian translation:', hungarianTranslation);

  return {
    fr: frenchText,
    en: englishTranslation,
    hu: hungarianTranslation
  };
};

// Function to get translated text from multilingual object
export const getTranslatedText = (textObj, language = 'fr') => {
  // Handle null or undefined
  if (!textObj) {
    return '';
  }
  
  // If textObj is a string, return it directly
  if (typeof textObj === 'string') {
    return textObj;
  }
  
  // If textObj is an object with language keys, return the appropriate translation
  if (typeof textObj === 'object') {
    // First try current language, then fallback to fr, en, hu, or first available value
    const translation = textObj[language] || textObj.fr || textObj.en || textObj.hu;
    if (translation) {
      return translation;
    }
    // If no translation found, return first available value
    const values = Object.values(textObj);
    return values.length > 0 ? values[0] : '';
  }
  
  // Fallback for any other case
  return String(textObj) || '';
};

// Function to create multilingual object from French text
export const createMultilingualTextLegacy = (frenchText) => {
  return {
    fr: frenchText,
    en: translateText(frenchText, 'en'),
    hu: translateText(frenchText, 'hu')
  };
};