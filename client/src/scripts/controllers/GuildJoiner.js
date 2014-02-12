angular.module('futurism')
	.controller('GuildJoinerCtrl', function($scope, GuildResource, MemberResource, dataUrlToBlob, staticContentUrl, me) {
		'use strict';

		$scope.static = staticContentUrl;
		$scope.joinOptions = ['invite', 'ask', 'open'];

		$scope.newGuild = {
			_id: '',
			desc: '',
			join: 'open',
			banner: null
		};

		$scope.page = 0;
		$scope.guilds = GuildResource.query({join: 'open', sort: 'gpToday', page: $scope.page});


		$scope.createGuild = function(guildData) {
			if($scope.uppedBanner) {
				guildData.bannerImg = dataUrlToBlob($scope.uppedBanner.resized.dataURL);
			}

			var guild = GuildResource.put(guildData);

			return guild.$promise;
		};


		$scope.joinGuild = function(guild) {
			var data = {guildId: guild._id, userId: me.user._id};
			var member = MemberResource.put(data, function(result) {
				console.log('join result', result);
			});

			return member.$promise;
		}
	});