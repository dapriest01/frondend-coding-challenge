cart = [];
if (!localStorage.getItem("cart")) {
	localStorage.setItem("cart", JSON.stringify(cart));
}
function addItem(id, quantity) {
	let data = {
		id,
		quantity,
	};

	let oldItems = JSON.parse(localStorage.getItem("cart"));

	
	if (idExistsInArray(oldItems, data.id)) {
	
		oldItems.find((o, i) => {
			if (o.id === data.id) {
				oldItems[i].quantity = data.quantity;
				localStorage.setItem("cart", JSON.stringify(oldItems));
			
				if (data.quantity == 0) {
					oldItems = oldItems.filter(function(obj) {
						return obj.id !== data.id;
					});
					localStorage.setItem("cart", JSON.stringify(oldItems));
				}
				return true; 
			}
		});
	} else {
		oldItems.push(data);
	}

	localStorage.setItem("cart", JSON.stringify(oldItems));

	return true;
}

function idExistsInArray(array, id) {
	var regex = new RegExp('"id":' + id + "(,|})");
	return regex.test(JSON.stringify(array));
}
