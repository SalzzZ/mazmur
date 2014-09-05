(function(MazmurApp) {
	MazmurApp.addInitializer(function(){
	MazmurApp.PreviewList.init();
  });

  MazmurApp.PreviewList = {
		init: function() {
			this.laguList = MazmurApp.laguList;
			MazmurApp.previewList.show(new MazmurApp.PreviewListView());
		},
		show: function(lagu) {
			var previewText = lagu.get('lirik');
			this.previewTemp = new MazmurApp.LirikCollection(true);
			MazmurApp.LirikViewer.parse(previewText, this.previewTemp);
			var previewList = new MazmurApp.PreviewListView({
				collection: this.previewTemp
			});
			MazmurApp.previewList.show(previewList);
		}
	};

	MazmurApp.PreviewView = Marionette.ItemView.extend({
		tagName: 'li',
		template: '#lirik-view-template',
		events: {
			'click a.lirik-preview': 'lirikClicked',
			'dblclick a.lirik-preview': 'lirikSelect'
		},
		initialize: function () {
			this.model.bind('selected', this.lirikSelected, this);
			this.model.bind('deselected', this.lirikDeselected, this);
			this.model.bind('dblclicked', this.lirikSelect, this);
		},
		lirikClicked: function(e) {
			e.preventDefault();
			this.model.select();
		},
		lirikSelect: function() {
			MazmurApp.LirikViewer.show(MazmurApp.lagus.selected);
			lirikData.findWhere({ctr: this.model.get('ctr')}).select();
		},
		lirikSelected: function() {
			this.$el.addClass('active');
		},
		lirikDeselected: function() {
			this.$el.removeClass('active');
		}
	});
	
	MazmurApp.PreviewListView = Marionette.CompositeView.extend({
	  itemView: MazmurApp.PreviewView,
	  itemViewContainer: "#preview-items",
	  template: "#preview-template",
	  events: {
		'change #uploadBgRear': 'dropVid',
		'change #uploadBgFront': 'dropVid',
		'click #clearFront'    : 'clearVid',
		'submit #Overlay'   	 : 'changeCO'
	  },
	  	changeCO:function(e){
	  		e.preventDefault();
	  		var values = {};
			$.each($(e.currentTarget).serializeArray(), function(i, field) {
    			values[field.name] = field.value;
			});
			var color = values['color'];
			var rgbaCol = 'rgba(' + parseInt(color.slice(-6,-4),16)
    		+ ',' + parseInt(color.slice(-4,-2),16)
    		+ ',' + parseInt(color.slice(-2),16)
    		+','+values['opacity']+')';
			windowPreview.changeOverlay(rgbaCol);
	  	},
		dropVid: function(e) {
			if (e.currentTarget.files.length) {
				e.preventDefault();
				e.stopPropagation();
				var file = e.currentTarget.files[0];
				var type = file.type;
				// currentBg = file;
				if ($(e.currentTarget).data('layer')==="rear"){
					$('#bgNameRear > span').html(file.name);
					//console.log("Rear");
					windowPreview.changeBg(file,2);
				}
				else{
					$('#bgNameFront > span').html(file.name);
					//console.log("Front");
					windowPreview.changeBg(file,1);
				}
			}
		},
	    clearFront: function(e) {
	      e.preventDefault();
	      if (typeof(windowPreview)!='undefined' && !windowPreview.closed) {
	        if ($(e.currentTarget).hasClass('active')) {
	          windowPreview.showVideo('#videoFrontWrap',true);
	          $(e.currentTarget).removeClass('active');
	        } else {
	          windowPreview.showVideo('#videoFrontWrap',false);
	          $(e.currentTarget).addClass('active');
	        }
	      }
	    }

	});
	
})(MazmurApp);
