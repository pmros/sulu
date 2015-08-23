var GUI = function(app) {
	this.app = app;
	this.app.registerHotKey("tab", this.toggleActiveView);
	this.app.registerHotKey("down", this.setNextActiveRow);
	this.app.registerHotKey("up", this.setPreviousActiveRow);
	return this;
};

GUI.prototype.setNextActiveRow = function setNextActiveRow() {
	var nextRow = this.GUI.source.model.nextRow();

	if (this.GUI.source.model.isInView(nextRow)){
		return false;
	}
};

GUI.prototype.setPreviousActiveRow = function setPreviousActiveRow() {
	var nextRow = this.GUI.source.model.previousRow();

	if (this.GUI.source.model.isInView(nextRow)){
		return false;
	}
};

GUI.prototype.toggleActiveView = function GUI_toggleActiveView() {
	if (!this.GUI.source){
		this.GUI.activeView({id:"1"});
	} else {
		this.GUI.activeView(this.GUI.target.model);
	}
	return false;
};

GUI.prototype.activeView = function(view) {
	var self = this;
	if (view){
		$("element-core-data-view").each(function(/*i,n*/) {
			var model = $(this).data("controller");
			var currentView = {
				el   	: $(this),
				model 	: model
			};

			if (view.id === model.id){
				self.source = currentView;
				currentView.el.parent().addClass("active-filesystem-view");
			} else {
				self.target = currentView;
				currentView.el.parent().removeClass("active-filesystem-view");
			}
		});
	} else {
		return self.source;
	}
};

GUI.prototype.fileSystemViews = function() {
	var result = [];
	$("element-core-data-view").each(function(/*i,n*/) {
		result.push({
			el   	: $(this),
			model 	: $(this).data("controller")
		});
	});
	return result;
};

module.exports = GUI;