var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
	title: String,
	upvotes: {type: Number, default: 0},
});

CommentSchema.methods.upvote = function(cb) {
	this.upvotes += 1;
	this.save(cb);
};

CommentSchema.methods.downvote = function(cb) {
	if (this.upvotes > 0) {
		this.upvotes -= 1;
		this.save(cb);
	}
};

CommentSchema.methods.delete = function(cb) {
	this.remove(cb);
};

mongoose.model('Comment', CommentSchema);