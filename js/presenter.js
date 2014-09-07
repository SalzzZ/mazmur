var windowPreview;

(function(MazmurApp) {

	MazmurApp.addInitializer(function(){
		MazmurApp.Presenter.init();
	});

	MazmurApp.LirikViewList = Marionette.CompositeView.extend({
		itemView: MazmurApp.LirikView,
		itemViewContainer: "#live-items",
		template: "#live-template",
		events: {
			'click a#livePreview' : 'livePreview',
			'click a#clearPreview': 'clearPreview',
			'click a#blackPreview': 'blackPreview',
			'click a#dateTimePreview'    : 'dateTimePreview'
		},
		livePreview: function(e) {
			e.preventDefault();
			if (typeof(windowPreview)!='undefined' && !windowPreview.closed) {
				windowPreview.close();
				$(e.currentTarget).find('span').attr('class', 'fui-play');
			} else {
				windowPreview = window.open("show.html", "_blank", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,channelmode=yes, fullscreen=yes");  
				$(e.currentTarget).find('span').attr('class', 'fui-checkbox-unchecked');
			}
		},
		clearPreview: function(e) {
			e.preventDefault();
			if (typeof(windowPreview)!='undefined' && !windowPreview.closed) {
				if ($(e.currentTarget).hasClass('active')) {
					windowPreview.clearSlide(false);
					$(e.currentTarget).removeClass('active');
				} else {
					windowPreview.clearSlide(true);
					$(e.currentTarget).addClass('active');
				}
			}
			else
				for(i=0;i<4;i++)
					$('#livePreview').toggleClass('flash');
		},
		blackPreview: function(e) {
			e.preventDefault();
			if (typeof(windowPreview)!='undefined' && !windowPreview.closed) {
				if ($(e.currentTarget).hasClass('active')) {
					windowPreview.blankSlide(false);
					$(e.currentTarget).removeClass('active');
				} else {
					windowPreview.blankSlide(true);
					$(e.currentTarget).addClass('active');
				}
			}
			else
				for(i=0;i<4;i++)
					$('#livePreview').toggleClass('flash');
		},
		dateTimePreview: function(e) {
			e.preventDefault();
			if (typeof(windowPreview)!='undefined' && !windowPreview.closed) {
				if ($(e.currentTarget).hasClass('active')) {
					windowPreview.showDateTime(false);
					$(e.currentTarget).removeClass('active');
				} else {
					windowPreview.showDateTime(true);
					$(e.currentTarget).addClass('active');
				}
			}
			else
				for(i=0;i<4;i++)
					$('#livePreview').toggleClass('flash');
		}
	});

	MazmurApp.Presenter = {
		init: function() {
			_.bindAll(this, 'keyDown');      
			$(document).on('keydown', this.keyDown);
		},
		keyDown: function(e) {
			// console.log(e.keyCode);
			// if (e.target.tagName.toLowerCase() !== 'input' &&
			//   e.target.tagName.toLowerCase() !== 'textarea' && e.which == 46) {
			if (e.target.tagName.toLowerCase() != 'input' && e.target.tagName.toLowerCase() != 'textarea') {
				if (e.keyCode == 38) {
					//prev
					MazmurApp.vent.trigger('prevSlide');
				} else if (e.keyCode == 40) {
					//next
					MazmurApp.vent.trigger('nextSlide');
				} else if (e.keyCode == 37) {
					//prevLagu
					// MazmurApp.vent.trigger('prevLagu');
				} else if (e.keyCode == 39) {
					//nextLagu
					// MazmurApp.vent.trigger('nextLagu');
				}
			}
			// }
		}
	};

})(MazmurApp);
