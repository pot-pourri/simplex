
var util = require('util');
var fmt  = util.format;

test('base', function(){

	var e = 1e-10;
	var eq = function(a, b, e) { return a >= b - e && a <= b + e; };

	var random = function(n) { return (Math.random() - .5) * n; };

	var randomCheck = function(m, n, range){
		var j, i, Ai, z, w, b, c, A;

		A = [];
		for (i = 0; i <= m; ++i) {
			Ai = [];
			for (j = 0; j <= n; ++j) Ai.push(random(range));
			A.push(Ai);
		}

		A[m][n] = 0;

		c = A[m].slice();

		oro.base(A, m, n);

		b = [];
		for (i = 0; i < m; ++i) b.push(A[i][n]);

		z = -A[m][n];

		w = 0;

		for (var i = 0; i < m; ++i) w += b[i] * c[i];

		ok(eq(z, w, e), fmt("check soundness (%d, %d)", z, w));
	};



	var TEST = [
		[0, 0, 1211],
		[0, 1, 12332],
		[0, 10, 1223],
		[1, 1, 122300],
		[1, 2, 12],
		[1, 10, 12],
		[10, 10, 12389],
		[10, 11, 1230],
		[10, 20, 1230],
	];

	var n = TEST.length;

	while (n--) randomCheck.apply(null, TEST[n]);



});