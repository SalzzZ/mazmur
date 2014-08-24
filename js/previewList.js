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
			'dblclick a.lirik-preview': 'lirikSelect',
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
	  'change #uploadBg0': 'dropRear',
	  'change #uploadBg1': 'dropFront',
	  },
		dropRear: function(e) {
			if (e.currentTarget.files.length) {
				e.preventDefault();
				e.stopPropagation();
				var file = e.currentTarget.files[0];
				var type = file.type;
				currentBg = file;
				$('#bgNameBot > span').html(file.name);
				windowPreview.changeBg(file,2);
			}
		},
		dropFront: function(e) {
			if (e.currentTarget.files.length) {
				e.preventDefault();
				e.stopPropagation();
				var file = e.currentTarget.files[0];
				var type = file.type;
				currentBg = file;
				$('#bgNameTop > span').html(file.name);
				windowPreview.changeBg(file,1);
			}
		}

	});
	
})(MazmurApp);
