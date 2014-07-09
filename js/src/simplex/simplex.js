

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