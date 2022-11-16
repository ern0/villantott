vill_main();

function vill_main() {

	const patterns = [	

			"nagy.*mell",
			":tökéletes:mell",
			":hatalmas:mell",
			":formás:mell",
			":giga.*:mell",

			":kirak.*:mell",
			":megmut.*:mell",
			":mutogat.*:mell",
			":mellei.*ellenáll",
			":mellei.*megmut",

			":mellbimbó",
			":dekoltázs",

			":tökéletes:.*:fenek",
			":tökéletes:.*:combj",
			":tökéletes:.*:alakj",
			
			":szexi:", 
			":szuperszexi:",
			":vadító:.*:szexi",
			":bomba.*test.*:kép",
			":bomba.*test.*:videó",
			":testrefesz",

			":meztelen", 
			":félmeztelen",
			":ruha:nélk*:kép",
			":ruha:nélk*:videó",
			":alig:.*:ruha:",

			":pózol:",
			":mutogatja:",

			":nem:volt:bugyi:",
			":nincs:bugyi:",
			":bugyi:nélkül:",
			":tanga.*kép",
			":tanga.*videó",

			":szexel",
			":18+",

			":villantott:"
	]
	
	let container = vill_container();
	vill_fill(container, patterns);

}

function vill_container() {

	$(".o-section-breaking").append("<div id='villantott'><span id='vill-title'>&lt;o&gt;&nbsp;Villantott:</span></div>");
	container = $("#villantott");
	title = $("#vill-title");

	container.css("margin-top", "0.3vw");
	container.css("padding-top", "0.8vw");
	container.css("padding-bottom", "0.3vw");
	container.css("background", "#001492");
	container.css("color", "#eeeeff");
	container.css("font-size", "2.0vw");
	container.css("padding-left", "1.0vw");

	title.css("font-weight", "bold");
	title.css("background", "#eb034a");
	title.css("padding", "0.1vw 0.5vw 0.1vw 0.5vw");

	return container;
}

function vill_fill(container, patterns) {

	let last_url = "#";

	$("a").each(function(_, link) {

		let original_text = $(link).text();
		original_text = original_text.replaceAll("\n","");
		original_text = original_text.replaceAll("18\ +","[18+] ");

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
				vill_add(container, original_text, url, (url == last_url));
				last_url = url;

				break;
			}
		}

	})
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
