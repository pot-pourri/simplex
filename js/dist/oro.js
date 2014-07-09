(function(exports){

	'use strict';


/* /home/genius/dev/oro/js/src/simplex */
/* /home/genius/dev/oro/js/src/simplex/base.js */


/**
 *
 * /!\ not finished
 *
 * must investigate the case where x >= 0
 *
 * (could simplify code by considering a m+1 * n+1 matrix where
 * b would be the last column, c the last row, and the value -z would be
 * the last cell of the matrix A[m][n], the code could then be used
 * to solve any m hyperplane system in R^{m})
 * 
 * still have to decide what to do when matrix is not invertible (preprocess maybe)
 *
 * 
 */



/**
 * hyp:
 *   - m <= n
 *   - assumes matrix is invertible
 *   - all constraints are equalities
 *
 */

var base = function(c, A, b, m, n) {
	var k, i, j, h, g, f, tmp, z, Ai, Aij, Ah, Af, Afj, cj, bh;

	h = 0;
	z = 0;


	l : for (j = 0; j < m; ++j) {
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


				continue l;
			}

		}

		
	}

	return z;

};


exports.base = base;
/* /home/genius/dev/oro/js/src/simplex/gap.js */

/* /home/genius/dev/oro/js/src/simplex/normalize.js */

/**
 * hyp:
 *   - m <= n
 *   - all constraints are equalities
 *
 *
 *
 * /!\ not finished, must investigate the case where x >= 0
 */

var normalize = function(c, A, b, m, n) {
	var tmp, i, j, Ai, Ak, k = n - 1;

	v : for (i = 0; i <= k; ++i) {

		Ai = A[i];

		for (j = 0; j < m; ++j) if (Ai[j] !== 0) continue v;

		if (c[i] === 0) {
			tmp  = c[i];
			c[i] = c[k];
			c[k] = tmp;

			Ak = A[k];

			for (j = 0; j < m; ++j) {
				tmp   = Ai[j];
				Ai[j] = Ak[j];
				Ak[j] = tmp;
			}

			--i;
			--k;
		}
	}

	return k + 1;

};

exports.normalize = normalize;
/* /home/genius/dev/oro/js/src/simplex/simplex.js */


/**
 * m <= n
 */

var simplex = function(c, x, A, b, m, n) {
	var k = n - m, i, j;

	// ...
};
})(typeof exports === 'undefined' ? this['oro'] = {} : exports);
