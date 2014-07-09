(function(exports){

	'use strict';


/* /home/genius/dev/oro/js/src/simplex */
/* /home/genius/dev/oro/js/src/simplex/base.js */


/**
 *
 * /!\ THIS WORK IS NOT DONE
 *
 * must investigate the case where x >= 0
 *
 * still have to decide what to do when rank of the matrix is not n
 *
 */



/**
 * hyp:
 *   - m <= n
 *   - assumes matrix is of rank m
 *   - all constraints are equalities
 *
 *
 * It might not be obvious at first sight but c, b and -z are encoded in A.
 * A is in fact a (m+1) * (n+1) 2d matrix where
 * b is the last column, c the last row, and the value -z is be
 * the last cell of the matrix A[m][n].
 * 
 * A way of describing this algorithm would be to say that it is
 * a line-wise version of the Gauss-Jordan algorithm where the
 * last line and the last column are not considered as
 * candidates for normalization.
 *
 */

var base = function(A, m, n) {
	var i, j, h, g, f, swap, Ai, Aij, Ah, Af, Afj;

	h = 0;


	l : for (j = 0; j < m; ++j) {
		for (i = h; i < m; ++i) {

			// cache

			Ai  = A[i];
			Aij = Ai[j];
			Ah  = A[h];

			if (Aij !== 0) {

				// swap line _i_ with line _h_

				for (g = 0; g <= n; ++g) {
					swap  = Ai[g];
					Ai[g] = Ah[g];
					Ah[g] = swap / Aij;
				}

				// remove base var from lines < h

				for (f = 0; f < h; ++f) {

					Af  = A[f];
					Afj = Af[j];

					for (g = 0; g  < j; ++g) Af[g] -= Afj * Ah[g];
					for (  ++g; g <= n; ++g) Af[g] -= Afj * Ah[g];

					Af[j] = 0;

				}


				++h; // skip and increment h

				// remove base var from lines > h

				for (f = h; f <= m; ++f) {

					Af  = A[f];
					Afj = Af[j];

					for (g = 0; g  < j; ++g) Af[g] -= Afj * Ah[g];
					for (  ++g; g <= n; ++g) Af[g] -= Afj * Ah[g];

					Af[j] = 0;

				}


				continue l;
			}

		}

		// MUST CHECK c[j] === 0

		return false;
		
	}

	return true;

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
