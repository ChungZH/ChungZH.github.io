---
title: CSP-J/S2022 题解与反思
tags:
- OI
- CSP
categories: 题解
date: 2022-11-05
katex: true
---

学校 OI 停（tui yi）了，周末有空的时候补补。

## J

### T1 乘方

[Luogu-P8813 [CSP-J 2022] 乘方](https://www.luogu.com.cn/problem/P8813)

> 如果 $a^b$ 的值不超过 ${10}^9$，则输出 $a^b$ 的值，否则输出 `-1`。数据范围：$1 \le a, b \le {10}^9$。

$2^{30}=1073741824 > 10^9$，所以循环最多 29 次就能判断是否超过 $10^9$。注意 $1$ 的任何次幂都是 $1$，不能进行循环，特判一下即可。

```cpp
#include <bits/stdc++.h>
using namespace std;
const long long MAXX = 1e9;
int main()
{	
	long long a, b;
	cin >> a >> b;
	if (a == 1) {
		cout << 1 << endl;
	} else {
		long long s = 1;
		bool flag = 0;
		for (long long i = 1; i <= b && s*a <= MAXX; i++) {
			s *= a;
			if (i == b) {
				flag = 1;
			}
		}
		if (!flag) {
			cout << -1 << endl;
		} else {
			cout << s << endl;
		}
	}
	return 0;
}
```

### T2 解密

[Luogu-P8814 [CSP-J 2022] 解密](https://www.luogu.com.cn/problem/P8814)

> 给定一个正整数 $k$，有 $k$ 次询问，每次给定三个正整数 $n_i, e_i, d_i$，求两个正整数 $p_i, q_i$，使 $n_i = p_i \times q_i$、$e_i \times d_i = (p_i - 1)(q_i - 1) + 1$。
> 
> $1 \leq k \leq {10}^5$，对于任意的 $1 \leq i \leq k$，$1 \leq n_i \leq {10}^{18}$，$1 \leq e_i \times d_i \leq {10}^{18}$
，$1 \leq m \leq {10}^9$。

初三学生表示毫无压力，推式子然后解一元二次方程即可。

~~如果我是在初二考的这道题说不定会直接懵逼了~~

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long LL;
template<typename T>
T read() {
	T s = 0, f = 1;
	char c = getchar();
	while (!isdigit(c)) {
		if (c == '-') f = -1;
		c = getchar();
	}
	while (isdigit(c)) {
		s = s*10+c-'0';
		c = getchar();
	}
	return s*f;
}
int k;
LL n, e, d;
int main()
{
	k = read<int>();
	while (k--) {
		n = read<LL>(), d = read<LL>(), e = read<LL>();
		LL a = 1ll, b = e*d-2ll-n, c = n;
		LL delt = b*b-a*c*4;   
		if (delt < 0) {
			cout << "NO" <<endl;
			continue;
		}
		LL sqde = sqrt(delt);
		if (sqde*sqde==delt) {
			LL p = (sqde-b)/2ll/a;
			LL q = n/p;
			if (p > q) swap(p, q);
			cout <<p <<" " <<q << endl;
		} else {
			cout << "NO" << endl;
		}
	}
	return 0;
}
```

### T3

[Luogu-P8815 [CSP-J 2022] 逻辑表达式](https://www.luogu.com.cn/problem/P8815)

太悲伤了，一开始想不出来怎么写，最后好不容易找到一种写法了就没考虑过时间复杂度了。。。

考前其实看了一眼 [P7073 [CSP-J2020] 表达式
](https://www.luogu.com.cn/problem/P7073) 的，但是看了好久题解发现好麻烦，就没去研究了。。好后悔，我真的好菜

考场代码：

```cpp
#include <bits/stdc++.h>
using namespace std;
const int MAXL = 1000006;
int ch[MAXL][2];
char val[MAXL];
int dep[MAXL], id[MAXL], dl[MAXL][2];
int cnt = 0;
string s;
void dfs(int l, int r, int& f) {
	if (l == r) {
		f = id[l];
		return;
	}
	int minn = MAXL, mini = -1;
	for (int i = r; i >= l; i--)
		if (s[i] == '&' || s[i] == '|') {
			if (dep[i] < minn) {
				minn = dep[i];
				mini = i;
			} else if (dep[i] == minn && s[mini] != s[i] && s[mini] == '&') {
				mini = i;
			}
		}
	f = id[mini];
	dfs(l+(s[l]=='('), mini-1, ch[id[mini]][0]);
	dfs(mini+1, r-(s[r]==')'), ch[id[mini]][1]);
}
int calc(int c) {
	if (ch[c][0] == 0){
		if (val[c] == '0') return 0;
		return 1;
	}
	int a = calc(ch[c][0]), b = calc(ch[c][1]);
	dl[c][0] = dl[ch[c][0]][0]+dl[ch[c][1]][0];
	dl[c][1] = dl[ch[c][0]][1]+dl[ch[c][1]][1];
	if (val[c] == '&') {
		if (a == 0) {
			dl[c][0] = dl[ch[c][0]][0]+1;
			dl[c][1] = dl[ch[c][0]][1];
		}
		return a&b;
	} else {
		if (a == 1) {
			dl[c][0] = dl[ch[c][0]][0];
			dl[c][1] = dl[ch[c][0]][1]+1;
		}
		return a||b;
	}
}
int main()
{
	cin >> s;	
	stack<int> st;
	int maxd = 0;
	for (int i = 0; i < s.length(); i++) {
		if (s[i] == '0' || s[i] == '1') { cnt++; id[i] = cnt; } 
		else if (s[i] == '|' || s[i] == '&') { cnt++; id[i] = cnt; }
		val[id[i]] = s[i];
		if (s[i] == '(') {
			st.push(i);
		} else if (s[i] == ')') {
			st.pop();
		}
		dep[i] = st.size();
		maxd = max(maxd, dep[i]); 
	}
	dfs(0, s.length()-1, ch[0][0]);
	int ans = calc(ch[0][0]);
	cout << ans << endl << dl[ch[0][0]][0] << " " << dl[ch[0][0]][1] << endl;
	return 0;
} 
```

### T4

~~**话说有没有发现今年 T3 T4 和 2020 年的解法都很像...明年一定要记得复习 CSP 2021**~~

我承认我设的 DP 状态有点奇怪，毕竟只剩下半小时做这道题了，思路有点乱，但自我感觉答案应该是正确的。。。可是洛谷自测才 WA 50 分。

考场代码：

```cpp
#include <bits/stdc++.h>
using namespace std;
int n, k;
struct node {
	int x, y;
} a[505];
bool cmp(node a, node b) {
	if (a.x != b.x) return a.x<b.x;
	return a.y<b.y;
}
int dp[605][605];
int main()
{
	cin >> n >> k;
	memset(dp, -1, sizeof dp);
	for (int i = 1; i <= n; i++) {
		cin >> a[i].x >> a[i].y;
		dp[1][i] = 0;
	}
	sort(a+1, a+1+n, cmp);
	int ans = 0;
	for (int i = 2; i <= n+k; i++) {
		for (int j = 1; j <= n; j++) {
			for (int m = 1; m < j; m++) {
				int dis = a[j].x+a[j].y-a[m].x-a[m].y-1;
				if (a[j].x < a[m].x || a[j].y < a[m].y || dis >= i || dp[i-dis-1][m]+dis>k || dp[i-dis-1][m] == -1) continue;
				dp[i][j] = dp[i-dis-1][m]+dis;
				if (dp[i][j] != -1) {
					ans = max(ans, i+k-dp[i][j]);
				}
			}
		}
	}
	cout << ans << endl;
	return 0;
}
```

## S

### T1

只会暴力。

我真的很蠢。考前复习过最短路，但无济于事。这道题求同边权的全源最短路径，我竟然只想到了 Floyd 而完全没考虑到 BFS！！！这种脑子真的**不配不配不配不配不配不配不配不配**拿 1=。。。。。。。。

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long LL;
const int MAXN = 2505, MAXM = 10005;
int n, m, k;
LL a[MAXN];
int tmp[MAXN];
bool cmp(int x, int y) { return a[x]>a[y];} 
int f[MAXN][MAXN];
vector<int> g[MAXN];
LL ans =0,cur=0;
int t[MAXN];
bool vis[MAXN];
void dfs(int u, int step) {
	if (step == 4) {
		if (f[1][t[4]] > k+1) return ;
		ans = max(ans, cur);
		return ;
	}
	for (int i = 0; i < g[u].size(); i++) {
		if (vis[g[u][i]]) continue;
		vis[g[u][i]] = 1;
		cur += a[g[u][i]];
		t[step+1] = g[u][i];
		dfs(g[u][i], step+1);
		vis[g[u][i]] = 0;
		cur-=a[g[u][i]];
	}
}
int main()
{
	memset(f, 0x3f, sizeof f);
	scanf("%d%d%d", &n, &m, &k);
	f[1][1] = 0;
	t[1] = 1;
	for (int i = 2; i <= n; i++) scanf("%lld", &a[i]), f[i][i] = 0, tmp[i] = i;
	for (int i = 0; i < m; i++) {
		int x, y;
		scanf("%d%d", &x, &y);
		f[x][y] = f[y][x] = 1;
	}
	if (n>100 && k <= 0) {
		LL ans = 0;
		bool flag = 0;
		sort(tmp+1, tmp+1+n, cmp);
		for (int one = 1; one <= n; one++) {
			if (f[tmp[one]][1] > 1 || flag) continue;
			for (int fou = 1; fou <= n; fou++) {
				if (f[tmp[fou]][1] > 1 || one == fou || flag) continue;
				for (int two = 1; two <= n; two++) {
					if (f[tmp[one]][tmp[two]] > 1 || one == two || fou == two || flag) continue;
					for (int thr = 1; thr <= n; thr++) {
						if (f[tmp[thr]][tmp[two]] > 1 || f[tmp[thr]][tmp[fou]] > 1 || thr == one || thr == two || thr == fou || flag) continue;
						ans = a[tmp[one]]+a[tmp[two]]+a[tmp[thr]]+a[tmp[fou]];
						flag = 1;
					}
				}
			}
		}
		printf("%lld\n", ans);
		return 0;
	}
	
	for (int p = 1; p <= n; p++)
		for (int i = 1; i <= n; i++)
			for (int j = 1; j <= n; j++)
				f[i][j] = min(f[i][j], f[i][p]+f[p][j]);

	for (int i = 1; i <= n; i++) {
		for (int j = 1; j <= n; j++) {
			if (i == j) continue;
			if (f[i][j] <= k+1) {
				g[i].push_back(j);
				g[j].push_back(i);
			}
		}
	}
	vis[1] = 1;
	dfs(1, 0); 
	printf("%lld\n", ans);
	return 0;
} 
```


### T2

唯一做出来的一道 S 组题，虽然似乎也还是拿不到 1=。

大概的思路是先根据 B 数组是否存在正数、负数、0 进行分类，然后再讨论 A 数组。具体的都在注释里了。

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long LL;
const int MAXN = 100005;
int n, m, q;
LL a[MAXN], b[MAXN];
// zheng fu ling 
int azs[MAXN], afs[MAXN], als[MAXN];
int bzs[MAXN], bfs[MAXN], bls[MAXN];
bool Ahz(int l, int r) { return azs[r]>azs[l-1]; } // A have zheng?
bool Ahf(int l, int r) { return afs[r]>afs[l-1]; } // A have fu?
bool Ahl(int l, int r) { return als[r]>als[l-1]; } // A have ling?
bool Bhz(int l, int r) { return bzs[r]>bzs[l-1]; }
bool Bhf(int l, int r) { return bfs[r]>bfs[l-1]; }
bool Bhl(int l, int r) { return bls[r]>bls[l-1]; }
struct SegmentTree {
	LL maxx[4*MAXN], minn[4*MAXN];
	SegmentTree() {
		for (int i = 0; i < 4*MAXN; i++) {
			maxx[i] = -1e18;
			minn[i] = 1e18;
		}
	}
	void add(int u, int l, int r, int pos, LL v) {
		if (pos < l || pos > r) return ;
		if (l == r && l == pos) {
			maxx[u] = max(maxx[u], v);
			minn[u] = min(minn[u], v);
			return;
		}
		int mid = (l+r)>>1;
		add(u<<1, l, mid, pos, v);
		add(u<<1|1, mid+1, r, pos, v);
		maxx[u] = max(maxx[u<<1], maxx[u<<1|1]);
		minn[u] = min(minn[u<<1], minn[u<<1|1]);
	}
	LL queryMax(int u, int l, int r, int x, int y) {
		if (l > y || r < x) return -1e18;
		if (l >= x && r <= y) return maxx[u];
		int mid = (l+r)>>1;
		return max(queryMax(u<<1, l, mid, x, y), queryMax(u<<1|1, mid+1, r, x, y));
	}
	LL queryMin(int u, int l, int r, int x, int y) {
		if (l > y || r < x) return 1e18;
		if (l >= x && r <= y) return minn[u];
		int mid = (l+r)>>1;
		return min(queryMin(u<<1, l, mid, x, y), queryMin(u<<1|1, mid+1, r, x, y));
	}
} az, af, bz, bf; 
int main()
{
	scanf("%d%d%d", &n, &m, &q);
	for (int i = 1; i <= n; i++) {
		scanf("%lld", &a[i]);
		if (a[i] > 0) {
			az.add(1, 1, n, i, a[i]);
		} else if (a[i] < 0) {
			af.add(1, 1, n, i, a[i]);
		}
		azs[i] = azs[i-1]+(a[i]>0);
		afs[i] = afs[i-1]+(a[i]<0);
		als[i] = als[i-1]+(a[i]==0);
	}
	for (int i = 1; i <= m; i++) {
		scanf("%lld", &b[i]);
		if (b[i] > 0) {
			bz.add(1, 1, m, i, b[i]);
		} else if (b[i] < 0) {
			bf.add(1, 1, m, i, b[i]);
		}
		bzs[i] = bzs[i-1]+(b[i]>0);
		bfs[i] = bfs[i-1]+(b[i]<0);
		bls[i] = bls[i-1]+(b[i]==0);
	}
	while (q--) {
		int l, r, x, y;
		scanf("%d%d%d%d", &l, &r, &x, &y);
		
		if (Bhz(x, y) && Bhl(x, y) && Bhf(x, y)) {
			if (Ahl(l, r)) {
				printf("0\n");
			} else {
				LL ans = -1e18;
				// A最小正数*B最小负数
				if (Ahz(l, r))
					ans = az.queryMin(1, 1, n, l, r)*bf.queryMin(1, 1, m, x, y);
				// A最大负数*B最大正数 
				if (Ahf(l, r))
					ans = max(ans, af.queryMax(1, 1, n, l, r)*bz.queryMax(1, 1, m, x, y));
				printf("%lld\n", ans);
			}
		} else if (Bhz(x, y) && Bhl(x, y)) {
			if (Ahz(l, r) || Ahl(l, r)) {
				printf("0\n");
			} else {
				// A最大负数*B最大正数 
				printf("%lld\n", af.queryMax(1, 1, n, l, r)*bz.queryMax(1, 1, m, x, y));
			}
		} else if (Bhz(x, y) && Bhf(x, y)) {
			if (Ahl(l, r)) {
				printf("0\n");
			} else{
				LL ans = -1e18;
				if (Ahz(l, r))
					ans = az.queryMin(1, 1, n, l, r)*bf.queryMin(1, 1, m, x, y);
				if (Ahf(l, r))
					ans = max(ans, af.queryMax(1, 1, n, l, r)*bz.queryMax(1, 1, m, x, y));
				printf("%lld\n", ans);
			} 
		} else if (Bhl(x, y) && Bhf(x, y)) {
			if (Ahf(l, r) || Ahl(l, r)) {
				printf("0\n");
			} else {
				// A 最小正数*B最小负数 
				printf("%lld\n", az.queryMin(1, 1, n, l, r)*bf.queryMin(1, 1, m, x, y));
			}
		} else if (Bhz(x, y)) {
			if (Ahz(l, r)) {
				// A 最大正数*B最小正数 
				printf("%lld\n", az.queryMax(1, 1, n, l, r)*bz.queryMin(1, 1, m, x, y));
			} else if (Ahl(l, r)) {
				printf("0\n");
			} else {
				// A 最大负数*B最大正数 
				printf("%lld\n", af.queryMax(1, 1, n, l, r)*bz.queryMax(1, 1, m, x, y));
			}
		} else if (Bhf(x, y)) {
			if (Ahf(l, r)) {
				// A 最小负数*B最大负数 
				printf("%lld\n", af.queryMin(1, 1, n, l, r)*bf.queryMax(1, 1, m, x, y));
			} else if (Ahl(l, r)) {
				printf("0\n");
			} else {
				// A 最小正数*B最小负数 
				printf("%lld\n", az.queryMin(1, 1, n, l, r)*bf.queryMin(1, 1, m, x, y));
			}
		} else if (Bhl(x, y)) {
			printf("0\n");
		}
	}
	return 0;
}
```

### T3

直接放弃。

### T4

纯骗分的。还是不会做。

```cpp
#include <bits/stdc++.h>
using namespace std;
const int MAXN = 200005;
typedef long long LL;
int n, q, k;
LL v[MAXN], ans[MAXN];
int flo[2005][2005];
struct node {
	int a;
	LL v;
};
int main()
{
	scanf("%d%d%d", &n, &q, &k);
	memset(flo, 0x3f, sizeof flo);
	for (int i = 1; i <= n; i++) scanf("%lld", &v[i]), flo[i][i] = 0;
	for (int i = 0; i < n-1; i++) {
		int a, b;
		scanf("%d%d", &a, &b);
		flo[a][b] = flo[b][a] = 1;
	}
	for (int k = 1; k <= n; k++)
		for (int i = 1; i <= n; i++)
			for (int j = 1; j <= n; j++)
				flo[i][j] = min(flo[i][j], flo[i][k]+flo[k][j]);
	while (q--) {
		int s, t;
		scanf("%d%d", &s, &t);
		queue<node> q;
		q.push({s, v[s]});
		memset(ans, 0x3f, sizeof ans);
		while (!q.empty()) {
			int f = q.front().a;
			LL va = q.front().v;
			q.pop();
			if (va > ans[f]) continue;
			ans[f] = min(ans[f], va);
			if (f == t)
				continue;
			for (int i = 1; i <= n; i++) {
				if (i == f || flo[i][f] > k) continue;
				q.push({i, va+v[i]});
			}
		}
		printf("%lld\n", ans[t]);
	}
	return 0;
}
```