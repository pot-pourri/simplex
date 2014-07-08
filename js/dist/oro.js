(function(exports){

	'use strict';


/* /home/genius/dev/oro/js/src/simplex */
/* /home/genius/dev/oro/js/src/simplex/base.js */


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
	var k, i, j, h, g, f, tmp, z, Ai, Aij, Ah, Af, Afj, cj, bh;

	h = 0;
	z = 0;


	for (j = 0; j < m; ++j) {
		for (i = h; i < m; ++i) {

			// cache

			Ai  = A[i];
			Aij = Ai[j];
			Ah  = A[h];

			if (Aij !== 0) {

				// swap line i with line of index h for [A]

				for (g = 0; g < n; ++g) {
					tmp   = Ai[g];
					Ai[g] = Ah[g];
					Ah[g] = tmp / Aij;
				}

				// swap line i with line of index h for [b]

				tmp  = b[i];
				b[i] = b[h];
				b[h] = tmp / Aij;

				// cache

				bh = b[h];
				cj = c[j];

				// remove base var from [c] by updating all variables

				for (g = 0; g < j; ++g) c[g] -= cj * Ah[g];
				for (  ++g; g < n; ++g) c[g] -= cj * Ah[g];

				z   += cj * bh;
				c[j] = 0;

				// remove base var from lines < h

				for (f = 0; f < h; ++f) {

					Af  = A[f];
					Afj = Af[j];

					for (g = 0; g < j; ++g) Af[g] -= Afj * Ah[g];
					for (  ++g; g < n; ++g) Af[g] -= Afj * Ah[g];

					b[f] -= Afj * bh; // update [b]
					Af[j] = 0;

				}


				++h; // skip and increment h

				// remove base var from lines > h

				for (f = h; f < m; ++f) {

					Af  = A[f];
					Afj = Af[j];

					for (g = 0; g < j; ++g) Af[g] -= Afj * Ah[g];
					for (  ++g; g < n; ++g) Af[g] -= Afj * Ah[g];

					b[f] -= Afj * bh; // update [b]
					Af[j] = 0;

				}


				break;
			}

		}
	}

	return z;

};

// var test = function(){
// 	var m = 2, n = 4;
// 	var c = [5, 3, -2, 19], _c = c.slice();
// 	var A = [[1, 2, 3, 4], [9, 10, -1, 3]];
// 	var b = [1, 2];
// 	var z = base(c, A, b, m, n);

// 	console.log('c', c);
// 	console.log('A', A);
// 	console.log('b', b);
// 	console.log('m', m);
// 	console.log('n', n);
// 	console.log('z', z);

// 	var w = 0;

// 	for (var i = 0; i < m; ++i) {
// 		w += b[i] * _c[i];
// 	}

// 	console.log('w', w);

// };

/* /home/genius/dev/oro/js/src/simplex/gap.js */

/* /home/genius/dev/oro/js/src/simplex/normalize.js */

/* /home/genius/dev/oro/js/src/simplex/simplex.js */


/**
 * m <= n
 */

var simplex = function(c, x, A, b, m, n) {
	var k = n - m, i, j;

	// ...
};
})(typeof exports === 'undefined' ? this['oro'] = {} : exports);
