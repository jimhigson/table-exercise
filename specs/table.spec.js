describe('table', function() {

	var tableFactory,
		data,
		$q,
		$scope,
		$httpBackend,
		tableService;

	beforeEach(module('tableApp'));

	beforeEach(inject(function (_tableService_, _tableFactory_, _$q_, $rootScope, _$httpBackend_) {
		$q = _$q_;
        tableFactory = _tableFactory_;
        tableService = _tableService_;
        $httpBackend = _$httpBackend_;
        $scope = $rootScope.$new();
    }));

    describe('tableService', function(){

		it('Check whether getData() returns the data', function () {
			$httpBackend.expect('GET', 'data.json').respond(200, 'data');

			tableService.getData().then(function (response) {
				result = response;
			});

			$httpBackend.flush();

			expect(result).toEqual('data');
		});

    });

    describe('tableFactory', function(){

		beforeEach(function(){
			spyOn(tableService, 'getData')
				.and.returnValue($q.when(
					{	"data":[
							{
								"name": "Holmes",
								"Occupation": "Detective",
								"Favourite color": "beige"
							}
						]
					}));

			tableFactory.getTableData().then(function (result) {
				data = result;
			});

			$scope.$digest();

		});

		it('creates headings', function(){
			expect(data.headings.length).toEqual(3);
		});

		it('creates content', function(){
			expect(data.content.length).toEqual(1);
		});

		it('formats content to lowercase', function(){
			expect(data.content[0].occupation).toEqual('Detective');
		});

		it('formats heading to lowercase', function(){
			expect(data.headings[1]).toEqual('occupation');
		});

    });





});