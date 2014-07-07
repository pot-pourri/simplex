

/**
 * hyp:
 *   - m <= n
 *   - no all 0's columns (all 0's columns leads to either min -> useless variable; or max -> unbounded)
 *   - all constraints are equalities
 *
 *
 *
 * /!\ not finished, must investigate the case where x >= 0
 */

var base = function(c, A, b, m, n) {
	var k, i, j, h, g, f, tmp, z;

	h = 0;
	z = 0;


	for (j = 0; j < n && h < m; ++j) {
		for (i = h; i < m; ++i) {

			if (A[i][j] !== 0) {

				// swap line i with line of index h for [A]

				for (g = 0; g < n; ++g) {
					tmp  = A[i][g];
					A[i][g] = A[h][g];
					A[h][g] = tmp / A[i][j];
				}

				// swap line i with line of index h for [b]

				tmp  = b[i];
				b[i] = b[h];
				b[h] = tmp / A[i][j];

				// remove base var from [c]

				for (g = 0; g < j; ++g) c[g] -= c[j] * A[h][g];
				for (  ++g; g < n; ++g) c[g] -= c[j] * A[h][g];

				z    += c[j] * b[h];
				c[j] = 0;

				// remove base var from lines < h

				for (f = 0; f < h; ++f) {

					for (g = 0; g < j; ++g) A[f][g] -= A[f][j] * A[h][g];
					for (  ++g; g < n; ++g) A[f][g] -= A[f][j] * A[h][g];

					b[f] += A[f][j] * b[h]; // update [b]
					A[f][j] = 0;

				}


				++h; // skip and increment h

				// remove base var from lines > h

				for (f = h; f < m; ++f) {

					for (g = 0; g < j; ++g) A[f][g] -= A[f][j] * A[h][g];
					for (  ++g; g < n; ++g) A[f][g] -= A[f][j] * A[h][g];

					b[f] += A[f][j] * b[h]; // update [b]
					A[f][j] = 0;

				}


				break;
			}

		}
	}

	return z;

};

// var test = function(){
// 	var m = 2, n = 4;
// 	var c = [5, 3, -2, 19];
// 	var A = [[1, 2, 3, 4], [9, 10, -1, 3]];
// 	var b = [1, 2];
// 	var z = base(c, A, b, m, n);

// 	console.log('c', c);
// 	console.log('A', A);
// 	console.log('b', b);
// 	console.log('m', m);
// 	console.log('n', n);
// 	console.log('z', z);
// };
