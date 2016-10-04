angular
	.module('tableApp', [])
	.filter('tableHeadingFilter', tableHeadingFilter)
	.controller('tableController', tableController)
	.factory('tableFactory', tableFactory)
	.service('tableService', tableService);

function tableHeadingFilter() {
    var filter = function (label) {
        return label.charAt(0).toUpperCase() + label.slice(1);
    };

    return filter;
}

tableController.$inject = ['tableFactory'];
function tableController (tableFactory) {
	var vm = this;

	function getTableData () {
		var table = tableFactory.getTableData().then(showTable);
	}

	function showTable (tableData) {
		vm.headings = tableData.headings;
		vm.content = tableData.content;
	}

	this.getField = function (item, heading) {
		return item[heading];
	};

	getTableData();

}


tableFactory.$inject = ['tableService'];
function tableFactory (tableService) {

	function getTableData() {
		return tableService.getData().then(dataReceived);
	}

	function dataReceived(result) {

		var content = [];
		angular.forEach(result.data, function (value, key) {
			content.push(formatKeys(value));
		});

		var headings = createHeadings(content[0]);

		return {
			headings: headings,
			content: content
		};
	}

	function createHeadings(data) {
		var headings = [];

		angular.forEach(data, function (value, key) {
			headings.push(key);
		});

		return headings;

	}

	function formatKeys(content) {
		var formatObj = {};

		angular.forEach(content, function (value, key) {
			formatObj[key.toLowerCase()] = value;
		});

		return formatObj;
	}

	return {
		getTableData: getTableData
	};
}


tableService.$inject = ['$http'];
function tableService (http) {

	function getData() {
		return http({
			method: 'GET',
			url: 'data.json'
		}).then(function(res) {
			return res.data;
		});
	}

	return {
		getData : getData
	};

}
