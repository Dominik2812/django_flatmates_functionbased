


		var activeItem = null
		var task_list_snapshot = []
		var history_list_snapshot=[]

		var MYLIBRARY3 = MYLIBRARY3 || (function(){
			var _args = {}; // private
		
			return {
				init : function(Args) {
					_args = Args;
					// some other initialising
				},
				buildHistoryList : function(){
					console.log('dsfdsafdsfsdfsdfsdfds')
					var history_wrapper = document.getElementById('history-wrapper')

					var url = 'http://127.0.0.1:8000/api/history-list/'
	
					fetch(url)
					.then((resp) => resp.json())
					.then(function(history_data){
						console.log('historyData:')
		
						var history_list = history_data
						for (var i in history_list){
		
		
							try{
								document.getElementById(`history_data-row-${i}`).remove()
							}catch(err){
		
							}
					
		
		
							var title = `<span class="title">${history_list[i].title}</span>`
							var user_who_History = `<span class="title">${history_list[i].user} </span>`
							var date = `<span class="title">${history_list[i].dates}</span>`
							if (history_list[i].completed == true){
								title = `<strike class="title">${history_list[i].title}</strike>`
							}
		
							var item = `
								<div id="history_data-row-${i}" class="history-wrapper flex-wrapper">
									<div style="flex:7">
										${title}
									</div>
									<div style="flex:1">
										${user_who_History}
									</div>
									<div style="flex:1">
										${date}
									</div>
								</div>`
	
							
							history_wrapper.innerHTML += item
						
			
						}
		
						if (history_list_snapshot.length > history_list.length){
							for (var i = history_list.length; i < history_list_snapshot.length; i++){
								document.getElementById(`history_data-row-${i}`).remove()
							}
						}
		
						history_list_snapshot = history_list
		
		
		
		
		
					})
				}
			};
		}());

		MYLIBRARY3.buildHistoryList()
		











