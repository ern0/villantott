vill_main();

function vill_main() {

	const patterns = [	

			"nagy.*mellei",
			":tökéletes:mell",
			":hatalmas:mell",
			":formás:mell",
			":giga.*:mell",
			":giga.*mell",
			":óriás.*mell",

			"nagy.*kebl",
			":tökéletes:kebl",
			":hatalmas:kebl",
			":formás:kebl",
			":giga.*:kebl",
			":giga.*kebl",
			":óriás.*kebl",

			":kirak.*:mell",
			":megmut.*:mell",
			":mutogat.*:mell",
			":mellei.*ellenáll",
			":mellei.*megmut",
			":szabad.*:mell",
			":kipakol.*:mell",
			":takar.*:mell",

			":mellbimbó",
			":dekoltázs",
			":dekoltázzs",
			":mellkirálynő",

			":tökéletes:.*:fenek",
			":tökéletes:.*:fenék",
			":tökéletes:.*:combj",
			":tökéletes:.*:alakj",

			":mutat.*:.*:formás:",
			":vadító:.*:bikini",
			":vadító:.*:fürdőruh",
			":vadító:.*:tang",

			":ráz.*fenek.*",
			":fenek.*ráz.*",
			":fenékráz.*",
			":kilátsz.*fenék",
			":kilátsz.*fenek",
			
			":szexi:", 
			":szuperszexi:",
			":legszexi",
			":vadító.*:szexi",
			":vadító.*:néz:ki:",
			":bomba.*test.*:kép",
			":bomba.*test.*:videó",
			":testrefesz",

			":meztelen", 
			":félmeztelen",
			":melltartó.*:nélk.*:kép",
			":melltartó.*:nélk.*:fotó",
			":melltartó.*:nélk.*:videó",
			":ruha:nélk.*:kép",
			":ruha:nélk.*:fotó",
			":ruha:nélk.*:videó",
			"nadrág:nélk.*:kép",
			"nadrág:nélk.*:fotó",
			"nadrág:nélk.*:videó",
			":alig:.*:ruha:",
			":csak.*takar.*test",
			":fehérnemű.*fotó",
			":látszik.*átlátszó",
			":látszik.*áttetsző",

			":pózol:",
			":mutogatja:",
			"őrjít.*kép",
			"őrjít.*fotó",
			"őrjít.*videó",

			":nem:volt:bugyi:",
			":nincs:bugyi:",
			":bugyi:nélkül:",
			":tanga.*kép",
			":tanga.*videó",

			":szexel",
			"18\\+",

			":villantott:"
	]
	
	let container = vill_container();
	vill_fill(container, patterns);

}

function vill_container() {

	$(".o-section-breaking").append("<div id='villantott'><span id='vill-title'>&lt;o&gt;&nbsp;Villantott<span id='count'></span>:</span></div>");
	container = $("#villantott");
	title = $("#vill-title");

	container.css("margin-top", "0.3vw");
	container.css("padding-top", "0.8vw");
	container.css("padding-bottom", "0.3vw");
	container.css("background", "#001492");
	container.css("color", "#eeeeff");
	container.css("font-size", "1.8vw");
	container.css("padding-left", "1.0vw");

	title.css("font-weight", "bold");
	title.css("background", "#eb034a");
	title.css("padding", "0.1vw 0.5vw 0.1vw 0.5vw");

	return container;
}

function vill_fill(container, patterns) {

	let last_url = "#";
	let count = 0;

	$("a").each(function(_, link) {

		let original_raw = $(link)[0].outerHTML.replaceAll(">", "> ");
		let original_text = $(original_raw).text();
		original_text = original_text.replaceAll("\n","");
		original_text = original_text.replaceAll("   "," ");
		original_text = original_text.replaceAll("  "," ");
		original_text = original_text.replaceAll("18 +","[18+] ");
		original_text = original_text.replaceAll("2022","2022 ");

		let normalized_text = original_text.toLowerCase();
		normalized_text = normalized_text.replaceAll("[",":");
		normalized_text = normalized_text.replaceAll("]",":");
		normalized_text = normalized_text.replaceAll("\ ",":");
		normalized_text = normalized_text.replaceAll("\.",":");
		normalized_text = normalized_text.replaceAll("\?",":");
		normalized_text = normalized_text.replaceAll("\!",":");
		for (let i = 0; i < 4; i++) {
			normalized_text = normalized_text.replaceAll("::",":");
		}
		normalized_text = ":" + normalized_text + ":"

		original_text = original_text.replaceAll("villantott", "<span style='color: #ffbbcc'>villantott</span>");

		for (let pattern of patterns) {

			pattern = ".*" + pattern + ".*"
			if (normalized_text.match(pattern)) {

				original_text = vill_cut_foto(original_text, "galéria");
				original_text = vill_cut_foto(original_text, "fotó");
				original_text = vill_cut_foto(original_text, "fotók");
				original_text = vill_cut_foto(original_text, "fotógaléria");
				original_text = vill_cut_foto(original_text, "kép");
				original_text = vill_cut_foto(original_text, "képek");
				original_text = vill_cut_foto(original_text, "képgaléria");
				original_text = vill_cut_foto(original_text, "-");
				original_text = vill_cut_foto(original_text, ".");
				
				const url = $(link).attr("href");
				let cont = (url == last_url);
				vill_add(container, original_text, url, cont);
				if (!cont) count++;
				last_url = url;

				console.log( $(link).text() );

				break;
			}

		}

	});

	$("#count").html(" [" + count + "]");

}

function vill_cut_foto(text, pattern) {

	const plen = pattern.length;
	const tlen = text.length - plen;

	if (text.toLowerCase().substr(tlen, plen) == pattern) {
		text = text.substr(0, tlen);
	}

	return text.trim();
}

function vill_add(container, text, url, cont) {

	const link = $("<a/>");
	link.attr("href", url);
	if (!cont) {
		link.html("&bull;&nbsp;&nbsp;" + text);
	} else {
		link.html("&nbsp;&nbsp;&nbsp;&nbsp;" + text);
	}
	link.css("color", "white");

	const div = $("<div/>");
	div.append(link);

	container.append(div);
}
