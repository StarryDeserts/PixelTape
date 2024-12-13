module pixeltape::utils {
    use sui::vec_map::{Self, VecMap};

    const E_INVALID_LENGTH: u64 = 0;

    public(package) fun from_vec_to_map<K: copy + drop, V: drop>(
        mut keys: vector<K>,
        mut values: vector<V>,
    ): VecMap<K, V> {
        assert!(vector::length(&keys) == vector::length(&values), E_INVALID_LENGTH);

        let mut i = 0;
        let n = vector::length(&keys);
        let mut map = vec_map::empty<K, V>();

        while (i < n) {
            let key = vector::pop_back(&mut keys);
            let value = vector::pop_back(&mut values);

            map.insert(key, value);

            i = i + 1;
        };
        map
    }
}