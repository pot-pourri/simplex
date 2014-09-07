
/**
 * hyp:
 *   - m <= n
 *   - all constraints are equalities
 *
 *
 * @return {int} the number of effectively used variables
 *
 * /!\ not finished, must investigate the case where x >= 0
 */

var normalize_t = function(fn){

	var normalize = function(A, m, n) {
		var swap, i, j, Ai, Ak, Am, k = n - 1;

		Am = A[m];

		v : for (j = 0; j <= k; ++j) {

			Ai = A[i];

			
			if (Am[j] == 0) {
				// if variable is not present in objective function
				// check whether it can be used to increase an other variable
				// in order to obtain a admissible solution 
				// with arbitrary high value

				// TODO continue
				// for (j = 0; j < i; ++j) if(A[_i][])
			}

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

};

exports.normalize_t = normalize_t;