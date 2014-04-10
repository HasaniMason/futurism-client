angular.module('futurism')
	.controller('LoadupFuturesCtrl', function($scope, $location, $routeParams, DeckResource, socket, errorHandler, shared) {
		'use strict';

		socket.connect($routeParams.serverId);
		$scope.decks = DeckResource.query(function(){});
		$scope.maxDeckSize = $routeParams.deckSize;
		$scope.futureCount = Number($routeParams.futures);
		$scope.state = 'selectingDeck';
		$scope.futures = shared.futures;


		$scope.select = function(deck) {

		};

		$scope.isAvailable = function(deck) {
			if(deck.cards.length <= $scope.maxDeckSize) {
				return 'active';
			}
			else {
				return 'inactive';
			}
		};

		$scope.selectFuture = function(futureId) {
			console.log('select future', futureId);
		};

		socket.$on('selectDeckResult', function(data) {
			if(data.result === 'success') {
				if($scope.futureCount === 0) {
					$location.url('/game/' + $routeParams.serverId + '/' + $routeParams.gameId);
				}
				else {
					$scope.state = 'selectingFutures';
				}
			}
			else {
				errorHandler.handle(data.error);
			}
		});

		$scope.$on('$destroy', function() {
			socket.removeAllListeners('selectDeckStatus');
		});

	});