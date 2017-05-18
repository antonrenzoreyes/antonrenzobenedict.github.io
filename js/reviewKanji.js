var kanjiData =
[
    {
        'image' : 'images/kanji/fun.gif',
        'onyomi' : 'FUN',
        'kunyomi': 'wa(karu)',
        'meaning': 'understand',
        'mnemonic': '',

    },
    {
        'image' : 'images/kanji/bun.gif',
        'onyomi' : 'BUN, MON',
        'kunyomi': 'ki(ku), ki(koeru)',
        'meaning': 'to hear, to listen, to ask',
        'mnemonic': '',

    },
    {
        'image' : 'images/kanji/bo.gif',
        'onyomi' : 'BO',
        'kunyomi': 'haha',
        'meaning': 'mother',
        'mnemonic': '',

    },
    {
        'image' : 'images/kanji/hoku.gif',
        'onyomi' : 'HOKU',
        'kunyomi': 'kita',
        'meaning': 'north',
        'mnemonic': '',

    },
    {
        'image' : 'images/kanji/boku.gif',
        'onyomi' : 'BOKU, MOKU',
        'kunyomi': 'ki, ko',
        'meaning': 'tree, wood',
        'mnemonic': '',

    },
    {
        'image' : 'images/kanji/hon.gif',
        'onyomi' : 'HON',
        'kunyomi': 'moto',
        'meaning': 'book, source, main-',
        'mnemonic': '',

    },
    {
        'image' : 'images/kanji/mai.gif',
        'onyomi' : 'MAI',
        'kunyomi': '-',
        'meaning': 'each, every',
        'mnemonic': '',

    },
    {
        'image' : 'images/kanji/man.gif',
        'onyomi' : 'MAN, BAN',
        'kunyomi': '-',
        'meaning': 'ten thousand, all, many',
        'mnemonic': '',

    },
    {
        'image' : 'images/kanji/mei.gif',
        'onyomi' : 'MEI, MYOU',
        'kunyomi': 'na',
        'meaning': 'name, reputation',
        'mnemonic': '',

    },
    {
        'image' : 'images/kanji/moku.gif',
        'onyomi' : 'MOKU',
        'kunyomi': 'me',
        'meaning': 'eye',
        'mnemonic': '',

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

