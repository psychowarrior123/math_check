const form = $("form");
const checklist = $(".checklist");
const clear = $(".clear");
const del = $(".del");
const input = $("#item");
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

const chMaker = text => {
	const l = $("<label>", {class:"checkbox"});
	const ch = $("<input>", {type: "checkbox"});
	const s = $("<span>", {text:" " +text});
	l.append(ch);
	l.append(s);
	checklist.append(l);
}

form.submit(function(e) {
	e.preventDefault();
	chMaker(input.val())
	itemsArray.push(input.val());
	localStorage.setItem('items', JSON.stringify(itemsArray));
	input.val('')
})

data.forEach(item => {
	chMaker(item);
})

$(".clear").click(function(){
	localStorage.clear();
	$("label.checkbox").remove();
	itemsArray = [];
})

$(".del").click(function() {
	let prnt = $("input:checked").parent(".checkbox")
	let hts = prnt.children('span').html()
	let get = localStorage.getItem('items')
	if (get == hts) {
		localStorage.removeItem('items')
	}
	prnt.remove();
})