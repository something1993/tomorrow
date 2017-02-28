/**
 * Created by Administrator on 2016/6/12.
 */

var app = angular.module('myModule', ['ng', 'ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/start', {templateUrl: 'tpl/start.html'})
        .when('/main',
        {templateUrl: 'tpl/main.html', controller: 'mainCtrl'})
        .when('/detail', {templateUrl: 'tpl/detail.html'})
        .when('/detail/:id',
        {templateUrl: 'tpl/detail.html',controller:'detailCtrl'})
        .when('/order', {templateUrl: 'tpl/order.html'})
        .when('/order/:id',
        {templateUrl: 'tpl/order.html',controller:'orderCtrl'})
        .when('/myOrder',
        {templateUrl: 'tpl/myOrder.html',controller:'myOrderCtrl'})
        .otherwise({redirectTo: '/start'})
})

app.controller('parentCtrl', function ($scope, $location) {
    $scope.jump = function (url) {
        $location.path(url);
    }
})

app.controller('mainCtrl', function ($scope, $http) {
    $scope.dishList = [];
    $scope.kw='';
    $scope.hasMore = true;

    $http.get('server/dish_getbypage.php')
        .success(function (data) {
            $scope.dishList = data;
        })
        .error(function (data) {
            console.log('获取主页面列表数据错误' + data);
        })
    //对input的监听
    $scope.$watch('kw', function () {
        console.log('你现在输入的是：' + $scope.kw);
        if($scope.kw != '' && $scope.kw.length > 0)
        {
            $http.get('server/dish_getbykw.php?kw='+$scope.kw)
                .success(function (data) {
                    console.log(data);
                    $scope.dishList = data;
                })
                .error(function (data) {
                    console.log('获取搜索结果错误' + data);
                })
        }



    })
    //加载更多时执行的方法
    $scope.loadMore = function () {
        $http.get('data/dish_getbypage.json')
            .success(function (data) {
                $scope.hasMore = false;
                $scope.dishList = $scope.dishList.concat(data);
            })
            .error(function (data) {
                console.log('获取主页面列表数据错误' + data);
            })
    }
})

app.controller('detailCtrl', function ($scope,$http,$routeParams) {
    $scope.dish = new Object();
    $scope.dishId = $routeParams.id;
    console.log($routeParams.id)
    $http.get('server/dish_getbyid.php?id='+$scope.dishId).success(function (data) {
        console.log(data);
        $scope.dish = data[0];
    })
})

app.controller('orderCtrl', function ($scope,$http,$routeParams) {

    console.log($routeParams.id);
    $scope.user={'did':$routeParams.id};
    
    $scope.submitOrder = function () {
        var str = jQuery.param($scope.user)
        console.log(str);
        
        $http.get('server/order_add.php?'+str).success(function (data) {
            $scope.succMsg = data[0].msg;
            $scope.orderId = data[0].did;
        }).error(function (data) {
            console.log("订单提交失败：错误原因为"+data);
            $scope.errorMsg = data;

        })
    }


    

})

app.controller('myOrderCtrl', function ($scope, $http) {

    $scope.dishList = [];
    $http.get('data/order_getbyphone.json')
        .success(function (data) {
            $scope.dishList = data;
        })
        .error(function (data) {

        })


})








