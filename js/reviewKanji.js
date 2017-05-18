var kanjiData =
[
    {
        "image" : "images/kanji/fun.gif",
        "onyomi" : "FUN",
        "kunyomi": "wa(karu)",
        "meaning": "understand",
        "mnemonic": "",

    },
    {
        "image" : "images/kanji/bun.gif",
        "onyomi" : "BUN, MON",
        "kunyomi": "ki(ku), ki(koeru)",
        "meaning": "to hear, to listen, to ask",
        "mnemonic": "Baby Kanji LISTENing from mother and father kanji",

    },
    {
        "image" : "images/kanji/bo.gif",
        "onyomi" : "BO",
        "kunyomi": "haha",
        "meaning": "mother",
        "mnemonic": "MOTHER crying with tears of joy",

    },
    {
        "image" : "images/kanji/hoku.gif",
        "onyomi" : "HOKU",
        "kunyomi": "kita",
        "meaning": "north",
        "mnemonic": "People running away from NORTH",

    },
    {
        "image" : "images/kanji/boku.gif",
        "onyomi" : "BOKU, MOKU",
        "kunyomi": "ki, ko",
        "meaning": "tree, wood",
        "mnemonic": "T-shaped TREE with leaf skirt",

    },
    {
        "image" : "images/kanji/hon.gif",
        "onyomi" : "HON",
        "kunyomi": "moto",
        "meaning": "book, source, main-",
        "mnemonic": "Tree is cut to make BOOKS",

    },
    {
        "image" : "images/kanji/mai.gif",
        "onyomi" : "MAI",
        "kunyomi": "-",
        "meaning": "each, every",
        "mnemonic": "EVERY person has a mother",

    },
    {
        "image" : "images/kanji/man.gif",
        "onyomi" : "MAN, BAN",
        "kunyomi": "-",
        "meaning": "ten thousand, all, many",
        "mnemonic": "Running in TEN THOUSAND kph",

    },
    {
        "image" : "images/kanji/mei.gif",
        "onyomi" : "MEI, MYOU",
        "kunyomi": "na",
        "meaning": "name, reputation",
        "mnemonic": "",

    },
    {
        "image" : "images/kanji/moku.gif",
        "onyomi" : "MOKU",
        "kunyomi": "me",
        "meaning": "eye",
        "mnemonic": "",

    },
    {
        "image" : "images/kanji/do.gif",
        "onyomi" : "DO, TO",
        "kunyomi": "Tsuchi",
        "meaning": "Earth, ground",
        "mnemonic": "Cross on the ground",

    },
    {
        "image" : "images/kanji/jin.gif",
        "onyomi" : "JIN, NIN",
        "kunyomi": "Hito",
        "meaning": "Person",
        "mnemonic": "Like a stick person's legs",

    },
    {
        "image" : "images/kanji/kyuu.gif",
        "onyomi" : "KYUU",
        "kunyomi": "Yasu(mu)",
        "meaning": "To Rest",
        "mnemonic": "Person resting on a tree",

    },
    {
        "image" : "images/kanji/u.gif",
        "onyomi" : "U",
        "kunyomi": "Ame",
        "meaning": "Rain",
        "mnemonic": "Closed windows because of the rain",

    },
    {
        "image" : "images/kanji/zen.gif",
        "onyomi" : "ZEN",
        "kunyomi": "Mae",
        "meaning": "Before",
        "mnemonic": "Thick TV with antenna was used before",

    },
    {
        "image" : "images/kanji/gaku.gif",
        "onyomi" : "GAKU",
        "kunyomi": "Mana(bu)",
        "meaning": "School, science, teaching",
        "mnemonic": "Child gaining knowledge",

    },
    {
        "image" : "images/kanji/ge.gif",
        "onyomi" : "KA, GE",
        "kunyomi": "Shimo, sa(geru), o(rosu), ku(daru)",
        "meaning": "Below, down",
        "mnemonic": "Sign pointing down",

    },
    {
        "image" : "images/kanji/ta.gif",
        "onyomi" : "TA",
        "kunyomi": "Oo(i)",
        "meaning": "Many",
        "mnemonic": "Many TAwers (towers)",

    },
    {
        "image" : "images/kanji/haku.gif",
        "onyomi" : "HAKU, BYAKU",
        "kunyomi": "Shiro(i), shiro",
        "meaning": "White",
        "mnemonic": "White Candle",

    },
    {
        "image" : "images/kanji/jo.gif",
        "onyomi" : "JO, NYO",
        "kunyomi": "Onna, me",
        "meaning": "Woman, female",
        "mnemonic": "Woman sitting near a table",

    },

];

for(var i = 0; i<kanjiData.length; i++){

	if(i % 4 == 0)
	{
		$('#cards').append("<div class = 'row'>")
	}
    $('#cards').append("<div class='card col s2 offset-s1'><div class='card-image waves-effect waves-block waves-light'><img class='activator' src='"+ kanjiData[i].image +"'></div><div class='card-content'><span class='card-title activator grey-text text-darken-4'><i class='material-icons right'>more_vert</i></span></div><div class='card-reveal'><span class='card-title grey-text text-darken-4'><i class='material-icons'>close</i></span><h6><b>ONYOMI</b><br/>"+ kanjiData[i].onyomi +"</h6><h6><b>KUNYOMI</b><br/>"+ kanjiData[i].kunyomi +"</h6><h6><b>MEANING</b><br/>"+ kanjiData[i].meaning +"</h6><h6><b>MNEMONIC</b><br/>"+ kanjiData[i].mnemonic +"</h6></div></div>");
    if(i % 4 == 3)
    {
    	$('#cards').append("</div>")
    }
}

