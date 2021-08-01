		var activeItem = null
		var weNeed_list_snapshot=[]
		var MYLIBRARY2 = MYLIBRARY2 || (function(){
			var _args = {}; // private
		
			return {
				init : function(Args) {
					_args = Args;
					// some other initialising
				},
				buildWeNeedList : function(){

					var weNeed_wrapper = document.getElementById('weNeed-wrapper')
					var url = 'http://127.0.0.1:8000/api/weNeed-list/'

					fetch(url)
					.then((resp) => resp.json())
					.then(function(weNeed_data){
						console.log('WeNeedData:', weNeed_data)
		
						var weNeed_list = weNeed_data
						for (var i in weNeed_list){
		
		
							try{
								document.getElementById(`weNeed_data-row-${i}`).remove()
							}catch(err){
		
							}
					
		
		
							var title = `<span class="title">${weNeed_list[i].title}</span>`
							var user_who_weNeed = `<span class="title">${weNeed_list[i].user} </span>`
							if (weNeed_list[i].completed == true){
								title = `<strike class="title">${weNeed_list[i].title}</strike>`
							}
		
							var item = `
								<div id="weNeed_data-row-${i}" class="weNeed-wrapper flex-wrapper">
									<div style="flex:7">
										${title}
									</div>
									<div style="flex:1">
										${user_who_weNeed}
									</div>
									<div style="flex:1">
										<button type="button"  class="btn btn-success IBoughtButton2">I bought</button>
									</div>

								</div>
		
							`
							weNeed_wrapper.innerHTML += item
			
						}
		
						if (weNeed_list_snapshot.length > weNeed_list.length){
							for (var i = weNeed_list.length; i < weNeed_list_snapshot.length; i++){
								document.getElementById(`weNeed_data-row-${i}`).remove()
							}
						}
		
						weNeed_list_snapshot = weNeed_list
		
						for (var i in weNeed_list){
							
							var IBoughtButton = document.getElementsByClassName('IBoughtButton2')[i]
							
		console.log('+++++++',IBoughtButton)

							IBoughtButton.addEventListener('click', (function(item){
								return function(){
									createIBought(item)
								}
							})(weNeed_list[i]))
		
		
	
		
		
						}

						function deleteNeed(item){
							console.log('Delete clicked')
							fetch(`http://127.0.0.1:8000/api/delete-Need/${item.id}/`, {
								method:'DELETE', 
								headers:{
									'Content-type':'application/json',
									'X-CSRFToken':csrftoken,
								}
							})
							.then((response) => {
								MYLIBRARY2.buildWeNeedList()
							})
						}
						function createIBought(item){
							console.log(item)
							console.log(item.id)
							console.log(item.task)
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
									'task':item.task,
									'user': user
								
								})
							}
							).then(function(response){
								console.log('Ibought', JSON.stringify(response))
								MYLIBRARY.buildBoughtList()
							})
							.then(deleteNeed(item))
						}
		
		
					})
				}

			};
		}());

		MYLIBRARY2.buildWeNeedList()