const newsList = document.querySelector("#hackers-news");
// create element & render news
function renderNews(doc) {
	let li = document.createElement("li");
	let anch = document.createElement("a");
	let by = document.createElement("span");

	li.setAttribute("data-id", doc.id);
	anch.setAttribute("href", doc.url);
	anch.setAttribute("target", "_blank");
	anch.textContent = doc.title;
	by.textContent = doc.by;

	li.appendChild(anch);
	li.appendChild(by);

	newsList.appendChild(li);
}

fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
	.then(resp => resp.json())
	.then(newsJson => {
		for (let i = 0; i <= newsJson.length; i++) {
			if (i >= 10) break;
			fetch(
				"https://hacker-news.firebaseio.com/v0/item/" + newsJson[i] + ".json"
			)
				.then(resp => resp.json())
				.then(data => {
					renderNews(data);
				})
				.catch(err => console.log(err));
		}
	})
	.catch(err => console.log(err));
