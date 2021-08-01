

var user = document.getElementById('userId').name;
		var activeItem = null
		var task_list_snapshot = []
		var iBought_list_snapshot=[]
		var history_list_snapshot=[]
		var MYLIBRARY = MYLIBRARY || (function(){
			var _args = {}; // private
		
			return {
				init : function(Args) {
					_args = Args;
					// some other initialising
				},
				buildBoughtList : function(){

					var bought_wrapper = document.getElementById('bought-wrapper')
					var url = 'http://127.0.0.1:8000/api/I-bought-list/'
					console.log('MYLIBRARY.buildBoughtList()')
					fetch(url)
					.then((resp) => resp.json())
					.then(function(iBought_data){
						console.log('iBoughtData:', iBought_data)
		
						var iBought_list = iBought_data
						for (var i in iBought_list){

		
		
							try{
								document.getElementById(`iBought_data-row-${i}`).remove()
							}catch(err){
		
							}
					
		
							
							var title = `<span class="title">${iBought_list[i].title}</span>`
							var user_who_bought = `<span class="title">${iBought_list[i].user} </span>`
							var date = `<span class="title">${iBought_list[i].dates}</span>`
							if (iBought_list[i].completed == true){
								title = `<strike class="title">${iBought_list[i].title}</strike>`
							}
							console.log('userComparison -----------',user==iBought_list[i].user)
							
							var item = `
								<div id="iBought_data-row-${i}" class="iBought-wrapper flex-wrapper">
									<div style="flex:7">
										${title}
									</div>
									<div style="flex:1">
										${user_who_bought}
									</div>
									<div style="flex:1">
										${date}
									</div>
								</div>`
	
								if(user==iBought_list[i].user){
									bought_wrapper.innerHTML += item
								}
						
			
						}
		
						if (iBought_list_snapshot.length > iBought_list.length){
							for (var i = iBought_list.length; i < iBought_list_snapshot.length; i++){
								document.getElementById(`iBought_data-row-${i}`).remove()
							}
						}
		
						iBought_list_snapshot = iBought_list
		
		
		
		
		
					})
				}
			};
		}());

		MYLIBRARY.buildBoughtList()
		











