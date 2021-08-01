var user = document.getElementById('userId').name;
console.log(user)
console.log(MYLIBRARY)

		function getCookie(name) {
		    var cookieValue = null;
		    if (document.cookie && document.cookie !== '') {
		        var cookies = document.cookie.split(';');
		        for (var i = 0; i < cookies.length; i++) {
		            var cookie = cookies[i].trim();
		            // Does this cookie string begin with the name we want?
		            if (cookie.substring(0, name.length + 1) === (name + '=')) {
		                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
		                break;
		            }
		        }
		    }
		    return cookieValue;
		}
		var csrftoken = getCookie('csrftoken');

		var activeItem = null
		var task_list_snapshot = []


		buildList()
        
        
		function buildList(){

			var task_wrapper = document.getElementById('task-wrapper')
			var url = 'http://127.0.0.1:8000/api/task-list/'

			fetch(url)
			.then((resp) => resp.json())
			.then(function(task_data){
				console.log('TaskData:', task_data)

				var task_list = task_data
				for (var i in task_list){


					try{
						document.getElementById(`task_data-row-${i}`).remove()
					}catch(err){

					}
			


					var title = `<span class="title">${task_list[i].title}</span>`
					if (task_list[i].completed == true){
						title = `<strike class="title">${task_list[i].title}</strike>`
					}

					var item = `
						<div id="task_data-row-${i}" class="task-wrapper flex-wrapper">
						<div class="col">
							<button class="btn btn-sm btn-outline-info edit">E</button>
							<button class="btn btn-sm btn-outline-danger delete">X</button>
						</div>
							<div style="flex:1">
								<h3>${title}</h3>
							</div>

							<div class="col">
								<button type="button"  class="btn btn-primary weNeedButton">we need</button>
								<button type="button"  class="btn btn-success IBoughtButton">I bought</button>
							</div>

							<!--   <div style="flex:1">
							 	<button type="button"  class="btn btn-info historyButton">History</button>
							 </div>
							-->
						</div>

					`
					task_wrapper.innerHTML += item
	
				}

				if (task_list_snapshot.length > task_list.length){
					for (var i = task_list.length; i < task_list_snapshot.length; i++){
						document.getElementById(`task_data-row-${i}`).remove()
					}
				}

				task_list_snapshot = task_list


				for (var i in task_list){
					var editBtn = document.getElementsByClassName('edit')[i]
					var deleteBtn = document.getElementsByClassName('delete')[i]
					var title = document.getElementsByClassName('title')[i]
					var IBoughtButton = document.getElementsByClassName('IBoughtButton')[i]
					var weNeedButton = document.getElementsByClassName('weNeedButton')[i]
					// var historyButton = document.getElementsByClassName('historyButton')[i]

					// historyButton.addEventListener('click', (function(item){
					// 	return function(){
					// 		showHistory(item)
					// 	}
					// })(task_list[i]))

					weNeedButton.addEventListener('click', (function(item){
						return function(){
							createWeNeed(item)
						}
					})(task_list[i]))
					IBoughtButton.addEventListener('click', (function(item){
						return function(){
							createIBought(item)
						}
					})(task_list[i]))


					editBtn.addEventListener('click', (function(item){
						return function(){
							editItem(item)
						}
					})(task_list[i]))


					deleteBtn.addEventListener('click', (function(item){
						return function(){
							deleteItem(item)
						}
					})(task_list[i]))



					
					title.addEventListener('click', (function(item){
						return function(){
							strikeUnstrike(item)
						}
					})(task_list[i]))


				}


			})

            MYLIBRARY.buildBoughtList()
			MYLIBRARY2.buildWeNeedList()
			
		}


		var form = document.getElementById('form-wrapper')
		form.addEventListener('submit', function(e){
			e.preventDefault()
			console.log('Form submitted')
			var url = 'http://127.0.0.1:8000/api/task-create/'
			if (activeItem != null){
				var url = `http://127.0.0.1:8000/api/task-update/${activeItem.id}/`
				activeItem = null
			}



			var title = document.getElementById('title').value
			fetch(url, {
				method:'POST',
				headers:{
					'Content-type':'application/json',
					'X-CSRFToken':csrftoken,
				},
				body:JSON.stringify({'title':title})
			}
			).then(function(response){
				console.log(JSON.stringify(response))
				buildList()
				document.getElementById('form').reset()
			})
		})


		// function showHistory(item){
		// 	var url = 'http://127.0.0.1:8000/api/task-detail/' +item.id
		// 	// var title = item.title;
		// 	// var dateObj = new Date();
		// 	// var month = dateObj.getUTCMonth() + 1; //months from 1-12
		// 	// var day = dateObj.getUTCDate();
		// 	// var year = dateObj.getUTCFullYear();
		// 	// var date = year + "/" + month + "/" + day;
            
		// 	fetch(url, {
		// 		method:'GET',
		// 		// headers:{
		// 		// 	'Content-type':'application/json',
		// 		// 	'X-CSRFToken':csrftoken,
		// 		// },
		// 		// body:JSON.stringify({
		// 		// 	'title':title,
		// 		// 	'dates': date,
		// 		// 	'task':item.id,
		// 		// 	'user': user
				
		// 		// })
		// 	})
		// 	.then((resp) => resp.json())
		// 	.then(function(task_data){
		// 		console.log( 'history',task_data)
		// 		MYLIBRARY3.buildHistoryList()
		// 	})
		// }


		function createIBought(item){
			var url = 'http://127.0.0.1:8000/api/I-bought-create/'
			var title = item.title;
			var dateObj = new Date();
			var month = dateObj.getUTCMonth() + 1; //months from 1-12
			var day = dateObj.getUTCDate();
			var year = dateObj.getUTCFullYear();
			var date = year + "/" + month + "/" + day;
            
			fetch(url, {
				method:'POST',
				headers:{
					'Content-type':'application/json',
					'X-CSRFToken':csrftoken,
				},
				body:JSON.stringify({
					'title':title,
					'dates': date,
					'task':item.id,
					'user': user
				
				})
			}
			).then(function(response){
				console.log(JSON.stringify(response))
				MYLIBRARY.buildBoughtList()
			})
		}

		function createWeNeed(item){
			var url = 'http://127.0.0.1:8000/api/We-Need-create/'
			var title = item.title;

            
			fetch(url, {
				method:'POST',
				headers:{
					'Content-type':'application/json',
					'X-CSRFToken':csrftoken,
				},
				body:JSON.stringify({
					'title':title,
					'task':item.id,
					'user': user
				
				})
			}
			).then(function(response){
				console.log(JSON.stringify(response))
				MYLIBRARY2.buildWeNeedList()
				// MYLIBRARY.buildWeNeedList()
			})
		}


		function editItem(item){
			console.log('Item clicked:', item)
			activeItem = item
			document.getElementById('title').value = activeItem.title
            buildList
		}


		function deleteItem(item){
			console.log('Delete clicked')
			fetch(`http://127.0.0.1:8000/api/task-delete/${item.id}/`, {
				method:'DELETE', 
				headers:{
					'Content-type':'application/json',
					'X-CSRFToken':csrftoken,
				}
			}).then((response) => {
				buildList()
			})
		}

		function strikeUnstrike(item){
			console.log('Strike clicked')

			item.completed = !item.completed
			fetch(`http://127.0.0.1:8000/api/task-update/${item.id}/`, {
				method:'POST', 
				headers:{
					'Content-type':'application/json',
					'X-CSRFToken':csrftoken,
				},
				body:JSON.stringify({'title':item.title, 'completed':item.completed})
			}).then((response) => {
				buildList()
			})
		}
