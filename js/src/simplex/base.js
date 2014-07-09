

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