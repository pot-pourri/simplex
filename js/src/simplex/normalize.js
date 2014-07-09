
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