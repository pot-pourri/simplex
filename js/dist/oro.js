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
	var i, j, g, f, swap, Ai, Aij, Ah, Af, Afj;


	l : for (j = 0; j < m; ++j) {
		for (i = j; i < m; ++i) {

			// cache

			Ai  = A[i];
			Aij = Ai[j];
			Ah  = A[j];

			if (Aij !== 0) {

				// swap line _i_ with line _h_

				for (g = 0; g <= n; ++g) {
					swap  = Ai[g];
					Ai[g] = Ah[g];
					Ah[g] = swap / Aij;
				}

				// remove base var from lines < _j_

				for (f = 0; f < j; ++f) {

					Af  = A[f];
					Afj = Af[j];

					for (g = 0; g  < j; ++g) Af[g] -= Afj * Ah[g];
					for (  ++g; g <= n; ++g) Af[g] -= Afj * Ah[g];

					Af[j] = 0;

				}

				// remove base var from lines > _j_

				for (++f; f <= m; ++f) {

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

var normalize = function(c, A, m, n) {
	var swap, i, j, Ai, Ak, k = n - 1;

	v : for (i = 0; i <= k; ++i) {

		Ai = A[i];

		for (j = 0; j <= m; ++j) if (Ai[j] !== 0) continue v;

		Ak = A[k];

		for (j = 0; j <= m; ++j) {
			swap  = Ai[j];
			Ai[j] = Ak[j];
			Ak[j] = swap;
		}

		--i;
		--k;
	}

	return k + 1;

};

exports.normalize = normalize;
/* /home/genius/dev/oro/js/src/simplex/simplex.js */


/**
 * m <= n
 */

var simplex = function(A, m, n) {
	var i, j, Am, Ah, Ahbo, Af, Afj, no, na, bo, ba, Ambo, k;

	Am = A[m];


	while (true) {

		ba = Am[0];
		bo = 0;

		for (j = 1; j < n; ++j) {
			if (Am[j] > a) {
				ba = Am[j];
				bo = j;
			}
		}

		na = Am[n] / A[0][bo];
		no = 0;

		for (i = 1; i < m; ++i) {
			k = A[i][n] / A[i][bo];

			if (k > 0 && k < na) {
				na = k;
				no = i;
			}
		}

		if (na <= 0) return;

		Ah  = A[no];
		Ahbo = Ah[bo];

		for (j = 0; j <= n; ++j) Ah[j] /= Ahbo;


		for (_i = 0; _i < no; ++_i) {

			Af  = A[_i];
			Afj = Af[bo];

			for (_j = 0; _j  < j; ++_j) Af[_j] -= Afj * Ah[_j];
			for (  ++_j; _j <= n; ++_j) Af[_j] -= Afj * Ah[_j];

			Af[bo] = 0;

		}

		for (++_i; _i <= m; ++_i) {

			Af  = A[_i];
			Afj = Af[bo];

			for (_j = 0; _j  < j; ++_j) Af[_j] -= Afj * Ah[_j];
			for (  ++_j; _j <= n; ++_j) Af[_j] -= Afj * Ah[_j];

			Af[bo] = 0;

		}

	}

};
})(typeof exports === 'undefined' ? this['oro'] = {} : exports);
