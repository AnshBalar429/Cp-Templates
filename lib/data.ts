"use client"

import type { Snippet } from "./types"

export const categories = [
  "All",
  "Data Structure",
  "Graph",
  "Tree",
  "Math",
  "String",
  "Segment Tree",
  "Lazy Propagation",
  "Trie",
  "Min Tree",
  "Online queries",
  "Seq Tree",
]

export const codeSnippets: Snippet[] = [
  {
    id: "1",
    title: "Binary Lifting",
    description: "Tree code for binary lifting.",
    language: "C++",
    tags: ["Tree", "Graph", "Math"],
    code: `#include <bits/stdc++.h>
// Code for finding K-th parent of any node 
// dp[node][i] represents the 2^i-th parent of node
constexpr int maxN = 2e5 + 7;
int64_t dp[maxN][20];
 
void Numerator() {
    // Binary Lifting
    int64_t n, q;
    std::cin >> n >> q;
 
    std::vector<std::vector<int64_t> > adj(n + 1);
 
    std::function<void(int64_t, int64_t)> dfs = [&](int64_t node, int64_t par) -> void {
        dp[node][0] = par;
        for (int i = 1; i < 20; i++) {
            dp[node][i] = dp[dp[node][i - 1]][i - 1];
        }
 
        for (const auto &it: adj[node]) {
            if (it == par) continue;
            dfs(it, node);
        }
    };
 
    for (int i = 1; i < n; i++) {
        int64_t num;
        std::cin >> num;
        adj[num].push_back(i + 1);
        adj[i + 1].push_back(num);
    }
 
    dfs(1, 0);
 
    while (q--) {
        int64_t x, k;
        std::cin >> x >> k;
        int64_t ans = x;
        for (int i = 20; i >= 0; i--) {
            if ((k >> i) & 1) {
                ans = dp[ans][i];
            }
        }
        if (ans)
            std::cout << ans << '\n';
        else
            std::cout << -1 << '\n';
    }
}
 
int main() {
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(nullptr);
    std::cout.tie(nullptr);
    std::cout << std::fixed << std::setprecision(25);
    int64_t t = 1;
    // std::cin >> t;
    while (t-- > 0) {
        Numerator();
    }
    return 0;
}`,
  },
  {
    id: "2",
    title: "Trie",
    description: "A simplt Trie with example main function.",
    language: "C++",
    tags: ["Trie", "String", "Data Structure"],
    code: `#include <bits/stdc++.h>

struct Node {
    Node *link[26];
    bool flag;

    Node() {
        for (int i = 0; i < 26; i++) {
            link[i] = nullptr;
        }
        flag = false;
    }

    bool containsKey(char ch) {
        return link[ch - 'a'] != NULL;
    }

    void put(char ch, Node *node) {
        link[ch - 'a'] = node;
    }
};

class Trie {
public:
    Node *root;

public:
    Trie() {
        root = new Node;
    }

    void insert(std::string &word) {
        Node *node = root;
        for (int i = 0; i < word.size(); i++) {
            if (!node->containsKey(word[i])) {
                node->put(word[i], new Node());
            }
            node = node->link[word[i] - 'a'];
        }
        node->flag = true;
    }

    bool search(std::string &word) {
        Node *node = root;
        for (int i = 0; i < word.size(); i++) {
            if (!node->containsKey(word[i])) {
                return false;
            }
            node = node->link[word[i] - 'a'];
        }

        return node->flag;
    }

    bool startsWith(std::string &word) {
        Node *node = root;
        for (int i = 0; i < word.size(); i++) {
            if (!node->containsKey(word[i])) {
                return false;
            }
            node = node->link[word[i] - 'a'];
        }
        return true;
    }
};

int main() {
    Trie tr;
    std::string s1 = "numerator";
    std::string s2 = "num";
    std::string s3 = "numr";
    tr.insert(s1);

    if (tr.search(s1)) {
        std::cout << "YES" << std::endl;
    } else {
        std::cout << "NO" << std::endl;
    }

    if (tr.startsWith(s2)) {
        std::cout << "YES" << std::endl;
    } else {
        std::cout << "NO" << std::endl;
    }

    if (tr.startsWith(s3)) {
        std::cout << "YES" << std::endl;
    } else {
        std::cout << "NO" << std::endl;
    }
}`,
  },
  {
    id: "3",
    title: "Generic Segment Tree",
    description: "A segment tree template where minor changes required.",
    language: "C++",
    tags: ["Data Structure", "Segment Tree", "Tree"],
    code: `#include <bits/stdc++.h>

// Segment Tree with Point Updates and Range Queries
// Supports multiple Segment Trees with just a change in the Node and Update
// Very few changes required everytime

template<typename Node, typename Update>
struct SegTree {
    std::vector<Node> tree;
    std::vector<int64_t> arr; // type may change
    int n;
    int s;

    SegTree(int a_len, std::vector<int64_t> &a) {
        // change if type updated
        arr = a;
        n = a_len;
        s = 1;
        while (s < 2 * n) {
            s = s << 1;
        }
        tree.resize(s);
        fill(tree.begin(), tree.end(), Node());
        build(0, n - 1, 1);
    }

    void build(int start, int end, int index) // Never change this
    {
        if (start == end) {
            tree[index] = Node(arr[start]);
            return;
        }
        int mid = (start + end) / 2;
        build(start, mid, 2 * index);
        build(mid + 1, end, 2 * index + 1);
        tree[index].merge(tree[2 * index], tree[2 * index + 1]);
    }

    void update(int start, int end, int index, int query_index, Update &u) // Never Change this
    {
        if (start == end) {
            u.apply(tree[index]);
            return;
        }
        int mid = (start + end) / 2;
        if (mid >= query_index)
            update(start, mid, 2 * index, query_index, u);
        else
            update(mid + 1, end, 2 * index + 1, query_index, u);
        tree[index].merge(tree[2 * index], tree[2 * index + 1]);
    }

    Node query(int start, int end, int index, int left, int right) {
        // Never change this
        if (start > right || end < left)
            return Node();
        if (start >= left && end <= right)
            return tree[index];
        int mid = (start + end) / 2;
        Node l, r, ans;
        l = query(start, mid, 2 * index, left, right);
        r = query(mid + 1, end, 2 * index + 1, left, right);
        ans.merge(l, r);
        return ans;
    }

    void make_update(int index, int64_t val) {
        // pass in as many parameters as required
        Update new_update = Update(val); // may change
        update(0, n - 1, 1, index, new_update);
    }

    Node make_query(int left, int right) {
        return query(0, n - 1, 1, left, right);
    }
};

struct Node1 {
    int64_t val; // may change
    Node1() {
        // Identity element
        val = 0; // may change
    }

    Node1(int64_t p1) {
        // Actual Node
        val = p1; // may change
    }

    void merge(Node1 &l, Node1 &r) {
        // Merge two child nodes
        val = l.val ^ r.val; // may change
    }
};

struct Update1 {
    int64_t val; // may change
    Update1(int64_t p1) {
        // Actual Update
        val = p1; // may change
    }

    void apply(Node1 &a) {
        // apply update to given node
        a.val = val; // may change
    }
};

void dummyMain() {
    int64_t n, m;
    std::cin >> n >> m;
    std::vector<int64_t> arr(n);
    for (int i = 0; i < n; ++i) {
        std::cin >> arr[i];
    }

    SegTree<Node1, Update1> segTree = SegTree<Node1, Update1>(n, arr);
    segTree.make_update(2,5);
}`,
  },
  {
    id: "4",
    title: "Lazy Segment Tree",
    description: "Range Update and Range Queries.",
    language: "C++",
    tags: ["Lazy Tree", "Data structure", "Segment Tree"],
    code: `#include <bits/stdc++.h>

// Lazy Segment Tree with Range Updates and Range Queries
// Supports multiple Segment Trees with just a change in the Node and Update
// Very few changes required everytime

template<typename Node, typename Update>
struct LazySGT {
    std::vector<Node> tree;
    std::vector<bool> lazy;
    std::vector<Update> updates;
    std::vector<int64_t> arr; // type may change
    int n;
    int s;

    LazySGT(int a_len, std::vector<int64_t> &a) {
        // change if type updated
        arr = a;
        n = a_len;
        s = 1;
        while (s < 2 * n) {
            s = s << 1;
        }
        tree.resize(s);
        fill(tree.begin(), tree.end(), Node());
        lazy.resize(s);
        fill(lazy.begin(), lazy.end(), false);
        updates.resize(s);
        fill(updates.begin(), updates.end(), Update());
        build(0, n - 1, 1);
    }

    void build(int start, int end, int index) {
        // Never change this
        if (start == end) {
            tree[index] = Node(arr[start]);
            return;
        }
        int mid = (start + end) / 2;
        build(start, mid, 2 * index);
        build(mid + 1, end, 2 * index + 1);
        tree[index].merge(tree[2 * index], tree[2 * index + 1]);
    }

    void pushdown(int index, int start, int end) {
        if (lazy[index]) {
            int mid = (start + end) / 2;
            apply(2 * index, start, mid, updates[index]);
            apply(2 * index + 1, mid + 1, end, updates[index]);
            updates[index] = Update();
            lazy[index] = 0;
        }
    }

    void apply(int index, int start, int end, Update &u) {
        if (start != end) {
            lazy[index] = 1;
            updates[index].combine(u, start, end);
        }
        u.apply(tree[index], start, end);
    }

    void update(int start, int end, int index, int left, int right, Update &u) {
        // Never Change this
        if (start > right || end < left)
            return;
        if (start >= left && end <= right) {
            apply(index, start, end, u);
            return;
        }
        pushdown(index, start, end);
        int mid = (start + end) / 2;
        update(start, mid, 2 * index, left, right, u);
        update(mid + 1, end, 2 * index + 1, left, right, u);
        tree[index].merge(tree[2 * index], tree[2 * index + 1]);
    }

    Node query(int start, int end, int index, int left, int right) {
        // Never change this
        if (start > right || end < left)
            return Node();
        if (start >= left && end <= right) {
            pushdown(index, start, end);
            return tree[index];
        }
        pushdown(index, start, end);
        int mid = (start + end) / 2;
        Node l, r, ans;
        l = query(start, mid, 2 * index, left, right);
        r = query(mid + 1, end, 2 * index + 1, left, right);
        ans.merge(l, r);
        return ans;
    }

    void make_update(int left, int right, int64_t val) {
        // pass in as many parameters as required
        Update new_update = Update(val); // may change
        update(0, n - 1, 1, left, right, new_update);
    }

    Node make_query(int left, int right) {
        return query(0, n - 1, 1, left, right);
    }
};

struct Node1 {
    int64_t val; // may change
    Node1() {
        // Identity element
        val = 0; // may change
    }

    Node1(int64_t p1) {
        // Actual Node
        val = p1; // may change
    }

    void merge(Node1 &l, Node1 &r) {
        // Merge two child nodes
        val = l.val + r.val; // may change
    }
};

struct Update1 {
    int64_t val; // may change
    Update1() {
        // Identity update
        val = 0;
    }

    Update1(int64_t val1) {
        // Actual Update
        val = val1;
    }

    void apply(Node1 &a, int start, int end) {
        // apply update to given node
        a.val = val * (end - start + 1); // may change
    }

    void combine(Update1 &new_update, int start, int end) {
        val = new_update.val;
    }
};

int main() {
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(nullptr);
    std::cout.tie(nullptr);
    std::cout << std::fixed << std::setprecision(25);

    int n;
    std::cin >> n;
    std::vector<int64_t> a(n);
    for (int i = 0; i < n; ++i) {
        std::cin >> a[i];
    }

    LazySGT<Node1, Update1> seg = LazySGT<Node1, Update1>(n, a);
    auto ans = seg.make_query(0, n - 1);
    std::cout << ans.val << std::endl;

    ans = seg.make_query(1, 2);
    std::cout << ans.val << std::endl;

    seg.make_update(0, 1, 10);


    ans = seg.make_query(0, 1);
    std::cout << ans.val << std::endl;

    return 0;
}`,
  },
  {
    id: "5",
    title: "Sum Segment Tree",
    description: "Simple sum tree for sum range queries.",
    language: "C++",
    tags: ["Seg Tree", "Tree", "Online queries"],
    code: `#include <bits/stdc++.h>

// Simple Segment tree for sum range queries.
std::vector<int> segTree;

void build(std::vector<int> &arr, int start, int end, int ind) {
    if (start == end) {
        segTree[ind] = arr[start];
        return;
    }
    const int mid = (start + end) / 2;
    const int left = 2 * ind;
    const int right = 2 * ind + 1;
    build(arr, start, mid, left);
    build(arr, mid + 1, end, right);
    segTree[ind] = segTree[left] + segTree[right];
}

void update(std::vector<int> &arr, int start, int end, int ind, int pos, int value) {
    if (start == end) {
        //might change
        arr[pos] = value;
        segTree[ind] = arr[pos];
        return;
    }

    int mid = (start + end) / 2;
    if (mid >= pos) {
        update(arr, start, mid, 2 * ind, pos, value);
    } else {
        update(arr, mid + 1, end, 2 * ind + 1, pos, value);
    }

    //might change
    segTree[ind] = segTree[2 * ind] + segTree[2 * ind + 1];
}

int query(int start, int end, int ind, int l, int r) {
    //complete overlap
    if (start >= l && end <= r) {
        return segTree[ind];
    }

    if (l > end || r < start) {
        return 0;
    }

    int mid = (start + end) / 2;
    int leftans = query(start, mid, 2 * ind, l, r);
    int rightans = query(mid + 1, end, 2 * ind + 1, l, r);
    //might change
    return leftans + rightans;
}


int main() {
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(nullptr);
    std::cout.tie(nullptr);
    std::cout << std::fixed << std::setprecision(25);

    int n;
    std::cin >> n;
    segTree.resize(2 * n, -1);
    std::vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        std::cin >> arr[i];;
    }

    // building segment tree
    // start --> starting pos of arr
    // end --> ending pos of arr
    // ind --> index of root node of segment tree
    build(arr, 0, n - 1, 1);
    for (auto it: segTree) {
        std::cout << it << " ";
    }
    std::cout << std::endl;

    // pos --> position to where change (0 based indexing)
    update(arr, 0, n - 1, 1, 1, 10);

    // l to r --> query range from l to r
    const int ans = query(0, n - 1, 1, 2, 4);
    std::cout << ans << std::endl;

    return 0;
}`,
  },
  {
    id: "6",
    title: "Lazy Min Segment Tree",
    description: "An example of Lazy Tree.",
    language: "C++",
    tags: ["Min Tree", "Lazy Propogation", "Tree"],
    code: `#include <bits/stdc++.h>

// Lazy Segment Tree with Range Updates and Range Queries
// Supports multiple Segment Trees with just a change in the Node and Update
// Very few changes required everytime

template<typename Node, typename Update>
struct LazySGT {
    std::vector<Node> tree;
    std::vector<bool> lazy;
    std::vector<Update> updates;
    std::vector<int64_t> arr; // type may change
    int n;
    int s;

    LazySGT(int a_len, std::vector<int64_t> &a) {
        // change if type updated
        arr = a;
        n = a_len;
        s = 1;
        while (s < 2 * n) {
            s = s << 1;
        }
        tree.resize(s);
        fill(tree.begin(), tree.end(), Node());
        lazy.resize(s);
        fill(lazy.begin(), lazy.end(), false);
        updates.resize(s);
        fill(updates.begin(), updates.end(), Update());
        build(0, n - 1, 1);
    }

    void build(int start, int end, int index) {
        // Never change this
        if (start == end) {
            tree[index] = Node(arr[start]);
            return;
        }
        int mid = (start + end) / 2;
        build(start, mid, 2 * index);
        build(mid + 1, end, 2 * index + 1);
        tree[index].merge(tree[2 * index], tree[2 * index + 1]);
    }

    void pushdown(int index, int start, int end) {
        if (lazy[index]) {
            int mid = (start + end) / 2;
            apply(2 * index, start, mid, updates[index]);
            apply(2 * index + 1, mid + 1, end, updates[index]);
            updates[index] = Update();
            lazy[index] = 0;
        }
    }

    void apply(int index, int start, int end, Update &u) {
        if (start != end) {
            lazy[index] = 1;
            updates[index].combine(u, start, end);
        }
        u.apply(tree[index], start, end);
    }

    void update(int start, int end, int index, int left, int right, Update &u) {
        // Never Change this
        if (start > right || end < left)
            return;
        if (start >= left && end <= right) {
            apply(index, start, end, u);
            return;
        }
        pushdown(index, start, end);
        int mid = (start + end) / 2;
        update(start, mid, 2 * index, left, right, u);
        update(mid + 1, end, 2 * index + 1, left, right, u);
        tree[index].merge(tree[2 * index], tree[2 * index + 1]);
    }

    Node query(int start, int end, int index, int left, int right) {
        // Never change this
        if (start > right || end < left)
            return Node();
        if (start >= left && end <= right) {
            pushdown(index, start, end);
            return tree[index];
        }
        pushdown(index, start, end);
        int mid = (start + end) / 2;
        Node l, r, ans;
        l = query(start, mid, 2 * index, left, right);
        r = query(mid + 1, end, 2 * index + 1, left, right);
        ans.merge(l, r);
        return ans;
    }

    void make_update(int left, int right, int64_t val) {
        // pass in as many parameters as required
        Update new_update = Update(val); // may change
        update(0, n - 1, 1, left, right, new_update);
    }

    Node make_query(int left, int right) {
        return query(0, n - 1, 1, left, right);
    }
};

struct Node1 {
    int64_t val; // may change
    Node1() {
        // Identity element
        val = INT64_MAX; // may change
    }

    Node1(int64_t p1) {
        // Actual Node
        val = p1; // may change
    }

    void merge(Node1 &l, Node1 &r) {
        // Merge two child nodes
        val = std::min(l.val ,r.val); // may change
    }
};

struct Update1 {
    int64_t val; // may change
    Update1() {
        // Identity update
        val = -1;
    }

    Update1(int64_t val1) {
        // Actual Update
        val = val1;
    }

    void apply(Node1 &a, int start, int end) {
        if(val == -1) {
            return;
        }
        // apply update to given node
        a.val = val; // may change
    }

    void combine(Update1 &new_update, int start, int end) {
        val = new_update.val;
    }
};

int main() {
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(nullptr);
    std::cout.tie(nullptr);
    std::cout << std::fixed << std::setprecision(25);

    int n;
    std::cin >> n;
    std::vector<int64_t> a(n);
    for (int i = 0; i < n; ++i) {
        std::cin >> a[i];
    }

    LazySGT<Node1, Update1> seg = LazySGT<Node1, Update1>(n, a);
    auto ans = seg.make_query(0, n - 1);
    std::cout << ans.val << std::endl;

    ans = seg.make_query(1, 2);
    std::cout << ans.val << std::endl;

    seg.make_update(0, 1, 10);

    ans = seg.make_query(0, 2);
    std::cout << ans.val << std::endl;

    return 0;
}`,
  },
]

export function getSnippets() {
  return codeSnippets
}

export function getSnippetById(id: string) {
  return codeSnippets.find((snippet) => snippet.id === id)
}

export function getSnippetsByTag(tag: string) {
  return codeSnippets.filter((snippet) => snippet.tags.includes(tag))
}

export function searchSnippets(query: string) {
  const lowercaseQuery = query.toLowerCase()
  return codeSnippets.filter(
    (snippet) =>
      snippet.title.toLowerCase().includes(lowercaseQuery) ||
      snippet.description.toLowerCase().includes(lowercaseQuery) ||
      snippet.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  )
}

