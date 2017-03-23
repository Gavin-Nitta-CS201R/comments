angular.module('comment', [])
.controller('MainCtrl', [
  '$scope', '$http',
  function($scope, $http) {

	$scope.comments = [];

	$scope.getAll = function() {
		return $http.get('/comments').success(function(data){
			angular.copy(data, $scope.comments);
		});
	};

	$scope.create = function(comment) {
		return $http.post('/comments', comment).success(function(data){
			$scope.comments.push(data);
		});
	};

	$scope.addComment = function() {
		if($scope.formContent === '') { return; }
		$scope.create({
			title: $scope.formContent,
			upvotes: 0,
		});
		$scope.formContent='';
	};
	
	$scope.upvote = function(comment) {
		return $http.put('/comments/' + comment._id + '/upvote')
			.success(function(data){
			comment.upvotes += 1;
		});
	};
	
	$scope.downvote = function(comment) {
		return $http.put('/comments/' + comment._id + '/downvote')
			.success(function(data){
			comment.upvotes -= 1;
		});
	};
	
	$scope.delete = function(comment) {
		return $http.delete('/comments/' + comment._id + '/delete')
			.success(function(data){
				$scope.comments.splice($scope.comments.indexOf(comment), 1);
			});
	};
	
	$scope.getAll();
  }
]);
