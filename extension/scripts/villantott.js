vill_main();

function vill_main() {

	const patterns = [
			":mellet:",
			":tökéletes:melle",
			":hatalmas:melle",
			":meztelen", ":félmeztelen",
			":mutatjuk:.*:meztelen:",
			":szexi:", ":szuperszexi:",
			":tökéletes:.*:combj",
			":tökéletes:.*:alakj",
			":pózol:",
			":mutogatja:",
			":vadító:.*:szexi",
			":nincs:bugyi:",
			":bugyi:nélkül:",
	]
	
	const container = vill_container();
	vill_fill(container, patterns);

}

function vill_container() {

	const container = $(".page-header");  // replace
	
	container.html("&lt;o&gt; Villantott:");
	container.css("color", "white");
	container.css("font-size", "20pt");
	container.css("padding-left", "8pt");

	return container;
}

function vill_fill(container, patterns) {

	$("a").each(function(_, link) {

		let original_text = $(link).text();
		original_text = original_text.replaceAll("\n","");

		let normalized_text = original_text.toLowerCase();
		normalized_text = normalized_text.replaceAll("\ ",":");
		normalized_text = normalized_text.replaceAll("\.",":");
		normalized_text = normalized_text.replaceAll("\?",":");
		normalized_text = normalized_text.replaceAll("\!",":");
		normalized_text = normalized_text.replaceAll("::",":");
		normalized_text = normalized_text.replaceAll("::",":");
		normalized_text = ":" + normalized_text + ":"

		for (let pattern of patterns) {

			pattern = ".*" + pattern + ".*"
			if (normalized_text.match(pattern)) {
				
				if (original_text.substring(0,4) == "Fotó") {
					original_text = original_text.substring(4);
				}
				console.log(normalized_text.substring(0,3),original_text);

				const url = $(link).attr("href");
				vill_add(container, original_text, url);

				break;
			}
		}

	})
}

function vill_add(container, text, url) {

	const link = $("<a/>");
	link.attr("href", url);
	link.text(text);
	link.css("color", "white");

	const item = $("<li/>");
	item.css("padding-left", "8pt");
	item.append(link);

	container.append(item);
}