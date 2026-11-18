import tree_sitter_python as tspython
from tree_sitter import Language, Parser

parser = Parser(Language(tspython.language()))

potongan = {
    "fungsi": b"def sapa(nama)\n    return 'halo ' + nama\n",
    "if_else": b"if x > 5:\n    print('besar')\nelse:\n    print('kecil')\n",
    "kelas": b"class Hewan:\n    def bersuara(self):\n        return 'bunyi'\n",
}

for nama, kode in potongan.items():
    tree = parser.parse(kode)
    print(f"== {nama} ==")
    print(tree.root_node)
    
tree = parser.parse(potongan["fungsi"])
for c in tree.root_node.children[0].children:
    print(c.type, "bernama" if c.is_named else "anonim")