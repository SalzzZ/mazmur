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
		'change #uploadBgRear'	: 'dropVid',
		'change #uploadBgFront'	: 'dropVid',
		/*'click #clearFront'		: 'clearVid',*/
		'change .Overlay'		: 'changeCO',
		'click #playPauseRear'	: 'playPauseVid',
		'click #playPauseFront'	: 'playPauseVid',
		'click #stopFront'		: 'stopVid',
		'click #stopRear'		: 'stopVid'
	  },
		stopVid:function (e){
			if (typeof(windowPreview)!='undefined' && !windowPreview.closed)
				$("#playPause"+$(e.currentTarget).data('layer')).find('i').attr('class', 'fui-play');
				windowPreview.stopVid($(e.currentTarget).data('layer'));
		},
		playPauseVid:function(e){
			if (typeof(windowPreview)!='undefined' && !windowPreview.closed) {
				if ($(e.currentTarget).find('i').hasClass('fui-play'))
					$(e.currentTarget).find('i').attr('class', 'fui-pause');
				else
					$(e.currentTarget).find('i').attr('class', 'fui-play');
				windowPreview.playPauseVid($(e.currentTarget).data('layer'));
			}
		},
		changeCO:function(e){
			e.preventDefault();
			if (typeof(windowPreview)!='undefined' && !windowPreview.closed) {
				var values = {};
				$.each($('#OverlayForm').serializeArray(), function(i, field) {
					values[field.name] = field.value;
				});
				var color = values['color'];
				var rgbaCol = 'rgba(' + parseInt(color.slice(-6,-4),16)
				+ ',' + parseInt(color.slice(-4,-2),16)
				+ ',' + parseInt(color.slice(-2),16)
				+','+values['opacity']+')';
				windowPreview.changeOverlay(rgbaCol);
			}
		},
		dropVid: function(e) {
			e.preventDefault();
			e.stopPropagation();
			if (typeof(windowPreview)!='undefined' && !windowPreview.closed) {
				var file;
				var layer=$(e.currentTarget).data('layer');
				if (e.currentTarget.files.length) {
					file = e.currentTarget.files[0];
					$('#bgName'+layer+' > span').html(file.name);
				}else{
					file=undefined;
					$('#bgName'+layer+' > span').html('Change '+layer+' Video');
				}
				windowPreview.setVideoFile(layer,file);
			}
		}/*,
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
		}*/

	});
	
})(MazmurApp);
