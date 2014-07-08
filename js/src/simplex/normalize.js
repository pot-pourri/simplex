
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