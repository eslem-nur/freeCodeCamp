class HashTable:
    def __init__(self):
        self.collection = {}
    
    def hash(self, key):
        return sum(ord(char) for char in key)

    def add(self, key, value):
        h = self.hash(key)
        if h not in self.collection:
            self.collection[h] = {}
        self.collection[h][key] = value
    
    def remove(self, key):
        h = self.hash(key)

        if h in self.collection:
            bucket = self.collection[h]

            if key in bucket:
                del bucket[key]
        
            
    
    def lookup(self, key):
        h = self.hash(key)
        if h in self.collection:
            bucket = self.collection[h]
            if key in bucket:
                return bucket[key]
            
        return None