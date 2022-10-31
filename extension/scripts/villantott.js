vill_main();

function vill_main() {

	var container = vill_container();
	vill_fill(container);

}

function vill_container() {

	container = $(".page-header");
	
	container.html("Villantott:");
	container.css("color", "white");
	container.css("font-size", "24pt");
	container.css("padding-left", "8pt");

	return container;
}

function vill_fill(container) {

	vill_add(container, "lofasz", "#");
	vill_add(container, "lofasz2", "#");
	vill_add(container, "lofasz3", "#");
}

function vill_add(container, text, url) {

	var link = $("<a/>");
	link.attr("href", url);
	link.text(text);
	link.css("color", "white");

	var item = $("<li/>");
	item.css("padding-left", "8pt");
	item.append(link);

	container.append(item);

}